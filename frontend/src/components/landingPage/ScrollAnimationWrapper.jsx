import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Reusable scroll animation wrapper for landing page sections
 * Provides smooth fade-in and slide-up animations on scroll
 */
export default function ScrollAnimationWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right'
  once = true,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const directionOffsets = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  }

  const offset = directionOffsets[direction]

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9, 1],
    [0, 1, 1, 0.3],
  )
  const y = useTransform(scrollYProgress, [0, 0.3], [offset.y, 0])
  const x = useTransform(scrollYProgress, [0, 0.3], [offset.x, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x }}
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

/**
 * Stagger children animation wrapper
 * Animates children sequentially with delay
 */
export function ScrollStaggerWrapper({
  children,
  className = '',
  staggerDelay = 0.1,
}) {
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Item for use inside ScrollStaggerWrapper
 */
export function ScrollStaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
