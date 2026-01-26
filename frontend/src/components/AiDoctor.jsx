import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Trash2, Stethoscope } from 'lucide-react'
import aiDoctorApi from '../api/aiDoctorApi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AiDoctor() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Convert messages to conversation history format
  const getConversationHistory = () => {
    return messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')

    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    setIsLoading(true)

    try {
      // Use non-streaming API for simplicity
      const response = await aiDoctorApi.chat(
        userMessage,
        getConversationHistory(),
      )

      if (response.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response.data.message },
        ])
      } else {
        throw new Error(response.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('AI Doctor Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const clearChat = () => {
    setMessages([])
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Doctor</h1>
            <p className="text-teal-100 text-sm">
              Ask me anything about nutrition & diet
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="p-4 bg-teal-100 rounded-full mb-4">
              <Bot className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Welcome to AI Doctor!
            </h3>
            <p className="max-w-md text-sm">
              I'm your nutrition assistant. Ask me about calories, macros,
              healthy eating tips, or any diet-related questions.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'How many calories in a banana?',
                'What are good protein sources?',
                'Is intermittent fasting healthy?',
                'Best foods for weight loss?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 transition-colors text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-teal-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white rounded-br-md'
                    : message.isError
                      ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-md'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2 prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-p:text-gray-700 prose-p:my-2 prose-strong:text-gray-800 prose-ul:my-2 prose-li:my-1 prose-table:text-xs prose-table:my-3 prose-th:bg-teal-50 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-td:border prose-th:border prose-table:border-collapse">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-teal-600" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about nutrition, calories, diet tips..."
            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-400 text-center">
          AI Doctor provides general nutrition info. Always consult a healthcare
          professional for medical advice.
        </p>
      </form>
    </div>
  )
}
