import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route metadata dictionary
 * Defines the heading and contextual subtitle for each route path.
 */
const ROUTE_CONFIG = {
  '/': {
    title: 'Dashboard',
    subtitle: 'Welcome back, track your progress and grind smart.',
  },
  '/subjects': {
    title: 'Subjects & Curriculum',
    subtitle: 'Track your subject grades, target scores, and academic progress.',
  },
  '/tasks': {
    title: 'Task Planner',
    subtitle: 'Stay on top of homework, assignments, and study milestones.',
  },
  '/assistant': {
    title: 'AI Study Assistant',
    subtitle: 'Ask questions, review concepts, and get instant study guidance.',
  },
};

/**
 * Fallback metadata for unmatched or 404 paths
 */
const DEFAULT_ROUTE_META = {
  title: 'AURA PLATINUM',
  subtitle: 'Personal academic performance tracker and AI study assistant.',
};

/**
 * Dynamic Navbar
 * Reads current location.pathname and updates the page title and subtitle.
 */
function Navbar() {
  const location = useLocation();

  // Retrieve matching config or fallback to default
  const currentMeta = ROUTE_CONFIG[location.pathname] || DEFAULT_ROUTE_META;

  return (
    <header className="navbar">
      <div className="navbar-title">
        <h1>{currentMeta.title}</h1>
        <p className="subtitle">{currentMeta.subtitle}</p>
      </div>

      <div className="navbar-actions">
        <div className="profile-pill">
          <span className="status-indicator" />
          <span className="user-handle">Ayu</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;