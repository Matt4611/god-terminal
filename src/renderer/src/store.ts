import { create } from 'zustand'
import { nanoid } from 'nanoid'
import type {
  AnyNode, Board, ConsoleNode, Fact, Loop, PersistedState, Profile, Repo,
  Settings, ThreadMessage, Workspace
} from '@shared/types'
import { emptyBoard } from '@shared/types'
import { registerCustomAgents } from '@shared/agents'
import { baseName, uid } from './util'

export type PanelName =
  | 'presets' | 'mission' | 'git' | 'usage' | 'settings' | 'skills' | 'markdown'
  | 'code' | 'documents' | 'diagrams' | 'memory' | 'loops' | 'profiles' | 'about'

export type Tool = 'select' | 'hand' | 'note' | 'text' | 'shape' | 'pen' | 'eraser' | 'web' | 'image' | 'console'

export interface Toast {
  id: string
  text: string
  kind: 'info' | 'error' | 'ok'
}

const defaultSettings = (): Settings => ({
  theme: 'ink',
  llmProvider: 'ollama',
  defaultAgent: 'claude',
  yolo: false,
  fontSize: 100,
  ollamaUrl: 'http://127.0.0.1:11434',
  ollamaModel: 'gpt-oss:20b',
  lmStudioUrl: 'http://127.0.0.1:1234/v1',
  lmStudioModel: '',
  sttUrl: 'http://127.0.0.1:8080',
  ttsEnabled: false,
  voiceLanguage: 'de',
  holdSpace: true,
  resumeChats: true,
  reopenLastRepo: true,
  chimeOnReset: true,
  customAgents: []
})

interface AppState {
  hydrated: boolean
  repos: Repo[]
  activeRepoId: string | null
  settings: Settings
  threads: Record<string, ThreadMessage[]>
  loops: Loop[]
  memory: Fact[]
  profiles: Profile[]
  savedPresets: { id: string; name: string; nodes: AnyNode[] }[]
  recent: string[]

  panel: PanelName | null
  missionOpen: boolean
  threadOpen: boolean
  selected: string[]
  tool: Tool
  showHome: boolean
  toasts: Toast[]
  commandDraft: string
  dictation: boolean
  composerOpen: boolean
  brainOpen: boolean
  brainBusy: boolean

  hydrate: () => Promise<void>
  addRepo: (path: string) => void
  removeRepo: (id: string) => void
  setRepo: (id: string) => void
  goHome: () => void
  addWorkspace: (name?: string) => void
  setWorkspace: (id: string) => void
  renameWorkspace: (id: string, name: string) => void
  closeWorkspace: (id: string) => void

  board: () => Board | null
  updateBoard: (fn: (b: Board) => Board) => void
  addNode: (node: AnyNode) => void
  addNodes: (nodes: AnyNode[]) => void
  patchNode: (id: string, patch: Partial<AnyNode> & Record<string, unknown>) => void
  removeNodes: (ids: string[]) => void
  bringToFront: (id: string) => void
  setSelection: (ids: string[]) => void
  toggleSelect: (id: string) => void
  viewport: (v: { x: number; y: number; zoom: number }) => void
  undo: () => void
  redo: () => void

  setPanel: (p: PanelName | null) => void
  setTool: (t: Tool) => void
  setThreadOpen: (v: boolean) => void
  setCommandDraft: (v: string) => void
  setDictation: (v: boolean) => void
  setComposerOpen: (v: boolean) => void
  setBrainOpen: (v: boolean) => void
  setBrainBusy: (v: boolean) => void
  toast: (text: string, kind?: Toast['kind']) => void
  dismissToast: (id: string) => void
  patchSettings: (p: Partial<Settings>) => void

  addMessage: (repoId: string, msg: Omit<ThreadMessage, 'id' | 'at'>) => void
  clearThread: (repoId: string) => void
  setLoops: (loops: Loop[]) => void
  addFact: (fact: Omit<Fact, 'id'>) => void
  removeFact: (id: string) => void
  addProfile: (p: Profile) => void
  saveLayout: (nodes: AnyNode[]) => void
  deleteSavedPreset: (id: string) => void
}

const makeWorkspace = (name = 'Main'): Workspace => ({
  id: uid(),
  name,
  board: emptyBoard()
})

const makeRepo = (path: string): Repo => {
  const ws = makeWorkspace()
  return {
    id: uid(),
    path,
    name: baseName(path).slice(0, 24),
    workspaces: [ws],
    activeWorkspaceId: ws.id
  }
}

export const useApp = create<AppState>((set, get) => ({
  hydrated: false,
  repos: [],
  activeRepoId: null,
  settings: defaultSettings(),
  threads: {},
  loops: [],
  memory: [],
  profiles: [],
  savedPresets: [],
  recent: [],
  panel: null,
  missionOpen: false,
  threadOpen: false,
  selected: [],
  tool: 'select',
  showHome: true,
  toasts: [],
  commandDraft: '',
  dictation: false,
  composerOpen: false,
  brainOpen: false,
  brainBusy: false,

  hydrate: async () => {
    let saved: PersistedState | null = null
    try {
      saved = await window.api.store.load()
    } catch {
      saved = null
    }
    // v1 was the pre-release schema written by the smoke demo; it is not loaded.
    if (!saved || saved.version < 2) {
      set({ hydrated: true, showHome: true })
      return
    }
    const repos = saved.repos ?? []
    const lastId = saved.activeRepoId
    const settings = { ...defaultSettings(), ...(saved.settings ?? {}) }
    registerCustomAgents(settings.customAgents ?? [])
    set({
      hydrated: true,
      repos,
      activeRepoId: lastId,
      settings,
      threads: saved.threads ?? {},
      loops: saved.loops ?? [],
      memory: saved.memory ?? [],
      profiles: saved.profiles ?? [],
      savedPresets: saved.savedPresets ?? [],
      recent: saved.recent ?? [],
      showHome: !(settings.reopenLastRepo && lastId && repos.some((r) => r.id === lastId))
    })
  },

  addRepo: (path) => {
    const existing = get().repos.find((r) => r.path === path)
    if (existing) {
      set({ activeRepoId: existing.id, showHome: false, recent: [existing.id, ...get().recent.filter((x) => x !== existing.id)].slice(0, 8) })
      return
    }
    const repo = makeRepo(path)
    set((s) => ({
      repos: [...s.repos, repo],
      activeRepoId: repo.id,
      showHome: false,
      recent: [repo.id, ...s.recent].slice(0, 8)
    }))
  },

  removeRepo: (id) =>
    set((s) => {
      const repos = s.repos.filter((r) => r.id !== id)
      const activeRepoId = s.activeRepoId === id ? repos[0]?.id ?? null : s.activeRepoId
      return { repos, activeRepoId, showHome: !activeRepoId }
    }),

  setRepo: (id) =>
    set((s) => ({
      activeRepoId: id,
      showHome: false,
      recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 8),
      selected: []
    })),

  goHome: () => set({ showHome: true, selected: [] }),

  addWorkspace: (name) =>
    set((s) => {
      const repoId = s.activeRepoId
      if (!repoId) return s
      const ws = makeWorkspace(name || `Workspace ${(s.repos.find((r) => r.id === repoId)?.workspaces.length ?? 0) + 1}`)
      return {
        repos: s.repos.map((r) =>
          r.id === repoId ? { ...r, workspaces: [...r.workspaces, ws], activeWorkspaceId: ws.id } : r
        )
      }
    }),

  setWorkspace: (id) =>
    set((s) => ({
      repos: s.repos.map((r) => (r.id === s.activeRepoId ? { ...r, activeWorkspaceId: id } : r)),
      selected: []
    })),

  renameWorkspace: (id, name) =>
    set((s) => ({
      repos: s.repos.map((r) =>
        r.id === s.activeRepoId
          ? { ...r, workspaces: r.workspaces.map((w) => (w.id === id ? { ...w, name: name.slice(0, 24) } : w)) }
          : r
      )
    })),

  closeWorkspace: (id) =>
    set((s) => {
      const repo = s.repos.find((r) => r.id === s.activeRepoId)
      if (!repo || repo.workspaces.length <= 1) return s
      const workspaces = repo.workspaces.filter((w) => w.id !== id)
      const activeWorkspaceId = repo.activeWorkspaceId === id ? workspaces[0].id : repo.activeWorkspaceId
      return {
        repos: s.repos.map((r) => (r.id === repo.id ? { ...r, workspaces, activeWorkspaceId } : r))
      }
    }),

  board: () => {
    const s = get()
    const repo = s.repos.find((r) => r.id === s.activeRepoId)
    return repo?.workspaces.find((w) => w.id === repo.activeWorkspaceId)?.board ?? null
  },

  updateBoard: (fn) =>
    set((s) => {
      const repo = s.repos.find((r) => r.id === s.activeRepoId)
      const ws = repo?.workspaces.find((w) => w.id === repo.activeWorkspaceId)
      if (!ws) return {}
      const next = fn(ws.board)
      const structural =
        next.nodes !== ws.board.nodes || next.groups !== ws.board.groups || next.wires !== ws.board.wires
      if (next !== ws.board && structural) recordHistory(ws.id, ws.board)
      return {
        repos: s.repos.map((r) =>
          r.id !== s.activeRepoId
            ? r
            : {
                ...r,
                workspaces: r.workspaces.map((w) =>
                  w.id === r.activeWorkspaceId ? { ...w, board: next } : w
                )
              }
        )
      }
    }),

  addNode: (node) => get().addNodes([node]),

  addNodes: (nodes) =>
    get().updateBoard((b) => {
      const top = b.nodes.reduce((m, n) => Math.max(m, n.z), 0)
      return { ...b, nodes: [...b.nodes, ...nodes.map((n, i) => ({ ...n, z: top + i + 1 }))] }
    }),

  // Patch by id across every workspace: a console keeps reporting while its
  // workspace is in the background.
  patchNode: (id, patch) =>
    set((s) => ({
      repos: s.repos.map((r) => ({
        ...r,
        workspaces: r.workspaces.map((w) =>
          w.board.nodes.some((n) => n.id === id)
            ? {
                ...w,
                board: {
                  ...w.board,
                  nodes: w.board.nodes.map((n) => (n.id === id ? ({ ...n, ...patch } as AnyNode) : n))
                }
              }
            : w
        )
      }))
    })),

  removeNodes: (ids) =>
    get().updateBoard((b) => ({
      ...b,
      nodes: b.nodes.filter((n) => !ids.includes(n.id)),
      wires: b.wires.filter((w) => !ids.includes(w.from) && !ids.includes(w.to)),
      groups: b.groups
        .map((g) => ({ ...g, memberIds: g.memberIds.filter((m) => !ids.includes(m)) }))
        .filter((g) => g.memberIds.length > 0)
    })),

  bringToFront: (id) =>
    get().updateBoard((b) => {
      const top = b.nodes.reduce((m, n) => Math.max(m, n.z), 0)
      return { ...b, nodes: b.nodes.map((n) => (n.id === id ? { ...n, z: top + 1 } : n)) }
    }),

  setSelection: (ids) => set({ selected: ids }),
  toggleSelect: (id) =>
    set((s) => ({
      selected: s.selected.includes(id) ? s.selected.filter((x) => x !== id) : [...s.selected, id]
    })),
  viewport: (v) =>
    get().updateBoard((b) => ({ ...b, viewport: v })),

  undo: () => stepHistory(-1),
  redo: () => stepHistory(1),

  setPanel: (p) => set({ panel: p, missionOpen: p === 'mission' }),
  setTool: (t) => set({ tool: t }),
  setThreadOpen: (v) => set({ threadOpen: v }),
  setCommandDraft: (v) => set({ commandDraft: v }),
  setDictation: (v) => set({ dictation: v }),
  setComposerOpen: (v) => set({ composerOpen: v, ...(v ? { brainOpen: false } : {}) }),
  setBrainOpen: (v) => set({ brainOpen: v, ...(v ? { composerOpen: false } : {}) }),
  setBrainBusy: (v) => set({ brainBusy: v }),

  toast: (text, kind = 'info') => {
    const id = nanoid(6)
    set((s) => ({ toasts: [...s.toasts.slice(-3), { id, text, kind }] }))
    setTimeout(() => get().dismissToast(id), 4200)
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  patchSettings: (p) =>
    set((s) => {
      const settings = { ...s.settings, ...p }
      if (p.customAgents) registerCustomAgents(p.customAgents)
      return { settings }
    }),

  addMessage: (repoId, msg) =>
    set((s) => ({
      threads: {
        ...s.threads,
        [repoId]: [
          ...(s.threads[repoId] ?? []),
          { ...msg, id: nanoid(8), at: Date.now() }
        ].slice(-500)
      }
    })),
  clearThread: (repoId) => set((s) => ({ threads: { ...s.threads, [repoId]: [] } })),
  setLoops: (loops) => set({ loops }),
  addFact: (fact) => set((s) => ({ memory: [...s.memory, { ...fact, id: nanoid(8) }] })),
  removeFact: (id) => set((s) => ({ memory: s.memory.filter((f) => f.id !== id) })),
  addProfile: (p) => set((s) => ({ profiles: [...s.profiles, p] })),
  saveLayout: (nodes) =>
    set((s) => ({
      savedPresets: [
        ...s.savedPresets,
        { id: nanoid(8), name: `Set ${s.savedPresets.length + 1}`, nodes }
      ]
    })),
  deleteSavedPreset: (id) => set((s) => ({ savedPresets: s.savedPresets.filter((p) => p.id !== id) }))
}))

/* --------------------------------------------------------- derived helpers -- */

export const activeRepo = (s: AppState): Repo | null =>
  s.repos.find((r) => r.id === s.activeRepoId) ?? null

export const activeWorkspace = (s: AppState): Workspace | null => {
  const r = activeRepo(s)
  return r?.workspaces.find((w) => w.id === r.activeWorkspaceId) ?? null
}

export const consolesOf = (b: Board | null): ConsoleNode[] =>
  (b?.nodes.filter((n) => n.kind === 'console') as ConsoleNode[]) ?? []

/** Find a console in any workspace of any repo (background sessions included). */
/* ------------------------------------------------------------- history ----- */

interface HistoryEntry {
  past: Board[]
  future: Board[]
  last: number
}
const histories = new Map<string, HistoryEntry>()

function recordHistory(workspaceId: string, previous: Board): void {
  const h = histories.get(workspaceId) ?? { past: [], future: [], last: 0 }
  const now = Date.now()
  if (now - h.last > 350) {
    h.past.push(structuredClone(previous))
    if (h.past.length > 50) h.past.shift()
    h.future = []
    h.last = now
    histories.set(workspaceId, h)
  }
}

function stepHistory(direction: -1 | 1): void {
  const s = useApp.getState()
  const repo = s.repos.find((r) => r.id === s.activeRepoId)
  const ws = repo?.workspaces.find((w) => w.id === repo.activeWorkspaceId)
  if (!ws) return
  const h = histories.get(ws.id)
  if (!h) return
  const from = direction === -1 ? h.past : h.future
  const to = direction === -1 ? h.future : h.past
  const target = from.pop()
  if (!target) return
  to.push(structuredClone(ws.board))
  useApp.setState({
    repos: s.repos.map((r) =>
      r.id !== s.activeRepoId
        ? r
        : {
            ...r,
            workspaces: r.workspaces.map((w) => (w.id === r.activeWorkspaceId ? { ...w, board: target } : w))
          }
    )
  })
}

export const findConsole = (s: AppState, id: string): ConsoleNode | undefined => {
  for (const r of s.repos) {
    for (const w of r.workspaces) {
      const n = w.board.nodes.find((x) => x.id === id)
      if (n?.kind === 'console') return n
    }
  }
  return undefined
}

export const displayName = (n: AnyNode): string =>
  n.kind === 'console' ? n.title || 'Console' : n.title

/** The local model the Main Brain and planner should use. */
export const llmConfig = (settings: Settings): { provider: 'ollama' | 'lmstudio'; url: string; model: string } =>
  settings.llmProvider === 'lmstudio'
    ? { provider: 'lmstudio', url: settings.lmStudioUrl, model: settings.lmStudioModel }
    : { provider: 'ollama', url: settings.ollamaUrl, model: settings.ollamaModel }

/* ------------------------------------------------------------- persistence -- */

let saveTimer: ReturnType<typeof setTimeout> | null = null

export function startPersistence(): () => void {
  const unsub = useApp.subscribe((s) => {
    if (!s.hydrated) return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      const st = useApp.getState()
      const payload: PersistedState = {
        version: 2,
        repos: st.repos,
        activeRepoId: st.activeRepoId,
        settings: st.settings,
        threads: st.threads,
        loops: st.loops,
        memory: st.memory,
        profiles: st.profiles,
        savedPresets: st.savedPresets,
        recent: st.recent
      }
      void window.api.store.save(payload)
    }, 700)
  })
  return unsub
}
