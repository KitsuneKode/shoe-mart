import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchProducts: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      set({ products, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      });
    }
  },
}));
