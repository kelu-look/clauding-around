# Docs / preview assets

This folder holds the screenshots and GIFs shown in the project README.

## Files the README expects

- `docs/preview.png` — a static screenshot of the landing page.
- `docs/demo.gif` — a short interaction recording (≤ 8s, ≤ 5 MB).

If a file isn't present yet, the README links to it commented-out — uncomment
the relevant line in `README.md` after you drop the file in.

## Capturing `docs/preview.png`

1. Open <https://kelu-look.github.io/clauding-around/>.
2. Resize the browser to ~1440×900.
3. `Cmd-Shift-4`, then space, then click the window — or use any other tool.
4. Save the PNG as `docs/preview.png`.

## Recording `docs/demo.gif`

### Option A — macOS Screenshot app + gifski (recommended)

```bash
brew install gifski
```

1. `Cmd-Shift-5` → Record Selected Portion → record the demo flow.
2. Save the `.mov` somewhere.
3. Convert:

```bash
gifski input.mov -o docs/demo.gif --fps 12 --width 1200
```

### Option B — Kap or CleanShot

Export directly to GIF, drop it into `docs/demo.gif`.

## Suggested demo flow (~6–8s)

1. Open the live demo.
2. Click **K-pop Comeback** in the museum.
3. In the studio, toggle to **Emoji**.
4. Click **Copy JSON**.
5. Click **Cat on Keyboard** in the museum.
6. Toggle to **Kaomoji**.
7. Click **Copy share link**.

Aim for under 8 seconds and under 5 MB.
