import { useNavigate } from 'react-router-dom'
import { usePalette } from '../../hooks/usePalette'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import './ContextPreviewStrip.css'

const ContextPreviewStrip = () => {
  const navigate = useNavigate()
  const { currentPalette, roleAssignments } = usePalette()
  const { theme } = useContext(ThemeContext)
  
  // Get colors based on role assignments or default to first colors in palette
  const getColorByRole = (role: string) => {
    if (!roleAssignments[role] && currentPalette.colors.length === 0) {
      return '#ffffff'; // Default if no colors available
    }
    
    // Find the color by ID from role assignments
    if (roleAssignments[role]) {
      const assignedColor = currentPalette.colors.find(
        color => color.id === roleAssignments[role]
      )
      if (assignedColor) {
        return assignedColor.hex
      }
    }
    
    // Fallbacks based on palette position
    switch (role) {
      case 'primary':
        return currentPalette.colors[0]?.hex || '#1a73e8'
      case 'secondary':
        return currentPalette.colors[1]?.hex || '#6c757d'
      case 'accent':
        return currentPalette.colors[2]?.hex || '#ff8a65'
      case 'background':
        return theme === 'light' 
          ? '#ffffff' 
          : (currentPalette.colors[3]?.hex || '#212121')
      case 'surface':
        return theme === 'light'
          ? '#f5f5f5'
          : (currentPalette.colors[4]?.hex || '#333333')
      case 'text':
        return theme === 'light'
          ? '#212121'
          : '#ffffff'
      case 'border':
        return theme === 'light'
          ? '#e0e0e0'
          : '#424242'
      default:
        return '#ffffff'
    }
  }

  const handleClick = () => {
    navigate('/preview')
  }

  return (
    <div className="context-preview-strip" onClick={handleClick}>
      <div className="preview-miniatures">
        <div 
          className="preview-card" 
          style={{ 
            backgroundColor: getColorByRole('surface'),
            color: getColorByRole('text'),
            borderColor: getColorByRole('border')
          }}
        >
          <div className="card-header">Card Title</div>
          <div className="card-content">Content preview</div>
          <button
            style={{
              backgroundColor: getColorByRole('primary'),
              color: '#ffffff'
            }}
          >
            Button
          </button>
        </div>
        
        <div 
          className="preview-buttons"
          style={{
            backgroundColor: getColorByRole('background')
          }}
        >
          <button
            className="primary-button"
            style={{
              backgroundColor: getColorByRole('primary'),
              color: '#ffffff'
            }}
          >
            Primary
          </button>
          
          <button
            className="secondary-button"
            style={{
              backgroundColor: getColorByRole('secondary'),
              color: '#ffffff'
            }}
          >
            Secondary
          </button>
          
          <button
            className="accent-button"
            style={{
              backgroundColor: getColorByRole('accent'),
              color: '#ffffff'
            }}
          >
            Accent
          </button>
        </div>
      </div>
      
      <div className="preview-hint">
        Click for full preview
      </div>
    </div>
  )
}

export default ContextPreviewStrip
