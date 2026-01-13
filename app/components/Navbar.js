'use client'

import { useState } from 'react'
import { useAuth } from '../lib/hooks/useAuth'
import { Menu, X, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Лого и навигация */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🧠</span>
                </div>
                <span className="text-xl font-bold gradient-text">SkillForge</span>
              </Link>

              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/courses" className="text-gray-700 hover:text-primary-600 font-medium">
                  Курсы
                </Link>
                <Link href="/community" className="text-gray-700 hover:text-primary-600 font-medium">
                  Сообщество
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
                  Личный кабинет
                </Link>
              </div>
            </div>

            {/* Кнопки авторизации */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User size={18} className="text-primary-600" />
                    </div>
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
                  >
                    <LogOut size={18} />
                    <span>Выйти</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Вход
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn-primary"
                  >
                    Начать бесплатно
                  </button>
                </>
              )}
            </div>

            {/* Мобильное меню */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Мобильное меню (выпадающее) */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-3">
                <Link 
                  href="/courses" 
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Курсы
                </Link>
                <Link 
                  href="/community" 
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Сообщество
                </Link>
                <Link 
                  href="/dashboard" 
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Личный кабинет
                </Link>
                
                {user ? (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="px-3 py-2 text-gray-700">
                      {user.email}
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Выйти
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                    >
                      Войти
                    </button>
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-center px-3 py-2 btn-primary"
                    >
                      Начать бесплатно
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}