import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const outOfStock = product.stockQuantity === 0
  const lowStock = product.stockQuantity > 0 && product.stockQuantity <= 5

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="thumb">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <span className="placeholder">No image</span>
        )}
      </div>
      <div className="body">
        {product.categoryName && <span className="cat">{product.categoryName}</span>}
        <span className="name">{product.name}</span>
        <div className="row">
          <span className="price-chip">₹{Number(product.price).toFixed(2)}</span>
          {outOfStock && <span className="stock-out">Out of stock</span>}
          {lowStock && <span className="stock-low">Only {product.stockQuantity} left</span>}
        </div>
      </div>
    </Link>
  )
}
