import { Ollama } from 'ollama'
import config from '../config/config.js'

/**
 * Boot-time validation of the configured Ollama models.
 *
 * Why this exists: when a model is retired or the plan lapses, every meal-plan
 * request fails and silently falls back to hardcoded templates. The app keeps
 * serving plans, so nothing looks broken - it just quietly stops using AI.
 * That went unnoticed in production until the logs were read by hand.
 *
 * Two checks, because they catch different failures:
 *   1. list()     - free. Catches retired models and typos.
 *   2. generate() - 1 token. Catches access failures a listing cannot see,
 *                   e.g. "this model requires a subscription" (403).
 *
 * Never throws and never blocks startup: AI is a feature, not a prerequisite
 * for serving the app. It reports loudly and lets the server run.
 */
export const verifyOllamaModels = async () => {
  if (process.env.OLLAMA_SKIP_HEALTHCHECK === 'true') return

  const ollama = new Ollama({
    host: config.OLLAMA_HOST,
    headers: config.OLLAMA_API_KEY
      ? { Authorization: 'Bearer ' + config.OLLAMA_API_KEY }
      : {},
  })

  const configured = [
    { key: 'OLLAMA_MODEL', purpose: 'meal plans', model: config.OLLAMA_MODEL },
    {
      key: 'OLLAMA_CHAT_MODEL',
      purpose: 'AI Coach',
      model: config.OLLAMA_CHAT_MODEL,
    },
  ]

  let available = null
  try {
    const listed = await ollama.list()
    available = (listed.models || []).map((m) => m.name || m.model)
  } catch (error) {
    console.warn(
      `[ollama] could not list models at ${config.OLLAMA_HOST}: ${error.message}`,
    )
  }

  // De-duplicate so a shared model is only probed once.
  const seen = new Map()
  for (const entry of configured) {
    if (!seen.has(entry.model)) seen.set(entry.model, [])
    seen.get(entry.model).push(entry)
  }

  for (const [model, entries] of seen) {
    const labels = entries.map((e) => `${e.key} / ${e.purpose}`).join(', ')

    if (!model) {
      console.error(`[ollama] no model configured for ${labels}`)
      continue
    }

    if (available && !available.includes(model)) {
      console.error(
        `\n[ollama] "${model}" (${labels}) is NOT in the catalogue at ${config.OLLAMA_HOST}.\n` +
          `         It has probably been retired. AI generation will fail and\n` +
          `         fall back to templates on every request.\n` +
          `         Available: ${available.join(', ')}\n`,
      )
      continue
    }

    try {
      await ollama.generate({
        model,
        prompt: 'ok',
        stream: false,
        options: { num_predict: 1 },
      })
      console.log(`[ollama] ${model} OK (${labels})`)
    } catch (error) {
      const reason = error.message.replace(/\s*\(ref:.*/, '')
      console.error(
        `\n[ollama] "${model}" (${labels}) is listed but NOT USABLE:\n` +
          `         ${reason}\n` +
          `         AI generation will fall back to templates on every request.\n` +
          `         Check OLLAMA_API_KEY and your plan, or set a different model.\n`,
      )
    }
  }
}

export default verifyOllamaModels
