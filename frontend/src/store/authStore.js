import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userRole: null,
      login: (role) => set({ isAuthenticated: true, userRole: role }),
      logout: () => {
        Cookies.remove("sessionId");
        const userRole = get().userRole;
        let redirectPath = "/login";
        if (userRole === "main") {
          redirectPath = "/admin/login";
        } else if (userRole === "sub") {
          redirectPath = "/subadmin/login";
        }
        window.location.href = redirectPath;
        set({ isAuthenticated: false, userRole: null });
      },
      setUserRole: (role) => {
        set({ userRole: role });
      },
    }),
    {
      name: "auth-storage", // unique name for the storage
    },
  ),
);

export default useAuthStore;
