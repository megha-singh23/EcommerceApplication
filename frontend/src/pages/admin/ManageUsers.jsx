import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import AdminLayout from '../../components/AdminLayout.jsx'
import Loading from '../../components/Loading.jsx'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/admin/users').then((res) => setUsers(res.data)).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleToggle = async (id) => {
    setBusyId(id)
    try {
      await api.put(`/admin/users/${id}/toggle-enabled`)
      load()
    } finally {
      setBusyId(null)
    }
  }

  return (
    <AdminLayout title="Users">
      {loading ? (
        <Loading label="Loading users" />
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Username</th><th>Email</th><th>Roles</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td className="text-muted">{u.email}</td>
                <td>{u.roles.map((r) => <span key={r} className="role-tag">{r.replace('ROLE_', '')}</span>)}</td>
                <td>
                  <span className={`status-badge ${u.enabled ? 'status-DELIVERED' : 'status-CANCELLED'}`}>
                    {u.enabled ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-outline btn-sm" disabled={busyId === u.id} onClick={() => handleToggle(u.id)}>
                    {u.enabled ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
