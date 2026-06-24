import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminLayout({ title, actions, children }) {
  const linkClass = ({ isActive }) => isActive ? 'active' : ''

  return (
    <div className="admin-layout">
      <aside className="admin-side">
        <NavLink to="/admin" end className={linkClass}>Overview</NavLink>
        <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
        <NavLink to="/admin/categories" className={linkClass}>Categories</NavLink>
        <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
        <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
      </aside>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2 style={{ margin: 0 }}>{title}</h2>
          {actions}
        </div>
        {children}
      </div>
    </div>
  )
}
