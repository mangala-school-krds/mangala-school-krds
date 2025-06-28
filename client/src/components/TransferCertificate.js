// src/components/TransferCertificate.js
import React, { useState } from 'react';
import './PageStyles.css';

const TransferCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    class: '',
    section: '',
    admissionNumber: '',
    reason: '',
    contactNumber: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Transfer Certificate Request:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <div className="success-message">
          <h2>Request Submitted Successfully!</h2>
          <p>Your transfer certificate request has been submitted. You will receive an email confirmation shortly.</p>
          <p>Processing time: 5-7 working days</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Transfer Certificate</h1>
      </div>
      <div className="page-content">
        <section className="tc-info">
          <h2>Transfer Certificate Information</h2>
          <p>
            Students who wish to obtain a Transfer Certificate must submit this form along with the required documents. 
            Please ensure all information is accurate and complete.
          </p>
          
          <div className="requirements">
            <h3>Required Documents:</h3>
            <ul>
              <li>Original Fee Receipt</li>
              <li>Library Clearance Certificate</li>
              <li>School Identity Card</li>
              <li>Any borrowed school property</li>
            </ul>
          </div>
        </section>

        <section className="tc-form">
          <h2>Transfer Certificate Request Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Class *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
              <div className="form-group">
                <label>Section *</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="e.g., A, B, C"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Admission Number *</label>
                <input
                  type="text"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reason for Transfer *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                placeholder="Please provide the reason for requesting transfer certificate"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">Submit Request</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TransferCertificate;