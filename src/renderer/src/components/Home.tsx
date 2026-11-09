import { useEffect, useState } from 'react'
import { useApp, activeRepo } from '../store'
import { PRESETS } from '@shared/agents'
import { deployPreset } from '../actions'

export default function Home() {
  const repos = useApp((s) => s.repos)
  const activeId = useApp((s) => s.activeRepoId)
  const recent = useApp((s) => s.recent)
  const addRepo = useApp((s) => s.addRepo)
  const setRepo = useApp((s) => s.setRepo)
  const removeRepo = useApp((s) => s.removeRepo)
  const goHome = useApp((s) => s.goHome)
  const setComposerOpen = useApp((s) => s.setComposerOpen)
  const [preset, setPreset] = useState('')
  const [branches, setBranches] = useState<Record<string, string>>({})
  const [menu, setMenu] = useState<string | null>(null)
  const toast = useApp((s) => s.toast)

  useEffect(() => {
    void (async () => {
      const out: Record<string, string> = {}
      for (const r of repos) {
        try {
          const s = await window.api.git.status(r.path)
          if (s.repo) out[r.path] = s.branch
        } catch {
          /* not a repo */
        }
      }
      setBranches(out)
    })()
  }, [repos])

  const add = async () => {
    const path = await window.api.dialog.pickFolder()
    if (path) addRepo(path)
  }

  const startMainBrain = async () => {
    if (!activeRepo(useApp.getState())) {
      const path = await window.api.dialog.pickFolder()
      if (!path) return
      addRepo(path)
    }
    useApp.setState({ showHome: false, threadOpen: true })
    setTimeout(() => window.dispatchEvent(new CustomEvent('hive:brain')), 80)
  }

  const addAndCompose = async () => {
    const path = await window.api.dialog.pickFolder()
    if (!path) return
    addRepo(path)
    setTimeout(() => setComposerOpen(true), 160)
  }

  const dispatch = async () => {
    const repo = activeRepo(useApp.getState())
    if (!repo) {
      toast('Add a repo first', 'error')
      return
    }
    goHome()
    useApp.setState({ showHome: false })
    if (preset) setTimeout(() => deployPreset(preset), 60)
  }

  const ordered = [...repos].sort((a, b) => {
    const ra = recent.indexOf(a.id)
    const rb = recent.indexOf(b.id)
    return (ra < 0 ? 99 : ra) - (rb < 0 ? 99 : rb)
  })

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-badge"><i /> Main Brain · local models · one project</div>
        <h1>Talk to the brain.<br /><span>Run the whole crew.</span></h1>
        <p>
          The Main Brain is always on the board. Chat with it in your language, let it split work
          across agents, and talk to any agent directly when you want. Ollama and LM Studio stay local.
        </p>
        <div className="hero-actions">
          <button className="pill-btn brain-cta" onClick={() => void startMainBrain()}>
            ◉ Talk to Main Brain
          </button>
          <button
            className="btn"
            onClick={() => (activeRepo(useApp.getState()) ? setComposerOpen(true) : void addAndCompose())}
          >
            ＋ Launch a team
          </button>
        </div>
        <div className="compose">
          <span className="muted">or start from a preset</span>
          <select value={preset} onChange={(e) => setPreset(e.target.value)}>
            <option value="">Start from a preset…</option>
            {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.lanes.length} agents</option>)}
          </select>
          {ordered.length > 0 && (
            <button className="btn primary" onClick={dispatch}>Deploy preset</button>
          )}
        </div>
      </div>

      <div className="hero-preview" aria-hidden="true">
        <div className="hp-glow" />
        <div className="hp-card hp-a">
          <div className="hp-bar"><i /> <span>Otto</span> <em>WORKING</em></div>
          <div className="hp-scan" />
          <div className="hp-term">
            <div><b>›</b> refactor the checkout flow</div>
            <div className="hp-dim">reading 12 files · planning 3 edits</div>
            <div className="hp-line" /><div className="hp-line short" />
            <div><b>›</b> <span className="hp-caret" /></div>
          </div>
        </div>
        <div className="hp-card hp-b">
          <div className="hp-bar"><i className="ready" /> <span>Mira</span> <em className="ready">READY</em></div>
          <div className="hp-term">
            <div className="hp-dim">tests pass · 42 files checked</div>
            <div className="hp-line" /><div className="hp-line short" />
          </div>
        </div>
        <div className="hp-note">Ship the beta<br />on Friday.</div>
        <div className="hp-ring" />
      </div>

      <div className="home-section">
        <div className="row">
          <h2>Repos</h2>
          <span className="muted small">{repos.length} tracked</span>
          <span className="spacer" />
          <button className="link" onClick={add}>Add a repo</button>
        </div>
        {!repos.length && (
          <div className="empty-card" onClick={add}>
            <strong>Drop a project here</strong>
            <span>Click to choose a folder. Nothing is copied; the board points at it.</span>
          </div>
        )}
        <div className="repo-grid">
          {ordered.map((r) => (
            <div key={r.id} className={`repo-card ${r.id === activeId ? 'active' : ''}`}>
              <div className="repo-card-top">
                <span className="repo-badge">{r.name.slice(0, 2).toUpperCase()}</span>
                <div>
                  <div className="repo-card-name">{r.name}</div>
                  <div className="muted tiny">{r.path}</div>
                </div>
                <span className="spacer" />
                <button className="icon" onClick={() => setMenu(menu === r.id ? null : r.id)}>⋯</button>
                {menu === r.id && (
                  <div className="node-menu right" onMouseLeave={() => setMenu(null)}>
                    <button onClick={() => { removeRepo(r.id); setMenu(null) }}>Remove from GoT</button>
                    <button onClick={() => { void window.api.shell.openPath(r.path); setMenu(null) }}>Open folder</button>
                  </div>
                )}
              </div>
              <div className="row tiny muted">
                <span>{branches[r.path] ? `on ${branches[r.path]}` : 'no git repo'}</span>
                <span className="spacer" />
                <span>{r.workspaces.length} workspace{r.workspaces.length === 1 ? '' : 's'}</span>
              </div>
              <button className="btn" onClick={() => setRepo(r.id)}>Open board</button>
            </div>
          ))}
        </div>
      </div>

      <div className="home-section">
        <h2>How it works</h2>
        <div className="steps">
          <div><b>1.</b> Add a folder. Each workspace is a board saved as JSON.</div>
          <div><b>2.</b> Add a crew of real PTYs — all working in the same folder.</div>
          <div><b>3.</b> Chat with the Main Brain. It splits work and relays team updates.</div>
          <div><b>4.</b> Watch the Mission Map, push memory, and commit from the board.</div>
        </div>
      </div>
    </div>
  )
}
