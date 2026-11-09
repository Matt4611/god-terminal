import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { GitCommit, GitStatus } from '../shared/types'

const run = promisify(execFile)

async function git(cwd: string, args: string[], timeout = 20000): Promise<string> {
  const { stdout } = await run('git', args, {
    cwd,
    timeout,
    windowsHide: true,
    maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }
  })
  return stdout
}

export async function status(cwd: string): Promise<GitStatus> {
  const empty: GitStatus = { branch: '', ahead: 0, behind: 0, files: [], clean: true, hasRemote: false, repo: false }
  try {
    const out = await git(cwd, ['status', '--porcelain=v1', '-b'])
    const lines = out.split(/\r?\n/).filter(Boolean)
    const head = lines[0] ?? ''
    const branch = head.replace('## ', '').split('...')[0].replace('No commits yet on ', '').trim()
    const ahead = Number(/ahead (\d+)/.exec(head)?.[1] ?? 0)
    const behind = Number(/behind (\d+)/.exec(head)?.[1] ?? 0)
    const files = lines.slice(1).map((l) => ({
      index: l[0] ?? ' ',
      worktree: l[1] ?? ' ',
      path: l.slice(3).trim()
    }))
    let hasRemote = false
    try {
      hasRemote = (await git(cwd, ['remote'])).trim().length > 0
    } catch {
      hasRemote = false
    }
    return { branch, ahead, behind, files, clean: files.length === 0, hasRemote, repo: true }
  } catch {
    return empty
  }
}

export async function commit(cwd: string, message: string, files: string[]): Promise<string> {
  if (files.length) await git(cwd, ['add', '--', ...files])
  else await git(cwd, ['add', '-A'])
  const out = await git(cwd, ['commit', '-m', message])
  return out.trim()
}

export async function push(cwd: string): Promise<string> {
  const out = await git(cwd, ['push'], 120000)
  return (out || 'pushed').trim()
}

export async function pull(cwd: string): Promise<string> {
  const out = await git(cwd, ['pull', '--ff-only'], 120000)
  return (out || 'pulled').trim()
}

export async function branches(cwd: string): Promise<string[]> {
  const out = await git(cwd, ['branch', '--format=%(refname:short)'])
  return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
}

export async function checkout(cwd: string, branch: string): Promise<void> {
  await git(cwd, ['checkout', branch])
}

export async function createBranch(cwd: string, branch: string): Promise<void> {
  await git(cwd, ['checkout', '-b', branch])
}

export async function log(cwd: string): Promise<GitCommit[]> {
  try {
    const out = await git(cwd, ['log', '-n', '100', '--pretty=format:%h%x1f%s%x1f%cI%x1f%an'])
    return out
      .split(/\r?\n/)
      .filter(Boolean)
      .map((l) => {
        const [hash, message, date, author] = l.split('\x1f')
        return { hash, message, date, author }
      })
  } catch {
    return []
  }
}

export async function init(cwd: string): Promise<void> {
  await git(cwd, ['init', '-b', 'main'])
}
