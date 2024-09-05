import { api } from 'config/api'

export async function getProducts({ signal }: { signal?: AbortSignal }) {
  const response = await fetch(`${api}`, {
    method: 'GET',
    signal,
  })
  return response.json()
}

export async function getProduct(id: string) {
  const response = await fetch(`${api}/${id}`, {
    method: 'GET',
  })
  return response.json()
}

export async function createProduct() {
  const response = await fetch(`${api}`, {
    method: 'GET',
  })
  return response.json()
}
