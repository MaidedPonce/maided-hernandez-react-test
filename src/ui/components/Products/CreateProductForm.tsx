import React, { useState } from 'react'

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  })
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        type='text'
        value={product.title}
        required
        placeholder='T-shirt'
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <input
        id='price'
        type='number'
        value={product.price}
        required
        placeholder='20'
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
      />
      <input
        id='description'
        type='text'
        value={product.description}
        required
        placeholder='This t-shirt....'
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        id='cagtegory'
        type='text'
        value={product.title}
        required
        placeholder='Clothes'
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />

      <button type='submit'>Enter</button>
    </form>
  )
}

export default CreateProductForm
