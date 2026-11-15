"use strict";
const electron = require("electron");
const node_child_process = require("node:child_process");
const node_fs = require("node:fs");
const node_os = require("node:os");
const node_path = require("node:path");
const node_util = require("node:util");
const pty = require("@lydell/node-pty");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const pty__namespace = /* @__PURE__ */ _interopNamespaceDefault(pty);
const run$1 = node_util.promisify(node_child_process.execFile);
async function git(cwd, args, timeout = 2e4) {
  const { stdout } = await run$1("git", args, {
    cwd,
    timeout,
    windowsHide: true,
    maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" }
  });
  return stdout;
}
async function status(cwd) {
  const empty = { branch: "", ahead: 0, behind: 0, files: [], clean: true, hasRemote: false, repo: false };
  try {
    const out = await git(cwd, ["status", "--porcelain=v1", "-b"]);
    const lines = out.split(/\r?\n/).filter(Boolean);
    const head = lines[0] ?? "";
    const branch = head.replace("## ", "").split("...")[0].replace("No commits yet on ", "").trim();
    const ahead = Number(/ahead (\d+)/.exec(head)?.[1] ?? 0);
    const behind = Number(/behind (\d+)/.exec(head)?.[1] ?? 0);
    const files = lines.slice(1).map((l) => ({
      index: l[0] ?? " ",
      worktree: l[1] ?? " ",
      path: l.slice(3).trim()
    }));
    let hasRemote = false;
    try {
      hasRemote = (await git(cwd, ["remote"])).trim().length > 0;
    } catch {
      hasRemote = false;
    }
    return { branch, ahead, behind, files, clean: files.length === 0, hasRemote, repo: true };
  } catch {
    return empty;
  }
}
async function commit(cwd, message, files) {
  if (files.length) await git(cwd, ["add", "--", ...files]);
  else await git(cwd, ["add", "-A"]);
  const out = await git(cwd, ["commit", "-m", message]);
  return out.trim();
}
async function push(cwd) {
  const out = await git(cwd, ["push"], 12e4);
  return (out || "pushed").trim();
}
async function pull(cwd) {
  const out = await git(cwd, ["pull", "--ff-only"], 12e4);
  return (out || "pulled").trim();
}
async function branches(cwd) {
  const out = await git(cwd, ["branch", "--format=%(refname:short)"]);
  return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}
async function checkout(cwd, branch) {
  await git(cwd, ["checkout", branch]);
}
async function createBranch(cwd, branch) {
  await git(cwd, ["checkout", "-b", branch]);
}
async function log(cwd) {
  try {
    const out = await git(cwd, ["log", "-n", "100", "--pretty=format:%h%x1f%s%x1f%cI%x1f%an"]);
    return out.split(/\r?\n/).filter(Boolean).map((l) => {
      const [hash, message, date, author] = l.split("");
      return { hash, message, date, author };
    });
  } catch {
    return [];
  }
}
async function init(cwd) {
  await git(cwd, ["init", "-b", "main"]);
}
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_OLLAMA_MODEL = "gpt-oss:20b";
const DEFAULT_LMSTUDIO_URL = "http://127.0.0.1:1234/v1";
function ollamaBase(url = DEFAULT_OLLAMA_URL) {
  return (url || DEFAULT_OLLAMA_URL).trim().replace(/\/+$/, "");
}
function lmStudioBase(url = DEFAULT_LMSTUDIO_URL) {
  let base = (url || DEFAULT_LMSTUDIO_URL).trim().replace(/\/+$/, "");
  base = base.replace(/\/chat\/completions$/i, "").replace(/\/models$/i, "");
  if (!/\/v1$/i.test(base)) base += "/v1";
  return base;
}
async function models(url, provider = "ollama") {
  try {
    if (provider === "lmstudio") {
      const res2 = await fetch(`${lmStudioBase(url)}/models`, {
        signal: AbortSignal.timeout(4e3)
      });
      if (!res2.ok) return [];
      const json2 = await res2.json();
      const list2 = json2.data ?? json2.models ?? [];
      return list2.map((m) => m.id ?? m.name ?? "").filter((m) => Boolean(m));
    }
    const res = await fetch(`${ollamaBase(url)}/api/tags`, {
      signal: AbortSignal.timeout(4e3)
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.models ?? []).map((m) => m.name);
  } catch {
    return [];
  }
}
async function chat(opts) {
  const provider = opts.provider ?? "ollama";
  if (provider === "lmstudio") return lmStudioChat(opts);
  return ollamaChat(opts);
}
async function ollamaChat(opts) {
  const url = ollamaBase(opts.url);
  const model = opts.model || DEFAULT_OLLAMA_MODEL;
  try {
    const res = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model,
        messages: opts.messages,
        stream: false,
        ...opts.json ? { format: "json" } : {},
        options: { temperature: opts.temperature ?? 0.2 }
      }),
      signal: opts.signal ?? AbortSignal.timeout(12e4)
    });
    if (!res.ok) {
      return { ok: false, text: "", error: `Ollama ${res.status}: ${(await res.text()).slice(0, 300)}`, model };
    }
    const json = await res.json();
    if (json.error) return { ok: false, text: "", error: json.error, model };
    return { ok: true, text: json.message?.content ?? "", model };
  } catch (err) {
    return {
      ok: false,
      text: "",
      error: err instanceof Error ? `Ollama nicht erreichbar (${url}): ${err.message}` : "Ollama nicht erreichbar",
      model
    };
  }
}
async function lmStudioChat(opts) {
  const base = lmStudioBase(opts.url);
  const model = opts.model?.trim();
  if (!model) {
    return {
      ok: false,
      text: "",
      error: "Kein LM-Studio-Modell gewählt. Öffne Settings → Local models."
    };
  }
  const body = (jsonMode) => JSON.stringify({
    model,
    messages: opts.messages,
    stream: false,
    temperature: opts.temperature ?? 0.2,
    ...jsonMode ? { response_format: { type: "json_object" } } : {}
  });
  try {
    let res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body(Boolean(opts.json)),
      signal: opts.signal ?? AbortSignal.timeout(12e4)
    });
    if (!res.ok && opts.json) {
      res = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: body(false),
        signal: opts.signal ?? AbortSignal.timeout(12e4)
      });
    }
    if (!res.ok) {
      return {
        ok: false,
        text: "",
        error: `LM Studio ${res.status}: ${(await res.text()).slice(0, 300)}`,
        model
      };
    }
    const json = await res.json();
    if (json.error) {
      return {
        ok: false,
        text: "",
        error: typeof json.error === "string" ? json.error : json.error.message ?? "LM Studio error",
        model
      };
    }
    return { ok: true, text: json.choices?.[0]?.message?.content ?? "", model };
  } catch (err) {
    return {
      ok: false,
      text: "",
      error: err instanceof Error ? `LM Studio nicht erreichbar (${base}): ${err.message}` : "LM Studio nicht erreichbar",
      model
    };
  }
}
const sessions = /* @__PURE__ */ new Map();
const cleanEnv = (extra2) => {
  const out = {};
  for (const [k, v] of Object.entries(process.env)) if (typeof v === "string") out[k] = v;
  for (const k of Object.keys(out)) if (k.startsWith("CLAUDE_CODE_")) delete out[k];
  return {
    ...out,
    ...extra2 ?? {},
    TERM: "xterm-256color",
    COLORTERM: "truecolor",
    TERM_PROGRAM: "God Terminal"
  };
};
function findOnPath(command) {
  if (!command) return null;
  if (node_fs.existsSync(command)) return command;
  try {
    const out = node_child_process.execFileSync("where", [command], { encoding: "utf8", windowsHide: true });
    const first = out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0];
    return first ?? null;
  } catch {
    return null;
  }
}
const quote = (s) => /[\s"]/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
function resolve(opts) {
  const isWin2 = process.platform === "win32";
  let file2 = opts.command;
  let args = [...opts.args];
  if (!opts.command) {
    file2 = isWin2 ? process.env.ComSpec || "cmd.exe" : process.env.SHELL || "/bin/bash";
    return { file: file2, args };
  }
  if (isWin2) {
    const found = findOnPath(opts.command);
    if (found && /\.(cmd|bat)$/i.test(found)) {
      const wrap = node_path.join(node_os.tmpdir(), `god-terminal-${opts.id.replace(/[^\w-]/g, "")}.cmd`);
      node_fs.writeFileSync(wrap, `@echo off\r
"${found}" ${args.map(quote).join(" ")}\r
`, "utf8");
      return { file: process.env.ComSpec || "cmd.exe", args: ["/d", "/c", wrap] };
    }
    if (found) return { file: found, args };
  }
  return { file: file2, args };
}
function create(opts) {
  kill(opts.id);
  const { file: file2, args } = resolve(opts);
  const proc = pty__namespace.spawn(file2, args, {
    name: "xterm-256color",
    cols: 100,
    rows: 30,
    cwd: opts.cwd,
    env: cleanEnv(opts.env)
  });
  sessions.set(opts.id, proc);
  return { pid: proc.pid, shell: `${file2} ${args.join(" ")}`.trim() };
}
function write(id, data) {
  sessions.get(id)?.write(data);
}
function resize(id, cols, rows) {
  const p = sessions.get(id);
  if (!p) return;
  try {
    p.resize(Math.max(2, cols), Math.max(2, rows));
  } catch {
  }
}
function kill(id) {
  const p = sessions.get(id);
  if (!p) return;
  sessions.delete(id);
  try {
    p.kill();
  } catch {
  }
}
function killAll() {
  for (const id of [...sessions.keys()]) kill(id);
}
const list = () => [...sessions.keys()];
function get(id) {
  return sessions.get(id);
}
const dir = () => electron.app.getPath("userData");
const file = () => node_path.join(dir(), "state.json");
function migrateLegacy() {
  try {
    if (node_fs.existsSync(file())) return;
    const legacy = node_path.join(electron.app.getPath("appData"), "Hiveboard", "state.json");
    if (!node_fs.existsSync(legacy)) return;
    node_fs.mkdirSync(dir(), { recursive: true });
    node_fs.copyFileSync(legacy, file());
  } catch (err) {
    console.error("state migration failed", err);
  }
}
function load() {
  try {
    const raw = node_fs.readFileSync(file(), "utf8");
    const json = JSON.parse(raw);
    if (!json || typeof json !== "object" || !Array.isArray(json.repos)) return null;
    return json;
  } catch {
    return null;
  }
}
function save(state) {
  try {
    node_fs.mkdirSync(dir(), { recursive: true });
    const tmp = `${file()}.tmp`;
    node_fs.writeFileSync(tmp, JSON.stringify(state, null, 2), "utf8");
    node_fs.renameSync(tmp, file());
  } catch (err) {
    console.error("state save failed", err);
  }
}
const dataDir = () => dir();
const extra = /* @__PURE__ */ new Set();
const isWin = process.platform === "win32";
function canonical(p) {
  let abs = node_path.resolve(p);
  try {
    abs = node_fs.realpathSync(abs);
  } catch {
    try {
      abs = node_path.join(node_fs.realpathSync(node_path.dirname(abs)), node_path.basename(abs));
    } catch {
    }
  }
  return isWin ? abs.toLowerCase() : abs;
}
function contains(root, target) {
  const rel = node_path.relative(root, target);
  return rel === "" || rel !== ".." && !rel.startsWith(`..${node_path.sep}`) && !node_path.isAbsolute(rel);
}
function addNodePaths(nodes, set) {
  for (const node of nodes ?? []) {
    const p = node?.path;
    if (typeof p === "string" && p) set.add(canonical(p));
  }
}
function roots() {
  const set = /* @__PURE__ */ new Set();
  if (process.argv.includes("--demo") || process.argv.includes("--smoke")) {
    set.add(canonical(process.cwd()));
  }
  for (const p of extra) set.add(canonical(p));
  const state = load();
  if (state) {
    for (const repo of state.repos ?? []) {
      if (typeof repo?.path === "string" && repo.path) set.add(canonical(repo.path));
      for (const ws of repo?.workspaces ?? []) addNodePaths(ws.board?.nodes, set);
    }
    for (const preset of state.savedPresets ?? []) addNodePaths(preset.nodes, set);
  }
  return [...set];
}
function allowPath(p) {
  if (typeof p !== "string" || !p) return;
  extra.add(node_path.resolve(p));
}
function isAllowedPath(p) {
  if (typeof p !== "string" || !p) return false;
  const target = canonical(p);
  return roots().some((root) => contains(root, target));
}
function guardPath(p) {
  if (typeof p !== "string" || !p) throw new Error("Blocked: missing path");
  const abs = node_path.resolve(p);
  if (!isAllowedPath(abs)) throw new Error(`Blocked: ${node_path.basename(abs)} is outside the allowed workspace`);
  return abs;
}
function guardState(state) {
  if (!state || !Array.isArray(state.repos)) throw new Error("Blocked: invalid state");
  const allowed = roots();
  const check = (p) => {
    if (typeof p !== "string" || !p) return;
    const target = canonical(p);
    if (!allowed.some((root) => contains(root, target))) {
      throw new Error(`Blocked: state references ${node_path.basename(p)} outside the allowed workspace`);
    }
  };
  for (const repo of state.repos) {
    check(repo?.path);
    for (const ws of repo?.workspaces ?? []) {
      for (const node of ws.board?.nodes ?? []) check(node.path);
    }
  }
  for (const preset of state.savedPresets ?? []) {
    for (const node of preset.nodes ?? []) check(node.path);
  }
}
const run = node_util.promisify(node_child_process.execFile);
process.platform === "win32";
const NOISE = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  "build",
  "dist",
  "out",
  ".next",
  "venv",
  ".venv",
  "target",
  "vendor",
  "coverage",
  "DerivedData",
  "Pods",
  ".cache",
  "__pycache__",
  ".turbo",
  ".gradle",
  ".idea",
  "release",
  "bin",
  "obj"
]);
const KEEP_DOT = /* @__PURE__ */ new Set([".gitignore", ".env.example", ".editorconfig", ".claude", ".github"]);
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1560,
    height: 1e3,
    minWidth: 1080,
    minHeight: 680,
    backgroundColor: "#0b0d10",
    show: false,
    autoHideMenuBar: true,
    title: "God Terminal",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#080a0e",
      symbolColor: "#f1f4f9",
      height: 58
    },
    webPreferences: {
      preload: node_path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      webviewTag: true,
      spellcheck: false
    }
  });
  mainWindow.webContents.on("will-attach-webview", (event, webPreferences, params) => {
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
    webPreferences.preload = void 0;
    if (!/^https?:\/\//i.test(String(params.src ?? ""))) event.preventDefault();
  });
  mainWindow.once("ready-to-show", () => mainWindow?.show());
  mainWindow.webContents.session.setPermissionRequestHandler((_wc, permission, cb) => {
    cb(["media", "clipboard-read", "clipboard-sanitized-write", "fullscreen", "notifications"].includes(permission));
  });
  if (process.argv.includes("--smoke")) {
    mainWindow.webContents.once("did-finish-load", () => {
      mainWindow.webContents.setBackgroundThrottling(false);
      setTimeout(async () => {
        const shot = async (file2) => {
          const img = await mainWindow.webContents.capturePage();
          await node_fs.promises.writeFile(node_path.join(process.cwd(), file2), img.toPNG());
          console.log(`${file2} written`);
        };
        try {
          if (process.argv.includes("--smoke-brain-chat")) {
            const chat2 = await mainWindow.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="open-brain"]')?.click()
              await new Promise((r) => setTimeout(r, 900))
              const input = document.querySelector('[data-testid="brain-input"]')
              if (!input) return JSON.stringify({ error: 'input not found' })
              const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
              setter?.call(input, 'Antworte nur mit dem Wort OK.')
              input.dispatchEvent(new Event('input', { bubbles: true }))
              input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
              const started = Date.now()
              while (Date.now() - started < 60000) {
                await new Promise((r) => setTimeout(r, 700))
                const replies = [...document.querySelectorAll('.main-brain-thread .msg-brain .msg-text')]
                  .map((n) => n.textContent ?? '')
                if (replies.length) {
                  return JSON.stringify({
                    replies,
                    busy: !!document.querySelector('.brain-typing'),
                    elapsed: Date.now() - started
                  })
                }
              }
              return JSON.stringify({ replies: [], error: 'timeout', busy: !!document.querySelector('.brain-typing') })
            })()`);
            console.log("SMOKE_BRAIN_CHAT", chat2);
            await shot("smoke-brain-chat.png");
          } else if (process.argv.includes("--smoke-brain")) {
            const opened = await mainWindow.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="open-brain"]')?.click()
              await new Promise((r) => setTimeout(r, 1200))
              const panel = document.querySelector('[data-testid="main-brain-thread"]')
              const input = document.querySelector('[data-testid="brain-input"]')
              return JSON.stringify({
                opened: !!panel,
                input: !!input,
                name: document.querySelector('.brain-strip-name')?.textContent ?? '',
                model: document.querySelector('.brain-model-btn')?.textContent ?? ''
              })
            })()`);
            console.log("SMOKE_BRAIN_OPEN", opened);
            await shot("smoke-brain.png");
            const ready = await mainWindow.webContents.executeJavaScript(`(async () => {
              await new Promise((r) => setTimeout(r, 500))
              return JSON.stringify({
                threadMessages: document.querySelectorAll('.main-brain-thread .msg').length,
                brainStrip: !!document.querySelector('.brain-strip'),
                rightRail: !!document.querySelector('.right-rail'),
                ringButtons: document.querySelectorAll('.ring-btn').length
              })
            })()`);
            console.log("SMOKE_BRAIN_READY", ready);
            await shot("smoke-brain-board.png");
          } else if (process.argv.includes("--smoke-team")) {
            const opened = await mainWindow.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="open-team"]')?.click()
              await new Promise((r) => setTimeout(r, 800))
              const c = document.querySelector('[data-testid="team-composer"]')
              return JSON.stringify({ opened: !!c, slots: c ? c.querySelectorAll('.tc-slot').length : 0 })
            })()`);
            console.log("SMOKE_TEAM_OPEN", opened);
            await shot("smoke-team.png");
            const launched = await mainWindow.webContents.executeJavaScript(`(async () => {
              document.querySelector('[data-testid="launch-team"]')?.click()
              await new Promise((r) => setTimeout(r, 2200))
              return JSON.stringify({
                consoles: document.querySelectorAll('.node-console').length,
                groups: document.querySelectorAll('.group-box').length,
                nodes: document.querySelectorAll('.node').length,
                composerOpen: !!document.querySelector('[data-testid="team-composer"]'),
                running: document.body.innerText.match(/d+ live/)?.[0] ?? null
              })
            })()`);
            console.log("SMOKE_TEAM_LAUNCH", launched);
            await shot("smoke-team-board.png");
          } else if (process.argv.includes("--smoke-ui")) {
            const pan = await mainWindow.webContents.executeJavaScript(`(async () => {
              const b = document.querySelector('.board')
              const r = b.getBoundingClientRect()
              const world = document.querySelector('.world')
              const before = world?.style.transform ?? ''
              b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 2, clientX: r.left + 700, clientY: r.top + 420 }))
              await new Promise((x) => setTimeout(x, 80))
              window.dispatchEvent(new PointerEvent('pointermove', { clientX: r.left + 790, clientY: r.top + 470 }))
              await new Promise((x) => setTimeout(x, 120))
              window.dispatchEvent(new PointerEvent('pointerup', { clientX: r.left + 790, clientY: r.top + 470 }))
              await new Promise((x) => setTimeout(x, 120))
              return JSON.stringify({ before, after: world?.style.transform ?? '', ringButtons: document.querySelectorAll('.ring-btn').length })
            })()`);
            console.log("SMOKE_UI_PAN", pan);
            await shot("smoke-pan.png");
            const zoom = await mainWindow.webContents.executeJavaScript(`(async () => {
              const b = document.querySelector('.board')
              const r = b.getBoundingClientRect()
              b.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -160, clientX: r.left + 700, clientY: r.top + 420 }))
              await new Promise((x) => setTimeout(x, 220))
              return JSON.stringify({ zoom: document.querySelector('.zoom-hud span')?.textContent ?? '', ringButtons: document.querySelectorAll('.ring-btn').length })
            })()`);
            console.log("SMOKE_UI_ZOOM", zoom);
            await shot("smoke-ui.png");
          } else if (process.argv.includes("--smoke-zoomout")) {
            await mainWindow.webContents.capturePage();
            await new Promise((x) => setTimeout(x, 500));
            const out = await mainWindow.webContents.executeJavaScript(`(async () => {
              document.querySelector('.drawer-wrap .icon.big')?.click()
              await new Promise((x) => setTimeout(x, 450))
              const b = document.querySelector('.board')
              const r = b.getBoundingClientRect()
              for (let i = 0; i < 2; i++) {
                b.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120, clientX: r.left + 700, clientY: r.top + 420 }))
                await new Promise((x) => setTimeout(x, 60))
              }
              await new Promise((x) => setTimeout(x, 600))
              const nodes = [...document.querySelectorAll('.node')].map((n) => {
                const cs = getComputedStyle(n)
                const nr = n.getBoundingClientRect()
                return {
                  opacity: cs.opacity, display: cs.display, visibility: cs.visibility,
                  animation: cs.animationName, x: Math.round(nr.x), y: Math.round(nr.y),
                  w: Math.round(nr.width), h: Math.round(nr.height)
                }
              })
              return JSON.stringify({
                zoom: document.querySelector('.zoom-hud span')?.textContent ?? '',
                transform: document.querySelector('.world')?.style.transform ?? '',
                drawer: !!document.querySelector('.drawer-wrap'),
                nodes
              })
            })()`);
            console.log("SMOKE_ZOOMOUT", out);
            await shot("smoke-zoomout.png");
          } else if (process.argv.includes("--smoke-director")) {
            await mainWindow.webContents.capturePage();
            await new Promise((x) => setTimeout(x, 500));
            const director = await mainWindow.webContents.executeJavaScript(`(async () => {
              const wait = (ms) => new Promise((r) => setTimeout(r, ms))
              const rect = (sel) => {
                const el = document.querySelector(sel)
                if (!el) return null
                const r = el.getBoundingClientRect()
                return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom }
              }
              const overlap = (a, b) => !!a && !!b && a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y
              const rail = rect('[data-testid="tool-rail"]')
              const stage = rect('.stage')
              const team = rect('.team-rail')
              const dock = rect('.command-dock')
              const panel = rect('.node-orchestrator')
              const count = () => document.querySelectorAll('.wire-core').length
              const clickNode = (node) => {
                const r = node.getBoundingClientRect()
                node.dispatchEvent(new PointerEvent('pointerdown', {
                  bubbles: true, cancelable: true, button: 0, buttons: 1,
                  clientX: r.left + r.width / 2, clientY: r.top + r.height / 2
                }))
              }
              const wireTool = document.querySelector('[data-testid="wire-tool"]')
              const controller = document.querySelector('.node-orchestrator')
              const crew = [...document.querySelectorAll('.node-console')]
              const otto = crew.find((n) => n.querySelector('.node-title')?.textContent === 'Otto') ?? crew[0]
              const before = count()
              wireTool?.click()
              await wait(120)
              clickNode(controller)
              await wait(120)
              clickNode(otto)
              await wait(160)
              const off = count()
              wireTool?.click()
              await wait(120)
              wireTool?.click()
              await wait(120)
              clickNode(controller)
              await wait(180)
              const on = count()
              wireTool?.click()
              await wait(120)
              return JSON.stringify({
                toolButtons: document.querySelectorAll('.tool-btn').length,
                railWidth: rail ? Math.round(rail.w) : 0,
                director: !!controller,
                directorTitle: controller?.querySelector('.node-title')?.textContent ?? '',
                hasGem: !!document.querySelector('.director-gem'),
                links: document.querySelectorAll('.director-link').length,
                before, off, on, wires: count(),
                railClear: !!rail && !!stage && !overlap(rail, stage),
                teamClear: !!stage && !!team && !overlap(stage, team) && (!rail || !overlap(rail, team)),
                dockInside: !!dock && !!stage && dock.x >= stage.x && dock.right <= stage.right && dock.bottom <= stage.bottom,
                directorClear: !!panel && !overlap(panel, rail) && !overlap(panel, team) && !overlap(panel, dock),
                noOrb: !document.querySelector('.rail-orb') && !document.querySelector('.ring-menu') && !document.querySelector('.ring-btn'),
                overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
              })
            })()`);
            console.log("SMOKE_DIRECTOR", director);
            await mainWindow.webContents.executeJavaScript(`document.querySelectorAll('.toast').forEach((t) => t.click())`);
            await new Promise((x) => setTimeout(x, 120));
            await shot("smoke-director.png");
            mainWindow.setSize(1080, 680);
            await new Promise((x) => setTimeout(x, 700));
            const compact = await mainWindow.webContents.executeJavaScript(`(() => {
              const rect = (sel) => {
                const el = document.querySelector(sel)
                if (!el) return null
                const r = el.getBoundingClientRect()
                return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom }
              }
              const overlap = (a, b) => !!a && !!b && a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y
              const rail = rect('[data-testid="tool-rail"]')
              const stage = rect('.stage')
              const dock = rect('.command-dock')
              const panel = rect('.node-orchestrator')
              const teamEl = document.querySelector('.team-rail')
              const buttons = [...document.querySelectorAll('.tool-btn')]
              const buttonsFit = buttons.length === 18 && buttons.every((b) => {
                const r = b.getBoundingClientRect()
                return r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth
              })
              return JSON.stringify({
                width: window.innerWidth, height: window.innerHeight,
                toolButtons: buttons.length,
                buttonsFit,
                railWidth: rail ? Math.round(rail.w) : 0,
                railClear: !!rail && !!stage && !overlap(rail, stage),
                teamHidden: !teamEl || getComputedStyle(teamEl).display === 'none',
                dockInside: !!dock && !!stage && dock.x >= stage.x && dock.right <= stage.right && dock.bottom <= stage.bottom,
                directorClear: !!panel && !overlap(panel, rail) && !overlap(panel, dock),
                overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
              })
            })()`);
            console.log("SMOKE_DIRECTOR_COMPACT", compact);
            await shot("smoke-director-compact.png");
          } else if (process.argv.includes("--smoke-guard")) {
            const out = await mainWindow.webContents.executeJavaScript(`(async () => {
              const cwd = await window.api.cwd()
              let allowed = 'no'
              let blocked = 'not-blocked'
              let external = 'not-blocked'
              let save = 'skipped'
              let badSave = 'skipped'
              try {
                const r = await window.api.fs.readFile(cwd + '/package.json')
                allowed = r.text.includes('"name": "god-terminal"') ? 'allowed' : 'unexpected'
              } catch (e) {
                allowed = 'error: ' + (e && e.message ? e.message : String(e))
              }
              try {
                await window.api.fs.readFile('C:/Windows/win.ini')
                blocked = 'NOT_BLOCKED'
              } catch {
                blocked = 'blocked'
              }
              try {
                await window.api.shell.openExternal('file:///C:/Windows/win.ini')
                external = 'NOT_BLOCKED'
              } catch {
                external = 'blocked'
              }
              const state = await window.api.store.load()
              if (state && state.repos && state.repos.length) {
                try {
                  await window.api.store.save(state)
                  save = 'allowed'
                } catch {
                  save = 'error'
                }
                try {
                  const bad = JSON.parse(JSON.stringify(state))
                  bad.repos[0].path = 'C:/Windows'
                  await window.api.store.save(bad)
                  badSave = 'NOT_BLOCKED'
                } catch {
                  badSave = 'blocked'
                }
              }
              return JSON.stringify({ allowed, blocked, external, save, badSave })
            })()`);
            console.log("SMOKE_GUARD", out);
            await shot("smoke-guard.png");
          } else {
            const info = await mainWindow.webContents.executeJavaScript(`JSON.stringify({
              layers: [...document.querySelectorAll('.ws-layer')].map((l) => ({ cls: l.className, display: getComputedStyle(l).display })),
              nodes: [...document.querySelectorAll('.node')].map((n) => ({ cls: n.className, left: n.style.left, top: n.style.top, w: n.style.width, h: n.style.height, display: getComputedStyle(n).display })),
              boards: document.querySelectorAll('.board').length
            })`);
            console.log("SMOKE_INFO", info);
            await shot("smoke.png");
          }
        } catch (err) {
          console.error("smoke capture failed", err);
          process.exitCode = 1;
        } finally {
          electron.app.quit();
        }
      }, process.argv.includes("--smoke-team") || process.argv.includes("--smoke-ui") || process.argv.includes("--smoke-brain") || process.argv.includes("--smoke-brain-chat") || process.argv.includes("--smoke-zoomout") || process.argv.includes("--smoke-director") || process.argv.includes("--smoke-guard") ? 3200 : 5e3);
    });
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
    killAll();
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) void electron.shell.openExternal(url);
    return { action: "deny" };
  });
  const demo = process.argv.includes("--demo");
  const devUrl = process.env["ELECTRON_RENDERER_URL"];
  if (devUrl) void mainWindow.loadURL(demo ? `${devUrl}?demo=1` : devUrl);
  else void mainWindow.loadFile(node_path.join(__dirname, "../renderer/index.html"), demo ? { query: { demo: "1" } } : void 0);
  if (process.argv.includes("--smoke")) {
    mainWindow.webContents.on("console-message", (_e, level, message) => {
      console.log(`[renderer:${level}] ${message}`);
    });
  }
}
electron.app.whenReady().then(() => {
  migrateLegacy();
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  killAll();
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("before-quit", () => killAll());
async function readDir(dir2) {
  const entries = await node_fs.promises.readdir(dir2, { withFileTypes: true });
  const out = [];
  for (const e of entries.slice(0, 800)) {
    if (NOISE.has(e.name)) continue;
    if (e.name.startsWith(".") && !KEEP_DOT.has(e.name)) continue;
    const full = node_path.join(dir2, e.name);
    let size = 0;
    try {
      if (!e.isDirectory()) size = (await node_fs.promises.stat(full)).size;
    } catch {
      continue;
    }
    out.push({ name: e.name, path: full, dir: e.isDirectory(), size, ext: node_path.extname(e.name).toLowerCase() });
  }
  return out.sort((a, b) => Number(b.dir) - Number(a.dir) || a.name.localeCompare(b.name));
}
async function scanMarkdown(root) {
  const out = [];
  async function walk(dir2, depth) {
    if (out.length >= 2e3 || depth > 8) return;
    let entries;
    try {
      entries = await node_fs.promises.readdir(dir2, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (out.length >= 2e3) return;
      if (e.name.startsWith(".") && !KEEP_DOT.has(e.name)) continue;
      if (NOISE.has(e.name)) continue;
      const full = node_path.join(dir2, e.name);
      if (e.isDirectory()) await walk(full, depth + 1);
      else if (/\.(md|markdown|mdx)$/i.test(e.name)) {
        try {
          out.push({ name: e.name, path: full, dir: false, size: (await node_fs.promises.stat(full)).size, ext: node_path.extname(e.name).toLowerCase() });
        } catch {
        }
      }
    }
  }
  await walk(root, 0);
  return out;
}
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { name: out.name, description: out.description };
}
function lintSkill(name, text, folder, description) {
  const findings = [];
  if (!/^[a-z0-9-]{1,64}$/.test(name)) findings.push("Name: nur Kleinbuchstaben, Ziffern und Bindestriche, max. 64 Zeichen.");
  if (!description) findings.push("Beschreibung fehlt.");
  if (description && description.length > 1536) findings.push("Beschreibung ist länger als 1.536 Zeichen.");
  if (!text.trim()) findings.push("Der Inhalt ist leer.");
  if (text.split("\n").length > 500) findings.push("Der Inhalt ist länger als 500 Zeilen.");
  if (folder && name !== folder) findings.push(`Name weicht vom Ordnernamen „${folder}" ab.`);
  if (/^[a-z-]+:\s*<.*>/m.test(text)) findings.push("Spitze Klammern in einem Feld.");
  return findings;
}
async function scanSkills(repoPath) {
  const out = [];
  const push2 = async (p, scope, nameHint) => {
    try {
      const text = await node_fs.promises.readFile(p, "utf8");
      const fm = frontmatter(text);
      const name = fm.name || nameHint || node_path.basename(p, ".md");
      out.push({
        name,
        description: fm.description ?? "",
        path: p,
        scope,
        body: text,
        findings: lintSkill(name, text, scope === "command" ? "" : nameHint ?? "", fm.description)
      });
    } catch {
    }
  };
  const personal = node_path.join(node_os.homedir(), ".claude", "skills");
  try {
    for (const e of await node_fs.promises.readdir(personal, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const p = node_path.join(personal, e.name, "SKILL.md");
      if (node_fs.existsSync(p)) await push2(p, "personal", e.name);
    }
  } catch {
  }
  const project = node_path.join(repoPath, ".claude", "skills");
  try {
    for (const e of await node_fs.promises.readdir(project, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const p = node_path.join(project, e.name, "SKILL.md");
      if (node_fs.existsSync(p)) await push2(p, "project", e.name);
    }
  } catch {
  }
  for (const dir2 of [node_path.join(node_os.homedir(), ".claude", "commands"), node_path.join(repoPath, ".claude", "commands")]) {
    try {
      for (const e of await node_fs.promises.readdir(dir2)) {
        if (!e.endsWith(".md")) continue;
        await push2(node_path.join(dir2, e), "command", node_path.basename(e, ".md"));
      }
    } catch {
    }
  }
  return out.slice(0, 400);
}
async function walkJsonl(dir2, agent, out, depth = 0) {
  if (depth > 6 || out.length > 4e3) return;
  let entries;
  try {
    entries = await node_fs.promises.readdir(dir2, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (out.length > 4e3) return;
    const full = node_path.join(dir2, e.name);
    if (e.isDirectory()) {
      await walkJsonl(full, agent, out, depth + 1);
      continue;
    }
    if (!e.name.endsWith(".jsonl")) continue;
    let text;
    try {
      text = await node_fs.promises.readFile(full, "utf8");
    } catch {
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      if (!line.includes("token")) continue;
      try {
        const j = JSON.parse(line);
        const usage = j.usage ?? j.message?.usage ?? j.info;
        const input = Number(usage?.input_tokens ?? usage?.input ?? 0);
        const output = Number(usage?.output_tokens ?? usage?.output ?? 0);
        if (!input && !output) continue;
        const rawDate = String(j.timestamp ?? j.time ?? j.date ?? "");
        const date = /^\d{4}-\d{2}-\d{2}/.test(rawDate) ? rawDate.slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        out.push({ date, agent, input, output, total: input + output });
      } catch {
      }
    }
  }
}
async function scanUsage() {
  const days = [];
  await walkJsonl(node_path.join(node_os.homedir(), ".claude", "projects"), "Claude Code", days);
  await walkJsonl(node_path.join(node_os.homedir(), ".codex", "sessions"), "Codex", days);
  const merged = /* @__PURE__ */ new Map();
  for (const d of days) {
    const key = `${d.date}|${d.agent}`;
    const cur = merged.get(key);
    if (cur) {
      cur.input += d.input;
      cur.output += d.output;
      cur.total += d.total;
    } else merged.set(key, { ...d });
  }
  return [...merged.values()].sort((a, b) => a.date.localeCompare(b.date));
}
function registerIpc() {
  electron.ipcMain.handle("app:home", () => node_os.homedir());
  electron.ipcMain.handle("app:cwd", () => process.cwd());
  electron.ipcMain.handle("app:doctor", async () => {
    const ms = await models();
    let sttOk = false;
    try {
      const r = await fetch("http://127.0.0.1:8080/health", { signal: AbortSignal.timeout(1500) });
      sttOk = r.ok;
    } catch {
      sttOk = false;
    }
    let gitOk = true;
    try {
      await run("git", ["--version"]);
    } catch {
      gitOk = false;
    }
    return {
      ollama: { ok: ms.length > 0, models: ms, ...ms.length ? {} : { error: "Ollama nicht erreichbar oder ohne Modelle" } },
      stt: { ok: sttOk, ...sttOk ? {} : { error: "Lokaler Whisper-Server nicht erreichbar (Port 8080)" } },
      git: { ok: gitOk },
      platform: process.platform
    };
  });
  electron.ipcMain.handle("pty:create", (event, opts) => {
    const safe = { ...opts, cwd: opts.cwd ? guardPath(opts.cwd) : process.cwd() };
    const res = create(safe);
    const proc = get(safe.id);
    if (proc) {
      proc.onData((data) => {
        if (!event.sender.isDestroyed()) event.sender.send("pty:data", opts.id, data);
      });
      proc.onExit(({ exitCode }) => {
        if (!event.sender.isDestroyed()) event.sender.send("pty:exit", opts.id, exitCode);
      });
    }
    return res;
  });
  electron.ipcMain.handle("pty:write", (_e, id, data) => write(id, data));
  electron.ipcMain.handle("pty:resize", (_e, id, cols, rows) => resize(id, cols, rows));
  electron.ipcMain.handle("pty:kill", (_e, id) => kill(id));
  electron.ipcMain.handle("pty:list", () => list());
  electron.ipcMain.handle("store:load", () => load());
  electron.ipcMain.handle("store:save", (_e, state) => {
    guardState(state);
    save(state);
  });
  electron.ipcMain.handle("dialog:pickFolder", async () => {
    const res = await electron.dialog.showOpenDialog({ properties: ["openDirectory", "multiSelections"] });
    if (res.canceled) return null;
    res.filePaths.forEach(allowPath);
    return res.filePaths[0] ?? null;
  });
  electron.ipcMain.handle("dialog:pickFiles", async () => {
    const res = await electron.dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });
    if (res.canceled) return [];
    res.filePaths.forEach(allowPath);
    return res.filePaths;
  });
  electron.ipcMain.handle("shell:openPath", (_e, p) => electron.shell.openPath(guardPath(p)));
  electron.ipcMain.handle("shell:showItem", (_e, p) => electron.shell.showItemInFolder(guardPath(p)));
  electron.ipcMain.handle("shell:openExternal", (_e, url) => {
    if (!/^https?:\/\//i.test(url)) throw new Error("Blocked: only http(s) links can open externally");
    return electron.shell.openExternal(url);
  });
  electron.ipcMain.handle("fs:readDir", (_e, p) => readDir(guardPath(p)));
  electron.ipcMain.handle("fs:readFile", async (_e, p) => {
    const file2 = guardPath(p);
    const stat = await node_fs.promises.stat(file2);
    if (stat.size > 800 * 1024) return { text: "", truncated: true };
    const buf = await node_fs.promises.readFile(file2);
    if (buf.includes(0)) return { text: "Binärdatei — keine Vorschau.", truncated: false };
    return { text: buf.toString("utf8"), truncated: false };
  });
  electron.ipcMain.handle("fs:writeFile", async (_e, p, text) => {
    const file2 = guardPath(p);
    await node_fs.promises.mkdir(node_path.dirname(file2), { recursive: true });
    await node_fs.promises.writeFile(file2, text, "utf8");
  });
  electron.ipcMain.handle("fs:mkdir", (e, p) => node_fs.promises.mkdir(guardPath(p), { recursive: true }));
  electron.ipcMain.handle("fs:trash", async (_e, p) => {
    await electron.shell.trashItem(guardPath(p));
  });
  electron.ipcMain.handle("fs:exists", (e, p) => node_fs.existsSync(guardPath(p)));
  electron.ipcMain.handle("fs:stat", async (_e, p) => {
    const file2 = guardPath(p);
    try {
      const s = await node_fs.promises.stat(file2);
      return { size: s.size, mtime: s.mtimeMs, dir: s.isDirectory() };
    } catch {
      return null;
    }
  });
  electron.ipcMain.handle("fs:scanMarkdown", (_e, root) => scanMarkdown(guardPath(root)));
  electron.ipcMain.handle("git:status", (_e, cwd) => status(guardPath(cwd)));
  electron.ipcMain.handle("git:commit", (_e, cwd, message, files) => commit(guardPath(cwd), message, files));
  electron.ipcMain.handle("git:push", (_e, cwd) => push(guardPath(cwd)));
  electron.ipcMain.handle("git:pull", (_e, cwd) => pull(guardPath(cwd)));
  electron.ipcMain.handle("git:branches", (_e, cwd) => branches(guardPath(cwd)));
  electron.ipcMain.handle("git:checkout", (_e, cwd, b) => checkout(guardPath(cwd), b));
  electron.ipcMain.handle("git:createBranch", (_e, cwd, b) => createBranch(guardPath(cwd), b));
  electron.ipcMain.handle("git:log", (_e, cwd) => log(guardPath(cwd)));
  electron.ipcMain.handle("git:init", (_e, cwd) => init(guardPath(cwd)));
  electron.ipcMain.handle("llm:chat", (_e, opts) => chat(opts));
  electron.ipcMain.handle("llm:models", (_e, url, provider) => models(url, provider));
  electron.ipcMain.handle("window:titlebar", (_e, opts) => {
    try {
      mainWindow?.setTitleBarOverlay({ ...opts, height: opts.height ?? 58 });
    } catch {
    }
  });
  electron.ipcMain.handle("stt:transcribe", async (_e, base64, url) => {
    const target = (url || "http://127.0.0.1:8080").replace(/\/$/, "");
    try {
      const buf = Buffer.from(base64, "base64");
      const form = new FormData();
      form.append("file", new Blob([buf], { type: "audio/wav" }), "speech.wav");
      form.append("response_format", "json");
      const res = await fetch(`${target}/inference`, { method: "POST", body: form, signal: AbortSignal.timeout(12e4) });
      if (!res.ok) return { text: "", error: `STT ${res.status}` };
      const json = await res.json();
      return { text: json.text?.trim() ?? "" };
    } catch (err) {
      return { text: "", error: err instanceof Error ? err.message : "STT nicht erreichbar" };
    }
  });
  electron.ipcMain.handle("pdf:export", async (_e, html, defaultName) => {
    const res = await electron.dialog.showSaveDialog({
      defaultPath: defaultName.endsWith(".pdf") ? defaultName : `${defaultName}.pdf`,
      filters: [{ name: "PDF", extensions: ["pdf"] }]
    });
    if (res.canceled || !res.filePath) return null;
    allowPath(res.filePath);
    const tmp = node_path.join(electron.app.getPath("temp"), `god-terminal-${Date.now()}.html`);
    await node_fs.promises.writeFile(tmp, html, "utf8");
    const win = new electron.BrowserWindow({ show: false, webPreferences: { sandbox: true } });
    try {
      await win.loadFile(tmp);
      const pdf = await win.webContents.printToPDF({
        printBackground: true,
        pageSize: "A4",
        margins: { top: 0.6, bottom: 0.6, left: 0.6, right: 0.6 }
      });
      await node_fs.promises.writeFile(res.filePath, pdf);
      return res.filePath;
    } finally {
      win.destroy();
      void node_fs.promises.unlink(tmp).catch(() => void 0);
    }
  });
  electron.ipcMain.handle("skills:scan", async (_e, repo) => {
    const skills = await scanSkills(guardPath(repo));
    for (const skill of skills) allowPath(skill.path);
    return skills;
  });
  electron.ipcMain.handle("usage:scan", () => scanUsage());
  electron.ipcMain.handle("profiles:create", async (_e, agentId, name) => {
    const slug = name.toLowerCase().replace(/[^\w]+/g, "-") || "profile";
    const dir2 = node_path.join(dataDir(), "profiles", agentId, slug);
    await node_fs.promises.mkdir(dir2, { recursive: true });
    const initials = name.split(/\s+/).map((s) => s[0] ?? "").join("").slice(0, 2).toUpperCase();
    return { id: `${agentId}-${slug}`, dir: dir2, initials };
  });
}
registerIpc();
