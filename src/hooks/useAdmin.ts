import { useState, useCallback } from 'react';
import { adminService } from '../services/adminService';
import type { AttendeeFilters, VolunteerFilters, AuditLogFilters } from '../types/api';

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleRequest = async (requestFn: () => Promise<any>, onSuccess?: (data: any) => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestFn();
      if (onSuccess) onSuccess(data);
      return data;
    } catch (err: any) {
      let message = err?.response?.data?.error || err?.response?.data?.message || err.message || 'An error occurred';
      if (err.message === 'Network Error') {
        message = 'Cannot connect to the server. This could be due to rate limiting (too many requests) or a server issue. Please try again later.';
      }
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardStats = useCallback(() => handleRequest(() => adminService.getDashboardStats()), []);
  const getAttendees = useCallback((params?: AttendeeFilters) => handleRequest(() => adminService.getAttendees(params)), []);
  const getVolunteers = useCallback((params?: VolunteerFilters) => handleRequest(() => adminService.getVolunteers(params)), []);
  const getAuditLogs = useCallback((params?: AuditLogFilters) => handleRequest(() => adminService.getAuditLogs(params)), []);
  const updateVolunteerStatus = (id: string, status: 'approved' | 'rejected') => 
    handleRequest(() => adminService.updateVolunteerStatus(id, status));
  const exportAttendees = useCallback(() => adminService.exportAttendees(), []);

  return {
    isLoading,
    error,
    getDashboardStats,
    getAttendees,
    getVolunteers,
    getAuditLogs,
    updateVolunteerStatus,
    exportAttendees,
    clearError: () => setError(null)
  };
};
