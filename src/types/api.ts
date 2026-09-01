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
