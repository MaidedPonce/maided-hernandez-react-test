import React, { useRef, useState } from 'react'
import { createProduct } from 'services/products/products.services'
import { Product } from 'store/products/product.type'
import { useProductsStore } from 'store/products/products.store'
import styles from './CreateProduct.module.scss'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

const CreateProductForm: React.FC = () => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  })
  const [imagePreview, setImagePreview] = useState('')
  const setProducts = useProductsStore((state) => state.setProducts)
  const products = useProductsStore((state) => state.products)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addProduct = (newProduct: Product) => {
    const lastIndex = products.length - 1
    const lastCategory = products[lastIndex]

    if (lastCategory.length < 5) {
      const updatedProducts = [
        ...products.slice(0, lastIndex),
        [...lastCategory, newProduct],
      ]
      setProducts(updatedProducts)
    } else {
      const updatedProducts = [...products, [newProduct]]
      setProducts(updatedProducts)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProduct({ ...product, image: reader.result })
          setImagePreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate product data
    if (
      !product.title ||
      product.price <= 0 ||
      !product.description ||
      !product.category ||
      !product.image
    ) {
      toast.error('All fields are required and price must be greater than 0.')
      return
    }
    setLoading(true)
    try {
      await createProduct(product)
      const uuid = uuidv4()
      const newId = parseInt(uuid.replace(/-/g, '').substring(0, 10), 16)
      const parsedData = {
        ...product,
        id: newId,
        rating: {
          rate: 0,
          count: 0,
        },
      }
      addProduct(parsedData)
      setProduct({
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
      })
      setImagePreview('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      toast.error('Error creating product')
      console.error('Error creating product:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className='subContainer'>
      <form
        className={styles.createProductForm}
        onSubmit={onSubmit}
      >
        <label htmlFor='title'>Title</label>
        <input
          className='field'
          id='title'
          type='text'
          value={product.title}
          required
          placeholder='T-shirt'
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <label htmlFor='price'>Price</label>
        <input
          className='field'
          id='price'
          type='text'
          value={product.price}
          required
          placeholder='20'
          onChange={(e) => {
            const value = Number(e.target.value)
            if (Number.isNaN(value)) return
            setProduct({ ...product, price: value })
          }}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          className='field'
          id='description'
          value={product.description}
          required
          placeholder='This t-shirt....'
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <label htmlFor='category'>Category</label>
        <input
          className='field'
          id='category'
          type='text'
          value={product.category}
          required
          placeholder='Clothes'
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <label htmlFor='image'>Image</label>
        <input
          className='field'
          id='image'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt='Product Preview'
            style={{ maxWidth: '200px', marginTop: '10px' }}
          />
        )}
        <button
          type='submit'
          disabled={loading}
          className={loading ? 'button disabled' : 'button darkButton'}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>{' '}
    </section>
  )
}

export default CreateProductForm
