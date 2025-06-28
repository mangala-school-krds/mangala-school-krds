// // src/components/TransferCertificate.js
// import React, { useState } from 'react';
// import './PageStyles.css';

// const TransferCertificate = () => {
//   const [formData, setFormData] = useState({
//     studentName: '',
//     fatherName: '',
//     motherName: '',
//     dateOfBirth: '',
//     class: '',
//     section: '',
//     admissionNumber: '',
//     reason: '',
//     contactNumber: '',
//     email: ''
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the data to your backend
//     console.log('Transfer Certificate Request:', formData);
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="page-container">
//         <div className="success-message">
//           <h2>Request Submitted Successfully!</h2>
//           <p>Your transfer certificate request has been submitted. You will receive an email confirmation shortly.</p>
//           <p>Processing time: 5-7 working days</p>
//           <button onClick={() => setSubmitted(false)} className="btn-primary">
//             Submit Another Request
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1>Transfer Certificate</h1>
//       </div>
//       <div className="page-content">
//         <section className="tc-info">
//           <h2>Transfer Certificate Information</h2>
//           <p>
//             Students who wish to obtain a Transfer Certificate must submit this form along with the required documents. 
//             Please ensure all information is accurate and complete.
//           </p>
          
//           <div className="requirements">
//             <h3>Required Documents:</h3>
//             <ul>
//               <li>Original Fee Receipt</li>
//               <li>Library Clearance Certificate</li>
//               <li>School Identity Card</li>
//               <li>Any borrowed school property</li>
//             </ul>
//           </div>
//         </section>

//         <section className="tc-form">
//           <h2>Transfer Certificate Request Form</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Student Name *</label>
//                 <input
//                   type="text"
//                   name="studentName"
//                   value={formData.studentName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Father's Name *</label>
//                 <input
//                   type="text"
//                   name="fatherName"
//                   value={formData.fatherName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Mother's Name *</label>
//                 <input
//                   type="text"
//                   name="motherName"
//                   value={formData.motherName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date of Birth *</label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Class *</label>
//                 <select
//                   name="class"
//                   value={formData.class}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Class</option>
//                   <option value="1">Class 1</option>
//                   <option value="2">Class 2</option>
//                   <option value="3">Class 3</option>
//                   <option value="4">Class 4</option>
//                   <option value="5">Class 5</option>
//                   <option value="6">Class 6</option>
//                   <option value="7">Class 7</option>
//                   <option value="8">Class 8</option>
//                   <option value="9">Class 9</option>
//                   <option value="10">Class 10</option>
//                   <option value="11">Class 11</option>
//                   <option value="12">Class 12</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Section *</label>
//                 <input
//                   type="text"
//                   name="section"
//                   value={formData.section}
//                   onChange={handleChange}
//                   placeholder="e.g., A, B, C"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Admission Number *</label>
//                 <input
//                   type="text"
//                   name="admissionNumber"
//                   value={formData.admissionNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Contact Number *</label>
//                 <input
//                   type="tel"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Email Address *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Reason for Transfer *</label>
//               <textarea
//                 name="reason"
//                 value={formData.reason}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Please provide the reason for requesting transfer certificate"
//                 required
//               ></textarea>
//             </div>

//             <button type="submit" className="btn-primary">Submit Request</button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TransferCertificate;

// src/components/TransferCertificate.js
import React, { useState } from 'react';

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
    console.log('Transfer Certificate Request:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-green-100 p-8 rounded-xl shadow-md max-w-xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Request Submitted Successfully!</h2>
          <p className="text-gray-700 mb-2">Your transfer certificate request has been submitted. You will receive an email confirmation shortly.</p>
          <p className="text-gray-600 mb-4">Processing time: 5–7 working days</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Transfer Certificate</h1>
        </div>

        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transfer Certificate Information</h2>
          <p className="text-gray-700 mb-4">
            Students who wish to obtain a Transfer Certificate must submit this form along with the required documents. Please ensure all information is accurate and complete.
          </p>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Required Documents:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Original Fee Receipt</li>
              <li>Library Clearance Certificate</li>
              <li>School Identity Card</li>
              <li>Any borrowed school property</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transfer Certificate Request Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Class *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Class {i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Section *</label>
                <input
                  type="text"
                  name="section"
                  placeholder="e.g., A, B, C"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Admission Number *</label>
                <input
                  type="text"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Reason for Transfer *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                placeholder="Please provide the reason for requesting transfer certificate"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Submit Request
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TransferCertificate;
