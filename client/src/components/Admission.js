// src/components/Admission.js
import React from 'react';
import './PageStyles.css';

const Admission = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admissions</h1>
      </div>
      <div className="page-content">
        <section className="admission-info">
          <h2>Admission Process</h2>
          <p>We welcome new students throughout the academic year, subject to availability of seats.</p>
          
          <h3>Required Documents:</h3>
          <ul>
            <li>Birth Certificate</li>
            <li>Transfer Certificate (if applicable)</li>
            <li>Previous year's report card</li>
            <li>Passport size photographs</li>
            <li>Address proof</li>
          </ul>

          <h3>Admission Fees:</h3>
          <div className="fee-table">
            <table>
              <thead>
                <tr><th>Class</th><th>Admission Fee</th><th>Monthly Fee</th></tr>
              </thead>
              <tbody>
                <tr><td>Pre-KG to Class 2</td><td>₹5,000</td><td>₹2,500</td></tr>
                <tr><td>Class 3 to Class 5</td><td>₹6,000</td><td>₹3,000</td></tr>
                <tr><td>Class 6 to Class 8</td><td>₹7,000</td><td>₹3,500</td></tr>
                <tr><td>Class 9 to Class 12</td><td>₹8,000</td><td>₹4,000</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admission;