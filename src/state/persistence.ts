import { personalities, type StyleKey } from '../data/personalities'
import type { ConfigMode } from '../components/PackStudio'

export const STYLES: readonly StyleKey[] = ['classic', 'emoji', 'kaomoji'] as const
export const MODES: readonly ConfigMode[] = ['append', 'replace'] as const

const VALID_IDS = new Set(personalities.map((p) => p.id))

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

const STORAGE_KEY = 'clauding-around:state:v1'

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
  const [id, style, mode] = parts
  const out: Partial<AppState> = {}
  if (id && isValidId(id)) out.personalityId = id
  if (style && isValidStyle(style)) out.style = style
  if (mode && isValidMode(mode)) out.mode = mode
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
    if (parsed.personalityId && isValidId(parsed.personalityId)) {
      out.personalityId = parsed.personalityId
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
