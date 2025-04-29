import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './Header.css';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label="Toggle navigation sidebar"
        >
          ☰
        </button>
        <h1 className="app-title">Ultimate Color Generator</h1>
      </div>
      <div className="header-right">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
