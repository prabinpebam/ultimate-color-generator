import React from 'react';
import { usePalette } from '../../hooks/usePalette';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './EmailMock.css';

const EmailMock: React.FC = () => {
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
    <div className="email-mock-container">
      <div 
        className="email-preview"
        style={{ 
          backgroundColor: '#f5f5f5',
          padding: '20px'
        }}
      >
        <div 
          className="email-card"
          style={{ 
            backgroundColor: getColorByRole('background'),
            color: getColorByRole('text'),
            border: `1px solid ${getColorByRole('border')}`
          }}
        >
          <div 
            className="email-header"
            style={{ backgroundColor: getColorByRole('primary') }}
          >
            <h2 style={{ color: '#ffffff' }}>Company Newsletter</h2>
          </div>
          
          <div className="email-body">
            <h3 style={{ color: getColorByRole('secondary') }}>
              Welcome to Our Newsletter
            </h3>
            
            <p style={{ color: getColorByRole('text') }}>
              Thank you for subscribing to our newsletter. 
              Here's what's new this month.
            </p>
            
            <div 
              className="email-callout"
              style={{ 
                backgroundColor: getColorByRole('surface'), 
                borderLeft: `4px solid ${getColorByRole('accent')}`
              }}
            >
              <p style={{ color: getColorByRole('text') }}>
                <strong>Special Offer:</strong> Use code WELCOME10 for 10% off your first purchase.
              </p>
            </div>
            
            <button
              style={{ 
                backgroundColor: getColorByRole('accent'),
                color: '#ffffff'
              }}
            >
              Read More
            </button>
          </div>
          
          <div 
            className="email-footer"
            style={{ 
              borderTop: `1px solid ${getColorByRole('border')}`,
              color: getColorByRole('text')
            }}
          >
            <p>© 2023 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMock;
