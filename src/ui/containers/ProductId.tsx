import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductsStore } from 'store/products/products.store'
import Product from 'ui/components/Products/Product/Product'

const ProductId: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const productsId = useProductsStore((state) => state.product)
  useEffect(() => {
    const param = Number(id)
    console.log(param)
    if (Number.isNaN(param) || param !== productsId.id) return navigate('/404')
  }, [])
  return (
    <main className='container'>
      <Product />
    </main>
  )
}

export default ProductId
