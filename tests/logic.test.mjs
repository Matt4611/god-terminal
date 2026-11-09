import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync } from 'node:fs'
import { build } from 'esbuild'

mkdirSync('tests/.build', { recursive: true })
await build({
  entryPoints: ['src/shared/parser.ts', 'src/shared/status.ts'],
  bundle: true,
  format: 'esm',
  outdir: 'tests/.build',
  platform: 'node',
  logLevel: 'silent'
})
const { parseCommand, riskOf } = await import('./.build/parser.js')
const { deriveStatus, detectNeedsYou, stripAnsi } = await import('./.build/status.js')

const ctx = {
  consoles: [
    { id: 'c1', name: 'Otto', agentName: 'Claude Code', status: 'READY' },
    { id: 'c2', name: 'Dax', agentName: 'Codex', status: 'WORKING' }
  ],
  groups: [{ id: 'g1', name: 'Frontend 1' }],
  workspaceCount: 2,
  currentWorkspace: 0,
  presets: [{ id: 'dev-hq', name: 'Dev HQ' }],
  orchestrators: []
}

test('spawn parses count and agent', () => {
  const r = parseCommand('spawn 4 codex', ctx)
  assert.equal(r.kind, 'action')
  assert.equal(r.action, 'spawn')
  assert.equal(r.args.count, 4)
  assert.equal(r.args.agentQuery, 'codex')
})

test('mention targets exactly one console', () => {
  const r = parseCommand('@Otto fix the login', ctx)
  assert.equal(r.kind, 'order')
  assert.deepEqual(r.targets, ['c1'])
  assert.equal(r.text, 'fix the login')
})

test('panels, git, presets and groups parse', () => {
  assert.equal(parseCommand('open documents', ctx).args.panel, 'documents')
  assert.equal(parseCommand('commit and push', ctx).args.op, 'commit-push')
  assert.equal(parseCommand('deploy preset Dev HQ', ctx).args.id, 'dev-hq')
  assert.equal(parseCommand('connect group 1 to the orchestrator', ctx).args.groupIndex, 0)
})

test('note with text', () => {
  const r = parseCommand('add a note that says ship on friday', ctx)
  assert.equal(r.kind, 'action')
  assert.equal(r.args.node, 'note')
  assert.equal(r.args.text, 'ship on friday')
})

test('free text goes to the Main Brain', () => {
  assert.equal(parseCommand('x'.repeat(700), ctx).kind, 'planner')
  assert.equal(parseCommand('what is the crew doing?', ctx).kind, 'planner')
  assert.equal(parseCommand('@all run the tests', ctx).targets.length, 2)
})

test('risky orders are detected', () => {
  assert.equal(riskOf('please sudo rm -rf /'), 'sudo')
  assert.equal(riskOf('npm test'), null)
})

test('status heuristics', () => {
  assert.match(detectNeedsYou('Do you want to proceed? (y/n)') ?? '', /proceed/i)
  assert.equal(deriveStatus({ tail: 'Do you want to proceed?', sinceData: 4000, started: true }).status, 'NEEDS YOU')
  assert.equal(deriveStatus({ tail: 'error: build failed', sinceData: 4000, started: true }).status, 'ERROR')
  assert.equal(deriveStatus({ tail: 'C:\\repo>', sinceData: 4000, started: true }).status, 'READY')
  assert.equal(deriveStatus({ tail: 'random', sinceData: 100, started: true }).status, 'WORKING')
  assert.equal(deriveStatus({ tail: '', sinceData: 4000, started: false }).status, 'STARTING')
})

test('ansi stripping keeps text', () => {
  assert.equal(stripAnsi('\u001b[31mred\u001b[0m text'), 'red text')
})
