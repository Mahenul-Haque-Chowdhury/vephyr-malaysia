export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string[];
  image: string;
  category: "HOODIES" | "TEES" | "SHORTS" | "ACCESSORIES";
};

export const PRODUCTS: Product[] = [
  // HOODIES
  {
    id: 1,
    name: "STRUCTURAL HOODIE",
    price: 450,
    description:
      "Heavyweight cotton fleece in a structural silhouette. Dropped shoulders, cropped body, and elongated sleeves. Garment dyed and treated for a vintage hand-feel.",
    details: ["100% Cotton (480gsm)", "Boxy Fit", "Garment Dyed", "Made in Portugal"],
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop",
    category: "HOODIES",
  },
  {
    id: 2,
    name: "CLASSIC BLACK HOODIE",
    price: 420,
    description: "Classic black hoodie with premium cotton and a relaxed fit.",
    details: ["Premium Cotton", "Relaxed Fit", "Kangaroo Pocket"],
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop",
    category: "HOODIES",
  },
  {
    id: 3,
    name: "ZIP-UP HOODIE",
    price: 480,
    description: "Zip-up hoodie with a modern silhouette and soft fleece.",
    details: ["Soft Fleece", "Modern Silhouette", "Full Zip"],
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop",
    category: "HOODIES",
  },
  {
    id: 4,
    name: "OVERSIZED HOODIE",
    price: 500,
    description: "Oversized hoodie for maximum comfort and style.",
    details: ["Oversized Fit", "Premium Cotton", "Ribbed Cuffs"],
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=2070&auto=format&fit=crop",
    category: "HOODIES",
  },

  // TEES
  {
    id: 5,
    name: "OVERSIZED TEE",
    price: 120,
    description: "Oversized tee with a relaxed fit and soft jersey fabric.",
    details: ["Relaxed Fit", "Soft Jersey", "Crew Neck"],
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop",
    category: "TEES",
  },
  {
    id: 6,
    name: "GRAPHIC TEE",
    price: 140,
    description: "Graphic tee with bold print and premium cotton.",
    details: ["Bold Print", "Premium Cotton", "Regular Fit"],
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
    category: "TEES",
  },
  {
    id: 7,
    name: "CLASSIC WHITE TEE",
    price: 110,
    description: "Classic white tee for everyday wear.",
    details: ["Classic Fit", "Soft Cotton", "Crew Neck"],
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1887&auto=format&fit=crop",
    category: "TEES",
  },
  {
    id: 8,
    name: "VINTAGE TEE",
    price: 160,
    description: "Vintage tee with a faded wash and retro feel.",
    details: ["Faded Wash", "Retro Style", "Soft Fabric"],
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
    category: "TEES",
  },

  // SHORTS
  {
    id: 9,
    name: "TECHNICAL CARGO SHORTS",
    price: 380,
    description: "Technical cargo shorts with multiple pockets and durable fabric.",
    details: ["Multiple Pockets", "Durable Fabric", "Relaxed Fit"],
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=2070&auto=format&fit=crop",
    category: "SHORTS",
  },
  {
    id: 10,
    name: "ATHLETIC SHORTS",
    price: 200,
    description: "Athletic shorts for training and leisure.",
    details: ["Lightweight", "Quick Dry", "Elastic Waist"],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    category: "SHORTS",
  },
  {
    id: 11,
    name: "DENIM SHORTS",
    price: 220,
    description: "Denim shorts with classic styling and a raw hem.",
    details: ["Classic Denim", "Raw Hem", "Mid Rise"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2070&auto=format&fit=crop",
    category: "SHORTS",
  },
  {
    id: 12,
    name: "COTTON SHORTS",
    price: 180,
    description: "Cotton shorts for everyday comfort.",
    details: ["Soft Cotton", "Elastic Waist", "Above Knee"],
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=2070&auto=format&fit=crop",
    category: "SHORTS",
  },

  // ACCESSORIES
  {
    id: 13,
    name: "BALLISTIC VEST",
    price: 850,
    description: "Ballistic vest for statement layering.",
    details: ["Statement Piece", "Adjustable Fit", "Durable Material"],
    image:
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1888&auto=format&fit=crop",
    category: "ACCESSORIES",
  },
  {
    id: 14,
    name: "LEATHER BELT",
    price: 90,
    description: "Leather belt with a classic buckle.",
    details: ["Genuine Leather", "Classic Buckle", "Adjustable"],
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1888&auto=format&fit=crop",
    category: "ACCESSORIES",
  },
  {
    id: 15,
    name: "CANVAS TOTE BAG",
    price: 60,
    description: "Canvas tote bag for everyday carry.",
    details: ["Durable Canvas", "Large Capacity", "Shoulder Straps"],
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1888&auto=format&fit=crop",
    category: "ACCESSORIES",
  },
  {
    id: 16,
    name: "WOOL BEANIE",
    price: 40,
    description: "Wool beanie for warmth and style.",
    details: ["Soft Wool", "Ribbed Knit", "One Size"],
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1888&auto=format&fit=crop",
    category: "ACCESSORIES",
  },
];
