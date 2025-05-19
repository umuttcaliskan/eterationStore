import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  loadCart: () => Promise<void>;
  addItem: (item: any) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  loadCart: async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        set({ items: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Sepet yüklenirken hata oluştu:', error);
    }
  },

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }

      AsyncStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter(item => item.id !== productId);
      AsyncStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeFromCart(productId);
      return;
    }
    
    set((state) => {
      const newItems = state.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      AsyncStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  },

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) => set((state) => ({ 
    items: state.items.filter(item => item.id !== itemId) 
  })),
  clearCart: () => set({ items: [] }),
  getItemQuantity: (productId) => {
    const item = get().items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  },
})); 