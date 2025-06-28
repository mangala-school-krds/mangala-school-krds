// src/components/Result.js
import React, { useState } from 'react';
import './PageStyles.css';

const Result = () => {
  const [searchData, setSearchData] = useState({
    examType: '',
    rollNumber: '',
    studentName: ''
  });

  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock result data
      setSearchResult({
        studentName: searchData.studentName || 'John Doe',
        rollNumber: searchData.rollNumber,
        className: 'Class X',
        section: 'A',
        examType: searchData.examType,
        subjects: [
          { name: 'Mathematics', marks: 85, grade: 'A' },
          { name: 'Science', marks: 92, grade: 'A+' },
          { name: 'English', marks: 78, grade: 'B+' },
          { name: 'Social Studies', marks: 88, grade: 'A' },
          { name: 'Hindi', marks: 82, grade: 'A' }
        ],
        totalMarks: 425,
        percentage: 85.0,
        grade: 'A',
        result: 'PASS'
      });
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Examination Results</h1>
      </div>
      <div className="page-content">
        <section className="result-search">
          <h2>Search Your Result</h2>
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label>Examination Type *</label>
                <select
                  name="examType"
                  value={searchData.examType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Exam Type</option>
                  <option value="first-term">First Term Exam</option>
                  <option value="second-term">Second Term Exam</option>
                  <option value="annual">Annual Exam</option>
                  <option value="board">Board Exam</option>
                </select>
              </div>
              <div className="form-group">
                <label>Roll Number *</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={searchData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={searchData.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={searching}>
              {searching ? 'Searching...' : 'Search Result'}
            </button>
          </form>
        </section>

        {searchResult && (
          <section className="result-display">
            <div className="result-header">
              <h2>Examination Result</h2>
              <div className="result-info">
                <p><strong>Student Name:</strong> {searchResult.studentName}</p>
                <p><strong>Roll Number:</strong> {searchResult.rollNumber}</p>
                <p><strong>Class:</strong> {searchResult.className} - {searchResult.section}</p>
                <p><strong>Examination:</strong> {searchResult.examType}</p>
              </div>
            </div>

            <div className="marks-table">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.name}</td>
                      <td>{subject.marks}/100</td>
                      <td>{subject.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="result-summary">
              <div className="summary-item">
                <h3>Total Marks</h3>
                <p>{searchResult.totalMarks}/500</p>
              </div>
              <div className="summary-item">
                <h3>Percentage</h3>
                <p>{searchResult.percentage}%</p>
              </div>
              <div className="summary-item">
                <h3>Grade</h3>
                <p>{searchResult.grade}</p>
              </div>
              <div className="summary-item">
                <h3>Result</h3>
                <p className={`result-status ${searchResult.result.toLowerCase()}`}>
                  {searchResult.result}
                </p>
              </div>
            </div>

            <div className="result-actions">
              <button className="btn-primary">Download Result</button>
              <button className="btn-secondary">Print Result</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Result;