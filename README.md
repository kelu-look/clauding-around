# Clauding Around

An unofficial tiny museum and studio for Claude Code waiting personalities.

> **Disclaimer.** This is a fan project. Not affiliated with Anthropic. The waiting
> personalities are playful microcopy — they do **not** reveal Claude's real internal
> states. No Anthropic branding is used.

## Features

- **The Waiting Museum.** Eight personality cards (Cozy Study, K-pop Comeback, Debug
  Goblin, Chaotic Good, Cosmic Mode, Research Mode, Quiet Poetry, Cat on Keyboard).
- **Featured personality.** A closer look at each pack's signature word.
- **Spinner Pack Studio.** Pick a personality, a display style (Classic / Emoji /
  Kaomoji), and a config mode (`append` / `replace`).
- **JSON config card.** Generates a clean `spinnerVerbs` snippet and copies it to
  the clipboard with Unicode preserved.
- **Shareable links.** Selection is reflected in the URL hash, e.g.
  `#k-pop-comeback/emoji/append`. Copy with the **Copy share link** button.
- **Persistence.** Your last selection is remembered via `localStorage`.
- **Accessibility.** Real buttons / radio groups, visible focus rings, semantic
  landmarks, and full `prefers-reduced-motion` support — spinner rotation slows
  down and decorative animations stop.

## Run locally

Requires Node 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Build

```bash
npm run build     # type-check + bundle into dist/
npm run preview   # serve the built bundle
```

## Deploy

`vite.config.ts` uses `base: './'`, so the built `dist/` works on any subpath.

- **GitHub Pages.** Build, then publish the `dist/` folder (e.g. via the
  `gh-pages` branch or an Actions workflow).
- **Vercel.** Import the repo; framework preset = **Vite**; build command
  `npm run build`; output directory `dist`.

## A note on emoji and kaomoji

The Emoji and Kaomoji styles are marked **experimental** in the UI. Terminal
rendering varies widely by font, emoji-presentation engine, and ambiguous-width
handling — some glyphs may look off in your terminal even though they look fine
in this preview. Switch back to **Classic** if anything renders oddly where you
actually use Claude Code.
