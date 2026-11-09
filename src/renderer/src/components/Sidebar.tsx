import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { consolesOf, useApp } from '../store'
import { spawnConsoles } from '../actions'

type Ripple = { id: number; x: number; y: number }

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const seq = useRef(0)
  const spawn = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = ++seq.current
    setRipples((list) => [...list, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    window.setTimeout(() => setRipples((list) => list.filter((x) => x.id !== id)), 640)
  }
  return { ripples, spawn }
}

const icons: Record<string, ReactNode> = {
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
  settings: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h8M17 7h3M4 17h3M12 17h8" />
      <circle cx="14.5" cy="7" r="2.5" />
      <circle cx="9.5" cy="17" r="2.5" />
    </svg>
  )
}

function RailButton({
  label, hint, active = false, disabled = false, onClick, testId, className = '', children
}: {
  label: string
  hint?: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  testId?: string
  className?: string
  children: ReactNode
}) {
  const { ripples, spawn } = useRipples()
  return (
    <button
      className={`rail-btn ${className} ${active ? 'on' : ''}`}
      title={hint ?? label}
      aria-label={label}
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

export default function Sidebar() {
  const [ringOpen, setRingOpen] = useState(false)
  const { ripples: orbRipples, spawn: orbSpawn } = useRipples()
  const threadOpen = useApp((s) => s.threadOpen)
  const panel = useApp((s) => s.panel)
  const repo = useApp((s) => s.repos.find((r) => r.id === s.activeRepoId) ?? null)
  const board = useApp((s) => s.board())
  const setThreadOpen = useApp((s) => s.setThreadOpen)
  const setComposerOpen = useApp((s) => s.setComposerOpen)
  const setPanel = useApp((s) => s.setPanel)
  const live = consolesOf(board).filter((c) => ['READY', 'IDLE', 'WORKING', 'RUNNING'].includes(c.status)).length

  const openBrain = () => {
    setThreadOpen(true)
    window.dispatchEvent(new CustomEvent('hive:brain'))
  }

  useEffect(() => {
    if (!ringOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRingOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ringOpen])

  const items = [
    { id: 'brain', label: 'Brain', icon: icons.brain, run: openBrain },
    { id: 'team', label: 'Team', icon: icons.team, run: () => setComposerOpen(true) },
    { id: 'console', label: 'New', icon: icons.console, run: () => spawnConsoles(1) },
    { id: 'fit', label: 'Fit', icon: icons.fit, run: () => window.dispatchEvent(new CustomEvent('hive:fit')) },
    { id: 'mission', label: 'Mission', icon: icons.mission, run: () => setPanel('mission') },
    { id: 'settings', label: 'Settings', icon: icons.settings, run: () => setPanel('settings') }
  ]

  const radius = 158
  const angles = [0, 17, 34, 51, 68, 85]

  return (
    <>
      <aside className="left-rail" aria-label="GoT controls">
        <button
          className={`rail-orb ${ringOpen ? 'open' : ''}`}
          aria-label="Quick actions"
          aria-expanded={ringOpen}
          title={`Quick actions · ${live} live`}
          onClick={() => setRingOpen((v) => !v)}
          onPointerDown={orbSpawn}
        >
          <span className="rail-orb-core">G</span>
          <span className={`rail-orb-status ${live ? 'on' : ''}`} />
          {orbRipples.map((r) => (
            <span key={r.id} className="rail-ripple" style={{ left: r.x, top: r.y }} />
          ))}
        </button>

        <RailButton
          label="Main Brain"
          hint="Main Brain (Ctrl+Shift+B)"
          testId="open-brain"
          active={threadOpen}
          onClick={openBrain}
          className="rail-brain"
        >
          {icons.brain}
        </RailButton>
        <RailButton
          label="Launch a team"
          hint="Launch a team (Ctrl+Shift+T)"
          testId="open-team"
          disabled={!repo}
          onClick={() => setComposerOpen(true)}
          className="rail-team"
        >
          {icons.team}
        </RailButton>
        <RailButton
          label="New console"
          hint="New agent (T)"
          onClick={() => spawnConsoles(1)}
        >
          {icons.console}
        </RailButton>

        <span className="rail-spacer" />

        <RailButton label="Fit board" hint="Fit board (Shift+1)" onClick={() => window.dispatchEvent(new CustomEvent('hive:fit'))}>
          {icons.fit}
        </RailButton>
        <RailButton
          label="Mission Map"
          hint="Mission Map"
          active={panel === 'mission'}
          onClick={() => setPanel('mission')}
        >
          {icons.mission}
        </RailButton>
        <RailButton
          label="Git"
          hint="Git (G)"
          active={panel === 'git'}
          onClick={() => setPanel('git')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="6" cy="18" r="2.5" />
            <circle cx="18" cy="8" r="2.5" />
            <path d="M6 8.5v7M18 10.5c0 4-4 4-6.5 4.5" />
          </svg>
        </RailButton>
        <RailButton
          label="Settings"
          hint="Settings"
          active={panel === 'settings'}
          onClick={() => setPanel('settings')}
        >
          {icons.settings}
        </RailButton>
      </aside>

      {ringOpen && (
        <>
          <div className="ring-backdrop" onPointerDown={() => setRingOpen(false)} />
          <div className="ring-menu" style={{ left: 29, top: 33 }} role="menu" aria-label="Quick actions">
            <svg className="ring-orbit" viewBox="0 0 340 340" aria-hidden="true">
              <path d="M 336 170 A 166 166 0 0 1 170 336" />
              <path className="inner" d="M 306 170 A 136 136 0 0 1 170 306" />
            </svg>
            <div className="ring-hub">G</div>
            {items.map((item, i) => {
              const rad = (angles[i] * Math.PI) / 180
              return (
                <button
                  key={item.id}
                  className="ring-btn"
                  role="menuitem"
                  title={item.label}
                  style={{
                    left: Math.round(Math.cos(rad) * radius) - 27,
                    top: Math.round(Math.sin(rad) * radius) - 27,
                    animationDelay: `${i * 26}ms`
                  }}
                  onClick={() => {
                    item.run()
                    setRingOpen(false)
                  }}
                >
                  <b>{item.icon}</b>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
