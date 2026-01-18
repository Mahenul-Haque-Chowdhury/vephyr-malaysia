import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/store';

function normalizeCartId(id: string | number): string {
  return String(id);
}

function normalizeCartSize(size: string): string {
  return String(size).trim();
}

function getCartLineKey(id: string | number, size: string): string {
  return `${normalizeCartId(id)}|${normalizeCartSize(size)}`;
}

function dedupeCartItems(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];

  const byKey = new Map<string, CartItem>();

  for (const raw of items) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Partial<CartItem> & { id?: string | number };
    if (item.id === undefined || item.size === undefined) continue;

    const id = normalizeCartId(item.id);
    const size = normalizeCartSize(item.size);
    const key = getCartLineKey(id, size);

    const quantity = typeof item.quantity === 'number' && Number.isFinite(item.quantity) ? item.quantity : 1;
    const price = typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : 0;

    const next: CartItem = {
      id,
      name: item.name ?? '',
      price,
      image: item.image ?? '',
      quantity,
      size,
    };

    const existing = byKey.get(key);
    if (existing) {
      existing.quantity += next.quantity;
    } else {
      byKey.set(key, next);
    }
  }

  return Array.from(byKey.values());
}

interface CartState {
  items: CartItem[];
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { id: string | number }) => void;
  removeItem: (id: string | number, size: string) => void;
  updateQuantity: (id: string | number, size: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const normalizedId = normalizeCartId(item.id);
        const normalizedSize = normalizeCartSize(item.size);

        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === normalizedId && i.size === normalizedSize
          );
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === normalizedId && i.size === normalizedSize
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          
          return {
            items: [
              ...state.items,
              {
                ...item,
                id: normalizedId,
                size: normalizedSize,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: (id, size) => {
        const normalizedId = normalizeCartId(id);
        const normalizedSize = normalizeCartSize(size);
        set((state) => ({
          items: state.items.filter((i) => !(i.id === normalizedId && i.size === normalizedSize)),
        }));
      },

      updateQuantity: (id, size, quantity) => {
        const normalizedId = normalizeCartId(id);
        const normalizedSize = normalizeCartSize(size);
        if (quantity < 1) {
          get().removeItem(normalizedId, normalizedSize);
          return;
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.id === normalizedId && i.size === normalizedSize ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'vephyr-cart',
      version: 2,
      migrate: (persistedState) => {
        const state = (persistedState ?? {}) as { items?: unknown };
        return {
          ...(state as object),
          items: dedupeCartItems(state.items),
        } as unknown as CartState;
      },
      partialize: (state) => ({ items: state.items }),
    }
  )
);
