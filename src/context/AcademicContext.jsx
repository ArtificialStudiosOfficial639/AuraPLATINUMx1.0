import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AcademicContext = createContext(null);

const LOCAL_STORAGE_KEY = 'aura_academic_subjects';

const DEFAULT_SUBJECTS = [
  { id: 1, name: 'Mathematics', marksScored: 92, totalMarks: 100, targetPercentage: 90 },
  { id: 2, name: 'Science', marksScored: 88, totalMarks: 100, targetPercentage: 85 },
  { id: 3, name: 'Social Science', marksScored: 84, totalMarks: 100, targetPercentage: 85 },
  { id: 4, name: 'English Language', marksScored: 89, totalMarks: 100, targetPercentage: 80 },
];

/**
 * AcademicProvider
 * Single source of truth for all academic subjects, derived statistics, and persistence.
 */
export function AcademicProvider({ children }) {
  // 1. Lazy initializer from localStorage
  const [subjects, setSubjects] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to read subjects from localStorage:', err);
    }
    return DEFAULT_SUBJECTS;
  });

  // 2. Synchronize to localStorage whenever subjects update
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subjects));
    } catch (err) {
      console.error('Failed to persist subjects to localStorage:', err);
    }
  }, [subjects]);

  // 3. Derived aggregate calculations (memoized for efficiency)
  const stats = useMemo(() => {
    const totalScored = subjects.reduce((sum, item) => sum + item.marksScored, 0);
    const totalMax = subjects.reduce((sum, item) => sum + item.totalMarks, 0);
    const overallPercentage = totalMax > 0 
      ? Number(((totalScored / totalMax) * 100).toFixed(1)) 
      : 0;

    return {
      totalScored,
      totalMax,
      overallPercentage,
      subjectCount: subjects.length,
    };
  }, [subjects]);

  // 4. Action dispatchers
  const addSubject = (newSubject) => {
    setSubjects((prev) => [newSubject, ...prev]);
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => prev.filter((item) => item.id !== id));
  };

  const resetSubjects = () => {
    setSubjects(DEFAULT_SUBJECTS);
  };

  const value = {
    subjects,
    stats,
    addSubject,
    deleteSubject,
    resetSubjects,
  };

  return (
    <AcademicContext.Provider value={value}>
      {children}
    </AcademicContext.Provider>
  );
}

/**
 * Custom Consumer Hook
 * Provides safe access to the AcademicContext.
 */
export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
}