import { create } from 'zustand';
import api from '../services/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: { _id: string; username: string } | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  loading: true,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { username, password });
      console.log('Login response:', response.data); // Log the full response
      const { token, _id, username: loggedInUsername } = response.data;
      localStorage.setItem('token', token);
      set({
        token,
        isAuthenticated: true,
        user: { _id, username: loggedInUsername },
        loading: false,
        error: null,
      });
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      set({
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null, loading: false, error: null });
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      console.log('Auth check: token in localStorage:', token); // Log token
      if (token) {
        const response = await api.get('/auth/profile');
        set({
          user: response.data,
          isAuthenticated: true,
          token,
          loading: false,
          error: null,
        });
      } else {
        set({ isAuthenticated: false, user: null, loading: false, error: null });
      }
    } catch (err: any) {
      // Enhanced error logging
      console.error('Auth check failed:', err);
      if (err.response) {
        console.error('Auth check error response:', err.response.data, 'Status:', err.response.status);
        // TEMP: Show error in alert for debugging
        alert('Auth check error: ' + JSON.stringify(err.response.data) + '\nStatus: ' + err.response.status);
        // Only logout if 401 or 403
        if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem('token');
          set({ isAuthenticated: false, user: null, loading: false, error: 'Authentication failed. Please log in again.' });
        } else {
          set({ loading: false, error: 'Auth check failed: ' + (err.response.data?.message || 'Unknown error') });
        }
      } else {
        set({ loading: false, error: 'Auth check failed: ' + (err.message || 'Unknown error') });
      }
    }
  },
}));

export default useAuthStore;
