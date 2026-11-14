import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import AnalyticsCharts from './components/AnalyticsCharts';
import DataTable from './components/DataTable';
import DetailsModal from './components/DetailsModal';
import UsersView from './components/UsersView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import { Download } from './components/Icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsSubTab, setSettingsSubTab] = useState('profile');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [timeframe, setTimeframe] = useState('30D');

  const handleNavigateToSubscription = () => {
    setActiveTab('settings');
    setSettingsSubTab('billing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Responsive Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateToSubscription={handleNavigateToSubscription}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className={`main-wrapper ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header with Search and Profile Section */}
        <Header
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setMobileOpen={setMobileOpen}
          setActiveTab={setActiveTab}
          onNavigateToSubscription={handleNavigateToSubscription}
        />

        {/* View Router / Body Content */}
        <main className="content-body">
          {activeTab === 'dashboard' && (
            <>
              {/* Executive Welcome Banner & Dynamic Timeframe Controls */}
              <div className="dashboard-welcome-banner">
                <div className="banner-text">
                  <h2>Operational Dashboard</h2>
                  <p>Consolidated global infrastructure telemetry, revenue pipeline, and order fulfillment</p>
                </div>

                <div className="banner-controls">
                  <div className="timeframe-pill-selector">
                    {['7D', '30D', '90D', '1Y'].map((tf) => (
                      <button
                        key={tf}
                        className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>

                  <button
                    className="secondary-btn"
                    onClick={() => setActiveTab('reports')}
                  >
                    <Download size={15} /> Export Audit
                  </button>
                </div>
              </div>

              {/* 1. At Least 4 Summary Cards (Total Users, Revenue, Orders, Growth) */}
              <SummaryCards timeframe={timeframe} />

              {/* 2. Precision Performance Charts & Visualizations */}
              <AnalyticsCharts />

              {/* 3. Table Containing at least 10 Records with Search, Sorting, Pagination */}
              <DataTable
                externalSearch={searchQuery}
                onSelectRow={(row) => setSelectedRow(row)}
              />
            </>
          )}

          {activeTab === 'users' && <UsersView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'settings' && (
            <SettingsView
              activeSubTab={settingsSubTab}
              setActiveSubTab={setSettingsSubTab}
            />
          )}
        </main>
      </div>

      {/* Row Inspection Modal Dialog */}
      <DetailsModal item={selectedRow} onClose={() => setSelectedRow(null)} />
    </div>
  );
}
