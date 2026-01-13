'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react'

export default function AiTutor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Привет! Я твой ИИ-наставник. Чему бы ты хотел научиться сегодня? Могу объяснить любую тему!' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768 && isOpen && !isFullscreen) {
        setIsFullscreen(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isOpen, isFullscreen])

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          userId: 'temp' // Позже заменим на реальный ID
        })
      })
      
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        assistantMessage += chunk
        
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1].content = assistantMessage
          return newMessages
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
        aria-label="Открыть ИИ-наставник"
      >
        <MessageCircle size={24} />
      </button>
    )
  }

  return (
    <div className={`fixed z-50 ${isMobile && isFullscreen ? 'inset-0' : 'bottom-6 right-6'} ${!isMobile && 'w-96 h-[600px]'}`}>
      {/* Overlay для мобильного fullscreen */}
      {isMobile && isFullscreen && (
        <div 
          className="absolute inset-0 bg-black/20"
          onClick={() => setIsFullscreen(false)}
        />
      )}
      
      <div className={`${isMobile && isFullscreen ? 'absolute inset-4' : 'h-full'} bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200`}>
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🧠</span>
            </div>
            <div>
              <h3 className="font-bold">ИИ-Наставник</h3>
              <p className="text-xs text-gray-600">Готов обучать любой теме</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isMobile && (
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label={isFullscreen ? "Свернуть" : "Развернуть"}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            )}
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 ${msg.role === 'user' ? 'bg-primary-100 text-gray-900' : 'bg-gray-100 text-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Спроси о любой теме..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl px-4 py-3 flex items-center justify-center hover:opacity-90 disabled:opacity-50 min-w-[44px]"
              aria-label="Отправить"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Пример: "Создай 30-дневный курс по Python с проектом"
          </p>
        </div>
      </div>
    </div>
  )
}