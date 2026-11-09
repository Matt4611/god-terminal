import { PRESETS, ROLE_AGENT, allAgents, getAgent } from '@shared/agents'
import { parseCommand, riskOf, type ParseContext } from '@shared/parser'
import type { AnyNode, Board, ConsoleNode, Group, PlannerAction, PresetDef } from '@shared/types'
import { makeConsole, makeKanban, makeOrchestrator, makeWeb, newNode } from './factory'
import { activeRepo, consolesOf, llmConfig, useApp } from './store'
import { digest, sendOrder } from './runtime'
import { uid } from './util'

const NAMES = ['Otto', 'Dax', 'Mira', 'Nova', 'Kai', 'Ada', 'Rune', 'Fable', 'Juno', 'Vesper', 'Echo', 'Lux', 'Pax', 'Sable', 'Wren', 'Iris', 'Nico', 'Tess', 'Bram', 'Oona']

function nextName(existing: string[]): string {
  const free = NAMES.find((n) => !existing.includes(n))
  if (free) return free
  return `${NAMES[existing.length % NAMES.length]} ${existing.length + 1}`
}

export function agentFromQuery(query?: string): string {
  if (!query) return useApp.getState().settings.defaultAgent
  const q = query.toLowerCase().replace(/^@/, '')
  const found = allAgents().find(
    (a) => a.id === q || a.command.toLowerCase() === q || a.name.toLowerCase().startsWith(q)
  )
  return found?.id ?? useApp.getState().settings.defaultAgent
}

function viewportOrigin(): { x: number; y: number } {
  const st = useApp.getState()
  const b = st.board()
  const v = b?.viewport ?? { x: 0, y: 0, zoom: 1 }
  return { x: (window.innerWidth / 2 - 380 - v.x) / v.zoom, y: (window.innerHeight / 2 - 220 - v.y) / v.zoom }
}

const CELL_W = 400
const CELL_H = 260
const GAP_X = 32
const GAP_Y = 42

/** Scan a grid around the viewport for a block of consoles that hits nothing. */
function freeOrigin(b: Board, cols: number, rows: number): { x: number; y: number } {
  const v = b.viewport
  const base = {
    x: (window.innerWidth / 2 - 380 - v.x) / v.zoom,
    y: (window.innerHeight / 2 - 220 - v.y) / v.zoom
  }
  const w = cols * CELL_W + (cols - 1) * GAP_X
  const h = rows * CELL_H + (rows - 1) * GAP_Y
  for (let gy = -3; gy <= 5; gy++) {
    for (let gx = -4; gx <= 6; gx++) {
      const x = base.x + gx * 440
      const y = base.y + gy * 310
      const pad = 40
      const clash = b.nodes.some(
        (n) => x - pad < n.x + n.w && x + w + pad > n.x && y - pad < n.y + n.h && y + h + pad > n.y
      )
      if (!clash) return { x, y }
    }
  }
  const maxX = b.nodes.length ? Math.max(...b.nodes.map((n) => n.x + n.w)) : base.x
  const minY = b.nodes.length ? Math.min(...b.nodes.map((n) => n.y)) : base.y
  return { x: maxX + 64, y: minY }
}

export function spawnConsoles(
  count: number,
  opts: { agentQuery?: string; role?: string; groupId?: string; name?: string } = {}
): ConsoleNode[] {
  const st = useApp.getState()
  const b = st.board()
  if (!b) return []
  const repo = activeRepo(st)
  const agentId = opts.role && ROLE_AGENT[opts.role] ? ROLE_AGENT[opts.role] : agentFromQuery(opts.agentQuery)
  const origin = freeOrigin(b, Math.min(3, count), Math.ceil(count / 3))
  const existingNames = consolesOf(b).map((c) => c.title)
  const made: ConsoleNode[] = []
  for (let i = 0; i < count; i++) {
    const n = makeConsole(origin.x + (i % 3) * (CELL_W + GAP_X), origin.y + Math.floor(i / 3) * (CELL_H + GAP_Y), {
      agentId,
      cwd: repo?.path ?? '',
      title: opts.name && count === 1 ? opts.name : nextName([...existingNames, ...made.map((m) => m.title)]),
      yolo: st.settings.yolo
    })
    made.push(n)
  }
  st.addNodes(made)
  if (opts.groupId) {
    st.updateBoard((board) => ({
      ...board,
      groups: board.groups.map((g) => g.id === opts.groupId ? { ...g, memberIds: [...g.memberIds, ...made.map((m) => m.id)] } : g)
    }))
  }
  st.setSelection(made.map((m) => m.id))
  st.toast(`${count} console${count > 1 ? 's' : ''} started with ${getAgent(agentId).name}`, 'ok')
  setTimeout(() => {
    if (made.length === 1) {
      window.dispatchEvent(new CustomEvent('hive:frame', { detail: made[0].id }))
    } else {
      window.dispatchEvent(
        new CustomEvent('hive:frame-rect', {
          detail: {
            x: origin.x,
            y: origin.y,
            w: Math.min(3, count) * CELL_W + (Math.min(3, count) - 1) * GAP_X,
            h: Math.ceil(count / 3) * CELL_H + (Math.ceil(count / 3) - 1) * GAP_Y
          }
        })
      )
    }
  }, 340)
  return made
}

export interface TeamSlot {
  agentId: string
  title?: string
  role?: string
  args?: string[]
}

export type BrainWorkerKind = 'codex' | 'ollama' | 'shell'

/**
 * The brain is a real Ollama terminal. Workers are Codex agents pointed at the
 * same local Ollama model, further Ollama chats, or plain shells.
 */
export function startBrain(opts: { model: string; workers: number; workerKind: BrainWorkerKind }): ConsoleNode[] {
  const st = useApp.getState()
  const b = st.board()
  const repo = activeRepo(st)
  if (!b || !repo) {
    st.toast('Open a project first', 'error')
    return []
  }
  const model = opts.model.trim() || st.settings.ollamaModel
  st.patchSettings({ ollamaModel: model })
  const workers = Math.max(0, Math.min(8, Math.floor(opts.workers)))
  const slots: TeamSlot[] = [{ agentId: 'ollama', title: 'Brain', args: ['run', model] }]
  for (let i = 0; i < workers; i++) {
    if (opts.workerKind === 'codex') {
      slots.push({
        agentId: 'codex-ollama',
        args: ['launch', 'codex', '-m', model, '--', '--sandbox', 'workspace-write', '-c', 'check_for_update_on_startup=false']
      })
    } else if (opts.workerKind === 'ollama') {
      slots.push({ agentId: 'ollama', args: ['run', model] })
    } else {
      slots.push({ agentId: 'shell' })
    }
  }
  const made = spawnTeam(slots, { name: 'Brain crew', quiet: true })
  if (made.length) {
    st.toast(`Brain online · ${workers} worker${workers === 1 ? '' : 's'} launched`, 'ok')
  }
  return made
}

/**
 * Launch a whole team in one action. Consoles are laid out in a 3-column grid
 * to the right of whatever is already on the board, grouped, then framed.
 */
export function spawnTeam(slots: TeamSlot[], opts: { name?: string; quiet?: boolean } = {}): ConsoleNode[] {
  const st = useApp.getState()
  const b = st.board()
  const repo = activeRepo(st)
  if (!b || !repo || !slots.length) return []
  const origin = freeOrigin(b, Math.min(3, slots.length), Math.ceil(slots.length / 3))
  const startX = origin.x
  const startY = origin.y
  const names = consolesOf(b).map((c) => c.title)
  const made: ConsoleNode[] = []
  for (let i = 0; i < Math.min(12, slots.length); i++) {
    const slot = slots[i]
    const title = slot.title?.trim() || nextName(names)
    names.push(title)
    made.push(
      makeConsole(startX + (i % 3) * (CELL_W + GAP_X), startY + Math.floor(i / 3) * (CELL_H + GAP_Y), {
        agentId: slot.agentId,
        cwd: repo.path,
        title,
        args: slot.args,
        yolo: st.settings.yolo
      })
    )
  }
  st.addNodes(made)
  const groups: Group[] = []
  if (made.length > 1) {
    groups.push({
      id: uid(),
      name: opts.name?.trim() || `Team ${b.groups.length + 1}`,
      role: 'Team',
      tint: ['violet', 'cyan', 'amber', 'rose', 'sage', 'sky'][b.groups.length % 6],
      memberIds: made.map((m) => m.id)
    })
  }
  if (groups.length) st.updateBoard((board) => ({ ...board, groups: [...board.groups, ...groups] }))
  st.setSelection(made.map((m) => m.id))
  if (!opts.quiet) {
    st.toast(
      `${made.length} terminal${made.length === 1 ? '' : 's'} launched at once`,
      'ok'
    )
  }
  const cols = Math.min(3, made.length)
  const rows = Math.ceil(made.length / 3)
  setTimeout(
    () =>
      window.dispatchEvent(
        new CustomEvent('hive:frame-rect', {
          detail: {
            x: startX,
            y: startY,
            w: cols * 400 + (cols - 1) * 32,
            h: rows * 260 + (rows - 1) * 42
          }
        })
      ),
    360
  )
  return made
}

export function deployPreset(id: string): void {
  const st = useApp.getState()
  const preset = PRESETS.find((p) => p.id === id)
  const b = st.board()
  const repo = activeRepo(st)
  if (!preset || !b || !repo) return
  const origin = viewportOrigin()
  const nodes: AnyNode[] = []
  const byRole = new Map<string, string[]>()
  for (const lane of preset.lanes) {
    const node = makeConsole(origin.x + lane.x, origin.y + lane.y, {
      agentId: lane.agentId || st.settings.defaultAgent,
      cwd: repo.path,
      title: nextName([...consolesOf(b).map((c) => c.title), ...nodes.map((n) => n.title)]),
      yolo: st.settings.yolo
    })
    nodes.push(node)
    if (lane.role) byRole.set(lane.role, [...(byRole.get(lane.role) ?? []), node.id])
  }
  const groups: Group[] = [...byRole.entries()].map(([role, ids], i) => ({
    id: uid(),
    name: `${role} ${i + 1}`,
    role,
    tint: ['violet', 'cyan', 'amber', 'rose', 'sage', 'sky'][i % 6],
    memberIds: ids
  }))
  const right = origin.x + 80 + Math.max(...preset.lanes.map((l) => l.x)) + 420
  if (preset.extras?.includes('kanban')) {
    const kb = makeKanban(right, origin.y + 80)
    nodes.push(kb)
  }
  if (preset.extras?.includes('preview')) {
    nodes.push(makeWeb(right, origin.y + 500))
  }
  if (preset.extras?.includes('orchestrator')) {
    const orch = makeOrchestrator(origin.x, origin.y - 300)
    orch.wired = nodes.filter((n) => n.kind === 'console').map((n) => n.id)
    nodes.push(orch)
  }
  st.addNodes(nodes)
  st.updateBoard((board) => ({ ...board, groups: [...board.groups, ...groups] }))
  st.setSelection(nodes.filter((n) => n.kind === 'console').map((n) => n.id))
  st.toast(`${preset.name} deployed · ${preset.lanes.length} consoles`, 'ok')
  setTimeout(() => window.dispatchEvent(new CustomEvent('hive:fit')), 320)
}

export function orderConsoles(text: string, targets?: string[], record = true): boolean {
  const st = useApp.getState()
  const b = st.board()
  const repo = activeRepo(st)
  if (!b) return false
  const risk = riskOf(text)
  if (risk && !window.confirm(`This order mentions "${risk}". Send it anyway?`)) return false
  const running = consolesOf(b).filter((c) => ['READY', 'IDLE', 'WORKING', 'RUNNING'].includes(c.status))
  const ids = targets?.length ? targets : running.map((c) => c.id)
  if (!ids.length) {
    st.toast('No running console can take an order. Spawn an agent first.', 'error')
    return false
  }
  for (const id of ids) sendOrder(id, text)
  if (repo && record) st.addMessage(repo.id, { role: 'user', text })
  return true
}

/* --------------------------------------------------------- team updates --- */

const sharedUpdates = new Map<string, { at: number; hash: string }>()

/**
 * When an agent finishes, give the rest of the ready crew a short, rate-limited
 * update. Busy or blocked consoles are never interrupted, and a marker prevents
 * agents from bouncing the same notice back and forth.
 */
export function announceAgentUpdate(sourceId: string, text: string): void {
  const st = useApp.getState()
  const board = st.board()
  if (!board) return
  const clean = text.trim()
  if (clean.length < 30 || clean.includes('[GoT team update')) return
  if (!/(modified|updated|created|deleted|wrote|changed|patched|diff|commit|\.(tsx?|jsx?|css|scss|json|md|py|go|rs|java|html|ya?ml)\b)/i.test(clean)) return

  const source = consolesOf(board).find((c) => c.id === sourceId)
  if (!source) return
  const now = Date.now()
  const hash = clean.slice(-420)
  const prev = sharedUpdates.get(sourceId)
  if (prev && (now - prev.at < 20000 || prev.hash === hash)) return
  sharedUpdates.set(sourceId, { at: now, hash })

  const targets = consolesOf(board).filter(
    (c) => c.id !== sourceId && !c.paused && (c.status === 'READY' || c.status === 'IDLE')
  )
  if (!targets.length) return

  const summary = clean.slice(-900)
  for (const target of targets) {
    sendOrder(
      target.id,
      `[GoT team update from ${source.title}]\n${summary}\n\nAnother agent changed the project. Check the relevant files before editing and avoid duplicate work. Do not repeat this notice.`
    )
  }
}

export function gatherContext(): ParseContext {
  const st = useApp.getState()
  const b = st.board()
  const nodes = b?.nodes ?? []
  return {
    consoles: nodes.filter((n) => n.kind === 'console').map((n) => {
      const c = n as ConsoleNode
      return {
        id: c.id,
        name: c.title,
        agentName: getAgent(c.agentId).name,
        status: c.status,
        groupId: b?.groups.find((g) => g.memberIds.includes(c.id))?.id
      }
    }),
    groups: (b?.groups ?? []).map((g) => ({ id: g.id, name: g.name })),
    workspaceCount: activeRepo(st)?.workspaces.length ?? 1,
    currentWorkspace: activeRepo(st)?.workspaces.findIndex((w) => w.id === activeRepo(st)?.activeWorkspaceId) ?? 0,
    presets: PRESETS.map((p) => ({ id: p.id, name: p.name })),
    orchestrators: nodes.filter((n) => n.kind === 'orchestrator').map((n) => ({ id: n.id, name: n.title }))
  }
}

export function executeAction(action: string, args: Record<string, unknown>, echo: string): void {
  const st = useApp.getState()
  const b = st.board()
  if (echo) {
    const repo = activeRepo(st)
    if (repo) st.addMessage(repo.id, { role: 'system', text: echo })
  }
  switch (action) {
    case 'spawn': {
      spawnConsoles(Number(args.count ?? 1), {
        agentQuery: args.agentQuery as string,
        role: args.roleToken as string,
        name: args.name as string
      })
      break
    }
    case 'new-workspace': st.addWorkspace(args.name as string); break
    case 'goto-workspace': {
      const repo = activeRepo(st)
      const ws = repo?.workspaces[Number(args.index)]
      if (ws) st.setWorkspace(ws.id)
      break
    }
    case 'rename-workspace': {
      const repo = activeRepo(st)
      if (repo) st.renameWorkspace(repo.activeWorkspaceId, (args.name as string) || 'Workspace')
      break
    }
    case 'close-workspace': {
      const repo = activeRepo(st)
      const ws = repo?.workspaces[Number(args.index)]
      if (ws) st.closeWorkspace(ws.id)
      break
    }
    case 'kill-console': {
      const id = args.id as string
      if (window.confirm('Kill this session? The console stays on the board.')) {
        st.patchNode(id, { status: 'DONE', launchKey: (b?.nodes.find((n) => n.id === id) as ConsoleNode)?.launchKey + 1 })
      }
      break
    }
    case 'restart-console': {
      const node = b?.nodes.find((n) => n.id === args.id) as ConsoleNode | undefined
      if (node) st.patchNode(node.id, { launchKey: node.launchKey + 1, status: 'STARTING' })
      break
    }
    case 'pause-console':
    case 'resume-console': {
      const node = b?.nodes.find((n) => n.id === args.id) as ConsoleNode | undefined
      if (node) {
        if (action === 'resume-console') st.patchNode(node.id, { paused: false, launchKey: node.launchKey + 1, status: 'STARTING' })
        else st.patchNode(node.id, { paused: true, status: 'PAUSED' })
      }
      break
    }
    case 'focus-console':
      window.dispatchEvent(new CustomEvent('hive:frame', { detail: args.id }))
      break
    case 'rename-console':
      st.patchNode(args.id as string, { title: (args.name as string).slice(0, 24) })
      break
    case 'open-panel': st.setPanel(args.panel as never); break
    case 'add-node': {
      const origin = viewportOrigin()
      const node = newNode(String(args.node), origin.x + 40, origin.y + 40, args)
      if (args.name) node.title = String(args.name)
      if (args.groupIndex !== undefined) {
        const g = b?.groups[Number(args.groupIndex)]
        if (g && node.kind === 'orchestrator') node.wired = g.memberIds
      }
      st.addNode(node)
      st.setSelection([node.id])
      break
    }
    case 'connect-group': {
      const g = b?.groups[Number(args.groupIndex)]
      const orch = b?.nodes.filter((n) => n.kind === 'orchestrator')[Number(args.orchIndex ?? 0)]
      if (g && orch && orch.kind === 'orchestrator') {
        st.patchNode(orch.id, { wired: [...new Set([...orch.wired, ...g.memberIds])] })
        st.updateBoard((board) => ({
          ...board,
          wires: [
            ...board.wires.filter((w) => w.to !== orch.id),
            ...g.memberIds.map((id) => ({ id: uid(), from: id, to: orch.id, kind: 'orchestrator' as const }))
          ]
        }))
      }
      break
    }
    case 'deploy-preset': {
      const preset = PRESETS.find((p) => p.id === args.id || p.name.toLowerCase() === String(args.name ?? '').toLowerCase())
      if (preset) deployPreset(preset.id)
      break
    }
    case 'memory-push': pushMemory(); break
    case 'fit-board': window.dispatchEvent(new CustomEvent('hive:fit')); break
    case 'zoom':
      st.updateBoard((board) => ({ ...board, viewport: { ...board.viewport, zoom: Math.max(0.2, board.viewport.zoom + Number(args.delta ?? 0)) } }))
      break
    case 'git': void quickGit(String(args.op), args.message as string); break
    default:
      st.toast(`Unknown action: ${action}`, 'error')
  }
}

export async function quickGit(op: string, message?: string): Promise<void> {
  const st = useApp.getState()
  const repo = activeRepo(st)
  if (!repo) return
  try {
    if (op === 'pull') {
      st.toast((await window.api.git.pull(repo.path)) || 'Pulled', 'ok')
      return
    }
    if (op === 'push') {
      st.toast((await window.api.git.push(repo.path)) || 'Pushed', 'ok')
      return
    }
    const status = await window.api.git.status(repo.path)
    const files = status.files.map((f) => f.path)
    if (!files.length) {
      st.toast('Nothing to commit', 'info')
      return
    }
    await window.api.git.commit(repo.path, message || `Update from GoT (${new Date().toLocaleString()})`, files)
    if (op === 'commit-push') st.toast((await window.api.git.push(repo.path)) || 'Committed and pushed', 'ok')
    else st.toast('Committed', 'ok')
  } catch (err) {
    st.toast(err instanceof Error ? err.message : 'Git failed', 'error')
  }
}

export function pushMemory(targets?: string[]): void {
  const st = useApp.getState()
  const b = st.board()
  const repo = activeRepo(st)
  if (!b || !repo) return
  const facts = st.memory.filter((f) => f.scope === 'global' || f.scope === repo.id)
  if (!facts.length) return st.toast('Memory is empty — add facts first', 'error')
  let text = 'Background context for this repo (not a task):\n' + facts.map((f) => `- [${f.kind}] ${f.text}`).join('\n')
  text = text.slice(0, 3400) + '\n\nReply with OK.'
  const ids = targets?.length
    ? targets
    : consolesOf(b).filter((c) => ['READY', 'IDLE', 'WORKING'].includes(c.status)).map((c) => c.id)
  if (!ids.length) return st.toast('No running console to brief', 'error')
  for (const id of ids) sendOrder(id, text)
  st.toast(`Memory pushed to ${ids.length} console(s)`, 'ok')
}

/* --------------------------------------------------------------- planner --- */

function boardSnapshot() {
  const st = useApp.getState()
  const b = st.board()
  const repo = activeRepo(st)
  return {
    project: repo ? { name: repo.name, path: repo.path } : null,
    consoles: consolesOf(b).map((c) => ({
      id: c.id,
      name: c.title,
      agent: getAgent(c.agentId).name,
      status: c.status,
      cwd: c.cwd
    })),
    groups: b?.groups.map((g) => ({ id: g.id, name: g.name, members: g.memberIds })) ?? [],
    notes: b?.nodes.filter((n) => n.kind === 'note' || n.kind === 'checklist').map((n) => ({ kind: n.kind, title: n.title })) ?? [],
    recent: (st.threads[repo?.id ?? ''] ?? []).slice(-10).map((m) => ({
      from: m.role === 'user' ? 'user' : m.role === 'agent' ? m.agent ?? 'agent' : 'brain',
      text: m.text.slice(0, 320)
    }))
  }
}

const BRAIN_SYSTEM = `You are the Main Brain of God Terminal (GoT). You talk with the user and coordinate a crew of agent terminals working in one local project.
Answer with pure JSON only:
{"say":"your reply to the user", "actions":[]}
Allowed actions: order (ids, text), spawn (count, agentQuery), add-node (node: note|kanban|calendar|checklist|orchestrator), focus-console (id), open-panel (panel).
Rules:
- If the user is chatting, asking a question or thinking aloud: answer in say and return no actions.
- If the user gives work: split it into one self-contained, imperative order per suitable console. Use only ids that exist. Do not invent consoles.
- If no console fits, you may spawn one or more consoles with spawn (count, agentQuery) and then order them.
- Agents work in the same folder at the same time. Avoid duplicate work and use the recent agent updates in the board snapshot.
- Keep say short, natural and in the user's language. Do not mention JSON.
- No markdown, no prose outside JSON.`

async function askBrain(text: string): Promise<void> {
  const st = useApp.getState()
  const repo = activeRepo(st)
  const cfg = llmConfig(st.settings)
  if (repo) st.addMessage(repo.id, { role: 'user', text })

  if (cfg.provider === 'lmstudio' && !cfg.model.trim()) {
    if (repo) st.addMessage(repo.id, { role: 'brain', text: 'Wähle zuerst ein LM-Studio-Modell in Settings → Local models.' })
    st.toast('Choose an LM Studio model in Settings', 'error')
    return
  }

  st.setBrainBusy(true)
  try {
    const res = await window.api.llm.chat({
      provider: cfg.provider,
      url: cfg.url,
      model: cfg.model,
      json: true,
      messages: [
        { role: 'system', content: BRAIN_SYSTEM },
        { role: 'user', content: `Board:\n${JSON.stringify(boardSnapshot())}\n\nMessage: ${text}` }
      ]
    })
    if (!res.ok) {
      const msg = res.error ?? 'Das lokale Modell antwortet nicht.'
      if (repo) st.addMessage(repo.id, { role: 'brain', text: msg })
      st.toast(msg, 'error')
      return
    }

    let parsed: { say?: string; actions?: PlannerAction[] } = {}
    try {
      parsed = JSON.parse(res.text)
    } catch {
      const m = res.text.match(/\{[\s\S]*\}/)
      if (m) {
        try { parsed = JSON.parse(m[0]) } catch { parsed = {} }
      }
    }

    const say = String(parsed.say ?? '').trim()
    const actions = parsed.actions ?? []
    if (say) {
      if (repo) st.addMessage(repo.id, { role: 'brain', text: say })
    } else if (!actions.length) {
      const fallback = res.text.trim()
      if (fallback && repo) st.addMessage(repo.id, { role: 'brain', text: fallback })
    }

    for (const a of actions) {
      if (a.action === 'order') {
        const ids = (a.args?.ids as string[]) ?? []
        const order = String(a.args?.text ?? '').trim()
        if (order) orderConsoles(order, ids, false)
      } else {
        executeAction(a.action, (a.args ?? {}) as Record<string, unknown>, '')
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Das Main Brain ist gerade nicht erreichbar.'
    if (repo) st.addMessage(repo.id, { role: 'brain', text: msg })
    st.toast(msg, 'error')
  } finally {
    st.setBrainBusy(false)
  }
}

export async function runCommand(raw: string): Promise<void> {
  const st = useApp.getState()
  const text = raw.trim()
  if (!text) return
  if (!st.board()) {
    st.toast('Open a repo first', 'error')
    return
  }
  const parsed = parseCommand(text, gatherContext())
  if (parsed.kind === 'empty') return
  if (parsed.kind === 'planner') {
    st.setCommandDraft('')
    await askBrain(parsed.text)
    return
  }
  if (parsed.kind === 'order') {
    st.setCommandDraft('')
    orderConsoles(parsed.text, parsed.targets)
    return
  }
  st.setCommandDraft('')
  executeAction(parsed.action, parsed.args, text)
}

export function presetById(id: string): PresetDef | undefined {
  return PRESETS.find((p) => p.id === id)
}

export function digestFor(id: string): string {
  return digest(id)
}
