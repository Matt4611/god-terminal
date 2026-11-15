import { spawnSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import process from 'node:process'

const quick = process.argv.includes('--quick')

const steps = [
  { name: 'Typecheck', command: 'npm', args: ['run', 'typecheck'] },
  { name: 'Tests', command: 'npm', args: ['test'] },
  { name: 'Build', command: 'npm', args: ['run', 'build'] }
]

if (!quick) {
  steps.push(
    {
      name: 'Director UI smoke',
      command: 'npx',
      args: ['electron', '.', '--smoke', '--demo', '--smoke-director'],
      file: 'smoke-director.png',
      validate: (out) => /SMOKE_DIRECTOR .*"toolButtons":18.*"railWidth":46.*"director":true.*"hasGem":true.*"links":2.*"before":2.*"off":1.*"on":2.*"wires":2.*"railClear":true.*"teamClear":true.*"dockInside":true.*"directorClear":true.*"noOrb":true.*"overflow":false/.test(out) &&
        /SMOKE_DIRECTOR_COMPACT .*"width":1080.*"height":680.*"toolButtons":18.*"buttonsFit":true.*"railWidth":46.*"railClear":true.*"teamHidden":true.*"dockInside":true.*"directorClear":true.*"overflow":false/.test(out)
    },
    {
      name: 'IPC guard smoke',
      command: 'npx',
      args: ['electron', '.', '--smoke', '--demo', '--smoke-guard'],
      file: 'smoke-guard.png',
      validate: (out) => /SMOKE_GUARD .*"allowed":"allowed".*"blocked":"blocked".*"external":"blocked"/.test(out)
    }
  )
}

const started = Date.now()
let failed = false

for (const step of steps) {
  const before = Date.now()
  if (step.file) rmSync(step.file, { force: true })
  process.stdout.write(`\n▶ ${step.name}\n`)

  const res = spawnSync(step.command, step.args, {
    encoding: 'utf8',
    shell: process.platform === 'win32',
    timeout: 180000,
    env: { ...process.env, FORCE_COLOR: '1' }
  })

  if (res.stdout) process.stdout.write(res.stdout)
  if (res.stderr) process.stderr.write(res.stderr)

  const out = `${res.stdout ?? ''}${res.stderr ?? ''}`
  const statusOk = res.status === 0
  const fileOk = !step.file || existsSync(step.file)
  const checkOk = !step.validate || step.validate(out)
  const seconds = ((Date.now() - before) / 1000).toFixed(1)

  if (statusOk && fileOk && checkOk) {
    process.stdout.write(`✔ ${step.name} (${seconds}s)\n`)
  } else {
    failed = true
    const reason = !statusOk
      ? `exit ${res.status ?? 'timeout'}${res.error ? ` (${res.error.message})` : ''}`
      : !fileOk
        ? `missing ${step.file}`
        : 'unexpected smoke output'
    process.stderr.write(`✖ ${step.name} (${seconds}s): ${reason}\n`)
    break
  }
}

const total = ((Date.now() - started) / 1000).toFixed(1)
if (failed) {
  process.stderr.write(`\nverify failed after ${total}s\n`)
  process.exitCode = 1
} else {
  process.stdout.write(`\nverify passed (${total}s)${quick ? ' — quick mode' : ''}\n`)
}
