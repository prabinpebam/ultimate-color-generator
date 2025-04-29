import { useState, useContext } from 'react'
import { usePalette } from '../../hooks/usePalette'
import { SettingsContext } from '../../context/SettingsContext'
import ContrastMatrix from './ContrastMatrix'
import ColorBlindSimulator from './ColorBlindSimulator'
import './AccessibilityOverlay.css'

interface AccessibilityOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const AccessibilityOverlay = ({ isOpen, onClose }: AccessibilityOverlayProps) => {
  const { currentPalette } = usePalette()
  const { settings, updateSettings } = useContext(SettingsContext)
  const [activeTab, setActiveTab] = useState<'contrast' | 'colorblind'>('contrast')
  
  const handleEnforceToggle = () => {
    updateSettings({ 
      enforceAccessibility: !settings.enforceAccessibility 
    })
  }
  
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({
      accessibilityLevel: e.target.value as 'AA' | 'AAA'
    })
  }
  
  if (!isOpen) {
    return null
  }
  
  return (
    <div className="accessibility-overlay">
      <div className="overlay-header">
        <h2>Accessibility Checker</h2>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close overlay"
        >
          ×
        </button>
      </div>
      
      <div className="overlay-controls">
        <div className="control-group">
          <label htmlFor="accessibility-level">WCAG Level:</label>
          <select
            id="accessibility-level"
            value={settings.accessibilityLevel}
            onChange={handleLevelChange}
          >
            <option value="AA">AA (Standard)</option>
            <option value="AAA">AAA (Enhanced)</option>
          </select>
        </div>
        
        <div className="control-group">
          <label htmlFor="enforce-toggle">Enforce Accessibility:</label>
          <div className="toggle-switch">
            <input
              id="enforce-toggle"
              type="checkbox"
              checked={settings.enforceAccessibility}
              onChange={handleEnforceToggle}
            />
            <label htmlFor="enforce-toggle"></label>
          </div>
        </div>
      </div>
      
      <div className="overlay-tabs">
        <button
          className={`tab-button ${activeTab === 'contrast' ? 'active' : ''}`}
          onClick={() => setActiveTab('contrast')}
        >
          Contrast Matrix
        </button>
        <button
          className={`tab-button ${activeTab === 'colorblind' ? 'active' : ''}`}
          onClick={() => setActiveTab('colorblind')}
        >
          Color Blindness
        </button>
      </div>
      
      <div className="overlay-content">
        {activeTab === 'contrast' ? (
          <ContrastMatrix 
            palette={currentPalette.colors} 
            wcagLevel={settings.accessibilityLevel}
          />
        ) : (
          <ColorBlindSimulator palette={currentPalette.colors} />
        )}
      </div>
    </div>
  )
}

export default AccessibilityOverlay
