import { useEffect, useRef, useState } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import type { ConsoleNode as ConsoleNodeType } from '@shared/types'
import { deriveStatus } from '@shared/status'
import { getAgent } from '@shared/agents'
import { useApp, findConsole } from '../store'
import { registerConsole, sendOrder, flushQueue, digest } from '../runtime'
import { makeConsole } from '../factory'
import { announceAgentUpdate } from '../actions'

const THEMES = {
  ink: {
    background: '#0c0e12',
    foreground: '#cbd5e1',
    cursor: '#7dd3fc',
    selectionBackground: '#33415580',
    black: '#0f172a',
    red: '#f87171',
    green: '#86efac',
    yellow: '#fcd34d',
    blue: '#7dd3fc',
    magenta: '#c084fc',
    cyan: '#67e8f9',
    white: '#e2e8f0',
    brightBlack: '#64748b'
  },
  light: {
    background: '#fbfaf7',
    foreground: '#1f2937',
    cursor: '#0f766e',
    selectionBackground: '#99f6e480',
    black: '#111827',
    red: '#b91c1c',
    green: '#15803d',
    yellow: '#a16207',
    blue: '#0369a1',
    magenta: '#7e22ce',
    cyan: '#0e7490',
    white: '#374151',
    brightBlack: '#6b7280'
  }
}

export default function ConsoleNode({ node }: { node: ConsoleNodeType }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const tailRef = useRef('')
  const lastData = useRef(0)
  const started = useRef(false)
  const [menu, setMenu] = useState(false)
  const [localStatus, setLocalStatus] = useState(node.status)
  const [detail, setDetail] = useState<string | undefined>()
  const [connState, setConnState] = useState('')

  const settings = useApp((s) => s.settings)
  const profiles = useApp((s) => s.profiles)
  const patchNode = useApp((s) => s.patchNode)
  const repo = useApp((s) => s.repos.find((r) => r.id === s.activeRepoId))
  const toast = useApp((s) => s.toast)
  const addMessage = useApp((s) => s.addMessage)
  const removeNodes = useApp((s) => s.removeNodes)
  const addConsole = useApp((s) => s.addNode)
  const activeRepoId = useApp((s) => s.activeRepoId)

  const agent = getAgent(node.agentId)
  const profile = profiles.find((p) => p.id === node.profileId)

  // Create / re-create the PTY whenever the launch key changes.
  useEffect(() => {
    if (!hostRef.current) return
    const term = new Terminal({
      fontFamily: "'Cascadia Mono', 'JetBrains Mono', Consolas, monospace",
      fontSize: 12.5 * (settings.fontSize / 100),
      lineHeight: 1.15,
      cursorBlink: true,
      scrollback: 10000,
      allowProposedApi: true,
      theme: THEMES[settings.theme] ?? THEMES.ink
    })
    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(hostRef.current)
    termRef.current = term
    fitRef.current = fit
    tailRef.current = ''
    started.current = false

    const sessionId = `${node.id}:${node.launchKey}`
    let disposed = false

    const doFit = () => {
      try {
        fit.fit()
        if (started.current) void window.api.pty.resize(sessionId, term.cols, term.rows)
      } catch {
        /* not laid out yet */
      }
    }
    setTimeout(doFit, 60)

    const ro = new ResizeObserver(() => doFit())
    ro.observe(hostRef.current)

    const offData = window.api.pty.onData((id, data) => {
      if (id !== sessionId || disposed) return
      term.write(data)
      tailRef.current = (tailRef.current + data).slice(-12000)
      lastData.current = Date.now()
    })
    const offExit = window.api.pty.onExit((id, code) => {
      if (id !== sessionId || disposed) return
      term.write(`\r\n\x1b[38;5;245m[process exited with code ${code}]\x1b[0m\r\n`)
      started.current = false
      setLocalStatus('DONE')
      patchNode(node.id, { status: 'DONE' })
    })

    const args = node.args
      ? [...node.args]
      : agent.id === 'ollama'
        ? ['run', settings.ollamaModel]
        : agent.id === 'codex-ollama'
          ? [
              'launch', 'codex', '-m', settings.ollamaModel,
              '--', '--sandbox', 'workspace-write', '-c', 'check_for_update_on_startup=false'
            ]
          : agent.id === 'codex-lmstudio'
            ? [
                '--oss', '--local-provider', 'lmstudio',
                ...(settings.lmStudioModel.trim() ? ['-m', settings.lmStudioModel.trim()] : []),
                '--sandbox', 'workspace-write', '-c', 'check_for_update_on_startup=false'
              ]
            : [...(agent.args ?? [])]
    if (node.yolo && agent.yoloFlag) args.push(...agent.yoloFlag.split(' '))
    const env: Record<string, string> = {}
    if (profile) {
      if (profile.agentId === 'claude') env.CLAUDE_CONFIG_DIR = profile.dir
      if (profile.agentId === 'codex') env.CODEX_HOME = profile.dir
    }

    setConnState('starting')
    window.api.pty
      .create({ id: sessionId, cwd: node.cwd || repo?.path || '', command: agent.command, args, env })
      .then(({ shell }) => {
        if (disposed) {
          void window.api.pty.kill(sessionId)
          return
        }
        started.current = true
        setConnState('')
        doFit()
        term.focus()
        if (settings.resumeChats) {
          term.write(`\x1b[38;5;245mSession restored — previous scrollback is gone.\x1b[0m\r\n`)
        }
        console.info('console started', shell)
      })
      .catch((err: Error) => {
        setConnState(`failed: ${err.message}`)
        term.write(`\r\n\x1b[31mCould not start ${agent.command}: ${err.message}\x1b[0m\r\n`)
      })

    const inputSub = term.onData((data) => {
      if (started.current) void window.api.pty.write(sessionId, data)
    })

    // Ctrl+V is ours: xterm does not read the clipboard on its own.
    term.attachCustomKeyEventHandler((ev) => {
      if (ev.type === 'keydown' && ev.ctrlKey && ev.key.toLowerCase() === 'v') {
        void navigator.clipboard.readText().then((text) => {
          if (!text) return
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
          if (lines.length > 1) {
            const asCommands = window.confirm(
              `Paste ${lines.length} lines as commands?\n\nOK = paste with line breaks\nCancel = paste as one line`
            )
            const value = asCommands ? text : lines.join(' ')
            void window.api.pty.write(sessionId, value)
          } else {
            void window.api.pty.write(sessionId, text)
          }
        })
        return false
      }
      return true
    })

    const unregister = registerConsole({
      nodeId: node.id,
      write: (data) => {
        if (started.current) void window.api.pty.write(sessionId, data)
      },
      status: () => findConsole(useApp.getState(), node.id)?.status ?? 'IDLE',
      tail: () => tailRef.current,
      restart: () => patchNode(node.id, { launchKey: node.launchKey + 1, status: 'STARTING' })
    })

    const tick = setInterval(() => {
      if (disposed) return
      if (!started.current) {
        if (localStatus !== 'DONE' && localStatus !== 'PAUSED') setLocalStatus('STARTING')
        return
      }
      const next = deriveStatus({
        tail: tailRef.current,
        sinceData: Date.now() - (lastData.current || Date.now()),
        started: started.current,
        paused: node.paused
      })
      const prev = findConsole(useApp.getState(), node.id)?.status
      if (next.status !== prev) {
        patchNode(node.id, { status: next.status, statusDetail: next.detail })
        setLocalStatus(next.status)
        setDetail(next.detail)
        if (next.status === 'READY') flushQueue(node.id)
        if ((next.status === 'READY' || next.status === 'DONE') && prev === 'WORKING' && activeRepoId) {
          const d = digest(node.id, 700)
          if (d) {
            addMessage(activeRepoId, {
              role: 'agent',
              text: d,
              agent: node.title,
              consoleId: node.id
            })
            announceAgentUpdate(node.id, d)
          }
        }
      }
    }, 800)

    return () => {
      disposed = true
      clearInterval(tick)
      ro.disconnect()
      offData()
      offExit()
      inputSub.dispose()
      unregister()
      void window.api.pty.kill(sessionId)
      term.dispose()
      termRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.id, node.launchKey, activeRepoId])

  useEffect(() => {
    const t = termRef.current
    if (!t) return
    t.options.fontSize = 12.5 * (settings.fontSize / 100)
    t.options.theme = THEMES[settings.theme] ?? THEMES.ink
    try {
      fitRef.current?.fit()
    } catch {
      /* ignore */
    }
  }, [settings.fontSize, settings.theme])

  const statusClass =
    localStatus === 'NEEDS YOU' ? 'needs'
      : localStatus === 'WORKING' || localStatus === 'RUNNING' ? 'working'
        : localStatus === 'ERROR' ? 'error'
          : localStatus === 'READY' ? 'ready'
            : localStatus === 'DONE' ? 'done'
              : localStatus === 'PAUSED' ? 'paused' : 'idle'

  const restart = () => {
    setLocalStatus('STARTING')
    patchNode(node.id, { launchKey: node.launchKey + 1, status: 'STARTING', paused: false })
    setMenu(false)
  }

  const handoff = () => {
    const summary = digest(node.id, 1200)
    const created = makeConsole(node.x + 60, node.y + node.h + 40, {
      title: `${node.title} handoff`,
      agentId: node.agentId,
      cwd: node.cwd,
      launchKey: 0
    })
    addConsole(created)
    if (summary) {
      setTimeout(() => sendOrder(created.id, `Context from ${node.title}:\n${summary}\n\nContinue from here.`), 2000)
    }
    toast('Handoff console created', 'ok')
    setMenu(false)
  }

  const forward = () => {
    const text = window.prompt('Forward the last result to which console? Type its name.')
    if (!text) return
    const board = useApp.getState().board()
    const target = board?.nodes.find((n) => n.kind === 'console' && n.title.toLowerCase() === text.toLowerCase())
    if (!target) return toast('No matching console', 'error')
    const d = digest(node.id, 1500)
    if (d) sendOrder(target.id, `Forwarded result from ${node.title}:\n${d}`)
    setMenu(false)
  }

  return (
    <div className={`console-body ${node.paused ? 'is-paused' : ''}`}>
      <div className="console-bar">
        <span className="agent-dot" style={{ background: agent.color }} />
        <span
          className="console-title"
          onDoubleClick={() => {
            const name = window.prompt('Console name', node.title)
            if (name) patchNode(node.id, { title: name.slice(0, 24) })
          }}
        >
          {node.title}
        </span>
        <span className="console-agent">{agent.name}</span>
        {profile && <span className="badge">{profile.initials}</span>}
        {node.yolo && <span className="badge yolo">YOLO</span>}
        <span className={`pill ${statusClass}`} title={detail ?? localStatus}>
          {localStatus}
        </span>
        <span className="spacer" />
        <button className="icon" title="Restart" onClick={restart}>⟳</button>
        <button className="icon" title="More" onClick={() => setMenu((v) => !v)}>⋯</button>
        {menu && (
          <div className="node-menu" onMouseLeave={() => setMenu(false)}>
            <button onClick={restart}>Restart session</button>
            {profiles.filter((p) => p.agentId === agent.id).length > 0 && (
              <div className="menu-label">Account</div>
            )}
            {profiles
              .filter((p) => p.agentId === agent.id)
              .map((p) => (
                <button
                  key={p.id}
                  className={node.profileId === p.id ? 'on' : ''}
                  onClick={() => {
                    patchNode(node.id, {
                      profileId: p.id,
                      launchKey: node.launchKey + 1,
                      status: 'STARTING'
                    })
                    setLocalStatus('STARTING')
                    setMenu(false)
                  }}
                >
                  {node.profileId === p.id ? '✓ ' : ''}{p.name}
                </button>
              ))}
            <div className="menu-label">Size</div>
            <button onClick={() => { patchNode(node.id, { w: 360, h: 240 }); setMenu(false) }}>Compact</button>
            <button onClick={() => { patchNode(node.id, { w: 560, h: 260 }); setMenu(false) }}>Wide</button>
            <button onClick={() => { patchNode(node.id, { w: 400, h: 430 }); setMenu(false) }}>Tall</button>
            <button
              onClick={() => {
                void window.api.pty.kill(`${node.id}:${node.launchKey}`)
                patchNode(node.id, { paused: true, status: 'PAUSED' })
                setLocalStatus('PAUSED')
                setMenu(false)
              }}
            >
              Pause session
            </button>
            <button onClick={handoff}>Handoff to new console</button>
            <button onClick={forward}>Forward last result…</button>
            <button
              onClick={() => {
                if (window.confirm(`Kill ${node.title}? The console stays on the board, marked done.`)) {
                  void window.api.pty.kill(`${node.id}:${node.launchKey}`)
                  setLocalStatus('DONE')
                  patchNode(node.id, { status: 'DONE', paused: true })
                }
                setMenu(false)
              }}
            >
              Kill session
            </button>
            <button onClick={() => { removeNodes([node.id]); setMenu(false) }}>Remove from board</button>
          </div>
        )}
      </div>
      {node.paused ? (
        <div className="paused-cover">
          <span>Paused</span>
          <button className="btn small" onClick={() => { setLocalStatus('STARTING'); patchNode(node.id, { paused: false, launchKey: node.launchKey + 1, status: 'STARTING' }) }}>Resume</button>
        </div>
      ) : (
        <div className="term-host" ref={hostRef} onMouseDown={(e) => e.stopPropagation()} />
      )}
      {connState === 'starting' && <div className="term-hint">starting {agent.command || 'shell'}…</div>}
      {connState.startsWith('failed') && <div className="term-hint error">{connState}</div>}
    </div>
  )
}
