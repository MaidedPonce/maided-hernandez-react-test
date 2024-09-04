import React, { useState } from 'react'
import styles from './LoginForm.module.scss'
import validatePassword, { isSamePassword } from 'utils/validate_password'
import validateEmail from 'utils/validate_email'
import { User } from 'store/user/user.type'
import { useUserStore } from 'store/user/user.store'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'

const LoginForm = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const setUserStore = useUserStore((state) => state.setUser)
  const navigate = useNavigate()

  const handleEncrypt = (password: string) => {
    const encrypted = CryptoJS.AES.encrypt(password, 'secretKey').toString()
    return encrypted
  }

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!validatePassword(user.password)) return
    if (!validateEmail(user.email)) return
    if (!isSamePassword(user.password, user.confirmPassword)) return
    const passwordEncrypted = handleEncrypt(user.password)
    const parsedUser = {
      ...user,
      password: passwordEncrypted,
      confirmPassword: passwordEncrypted,
    }
    setUserStore(parsedUser)
    navigate('/products', { replace: true })
  }
  return (
    <form
      onSubmit={onSubmit}
      className={styles.loginForm}
    >
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        value={user.email}
        required
        placeholder='correo@dominio.com'
        autoComplete='on'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        value={user.password}
        required
        type='password'
        autoComplete='current-password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='*******'
        minLength={6}
        maxLength={12}
      />
      <label htmlFor='confirmPassword'>Confirm password</label>

      <input
        type='password'
        id='confirmPassword'
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder='Confirm password'
        required
      />

      <button type='submit'>Enter</button>
    </form>
  )
}

export default LoginForm
