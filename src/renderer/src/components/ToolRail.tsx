import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import type { Tool } from '../store'
import { useApp } from '../store'
import { spawnConsoles, spawnDirector } from '../actions'

type Ripple = { id: number; x: number; y: number }

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const seq = useRef(0)
  const spawn = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = ++seq.current
    setRipples((list) => [...list, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    window.setTimeout(() => setRipples((list) => list.filter((x) => x.id !== id)), 620)
  }
  return { ripples, spawn }
}

const icons: Record<string, ReactNode> = {
  select: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3.2 18.2 10l-5.4 1.4-2.4 5.8L5 3.2Z" />
    </svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5a1.5 1.5 0 0 1 3 0V11m0-4a1.5 1.5 0 0 1 3 0v4m0-1.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-5.1-2.8L4.8 14a1.6 1.6 0 0 1 2.7-1.7L9 14" />
    </svg>
  ),
  director: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5 18.8 6.4l2.7 6.4-6 8.7H8.5l-6-8.7 2.7-6.4L12 2.5Z" />
      <path d="M12 2.5 9 12l3 9.5M12 2.5l3 9.5-3 9.5M2.6 12.8h18.8M5.2 6.4l6.8 6.4 6.8-6.4" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.5 14.5 14.5 9M8 17.4l-1.1 1.1a3.4 3.4 0 0 1-4.8-4.8l3-3a3.4 3.4 0 0 1 4.8 0M16 6.6l1.1-1.1a3.4 3.4 0 0 1 4.8 4.8l-3 3a3.4 3.4 0 0 1-4.8 0" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8l1.7 5.5 5.5 1.8-5.5 1.8L12 17.4l-1.7-5.5-5.5-1.8 5.5-1.8L12 2.8Z" />
      <path d="M19 16.4l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  console: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m6 9 3 3-3 3M12.5 15H18" />
    </svg>
  ),
  note: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3.5h14v11l-5.5 6H5v-17Z" />
      <path d="M13.5 20.5v-6H19" />
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="650" fill="currentColor" stroke="none">Aa</text>
    </svg>
  ),
  shape: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 9 9-9 9-9-9 9-9Z" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m14 7 3 3" />
    </svg>
  ),
  eraser: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 18-4-4 9-9a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8L9 18H7Z" />
      <path d="M9 18h11M9 8l7 7" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.4" />
      <path d="m4 17 5-5 4 4 2.5-2.5L20 18" />
    </svg>
  ),
  fit: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  mission: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1.8v3M22.2 12h-3M12 22.2v-3M1.8 12h3" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <path d="M6 8.5v7M18 10.5c0 4-4 4-6.5 4.5" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h8M17 7h3M4 17h3M12 17h8" />
      <circle cx="14.5" cy="7" r="2.5" />
      <circle cx="9.5" cy="17" r="2.5" />
    </svg>
  )
}

function ToolButton({
  label, hint, active = false, disabled = false, onClick, testId, tone = '', children
}: {
  label: string
  hint?: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  testId?: string
  tone?: string
  children: ReactNode
}) {
  const { ripples, spawn } = useRipples()
  return (
    <button
      type="button"
      className={`tool-btn ${tone} ${active ? 'on' : ''}`}
      title={hint ?? label}
      aria-label={label}
      aria-pressed={active || undefined}
      data-testid={testId}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={spawn}
    >
      {children}
      {ripples.map((r) => (
        <span key={r.id} className="rail-ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </button>
  )
}

export default function ToolRail() {
  const tool = useApp((s) => s.tool)
  const panel = useApp((s) => s.panel)
  const threadOpen = useApp((s) => s.threadOpen)
  const selected = useApp((s) => s.selected)
  const repo = useApp((s) => s.repos.find((r) => r.id === s.activeRepoId) ?? null)
  const setTool = useApp((s) => s.setTool)
  const setPanel = useApp((s) => s.setPanel)
  const setThreadOpen = useApp((s) => s.setThreadOpen)
  const setComposerOpen = useApp((s) => s.setComposerOpen)
  const setWireFrom = useApp((s) => s.setWireFrom)
  const toast = useApp((s) => s.toast)
  const disabled = !repo

  const pick = (next: Tool) => {
    setTool(next)
    setWireFrom(null)
  }

  const openBrain = () => {
    setThreadOpen(true)
    window.dispatchEvent(new CustomEvent('hive:brain'))
  }

  const toggleWire = () => {
    if (tool === 'wire') {
      setTool('select')
      setWireFrom(null)
      return
    }
    setTool('wire')
    const source = selected.length === 1 ? selected[0] : null
    setWireFrom(source)
    toast(source ? 'Rope: click a second node' : 'Rope: click the first node', 'info')
  }

  const spawnDirectorNode = () => {
    setTool('select')
    spawnDirector()
  }

  return (
    <aside className="tool-rail" data-testid="tool-rail" aria-label="God Terminal tools">
      <ToolButton label="Select" hint="Select (V)" active={tool === 'select'} tone="select" onClick={() => pick('select')}>
        {icons.select}
      </ToolButton>
      <ToolButton label="Pan" hint="Pan (hold Space)" active={tool === 'hand'} onClick={() => pick('hand')}>
        {icons.hand}
      </ToolButton>

      <span className="tool-sep" />

      <ToolButton label="Spawn Director" hint="Spawn Director — link the crew" testId="spawn-director" tone="director" disabled={disabled} onClick={spawnDirectorNode}>
        {icons.director}
      </ToolButton>
      <ToolButton label="Connect nodes" hint="Connect nodes with a rope" testId="wire-tool" tone="link" active={tool === 'wire'} disabled={disabled} onClick={toggleWire}>
        {icons.link}
      </ToolButton>

      <span className="tool-sep" />

      <ToolButton label="Main Brain" hint="Main Brain (Ctrl+Shift+B)" testId="open-brain" active={threadOpen} onClick={openBrain}>
        {icons.brain}
      </ToolButton>
      <ToolButton label="Launch a team" hint="Launch a team (Ctrl+Shift+T)" testId="open-team" disabled={disabled} onClick={() => setComposerOpen(true)}>
        {icons.team}
      </ToolButton>
      <ToolButton label="New console" hint="New console (T)" disabled={disabled} onClick={() => spawnConsoles(1)}>
        {icons.console}
      </ToolButton>

      <span className="tool-sep" />

      <ToolButton label="Note" hint="Add a note" active={tool === 'note'} disabled={disabled} onClick={() => pick('note')}>
        {icons.note}
      </ToolButton>
      <ToolButton label="Text" hint="Add text" active={tool === 'text'} disabled={disabled} onClick={() => pick('text')}>
        {icons.text}
      </ToolButton>
      <ToolButton label="Shape" hint="Add a shape" active={tool === 'shape'} disabled={disabled} onClick={() => pick('shape')}>
        {icons.shape}
      </ToolButton>
      <ToolButton label="Pen" hint="Draw (P)" active={tool === 'pen'} disabled={disabled} onClick={() => pick('pen')}>
        {icons.pen}
      </ToolButton>
      <ToolButton label="Eraser" hint="Eraser (E)" active={tool === 'eraser'} disabled={disabled} onClick={() => pick('eraser')}>
        {icons.eraser}
      </ToolButton>
      <ToolButton label="Web tile" hint="Add a web tile" active={tool === 'web'} disabled={disabled} onClick={() => pick('web')}>
        {icons.web}
      </ToolButton>
      <ToolButton label="Image" hint="Add an image" active={tool === 'image'} disabled={disabled} onClick={() => pick('image')}>
        {icons.image}
      </ToolButton>

      <span className="tool-spacer" />
      <span className="tool-sep" />

      <ToolButton label="Fit board" hint="Fit board (Shift+1)" onClick={() => window.dispatchEvent(new CustomEvent('hive:fit'))}>
        {icons.fit}
      </ToolButton>
      <ToolButton label="Mission Map" hint="Mission Map" active={panel === 'mission'} onClick={() => setPanel('mission')}>
        {icons.mission}
      </ToolButton>
      <ToolButton label="Git" hint="Git (G)" active={panel === 'git'} onClick={() => setPanel('git')}>
        {icons.git}
      </ToolButton>
      <ToolButton label="Settings" hint="Settings" active={panel === 'settings'} onClick={() => setPanel('settings')}>
        {icons.settings}
      </ToolButton>
    </aside>
  )
}
