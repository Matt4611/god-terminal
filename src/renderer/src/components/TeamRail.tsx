import type { Board } from '@shared/types'
import { getAgent } from '@shared/agents'
import { consolesOf, useApp } from '../store'
import { spawnConsoles } from '../actions'

const LIVE = new Set(['STARTING', 'WORKING', 'RUNNING', 'READY', 'IDLE'])
const statusKey = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

export default function TeamRail({ board }: { board: Board }) {
  const setComposerOpen = useApp((s) => s.setComposerOpen)
  const setThreadOpen = useApp((s) => s.setThreadOpen)
  const consoles = consolesOf(board)
  const running = consoles.filter((c) => LIVE.has(c.status)).length
  const needs = consoles.filter((c) => c.status === 'NEEDS YOU').length

  const openBrain = () => {
    setThreadOpen(true)
    window.dispatchEvent(new CustomEvent('hive:brain'))
  }

  return (
    <aside className="team-rail" aria-label="Team">
      <header className="team-rail-head">
        <div>
          <div className="rail-title">Team</div>
          <b>{running}<span> running</span></b>
        </div>
        <button className="team-add" onClick={() => setComposerOpen(true)} title="Launch a team" aria-label="Launch a team">＋</button>
      </header>

      <button className="team-card team-brain" onClick={openBrain} title="Open Main Brain">
        <span className="team-orb">G</span>
        <span className="team-copy">
          <b>Main Brain</b>
          <em>local · coordinates the crew</em>
        </span>
        <i className="live-dot on" />
      </button>

      <div className="team-list">
        {consoles.map((c) => {
          const agent = getAgent(c.agentId)
          return (
            <button
              key={c.id}
              className={`team-card status-${statusKey(c.status)}`}
              onClick={() => window.dispatchEvent(new CustomEvent('hive:frame', { detail: c.id }))}
              title={`Focus ${c.title}`}
            >
              <span
                className="team-avatar"
                style={{
                  background: `color-mix(in srgb, ${agent.color} 18%, var(--panel-2))`,
                  borderColor: `color-mix(in srgb, ${agent.color} 38%, transparent)`,
                  color: agent.color
                }}
              >
                {agent.name.slice(0, 1)}
              </span>
              <span className="team-copy">
                <b>{c.title}</b>
                <em>{agent.name}</em>
                <span className="team-status"><i /> {c.status}</span>
              </span>
            </button>
          )
        })}
        {!consoles.length && (
          <div className="team-empty">
            <span>No agents on this board yet.</span>
            <button onClick={() => setComposerOpen(true)}>Launch a team</button>
          </div>
        )}
      </div>

      <footer className="team-rail-foot">
        <button onClick={() => spawnConsoles(1)}>＋ <span>New console</span></button>
        {needs > 0 && <span className="team-needs">{needs} needed</span>}
      </footer>
    </aside>
  )
}
