import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="public/logo.png" height='33px' width='45px' />
          <Link to="/" className="brand">
              Shopora
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Shop</Link>

          {isAuthenticated && (
            <Link to="/cart" className="cart-pill">
              Cart
              <span className="count">{itemCount}</span>
            </Link>
          )}

          {isAuthenticated && <Link to="/orders">Orders</Link>}

          {isAdmin && (
            <Link to="/admin">
              <span className="nav-tag">Admin</span>
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <span className="text-muted ">Hi, {user.username}</span>
              <span className='btn btn-primary btn-sm'>
                <button onClick={handleLogout}>Log out</button>
              </span>
            </>
          ) : (
            <>
              <span className='pl'><Link to="/login" >Log in</Link></span>
              <Link to="/register">
                <span className="btn btn-primary btn-sm">Sign up</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
