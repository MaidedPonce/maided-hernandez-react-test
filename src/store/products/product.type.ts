export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type CreateProductType = {
  title: string
  price: number
  description: string
  image: string
  category: string
}

export type ProductStore = {
  products: Product[][]
  product: Product
  setProducts: (products: Product[][]) => void
  setProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  removeProduct: (productId: number) => void
}
