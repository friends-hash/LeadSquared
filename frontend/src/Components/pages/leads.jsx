import React from "react";
import "./smartview.css";
import { Search, Filter, ChevronDown, Plus, MoreVertical, Phone, Mail, Calendar, User } from "lucide-react";
import QuickAddLead from "./quickAddLead";
import AddNewLead from "./addNewLead";
import LeadDetails from "./leadDetails";

function Leads() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isQuickAddOpen, setIsQuickAddOpen] = React.useState(false);
  const [isAddNewOpen, setIsAddNewOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState(null);
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("My New Leads");

  // Sample leads data with flags to illustrate filtering
  const sampleLeads = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phoneNumber: "1234567890",
      company: "Tech Corp",
      website: "www.techcorp.com",
      leadSource: "Website",
      leadStatus: "New",
      leadRating: "Hot",
      industry: "Technology",
      assignedTo: "Self",
      createdDate: "2024-03-01",
      description: "Interested in our premium services",
      doNotEmail: false,
      doNotCall: false,
      doNotSMS: false,
      doNotTrack: false,
      hasPendingTasks: false
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@email.com",
      phoneNumber: "9876543210",
      company: "Marketing Inc",
      website: "www.marketinginc.com",
      leadSource: "Referral",
      leadStatus: "Contacted",
      leadRating: "Warm",
      industry: "Marketing",
      assignedTo: "Team Member 1",
      createdDate: "2024-02-28",
      description: "Follow up needed for product demo",
      doNotEmail: false,
      doNotCall: false,
      doNotSMS: true,
      doNotTrack: false,
      hasPendingTasks: true
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Davis",
      email: "mike.davis@company.com",
      phoneNumber: "5556667777",
      company: "Davis Enterprises",
      website: "www.davisent.com",
      leadSource: "Event",
      leadStatus: "Qualified",
      leadRating: "Hot",
      industry: "Finance",
      assignedTo: "Self",
      createdDate: "2024-02-25",
      description: "High priority lead from conference",
      doNotEmail: false,
      doNotCall: false,
      doNotSMS: false,
      doNotTrack: false,
      hasPendingTasks: true
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@startup.com",
      phoneNumber: "4445556666",
      company: "Tech Startup",
      website: "www.techstartup.com",
      leadSource: "LinkedIn",
      leadStatus: "Converted",
      leadRating: "Warm",
      industry: "Technology",
      assignedTo: "Self",
      createdDate: "2024-03-02",
      description: "New lead from LinkedIn campaign",
      doNotEmail: false,
      doNotCall: false,
      doNotSMS: false,
      doNotTrack: false,
      hasPendingTasks: false
    }
  ];

  const filteredLeads = sampleLeads
    .filter(lead => {
      // filter by active tab first
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
          // show leads that have pending tasks for now
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

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setIsLeadDetailsOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return '#10b981';
      case 'contacted': return '#f59e0b';
      case 'qualified': return '#3b82f6';
      case 'converted': return '#8b5cf6';
      case 'lost': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="smartview-container">
      {/* Header */}
      <div className="smartview-header">
        <h2>My Engaged Leads</h2>
      </div>

      {/* Search and Filter Bar */}
      <div className="smartview-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search leads"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Plus size={16} />
          Filter
        </button>
        <button className="sort-btn">
          Last Activity
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="smartview-tabs">
        {['My New Leads','My Leads with Pending Tasks','My Engaged Leads','My Customers','My Tasks'].map(tab => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Leads List */}
      <div className="leads-list">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="lead-card" onClick={() => handleLeadClick(lead)}>
            <div className="lead-card-header">
              <div className="lead-info">
                <h3 className="lead-name">{lead.firstName} {lead.lastName}</h3>
                <p className="lead-company">{lead.company}</p>
              </div>
              <div className="lead-status-badge" style={{ backgroundColor: getStatusColor(lead.leadStatus) }}>
                {lead.leadStatus}
              </div>
            </div>

            <div className="lead-card-body">
              <div className="lead-contact">
                <div className="contact-item">
                  <Mail size={14} />
                  <span>{lead.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={14} />
                  <span>+{lead.phoneNumber}</span>
                </div>
              </div>

              <div className="lead-meta">
                <div className="meta-item">
                  <User size={14} />
                  <span>{lead.assignedTo}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{formatDate(lead.createdDate)}</span>
                </div>
              </div>
            </div>

            <div className="lead-card-actions">
              <button className="action-btn">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Buttons */}
      <div className="floating-add-buttons">
        <button className="btn-outline" onClick={() => setIsQuickAddOpen(true)}>
          Quick Add Lead
        </button>
        <button className="btn-primary" onClick={() => setIsAddNewOpen(true)}>
          <Plus size={16} />
          Add New Lead
        </button>
      </div>

      {/* Modals */}
      <QuickAddLead isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />
      <AddNewLead isOpen={isAddNewOpen} onClose={() => setIsAddNewOpen(false)} />
      <LeadDetails
        isOpen={isLeadDetailsOpen}
        onClose={() => setIsLeadDetailsOpen(false)}
        leadData={selectedLead}
      />
    </div>
  );
}

export default Leads;
