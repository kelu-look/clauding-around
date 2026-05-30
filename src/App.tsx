import { useEffect, useMemo, useState } from 'react'
import { Hero } from './components/Hero'
import { MuseumGrid } from './components/MuseumGrid'
import { FeaturedPersonalityCard } from './components/FeaturedPersonalityCard'
import { PackStudio } from './components/PackStudio'
import { JsonConfigCard } from './components/JsonConfigCard'
import { Footer } from './components/Footer'
import { personalities } from './data/personalities'
import {
  loadInitialState,
  parseHash,
  saveStorage,
  serializeHash,
  updateHash,
} from './state/persistence'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const [state, setState] = useState(loadInitialState)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    saveStorage(state)
    updateHash(state)
  }, [state])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onHashChange = () => {
      const parsed = parseHash(window.location.hash)
      if (Object.keys(parsed).length === 0) return
      setState((prev) => ({ ...prev, ...parsed }))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const personality = useMemo(
    () =>
      personalities.find((p) => p.id === state.personalityId) ?? personalities[0],
    [state.personalityId],
  )

  const handleSelectPersonality = (id: string) => {
    setState((s) => ({ ...s, personalityId: id }))
    if (typeof window !== 'undefined') {
      const el = document.getElementById('featured')
      el?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  const shareHash = serializeHash(state)

  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
      <Hero />
      <main className="flex flex-col gap-20 pb-16">
        <MuseumGrid
          selectedId={state.personalityId}
          onSelect={handleSelectPersonality}
        />
        <FeaturedPersonalityCard personality={personality} style={state.style} />
        <PackStudio
          selectedId={state.personalityId}
          onSelectPersonality={(id) => setState((s) => ({ ...s, personalityId: id }))}
          style={state.style}
          onChangeStyle={(style) => setState((s) => ({ ...s, style }))}
          mode={state.mode}
          onChangeMode={(mode) => setState((s) => ({ ...s, mode }))}
        />
        <JsonConfigCard
          verbs={personality.styles[state.style]}
          mode={state.mode}
          shareHash={shareHash}
        />
      </main>
      <Footer />
    </div>
  )
}
