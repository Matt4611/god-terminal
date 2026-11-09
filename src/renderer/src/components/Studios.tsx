import { useEffect, useMemo, useRef, useState } from 'react'
import { forceCenter, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force'
import type { FileEntry, ShapeNode } from '@shared/types'
import { marked } from 'marked'
import { activeRepo, consolesOf, llmConfig, useApp } from '../store'
import { makeShape } from '../factory'
import { escapeHtml, uid } from '../util'
import { sendOrder } from '../runtime'

const md = (text: string) => ({ __html: marked.parse(text, { async: false }) as string })

export default function Studios({ panel }: { panel: string }) {
  if (panel === 'documents') return <Documents />
  if (panel === 'diagrams') return <Diagrams />
  if (panel === 'code') return <CodeStudio />
  if (panel === 'markdown') return <MarkdownStudio />
  if (panel === 'skills') return <Skills />
  return null
}

/* --------------------------------------------------------------- documents -- */

const DOC_TYPES = ['Project overview', 'Onboarding guide', 'Architecture', 'README', 'API reference', 'Data model', 'Security overview', 'Testing guide', 'Release notes']

function Documents() {
  const repo = activeRepo(useApp((s) => s))
  const settings = useApp((s) => s.settings)
  const toast = useApp((s) => s.toast)
  const addNode = useApp((s) => s.addNode)
  const [type, setType] = useState(DOC_TYPES[0])
  const [effort, setEffort] = useState<'Quick' | 'Balanced' | 'Thorough'>('Balanced')
  const [custom, setCustom] = useState('')
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [versions, setVersions] = useState<{ id: string; title: string; at: number; text: string }[]>([])

  const words = effort === 'Quick' ? '400 to 700' : effort === 'Thorough' ? '900 to 1,500' : '700 to 1,100'

  const generate = async () => {
    if (!repo) return
    setBusy(true)
    setText('')
    try {
      const entries = await window.api.fs.readDir(repo.path)
      let readme = ''
      try {
        readme = (await window.api.fs.readFile(`${repo.path}/README.md`)).text.slice(0, 6000)
      } catch {
        readme = ''
      }
      const cfg = llmConfig(settings)
      const res = await window.api.llm.chat({
        provider: cfg.provider,
        url: cfg.url,
        model: cfg.model,
        messages: [
          {
            role: 'system',
            content: `You write ${type} documents for a software repository, in English Markdown. Target ${words} words. Use headings, short paragraphs and concrete file names. Do not invent APIs you cannot infer. Start with a # title.`
          },
          {
            role: 'user',
            content: `Repository: ${repo.name}\nPath: ${repo.path}\nTop level: ${entries.map((e) => `${e.name}${e.dir ? '/' : ''}`).join(', ')}\n\nREADME:\n${readme || '(none)'}\n\n${custom ? `Extra request: ${custom}` : ''}`
          }
        ]
      })
      if (!res.ok) {
        toast(res.error ?? 'Generation failed', 'error')
        return
      }
      setText(res.text)
      setVersions((v) => [{ id: uid(), title: type, at: Date.now(), text: res.text }, ...v].slice(0, 20))
    } finally {
      setBusy(false)
    }
  }

  const exportPdf = async () => {
    if (!text) return
    const headings = [...text.matchAll(/^#{1,3} (.+)$/gm)].map((m) => m[1])
    const body = marked.parse(text, { async: false }) as string
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page { size: A4; margin: 18mm 16mm; }
      body{font-family:Georgia,serif;color:#1f2937;line-height:1.55;font-size:11.5pt}
      .cover{height:250mm;display:flex;flex-direction:column;justify-content:center;page-break-after:always}
      .cover .mark{font:600 12px system-ui;letter-spacing:.22em;color:#0f766e;text-transform:uppercase}
      .cover h1{font-size:34pt;margin:12mm 0 6mm;line-height:1.1}
      .cover .meta{font:12px system-ui;color:#6b7280}
      .toc{page-break-after:always}
      .toc h2{font-size:18pt}
      .toc ol{font:12px system-ui;line-height:1.9}
      h1,h2,h3{page-break-after:avoid} pre{background:#f3f4f6;padding:8px;font-size:9pt;overflow:hidden}
      code{font-family:Consolas,monospace;font-size:9.5pt}
      img{max-width:100%} hr{border:none;border-top:1px solid #e5e7eb}
    </style></head><body>
      <div class="cover">
        <div class="mark">GoT · ${escapeHtml(type)}</div>
        <h1>${escapeHtml(text.match(/^#\s+(.+)$/m)?.[1] ?? `${repo?.name} — ${type}`)}</h1>
        <div class="meta">${escapeHtml(repo?.name ?? '')} · ${new Date().toLocaleDateString()} · ${escapeHtml(llmConfig(settings).model)}</div>
      </div>
      ${headings.length >= 3 ? `<div class="toc"><h2>Contents</h2><ol>${headings.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ol></div>` : ''}
      ${body}
    </body></html>`
    const path = await window.api.pdf.export(html, `${repo?.name ?? 'document'}-${type.toLowerCase().replace(/\s+/g, '-')}`)
    if (path) toast(`PDF written to ${path}`, 'ok')
  }

  return (
    <div className="panel-stack">
      <p className="lede">Ask the local model for a document about this repo. It reads the folder listing and README, never your whole disk.</p>

      <label className="field"><span>Document</span>
        <select value={type} onChange={(e) => setType(e.target.value)}>{DOC_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="field"><span>Effort</span>
        <div className="seg">
          {(['Quick', 'Balanced', 'Thorough'] as const).map((e) => (
            <button key={e} className={effort === e ? 'on' : ''} onClick={() => setEffort(e)}>{e}</button>
          ))}
        </div>
      </label>
      <label className="field"><span>Ask for anything</span>
        <input className="text-input" placeholder="e.g. a migration plan from REST to GraphQL" value={custom} onChange={(e) => setCustom(e.target.value)} />
      </label>
      <div className="row">
        <button className="btn primary" disabled={busy || !repo} onClick={() => void generate()}>
          {busy ? 'Writing…' : 'Generate'}
        </button>
        {text && <><button className="btn" onClick={() => void exportPdf()}>Export PDF</button>
          <button className="btn" onClick={() => {
            navigator.clipboard.writeText(text)
            toast('Markdown copied', 'ok')
          }}>Copy Markdown</button></>}
        <span className="spacer" />
        {text && <button className="link" onClick={() => {
          addNode({
            id: uid(), kind: 'card', cardKind: 'doc', x: 120, y: 120, w: 420, h: 320, z: 1,
            title: `${type} · ${repo?.name}`, content: text
          })
          toast('Document placed on the board', 'ok')
        }}>Add to board</button>}
      </div>

      {busy && <div className="progress-line"><i /></div>}
      {text && <div className="doc-preview" dangerouslySetInnerHTML={md(text)} />}

      {versions.length > 0 && (
        <>
          <h3>Library</h3>
          {versions.map((v) => (
            <div key={v.id} className="log-row clickable" onClick={() => { setText(v.text); setType(v.title as typeof type) }}>
              <span>{v.title}</span><span className="spacer" /><span className="muted tiny">{new Date(v.at).toLocaleTimeString()}</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- diagrams -- */

interface DiagramSpec {
  title: string
  nodes: { id: string; label: string; note?: string; shape?: 'box' | 'ellipse' | 'diamond' }[]
  edges: { from: string; to: string; label?: string }[]
}

function Diagrams() {
  const repo = activeRepo(useApp((s) => s))
  const settings = useApp((s) => s.settings)
  const toast = useApp((s) => s.toast)
  const addNodes = useApp((s) => s.addNodes)
  const updateBoard = useApp((s) => s.updateBoard)
  const [kind, setKind] = useState('Architecture')
  const [style, setStyle] = useState<'Ink' | 'Colorful'>('Ink')
  const [effort, setEffort] = useState<'Quick' | 'Balanced' | 'Thorough'>('Balanced')
  const [busy, setBusy] = useState(false)
  const [spec, setSpec] = useState<DiagramSpec | null>(null)

  const generate = async () => {
    if (!repo) return
    setBusy(true)
    try {
      const entries = await window.api.fs.readDir(repo.path)
      const count = effort === 'Quick' ? '6 to 10' : effort === 'Thorough' ? '10 to 16' : '8 to 14'
      const cfg = llmConfig(settings)
      const res = await window.api.llm.chat({
        provider: cfg.provider,
        url: cfg.url,
        model: cfg.model,
        json: true,
        messages: [
          {
            role: 'system',
            content: `You describe a ${kind} diagram of a repository as JSON:
{"title":"...","nodes":[{"id":"a","label":"...","note":"...","shape":"box|ellipse|diamond"}],"edges":[{"from":"a","to":"b","label":"short verb"}]}
Use ${count} nodes. Labels are 1-4 words. Edges only between existing ids. Answer JSON only.`
          },
          { role: 'user', content: `Repo ${repo.name}. Top level: ${entries.map((e) => e.name + (e.dir ? '/' : '')).join(', ')}` }
        ]
      })
      if (!res.ok) return toast(res.error ?? 'Diagram failed', 'error')
      const parsed = JSON.parse(res.text.match(/\{[\s\S]*\}/)?.[0] ?? '{}') as DiagramSpec
      if (!parsed.nodes?.length) return toast('The model returned no usable diagram', 'error')
      setSpec(parsed)
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Diagram failed', 'error')
    } finally {
      setBusy(false)
    }
  }

  const place = () => {
    if (!spec) return
    const colors = ['#f472b6', '#38bdf8', '#fbbf24', '#34d399', '#a78bfa', '#fb923c']
    const cols = Math.ceil(Math.sqrt(spec.nodes.length))
    const shapes: ShapeNode[] = spec.nodes.map((n, i) => {
      const s = makeShape(160 + (i % cols) * 260, 200 + Math.floor(i / cols) * 200, n.shape === 'ellipse' ? 'ellipse' : n.shape === 'diamond' ? 'diamond' : 'rect')
      s.title = n.label
      s.w = 200
      s.h = 110
      s.style = {
        ...s.style,
        stroke: style === 'Colorful' ? colors[i % colors.length] : '#cbd5e1',
        fill: style === 'Colorful' ? `${colors[i % colors.length]}22` : 'transparent'
      }
      if (n.note) s.style = s.style
      return s
    })
    const index = new Map(spec.nodes.map((n, i) => [n.id, shapes[i]]))
    addNodes(shapes)
    updateBoard((b) => ({
      ...b,
      wires: [
        ...b.wires,
        ...spec.edges
          .filter((e) => index.has(e.from) && index.has(e.to))
          .map((e) => ({ id: uid(), from: index.get(e.from)!.id, to: index.get(e.to)!.id, kind: 'plain' as const }))
      ]
    }))
    toast(`${shapes.length} shapes placed on the board`, 'ok')
  }

  const exportPng = () => {
    if (!spec) return
    const canvas = document.createElement('canvas')
    const cols = Math.ceil(Math.sqrt(spec.nodes.length))
    canvas.width = cols * 300 + 100
    canvas.height = Math.ceil(spec.nodes.length / cols) * 220 + 100
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#0b0d10'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = '14px Segoe UI'
    const pos = new Map<string, { x: number; y: number }>()
    spec.nodes.forEach((n, i) => {
      const x = 50 + (i % cols) * 300
      const y = 50 + Math.floor(i / cols) * 220
      pos.set(n.id, { x, y })
      ctx.strokeStyle = '#cbd5e1'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, 220, 90)
      ctx.fillStyle = '#e2e8f0'
      ctx.fillText(n.label.slice(0, 26), x + 14, y + 40)
      ctx.fillStyle = '#94a3b8'
      ctx.font = '11px Segoe UI'
      if (n.note) ctx.fillText(n.note.slice(0, 30), x + 14, y + 62)
      ctx.font = '14px Segoe UI'
    })
    ctx.strokeStyle = '#475569'
    ctx.fillStyle = '#94a3b8'
    for (const e of spec.edges) {
      const a = pos.get(e.from)
      const b = pos.get(e.to)
      if (!a || !b) continue
      ctx.beginPath()
      ctx.moveTo(a.x + 220, a.y + 45)
      ctx.lineTo(b.x, b.y + 45)
      ctx.stroke()
    }
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `${spec.title || 'diagram'}.png`
    a.click()
  }

  const exportExcalidraw = () => {
    if (!spec) return
    const elements = spec.nodes.map((n, i) => ({
      id: n.id,
      type: n.shape === 'ellipse' ? 'ellipse' : n.shape === 'diamond' ? 'diamond' : 'rectangle',
      x: (i % 3) * 300, y: Math.floor(i / 3) * 200, width: 220, height: 100,
      strokeColor: '#cbd5e1', backgroundColor: 'transparent', strokeWidth: 2,
      roughness: 1, seed: i + 1, version: 1, versionNonce: 1, isDeleted: false,
      text: n.label
    }))
    const blob = new Blob([JSON.stringify({ type: 'excalidraw', version: 2, source: 'god-terminal', elements, appState: { viewBackgroundColor: '#0b0d10' } }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${spec.title || 'diagram'}.excalidraw`
    a.click()
  }

  return (
    <div className="panel-stack">
      <p className="lede">The model describes boxes and arrows; they land as ordinary shapes you can move and restyle.</p>
      <label className="field"><span>Draw</span>
        <select value={kind} onChange={(e) => setKind(e.target.value)}>
          {['Architecture', 'User flow', 'Data flow', 'Components', 'Request lifecycle', 'State flow'].map((k) => <option key={k}>{k}</option>)}
        </select>
      </label>
      <label className="field"><span>Effort</span>
        <div className="seg">
          {(['Quick', 'Balanced', 'Thorough'] as const).map((e) => <button key={e} className={effort === e ? 'on' : ''} onClick={() => setEffort(e)}>{e}</button>)}
        </div>
      </label>
      <label className="field"><span>Style</span>
        <div className="seg">
          {(['Ink', 'Colorful'] as const).map((s) => <button key={s} className={style === s ? 'on' : ''} onClick={() => setStyle(s)}>{s}</button>)}
        </div>
      </label>
      <div className="row">
        <button className="btn primary" disabled={busy || !repo} onClick={() => void generate()}>{busy ? 'Drawing…' : 'Generate diagram'}</button>
        {spec && <><button className="btn" onClick={place}>Add to board</button>
          <button className="btn" onClick={exportPng}>PNG</button>
          <button className="btn" onClick={exportExcalidraw}>.excalidraw</button></>}
      </div>
      {busy && <div className="progress-line"><i /></div>}
      {spec && (
        <div className="diagram-preview">
          <h4>{spec.title}</h4>
          <div className="diagram-list">
            {spec.nodes.map((n) => <div key={n.id} className="diagram-node"><b>{n.label}</b>{n.note && <span>{n.note}</span>}</div>)}
          </div>
          <div className="muted small">{spec.edges.length} arrows</div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------- code -- */

function CodeStudio() {
  const repo = activeRepo(useApp((s) => s))
  const addNode = useApp((s) => s.addNode)
  const toast = useApp((s) => s.toast)
  const [dir, setDir] = useState(repo?.path ?? '')
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [file, setFile] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [original, setOriginal] = useState('')
  const [truncated, setTruncated] = useState(false)

  useEffect(() => { if (repo) setDir(repo.path) }, [repo?.path])
  useEffect(() => {
    if (!dir) return
    void window.api.fs.readDir(dir).then(setEntries)
  }, [dir])

  const openFile = async (p: string) => {
    const res = await window.api.fs.readFile(p)
    setFile(p)
    setText(res.text)
    setOriginal(res.text)
    setTruncated(res.truncated)
  }

  useEffect(() => {
    const save = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && file) {
        e.preventDefault()
        void window.api.fs.writeFile(file, text).then(() => { setOriginal(text); toast('Saved', 'ok') })
      }
    }
    window.addEventListener('keydown', save)
    return () => window.removeEventListener('keydown', save)
  }, [file, text, toast])

  const dirty = text !== original
  const crumbs = repo ? dir.replace(repo.path, '').split(/[\\/]/).filter(Boolean) : []

  return (
    <div className="studio-split">
      <div className="file-pane">
        <div className="row small">
          <button className="link" onClick={() => setDir(repo?.path ?? '')}>root</button>
          {crumbs.map((c, i) => <span key={i} className="muted">/ {c}</span>)}
        </div>
        {dir !== repo?.path && <button className="link" onClick={() => setDir(dir.replace(/[\\/][^\\/]+$/, ''))}>↑ up</button>}
        <div className="file-list">
          {entries.map((e) => (
            <button
              key={e.path}
              className={`file-row ${e.dir ? 'dir' : ''} ${file === e.path ? 'on' : ''}`}
              onClick={() => e.dir ? setDir(e.path) : void openFile(e.path)}
            >
              <span>{e.dir ? '▸' : extIcon(e.ext)}</span>
              <span className="file-name">{e.name}</span>
              {!e.dir && <span className="muted tiny">{Math.max(1, Math.round(e.size / 1024))}k</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="editor-pane">
        {file ? (
          <>
            <div className="row small">
              <span className="muted">{file.replace(repo?.path ?? '', '')}</span>
              <span className="spacer" />
              {truncated && <span className="warn">too large to show</span>}
              <button className="btn small" disabled={!dirty} onClick={() => window.api.fs.writeFile(file, text).then(() => { setOriginal(text); toast('Saved', 'ok') })}>Save</button>
              <button className="btn small" onClick={() => {
                addNode({ id: uid(), kind: 'card', cardKind: 'code', x: 160, y: 120, w: 420, h: 300, z: 1, title: file.split(/[\\/]/).pop() ?? 'Code', path: file, content: text })
                toast('Code card placed', 'ok')
              }}>Insert</button>
            </div>
            <textarea className="code-area" value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
            <div className="row tiny muted"><span>{text.split('\n').length} lines</span><span>{text.length} chars</span><span className="spacer" />{dirty ? 'unsaved' : 'saved'}</div>
          </>
        ) : (
          <div className="muted">Pick a file on the left. README first when you open a folder.</div>
        )}
      </div>
    </div>
  )
}

const extIcon = (ext: string) =>
  ['.ts', '.tsx', '.js', '.jsx'].includes(ext) ? 'TS'
    : ['.py'].includes(ext) ? 'PY'
      : ['.md', '.mdx'].includes(ext) ? 'MD'
        : ['.json'].includes(ext) ? '{}'
          : ['.css', '.scss'].includes(ext) ? '#' : '·'

/* ---------------------------------------------------------------- markdown -- */

interface GraphNode { id: string; name: string; x: number; y: number; links: number }

function MarkdownStudio() {
  const repo = activeRepo(useApp((s) => s))
  const addNode = useApp((s) => s.addNode)
  const toast = useApp((s) => s.toast)
  const [files, setFiles] = useState<FileEntry[]>([])
  const [query, setQuery] = useState('')
  const [file, setFile] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [tab, setTab] = useState<'Reading' | 'Source' | 'Graph'>('Reading')
  const [graph, setGraph] = useState<GraphNode[]>([])
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!repo) return
    void window.api.fs.scanMarkdown(repo.path).then(setFiles)
  }, [repo?.path])

  const open = async (p: string) => {
    const res = await window.api.fs.readFile(p)
    setFile(p)
    setText(res.text)
    setTab('Reading')
    if (files.length) buildGraph(files, res.text, p)
  }

  const buildGraph = (all: FileEntry[], current: string, currentPath: string) => {
    const nodes = all.slice(0, 400).map((f) => ({ id: f.path, name: f.name.replace(/\.(md|markdown|mdx)$/i, ''), x: 0, y: 0, links: 0 }))
    const byName = new Map(nodes.map((n) => [n.name.toLowerCase(), n]))
    const links: { source: string; target: string }[] = []
    const text2 = current
    for (const m of text2.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
      const t = byName.get(m[1].trim().toLowerCase())
      if (t) links.push({ source: currentPath, target: t.id })
    }
    for (const m of text2.matchAll(/\[[^\]]+\]\(([^)]+\.mdx?)\)/g)) {
      const base = m[1].split('/').pop()!.replace(/\.mdx?$/, '').toLowerCase()
      const t = byName.get(base)
      if (t) links.push({ source: currentPath, target: t.id })
    }
    if (!nodes.find((n) => n.id === currentPath)) {
      nodes.push({ id: currentPath, name: current.split(/[\\/]/).pop() ?? 'note', x: 0, y: 0, links: 0 })
    }
    const sim = forceSimulation<GraphNode>(nodes)
      .force('charge', forceManyBody().strength(-220))
      .force('link', forceLink<GraphNode, { source: string; target: string }>(links).id((d) => d.id).distance(90))
      .force('center', forceCenter(320, 240))
      .force('x', forceX(320).strength(0.04))
      .force('y', forceY(240).strength(0.04))
      .stop()
    for (let i = 0; i < 260; i++) sim.tick()
    for (const l of links) {
      const s = nodes.find((n) => n.id === (l.source as unknown as string))
      const t = nodes.find((n) => n.id === (l.target as unknown as string))
      if (s) s.links++
      if (t) t.links++
    }
    setGraph(nodes)
  }

  const edit = (v: string) => {
    setText(v)
    if (!file) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      void window.api.fs.writeFile(file, v)
    }, 1500)
  }

  const shown = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()) || f.path.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="studio-split">
      <div className="file-pane">
        <input className="text-input" placeholder="Search notes…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="muted tiny">{files.length} Markdown files</div>
        <div className="file-list">
          {shown.slice(0, 300).map((f) => (
            <button key={f.path} className={`file-row ${file === f.path ? 'on' : ''}`} onClick={() => void open(f.path)}>
              <span>MD</span><span className="file-name">{f.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="editor-pane">
        {!file ? <div className="muted">Pick a note. Links between notes build the graph.</div> : (
          <>
            <div className="row small">
              <div className="seg">
                {(['Reading', 'Source', 'Graph'] as const).map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
              </div>
              <span className="spacer" />
              <button className="btn small" onClick={() => {
                addNode({ id: uid(), kind: 'card', cardKind: 'markdown', x: 140, y: 120, w: 420, h: 320, z: 1, title: file.split(/[\\/]/).pop() ?? 'Note', path: file })
                toast('Live Markdown card placed', 'ok')
              }}>Add to board</button>
            </div>
            {tab === 'Reading' && <div className="doc-preview" dangerouslySetInnerHTML={md(text)} />}
            {tab === 'Source' && <textarea className="code-area" value={text} onChange={(e) => edit(e.target.value)} spellCheck={false} />}
            {tab === 'Graph' && (
              <svg className="graph" viewBox="0 0 640 480">
                {graph.map((n) => (
                  <g key={n.id} onClick={() => void open(n.id)} className="graph-node">
                    <circle cx={n.x} cy={n.y} r={4 + Math.min(9, n.links)} />
                    <text x={n.x + 10} y={n.y + 4}>{n.name.slice(0, 18)}</text>
                  </g>
                ))}
              </svg>
            )}
            <div className="muted tiny">{tab === 'Source' ? 'Saves 1.5s after you stop typing.' : 'Notes are re-read from disk when you open them.'}</div>
          </>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ skills -- */

function Skills() {
  const repo = activeRepo(useApp((s) => s))
  const toast = useApp((s) => s.toast)
  const board = useApp((s) => s.board())
  const [skills, setSkills] = useState<import('@shared/types').SkillInfo[]>([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const load = () => {
    if (!repo) return
    void window.api.skills.scan(repo.path).then(setSkills)
  }
  useEffect(load, [repo?.path])

  const current = skills.find((s) => s.path === selected)
  const shown = skills.filter((s) => filter === 'all' || s.scope === filter)

  const create = async () => {
    if (!repo || !name.trim()) return
    const dir = `${repo.path}/.claude/skills/${name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')}`
    await window.api.fs.mkdir(dir)
    await window.api.fs.writeFile(`${dir}/SKILL.md`, `---\nname: ${name.trim()}\ndescription: ${desc.trim() || 'Describe when to use this skill.'}\n---\n\nInstructions for the agent.\n`)
    toast('Skill created', 'ok')
    setName(''); setDesc(''); load()
  }

  return (
    <div className="studio-split">
      <div className="file-pane">
        <div className="seg">
          {['all', 'personal', 'project', 'command'].map((f) => <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <div className="file-list">
          {shown.map((s) => (
            <button key={s.path} className={`file-row ${selected === s.path ? 'on' : ''}`} onClick={() => { setSelected(s.path); setDraft(s.body) }}>
              <span>{s.findings.length ? '⚠' : '✓'}</span>
              <span className="file-name">/{s.name}</span>
              <span className="tag">{s.scope}</span>
            </button>
          ))}
          {!shown.length && <div className="muted small">No SKILL.md found in ~/.claude/skills or .claude/skills.</div>}
        </div>
      </div>
      <div className="editor-pane">
        {current ? (
          <>
            <div className="row small">
              <strong>/{current.name}</strong>
              <span className="spacer" />
              <button className="btn small" onClick={() => {
                void window.api.fs.writeFile(current.path, draft).then(() => { toast('Skill saved', 'ok'); load() })
              }}>Save</button>
              <button className="btn small" onClick={() => {
                const running = consolesOf(board).find((c) => ['READY', 'IDLE'].includes(c.status))
                if (!running) return toast('Start a console first', 'error')
                sendOrder(running.id, `/${current.name}`)
                toast(`/${current.name} sent to ${running.title}`, 'ok')
              }}>Run</button>
            </div>
            {current.findings.length > 0 && (
              <div className="findings">
                {current.findings.map((f) => <div key={f}>• {f}</div>)}
              </div>
            )}
            <textarea className="code-area" value={draft} onChange={(e) => setDraft(e.target.value)} spellCheck={false} />
            <div className="muted tiny">{draft.split('\n').length} lines · {Math.round(draft.length / 4)} tokens (estimate)</div>
          </>
        ) : (
          <div className="panel-stack">
            <div className="muted">Pick a skill, or create one in this repo.</div>
            <h3>New skill</h3>
            <label className="field"><span>Name</span><input className="text-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="release-check" /></label>
            <label className="field"><span>Description</span><input className="text-input" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Use when preparing a release." /></label>
            <button className="btn" disabled={!name.trim()} onClick={() => void create()}>Create in .claude/skills</button>
          </div>
        )}
      </div>
    </div>
  )
}
