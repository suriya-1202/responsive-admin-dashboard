import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  User
} from './Icons';
import { initialOrdersData } from '../data/mockData';

export default function DataTable({ onSelectRow, externalSearch = '' }) {
  const [data, setData] = useState(initialOrdersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sync external search from header if provided
  const effectiveSearch = externalSearch || searchTerm;

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.id.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
        row.customer.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
        row.customer.email.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
        row.plan.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
        row.country.toLowerCase().includes(effectiveSearch.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || row.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [data, effectiveSearch, statusFilter]);

  // Sorted Data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'customer') {
        valA = a.customer.name;
        valB = b.customer.name;
      }

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredData, sortField, sortDirection]);

  // Pagination Logic
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Checkbox Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedData.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Row Delete
  const handleDeleteRow = (id, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete order ${id}?`)) {
      setData((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected orders?`)) {
      setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  // Bulk Status Update
  const handleBulkMarkComplete = () => {
    setData((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id) ? { ...item, status: 'Completed' } : item
      )
    );
    setSelectedIds([]);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Email', 'Plan', 'Amount', 'Date', 'Status', 'Payment Method'];
    const rows = filteredData.map((item) => [
      item.id,
      `"${item.customer.name}"`,
      item.customer.email,
      `"${item.plan}"`,
      item.amount,
      item.date,
      item.status,
      `"${item.paymentMethod}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NexusPulse_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'processing':
      case 'pending':
        return 'processing';
      case 'cancelled':
        return 'cancelled';
      case 'refunded':
        return 'refunded';
      default:
        return 'active';
    }
  };

  return (
    <section className="table-panel" aria-label="Transaction & Orders Records">
      {/* Table Header Bar */}
      <div className="table-panel-header">
        <div className="table-title-area">
          <h3>Recent Orders & Enterprise Accounts</h3>
          <p>Displaying transaction audit log across all global payment gateways</p>
        </div>

        <div className="table-toolbar">
          {/* Table Search Input */}
          <div className="table-search-box">
            <Search className="table-search-icon" size={16} />
            <input
              type="text"
              placeholder="Filter by customer, ID, plan..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter records"
            />
          </div>

          {/* Status Filter */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>

          {/* Export CSV Button */}
          <button className="secondary-btn" onClick={handleExportCSV} title="Export filtered records as CSV">
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Floating Bulk Action Bar when items selected */}
      {selectedIds.length > 0 && (
        <div className="bulk-actions-bar">
          <span className="bulk-count">{selectedIds.length} order(s) selected</span>
          <div className="bulk-buttons">
            <button className="secondary-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }} onClick={handleBulkMarkComplete}>
              Mark Completed
            </button>
            <button className="secondary-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleBulkDelete}>
              <Trash2 size={14} /> Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="table-responsive-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '48px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={handleSelectAll}
                  checked={paginatedData.length > 0 && selectedIds.length === paginatedData.length}
                  aria-label="Select all rows"
                />
              </th>
              <th className="sortable" onClick={() => handleSort('id')}>
                <div className="th-content">
                  Order ID <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('customer')}>
                <div className="th-content">
                  Customer <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('plan')}>
                <div className="th-content">
                  Plan / Service <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('amount')}>
                <div className="th-content">
                  Amount <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('date')}>
                <div className="th-content">
                  Date <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="sortable" onClick={() => handleSort('status')}>
                <div className="th-content">
                  Status <ArrowUpDown size={12} />
                </div>
              </th>
              <th>Payment Method</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No matching records found for "{effectiveSearch || statusFilter}"
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => onSelectRow(row)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id)}
                        aria-label={`Select order ${row.id}`}
                      />
                    </td>
                    <td style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>
                      {row.id}
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar-box">
                          <User size={15} />
                        </div>
                        <div className="customer-meta">
                          <span className="customer-name">{row.customer.name}</span>
                          <span className="customer-email">{row.customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{row.plan}</td>
                    <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                      ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{row.date}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(row.status)}`}>
                        <span className="dot" />
                        {row.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {row.paymentMethod}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="table-actions-cell" style={{ justifyContent: 'center' }}>
                        <button
                          className="row-action-btn"
                          onClick={() => onSelectRow(row)}
                          title="View order details"
                          aria-label="View details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="row-action-btn delete"
                          onClick={(e) => handleDeleteRow(row.id, e)}
                          title="Delete record"
                          aria-label="Delete order"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="table-pagination-footer">
        <div className="pagination-info">
          Showing <strong>{totalItems === 0 ? 0 : startIndex + 1}</strong> to{' '}
          <strong>{Math.min(startIndex + itemsPerPage, totalItems)}</strong> of{' '}
          <strong>{totalItems}</strong> entries
        </div>

        <div className="pagination-controls">
          <select
            className="filter-select"
            style={{ height: '34px', paddingRight: '1.75rem', fontSize: '0.75rem', marginRight: '0.5rem' }}
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            aria-label="Rows per page"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

