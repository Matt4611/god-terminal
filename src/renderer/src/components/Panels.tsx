import { useEffect, useMemo, useState } from 'react'
import type { ConsoleNode, Fact, FactKind, GitCommit, GitStatus, Loop, SkillInfo, UsageDay } from '@shared/types'
import { PRESETS, AGENTS, allAgents, getAgent } from '@shared/agents'
import { activeRepo, consolesOf, llmConfig, useApp, type PanelName } from '../store'
import { deployPreset, pushMemory } from '../actions'
import { formatTokens } from '../util'
import Studios from './Studios'

export default function PanelHost({ panel }: { panel: PanelName }) {
  const setPanel = useApp((s) => s.setPanel)
  const titles: Record<string, string> = {
    presets: 'Presets', mission: 'Mission Map', git: 'Git', usage: 'Usage and tokens',
    settings: 'Settings', memory: 'Project memory', loops: 'Loops', profiles: 'Account profiles',
    documents: 'Documents', diagrams: 'Diagrams', code: 'Code', markdown: 'Markdown', skills: 'Skills'
  }
  if (panel === 'mission') return <Mission />
  return (
    <div className="drawer-wrap">
      <div className="drawer">
        <div className="drawer-head">
          <div>
            <div className="kicker">GoT · God Terminal</div>
            <h2>{titles[panel] ?? panel}</h2>
          </div>
          <button className="icon big" onClick={() => setPanel(null)}>×</button>
        </div>
        <div className="drawer-body">
          {panel === 'presets' && <Presets />}
          {panel === 'git' && <Git />}
          {panel === 'usage' && <Usage />}
          {panel === 'settings' && <Settings />}
          {panel === 'memory' && <Memory />}
          {panel === 'loops' && <Loops />}
          {panel === 'profiles' && <Profiles />}
          {['documents', 'diagrams', 'code', 'markdown', 'skills'].includes(panel) && <Studios panel={panel} />}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- presets ---- */

function Presets() {
  const saved = useApp((s) => s.savedPresets)
  const board = useApp((s) => s.board())
  const addNodes = useApp((s) => s.addNodes)
  const deleteSaved = useApp((s) => s.deleteSavedPreset)
  const saveLayout = useApp((s) => s.saveLayout)
  const toast = useApp((s) => s.toast)
  return (
    <div className="panel-stack">
      <p className="lede">A preset lays consoles, groups and helper tiles onto this workspace in one action.</p>
      <div className="preset-list">
        {PRESETS.map((p) => (
          <div key={p.id} className="preset-row">
            <div>
              <div className="preset-name">{p.name}</div>
              <div className="muted small">{p.description}</div>
              <div className="tag-row">
                <span className="tag">{p.lanes.length} agents</span>
                {p.extras?.map((e) => <span key={e} className="tag">{e}</span>)}
              </div>
            </div>
            <button className="btn small" onClick={() => deployPreset(p.id)}>Deploy</button>
          </div>
        ))}
      </div>

      <h3>Saved layouts</h3>
      {!saved.length && <div className="muted small">Save the current board to reuse its arrangement.</div>}
      {saved.map((s) => (
        <div key={s.id} className="preset-row">
          <div>
            <div className="preset-name">{s.name}</div>
            <div className="muted small">{s.nodes.length} nodes</div>
          </div>
          <div className="row">
            <button
              className="btn small"
              onClick={() => {
                const v = board?.viewport ?? { x: 0, y: 0, zoom: 1 }
                const x = (window.innerWidth / 2 - v.x) / v.zoom
                const y = (window.innerHeight / 2 - v.y) / v.zoom
                addNodes(s.nodes.map((n) => ({
                  ...JSON.parse(JSON.stringify(n)),
                  id: `${n.id}-${Math.random().toString(36).slice(2, 6)}`,
                  x: n.x + x,
                  y: n.y + y,
                  ...(n.kind === 'console' ? { launchKey: 0, status: 'STARTING' as const } : {})
                })))
              }}
            >
              Stamp
            </button>
            <button className="link" onClick={() => deleteSaved(s.id)}>Delete</button>
          </div>
        </div>
      ))}
      <button className="btn" onClick={() => {
        if (!board?.nodes.length) return toast('Nothing to save', 'error')
        saveLayout(JSON.parse(JSON.stringify(board.nodes)))
        toast('Layout saved', 'ok')
      }}>Save current layout</button>
    </div>
  )
}

/* --------------------------------------------------------------- mission --- */

const COLUMNS: { key: string; title: string; statuses: string[] }[] = [
  { key: 'needs', title: 'Needs you', statuses: ['NEEDS YOU', 'ERROR'] },
  { key: 'working', title: 'Working', statuses: ['WORKING', 'RUNNING', 'STARTING'] },
  { key: 'ready', title: 'Ready', statuses: ['READY', 'IDLE', 'PAUSED', 'DONE'] }
]

function Mission() {
  const board = useApp((s) => s.board())
  const setPanel = useApp((s) => s.setPanel)
  const [filter, setFilter] = useState('all')
  const groups = board?.groups ?? []
  const consoles = consolesOf(board).filter((c) => filter === 'all' || groups.find((g) => g.id === filter)?.memberIds.includes(c.id))
  return (
    <div className="mission">
      <div className="mission-head">
        <div>
          <div className="kicker">Mission Map</div>
          <h2>{consoles.length} consoles on this workspace</h2>
        </div>
        <div className="row">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All groups</option>
            {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <button className="icon big" onClick={() => setPanel(null)}>×</button>
        </div>
      </div>
      <div className="mission-cols">
        {COLUMNS.map((col) => (
          <div key={col.key} className="mission-col">
            <div className="mission-col-head">
              <span>{col.title}</span>
              <span className="tag">{consoles.filter((c) => col.statuses.includes(c.status)).length}</span>
            </div>
            {consoles.filter((c) => col.statuses.includes(c.status)).map((c) => (
              <button
                key={c.id}
                className="mission-card"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('hive:frame', { detail: c.id }))
                  setPanel(null)
                }}
              >
                <div className="row">
                  <span className="agent-dot" style={{ background: getAgent(c.agentId).color }} />
                  <strong>{c.title}</strong>
                  <span className="spacer" />
                  <span className={`pill small ${c.status === 'NEEDS YOU' ? 'needs' : c.status === 'ERROR' ? 'error' : 'idle'}`}>{c.status}</span>
                </div>
                <div className="muted tiny">{getAgent(c.agentId).name}</div>
                {c.statusDetail && <div className="mission-detail">{c.statusDetail}</div>}
                <div className="tag-row">
                  {groups.filter((g) => g.memberIds.includes(c.id)).map((g) => <span key={g.id} className="tag">{g.name}</span>)}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- git --- */

function Git() {
  const repo = activeRepo(useApp((s) => s))
  const toast = useApp((s) => s.toast)
  const [status, setStatus] = useState<GitStatus | null>(null)
  const [log, setLog] = useState<GitCommit[]>([])
  const [branches, setBranches] = useState<string[]>([])
  const [checked, setChecked] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    if (!repo) return
    const st = await window.api.git.status(repo.path)
    setStatus(st)
    setChecked(st.files.map((f) => f.path))
    setBranches(await window.api.git.branches(repo.path))
    setLog(await window.api.git.log(repo.path))
  }
  useEffect(() => { void load() }, [repo?.path])

  const suggest = () => {
    if (!status?.files.length) return
    const areas = [...new Set(status.files.map((f) => f.path.split(/[\\/]/)[0]))].slice(0, 3)
    setMessage(`${status.files.length} files updated${areas.length ? ` in ${areas.join(', ')}` : ''}`)
  }

  if (!repo) return <div className="muted">Open a repo first.</div>

  if (status && !status.repo) {
    return (
      <div className="panel-stack">
        <p className="lede">This folder is not a git repository yet.</p>
        <button className="btn primary" onClick={async () => {
          await window.api.git.init(repo.path)
          toast('Repository created on main', 'ok')
          await load()
        }}>Create repository</button>
      </div>
    )
  }

  return (
    <div className="panel-stack">
      <div className="row">
        <span className="branch-pill">⑂ {status?.branch ?? '…'}</span>
        <span className="muted small">{status?.ahead ? `↑${status.ahead}` : ''} {status?.behind ? `↓${status.behind}` : ''}</span>
        <span className="spacer" />
        <button className="btn small" disabled={busy} onClick={async () => {
          setBusy(true)
          try { await window.api.git.pull(repo.path); toast('Pulled', 'ok'); await load() }
          catch (e) { toast(e instanceof Error ? e.message : 'Pull failed', 'error') }
          setBusy(false)
        }}>Pull</button>
        <button className="btn small" disabled={busy} onClick={async () => {
          setBusy(true)
          try { await window.api.git.push(repo.path); toast('Pushed', 'ok'); await load() }
          catch (e) { toast(e instanceof Error ? e.message : 'Push failed', 'error') }
          setBusy(false)
        }}>Push</button>
        <button className="icon" onClick={() => void load()}>⟳</button>
      </div>

      <div className="row small">
        <button className="link" onClick={() => setChecked(status?.files.map((f) => f.path) ?? [])}>All</button>
        <button className="link" onClick={() => setChecked([])}>None</button>
        <span className="spacer" />
        <span className="muted">{checked.length}/{status?.files.length ?? 0} selected</span>
      </div>

      <div className="changes">
        {!status?.files.length && <div className="muted small">Working tree clean.</div>}
        {status?.files.map((f) => (
          <label key={f.path} className="change-row">
            <input
              type="checkbox"
              checked={checked.includes(f.path)}
              onChange={() => setChecked((c) => c.includes(f.path) ? c.filter((x) => x !== f.path) : [...c, f.path])}
            />
            <span className={`git-stat ${f.worktree}`}>{f.worktree === ' ' ? f.index : f.worktree}</span>
            <span className="change-path">{f.path}</span>
          </label>
        ))}
      </div>

      <div className="row">
        <input
          className="text-input"
          placeholder="Commit message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn small" onClick={suggest} title="Suggest from changes">✨</button>
      </div>
      <div className="row">
        <button
          className="btn primary"
          disabled={busy || !checked.length}
          onClick={async () => {
            setBusy(true)
            try {
              await window.api.git.commit(repo.path, message || 'Update from GoT', checked)
              if (status?.hasRemote) await window.api.git.push(repo.path)
              toast('Committed', 'ok')
              setMessage('')
              await load()
            } catch (e) { toast(e instanceof Error ? e.message : 'Commit failed', 'error') }
            setBusy(false)
          }}
        >
          Commit & Push
        </button>
        <button className="btn" disabled={busy || !checked.length} onClick={async () => {
          setBusy(true)
          try {
            await window.api.git.commit(repo.path, message || 'Update from GoT', checked)
            toast('Committed', 'ok'); setMessage(''); await load()
          } catch (e) { toast(e instanceof Error ? e.message : 'Commit failed', 'error') }
          setBusy(false)
        }}>Commit only</button>
        <span className="spacer" />
        <button className="link" onClick={() => window.api.shell.openExternal(`https://github.com`)}>GitHub</button>
      </div>

      <h3>Branches</h3>
      <div className="tag-row">
        {branches.map((b) => (
          <button key={b} className={`tag clickable ${b === status?.branch ? 'on' : ''}`} onClick={async () => {
            await window.api.git.checkout(repo.path, b)
            await load()
          }}>{b}</button>
        ))}
        <button className="tag clickable" onClick={async () => {
          const name = window.prompt('New branch name')
          if (!name) return
          await window.api.git.createBranch(repo.path, name)
          await load()
        }}>+ branch</button>
      </div>

      <h3>History</h3>
      <div className="log-list">
        {log.map((c) => (
          <div key={c.hash} className="log-row">
            <code>{c.hash}</code>
            <span>{c.message}</span>
            <span className="spacer" />
            <span className="muted tiny">{new Date(c.date).toLocaleDateString()}</span>
          </div>
        ))}
        {!log.length && <div className="muted small">No commits yet.</div>}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- usage --- */

function Usage() {
  const [days, setDays] = useState<UsageDay[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    void window.api.usage.scan().then((d) => { setDays(d); setLoading(false) })
  }, [])
  const last30 = useMemo(() => {
    const start = new Date()
    start.setDate(start.getDate() - 30)
    return days.filter((d) => new Date(d.date) >= start)
  }, [days])
  const byDay = useMemo(() => {
    const m = new Map<string, number>()
    for (const d of last30) m.set(d.date, (m.get(d.date) ?? 0) + d.total)
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [last30])
  const max = Math.max(1, ...byDay.map(([, v]) => v))
  const total = last30.reduce((s, d) => s + d.total, 0)
  const byAgent = useMemo(() => {
    const m = new Map<string, number>()
    for (const d of last30) m.set(d.agent, (m.get(d.agent) ?? 0) + d.total)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [last30])
  const busiest = byDay.reduce((a, b) => (b[1] > a[1] ? b : a), ['—', 0])

  return (
    <div className="panel-stack">
      <p className="lede">Read from the CLIs' own logs on this machine. Not a bill — your provider's dashboard is the source of truth.</p>
      {loading && <div className="muted small">Scanning logs…</div>}
      <div className="stat-grid">
        <div className="stat"><span>Last 30 days</span><b>{formatTokens(total)}</b></div>
        <div className="stat"><span>Busiest day</span><b>{busiest[0]}</b><em>{formatTokens(busiest[1])}</em></div>
        <div className="stat"><span>Top agent</span><b>{byAgent[0]?.[0] ?? '—'}</b><em>{formatTokens(byAgent[0]?.[1] ?? 0)}</em></div>
      </div>

      <h3>Tokens per day</h3>
      <div className="chart">
        {!byDay.length && <div className="muted small">No token logs found in ~/.claude/projects or ~/.codex/sessions.</div>}
        {byDay.map(([date, value]) => (
          <div key={date} className="bar-wrap" title={`${date}: ${value.toLocaleString()}`}>
            <div className="bar" style={{ height: `${(value / max) * 100}%` }} />
            <span className="bar-label">{date.slice(5)}</span>
          </div>
        ))}
      </div>

      <h3>By agent</h3>
      <div className="log-list">
        {byAgent.map(([agent, value]) => (
          <div key={agent} className="log-row"><span>{agent}</span><span className="spacer" /><code>{formatTokens(value)}</code></div>
        ))}
      </div>
      <button className="btn" onClick={async () => { setLoading(true); setDays(await window.api.usage.scan()); setLoading(false) }}>Scan again</button>
    </div>
  )
}

/* -------------------------------------------------------------- settings --- */

function Settings() {
  const settings = useApp((s) => s.settings)
  const patch = useApp((s) => s.patchSettings)
  const [models, setModels] = useState<string[]>([])
  const [doctor, setDoctor] = useState<string>('')
  const [agentName, setAgentName] = useState('')
  const [agentCommand, setAgentCommand] = useState('')
  const cfg = llmConfig(settings)
  const lm = settings.llmProvider === 'lmstudio'
  const refreshModels = async () => setModels(await window.api.llm.models(cfg.url, cfg.provider))
  useEffect(() => {
    void refreshModels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.llmProvider, cfg.url])

  return (
    <div className="panel-stack">
      <h3>General</h3>
      <label className="field"><span>Theme</span>
        <select value={settings.theme} onChange={(e) => patch({ theme: e.target.value as 'ink' | 'light' })}>
          <option value="ink">Ink</option><option value="light">Light</option>
        </select>
      </label>
      <label className="field"><span>Console text size</span>
        <input type="range" min={85} max={200} step={15} value={settings.fontSize} onChange={(e) => patch({ fontSize: +e.target.value })} />
        <em>{settings.fontSize}%</em>
      </label>
      <label className="field"><span>Reopen last repo on launch</span>
        <input type="checkbox" checked={settings.reopenLastRepo} onChange={(e) => patch({ reopenLastRepo: e.target.checked })} />
      </label>
      <label className="field"><span>Resume agent chats</span>
        <input type="checkbox" checked={settings.resumeChats} onChange={(e) => patch({ resumeChats: e.target.checked })} />
      </label>

      <h3>Agents</h3>
      <label className="field"><span>Default agent</span>
        <select value={settings.defaultAgent} onChange={(e) => patch({ defaultAgent: e.target.value })}>
          {allAgents().filter((a) => a.command).map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </label>
      <label className="field"><span>Yolo: skip permission prompts</span>
        <input type="checkbox" checked={settings.yolo} onChange={(e) => patch({ yolo: e.target.checked })} />
      </label>
      <p className="hint">With Yolo on, agents run commands, edit files and use the network without asking. Applies to consoles started afterwards; the studios never add it.</p>

      <h3>Custom agents</h3>
      <p className="hint">Any executable on your PATH can run in a console. The command is the binary; the optional Yolo flag is passed to skip permission prompts.</p>
      {settings.customAgents.map((c) => (
        <div className="loop-row" key={c.id}>
          <div>
            <strong>{c.name}</strong>
            <div className="hint">{c.command}{c.yoloFlag ? ` · ${c.yoloFlag}` : ''}</div>
          </div>
          <button className="link" onClick={() => patch({ customAgents: settings.customAgents.filter((x) => x.id !== c.id) })}>Remove</button>
        </div>
      ))}
      <div className="row">
        <input className="text-input" placeholder="Name" value={agentName} onChange={(e) => setAgentName(e.target.value)} />
        <input className="text-input" placeholder="command (e.g. aider)" value={agentCommand} onChange={(e) => setAgentCommand(e.target.value)} />
        <button
          className="btn small"
          onClick={() => {
            const name = agentName.trim()
            const command = agentCommand.trim()
            if (!name || !command) return
            patch({ customAgents: [...settings.customAgents, { id: `custom-${Date.now()}`, name, command }] })
            setAgentName('')
            setAgentCommand('')
          }}
        >
          Add agent
        </button>
      </div>

      <h3>Local models</h3>
      <label className="field"><span>Provider</span>
        <select value={settings.llmProvider} onChange={(e) => patch({ llmProvider: e.target.value as 'ollama' | 'lmstudio' })}>
          <option value="ollama">Ollama</option>
          <option value="lmstudio">LM Studio</option>
        </select>
      </label>
      <label className="field"><span>{lm ? 'LM Studio URL' : 'Ollama URL'}</span>
        <input
          className="text-input"
          value={lm ? settings.lmStudioUrl : settings.ollamaUrl}
          onChange={(e) => patch(lm ? { lmStudioUrl: e.target.value } : { ollamaUrl: e.target.value })}
        />
      </label>
      <label className="field"><span>Model</span>
        <select
          value={lm ? settings.lmStudioModel : settings.ollamaModel}
          onChange={(e) => patch(lm ? { lmStudioModel: e.target.value } : { ollamaModel: e.target.value })}
        >
          {(lm ? settings.lmStudioModel : settings.ollamaModel) &&
            !models.includes(lm ? settings.lmStudioModel : settings.ollamaModel) && (
              <option value={lm ? settings.lmStudioModel : settings.ollamaModel}>
                {lm ? settings.lmStudioModel : settings.ollamaModel}
              </option>
            )}
          {!models.length && <option value="">No models found</option>}
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </label>
      <p className="hint">
        {lm
          ? 'Start the local server in LM Studio (Developer → Local Server). Codex workers use its default port 1234.'
          : 'Ollama is the default. Pull a model and keep “ollama serve” running.'}
      </p>
      <div className="row">
        <button className="btn small" onClick={async () => {
          const r = await window.api.doctor()
          setDoctor(
            `Ollama: ${r.ollama.ok ? r.ollama.models.join(', ') : r.ollama.error} · STT: ${r.stt.ok ? 'ready' : r.stt.error} · git: ${r.git.ok ? 'ok' : 'missing'}`
          )
        }}>Run doctor</button>
        <button className="btn small" onClick={() => void refreshModels()}>Refresh models</button>
      </div>
      {doctor && <p className="hint">{doctor}</p>}

      <h3>Voice</h3>
      <p className="hint">Audio is recorded here, converted to WAV and sent only to your own STT server (whisper.cpp compatible). Nothing leaves this machine.</p>
      <label className="field"><span>Local STT server</span>
        <input className="text-input" value={settings.sttUrl} onChange={(e) => patch({ sttUrl: e.target.value })} />
      </label>
      <label className="field"><span>Hold Space to talk</span>
        <input type="checkbox" checked={settings.holdSpace} onChange={(e) => patch({ holdSpace: e.target.checked })} />
      </label>
      <label className="field"><span>Speak confirmations (system voices)</span>
        <input type="checkbox" checked={settings.ttsEnabled} onChange={(e) => patch({ ttsEnabled: e.target.checked })} />
      </label>
      <label className="field"><span>Language</span>
        <select value={settings.voiceLanguage} onChange={(e) => patch({ voiceLanguage: e.target.value })}>
          {[['de', 'Deutsch'], ['en', 'English'], ['es', 'Español'], ['fr', 'Français'], ['it', 'Italiano'], ['pt', 'Português']].map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </label>
      <p className="hint">Ctrl+Space dictates into the focused field without sending. Space sends an order.</p>
    </div>
  )
}

/* ---------------------------------------------------------------- memory --- */

function Memory() {
  const facts = useApp((s) => s.memory)
  const addFact = useApp((s) => s.addFact)
  const removeFact = useApp((s) => s.removeFact)
  const repo = activeRepo(useApp((s) => s))
  const settings = useApp((s) => s.settings)
  const toast = useApp((s) => s.toast)
  const [scope, setScope] = useState<'repo' | 'global'>('repo')
  const [kind, setKind] = useState<FactKind>('Architecture')
  const [text, setText] = useState('')
  const [scanning, setScanning] = useState(false)
  const [proposed, setProposed] = useState<Fact[]>([])
  const shown = facts.filter((f) => f.scope === (scope === 'global' ? 'global' : repo?.id))

  const scan = async () => {
    if (!repo) return
    setScanning(true)
    try {
      const listing = await window.api.fs.scanMarkdown(repo.path)
      const entries = await window.api.fs.readDir(repo.path)
      const cfg = llmConfig(settings)
      const res = await window.api.llm.chat({
        provider: cfg.provider,
        url: cfg.url,
        model: cfg.model,
        json: true,
        messages: [
          {
            role: 'system',
            content: 'You write a short repo briefing. Answer JSON: {"facts":[{"kind":"Architecture|Structure|Commands|Conventions|Gotchas|Context","text":"..."}]} with 6 to 12 facts. Be concrete and short.'
          },
          {
            role: 'user',
            content: `Repo: ${repo.path}\nTop level: ${entries.map((e) => `${e.name}${e.dir ? '/' : ''}`).join(', ')}\nDocs: ${listing.slice(0, 40).map((f) => f.name).join(', ')}`
          }
        ]
      })
      if (!res.ok) { toast(res.error ?? 'Scan failed', 'error'); return }
      const parsed = JSON.parse(res.text.match(/\{[\s\S]*\}/)?.[0] ?? '{"facts":[]}') as { facts?: Fact[] }
      setProposed((parsed.facts ?? []).map((f) => ({ ...f, id: Math.random().toString(36).slice(2), scope: scope === 'global' ? 'global' : repo.id })))
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Scan failed', 'error')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="panel-stack">
      <p className="lede">Facts you push into agents on purpose. Nothing is saved from a scan until you add it.</p>
      <div className="seg">
        <button className={scope === 'repo' ? 'on' : ''} onClick={() => setScope('repo')}>This repo</button>
        <button className={scope === 'global' ? 'on' : ''} onClick={() => setScope('global')}>All repos</button>
      </div>

      <div className="fact-add">
        <select value={kind} onChange={(e) => setKind(e.target.value as FactKind)}>
          {['Architecture', 'Structure', 'Commands', 'Conventions', 'Gotchas', 'Context'].map((k) => <option key={k}>{k}</option>)}
        </select>
        <input className="text-input" placeholder="A fact about this repo…" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn small" onClick={() => {
          if (!text.trim()) return
          addFact({ kind, text: text.trim(), scope: scope === 'global' ? 'global' : repo?.id ?? 'global' })
          setText('')
        }}>Add</button>
      </div>

      <div className="fact-list-2">
        {shown.map((f) => (
          <div key={f.id} className="fact-row">
            <span className="tag">{f.kind}</span>
            <span>{f.text}</span>
            <button className="link" onClick={() => removeFact(f.id)}>×</button>
          </div>
        ))}
        {!shown.length && <div className="muted small">No facts yet.</div>}
      </div>

      <div className="row">
        <button className="btn" disabled={scanning || !repo} onClick={() => void scan()}>{scanning ? 'Scanning repo…' : 'Scan repo'}</button>
        <button className="btn primary" onClick={() => pushMemory()}>Push to running consoles</button>
      </div>

      {proposed.length > 0 && (
        <div className="proposed">
          <h3>Proposed facts</h3>
          {proposed.map((p) => (
            <div key={p.id} className="fact-row">
              <span className="tag">{p.kind}</span>
              <span>{p.text}</span>
            </div>
          ))}
          <div className="row">
            <button className="btn primary" onClick={() => {
              proposed.forEach((p) => addFact({ kind: p.kind, text: p.text, scope: p.scope }))
              setProposed([])
              toast(`${proposed.length} facts added`, 'ok')
            }}>Add to memory</button>
            <button className="link" onClick={() => setProposed([])}>Discard</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------- loops --- */

function Loops() {
  const loops = useApp((s) => s.loops)
  const setLoops = useApp((s) => s.setLoops)
  const board = useApp((s) => s.board())
  const [name, setName] = useState('')
  const [instruction, setInstruction] = useState('')
  const [seconds, setSeconds] = useState(300)
  const [pattern, setPattern] = useState('')
  const [type, setType] = useState<Loop['trigger']['type']>('interval')
  const [target, setTarget] = useState('all')
  const groups = board?.groups ?? []

  const create = () => {
    if (!instruction.trim()) return
    const loop: Loop = {
      id: Math.random().toString(36).slice(2),
      name: name.trim() || `Loop ${loops.length + 1}`,
      instruction: instruction.trim(),
      target,
      trigger: { type, seconds, pattern },
      goal: { type: 'agent' },
      maxRuns: 200,
      runs: 0,
      enabled: true
    }
    setLoops([...loops, loop])
    setName(''); setInstruction(''); setPattern('')
  }

  return (
    <div className="panel-stack">
      <p className="lede">Recurring work that spends your plan. A loop types its instruction into the target consoles, at most 200 times.</p>
      {loops.map((l) => (
        <div key={l.id} className="loop-row">
          <div>
            <div className="row"><strong>{l.name}</strong><span className={`pill small ${l.enabled ? 'ready' : 'idle'}`}>{l.enabled ? 'on' : 'off'}</span></div>
            <div className="muted small">{l.trigger.type}{l.trigger.type === 'interval' ? ` every ${l.trigger.seconds}s` : l.trigger.type === 'contains' ? ` on “${l.trigger.pattern}”` : ' when idle'} · {l.runs}/{l.maxRuns} runs</div>
            <div className="muted small">→ {l.target === 'all' ? 'all consoles' : groups.find((g) => g.id === l.target)?.name ?? l.target}</div>
          </div>
          <div className="row">
            <button className="btn small" onClick={() => setLoops(loops.map((x) => x.id === l.id ? { ...x, enabled: !x.enabled } : x))}>{l.enabled ? 'Pause' : 'Start'}</button>
            <button className="link" onClick={() => setLoops(loops.filter((x) => x.id !== l.id))}>Delete</button>
          </div>
        </div>
      ))}

      <h3>New loop</h3>
      <label className="field"><span>Name</span><input className="text-input" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label className="field"><span>Instruction</span><textarea className="text-input" rows={3} value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Run the tests and fix what fails." /></label>
      <label className="field"><span>Trigger</span>
        <select value={type} onChange={(e) => setType(e.target.value as Loop['trigger']['type'])}>
          <option value="interval">On a schedule</option>
          <option value="idle">When agents go idle</option>
          <option value="contains">When output contains</option>
        </select>
      </label>
      {type === 'interval' && (
        <label className="field"><span>Every (seconds, min 60)</span><input className="text-input" type="number" min={60} value={seconds} onChange={(e) => setSeconds(+e.target.value)} /></label>
      )}
      {type === 'contains' && (
        <label className="field"><span>Text to watch for</span><input className="text-input" value={pattern} onChange={(e) => setPattern(e.target.value)} /></label>
      )}
      <label className="field"><span>Target</span>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="all">All consoles</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          {consolesOf(board).map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </label>
      <button className="btn primary" onClick={create}>Create loop</button>
    </div>
  )
}

/* -------------------------------------------------------------- profiles --- */

function Profiles() {
  const profiles = useApp((s) => s.profiles)
  const addProfile = useApp((s) => s.addProfile)
  const toast = useApp((s) => s.toast)
  const [agentId, setAgentId] = useState<'claude' | 'codex'>('claude')
  const [name, setName] = useState('')

  return (
    <div className="panel-stack">
      <p className="lede">A profile is another sign-in kept in its own folder: <code>CLAUDE_CONFIG_DIR</code> or <code>CODEX_HOME</code>. Consoles pick it at start.</p>
      {profiles.map((p) => (
        <div key={p.id} className="loop-row">
          <div>
            <strong>{p.name} <span className="tag">{p.agentId}</span></strong>
            <div className="muted tiny">{p.dir}</div>
          </div>
        </div>
      ))}
      {!profiles.length && <div className="muted small">No profiles yet.</div>}
      <h3>New profile</h3>
      <label className="field"><span>CLI</span>
        <select value={agentId} onChange={(e) => setAgentId(e.target.value as 'claude' | 'codex')}>
          <option value="claude">Claude Code</option><option value="codex">Codex</option>
        </select>
      </label>
      <label className="field"><span>Name</span><input className="text-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Work" /></label>
      <button className="btn primary" onClick={async () => {
        if (!name.trim()) return
        const res = await window.api.profiles.create(agentId, name.trim())
        addProfile({ id: res.id, name: name.trim(), agentId, dir: res.dir, initials: res.initials })
        toast('Profile created — choose it on a console', 'ok')
        setName('')
      }}>Create profile</button>
      <p className="hint">Profiles here are empty folders. Sign in by starting a console with the profile (the CLI's own login flow runs inside it).</p>
    </div>
  )
}

export { COLUMNS }
