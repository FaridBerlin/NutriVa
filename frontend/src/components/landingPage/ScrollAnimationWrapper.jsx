import { motion } from 'framer-motion'

/**
 * Reusable scroll animation wrapper for landing page sections
 * Provides smooth fade-in and slide animations on scroll
 */
export default function ScrollAnimationWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right'
  once = true,
}) {
  const directionOffsets = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  }

  const offset = directionOffsets[direction]

  return (
    <motion.div
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
