import { STYLE_LABELS, type StyleKey } from '../data/personalities'

interface StyleToggleProps {
  value: StyleKey
  onChange: (v: StyleKey) => void
}

const STYLES: StyleKey[] = ['classic', 'emoji', 'kaomoji']

export function StyleToggle({ value, onChange }: StyleToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Display style"
      className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-1"
    >
      {STYLES.map((s) => {
        const active = s === value
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              active
                ? 'bg-accent-violet/20 text-white ring-1 ring-accent-violet/40'
                : 'text-slateText-dim hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {STYLE_LABELS[s]}
          </button>
        )
      })}
    </div>
  )
}
