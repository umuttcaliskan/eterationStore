import { act, renderHook } from '@testing-library/react'
import { useProductStore } from '../../store/productStore'

global.fetch = jest.fn()

describe('ProductStore', () => {
  beforeEach(() => {
    useProductStore.setState({
      products: [],
      loading: false,
      hasMore: true,
      page: 1
    })
    jest.clearAllMocks()
  })

  it('başlangıç durumu değerlerini doğru şekilde ayarlamalı', () => {
    const { result } = renderHook(() => useProductStore())

    expect(result.current.products).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.hasMore).toBe(true)
    expect(result.current.page).toBe(1)
  })

  it('fetchProducts fonksiyonu çağrıldığında loading durumunu güncellemeli', async () => {
    const mockProducts = [
      { id: '1', name: 'Test Product', price: '100', image: 'test.jpg', brand: 'Test Brand', model: 'Test Model' }
    ]
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts)
    })

    const { result } = renderHook(() => useProductStore())

    await act(async () => {
      await result.current.fetchProducts()
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.page).toBe(2)
  })

  it('ürünleri başarıyla yüklemeli ve durumu güncellemeli', async () => {
    const mockProducts = [
      { id: '1', name: 'Test Product', price: '100', image: 'test.jpg', brand: 'Test Brand', model: 'Test Model' }
    ]
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts)
    })

    const { result } = renderHook(() => useProductStore())

    await act(async () => {
      await result.current.fetchProducts()
    })

    expect(result.current.products.length).toBeGreaterThan(0)
    expect(result.current.products[0]).toHaveProperty('id')
    expect(result.current.products[0]).toHaveProperty('name')
    expect(result.current.products[0]).toHaveProperty('price')
  })
})
