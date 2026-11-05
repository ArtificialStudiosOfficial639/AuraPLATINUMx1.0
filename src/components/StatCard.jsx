import React from 'react';

/**
 * StatCard
 * @param {string} title - The title of the metric
 * @param {string|number} value - The numerical or formatted string metric
 * @param {string} [subtitle] - Optional context (e.g., "+4% this week")
 * @param {string} [accentColor] - Optional CSS color theme
 */
function StatCard({ title, value, subtitle, accentColor }) {
  return (
    <div className="stat-card" style={{ borderColor: accentColor || 'rgba(255, 255, 255, 0.08)' }}>
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
}

export default StatCard;