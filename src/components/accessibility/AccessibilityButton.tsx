import { useState } from 'react'
import AccessibilityOverlay from './AccessibilityOverlay'
import './AccessibilityButton.css'

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleOverlay = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <>
      <button 
        className={`accessibility-button ${isOpen ? 'active' : ''}`}
        onClick={toggleOverlay}
        aria-label="Check accessibility"
      >
        {isOpen ? 'Close Accessibility' : 'Check Accessibility'}
      </button>
      
      <AccessibilityOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
}

export default AccessibilityButton
