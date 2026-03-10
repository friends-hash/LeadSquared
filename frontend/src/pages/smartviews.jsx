import React from "react";
import "./smartviews.css";
import { Search, Filter, ChevronDown, Plus, Mail, Phone, Calendar, User, MoreVertical, X } from "lucide-react";

function SmartViews() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("My New Leads");
  const [showModal, setShowModal] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    website: "",
    leadSource: "",
    doNotSMS: false,
    doNotEmail: false,
    doNotCall: false,
    doNotTrack: false
  });

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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phoneNumber && !/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setShowModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        website: "",
        leadSource: "",
        doNotSMS: false,
        doNotEmail: false,
        doNotCall: false,
        doNotTrack: false
      });
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
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
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                <Plus size={16} />
                Quick Add Lead
              </button>
              <button className="btn-secondary" onClick={() => setShowModal(true)}>
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
          <button className="btn-floating-quick" title="Quick Add Lead" onClick={() => setShowModal(true)}>
            <Plus size={20} />
            <span className="floating-text">Quick Add Leads</span>
          </button>
          <button className="btn-floating-new" title="Add New Lead" onClick={() => setShowModal(true)}>
            <Plus size={20} />
            <span className="floating-text">Add New Leads</span>
          </button>
        </div>
      )}

      {/* Modal Overlay and Form */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Lead</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-tabs">
              <button className="modal-tab active">Lead Details</button>
              <button className="modal-tab">Additional Details</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-section">
                <h3>Lead Details - Fields</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="phone-input">
                      <span className="phone-prefix">+</span>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className={errors.phoneNumber ? 'error' : ''}
                      />
                    </div>
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="Enter website"
                    />
                  </div>
                </div>

                <div className="form-checkboxes">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="doNotSMS"
                      name="doNotSMS"
                      checked={formData.doNotSMS}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="doNotSMS">Do Not SMS</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="doNotTrack"
                      name="doNotTrack"
                      checked={formData.doNotTrack}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="doNotTrack">Do Not Track</label>
                  </div>
                </div>

                <div className="form-checkboxes">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="doNotEmail"
                      name="doNotEmail"
                      checked={formData.doNotEmail}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="doNotEmail">Do Not Email</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="doNotCall"
                      name="doNotCall"
                      checked={formData.doNotCall}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="doNotCall">Do Not Call</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="leadSource">Lead Source</label>
                    <select
                      id="leadSource"
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sourceCampaign">Source Campaign</label>
                    <input
                      type="text"
                      id="sourceCampaign"
                      name="sourceCampaign"
                      placeholder="Enter source campaign"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save & Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartViews;
