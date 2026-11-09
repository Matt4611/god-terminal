import { useApp } from '../store'
import { newNode } from '../factory'
import { ROLES, TINTS, allAgents } from '@shared/agents'
import { uid } from '../util'
import type { PanelName } from '../store'

export default function RightRail() {
  const board = useApp((s) => s.board())
  const addNode = useApp((s) => s.addNode)
  const setSelection = useApp((s) => s.setSelection)
  const setPanel = useApp((s) => s.setPanel)
  const setComposerOpen = useApp((s) => s.setComposerOpen)
  const setBrainOpen = useApp((s) => s.setBrainOpen)
  const saveLayout = useApp((s) => s.saveLayout)
  const toast = useApp((s) => s.toast)
  const settings = useApp((s) => s.settings)
  const selected = useApp((s) => s.selected)
  const updateBoard = useApp((s) => s.updateBoard)
  const loops = useApp((s) => s.loops)

  const insert = (kind: string, extra: Record<string, unknown> = {}) => {
    const v = board?.viewport ?? { x: 0, y: 0, zoom: 1 }
    const x = (window.innerWidth / 2 - 200 - v.x) / v.zoom
    const y = (window.innerHeight / 2 - 150 - v.y) / v.zoom
    const node = newNode(kind, x, y, { agentId: settings.defaultAgent, ...extra })
    addNode(node)
    setSelection([node.id])
  }

  const image = async () => {
    const files = await window.api.dialog.pickFiles()
    if (!files.length) return
    const v = board?.viewport ?? { x: 0, y: 0, zoom: 1 }
    const x = (window.innerWidth / 2 - 200 - v.x) / v.zoom
    const y = (window.innerHeight / 2 - 150 - v.y) / v.zoom
    addNode({
      id: `img${Math.random().toString(36).slice(2, 8)}`,
      kind: 'image',
      x, y, w: 380, h: 260, z: 1,
      title: files[0].split(/[\\/]/).pop() ?? 'Image',
      src: `file:///${files[0].replace(/\\/g, '/')}`,
      path: files[0]
    })
  }

  const open = (p: PanelName) => setPanel(p)

  return (
    <aside className="right-rail">
      <div className="rail-section">
        <div className="rail-title">Console</div>
        <button className="rail-action brain-action" onClick={() => setBrainOpen(true)}>
          <span>◉</span> Start brain
          <em>Ollama</em>
        </button>
        <button className="rail-action team-action" onClick={() => setComposerOpen(true)}>
          <span>✦</span> New team
          <em>up to 12</em>
        </button>
        <button className="rail-action" onClick={() => insert('console')}>
          <span>▣</span> New console
          <em>{settings.defaultAgent}</em>
        </button>
        <select
          className="text-input"
          value=""
          onChange={(e) => e.target.value && insert('console', { agentId: e.target.value })}
        >
          <option value="">Spawn agent…</option>
          {allAgents().filter((a) => a.command).map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="rail-section">
        <div className="rail-title">Insert</div>
        <div className="insert-grid">
          <button onClick={() => insert('note')} title="Sticky note">▤<span>Note</span></button>
          <button onClick={() => insert('text')} title="Text">T<span>Text</span></button>
          <button onClick={() => insert('checklist')} title="Checklist">☑<span>To-do</span></button>
          <button onClick={() => insert('kanban')} title="Kanban">▥<span>Board</span></button>
          <button onClick={() => insert('calendar')} title="Calendar">▦<span>Calendar</span></button>
          <button onClick={() => insert('web tile')} title="Web tile">◎<span>Web</span></button>
          <button onClick={image} title="Image">▧<span>Image</span></button>
          <button onClick={() => insert('shape')} title="Shape">◻<span>Shape</span></button>
          <button onClick={() => insert('shape', { shape: 'sticky' })} title="Sticky note">◧<span>Sticky</span></button>
          <button onClick={() => insert('orchestrator')} title="Orchestrator card">✦<span>Orch.</span></button>
          <button onClick={() => insert('memory')} title="Memory card">◈<span>Memory</span></button>
          <button onClick={() => insert('branches')} title="Branches">⑂<span>Branches</span></button>
        </div>
      </div>

      <div className="rail-section">
        <div className="rail-title">Studios</div>
        <button className="rail-action" onClick={() => open('documents')}>📄 Documents <em>PDF</em></button>
        <button className="rail-action" onClick={() => open('diagrams')}>◇ Diagrams <em>shapes</em></button>
        <button className="rail-action" onClick={() => open('code')}>⟨⟩ Code <em>browse</em></button>
        <button className="rail-action" onClick={() => open('markdown')}>M↓ Markdown <em>vault</em></button>
        <button className="rail-action" onClick={() => open('skills')}>✧ Skills <em>SKILL.md</em></button>
      </div>

      <div className="rail-section">
        <div className="rail-title">Board</div>
        <button className="rail-action" onClick={() => open('presets')}>▦ Presets <em>{settings.defaultAgent}</em></button>
        <button className="rail-action" onClick={() => open('mission')}>◎ Mission Map</button>
        <button className="rail-action" onClick={() => open('memory')}>◈ Memory</button>
        <button className="rail-action" onClick={() => open('loops')}>↻ Loops <em>{loops.filter((l) => l.enabled).length || ''}</em></button>
        <button className="rail-action" onClick={() => open('git')}>⑂ Git</button>
        <button className="rail-action" onClick={() => open('usage')}>📊 Usage</button>
        <button className="rail-action" onClick={() => open('profiles')}>👤 Accounts</button>
        <button className="rail-action" onClick={() => open('settings')}>⚙ Settings</button>
      </div>

      <div className="rail-section">
        {selected.length > 1 && (
          <button
            className="rail-action"
            onClick={() => {
              const role = window.prompt(`Role for ${selected.length} selected consoles (${ROLES.join(', ')})`, 'General')
              if (!role) return
              const clean = ROLES.find((r) => r.toLowerCase() === role.toLowerCase()) ?? role
              updateBoard((b) => ({
                ...b,
                groups: [
                  ...b.groups,
                  {
                    id: uid(),
                    name: `${clean} ${b.groups.length + 1}`,
                    role: clean,
                    tint: TINTS[b.groups.length % TINTS.length],
                    memberIds: [...selected]
                  }
                ]
              }))
              toast(`Grouped ${selected.length} consoles as ${clean}`, 'ok')
            }}
          >
            ▦ Group selection
          </button>
        )}
        <button
          className="rail-action"
          onClick={() => {
            if (!board?.nodes.length) return toast('Nothing to save yet', 'error')
            saveLayout(JSON.parse(JSON.stringify(board.nodes)))
            toast('Layout saved as a preset', 'ok')
          }}
        >
          ⤓ Save current layout
        </button>
      </div>
    </aside>
  )
}
