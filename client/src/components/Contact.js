// import React, { useState } from 'react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
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
//     console.log('Contact Form:', formData);
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 py-12 text-center">
//         <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully!</h2>
//         <p className="text-gray-700 mb-6">
//           Thank you for contacting us. We will get back to you within 24 hours.
//         </p>
//         <button
//           onClick={() => setSubmitted(false)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
//         >
//           Send Another Message
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="text-center mb-10">
//         <h1 className="text-3xl font-bold">Contact Us</h1>
//       </div>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Contact Info */}
//         <section className="space-y-6">
//           <h2 className="text-xl font-semibold">Get in Touch</h2>
//           <div className="space-y-4 text-gray-700">
//             <div>
//               <h3 className="font-medium">📍 Address</h3>
//               <p>123 School Street<br />Education City, State 123456<br />India</p>
//             </div>
//             <div>
//               <h3 className="font-medium">📞 Phone</h3>
//               <p>+91 12345 67890<br />+91 98765 43210</p>
//             </div>
//             <div>
//               <h3 className="font-medium">✉️ Email</h3>
//               <p>info@schoolname.edu<br />admissions@schoolname.edu</p>
//             </div>
//             <div>
//               <h3 className="font-medium">🕒 Office Hours</h3>
//               <p>Mon–Fri: 8:00 AM – 4:00 PM<br />Sat: 9:00 AM – 1:00 PM<br />Sun: Closed</p>
//             </div>
//           </div>
//         </section>

//         {/* Contact Form */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
//           <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2"
//                 />
//               </div>
//             </div>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border rounded-md px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded-md px-3 py-2"
//                 >
//                   <option value="">Select Subject</option>
//                   <option value="admission">Admission Inquiry</option>
//                   <option value="academic">Academic Information</option>
//                   <option value="complaint">Complaint</option>
//                   <option value="suggestion">Suggestion</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="Enter your message here..."
//                 required
//                 className="w-full border rounded-md px-3 py-2"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
//             >
//               Send Message
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';

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
    console.log('Contact Form:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for contacting us. We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-medium">📍 Address</h3>
              <p>
                Mangala English Medium School<br />
                MannaGudda, Gandhinagar<br />
                Mangalore 575003<br />
                India
              </p>
            </div>
            <div>
              <h3 className="font-medium">📞 Phone</h3>
              <p>+91 80500 29606<br />0824-2455296</p>
            </div>
            <div>
              <h3 className="font-medium">✉️ Email</h3>
              <p>mangalahighschool2014@gmail.com</p>
            </div>
            <div>
              <h3 className="font-medium">🕒 Office Hours</h3>
              <p>Mon–Fri: 8:00 AM – 4:00 PM<br />Sat: 9:00 AM – 1:00 PM<br />Sun: Closed</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Enter your message here..."
                required
                className="w-full border rounded-md px-3 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
