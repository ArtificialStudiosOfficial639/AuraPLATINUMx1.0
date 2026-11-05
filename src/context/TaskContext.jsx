import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const TaskContext = createContext(null);

const LOCAL_STORAGE_KEY = 'aura_academic_tasks';

const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Complete Science Chapter 4 Revision',
    subject: 'Science',
    dueDate: '2026-11-05',
    priority: 'high',
    completed: true,
  },
  {
    id: 2,
    title: 'Solve Quadratic Equations Exercise 3.2',
    subject: 'Mathematics',
    dueDate: '2026-11-06',
    priority: 'high',
    completed: false,
  },
  {
    id: 3,
    title: 'Write English Essay on Sustainable Tech',
    subject: 'English',
    dueDate: '2026-11-08',
    priority: 'medium',
    completed: false,
  },
  {
    id: 4,
    title: 'Review Civics Parliamentary System Notes',
    subject: 'Social Science',
    dueDate: '2026-11-10',
    priority: 'low',
    completed: true,
  },
];

export function TaskProvider({ children }) {
  // 1. Lazy load from localStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage:', err);
    }
    return DEFAULT_TASKS;
  });

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // 2. Persist whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to persist tasks to localStorage:', err);
    }
  }, [tasks]);

  // 3. Derived task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      completionRate,
    };
  }, [tasks]);

  // 4. Filtered task list
  const filteredTasks = useMemo(() => {
    if (activeFilter === 'pending') {
      return tasks.filter((t) => !t.completed);
    }
    if (activeFilter === 'completed') {
      return tasks.filter((t) => t.completed);
    }
    return tasks;
  }, [tasks, activeFilter]);

  // 5. Actions
  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const resetTasks = () => {
    setTasks(DEFAULT_TASKS);
  };

  const value = {
    tasks,
    filteredTasks,
    stats,
    activeFilter,
    setActiveFilter,
    addTask,
    toggleTask,
    deleteTask,
    resetTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}