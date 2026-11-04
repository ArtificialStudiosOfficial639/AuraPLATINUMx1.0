import React from 'react';

/**
 * SubjectBarChart
 * Visualizes subject percentage performance and target thresholds via native SVG.
 */
function SubjectBarChart({ subjects }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="chart-empty-state">
        <p>No subject performance data available to plot yet.</p>
      </div>
    );
  }

  // Dimensions & padding
  const chartHeight = 220;
  const barWidth = 36;
  const gap = 32;
  const chartWidth = Math.max(500, subjects.length * (barWidth + gap) + 60);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Subject Performance Analysis</h3>
          <p className="chart-subtitle">Calculated percentages vs. academic target thresholds</p>
        </div>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot dot-success" /> ≥ Target
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-cyan" /> Below Target
          </span>
          <span className="legend-item">
            <span className="legend-line" /> Target Mark (85%)
          </span>
        </div>
      </div>

      <div className="svg-scroll-container">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}
          className="performance-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Horizontal Reference Grid Lines (100%, 75%, 50%, 25%) */}
          {[100, 75, 50, 25].map((level) => {
            const y = chartHeight - (level / 100) * (chartHeight - 40);
            return (
              <g key={level} className="grid-line-group">
                <line
                  x1="40"
                  y1={y}
                  x2={chartWidth - 20}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="4 4"
                />
                <text x="10" y={y + 4} fill="#64748b" fontSize="10" fontWeight="500">
                  {level}%
                </text>
              </g>
            );
          })}

          {/* Bars for Each Subject */}
          {subjects.map((item, index) => {
            const pct =
              item.totalMarks > 0
                ? Math.round((item.marksScored / item.totalMarks) * 100)
                : 0;

            const isTargetMet = pct >= (item.targetPercentage || 80);
            const x = 50 + index * (barWidth + gap);
            const availableHeight = chartHeight - 40;
            const barH = (Math.min(pct, 100) / 100) * availableHeight;
            const y = chartHeight - barH;

            // Target indicator marker position
            const targetY =
              chartHeight - ((item.targetPercentage || 80) / 100) * availableHeight;

            return (
              <g key={item.id} className="bar-group">
                {/* Background Track Column */}
                <rect
                  x={x}
                  y={40}
                  width={barWidth}
                  height={availableHeight}
                  rx="6"
                  fill="rgba(255, 255, 255, 0.03)"
                />

                {/* Animated Data Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="6"
                  className={isTargetMet ? 'bar-rect success-bar' : 'bar-rect normal-bar'}
                />

                {/* Target Threshold Dash Line across this specific bar */}
                <line
                  x1={x - 4}
                  y1={targetY}
                  x2={x + barWidth + 4}
                  y2={targetY}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                />

                {/* Top Value Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                >
                  {pct}%
                </text>

                {/* Bottom Subject Name Label (Truncated if long) */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 22}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="500"
                >
                  {item.name.length > 9 ? `${item.name.slice(0, 8)}…` : item.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default SubjectBarChart;