// // src/components/Alumni.js
// import React, { useState } from 'react';
// import './PageStyles.css';

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
//     console.log('Alumni Registration:', formData);
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="page-container">
//         <div className="success-message">
//           <h2>Registration Successful!</h2>
//           <p>Thank you for registering with our Alumni Network. We're excited to have you as part of our community!</p>
//           <p>You will receive a confirmation email shortly with details about upcoming alumni events and networking opportunities.</p>
//           <button onClick={() => setSubmitted(false)} className="btn-primary">
//             Register Another Alumni
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1>Alumni Network</h1>
//       </div>
//       <div className="page-content">
//         <section className="alumni-intro">
//           <h2>Welcome to Our Alumni Community</h2>
//           <p>
//             Our alumni network connects graduates from all years, creating opportunities for mentorship, 
//             networking, and giving back to the school community. Join us to stay connected with your 
//             classmates and contribute to the growth of future generations.
//           </p>
//         </section>

//         <section className="alumni-benefits">
//           <h2>Alumni Benefits</h2>
//           <div className="benefits-grid">
//             <div className="benefit-item">
//               <h3>Networking Events</h3>
//               <p>Annual reunions and professional networking events</p>
//             </div>
//             <div className="benefit-item">
//               <h3>Mentorship Program</h3>
//               <p>Opportunity to mentor current students and recent graduates</p>
//             </div>
//             <div className="benefit-item">
//               <h3>Career Support</h3>
//               <p>Access to job postings and career development resources</p>
//             </div>
//             <div className="benefit-item">
//               <h3>School Updates</h3>
//               <p>Regular newsletters and updates about school developments</p>
//             </div>
//           </div>
//         </section>

//         <section className="alumni-form">
//           <h2>Alumni Registration Form</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Mobile/WhatsApp Number *</label>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   placeholder="+91 XXXXXXXXXX"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email Address *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Full Address *</label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows="3"
//                 placeholder="Enter your complete address including city, state, and pin code"
//                 required
//               ></textarea>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Period of Study *</label>
//                 <input
//                   type="text"
//                   name="periodOfStudy"
//                   value={formData.periodOfStudy}
//                   onChange={handleChange}
//                   placeholder="e.g., 2010-2020 or Class 6-12 (2015-2021)"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Highest Qualification *</label>
//                 <input
//                   type="text"
//                   name="qualification"
//                   value={formData.qualification}
//                   onChange={handleChange}
//                   placeholder="e.g., B.Tech, MBA, M.Sc, etc."
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Current Occupation *</label>
//               <input
//                 type="text"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 placeholder="e.g., Software Engineer, Doctor, Teacher, Student, etc."
//                 required
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Company/Organization Name</label>
//                 <input
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   placeholder="Current workplace (if applicable)"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Company Address</label>
//               <textarea
//                 name="companyAddress"
//                 value={formData.companyAddress}
//                 onChange={handleChange}
//                 rows="2"
//                 placeholder="Company/Organization address (if applicable)"
//               ></textarea>
//             </div>

//             <div className="form-group">
//               <label>Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Share your memories, achievements, or message for current students and fellow alumni"
//               ></textarea>
//             </div>

//             <button type="submit" className="btn-primary">Register as Alumni</button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Alumni;

// src/components/Alumni.js
import React, { useState } from 'react';

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Alumni Registration:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-green-600">Registration Successful!</h2>
        <p>Thank you for registering with our Alumni Network. We're excited to have you as part of our community!</p>
        <p>You will receive a confirmation email shortly with event and networking details.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register Another Alumni
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Alumni Network</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome to Our Alumni Community</h2>
          <p className="text-gray-700">
            Our alumni network connects graduates from all years, creating opportunities for mentorship,
            networking, and giving back to the school community.
          </p>
        </section>

        {/* <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Alumni Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Networking Events', desc: 'Annual reunions and professional networking events' },
              { title: 'Mentorship Program', desc: 'Mentor current students and recent graduates' },
              { title: 'Career Support', desc: 'Access to job postings and career resources' },
              { title: 'School Updates', desc: 'Newsletters and school developments' }
            ].map((item, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Alumni Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Mobile/WhatsApp *</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="1234567890" className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Full Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full border px-3 py-2 rounded" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Period of Study *</label>
                <input type="text" name="periodOfStudy" value={formData.periodOfStudy} onChange={handleChange} required placeholder="e.g., 2010-2020" className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Highest Qualification *</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="e.g., B.Tech, MBA" className="w-full border px-3 py-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Current Occupation *</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required placeholder="e.g., Engineer, Doctor" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Company/Organization Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Current workplace" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Company Address</label>
              <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows="2" className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border px-3 py-2 rounded" />
            </div>

            <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register as Alumni</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Alumni;
