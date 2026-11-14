import React, { useState } from 'react';
import { chartAnalyticsData } from '../data/mockData';

export default function AnalyticsCharts() {
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = chartAnalyticsData.monthly;
  const maxRevenue = Math.max(...data.map((d) => d.revenue)) * 1.1;
  const maxOrders = Math.max(...data.map((d) => d.orders)) * 1.1;

  // SVG Chart Dimensions
  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Generate path points
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartW;
    const value = activeMetric === 'revenue' ? d.revenue : d.orders;
    const maxVal = activeMetric === 'revenue' ? maxRevenue : maxOrders;
    const y = svgHeight - paddingY - (value / maxVal) * chartH;
    return { x, y, data: d, val: value };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <section className="analytics-section-grid">
      {/* Left Panel: Clean SVG Trend Chart */}
      <div className="dashboard-panel">
        <div className="panel-header">
          <div className="panel-title-area">
            <h3 className="panel-title">Performance Analytics</h3>
            <span className="panel-subtitle">Audited monthly financial & fulfillment trajectory</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="timeframe-pill-selector">
              <button
                className={`timeframe-btn ${activeMetric === 'revenue' ? 'active' : ''}`}
                onClick={() => setActiveMetric('revenue')}
              >
                Revenue ($)
              </button>
              <button
                className={`timeframe-btn ${activeMetric === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveMetric('orders')}
              >
                Orders
              </button>
            </div>
          </div>
        </div>

        {/* Clean SVG Line & Area Chart */}
        <div className="chart-container">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="svg-chart"
            preserveAspectRatio="none"
          >
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = paddingY + ratio * chartH;
              return (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              );
            })}

            {/* Subtle Solid Area Fill */}
            <path d={areaD} fill="#eff6ff" />

            {/* Solid Precision Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Solid Data Points */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredPoint === i ? 5 : 3.5}
                  fill={hoveredPoint === i ? '#ffffff' : '#2563eb'}
                  stroke="#2563eb"
                  strokeWidth={hoveredPoint === i ? 2.5 : 1.5}
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* X Axis Month Labels */}
                <text
                  x={pt.x}
                  y={svgHeight - 6}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="600"
                >
                  {pt.data.month}
                </text>
              </g>
            ))}
          </svg>

          {/* Precision Tooltip */}
          {hoveredPoint !== null && (
            <div
              style={{
                position: 'absolute',
                left: `${(points[hoveredPoint].x / svgWidth) * 100}%`,
                top: `${(points[hoveredPoint].y / svgHeight) * 100}%`,
                transform: 'translate(-50%, -120%)',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '0.4rem 0.65rem',
                boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.1)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 20
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>
                {points[hoveredPoint].data.month} 2026
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                {activeMetric === 'revenue'
                  ? `$${points[hoveredPoint].val.toLocaleString()}`
                  : `${points[hoveredPoint].val.toLocaleString()} orders`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Revenue Distribution Donut */}
      <div className="dashboard-panel">
        <div className="panel-header">
          <div className="panel-title-area">
            <h3 className="panel-title">Revenue by Tier</h3>
            <span className="panel-subtitle">Contract distribution breakdown</span>
          </div>
        </div>

        <div className="distribution-container">
          <div className="donut-visual-wrapper">
            <svg width="140" height="140" viewBox="0 0 42 42">
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="4.5"
              />
              {/* Segment 1: Enterprise 46% - Solid Blue */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#2563eb"
                strokeWidth="4.5"
                strokeDasharray="46 54"
                strokeDashoffset="25"
              />
              {/* Segment 2: Pro 28% - Solid Sky */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#0284c7"
                strokeWidth="4.5"
                strokeDasharray="28 72"
                strokeDashoffset="-21"
              />
              {/* Segment 3: API 16% - Solid Green */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#16a34a"
                strokeWidth="4.5"
                strokeDasharray="16 84"
                strokeDashoffset="-49"
              />
              {/* Segment 4: Services 10% - Solid Amber */}
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#d97706"
                strokeWidth="4.5"
                strokeDasharray="10 90"
                strokeDashoffset="-65"
              />
            </svg>
            <div className="donut-center-info">
              <div className="donut-center-total">$184k</div>
              <div className="donut-center-label">Monthly</div>
            </div>
          </div>

          <div className="distribution-list">
            {chartAnalyticsData.revenueDistribution.map((item, idx) => (
              <div key={idx} className="dist-item">
                <div className="dist-info">
                  <span className="dist-color-pill" style={{ backgroundColor: item.color }} />
                  <span className="dist-name">{item.label}</span>
                </div>
                <div className="dist-numbers">
                  <span className="dist-val">{item.value}</span>
                  <span className="dist-pct" style={{ marginLeft: '6px' }}>({item.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
