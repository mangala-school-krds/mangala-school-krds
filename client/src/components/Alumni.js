// import React, { useState } from 'react';
// import axios from 'axios';
// import './Alumni.css';

// const Alumni = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     gender: '',
//     mobile: '',
//     email: '',
//     address: '',
//     periodOfStudy: '',
//     qualification: '',
//     occupation: '',
//     companyName: '',
//     companyAddress: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess(false);

//     try {
//       await axios.post('http://localhost:5000/api/alumni/register', formData);
//       setSuccess(true);
//       setFormData({
//         fullName: '',
//         gender: '',
//         mobile: '',
//         email: '',
//         address: '',
//         periodOfStudy: '',
//         qualification: '',
//         occupation: '',
//         companyName: '',
//         companyAddress: '',
//         message: ''
//       });
//     } catch (error) {
//       console.error('Error submitting alumni registration:', error);
//       if (error.code === 'ERR_NETWORK') {
//         setError('Cannot connect to server. Please make sure the backend is running.');
//       } else {
//         setError(error.response?.data?.message || 'Failed to submit registration. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="alumni-page">
//       <div className="page-header">
//         <h1>Alumni Registration</h1>
//         <p>Stay connected with your alma mater</p>
//       </div>

//       <div className="alumni-content">
//         <div className="alumni-intro">
//           <h2>Welcome Back, Alumni!</h2>
//           <p>
//             We are delighted to reconnect with our valued alumni. Your journey with us may have ended, 
//             but your connection to our school community continues. Please fill out the registration form 
//             below to stay updated with school news, events, and to connect with fellow alumni.
//           </p>
//           <p>
//             Your success stories inspire our current students and help us improve our educational programs. 
//             We look forward to hearing about your achievements and maintaining this lifelong bond.
//           </p>
//         </div>

//         <div className="registration-form-container">
//           <h2>Alumni Registration Form</h2>
          
//           {success && (
//             <div className="success-message">
//               <p>Thank you for registering! Your information has been submitted successfully.</p>
//             </div>
//           )}

//           {error && (
//             <div className="error-message">
//               <p>{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="alumni-form">
//             <div className="form-section">
//               <h3>Personal Information</h3>
              
//               <div className="form-group">
//                 <label htmlFor="fullName">Full Name *</label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="gender">Gender *</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="mobile">Mobile/WhatsApp No. *</label>
//                   <input
//                     type="tel"
//                     id="mobile"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your mobile number"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email Address *</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="address">Full Address *</label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   required
//                   rows="3"
//                   placeholder="Enter your complete address"
//                 />
//               </div>
//             </div>

//             <div className="form-section">
//               <h3>Educational Information</h3>
              
//               <div className="form-group">
//                 <label htmlFor="periodOfStudy">Period of Study *</label>
//                 <input
//                   type="text"
//                   id="periodOfStudy"
//                   name="periodOfStudy"
//                   value={formData.periodOfStudy}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="e.g., 2015-2020"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="qualification">Highest Qualification Obtained *</label>
//                 <input
//                   type="text"
//                   id="qualification"
//                   name="qualification"
//                   value={formData.qualification}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="e.g., 10th Standard, 12th Standard"
//                 />
//               </div>
//             </div>

//             <div className="form-section">
//               <h3>Professional Information</h3>
              
//               <div className="form-group">
//                 <label htmlFor="occupation">Current Occupation *</label>
//                 <input
//                   type="text"
//                   id="occupation"
//                   name="occupation"
//                   value={formData.occupation}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter your current occupation"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="companyName">Company/Organization Name</label>
//                 <input
//                   type="text"
//                   id="companyName"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   placeholder="Enter company name (optional)"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="companyAddress">Company Address</label>
//                 <textarea
//                   id="companyAddress"
//                   name="companyAddress"
//                   value={formData.companyAddress}
//                   onChange={handleInputChange}
//                   rows="3"
//                   placeholder="Enter company address (optional)"
//                 />
//               </div>
//             </div>

//             <div className="form-section">
//               <h3>Additional Information</h3>
              
//               <div className="form-group">
//                 <label htmlFor="message">Message/Feedback</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   rows="4"
//                   placeholder="Share your thoughts, memories, or feedback about the school"
//                 />
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="submit-btn">
//               {loading ? 'Submitting...' : 'Register as Alumni'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alumni;

// src/components/Alumni.js
import React, { useState } from 'react';
import './PageStyles.css';

const Alumni = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    periodOfStudy: '',
    qualification: '',
    occupation: '',
    companyName: '',
    companyAddress: '',
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
    console.log('Alumni Registration:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>Thank you for registering with our Alumni Network. We're excited to have you as part of our community!</p>
          <p>You will receive a confirmation email shortly with details about upcoming alumni events and networking opportunities.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Register Another Alumni
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Alumni Network</h1>
      </div>
      <div className="page-content">
        <section className="alumni-intro">
          <h2>Welcome to Our Alumni Community</h2>
          <p>
            Our alumni network connects graduates from all years, creating opportunities for mentorship, 
            networking, and giving back to the school community. Join us to stay connected with your 
            classmates and contribute to the growth of future generations.
          </p>
        </section>

        <section className="alumni-benefits">
          <h2>Alumni Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>Networking Events</h3>
              <p>Annual reunions and professional networking events</p>
            </div>
            <div className="benefit-item">
              <h3>Mentorship Program</h3>
              <p>Opportunity to mentor current students and recent graduates</p>
            </div>
            <div className="benefit-item">
              <h3>Career Support</h3>
              <p>Access to job postings and career development resources</p>
            </div>
            <div className="benefit-item">
              <h3>School Updates</h3>
              <p>Regular newsletters and updates about school developments</p>
            </div>
          </div>
        </section>

        <section className="alumni-form">
          <h2>Alumni Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile/WhatsApp Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  required
                />
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
            </div>

            <div className="form-group">
              <label>Full Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your complete address including city, state, and pin code"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Period of Study *</label>
                <input
                  type="text"
                  name="periodOfStudy"
                  value={formData.periodOfStudy}
                  onChange={handleChange}
                  placeholder="e.g., 2010-2020 or Class 6-12 (2015-2021)"
                  required
                />
              </div>
              <div className="form-group">
                <label>Highest Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech, MBA, M.Sc, etc."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Current Occupation *</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Doctor, Teacher, Student, etc."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Company/Organization Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Current workplace (if applicable)"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Company Address</label>
              <textarea
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                rows="2"
                placeholder="Company/Organization address (if applicable)"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share your memories, achievements, or message for current students and fellow alumni"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">Register as Alumni</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Alumni;