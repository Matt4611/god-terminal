import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import type {
  AnyNode, CalendarEvent, CardNode, ChecklistNode, ConsoleNode as ConsoleType, KanbanNode,
  MemoryNode, NoteNode, OrchestratorNode, ShapeNode, TextNode, WebNode, BranchesNode
} from '@shared/types'
import { getAgent } from '@shared/agents'
import { useApp } from '../store'
import ConsoleNode from './ConsoleNode'
import { sendOrder } from '../runtime'
import { runCommand, spawnConsoles } from '../actions'
import { dayKey, uid } from '../util'

const md = (text: string) => ({ __html: marked.parse(text, { async: false }) as string })

function Head({ node, children }: { node: AnyNode; children?: React.ReactNode }) {
  const patch = useApp((s) => s.patchNode)
  return (
    <div className="node-head">
      <span className="node-title" onDoubleClick={() => {
        const name = window.prompt('Name', node.title)
        if (name) patch(node.id, { title: name.slice(0, 60) })
      }}>{node.title}</span>
      <span className="spacer" />
      {children}
    </div>
  )
}

function NoteView({ node }: { node: NoteNode }) {
  const patch = useApp((s) => s.patchNode)
  return (
    <div className="note-body" style={{ background: node.paper }}>
      <div className="note-grip" title="Drag note" />
      <div className="note-fold" onClick={() => patch(node.id, { paper: node.paper === '#f5e6a8' ? '#bfe3c8' : node.paper === '#bfe3c8' ? '#f7c6d0' : '#f5e6a8' })} />
      <textarea
        className="note-input"
        value={node.text}
        placeholder="Write a note…"
        onChange={(e) => patch(node.id, { text: e.target.value })}
      />
    </div>
  )
}

function TextView({ node }: { node: TextNode }) {
  const patch = useApp((s) => s.patchNode)
  return (
    <div className="text-node-wrap">
      <div className="text-handle" title="Drag text" />
      <div
        className="text-body"
        contentEditable
        suppressContentEditableWarning
        style={{ textAlign: node.align, fontSize: node.size }}
        onBlur={(e) => patch(node.id, { text: e.currentTarget.innerText })}
      >
        {node.text || 'Text'}
      </div>
    </div>
  )
}

function ChecklistView({ node }: { node: ChecklistNode }) {
  const patch = useApp((s) => s.patchNode)
  const done = node.items.filter((i) => i.done).length
  const pct = node.items.length ? Math.round((done / node.items.length) * 100) : 0
  return (
    <div className="pad">
      <div className="row muted small">
        <span>{done}/{node.items.length} done</span>
        <span className="spacer" />
        <button className="link" onClick={() => patch(node.id, { items: node.items.filter((i) => !i.done) })}>Clear done</button>
      </div>
      <div className="progress"><i style={{ width: `${pct}%` }} /></div>
      <div className="checklist">
        {node.items.map((it) => (
          <label key={it.id} className={`check ${it.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={it.done}
              onChange={() =>
                patch(node.id, { items: node.items.map((x) => (x.id === it.id ? { ...x, done: !x.done } : x)) })
              }
            />
            <span>{it.text}</span>
          </label>
        ))}
      </div>
      <input
        className="ghost-input"
        placeholder="Add an objective…"
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return
          const text = e.currentTarget.value.trim()
          if (!text) return
          patch(node.id, { items: [...node.items, { id: uid(), text, done: false }] })
          e.currentTarget.value = ''
        }}
      />
    </div>
  )
}

function KanbanView({ node }: { node: KanbanNode }) {
  const patch = useApp((s) => s.patchNode)
  const dragRef = useRef<{ colId: string; cardId: string } | null>(null)
  const [over, setOver] = useState<string | null>(null)
  const addCard = (colId: string) => {
    const title = window.prompt('Card title')
    if (!title) return
    patch(node.id, {
      columns: node.columns.map((c) =>
        c.id === colId
          ? { ...c, cards: [...c.cards, { id: uid(), title, priority: 'none' as const, done: false }] }
          : c
      )
    })
  }
  return (
    <div className="kanban">
      {node.columns.map((col) => (
        <div
          key={col.id}
          className={`kb-col ${over === col.id ? 'drop' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setOver(col.id) }}
          onDragLeave={() => setOver((o) => (o === col.id ? null : o))}
          onDrop={(e) => {
            e.preventDefault()
            const d = dragRef.current
            setOver(null)
            dragRef.current = null
            if (!d || d.colId === col.id) return
            const card = node.columns.find((c) => c.id === d.colId)?.cards.find((x) => x.id === d.cardId)
            if (!card) return
            patch(node.id, {
              columns: node.columns.map((c) =>
                c.id === d.colId
                  ? { ...c, cards: c.cards.filter((x) => x.id !== d.cardId) }
                  : c.id === col.id
                    ? { ...c, cards: [...c.cards, card] }
                    : c
              )
            })
          }}
        >
          <div className="kb-col-head" style={{ borderColor: col.color }}>
            <span style={{ color: col.color }}>{col.title}</span>
            <button className="icon" onClick={() => addCard(col.id)}>+</button>
          </div>
          <div className="kb-cards">
            {col.cards.map((card) => (
              <div
                key={card.id}
                className={`kb-card ${card.done ? 'done' : ''} prio-${card.priority}`}
                draggable
                onDragStart={(e) => {
                  dragRef.current = { colId: col.id, cardId: card.id }
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', card.id)
                }}
                onDragEnd={() => { dragRef.current = null; setOver(null) }}
              >
                <div className="kb-title">{card.title}</div>
                <div className="row tiny">
                  <button className="link" onClick={() => patch(node.id, {
                    columns: node.columns.map((c) => c.id === col.id
                      ? { ...c, cards: c.cards.map((x) => x.id === card.id ? { ...x, done: !x.done } : x) }
                      : c)
                  })}>{card.done ? 'reopen' : 'done'}</button>
                  <span className="spacer" />
                  <button className="link" onClick={() => patch(node.id, {
                    columns: node.columns.map((c) => ({ ...c, cards: c.cards.filter((x) => x.id !== card.id) }))
                  })}>×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CalendarView({ node }: { node: import('@shared/types').CalendarNode }) {
  const patch = useApp((s) => s.patchNode)
  const [year, month] = node.month.split('-').map(Number)
  const first = new Date(year, month - 1, 1)
  const days = new Date(year, month, 0).getDate()
  const offset = (first.getDay() + 6) % 7
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  const shift = (delta: number) => {
    const d = new Date(year, month - 1 + delta, 1)
    patch(node.id, { month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` })
  }
  const addEvent = (day: number) => {
    const title = window.prompt('Event title')
    if (!title) return
    const ev: CalendarEvent = {
      id: uid(),
      title,
      date: `${node.month}-${String(day).padStart(2, '0')}`,
      allDay: true,
      color: '#a78bfa'
    }
    patch(node.id, { events: [...node.events, ev] })
  }
  return (
    <div className="pad">
      <div className="row">
        <button className="icon" onClick={() => shift(-1)}>‹</button>
        <strong>{first.toLocaleString('en', { month: 'long' })} {year}</strong>
        <span className="spacer" />
        <button className="icon" onClick={() => shift(1)}>›</button>
      </div>
      <div className="cal-grid">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => <div key={d} className="cal-dow">{d}</div>)}
        {cells.map((day, i) => {
          const key = day ? `${node.month}-${String(day).padStart(2, '0')}` : ''
          const events = node.events.filter((e) => e.date === key)
          return (
            <div key={i} className={`cal-cell ${key === dayKey(new Date()) ? 'today' : ''}`} onDoubleClick={() => day && addEvent(day)}>
              {day && <span className="cal-day">{day}</span>}
              {events.map((e) => (
                <span
                  key={e.id}
                  className="cal-ev"
                  style={{ background: e.color }}
                  title={`${e.title} — double-click to remove`}
                  onDoubleClick={(ev) => {
                    ev.stopPropagation()
                    if (window.confirm(`Delete “${e.title}”?`)) patch(node.id, { events: node.events.filter((x) => x.id !== e.id) })
                  }}
                >
                  {e.title}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WebView({ node }: { node: WebNode }) {
  const patch = useApp((s) => s.patchNode)
  const [url, setUrl] = useState(node.url)
  const [key, setKey] = useState(0)
  useEffect(() => setUrl(node.url), [node.url])
  return (
    <div className="web-body">
      <div className="web-bar">
        <button className="icon" onClick={() => setKey((k) => k + 1)}>⟳</button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const next = url.startsWith('http') ? url : `http://${url}`
              patch(node.id, { url: next })
              setKey((k) => k + 1)
            }
          }}
        />
        <button className="icon" onClick={() => window.api.shell.openExternal(node.url)}>↗</button>
        <select value={node.zoom} onChange={(e) => patch(node.id, { zoom: +e.target.value })}>
          {[50, 75, 100, 125, 150].map((z) => <option key={z} value={z}>{z}%</option>)}
        </select>
      </div>
      <webview key={key} src={node.url} style={{ width: '100%', height: `calc(100% - 34px)`, transform: `scale(${node.zoom / 100})`, transformOrigin: '0 0' }} />
    </div>
  )
}

function ShapeView({ node }: { node: ShapeNode }) {
  const patch = useApp((s) => s.patchNode)
  const fill = node.style.fill === 'transparent' ? 'none' : node.style.fill
  if (node.shape === 'sticky') {
    return (
      <div className="sticky" style={{ background: '#fdf0a8' }}>
        <textarea
          className="note-input"
          placeholder="Sticky…"
          value={node.title === 'sticky' ? '' : node.title}
          onChange={(e) => patch(node.id, { title: e.target.value })}
        />
      </div>
    )
  }
  if ((node.shape === 'line' || node.shape === 'arrow') && node.points?.length) {
    const pts = node.points.map((p) => `${p.x},${p.y}`).join(' ')
    return (
      <svg className="shape-svg" viewBox={`0 0 ${node.w} ${node.h}`}>
        <polyline points={pts} fill="none" stroke={node.style.stroke} strokeWidth={node.style.width} />
        {node.shape === 'arrow' && node.points.length > 1 && (
          <circle cx={node.points[node.points.length - 1].x} cy={node.points[node.points.length - 1].y} r={4} fill={node.style.stroke} />
        )}
      </svg>
    )
  }
  return (
    <svg className="shape-svg" viewBox={`0 0 ${node.w} ${node.h}`} preserveAspectRatio="none">
      {node.shape === 'rect' && (
        <rect x={2} y={2} width={node.w - 4} height={node.h - 4} rx={8}
          fill={fill} stroke={node.style.stroke} strokeWidth={node.style.width}
          strokeDasharray={node.style.dashed ? '6 5' : undefined} />
      )}
      {node.shape === 'ellipse' && (
        <ellipse cx={node.w / 2} cy={node.h / 2} rx={node.w / 2 - 3} ry={node.h / 2 - 3}
          fill={fill} stroke={node.style.stroke} strokeWidth={node.style.width}
          strokeDasharray={node.style.dashed ? '6 5' : undefined} />
      )}
      {node.shape === 'diamond' && (
        <polygon points={`${node.w / 2},3 ${node.w - 3},${node.h / 2} ${node.w / 2},${node.h - 3} 3,${node.h / 2}`}
          fill={fill} stroke={node.style.stroke} strokeWidth={node.style.width} />
      )}
    </svg>
  )
}

function CardView({ node }: { node: CardNode }) {
  const [text, setText] = useState(node.content ?? '')
  useEffect(() => {
    if (!node.path) return
    void window.api.fs.readFile(node.path).then((r) => setText(r.text))
  }, [node.path])
  if (node.cardKind === 'markdown') {
    return <div className="card-md" dangerouslySetInnerHTML={md(text || '# Empty')} />
  }
  if (node.cardKind === 'doc') {
    return <div className="card-md" dangerouslySetInnerHTML={md(text || node.content || '')} />
  }
  return (
    <div className="card-code">
      <div className="row tiny">
        <span className="muted">{node.path?.split(/[\\/]/).pop() ?? 'snippet'}</span>
        <span className="spacer" />
        <button className="link" onClick={() => void navigator.clipboard.writeText(text)}>copy</button>
      </div>
      <pre>{text.slice(0, 20000) || node.content || 'No content'}</pre>
    </div>
  )
}

function OrchestratorView({ node }: { node: OrchestratorNode }) {
  const board = useApp((s) => s.board())
  const connectNodes = useApp((s) => s.connectNodes)
  const setTool = useApp((s) => s.setTool)
  const setWireFrom = useApp((s) => s.setWireFrom)
  const tool = useApp((s) => s.tool)
  const wireFrom = useApp((s) => s.wireFrom)
  const toast = useApp((s) => s.toast)
  const [text, setText] = useState('')
  const consoles = (board?.nodes.filter((n) => n.kind === 'console') ?? []) as ConsoleType[]
  const linked = new Set(node.wired)
  for (const w of board?.wires ?? []) {
    if (w.from === node.id) linked.add(w.to)
    if (w.to === node.id) linked.add(w.from)
  }
  const wired = consoles.filter((c) => linked.has(c.id))
  const linking = tool === 'wire' && wireFrom === node.id

  const toggleLink = () => {
    if (linking) {
      setTool('select')
      setWireFrom(null)
      return
    }
    setTool('wire')
    setWireFrom(node.id)
    toast('Director linking — pick an agent on the board', 'info')
  }

  const spawnAndLink = () => {
    const made = spawnConsoles(1)
    if (!made[0]) return
    connectNodes(node.id, made[0].id)
    toast(`Linked ${made[0].title} to the Director`, 'ok')
  }

  const send = () => {
    const order = text.trim()
    if (!order) return
    if (wired.length) {
      for (const c of wired) sendOrder(c.id, order)
      toast(`Order sent to ${wired.length} agent${wired.length === 1 ? '' : 's'}`, 'ok')
    } else {
      void runCommand(order)
    }
    setText('')
  }

  return (
    <div className="director-body">
      <div className="director-top">
        <span className="director-kicker"><i className="director-dot" /> {wired.length ? `${wired.length} linked` : 'No consoles connected'}</span>
        <span className="spacer" />
        <button type="button" className={`director-connect ${linking ? 'on' : ''}`} onClick={toggleLink} aria-pressed={linking}>
          <span className="link-mark">⌁</span> {linking ? 'Linking' : 'Connect'}
        </button>
      </div>

      {wired.length > 0 && (
        <div className="director-links">
          {wired.map((c) => {
            const agent = getAgent(c.agentId)
            return (
              <div key={c.id} className="director-link">
                <span
                  className="director-avatar"
                  style={{
                    background: `color-mix(in srgb, ${agent.color} 18%, var(--panel-2))`,
                    borderColor: `color-mix(in srgb, ${agent.color} 38%, transparent)`,
                    color: agent.color
                  }}
                >
                  {agent.name.slice(0, 1)}
                </span>
                <button
                  type="button"
                  className="director-link-main"
                  onClick={() => window.dispatchEvent(new CustomEvent('hive:frame', { detail: c.id }))}
                  title={`Focus ${c.title}`}
                >
                  <b>{c.title}</b>
                  <em>{agent.name} · {c.status}</em>
                </button>
                <button
                  type="button"
                  className="director-unlink"
                  onClick={() => connectNodes(node.id, c.id)}
                  title={`Disconnect ${c.title}`}
                  aria-label={`Disconnect ${c.title}`}
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}

      <div className="director-stage">
        <button
          type="button"
          className={`director-orb ${linking ? 'linking' : ''}`}
          onClick={toggleLink}
          aria-label={linking ? 'Cancel linking' : 'Link an agent'}
          aria-pressed={linking}
          title={linking ? 'Linking — pick an agent' : 'Click to link an agent'}
        >
          <span className="director-ring" aria-hidden="true" />
          <span className="director-gem" aria-hidden="true">
            <span className="director-gem-core" />
            <span className="director-gem-shine" />
          </span>
          <span className="director-spark s1" aria-hidden="true" />
          <span className="director-spark s2" aria-hidden="true" />
        </button>
        <b>{wired.length ? `${wired.length} agent${wired.length === 1 ? '' : 's'} wired` : 'No agents wired'}</b>
        <p>{linking ? 'Click any agent on the board to rope it in.' : wired.length ? 'Every order goes to the whole wired crew.' : 'Spawn a fresh lane below, or tap Connect and pick consoles on the board.'}</p>
        <button type="button" className="director-spawn" onClick={spawnAndLink}><span>＋</span> Spawn agent</button>
      </div>

      <div className="director-cmd">
        <input
          value={text}
          placeholder={wired.length ? 'Order the wired crew…' : "Try 'spawn two reviewers'…"}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send() } }}
        />
        <button type="button" className="director-send" onClick={send} disabled={!text.trim()} title="Send order" aria-label="Send order">↑</button>
      </div>
    </div>
  )
}

function MemoryView({ node }: { node: MemoryNode }) {
  const memory = useApp((s) => s.memory)
  const activeRepoId = useApp((s) => s.activeRepoId)
  const panel = useApp((s) => s.setPanel)
  const facts = memory.filter((f) => f.scope === 'global' || f.scope === activeRepoId)
  return (
    <div className="pad">
      <div className="muted small">{facts.length} facts · {node.scope === 'global' ? 'all repos' : 'this repo'}</div>
      <ul className="fact-list">
        {facts.slice(0, 6).map((f) => <li key={f.id}><b>{f.kind}</b> {f.text.slice(0, 80)}</li>)}
      </ul>
      <button className="btn small" onClick={() => panel('memory')}>Open memory</button>
    </div>
  )
}

function BranchesView({ node }: { node: BranchesNode }) {
  const repo = useApp((s) => s.repos.find((r) => r.id === s.activeRepoId))
  const [branches, setBranches] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const toast = useApp((s) => s.toast)
  const load = () => {
    if (!repo) return
    void window.api.git.status(repo.path).then((s) => setCurrent(s.branch))
    void window.api.git.branches(repo.path).then(setBranches)
  }
  useEffect(load, [repo?.path])
  return (
    <div className="pad">
      <div className="muted small">on {current || 'unknown'}</div>
      <div className="branch-list">
        {branches.map((b) => (
          <button
            key={b}
            className={`branch ${b === current ? 'on' : ''}`}
            onClick={() => {
              if (!repo) return
              void window.api.git.checkout(repo.path, b).then(() => { setCurrent(b); toast(`Switched to ${b}`, 'ok') }).catch((e: Error) => toast(e.message, 'error'))
            }}
          >
            {b}
          </button>
        ))}
      </div>
      <button className="btn small" onClick={() => {
        const name = window.prompt('New branch name')
        if (!name || !repo) return
        void window.api.git.createBranch(repo.path, name).then(load)
      }}>New branch</button>
    </div>
  )
}

export default function NodeBody({ node }: { node: AnyNode }) {
  switch (node.kind) {
    case 'console':
      return <ConsoleNode node={node} />
    case 'note':
      return <NoteView node={node} />
    case 'text':
      return <TextView node={node} />
    case 'checklist':
      return (<><Head node={node} /><ChecklistView node={node} /></>)
    case 'kanban':
      return (<><Head node={node} /><KanbanView node={node} /></>)
    case 'calendar':
      return (<><Head node={node} /><CalendarView node={node} /></>)
    case 'web':
      return (<><Head node={node} /><WebView node={node} /></>)
    case 'image':
      return (<><Head node={node} /><img className="image-body" src={node.src} alt={node.title} /></>)
    case 'shape':
      return <ShapeView node={node} />
    case 'card':
      return (<><Head node={node} /><CardView node={node} /></>)
    case 'orchestrator':
      return (<><Head node={node} /><OrchestratorView node={node} /></>)
    case 'memory':
      return (<><Head node={node} /><MemoryView node={node} /></>)
    case 'branches':
      return (<><Head node={node} /><BranchesView node={node} /></>)
    default:
      return null
  }
}

export { Head }
