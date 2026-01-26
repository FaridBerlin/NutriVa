import api from '../services/api'

const aiDoctorApi = {
  /**
   * Send a message to AI Doctor and get a response
   * @param {string} message - User's question
   * @param {Array} conversationHistory - Previous messages for context
   * @returns {Promise} - AI response
   */
  chat: async (message, conversationHistory = []) => {
    const response = await api.post('/ai-doctor/chat', {
      message,
      conversationHistory,
    })
    return response.data
  },

  /**
   * Stream chat with AI Doctor (for real-time responses)
   * @param {string} message - User's question
   * @param {Array} conversationHistory - Previous messages for context
   * @param {Function} onChunk - Callback for each chunk received
   * @returns {Promise} - Complete when stream ends
   */
  streamChat: async (message, conversationHistory = [], onChunk) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/ai-doctor/chat/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message, conversationHistory }),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to connect to AI Doctor')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') return
          try {
            const parsed = JSON.parse(data)
            if (parsed.content) {
              onChunk(parsed.content)
            }
          } catch {
            // Ignore parsing errors for incomplete chunks
          }
        }
      }
    }
  },
}

export default aiDoctorApi
