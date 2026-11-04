import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const { id, title, subject, dueDate, priority, completed } = task;

  return (
    <div className={`task-item ${completed ? 'is-completed' : ''}`}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span className="checkmark" />
      </label>

      <div className="task-details">
        <span className="task-title">{title}</span>
        <div className="task-metadata">
          <span className="task-tag subject-tag">{subject}</span>
          <span className={`task-tag priority-tag priority-${priority}`}>
            {priority}
          </span>
          {dueDate && (
            <span className="task-date">📅 Due: {dueDate}</span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="delete-btn"
        title="Delete task"
        onClick={() => onDelete(id)}
      >
        ✕
      </button>
    </div>
  );
}

export default TaskItem;