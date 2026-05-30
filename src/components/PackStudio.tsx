import { personalities, type StyleKey } from '../data/personalities'
import { SpinnerPreview } from './SpinnerPreview'
import { StyleToggle } from './StyleToggle'

export type ConfigMode = 'append' | 'replace'

interface PackStudioProps {
  selectedId: string
  onSelectPersonality: (id: string) => void
  style: StyleKey
  onChangeStyle: (s: StyleKey) => void
  mode: ConfigMode
  onChangeMode: (m: ConfigMode) => void
}

export function PackStudio({
  selectedId,
  onSelectPersonality,
  style,
  onChangeStyle,
  mode,
  onChangeMode,
}: PackStudioProps) {
  const personality =
    personalities.find((p) => p.id === selectedId) ?? personalities[0]
  const words = personality.styles[style]
  const experimental = style !== 'classic'

  return (
    <section id="studio" className="scroll-mt-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-accent-pink/80">
          Spinner Pack Studio
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Pick a vibe for Claude while it works.
        </h2>
      </div>

      <div className="card p-6 sm:p-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="personality-select"
              className="block text-xs uppercase tracking-wider text-slateText-mute mb-2"
            >
              Personality
            </label>
            <div className="relative">
              <select
                id="personality-select"
                value={selectedId}
                onChange={(e) => onSelectPersonality(e.target.value)}
                className="w-full appearance-none rounded-lg border border-white/[0.08] bg-ink-900/80 px-3.5 py-2.5 pr-10 text-sm text-white hover:border-white/[0.16] focus:border-accent-violet/60"
              >
                {personalities.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.emoji}  {p.name}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slateText-mute"
                aria-hidden
              >
                ▾
              </span>
            </div>
            <p className="mt-2 text-xs text-slateText-mute">
              {personality.description}
            </p>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider text-slateText-mute mb-2">
              Display style
            </span>
            <StyleToggle value={style} onChange={onChangeStyle} />
            {experimental && (
              <p className="mt-3 rounded-md border border-accent-amber/30 bg-accent-amber/10 px-3 py-2 text-xs text-accent-amber/90 leading-relaxed">
                Experimental: terminal rendering may vary by font and environment. Switch back
                to Classic if things look odd.
              </p>
            )}
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider text-slateText-mute mb-2">
              Config mode
            </span>
            <div
              role="radiogroup"
              aria-label="Config mode"
              className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-1"
            >
              {(['append', 'replace'] as ConfigMode[]).map((m) => {
                const active = m === mode
                return (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => onChangeMode(m)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                      active
                        ? 'bg-accent-cyan/15 text-white ring-1 ring-accent-cyan/40'
                        : 'text-slateText-dim hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {m}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-slateText-mute leading-relaxed">
              <span className="font-mono">append</span> adds these verbs alongside defaults.
              <span className="mx-1">·</span>
              <span className="font-mono">replace</span> uses only the verbs in this pack.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-wider text-slateText-mute">
            Live preview
          </p>
          <SpinnerPreview
            words={words}
            size="lg"
            label={`${personality.name} ${style} live preview`}
          />
          <div className="rounded-xl border border-white/[0.05] bg-ink-900/60 p-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-slateText-mute">
              Verbs in this pack
            </p>
            <ul className="grid grid-cols-1 gap-1.5 font-mono text-sm text-slateText/85 sm:grid-cols-2">
              {words.map((w) => (
                <li
                  key={w}
                  className="truncate rounded-md border border-white/[0.04] bg-white/[0.015] px-2.5 py-1.5"
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
