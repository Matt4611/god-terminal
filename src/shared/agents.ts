import type { AgentDef, PresetDef } from './types'

/**
 * The catalog is plain factual data: CLI names and their documented flags.
 * God Terminal runs whatever is installed; nothing is bundled.
 */
export const AGENTS: AgentDef[] = [
  { id: 'claude', name: 'Claude Code', command: 'claude', yoloFlag: '--dangerously-skip-permissions', resume: 'claude', builtin: true, color: '#d97757' },
  { id: 'codex', name: 'Codex', command: 'codex', yoloFlag: '--dangerously-bypass-approvals-and-sandbox', resume: 'codex', builtin: true, color: '#10a37f' },
  { id: 'gemini', name: 'Gemini CLI', command: 'gemini', yoloFlag: '--yolo', resume: 'gemini', builtin: true, color: '#4285f4' },
  { id: 'grok', name: 'Grok', command: 'grok', yoloFlag: '--permission-mode bypassPermissions', resume: 'none', builtin: true, color: '#8b5cf6' },
  { id: 'opencode', name: 'OpenCode', command: 'opencode', resume: 'opencode', builtin: true, color: '#22d3ee' },
  { id: 'shell', name: 'Shell', command: '', resume: 'none', builtin: true, color: '#94a3b8' },
  { id: 'ollama', name: 'Ollama', command: 'ollama', resume: 'none', builtin: true, color: '#a78bfa' },
  { id: 'codex-ollama', name: 'Codex · Ollama', command: 'ollama', resume: 'none', builtin: true, color: '#10a37f' },
  { id: 'codex-lmstudio', name: 'Codex · LM Studio', command: 'codex', resume: 'none', builtin: true, color: '#8b5cf6' },

  { id: 'antigravity', name: 'Antigravity', command: 'agy', yoloFlag: '--dangerously-skip-permissions', resume: 'none', color: '#64748b' },
  { id: 'aider', name: 'Aider', command: 'aider', yoloFlag: '--yes-always', resume: 'none', color: '#f59e0b' },
  { id: 'amp', name: 'Amp', command: 'amp', yoloFlag: '--dangerously-allow-all', resume: 'none', color: '#ef4444' },
  { id: 'ante', name: 'Ante', command: 'ante', yoloFlag: '--yolo', resume: 'none', color: '#a855f7' },
  { id: 'auggie', name: 'Auggie', command: 'auggie', resume: 'none', color: '#0ea5e9' },
  { id: 'autohand', name: 'Autohand', command: 'autohand', yoloFlag: '--unrestricted', resume: 'none', color: '#14b8a6' },
  { id: 'cline', name: 'Cline', command: 'cline', yoloFlag: '--auto-approve true', resume: 'none', color: '#06b6d4' },
  { id: 'codebuff', name: 'Codebuff', command: 'codebuff', resume: 'none', color: '#f472b6' },
  { id: 'command-code', name: 'Command Code', command: 'command-code', args: ['--trust'], yoloFlag: '--yolo', resume: 'none', color: '#fb923c' },
  { id: 'continue', name: 'Continue', command: 'cn', yoloFlag: '--allow *', resume: 'none', color: '#8b5cf6' },
  { id: 'crush', name: 'Crush', command: 'crush', yoloFlag: '--yolo', resume: 'none', color: '#ec4899' },
  { id: 'cursor', name: 'Cursor CLI', command: 'cursor-agent', yoloFlag: '--yolo', resume: 'none', color: '#e2e8f0' },
  { id: 'devin', name: 'Devin', command: 'devin', yoloFlag: '--permission-mode bypass', resume: 'none', color: '#6366f1' },
  { id: 'droid', name: 'Droid', command: 'droid', resume: 'none', color: '#84cc16' },
  { id: 'copilot', name: 'GitHub Copilot', command: 'copilot', yoloFlag: '--yolo', resume: 'none', color: '#94a3b8' },
  { id: 'goose', name: 'Goose', command: 'goose', yoloEnv: { key: 'GOOSE_MODE', value: 'auto' }, resume: 'none', color: '#f97316' },
  { id: 'hermes', name: 'Hermes', command: 'hermes', args: ['--tui'], yoloFlag: '--yolo', resume: 'none', color: '#a3e635' },
  { id: 'kilo', name: 'Kilocode', command: 'kilo', resume: 'none', color: '#38bdf8' },
  { id: 'kimi', name: 'Kimi', command: 'kimi', yoloFlag: '--yolo', resume: 'none', color: '#f43f5e' },
  { id: 'kiro', name: 'Kiro', command: 'kiro-cli', args: ['chat', '--tui'], yoloFlag: '--trust-all-tools', resume: 'none', color: '#7c3aed' },
  { id: 'mimo', name: 'MiMo Code', command: 'mimo', resume: 'none', color: '#fb7185' },
  { id: 'mistral', name: 'Mistral Vibe', command: 'vibe', yoloFlag: '--agent auto-approve', resume: 'none', color: '#fbbf24' },
  { id: 'openclaude', name: 'OpenClaude', command: 'openclaude', yoloFlag: '--dangerously-skip-permissions', resume: 'none', color: '#d97757' },
  { id: 'openclaw', name: 'OpenClaw', command: 'openclaw', resume: 'none', color: '#2dd4bf' },
  { id: 'pi', name: 'Pi', command: 'pi', resume: 'none', color: '#c084fc' },
  { id: 'prime', name: 'Prime Agent', command: 'prime-agent', resume: 'none', color: '#60a5fa' },
  { id: 'qwen', name: 'Qwen Code', command: 'qwen', yoloFlag: '--approval-mode yolo', resume: 'none', color: '#a78bfa' },
  { id: 'rovo', name: 'Rovo Dev', command: 'rovo', yoloFlag: '--yolo', resume: 'none', color: '#0052cc' },
  { id: 'trae', name: 'Trae', command: 'traecli', yoloFlag: '--yolo', resume: 'none', color: '#ef4444' }
]

const CUSTOM: AgentDef[] = []

/** Custom agents live in settings and are registered before any render. */
export const registerCustomAgents = (
  list: { id: string; name: string; command: string; yoloFlag?: string }[]
): void => {
  CUSTOM.length = 0
  for (const c of list) {
    CUSTOM.push({
      id: c.id,
      name: c.name,
      command: c.command,
      yoloFlag: c.yoloFlag,
      resume: 'none',
      color: '#f472b6'
    })
  }
}

export const allAgents = (): AgentDef[] => [...AGENTS, ...CUSTOM]

export const getAgent = (id: string): AgentDef =>
  allAgents().find((a) => a.id === id) ?? AGENTS[0]

export const ROLES = ['General', 'Frontend', 'Backend', 'Testers', 'Reviewers', 'Design', 'Docs', 'Security']
export const ROLE_AGENT: Record<string, string> = {
  Frontend: 'claude',
  Backend: 'codex',
  Testers: 'gemini',
  Reviewers: 'claude',
  Design: 'claude',
  Docs: 'claude',
  Security: 'codex',
  General: ''
}

export const TINTS = ['violet', 'cyan', 'amber', 'rose', 'sage', 'sky']

/** Build a lane grid helper for preset definitions. */
function lanes(
  specs: { agent?: string; role?: string; col: number; row: number }[]
): PresetDef['lanes'] {
  return specs.map((s) => ({
    agentId: s.agent,
    role: s.role,
    x: 80 + s.col * 400,
    y: 80 + s.row * 320,
    w: 360,
    h: 250
  }))
}

const squad = (role: string, startCol: number, n = 4) =>
  Array.from({ length: n }, (_, i) => ({
    role,
    agent: ROLE_AGENT[role],
    col: startCol + (i % 2),
    row: Math.floor(i / 2)
  }))

export const PRESETS: PresetDef[] = [
  {
    id: 'dev-hq',
    name: 'Dev HQ',
    description: 'Vier Frontend- und vier Backend-Agenten um ein Kanban, dazu Reviewer und ein Orchestrator.',
    lanes: lanes([...squad('Frontend', 0), ...squad('Backend', 3), { role: 'Reviewers', col: 6, row: 0 }, { role: 'Reviewers', col: 6, row: 1 }]),
    extras: ['kanban', 'orchestrator']
  },
  {
    id: 'sprint-room',
    name: 'Sprint Room',
    description: 'Zwei Builder je Seite eines Kanban, briefed von einem Orchestrator.',
    lanes: lanes([...squad('Frontend', 0, 2), ...squad('Backend', 2, 2)]),
    extras: ['kanban', 'orchestrator']
  },
  {
    id: 'web-studio',
    name: 'Web Studio',
    description: 'Zwei Designer, drei Frontend-Agenten und eine localhost-Vorschau.',
    lanes: lanes([...squad('Design', 0, 2), ...squad('Frontend', 2, 3)]),
    extras: ['preview', 'orchestrator']
  },
  {
    id: 'ship-it',
    name: 'Ship It',
    description: 'Builder und Tester links, Backend und Reviewer rechts, Kanban in der Mitte.',
    lanes: lanes([...squad('Frontend', 0, 2), ...squad('Testers', 0, 2), ...squad('Backend', 3, 2), ...squad('Reviewers', 3, 2)]),
    extras: ['kanban', 'orchestrator']
  },
  {
    id: 'bug-hunt',
    name: 'Bug Hunt',
    description: 'Drei Tester und zwei Reviewer um ein Triage-Kanban.',
    lanes: lanes([...squad('Testers', 0, 3), ...squad('Reviewers', 2, 2)]),
    extras: ['kanban']
  },
  { id: 'pair', name: 'Pair', description: 'Eine Gruppe aus zwei Agenten.', lanes: lanes([{ role: 'General', col: 0, row: 0 }, { role: 'General', col: 1, row: 0 }]) },
  { id: 'trio', name: 'Trio', description: 'Eine Gruppe aus drei Agenten.', lanes: lanes([{ role: 'General', col: 0, row: 0 }, { role: 'General', col: 1, row: 0 }, { role: 'General', col: 2, row: 0 }]) },
  { id: 'squad-4', name: 'Squad of Four', description: 'Eine Gruppe aus vier Agenten.', lanes: lanes(squad('General', 0, 4)) },
  { id: 'squads-2', name: 'Two Squads', description: 'Zwei Gruppen aus je vier Agenten.', lanes: lanes([...squad('General', 0, 4), ...squad('General', 2, 4)]) },
  { id: 'squads-3', name: 'Three Squads', description: 'Drei Gruppen aus je vier Agenten.', lanes: lanes([...squad('General', 0, 4), ...squad('General', 2, 4), ...squad('General', 4, 4)]) },
  { id: 'squads-4', name: 'Four Squads', description: 'Sechzehn Konsolen in vier Gruppen.', lanes: lanes([...squad('General', 0, 4), ...squad('General', 2, 4), ...squad('General', 4, 4), ...squad('General', 6, 4)]) },
  { id: 'squad-board', name: 'Squad and Board', description: 'Vier Agenten neben einem leeren Kanban.', lanes: lanes(squad('General', 0, 4)), extras: ['kanban'] },
  { id: 'squad-preview', name: 'Squad and Preview', description: 'Vier Agenten neben einer localhost-Vorschau.', lanes: lanes(squad('General', 0, 4)), extras: ['preview'] },
  { id: 'briefed-squad', name: 'Briefed Squad', description: 'Vier Agenten unter einem Orchestrator.', lanes: lanes(squad('General', 0, 4)), extras: ['orchestrator'] },
  { id: 'feature-squad', name: 'Feature Squad', description: 'Zwei Frontend- und zwei Backend-Agenten.', lanes: lanes([...squad('Frontend', 0, 2), ...squad('Backend', 1, 2)]) },
  { id: 'review-panel', name: 'Review Panel', description: 'Drei Reviewer auf derselben Änderung.', lanes: lanes(squad('Reviewers', 0, 3)) },
  { id: 'security-sweep', name: 'Security Sweep', description: 'Zwei Security-Agenten und zwei Reviewer.', lanes: lanes([...squad('Security', 0, 2), ...squad('Reviewers', 1, 2)]) },
  { id: 'docs-sprint', name: 'Docs Sprint', description: 'Drei Autoren für Dokumentation.', lanes: lanes(squad('Docs', 0, 3)) }
]
