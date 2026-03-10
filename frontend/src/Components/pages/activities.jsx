import React from "react";
import "./smartview.css";
import { Search, Filter, ChevronDown, Plus, Phone, Mail, Calendar, FileText } from "lucide-react";
import QuickAddLead from "./quickAddLead";
import AddNewLead from "./addNewLead";
import LeadDetails from "./leadDetails";

function Activities() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showQuickAdd, setShowQuickAdd] = React.useState(false);
  const [showAddNew, setShowAddNew] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState(null);

  // Sample leads data
  const sampleLeads = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      status: "New",
      source: "Website",
      value: "$5,000",
      lastActivity: "2 hours ago",
      avatar: "JS"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      company: "Design Studio",
      status: "Contacted",
      source: "LinkedIn",
      value: "$3,200",
      lastActivity: "1 day ago",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      phone: "+1 (555) 456-7890",
      company: "Marketing Inc",
      status: "Qualified",
      source: "Referral",
      value: "$8,500",
      lastActivity: "3 days ago",
      avatar: "MD"
    }
  ];

  const filteredLeads = sampleLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  const closeModals = () => {
    setShowQuickAdd(false);
    setShowAddNew(false);
    setSelectedLead(null);
  };

  return (
    <div className="smartview-container">
      {/* Header */}
      <div className="smartview-header">
        <h2>Activities</h2>
      </div>

      {/* Search and Filter Bar */}
      <div className="smartview-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search activities"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Plus size={16} />
          Filter
        </button>
        <button className="sort-btn">
          Last Updated
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="smartview-tabs">
        <div className="tab active">All Activities</div>
        <div className="tab">Calls</div>
        <div className="tab">Emails</div>
        <div className="tab">Meetings</div>
        <div className="tab">Notes</div>
      </div>

      {/* Leads List */}
      <div className="leads-list">
        {filteredLeads.map(lead => (
          <div key={lead.id} className="lead-card" onClick={() => handleLeadClick(lead)}>
            <div className="lead-card-header">
              <div className="lead-avatar">{lead.avatar}</div>
              <div className="lead-status">
                <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                  {lead.status}
                </span>
              </div>
            </div>
            <div className="lead-card-body">
              <div className="lead-info">
                <h3>{lead.name}</h3>
                <p className="lead-company">{lead.company}</p>
                <div className="lead-contact">
                  <div className="contact-item">
                    <Mail size={14} />
                    <span>{lead.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>{lead.phone}</span>
                  </div>
                </div>
              </div>
              <div className="lead-meta">
                <div className="meta-item">
                  <span className="meta-label">Value:</span>
                  <span className="meta-value">{lead.value}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Source:</span>
                  <span className="meta-value">{lead.source}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Last Activity:</span>
                  <span className="meta-value">{lead.lastActivity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Buttons */}
      <div className="floating-add-buttons">
        <button
          className="floating-btn quick-add-btn"
          onClick={() => setShowQuickAdd(true)}
          title="Quick Add Lead"
        >
          <Plus size={20} />
        </button>
        <button
          className="floating-btn add-new-btn"
          onClick={() => setShowAddNew(true)}
          title="Add New Lead"
        >
          <FileText size={20} />
        </button>
      </div>

      {/* Modals */}
      {showQuickAdd && (
        <QuickAddLead onClose={closeModals} />
      )}
      {showAddNew && (
        <AddNewLead onClose={closeModals} />
      )}
      {selectedLead && (
        <LeadDetails lead={selectedLead} onClose={closeModals} />
      )}
    </div>
  );
}

export default Activities;
