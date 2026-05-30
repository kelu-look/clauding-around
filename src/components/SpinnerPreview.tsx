import { useRotatingItem } from '../hooks/useRotatingItem'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SpinnerPreviewProps {
  words: string[]
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const SIZE_CLASSES: Record<NonNullable<SpinnerPreviewProps['size']>, string> = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-4 py-3',
  lg: 'text-base sm:text-lg px-4 py-3.5',
}

export function SpinnerPreview({ words, size = 'md', label }: SpinnerPreviewProps) {
  const word = useRotatingItem(words)
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`terminal flex items-center gap-3 font-mono ${SIZE_CLASSES[size]}`}
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Spinner preview'}
    >
      <span
        className={`text-accent-violet select-none ${
          reducedMotion ? '' : 'animate-spinBlink'
        }`}
        aria-hidden
      >
        ✻
      </span>
      <span
        key={word}
        className={`truncate text-slateText ${reducedMotion ? '' : 'animate-fadeIn'}`}
      >
        {word}
        <span className="text-slateText/40">…</span>
      </span>
    </div>
  )
}
