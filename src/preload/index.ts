import { contextBridge, ipcRenderer } from 'electron'
import type {
  DoctorReport, FileEntry, GitCommit, GitStatus, LLMResult, PersistedState, SkillInfo, UsageDay
} from '../shared/types'

const invoke = (channel: string, ...args: unknown[]) => ipcRenderer.invoke(channel, ...args)

const api = {
  platform: process.platform,
  home: () => invoke('app:home') as Promise<string>,
  cwd: () => invoke('app:cwd') as Promise<string>,
  doctor: () => invoke('app:doctor') as Promise<DoctorReport>,

  pty: {
    create: (opts: {
      id: string; cwd: string; command: string; args: string[]; env?: Record<string, string>
    }) => invoke('pty:create', opts) as Promise<{ pid: number; shell: string }>,
    write: (id: string, data: string) => invoke('pty:write', id, data) as Promise<void>,
    resize: (id: string, cols: number, rows: number) => invoke('pty:resize', id, cols, rows) as Promise<void>,
    kill: (id: string) => invoke('pty:kill', id) as Promise<void>,
    list: () => invoke('pty:list') as Promise<string[]>,
    onData: (cb: (id: string, data: string) => void) => {
      const fn = (_e: unknown, id: string, data: string) => cb(id, data)
      ipcRenderer.on('pty:data', fn)
      return () => ipcRenderer.removeListener('pty:data', fn)
    },
    onExit: (cb: (id: string, code: number) => void) => {
      const fn = (_e: unknown, id: string, code: number) => cb(id, code)
      ipcRenderer.on('pty:exit', fn)
      return () => ipcRenderer.removeListener('pty:exit', fn)
    }
  },

  store: {
    load: () => invoke('store:load') as Promise<PersistedState | null>,
    save: (state: PersistedState) => invoke('store:save', state) as Promise<void>
  },

  dialog: {
    pickFolder: () => invoke('dialog:pickFolder') as Promise<string | null>,
    pickFiles: () => invoke('dialog:pickFiles') as Promise<string[]>
  },
  shell: {
    openPath: (p: string) => invoke('shell:openPath', p) as Promise<void>,
    showItem: (p: string) => invoke('shell:showItem', p) as Promise<void>,
    openExternal: (url: string) => invoke('shell:openExternal', url) as Promise<void>
  },

  fs: {
    readDir: (p: string) => invoke('fs:readDir', p) as Promise<FileEntry[]>,
    readFile: (p: string) => invoke('fs:readFile', p) as Promise<{ text: string; truncated: boolean }>,
    writeFile: (p: string, text: string) => invoke('fs:writeFile', p, text) as Promise<void>,
    mkdir: (p: string) => invoke('fs:mkdir', p) as Promise<void>,
    trash: (p: string) => invoke('fs:trash', p) as Promise<void>,
    exists: (p: string) => invoke('fs:exists', p) as Promise<boolean>,
    scanMarkdown: (root: string) => invoke('fs:scanMarkdown', root) as Promise<FileEntry[]>,
    stat: (p: string) => invoke('fs:stat', p) as Promise<{ size: number; mtime: number; dir: boolean } | null>
  },

  git: {
    status: (cwd: string) => invoke('git:status', cwd) as Promise<GitStatus>,
    commit: (cwd: string, message: string, files: string[]) => invoke('git:commit', cwd, message, files) as Promise<string>,
    push: (cwd: string) => invoke('git:push', cwd) as Promise<string>,
    pull: (cwd: string) => invoke('git:pull', cwd) as Promise<string>,
    branches: (cwd: string) => invoke('git:branches', cwd) as Promise<string[]>,
    checkout: (cwd: string, branch: string) => invoke('git:checkout', cwd, branch) as Promise<void>,
    createBranch: (cwd: string, branch: string) => invoke('git:createBranch', cwd, branch) as Promise<void>,
    log: (cwd: string) => invoke('git:log', cwd) as Promise<GitCommit[]>,
    init: (cwd: string) => invoke('git:init', cwd) as Promise<void>
  },

  llm: {
    chat: (opts: {
      messages: { role: string; content: string }[]
      json?: boolean
      model?: string
      url?: string
      provider?: 'ollama' | 'lmstudio'
      temperature?: number
    }) => invoke('llm:chat', opts) as Promise<LLMResult>,
    models: (url?: string, provider?: 'ollama' | 'lmstudio') => invoke('llm:models', url, provider) as Promise<string[]>
  },

  win: {
    setTitleBar: (opts: { color: string; symbolColor: string; height?: number }) =>
      invoke('window:titlebar', opts) as Promise<void>
  },

  stt: {
    transcribe: (audioBase64: string, url?: string) => invoke('stt:transcribe', audioBase64, url) as Promise<{ text: string; error?: string }>
  },

  pdf: {
    export: (html: string, defaultName: string) => invoke('pdf:export', html, defaultName) as Promise<string | null>
  },

  skills: {
    scan: (repoPath: string) => invoke('skills:scan', repoPath) as Promise<SkillInfo[]>,
    write: (p: string, text: string) => invoke('fs:writeFile', p, text) as Promise<void>
  },

  usage: {
    scan: () => invoke('usage:scan') as Promise<UsageDay[]>
  },

  profiles: {
    create: (agentId: string, name: string) => invoke('profiles:create', agentId, name) as Promise<{ id: string; dir: string; initials: string }>
  }
}

contextBridge.exposeInMainWorld('api', api)
export type Api = typeof api
