import { create } from 'zustand'

interface Product {
  id: string
  name: string
  image: string
  price: string
  brand: string
  model: string
}

interface ProductStore {
  products: Product[]
  loading: boolean
  hasMore: boolean
  page: number
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  hasMore: true,
  page: 1,

  fetchProducts: async () => {
    const { page, loading, hasMore } = get()
    if (loading || !hasMore) return

    try {
      set({ loading: true })
      const response = await fetch(
        `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=12`
      )
      const data = await response.json()
      
      if (data.length === 0) {
        set({ hasMore: false })
        return
      }

      set((state) => ({
        products: [...state.products, ...data],
        page: state.page + 1,
      }))
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error)
    } finally {
      set({ loading: false })
    }
  },
})) 