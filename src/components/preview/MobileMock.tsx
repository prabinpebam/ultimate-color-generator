import React from 'react';
import { usePalette } from '../../hooks/usePalette';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './MobileMock.css';

const MobileMock: React.FC = () => {
  const { roleAssignments, currentPalette } = usePalette();
  const { theme } = useContext(ThemeContext);
  
  // Helper function to get color by role
  const getColorByRole = (role: string) => {
    // Find assigned color
    if (roleAssignments[role]) {
      const color = currentPalette.colors.find(c => c.id === roleAssignments[role]);
      if (color) return color.hex;
    }
    
    // Default fallback
    return theme === 'light' ? '#ffffff' : '#121212';
  };

  return (
    <div className="mobile-mock-container">
      <div 
        className="mobile-device"
        style={{ borderColor: theme === 'light' ? '#d1d1d1' : '#333333' }}
      >
        <div 
          className="mobile-screen"
          style={{ backgroundColor: getColorByRole('background') }}
        >
          <div 
            className="mobile-status-bar"
            style={{ backgroundColor: getColorByRole('primary') }}
          >
            <span style={{ color: '#ffffff' }}>12:30</span>
          </div>
          
          <div className="mobile-content">
            <h2 style={{ color: getColorByRole('text') }}>Mobile App</h2>
            
            <div 
              className="mobile-card"
              style={{ 
                backgroundColor: getColorByRole('surface'),
                borderColor: getColorByRole('border')
              }}
            >
              <h3 style={{ color: getColorByRole('text') }}>Welcome</h3>
              <p style={{ color: getColorByRole('text') }}>This is a preview of your mobile app colors.</p>
              <button
                style={{ 
                  backgroundColor: getColorByRole('accent'),
                  color: '#ffffff'
                }}
              >
                Get Started
              </button>
            </div>
            
            <div className="mobile-menu">
              <div 
                className="menu-item"
                style={{ color: getColorByRole('primary') }}
              >
                Home
              </div>
              <div 
                className="menu-item"
                style={{ color: getColorByRole('text') }}
              >
                Profile
              </div>
              <div 
                className="menu-item"
                style={{ color: getColorByRole('text') }}
              >
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMock;
