import * as pty from '@lydell/node-pty'
import { execFileSync } from 'node:child_process'
import { existsSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export interface CreateOpts {
  id: string
  cwd: string
  command: string
  args: string[]
  env?: Record<string, string>
}

const sessions = new Map<string, pty.IPty>()

const cleanEnv = (extra?: Record<string, string>): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(process.env)) if (typeof v === 'string') out[k] = v
  // Never inherit a parent agent's private variables (same rule the app follows).
  for (const k of Object.keys(out)) if (k.startsWith('CLAUDE_CODE_')) delete out[k]
  return {
    ...out,
    ...(extra ?? {}),
    TERM: 'xterm-256color',
    COLORTERM: 'truecolor',
    TERM_PROGRAM: 'God Terminal'
  }
}

function findOnPath(command: string): string | null {
  if (!command) return null
  if (existsSync(command)) return command
  try {
    const out = execFileSync('where', [command], { encoding: 'utf8', windowsHide: true })
    const first = out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0]
    return first ?? null
  } catch {
    return null
  }
}

const quote = (s: string) => (/[\s"]/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s)

function resolve(opts: CreateOpts): { file: string; args: string[] } {
  const isWin = process.platform === 'win32'
  let file = opts.command
  let args = [...opts.args]

  if (!opts.command) {
    file = isWin ? process.env.ComSpec || 'cmd.exe' : process.env.SHELL || '/bin/bash'
    return { file, args }
  }

  if (isWin) {
    const found = findOnPath(opts.command)
    if (found && /\.(cmd|bat)$/i.test(found)) {
      // npm-installed CLIs are .cmd shims; cmd.exe is the only reliable launcher.
      const wrap = join(tmpdir(), `god-terminal-${opts.id.replace(/[^\w-]/g, '')}.cmd`)
      writeFileSync(wrap, `@echo off\r\n"${found}" ${args.map(quote).join(' ')}\r\n`, 'utf8')
      return { file: process.env.ComSpec || 'cmd.exe', args: ['/d', '/c', wrap] }
    }
    if (found) return { file: found, args }
  }
  return { file, args }
}

export function create(opts: CreateOpts): { pid: number; shell: string } {
  kill(opts.id)
  const { file, args } = resolve(opts)
  const proc = pty.spawn(file, args, {
    name: 'xterm-256color',
    cols: 100,
    rows: 30,
    cwd: opts.cwd,
    env: cleanEnv(opts.env)
  })
  sessions.set(opts.id, proc)
  return { pid: proc.pid, shell: `${file} ${args.join(' ')}`.trim() }
}

export function write(id: string, data: string): void {
  sessions.get(id)?.write(data)
}

export function resize(id: string, cols: number, rows: number): void {
  const p = sessions.get(id)
  if (!p) return
  try {
    p.resize(Math.max(2, cols), Math.max(2, rows))
  } catch {
    /* the process may already be gone */
  }
}

export function kill(id: string): void {
  const p = sessions.get(id)
  if (!p) return
  sessions.delete(id)
  try {
    p.kill()
  } catch {
    /* ignore */
  }
}

export function killAll(): void {
  for (const id of [...sessions.keys()]) kill(id)
}

export const list = (): string[] => [...sessions.keys()]

export function get(id: string): pty.IPty | undefined {
  return sessions.get(id)
}
