
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

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
  '/community': {
    title: 'Global Community',
    subtitle: 'Connect, collaborate and learn together.',
  },
  '/about': {
    title: 'About AURA',
    subtitle: 'Your personal academic universe.',
  },
};

const DEFAULT_ROUTE_META = {
  title: 'AURA PLATINUM',
  subtitle: 'Personal academic performance tracker and AI study assistant.',
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = React.useState(false);

  const currentMeta =
    ROUTE_CONFIG[location.pathname] || DEFAULT_ROUTE_META;

  const username = user?.displayName || 'Student';

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
      setLoggingOut(false);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-title">
        <h1>{currentMeta.title}</h1>
        <p className="subtitle">{currentMeta.subtitle}</p>
      </div>

      <div className="navbar-actions">
        <div className="profile-pill">
          <span className="status-indicator" />
          <span className="user-handle">{username}</span>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
