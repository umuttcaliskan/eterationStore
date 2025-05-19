import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoriteStore } from '../../store/favoriteStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('FavoriteStore', () => {
  beforeEach(() => {
    useFavoriteStore.setState({ favorites: [] });
    jest.clearAllMocks();
  });

  it('başlangıçta boş favoriler listesi olmalı', () => {
    const store = useFavoriteStore.getState();
    expect(store.favorites).toEqual([]);
  });

  it('ürün favorilere eklenebilmeli', () => {
    const store = useFavoriteStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToFavorites(testProduct);
    const updatedStore = useFavoriteStore.getState();

    expect(updatedStore.favorites).toHaveLength(1);
    expect(updatedStore.favorites[0]).toEqual(testProduct);
  });

  it('ürün favorilerden çıkarılabilmeli', () => {
    const store = useFavoriteStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToFavorites(testProduct);
    store.removeFromFavorites('1');
    const updatedStore = useFavoriteStore.getState();

    expect(updatedStore.favorites).toHaveLength(0);
  });

  it('ürünün favori olup olmadığı kontrol edilebilmeli', () => {
    const store = useFavoriteStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToFavorites(testProduct);
    const updatedStore = useFavoriteStore.getState();

    expect(updatedStore.isFavorite('1')).toBe(true);
    expect(updatedStore.isFavorite('2')).toBe(false);
  });

  it('favoriler AsyncStorage\'a kaydedilmeli', async () => {
    const store = useFavoriteStore.getState();
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    store.addToFavorites(testProduct);
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([testProduct])
    );
  });

  it('favoriler AsyncStorage\'dan yüklenebilmeli', async () => {
    const testProduct = {
      id: '1',
      name: 'Test Ürün',
      image: 'test.jpg',
      price: '100',
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([testProduct]));

    const store = useFavoriteStore.getState();
    await store.loadFavorites();
    const updatedStore = useFavoriteStore.getState();

    expect(updatedStore.favorites).toHaveLength(1);
    expect(updatedStore.favorites[0]).toEqual(testProduct);
  });
});
