import './globals.css'
import Navbar from './components/Navbar'  // Импортируем клиентский компонент

export const metadata = {
  title: 'SkillForge - ИИ-Наставник',
  description: 'Освой любой навык за 20 дней',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Navbar />  {/* Используем клиентский компонент */}
        {children}
        <footer style={styles.footer}>
          <p>© 2024 SkillForge. Твой ИИ-наставник.</p>
        </footer>
      </body>
    </html>
  )
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '40px',
    background: '#1e293b',
    marginTop: '80px',
  },
}