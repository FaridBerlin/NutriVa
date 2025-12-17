import React from 'react'

export default function Card({ children, className = '' }) {
  const base =
    'bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow'
  return <div className={`${base} ${className}`.trim()}>{children}</div>
}
