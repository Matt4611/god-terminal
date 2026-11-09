import { useEffect, useRef, useState } from 'react'
import { useApp, consolesOf, llmConfig } from '../store'
import { runCommand, spawnConsoles } from '../actions'
import { PRESETS, ROLES, TINTS } from '@shared/agents'
import { timeAgo, uid } from '../util'

const HINTS = [
  'Ask the brain to split this task across the crew',
  'spawn 4 codex',
  'add a kanban',
  'deploy preset Dev HQ',
  '@Otto fix the login',
  'commit and push'
]

export default function CommandBar({
  recording, onVoiceStart, onVoiceStop
}: {
  recording: boolean
  onVoiceStart: () => void
  onVoiceStop: () => void
}) {
  const draft = useApp((s) => s.commandDraft)
  const setDraft = useApp((s) => s.setCommandDraft)
  const threadOpen = useApp((s) => s.threadOpen)
  const setThreadOpen = useApp((s) => s.setThreadOpen)
  const threads = useApp((s) => s.threads)
  const activeRepoId = useApp((s) => s.activeRepoId)
  const board = useApp((s) => s.board())
  const settings = useApp((s) => s.settings)
  const brainBusy = useApp((s) => s.brainBusy)
  const setPanel = useApp((s) => s.setPanel)
  const addMessage = useApp((s) => s.addMessage)
  const clearThread = useApp((s) => s.clearThread)
  const selected = useApp((s) => s.selected)
  const toast = useApp((s) => s.toast)
  const [history, setHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState(-1)
  const [showHints, setShowHints] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messages = (threads[activeRepoId ?? ''] ?? []).slice(-60)
  const cfg = llmConfig(settings)
  const provider = cfg.provider === 'lmstudio' ? 'LM Studio' : 'Ollama'
  const model = cfg.model || 'choose model'
  const last = [...messages].reverse().find((m) => m.role === 'user' || m.role === 'brain')
  const preview = brainBusy
    ? 'thinking…'
    : last
      ? last.text.replace(/\s+/g, ' ').slice(0, 118)
      : 'Ready — ask for a plan or just talk.'

  useEffect(() => {
    const focus = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setThreadOpen(true)
        setTimeout(() => inputRef.current?.focus(), 30)
      }
    }
    const focusBrain = () => {
      setThreadOpen(true)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
    window.addEventListener('keydown', focus)
    window.addEventListener('hive:brain', focusBrain)
    return () => {
      window.removeEventListener('keydown', focus)
      window.removeEventListener('hive:brain', focusBrain)
    }
  }, [setThreadOpen])

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    setHistory((h) => [text, ...h].slice(0, 40))
    setHistIndex(-1)
    setShowHints(false)
    setThreadOpen(true)
    void runCommand(text)
  }

  const mod = window.api.platform === 'darwin' ? '⌘' : 'Ctrl'
  const running = consolesOf(board).filter((c) => ['READY', 'IDLE', 'WORKING'].includes(c.status)).length
  const needs = consolesOf(board).filter((c) => c.status === 'NEEDS YOU').length

  const groupSelection = () => {
    if (selected.length < 2) {
      toast('Select two or more consoles to group', 'info')
      return
    }
    const role = window.prompt(
      `Role for ${selected.length} selected consoles (${ROLES.join(', ')})`,
      'General'
    )
    if (!role) return
    const clean = ROLES.find((r) => r.toLowerCase() === role.toLowerCase()) ?? role
    useApp.getState().updateBoard((b) => ({
      ...b,
      groups: [
        ...b.groups,
        {
          id: uid(),
          name: `${clean} ${b.groups.length + 1}`,
          role: clean,
          tint: TINTS[b.groups.length % TINTS.length],
          memberIds: [...selected]
        }
      ]
    }))
    toast(`Grouped ${selected.length} consoles as ${clean}`, 'ok')
  }

  return (
    <div className="command-dock">
      <div className="quick-dock" role="toolbar" aria-label="Board actions">
        <button onClick={() => spawnConsoles(1)}><b>＋</b><span>New console</span></button>
        <button onClick={() => spawnConsoles(4)}><b>✦</b><span>Spawn 4</span></button>
        <button onClick={groupSelection}><b>▦</b><span>Group</span></button>
        <button onClick={() => setPanel('presets')}><b>▤</b><span>Presets</span></button>
        <button onClick={() => setPanel('memory')}><b>◈</b><span>Memory</span></button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('hive:fit'))}><b>⤢</b><span>Fit</span></button>
      </div>

      <div className="main-brain" data-testid="main-brain">
        <div
          className={`brain-strip ${threadOpen ? 'open' : ''}`}
          onClick={() => setThreadOpen(!threadOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setThreadOpen(!threadOpen)
          }}
        >
          <span className="brain-orb-mini">B</span>
          <span className="brain-strip-name">Main Brain</span>
          <span className={`brain-strip-state ${brainBusy ? 'busy' : ''}`}>
            <i />
            {preview}
          </span>
          <span className="spacer" />
          <button
            className="brain-model-btn"
            title="Choose model in Settings"
            onClick={(e) => {
              e.stopPropagation()
              setPanel('settings')
            }}
          >
            {provider} · {model}
          </button>
          <span className="brain-chevron">{threadOpen ? '⌄' : '⌃'}</span>
        </div>

        {threadOpen && (
          <div className="thread main-brain-thread" data-testid="main-brain-thread">
            <div className="thread-head">
              <span className="brain-pulse-small" />
              <strong>Main Brain</strong>
              <span className="muted small">local · coordinates the crew</span>
              <span className="spacer" />
              <button className="link" onClick={() => activeRepoId && clearThread(activeRepoId)}>Clear</button>
              <button className="icon" onClick={() => setThreadOpen(false)} title="Collapse">×</button>
            </div>
            <div className="thread-body">
              {!messages.length && (
                <div className="brain-empty">
                  <b>Ask me anything.</b> I can split a task across the agents, answer questions about the
                  board, or just talk. Use <code>@Name</code> when you want to speak to one agent directly.
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`msg msg-${m.role}`}>
                  <div className="msg-meta">
                    <span>
                      {m.role === 'user' ? 'You'
                        : m.role === 'agent' ? m.agent ?? 'Agent'
                          : m.role === 'brain' ? 'Main Brain'
                            : 'GoT'}
                    </span>
                    <span>{timeAgo(m.at)}</span>
                  </div>
                  <div className="msg-text">{m.text}</div>
                </div>
              ))}
              {brainBusy && (
                <div className="brain-typing">
                  <i /><i /><i />
                  <span>Main Brain is thinking…</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showHints && (
        <div className="hints">
          {HINTS.map((h) => (
            <button key={h} onClick={() => { setDraft(h); setShowHints(false); inputRef.current?.focus() }}>{h}</button>
          ))}
          <div className="hint-sep" />
          {PRESETS.slice(0, 4).map((p) => (
            <button key={p.id} onClick={() => { setDraft(`deploy preset ${p.name}`); setShowHints(false) }}>{p.name}</button>
          ))}
        </div>
      )}

      <div className={`command-bar ${recording ? 'recording' : ''}`}>
        <button className="chip cmd-key" onClick={() => setShowHints((v) => !v)} title="Commands">{mod}</button>
        <input
          ref={inputRef}
          data-testid="brain-input"
          value={draft}
          placeholder={recording ? 'Listening…' : 'Message the Main Brain… or @agent for a direct order'}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => setTimeout(() => setShowHints(false), 180)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submit()
            } else if (e.key === 'ArrowUp' && history.length) {
              const next = Math.min(history.length - 1, histIndex + 1)
              setHistIndex(next)
              setDraft(history[next])
            } else if (e.key === 'ArrowDown') {
              const next = histIndex - 1
              setHistIndex(next)
              setDraft(next >= 0 ? history[next] : '')
            } else if (e.key === 'Escape') {
              setShowHints(false)
              inputRef.current?.blur()
            }
          }}
        />
        <button
          className={`mic ${recording ? 'on' : ''}`}
          title="Hold to talk (Space)"
          onPointerDown={(e) => { e.preventDefault(); onVoiceStart() }}
          onPointerUp={(e) => { e.preventDefault(); onVoiceStop() }}
          onPointerLeave={() => recording && onVoiceStop()}
        >
          {recording ? '●' : '🎙'}
        </button>
        <button className="send" onClick={submit} title="Send" data-testid="brain-send">↑</button>
        <span className={`count ${needs ? 'warn' : ''}`} title="running consoles">
          {running} live{needs ? ` · ${needs} need${needs === 1 ? 's' : ''} you` : ''}
        </span>
      </div>
      <div className="dock-hint">
        <span><b>Space</b> talk</span>
        <span><b>{mod}K</b> focus brain</span>
        <span><b>@name</b> direct to agent</span>
        <span>{provider} · {model}</span>
      </div>
    </div>
  )
}
