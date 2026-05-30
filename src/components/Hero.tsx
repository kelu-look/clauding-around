import { SpinnerPreview } from './SpinnerPreview'

const HERO_SPINNER_WORDS = [
  'Crystallizing',
  'Recombobulating',
  'Waddling',
  'Moonwalking',
  'Rubber-ducking',
  'Stage-checking',
  'Brewing',
  'Purring near the bug',
]

export function Hero() {
  return (
    <header className="relative pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-xs text-slateText-dim">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden />
            unofficial fan project
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
          Clauding{' '}
          <span className="bg-gradient-to-br from-accent-violet via-accent-pink to-accent-amber bg-clip-text text-transparent">
            Around
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-slateText-dim">
          A tiny museum and studio for Claude Code waiting personalities.
        </p>

        <p className="max-w-2xl text-sm sm:text-base text-slateText/80 leading-relaxed">
          Claude doesn’t just load. It can brew{' '}
          <span className="emoji-inline" aria-hidden>
            ☕
          </span>
          , rehearse{' '}
          <span className="emoji-inline" aria-hidden>
            🪩
          </span>
          , debug{' '}
          <span className="emoji-inline" aria-hidden>
            🐛
          </span>
          , or purr on your keyboard{' '}
          <span className="emoji-inline" aria-hidden>
            🐈
          </span>
          .
        </p>

        <div className="mt-4 max-w-2xl">
          <SpinnerPreview
            words={HERO_SPINNER_WORDS}
            size="lg"
            label="Hero spinner preview"
          />
        </div>

        <p className="mt-2 max-w-2xl text-xs text-slateText-mute leading-relaxed">
          Unofficial fan project. Waiting personalities are playful microcopy, not internal
          state labels. Not affiliated with Anthropic.
        </p>
      </div>
    </header>
  )
}
