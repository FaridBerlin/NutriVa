import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark'
      }
    } catch (e) {}
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      // Force body background/color to ensure whole page goes dark
      document.body.style.background =
        'linear-gradient(to bottom, rgba(15,23,42,0.95) 0%, #0b1220 50%, rgba(2,6,23,0.95) 100%)'
      document.body.style.color = '#e5e7eb'
    } else {
      root.classList.remove('dark')
      // Clear inline styles to restore CSS-controlled appearance
      document.body.style.background = ''
      document.body.style.color = ''
    }
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
