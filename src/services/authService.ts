import api from '../lib/api';
import type { DashboardData } from '../types/api';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (data: any) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  verifyEmail: async (data: { email: string, code: string }) => {
    console.log(data)
    const response = await api.post('/api/auth/verify-email', data);
    return response.data;
  },

  resendVerification: async (data: { email: string }) => {
    const response = await api.post('/api/auth/resend-verification', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post('/api/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: any) => {
    const response = await api.post('/api/auth/reset-password', data);
    return response.data;
  },

  setPassword: async (data: any) => {
    const response = await api.post('/api/auth/set-password', data);
    return response.data;
  },

  getProfile: async (): Promise<DashboardData> => {
    const response = await api.get('/api/dashboard/');
    return response.data;
  },

  getAuthProfile: async (): Promise<any> => {
    const response = await api.get('/api/dashboard/profile');
    return response.data;
  }
};
