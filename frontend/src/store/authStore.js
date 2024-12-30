import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: null,
      login: (role) => set({ isAuthenticated: true, userRole: role }),
      logout: () => set({ isAuthenticated: false, userRole: null }),
    }),
    {
      name: 'auth-storage', // unique name for the storage
    }
  )
);

export default useAuthStore;
