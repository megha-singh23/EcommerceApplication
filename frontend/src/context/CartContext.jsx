import React, { createContext, useContext, useState, useCallback } from 'react'
import api from '../api/axiosConfig'
import { useAuth } from './AuthContext.jsx'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [cart, setCart] = useState({ items: [], totalAmount: 0 })
  const [loading, setLoading] = useState(false)

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalAmount: 0 })
      return
    }
    setLoading(true)
    try {
      const res = await api.get('/cart')
      setCart(res.data)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  const addToCart = async (productId, quantity = 1) => {
    const res = await api.post('/cart/items', { productId, quantity })
    setCart(res.data)
  }

  const updateQuantity = async (itemId, quantity) => {
    const res = await api.put(`/cart/items/${itemId}?quantity=${quantity}`)
    setCart(res.data)
  }

  const removeItem = async (itemId) => {
    const res = await api.delete(`/cart/items/${itemId}`)
    setCart(res.data)
  }

  const clearCart = async () => {
    await api.delete('/cart')
    setCart({ items: [], totalAmount: 0 })
  }

  const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0

  return (
    <CartContext.Provider value={{ cart, loading, refreshCart, addToCart, updateQuantity, removeItem, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
