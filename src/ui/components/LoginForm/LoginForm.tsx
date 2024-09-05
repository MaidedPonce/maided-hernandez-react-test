import React, { useState } from 'react'
import styles from './LoginForm.module.scss'
import validatePassword, { isSamePassword } from 'utils/validate_password'
import validateEmail from 'utils/validate_email'
import { User } from 'store/user/user.type'
import { useUserStore } from 'store/user/user.store'
import { Navigate, useNavigate } from 'react-router-dom'
import { handleDecrypt } from 'utils/encrypt'

const LoginForm = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const email = useUserStore((state) => state.email)
  const password = useUserStore((state) => state.password)
  const setIsLogged = useUserStore((state) => state.setIsLogged)
  const isLogged = useUserStore((state) => state.isLogged)

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!validatePassword(user.password)) return
    if (!validateEmail(user.email)) return
    if (!isSamePassword(user.password, user.confirmPassword)) return
    if (
      handleDecrypt(email) === user.email &&
      handleDecrypt(password) === user.password
    ) {
      setIsLogged(true)
      navigate('/products', { replace: true })
    }
  }

  if (isLogged) {
    return (
      <Navigate
        to='/products'
        replace
      />
    )
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
