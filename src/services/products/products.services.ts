import { api } from 'config/api'
import { CreateProductType } from 'store/products/product.type'

export async function getProducts({ signal }: { signal?: AbortSignal }) {
  const response = await fetch(`${api}`, {
    method: 'GET',
    signal,
  })
  return response.json()
}

export async function createProduct(body: CreateProductType) {
  const response = await fetch(`${api}`, {
    method: 'POST',
    body: JSON.stringify({ ...body }),
  })
  return response.json()
}
