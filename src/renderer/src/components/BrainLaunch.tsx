import { useEffect, useState } from 'react'
import { useApp, activeRepo } from '../store'
import { startBrain, type BrainWorkerKind } from '../actions'

const WORKS = 8

const KINDS: { id: BrainWorkerKind; label: string; hint: string }[] = [
  { id: 'codex', label: 'Codex via Ollama', hint: 'Agent terminals through ollama launch codex' },
  { id: 'ollama', label: 'Ollama chats', hint: 'Independent local chat terminals' },
  { id: 'shell', label: 'Shell', hint: 'Start any CLI yourself' }
]

export default function BrainLaunch() {
  const open = useApp((s) => s.brainOpen)
  const setOpen = useApp((s) => s.setBrainOpen)
  const settings = useApp((s) => s.settings)
  const repo = useApp((s) => activeRepo(s))
  const addRepo = useApp((s) => s.addRepo)
  const toast = useApp((s) => s.toast)

  const [models, setModels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(settings.ollamaModel)
  const [workers, setWorkers] = useState(3)
  const [kind, setKind] = useState<BrainWorkerKind>('codex')

  const refresh = async () => {
    setLoading(true)
    try {
      const list = await window.api.llm.models(settings.ollamaUrl)
      setModels(list)
      if (list.length) {
        setModel(list.includes(settings.ollamaModel) ? settings.ollamaModel : list[0])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, settings.ollamaUrl])

  const chooseRepo = async () => {
    const path = await window.api.dialog.pickFolder()
    if (!path) return
    addRepo(path)
    toast('Project added', 'ok')
  }

  const launch = () => {
    if (!repo) {
      toast('Choose a project folder first', 'error')
      return
    }
    if (!models.length) {
      toast('Ollama is offline — start it with "ollama serve"', 'error')
      return
    }
    startBrain({ model, workers, workerKind: kind })
    useApp.setState({ showHome: false })
    setOpen(false)
  }

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
  }, [open, repo, models, model, workers, kind])

  if (!open) return null

  const online = models.length > 0
  const hint = KINDS.find((k) => k.id === kind)?.hint ?? ''

  return (
    <div className="composer-overlay" onPointerDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <section className="team-composer brain-launch" data-testid="brain-composer" role="dialog" aria-label="Start an Ollama brain">
        <header className="tc-head">
          <div>
            <div className="kicker">Local brain · one click</div>
            <h2>Start your brain</h2>
            <p>Bring one Ollama terminal online, then launch a crew of workers beside it. Every console is a real PTY — and the command bar can split one order across them.</p>
          </div>
          <button className="tc-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </header>

        <div className={`brain-health ${online ? 'ok' : 'down'}`}>
          <span className="brain-pulse" />
          <div className="brain-health-text">
            <b>{loading ? 'Checking Ollama…' : online ? 'Ollama is online' : 'Ollama is offline'}</b>
            <span>
              {online
                ? `${models.length} local model${models.length === 1 ? '' : 's'} · ${settings.ollamaUrl.replace(/^https?:\/\//, '')}`
                : 'Start it with “ollama serve” and pull a model, then check again.'}
            </span>
          </div>
          <span className="spacer" />
          <button className="btn small" onClick={() => void refresh()} disabled={loading}>Check again</button>
        </div>

        <div className="brain-grid">
          <article className="brain-card brain-core">
            <div className="brain-orb"><span>B</span></div>
            <div className="brain-core-body">
              <div className="brain-kicker">Brain terminal</div>
              <h3>One local mind.</h3>
              <p>Runs <code>ollama run</code> in its own console. GoT also uses this model to plan your orders.</p>
              <label className="brain-field">
                <span>Model</span>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                  {!models.includes(model) && <option value={model}>{model}</option>}
                  {models.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
              <div className="brain-cmd"><b>›</b> ollama run {model}</div>
            </div>
          </article>

          <article className="brain-card">
            <div className="brain-worker-head">
              <div>
                <div className="brain-kicker">Worker terminals</div>
                <h3>{workers} parallel {workers === 1 ? 'worker' : 'workers'}</h3>
              </div>
              <div className="brain-stepper" aria-label="Worker count">
                <button onClick={() => setWorkers((n) => Math.max(0, n - 1))} disabled={workers === 0} aria-label="One worker less">−</button>
                <b>{workers}</b>
                <button onClick={() => setWorkers((n) => Math.min(WORKS, n + 1))} disabled={workers === WORKS} aria-label="One worker more">＋</button>
              </div>
            </div>

            <div className="brain-kinds">
              {KINDS.map((k) => (
                <button key={k.id} className={kind === k.id ? 'on' : ''} onClick={() => setKind(k.id)}>
                  <b>{k.label}</b>
                  <span>{k.hint}</span>
                </button>
              ))}
            </div>

            <div className="brain-worker-preview">
              {workers === 0
                ? <span className="muted small">Brain only — add workers later with ＋ Team.</span>
                : Array.from({ length: workers }, (_, i) => (
                  <span className="brain-worker-chip" key={i} style={{ animationDelay: `${i * 40}ms` }}>
                    <i /> W{i + 1}
                  </span>
                ))}
            </div>
            <p className="brain-hint">
              {kind === 'codex'
                ? 'Workers use Ollama’s official Codex profile, so the same local model powers every agent.'
                : hint}
            </p>
          </article>
        </div>

        <footer className="tc-foot">
          <div className="tc-summary">
            <span className="brain-summary">Brain + {workers} worker{workers === 1 ? '' : 's'}</span>
            <span className="tc-mix">{repo ? repo.name : 'Choose a project to start'}</span>
          </div>
          <div className="tc-actions">
            {!repo && <button className="btn" onClick={() => void chooseRepo()}>Choose project</button>}
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button
              className="btn primary launch"
              data-testid="launch-brain"
              onClick={launch}
              disabled={!repo || loading || !online}
            >
              Start brain <kbd>Ctrl ↵</kbd>
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}
