import { useEffect, useMemo, useState } from 'react'
import type { ConfigMode } from './PackStudio'

interface JsonConfigCardProps {
  verbs: string[]
  mode: ConfigMode
  shareHash: string
}

type CopyTarget = 'json' | 'link' | null

function buildJson(verbs: string[], mode: ConfigMode): string {
  const payload = {
    spinnerVerbs: {
      mode,
      verbs,
    },
  }
  return JSON.stringify(payload, null, 2)
}

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function JsonConfigCard({ verbs, mode, shareHash }: JsonConfigCardProps) {
  const json = useMemo(() => buildJson(verbs, mode), [verbs, mode])
  const [copied, setCopied] = useState<CopyTarget>(null)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(null), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  const copyJson = async () => {
    const ok = await writeToClipboard(json)
    if (ok) setCopied('json')
  }

  const copyLink = async () => {
    const url =
      typeof window === 'undefined'
        ? shareHash
        : `${window.location.origin}${window.location.pathname}${window.location.search}${shareHash}`
    const ok = await writeToClipboard(url)
    if (ok) setCopied('link')
  }

  return (
    <section id="config" className="scroll-mt-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-accent-amber/80">
          Config
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Drop this into your Claude Code settings.
        </h2>
        <p className="max-w-2xl text-sm text-slateText-dim">
          A small JSON snippet, formatted for humans. Unicode is preserved literally so emoji
          and kaomoji survive the copy.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.05] px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-slateText-mute">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" aria-hidden />
            <span className="ml-2 font-mono">spinnerVerbs.json</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={`btn ${copied === 'link' ? 'btn-primary' : ''}`}
              onClick={copyLink}
              aria-live="polite"
              aria-label="Copy a shareable link to this pack"
            >
              {copied === 'link' ? 'Link copied!' : 'Copy share link'}
            </button>
            <button
              type="button"
              className={`btn ${copied === 'json' ? 'btn-primary' : ''}`}
              onClick={copyJson}
              aria-live="polite"
              aria-label="Copy the JSON config to clipboard"
            >
              {copied === 'json' ? 'Copied!' : 'Copy JSON'}
            </button>
          </div>
        </div>

        <pre
          className="m-0 max-h-[28rem] overflow-auto px-5 py-5 font-mono text-sm leading-relaxed text-slateText/90"
          aria-label="Generated JSON config"
        >
          <code>{json}</code>
        </pre>
      </div>
    </section>
  )
}
