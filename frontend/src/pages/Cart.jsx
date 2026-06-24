import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()
  const [busyId, setBusyId] = useState(null)

  const handleQtyChange = async (itemId, qty) => {
    setBusyId(itemId)
    try {
      await updateQuantity(itemId, qty)
    } finally {
      setBusyId(null)
    }
  }

  const handleRemove = async (itemId) => {
    setBusyId(itemId)
    try {
      await removeItem(itemId)
    } finally {
      setBusyId(null)
    }
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add a few things you like and they'll show up here.</p>
        <Link to="/" className="btn btn-primary">Browse the catalog</Link>
      </div>
    )
  }

  return (
    <div className="detail-grid">
      <div>
        <h1>Your cart</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="cart-row-product">
                    <div className="cart-thumb">
                      {item.productImageUrl && <img src={item.productImageUrl} alt={item.productName} />}
                    </div>
                    <span>{item.productName}</span>
                  </div>
                </td>
                <td className="mono">₹{Number(item.price).toFixed(2)}</td>
                <td>
                  <div className="qty-control">
                    <button disabled={busyId === item.id} onClick={() => handleQtyChange(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button disabled={busyId === item.id} onClick={() => handleQtyChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </td>
                <td className="mono">₹{Number(item.subtotal).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm" disabled={busyId === item.id} onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-summary">
        <h3>Order summary</h3>
        <div className="summary-row">
          <span>Items</span>
          <span>{cart.items.reduce((s, i) => s + i.quantity, 0)}</span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>₹{Number(cart.totalAmount).toFixed(2)}</span>
        </div>
        <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}
