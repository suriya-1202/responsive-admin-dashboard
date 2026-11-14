import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  CheckCircle,
  AlertCircle
} from './Icons';
import { systemNotifications } from '../data/mockData';

export default function Header({
  activeTab,
  searchQuery,
  setSearchQuery,
  setMobileOpen,
  setActiveTab,
  onNavigateToSubscription
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(systemNotifications);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'users':
        return 'User Directory';
      case 'reports':
        return 'Analytics & Compliance Reports';
      case 'settings':
        return 'System & Account Settings';
      default:
        return 'Dashboard Overview';
    }
  };

  return (
    <header className="header">
      {/* Left: Mobile hamburger & Titles */}
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <div className="header-breadcrumbs">
            <span>NexusPulse</span>
            <span>/</span>
            <span style={{ textTransform: 'capitalize', color: 'var(--primary)', fontWeight: 600 }}>
              {activeTab}
            </span>
          </div>
          <h1 className="header-page-title">{getPageTitle()}</h1>
        </div>
      </div>

      {/* Right: Search bar, notifications & profile */}
      <div className="header-right">
        {/* Search Bar */}
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search metrics, orders, users..."
              className="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <span className="search-shortcut-pill">⌘K</span>
          </div>
        </div>

        {/* Action icons */}
        <div className="header-actions">
          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="icon-action-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
              aria-label="Open notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="notification-badge-dot" />}
            </button>

            {showNotifications && (
              <div className="dropdown-popover notifications-popover">
                <div className="dropdown-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="dropdown-title">System Notifications</span>
                    {unreadCount > 0 && (
                      <span className="nav-badge" style={{ fontSize: '0.65rem' }}>
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button className="dropdown-action-text" onClick={markAllAsRead}>
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="dropdown-list">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`notif-item ${!item.read ? 'unread' : ''}`}
                      onClick={() => {
                        setNotifications(
                          notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n))
                        );
                      }}
                    >
                      <div style={{ marginTop: '2px' }}>
                        {item.type === 'alert' ? (
                          <AlertCircle size={17} style={{ color: 'var(--danger)' }} />
                        ) : (
                          <CheckCircle size={17} style={{ color: 'var(--success)' }} />
                        )}
                      </div>
                      <div className="notif-content">
                        <div className="notif-title">{item.title}</div>
                        <div className="notif-desc">{item.message}</div>
                        <div className="notif-time">{item.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section with Dropdown Menu */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <div
            className="profile-pill"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            role="button"
            tabIndex={0}
            aria-label="User profile menu"
          >
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-icon">
                <User size={16} />
              </div>
              <span className="status-dot-online" />
            </div>
            <div className="profile-info">
              <span className="profile-name">Alex Morgan</span>
              <span className="profile-role-badge">Super Admin</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-light)', marginLeft: '0.15rem' }} />
          </div>

          {showProfileMenu && (
            <div className="dropdown-popover">
              <div className="dropdown-header">
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    Alex Morgan
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    alex.morgan@nexus.ai
                  </div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: '0.35rem 0' }}>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                >
                  <User size={15} /> View Profile
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    if (onNavigateToSubscription) {
                      onNavigateToSubscription();
                    } else {
                      setActiveTab('settings');
                    }
                    setShowProfileMenu(false);
                  }}
                >
                  <CreditCard size={15} /> Billing & Quotas
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                >
                  <SettingsIcon size={15} /> Preferences
                </li>
                <li
                  className="dropdown-item danger"
                  onClick={() => {
                    alert('Session logged out successfully.');
                    setShowProfileMenu(false);
                  }}
                  style={{ borderTop: '1px solid var(--border)', marginTop: '0.25rem' }}
                >
                  <LogOut size={15} /> Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
