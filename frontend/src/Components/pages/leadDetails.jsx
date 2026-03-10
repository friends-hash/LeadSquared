import React, { useState } from "react";
import { X, Edit, Phone, Mail, Globe, Calendar, User, Building, Tag, MessageSquare } from "lucide-react";
import "./leadDetails.css";

function LeadDetails({ isOpen, onClose, leadData }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen || !leadData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const getRatingColor = (rating) => {
    switch (rating?.toLowerCase()) {
      case 'hot': return '#ef4444';
      case 'warm': return '#f59e0b';
      case 'cold': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container large-modal">
        <div className="modal-header">
          <div className="lead-header-info">
            <div className="lead-avatar">
              <User size={32} />
            </div>
            <div className="lead-basic-info">
              <h2>{leadData.firstName} {leadData.lastName}</h2>
              <div className="lead-meta">
                <span className="lead-status" style={{ backgroundColor: getStatusColor(leadData.leadStatus) }}>
                  {leadData.leadStatus || 'New'}
                </span>
                <span className="lead-rating" style={{ color: getRatingColor(leadData.leadRating) }}>
                  {leadData.leadRating || 'Not rated'}
                </span>
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-edit">
              <Edit size={16} />
              Edit
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="modal-tabs">
          <div
            className={`modal-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </div>
          <div
            className={`modal-tab ${activeTab === "activities" ? "active" : ""}`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </div>
          <div
            className={`modal-tab ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </div>
        </div>

        <div className="modal-content">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-content">
              <div className="overview-grid">
                {/* Contact Information */}
                <div className="info-section">
                  <h3>Contact Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <Mail size={16} />
                      <div>
                        <label>Email</label>
                        <span>{leadData.email || 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <Phone size={16} />
                      <div>
                        <label>Phone</label>
                        <span>{leadData.phoneNumber ? `+${leadData.phoneNumber}` : 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <Globe size={16} />
                      <div>
                        <label>Website</label>
                        <span>{leadData.website || 'Not provided'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <Building size={16} />
                      <div>
                        <label>Company</label>
                        <span>{leadData.company || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Information */}
                <div className="info-section">
                  <h3>Lead Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <Tag size={16} />
                      <div>
                        <label>Lead Source</label>
                        <span>{leadData.leadSource || 'Not specified'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <Calendar size={16} />
                      <div>
                        <label>Created Date</label>
                        <span>{formatDate(leadData.createdDate)}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <User size={16} />
                      <div>
                        <label>Assigned To</label>
                        <span>{leadData.assignedTo || 'Not assigned'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <Tag size={16} />
                      <div>
                        <label>Industry</label>
                        <span>{leadData.industry || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="info-section">
                  <h3>Communication Preferences</h3>
                  <div className="preferences-grid">
                    <div className={`preference-item ${leadData.doNotEmail ? 'disabled' : 'enabled'}`}>
                      <span>Email</span>
                      <span>{leadData.doNotEmail ? 'Disabled' : 'Enabled'}</span>
                    </div>
                    <div className={`preference-item ${leadData.doNotCall ? 'disabled' : 'enabled'}`}>
                      <span>Phone</span>
                      <span>{leadData.doNotCall ? 'Disabled' : 'Enabled'}</span>
                    </div>
                    <div className={`preference-item ${leadData.doNotSMS ? 'disabled' : 'enabled'}`}>
                      <span>SMS</span>
                      <span>{leadData.doNotSMS ? 'Disabled' : 'Enabled'}</span>
                    </div>
                    <div className={`preference-item ${leadData.doNotTrack ? 'disabled' : 'enabled'}`}>
                      <span>Tracking</span>
                      <span>{leadData.doNotTrack ? 'Disabled' : 'Enabled'}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {leadData.description && (
                  <div className="info-section full-width">
                    <h3>Description</h3>
                    <div className="description-content">
                      {leadData.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="tab-content">
              <div className="empty-state-section">
                <MessageSquare size={48} />
                <h3>No activities yet</h3>
                <p>Activities and interactions will appear here</p>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="tab-content">
              <div className="empty-state-section">
                <MessageSquare size={48} />
                <h3>No notes added</h3>
                <p>Notes and comments will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LeadDetails;
