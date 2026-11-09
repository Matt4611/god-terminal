import type { AgentStatus } from '@shared/types'
import { stripAnsi } from '@shared/status'

export interface ConsoleHandle {
  nodeId: string
  write: (data: string) => void
  status: () => AgentStatus
  tail: () => string
  restart: () => void
}

const handles = new Map<string, ConsoleHandle>()
const pending = new Map<string, string[]>()
const waiters = new Map<string, ReturnType<typeof setTimeout>>()

export function registerConsole(handle: ConsoleHandle): () => void {
  handles.set(handle.nodeId, handle)
  const queued = pending.get(handle.nodeId)
  if (queued?.length) {
    pending.delete(handle.nodeId)
    for (const text of queued) sendOrder(handle.nodeId, text)
  }
  return () => {
    if (handles.get(handle.nodeId) === handle) handles.delete(handle.nodeId)
  }
}

export const getHandle = (id: string): ConsoleHandle | undefined => handles.get(id)
export const allHandles = (): ConsoleHandle[] => [...handles.values()]

/** Type the text, then submit it as a separate keystroke. */
export function sendOrder(id: string, text: string): boolean {
  const h = handles.get(id)
  if (!h) return false
  const status = h.status()
  if (status === 'NEEDS YOU') {
    pending.set(id, [...(pending.get(id) ?? []), text])
    if (!waiters.has(id)) {
      const timer = setTimeout(() => {
        const queue = pending.get(id) ?? []
        pending.delete(id)
        waiters.delete(id)
        const hh = handles.get(id)
        if (hh && queue.length && hh.status() !== 'NEEDS YOU') {
          for (const t of queue) directSend(hh, t)
        }
      }, 60000)
      waiters.set(id, timer)
    }
    return false
  }
  directSend(h, text)
  return true
}

function directSend(h: ConsoleHandle, text: string): void {
  h.write(text)
  setTimeout(() => h.write('\r'), 220)
}

/** Drop a queued order when the agent becomes ready. */
export function flushQueue(id: string): void {
  const h = handles.get(id)
  const queue = pending.get(id)
  if (!h || !queue?.length) return
  if (h.status() === 'NEEDS YOU') return
  pending.delete(id)
  const t = waiters.get(id)
  if (t) clearTimeout(t)
  waiters.delete(id)
  for (const text of queue) directSend(h, text)
}

export function digest(id: string, max = 4000): string {
  const tail = stripAnsi(handles.get(id)?.tail() ?? '').trim()
  if (!tail) return ''
  const lines = tail.split('\n').map((l) => l.trimEnd())
  while (lines.length && !lines[0].trim()) lines.shift()
  return lines.join('\n').slice(-max)
}

export function lastLines(id: string, n = 6): string {
  const tail = stripAnsi(handles.get(id)?.tail() ?? '').trim()
  return tail.split('\n').slice(-n).join('\n')
}

export function killAllConsoles(): void {
  for (const h of handles.values()) h.write('\x03')
}
