import { Ollama } from 'ollama'
import config from '../config/config.js'

const ollama = new Ollama({
  host: 'https://ollama.com',
  headers: {
    Authorization: 'Bearer ' + config.OLLAMA_API_KEY,
  },
})

// System prompt to guide AI Doctor behavior
const SYSTEM_PROMPT = `You are NutriVa AI Doctor, a helpful nutrition and diet assistant. 
You specialize in:
- Nutritional information about foods (calories, macros, vitamins)
- Healthy eating advice and meal suggestions
- General dietary guidance
- Food comparisons and alternatives

Guidelines:
- Provide accurate nutritional information
- Be helpful and encouraging
- Keep responses SHORT and CONCISE (max 200-500 words)
- Use markdown formatting: ## for headers, **bold** for emphasis
- Use small tables (max 5-6 rows) only when essential
- Use bullet points for lists
- Add line breaks between sections for readability
- Give direct, practical answers - avoid lengthy explanations
- End with ONE brief tip or recommendation
- Always recommend consulting a healthcare professional for medical advice`

/**
 * Chat with AI Doctor
 * @param {string} message - User's question
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} - AI response
 */
export const chatWithAIDoctor = async (message, conversationHistory = []) => {
  try {
    // Build messages array with system prompt and conversation history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message },
    ]

    const response = await ollama.chat({
      model: 'deepseek-v3.1:671b',
      messages,
      stream: false, // Non-streaming for simpler API response
    })

    return response.message.content
  } catch (error) {
    console.error('AI Doctor Error:', error)
    throw new Error('Failed to get response from AI Doctor')
  }
}

/**
 * Stream chat with AI Doctor (for real-time responses)
 * @param {string} message - User's question
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {AsyncGenerator} - Streaming response
 */
export const streamChatWithAIDoctor = async function* (
  message,
  conversationHistory = [],
) {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message },
    ]

    const response = await ollama.chat({
      model: 'deepseek-v3.1:671b',
      messages,
      stream: true,
    })

    for await (const part of response) {
      yield part.message.content
    }
  } catch (error) {
    console.error('AI Doctor Streaming Error:', error)
    throw new Error('Failed to stream response from AI Doctor')
  }
}

export default {
  chatWithAIDoctor,
  streamChatWithAIDoctor,
}
