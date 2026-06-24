import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import Loading from '../components/Loading.jsx'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data.content))
      .catch(() => setError('Could not load your orders.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading label="Loading your orders" />
  if (error) return <div className="alert alert-error">{error}</div>

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h3>No orders yet</h3>
        <p>Orders you place will show up here.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Your orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-card-head">
            <div>
              <span className="order-id">Order #{order.id}</span>
              <div className="text-muted" style={{ fontSize: 13 }}>
                {new Date(order.orderDate).toLocaleString()}
              </div>
            </div>
            <span className={`status-badge status-${order.status}`}>{order.status}</span>
          </div>

          {order.items.map((item, idx) => (
            <div key={idx} className="order-line">
              <span>{item.productName} <span className="qty">×{item.quantity}</span></span>
              <span className="mono">₹{Number(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="summary-total" style={{ marginTop: 10 }}>
            <span>Total</span>
            <span>₹{Number(order.totalAmount).toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
