import axiosInstance from '../utils/axiosInstance.js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      tokens: null, // { accessToken, refreshToken }
      isAuthenticated: false,

      // Login function (store user + tokens)
      login: (userData, tokens) =>
        set({
          user: userData,
          tokens: tokens,
          isAuthenticated: true,
        }),

      // Logout function
      logout: async () => {
        try {
          const { tokens } = useAuthStore.getState(); // get current tokens

          await axiosInstance.post(
            '/users/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${tokens?.accessToken}`, // send token
              },
              withCredentials: true, // keep this in case backend clears cookies too
            }
          );

          // Clear state
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
          });

          return { success: true };
        } catch (error) {
          console.error('Logout failed:', error);
          return {
            success: false,
            error: error.response?.data?.message || 'Logout failed',
          };
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

// 🔥 Attach token automatically for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const { tokens } = useAuthStore.getState();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
