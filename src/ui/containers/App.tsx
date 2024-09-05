import React from 'react'
import 'styles/App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import NotFound from './NotFound'
import Products from './Products'
import Auth from 'ui/components/Auth/Auth'
import CreateProduct from './CreateProduct'

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
              element={<NotFound />}
            />
            <Route
              path='/products/create'
              element={<CreateProduct />}
            />
            <Route
              path='/users'
              element={<NotFound />}
            />
          </Route>
          <Route
            path='/products'
            element={<Products />}
          />
          <Route
            path='/products/:id'
            element={<NotFound />}
          />
          <Route
            path='/products/create'
            element={<NotFound />}
          />
          <Route
            path='/users'
            element={<NotFound />}
          />
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
