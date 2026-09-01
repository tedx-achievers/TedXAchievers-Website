import { useState, useCallback } from 'react';
import { adminService } from '../services/adminService';

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
  const getAttendees = useCallback((params?: any) => handleRequest(() => adminService.getAttendees(params)), []);
  const getVolunteers = useCallback((params?: any) => handleRequest(() => adminService.getVolunteers(params)), []);
  const updateVolunteerStatus = (id: string, status: 'approved' | 'rejected') => 
    handleRequest(() => adminService.updateVolunteerStatus(id, status));
  const exportAttendees = useCallback(() => adminService.exportAttendees(), []);

  return {
    isLoading,
    error,
    getDashboardStats,
    getAttendees,
    getVolunteers,
    updateVolunteerStatus,
    exportAttendees,
    clearError: () => setError(null)
  };
};
