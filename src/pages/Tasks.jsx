import React, { useState } from 'react';
import TaskItem from '../components/TaskItem.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import { useTasks } from '../context/TaskContext.jsx';

function Tasks() {
  const {
    filteredTasks,
    stats,
    activeFilter,
    setActiveFilter,
    addTask,
    toggleTask,
    deleteTask,
    resetTasks,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="dashboard-content">
      {/* Task Summary Banner */}
      <section className="subjects-summary-bar">
        <div className="summary-stat">
          <span className="summary-label">Total Tasks</span>
          <span className="summary-value">{stats.total}</span>
        </div>

        <div className="summary-stat">
          <span className="summary-label">Completed</span>
          <span className="summary-value">{stats.completed}</span>
        </div>

        <div className="summary-stat">
          <span className="summary-label">Pending</span>
          <span className="summary-value">{stats.pending}</span>
        </div>

        <div className="summary-stat highlight">
          <span className="summary-label">Completion Rate</span>
          <span className="summary-value">{stats.completionRate}%</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (window.confirm('Reset tasks back to default demo tasks?')) {
                resetTasks();
              }
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            + New Task
          </button>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <div className="tasks-filter-bar">
        <div className="filter-buttons">
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All ({stats.total})
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>

      {/* Task List Container */}
      <div className="task-list-container">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>No {activeFilter !== 'all' ? activeFilter : ''} tasks found.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Create Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addTask}
      />
    </main>
  );
}

export default Tasks;