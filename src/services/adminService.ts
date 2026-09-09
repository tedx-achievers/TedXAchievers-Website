import api from '../lib/api';
import type { 
  PaginatedResponse, 
  AttendeeFilters, 
  AdminAttendeeItem, 
  VolunteerFilters, 
  AdminVolunteerItem, 
  AuditLogFilters, 
  AuditLogItem 
} from '../types/api';

const cleanParams = (params: Record<string, any> = {}) => {
  const cleaned: Record<string, any> = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },

  getAttendees: async (params: AttendeeFilters = {}): Promise<PaginatedResponse<AdminAttendeeItem>> => {
    const response = await api.get('/api/admin/attendees', { params: cleanParams(params) });
    return response.data;
  },

  getVolunteers: async (params: VolunteerFilters = {}): Promise<PaginatedResponse<AdminVolunteerItem>> => {
    const response = await api.get('/api/admin/volunteers', { params: cleanParams(params) });
    return response.data;
  },

  getAuditLogs: async (params: AuditLogFilters = {}): Promise<PaginatedResponse<AuditLogItem>> => {
    const response = await api.get('/api/admin/audit-logs', { params: cleanParams(params) });
    return response.data;
  },

  updateVolunteerStatus: async (id: string, status: 'approved' | 'rejected') => {
    const response = await api.patch(`/api/volunteers/admin/${id}`, { status });
    return response.data;
  },

  exportAttendees: async () => {
    const response = await api.get('/api/admin/attendees/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendees.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
};
