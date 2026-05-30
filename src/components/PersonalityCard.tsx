import type { Personality } from '../data/personalities'

interface PersonalityCardProps {
  personality: Personality
  selected: boolean
  onSelect: (id: string) => void
}

export function PersonalityCard({ personality, selected, onSelect }: PersonalityCardProps) {
  const samples = personality.styles.classic.slice(0, 3)

  return (
    <article
      className={`card card-hover relative flex flex-col gap-3 p-5 sm:gap-3.5 sm:p-5 ${
        selected
          ? 'ring-1 ring-accent-violet/60 border-accent-violet/40 bg-accent-violet/[0.04]'
          : ''
      }`}
      aria-current={selected ? 'true' : undefined}
    >
      {selected && (
        <span
          className="absolute right-4 top-4 pill !border-accent-violet/40 !bg-accent-violet/15 !text-white"
          aria-label="Currently selected — in studio"
        >
          in studio
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none" aria-hidden>
          {personality.emoji}
        </span>
        <h3 className="text-lg font-semibold text-white">{personality.name}</h3>
      </div>

      <p className="text-sm text-slateText-dim leading-snug">
        {personality.museumDescription}
      </p>

      <ul className="flex flex-wrap gap-1.5" aria-label="Vibe tags">
        {personality.vibeTags.map((tag) => (
          <li key={tag} className="pill">
            {tag}
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-white/[0.05] bg-ink-900/60 p-3 font-mono text-xs text-slateText/85">
        <ul className="space-y-1">
          {samples.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="text-slateText-mute" aria-hidden>
                ✻
              </span>
              <span className="truncate">
                {s}
                <span className="text-slateText/40">…</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`btn ${selected ? 'btn-primary' : ''} mt-1 w-full`}
        onClick={() => onSelect(personality.id)}
        aria-label={`Try the ${personality.name} personality in the studio`}
      >
        {selected ? 'Currently in studio' : 'Try this personality'}
      </button>
    </article>
  )
}
