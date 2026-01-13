'use client'  // Критически важно!

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <div style={styles.logo}>🧠 SkillForge</div>
        <button 
          onClick={() => window.open('https://t.me/skillforge_ai_bot', '_blank')}
          style={styles.button}
        >
          📱 Открыть бота
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    padding: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  button: {
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}