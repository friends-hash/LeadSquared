import React from "react";
import "./smartviews.css";
import { Search, Filter, ChevronDown, Plus, Mail, Phone, Calendar, User, MoreVertical } from "lucide-react";

function SmartViews() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("My New Leads");

  // Sample leads data with category flags
  const sampleLeads = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phoneNumber: "1234567890",
      company: "Tech Corp",
      leadStatus: "New",
      assignedTo: "Self",
      createdDate: "2024-03-01",
      hasPendingTasks: false
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@email.com",
      phoneNumber: "9876543210",
      company: "Marketing Inc",
      leadStatus: "Contacted",
      assignedTo: "Team Member 1",
      createdDate: "2024-02-28",
      hasPendingTasks: true
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Davis",
      email: "mike.davis@company.com",
      phoneNumber: "5556667777",
      company: "Davis Enterprises",
      leadStatus: "Qualified",
      assignedTo: "Self",
      createdDate: "2024-02-25",
      hasPendingTasks: true
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@startup.com",
      phoneNumber: "4445556666",
      company: "Tech Startup",
      leadStatus: "Converted",
      assignedTo: "Self",
      createdDate: "2024-03-02",
      hasPendingTasks: false
    }
  ];

  // Filter leads by active tab
  const filteredLeads = sampleLeads
    .filter(lead => {
      switch (activeTab) {
        case 'My New Leads':
          return lead.leadStatus === 'New';
        case 'My Leads with Pending Tasks':
          return lead.hasPendingTasks;
        case 'My Engaged Leads':
          return ['Contacted', 'Qualified'].includes(lead.leadStatus);
        case 'My Customers':
          return lead.leadStatus === 'Converted';
        case 'My Tasks':
          return lead.hasPendingTasks;
        default:
          return true;
      }
    })
    .filter(lead =>
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getTabIcon = (tab) => {
    switch(tab) {
      case 'My New Leads': return '✨';
      case 'My Leads with Pending Tasks': return '📋';
      case 'My Engaged Leads': return '🤝';
      case 'My Customers': return '👥';
      case 'My Tasks': return '✓';
      default: return '';
    }
  };

  return (
    <div className="smartviews-container">
      {/* Header */}
      <div className="smartviews-header">
        <h1>{activeTab}</h1>
        <p>Manage and organize your leads efficiently</p>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs-container">
          {['My New Leads', 'My Leads with Pending Tasks', 'My Engaged Leads', 'My Customers', 'My Tasks'].map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="tab-icon">{getTabIcon(tab)}</span>
              <span className="tab-label">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="smartviews-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <button className="filter-btn">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="sort-btn">
            <span>Last Activity</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="leads-container">
        {filteredLeads.length > 0 ? (
          <div className="leads-list">
            {filteredLeads.map(lead => (
              <div key={lead.id} className="lead-card">
                <div className="lead-card-header">
                  <div className="lead-avatar">
                    {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                  </div>
                  <div className="lead-basic-info">
                    <h3>{lead.firstName} {lead.lastName}</h3>
                    <p>{lead.company}</p>
                  </div>
                  <div className="lead-status">
                    <span className={`status-badge status-${lead.leadStatus.toLowerCase()}`}>
                      {lead.leadStatus}
                    </span>
                  </div>
                  <button className="action-menu">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="lead-card-details">
                  <div className="detail-item">
                    <Mail size={14} />
                    <span>{lead.email}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={14} />
                    <span>{lead.phoneNumber}</span>
                  </div>
                  <div className="detail-item">
                    <User size={14} />
                    <span>{lead.assignedTo}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={14} />
                    <span>{new Date(lead.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No records added yet!</h3>
            <p>There are no {activeTab.toLowerCase()} at this time.</p>
            <div className="empty-actions">
              <button className="btn-primary">
                <Plus size={16} />
                Quick Add Lead
              </button>
              <button className="btn-secondary">
                <Plus size={16} />
                Add New Lead
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      {filteredLeads.length > 0 && (
        <div className="floating-buttons">
          <button className="btn-floating-quick" title="Quick Add Lead">
            <Plus size={20} />
          </button>
          <button className="btn-floating-new" title="Add New Lead">
            <Plus size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SmartViews;
