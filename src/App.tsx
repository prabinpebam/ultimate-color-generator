import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { PaletteProvider } from './context/PaletteContext'
import { SettingsProvider } from './context/SettingsContext'
import { HistoryProvider } from './context/HistoryContext'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import GeneratePage from './pages/GeneratePage'
import PreviewPage from './pages/PreviewPage'
import NotFound from './pages/NotFound'
import './styles/global.css'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1280)

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev)
  }

  return (
    <ThemeProvider>
      <SettingsProvider>
        <HistoryProvider>
          <PaletteProvider>
            <div className="app-container">
              <Header toggleSidebar={toggleSidebar} />
              <div className="main-content">
                <Sidebar collapsed={sidebarCollapsed} />
                <div className="page-container">
                  <Routes>
                    <Route path="/" element={<GeneratePage />} />
                    <Route path="/preview" element={<PreviewPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </div>
          </PaletteProvider>
        </HistoryProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default App
