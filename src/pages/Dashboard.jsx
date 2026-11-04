import React from 'react';
import StatCard from '../components/StatCard';
import SubjectBarChart from '../components/SubjectBarChart'; // <-- Import new component
import { useAcademic } from '../context/AcademicContext';
import { useTasks } from '../context/TaskContext';

function Dashboard() {
  const { subjects, stats: academicStats } = useAcademic();
  const { stats: taskStats } = useTasks();

  const metrics = [
    {
      id: 1,
      title: 'Overall Percentage',
      value: `${academicStats.overallPercentage}%`,
      subtitle: academicStats.subjectCount > 0 
        ? `Across ${academicStats.subjectCount} subjects` 
        : 'No subjects tracked',
      accentColor: '#38bdf8',
    },
    {
      id: 2,
      title: 'Study Hours',
      value: '26.5 hrs',
      subtitle: 'Last 7 days',
      accentColor: '#818cf8',
    },
    {
      id: 3,
      title: 'Completed Tasks',
      value: `${taskStats.completed} / ${taskStats.total}`,
      subtitle: `${taskStats.completionRate}% completion rate`,
      accentColor: '#34d399',
    },
  ];

  return (
    <main className="dashboard-content">
      {/* Top 3 Metric Cards */}
      <section className="stats-grid">
        {metrics.map((metric) => (
          <StatCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            accentColor={metric.accentColor}
          />
        ))}
      </section>

      {/* Bottom Visual Chart */}
      <section className="dashboard-chart-section">
        <SubjectBarChart subjects={subjects} />
      </section>
    </main>
  );
}

export default Dashboard;