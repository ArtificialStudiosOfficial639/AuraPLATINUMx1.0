import React, { useEffect, useMemo, useState } from 'react';

import StatCard from '../components/StatCard';
import SubjectBarChart from '../components/SubjectBarChart';

import { useAcademic } from '../context/AcademicContext';
import { useTasks } from '../context/TaskContext';

const STORAGE_KEY = 'aura_study_activity';

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

function Dashboard() {
  const { subjects, stats: academicStats } = useAcademic();
  const { tasks, stats: taskStats } = useTasks();

  // Load saved study activity
  const [studyLog, setStudyLog] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  // Save activity whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studyLog));
  }, [studyLog]);

  const today = new Date();
  const todayKey = getDateKey(today);

  // Add study minutes
  const logStudyTime = (minutes) => {
    setStudyLog((previous) => ({
      ...previous,
      [todayKey]: (previous[todayKey] || 0) + minutes,
    }));
  };

  // Calculate study hours for the last 7 days
  const weeklyStudyMinutes = useMemo(() => {
    let total = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      total += studyLog[getDateKey(date)] || 0;
    }

    return total;
  }, [studyLog]);

  const weeklyHours = (weeklyStudyMinutes / 60).toFixed(1);

  // Generate 365-day heatmap
  const heatmapWeeks = useMemo(() => {
    const days = [];

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 364);

    // Align the first date to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const cursor = new Date(startDate);

    while (cursor <= currentDate) {
      const key = getDateKey(cursor);
      const minutes = studyLog[key] || 0;

      days.push({
        date: new Date(cursor),
        key,
        minutes,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, [studyLog]);

  // Academic insights from actual context data
  const insights = useMemo(() => {
    const validSubjects = subjects.filter(
      (subject) => subject.totalMarks > 0
    );

    const rankedSubjects = validSubjects
      .map((subject) => ({
        ...subject,
        percentage: Math.round(
          (subject.marksScored / subject.totalMarks) * 100
        ),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const strongest = rankedSubjects[0];
    const weakest = rankedSubjects[rankedSubjects.length - 1];

    const pendingTasks = tasks.filter((task) => !task.completed);

    return {
      strongest,
      weakest,
      pendingTasks,
      rankedSubjects,
    };
  }, [subjects, tasks]);

  const metrics = [
    {
      id: 1,
      title: 'Overall Percentage',
      value: `${academicStats.overallPercentage}%`,
      subtitle: `Across ${academicStats.subjectCount} subjects`,
      accentColor: '#38bdf8',
    },
    {
      id: 2,
      title: 'Study Hours',
      value: `${weeklyHours} hrs`,
      subtitle: 'Last 7 days · Manually logged',
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

      {/* Statistics */}
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

      {/* Study Time Logger */}
      <section className="aura-panel">
        <div className="aura-panel-header">
          <div>
            <h3>Study Time Tracker</h3>
            <p>Record your study sessions for today.</p>
          </div>

          <span className="study-today-value">
            {((studyLog[todayKey] || 0) / 60).toFixed(1)} hrs today
          </span>
        </div>

        <div className="study-log-actions">
          {[15, 30, 60].map((minutes) => (
            <button
              key={minutes}
              className="study-log-btn"
              onClick={() => logStudyTime(minutes)}
            >
              + {minutes} min
            </button>
          ))}
        </div>
      </section>

      {/* Subject Performance */}
      <section className="dashboard-chart-section">
        <SubjectBarChart subjects={subjects} />
      </section>

      {/* 365-Day Study Heatmap */}
      <section className="aura-panel">
        <div className="aura-panel-header">
          <div>
            <h3>Study Activity</h3>
            <p>Your study consistency over the last 365 days.</p>
          </div>
        </div>

        <div className="heatmap-scroll">
          <div className="heatmap">
            {heatmapWeeks.map((week, weekIndex) => (
              <div className="heatmap-week" key={weekIndex}>
                {week.map((day) => {
                  const level =
                    day.minutes === 0
                      ? 0
                      : day.minutes < 30
                      ? 1
                      : day.minutes < 60
                      ? 2
                      : day.minutes < 120
                      ? 3
                      : 4;

                  return (
                    <div
                      key={day.key}
                      className={`heatmap-day level-${level}`}
                      title={`${day.key}: ${day.minutes} study minutes`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="heatmap-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className={`heatmap-day level-${level}`}
            />
          ))}
          <span>More</span>
        </div>
      </section>

      {/* Academic Insights */}
      <section className="aura-panel">
        <div className="aura-panel-header">
          <div>
            <h3>Academic Insights</h3>
            <p>Observations based on your current academic data.</p>
          </div>
          <span className="insight-tag">AURA ANALYSIS</span>
        </div>

        <div className="insights-grid">

          <article className="insight-card">
            <span className="insight-icon">🏆</span>
            <h4>Strongest Subject</h4>

            {insights.strongest ? (
              <>
                <strong>{insights.strongest.name}</strong>
                <p>{insights.strongest.percentage}% performance</p>
              </>
            ) : (
              <p>Add subjects to see your strongest subject.</p>
            )}
          </article>

          <article className="insight-card">
            <span className="insight-icon">🎯</span>
            <h4>Needs Attention</h4>

            {insights.weakest ? (
              <>
                <strong>{insights.weakest.name}</strong>
                <p>
                  {insights.weakest.percentage}% — review this subject
                  regularly.
                </p>
              </>
            ) : (
              <p>No subject data available.</p>
            )}
          </article>

          <article className="insight-card">
            <span className="insight-icon">📋</span>
            <h4>Pending Tasks</h4>
            <strong>{taskStats.pending} tasks</strong>
            <p>
              {taskStats.pending === 0
                ? 'All tasks completed. Great work!'
                : 'Try completing your highest-priority tasks first.'}
            </p>
          </article>

          <article className="insight-card">
            <span className="insight-icon">📈</span>
            <h4>Study Consistency</h4>
            <strong>{weeklyHours} hours</strong>
            <p>Study time logged during the last 7 days.</p>
          </article>

        </div>
      </section>

    </main>
  );
}

export default Dashboard;