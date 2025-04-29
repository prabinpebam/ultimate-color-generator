import { useState } from 'react'
import ExportDrawer from './ExportDrawer'
import './ExportButton.css'

interface ExportButtonProps {
  disabled?: boolean
}

const ExportButton = ({ disabled = false }: ExportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button
        className="export-button"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        Export Palette
      </button>
      
      <ExportDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
}

export default ExportButton
