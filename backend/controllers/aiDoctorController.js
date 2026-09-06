import {
  chatWithAIDoctor,
  streamChatWithAIDoctor,
} from '../services/aiDoctorService.js'

const MAX_MESSAGE_LENGTH = 2000
const MAX_HISTORY_MESSAGES = 20
const MAX_HISTORY_CONTENT_LENGTH = 4000

/**
 * The history is client-supplied, so it is rebuilt here rather than trusted.
 * Without this a caller could inject its own `system` message and override the
 * assistant's instructions, or send an unbounded history to inflate cost.
 */
const sanitizeHistory = (history) => {
  if (!Array.isArray(history)) return []

  return history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim() !== '',
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_HISTORY_CONTENT_LENGTH),
    }))
}

const validateMessage = (message) => {
  if (typeof message !== 'string' || message.trim() === '') {
    return 'Message is required'
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`
  }
  return null
}

export const chat = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body

    const validationError = validateMessage(message)
    if (validationError) {
      return res.status(400).json({ success: false, error: validationError })
    }

    const response = await chatWithAIDoctor(
      message.trim(),
      sanitizeHistory(conversationHistory),
    )

    res.status(200).json({
      success: true,
      data: {
        message: response,
        role: 'assistant',
      },
    })
  } catch (error) {
    console.error('AI Doctor Chat Error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get response from AI Doctor',
    })
  }
}

export const streamChat = async (req, res) => {
  const { message, conversationHistory } = req.body

  const validationError = validateMessage(message)
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError })
  }

  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders?.()

  // Stop generating as soon as the client goes away, otherwise an abandoned
  // request keeps consuming paid LLM tokens.
  let aborted = false
  req.on('close', () => {
    aborted = true
  })

  try {
    const stream = streamChatWithAIDoctor(
      message.trim(),
      sanitizeHistory(conversationHistory),
    )

    for await (const chunk of stream) {
      if (aborted) break
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`)
    }

    if (!aborted) {
      res.write('data: [DONE]\n\n')
    }
    res.end()
  } catch (error) {
    console.error('AI Doctor Stream Error:', error)
    // Headers are already sent at this point, so the error has to travel as an
    // SSE event rather than a JSON status response.
    if (!aborted) {
      res.write(
        `data: ${JSON.stringify({
          error: 'Failed to stream response from AI Doctor',
        })}\n\n`,
      )
      res.write('data: [DONE]\n\n')
    }
    res.end()
  }
}
