import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from 'store/user/user.store'
import Header from '../Layout/Header'

const Auth: React.FC = () => {
  const isLogged = useUserStore((state) => state.isLogged)
  if (!isLogged) return <Navigate to='/login' />
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Auth
