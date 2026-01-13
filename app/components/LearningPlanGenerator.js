// app/components/LearningPlanGenerator.js
'use client'

import { useState } from 'react'
import { Calendar, Target, BookOpen } from 'lucide-react'

export default function LearningPlanGenerator() {
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('beginner')
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const generatePlan = async () => {
    if (!topic.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level, days: 30 })
      })
      
      const data = await response.json()
      setPlan(data.plan)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
          <Calendar className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Генератор учебного плана</h3>
          <p className="text-gray-600">Получи персональный план на 30 дней</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            <BookOpen size={16} className="inline mr-1" />
            Чему хочешь научиться?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Например: Python, квантовая физика, английский B2..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <Target size={16} className="inline mr-1" />
            Твой текущий уровень
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="beginner">Начинающий (знаю совсем немного)</option>
            <option value="intermediate">Средний (есть базовые знания)</option>
            <option value="advanced">Продвинутый (хочу углубить знания)</option>
          </select>
        </div>

        <button
          onClick={generatePlan}
          disabled={loading || !topic.trim()}
          className="w-full btn-primary flex items-center justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Сгенерировать план обучения'
          )}
        </button>
      </div>

      {plan && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
          <h4 className="font-bold mb-2">📚 Ваш план обучения:</h4>
          <pre className="whitespace-pre-wrap text-sm font-sans">{plan}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(plan)}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700"
          >
            Скопировать план
          </button>
        </div>
      )}
    </div>
  )
}