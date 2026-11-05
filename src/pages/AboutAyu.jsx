
import React, { useState } from 'react';
import './styles/AboutAyu.css';

const journey = [
  {
    day: '01',
    title: 'The Vision',
    icon: '💡',
    description:
      'The idea was to create a personal academic platform that could bring studies, productivity and intelligent assistance together.',
    challenge: 'Turning an idea into a clear project structure.',
    achievement: 'AURA started taking shape.',
  },
  {
    day: '02',
    title: 'Project Setup',
    icon: '⚙️',
    description:
      'The React application structure was prepared and the initial components started coming together.',
    challenge: 'Understanding how different components should communicate.',
    achievement: 'The foundation of the application.',
  },
  {
    day: '03',
    title: 'Navigation System',
    icon: '🧭',
    description:
      'React Router was introduced to connect Dashboard, Subjects, Tasks and AI Assistant.',
    challenge: 'Making sidebar navigation work correctly.',
    achievement: 'A multi-page React application.',
  },
  {
    day: '04',
    title: 'Academic Management',
    icon: '📚',
    description:
      'The Academic Context became the central place for managing subjects and calculating academic statistics.',
    challenge: 'Managing shared state without unnecessary duplication.',
    achievement: 'Centralized academic data.',
  },
  {
    day: '05',
    title: 'Task Management',
    icon: '✅',
    description:
      'A task system was developed with completion status, priorities and due dates.',
    challenge: 'Keeping task statistics synchronized with task changes.',
    achievement: 'A functional productivity system.',
  },
  {
    day: '06',
    title: 'Local Storage',
    icon: '💾',
    description:
      'Academic and task data were connected to browser localStorage.',
    challenge: 'Preserving data after refreshing the application.',
    achievement: 'Persistent application data.',
  },
  {
    day: '07',
    title: 'Dashboard Design',
    icon: '📊',
    description:
      'The dashboard began displaying academic statistics and task performance.',
    challenge: 'Making useful information clear without overcrowding the interface.',
    achievement: "AURA's central dashboard.",
  },
  {
    day: '08',
    title: 'Performance Visualization',
    icon: '📈',
    description:
      'SubjectBarChart was introduced using native SVG to visualize marks and academic targets.',
    challenge: 'Turning numerical data into meaningful visual information.',
    achievement: 'Subject performance visualization.',
  },
  {
    day: '09',
    title: 'Dashboard Intelligence',
    icon: '🧠',
    description:
      'Study-time logging, a study activity heatmap and academic insights were added.',
    challenge: 'Connecting new features to real application data.',
    achievement: 'A more informative academic dashboard.',
  },
  {
    day: '10',
    title: 'AURA Evolves',
    icon: '🚀',
    description:
      'The application continued evolving with improvements to its design, usability and future AI capabilities.',
    challenge: 'Improving the project without losing the simplicity of its architecture.',
    achievement: 'A stronger foundation for AURA 2.0.',
  },
];

function AboutAyu() {
  const [expandedDay, setExpandedDay] = useState('01');

  return (
    <main className="about-ayu-page">

      {/* Hero */}
      <section className="ayu-hero">
        <div className="ayu-hero-content">
          <span className="ayu-eyebrow">THE PERSON BEHIND AURA</span>

          <h1>
            ABOUT <span>AYU</span>
          </h1>

          <p className="ayu-tagline">
            Not just learning technology.
            <br />
            Building something meaningful with it.
          </p>

          <p className="ayu-intro">
            I'm a student developer passionate about frontend
            development, React and building useful digital products.
            AURA is one of my journeys from learning concepts to
            creating something of my own.
          </p>

          <div className="ayu-hero-tags">
            <span>Frontend Developer</span>
            <span>React Learner</span>
            <span>Builder</span>
          </div>
        </div>

        <div className="ayu-orbit">
          <div className="ayu-orbit-ring"></div>
          <div className="ayu-orbit-core">A</div>
          <span className="orbit-label orbit-one">HTML</span>
          <span className="orbit-label orbit-two">CSS</span>
          <span className="orbit-label orbit-three">JS</span>
          <span className="orbit-label orbit-four">REACT</span>
        </div>
      </section>

      {/* About Me */}
      <section className="ayu-section">
        <div className="ayu-section-heading">
          <span>01 / THE CREATOR</span>
          <h2>A little about me.</h2>
        </div>

        <div className="ayu-about-grid">
          <article className="ayu-info-card">
            <span className="ayu-card-icon">👨‍💻</span>
            <h3>Who I Am</h3>
            <p>
              A student with a strong interest in technology and
              building things for the web.
            </p>
          </article>

          <article className="ayu-info-card">
            <span className="ayu-card-icon">⚡</span>
            <h3>What I Love</h3>
            <p>
              React, JavaScript, frontend architecture, creative
              interfaces and solving coding problems.
            </p>
          </article>

          <article className="ayu-info-card">
            <span className="ayu-card-icon">🎯</span>
            <h3>My Goal</h3>
            <p>
              Become a skilled developer, build real-world products
              and eventually work as a freelancer.
            </p>
          </article>
        </div>
      </section>

      {/* Journey */}
      <section className="ayu-section">
        <div className="ayu-section-heading">
          <span>02 / THE JOURNEY</span>
          <h2>10 Days. One Big Idea.</h2>
          <p>
            A milestone-by-milestone look at how AURA took shape.
          </p>
        </div>

        <div className="ayu-timeline">
          {journey.map((item) => {
            const isOpen = expandedDay === item.day;

            return (
              <article
                className={`ayu-timeline-item ${isOpen ? 'expanded' : ''}`}
                key={item.day}
              >
                <button
                  className="ayu-timeline-button"
                  onClick={() =>
                    setExpandedDay(isOpen ? null : item.day)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="ayu-day-number">
                    DAY {item.day}
                  </span>

                  <span className="ayu-day-icon">{item.icon}</span>

                  <span className="ayu-day-title">
                    {item.title}
                  </span>

                  <span className="ayu-expand-icon">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="ayu-timeline-details">
                    <p>{item.description}</p>

                    <div className="ayu-detail-row">
                      <span>THE CHALLENGE</span>
                      <p>{item.challenge}</p>
                    </div>

                    <div className="ayu-detail-row">
                      <span>THE MILESTONE</span>
                      <p>{item.achievement}</p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Hardships */}
      <section className="ayu-section">
        <div className="ayu-section-heading">
          <span>03 / BEHIND THE SCENES</span>
          <h2>The hard part wasn't the code.</h2>
          <p>
            Every working feature has a debugging story behind it.
          </p>
        </div>

        <div className="ayu-hardship-grid">
          <article className="ayu-hardship-card">
            <span>01</span>
            <h3>Broken Navigation</h3>
            <p>
              Getting sidebar links and React Router pages to
              communicate correctly took debugging and patience.
            </p>
          </article>

          <article className="ayu-hardship-card">
            <span>02</span>
            <h3>State Management</h3>
            <p>
              Understanding how academic data and task data
              flow between components was an important learning curve.
            </p>
          </article>

          <article className="ayu-hardship-card">
            <span>03</span>
            <h3>Making Data Persist</h3>
            <p>
              A useful application needs to remember information.
              That meant working with Context API and localStorage.
            </p>
          </article>

          <article className="ayu-hardship-card">
            <span>04</span>
            <h3>Constant Improvement</h3>
            <p>
              Fixing errors, improving the interface and connecting
              features instead of settling for a static design.
            </p>
          </article>
        </div>

        <div className="ayu-quote">
          <span>“</span>
          <p>
            The goal was never to write perfect code on the first try.
            The goal was to understand the problem and keep improving.
          </p>
          <small>— THE AURA MINDSET</small>
        </div>
      </section>

      {/* Vision */}
      <section className="ayu-vision">
        <span>04 / WHAT'S NEXT</span>
        <h2>This is only the beginning.</h2>
        <p>
          AURA started as an academic management idea.
          The vision is to grow it into a smarter personal
          academic platform with meaningful analytics,
          intelligent study assistance and a better learning experience.
        </p>

        <div className="ayu-vision-footer">
          <span>BUILT WITH CURIOSITY</span>
          <span>POWERED BY CONSISTENCY</span>
          <span>MADE BY AYU</span>
        </div>
      </section>

      <footer className="ayu-footer">
        AURA PLATINUM <span>•</span> ABOUT AYU
      </footer>

    </main>
  );
}

export default AboutAyu;
