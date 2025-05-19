import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

interface FavoriteStore {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  loadFavorites: () => Promise<void>;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  
  loadFavorites: async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        set({ favorites: JSON.parse(savedFavorites) });
      }
    } catch (error) {
      console.error('Favoriler yüklenirken hata oluştu:', error);
    }
  },

  addToFavorites: (product) => {
    set((state) => {
      const newFavorites = [...state.favorites, product];
      AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    });
  },

  removeFromFavorites: (productId) => {
    set((state) => {
      const newFavorites = state.favorites.filter((item) => item.id !== productId);
      AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    });
  },

  isFavorite: (productId) => {
    return get().favorites.some((item) => item.id === productId);
  },
})); 