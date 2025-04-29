import React from 'react';
import { usePalette } from '../../hooks/usePalette';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './DashboardMock.css';

const DashboardMock: React.FC = () => {
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
    return theme === 'light' ? '#f5f5f5' : '#333333';
  };

  return (
    <div 
      className="dashboard-mock"
      style={{ 
        backgroundColor: getColorByRole('background'),
        color: getColorByRole('text')
      }}
    >
      <header 
        className="mock-sidebar"
        style={{ backgroundColor: getColorByRole('surface') }}
      >
        <div className="logo" style={{ color: getColorByRole('primary') }}>DashBoard</div>
        <nav>
          <ul>
            <li><a href="#" style={{ color: getColorByRole('text') }}>Dashboard</a></li>
            <li><a href="#" style={{ color: getColorByRole('text') }}>Analytics</a></li>
            <li><a href="#" style={{ color: getColorByRole('text') }}>Users</a></li>
            <li><a href="#" style={{ color: getColorByRole('text') }}>Settings</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="dashboard-content">
        <div 
          className="dashboard-header"
          style={{ borderBottom: `1px solid ${getColorByRole('border')}` }}
        >
          <h1>Dashboard Preview</h1>
        </div>
        
        <div className="dashboard-cards">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i}
              className="dashboard-card"
              style={{ 
                backgroundColor: getColorByRole('surface'),
                borderColor: getColorByRole('border')
              }}
            >
              <h3>Card Title {i}</h3>
              <div className="card-value">{Math.floor(Math.random() * 100)}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardMock;
