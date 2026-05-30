import { personalities } from '../data/personalities'
import { PersonalityCard } from './PersonalityCard'

interface MuseumGridProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function MuseumGrid({ selectedId, onSelect }: MuseumGridProps) {
  return (
    <section id="museum" className="scroll-mt-12">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-accent-violet/80">
          The Waiting Museum
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Eight tiny ways Claude can wait.
        </h2>
        <p className="max-w-2xl text-sm text-slateText-dim">
          Each card is a tiny waiting persona. Pick one, preview it, and turn it into a
          Claude Code spinner pack.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {personalities.map((p) => (
          <PersonalityCard
            key={p.id}
            personality={p}
            selected={p.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}
