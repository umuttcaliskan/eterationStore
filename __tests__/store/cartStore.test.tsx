import { useCartStore } from '../../store/cartStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('CartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    jest.clearAllMocks();
  });

  it('başlangıçta boş sepet olmalı', () => {
    const store = useCartStore.getState();
    expect(store.items).toEqual([]);
  });

  it('ürün sepete eklenebilmeli', () => {
    const store = useCartStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToCart(testProduct);
    const updatedStore = useCartStore.getState();

    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0]).toEqual({
      ...testProduct,
      quantity: 1,
    });
  });

  it('ürün miktarı güncellenebilmeli', () => {
    const store = useCartStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToCart(testProduct);
    store.updateQuantity('1', 3);
    const updatedStore = useCartStore.getState();

    expect(updatedStore.items[0].quantity).toBe(3);
  });

  it('toplam fiyat doğru hesaplanmalı', () => {
    const store = useCartStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToCart(testProduct);
    store.updateQuantity('1', 2);
    const updatedStore = useCartStore.getState();

    expect(updatedStore.getTotalPrice()).toBe(200);
  });

  it('ürün sepetten çıkarılabilmeli', () => {
    const store = useCartStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToCart(testProduct);
    store.removeFromCart('1');
    const updatedStore = useCartStore.getState();

    expect(updatedStore.items).toHaveLength(0);
  });
});
