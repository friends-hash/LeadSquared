import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import "./addNewLead.css";

function AddNewLead({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("lead-details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    website: "",
    doNotSMS: false,
    doNotTrack: false,
    doNotEmail: false,
    doNotCall: false,
    leadSource: "Select",
    sourceCampaign: "",
    leadStatus: "Select",
    industry: "Select",
    leadRating: "Select",
    assignedTo: "Select",
    createdDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^[0-9\-\+\(\)\s]{10,}$/;
    return regex.test(phone) || phone === "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    if (formData.leadSource === "Select") {
      newErrors.leadSource = "Please select a lead source";
    }
    if (formData.leadStatus === "Select") {
      newErrors.leadStatus = "Please select a lead status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const newErrors = { ...errors };
    if (name === "firstName" && !formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (name === "lastName" && !formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (name === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    } else if (name === "phoneNumber" && formData.phoneNumber) {
      if (!validatePhoneNumber(formData.phoneNumber)) {
        newErrors.phoneNumber = "Invalid phone number format";
      } else {
        delete newErrors.phoneNumber;
      }
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Lead added successfully!");
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      website: "",
      doNotSMS: false,
      doNotTrack: false,
      doNotEmail: false,
      doNotCall: false,
      leadSource: "Select",
      sourceCampaign: "",
      leadStatus: "Select",
      industry: "Select",
      leadRating: "Select",
      assignedTo: "Select",
      createdDate: "",
      description: "",
    });
    setErrors({});
    setTouched({});
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container large-modal">
        <div className="modal-header">
          <h2>Add New Lead</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-tabs">
          <div
            className={`modal-tab ${activeTab === "lead-details" ? "active" : ""}`}
            onClick={() => setActiveTab("lead-details")}
          >
            Lead Details
          </div>
          <div
            className={`modal-tab ${activeTab === "additional-details" ? "active" : ""}`}
            onClick={() => setActiveTab("additional-details")}
          >
            Additional Details
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Lead Details Tab */}
          {activeTab === "lead-details" && (
            <div className="tab-content">
              <div className="form-section">
                <div className="section-header">
                  <h3>Lead Details: Fields</h3>
                </div>

                <div className="form-grid">
                  {/* First Name */}
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.firstName && touched.firstName ? "error" : ""}`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && touched.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.lastName && touched.lastName ? "error" : ""}`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && touched.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.email && touched.email ? "error" : ""}`}
                      placeholder="Enter email"
                    />
                    {errors.email && touched.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="phone-input-wrapper">
                      <span className="phone-prefix">+</span>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`form-input phone-input ${errors.phoneNumber && touched.phoneNumber ? "error" : ""}`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <span className="error-message">{errors.phoneNumber}</span>
                    )}
                  </div>

                  {/* Company */}
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter company name"
                    />
                  </div>

                  {/* Website */}
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter website"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="checkbox-grid">
                  <div className="checkbox-group">
                    <label htmlFor="doNotSMS">
                      <input
                        type="checkbox"
                        id="doNotSMS"
                        name="doNotSMS"
                        checked={formData.doNotSMS}
                        onChange={handleInputChange}
                      />
                      <span>Do Not SMS</span>
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <label htmlFor="doNotTrack">
                      <input
                        type="checkbox"
                        id="doNotTrack"
                        name="doNotTrack"
                        checked={formData.doNotTrack}
                        onChange={handleInputChange}
                      />
                      <span>Do Not Track</span>
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <label htmlFor="doNotEmail">
                      <input
                        type="checkbox"
                        id="doNotEmail"
                        name="doNotEmail"
                        checked={formData.doNotEmail}
                        onChange={handleInputChange}
                      />
                      <span>Do Not Email</span>
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <label htmlFor="doNotCall">
                      <input
                        type="checkbox"
                        id="doNotCall"
                        name="doNotCall"
                        checked={formData.doNotCall}
                        onChange={handleInputChange}
                      />
                      <span>Do Not Call</span>
                    </label>
                  </div>
                </div>

                <div className="form-grid">
                  {/* Lead Source */}
                  <div className="form-group">
                    <label htmlFor="leadSource">Lead Source</label>
                    <select
                      id="leadSource"
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.leadSource && touched.leadSource ? "error" : ""}`}
                    >
                      <option value="Select">Select</option>
                      <option value="website">Website</option>
                      <option value="email">Email</option>
                      <option value="referral">Referral</option>
                      <option value="social-media">Social Media</option>
                      <option value="event">Event</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.leadSource && touched.leadSource && (
                      <span className="error-message">{errors.leadSource}</span>
                    )}
                  </div>

                  {/* Source Campaign */}
                  <div className="form-group">
                    <label htmlFor="sourceCampaign">Source Campaign</label>
                    <input
                      type="text"
                      id="sourceCampaign"
                      name="sourceCampaign"
                      value={formData.sourceCampaign}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter source campaign"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Details Tab */}
          {activeTab === "additional-details" && (
            <div className="tab-content">
              <div className="form-section">
                <div className="section-header">
                  <h3>Additional Information</h3>
                </div>

                <div className="form-grid">
                  {/* Lead Status */}
                  <div className="form-group">
                    <label htmlFor="leadStatus">Lead Status</label>
                    <select
                      id="leadStatus"
                      name="leadStatus"
                      value={formData.leadStatus}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.leadStatus && touched.leadStatus ? "error" : ""}`}
                    >
                      <option value="Select">Select</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                    {errors.leadStatus && touched.leadStatus && (
                      <span className="error-message">{errors.leadStatus}</span>
                    )}
                  </div>

                  {/* Industry */}
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Select">Select</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Lead Rating */}
                  <div className="form-group">
                    <label htmlFor="leadRating">Lead Rating</label>
                    <select
                      id="leadRating"
                      name="leadRating"
                      value={formData.leadRating}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Select">Select</option>
                      <option value="hot">Hot</option>
                      <option value="warm">Warm</option>
                      <option value="cold">Cold</option>
                    </select>
                  </div>

                  {/* Assigned To */}
                  <div className="form-group">
                    <label htmlFor="assignedTo">Assigned To</label>
                    <select
                      id="assignedTo"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Select">Select</option>
                      <option value="self">Self</option>
                      <option value="team-member-1">Team Member 1</option>
                      <option value="team-member-2">Team Member 2</option>
                    </select>
                  </div>

                  {/* Created Date */}
                  <div className="form-group">
                    <label htmlFor="createdDate">Created Date</label>
                    <input
                      type="date"
                      id="createdDate"
                      name="createdDate"
                      value={formData.createdDate}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-group full-width">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="form-input textarea-input"
                    placeholder="Add lead notes or description"
                  ></textarea>
                  <div className="textarea-counter">
                    Content Size: {formData.description.length} / 5000
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleReset}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save & Create Lead
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewLead;
