import * as pty from '@lydell/node-pty'

const shell = process.env.ComSpec || 'cmd.exe'
const proc = pty.spawn(shell, [], {
  name: 'xterm-256color',
  cols: 80,
  rows: 24,
  cwd: process.cwd(),
  env: { ...process.env, TERM: 'xterm-256color' }
})
let out = ''
proc.onData((d) => {
  out += d
  process.stdout.write(d)
})
setTimeout(() => proc.write('echo HIVE_PTY_OK\r'), 400)
setTimeout(() => {
  proc.kill()
  const ok = out.includes('HIVE_PTY_OK')
  console.log(`\nPTY:${ok ? 'OK' : 'FAIL'} (${out.length} bytes)`)
  process.exit(ok ? 0 : 1)
}, 2600)
