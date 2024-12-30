import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userRole: null,
      token: null,
      login: (role, token) => set({ isAuthenticated: true, userRole: role, token: token }),
      logout: () => set({ isAuthenticated: false, userRole: null, token: null }),
      setUserRole: (role) => {
        if (!get().userRole) {
          set({ userRole: role });
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for the storage
    }
  )
);

export default useAuthStore;
