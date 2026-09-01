# TEDxAchievers API Contract

This document describes the current Rust/Axum backend implementation. Values that depend on Render or environment configuration are marked as configuration-dependent.

## Base URL

Use the deployed Render URL configured for the service, or:

```text
http://localhost:8000
```

All paths below are relative to the base URL. The repository does not prove the public Render hostname; verify it in Render before releasing the frontend.

## Request and response conventions

- Send JSON request bodies with `Content-Type: application/json`.
- Authentication uses `HttpOnly` cookies named `access_token` and `refresh_token`; JavaScript cannot read them.
- Browser requests made across origins must use `credentials: 'include'`.
- Login and set-password issue both cookies. The access cookie is valid for the configured access-token lifetime (maximum 900 seconds); the refresh lifetime is configured separately.
- Cookies are created with `Secure; SameSite=None`. HTTPS is required for normal browser cookie behavior.
- Most dashboard response fields are `snake_case`. Admin response DTOs use `camelCase`. Check each endpoint's response.

### Error shape

Application errors normally use:

```json
{
  "success": false,
  "message": "Human readable message"
}
```

Validation failures handled by the auth and volunteer handlers use the same shape with status `422`. Malformed JSON or extractor failures may be produced by Axum and should not be assumed to have this exact shape.

## Health

### `GET /api/health`

Authentication: none.

Example response (`200`):

```json
{
  "status": "ok",
  "timestamp": "2026-08-31T10:00:00Z"
}
```

## Authentication

### `POST /api/auth/register`

Authentication: none.

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08012345678",
  "password": "minEightChars"
}
```

Response: `201 Created`.

```json
{
  "message": "Registration successful. Check your email to verify."
}
```

Common errors: `409` if the email already exists; `422` for invalid fields; `429` if rate-limited.

### `POST /api/auth/verify-email`

Authentication: none. The verification code expires after 15 minutes and is single-use.

Request:

```json
{
  "email": "john@example.com",
  "code": "123456"
}
```

The code must be exactly six characters. Response: `200 OK`.

```json
{
  "message": "Email verified successfully"
}
```

Common errors: `400` invalid, expired, used, or exhausted code; `422` invalid email/code length; `429` rate-limited.

### `POST /api/auth/resend-verification`

Authentication: none.

Request:

```json
{
  "email": "john@example.com"
}
```

If the email belongs to an unverified user, the backend generates a new six-digit code, invalidates the previous code, resets the verification-attempt counter, and sends a new code that expires after 15 minutes. The endpoint returns the same response for unknown or already verified emails:

```json
{
  "message": "If that email requires verification, a new verification code has been sent"
}
```

The same email has a 60-second resend cooldown. The endpoint is also subject to the sensitive-auth rate limit.

### `POST /api/auth/login`

Authentication: none.

Request:

```json
{
  "email": "john@example.com",
  "password": "minEightChars"
}
```

Response: `200 OK`, with `Set-Cookie` headers for `access_token` and `refresh_token`.

```json
{
  "message": "Login successful"
}
```

Common errors: `401` invalid credentials; `403` email not verified; `422` invalid fields; `429` rate-limited.

### `POST /api/auth/refresh`

Authentication: `refresh_token` cookie. No body.

Response: `200 OK`, with a replacement `access_token` cookie.

```json
{
  "message": "Token refreshed"
}
```

Invalid or expired refresh cookies return `401`.

### `POST /api/auth/logout`

Authentication: optional `refresh_token` cookie. No body.

Response: `200 OK`, with expired `access_token` and `refresh_token` cookies.

```json
{
  "message": "Logged out"
}
```

### `POST /api/auth/forgot-password`

Authentication: none.

Request:

```json
{
  "email": "john@example.com"
}
```

The backend sends a six-digit reset code when the email exists. It deliberately returns the same success response whether or not the email exists.

```json
{
  "message": "If that email exists, a reset code has been sent"
}
```

The reset code expires after 15 minutes. Common errors: `422` invalid email; `429` rate-limited.

### `POST /api/auth/reset-password`

Authentication: none.

Request:

```json
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "newPassword123"
}
```

Response: `200 OK`.

```json
{
  "message": "Password reset successful"
}
```

Common errors: `400` invalid or expired code/password validation; `429` rate-limited.

### `POST /api/auth/set-password`

Authentication: none. Used with a token from a ticket or volunteer magic link.

Request:

```json
{
  "token": "token-from-email-link",
  "password": "newPassword123"
}
```

Response: `200 OK`, with both authentication cookies.

```json
{
  "message": "Password set successfully. Welcome!"
}
```

## Tickets

### `POST /api/tickets/initiate`

Authentication: none.

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08012345678",
  "tier": "general"
}
```

Tier values: `student`, `general`, `vip`.

Possible successful responses are `200 OK`.

For an unverified user:

```json
{
  "status": "verification_required",
  "message": "A verification code was sent to your email"
}
```

For a verified user:

```json
{
  "status": "payment_required",
  "checkoutUrl": "https://pay.squadco.com/...",
  "paymentRef": "TEDxACH..."
}
```

Common errors: `400` invalid fields; `409` a paid ticket already exists; `429` rate-limited.

### `POST /api/tickets/verify-otp`

Authentication: none.

Request:

```json
{
  "email": "john@example.com",
  "code": "123456",
  "tier": "general"
}
```

Response: `200 OK` with `status: "payment_required"`, `checkoutUrl`, and `paymentRef`.

Common errors: `400` code is not six characters; `401` unknown, expired, exhausted, or invalid OTP.

### `POST /api/tickets/webhook`

Internal payment-provider endpoint. Requires the `x-squad-encrypted-body` signature header. Do not call it from the frontend.

### `GET /api/tickets/mine`

Authentication: verified attendee cookie.

Returns `200` with:

```json
{
  "success": true,
  "data": { "ticketCode": "TED-ABC123" }
}
```

The `data` object is the raw ticket model and uses camelCase fields such as `ticketCode`, `amountKobo`, and `checkedIn`. Ticket status and tier enum values are lowercase (`paid`, `vip`). No paid ticket returns `404`.

### `GET /api/tickets/:code/verify`

Authentication: volunteer or admin cookie. Returns the ticket in `success/data` format. An unknown code returns `404`.

### `PATCH /api/tickets/:code/checkin`

Authentication: volunteer or admin cookie. Marks a paid ticket as checked in. Returns the ticket in `success/data` format. Errors include `400` unpaid ticket, `404` unknown code, and `409` already checked in.

## Volunteers

### `POST /api/volunteers/apply`

Authentication: none.

Request fields:

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": "08012345678",
  "department": "Computer Science",
  "matricNumber": "AU/1234/2026",
  "preferredRole": "technical",
  "motivation": "At least twenty characters of motivation."
}
```

Preferred-role values are `technical`, `videography`, `photography`, `content`, `protocol_and_ushering`, `welfare`, `graphic_and_design`, `venue_and_decoration`, and `partnership_and_sponsorship`.

Response: `201 Created` with the created application object in camelCase. Errors include `409` duplicate/full role and `422` validation failure.

### `GET /api/volunteers/me?email=jane@example.com`

Authentication: none. Returns the most recent application for the email. No application returns `404`.

### `GET /api/volunteers/admin/list`

Authentication: admin cookie. Optional query parameter: `status=pending`, `approved`, or `rejected`.

Returns a JSON array of applications. This endpoint is not paginated.

### `PATCH /api/volunteers/admin/:id`

Authentication: admin cookie.

Request:

```json
{
  "status": "approved"
}
```

Allowed status values: `approved`, `rejected`. Returns the updated application. Approval/rejection can create or update a user role and enqueue email notifications.

## Dashboard

All dashboard endpoints require a verified authentication cookie and attendee access. Dashboard response fields use snake_case.

| Method | Path | Result |
|---|---|---|
| GET | `/api/dashboard/` | Combined profile, paid ticket, volunteer application, and event data |
| GET | `/api/dashboard/profile` | Current profile |
| PATCH | `/api/dashboard/profile` | Updates `name` and/or `phone` |
| GET | `/api/dashboard/ticket` | Current paid ticket; `404` if none |
| GET | `/api/dashboard/volunteer` | Current volunteer application; `404` if none |
| GET | `/api/dashboard/event` | Event configuration |

Profile update request:

```json
{
  "name": "New Name",
  "phone": "08087654321"
}
```

At least one field is required. Empty updates return `400`.

## Admin

All admin endpoints require a verified user with the `admin` role. Admin response DTOs use camelCase.

| Method | Path | Result |
|---|---|---|
| GET | `/api/admin/dashboard` | Aggregate registration, ticket, volunteer, revenue, and check-in statistics |
| GET | `/api/admin/attendees` | Paginated attendees; optional `page`, `per_page`, and `search` |
| GET | `/api/admin/attendees/export` | CSV download |
| GET | `/api/admin/volunteers` | Paginated volunteer applications; optional `page`, `per_page`, and `status` |

Pagination defaults to page `1`, `per_page` `20`, with a maximum `per_page` of `100`.

## CORS and rate limiting

CORS origins come from the backend `FRONTEND_URL` environment variable. In the current Render configuration, the configured origins are:

```text
https://www.tedxachieversuniversity.com.ng
https://tedxachieversuniversity.com.ng
```

Localhost is allowed only when explicitly added to the backend environment configuration. Allowed methods are `GET`, `POST`, and `PATCH`; the configured allowed request header is `Content-Type`.

Current in-memory rate limits are per detected client IP:

- General routes: 120 requests per 15 minutes.
- Ticket verification/check-in paths: 62 requests per minute per path.
- Login, email verification, forgot-password, and reset-password: 5 requests per 12 hours per path.

The current middleware counts preflight `OPTIONS` requests as well as normal requests. A rate-limited response is `429` with:

```json
{
  "success": false,
  "message": "Too many requests"
}
```

It also includes a `Retry-After` header. Because the limiter is in memory, its counters are lost when the server process restarts.

## Postman notes

1. Create an environment variable named `baseUrl`.
2. Send register, verify-email, and login in that order.
3. For verification, send `email` and `code`, not `token`.
4. Enable Postman's cookie jar. Login must store `access_token` and `refresh_token`.
5. Call `/api/dashboard/profile` to verify authentication.
6. Do not repeatedly resend sensitive requests; the limit is five requests per 12 hours per IP and path.
