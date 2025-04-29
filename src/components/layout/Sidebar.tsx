import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navItems = [
    { path: '/', label: 'Generate', icon: '🎨' },
    { path: '/preview', label: 'Preview', icon: '👁️' },
  ];
  
  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <ul className="nav-list">
        {navItems.map(item => (
          <li key={item.path} className="nav-item">
            <NavLink 
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
