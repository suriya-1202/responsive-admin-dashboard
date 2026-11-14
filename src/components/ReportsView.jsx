import React, { useState } from 'react';
import { Download, Zap, CheckCircle, FileText } from './Icons';
import { systemHealthStats } from '../data/mockData';
import { downloadComplianceReport, generateSystemAuditSnapshot } from '../utils/exportUtils';

export default function ReportsView() {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadToast, setDownloadToast] = useState(null);

  const reportsList = [
    {
      id: 'fin-q4',
      title: 'Q4 2026 Executive Financial Report',
      date: 'Generated Nov 10, 2026',
      size: '4.8 MB',
      type: 'PDF',
      category: 'Finance',
      description: 'GAAP revenue, EBITDA margins, cash runway, and board attestation.'
    },
    {
      id: 'sla-audit',
      title: 'Global Edge Network Latency & SLA Audit',
      date: 'Generated Nov 08, 2026',
      size: '2.1 MB',
      type: 'CSV',
      category: 'Infrastructure',
      description: 'P50/P95/P99 latency across 24 edge points of presence with packet loss audits.'
    },
    {
      id: 'soc2-audit',
      title: 'SOC2 Type-II Continuous Compliance Audit',
      date: 'Generated Nov 05, 2026',
      size: '8.4 MB',
      type: 'PDF',
      category: 'Security',
      description: 'Independent AICPA trust criteria verification with zero critical findings.'
    },
    {
      id: 'cohort-retention',
      title: 'Customer Cohort Retention & Churn Velocity',
      date: 'Generated Nov 01, 2026',
      size: '1.4 MB',
      type: 'CSV',
      category: 'Growth',
      description: '12-month cohort renewal velocity and net expansion rate metrics.'
    }
  ];

  const handleDownload = (rep) => {
    setDownloadingId(rep.id);
    const result = downloadComplianceReport(rep);
    setDownloadToast(`Successfully downloaded "${result.name}"`);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1800);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4500);
  };

  const handleRunCustomAudit = () => {
    setDownloadingId('custom-audit');
    const filename = generateSystemAuditSnapshot();
    setDownloadToast(`Custom live audit snapshot generated and downloaded: "${filename}"`);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1800);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Real-time Toast Feedback Notification */}
      {downloadToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            backgroundColor: 'var(--dark-navy)',
            color: '#ffffff',
            padding: '0.9rem 1.4rem',
            borderRadius: '10px',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <div style={{ color: '#4ade80' }}>
            <CheckCircle size={20} />
          </div>
          <div>{downloadToast}</div>
        </div>
      )}

      {/* System Health Overview Row */}
      <div className="report-metrics-row">
        {systemHealthStats.map((stat, i) => (
          <div key={i} className="dashboard-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {stat.label}
              </span>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
              />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginTop: '0.25rem' }}>
              All 24 regions operational
            </div>
          </div>
        ))}
      </div>

      {/* Reports Center Panel */}
      <div className="table-panel">
        <div className="table-panel-header">
          <div className="table-title-area">
            <h3>Generated Compliance & Performance Reports</h3>
            <p>Download certified system exports, audit records, and financial statements</p>
          </div>

          <button
            className="primary-btn"
            onClick={handleRunCustomAudit}
            disabled={downloadingId === 'custom-audit'}
          >
            <Zap size={16} />
            {downloadingId === 'custom-audit' ? 'Compiling Snapshot...' : 'Run Custom Audit'}
          </button>
        </div>

        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {reportsList.map((rep) => {
              const isDownloading = downloadingId === rep.id;
              return (
                <div
                  key={rep.id}
                  style={{
                    padding: '1.35rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <span
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'inline-block'
                        }}
                      >
                        {rep.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: rep.type === 'PDF' ? '#fee2e2' : '#dcfce7',
                          color: rep.type === 'PDF' ? '#b91c1c' : '#15803d'
                        }}
                      >
                        {rep.type}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.45rem', lineHeight: 1.35 }}>
                      {rep.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                      {rep.description}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {rep.date} • {rep.size}
                    </div>
                  </div>

                  <button
                    className={isDownloading ? 'primary-btn' : 'secondary-btn'}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontWeight: 600,
                      gap: '0.5rem',
                      backgroundColor: isDownloading ? 'var(--success)' : undefined,
                      borderColor: isDownloading ? 'var(--success)' : undefined
                    }}
                    onClick={() => handleDownload(rep)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <CheckCircle size={15} /> Download Complete!
                      </>
                    ) : (
                      <>
                        <Download size={15} /> Download Document
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
