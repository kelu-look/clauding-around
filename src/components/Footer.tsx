const PLACEHOLDER_LINKS = ['GitHub', 'About', 'Docs'] as const

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.05] pt-8 pb-12 text-sm text-slateText-dim">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-slateText/90">Made for people who notice tiny words.</p>
          <p className="text-xs text-slateText-mute">
            Unofficial fan project. Not affiliated with Anthropic.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-1.5 text-sm">
            {PLACEHOLDER_LINKS.map((label) => (
              <li key={label}>
                <span
                  role="link"
                  aria-disabled="true"
                  title="Coming soon"
                  className="btn btn-ghost cursor-not-allowed opacity-60 select-none"
                >
                  {label}
                  <span className="ml-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-slateText-mute">
                    soon
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
