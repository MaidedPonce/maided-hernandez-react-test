import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useProductsStore } from 'store/products/products.store'
import styles from './Product.module.scss'
import { useNavigate } from 'react-router-dom'

const Product = () => {
  const [update, setUpdate] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  })

  const product = useProductsStore((state) => state.product)
  const updateProduct = useProductsStore((state) => state.updateProduct)
  const removeProduct = useProductsStore((state) => state.removeProduct)
  const navigate = useNavigate()

  // Handler for form input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handler for form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updatedProduct = {
      ...product,
      ...formData,
    }
    updateProduct(updatedProduct)
    setUpdate(false)
  }

  // Handler for showing the update form
  const handleEditClick = () => {
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    })
    setUpdate(true)
  }

  return (
    <section>
      <figure className={styles.productBackground}>
        <img
          src={product.image}
          alt={product.description}
          className={styles.image}
        />
      </figure>
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div>{product.category}</div>
      </div>
      <div>
        <button onClick={handleEditClick}>Update</button>
        <button
          onClick={() => {
            navigate('/products', { replace: true })
            removeProduct(product.id)
          }}
        >
          Remove
        </button>
      </div>
      {update && (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type='text'
              name='category'
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type='text'
              name='image'
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type='submit'>Save</button>
          <button
            type='button'
            onClick={() => setUpdate(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </section>
  )
}

export default Product
