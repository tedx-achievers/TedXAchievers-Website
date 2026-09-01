import api from '../lib/api';

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },

  getAttendees: async (params: any = {}) => {
    const response = await api.get('/api/admin/attendees', { params });
    return response.data;
  },

  getVolunteers: async (params: any = {}) => {
    const response = await api.get('/api/admin/volunteers', { params });
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
