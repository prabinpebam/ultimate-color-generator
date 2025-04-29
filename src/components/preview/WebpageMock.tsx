import { usePalette } from '../../hooks/usePalette'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import './WebpageMock.css'

const WebpageMock = () => {
  const { roleAssignments, currentPalette } = usePalette()
  const { theme } = useContext(ThemeContext)
  
  // Helper function to get a color by role, with fallbacks
  const getColorByRole = (role: string) => {
    // Find assigned color
    if (roleAssignments[role]) {
      const color = currentPalette.colors.find(c => c.id === roleAssignments[role])
      if (color) return color.hex
    }
    
    // Default colors based on theme
    const defaults = {
      light: {
        primary: '#1a73e8',
        secondary: '#6c757d',
        accent: '#ff8a65',
        background: '#ffffff',
        surface: '#f5f5f5',
        text: '#212121',
        border: '#e0e0e0',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3'
      },
      dark: {
        primary: '#90caf9',
        secondary: '#b0bec5',
        accent: '#ff8a65',
        background: '#121212',
        surface: '#222222',
        text: '#ffffff',
        border: '#424242',
        success: '#81c784',
        warning: '#ffb74d',
        error: '#e57373',
        info: '#64b5f6'
      }
    }
    
    // Use TypeScript type assertion to address the indexing issue
    const themeDefaults = defaults[theme as keyof typeof defaults]
    return themeDefaults[role as keyof typeof themeDefaults] || themeDefaults.background
  }

  return (
    <div 
      className="webpage-mock"
      style={{ 
        backgroundColor: getColorByRole('background'),
        color: getColorByRole('text')
      }}
    >
      <header 
        className="mock-header"
        style={{ backgroundColor: getColorByRole('primary') }}
      >
        <div className="header-content">
          <div className="logo" style={{ color: '#ffffff' }}>Brand Logo</div>
          <nav className="main-nav">
            <ul>
              <li><a href="#" style={{ color: '#ffffff' }}>Home</a></li>
              <li><a href="#" style={{ color: '#ffffff' }}>About</a></li>
              <li><a href="#" style={{ color: '#ffffff' }}>Services</a></li>
              <li><a href="#" style={{ color: '#ffffff' }}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="mock-hero">
        <div className="hero-content">
          <h1>Welcome to Your Website</h1>
          <p>This preview shows how your color palette looks in a standard web layout.</p>
          <button
            style={{ 
              backgroundColor: getColorByRole('accent'),
              color: '#ffffff'
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      
      <main className="mock-content">
        <section className="features">
          <h2>Key Features</h2>
          
          <div className="feature-cards">
            {[1, 2, 3].map(i => (
              <div 
                key={i}
                className="feature-card"
                style={{ 
                  backgroundColor: getColorByRole('surface'),
                  borderColor: getColorByRole('border')
                }}
              >
                <div 
                  className="feature-icon"
                  style={{ backgroundColor: getColorByRole('secondary') }}
                ></div>
                <h3>Feature {i}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a 
                  href="#" 
                  style={{ color: getColorByRole('primary') }}
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </section>
        
        <section className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Join thousands of satisfied customers using our product.</p>
          <div className="cta-buttons">
            <button
              className="primary-btn"
              style={{ 
                backgroundColor: getColorByRole('primary'),
                color: '#ffffff'
              }}
            >
              Sign Up
            </button>
            <button
              className="secondary-btn"
              style={{ 
                backgroundColor: 'transparent',
                color: getColorByRole('secondary'),
                borderColor: getColorByRole('secondary')
              }}
            >
              Learn More
            </button>
          </div>
        </section>
      </main>
      
      <footer 
        className="mock-footer"
        style={{ 
          backgroundColor: theme === 'light' ? getColorByRole('surface') : getColorByRole('background'),
          borderTopColor: getColorByRole('border')
        }}
      >
        <div className="footer-content">
          <div className="footer-logo">Brand Logo</div>
          <div className="footer-links">
            <ul>
              <li><a href="#" style={{ color: getColorByRole('text') }}>Home</a></li>
              <li><a href="#" style={{ color: getColorByRole('text') }}>About</a></li>
              <li><a href="#" style={{ color: getColorByRole('text') }}>Services</a></li>
              <li><a href="#" style={{ color: getColorByRole('text') }}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright" style={{ color: getColorByRole('text') }}>
          © 2023 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default WebpageMock
