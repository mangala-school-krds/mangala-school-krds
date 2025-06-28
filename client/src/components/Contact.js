// src/components/Contact.js
import React, { useState } from 'react';
import './PageStyles.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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
    console.log('Contact Form:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <div className="success-message">
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for contacting us. We will get back to you within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>
      <div className="page-content">
        <div className="contact-container">
          <section className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-details">
              <div className="contact-item">
                <h3>📍 Address</h3>
                <p>123 School Street<br />Education City, State 123456<br />India</p>
              </div>
              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p>+91 12345 67890<br />+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <h3>✉️ Email</h3>
                <p>info@schoolname.edu<br />admissions@schoolname.edu</p>
              </div>
              <div className="contact-item">
                <h3>🕒 Office Hours</h3>
                <p>Monday - Friday: 8:00 AM - 4:00 PM<br />Saturday: 9:00 AM - 1:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </section>

          <section className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="academic">Academic Information</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter your message here..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;