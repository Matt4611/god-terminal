import { useEffect, useMemo, useState } from 'react'
import { PRESETS, allAgents, getAgent } from '@shared/agents'
import { useApp, activeRepo } from '../store'
import { spawnTeam } from '../actions'

const MAX = 12
let seq = 0
type Slot = { key: number; agentId: string }

const slot = (agentId: string): Slot => ({ key: ++seq, agentId })

const TEMPLATES = [
  { id: 'solo', name: 'Solo', agents: 1 },
  { id: 'pair', name: 'Pair', agents: 2 },
  { id: 'trio', name: 'Trio', agents: 3 },
  { id: 'squad', name: 'Squad of 6', agents: 6 }
]

export default function TeamComposer() {
  const open = useApp((s) => s.composerOpen)
  const setOpen = useApp((s) => s.setComposerOpen)
  const defaultAgent = useApp((s) => s.settings.defaultAgent)
  const repo = useApp((s) => activeRepo(s))
  const [slots, setSlots] = useState<Slot[]>([])
  const [name, setName] = useState('')
  const agents = useMemo(() => allAgents().filter((a) => a.command), [open])

  useEffect(() => {
    if (open && !slots.length) setSlots([slot(defaultAgent), slot(defaultAgent), slot(defaultAgent)])
  }, [open, slots.length, defaultAgent])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        launch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, slots, name])

  if (!open) return null

  const add = () => {
    if (slots.length >= MAX) return
    setSlots((s) => [...s, slot(defaultAgent)])
  }
  const remove = (key: number) => setSlots((s) => (s.length === 1 ? s : s.filter((x) => x.key !== key)))
  const setAgent = (key: number, agentId: string) =>
    setSlots((s) => s.map((x) => (x.key === key ? { ...x, agentId } : x)))
  const fill = (count: number) => setSlots(Array.from({ length: Math.min(MAX, count) }, () => slot(defaultAgent)))
  const fillPreset = (id: string) => {
    const preset = PRESETS.find((p) => p.id === id)
    if (!preset) return
    setSlots(preset.lanes.slice(0, MAX).map((l) => slot(l.agentId || defaultAgent)))
    setName(preset.name)
  }
  const launch = () => {
    if (!repo || !slots.length) return
    spawnTeam(slots.map((s) => ({ agentId: s.agentId })), { name: name.trim() })
    useApp.setState({ showHome: false })
    setOpen(false)
    setName('')
  }

  const totals = slots.reduce<Record<string, number>>((acc, s) => {
    const agent = getAgent(s.agentId).name
    acc[agent] = (acc[agent] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="composer-overlay" onPointerDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <section className="team-composer" data-testid="team-composer" role="dialog" aria-label="Launch a team">
        <header className="tc-head">
          <div>
            <div className="kicker">Launch together</div>
            <h2>Compose a team</h2>
            <p>Line up the consoles, pick an agent for each, and start them in one action. Each console runs the CLI installed on your PATH.</p>
          </div>
          <button className="tc-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </header>

        <div className="tc-toolbar">
          <div className="tc-templates">
            {TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => fill(t.agents)} className={slots.length === t.agents ? 'on' : ''}>
                {t.name}
              </button>
            ))}
            <span className="tc-divider" />
            <select value="" onChange={(e) => e.target.value && fillPreset(e.target.value)}>
              <option value="">From a preset…</option>
              {PRESETS.filter((p) => p.lanes.length <= MAX).map((p) => (
                <option key={p.id} value={p.id}>{p.name} · {p.lanes.length}</option>
              ))}
            </select>
          </div>
          <span className="tc-count">{slots.length}/{MAX}</span>
        </div>

        <div className="tc-grid">
          {slots.map((s, i) => {
            const agent = getAgent(s.agentId)
            return (
              <article className="tc-slot" key={s.key} style={{ animationDelay: `${Math.min(i, 11) * 34}ms` }}>
                <div className="tc-slot-top">
                  <span className="tc-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tc-dot" style={{ background: agent.color }} />
                  <button className="tc-remove" onClick={() => remove(s.key)} disabled={slots.length === 1} aria-label="Remove">×</button>
                </div>
                <div className="tc-agent-name">{agent.name}</div>
                <div className="tc-agent-cmd">{agent.command || 'shell'}</div>
                <select value={s.agentId} onChange={(e) => setAgent(s.key, e.target.value)}>
                  {!agents.some((a) => a.id === s.agentId) && <option value={s.agentId}>{agent.name}</option>}
                  {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </article>
            )
          })}
          <button className="tc-add" onClick={add} disabled={slots.length >= MAX}>
            <span>＋</span>
            Add console
          </button>
        </div>

        <footer className="tc-foot">
          <div className="tc-summary">
            <input
              className="tc-name"
              placeholder={`Team ${(repo?.workspaces.length ?? 1) + 1}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={32}
            />
            <span className="tc-mix">
              {Object.entries(totals).map(([n, c]) => `${c}× ${n}`).join(' · ') || 'No agents yet'}
            </span>
          </div>
          <div className="tc-actions">
            <span className="tc-where">{repo ? repo.name : 'Add a repo first'}</span>
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn primary launch" data-testid="launch-team" onClick={launch} disabled={!repo}>
              Launch {slots.length} console{slots.length === 1 ? '' : 's'} <kbd>Ctrl ↵</kbd>
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}
