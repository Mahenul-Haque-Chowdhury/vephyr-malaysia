export type AdminProductStatus = "active" | "draft";

export type AdminProduct = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: AdminProductStatus;
  image: string;
  category: string;
};

export const adminMockProducts: AdminProduct[] = [
  {
    id: "1",
    name: "Oversized Heavyweight Tee",
    sku: "VP-SS26-001",
    price: 185,
    stock: 124,
    status: "active",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
    category: "Tops",
  },
  {
    id: "2",
    name: "Structural Hoodie",
    sku: "VP-SS26-002",
    price: 450,
    stock: 56,
    status: "active",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200",
    category: "Tops",
  },
  {
    id: "3",
    name: "Technical Cargo Pants",
    sku: "VP-SS26-003",
    price: 380,
    stock: 3,
    status: "active",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200",
    category: "Bottoms",
  },
  {
    id: "4",
    name: "Minimal Cap",
    sku: "VP-SS26-004",
    price: 95,
    stock: 0,
    status: "draft",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Archive Bomber Jacket",
    sku: "VP-SS26-005",
    price: 680,
    stock: 28,
    status: "active",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200",
    category: "Outerwear",
  },
];
