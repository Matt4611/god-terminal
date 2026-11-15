"use strict";
const electron = require("electron");
const invoke = (channel, ...args) => electron.ipcRenderer.invoke(channel, ...args);
const api = {
  platform: process.platform,
  home: () => invoke("app:home"),
  cwd: () => invoke("app:cwd"),
  doctor: () => invoke("app:doctor"),
  pty: {
    create: (opts) => invoke("pty:create", opts),
    write: (id, data) => invoke("pty:write", id, data),
    resize: (id, cols, rows) => invoke("pty:resize", id, cols, rows),
    kill: (id) => invoke("pty:kill", id),
    list: () => invoke("pty:list"),
    onData: (cb) => {
      const fn = (_e, id, data) => cb(id, data);
      electron.ipcRenderer.on("pty:data", fn);
      return () => electron.ipcRenderer.removeListener("pty:data", fn);
    },
    onExit: (cb) => {
      const fn = (_e, id, code) => cb(id, code);
      electron.ipcRenderer.on("pty:exit", fn);
      return () => electron.ipcRenderer.removeListener("pty:exit", fn);
    }
  },
  store: {
    load: () => invoke("store:load"),
    save: (state) => invoke("store:save", state)
  },
  dialog: {
    pickFolder: () => invoke("dialog:pickFolder"),
    pickFiles: () => invoke("dialog:pickFiles")
  },
  shell: {
    openPath: (p) => invoke("shell:openPath", p),
    showItem: (p) => invoke("shell:showItem", p),
    openExternal: (url) => invoke("shell:openExternal", url)
  },
  fs: {
    readDir: (p) => invoke("fs:readDir", p),
    readFile: (p) => invoke("fs:readFile", p),
    writeFile: (p, text) => invoke("fs:writeFile", p, text),
    mkdir: (p) => invoke("fs:mkdir", p),
    trash: (p) => invoke("fs:trash", p),
    exists: (p) => invoke("fs:exists", p),
    scanMarkdown: (root) => invoke("fs:scanMarkdown", root),
    stat: (p) => invoke("fs:stat", p)
  },
  git: {
    status: (cwd) => invoke("git:status", cwd),
    commit: (cwd, message, files) => invoke("git:commit", cwd, message, files),
    push: (cwd) => invoke("git:push", cwd),
    pull: (cwd) => invoke("git:pull", cwd),
    branches: (cwd) => invoke("git:branches", cwd),
    checkout: (cwd, branch) => invoke("git:checkout", cwd, branch),
    createBranch: (cwd, branch) => invoke("git:createBranch", cwd, branch),
    log: (cwd) => invoke("git:log", cwd),
    init: (cwd) => invoke("git:init", cwd)
  },
  llm: {
    chat: (opts) => invoke("llm:chat", opts),
    models: (url, provider) => invoke("llm:models", url, provider)
  },
  win: {
    setTitleBar: (opts) => invoke("window:titlebar", opts)
  },
  stt: {
    transcribe: (audioBase64, url) => invoke("stt:transcribe", audioBase64, url)
  },
  pdf: {
    export: (html, defaultName) => invoke("pdf:export", html, defaultName)
  },
  skills: {
    scan: (repoPath) => invoke("skills:scan", repoPath),
    write: (p, text) => invoke("fs:writeFile", p, text)
  },
  usage: {
    scan: () => invoke("usage:scan")
  },
  profiles: {
    create: (agentId, name) => invoke("profiles:create", agentId, name)
  }
};
electron.contextBridge.exposeInMainWorld("api", api);
