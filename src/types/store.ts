export interface UIState {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isSearchOpen: boolean;

  authIntent?: "checkout" | "account" | "generic";
  authReturnTo?: string;
  
  // Actions
  toggleMenu: () => void;
  toggleCart: () => void;
  toggleAuth: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;

  openAuth: (params?: { intent?: "checkout" | "account" | "generic"; returnTo?: string }) => void;
  closeAuth: () => void;
  closeAll: () => void;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}
