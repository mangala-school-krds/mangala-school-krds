// // src/components/Alumni.js
// import React, { useState } from 'react';

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
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Alumni Registration:', formData);
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 text-center space-y-4">
//         <h2 className="text-2xl font-semibold text-green-600">Registration Successful!</h2>
//         <p>Thank you for registering with our Alumni Network. We're excited to have you as part of our community!</p>
//         <p>You will receive a confirmation email shortly with event and networking details.</p>
//         <button
//           onClick={() => setSubmitted(false)}
//           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Register Another Alumni
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-center">Alumni Network</h1>

//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Welcome to Our Alumni Community</h2>
//           <p className="text-gray-700">
//             Our alumni network connects graduates from all years, creating opportunities for mentorship,
//             networking, and giving back to the school community.
//           </p>
//         </section>

//         {/* <section className="mb-10">
//           <h2 className="text-xl font-semibold mb-4">Alumni Benefits</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {[
//               { title: 'Networking Events', desc: 'Annual reunions and professional networking events' },
//               { title: 'Mentorship Program', desc: 'Mentor current students and recent graduates' },
//               { title: 'Career Support', desc: 'Access to job postings and career resources' },
//               { title: 'School Updates', desc: 'Newsletters and school developments' }
//             ].map((item, i) => (
//               <div key={i} className="p-4 border rounded-lg shadow-sm">
//                 <h3 className="font-semibold text-lg">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section> */}

//         <section className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Alumni Registration Form</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 font-medium">Full Name *</label>
//                 <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Gender *</label>
//                 <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 font-medium">Mobile/WhatsApp *</label>
//                 <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="1234567890" className="w-full border px-3 py-2 rounded" />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Email Address *</label>
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Full Address *</label>
//               <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full border px-3 py-2 rounded" />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 font-medium">Period of Study *</label>
//                 <input type="text" name="periodOfStudy" value={formData.periodOfStudy} onChange={handleChange} required placeholder="e.g., 2010-2020" className="w-full border px-3 py-2 rounded" />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Highest Qualification *</label>
//                 <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="e.g., B.Tech, MBA" className="w-full border px-3 py-2 rounded" />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Current Occupation *</label>
//               <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required placeholder="e.g., Engineer, Doctor" className="w-full border px-3 py-2 rounded" />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Company/Organization Name</label>
//               <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Current workplace" className="w-full border px-3 py-2 rounded" />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Company Address</label>
//               <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows="2" className="w-full border px-3 py-2 rounded" />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Message</label>
//               <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border px-3 py-2 rounded" />
//             </div>

//             <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register as Alumni</button>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/alumni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Alumni Registration:', data);
      setSubmitted(true);
    } catch (err) {
      console.error('Error registering alumni:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setSubmitted(false);
    setError('');
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Registration Successful!</h2>
          <p className="text-gray-700 mb-2">
            Thank you for registering with our Alumni Network. We're excited to have you as part of our community!
          </p>
          <p className="text-gray-600 mb-4">
            Your registration has been submitted and is pending approval. You will be notified once it's approved.
          </p>
          <button
            onClick={resetForm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register Another Alumni
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Alumni Network</h1>

        <section className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Welcome to Our Alumni Community</h2>
          <p className="text-gray-700 leading-relaxed">
            Our alumni network connects graduates from all years, creating opportunities for mentorship,
            networking, and giving back to the school community. Join us to stay connected with your alma mater
            and fellow alumni.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Alumni Registration Form</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Gender *</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Mobile/WhatsApp *</label>
                <input 
                  type="tel" 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  placeholder="1234567890" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Address *</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
                disabled={loading}
                rows="3" 
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Period of Study *</label>
                <input 
                  type="text" 
                  name="periodOfStudy" 
                  value={formData.periodOfStudy} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  placeholder="e.g., 2010-2020" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Highest Qualification *</label>
                <input 
                  type="text" 
                  name="qualification" 
                  value={formData.qualification} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  placeholder="e.g., B.Tech, MBA" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Current Occupation *</label>
              <input 
                type="text" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleChange} 
                required 
                disabled={loading}
                placeholder="e.g., Engineer, Doctor" 
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Company/Organization Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                disabled={loading}
                placeholder="Current workplace" 
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Company Address</label>
              <textarea 
                name="companyAddress" 
                value={formData.companyAddress} 
                onChange={handleChange} 
                disabled={loading}
                rows="2" 
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                disabled={loading}
                rows="4" 
                placeholder="Share your memories, achievements, or message to the school..."
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Registering...' : 'Register as Alumni'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Alumni;