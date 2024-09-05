import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Product, ProductStore } from './product.type'

const STATE = {
  products: [],
  product: {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  },
}

const storeApi: StateCreator<
  ProductStore,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  ...STATE,
  setProducts: (products: Product[][]) => {
    set({
      products,
    })
  },
  setProduct: (product: Product) => {
    set({
      product,
    })
  },
  updateProduct: (updatedProduct: Product) => {
    set((state) => {
      const updatedProducts = state.products.map((productArray) =>
        productArray.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      )
      return { products: updatedProducts, product: updatedProduct }
    })
  },
  removeProduct: (productId: number) => {
    set((state) => {
      const updatedProducts = state.products.map((productArray) =>
        productArray.filter((product) => product.id !== productId)
      )
      return {
        products: updatedProducts,
        product:
          state.product.id === productId ? ({} as Product) : state.product,
      }
    })
  },
})

export const useProductsStore = create<ProductStore>()(
  devtools(persist(immer(storeApi), { name: 'product-store' }))
)
