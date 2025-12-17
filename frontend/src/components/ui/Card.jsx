import React from 'react'

export default function Card({ children, className = '' }) {
  // Use a subtle base shadow, and on hover elevate with a stronger shadow + slight lift/scale.
  // This creates a 4-level perceived depth: none -> sm -> md -> 2xl on hover (visually prominent).
  const base = [
    'bg-white',
    'rounded-xl',
    'p-4',
    'border',
    'border-gray-100',
    'shadow-sm',
    'transition-transform',
    'transition-shadow',
    'duration-200',
    'ease-out',
    'hover:shadow-2xl',
    'hover:-translate-y-1',
    'hover:scale-105',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary/30',
  ].join(' ')

  return (
    <div className={`${base} ${className}`.trim()} role="group" tabIndex={0}>
      {children}
    </div>
  )
}
