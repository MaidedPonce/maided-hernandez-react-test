import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useUserStore } from 'store/user/user.store'
import { handleDecrypt, handleEncrypt } from 'utils/encrypt'
import styles from './User.module.scss'
const User: React.FC = () => {
  const email = useUserStore((state) => state.email)
  const password = useUserStore((state) => state.password)
  const setUser = useUserStore((state) => state.setUser)

  const [formData, setFormData] = useState({
    email: handleDecrypt(email),
    password: handleDecrypt(password),
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setUser(handleEncrypt(formData.email), handleEncrypt(formData.password))
  }

  return (
    <section className='subContainer'>
      <h1>Hi, {formData.email}!</h1>
      <form
        className={styles.userForm}
        onSubmit={handleSubmit}
      >
        <label htmlFor='email'>
          <strong>Email</strong>
        </label>
        <input
          className='field'
          id='email'
          type='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label className='password'>
          <strong>Password</strong>
        </label>
        <input
          className='field'
          id='password'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button
          className='button'
          type='submit'
        >
          Update
        </button>
      </form>
    </section>
  )
}

export default User
