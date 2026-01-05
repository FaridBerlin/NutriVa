import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#83D385', // main green color
        accentYellow: '#FBBF24', // warm yellow for dark-mode accents
        accentYellowDark: '#D97706', // warm yellow for dark-mode accents
        primaryDark: '#7FBC81', // Hover
        primarySoft: 'rgba(127,188,129,0.85)', // button bg
        primaryLight70: 'rgba(131, 211, 133, 0.7)', // 70% opacity
        primaryLight40: 'rgba(131, 211, 133, 0.4)', // 40% opacity
        textDark: '#2E2E2E', // almost black
        textLight: '#6B7280', // gray-700
        gray: {
          600: '#4B5563', // text-gray-600
          700: '#374151', //  text-gray-700
          800: '#1F2937', // text-gray-800
        },
      },
    },
  },
  plugins: [],
}
