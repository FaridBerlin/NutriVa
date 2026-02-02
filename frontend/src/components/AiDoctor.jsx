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
    <div className="flex flex-col h-[calc(100vh-5rem)] lg:h-[calc(100vh-2rem)] max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-white/20 rounded-full">
            <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              AI Doctor
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm">
              Ask me anything about nutrition & diet
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 px-2">
            <div className="p-3 sm:p-4 bg-teal-100 dark:bg-teal-900/50 rounded-full mb-3 sm:mb-4">
              <Bot className="w-8 h-8 sm:w-12 sm:h-12 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Welcome to AI Doctor!
            </h3>
            <p className="max-w-md text-xs sm:text-sm">
              I'm your nutrition assistant. Ask me about calories, macros,
              healthy eating tips, or any diet-related questions.
            </p>
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {[
                'Quick 20g protein snacks I can eat at my desk?',
                'What are good protein sources?',
                'Is coffee before training a good idea?',
                'Best foods for weight loss?',
                'Foods that boost metabolism—real or myth?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 dark:hover:border-teal-600 transition-colors text-gray-700 dark:text-gray-300"
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
              className={`flex gap-2 sm:gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white rounded-br-md'
                    : message.isError
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-bl-md'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-md'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none prose-headings:text-gray-800 dark:prose-headings:text-gray-200 prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2 prose-h1:text-base sm:prose-h1:text-lg prose-h2:text-sm sm:prose-h2:text-base prose-h3:text-xs sm:prose-h3:text-sm prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:my-2 prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-ul:my-2 prose-li:my-1 prose-table:text-xs prose-table:my-3 prose-th:bg-teal-50 dark:prose-th:bg-teal-900/30 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-td:border dark:prose-td:border-gray-700 prose-th:border dark:prose-th:border-gray-700 prose-table:border-collapse">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm">{message.content}</p>
                )}
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-600 flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-2 sm:gap-3 justify-start">
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl rounded-bl-md px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                <span className="text-xs sm:text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="p-2 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex gap-2 sm:gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about nutrition, diet tips..."
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-3 sm:px-6 py-2.5 sm:py-3 bg-teal-600 text-white rounded-lg sm:rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 text-center px-2">
          AI Doctor provides general nutrition info. Always consult a healthcare
          professional for medical advice.
        </p>
      </form>
    </div>
  )
}
