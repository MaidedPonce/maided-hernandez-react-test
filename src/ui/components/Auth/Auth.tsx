import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from 'store/user/user.store'

const Auth: React.FC = () => {
  const email = useUserStore((store) => store.email)
  if (!email) return <Navigate to='/login' />
  return <Outlet />
}

export default Auth
