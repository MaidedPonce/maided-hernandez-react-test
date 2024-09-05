import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useUserStore } from 'store/user/user.store'
import { handleDecrypt, handleEncrypt } from 'utils/encrypt'

const User = () => {
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
    <div>
      <h1>Hi, {formData.email}!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default User
