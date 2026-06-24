import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import AdminLayout from '../../components/AdminLayout.jsx'
import Loading from '../../components/Loading.jsx'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/products', { params: { size: 1 } }),
      api.get('/admin/orders', { params: { size: 1 } }),
      api.get('/admin/users'),
    ]).then(([productsRes, ordersRes, usersRes]) => {
      setStats({
        productCount: productsRes.data.totalElements,
        orderCount: ordersRes.data.totalElements,
        userCount: usersRes.data.length,
      })
    }).finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout title="Overview">
      {loading ? (
        <Loading label="Loading dashboard" />
      ) : (
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="label">Products</div>
            <div className="value">{stats.productCount}</div>
          </div>
          <div className="kpi-card">
            <div className="label">Orders</div>
            <div className="value">{stats.orderCount}</div>
          </div>
          <div className="kpi-card">
            <div className="label">Registered users</div>
            <div className="value">{stats.userCount}</div>
          </div>
        </div>
      )}
      <p className="text-muted">
        Use the sidebar to manage products, categories, orders, and user accounts.
      </p>
    </AdminLayout>
  )
}
