import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty-state">
      <h3>This page wandered off.</h3>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to the shop</Link>
    </div>
  )
}
