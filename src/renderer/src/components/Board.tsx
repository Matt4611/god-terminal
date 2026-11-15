import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { AnyNode, Board as BoardType, ConsoleNode } from '@shared/types'
import { getAgent } from '@shared/agents'
import { useApp } from '../store'
import { newNode, makeShape } from '../factory'
import NodeBody from './NodeBody'
import { uid } from '../util'

type DragState = {
  kind: 'drag'
  startX: number
  startY: number
  ids: string[]
  origins: Record<string, { x: number; y: number }>
}
type ResizeState = {
  kind: 'resize'
  id: string
  startX: number
  startY: number
  w: number
  h: number
}
type PanState = { kind: 'pan'; startX: number; startY: number; vx: number; vy: number }
type PenState = { points: { x: number; y: number }[] }
type MarqueeState = { startX: number; startY: number; x: number; y: number; additive: boolean }

function wireGeometry(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
): { d: string; x1: number; y1: number; x2: number; y2: number } {
  const acx = a.x + a.w / 2
  const acy = a.y + a.h / 2
  const bcx = b.x + b.w / 2
  const bcy = b.y + b.h / 2
  const horizontal = Math.abs(bcx - acx) >= Math.abs(bcy - acy)
  let x1: number, y1: number, x2: number, y2: number
  let c1x: number, c1y: number, c2x: number, c2y: number
  if (horizontal) {
    const right = bcx >= acx
    x1 = right ? a.x + a.w : a.x
    y1 = acy
    x2 = right ? b.x : b.x + b.w
    y2 = bcy
    const bend = Math.min(140, Math.max(18, Math.abs(x2 - x1) * 0.45)) * (right ? 1 : -1)
    c1x = x1 + bend
    c1y = y1
    c2x = x2 - bend
    c2y = y2
  } else {
    const down = bcy >= acy
    x1 = acx
    y1 = down ? a.y + a.h : a.y
    x2 = bcx
    y2 = down ? b.y : b.y + b.h
    const bend = Math.min(140, Math.max(18, Math.abs(y2 - y1) * 0.45)) * (down ? 1 : -1)
    c1x = x1
    c1y = y1 + bend
    c2x = x2
    c2y = y2 - bend
  }
  return { d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`, x1, y1, x2, y2 }
}

export default function Board({ board, active = true }: { board: BoardType; active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 1200, h: 800 })
  const [space, setSpace] = useState(false)
  const [drag, setDrag] = useState<DragState | null>(null)
  const [resize, setResize] = useState<ResizeState | null>(null)
  const [pan, setPan] = useState<PanState | null>(null)
  const [pen, setPen] = useState<PenState | null>(null)
  const [marquee, setMarquee] = useState<MarqueeState | null>(null)
  const [wireCursor, setWireCursor] = useState<{ x: number; y: number } | null>(null)
  const marqueeRef = useRef<MarqueeState | null>(null)
  const clipboard = useRef<AnyNode[]>([])

  const tool = useApp((s) => s.tool)
  const holdSpace = useApp((s) => s.settings.holdSpace)
  const setTool = useApp((s) => s.setTool)
  const selected = useApp((s) => s.selected)
  const setSelection = useApp((s) => s.setSelection)
  const toggleSelect = useApp((s) => s.toggleSelect)
  const addNode = useApp((s) => s.addNode)
  const addNodes = useApp((s) => s.addNodes)
  const updateBoard = useApp((s) => s.updateBoard)
  const patchNode = useApp((s) => s.patchNode)
  const removeNodes = useApp((s) => s.removeNodes)
  const bringToFront = useApp((s) => s.bringToFront)
  const toast = useApp((s) => s.toast)
  const wireFrom = useApp((s) => s.wireFrom)
  const setWireFrom = useApp((s) => s.setWireFrom)
  const connectNodes = useApp((s) => s.connectNodes)

  const v = board.viewport
  const wireSource = wireFrom ? board.nodes.find((n) => n.id === wireFrom) : undefined

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  // Soft light that follows the pointer across the canvas.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let x = 0
    let y = 0
    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      if (raf) return
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x}px`)
        el.style.setProperty('--my', `${y}px`)
        raf = 0
      })
    }
    el.addEventListener('pointermove', move)
    return () => {
      el.removeEventListener('pointermove', move)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (tool !== 'wire') {
      setWireCursor(null)
      return
    }
    const el = ref.current
    if (!el) return
    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      setWireCursor({ x: (e.clientX - rect.left - v.x) / v.zoom, y: (e.clientY - rect.top - v.y) / v.zoom })
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [tool, v.x, v.y, v.zoom])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!holdSpace && e.code === 'Space' && !(e.target as HTMLElement).closest('input,textarea,[contenteditable]')) {
        setSpace(true)
        e.preventDefault()
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') setSpace(false)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [holdSpace])

  useEffect(() => {
    if (!active) return
    const frame = (e: Event) => frameNode((e as CustomEvent<string>).detail)
    const fit = () => {
      if (!board.nodes.length) return
      const minX = Math.min(...board.nodes.map((n) => n.x)) - 60
      const minY = Math.min(...board.nodes.map((n) => n.y)) - 60
      const maxX = Math.max(...board.nodes.map((n) => n.x + n.w)) + 60
      const maxY = Math.max(...board.nodes.map((n) => n.y + n.h)) + 60
      const zoom = Math.min(1.2, Math.min(size.w / (maxX - minX), size.h / (maxY - minY)))
      updateBoard((b) => ({
        ...b,
        viewport: { zoom, x: -minX * zoom + (size.w - (maxX - minX) * zoom) / 2, y: -minY * zoom + (size.h - (maxY - minY) * zoom) / 2 }
      }))
    }
    const frameRect = (e: Event) => {
      const r = (e as CustomEvent<{ x: number; y: number; w: number; h: number }>).detail
      if (!r?.w || !r?.h) return
      const zoom = Math.min(1, (size.w - 150) / r.w, (size.h - 210) / r.h)
      updateBoard((b) => ({
        ...b,
        viewport: {
          zoom,
          x: size.w / 2 - (r.x + r.w / 2) * zoom,
          y: size.h / 2 - (r.y + r.h / 2) * zoom
        }
      }))
    }
    window.addEventListener('hive:frame', frame)
    window.addEventListener('hive:fit', fit)
    window.addEventListener('hive:frame-rect', frameRect)
    return () => {
      window.removeEventListener('hive:frame', frame)
      window.removeEventListener('hive:fit', fit)
      window.removeEventListener('hive:frame-rect', frameRect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.nodes, size, updateBoard, active])

  useEffect(() => {
    if (!drag && !resize && !pan && !pen) return
    const move = (e: PointerEvent) => {
      if (pan) {
        updateBoard((b) => ({
          ...b,
          viewport: { ...b.viewport, x: pan.vx + (e.clientX - pan.startX), y: pan.vy + (e.clientY - pan.startY) }
        }))
      } else if (drag) {
        const dx = (e.clientX - drag.startX) / v.zoom
        const dy = (e.clientY - drag.startY) / v.zoom
        updateBoard((b) => ({
          ...b,
          nodes: b.nodes.map((n) =>
            drag.ids.includes(n.id) && drag.origins[n.id]
              ? { ...n, x: drag.origins[n.id].x + dx, y: drag.origins[n.id].y + dy }
              : n
          )
        }))
      } else if (resize) {
        const w = Math.max(180, resize.w + (e.clientX - resize.startX) / v.zoom)
        const h = Math.max(80, resize.h + (e.clientY - resize.startY) / v.zoom)
        patchNode(resize.id, { w, h } as never)
      } else if (pen) {
        const p = toWorld(e.clientX, e.clientY)
        setPen({ points: [...pen.points, p] })
      }
    }
    const up = () => {
      if (pen && pen.points.length > 2) {
        const xs = pen.points.map((p) => p.x)
        const ys = pen.points.map((p) => p.y)
        const shape = makeShape(Math.min(...xs), Math.min(...ys), 'line')
        shape.w = Math.max(20, Math.max(...xs) - Math.min(...xs))
        shape.h = Math.max(20, Math.max(...ys) - Math.min(...ys))
        shape.points = pen.points.map((p) => ({ x: p.x - shape.x, y: p.y - shape.y }))
        shape.style = { ...shape.style, stroke: '#f472b6', width: 3 }
        addNode(shape)
      }
      setDrag(null)
      setResize(null)
      setPan(null)
      setPen(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [drag, resize, pan, pen, v.zoom, updateBoard, patchNode, addNode])

  const toWorld = (cx: number, cy: number) => {
    const rect = ref.current?.getBoundingClientRect()
    const left = rect?.left ?? 0
    const top = rect?.top ?? 0
    return { x: (cx - left - v.x) / v.zoom, y: (cy - top - v.y) / v.zoom }
  }

  const frameNode = (id: string) => {
    const n = board.nodes.find((x) => x.id === id)
    if (!n) return
    const zoom = Math.min(1.6, Math.max(0.5, Math.min((size.w - 160) / n.w, (size.h - 160) / n.h)))
    updateBoard((b) => ({
      ...b,
      viewport: {
        zoom,
        x: size.w / 2 - (n.x + n.w / 2) * zoom,
        y: size.h / 2 - (n.y + n.h / 2) * zoom
      }
    }))
  }

  // Native listener: React's wheel handler is passive, so preventDefault there warns.
  useEffect(() => {
    const el = ref.current
    if (!el || !active) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const st = useApp.getState()
      const b = st.board()
      if (!b) return
      const cur = b.viewport
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const factor = Math.exp(-e.deltaY * 0.0014)
      const next = Math.min(3, Math.max(0.2, cur.zoom * factor))
      st.updateBoard((bb) => ({
        ...bb,
        viewport: {
          zoom: next,
          x: mx - ((mx - cur.x) * next) / cur.zoom,
          y: my - ((my - cur.y) * next) / cur.zoom
        }
      }))
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [active])

  useEffect(() => {
    if (!marquee) return
    const move = (e: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect || !marqueeRef.current) return
      const next = { ...marqueeRef.current, x: e.clientX - rect.left, y: e.clientY - rect.top }
      marqueeRef.current = next
      setMarquee(next)
    }
    const up = () => {
      const m = marqueeRef.current
      marqueeRef.current = null
      setMarquee(null)
      if (!m || Math.abs(m.x - m.startX) < 4 || Math.abs(m.y - m.startY) < 4) return
      const x1 = (Math.min(m.startX, m.x) - v.x) / v.zoom
      const y1 = (Math.min(m.startY, m.y) - v.y) / v.zoom
      const x2 = (Math.max(m.startX, m.x) - v.x) / v.zoom
      const y2 = (Math.max(m.startY, m.y) - v.y) / v.zoom
      const hits = board.nodes
        .filter((n) => n.x < x2 && n.x + n.w > x1 && n.y < y2 && n.y + n.h > y1)
        .map((n) => n.id)
      setSelection(m.additive ? [...new Set([...selected, ...hits])] : hits)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [marquee !== null, board.nodes, selected, v.x, v.y, v.zoom, setSelection])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input,textarea,select,[contenteditable]')) return
      const mod = e.metaKey || e.ctrlKey
      const key = e.key.toLowerCase()
      if (mod && (e.key === '+' || e.key === '=')) {
        e.preventDefault()
        updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.min(3, b.viewport.zoom + 0.1) } }))
      } else if (mod && e.key === '-') {
        e.preventDefault()
        updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.max(0.2, b.viewport.zoom - 0.1) } }))
      } else if (mod && key === 'c' && selected.length) {
        clipboard.current = structuredClone(board.nodes.filter((n) => selected.includes(n.id)))
      } else if (mod && key === 'x' && selected.length) {
        clipboard.current = structuredClone(board.nodes.filter((n) => selected.includes(n.id)))
        removeNodes(selected)
      } else if (mod && key === 'v' && clipboard.current.length) {
        e.preventDefault()
        const copies = clipboard.current.map((n) => {
          const copy = structuredClone(n) as AnyNode
          copy.id = uid()
          copy.x += 36
          copy.y += 36
          if (copy.kind === 'console') copy.launchKey = 0
          return copy
        })
        addNodes(copies)
        setSelection(copies.map((c) => c.id))
      } else if (mod && key === 'a') {
        e.preventDefault()
        setSelection(board.nodes.map((n) => n.id))
      } else if (mod && key === 'd') {
        e.preventDefault()
        const copies = board.nodes
          .filter((n) => selected.includes(n.id))
          .map((n) => {
            const copy = structuredClone(n) as AnyNode
            copy.id = uid()
            copy.x += 34
            copy.y += 34
            if (copy.kind === 'console') copy.launchKey = 0
            return copy
          })
        if (copies.length) {
          addNodes(copies)
          setSelection(copies.map((c) => c.id))
        }
      } else if (e.key.startsWith('Arrow') && selected.length) {
        e.preventDefault()
        const step = e.shiftKey ? 10 : 1
        const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0
        const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0
        updateBoard((b) => ({
          ...b,
          nodes: b.nodes.map((n) => (selected.includes(n.id) ? { ...n, x: n.x + dx, y: n.y + dy } : n))
        }))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, board.nodes, selected, setSelection, addNodes, updateBoard, removeNodes])

  const insertAt = (cx: number, cy: number) => {
    const p = toWorld(cx, cy)
    if (tool === 'image') {
      void window.api.dialog.pickFiles().then((files) => {
        if (!files.length) return
        addNode({
          id: uid(),
          kind: 'image',
          x: p.x,
          y: p.y,
          w: 380,
          h: 260,
          z: 1,
          title: files[0].split(/[\\/]/).pop() ?? 'Image',
          src: `file:///${files[0].replace(/\\/g, '/')}`,
          path: files[0]
        })
      })
      return
    }
    const kind =
      tool === 'note' ? 'note'
        : tool === 'text' ? 'text'
          : tool === 'web' ? 'web tile'
            : tool === 'console' ? 'console'
              : tool === 'shape' ? 'shape' : null
    if (!kind) return
    const st = useApp.getState()
    const node = newNode(kind, p.x - 60, p.y - 30, {
      cwd: st.repos.find((r) => r.id === st.activeRepoId)?.path,
      ...(kind === 'console' ? { agentId: st.settings.defaultAgent } : {})
    })
    addNode(node)
    setSelection([node.id])
    if (tool !== 'console') setTool('select')
  }

  const onBackgroundDown = (e: React.PointerEvent) => {
    if (e.button === 1 || e.button === 2 || tool === 'hand' || space) {
      e.preventDefault()
      setPan({ kind: 'pan', startX: e.clientX, startY: e.clientY, vx: v.x, vy: v.y })
      return
    }
    if (e.button !== 0) return
    if (tool === 'wire') {
      if (wireFrom) {
        setWireFrom(null)
        toast('Connection canceled', 'info')
      }
      return
    }
    if (tool === 'pen') {
      setPen({ points: [toWorld(e.clientX, e.clientY)] })
      return
    }
    if (['note', 'text', 'web', 'console', 'shape', 'image'].includes(tool)) {
      insertAt(e.clientX, e.clientY)
      return
    }
    if (tool === 'select') {
      const rect = ref.current!.getBoundingClientRect()
      const m: MarqueeState = {
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        additive: e.shiftKey
      }
      marqueeRef.current = m
      setMarquee(m)
      if (!e.shiftKey) setSelection([])
      return
    }
    if (tool === 'eraser') setSelection([])
  }

  const onNodeDown = (e: React.PointerEvent, node: AnyNode) => {
    e.stopPropagation()
    if (e.button === 1 || e.button === 2 || tool === 'hand' || space) {
      e.preventDefault()
      setPan({ kind: 'pan', startX: e.clientX, startY: e.clientY, vx: v.x, vy: v.y })
      return
    }
    if (tool === 'wire') {
      e.preventDefault()
      if (!wireFrom) {
        setWireFrom(node.id)
        setSelection([node.id])
        toast('Rope: click another node', 'info')
        return
      }
      if (wireFrom === node.id) {
        setWireFrom(null)
        return
      }
      const source = board.nodes.find((n) => n.id === wireFrom)
      if (!source) {
        setWireFrom(node.id)
        setSelection([node.id])
        return
      }
      const result = connectNodes(wireFrom, node.id)
      if (result === 'added') toast(`Roped ${source.title} to ${node.title}`, 'ok')
      else if (result === 'removed') toast('Connection removed', 'info')
      setSelection([node.id])
      if (source.kind !== 'orchestrator') setWireFrom(null)
      return
    }
    if (tool === 'eraser') {
      if (node.kind === 'console') {
        if (window.confirm(`Remove ${node.title} from the board? Its session ends.`)) removeNodes([node.id])
      } else removeNodes([node.id])
      return
    }
    if (e.button !== 0) return
    const interactive = (e.target as HTMLElement).closest(
      'input,textarea,select,button,a,webview,.term-host,[contenteditable],.no-drag,.kb-card,[draggable]'
    )
    if (!interactive) {
      if (e.shiftKey) toggleSelect(node.id)
      else if (!selected.includes(node.id)) setSelection([node.id])
      bringToFront(node.id)
      const ids = selected.includes(node.id) ? selected : [node.id]
      const origins: Record<string, { x: number; y: number }> = {}
      for (const n of board.nodes) if (ids.includes(n.id)) origins[n.id] = { x: n.x, y: n.y }
      setDrag({ kind: 'drag', startX: e.clientX, startY: e.clientY, ids, origins })
      return
    }
    bringToFront(node.id)
    if (!e.shiftKey) setSelection([node.id])
  }

  const startResize = (e: React.PointerEvent, node: AnyNode) => {
    e.stopPropagation()
    setResize({ kind: 'resize', id: node.id, startX: e.clientX, startY: e.clientY, w: node.w, h: node.h })
  }

  const groupBounds = (ids: string[]) => {
    const members = board.nodes.filter((n) => ids.includes(n.id))
    if (!members.length) return null
    const x = Math.min(...members.map((n) => n.x)) - 18
    const y = Math.min(...members.map((n) => n.y)) - 34
    const right = Math.max(...members.map((n) => n.x + n.w)) + 18
    const bottom = Math.max(...members.map((n) => n.y + n.h)) + 18
    return { x, y, w: right - x, h: bottom - y }
  }

  return (
    <div
      ref={ref}
      className={`board tool-${tool} ${pan ? 'panning' : ''}`}
      style={{ backgroundPosition: `${Math.round(v.x)}px ${Math.round(v.y)}px` }}
      onPointerDown={onBackgroundDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="world"
        ref={worldRef}
        style={{ transform: `translate(${Math.round(v.x)}px, ${Math.round(v.y)}px) scale(${v.zoom})` }}
      >
        {board.groups.map((g) => {
          const b = groupBounds(g.memberIds)
          if (!b) return null
          return (
            <div key={g.id} className={`group-box tint-${g.tint}`} style={{ left: b.x, top: b.y, width: b.w, height: b.h }}>
              <div className="group-label">
                <span>{g.name}</span>
                <em>{g.role}</em>
              </div>
            </div>
          )
        })}

        <svg className="wire-layer">
          {board.wires.map((w) => {
            const a = board.nodes.find((n) => n.id === w.from)
            const b = board.nodes.find((n) => n.id === w.to)
            if (!a || !b) return null
            const g = wireGeometry(a, b)
            return (
              <g key={w.id} className={`wire-group wire-${w.kind}`}>
                <path className={`wire-base wire-${w.kind}`} d={g.d} />
                <path className={`wire wire-core wire-${w.kind}`} d={g.d} />
                <circle className={`wire-port wire-${w.kind}`} cx={g.x1} cy={g.y1} r={2.6} />
                <circle className={`wire-port wire-${w.kind}`} cx={g.x2} cy={g.y2} r={2.6} />
              </g>
            )
          })}
          {wireSource && wireCursor && (() => {
            const g = wireGeometry(wireSource, { x: wireCursor.x, y: wireCursor.y, w: 0, h: 0 })
            return <path className="wire wire-ghost" d={g.d} />
          })()}
        </svg>

        {board.nodes.map((node) => {
          const accent = node.kind === 'console' ? getAgent(node.agentId).color : undefined
          return (
          <div
            key={node.id}
            className={`node node-${node.kind} ${selected.includes(node.id) ? 'selected' : ''} ${wireFrom === node.id ? 'wire-source' : ''} ${drag && drag.ids.includes(node.id) ? 'dragging' : ''}`}
            style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: node.z, ...(accent ? { '--node-accent': accent } : {}) } as CSSProperties}
            onPointerDown={(e) => onNodeDown(e, node)}
            onDoubleClick={(e) => {
              if (node.kind === 'console' && (e.target as HTMLElement).closest('.node-head')) frameNode(node.id)
            }}
          >
            <NodeBody node={node} />
            {selected.includes(node.id) && (
              <div className="resize-handle" onPointerDown={(e) => startResize(e, node)} />
            )}
          </div>
          )
        })}
      </div>

      {pen && (
        <svg className="pen-layer">
          <polyline
            points={pen.points.map((p) => `${p.x * v.zoom + v.x},${p.y * v.zoom + v.y}`).join(' ')}
            fill="none"
            stroke="#f472b6"
            strokeWidth={3}
          />
        </svg>
      )}

      <div className="zoom-hud">
        <button className="icon" onClick={() => updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.max(0.2, b.viewport.zoom - 0.1) } }))}>−</button>
        <span>{Math.round(v.zoom * 100)}%</span>
        <button className="icon" onClick={() => updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.min(3, b.viewport.zoom + 0.1) } }))}>+</button>
        <button className="icon" title="Fit" onClick={() => window.dispatchEvent(new CustomEvent('hive:fit'))}>⤢</button>
      </div>

      {marquee && (
        <div
          className="marquee"
          style={{
            left: Math.min(marquee.startX, marquee.x),
            top: Math.min(marquee.startY, marquee.y),
            width: Math.abs(marquee.x - marquee.startX),
            height: Math.abs(marquee.y - marquee.startY)
          }}
        />
      )}

      {tool === 'wire' && (
        <div className="tool-note wire-banner" onPointerDown={(e) => e.stopPropagation()}>
          <span className="wire-banner-dot" />
          <span>{wireSource ? `Connect ${wireSource.title} to…` : 'Connect: click the first node'}</span>
          <button className="link" onClick={() => { setWireFrom(null); setTool('select') }}>Cancel</button>
        </div>
      )}
      {tool === 'pen' && <div className="tool-note">Pen: drag to draw. P/E switch pen and eraser.</div>}
      {tool === 'eraser' && <div className="tool-note">Eraser: click a node to remove it.</div>}
      {tool === 'text' && <div className="tool-note">Click anywhere to place a text box.</div>}
    </div>
  )
}

export type { ConsoleNode }
