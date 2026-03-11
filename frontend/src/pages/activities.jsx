import React from "react";
import "./activities.css";
import { Search, Filter, ChevronDown, Plus, X, ArrowLeft } from "lucide-react";

function Activities({ onNavigate }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedActivity, setSelectedActivity] = React.useState("Document Generation");
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [pinnedItems, setPinnedItems] = React.useState([]);
  const [formData, setFormData] = React.useState({
    activityType: "",
    description: "",
    dueDate: "",
    assignedTo: ""
  });
  const [errors, setErrors] = React.useState({});

  const originalActivityTypes = [
    "Document Generation",
    "Inbound Phone Call Activity",
    "Lead Shared Through Agent Popup",
    "Opportunity Shared Through Agent Popup",
    "Outbound Phone Call Activity",
    "Payment",
    "Sales Activity",
    "Sales Activity - Cancalled"
  ];

  const activityTypes = [
    { category: "Pinned Activity Types", items: pinnedItems, count: pinnedItems.length },
    {
      category: "Other Activity Types",
      items: originalActivityTypes.filter(item => !pinnedItems.includes(item)),
      count: originalActivityTypes.filter(item => !pinnedItems.includes(item)).length
    }
  ];

  const filteredActivityTypes = activityTypes.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const validate = () => {
    const errs = {};
    if (!formData.activityType.trim()) errs.activityType = "Activity Type is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.dueDate) errs.dueDate = "Due Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = () => {
    if (validate()) {
      // Submit activity
      setShowAddModal(false);
      setFormData({ activityType: "", description: "", dueDate: "", assignedTo: "" });
      setErrors({});
    }
  };

  return (
    <div className="activities-container">
      {/* Header */}
      <div className="activities-header">
        <div className="header-content">
          {onNavigate && (
            <button className="back-arrow-btn" onClick={() => onNavigate('smart-views')} title="Go back">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1>Activities</h1>
            <p>Manage your activity types and records</p>
          </div>
        </div>
      </div>

      <div className="activities-layout">
        {/* Left Sidebar */}
        <div className="activities-sidebar">
          <div className="activity-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Activity Types Groups */}
          {/* Pinned Activity Types - always show */}
          <div className="activity-group">
            <h3 className="group-title">
              Pinned Activity Types <span className="count">{pinnedItems.length}</span>
            </h3>
            <ul className="activity-list">
              {pinnedItems.length > 0 ? (
                pinnedItems.map((item, idx) => (
                  <li
                    key={idx}
                    className={selectedActivity === item ? "active" : ""}
                    onClick={() => setSelectedActivity(item)}
                  >
                    <span className="activity-icon">📋</span>
                    <span className="activity-name">{item}</span>
                    <button
                      className="pin-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinActivity(item);
                      }}
                      title="Unpin"
                    >
                      📌
                    </button>
                  </li>
                ))
              ) : (
                <li className="empty-pinned">
                  <span className="activity-icon">📌</span>
                  <span className="activity-name">No pinned activities</span>
                </li>
              )}
            </ul>
          </div>

          {/* Other Activity Types */}
          {filteredActivityTypes[1] && filteredActivityTypes[1].items.length > 0 && (
            <div className="activity-group">
              <h3 className="group-title">
                {filteredActivityTypes[1].category} <span className="count">{filteredActivityTypes[1].items.length}</span>
              </h3>
              <ul className="activity-list">
                {filteredActivityTypes[1].items.map((item, idx) => (
                  <li
                    key={idx}
                    className={selectedActivity === item ? "active" : ""}
                    onClick={() => setSelectedActivity(item)}
                  >
                    <span className="activity-icon">📋</span>
                    <span className="activity-name">{item}</span>
                    <button
                      className="pin-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinActivity(item);
                      }}
                      title="Pin"
                    >
                      📌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="activities-main">
          <div className="activity-header">
            <h2>{selectedActivity}</h2>
          </div>

          <div className="activity-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search here" />
            </div>
            <button className="filter-btn">
              <Plus size={16} />
              <span>Filter</span>
            </button>
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <Plus size={16} />
              <span>Add New Lead</span>
            </button>
          </div>

          {/* Empty State */}
          <div className="activity-empty">
            <div className="empty-icon">📦</div>
            <h3>No records added yet!</h3>
            <button className="primary-btn" onClick={() => setShowAddModal(true)}>
              Add New Lead
            </button>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Activity</h2>
              <X size={18} className="close-icon" onClick={() => setShowAddModal(false)} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Activity Type *</label>
                <input
                  type="text"
                  name="activityType"
                  placeholder="Select activity type"
                  value={formData.activityType}
                  onChange={handleInputChange}
                />
                {errors.activityType && <div className="error">{errors.activityType}</div>}
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  placeholder="Enter activity description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                />
                {errors.description && <div className="error">{errors.description}</div>}
              </div>
              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
                {errors.dueDate && <div className="error">{errors.dueDate}</div>}
              </div>
              <div className="form-group">
                <label>Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  placeholder="Assign to user"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="primary-btn" onClick={handleAddActivity}>
                Save Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
