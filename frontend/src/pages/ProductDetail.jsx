import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import Loading from '../components/Loading.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Product not found.'))
  }, [id])

  const handleAdd = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setAdding(true)
    setMessage('')
    setError('')
    try {
      await addToCart(product.id, qty)
      setMessage('Added to cart.')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add to cart.')
    } finally {
      setAdding(false)
    }
  }

  if (error && !product) return <div className="alert alert-error">{error}</div>
  if (!product) return <Loading label="Loading product" />

  const outOfStock = product.stockQuantity === 0

  return (
    <div className="detail-grid">
      <div className="detail-image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <span className="placeholder">No image</span>
        )}
      </div>

      <div>
        {product.categoryName && <span className="cat">{product.categoryName}</span>}
        <h1>{product.name}</h1>
        <div className="detail-price">₹{Number(product.price).toFixed(2)}</div>
        <p className="text-muted">{product.description || 'No description provided for this product.'}</p>

        {outOfStock ? (
          <p className="stock-out">Currently out of stock</p>
        ) : (
          <p className="text-muted mono">{product.stockQuantity} in stock</p>
        )}

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="flex-between" style={{ justifyContent: 'flex-start', gap: 16, marginTop: 20 }}>
          <div className="qty-control">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={outOfStock}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))} disabled={outOfStock}>+</button>
          </div>
          <button className="btn btn-primary" onClick={handleAdd} disabled={outOfStock || adding}>
            {adding ? 'Adding…' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
