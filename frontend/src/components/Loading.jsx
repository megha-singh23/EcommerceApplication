import React from 'react'

export default function Loading({ label = 'Loading' }) {
  return (
    <div className="center-page">
      <span className="loading-dots">{label}…</span>
    </div>
  )
}
