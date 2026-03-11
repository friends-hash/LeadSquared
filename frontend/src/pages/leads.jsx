import React from "react";
import "./leads.css";
import { Search, Filter, Plus, X, Bold, Italic, Underline, List, MoreHorizontal, Link2 } from "lucide-react";

function Leads() {
  const [showAddLeadModal, setShowAddLeadModal] = React.useState(false);
  const [showQuickAddModal, setShowQuickAddModal] = React.useState(false);
  const [activeModalTab, setActiveModalTab] = React.useState("Lead Details");
  const [errors, setErrors] = React.useState({});
  const [additionalDetailsErrors, setAdditionalDetailsErrors] = React.useState({});
  const [quickAddErrors, setQuickAddErrors] = React.useState({});

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

  const [additionalDetails, setAdditionalDetails] = React.useState({
    designation: "",
    industry: "",
    numberOfEmployees: "",
    annualRevenue: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    secondaryEmail: "",
    secondaryPhone: "",
    fax: "",
    linkedinUrl: "",
    notes: ""
  });

  const [quickAddData, setQuickAddData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    website: "",
    notes: "",
    leadSource: ""
  });

  // Validation functions (same logic as in smartviews.jsx)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.phoneNumber && !/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) newErrors.phoneNumber = "Phone number must be at least 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAdditionalDetails = () => {
    const newErrors = {};
    if (additionalDetails.secondaryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(additionalDetails.secondaryEmail)) newErrors.secondaryEmail = "Invalid secondary email format";
    if (additionalDetails.secondaryPhone && !/^\d{10,}$/.test(additionalDetails.secondaryPhone.replace(/\D/g, ''))) newErrors.secondaryPhone = "Secondary phone must be at least 10 digits";
    if (additionalDetails.zipCode && !/^\d+$/.test(additionalDetails.zipCode)) newErrors.zipCode = "Zip code must contain only numbers";
    if (additionalDetails.numberOfEmployees && !/^\d+$/.test(additionalDetails.numberOfEmployees)) newErrors.numberOfEmployees = "Number of employees must be a valid number";
    if (additionalDetails.annualRevenue && !/^\d+(\.\d{2})?$/.test(additionalDetails.annualRevenue)) newErrors.annualRevenue = "Annual revenue must be a valid number";
    setAdditionalDetailsErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleAdditionalDetailsChange = (e) => {
    const { name, value } = e.target;
    setAdditionalDetails(prev => ({ ...prev, [name]: value }));
    if (additionalDetailsErrors[name]) setAdditionalDetailsErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeModalTab === "Lead Details") {
      if (validateForm()) setActiveModalTab("Additional Details");
    } else {
      if (validateAdditionalDetails()) {
        console.log("Form submitted:", { formData, additionalDetails });
        setShowAddLeadModal(false);
        setActiveModalTab("Lead Details");
        setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "", company: "", website: "", leadSource: "", doNotSMS: false, doNotEmail: false, doNotCall: false, doNotTrack: false });
        setAdditionalDetails({ designation: "", industry: "", numberOfEmployees: "", annualRevenue: "", address: "", city: "", state: "", zipCode: "", country: "", secondaryEmail: "", secondaryPhone: "", fax: "", linkedinUrl: "", notes: "" });
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddLeadModal(false);
    setActiveModalTab("Lead Details");
    setErrors({});
    setAdditionalDetailsErrors({});
  };

  const validateQuickAddForm = () => {
    const newErrors = {};
    if (!quickAddData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!quickAddData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!quickAddData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quickAddData.email)) newErrors.email = "Invalid email format";
    if (quickAddData.phoneNumber && !/^\d{10,}$/.test(quickAddData.phoneNumber.replace(/\D/g, ''))) newErrors.phoneNumber = "Phone number must be at least 10 digits";
    setQuickAddErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickAddChange = (e) => {
    const { name, value } = e.target;
    setQuickAddData(prev => ({ ...prev, [name]: value }));
    if (quickAddErrors[name]) setQuickAddErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    if (validateQuickAddForm()) {
      console.log("Quick Add submitted:", quickAddData);
      setShowQuickAddModal(false);
      setQuickAddData({ firstName: "", lastName: "", email: "", phoneNumber: "", website: "", notes: "", leadSource: "" });
    }
  };

  const handleCloseQuickAddModal = () => {
    setShowQuickAddModal(false);
    setQuickAddErrors({});
  };

  return (
    <div className="leads-container">

      {/* Header */}
      <div className="leads-header">
        <h2>Manage Leads</h2>
      </div>

      {/* Toolbar */}
      <div className="leads-toolbar">

        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search here" />
        </div>

        <button className="filter-btn">
          <Filter size={16} />
          My Filters
        </button>

        <button className="add-filter-btn">
          + Filter
        </button>

      </div>

      {/* Empty State */}
      <div className="empty-state">

        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
          alt="empty"
        />

        <h3>No records added yet!</h3>

        <div className="empty-buttons">
          <button className="quick-btn" onClick={() => setShowQuickAddModal(true)}>Quick Add Lead</button>
          <button className="add-btn" onClick={() => setShowAddLeadModal(true)}>
            <Plus size={16} />
            Add New Lead
          </button>
        </div>

      </div>

      {/* Add New Lead Modal */}
      {showAddLeadModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Lead</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-tabs">
              <button 
                className={`modal-tab ${activeModalTab === "Lead Details" ? 'active' : ''}`}
                onClick={() => setActiveModalTab("Lead Details")}
              >
                Lead Details
              </button>
              <button 
                className={`modal-tab ${activeModalTab === "Additional Details" ? 'active' : ''}`}
                onClick={() => setActiveModalTab("Additional Details")}
              >
                Additional Details
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              {activeModalTab === "Lead Details" ? (
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
              ) : (
              <div className="form-section">
                <h3>Additional Details - Fields</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={additionalDetails.designation}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter designation"
                      className={additionalDetailsErrors.designation ? 'error' : ''}
                    />
                    {additionalDetailsErrors.designation && <span className="error-message">{additionalDetailsErrors.designation}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={additionalDetails.industry}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter industry"
                      className={additionalDetailsErrors.industry ? 'error' : ''}
                    />
                    {additionalDetailsErrors.industry && <span className="error-message">{additionalDetailsErrors.industry}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="numberOfEmployees">Number of Employees</label>
                    <input
                      type="text"
                      id="numberOfEmployees"
                      name="numberOfEmployees"
                      value={additionalDetails.numberOfEmployees}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter number of employees"
                      className={additionalDetailsErrors.numberOfEmployees ? 'error' : ''}
                    />
                    {additionalDetailsErrors.numberOfEmployees && <span className="error-message">{additionalDetailsErrors.numberOfEmployees}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="annualRevenue">Annual Revenue</label>
                    <input
                      type="text"
                      id="annualRevenue"
                      name="annualRevenue"
                      value={additionalDetails.annualRevenue}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter annual revenue"
                      className={additionalDetailsErrors.annualRevenue ? 'error' : ''}
                    />
                    {additionalDetailsErrors.annualRevenue && <span className="error-message">{additionalDetailsErrors.annualRevenue}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={additionalDetails.address}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={additionalDetails.city}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={additionalDetails.state}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={additionalDetails.zipCode}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter zip code"
                      className={additionalDetailsErrors.zipCode ? 'error' : ''}
                    />
                    {additionalDetailsErrors.zipCode && <span className="error-message">{additionalDetailsErrors.zipCode}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={additionalDetails.country}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter country"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="secondaryEmail">Secondary Email</label>
                    <input
                      type="email"
                      id="secondaryEmail"
                      name="secondaryEmail"
                      value={additionalDetails.secondaryEmail}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter secondary email"
                      className={additionalDetailsErrors.secondaryEmail ? 'error' : ''}
                    />
                    {additionalDetailsErrors.secondaryEmail && <span className="error-message">{additionalDetailsErrors.secondaryEmail}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="secondaryPhone">Secondary Phone</label>
                    <div className="phone-input">
                      <span className="phone-prefix">+</span>
                      <input
                        type="text"
                        id="secondaryPhone"
                        name="secondaryPhone"
                        value={additionalDetails.secondaryPhone}
                        onChange={handleAdditionalDetailsChange}
                        placeholder="Enter secondary phone"
                        className={additionalDetailsErrors.secondaryPhone ? 'error' : ''}
                      />
                    </div>
                    {additionalDetailsErrors.secondaryPhone && <span className="error-message">{additionalDetailsErrors.secondaryPhone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="fax">Fax</label>
                    <input
                      type="text"
                      id="fax"
                      name="fax"
                      value={additionalDetails.fax}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter fax number"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="linkedinUrl">LinkedIn URL</label>
                    <input
                      type="text"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={additionalDetails.linkedinUrl}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Enter LinkedIn URL"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={additionalDetails.notes}
                      onChange={handleAdditionalDetailsChange}
                      placeholder="Add additional notes about this lead..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              )}

              <div className="modal-footer">
                {activeModalTab === "Additional Details" && (
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setActiveModalTab("Lead Details")}
                  >
                    Back
                  </button>
                )}
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                {activeModalTab === "Lead Details" ? (
                  <button type="submit" className="btn-save">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn-save">
                    Save & Close
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Add Lead Modal */}
      {showQuickAddModal && (
        <div className="modal-overlay" onClick={handleCloseQuickAddModal}>
          <div className="modal-content quick-add-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Quick Add Lead</h2>
              <button className="modal-close" onClick={handleCloseQuickAddModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleQuickAddSubmit} className="modal-form">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quickFirstName">First Name</label>
                    <input
                      type="text"
                      id="quickFirstName"
                      name="firstName"
                      value={quickAddData.firstName}
                      onChange={handleQuickAddChange}
                      placeholder="Enter first name"
                      className={quickAddErrors.firstName ? 'error' : ''}
                    />
                    {quickAddErrors.firstName && <span className="error-message">{quickAddErrors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="quickLastName">Last Name</label>
                    <input
                      type="text"
                      id="quickLastName"
                      name="lastName"
                      value={quickAddData.lastName}
                      onChange={handleQuickAddChange}
                      placeholder="Enter last name"
                      className={quickAddErrors.lastName ? 'error' : ''}
                    />
                    {quickAddErrors.lastName && <span className="error-message">{quickAddErrors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quickEmail">Email</label>
                    <input
                      type="email"
                      id="quickEmail"
                      name="email"
                      value={quickAddData.email}
                      onChange={handleQuickAddChange}
                      placeholder="Enter email"
                      className={quickAddErrors.email ? 'error' : ''}
                    />
                    {quickAddErrors.email && <span className="error-message">{quickAddErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="quickPhoneNumber">Phone Number</label>
                    <div className="phone-input">
                      <span className="phone-prefix">+</span>
                      <input
                        type="text"
                        id="quickPhoneNumber"
                        name="phoneNumber"
                        value={quickAddData.phoneNumber}
                        onChange={handleQuickAddChange}
                        placeholder="Enter phone number"
                        className={quickAddErrors.phoneNumber ? 'error' : ''}
                      />
                    </div>
                    {quickAddErrors.phoneNumber && <span className="error-message">{quickAddErrors.phoneNumber}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quickWebsite">Website</label>
                    <input
                      type="text"
                      id="quickWebsite"
                      name="website"
                      value={quickAddData.website}
                      onChange={handleQuickAddChange}
                      placeholder="Enter website"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quickLeadSource">Lead Source</label>
                    <select
                      id="quickLeadSource"
                      name="leadSource"
                      value={quickAddData.leadSource}
                      onChange={handleQuickAddChange}
                    >
                      <option value="">Select</option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quickNotes">Notes</label>
                  <div className="notes-editor">
                    <div className="editor-toolbar">
                      <button type="button" className="toolbar-btn">
                        <Bold size={16} />
                      </button>
                      <button type="button" className="toolbar-btn">
                        <Italic size={16} />
                      </button>
                      <button type="button" className="toolbar-btn">
                        <Underline size={16} />
                      </button>
                      <button type="button" className="toolbar-btn">
                        <List size={16} />
                      </button>
                      <button type="button" className="toolbar-btn">
                        <Link2 size={16} />
                      </button>
                      <button type="button" className="toolbar-btn">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <textarea
                      id="quickNotes"
                      name="notes"
                      value={quickAddData.notes}
                      onChange={handleQuickAddChange}
                      placeholder="Add notes about this lead..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={handleCloseQuickAddModal}>
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

export default Leads;