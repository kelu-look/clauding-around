#!/usr/bin/env node
/**
 * Capture README showcase assets:
 *   - docs/preview.png  (1440x900 hero screenshot)
 *   - docs/demo.webm    (short Playwright recording)
 *   - docs/demo.gif     (ffmpeg-converted GIF, optional)
 *
 * Usage:
 *   npm run build && npm run capture
 *
 * Environment overrides:
 *   CAPTURE_BASE_URL  — point at an already-running server, e.g.
 *                       http://127.0.0.1:5173/
 *                       Skips spawning `vite preview`.
 *   CAPTURE_PORT      — port for the auto-spawned `vite preview` (default 4173).
 */

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import net from 'node:net'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const docsDir = join(projectRoot, 'docs')

const PORT = Number(process.env.CAPTURE_PORT ?? 4173)
const BASE_URL = process.env.CAPTURE_BASE_URL ?? `http://127.0.0.1:${PORT}/`
const useExternalServer = !!process.env.CAPTURE_BASE_URL

const VIEWPORT = { width: 1440, height: 900 }
const VIDEO_SIZE = { width: 1280, height: 800 }

async function portInUse(port) {
  return new Promise((resolve) => {
    const s = net
      .createServer()
      .once('error', () => resolve(true))
      .once('listening', () => s.close(() => resolve(false)))
      .listen(port, '127.0.0.1')
  })
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url)
      if (r.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`Server did not become ready at ${url} within ${timeoutMs}ms`)
}

function runCmd(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', cwd: projectRoot, ...opts })
    p.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`)),
    )
    p.on('error', reject)
  })
}

async function ensureBuild() {
  if (existsSync(join(projectRoot, 'dist', 'index.html'))) return
  console.log('• dist/ missing — running `npm run build`…')
  await runCmd('npm', ['run', 'build'])
}

async function startPreview() {
  if (await portInUse(PORT)) {
    throw new Error(
      `Port ${PORT} is in use. Free it, or set CAPTURE_PORT / CAPTURE_BASE_URL.`,
    )
  }
  console.log(`• starting vite preview on :${PORT}…`)
  const child = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1', '--strictPort'],
    { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] },
  )
  child.stderr.on('data', (b) => process.stderr.write(`[vite] ${b}`))
  await waitForServer(BASE_URL)
  console.log(`• server up at ${BASE_URL}`)
  return child
}

async function which(cmd) {
  return new Promise((resolve) => {
    const p = spawn('which', [cmd], { stdio: ['ignore', 'pipe', 'ignore'] })
    let out = ''
    p.stdout.on('data', (b) => (out += b.toString()))
    p.on('exit', (code) => resolve(code === 0 ? out.trim() : null))
    p.on('error', () => resolve(null))
  })
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const p = spawn('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] })
    p.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)),
    )
    p.on('error', reject)
  })
}

async function captureScreenshot(browser) {
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  })
  const page = await ctx.newPage()
  // Use the clean base URL so the screenshot reflects the no-hash default state.
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  // Let fonts and spinner settle for a clean frame.
  await page.waitForTimeout(900)
  const out = join(docsDir, 'preview.png')
  await page.screenshot({ path: out, fullPage: false })
  console.log(`• screenshot → ${out}`)
  await ctx.close()
}

async function captureDemo(browser) {
  const videoDir = join(docsDir, '.video-tmp')
  await rm(videoDir, { recursive: true, force: true })
  await mkdir(videoDir, { recursive: true })

  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: videoDir, size: VIDEO_SIZE },
  })
  const page = await ctx.newPage()
  await page.goto(BASE_URL + '#k-pop-comeback/emoji/append', { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)

  // Copy JSON
  const copyJson = page.getByRole('button', { name: /copy the json config/i }).first()
  await copyJson.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await copyJson.click()
  await page.waitForTimeout(1100)

  // Switch to Cat on Keyboard via its museum card button
  const tryCat = page.getByRole('button', {
    name: /try the cat on keyboard personality/i,
  })
  await tryCat.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await tryCat.click()
  await page.waitForTimeout(900)

  // Toggle Kaomoji
  const kaomoji = page.getByRole('radio', { name: /^kaomoji$/i }).first()
  await kaomoji.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await kaomoji.click()
  await page.waitForTimeout(800)

  // Copy share link
  const copyLink = page
    .getByRole('button', { name: /copy a shareable link to this pack/i })
    .first()
  await copyLink.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await copyLink.click()
  await page.waitForTimeout(1300)

  await ctx.close()

  const files = (await readdir(videoDir)).filter((f) => f.endsWith('.webm'))
  if (!files.length) throw new Error('No video recorded')
  const src = join(videoDir, files[0])
  const dest = join(docsDir, 'demo.webm')
  await rm(dest, { force: true })
  await rename(src, dest)
  await rm(videoDir, { recursive: true, force: true })
  console.log(`• video → ${dest}`)
  return dest
}

async function convertToGif(webmPath) {
  const ffmpegPath = await which('ffmpeg')
  if (!ffmpegPath) {
    console.warn('• ffmpeg not found — skipping GIF. Keeping docs/demo.webm.')
    return null
  }
  const gifPath = join(docsDir, 'demo.gif')

  await runFfmpeg([
    '-y',
    '-i',
    webmPath,
    '-vf',
    'fps=12,scale=1200:-1:flags=lanczos',
    gifPath,
  ])
  let sizeMb = (await stat(gifPath)).size / 1024 / 1024
  console.log(`• gif (fps=12, w=1200) = ${sizeMb.toFixed(2)} MB`)

  if (sizeMb > 5) {
    console.log('• > 5 MB — re-encoding smaller')
    await runFfmpeg([
      '-y',
      '-i',
      webmPath,
      '-vf',
      'fps=10,scale=900:-1:flags=lanczos',
      gifPath,
    ])
    sizeMb = (await stat(gifPath)).size / 1024 / 1024
    console.log(`• gif (fps=10, w=900)  = ${sizeMb.toFixed(2)} MB`)
  }
  console.log(`• gif → ${gifPath}`)
  return gifPath
}

async function main() {
  await mkdir(docsDir, { recursive: true })
  await ensureBuild()

  const server = useExternalServer ? null : await startPreview()
  let browser

  try {
    browser = await chromium.launch()
    await captureScreenshot(browser)
    const videoPath = await captureDemo(browser)
    await convertToGif(videoPath)
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (server) {
      server.kill('SIGTERM')
      // Give it a moment to release the port.
      await new Promise((r) => setTimeout(r, 400))
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
