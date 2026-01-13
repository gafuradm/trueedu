// app/progress/page.js
'use client'

import { useEffect, useState } from 'react'
import ProgressDashboard from '../components/ProgressDashboard'
import { Trophy, Calendar, Target, BarChart3 } from 'lucide-react'
import { useAuth } from '../lib/hooks/useAuth'

export default function ProgressPage() {
  const { user } = useAuth()
  const [dailyGoal, setDailyGoal] = useState('')

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
    alert(`Цель сохранена: ${dailyGoal}`)
    setDailyGoal('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Trophy className="text-amber-500" />
            Мой прогресс
          </h1>
          <p className="text-gray-600 text-lg">
            Отслеживай свои достижения и учебные цели
          </p>
        </div>

        {/* Ежедневная цель */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-primary-600" />
            <h2 className="text-xl font-bold">Цель на сегодня</h2>
          </div>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="Например: изучить основы Python за 1 час"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              onKeyPress={(e) => e.key === 'Enter' && saveDailyGoal()}
            />
            <button
              onClick={saveDailyGoal}
              className="btn-primary px-6"
            >
              Сохранить
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
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

        {/* Календарь активности */}
        <div className="card mt-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-secondary-600" />
            <h2 className="text-xl font-bold">Активность за неделю</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium mb-2">{day}</div>
                <div 
                  className={`h-8 rounded-lg ${
                    idx < 3 ? 'bg-green-500' : idx < 5 ? 'bg-green-300' : 'bg-gray-100'
                  }`}
                  title={`${idx < 3 ? '90' : idx < 5 ? '45' : '0'} минут`}
                />
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>90+ минут</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-300 rounded"></div>
              <span>45+ минут</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 rounded"></div>
              <span>Нет активности</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}