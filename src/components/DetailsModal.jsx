import React, { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, Download, CreditCard, Shield, User } from './Icons';
import { downloadInvoiceDocument } from '../utils/exportUtils';

export default function DetailsModal({ item, onClose }) {
  const [downloaded, setDownloaded] = useState(false);
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="modal-title">Transaction Details</span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  padding: '0.2rem 0.5rem',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  borderRadius: '6px',
                  fontWeight: 700
                }}
              >
                {item.id}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Processed on {item.date} via {item.paymentMethod}
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-body">
          {/* Customer Profile Banner with Clean Vector Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-hover)',
              marginBottom: '1.25rem'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'var(--dark-navy)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <User size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {item.customer.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.customer.email}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '2px' }}>
                Origin: {item.country}
              </div>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div>
            <div className="detail-row">
              <span className="detail-label">Subscription Tier</span>
              <span className="detail-value">{item.plan}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Total Amount</span>
              <span className="detail-value" style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>
                ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">{item.paymentMethod}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Lifecycle Status</span>
              <span className="detail-value">
                <span
                  style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor:
                      item.status === 'Completed'
                        ? 'var(--success-bg)'
                        : 'var(--warning-bg)',
                    color: item.status === 'Completed' ? 'var(--success)' : 'var(--warning)',
                    border: `1px solid ${item.status === 'Completed' ? 'var(--success-border)' : 'var(--warning-border)'}`
                  }}
                >
                  {item.status}
                </span>
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Account Priority</span>
              <span className="detail-value">{item.priority || 'Normal'} Priority SLA</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Verification & Compliance</span>
              <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)' }}>
                <Shield size={14} /> 256-Bit Encrypted & Verified
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            className={downloaded ? 'primary-btn' : 'secondary-btn'}
            style={{ backgroundColor: downloaded ? 'var(--success)' : undefined, borderColor: downloaded ? 'var(--success)' : undefined }}
            onClick={() => {
              downloadInvoiceDocument({
                id: item.id,
                date: item.date,
                amount: item.amount,
                customer: item.customer,
                description: `NexusPulse Fulfillment Order for ${item.customer}`
              });
              setDownloaded(true);
              setTimeout(() => setDownloaded(false), 2000);
            }}
          >
            {downloaded ? (
              <>
                <CheckCircle size={15} /> Invoice Downloaded!
              </>
            ) : (
              <>
                <Download size={15} /> Download Invoice PDF
              </>
            )}
          </button>
          <button className="primary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
