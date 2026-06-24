import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosConfig'
import ProductCard from '../components/ProductCard.jsx'
import Loading from '../components/Loading.jsx'

const SPOTLIGHT_COUNT = 5
const ROTATE_MS = 4000

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [keyword, setKeyword] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data)).catch(() => {})
  }, [])

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = { size: 40 }
      if (keyword) params.keyword = keyword
      if (categoryId) params.categoryId = categoryId
      const res = await api.get('/products', { params })
      setProducts(res.data.content)
      setSpotlightIndex(0)
    } catch {
      setError('Could not load products. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [keyword, categoryId])

  useEffect(() => {
    const t = setTimeout(loadProducts, 250)
    return () => clearTimeout(t)
  }, [loadProducts])

  const spotlightProducts = useMemo(() => products.slice(0, SPOTLIGHT_COUNT), [products])

  useEffect(() => {
    if (paused || spotlightProducts.length < 2) return
    const id = setInterval(() => {
      setSpotlightIndex((i) => (i + 1) % spotlightProducts.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, spotlightProducts.length])

  const spotlight = spotlightProducts[spotlightIndex]

  return (
    <div>
      <section className="hero">
        <div>
          <div className="hero-eyebrow">Fresh stock, weekly</div>
          <h1>Good goods, plainly priced.</h1>
          <p>
            Browse the full catalog, add what you need to your cart, and
            check out in a couple of clicks. No noise, just the goods.
          </p>
          <a href="#catalog" className="btn btn-primary">Browse the catalog</a>
        </div>

        <div
          className="hero-panel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className="tag-shape mono">{products.length} items live</span>

          {loading ? (
            <div className="hero-pick hero-pick-empty">
              <span className="hero-pick-eyebrow">This week's picks</span>
              <span className="hero-pick-name">Finding something good…</span>
            </div>
          ) : spotlight ? (
            <>
              <Link to={`/products/${spotlight.id}`} key={spotlight.id} className="hero-pick">
                <div className="hero-pick-row">
                  <div className="hero-pick-media">
                    {spotlight.imageUrl ? (
                      <img src={spotlight.imageUrl} alt={spotlight.name} />
                    ) : (
                      <span className="hero-pick-placeholder">No image</span>
                    )}
                  </div>
                  <div className="hero-pick-info">
                    <span className="hero-pick-eyebrow">This week's picks</span>
                    <span className="hero-pick-name">{spotlight.name}</span>
                    <span className="hero-pick-price">₹{Number(spotlight.price).toFixed(2)}</span>
                  </div>
                </div>
                <span className="hero-pick-cta">
                  Shop this item <span className="arrow">→</span>
                </span>
              </Link>

              {spotlightProducts.length > 1 && (
                <div className="hero-dots">
                  {spotlightProducts.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`hero-dot ${i === spotlightIndex ? 'active' : ''}`}
                      aria-label={`Show ${p.name}`}
                      onClick={() => setSpotlightIndex(i)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="hero-pick hero-pick-empty">
              <span className="hero-pick-eyebrow">This week's picks</span>
              <span className="hero-pick-name">New arrivals are on their way — check back soon.</span>
            </div>
          )}
        </div>
      </section>

      <div id="catalog">
        <div className="filter-bar">
          <input
            type="search"
            placeholder="Search products…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <Loading label="Loading products" />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>No products match yet</h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
