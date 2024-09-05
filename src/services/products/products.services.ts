import { api } from 'config/api'
import { CreateProductType, Product } from 'store/products/product.type'

interface GetProductsParams {
  signal?: AbortSignal
}

export async function getProducts({
  signal,
}: GetProductsParams): Promise<Product[]> {
  const response = await fetch(`${api}`, {
    method: 'GET',
    signal,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const products: Product[] = await response.json()
  return products
}

export async function createProduct(
  body: CreateProductType
): Promise<CreateProductType> {
  const response = await fetch(`${api}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const result: CreateProductType = await response.json()
  return result
}
