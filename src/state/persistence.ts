import { personalities, type StyleKey } from '../data/personalities'
import type { ConfigMode } from '../components/PackStudio'

export const STYLES: readonly StyleKey[] = ['classic', 'emoji', 'kaomoji'] as const
export const MODES: readonly ConfigMode[] = ['append', 'replace'] as const

const VALID_IDS = new Set(personalities.map((p) => p.id))

// Back-compat for older shared links that used a different spelling.
const ID_ALIASES: Record<string, string> = {
  'kpop-comeback': 'k-pop-comeback',
  'k-pop': 'k-pop-comeback',
  kpop: 'k-pop-comeback',
}

export interface AppState {
  personalityId: string
  style: StyleKey
  mode: ConfigMode
}

export const DEFAULTS: AppState = {
  personalityId: 'cozy-study',
  style: 'classic',
  mode: 'append',
}

export const isValidId = (id: string): boolean => VALID_IDS.has(id)
export const isValidStyle = (s: string): s is StyleKey =>
  (STYLES as readonly string[]).includes(s)
export const isValidMode = (m: string): m is ConfigMode =>
  (MODES as readonly string[]).includes(m)

export function resolveId(raw: string): string | null {
  if (!raw) return null
  if (isValidId(raw)) return raw
  const aliased = ID_ALIASES[raw]
  if (aliased && isValidId(aliased)) return aliased
  return null
}

/**
 * Parse a URL hash into a partial AppState.
 *
 * Behavior:
 *   - Empty hash → `{}` (caller falls back to defaults).
 *   - Hash with an id segment that cannot be resolved to a valid personality:
 *     reject the entire hash and return `{}`. We don't apply just style/mode
 *     while silently resetting the id, because that creates confusing
 *     "your link got rewritten" behavior.
 *   - Otherwise, individually invalid style/mode segments are dropped.
 */
export function parseHash(hash: string): Partial<AppState> {
  const raw = hash.replace(/^#/, '').trim()
  if (!raw) return {}

  const parts = raw.split('/').map((p) => {
    try {
      return decodeURIComponent(p)
    } catch {
      return p
    }
  })
  const [idPart, stylePart, modePart] = parts

  const out: Partial<AppState> = {}

  if (idPart) {
    const resolved = resolveId(idPart)
    if (!resolved) return {} // unknown id → reject whole hash
    out.personalityId = resolved
  }
  if (stylePart && isValidStyle(stylePart)) out.style = stylePart
  if (modePart && isValidMode(modePart)) out.mode = modePart
  return out
}

export function serializeHash(s: AppState): string {
  return `#${s.personalityId}/${s.style}/${s.mode}`
}

export function isDefaultState(s: AppState): boolean {
  return (
    s.personalityId === DEFAULTS.personalityId &&
    s.style === DEFAULTS.style &&
    s.mode === DEFAULTS.mode
  )
}

/**
 * Initial state comes from the URL hash if present, otherwise defaults.
 *
 * localStorage is intentionally *not* consulted here: persisting selection
 * across sessions caused the clean base URL to silently rewrite into a
 * leftover hash on first load. Hash links remain the single source of truth
 * for sharing state; clean URLs always boot to defaults.
 */
export function loadInitialState(): AppState {
  if (typeof window === 'undefined') return DEFAULTS
  return { ...DEFAULTS, ...parseHash(window.location.hash) }
}

export function updateHash(s: AppState): void {
  if (typeof window === 'undefined') return
  const next = serializeHash(s)
  if (window.location.hash === next) return
  try {
    history.replaceState(null, '', next)
  } catch {
    window.location.hash = next
  }
}

export function clearHash(): void {
  if (typeof window === 'undefined') return
  if (!window.location.hash) return
  try {
    history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    )
  } catch {
    /* ignore */
  }
}

/**
 * Example share URLs — used in docs and as a tiny self-test.
 * Each example must round-trip through serialize → parse → serialize unchanged.
 */
export const SHARE_EXAMPLES: AppState[] = personalities.map((p) => ({
  personalityId: p.id,
  style: 'classic',
  mode: 'append',
}))

function assertRoundTrip(): void {
  for (const s of SHARE_EXAMPLES) {
    const hash = serializeHash(s)
    const parsed = parseHash(hash)
    const restored: AppState = { ...DEFAULTS, ...parsed }
    const again = serializeHash(restored)
    if (hash !== again) {
      throw new Error(
        `Share-link round-trip failed: "${hash}" → parse → "${again}"`,
      )
    }
  }
}

assertRoundTrip()
