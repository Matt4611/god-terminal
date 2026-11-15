# God Terminal (GoT)

A local-first board for orchestrating agent CLIs, rebuilt for Windows (and macOS/Linux) with
real PTY terminals and local models. Functional equivalent of a macOS-only board app — own code,
own UI, no copied assets.

```
┌ topbar: brand · repo · workspaces · needs-you · live ───────────┐
│ tool │                  infinite board                  │ team  │
│ rail │  ┌─ console ─────┐   ╭─ Director ──╮             │ crew  │
│ 46px │  │ claude (PTY)  │═══╡  orange gem  ╞═══╮         │ cards │
│      │  └───────────────┘   ╰──────────────╯   │         │       │
│      │        Main Brain strip · command dock  │         │       │
└──────────────────────────────────────────────────────────────────┘
```

## Requirements

- Windows 10/11 (also runs on macOS and Linux), Node 20+
- Agent CLIs on `PATH` (`claude`, `codex`, `gemini`, …) — or just use the Shell console
- [Ollama](https://ollama.com) **or** [LM Studio](https://lmstudio.ai) with a local chat model for the Main Brain, planner, documents, diagrams and memory scan
- Optional: Codex CLI for worker terminals that run directly on a local model
- Optional: a local whisper.cpp server for voice (`/inference` + `/health` on port 8080)

## Repository note

This repository intentionally includes the complete build snapshot: `node_modules/`, `out/` and
`release/`. Files above GitHub's 100 MB limit are stored with Git LFS, so install Git LFS and run
`git lfs install` before cloning if you need the Electron binary and the Windows release files.

## Run

```bash
npm install
npm run dev          # hot reload
npm run build        # production bundle in out/
npm start            # preview the built bundle
npm run dist         # Windows installer via electron-builder (release/)
```

The Electron distribution is taken from `node_modules/electron/dist`, so packaging needs no second
Electron download. If GitHub is unreachable for the NSIS payloads, prefix `npm run dist` with
`ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/`.
The installer is unsigned, so Windows shows a SmartScreen prompt; the portable build is
`release/win-unpacked/God Terminal.exe`.

`node-pty` comes from `@lydell/node-pty`, which ships prebuilt N-API binaries — no Visual Studio
build tools are needed. If the Electron binary download stalls, set `ELECTRON_MIRROR` to a mirror
(for example `https://mirrors.huaweicloud.com/electron/`) before `npm install`.

`npm run demo` opens a seeded board without touching your saved state; `npm run smoke` renders
that board to `smoke.png` and exits.

### Local models

**Ollama** (default):

```bash
ollama serve
ollama pull gpt-oss:20b        # or any chat model you have
```

**LM Studio**: start the local server in LM Studio (Developer → Local Server). GoT expects the
OpenAI-compatible endpoint at `http://127.0.0.1:1234/v1` by default.

Settings → Local models: choose the provider, URL and model. The Main Brain, planner, documents,
diagrams and memory scan use that selection. With LM Studio, `Codex · LM Studio` is available as a
worker agent (`codex --oss --local-provider lmstudio`). Without a reachable model the board still
works; direct `@Name` commands and deterministic commands remain available.

Voice is optional. With whisper.cpp:

```bash
whisper-server -m models/ggml-base.bin --port 8080 --host 127.0.0.1
```

Then Settings → Voice → STT server. Audio is recorded in the app, converted to 16-bit WAV and sent
only to that local endpoint. Spoken confirmations use the OS voices.

## What works

**Board** — pan/zoom 20–300 %, dot grid, marquee selection, drag, resize, duplicate, copy/cut/paste,
arrow-key nudge, z-order, groups with role tints, rope wires, text boxes, sticky notes, per-workspace
JSON persistence, 10k-line scrollback. **Right-click drag pans**, the **mouse wheel zooms** around
the pointer, and there is no radial/right-click agent menu anymore.

**Tool rail** — a compact 46 px icon rail replaces the old wide sidebar: select, pan, spawn Director,
connect, Main Brain, team, new console, note, text, shape, pen, eraser, web tile, image, fit, Mission
Map, Git and Settings. The active tool is highlighted; the primary cursor is orange. On short windows
the buttons shrink so all 18 tools stay reachable.

**Director** — a special board node with an animated, clickable gem. It shows every linked console
and its status, can spawn an agent directly into the crew, and takes one order for the whole wired
team. Without a link it forwards orders to the normal command parser. Ropes connect any two nodes:
pick the rope tool, click the first node and then the second; repeating the pair removes the rope.
Director ropes are orange, other ropes mint, and the live preview follows the cursor. Escape or the
banner cancels; deleting a node also cleans its Director links.

**Teams** — the composer lines up 1–12 consoles, each with its own agent, and launches all of
them in one action. Consoles take the first free spot on the board, are grouped, and the camera
frames the new team. Presets deploy larger layouts (up to 16 lanes) the same way.

**Main Brain** — always visible above the command bar. Chat with a local Ollama or LM Studio model;
it gets the project, agents, groups, statuses and recent reports. It answers conversationally and,
when you give it work, splits that work into orders for the relevant agents (or spawns one). You can
still talk directly to an agent with `@Name` (or broadcast with `@all`). The old separate "Start
brain" dialog is no longer part of the main UI.

**Team sync** — when an agent finishes a meaningful update, its latest output is relayed to the
other ready agents with a short note to check affected files and avoid duplicate work. Busy and
blocked consoles are not interrupted; duplicate notices are rate-limited.

**Consoles** — a real PTY per console (ConPTY on Windows), running the CLI exactly as installed:
Claude Code, Codex, Gemini, Grok, OpenCode and 29 more catalog agents, plus any executable.
Agent flags for Yolo, per-console restart/pause/kill, handoff and forward, live status
(WORKING / NEEDS YOU / READY / ERROR / PAUSED / DONE), paste guard for multi-line pastes,
`TERM=xterm-256color`, color, 85–200 % text size.

**Orchestration** — command bar with a deterministic parser (`spawn 4 codex`, `@Otto …`, `@all …`,
`connect group 1 to the director`, `deploy preset Dev HQ`, `commit and push`, …), a Main Brain
chat with JSON actions, 500-message thread per repo, 18 presets, Director cards, teams/roles,
Mission Map, loops (interval / idle / output contains, 200 runs), project memory with model scan and
push, handoffs and forwards. Every board action remains available in the compact tool rail, the
command bar and the panels.

**Studios** — Code (tree + editor, Ctrl+S, draft state, insert as card), Markdown (vault, reading /
source / link graph with d3-force, autosave), Documents (model-written, cover + TOC + paginated PDF
via printToPDF, library), Diagrams (model → editable shapes + wires, PNG and `.excalidraw` export),
Skills (`~/.claude/skills`, `.claude/skills`, commands, lint findings, create, edit, run).

**Everything else** — Git panel (status, commit, commit & push, pull, branches, log, init),
usage and token charts read from `~/.claude/projects` and `~/.codex/sessions`, account profiles
(`CLAUDE_CONFIG_DIR` / `CODEX_HOME`), web tiles with `<webview>`, notes, checklists, kanban,
calendar, sticky notes, images, ink, Yolo toggle, Ink/Light themes, push-to-talk and dictation.

## Architecture

```
src/main      Electron main: PTY manager, JSON store, git, Ollama client, STT bridge, PDF,
              filesystem, skills scan, usage scan
src/preload   typed IPC bridge (window.api)
src/shared    types, agent catalog, presets, command parser, status heuristics
src/renderer  React + zustand board, xterm.js consoles, panels and studios
```

State is one versioned JSON file in `app.getPath('userData')/state.json`, written atomically 700 ms
after the last change. Boards keep nodes, positions, sizes and contents; a running process and its
scrollback are not persisted — consoles start a new session when the app reopens.

## Deliberate differences from the inspiration

- The original is a native Swift/AppKit app for Apple Silicon; this is Electron so it runs on
  Windows. That is the functional equivalent, not a port.
- Documents and Diagrams are written by the **local model**, not by a hidden agent CLI turn.
- Spoken replies use OS voices (local) instead of a cloud TTS service; no credits, no account.
- No subscription, billing, license check or telemetry. Everything is local.
- Switching workspaces keeps every console mounted and running; boards for other workspaces stay
  in memory and are hidden, not unmounted.
- Resume is offered as a note: the app does not read each CLI's session id, so a reopened console
  starts a fresh conversation.

## Checks

```bash
npm run typecheck    # main + preload + renderer
npm run build        # electron-vite production build
node tests/pty-smoke.mjs   # real ConPTY round-trip
npm run smoke              # board screenshot, exits
npm run verify             # typecheck + tests + build + UI/IPC smokes
npm run verify:quick       # typecheck + tests + build only
npx electron . --smoke --demo --smoke-team   # composer + 3-console launch smoke
npx electron . --smoke --demo --smoke-ui     # right-drag pan + wheel zoom smoke
npx electron . --smoke --demo --smoke-zoomout  # zoom-out sharpness screenshot
npx electron . --smoke --demo --smoke-brain  # Main Brain strip/thread smoke
npx electron . --smoke --demo --smoke-brain-chat  # one Ollama round-trip through the Main Brain
npx electron . --smoke --demo --smoke-director  # tool rail, Director, rope toggle + layout screenshot
npx electron . --smoke --demo --smoke-guard  # allowed/blocked IPC path smoke
```
