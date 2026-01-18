import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  isGuest: boolean;
  setUser: (user: AuthUser | null) => void;
  setGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isGuest: false,
      setUser: (user) => set({ user, isGuest: false }),
      setGuest: () => set({ user: null, isGuest: true }),
      logout: () => set({ user: null, isGuest: false }),
    }),
    {
      name: "vephyr-auth",
    }
  )
);
