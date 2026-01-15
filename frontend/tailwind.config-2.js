import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: '#10b981',
        'primary-light': '#34d399',
        'primary-dark': '#059669',
        'primary-subtle': '#d1fae5',
        // Secondary
        secondary: '#0d9488',
        'secondary-light': '#14b8a6',
        'secondary-dark': '#0f766e',
        'secondary-subtle': '#ccfbf1',
        // Backgrounds
        'bg-primary': '#ffffff',
        'bg-secondary': '#f9fafb',
        'bg-tertiary': '#f3f4f6',
        'bg-emerald': '#ecfdf5',
        // Text
        'text-primary': '#111827',
        'text-secondary': '#4b5563',
        'text-tertiary': '#6b7280',
        'text-muted': '#9ca3af',
        // Surfaces
        'surface-card': '#ffffff',
        'surface-border': '#e5e7eb',
        'surface-hover': '#f9fafb',
        // Buttons
        'btn-primary': '#10b981',
        'btn-primary-hover': '#34d399',
        'btn-primary-active': '#059669',
        // Status
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
}
