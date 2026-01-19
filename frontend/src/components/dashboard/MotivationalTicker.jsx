import React, { useEffect, useState } from 'react'
import quotes from '../react-hot-toast/MotivationalQuotes'
import {
  FiStar,
  FiHeart,
  FiSun,
  FiCoffee,
  FiSmile,
  FiActivity,
} from 'react-icons/fi'

// Rotating single-item ticker (one phrase at a time)
const ICONS = [FiStar, FiHeart, FiSun, FiCoffee, FiSmile, FiActivity]

export default function MotivationalTicker({ speed = 10 }) {
  const [idx, setIdx] = useState(0)

  // compute a duration multiplier so longer quotes scroll slower
  const currentQuote = quotes[idx] || ''
  const lengthMultiplier = Math.max(1, currentQuote.length / 40)
  // increase minimum duration and use speed * multiplier
  const durationSec = Math.max(4, Math.round(speed * lengthMultiplier))

  useEffect(() => {
    // advance to next quote after the current one has finished scrolling
    // add a slightly longer gap to avoid abrupt transitions
    const timeout = setTimeout(
      () => {
        setIdx((i) => (i + 1) % quotes.length)
      },
      durationSec * 1000 + 1500,
    ) // 1.5s gap after scroll
    return () => clearTimeout(timeout)
  }, [idx, durationSec])

  const Icon = ICONS[idx % ICONS.length]

  return (
    <div className="nv-ticker-wrapper" aria-live="polite" aria-atomic="true">
      <div
        className="nv-marquee"
        style={{ '--nv-marquee-duration': `${durationSec}s` }}
      >
        <div className="nv-marquee-track nv-ticker-item inline-flex items-center">
          <Icon size={18} className="nv-ticker-icon" />
          <span className="nv-ticker-text">{currentQuote}</span>
        </div>
      </div>
    </div>
  )
}
