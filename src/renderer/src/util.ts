import { nanoid } from 'nanoid'

export const uid = (n = 10) => nanoid(n)

export const baseName = (p: string): string => {
  const parts = p.replace(/[\\/]+$/, '').split(/[\\/]/)
  return parts[parts.length - 1] || p
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export const timeAgo = (ts: number): string => {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1000))
  if (s < 60) return `${s}s`
  if (s < 3600) return `${Math.round(s / 60)}m`
  if (s < 86400) return `${Math.round(s / 3600)}h`
  return `${Math.round(s / 86400)}d`
}

export const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const formatTokens = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export const dayKey = (d: Date): string => {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/** 16-bit mono WAV from a decoded AudioBuffer, base64 encoded for IPC. */
export function audioToWavBase64(buffer: AudioBuffer): string {
  const ch = buffer.getChannelData(0)
  const rate = buffer.sampleRate
  const bytes = new ArrayBuffer(44 + ch.length * 2)
  const view = new DataView(bytes)
  const write = (off: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i))
  }
  write(0, 'RIFF')
  view.setUint32(4, 36 + ch.length * 2, true)
  write(8, 'WAVE')
  write(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, rate, true)
  view.setUint32(28, rate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  write(36, 'data')
  view.setUint32(40, ch.length * 2, true)
  let off = 44
  for (let i = 0; i < ch.length; i++, off += 2) {
    const s = Math.max(-1, Math.min(1, ch[i]))
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  let binary = ''
  const u8 = new Uint8Array(bytes)
  const chunk = 0x8000
  for (let i = 0; i < u8.length; i += chunk) {
    binary += String.fromCharCode(...u8.subarray(i, i + chunk))
  }
  return btoa(binary)
}

export const isElectron = typeof window !== 'undefined' && !!window.api
