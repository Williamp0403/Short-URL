import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  authLoading: true,

  setUser: ( user ) => set({ user, isAuthenticated: true,  authLoading: false }),
  clearUser: () => set({ user: null, isAuthenticated: false, authLoading: false }),
  setAuthLoading: (loading) => set({ authLoading: loading })
}))