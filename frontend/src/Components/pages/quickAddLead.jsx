import React, { useState } from "react";
import { X } from "lucide-react";
import "./quickAddLead.css";

function QuickAddLead({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    website: "",
    leadSource: "Select",
    notes: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    // Validate on blur
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
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        website: "",
        leadSource: "Select",
        notes: "",
      });
      setErrors({});
      setTouched({});
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      website: "",
      leadSource: "Select",
      notes: "",
    });
    setErrors({});
    setTouched({});
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Quick Add Lead</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-tabs">
          <div className="modal-tab active">Quick Add Leads</div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
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
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form-input ${errors.phoneNumber && touched.phoneNumber ? "error" : ""}`}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
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
          </div>

          {/* Notes */}
          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              className="form-input textarea-input"
              placeholder="Add any additional notes"
            ></textarea>
            <div className="textarea-counter">
              Words: 0 | Content Size: {formData.notes.length} / 2000
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleReset}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save & Add Lead
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuickAddLead;
