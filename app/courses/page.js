'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Search, Filter, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'programming', name: 'Программирование' },
    { id: 'design', name: 'Дизайн' },
    { id: 'data', name: 'Data Science' },
    { id: 'language', name: 'Языки' },
    { id: 'exam', name: 'Подготовка к экзаменам' }
  ]

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [search, category, courses])

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses

    if (category !== 'all') {
      filtered = filtered.filter(course => course.category === category)
    }

    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      )
    }

    setFilteredCourses(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎓 Курсы SkillForge
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Персонализированное обучение с ИИ-наставником
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-4xl">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск курсов..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-12 pr-8 py-3 rounded-xl text-gray-900 appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="card group hover:border-primary-500 transition-colors">
              <div 
                className="h-40 rounded-t-2xl mb-4 flex items-center justify-center text-6xl"
                style={{ backgroundColor: course.color + '20' }}
              >
                {course.icon}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 mb-2">
                      {course.category === 'programming' ? 'Программирование' : 
                       course.category === 'design' ? 'Дизайн' :
                       course.category === 'data' ? 'Data Science' :
                       course.category === 'language' ? 'Языки' : 'Экзамены'}
                    </span>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.short_description || course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration_days} дней</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.difficulty === 'beginner' ? 'Начинающий' : 
                            course.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}</span>
                    </div>
                  </div>
                  
                  {course.is_premium ? (
                    <div className="flex items-center gap-1 text-amber-600">
                      <Star size={16} fill="currentColor" />
                      <span className="font-semibold">{course.price_rub} ₽</span>
                    </div>
                  ) : (
                    <span className="text-success font-semibold">Бесплатно</span>
                  )}
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="block w-full text-center btn-primary"
                >
                  {course.is_premium ? 'Купить курс' : 'Начать обучение'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Курсы не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить поисковый запрос или категорию</p>
          </div>
        )}
      </div>
    </div>
  )
}