export type StyleKey = 'classic' | 'emoji' | 'kaomoji'

export interface FeaturedWord {
  word: string
  literalMeaning: string
  whyItFeelsRight: string
  vibe: string
}

export interface Personality {
  id: string
  emoji: string
  name: string
  shortName: string
  description: string
  museumDescription: string
  vibeTags: string[]
  styles: {
    classic: string[]
    emoji: string[]
    kaomoji: string[]
  }
  featuredWord: FeaturedWord
}

export const STYLE_LABELS: Record<StyleKey, string> = {
  classic: 'Classic',
  emoji: 'Emoji',
  kaomoji: 'Kaomoji',
}

export const personalities: Personality[] = [
  {
    id: 'cozy-study',
    emoji: '☕',
    name: 'Cozy Study',
    shortName: 'Cozy',
    description: 'For slow thinking, warm drinks, and quiet desk energy.',
    museumDescription:
      'Claude as a tiny study companion: brewing, steeping, annotating, and letting the answer settle.',
    vibeTags: ['warm', 'slow', 'cozy'],
    styles: {
      classic: [
        'Brewing',
        'Steeping',
        'Highlighting',
        'Annotating',
        'Simmering',
        'Musing',
        'Crystallizing',
      ],
      emoji: [
        '☕ Brewing',
        '🍵 Steeping',
        '📖 Highlighting',
        '✍️ Annotating',
        '🕯️ Simmering',
        '💭 Musing',
        '✨ Crystallizing',
      ],
      kaomoji: [
        '(｡･ω･｡) Brewing',
        '( ˘ω˘ ) Steeping',
        '(๑˃̵ᴗ˂̵) Highlighting',
        '( ..)φ Annotating',
        '( ᵕᴗᵕ ) Simmering',
        '(´｡• ᵕ •｡`) Musing',
        '✧˖° Crystallizing',
      ],
    },
    featuredWord: {
      word: 'Crystallizing',
      literalMeaning: 'Forming into a clear, structured crystal.',
      whyItFeelsRight: 'A vague answer becoming sharp enough to say.',
      vibe: 'quiet · precise · beautiful',
    },
  },
  {
    id: 'k-pop-comeback',
    emoji: '🪩',
    name: 'K-pop Comeback',
    shortName: 'K-pop',
    description: 'For when Claude is not loading, but preparing a tiny comeback stage.',
    museumDescription:
      'Claude in rehearsal mode: syncing formations, checking the stage, and finding the center before the answer drops.',
    vibeTags: ['sparkly', 'rhythmic', 'dramatic'],
    styles: {
      classic: [
        'Rehearsing',
        'Syncing',
        'Choreographing',
        'Harmonizing',
        'Stage-checking',
        'Glittering',
        'Moonwalking',
      ],
      emoji: [
        '🪩 Rehearsing',
        '🎧 Syncing',
        '💃 Choreographing',
        '🎤 Harmonizing',
        '🎬 Stage-checking',
        '✨ Glittering',
        '🌙 Moonwalking',
      ],
      kaomoji: [
        '(ง •̀_•́)ง Rehearsing',
        'ヽ(•̀ω•́ )ゝ Syncing',
        'ᕕ( ᐛ )ᕗ Choreographing',
        '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Harmonizing',
        '( •̀ᴗ•́ )و Stage-checking',
        '✧*｡٩(ˊᗜˋ*)و✧*｡ Glittering',
        '(づ｡◕‿‿◕｡)づ Moonwalking',
      ],
    },
    featuredWord: {
      word: 'Choreographing',
      literalMeaning: 'Designing and arranging movement into a sequence.',
      whyItFeelsRight: 'A response becoming coordinated instead of scattered.',
      vibe: 'sync · sparkle · formation',
    },
  },
  {
    id: 'debug-goblin',
    emoji: '🐛',
    name: 'Debug Goblin',
    shortName: 'Goblin',
    description: 'For tracing bugs, rebasing branches, and asking the rubber duck for mercy.',
    museumDescription:
      'Claude as a helpful little terminal goblin: reading logs, blaming cache, and eventually finding the missing bracket.',
    vibeTags: ['dev', 'stubborn', 'gremlin'],
    styles: {
      classic: [
        'Tracing',
        'Bisecting',
        'Rebasing',
        'Retrying',
        'Rubber-ducking',
        'Refactoring',
        'Recompiling',
      ],
      emoji: [
        '🐛 Tracing',
        '🔍 Bisecting',
        '🌿 Rebasing',
        '🔁 Retrying',
        '🦆 Rubber-ducking',
        '🛠️ Refactoring',
        '⚙️ Recompiling',
      ],
      kaomoji: [
        '(；￣Д￣) Tracing',
        '(¬*¬) Bisecting',
        '(╯°□°）╯ Rebasing',
        "(ง'̀-'́)ง Retrying",
        '<(o )*__ Rubber-ducking',
        '( •̀ᴗ•́ )و Refactoring',
        '(； ･`д･´) Recompiling',
      ],
    },
    featuredWord: {
      word: 'Rubber-ducking',
      literalMeaning: 'Explaining a problem to a rubber duck to understand it better.',
      whyItFeelsRight:
        'Sometimes the answer appears only after the bug has been patiently listened to.',
      vibe: 'debug · absurd · useful',
    },
  },
  {
    id: 'chaotic-good',
    emoji: '🪿',
    name: 'Chaotic Good',
    shortName: 'Goose',
    description: 'For lovable nonsense with surprisingly useful results.',
    museumDescription:
      'Claude stops pretending to be serious and starts waddling toward an answer with alarming confidence.',
    vibeTags: ['silly', 'alive', 'mischievous'],
    styles: {
      classic: [
        'Waddling',
        'Booping',
        'Shenaniganing',
        'Recombobulating',
        'Smooshing',
        'Flummoxing',
        'Finding the plot',
      ],
      emoji: [
        '🪿 Waddling',
        '👉 Booping',
        '🌀 Shenaniganing',
        '🧩 Recombobulating',
        '🫠 Smooshing',
        '❓ Flummoxing',
        '📍 Finding the plot',
      ],
      kaomoji: [
        'ᕕ( ᐛ )ᕗ Waddling',
        '(｡･ω･｡)ﾉ Booping',
        '(ﾉ≧∀≦)ﾉ Shenaniganing',
        '(ง •̀_•́)ง Recombobulating',
        '(っ˘ڡ˘ς) Smooshing',
        '(⊙_⊙) Flummoxing',
        '(☞ﾟヮﾟ)☞ Finding the plot',
      ],
    },
    featuredWord: {
      word: 'Recombobulating',
      literalMeaning: 'Putting things back together after confusion.',
      whyItFeelsRight: 'The perfect fake-serious word for recovering from conceptual chaos.',
      vibe: 'chaos · recovery · charm',
    },
  },
  {
    id: 'cosmic-mode',
    emoji: '🌌',
    name: 'Cosmic Mode',
    shortName: 'Cosmic',
    description: 'For answers arriving through orbit, starlight, and mild space-time distortion.',
    museumDescription:
      'Claude as a small cosmic instrument: orbiting the question until the shape of the answer appears.',
    vibeTags: ['dreamy', 'vast', 'strange'],
    styles: {
      classic: [
        'Orbiting',
        'Stargazing',
        'Nebulizing',
        'Moonwalking',
        'Warping',
        'Beaming',
        'Consulting the void',
      ],
      emoji: [
        '🪐 Orbiting',
        '🌟 Stargazing',
        '🌫️ Nebulizing',
        '🌙 Moonwalking',
        '🌀 Warping',
        '🔦 Beaming',
        '🕳️ Consulting the void',
      ],
      kaomoji: [
        '( ◜‿◝ ) Orbiting',
        '✧･ﾟ Stargazing',
        '(｡☁️‿☁️｡) Nebulizing',
        '(づ｡◕‿‿◕｡)づ Moonwalking',
        '(ﾉ´ヮ`)ﾉ*: ･ﾟ Warping',
        '✦ Beaming',
        '(     ) Consulting the void',
      ],
    },
    featuredWord: {
      word: 'Orbiting',
      literalMeaning: 'Moving in a curved path around a center.',
      whyItFeelsRight: 'Claude circling the question before landing on the answer.',
      vibe: 'distant · luminous · patient',
    },
  },
  {
    id: 'research-mode',
    emoji: '🔬',
    name: 'Research Mode',
    shortName: 'Research',
    description: 'For experiments, papers, ablations, and stubborn hypotheses.',
    museumDescription:
      'Claude as a tiny research assistant: forming hypotheses, checking assumptions, and refusing to trust one clean-looking result.',
    vibeTags: ['rigorous', 'curious', 'empirical'],
    styles: {
      classic: [
        'Hypothesizing',
        'Ablating',
        'Replicating',
        'Reviewing',
        'Cross-checking',
        'Synthesizing',
        'Plotting results',
      ],
      emoji: [
        '🔬 Hypothesizing',
        '🧪 Ablating',
        '🔁 Replicating',
        '📄 Reviewing',
        '✅ Cross-checking',
        '🧠 Synthesizing',
        '📈 Plotting results',
      ],
      kaomoji: [
        '(¬‿¬) Hypothesizing',
        '( •̀ᴗ•́ )و Ablating',
        '(ง •̀_•́)ง Replicating',
        '( ..)φ Reviewing',
        '(｀_´)ゞ Cross-checking',
        '( ˘ω˘ ) Synthesizing',
        '📈 Plotting results',
      ],
    },
    featuredWord: {
      word: 'Ablating',
      literalMeaning: 'Removing one component to see what changes.',
      whyItFeelsRight:
        'A beautifully nerdy way to say the answer is being tested, not merely produced.',
      vibe: 'evidence · rigor · curiosity',
    },
  },
  {
    id: 'quiet-poetry',
    emoji: '🌙',
    name: 'Quiet Poetry',
    shortName: 'Poetry',
    description: 'For moonlit thinking and soft little pauses.',
    museumDescription:
      'Claude as a small poem in the terminal: misting, wandering, unfurling, and saying less too loudly.',
    vibeTags: ['soft', 'reflective', 'atmospheric'],
    styles: {
      classic: [
        'Wandering',
        'Unfurling',
        'Misting',
        'Drizzling',
        'Daydreaming',
        'Hushing',
        'Listening for meaning',
      ],
      emoji: [
        '🌙 Wandering',
        '🍃 Unfurling',
        '🌫️ Misting',
        '🌧️ Drizzling',
        '💭 Daydreaming',
        '🤫 Hushing',
        '🕯️ Listening for meaning',
      ],
      kaomoji: [
        '( ᵕᴗᵕ ) Wandering',
        '( ˘͈ ᵕ ˘͈ ) Unfurling',
        '(｡•́︿•̀｡) Misting',
        '( ´ ▽ ` ) Drizzling',
        '( ˘ω˘ ) Daydreaming',
        '(quietly) Hushing',
        '( ..)φ Listening for meaning',
      ],
    },
    featuredWord: {
      word: 'Unfurling',
      literalMeaning: 'Opening slowly from a folded or rolled state.',
      whyItFeelsRight: 'A thought becoming visible without being forced.',
      vibe: 'soft · patient · lyrical',
    },
  },
  {
    id: 'cat-on-keyboard',
    emoji: '🐈',
    name: 'Cat on Keyboard',
    shortName: 'Cat',
    description:
      'For when Claude is helping, probably, but also sitting directly on the keys.',
    museumDescription:
      'Claude as a cat-shaped productivity hazard: stepping on return, deleting one bracket, and somehow fixing the bug.',
    vibeTags: ['cat', 'chaotic', 'affectionate'],
    styles: {
      classic: [
        'Sitting on keys',
        'Deleting one bracket',
        'Purring near the bug',
        'Ignoring the prompt',
        'Stepping on return',
        'Pretending to help',
      ],
      emoji: [
        '🐈 Sitting on keys',
        '⌫ Deleting one bracket',
        '😺 Purring near the bug',
        '🙃 Ignoring the prompt',
        '↩️ Stepping on return',
        '✨ Pretending to help',
      ],
      kaomoji: [
        'ฅ^•ﻌ•^ฅ Sitting on keys',
        '(=｀ω´=) Deleting one bracket',
        '(=^･ω･^=) Purring near the bug',
        '(=ↀωↀ=) Ignoring the prompt',
        'ฅ(＾・ω・＾ฅ) Stepping on return',
        '(=^‥^=) Pretending to help',
      ],
    },
    featuredWord: {
      word: 'Purring near the bug',
      literalMeaning: 'Being emotionally supportive while not necessarily solving anything.',
      whyItFeelsRight: 'Every hard debugging session deserves a tiny useless assistant.',
      vibe: 'cat · chaos · comfort',
    },
  },
]

export const personalityById = (id: string): Personality =>
  personalities.find((p) => p.id === id) ?? personalities[0]

const STYLE_KEYS: StyleKey[] = ['classic', 'emoji', 'kaomoji']

export function isPersonality(value: unknown): value is Personality {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<Personality>
  if (typeof v.id !== 'string' || !v.id) return false
  if (typeof v.name !== 'string' || !v.name) return false
  if (!v.styles || typeof v.styles !== 'object') return false
  for (const key of STYLE_KEYS) {
    const arr = (v.styles as Record<string, unknown>)[key]
    if (!Array.isArray(arr) || arr.length < 1) return false
    if (!arr.every((s) => typeof s === 'string' && s.length > 0)) return false
  }
  return true
}

function assertValidPersonalities(items: Personality[]): void {
  const seen = new Set<string>()
  for (const p of items) {
    if (!isPersonality(p)) {
      throw new Error(`Invalid personality at id="${(p as Personality)?.id ?? '?'}".`)
    }
    if (seen.has(p.id)) {
      throw new Error(`Duplicate personality id "${p.id}".`)
    }
    seen.add(p.id)
  }
}

assertValidPersonalities(personalities)
