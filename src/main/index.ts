import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { execFile } from 'node:child_process'
import { existsSync, promises as fsp, type Dirent } from 'node:fs'
import { homedir } from 'node:os'
import { basename, dirname, extname, join } from 'node:path'
import { promisify } from 'node:util'
import type {
  DoctorReport, FileEntry, PersistedState, SkillInfo, UsageDay
} from '../shared/types'
import * as git from './git'
import * as llm from './llm'
import * as pty from './pty'
import * as storage from './storage'
import { allowPath, guardPath, guardState } from './guard'

const run = promisify(execFile)
const isWin = process.platform === 'win32'

const NOISE = new Set([
  'node_modules', '.git', 'build', 'dist', 'out', '.next', 'venv', '.venv', 'target',
  'vendor', 'coverage', 'DerivedData', 'Pods', '.cache', '__pycache__', '.turbo',
  '.gradle', '.idea', 'release', 'bin', 'obj'
])
const KEEP_DOT = new Set(['.gitignore', '.env.example', '.editorconfig', '.claude', '.github'])
const SKIP_EXT = new Set(['.exe', '.dll', '.so', '.dylib', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.zip', '.gz', '.7z', '.pdf', '.woff', '.woff2', '.ttf', '.mp4', '.mp3', '.db', '.sqlite'])

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1560,
    height: 1000,
    minWidth: 1080,
    minHeight: 680,
    backgroundColor: '#0b0d10',
    show: false,
    autoHideMenuBar: true,
    title: 'God Terminal',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#080a0e',
      symbolColor: '#f1f4f9',
      height: 58
    },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      webviewTag: true,
      spellcheck: false
    }
  })
  mainWindow.webContents.on('will-attach-webview', (event, webPreferences, params) => {
    webPreferences.nodeIntegration = false
    webPreferences.contextIsolation = true
    webPreferences.preload = undefined
    if (!/^https?:\/\//i.test(String(params.src ?? ''))) event.preventDefault()
  })
  mainWindow.once('ready-to-show', () => mainWindow?.show())
  mainWindow.webContents.session.setPermissionRequestHandler((_wc, permission, cb) => {
    cb(['media', 'clipboard-read', 'clipboard-sanitized-write', 'fullscreen', 'notifications'].includes(permission))
  })

  // --smoke renders the first screen to smoke.png and quits. --smoke-team also
  // opens the team composer, launches three consoles and captures both states.
  if (process.argv.includes('--smoke')) {
    mainWindow.webContents.once('did-finish-load', () => {
      // Smoke runs are usually unfocused; without this, CSS entrance animations stay paused.
      mainWindow!.webContents.setBackgroundThrottling(false)
      setTimeout(async () => {
        const shot = async (file: string) => {
          const img = await mainWindow!.webContents.capturePage()
          await fsp.writeFile(join(process.cwd(), file), img.toPNG())
          console.log(`${file} written`)
        }
        try {
          if (process.argv.includes('--smoke-brain-chat')) {
            const chat = await mainWindow!.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="open-brain"]')?.click()
              await new Promise((r) => setTimeout(r, 900))
              const input = document.querySelector('[data-testid="brain-input"]')
              if (!input) return JSON.stringify({ error: 'input not found' })
              const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
              setter?.call(input, 'Antworte nur mit dem Wort OK.')
              input.dispatchEvent(new Event('input', { bubbles: true }))
              input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
              const started = Date.now()
              while (Date.now() - started < 60000) {
                await new Promise((r) => setTimeout(r, 700))
                const replies = [...document.querySelectorAll('.main-brain-thread .msg-brain .msg-text')]
                  .map((n) => n.textContent ?? '')
                if (replies.length) {
                  return JSON.stringify({
                    replies,
                    busy: !!document.querySelector('.brain-typing'),
                    elapsed: Date.now() - started
                  })
                }
              }
              return JSON.stringify({ replies: [], error: 'timeout', busy: !!document.querySelector('.brain-typing') })
            })()`)
            console.log('SMOKE_BRAIN_CHAT', chat)
            await shot('smoke-brain-chat.png')
          } else if (process.argv.includes('--smoke-brain')) {
            const opened = await mainWindow!.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="open-brain"]')?.click()
              await new Promise((r) => setTimeout(r, 1200))
              const panel = document.querySelector('[data-testid="main-brain-thread"]')
              const input = document.querySelector('[data-testid="brain-input"]')
              return JSON.stringify({
                opened: !!panel,
                input: !!input,
                name: document.querySelector('.brain-strip-name')?.textContent ?? '',
                model: document.querySelector('.brain-model-btn')?.textContent ?? ''
              })
            })()`)
            console.log('SMOKE_BRAIN_OPEN', opened)
            await shot('smoke-brain.png')
            const ready = await mainWindow!.webContents.executeJavaScript(`(async () => {
              await new Promise((r) => setTimeout(r, 500))
              return JSON.stringify({
                threadMessages: document.querySelectorAll('.main-brain-thread .msg').length,
                brainStrip: !!document.querySelector('.brain-strip'),
                rightRail: !!document.querySelector('.right-rail'),
                ringButtons: document.querySelectorAll('.ring-btn').length
              })
            })()`)
            console.log('SMOKE_BRAIN_READY', ready)
            await shot('smoke-brain-board.png')
          } else if (process.argv.includes('--smoke-team')) {
            const opened = await mainWindow!.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="open-team"]')?.click()
              await new Promise((r) => setTimeout(r, 800))
              const c = document.querySelector('[data-testid="team-composer"]')
              return JSON.stringify({ opened: !!c, slots: c ? c.querySelectorAll('.tc-slot').length : 0 })
            })()`)
            console.log('SMOKE_TEAM_OPEN', opened)
            await shot('smoke-team.png')
            const launched = await mainWindow!.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="launch-team"]')?.click()
              await new Promise((r) => setTimeout(r, 2200))
              return JSON.stringify({
                consoles: document.querySelectorAll('.node-console').length,
                groups: document.querySelectorAll('.group-box').length,
                nodes: document.querySelectorAll('.node').length,
                composerOpen: !!document.querySelector('[data-testid="team-composer"]'),
                running: document.body.innerText.match(/\d+ live/)?.[0] ?? null
              })
            })()`)
            console.log('SMOKE_TEAM_LAUNCH', launched)
            await shot('smoke-team-board.png')
          } else if (process.argv.includes('--smoke-ui')) {
            const pan = await mainWindow!.webContents.executeJavaScript(`(async () => {
              const b = document.querySelector('.board')
              const r = b.getBoundingClientRect()
              const world = document.querySelector('.world')
              const before = world?.style.transform ?? ''
              b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 2, clientX: r.left + 700, clientY: r.top + 420 }))
              await new Promise((x) => setTimeout(x, 80))
              window.dispatchEvent(new PointerEvent('pointermove', { clientX: r.left + 790, clientY: r.top + 470 }))
              await new Promise((x) => setTimeout(x, 120))
              window.dispatchEvent(new PointerEvent('pointerup', { clientX: r.left + 790, clientY: r.top + 470 }))
              await new Promise((x) => setTimeout(x, 120))
              return JSON.stringify({ before, after: world?.style.transform ?? '', ringButtons: document.querySelectorAll('.ring-btn').length })
            })()`)
            console.log('SMOKE_UI_PAN', pan)
            await shot('smoke-pan.png')
            const zoom = await mainWindow!.webContents.executeJavaScript(`(async () => {
              const b = document.querySelector('.board')
              const r = b.getBoundingClientRect()
              b.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -160, clientX: r.left + 700, clientY: r.top + 420 }))
              await new Promise((x) => setTimeout(x, 220))
              return JSON.stringify({ zoom: document.querySelector('.zoom-hud span')?.textContent ?? '', ringButtons: document.querySelectorAll('.ring-btn').length })
            })()`)
            console.log('SMOKE_UI_ZOOM', zoom)
            await shot('smoke-ui.png')
          } else if (process.argv.includes('--smoke-zoomout')) {
            await mainWindow!.webContents.capturePage()
            await new Promise((x) => setTimeout(x, 500))
            const out = await mainWindow!.webContents.executeJavaScript(`(async () => {
              document.querySelector('.drawer-wrap .icon.big')?.click()
              await new Promise((x) => setTimeout(x, 450))
              const b = document.querySelector('.board')
              const r = b.getBoundingClientRect()
              for (let i = 0; i < 2; i++) {
                b.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120, clientX: r.left + 700, clientY: r.top + 420 }))
                await new Promise((x) => setTimeout(x, 60))
              }
              await new Promise((x) => setTimeout(x, 600))
              const nodes = [...document.querySelectorAll('.node')].map((n) => {
                const cs = getComputedStyle(n)
                const nr = n.getBoundingClientRect()
                return {
                  opacity: cs.opacity, display: cs.display, visibility: cs.visibility,
                  animation: cs.animationName, x: Math.round(nr.x), y: Math.round(nr.y),
                  w: Math.round(nr.width), h: Math.round(nr.height)
                }
              })
              return JSON.stringify({
                zoom: document.querySelector('.zoom-hud span')?.textContent ?? '',
                transform: document.querySelector('.world')?.style.transform ?? '',
                drawer: !!document.querySelector('.drawer-wrap'),
                nodes
              })
            })()`)
            console.log('SMOKE_ZOOMOUT', out)
            await shot('smoke-zoomout.png')
          } else if (process.argv.includes('--smoke-director')) {
            await mainWindow!.webContents.capturePage()
            await new Promise((x) => setTimeout(x, 500))
            const director = await mainWindow!.webContents.executeJavaScript(`(async () => {
              const wait = (ms) => new Promise((r) => setTimeout(r, ms))
              const rect = (sel) => {
                const el = document.querySelector(sel)
                if (!el) return null
                const r = el.getBoundingClientRect()
                return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom }
              }
              const overlap = (a, b) => !!a && !!b && a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y
              const rail = rect('[data-testid="tool-rail"]')
              const stage = rect('.stage')
              const team = rect('.team-rail')
              const dock = rect('.command-dock')
              const panel = rect('.node-orchestrator')
              const count = () => document.querySelectorAll('.wire-core').length
              const clickNode = (node) => {
                const r = node.getBoundingClientRect()
                node.dispatchEvent(new PointerEvent('pointerdown', {
                  bubbles: true, cancelable: true, button: 0, buttons: 1,
                  clientX: r.left + r.width / 2, clientY: r.top + r.height / 2
                }))
              }
              const wireTool = document.querySelector('[data-testid="wire-tool"]')
              const controller = document.querySelector('.node-orchestrator')
              const crew = [...document.querySelectorAll('.node-console')]
              const otto = crew.find((n) => n.querySelector('.node-title')?.textContent === 'Otto') ?? crew[0]
              const before = count()
              wireTool?.click()
              await wait(120)
              clickNode(controller)
              await wait(120)
              clickNode(otto)
              await wait(160)
              const off = count()
              wireTool?.click()
              await wait(120)
              wireTool?.click()
              await wait(120)
              clickNode(controller)
              await wait(180)
              const on = count()
              wireTool?.click()
              await wait(120)
              return JSON.stringify({
                toolButtons: document.querySelectorAll('.tool-btn').length,
                railWidth: rail ? Math.round(rail.w) : 0,
                director: !!controller,
                directorTitle: controller?.querySelector('.node-title')?.textContent ?? '',
                hasGem: !!document.querySelector('.director-gem'),
                links: document.querySelectorAll('.director-link').length,
                before, off, on, wires: count(),
                railClear: !!rail && !!stage && !overlap(rail, stage),
                teamClear: !!stage && !!team && !overlap(stage, team) && (!rail || !overlap(rail, team)),
                dockInside: !!dock && !!stage && dock.x >= stage.x && dock.right <= stage.right && dock.bottom <= stage.bottom,
                directorClear: !!panel && !overlap(panel, rail) && !overlap(panel, team) && !overlap(panel, dock),
                noOrb: !document.querySelector('.rail-orb') && !document.querySelector('.ring-menu') && !document.querySelector('.ring-btn'),
                overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
              })
            })()`)
            console.log('SMOKE_DIRECTOR', director)
            await mainWindow!.webContents.executeJavaScript(`document.querySelectorAll('.toast').forEach((t) => t.click())`)
            await new Promise((x) => setTimeout(x, 120))
            await shot('smoke-director.png')
            mainWindow!.setSize(1080, 680)
            await new Promise((x) => setTimeout(x, 700))
            const compact = await mainWindow!.webContents.executeJavaScript(`(() => {
              const rect = (sel) => {
                const el = document.querySelector(sel)
                if (!el) return null
                const r = el.getBoundingClientRect()
                return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom }
              }
              const overlap = (a, b) => !!a && !!b && a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y
              const rail = rect('[data-testid="tool-rail"]')
              const stage = rect('.stage')
              const dock = rect('.command-dock')
              const panel = rect('.node-orchestrator')
              const teamEl = document.querySelector('.team-rail')
              const buttons = [...document.querySelectorAll('.tool-btn')]
              const buttonsFit = buttons.length === 18 && buttons.every((b) => {
                const r = b.getBoundingClientRect()
                return r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth
              })
              return JSON.stringify({
                width: window.innerWidth, height: window.innerHeight,
                toolButtons: buttons.length,
                buttonsFit,
                railWidth: rail ? Math.round(rail.w) : 0,
                railClear: !!rail && !!stage && !overlap(rail, stage),
                teamHidden: !teamEl || getComputedStyle(teamEl).display === 'none',
                dockInside: !!dock && !!stage && dock.x >= stage.x && dock.right <= stage.right && dock.bottom <= stage.bottom,
                directorClear: !!panel && !overlap(panel, rail) && !overlap(panel, dock),
                overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
              })
            })()`)
            console.log('SMOKE_DIRECTOR_COMPACT', compact)
            await shot('smoke-director-compact.png')
          } else if (process.argv.includes('--smoke-guard')) {
            const out = await mainWindow!.webContents.executeJavaScript(`(async () => {
              const cwd = await window.api.cwd()
              let allowed = 'no'
              let blocked = 'not-blocked'
              let external = 'not-blocked'
              let save = 'skipped'
              let badSave = 'skipped'
              try {
                const r = await window.api.fs.readFile(cwd + '/package.json')
                allowed = r.text.includes('"name": "god-terminal"') ? 'allowed' : 'unexpected'
              } catch (e) {
                allowed = 'error: ' + (e && e.message ? e.message : String(e))
              }
              try {
                await window.api.fs.readFile('C:/Windows/win.ini')
                blocked = 'NOT_BLOCKED'
              } catch {
                blocked = 'blocked'
              }
              try {
                await window.api.shell.openExternal('file:///C:/Windows/win.ini')
                external = 'NOT_BLOCKED'
              } catch {
                external = 'blocked'
              }
              const state = await window.api.store.load()
              if (state && state.repos && state.repos.length) {
                try {
                  await window.api.store.save(state)
                  save = 'allowed'
                } catch {
                  save = 'error'
                }
                try {
                  const bad = JSON.parse(JSON.stringify(state))
                  bad.repos[0].path = 'C:/Windows'
                  await window.api.store.save(bad)
                  badSave = 'NOT_BLOCKED'
                } catch {
                  badSave = 'blocked'
                }
              }
              return JSON.stringify({ allowed, blocked, external, save, badSave })
            })()`)
            console.log('SMOKE_GUARD', out)
            await shot('smoke-guard.png')
          } else {
            const info = await mainWindow!.webContents.executeJavaScript(`JSON.stringify({
              layers: [...document.querySelectorAll('.ws-layer')].map((l) => ({ cls: l.className, display: getComputedStyle(l).display })),
              nodes: [...document.querySelectorAll('.node')].map((n) => ({ cls: n.className, left: n.style.left, top: n.style.top, w: n.style.width, h: n.style.height, display: getComputedStyle(n).display })),
              boards: document.querySelectorAll('.board').length
            })`)
            console.log('SMOKE_INFO', info)
            await shot('smoke.png')
          }
        } catch (err) {
          console.error('smoke capture failed', err)
          process.exitCode = 1
        } finally {
          app.quit()
        }
      }, process.argv.includes('--smoke-team') || process.argv.includes('--smoke-ui') || process.argv.includes('--smoke-brain') || process.argv.includes('--smoke-brain-chat') || process.argv.includes('--smoke-zoomout') || process.argv.includes('--smoke-director') || process.argv.includes('--smoke-guard') ? 3200 : 5000)
    })
  }
  mainWindow.on('closed', () => {
    mainWindow = null
    pty.killAll()
  })
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) void shell.openExternal(url)
    return { action: 'deny' }
  })

  const demo = process.argv.includes('--demo')
  const devUrl = process.env['ELECTRON_RENDERER_URL']
  if (devUrl) void mainWindow.loadURL(demo ? `${devUrl}?demo=1` : devUrl)
  else void mainWindow.loadFile(join(__dirname, '../renderer/index.html'), demo ? { query: { demo: '1' } } : undefined)

  if (process.argv.includes('--smoke')) {
    mainWindow.webContents.on('console-message', (_e, level, message) => {
      console.log(`[renderer:${level}] ${message}`)
    })
  }
}

app.whenReady().then(() => {
  storage.migrateLegacy()
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  pty.killAll()
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => pty.killAll())

/* ------------------------------------------------------------------ fs ---- */

async function readDir(dir: string): Promise<FileEntry[]> {
  const entries = await fsp.readdir(dir, { withFileTypes: true })
  const out: FileEntry[] = []
  for (const e of entries.slice(0, 800)) {
    if (NOISE.has(e.name)) continue
    if (e.name.startsWith('.') && !KEEP_DOT.has(e.name)) continue
    const full = join(dir, e.name)
    let size = 0
    try {
      if (!e.isDirectory()) size = (await fsp.stat(full)).size
    } catch {
      continue
    }
    out.push({ name: e.name, path: full, dir: e.isDirectory(), size, ext: extname(e.name).toLowerCase() })
  }
  return out.sort((a, b) => Number(b.dir) - Number(a.dir) || a.name.localeCompare(b.name))
}

async function scanMarkdown(root: string): Promise<FileEntry[]> {
  const out: FileEntry[] = []
  async function walk(dir: string, depth: number): Promise<void> {
    if (out.length >= 2000 || depth > 8) return
    let entries: Dirent[]
    try {
      entries = await fsp.readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (out.length >= 2000) return
      if (e.name.startsWith('.') && !KEEP_DOT.has(e.name)) continue
      if (NOISE.has(e.name)) continue
      const full = join(dir, e.name)
      if (e.isDirectory()) await walk(full, depth + 1)
      else if (/\.(md|markdown|mdx)$/i.test(e.name)) {
        try {
          out.push({ name: e.name, path: full, dir: false, size: (await fsp.stat(full)).size, ext: extname(e.name).toLowerCase() })
        } catch {
          /* ignore */
        }
      }
    }
  }
  await walk(root, 0)
  return out
}

/* --------------------------------------------------------------- skills ---- */

function frontmatter(text: string): { name?: string; description?: string } {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const out: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/)
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
  }
  return { name: out.name, description: out.description }
}

function lintSkill(name: string, text: string, folder: string, description?: string): string[] {
  const findings: string[] = []
  if (!/^[a-z0-9-]{1,64}$/.test(name)) findings.push('Name: nur Kleinbuchstaben, Ziffern und Bindestriche, max. 64 Zeichen.')
  if (!description) findings.push('Beschreibung fehlt.')
  if (description && description.length > 1536) findings.push('Beschreibung ist länger als 1.536 Zeichen.')
  if (!text.trim()) findings.push('Der Inhalt ist leer.')
  if (text.split('\n').length > 500) findings.push('Der Inhalt ist länger als 500 Zeilen.')
  if (folder && name !== folder) findings.push(`Name weicht vom Ordnernamen „${folder}" ab.`)
  if (/^[a-z-]+:\s*<.*>/m.test(text)) findings.push('Spitze Klammern in einem Feld.')
  return findings
}

async function scanSkills(repoPath: string): Promise<SkillInfo[]> {
  const out: SkillInfo[] = []
  const push = async (p: string, scope: SkillInfo['scope'], nameHint?: string) => {
    try {
      const text = await fsp.readFile(p, 'utf8')
      const fm = frontmatter(text)
      const name = fm.name || nameHint || basename(p, '.md')
      out.push({
        name,
        description: fm.description ?? '',
        path: p,
        scope,
        body: text,
        findings: lintSkill(name, text, scope === 'command' ? '' : nameHint ?? '', fm.description)
      })
    } catch {
      /* ignore */
    }
  }
  const personal = join(homedir(), '.claude', 'skills')
  try {
    for (const e of await fsp.readdir(personal, { withFileTypes: true })) {
      if (!e.isDirectory()) continue
      const p = join(personal, e.name, 'SKILL.md')
      if (existsSync(p)) await push(p, 'personal', e.name)
    }
  } catch {
    /* no personal skills */
  }
  const project = join(repoPath, '.claude', 'skills')
  try {
    for (const e of await fsp.readdir(project, { withFileTypes: true })) {
      if (!e.isDirectory()) continue
      const p = join(project, e.name, 'SKILL.md')
      if (existsSync(p)) await push(p, 'project', e.name)
    }
  } catch {
    /* none */
  }
  for (const dir of [join(homedir(), '.claude', 'commands'), join(repoPath, '.claude', 'commands')]) {
    try {
      for (const e of await fsp.readdir(dir)) {
        if (!e.endsWith('.md')) continue
        await push(join(dir, e), 'command', basename(e, '.md'))
      }
    } catch {
      /* none */
    }
  }
  return out.slice(0, 400)
}

/* ---------------------------------------------------------------- usage ---- */

async function walkJsonl(dir: string, agent: string, out: UsageDay[], depth = 0): Promise<void> {
  if (depth > 6 || out.length > 4000) return
  let entries: Dirent[]
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (out.length > 4000) return
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      await walkJsonl(full, agent, out, depth + 1)
      continue
    }
    if (!e.name.endsWith('.jsonl')) continue
    let text: string
    try {
      text = await fsp.readFile(full, 'utf8')
    } catch {
      continue
    }
    for (const line of text.split(/\r?\n/)) {
      if (!line.includes('token')) continue
      try {
        const j = JSON.parse(line) as Record<string, unknown>
        const usage =
          (j.usage as Record<string, number> | undefined) ??
          ((j.message as Record<string, unknown> | undefined)?.usage as Record<string, number> | undefined) ??
          (j.info as Record<string, unknown> | undefined)
        const input = Number(usage?.input_tokens ?? usage?.input ?? 0)
        const output = Number(usage?.output_tokens ?? usage?.output ?? 0)
        if (!input && !output) continue
        const rawDate = String(j.timestamp ?? j.time ?? j.date ?? '')
        const date = /^\d{4}-\d{2}-\d{2}/.test(rawDate)
          ? rawDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10)
        out.push({ date, agent, input, output, total: input + output })
      } catch {
        /* skip malformed line */
      }
    }
  }
}

async function scanUsage(): Promise<UsageDay[]> {
  const days: UsageDay[] = []
  await walkJsonl(join(homedir(), '.claude', 'projects'), 'Claude Code', days)
  await walkJsonl(join(homedir(), '.codex', 'sessions'), 'Codex', days)
  const merged = new Map<string, UsageDay>()
  for (const d of days) {
    const key = `${d.date}|${d.agent}`
    const cur = merged.get(key)
    if (cur) {
      cur.input += d.input
      cur.output += d.output
      cur.total += d.total
    } else merged.set(key, { ...d })
  }
  return [...merged.values()].sort((a, b) => a.date.localeCompare(b.date))
}

/* ------------------------------------------------------------------ ipc ---- */

function registerIpc(): void {
  ipcMain.handle('app:home', () => homedir())
  ipcMain.handle('app:cwd', () => process.cwd())
  ipcMain.handle('app:doctor', async (): Promise<DoctorReport> => {
    const ms = await llm.models()
    let sttOk = false
    try {
      const r = await fetch('http://127.0.0.1:8080/health', { signal: AbortSignal.timeout(1500) })
      sttOk = r.ok
    } catch {
      sttOk = false
    }
    let gitOk = true
    try {
      await run('git', ['--version'])
    } catch {
      gitOk = false
    }
    return {
      ollama: { ok: ms.length > 0, models: ms, ...(ms.length ? {} : { error: 'Ollama nicht erreichbar oder ohne Modelle' }) },
      stt: { ok: sttOk, ...(sttOk ? {} : { error: 'Lokaler Whisper-Server nicht erreichbar (Port 8080)' }) },
      git: { ok: gitOk },
      platform: process.platform
    }
  })

  ipcMain.handle('pty:create', (event, opts: { id: string; cwd: string; command: string; args: string[]; env?: Record<string, string> }) => {
    const safe = { ...opts, cwd: opts.cwd ? guardPath(opts.cwd) : process.cwd() }
    const res = pty.create(safe)
    const proc = pty.get(safe.id)
    if (proc) {
      proc.onData((data) => {
        if (!event.sender.isDestroyed()) event.sender.send('pty:data', opts.id, data)
      })
      proc.onExit(({ exitCode }) => {
        if (!event.sender.isDestroyed()) event.sender.send('pty:exit', opts.id, exitCode)
      })
    }
    return res
  })
  ipcMain.handle('pty:write', (_e, id: string, data: string) => pty.write(id, data))
  ipcMain.handle('pty:resize', (_e, id: string, cols: number, rows: number) => pty.resize(id, cols, rows))
  ipcMain.handle('pty:kill', (_e, id: string) => pty.kill(id))
  ipcMain.handle('pty:list', () => pty.list())

  ipcMain.handle('store:load', () => storage.load())
  ipcMain.handle('store:save', (_e, state: PersistedState) => {
    guardState(state)
    storage.save(state)
  })

  ipcMain.handle('dialog:pickFolder', async () => {
    const res = await dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })
    if (res.canceled) return null
    res.filePaths.forEach(allowPath)
    return res.filePaths[0] ?? null
  })
  ipcMain.handle('dialog:pickFiles', async () => {
    const res = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
    if (res.canceled) return []
    res.filePaths.forEach(allowPath)
    return res.filePaths
  })

  ipcMain.handle('shell:openPath', (_e, p: string) => shell.openPath(guardPath(p)))
  ipcMain.handle('shell:showItem', (_e, p: string) => shell.showItemInFolder(guardPath(p)))
  ipcMain.handle('shell:openExternal', (_e, url: string) => {
    if (!/^https?:\/\//i.test(url)) throw new Error('Blocked: only http(s) links can open externally')
    return shell.openExternal(url)
  })

  ipcMain.handle('fs:readDir', (_e, p: string) => readDir(guardPath(p)))
  ipcMain.handle('fs:readFile', async (_e, p: string) => {
    const file = guardPath(p)
    const stat = await fsp.stat(file)
    if (stat.size > 800 * 1024) return { text: '', truncated: true }
    const buf = await fsp.readFile(file)
    if (buf.includes(0)) return { text: 'Binärdatei — keine Vorschau.', truncated: false }
    return { text: buf.toString('utf8'), truncated: false }
  })
  ipcMain.handle('fs:writeFile', async (_e, p: string, text: string) => {
    const file = guardPath(p)
    await fsp.mkdir(dirname(file), { recursive: true })
    await fsp.writeFile(file, text, 'utf8')
  })
  ipcMain.handle('fs:mkdir', (e, p: string) => fsp.mkdir(guardPath(p), { recursive: true }))
  ipcMain.handle('fs:trash', async (_e, p: string) => {
    await shell.trashItem(guardPath(p))
  })
  ipcMain.handle('fs:exists', (e, p: string) => existsSync(guardPath(p)))
  ipcMain.handle('fs:stat', async (_e, p: string) => {
    const file = guardPath(p)
    try {
      const s = await fsp.stat(file)
      return { size: s.size, mtime: s.mtimeMs, dir: s.isDirectory() }
    } catch {
      return null
    }
  })
  ipcMain.handle('fs:scanMarkdown', (_e, root: string) => scanMarkdown(guardPath(root)))

  ipcMain.handle('git:status', (_e, cwd: string) => git.status(guardPath(cwd)))
  ipcMain.handle('git:commit', (_e, cwd: string, message: string, files: string[]) => git.commit(guardPath(cwd), message, files))
  ipcMain.handle('git:push', (_e, cwd: string) => git.push(guardPath(cwd)))
  ipcMain.handle('git:pull', (_e, cwd: string) => git.pull(guardPath(cwd)))
  ipcMain.handle('git:branches', (_e, cwd: string) => git.branches(guardPath(cwd)))
  ipcMain.handle('git:checkout', (_e, cwd: string, b: string) => git.checkout(guardPath(cwd), b))
  ipcMain.handle('git:createBranch', (_e, cwd: string, b: string) => git.createBranch(guardPath(cwd), b))
  ipcMain.handle('git:log', (_e, cwd: string) => git.log(guardPath(cwd)))
  ipcMain.handle('git:init', (_e, cwd: string) => git.init(guardPath(cwd)))

  ipcMain.handle('llm:chat', (_e, opts: Parameters<typeof llm.chat>[0]) => llm.chat(opts))
  ipcMain.handle('llm:models', (_e, url?: string, provider?: 'ollama' | 'lmstudio') => llm.models(url, provider))
  ipcMain.handle('window:titlebar', (_e, opts: { color: string; symbolColor: string; height?: number }) => {
    try {
      mainWindow?.setTitleBarOverlay({ ...opts, height: opts.height ?? 58 })
    } catch {
      /* platform without an overlay */
    }
  })

  ipcMain.handle('stt:transcribe', async (_e, base64: string, url?: string) => {
    const target = (url || 'http://127.0.0.1:8080').replace(/\/$/, '')
    try {
      const buf = Buffer.from(base64, 'base64')
      const form = new FormData()
      form.append('file', new Blob([buf], { type: 'audio/wav' }), 'speech.wav')
      form.append('response_format', 'json')
      const res = await fetch(`${target}/inference`, { method: 'POST', body: form, signal: AbortSignal.timeout(120000) })
      if (!res.ok) return { text: '', error: `STT ${res.status}` }
      const json = (await res.json()) as { text?: string }
      return { text: json.text?.trim() ?? '' }
    } catch (err) {
      return { text: '', error: err instanceof Error ? err.message : 'STT nicht erreichbar' }
    }
  })

  ipcMain.handle('pdf:export', async (_e, html: string, defaultName: string) => {
    const res = await dialog.showSaveDialog({
      defaultPath: defaultName.endsWith('.pdf') ? defaultName : `${defaultName}.pdf`,
      filters: [{ name: 'PDF', extensions: ['pdf'] }]
    })
    if (res.canceled || !res.filePath) return null
    allowPath(res.filePath)
    const tmp = join(app.getPath('temp'), `god-terminal-${Date.now()}.html`)
    await fsp.writeFile(tmp, html, 'utf8')
    const win = new BrowserWindow({ show: false, webPreferences: { sandbox: true } })
    try {
      await win.loadFile(tmp)
      const pdf = await win.webContents.printToPDF({
        printBackground: true,
        pageSize: 'A4',
        margins: { top: 0.6, bottom: 0.6, left: 0.6, right: 0.6 }
      })
      await fsp.writeFile(res.filePath, pdf)
      return res.filePath
    } finally {
      win.destroy()
      void fsp.unlink(tmp).catch(() => undefined)
    }
  })

  ipcMain.handle('skills:scan', async (_e, repo: string) => {
    const skills = await scanSkills(guardPath(repo))
    for (const skill of skills) allowPath(skill.path)
    return skills
  })
  ipcMain.handle('usage:scan', () => scanUsage())

  ipcMain.handle('profiles:create', async (_e, agentId: string, name: string) => {
    const slug = name.toLowerCase().replace(/[^\w]+/g, '-') || 'profile'
    const dir = join(storage.dataDir(), 'profiles', agentId, slug)
    await fsp.mkdir(dir, { recursive: true })
    const initials = name.split(/\s+/).map((s) => s[0] ?? '').join('').slice(0, 2).toUpperCase()
    return { id: `${agentId}-${slug}`, dir, initials }
  })
}

registerIpc()
