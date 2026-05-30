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

const STORAGE_KEY = 'clauding-around:state:v1'

/**
 * Parse a URL hash into a partial AppState.
 *
 * Behavior:
 *   - Empty hash → `{}` (no opinion; caller falls back to storage/defaults).
 *   - If the hash has an id segment and it cannot be resolved to a valid
 *     personality, the entire hash is rejected and `{}` is returned. We don't
 *     apply just the style/mode while silently resetting the id to default,
 *     because that produces confusing "your link got rewritten" behavior.
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

export function loadStorage(): Partial<AppState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Partial<AppState>
    const out: Partial<AppState> = {}
    if (parsed.personalityId) {
      const resolved = resolveId(parsed.personalityId)
      if (resolved) out.personalityId = resolved
    }
    if (parsed.style && isValidStyle(parsed.style)) out.style = parsed.style
    if (parsed.mode && isValidMode(parsed.mode)) out.mode = parsed.mode
    return out
  } catch {
    return {}
  }
}

export function saveStorage(s: AppState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // Quota or private-mode failures aren't fatal — UI still works in-memory.
  }
}

export function loadInitialState(): AppState {
  if (typeof window === 'undefined') return DEFAULTS
  const fromStorage = loadStorage()
  const fromHash = parseHash(window.location.hash)
  return { ...DEFAULTS, ...fromStorage, ...fromHash }
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
