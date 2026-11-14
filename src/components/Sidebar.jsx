import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileBarChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
  X,
  User
} from './Icons';

export default function Sidebar({
  activeTab,
  setActiveTab,
  onNavigateToSubscription,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'users', label: 'Users', icon: Users, badge: '6' },
    { id: 'reports', label: 'Reports', icon: FileBarChart, badge: 'New' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header & Brand Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => handleNavClick('dashboard')} title="NexusPulse Home">
            <div className="logo-badge">
              <Zap size={18} />
            </div>
            {!isCollapsed && (
              <div className="logo-text">
                <span className="logo-title">NexusPulse</span>
                <span className="logo-subtitle">Enterprise Suite</span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              className="icon-action-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              style={{ border: 'none', background: 'transparent' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div className="sidebar-nav-container">
          <div>
            {!isCollapsed && <div className="nav-group-label">Platform Core</div>}
            <ul className="sidebar-nav">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      style={{
                        width: '100%',
                        textAlign: isCollapsed ? 'center' : 'left',
                        background: isActive ? undefined : 'transparent'
                      }}
                    >
                      <span className="nav-icon">
                        <IconComponent size={18} />
                      </span>
                      {!isCollapsed && (
                        <>
                          <span className="nav-label">{item.label}</span>
                          {item.badge && <span className="nav-badge">{item.badge}</span>}
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Plan Quota Card (Rendered only when expanded) */}
          {!isCollapsed && (
            <div className="sidebar-quota-card">
              <div className="quota-header">
                <span className="quota-title">API Quota Usage</span>
                <span className="quota-value">78%</span>
              </div>
              <div className="quota-bar-bg">
                <div className="quota-bar-fill" />
              </div>
              <button
                className="quota-btn"
                onClick={() => {
                  if (onNavigateToSubscription) {
                    onNavigateToSubscription();
                  } else {
                    handleNavClick('settings');
                  }
                  if (mobileOpen) setMobileOpen(false);
                }}
                title="Manage Subscription & Billing"
              >
                <Zap size={13} /> Manage Subscription
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Footer with Desktop Collapse Toggle */}
        <div className="sidebar-footer">
          {/* Entire user pill is cleanly hidden in collapsed mode to prevent any collision or visual overflow */}
          {!isCollapsed && (
            <div className="sidebar-user-pill">
              <div className="sidebar-user-icon">
                <User size={16} />
              </div>
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">Alex Morgan</span>
                <span className="sidebar-user-role">Super Admin</span>
              </div>
            </div>
          )}

          <button
            className="sidebar-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
}
