import React from 'react'

export default function FormLayout({ title, children, footer }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="nv-card rounded-2xl shadow-md p-8">
        {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
        <div className="nv-form">{children}</div>
        {footer && <div className="mt-6 text-sm text-gray-500">{footer}</div>}
      </div>
    </div>
  )
}
