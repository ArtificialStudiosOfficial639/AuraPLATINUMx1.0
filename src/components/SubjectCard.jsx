import React from 'react';

/**
 * SubjectCard
 * Displays individual subject score, max marks, calculated percentage, and delete action.
 */
function SubjectCard({ subject, onDelete }) {
  const { id, name, marksScored, totalMarks, targetPercentage } = subject;
  
  // Calculate percentage for this specific subject
  const percentage = totalMarks > 0 
    ? Math.round((marksScored / totalMarks) * 100) 
    : 0;

  const isMeetingTarget = percentage >= targetPercentage;

  return (
    <div className="subject-card">
      <div className="subject-card-top">
        <div>
          <h3 className="subject-name">{name}</h3>
          <span className="subject-target">Target: {targetPercentage}%</span>
        </div>
        <button
          type="button"
          className="delete-btn"
          title="Remove Subject"
          onClick={() => onDelete(id)}
        >
          ✕
        </button>
      </div>

      <div className="subject-score-row">
        <span className="score-ratio">
          <strong>{marksScored}</strong> / {totalMarks}
        </span>
        <span className={`percentage-badge ${isMeetingTarget ? 'success' : 'warning'}`}>
          {percentage}%
        </span>
      </div>

      {/* Visual progress bar */}
      <div className="progress-bar-bg">
        <div
          className={`progress-bar-fill ${isMeetingTarget ? 'fill-success' : 'fill-warning'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default SubjectCard;