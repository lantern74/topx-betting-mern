import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: null,
      login: (role) => set({ isAuthenticated: true, userRole: role }),
      logout: () => {
        Cookies.remove('sessionId');
        set({ isAuthenticated: false, userRole: null });
      },
      setUserRole: (role) => {
        set({ userRole: role });
      },
    }),
    {
      name: 'auth-storage', // unique name for the storage
    }
  )
);

export default useAuthStore;
