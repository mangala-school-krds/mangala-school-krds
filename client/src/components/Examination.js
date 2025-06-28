// src/components/Examination.js
import React from 'react';
import './PageStyles.css';

const Examination = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Examination</h1>
      </div>
      <div className="page-content">
        <section className="exam-info">
          <h2>Examination Schedule</h2>
          <div className="exam-table">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Class X</td>
                  <td>Mathematics</td>
                  <td>15th March 2024</td>
                  <td>10:00 AM - 1:00 PM</td>
                </tr>
                <tr>
                  <td>Class X</td>
                  <td>Science</td>
                  <td>18th March 2024</td>
                  <td>10:00 AM - 1:00 PM</td>
                </tr>
                <tr>
                  <td>Class XII</td>
                  <td>Physics</td>
                  <td>20th March 2024</td>
                  <td>10:00 AM - 1:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="exam-rules">
          <h2>Examination Rules</h2>
          <ul>
            <li>Students must reach the examination hall 30 minutes before the exam</li>
            <li>Carry valid ID card and admit card</li>
            <li>Mobile phones and electronic devices are strictly prohibited</li>
            <li>Use only blue or black pen for writing</li>
            <li>No student will be allowed to leave before 1 hour of examination</li>
          </ul>
        </section>

        <section className="exam-results">
          <h2>Results</h2>
          <p>Examination results will be published on our website within 15 days of completion of exams.</p>
          <button className="btn-primary">Check Results</button>
        </section>
      </div>
    </div>
  );
};

export default Examination;