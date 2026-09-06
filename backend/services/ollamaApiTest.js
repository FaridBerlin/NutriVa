/**
 * Manual connectivity check for the configured Ollama host.
 * Run directly:  node services/ollamaApiTest.js
 *
 * Guarded so that importing this module never fires a billed API call.
 */
import { Ollama } from 'ollama'
import config from '../config/config.js'

export const testOllamaConnection = async () => {
  const ollama = new Ollama({
    host: config.OLLAMA_HOST,
    headers: config.OLLAMA_API_KEY
      ? { Authorization: 'Bearer ' + config.OLLAMA_API_KEY }
      : {},
  })

  const response = await ollama.chat({
    model: config.OLLAMA_CHAT_MODEL,
    messages: [{ role: 'user', content: 'Reply with OK if you can hear me.' }],
    stream: true,
  })

  for await (const part of response) {
    process.stdout.write(part.message.content)
  }
  process.stdout.write('\n')
}

// Only run when invoked as a script, not on import.
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  testOllamaConnection().catch((error) => {
    console.error('Ollama connectivity check failed:', error.message)
    process.exit(1)
  })
}
