import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Fallback Page
 * Route: * (catch-all)
 */
function NotFound() {
  return (
    <main className="dashboard-content not-found-view">
      <h2>404 — Page Not Found</h2>
      <p className="subtitle">The view you are looking for does not exist in AURA.</p>
      <Link to="/" className="back-home-link">
        ← Back to Dashboard
      </Link>
    </main>
  );
}

export default NotFound;