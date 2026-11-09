import type { AgentStatus } from './types'

const ANSI = /\x1b\[[0-9;?]*[ -/]*[@-~]|\x1b\][^\x07]*\x07|\x1b[@-_]/g

export const stripAnsi = (s: string): string =>
  s.replace(ANSI, '').replace(/\r(?!\n)/g, '\n')

/** Prompts an agent CLI shows when it blocks on the human. */
const NEEDS_PATTERNS: RegExp[] = [
  /do you want to (proceed|allow|continue|trust|run|make)/i,
  /would you like to (proceed|allow|continue)/i,
  /allow .{0,80}(to|access|run|use)/i,
  /permission (required|needed|to)/i,
  /trust (the )?(files|folder|this|all)/i,
  /\[y\/n\]/i,
  /\(y\/n\)/i,
  /press (enter|any key) to (continue|confirm)/i,
  /❯\s*\d\.\s/,
  /^\s*\d\.\s+(yes|no)\b/im,
  /waiting for (your )?(input|approval|confirmation)/i,
  /approve (this|the) (action|command|edit)/i
]

const READY_PATTERNS: RegExp[] = [
  /(^|\n)\s*[›❯>]\s*$/,
  /(^|\n)\s*\$\s*$/,
  /(^|\n)\s*[A-Za-z]:\\[^>\n]*>\s*$/,
  /ready for (your )?(next|input|prompt)/i,
  /what would you like/i
]

const ERROR_PATTERNS: RegExp[] = [
  /^\s*(error|fatal|exception|traceback)\b/im,
  /\b(command not found|is not recognized as an internal)/i,
  /\b(failed|failure)\b.{0,60}(exit|command|build|test)/i
]

export function detectNeedsYou(tail: string): string | null {
  const text = stripAnsi(tail)
  const lines = text.trimEnd().split('\n').slice(-14).join('\n')
  for (const re of NEEDS_PATTERNS) {
    const m = lines.match(re)
    if (m) return m[0].slice(0, 140)
  }
  return null
}

export function detectError(tail: string): boolean {
  const text = stripAnsi(tail).trimEnd()
  const lines = text.split('\n').slice(-4).join('\n')
  return ERROR_PATTERNS.some((re) => re.test(lines))
}

export function looksReady(tail: string): boolean {
  const text = stripAnsi(tail).trimEnd()
  return READY_PATTERNS.some((re) => re.test(text))
}

/**
 * Output-based status, the fallback used when the CLI has no hooks.
 * `sinceData` is ms since the last byte arrived.
 */
export function deriveStatus(opts: {
  tail: string
  sinceData: number
  started: boolean
  paused?: boolean
  exited?: boolean
}): { status: AgentStatus; detail?: string } {
  if (opts.exited) return { status: 'DONE' }
  if (opts.paused) return { status: 'PAUSED' }
  if (!opts.started) return { status: 'STARTING' }
  const needs = detectNeedsYou(opts.tail)
  if (needs && opts.sinceData > 600) return { status: 'NEEDS YOU', detail: needs }
  if (opts.sinceData < 900) return { status: 'WORKING' }
  if (detectError(opts.tail)) return { status: 'ERROR' }
  if (looksReady(opts.tail)) return { status: 'READY' }
  return { status: 'IDLE' }
}

/** Console statuses that can accept a typed order right now. */
export const canReceive = (s: AgentStatus): boolean =>
  s === 'READY' || s === 'IDLE' || s === 'WORKING' || s === 'RUNNING'
