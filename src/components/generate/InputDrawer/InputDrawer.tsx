import { useState } from 'react'
import SeedPicker from './SeedPicker'
import SemanticInput from './SemanticInput'
import ImageUpload from './ImageUpload'
import './InputDrawer.css'

type InputTab = 'seed' | 'semantic' | 'image'

interface InputDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const InputDrawer = ({ isOpen, onClose }: InputDrawerProps) => {
  const [activeTab, setActiveTab] = useState<InputTab>('seed')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'seed':
        return <SeedPicker />
      case 'semantic':
        return <SemanticInput />
      case 'image':
        return <ImageUpload />
      default:
        return <SeedPicker />
    }
  }

  return (
    <div className={`input-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h2>Input Methods</h2>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close drawer"
        >
          ×
        </button>
      </div>

      <div className="drawer-tabs">
        <button 
          className={`tab-button ${activeTab === 'seed' ? 'active' : ''}`}
          onClick={() => setActiveTab('seed')}
        >
          Color Picker
        </button>
        <button 
          className={`tab-button ${activeTab === 'semantic' ? 'active' : ''}`}
          onClick={() => setActiveTab('semantic')}
        >
          Semantic Input
        </button>
        <button 
          className={`tab-button ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          Image Upload
        </button>
      </div>

      <div className="drawer-content">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default InputDrawer
