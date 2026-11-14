import React, { useState } from 'react';
import { initialUsersData } from '../data/mockData';
import { Plus, Search, Shield, User, Trash2 } from './Icons';

export default function UsersView() {
  const [users, setUsers] = useState(initialUsersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Member',
    department: 'Engineering'
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || u.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userObj = {
      id: `USR-${Math.floor(Math.random() * 900) + 100}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'Active',
      lastActive: 'Just now',
      location: 'Remote',
      twoFactor: true
    };

    setUsers([userObj, ...users]);
    setNewUser({ name: '', email: '', role: 'Member', department: 'Engineering' });
    setShowAddModal(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* View Header */}
      <div className="table-panel-header" style={{ borderRadius: '12px', background: '#ffffff', border: '1px solid var(--border)' }}>
        <div className="table-title-area">
          <h3>Team Directory & Access Governance</h3>
          <p>Administrative profiles, permission tiers, and 2FA authentication logs</p>
        </div>

        <div className="table-toolbar">
          <div className="table-search-box">
            <Search className="table-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="AI & Research">AI & Research</option>
            <option value="Finance">Finance</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>

          <button className="primary-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={15} /> Add Member
          </button>
        </div>
      </div>

      {/* User Cards Grid - Clean Solid Profile Icons (Zero Stock Photos) */}
      <div className="view-card-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-profile-card">
            {/* Elegant Vector Profile Icon Box */}
            <div className="user-avatar-icon-box">
              <User size={24} />
            </div>

            <h4 className="user-card-name">{user.name}</h4>
            <span className="user-card-role">{user.role}</span>
            <span className="user-card-dept">{user.department} • {user.location}</span>

            <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.85rem' }}>
              <span className={`status-badge ${user.status.toLowerCase()}`}>
                <span className="dot" />
                {user.status}
              </span>

              {user.twoFactor && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  <Shield size={12} /> 2FA
                </span>
              )}
            </div>

            <div className="user-card-footer">
              <span>Active {user.lastActive}</span>
              <button
                className="row-action-btn delete"
                onClick={() => handleDeleteUser(user.id)}
                title="Remove user"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Invite Team Member</span>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Liam Gallagher"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="liam@nexus.ai"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Assigned Role</label>
                  <select
                    className="form-input"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Lead Architect">Lead Architect</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Security Admin">Security Admin</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    className="form-input"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Product">Product</option>
                    <option value="AI & Research">AI & Research</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
