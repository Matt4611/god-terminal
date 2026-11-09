import type { LLMResult, LlmProvider } from '../shared/types'

export interface ChatOpts {
  messages: { role: string; content: string }[]
  model?: string
  url?: string
  provider?: LlmProvider
  json?: boolean
  temperature?: number
  signal?: AbortSignal
}

const DEFAULT_OLLAMA_URL = 'http://127.0.0.1:11434'
const DEFAULT_OLLAMA_MODEL = 'gpt-oss:20b'
const DEFAULT_LMSTUDIO_URL = 'http://127.0.0.1:1234/v1'

function ollamaBase(url = DEFAULT_OLLAMA_URL): string {
  return (url || DEFAULT_OLLAMA_URL).trim().replace(/\/+$/, '')
}

function lmStudioBase(url = DEFAULT_LMSTUDIO_URL): string {
  let base = (url || DEFAULT_LMSTUDIO_URL).trim().replace(/\/+$/, '')
  base = base.replace(/\/chat\/completions$/i, '').replace(/\/models$/i, '')
  if (!/\/v1$/i.test(base)) base += '/v1'
  return base
}

export async function models(url?: string, provider: LlmProvider = 'ollama'): Promise<string[]> {
  try {
    if (provider === 'lmstudio') {
      const res = await fetch(`${lmStudioBase(url)}/models`, {
        signal: AbortSignal.timeout(4000)
      })
      if (!res.ok) return []
      const json = (await res.json()) as {
        data?: { id?: string; name?: string }[]
        models?: { id?: string; name?: string }[]
      }
      const list = json.data ?? json.models ?? []
      return list
        .map((m) => m.id ?? m.name ?? '')
        .filter((m): m is string => Boolean(m))
    }

    const res = await fetch(`${ollamaBase(url)}/api/tags`, {
      signal: AbortSignal.timeout(4000)
    })
    if (!res.ok) return []
    const json = (await res.json()) as { models?: { name: string }[] }
    return (json.models ?? []).map((m) => m.name)
  } catch {
    return []
  }
}

export async function chat(opts: ChatOpts): Promise<LLMResult> {
  const provider = opts.provider ?? 'ollama'
  if (provider === 'lmstudio') return lmStudioChat(opts)
  return ollamaChat(opts)
}

async function ollamaChat(opts: ChatOpts): Promise<LLMResult> {
  const url = ollamaBase(opts.url)
  const model = opts.model || DEFAULT_OLLAMA_MODEL
  try {
    const res = await fetch(`${url}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: opts.messages,
        stream: false,
        ...(opts.json ? { format: 'json' } : {}),
        options: { temperature: opts.temperature ?? 0.2 }
      }),
      signal: opts.signal ?? AbortSignal.timeout(120000)
    })
    if (!res.ok) {
      return { ok: false, text: '', error: `Ollama ${res.status}: ${(await res.text()).slice(0, 300)}`, model }
    }
    const json = (await res.json()) as { message?: { content?: string }; error?: string }
    if (json.error) return { ok: false, text: '', error: json.error, model }
    return { ok: true, text: json.message?.content ?? '', model }
  } catch (err) {
    return {
      ok: false,
      text: '',
      error:
        err instanceof Error
          ? `Ollama nicht erreichbar (${url}): ${err.message}`
          : 'Ollama nicht erreichbar',
      model
    }
  }
}

async function lmStudioChat(opts: ChatOpts): Promise<LLMResult> {
  const base = lmStudioBase(opts.url)
  const model = opts.model?.trim()
  if (!model) {
    return {
      ok: false,
      text: '',
      error: 'Kein LM-Studio-Modell gewählt. Öffne Settings → Local models.'
    }
  }

  const body = (jsonMode: boolean) => JSON.stringify({
    model,
    messages: opts.messages,
    stream: false,
    temperature: opts.temperature ?? 0.2,
    ...(jsonMode ? { response_format: { type: 'json_object' } } : {})
  })

  try {
    let res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: body(Boolean(opts.json)),
      signal: opts.signal ?? AbortSignal.timeout(120000)
    })

    // Some LM Studio builds reject response_format. Retry once without it.
    if (!res.ok && opts.json) {
      res = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: body(false),
        signal: opts.signal ?? AbortSignal.timeout(120000)
      })
    }

    if (!res.ok) {
      return {
        ok: false,
        text: '',
        error: `LM Studio ${res.status}: ${(await res.text()).slice(0, 300)}`,
        model
      }
    }
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
      error?: { message?: string } | string
    }
    if (json.error) {
      return {
        ok: false,
        text: '',
        error: typeof json.error === 'string' ? json.error : json.error.message ?? 'LM Studio error',
        model
      }
    }
    return { ok: true, text: json.choices?.[0]?.message?.content ?? '', model }
  } catch (err) {
    return {
      ok: false,
      text: '',
      error:
        err instanceof Error
          ? `LM Studio nicht erreichbar (${base}): ${err.message}`
          : 'LM Studio nicht erreichbar',
      model
    }
  }
}

/** Extract the first JSON object from a model answer. */
export function parseJson<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T
  } catch {
    const m = text.match(/\{[\s\S]*\}/)
    if (!m) return fallback
    try {
      return JSON.parse(m[0]) as T
    } catch {
      return fallback
    }
  }
}
