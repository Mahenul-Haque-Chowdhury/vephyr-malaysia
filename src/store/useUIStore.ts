import { create } from 'zustand';
import { UIState } from '@/types/store';

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isCartOpen: false,
  isAuthOpen: false,
  isSearchOpen: false,
  authIntent: undefined,
  authReturnTo: undefined,

  toggleMenu: () => set((state) => ({ 
    isMenuOpen: !state.isMenuOpen, 
    isCartOpen: false, 
    isAuthOpen: false,
    isSearchOpen: false 
  })),

  toggleCart: () => set((state) => ({ 
    isCartOpen: !state.isCartOpen, 
    isMenuOpen: false, 
    isAuthOpen: false,
    isSearchOpen: false 
  })),

  toggleAuth: () => set((state) => ({ 
    isAuthOpen: !state.isAuthOpen, 
    isMenuOpen: false, 
    isCartOpen: false,
    isSearchOpen: false,
    authIntent: state.isAuthOpen ? undefined : state.authIntent,
    authReturnTo: state.isAuthOpen ? undefined : state.authReturnTo,
  })),

  toggleSearch: () => set((state) => ({ 
    isSearchOpen: !state.isSearchOpen, 
    isMenuOpen: false, 
    isCartOpen: false, 
    isAuthOpen: false 
  })),

  closeSearch: () => set({ isSearchOpen: false }),

  openAuth: (params) =>
    set(() => ({
      isAuthOpen: true,
      isMenuOpen: false,
      isCartOpen: false,
      isSearchOpen: false,
      authIntent: params?.intent ?? "generic",
      authReturnTo: params?.returnTo,
    })),

  closeAuth: () =>
    set(() => ({
      isAuthOpen: false,
      authIntent: undefined,
      authReturnTo: undefined,
    })),

  closeAll: () => set({ 
    isMenuOpen: false, 
    isCartOpen: false, 
    isAuthOpen: false,
    isSearchOpen: false,
    authIntent: undefined,
    authReturnTo: undefined,
  })
}));
