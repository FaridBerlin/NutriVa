import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['CustomSans', 'ui-sans-serif', 'system-ui'],
        display: ['Newsreader', 'CustomSans'],
        serif: ['Times New Roman', 'serif'],
      },

      colors: {
        primary2: '#83D385', // main green color
        primary: '#34d399',
        accentYellow: '#FBBF24', // warm yellow for dark-mode accents
        accentYellowDark: '#D97706', // warm yellow for dark-mode accents
        primaryDark2: '#7FBC81', // Hover
        primaryDark: '#0d9488',
        primarySoft: 'rgba(127,188,129,0.85)', // button bg
        primaryLight70: 'rgba(131, 211, 133, 0.7)', // 70% opacity
        primaryLight40: 'rgba(131, 211, 133, 0.4)', // 40% opacity
        bg_gradient:
          'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 shadow-lg',
        light_gradient:
          'bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200',
        textDark: '#2E2E2E', // almost black
        textLight: '#6B7280', // gray-700
        gray: {
          600: '#4B5563', // text-gray-600
          700: '#374151', //  text-gray-700
          800: '#1F2937', // text-gray-800
        },
        // Colors from tailwind.config-2 (merged)
        'primary-light': '#34d399',
        'primary-subtle': '#d1fae5',
        secondary: '#0d9488',
        'secondary-light': '#14b8a6',
        'secondary-dark': '#0f766e',
        'secondary-subtle': '#ccfbf1',
        'bg-primary': '#ffffff',
        'bg-secondary': '#f9fafb',
        'bg-tertiary': '#f3f4f6',
        'bg-emerald': '#ecfdf5',
        'text-primary': '#111827',
        'text-secondary': '#4b5563',
        'text-tertiary': '#6b7280',
        'text-muted': '#9ca3af',
        'surface-card': '#ffffff',
        'surface-border': '#e5e7eb',
        'surface-hover': '#f9fafb',
        'btn-primary': '#10b981',
        'btn-primary-hover': '#34d399',
        'btn-primary-active': '#059669',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
}
