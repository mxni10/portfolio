import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsTouch } from '../hooks/useIsTouch'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type CursorState = 'default' | 'link' | 'view'

export function CustomCursor() {
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (touch || reduced) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    const move = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY })
      setVisible(true)
    }

    const leave = () => setVisible(false)

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      if (target.closest('[data-cursor="view"]')) setState('view')
      else if (target.closest('a, button, [data-cursor="link"]')) setState('link')
      else setState('default')
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, [touch, reduced])

  if (touch || reduced) return null

  const size = state === 'view' ? 88 : state === 'link' ? 44 : 8

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.4 }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full border border-paper bg-paper/10 text-[10px] font-medium tracking-[0.22em] text-paper">
        {state === 'view' ? 'VIEW' : null}
      </div>
    </motion.div>
  )
}
