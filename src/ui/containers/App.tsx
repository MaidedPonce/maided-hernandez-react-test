import React from 'react'
import 'styles/App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import NotFound from './NotFound'
import Products from './Products'
import Auth from 'ui/components/Auth/Auth'
import CreateProduct from './CreateProduct'
import ProductId from './ProductId'
import Users from './Users'

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route
            path='/login'
            element={<Login />}
          />
          {/* Privadas */}
          <Route element={<Auth />}>
            <Route
              path='/products'
              element={<Products />}
            />
            <Route
              path='/products/:id'
              element={<ProductId />}
            />
            <Route
              path='/products/create'
              element={<CreateProduct />}
            />
            <Route
              path='/users'
              element={<Users />}
            />
          </Route>
          {/* Not found */}
          <Route
            path='/*'
            element={<NotFound />}
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
