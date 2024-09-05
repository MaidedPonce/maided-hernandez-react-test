import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useProductsStore } from 'store/products/products.store'
import styles from './Product.module.scss'
import { useNavigate } from 'react-router-dom'

const Product: React.FC = () => {
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
    <section className={`${styles.productContainer} subContainer`}>
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
        <span>
          <strong>{product.category}</strong>
        </span>
      </div>
      <div className={styles.containerButtons}>
        <button
          className={`${styles.containerButtons} button`}
          onClick={handleEditClick}
        >
          Update
        </button>
        <button
          className={`${styles.containerButtons} button darkButton`}
          onClick={() => {
            navigate('/products', { replace: true })
            removeProduct(product.id)
          }}
        >
          Remove
        </button>
      </div>
      {update && (
        <form
          className={styles.updateForm}
          onSubmit={handleSubmit}
        >
          <label htmlFor='title'>Title</label>
          <input
            className='field'
            id='title'
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <label htmlFor='price'>Price</label>
          <input
            className='field'
            id='price'
            type='number'
            name='price'
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            className='field'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <label htmlFor='category'>Category</label>
          <input
            className='field'
            id='category'
            type='text'
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            required
          />
          <label htmlFor='image'>Image URL</label>
          <input
            className='field'
            id='image'
            type='text'
            name='image'
            value={formData.image}
            onChange={handleInputChange}
            required
          />
          <button
            type='submit'
            className='button darkButton'
          >
            Save
          </button>
          <button
            type='button'
            className='button'
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
