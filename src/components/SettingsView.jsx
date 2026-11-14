import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Zap,
  CheckCircle,
  CreditCard,
  Clock,
  Download,
  AlertCircle,
  X,
  Check,
  Calendar,
  FileText
} from './Icons';
import { downloadInvoiceDocument } from '../utils/exportUtils';

export default function SettingsView({ activeSubTab: externalSubTab, setActiveSubTab: externalSetSubTab }) {
  const [internalSubTab, setInternalSubTab] = useState('profile');
  const activeSubTab = externalSubTab !== undefined ? externalSubTab : internalSubTab;
  const setActiveSubTab = externalSetSubTab || setInternalSubTab;

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [webhookTested, setWebhookTested] = useState(false);
  const [sessionsRevoked, setSessionsRevoked] = useState(false);

  // Billing & Subscription state
  const [currentPlan, setCurrentPlan] = useState('Enterprise Cloud Suite');
  const [planPrice, setPlanPrice] = useState('$4,900.00');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('enterprise');
  const [billingToast, setBillingToast] = useState(null);
  const [downloadingInvId, setDownloadingInvId] = useState(null);

  // Payment method state
  const [paymentCard, setPaymentCard] = useState({
    brand: 'Mastercard Corporate Black',
    last4: '4921',
    holder: 'Alex Morgan',
    expiry: '08/29'
  });

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2026-1102',
      date: 'Nov 01, 2026',
      period: 'Nov 01, 2026 - Dec 01, 2026',
      amount: '$4,900.00',
      status: 'Paid',
      method: 'Mastercard •••• 4921',
      description: 'NexusPulse Enterprise Cloud Suite (Annual Commitment)'
    },
    {
      id: 'INV-2026-1002',
      date: 'Oct 01, 2026',
      period: 'Oct 01, 2026 - Nov 01, 2026',
      amount: '$4,900.00',
      status: 'Paid',
      method: 'Mastercard •••• 4921',
      description: 'NexusPulse Enterprise Cloud Suite (Annual Commitment)'
    },
    {
      id: 'INV-2026-0902',
      date: 'Sep 01, 2026',
      period: 'Sep 01, 2026 - Oct 01, 2026',
      amount: '$4,900.00',
      status: 'Paid',
      method: 'Mastercard •••• 4921',
      description: 'NexusPulse Enterprise Cloud Suite (Annual Commitment)'
    },
    {
      id: 'INV-2026-0802',
      date: 'Aug 01, 2026',
      period: 'Aug 01, 2026 - Sep 01, 2026',
      amount: '$4,900.00',
      status: 'Paid',
      method: 'Mastercard •••• 4921',
      description: 'NexusPulse Enterprise Cloud Suite (Annual Commitment)'
    },
    {
      id: 'INV-2026-0702',
      date: 'Jul 01, 2026',
      period: 'Jul 01, 2026 - Aug 01, 2026',
      amount: '$4,900.00',
      status: 'Paid',
      method: 'Mastercard •••• 4921',
      description: 'NexusPulse Enterprise Cloud Suite (Annual Commitment)'
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@nexus.ai',
    title: 'Chief Technology Officer & Lead Architect',
    department: 'Engineering & Infrastructure',
    phone: '+1 (555) 382-9104',
    timezone: 'UTC-08:00 (Pacific Time)',
    language: 'English (United States)',
    twoFactor: true,
    hardwareKey: false,
    sessionAlerts: true,
    emailNotifications: true,
    weeklyReport: true,
    billingAlerts: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText('nx_live_9482bf41e03889104fa289c1048b');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleTestWebhook = () => {
    setWebhookTested(true);
    setTimeout(() => setWebhookTested(false), 3000);
  };

  const handleDownloadInvoice = (inv) => {
    setDownloadingInvId(inv.id);
    const filename = downloadInvoiceDocument(inv);
    setBillingToast(`Invoice #${inv.id} successfully downloaded ("${filename}")`);
    setTimeout(() => {
      setDownloadingInvId(null);
    }, 1800);
    setTimeout(() => {
      setBillingToast(null);
    }, 4500);
  };

  const handleConfirmPlanChange = (tier) => {
    if (tier === 'sovereign') {
      setCurrentPlan('Sovereign Dedicated Cloud');
      setPlanPrice('$9,500.00');
    } else if (tier === 'professional') {
      setCurrentPlan('Professional Cloud Platform');
      setPlanPrice('$1,850.00');
    } else if (tier === 'enterprise') {
      setCurrentPlan('Enterprise Cloud Suite');
      setPlanPrice('$4,900.00');
    }
    setShowUpgradeModal(false);
    setBillingToast(`Subscription successfully upgraded to ${tier.toUpperCase()} tier!`);
    setTimeout(() => setBillingToast(null), 4500);
  };

  return (
    <div className="table-panel" style={{ padding: '2rem 1.75rem' }}>
      {/* Toast Notification Banner */}
      {billingToast && (
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
          <div>{billingToast}</div>
        </div>
      )}

      <div className="settings-container">
        {/* Settings Navigation Tabs */}
        <div className="settings-nav">
          <button
            className={`settings-tab-btn ${activeSubTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('profile')}
          >
            <User size={17} />
            <span>Admin Profile</span>
          </button>

          <button
            className={`settings-tab-btn ${activeSubTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('billing')}
            style={{ position: 'relative' }}
          >
            <CreditCard size={17} />
            <span>Subscription & Billing</span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.15rem 0.4rem',
                borderRadius: '4px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)'
              }}
            >
              Enterprise
            </span>
          </button>

          <button
            className={`settings-tab-btn ${activeSubTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('security')}
          >
            <Shield size={17} />
            <span>Security & 2FA</span>
          </button>

          <button
            className={`settings-tab-btn ${activeSubTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('notifications')}
          >
            <Bell size={17} />
            <span>Notifications</span>
          </button>

          <button
            className={`settings-tab-btn ${activeSubTab === 'api' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('api')}
          >
            <Zap size={17} />
            <span>API & Webhooks</span>
          </button>
        </div>

        {/* Settings Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* General Success Toast */}
          {savedSuccess && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--success-bg)',
                color: 'var(--success)',
                border: '1px solid var(--success-border)',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <CheckCircle size={18} />
              Settings successfully saved and synchronized across production clusters.
            </div>
          )}

          {/* TAB 1: ADMIN PROFILE */}
          {activeSubTab === 'profile' && (
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    Profile Information
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    Manage your personal account credentials, designation, and regional settings
                  </p>
                </div>
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: '1px solid var(--primary-border)'
                  }}
                >
                  Super Admin Account
                </span>
              </div>

              {/* Profile Card Header with Vector Avatar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border)',
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--dark-navy)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <User size={26} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Alex Morgan
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    alex.morgan@nexus.ai • Full Organization Access
                  </div>
                </div>
              </div>

              {/* Form Input Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Job Title / Designation</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Default Timezone</label>
                  <select
                    className="form-input"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option>UTC-08:00 (Pacific Time)</option>
                    <option>UTC-05:00 (Eastern Time)</option>
                    <option>UTC+00:00 (London, GMT)</option>
                    <option>UTC+05:30 (India Standard Time)</option>
                    <option>UTC+09:00 (Tokyo, JST)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Preferred Interface Language</label>
                  <select
                    className="form-input"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  >
                    <option>English (United States)</option>
                    <option>English (United Kingdom)</option>
                    <option>Deutsch (Deutschland)</option>
                    <option>Français (France)</option>
                    <option>日本語 (Japanese)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="submit" className="primary-btn">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SUBSCRIPTION & BILLING (DEDICATED ADVANCED VIEW) */}
          {activeSubTab === 'billing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Header Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    Subscription & Corporate Billing
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    Manage enterprise tier commitment, live metered quotas, billing profiles, and certified tax invoices.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--success-bg)',
                      color: 'var(--success)',
                      border: '1px solid var(--success-border)'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                    Active Enterprise Tier
                  </span>
                </div>
              </div>

              {/* 1. Current Plan Hero Card */}
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          backgroundColor: 'var(--primary)',
                          color: '#ffffff'
                        }}
                      >
                        Active Commitment
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Contract #NX-SUB-2026-8842
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                      {currentPlan}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Unlimited high-concurrency clusters, dedicated multi-region edge routing, and round-the-clock priority SLA.
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                      {planPrice}
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}> / month</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Billed annually ($58,800.00/yr) • Next cycle: Dec 15, 2026
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.75rem',
                    padding: '1rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Check size={16} style={{ color: 'var(--primary)' }} /> 25 Operator Seats with Okta SAML
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Check size={16} style={{ color: 'var(--primary)' }} /> 10M API Calls / Month Included
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Check size={16} style={{ color: 'var(--primary)' }} /> 2.0 TB Multi-Region Edge CDN
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Check size={16} style={{ color: 'var(--primary)' }} /> Dedicated TAM & 15-Min SLA
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Auto-renew active via Corporate Mastercard ending in <strong>{paymentCard.last4}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      <Zap size={14} /> Upgrade / Change Tier
                    </button>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Update Card
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Live Metered Quotas (API, Bandwidth, Seats, Storage) */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
                  Live Resource Quotas & Infrastructure Telemetry
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {/* Quota Card 1: API */}
                  <div
                    style={{
                      padding: '1.15rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        API Request Volume
                      </span>
                      <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--primary)' }}>
                        78.4%
                      </span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.65rem' }}>
                      <div style={{ width: '78.4%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>7,842,100 used</span>
                      <span>10,000,000 cap</span>
                    </div>
                  </div>

                  {/* Quota Card 2: Edge CDN */}
                  <div
                    style={{
                      padding: '1.15rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        Global Edge CDN Bandwidth
                      </span>
                      <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--primary)' }}>
                        71.0%
                      </span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.65rem' }}>
                      <div style={{ width: '71.0%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>1.42 TB routed</span>
                      <span>2.0 TB limit</span>
                    </div>
                  </div>

                  {/* Quota Card 3: Seats */}
                  <div
                    style={{
                      padding: '1.15rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        Admin & Operator Licenses
                      </span>
                      <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--success)' }}>
                        72.0%
                      </span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.65rem' }}>
                      <div style={{ width: '72.0%', height: '100%', backgroundColor: 'var(--success)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>18 / 25 assigned</span>
                      <span>7 licenses open</span>
                    </div>
                  </div>

                  {/* Quota Card 4: Storage */}
                  <div
                    style={{
                      padding: '1.15rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        Encrypted Storage & Backups
                      </span>
                      <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--dark-navy)' }}>
                        41.2%
                      </span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.65rem' }}>
                      <div style={{ width: '41.2%', height: '100%', backgroundColor: 'var(--dark-navy)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>412 GB stored</span>
                      <span>1,000 GB cap</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method & Billing Address Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {/* Payment Instruments */}
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Payment Methods
                    </h4>
                    <button
                      type="button"
                      className="secondary-btn"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                      onClick={() => setShowPaymentModal(true)}
                    >
                      + Add Method
                    </button>
                  </div>

                  {/* Primary Card */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--border)',
                      marginBottom: '0.65rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '28px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--dark-navy)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {paymentCard.brand} •••• {paymentCard.last4}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Expires {paymentCard.expiry} • {paymentCard.holder}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)'
                      }}
                    >
                      Default
                    </span>
                  </div>

                  {/* Secondary Method */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '28px',
                          borderRadius: '4px',
                          backgroundColor: '#f1f5f9',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Zap size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          Corporate ACH Direct Debit
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          JPMorgan Chase •••• 8812 • Verified
                        </div>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                      Backup
                    </span>
                  </div>
                </div>

                {/* Billing Profile & Remittance */}
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Billing Profile & Legal Entity
                    </h4>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: 'var(--success-bg)',
                        color: 'var(--success)'
                      }}
                    >
                      Verified Tax Exempt
                    </span>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 700 }}>Nexus Technologies Global, Inc.</div>
                    <div>100 Montgomery St, Suite 1400</div>
                    <div>San Francisco, CA 94104, United States</div>
                    <div style={{ marginTop: '0.45rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Tax ID / EIN: <strong>US-94-3829104</strong> • PO: <strong>PO-2026-ENG-8492</strong>
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Billing Inquiries: <strong>billing@nexus.ai</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Certified Invoices & Billing History (with REAL WORKING PDF DOWNLOADS!) */}
              <div
                style={{
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#ffffff',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    padding: '1.15rem 1.25rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Official Invoices & Tax Receipts
                    </h4>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Download verified audit-compliant PDF statements with cryptographic hash signatures
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    5 invoices available
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="nexus-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Billing Cycle</th>
                        <th>Issued Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => {
                        const isDownloading = downloadingInvId === inv.id;
                        return (
                          <tr key={inv.id}>
                            <td style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>
                              {inv.id}
                            </td>
                            <td style={{ fontSize: '0.825rem' }}>{inv.period}</td>
                            <td style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{inv.date}</td>
                            <td style={{ fontWeight: 700, fontSize: '0.875rem' }}>{inv.amount}</td>
                            <td>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: '4px',
                                  fontSize: '0.725rem',
                                  fontWeight: 700,
                                  backgroundColor: 'var(--success-bg)',
                                  color: 'var(--success)'
                                }}
                              >
                                <Check size={12} /> {inv.status}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button
                                type="button"
                                className="secondary-btn"
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '0.35rem 0.75rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem'
                                }}
                                onClick={() => handleDownloadInvoice(inv)}
                                disabled={isDownloading}
                                title={`Download Invoice #${inv.id} PDF`}
                              >
                                <Download size={13} />
                                {isDownloading ? 'Downloading...' : 'Download PDF'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & 2FA */}
          {activeSubTab === 'security' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  Security & Authentication
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Enforce hardware security tokens, WebAuthn credentials, and audit active browser sessions
                </p>
              </div>

              {/* 2FA Card */}
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  backgroundColor: '#ffffff',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Shield size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        Two-Factor Authentication (2FA / MFA)
                      </div>
                      <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                        Enforce TOTP authenticator (Google Authenticator, 1Password) on every login
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.twoFactor}
                    onChange={(e) => setFormData({ ...formData, twoFactor: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                  />
                </div>
              </div>

              {/* Active Sessions */}
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      Active Browser Sessions
                    </div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      Devices currently authenticated to your administrator dashboard
                    </div>
                  </div>
                  <button
                    className="secondary-btn"
                    style={{ fontSize: '0.785rem', padding: '0.4rem 0.85rem' }}
                    onClick={() => {
                      setSessionsRevoked(true);
                      setTimeout(() => setSessionsRevoked(false), 3000);
                    }}
                  >
                    {sessionsRevoked ? '✓ All Other Sessions Revoked' : 'Revoke Other Sessions'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary)'
                        }}
                      >
                        <User size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          Chrome 130 on Windows 11 (Current Session)
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          San Francisco, United States • IP: 192.0.2.148 • Active now
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--success-bg)',
                        color: 'var(--success)'
                      }}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeSubTab === 'notifications' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  Notification & Telemetry Preferences
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Configure automated email dispatch, threshold triggers, and billing invoices
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                      Critical Infrastructure Alerts
                    </div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      Immediate notifications when API latency exceeds 50ms or SLA drops below 99.9%
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.sessionAlerts}
                    onChange={(e) => setFormData({ ...formData, sessionAlerts: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                      Billing & Quota Threshold Alerts
                    </div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      Receive email when API quota usage exceeds 80% or when annual invoices are issued
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.billingAlerts}
                    onChange={(e) => setFormData({ ...formData, billingAlerts: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: API & WEBHOOKS */}
          {activeSubTab === 'api' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  Developer API & Webhooks
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Manage enterprise production keys and external webhook ingestion pipelines
                </p>
              </div>

              {/* API Key Box */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#ffffff',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Live Production Secret Key
                </div>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Authenticate server-to-server requests using Bearer tokens. Keep this private.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      flex: 1,
                      minWidth: '220px',
                      fontFamily: 'monospace',
                      fontSize: '0.825rem',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#f8fafc',
                      color: 'var(--text-main)',
                      letterSpacing: apiKeyVisible ? 'normal' : '0.15em'
                    }}
                  >
                    {apiKeyVisible
                      ? 'nx_live_9482bf41e03889104fa289c1048b'
                      : 'nx_live_••••••••••••••••••••••••••••'}
                  </div>

                  <button
                    type="button"
                    className="secondary-btn"
                    style={{ fontSize: '0.785rem', padding: '0.55rem 0.85rem' }}
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  >
                    {apiKeyVisible ? 'Hide' : 'Reveal'}
                  </button>

                  <button
                    type="button"
                    className="primary-btn"
                    style={{ fontSize: '0.785rem', padding: '0.55rem 0.85rem' }}
                    onClick={handleCopyKey}
                  >
                    {copiedKey ? '✓ Copied' : 'Copy Key'}
                  </button>
                </div>
              </div>

              {/* Webhook Endpoint Card */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Event Webhook Endpoint
                </div>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  We will dispatch JSON POST payloads for events like <code>order.completed</code> and <code>account.upgraded</code>.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <input
                    type="url"
                    className="form-input"
                    style={{ flex: 1, minWidth: '220px' }}
                    defaultValue="https://api.yourdomain.com/v1/webhooks/nexus"
                  />
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleTestWebhook}
                  >
                    {webhookTested ? '✓ 200 OK Delivered' : 'Send Test Ping'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* UPGRADE PLAN MODAL */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Upgrade Enterprise Commitment Tier</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Scale infrastructure quotas, dedicated multi-region bandwidth, and operator seats
                </p>
              </div>
              <button
                type="button"
                className="icon-action-btn"
                onClick={() => setShowUpgradeModal(false)}
                style={{ border: 'none', background: 'transparent' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Tier 1: Professional */}
              <div
                onClick={() => setSelectedTier('professional')}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: selectedTier === 'professional' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: selectedTier === 'professional' ? 'var(--primary-light)' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Professional Platform
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    4M API requests, 12 operator seats, 800GB CDN, standard priority support
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>$1,850/mo</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Billed annually</div>
                </div>
              </div>

              {/* Tier 2: Enterprise (Current) */}
              <div
                onClick={() => setSelectedTier('enterprise')}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: selectedTier === 'enterprise' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: selectedTier === 'enterprise' ? 'var(--primary-light)' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      Enterprise Cloud Suite
                    </span>
                    <span style={{ fontSize: '0.675rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: 'var(--primary)', color: '#ffffff' }}>
                      Current Plan
                    </span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    10M API requests, 25 operator seats, 2TB edge CDN, dedicated TAM & 15-min SLA
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>$4,900/mo</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Billed annually</div>
                </div>
              </div>

              {/* Tier 3: Sovereign Cloud */}
              <div
                onClick={() => setSelectedTier('sovereign')}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: selectedTier === 'sovereign' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: selectedTier === 'sovereign' ? 'var(--primary-light)' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Sovereign Dedicated Cloud
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    Unlimited API calls, 100 seats, isolated dedicated VPC, custom compliance residency
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>$9,500/mo</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Custom agreement</div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="secondary-btn" onClick={() => setShowUpgradeModal(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="primary-btn"
                onClick={() => handleConfirmPlanChange(selectedTier)}
              >
                Confirm Plan Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE PAYMENT CARD MODAL */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Update Payment Method</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Add or update your primary corporate payment instrument
                </p>
              </div>
              <button
                type="button"
                className="icon-action-btn"
                onClick={() => setShowPaymentModal(false)}
                style={{ border: 'none', background: 'transparent' }}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPaymentModal(false);
                setBillingToast('Primary payment card updated successfully!');
                setTimeout(() => setBillingToast(null), 4500);
              }}
            >
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Name on Corporate Card</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue={paymentCard.holder}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue={`•••• •••• •••• ${paymentCard.last4}`}
                    placeholder="4111 2222 3333 4444"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Expiration Date</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue={paymentCard.expiry}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">CVC / Security Code</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue="892"
                      placeholder="CVC"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
