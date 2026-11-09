import { app } from 'electron'
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { PersistedState } from '../shared/types'

const dir = () => app.getPath('userData')
const file = () => join(dir(), 'state.json')

/** Boards from builds before the rename lived under the old app name. */
export function migrateLegacy(): void {
  try {
    if (existsSync(file())) return
    const legacy = join(app.getPath('appData'), 'Hiveboard', 'state.json')
    if (!existsSync(legacy)) return
    mkdirSync(dir(), { recursive: true })
    copyFileSync(legacy, file())
  } catch (err) {
    console.error('state migration failed', err)
  }
}

export function load(): PersistedState | null {
  try {
    const raw = readFileSync(file(), 'utf8')
    const json = JSON.parse(raw) as PersistedState
    if (!json || typeof json !== 'object' || !Array.isArray(json.repos)) return null
    return json
  } catch {
    return null
  }
}

export function save(state: PersistedState): void {
  try {
    mkdirSync(dir(), { recursive: true })
    const tmp = `${file()}.tmp`
    writeFileSync(tmp, JSON.stringify(state, null, 2), 'utf8')
    renameSync(tmp, file())
  } catch (err) {
    console.error('state save failed', err)
  }
}

export const dataDir = (): string => dir()
