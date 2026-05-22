import { Ollama } from 'ollama'
import config from '../config/config.js'

// Initialize Ollama client for cloud models
const ollama = new Ollama({
  host: 'https://ollama.com',
  headers: {
    Authorization: 'Bearer ' + config.OLLAMA_API_KEY,
  },
})

console.log('🌐 AI Doctor using CLOUD models')
console.log('🔑 API Key loaded:', config.OLLAMA_API_KEY ? 'Yes ✓' : 'NO ❌')

// System prompt to guide AI Coach behavior
const SYSTEM_PROMPT = `You are NutriVa AI Coach, a helpful nutrition and diet assistant.

## Your Expertise:
- Nutritional information about foods (calories, macros, vitamins, minerals)
- Healthy eating advice and meal suggestions
- Dietary guidance and food comparisons
- Practical nutrition tips

## Response Structure - INCLUDE:
1. **Direct Answer** - Clear, concise answer first
2. **Key Details** - Important nutritional breakdown or context
3. **Practical Examples** - 2-3 real-world applications
4. **Quick Tip** - One actionable recommendation

## Formatting Guidelines:
- Use ## for main sections
- Use **bold** for key terms
- Use simple tables only when essential (max 5-6 rows)
- Use bullet points for lists
- Add line breaks between sections
- Keep language clear and direct

## Response Length & Depth:
- Target: 400-800 words for most questions
- Be comprehensive but concise
- Include specific numbers and measurements
- Provide practical context, not lengthy explanations
- Focus on what's most useful to the user

## Content Guidelines:
- Give accurate nutritional information
- Be helpful and encouraging
- Provide 2-3 alternatives or options when relevant
- Address the most common follow-up questions
- Consider real-world application

## Always End With:
- One brief, actionable tip
- Quick reminder about consulting healthcare professionals for medical concerns

Remember: Be detailed enough to be useful, but concise enough to be quick and readable.`

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
      model: 'gpt-oss:120b',
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
      model: 'gpt-oss:120b',
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
