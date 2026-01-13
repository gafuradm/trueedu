// app/progress/page.js - исправленная версия
'use client'

import { useEffect, useState } from 'react'
import ProgressDashboard from '../components/ProgressDashboard'
import { Trophy, Calendar, Target, BarChart3, CheckCircle } from 'lucide-react'
import { useAuth } from '../lib/hooks/useAuth'

export default function ProgressPage() {
  const { user } = useAuth()
  const [dailyGoal, setDailyGoal] = useState('')
  const [goalSaved, setGoalSaved] = useState(false)

  const saveDailyGoal = () => {
    if (!user) {
      alert('Войдите, чтобы сохранять цели')
      return
    }
    if (!dailyGoal.trim()) {
      alert('Введите цель')
      return
    }
    
    // TODO: Сохранить в Supabase
    setGoalSaved(true)
    setTimeout(() => setGoalSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Trophy className="text-amber-500" />
            Мой прогресс
          </h1>
          <p className="text-gray-600">
            Отслеживай свои достижения и учебные цели
          </p>
        </div>

        {/* Ежедневная цель */}
        <div className="card mb-8 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-primary-600" />
            <h2 className="text-xl font-bold">Цель на сегодня</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="Например: изучить основы Python за 1 час"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              onKeyPress={(e) => e.key === 'Enter' && saveDailyGoal()}
            />
            <button
              onClick={saveDailyGoal}
              className="btn-primary px-6 py-3 whitespace-nowrap text-sm md:text-base"
            >
              {goalSaved ? (
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Сохранено!
                </span>
              ) : 'Сохранить цель'}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-3">
            Что ты планируешь сделать сегодня для своего развития?
          </p>
        </div>

        {/* Панель прогресса */}
        {user ? (
          <ProgressDashboard userId={user.id} />
        ) : (
          <div className="card text-center py-12">
            <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Войдите для отслеживания прогресса</h3>
            <p className="text-gray-600 mb-4">
              Авторизуйтесь, чтобы видеть вашу статистику и достижения
            </p>
          </div>
        )}

        {/* Календарь активности - оптимизация для мобильных */}
        <div className="card mt-8 overflow-x-auto">
          <div className="flex items-center gap-3 mb-6 min-w-0">
            <Calendar className="text-secondary-600 flex-shrink-0" />
            <h2 className="text-xl font-bold truncate">Активность за неделю</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-1 md:gap-2 min-w-[300px]">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => (
              <div key={day} className="text-center min-w-0">
                <div className="text-xs md:text-sm font-medium mb-1 md:mb-2 truncate">{day}</div>
                <div 
                  className={`h-6 md:h-8 rounded-lg mx-auto ${
                    idx < 3 ? 'bg-green-500' : idx < 5 ? 'bg-green-300' : 'bg-gray-100'
                  }`}
                  style={{ width: '80%', maxWidth: '48px' }}
                  title={`${idx < 3 ? '90' : idx < 5 ? '45' : '0'} минут`}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4 mt-6 text-xs md:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded flex-shrink-0"></div>
              <span className="truncate">90+ минут</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-300 rounded flex-shrink-0"></div>
              <span className="truncate">45+ минут</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 rounded flex-shrink-0"></div>
              <span className="truncate">Нет активности</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}