import { useCallback, useEffect, useRef, useState } from 'react'
import { useApp, activeRepo, activeWorkspace, startPersistence, consolesOf } from './store'
import Board from './components/Board'
import CommandBar from './components/CommandBar'
import Home from './components/Home'
import PanelHost from './components/Panels'
import TeamComposer from './components/TeamComposer'
import Sidebar from './components/Sidebar'
import TeamRail from './components/TeamRail'
import { runCommand, pushMemory, spawnConsoles } from './actions'
import { audioToWavBase64 } from './util'
import { getHandle } from './runtime'
import { makeChecklist, makeConsole, makeKanban, makeNote, makeOrchestrator } from './factory'

let demoSeeded = false

export default function App() {
  const hydrated = useApp((s) => s.hydrated)
  const hydrate = useApp((s) => s.hydrate)
  const settings = useApp((s) => s.settings)
  const theme = settings.theme
  const showHome = useApp((s) => s.showHome)
  const repo = useApp((s) => s.repos.find((r) => r.id === s.activeRepoId) ?? null)
  const ws = useApp((s) => s.repos.find((r) => r.id === s.activeRepoId)?.workspaces.find((w) => w.id === s.repos.find((x) => x.id === s.activeRepoId)?.activeWorkspaceId) ?? null)
  const board = useApp((s) => s.board())
  const panel = useApp((s) => s.panel)
  const setPanel = useApp((s) => s.setPanel)
  const setWorkspace = useApp((s) => s.setWorkspace)
  const addWorkspace = useApp((s) => s.addWorkspace)
  const closeWorkspace = useApp((s) => s.closeWorkspace)
  const renameWorkspace = useApp((s) => s.renameWorkspace)
  const setTool = useApp((s) => s.setTool)
  const tool = useApp((s) => s.tool)
  const goHome = useApp((s) => s.goHome)
  const setThreadOpen = useApp((s) => s.setThreadOpen)
  const toasts = useApp((s) => s.toasts)
  const dismissToast = useApp((s) => s.dismissToast)
  const addRepo = useApp((s) => s.addRepo)
  const toast = useApp((s) => s.toast)
  const setComposerOpen = useApp((s) => s.setComposerOpen)
  const threadOpen = useApp((s) => s.threadOpen)
  const loops = useApp((s) => s.loops)
  const setLoops = useApp((s) => s.setLoops)

  const [recording, setRecording] = useState(false)
  const [recMode, setRecMode] = useState<'order' | 'dictation'>('order')
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const stream = useRef<MediaStream | null>(null)
  const recTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const voiceBusy = useRef(false)

  const demo = typeof location !== 'undefined' && new URLSearchParams(location.search).has('demo')

  useEffect(() => {
    if (demo) {
      if (demoSeeded) return
      demoSeeded = true
      void (async () => {
        const path = await window.api.cwd()
        const st = useApp.getState()
        st.addRepo(path)
        st.patchSettings({ defaultAgent: 'shell' })
        const repo = activeRepo(useApp.getState())
        const otto = makeConsole(120, 150, { title: 'Otto', agentId: 'shell', cwd: path })
        const mira = makeConsole(120, 440, { title: 'Mira', agentId: 'shell', cwd: path })
        const note = makeNote(570, 150, 'Ship the beta on Friday.\n\nThe board is local: every node lives in state.json.')
        const kanban = makeKanban(870, 150)
        kanban.columns[0].cards.push({ id: 'demo-1', title: 'Wire the planner', priority: 'high', done: false })
        kanban.columns[2].cards.push({ id: 'demo-2', title: 'Console sessions', priority: 'med', done: false })
        const checklist = makeChecklist(570, 360)
        const orch = makeOrchestrator(570, 575, 'Orchestrator')
        orch.wired = [otto.id, mira.id]
        st.addNodes([otto, mira, note, kanban, checklist, orch])
        st.updateBoard((b) => ({
          ...b,
          groups: [{ id: 'demo-group', name: 'Frontend squad', role: 'Frontend', tint: 'violet', memberIds: [otto.id, mira.id] }],
          wires: [
            { id: 'demo-wire', from: otto.id, to: orch.id, kind: 'orchestrator' },
            { id: 'demo-wire-2', from: mira.id, to: orch.id, kind: 'orchestrator' }
          ]
        }))
        useApp.setState({ hydrated: true, showHome: false })
        void repo
      })()
    } else if (!hydrated) void hydrate()
  }, [hydrated, hydrate, demo])

  useEffect(() => (demo ? () => undefined : startPersistence()), [demo])

  useEffect(() => {
    document.body.dataset.theme = theme
    void window.api.win?.setTitleBar({
      color: theme === 'light' ? '#f6f4ee' : '#080a0e',
      symbolColor: theme === 'light' ? '#1b202b' : '#f1f4f9',
      height: 58
    }).catch(() => undefined)
  }, [theme])

  /* ------------------------------------------------------------- voice ---- */

  const finishRecording = useCallback(async () => {
    const rec = recorder.current
    if (!rec || rec.state === 'inactive') return
    rec.stop()
  }, [])

  const startRecording = useCallback(async (mode: 'order' | 'dictation') => {
    if (voiceBusy.current || recording) return
    if (!settings.sttUrl) {
      toast('Set a local STT server in Settings → Voice', 'error')
      return
    }
    voiceBusy.current = true
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.current = media
      const rec = new MediaRecorder(media)
      recorder.current = rec
      chunks.current = []
      rec.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data) }
      rec.onstop = async () => {
        const blob = new Blob(chunks.current, { type: rec.mimeType || 'audio/webm' })
        media.getTracks().forEach((t) => t.stop())
        stream.current = null
        setRecording(false)
        if (recTimer.current) clearTimeout(recTimer.current)
        if (!blob.size) { voiceBusy.current = false; return }
        try {
          const buf = await blob.arrayBuffer()
          const ctx = new AudioContext()
          const audio = await ctx.decodeAudioData(buf)
          const b64 = audioToWavBase64(audio)
          await ctx.close()
          const res = await window.api.stt.transcribe(b64, settings.sttUrl)
          if (!res.text) {
            toast(res.error ? `Speech failed: ${res.error}` : 'No speech recognized', 'error')
            return
          }
          if (mode === 'dictation') {
            const el = document.activeElement as HTMLInputElement | HTMLTextAreaElement | null
            if (el && 'value' in el) el.value = `${el.value}${el.value ? ' ' : ''}${res.text}`
            else useApp.getState().setCommandDraft(`${useApp.getState().commandDraft} ${res.text}`.trim())
            toast('Dictated (not sent)', 'ok')
          } else {
            useApp.getState().setCommandDraft(res.text)
            void runCommand(res.text)
            if (settings.ttsEnabled && 'speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance('Order sent.')
              utter.lang = settings.voiceLanguage
              window.speechSynthesis.speak(utter)
            }
          }
        } catch (err) {
          toast(err instanceof Error ? err.message : 'Speech failed', 'error')
        } finally {
          voiceBusy.current = false
        }
      }
      rec.start()
      setRecMode(mode)
      setRecording(true)
      recTimer.current = setTimeout(() => void finishRecording(), 60000)
    } catch (err) {
      voiceBusy.current = false
      toast(err instanceof Error ? err.message : 'Microphone unavailable', 'error')
    }
  }, [recording, settings.sttUrl, settings.ttsEnabled, settings.voiceLanguage, toast, finishRecording])

  const stopRecording = useCallback(() => void finishRecording(), [finishRecording])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      const typing = !!el.closest('input,textarea,[contenteditable],select')
      if (e.code === 'Space' && settings.holdSpace && !typing && !recording) {
        e.preventDefault()
        e.stopImmediatePropagation()
        void startRecording('order')
        return
      }
      if (e.code === 'Space' && e.ctrlKey && !typing && !recording) {
        e.preventDefault()
        e.stopImmediatePropagation()
        void startRecording('dictation')
        return
      }
      if (typing) return
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if (e.shiftKey) useApp.getState().redo()
        else useApp.getState().undo()
        return
      }
      if (e.repeat) return
      const mod = e.metaKey || e.ctrlKey
      const key = e.key.toLowerCase()
      if (e.key === 'Escape') {
        setPanel(null)
        useApp.getState().setSelection([])
        useApp.getState().setComposerOpen(false)
      }
      if (mod && e.shiftKey && key === 'b') {
        e.preventDefault()
        setThreadOpen(true)
        window.dispatchEvent(new CustomEvent('hive:brain'))
        return
      }
      if (mod && e.shiftKey && key === 't') {
        e.preventDefault()
        setComposerOpen(true)
        return
      }
      if (e.code === 'Digit0' && mod) {
        e.preventDefault()
        useApp.getState().updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: 1 } }))
        return
      }
      if (e.code === 'Digit1' && e.shiftKey) {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('hive:fit'))
        return
      }
      if (mod) return
      if (key === 'v') {
        e.preventDefault()
        setTool('select')
      }
      else if (key === 't' && e.shiftKey) setThreadOpen(true)
      else if (key === 't') { e.preventDefault(); spawnConsoles(1) }
      else if (key === 'p') setTool('pen')
      else if (key === 'e') setTool('eraser')
      else if (key === 'g') setPanel('git')
      else if (key === 'm') setPanel('memory')
      else if (key === 's') setPanel('skills')
      else if (key === 'd') setPanel('markdown')
      else if (key === 'l') setPanel('loops')
      else if (key === 'x') setPanel('mission')
      else if (key === 'n') {
        const needs = consolesOf(useApp.getState().board()).find((c) => c.status === 'NEEDS YOU')
        if (needs) window.dispatchEvent(new CustomEvent('hive:frame', { detail: needs.id }))
        else toast('Nothing needs you', 'ok')
      } else if (key === 'delete' || key === 'backspace') {
        const sel = useApp.getState().selected
        if (sel.length) useApp.getState().removeNodes(sel)
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space' && recording) stopRecording()
    }
    window.addEventListener('keydown', down, true)
    window.addEventListener('keyup', up, true)
    return () => {
      window.removeEventListener('keydown', down, true)
      window.removeEventListener('keyup', up, true)
    }
  }, [settings.holdSpace, recording, recMode, startRecording, stopRecording, setPanel, setThreadOpen, setTool, toast])

  /* ------------------------------------------------------------- loops ---- */

  useEffect(() => {
    const tick = setInterval(() => {
      const st = useApp.getState()
      const b = st.board()
      if (!b) return
      const now = Date.now()
      let changed = false
      const next = st.loops.map((loop) => {
        if (!loop.enabled || loop.runs >= loop.maxRuns) return loop
        const targets = loop.target === 'all'
          ? consolesOf(b).map((c) => c.id)
          : b.groups.find((g) => g.id === loop.target)?.memberIds
            ?? (b.nodes.find((n) => n.id === loop.target) ? [loop.target] : [])
        if (!targets.length) return loop
        let due = false
        if (loop.trigger.type === 'interval') {
          const period = Math.max(60, loop.trigger.seconds ?? 300) * 1000
          due = !loop.lastRun || now - loop.lastRun >= period
        } else if (loop.trigger.type === 'idle') {
          const allIdle = targets.every((id) => {
            const n = b.nodes.find((x) => x.id === id)
            return n?.kind === 'console' && ['READY', 'IDLE'].includes(n.status)
          })
          due = allIdle && (!loop.lastRun || now - loop.lastRun > 60000)
        } else if (loop.trigger.type === 'contains' && loop.trigger.pattern) {
          due = targets.some((id) => (getHandle(id)?.tail() ?? '').includes(loop.trigger.pattern!))
        }
        if (!due) return loop
        for (const id of targets) {
          const h = getHandle(id)
          if (h) {
            h.write(loop.instruction)
            setTimeout(() => h.write('\r'), 220)
          }
        }
        toast(`Loop “${loop.name}” ran (${loop.runs + 1}/${loop.maxRuns})`, 'info')
        changed = true
        return { ...loop, runs: loop.runs + 1, lastRun: now }
      })
      if (changed) setLoops(next)
    }, 5000)
    return () => clearInterval(tick)
  }, [setLoops, toast, loops.length])

  /* ------------------------------------------------------------ render ---- */

  if (!hydrated) {
    return <div className="splash"><div className="logo-mark">G</div><span>Loading board…</span></div>
  }

  const needs = consolesOf(board).filter((c) => c.status === 'NEEDS YOU').length
  const running = consolesOf(board).filter((c) => ['READY', 'IDLE', 'WORKING'].includes(c.status)).length

  return (
    <div className={`app theme-${theme}`}>
      <header className="topbar">
        <button
          className={`brand ${!showHome && repo ? 'back' : ''}`}
          onClick={goHome}
          title={!showHome && repo ? 'Back to home' : 'Home'}
        >
          <span className="logo-mark small">G</span>
          <span className="brand-word">
            {!showHome && repo ? <><span className="back-arrow">←</span> Back to home</> : 'God Terminal'}
          </span>
        </button>

        {repo && (
          <div className="repo-chip" onClick={goHome} title="Repos">
            <span className="repo-name">{repo.name}</span>
            <span className="muted tiny">{repo.path.replace(/^.*[\\/]/, '')}</span>
          </div>
        )}

        {repo && !showHome && (
          <div className="ws-tabs">
            {repo.workspaces.map((w) => (
              <div key={w.id} className={`ws-tab ${ws?.id === w.id ? 'on' : ''}`}>
                <button
                  onClick={() => setWorkspace(w.id)}
                  onDoubleClick={() => {
                    const name = window.prompt('Workspace name', w.name)
                    if (name) renameWorkspace(w.id, name)
                  }}
                >
                  {w.name}
                </button>
                {repo.workspaces.length > 1 && (
                  <button
                    className="ws-close"
                    onClick={() => {
                      if (confirm(`Close workspace “${w.name}”? Its consoles end.`)) closeWorkspace(w.id)
                    }}
                  >×</button>
                )}
              </div>
            ))}
            <button className="ws-add" onClick={() => addWorkspace()}>+</button>
          </div>
        )}

        <span className="spacer" />

        {!showHome && (
          <div className="top-actions">
            {needs > 0 && (
              <button className="needs-chip" onClick={() => setPanel('mission')}>
                {needs} need{needs === 1 ? 's' : ''} you
              </button>
            )}
            <button className="live-pill" onClick={() => setPanel('mission')} title="Every running console">
              <i className={`live-dot ${running ? 'on' : ''}`} /> {running} live
            </button>
            <span className="top-sep" />
            <button className="top-icon" title="Mission Map" onClick={() => setPanel('mission')}>◎</button>
            <button className="top-icon" title="Git" onClick={() => setPanel('git')}>⑂</button>
            <button className="top-icon" title="Settings" onClick={() => setPanel('settings')}>⚙</button>
          </div>
        )}
      </header>

      <div className="main">
        {!showHome && <Sidebar />}
        <div className="stage">
          {showHome || !repo || !board ? (
            <Home />
          ) : (
            repo.workspaces.map((w) => (
              <div key={w.id} className={`ws-layer ${w.id === repo.activeWorkspaceId ? 'on' : ''}`}>
                <Board board={w.board} active={w.id === repo.activeWorkspaceId} />
              </div>
            ))
          )}
          {!showHome && board && (
            <CommandBar
              recording={recording}
              onVoiceStart={() => void startRecording('order')}
              onVoiceStop={() => stopRecording()}
            />
          )}
        </div>
        {!showHome && board && <TeamRail board={board} />}
        {!showHome && panel && <PanelHost panel={panel} />}
      </div>

      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.kind}`} onClick={() => dismissToast(t.id)}>{t.text}</div>
        ))}
      </div>

      {recording && (
        <div className="voice-hud">
          <span className="rec-dot" />
          <span>{recMode === 'dictation' ? 'Dictating — release to insert' : 'Listening — release to send'}</span>
          <span className="muted small">{settings.llmProvider === 'lmstudio' ? settings.lmStudioModel : settings.ollamaModel} · local STT</span>
        </div>
      )}

      <TeamComposer />
    </div>
  )

}
