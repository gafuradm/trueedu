'use client'

export default function Home() {
  const skills = [
    { id: 'python', name: '🐍 Python с нуля', days: 20 },
    { id: 'english', name: '🇬🇧 Английский для IT', days: 30 },
    { id: 'figma', name: '🎨 Figma дизайн', days: 15 },
    { id: 'math', name: '📚 Математика ЕГЭ', days: 60 },
  ]

  const handleStart = (skillId) => {
    window.open(`https://t.me/skillforge_ai_bot?start=${skillId}`, '_blank')
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          <span className="gradient-text">Твой ИИ-Наставник</span>
          <br />
          <span style={{color: 'white'}}>в Обучении</span>
        </h1>
        <p style={styles.subtitle}>
          SkillForge создаёт персонализированные планы обучения на 20 дней.
          Ежедневные микро-уроки, практика и геймификация.
        </p>
        
        <div style={styles.stats}>
          <div style={styles.stat}>
            <div style={styles.statNumber}>1,256+</div>
            <div style={styles.statLabel}>Учеников</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>95%</div>
            <div style={styles.statLabel}>Завершают курс</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>20</div>
            <div style={styles.statLabel}>Дней до результата</div>
          </div>
        </div>

        <button 
          onClick={() => handleStart('python')}
          style={styles.ctaButton}
        >
          🚀 Начать бесплатно в Telegram
        </button>
      </section>

      {/* Skills Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🎯 Выбери навык для старта</h2>
        
        <div style={styles.skillsGrid}>
          {skills.map(skill => (
            <div key={skill.id} className="glass-effect" style={styles.skillCard}>
              <div style={{fontSize: '40px', marginBottom: '15px'}}>
                {skill.name.split(' ')[0]}
              </div>
              <h3 style={{fontSize: '20px', marginBottom: '10px'}}>
                {skill.name}
              </h3>
              <p style={{color: '#94a3b8', marginBottom: '20px'}}>
                {skill.days} дней • с нуля
              </p>
              <button
                onClick={() => handleStart(skill.id)}
                style={styles.skillButton}
              >
                Начать курс
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={{...styles.sectionTitle, color: 'white'}}>
          Начни меняться уже сегодня
        </h2>
        <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px'}}>
          Присоединяйся к тысячам учеников, которые уже осваивают новые навыки
        </p>
        <button 
          onClick={() => handleStart('python')}
          style={{...styles.ctaButton, background: 'white', color: '#0f172a'}}
        >
          🚀 Начать бесплатно в Telegram
        </button>
      </section>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  hero: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '20px',
    color: '#cbd5e1',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: '1.6',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    margin: '40px 0 60px',
    flexWrap: 'wrap',
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '5px',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: '14px',
  },
  ctaButton: {
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '20px 0',
  },
  section: {
    padding: '80px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  skillCard: {
    padding: '30px',
    textAlign: 'center',
  },
  skillButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  ctaSection: {
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
    margin: '80px 0',
  },
}