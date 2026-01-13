// app/components/ProgressDashboard.js
'use client'

import { useEffect, useState } from 'react'
import { Trophy, TrendingUp, Target, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase' // ← ИЗМЕНИТЕ ЭТУ СТРОКУ!

export default function ProgressDashboard({ userId }) {
  const [stats, setStats] = useState({
    totalHours: 0,
    skillsCount: 0,
    streakDays: 0,
    completedSessions: 0
  })
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      loadProgress()
    } else {
      setLoading(false)
    }
  }, [userId])

  const loadProgress = async () => {
    setLoading(true)
    try {
      // Загружаем сессии обучения
      const { data: sessions, error: sessionsError } = await supabase
        .from('learning_sessions')
        .select('duration_minutes')
        .eq('user_id', userId)
      
      if (sessionsError) {
        console.error('Error loading sessions:', sessionsError)
        return
      }

      const totalHours = sessions 
        ? Math.round(sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) / 60)
        : 0

      // Загружаем навыки
      const { data: userSkills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId)
        .order('last_practiced', { ascending: false })
      
      if (skillsError) {
        console.error('Error loading skills:', skillsError)
        return
      }

      // Загружаем цели
      const today = new Date().toISOString().split('T')[0]
      const { data: goals, error: goalsError } = await supabase
        .from('daily_goals')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
      
      const hasGoalToday = goals && goals.length > 0

      setStats({
        totalHours,
        skillsCount: userSkills?.length || 0,
        streakDays: calculateStreak(sessions || []),
        completedSessions: sessions?.length || 0,
        hasGoalToday
      })
      
      setSkills(userSkills || [])
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  // Простая функция для расчета стрика (заглушка)
  const calculateStreak = (sessions) => {
    if (!sessions || sessions.length === 0) return 0
    
    // Простая логика: если были сессии последние 3 дня, показываем 3
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    const recentSessions = sessions.filter(session => {
      const sessionDate = new Date(session.created_at)
      return sessionDate >= yesterday
    })
    
    return recentSessions.length > 0 ? 3 : 0
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Статистика */}
      <div className="card">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="text-amber-500" />
          Ваша статистика
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200">
            <div className="text-2xl font-bold text-primary-700">{stats.totalHours}</div>
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Clock size={14} />
              часов обучения
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-4 rounded-xl border border-secondary-200">
            <div className="text-2xl font-bold text-secondary-700">{stats.skillsCount}</div>
            <div className="text-sm text-gray-600">активных навыков</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-700">{stats.streakDays}</div>
            <div className="text-sm text-gray-600">дней подряд</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">{stats.completedSessions}</div>
            <div className="text-sm text-gray-600">завершённых уроков</div>
          </div>
        </div>

        {stats.hasGoalToday && (
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <Target size={16} />
              <span className="text-sm font-medium">Сегодня есть цель! 🎯</span>
            </div>
          </div>
        )}
      </div>

      {/* Навыки */}
      <div className="card">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="text-green-500" />
          Ваши навыки
        </h3>
        
        <div className="space-y-4">
          {skills.length > 0 ? (
            skills.slice(0, 3).map(skill => (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="text-xs px-2 py-1 bg-gray-100 rounded">
                      Уровень {skill.level}
                    </div>
                    <span className="text-sm font-semibold text-primary-600">
                      {skill.progress_percent}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress_percent}%` }}
                  />
                </div>
                {skill.last_practiced && (
                  <div className="text-xs text-gray-500">
                    Последняя практика: {new Date(skill.last_practiced).toLocaleDateString('ru-RU')}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-gray-600 mb-4">
                Начни обучение, чтобы появились навыки
              </p>
              <p className="text-sm text-gray-500">
                Используй ИИ-наставника или выбери курс
              </p>
            </div>
          )}
        </div>

        {skills.length > 3 && (
          <div className="mt-4 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Показать все {skills.length} навыков →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}