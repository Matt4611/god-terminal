// Shared data model for God Terminal (GoT). Renderer and main both import this.

export type NodeKind =
  | 'console'
  | 'note'
  | 'text'
  | 'checklist'
  | 'kanban'
  | 'calendar'
  | 'web'
  | 'image'
  | 'shape'
  | 'card'
  | 'orchestrator'
  | 'memory'
  | 'branches'

export type AgentStatus =
  | 'STARTING'
  | 'WORKING'
  | 'RUNNING'
  | 'NEEDS YOU'
  | 'READY'
  | 'PAUSED'
  | 'DONE'
  | 'ERROR'
  | 'IDLE'

export interface BaseNode {
  id: string
  kind: NodeKind
  x: number
  y: number
  w: number
  h: number
  z: number
  title: string
  color?: string
}

export interface ConsoleNode extends BaseNode {
  kind: 'console'
  agentId: string
  cwd: string
  /** Per-console launch args, e.g. `--oss` for Codex on Ollama. */
  args?: string[]
  status: AgentStatus
  statusDetail?: string
  profileId?: string
  yolo?: boolean
  /** Bumped to force a fresh PTY in the renderer. */
  launchKey: number
  paused?: boolean
}

export interface NoteNode extends BaseNode {
  kind: 'note'
  text: string
  paper: string
}

export interface TextNode extends BaseNode {
  kind: 'text'
  text: string
  font: string
  size: number
  align: 'left' | 'center' | 'right'
}

export interface ChecklistNode extends BaseNode {
  kind: 'checklist'
  items: { id: string; text: string; done: boolean }[]
}

export interface KanbanCard {
  id: string
  title: string
  notes?: string
  priority: 'none' | 'low' | 'med' | 'high'
  due?: string
  done?: boolean
}
export interface KanbanColumn {
  id: string
  title: string
  color: string
  cards: KanbanCard[]
}
export interface KanbanNode extends BaseNode {
  kind: 'kanban'
  columns: KanbanColumn[]
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time?: string
  allDay?: boolean
  notes?: string
  color: string
}
export interface CalendarNode extends BaseNode {
  kind: 'calendar'
  month: string
  events: CalendarEvent[]
}

export interface WebNode extends BaseNode {
  kind: 'web'
  url: string
  zoom: number
  device: string
}

export interface ImageNode extends BaseNode {
  kind: 'image'
  src: string
  path?: string
}

export type ShapeKind = 'rect' | 'ellipse' | 'diamond' | 'line' | 'arrow' | 'sticky'
export interface ShapeStyle {
  stroke: string
  fill: string
  width: number
  dashed: boolean
  sloppy: boolean
}
export interface ShapeNode extends BaseNode {
  kind: 'shape'
  shape: ShapeKind
  style: ShapeStyle
  points?: { x: number; y: number }[]
}

export interface CardNode extends BaseNode {
  kind: 'card'
  cardKind: 'code' | 'file' | 'markdown' | 'doc' | 'diagram'
  path?: string
  content?: string
  meta?: Record<string, string>
  live?: boolean
}

export interface OrchestratorNode extends BaseNode {
  kind: 'orchestrator'
  wired: string[]
}

export interface MemoryNode extends BaseNode {
  kind: 'memory'
  scope: string
}

export interface BranchesNode extends BaseNode {
  kind: 'branches'
}

export type AnyNode =
  | ConsoleNode
  | NoteNode
  | TextNode
  | ChecklistNode
  | KanbanNode
  | CalendarNode
  | WebNode
  | ImageNode
  | ShapeNode
  | CardNode
  | OrchestratorNode
  | MemoryNode
  | BranchesNode

export interface Group {
  id: string
  name: string
  role: string
  tint: string
  memberIds: string[]
}

export interface Wire {
  id: string
  from: string
  to: string
  kind: 'orchestrator' | 'memory' | 'preview' | 'plain'
}

export interface Viewport {
  x: number
  y: number
  zoom: number
}

export interface Board {
  nodes: AnyNode[]
  groups: Group[]
  wires: Wire[]
  viewport: Viewport
}

export interface Workspace {
  id: string
  name: string
  board: Board
}

export interface Repo {
  id: string
  path: string
  name: string
  workspaces: Workspace[]
  activeWorkspaceId: string
}

export interface ThreadMessage {
  id: string
  role: 'user' | 'agent' | 'system' | 'brain'
  text: string
  at: number
  agent?: string
  consoleId?: string
}

export interface Loop {
  id: string
  name: string
  instruction: string
  target: string // 'all' | group id | console node id | orchestrator id
  trigger: { type: 'interval' | 'idle' | 'contains'; seconds?: number; pattern?: string }
  goal: { type: 'exit' | 'agent'; text?: string }
  maxRuns: number
  runs: number
  enabled: boolean
  lastRun?: number
}

export type FactKind = 'Architecture' | 'Structure' | 'Commands' | 'Conventions' | 'Gotchas' | 'Context'
export interface Fact {
  id: string
  kind: FactKind
  text: string
  scope: string // repo id or 'global'
}

export type LlmProvider = 'ollama' | 'lmstudio'

export interface Settings {
  theme: 'ink' | 'light'
  llmProvider: LlmProvider
  defaultAgent: string
  yolo: boolean
  fontSize: number
  ollamaUrl: string
  ollamaModel: string
  lmStudioUrl: string
  lmStudioModel: string
  sttUrl: string
  ttsEnabled: boolean
  voiceLanguage: string
  holdSpace: boolean
  resumeChats: boolean
  reopenLastRepo: boolean
  chimeOnReset: boolean
  customAgents: { id: string; name: string; command: string; yoloFlag?: string }[]
}

export interface PersistedState {
  version: number
  repos: Repo[]
  activeRepoId: string | null
  settings: Settings
  threads: Record<string, ThreadMessage[]>
  loops: Loop[]
  memory: Fact[]
  profiles: Profile[]
  savedPresets: { id: string; name: string; nodes: AnyNode[] }[]
  recent: string[]
}

export interface Profile {
  id: string
  name: string
  agentId: 'claude' | 'codex'
  dir: string
  initials: string
}

export interface AgentDef {
  id: string
  name: string
  command: string
  args?: string[]
  yoloFlag?: string
  yoloEnv?: { key: string; value: string }
  resume: 'claude' | 'codex' | 'gemini' | 'opencode' | 'none'
  builtin?: boolean
  color: string
}

export interface PresetLane {
  agentId?: string
  role?: string
  x: number
  y: number
  w?: number
  h?: number
}
export interface PresetDef {
  id: string
  name: string
  description: string
  lanes: PresetLane[]
  extras?: ('kanban' | 'preview' | 'orchestrator' | 'memory')[]
  groups?: { name: string; role: string; laneIndexes: number[] }[]
}

export interface GitFile {
  path: string
  index: string
  worktree: string
}
export interface GitStatus {
  branch: string
  ahead: number
  behind: number
  files: GitFile[]
  clean: boolean
  hasRemote: boolean
  repo: boolean
}
export interface GitCommit {
  hash: string
  message: string
  date: string
  author: string
}

export interface FileEntry {
  name: string
  path: string
  dir: boolean
  size: number
  ext: string
}

export interface SkillInfo {
  name: string
  description: string
  path: string
  scope: 'personal' | 'project' | 'plugin' | 'command'
  body: string
  findings: string[]
}

export interface UsageDay {
  date: string
  agent: string
  input: number
  output: number
  total: number
}

export interface LLMResult {
  ok: boolean
  text: string
  model?: string
  error?: string
}

export interface PlannerAction {
  action: string
  args?: Record<string, unknown>
  say?: string
}

export interface DoctorReport {
  ollama: { ok: boolean; models: string[]; error?: string }
  stt: { ok: boolean; error?: string }
  git: { ok: boolean }
  platform: string
}

export const emptyBoard = (): Board => ({
  nodes: [],
  groups: [],
  wires: [],
  viewport: { x: 0, y: 0, zoom: 1 }
})
