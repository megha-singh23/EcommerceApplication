import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import AdminLayout from '../../components/AdminLayout.jsx'
import Loading from '../../components/Loading.jsx'

const emptyForm = { id: null, name: '', description: '' }

export default function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = () => {
    setLoading(true)
    api.get('/categories').then((res) => setCategories(res.data)).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => { setForm(emptyForm); setShowModal(true) }
  const openEdit = (cat) => { setForm(cat); setShowModal(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (form.id) {
        await api.put(`/categories/${form.id}`, form)
      } else {
        await api.post('/categories', form)
      }
      setShowModal(false)
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save category.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Products in it will keep existing but lose their category.')) return
    await api.delete(`/categories/${id}`)
    load()
  }

  return (
    <AdminLayout
      title="Categories"
      actions={<button className="btn btn-primary btn-sm" onClick={openCreate}>+ New category</button>}
    >
      {loading ? (
        <Loading label="Loading categories" />
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Description</th><th></th></tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td className="text-muted">{c.description || '—'}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => openEdit(c)}>Edit</button>{' '}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
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
              <h3>{form.id ? 'Edit category' : 'New category'}</h3>
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
                <textarea rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Save category</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
