import { realpathSync } from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import type { PersistedState } from '../shared/types'
import * as storage from './storage'

/**
 * Paths the renderer may touch. Everything else is rejected by the IPC layer.
 * Roots come from the persisted boards, native dialogs, and demo/smoke runs;
 * a compromised renderer cannot widen them through `store:save`.
 */
const extra = new Set<string>()
const isWin = process.platform === 'win32'

function canonical(p: string): string {
  let abs = resolve(p)
  try {
    abs = realpathSync(abs)
  } catch {
    try {
      abs = join(realpathSync(dirname(abs)), basename(abs))
    } catch {
      /* the path may be new; its resolved parent is still checked */
    }
  }
  return isWin ? abs.toLowerCase() : abs
}

function contains(root: string, target: string): boolean {
  const rel = relative(root, target)
  return rel === '' || (rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel))
}

function addNodePaths(nodes: readonly unknown[] | undefined, set: Set<string>): void {
  for (const node of nodes ?? []) {
    const p = (node as { path?: unknown } | null)?.path
    if (typeof p === 'string' && p) set.add(canonical(p))
  }
}

function roots(): string[] {
  const set = new Set<string>()
  // The demo and smoke boards are seeded from the current directory and are not persisted.
  if (process.argv.includes('--demo') || process.argv.includes('--smoke')) {
    set.add(canonical(process.cwd()))
  }
  for (const p of extra) set.add(canonical(p))

  const state = storage.load()
  if (state) {
    for (const repo of state.repos ?? []) {
      if (typeof repo?.path === 'string' && repo.path) set.add(canonical(repo.path))
      for (const ws of repo?.workspaces ?? []) addNodePaths(ws.board?.nodes, set)
    }
    for (const preset of state.savedPresets ?? []) addNodePaths(preset.nodes, set)
  }
  return [...set]
}

/** Register a path the user explicitly chose in a native dialog. */
export function allowPath(p: unknown): void {
  if (typeof p !== 'string' || !p) return
  extra.add(resolve(p))
}

export function isAllowedPath(p: string): boolean {
  if (typeof p !== 'string' || !p) return false
  const target = canonical(p)
  return roots().some((root) => contains(root, target))
}

/** Resolve an IPC path and reject anything outside the known workspace roots. */
export function guardPath(p: string): string {
  if (typeof p !== 'string' || !p) throw new Error('Blocked: missing path')
  const abs = resolve(p)
  if (!isAllowedPath(abs)) throw new Error(`Blocked: ${basename(abs)} is outside the allowed workspace`)
  return abs
}

/** Validate a state document before it is written, so it cannot widen future roots. */
export function guardState(state: PersistedState): void {
  if (!state || !Array.isArray(state.repos)) throw new Error('Blocked: invalid state')
  const allowed = roots()
  const check = (p: unknown): void => {
    if (typeof p !== 'string' || !p) return
    const target = canonical(p)
    if (!allowed.some((root) => contains(root, target))) {
      throw new Error(`Blocked: state references ${basename(p)} outside the allowed workspace`)
    }
  }

  for (const repo of state.repos) {
    check(repo?.path)
    for (const ws of repo?.workspaces ?? []) {
      for (const node of ws.board?.nodes ?? []) check((node as { path?: unknown }).path)
    }
  }
  for (const preset of state.savedPresets ?? []) {
    for (const node of preset.nodes ?? []) check((node as { path?: unknown }).path)
  }
}
