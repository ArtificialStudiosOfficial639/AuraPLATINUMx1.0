import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar Navigation
 * Uses React Router's NavLink for SPA client-side routing.
 */
function Sidebar() {
  const navItems = [
  { id: 'dash', path: '/', label: 'Dashboard', icon: '📊', end: true },
  { id: 'subjects', path: '/subjects', label: 'Subjects', icon: '📚' },
  { id: 'tasks', path: '/tasks', label: 'Tasks', icon: '✅' },
  { id: 'assistant', path: '/assistant', label: 'AI ', icon: '🤖' },
  { id: 'about', path: '/about', label: 'ABOUT AYU', icon: '👨‍💻' },
];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>AURA PLATINUM</h2>
        <span className="brand-badge">Student OS</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'nav-link-btn active' : 'nav-link-btn'
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;