import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import AdminLayout from '../../components/AdminLayout.jsx'
import Loading from '../../components/Loading.jsx'

const emptyForm = { id: null, name: '', description: '', price: '', imageUrl: '', stockQuantity: '', categoryId: '' }

export default function ManageProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = () => {
    setLoading(true)
    Promise.all([
      api.get('/products', { params: { size: 100 } }),
      api.get('/categories'),
    ]).then(([prodRes, catRes]) => {
      setProducts(prodRes.data.content)
      setCategories(catRes.data)
    }).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => { setForm(emptyForm); setShowModal(true) }
  const openEdit = (p) => {
    setForm({
      id: p.id, name: p.name, description: p.description || '',
      price: p.price, imageUrl: p.imageUrl || '', stockQuantity: p.stockQuantity,
      categoryId: p.categoryId || ''
    })
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity, 10),
      categoryId: form.categoryId || null,
    }
    try {
      if (form.id) {
        await api.put(`/products/${form.id}`, payload)
      } else {
        await api.post('/products', payload)
      }
      setShowModal(false)
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save product.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await api.delete(`/products/${id}`)
    load()
  }

  return (
    <AdminLayout
      title="Products"
      actions={<button className="btn btn-primary btn-sm" onClick={openCreate}>+ New product</button>}
    >
      {loading ? (
        <Loading label="Loading products" />
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="text-muted">{p.categoryName || '—'}</td>
                <td className="mono">₹{Number(p.price).toFixed(2)}</td>
                <td className="mono">{p.stockQuantity}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)}>Edit</button>{' '}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{form.id ? 'Edit product' : 'New product'}</h3>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSave}>
              <div className="field">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="field">
                <label>Price</label>
                <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="field">
                <label>Stock quantity</label>
                <input type="number" min="0" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} required />
              </div>
              <div className="field">
                <label>Image URL</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" />
              </div>
              <div className="field">
                <label>Category</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">No category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Save product</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
