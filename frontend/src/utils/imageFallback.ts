import type { SyntheticEvent } from 'react'

/**
 * onError handler for meal images: hides the broken <img> and reveals the
 * placeholder element rendered immediately after it.
 */
export function showImageFallback(e: SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget
  if (img.dataset.errorHandled) return
  img.dataset.errorHandled = 'true'
  img.style.display = 'none'
  const fallback = img.nextElementSibling
  if (fallback instanceof HTMLElement) {
    fallback.style.display = 'flex'
  }
}
