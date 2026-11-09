import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import type {
  AnyNode, CalendarEvent, CardNode, ChecklistNode, ConsoleNode as ConsoleType, KanbanNode,
  MemoryNode, NoteNode, OrchestratorNode, ShapeNode, TextNode, WebNode, BranchesNode
} from '@shared/types'
import { useApp } from '../store'
import ConsoleNode from './ConsoleNode'
import { sendOrder } from '../runtime'
import { spawnConsoles } from '../actions'
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
  const patch = useApp((s) => s.patchNode)
  const updateBoard = useApp((s) => s.updateBoard)
  const [text, setText] = useState('')
  const consoles = (board?.nodes.filter((n) => n.kind === 'console') ?? []) as ConsoleType[]
  const wired = consoles.filter((c) => node.wired.includes(c.id))
  return (
    <div className="orch-body">
      <div className="muted small">{wired.length} agent(s) wired</div>
      <div className="wire-list">
        {wired.map((c) => (
          <div key={c.id} className="wire-row">
            <span className={`dot ${c.status === 'NEEDS YOU' ? 'needs' : ''}`} />
            <span>{c.title}</span>
            <span className="spacer" />
            <button className="link" onClick={() => patch(node.id, { wired: node.wired.filter((x) => x !== c.id) })}>×</button>
          </div>
        ))}
      </div>
      <select
        className="ghost-input"
        value=""
        onChange={(e) => {
          const id = e.target.value
          if (!id) return
          patch(node.id, { wired: [...new Set([...node.wired, id])] })
          updateBoard((b) => ({
            ...b,
            wires: [...b.wires, { id: uid(), from: id, to: node.id, kind: 'orchestrator' as const }]
          }))
        }}
      >
        <option value="">Wire a console…</option>
        {consoles.filter((c) => !node.wired.includes(c.id)).map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>
      <textarea
        className="ghost-input"
        rows={2}
        value={text}
        placeholder="Order these consoles…"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!text.trim()) return
            if (!wired.length) return
            for (const c of wired) sendOrder(c.id, text.trim())
            setText('')
          }
        }}
      />
      <div className="row">
        <button
          className="btn small"
          onClick={() => {
            const made = spawnConsoles(1)
            if (made[0]) {
              patch(node.id, { wired: [...node.wired, made[0].id] })
              updateBoard((b) => ({
                ...b,
                wires: [...b.wires, { id: uid(), from: made[0].id, to: node.id, kind: 'orchestrator' as const }]
              }))
            }
          }}
        >
          Spawn agent
        </button>
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
