export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Attendee' | 'Volunteer' | 'Admin';
  is_verified: boolean;
  created_at: string;
}

export interface TicketData {
  ticket_code: string;
  tier: string;
  amount_paid: string;
  status: string;
  checked_in: boolean;
  checked_in_at: string | null;
  qr_code: string;
  created_at: string;
}

export interface VolunteerData {
  reference_code: string;
  preferred_role: string;
  department: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EventData {
  name: string;
  date: string;
  time: string;
  venue: string;
  theme: string;
}

export interface DashboardData {
  profile: UserProfile;
  ticket: TicketData | null;
  volunteer: VolunteerData | null;
  event: EventData;
}

// ================= ADMIN TYPES =================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface AttendeeFilters {
  search?: string;
  tier?: 'vip' | 'general' | 'student' | string;
  checked_in?: boolean | string;
  is_verified?: boolean | string;
  page?: number;
  per_page?: number;
}

export interface AdminAttendeeItem {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    is_verified?: boolean;
    isVerified?: boolean;
    created_at?: string;
    createdAt?: string;
  };
  ticket: {
    ticket_code?: string;
    ticketCode?: string;
    tier: string;
    amount_paid?: string;
    amountPaid?: string;
    status: string;
    checked_in?: boolean;
    checkedIn?: boolean;
    checked_in_at?: string | null;
    checkedInAt?: string | null;
  } | null;
}

export interface VolunteerFilters {
  search?: string;
  status?: 'pending' | 'approved' | 'rejected' | string;
  preferred_role?: string;
  page?: number;
  per_page?: number;
}

export interface AdminVolunteerItem {
  id: string;
  full_name?: string;
  fullName?: string;
  email: string;
  phone_number?: string;
  phoneNumber?: string;
  department: string;
  matric_number?: string;
  matricNumber?: string;
  preferred_role?: string;
  preferredRole?: string;
  motivation?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  reference_code?: string;
  referenceCode?: string;
  created_at?: string;
  createdAt?: string;
}

export interface AuditLogFilters {
  event_type?: string;
  actor?: string;
  from?: string;
  to?: string;
  search?: string;
  page?: number;
  per_page?: number;
}

export interface AuditLogItem {
  id: string;
  event_type?: string;
  eventType?: string;
  actor: string;
  action?: string;
  details?: string | Record<string, any>;
  metadata?: Record<string, any>;
  ip_address?: string;
  ipAddress?: string;
  user_agent?: string;
  userAgent?: string;
  created_at?: string;
  createdAt?: string;
}
