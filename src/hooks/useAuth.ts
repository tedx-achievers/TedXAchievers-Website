import { useState } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated, checkAuth, checkAdminAuth, logout } = useAuthStore();

  const handleRequest = async (requestFn: () => Promise<any>, onSuccess?: (data: any) => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestFn();
      if (onSuccess) onSuccess(data);
      return data;
    } catch (err: any) {
      console.log(err);
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

  const login = (credentials: any) => handleRequest(
    () => authService.login(credentials),
    () => checkAuth() // Fetch profile on success
  );

  const adminLogin = (credentials: any) => handleRequest(
    () => authService.login(credentials),
    () => checkAdminAuth() // Fetch admin profile on success
  );

  const register = (data: any) => handleRequest(() => authService.register(data));
  const verifyEmail = (data: any) => handleRequest(() => authService.verifyEmail(data));
  const resendVerification = (data: any) => handleRequest(() => authService.resendVerification(data));
  const forgotPassword = (data: any) => handleRequest(() => authService.forgotPassword(data));
  const resetPassword = (data: any) => handleRequest(() => authService.resetPassword(data));
  const setPassword = (data: any) => handleRequest(() => authService.setPassword(data), () => checkAuth());

  return {
    user,
    isAuthenticated,
    isStoreLoading: useAuthStore((state) => state.isLoading),
    isLoading,
    error,
    login,
    adminLogin,
    register,
    verifyEmail,
    resendVerification,
    logout,
    forgotPassword,
    resetPassword,
    setPassword,
    checkAuth,
    clearError: () => setError(null)
  };
};
