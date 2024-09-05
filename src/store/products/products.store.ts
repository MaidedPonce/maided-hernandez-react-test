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
  setProducts: (products: Product[]) =>
    set({
      products,
    }),
})

export const useProductsStore = create<ProductStore>()(
  devtools(persist(immer(storeApi), { name: 'product-store' }))
)
