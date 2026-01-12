import dotenv from 'dotenv'
import { Ollama } from 'ollama'

dotenv.config({ path: '../.env' })

const ollama = new Ollama({
  host: 'https://ollama.com',
  headers: {
    Authorization: 'Bearer ' + process.env.OLLAMA_API_KEY,
  },
})

const response = await ollama.chat({
  model: 'gpt-oss:120b',
  messages: [{ role: 'user', content: 'how is the weather in berlin today?' }],
  stream: true,
})

for await (const part of response) {
  process.stdout.write(part.message.content)
}
