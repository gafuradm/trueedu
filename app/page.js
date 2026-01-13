'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Rocket, Users, Target, Award, ChevronRight, PlayCircle, BookOpen, Clock, Star, Brain, Sparkles } from 'lucide-react'
import { supabase } from './lib/supabase'
import LearningPlanGenerator from './components/LearningPlanGenerator'
import { useAuth } from './lib/hooks/useAuth'

export default function Home() {
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    totalStudents: 1256,
    completionRate: 95,
    averageRating: 4.8
  })
  
  const { user } = useAuth()

  useEffect(() => {
    loadFeaturedCourses()
  }, [])

  const loadFeaturedCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('Error loading courses:', error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Rocket size={16} className="text-primary-600" />
              <span className="text-sm font-medium">Сейчас в бете • {stats.totalStudents}+ учеников</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="block gradient-text">Твой ИИ-Наставник</span>
              <span className="block text-gray-900">в Обучении</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              SkillForge создаёт персонализированные планы обучения на 20 дней. 
              Ежедневные микро-уроки, практика и геймификация — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/courses" 
                className="inline-flex items-center justify-center btn-primary"
              >
                <Rocket className="mr-2" />
                Начать бесплатно
                <ChevronRight className="ml-2" />
              </Link>
              
              <button className="inline-flex items-center justify-center btn-secondary">
                <PlayCircle className="mr-2" />
                Смотреть демо
              </button>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card text-center">
                <Users className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stats.totalStudents.toLocaleString('ru-RU')}+</div>
                <div className="text-gray-600">Активных учеников</div>
              </div>
              
              <div className="card text-center">
                <Target className="w-8 h-8 text-success mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stats.completionRate}%</div>
                <div className="text-gray-600">Завершают курс</div>
              </div>
              
              <div className="card text-center">
                <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stats.averageRating}/5</div>
                <div className="text-gray-600">Средний рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👇 НОВАЯ СЕКЦИЯ: ИИ-Наставник и генератор планов */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full mb-4">
              <Brain size={18} />
              <span className="font-medium">ИИ-Наставник в действии</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Начни учиться с ИИ уже сегодня
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Получи персональный план и задавай вопросы 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Генератор учебных планов */}
            <div>
              <LearningPlanGenerator />
            </div>
            
            {/* Приветствие для авторизованных */}
            <div className="card h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {user ? `Привет, ${user.email?.split('@')[0]}!` : 'Добро пожаловать в SkillForge!'}
                  </h3>
                  <p className="text-gray-600">
                    {user 
                      ? 'Твой ИИ-наставник готов помочь! Нажми на иконку в правом нижнем углу.' 
                      : 'Войди, чтобы получить персональные рекомендации и отслеживать прогресс'
                    }
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-700">
                    <span>💡</span> Советы от ИИ-наставника
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Учись по 30 минут в день для лучшего запоминания</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Практикуйся сразу после изучения теории</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Задавай вопросы ИИ-наставнику в чате справа внизу</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Отслеживай прогресс в разделе "Мой прогресс"</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-green-700">
                    <span>🚀</span> Быстрый старт с ИИ
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Нажми на иконку чата в правом нижнем углу и скажи:
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/80 p-3 rounded-lg text-xs border">
                      "Объясни <span className="text-primary-600 font-medium">Python</span> для начинающих"
                    </div>
                    <div className="bg-white/80 p-3 rounded-lg text-xs border">
                      "Помоги с <span className="text-primary-600 font-medium">английской грамматикой</span>"
                    </div>
                    <div className="bg-white/80 p-3 rounded-lg text-xs border">
                      "Создай план изучения <span className="text-primary-600 font-medium">квантовой физики</span>"
                    </div>
                  </div>
                </div>
              </div>
              
              {!user && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-3">
                    Хочешь сохранять прогресс и получать персонализированные планы?
                  </p>
                  <Link 
                    href="/progress" 
                    className="block w-full text-center btn-secondary"
                  >
                    Создать аккаунт
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎯 Популярные курсы
            </h2>
            <p className="text-xl text-gray-600">
              Начни с самого востребованного
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="card group hover:shadow-2xl transition-all duration-300">
                <div 
                  className="h-48 rounded-xl mb-6 flex items-center justify-center text-7xl"
                  style={{ backgroundColor: course.color + '20' }}
                >
                  {course.icon}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {course.difficulty === 'beginner' ? 'Начинающий' : 'Средний'}
                    </span>
                    <div className="flex items-center text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 font-semibold">4.8</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.short_description || course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration_days} дней</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.daily_minutes} мин/день</span>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="block w-full text-center btn-primary"
                  >
                    Начать курс
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/courses" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              Смотреть все курсы
              <ChevronRight className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ⚡ Как это работает
            </h2>
            <p className="text-xl text-gray-600">
              3 простых шага к новым навыкам
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Выбери навык</h3>
              <p className="text-gray-600">
                Python, английский, дизайн или подготовка к ЕГЭ. 5 минут на выбор.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Получи план на 20 дней</h3>
              <p className="text-gray-600">
                ИИ создаёт персонализированный план под твой темп и цели.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-success-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Учись по 30 минут в день</h3>
              <p className="text-gray-600">
                Микро-уроки, практика, проверка. Без перегрузки, с постоянным прогрессом.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Начни меняться уже сегодня
          </h2>
          
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Присоединяйся к {stats.totalStudents.toLocaleString('ru-RU')}+ ученикам, 
            которые уже осваивают новые навыки
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform"
            >
              <Rocket className="mr-2" />
              Начать бесплатно
              <ChevronRight className="ml-2" />
            </Link>

            <Link
              href="/progress"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-colors"
            >
              <PlayCircle className="mr-2" />
              Отслеживать прогресс
            </Link>
          </div>

          <p className="mt-8 opacity-75">
            Первые 7 дней — полностью бесплатно. Никаких карт.
          </p>
        </div>
      </section>
    </div>
  )
}