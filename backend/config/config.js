import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from backend root
dotenv.config({ path: path.join(__dirname, '../.env') })

// Export environment variables
const config = {
  // Database
  MONGO_URL: process.env.MONGO_URL,
  DATABASE: process.env.DATABASE,

  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Auth
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  COOKIE_EXPIRE: parseInt(process.env.COOKIE_EXPIRE) || 24,

  // Email
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  // Ollama. Defaults to the hosted service, which is what the API key is for;
  // point OLLAMA_HOST at a local instance to run models yourself.
  OLLAMA_HOST: process.env.OLLAMA_HOST || 'https://ollama.com',
  OLLAMA_API_KEY: process.env.OLLAMA_API_KEY,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'gpt-oss:120b',
  OLLAMA_CHAT_MODEL: process.env.OLLAMA_CHAT_MODEL || 'gpt-oss:120b',
}

export default config
