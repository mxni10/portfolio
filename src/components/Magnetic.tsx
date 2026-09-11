import { motion } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { useIsTouch } from '../hooks/useIsTouch'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  className?: string
}

export function Magnetic({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (touch || reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </motion.div>
  )
}
