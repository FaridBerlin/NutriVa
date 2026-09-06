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

    // SSE events are newline-delimited but network chunks split anywhere, so
    // hold back the trailing partial line and prepend it to the next chunk.
    // Without this buffer, any `data:` line straddling a chunk boundary was
    // parsed as malformed JSON and silently dropped from the answer.
    let buffer = ''

    const handleLine = (line) => {
      if (!line.startsWith('data: ')) return false
      const data = line.slice(6)
      if (data === '[DONE]') return true
      try {
        const parsed = JSON.parse(data)
        if (parsed.error) {
          throw new Error(parsed.error)
        }
        if (parsed.content) {
          onChunk(parsed.content)
        }
      } catch (err) {
        if (err instanceof SyntaxError) return false
        throw err
      }
      return false
    }

    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        // Flush whatever complete line is left in the buffer.
        buffer += decoder.decode()
        for (const line of buffer.split('\n')) {
          if (handleLine(line.trim())) return
        }
        return
      }

      buffer += decoder.decode(value, { stream: true })

      const lines = buffer.split('\n')
      // The last element is either empty or an incomplete line: keep it.
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (handleLine(line.trim())) return
      }
    }
  },
}

export default aiDoctorApi
