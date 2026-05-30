import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const FAST_MIN = 1200
const FAST_JITTER = 600
const SLOW_INTERVAL = 6000

export function useRotatingItem<T>(items: T[]): T {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setIndex(0)
  }, [items])

  useEffect(() => {
    if (items.length <= 1) return
    let cancelled = false
    let timeoutId: number

    const nextDelay = () =>
      reducedMotion ? SLOW_INTERVAL : FAST_MIN + Math.random() * FAST_JITTER

    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return
        setIndex((i) => (i + 1) % items.length)
        schedule()
      }, nextDelay())
    }

    schedule()
    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [items, reducedMotion])

  return items[Math.min(index, Math.max(items.length - 1, 0))]
}
