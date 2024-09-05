import React, { useState } from 'react'
import styles from './LoginForm.module.scss'
import validatePassword, { isSamePassword } from 'utils/validate_password'
import validateEmail from 'utils/validate_email'
import { User } from 'store/user/user.type'
import { useUserStore } from 'store/user/user.store'
import { Navigate, useNavigate } from 'react-router-dom'
import { handleDecrypt } from 'utils/encrypt'
import toast from 'react-hot-toast'

const LoginForm: React.FC = () => {
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
  console.log(email)
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!validatePassword(user.password))
      return toast.error('There is an error with your password')
    if (!validateEmail(user.email))
      return toast.error('There is an error with your email')
    if (!isSamePassword(user.password, user.confirmPassword))
      return toast.error('Two password do not match')
    if (
      handleDecrypt(email) === user.email &&
      handleDecrypt(password) === user.password
    ) {
      setIsLogged(true)
      navigate('/products', { replace: true })
    } else {
      toast.error('There is an error with your email or password')
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
      className={`subContainer ${styles.loginForm}`}
    >
      <h1>Login</h1>
      <label
        className={styles.title}
        htmlFor='email'
      >
        Email
      </label>
      <input
        className='field'
        id='email'
        type='email'
        value={user.email}
        required
        placeholder='correo@dominio.com'
        autoComplete='on'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label
        className={styles.title}
        htmlFor='password'
      >
        Password
      </label>
      <input
        className='field'
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
      <label
        className={styles.title}
        htmlFor='confirmPassword'
      >
        Confirm password
      </label>

      <input
        className='field'
        type='password'
        id='confirmPassword'
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder='Confirm password'
        required
      />

      <button
        className='button darkButton'
        type='submit'
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
