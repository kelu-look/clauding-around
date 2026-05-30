import type { Personality, StyleKey } from '../data/personalities'
import { SpinnerPreview } from './SpinnerPreview'

interface FeaturedPersonalityCardProps {
  personality: Personality
  style: StyleKey
}

export function FeaturedPersonalityCard({
  personality,
  style,
}: FeaturedPersonalityCardProps) {
  const { featuredWord } = personality

  return (
    <section id="featured" className="scroll-mt-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-accent-cyan/80">
          Featured personality
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          A closer look at the chosen word.
        </h2>
      </div>

      <div className="card p-6 sm:p-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none" aria-hidden>
              {personality.emoji}
            </span>
            <div>
              <h3 className="text-xl font-semibold text-white">{personality.name}</h3>
              <p className="text-sm text-slateText-dim">{personality.description}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-ink-900/60 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-2xl sm:text-3xl text-white">
                {featuredWord.word}
              </span>
              <span className="text-xs text-slateText-mute uppercase tracking-wider">
                featured word
              </span>
            </div>

            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-slateText-mute">
                  Literal meaning
                </dt>
                <dd className="mt-1 text-slateText/90">{featuredWord.literalMeaning}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slateText-mute">
                  Why it feels right
                </dt>
                <dd className="mt-1 text-slateText/90">{featuredWord.whyItFeelsRight}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slateText-mute">
                  Vibe
                </dt>
                <dd className="mt-1 font-mono text-accent-amber/90">{featuredWord.vibe}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-wider text-slateText-mute">
            Live preview · {style}
          </p>
          <SpinnerPreview
            words={personality.styles[style]}
            size="lg"
            label={`${personality.name} ${style} spinner preview`}
          />
          <ul className="grid grid-cols-1 gap-2 text-sm font-mono text-slateText/80 sm:grid-cols-2">
            {personality.styles[style].slice(0, 6).map((s) => (
              <li
                key={s}
                className="rounded-md border border-white/[0.04] bg-white/[0.015] px-3 py-2 truncate"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
