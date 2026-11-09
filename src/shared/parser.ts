/**
 * Deterministic command parser for the command bar. It covers the everyday
 * grammar without any model; anything it cannot parse is handed to the local
 * planner or broadcast as a plain order.
 */

export interface ParseContext {
  consoles: { id: string; name: string; agentName: string; status: string; groupId?: string }[]
  groups: { id: string; name: string }[]
  workspaceCount: number
  currentWorkspace: number
  presets: { id: string; name: string }[]
  orchestrators: { id: string; name: string }[]
}

export type ParseResult =
  | { kind: 'action'; action: string; args: Record<string, unknown>; echo: string }
  | { kind: 'order'; text: string; targets: string[]; echo: string }
  | { kind: 'planner'; text: string }
  | { kind: 'empty' }

const norm = (s: string) => s.trim().replace(/\s+/g, ' ')

function matchConsole(ctx: ParseContext, token: string) {
  const t = token.replace(/^@/, '').toLowerCase()
  return ctx.consoles.find(
    (c) => c.name.toLowerCase() === t || c.agentName.toLowerCase() === t || c.id === t
  )
}

function numbers(s: string, max: number): number[] {
  const out: number[] = []
  const re = /(\d+)\s*(?:-|–|to|bis)\s*(\d+)|(\d+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) {
    if (m[1] && m[2]) {
      for (let i = +m[1]; i <= Math.min(+m[2], max); i++) out.push(i)
    } else if (m[3]) out.push(+m[3])
  }
  return [...new Set(out)]
}

export function parseCommand(raw: string, ctx: ParseContext): ParseResult {
  const text = norm(raw)
  if (!text) return { kind: 'empty' }
  const lower = text.toLowerCase()

  // ---- workspaces ----
  let m = lower.match(/^(go to|switch to|gehe zu) workspace (\d+)$/)
  if (m) return { kind: 'action', action: 'goto-workspace', args: { index: +m[2] - 1 }, echo: text }
  m = lower.match(/^(new workspace)( called| named| namens)? (.+)$/)
  if (m) return { kind: 'action', action: 'new-workspace', args: { name: text.slice(m[1].length + m[2].length).trim() }, echo: text }
  m = lower.match(/^rename (this|the) workspace to (.+)$/)
  if (m) return { kind: 'action', action: 'rename-workspace', args: { name: m[2] }, echo: text }
  m = lower.match(/^close workspace (\d+)$/)
  if (m) return { kind: 'action', action: 'close-workspace', args: { index: +m[1] - 1 }, echo: text }

  // ---- spawning ----
  m = lower.match(/^spawn (\d+|a|an|one|two|three|four|five|six|eight) ?(?:agents?|consoles?)?(?: (?:with|of|using))? ?(.*)$/)
  if (m) {
    const words: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, eight: 8 }
    const count = words[m[1]] ?? Math.min(+m[1] || 1, 16)
    const rest = m[2]?.trim() ?? ''
    const agentToken = rest.split(' ')[0] ?? ''
    return {
      kind: 'action',
      action: 'spawn',
      args: { count, agentQuery: agentToken, roleToken: rest.split(' ').slice(1).join(' ') },
      echo: text
    }
  }
  m = lower.match(/^(add|new) (?:an? )?(?:agent|console)(?: (?:for|in|to))?(?: (?:group|team) (\d+))?(?: (?:called|named) (.+))?$/)
  if (m && /^(add|new) (an? )?(agent|console)/.test(lower)) {
    return { kind: 'action', action: 'spawn', args: { count: 1, groupIndex: m[2] ? +m[2] - 1 : undefined, name: m[3] }, echo: text }
  }
  m = lower.match(/^(?:add|new) (\d+|two|three|four) (?:agents|consoles)(?: to group (\d+))?$/)
  if (m) {
    const words: Record<string, number> = { two: 2, three: 3, four: 4 }
    return { kind: 'action', action: 'spawn', args: { count: words[m[1]] ?? +m[1], groupIndex: m[2] ? +m[2] - 1 : undefined }, echo: text }
  }

  // ---- console verbs ----
  const targetName = (s: string) => {
    const t = s.trim().replace(/^(the |agent )/, '')
    return matchConsole(ctx, t)?.id ?? (ctx.consoles.length === 1 ? ctx.consoles[0].id : undefined)
  }
  m = lower.match(/^(kill|close|stop) (?:the )?(?:console |agent )?(.+)$/)
  if (m && !lower.startsWith('close workspace')) {
    const id = targetName(m[2])
    if (id) return { kind: 'action', action: 'kill-console', args: { id }, echo: text }
  }
  m = lower.match(/^(restart|relaunch) (?:the )?(?:console |agent )?(.+)$/)
  if (m) {
    const id = targetName(m[2])
    if (id) return { kind: 'action', action: 'restart-console', args: { id }, echo: text }
  }
  m = lower.match(/^(pause|resume) (?:the )?(?:console |agent )?(.+)$/)
  if (m) {
    const id = targetName(m[2])
    if (id) return { kind: 'action', action: `${m[1]}-console`, args: { id }, echo: text }
  }
  m = lower.match(/^(focus|show|frame|zoom to) (?:the )?(.+)$/)
  if (m) {
    const id = targetName(m[2])
    if (id) return { kind: 'action', action: 'focus-console', args: { id }, echo: text }
  }
  m = lower.match(/^rename (?:the )?console (.+?) to (.+)$/)
  if (m) {
    const id = targetName(m[1])
    if (id) return { kind: 'action', action: 'rename-console', args: { id, name: m[2] }, echo: text }
  }

  // ---- panels and insertions ----
  m = lower.match(/^open (documents?|diagrams?|code|markdown|memory|skills?|git(?:hub)?|usage|tokens?|settings|presets?|mission map|map)$/)
  if (m) {
    const map: Record<string, string> = {
      document: 'documents', documents: 'documents', diagram: 'diagrams', diagrams: 'diagrams',
      code: 'code', markdown: 'markdown', memory: 'memory', skill: 'skills', skills: 'skills',
      git: 'git', github: 'git', usage: 'usage', token: 'usage', tokens: 'usage',
      settings: 'settings', preset: 'presets', presets: 'presets', 'mission map': 'mission', map: 'mission'
    }
    return { kind: 'action', action: 'open-panel', args: { panel: map[m[1]] }, echo: text }
  }
  m = lower.match(/^add (?:a |an )?(note|kanban|calendar|checklist|web tile|browser|orchestrator|branches|memory card)(?: (?:called|named) (.+))?$/)
  if (m) {
    return { kind: 'action', action: 'add-node', args: { node: m[1], name: m[2] }, echo: text }
  }
  m = lower.match(/^add (?:a )?note (?:that )?says (.+)$/)
  if (m) return { kind: 'action', action: 'add-node', args: { node: 'note', text: m[1] }, echo: text }
  m = lower.match(/^open (localhost|127\.0\.0\.1)(?::(\d+))?$/)
  if (m) return { kind: 'action', action: 'add-node', args: { node: 'web tile', url: `http://${m[1]}:${m[2] ?? 3000}` }, echo: text }

  m = lower.match(/^connect (?:group|team) (\d+) to (?:the )?orchestrator(?: (\d+))?$/)
  if (m) return { kind: 'action', action: 'connect-group', args: { groupIndex: +m[1] - 1, orchIndex: m[2] ? +m[2] - 1 : 0 }, echo: text }
  m = lower.match(/^(?:add|insert) (?:an? )?orchestrator(?: for group (\d+))?(?: (?:called|named) (.+))?$/)
  if (m) return { kind: 'action', action: 'add-node', args: { node: 'orchestrator', groupIndex: m[1] ? +m[1] - 1 : undefined, name: m[2] }, echo: text }

  m = lower.match(/^(?:use|deploy|apply|start) (?:the )?preset (.+)$/)
  if (m) {
    const presetName = m[1].trim()
    const p = ctx.presets.find((x) => x.name.toLowerCase() === presetName)
    return { kind: 'action', action: 'deploy-preset', args: { id: p?.id, name: presetName }, echo: text }
  }

  // ---- git ----
  if (/^(commit and push|commit & push|push everything)$/.test(lower))
    return { kind: 'action', action: 'git', args: { op: 'commit-push' }, echo: text }
  if (/^(push|pull)$/.test(lower)) return { kind: 'action', action: 'git', args: { op: lower }, echo: text }
  m = lower.match(/^commit with (?:the )?message (.+)$/)
  if (m) return { kind: 'action', action: 'git', args: { op: 'commit', message: m[1] }, echo: text }

  // ---- memory ----
  if (/^(push|send) (the )?memory( to (all|agents))?$/.test(lower))
    return { kind: 'action', action: 'memory-push', args: {}, echo: text }

  // ---- view ----
  if (/^(zoom in|fit|zoom to fit|fit board)$/.test(lower))
    return { kind: 'action', action: 'fit-board', args: {}, echo: text }
  if (/^(zoom out)$/.test(lower)) return { kind: 'action', action: 'zoom', args: { delta: -0.15 }, echo: text }

  // ---- mentions ----
  if (/^@all\b/i.test(text)) {
    const rest = text.replace(/^@all\s*/i, '').trim()
    if (rest) return { kind: 'order', text: rest, targets: ctx.consoles.map((c) => c.id), echo: text }
  }
  if (text.startsWith('@')) {
    const [head, ...rest] = text.split(' ')
    const target = matchConsole(ctx, head)
    if (target && rest.length) {
      return { kind: 'order', text: rest.join(' '), targets: [target.id], echo: text }
    }
  }

  const mentions = [...text.matchAll(/@([\w.-]+)/g)]
    .map((mm) => matchConsole(ctx, mm[1]))
    .filter(Boolean) as { id: string }[]
  if (mentions.length) {
    return { kind: 'order', text, targets: [...new Set(mentions.map((x) => x.id))], echo: text }
  }

  // Everything else goes to the Main Brain. It answers conversationally and
  // splits actual work across agents. Use @Name or @all for direct orders.
  return { kind: 'planner', text }
}

export const RISKY = /(rm\s+-rf|sudo|del\s+\/|format\s+[a-z]:|--yolo|dangerously-skip|\.env\b|git\s+reset\s+--hard|drop\s+table)/i

export function riskOf(text: string): string | null {
  const m = text.match(RISKY)
  return m ? m[0] : null
}
