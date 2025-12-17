import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation()

  useEffect(() => {
    // Scroll to top on route change. If there's a hash, scroll to that element instead.
    if (hash) {
      // allow browser to jump to hash target
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, hash, search])

  return null
}
