// app/layout.js
import './globals.css'
import Navbar from './components/Navbar'
import AiTutor from './components/AiTutor' // ← ДОБАВИТЬ ЭТОТ ИМПОРТ

export const metadata = {
  title: 'SkillForge - ИИ-наставник для обучения',
  description: 'Освой любой навык за 20 дней с персональным ИИ-наставником',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <AiTutor /> {/* ← ДОБАВИТЬ ЭТУ СТРОКУ - ЧАТ ПОЯВИТСЯ НА ВСЕХ СТРАНИЦАХ */}
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🧠</span>
              </div>
              <span className="text-xl font-bold">SkillForge</span>
            </div>
            <p className="text-gray-400">
              ИИ-наставник для освоения любых навыков
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Курсы</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/courses?category=programming">Программирование</Link></li>
              <li><Link href="/courses?category=design">Дизайн</Link></li>
              <li><Link href="/courses?category=data">Data Science</Link></li>
              <li><Link href="/courses?category=language">Языки</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Платформа</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about">О проекте</Link></li>
              <li><Link href="/pricing">Тарифы</Link></li>
              <li><Link href="/blog">Блог</Link></li>
              <li><Link href="/contact">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Контакты</h3>
            <p className="text-gray-400">
              hello@skillforge.ai
            </p>
            <p className="text-gray-400 mt-2">
              Поддержка 24/7
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SkillForge. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

// Простой Link компонент для layout
function Link({ href, children, ...props }) {
  return (
    <a 
      href={href} 
      className="hover:text-white transition-colors"
      {...props}
    >
      {children}
    </a>
  )
}