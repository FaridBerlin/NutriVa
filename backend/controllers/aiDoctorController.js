import {
  chatWithAIDoctor,
  streamChatWithAIDoctor,
} from '../services/aiDoctorService.js'


export const chat = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      })
    }

    const response = await chatWithAIDoctor(message, conversationHistory || [])

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
      error: error.message || 'Failed to get response from AI Doctor',
    })
  }
}


export const streamChat = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      })
    }

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const stream = streamChatWithAIDoctor(message, conversationHistory || [])

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`)
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    console.error('AI Doctor Stream Error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to stream response from AI Doctor',
    })
  }
}
