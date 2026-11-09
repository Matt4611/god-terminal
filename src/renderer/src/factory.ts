import type {
  AnyNode, CalendarNode, CardNode, ChecklistNode, ConsoleNode, KanbanNode, NoteNode,
  OrchestratorNode, ShapeNode, TextNode, WebNode
} from '@shared/types'
import { uid } from './util'

const base = (x: number, y: number, w: number, h: number, title: string) => ({
  id: uid(),
  x,
  y,
  w,
  h,
  z: 1,
  title
})

const today = () => new Date().toISOString().slice(0, 10)

export function makeConsole(x: number, y: number, opts: Partial<ConsoleNode> = {}): ConsoleNode {
  return {
    ...base(x, y, 400, 260, opts.title ?? 'Console'),
    kind: 'console',
    agentId: opts.agentId ?? 'claude',
    cwd: opts.cwd ?? '',
    status: 'STARTING',
    launchKey: 0,
    yolo: opts.yolo,
    profileId: opts.profileId,
    ...opts
  }
}

export function makeNote(x: number, y: number, text = ''): NoteNode {
  return {
    ...base(x, y, 240, 170, 'Note'),
    kind: 'note',
    text,
    paper: '#f5e6a8'
  }
}

export function makeText(x: number, y: number): TextNode {
  return {
    ...base(x, y, 260, 80, 'Text'),
    kind: 'text',
    text: '',
    font: 'Sketch',
    size: 18,
    align: 'left'
  }
}

export function makeChecklist(x: number, y: number): ChecklistNode {
  return {
    ...base(x, y, 260, 220, 'Checklist'),
    kind: 'checklist',
    items: [{ id: uid(), text: 'First objective', done: false }]
  }
}

export function makeKanban(x: number, y: number): KanbanNode {
  return {
    ...base(x, y, 560, 380, 'Board'),
    kind: 'kanban',
    columns: ['Backlog', 'To do', 'In progress', 'Done'].map((title, i) => ({
      id: uid(),
      title,
      color: ['#64748b', '#38bdf8', '#f59e0b', '#34d399'][i],
      cards: []
    }))
  }
}

export function makeCalendar(x: number, y: number): CalendarNode {
  const d = new Date()
  return {
    ...base(x, y, 420, 360, 'Calendar'),
    kind: 'calendar',
    month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    events: [
      { id: uid(), title: 'Review the board', date: today(), allDay: true, color: '#a78bfa' }
    ]
  }
}

export function makeWeb(x: number, y: number, url = 'http://localhost:3000'): WebNode {
  return {
    ...base(x, y, 500, 340, 'Web'),
    kind: 'web',
    url,
    zoom: 100,
    device: 'fit'
  }
}

export function makeShape(x: number, y: number, shape: ShapeNode['shape'] = 'rect'): ShapeNode {
  return {
    ...base(x, y, shape === 'sticky' ? 200 : 220, shape === 'sticky' ? 160 : 140, shape),
    kind: 'shape',
    shape,
    style: { stroke: '#cbd5e1', fill: 'transparent', width: 2, dashed: false, sloppy: true }
  }
}

export function makeCard(x: number, y: number, cardKind: CardNode['cardKind'], extra: Partial<CardNode> = {}): CardNode {
  return {
    ...base(x, y, 380, 280, extra.title ?? 'Card'),
    kind: 'card',
    cardKind,
    ...extra
  }
}

export function makeOrchestrator(x: number, y: number, name = 'Orchestrator'): OrchestratorNode {
  return {
    ...base(x, y, 320, 280, name),
    kind: 'orchestrator',
    wired: []
  }
}

export function newNode(kind: string, x: number, y: number, extra: Record<string, unknown> = {}): AnyNode {
  switch (kind) {
    case 'note': return makeNote(x, y, (extra.text as string) ?? '')
    case 'text': return makeText(x, y)
    case 'checklist': return makeChecklist(x, y)
    case 'kanban': return makeKanban(x, y)
    case 'calendar': return makeCalendar(x, y)
    case 'web tile':
    case 'web': return makeWeb(x, y, (extra.url as string) ?? 'http://localhost:3000')
    case 'shape': return makeShape(x, y, (extra.shape as ShapeNode['shape']) ?? 'rect')
    case 'orchestrator':
      return { ...makeOrchestrator(x, y, (extra.name as string) || 'Orchestrator'), wired: (extra.wired as string[]) ?? [] }
    case 'memory':
      return {
        ...base(x, y, 300, 240, 'Memory'),
        kind: 'memory',
        scope: (extra.scope as string) ?? 'repo'
      }
    case 'branches':
      return { ...base(x, y, 280, 300, 'Branches'), kind: 'branches' }
    case 'console':
      return makeConsole(x, y, extra as Partial<ConsoleNode>)
    default:
      return makeNote(x, y)
  }
}
