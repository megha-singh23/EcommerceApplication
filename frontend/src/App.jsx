import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Component from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { useCart } from './context/CartContext.jsx'

import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import NotFound from './pages/NotFound.jsx'

import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ManageProducts from './pages/admin/ManageProducts.jsx'
import ManageCategories from './pages/admin/ManageCategories.jsx'
import ManageOrders from './pages/admin/ManageOrders.jsx'
import ManageUsers from './pages/admin/ManageUsers.jsx'

export default function App() {
  const { isAuthenticated } = useAuth()
  const { refreshCart } = useCart()

  useEffect(() => {
    refreshCart()
  }, [isAuthenticated, refreshCart])

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />

            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Component />
    </div>
  )
}
