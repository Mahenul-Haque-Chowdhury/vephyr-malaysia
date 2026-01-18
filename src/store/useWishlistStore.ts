import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface WishlistState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      isInWishlist: (id) => {
        return !!get().items.find((i) => i.id === id);
      },
    }),
    {
      name: 'vephyr-wishlist-storage',
    }
  )
);
