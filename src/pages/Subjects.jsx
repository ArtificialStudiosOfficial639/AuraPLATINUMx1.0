import React, { useState } from 'react';
import SubjectCard from '../components/SubjectCard';
import AddSubjectModal from '../components/AddSubjectModal';
import { useAcademic } from '../context/AcademicContext';

function Subjects() {
  const { subjects, stats, addSubject, deleteSubject, resetSubjects } = useAcademic();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all subjects back to default demo data?')) {
      resetSubjects();
    }
  };

  return (
    <main className="dashboard-content">
      {/* Overview Analytics Bar */}
      <section className="subjects-summary-bar">
        <div className="summary-stat">
          <span className="summary-label">Tracked Subjects</span>
          <span className="summary-value">{stats.subjectCount}</span>
        </div>

        <div className="summary-stat">
          <span className="summary-label">Cumulative Score</span>
          <span className="summary-value">{stats.totalScored} / {stats.totalMax}</span>
        </div>

        <div className="summary-stat highlight">
          <span className="summary-label">Aggregate Average</span>
          <span className="summary-value">{stats.overallPercentage}%</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
            title="Reset to default subjects"
          >
            Reset
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Score
          </button>
        </div>
      </section>

      {/* Grid of Subject Cards */}
      {subjects.length === 0 ? (
        <div className="empty-state">
          <p>No subjects logged yet. Click "+ Add New Score" to begin tracking.</p>
        </div>
      ) : (
        <section className="subjects-grid">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onDelete={deleteSubject}
            />
          ))}
        </section>
      )}

      {/* Modal Dialog */}
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSubject={addSubject}
      />
    </main>
  );
}

export default Subjects;