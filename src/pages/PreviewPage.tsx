import { useState } from 'react'
import { usePalette } from '../hooks/usePalette'
import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'
import WebpageMock from '../components/preview/WebpageMock'
import DashboardMock from '../components/preview/DashboardMock'
import MobileMock from '../components/preview/MobileMock'
import EmailMock from '../components/preview/EmailMock'
import ExportButton from '../components/export/ExportButton'
import './PreviewPage.css'
import React from 'react';

type PreviewTab = 'webpage' | 'dashboard' | 'mobile' | 'email'

const PreviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('webpage')
  const { currentPalette, roleAssignments } = usePalette()
  const { theme, toggleTheme } = useContext(ThemeContext)

  const hasValidPalette = currentPalette.colors.length > 0

  const renderTabContent = () => {
    if (!hasValidPalette) {
      return (
        <div className="no-palette-message">
          <h2>No palette available for preview</h2>
          <p>Go to the Generate page to create a palette first.</p>
        </div>
      )
    }

    switch (activeTab) {
      case 'webpage':
        return <WebpageMock />
      case 'dashboard':
        return <DashboardMock />
      case 'mobile':
        return <MobileMock />
      case 'email':
        return <EmailMock />
      default:
        return <WebpageMock />
    }
  }

  return (
    <div className="preview-page">
      <h1>Preview Your Palette</h1>
      <p>This page will show your palette in different contexts:</p>
      <ul>
        <li>Website UI</li>
        <li>Dashboard</li>
        <li>Mobile App</li>
        <li>Email Template</li>
      </ul>
      <div className="preview-placeholder">
        <p>Preview will be available once you've generated a palette.</p>
      </div>
      <div className="preview-header">
        <h1 className="page-title">Preview Your Palette</h1>
        
        <div className="preview-controls">
          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            disabled={!hasValidPalette}
          >
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
          
          <ExportButton disabled={!hasValidPalette} />
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'webpage' ? 'active' : ''}`}
            onClick={() => setActiveTab('webpage')}
            disabled={!hasValidPalette}
          >
            Webpage
          </button>
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            disabled={!hasValidPalette}
          >
            Dashboard
          </button>
          <button
            className={`tab ${activeTab === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveTab('mobile')}
            disabled={!hasValidPalette}
          >
            Mobile
          </button>
          <button
            className={`tab ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
            disabled={!hasValidPalette}
          >
            Email
          </button>
        </div>
        
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default PreviewPage
