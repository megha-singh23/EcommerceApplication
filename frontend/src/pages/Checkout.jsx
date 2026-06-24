import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Checkout() {
  const { cart, refreshCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const hasSavedAddress = !!user?.address?.trim()

  // Default to the saved address when one exists; otherwise fall straight
  // into the "enter a new address" textarea.
  const [useSaved, setUseSaved] = useState(hasSavedAddress)
  const [newAddress, setNewAddress] = useState('')
  const [error, setError] = useState('')
  const [placing, setPlacing] = useState(false)

  const shippingAddress = useSaved ? user.address : newAddress

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError('')

    if (!shippingAddress || !shippingAddress.trim()) {
      setError('Please provide a shipping address.')
      return
    }

    setPlacing(true)
    try {
      const res = await api.post('/orders', { shippingAddress })
      await refreshCart()
      navigate('/orders', { state: { placedOrderId: res.data.id } })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place your order.')
    } finally {
      setPlacing(false)
    }
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nothing to check out</h3>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="detail-grid">
      <div>
        <h1>Checkout</h1>
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handlePlaceOrder}>
          <div className="field">
            <label>Shipping address</label>

            {hasSavedAddress && (
              <label className="address-option">
                <input
                  type="radio"
                  name="addressChoice"
                  checked={useSaved}
                  onChange={() => setUseSaved(true)}
                />
                <div className="address-option-body">
                  <span className="address-option-title">Use my saved address</span>
                  <p className="saved-address-text">{user.address}</p>
                </div>
              </label>
            )}

            <label className="address-option">
              <input
                type="radio"
                name="addressChoice"
                checked={!useSaved}
                onChange={() => setUseSaved(false)}
              />
              <div className="address-option-body">
                <span className="address-option-title">
                  {hasSavedAddress ? 'Ship to a different address' : 'Enter a shipping address'}
                </span>
                {!useSaved && (
                  <textarea
                    rows={4}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Street, city, state, ZIP"
                    autoFocus
                  />
                )}
              </div>
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={placing}>
            {placing ? 'Placing order…' : 'Confirm & place order'}
          </button>
        </form>
      </div>

      <div className="cart-summary">
        <h3>Order summary</h3>
        {cart.items.map((item) => (
          <div key={item.id} className="order-line">
            <span>{item.productName} <span className="qty">×{item.quantity}</span></span>
            <span className="mono">₹{Number(item.subtotal).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-total" style={{ marginTop: 12 }}>
          <span>Total</span>
          <span>₹{Number(cart.totalAmount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
