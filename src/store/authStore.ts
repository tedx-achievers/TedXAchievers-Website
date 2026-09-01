import { create } from 'zustand';
import type { UserProfile } from '../types/api';
import { authService } from '../services/authService';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  checkAdminAuth: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.getProfile();
      set({ user: data.profile, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false, isLoading: false, error: error?.response?.data?.error || 'Not authenticated' });
    }
  },
  checkAdminAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.getAuthProfile();
      // Accommodate possible response structures (data.user, data.profile, or data itself)
      const userProfile = data.user || data.profile || data;
      set({ user: userProfile, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false, isLoading: false, error: error?.response?.data?.error || 'Not authenticated' });
    }
  },
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
      window.location.href = '/login';
    }
  }
}));
