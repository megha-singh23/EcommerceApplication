import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import AdminLayout from '../../components/AdminLayout.jsx'
import Loading from '../../components/Loading.jsx'

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export default function ManageOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/admin/orders', { params: { size: 50 } })
      .then((res) => setOrders(res.data.content))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId)
    try {
      await api.put(`/orders/${orderId}/status`, { status })
      load()
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <AdminLayout title="Orders">
      {loading ? (
        <Loading label="Loading orders" />
      ) : orders.length === 0 ? (
        <p className="text-muted">No orders have been placed yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Total</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="mono">#{o.id}</td>
                <td>{o.username}</td>
                <td className="mono">₹{Number(o.totalAmount).toFixed(2)}</td>
                <td className="text-muted">{new Date(o.orderDate).toLocaleDateString()}</td>
                <td>
                  <select
                    value={o.status}
                    disabled={updatingId === o.id}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
