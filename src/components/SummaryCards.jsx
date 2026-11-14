import React from 'react';
import {
  Users,
  DollarSign,
  ShoppingBag,
  Activity,
  TrendingUp,
  TrendingDown
} from './Icons';
import { timeframeMetrics } from '../data/mockData';

export default function SummaryCards({ timeframe = '30D' }) {
  const cards = timeframeMetrics[timeframe] || timeframeMetrics['30D'];

  const getIcon = (type) => {
    switch (type) {
      case 'users':
        return <Users size={20} />;
      case 'dollar':
        return <DollarSign size={20} />;
      case 'orders':
        return <ShoppingBag size={20} />;
      case 'growth':
        return <Activity size={20} />;
      default:
        return <Activity size={20} />;
    }
  };

  const getSparkColor = (accentColor) => {
    switch (accentColor) {
      case 'emerald':
        return '#16a34a';
      case 'blue':
        return '#2563eb';
      case 'purple':
        return '#7c3aed';
      default:
        return '#d97706';
    }
  };

  return (
    <section className="summary-cards-grid" aria-label="Key Performance Indicators">
      {cards.map((card) => {
        const maxSpark = Math.max(...card.sparkline);
        return (
          <div key={card.id} className="summary-card" tabIndex={0}>
            {/* Top row: Solid Icon container and Solid Trend badge */}
            <div className="card-top">
              <div className={`card-icon-box ${card.accentColor}`}>
                {getIcon(card.iconType)}
              </div>
              <div className={`trend-badge ${card.isPositive ? 'positive' : 'negative'}`}>
                {card.isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                <span>{card.change}</span>
              </div>
            </div>

            {/* Middle row: Metric Label and Large Figure */}
            <div className="card-middle">
              <div className="card-title">{card.title}</div>
              <div className="card-value">{card.value}</div>
            </div>

            {/* Bottom row: Subtext and Solid Mini Sparkline */}
            <div className="card-bottom">
              <span className="card-subtext">{card.subtext}</span>
              <div className="mini-sparkline" title="Performance trend over period">
                {card.sparkline.map((val, idx) => {
                  const heightPct = Math.round((val / maxSpark) * 100);
                  return (
                    <div
                      key={idx}
                      className="spark-bar"
                      style={{
                        height: `${Math.max(heightPct, 18)}%`,
                        backgroundColor: getSparkColor(card.accentColor)
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
