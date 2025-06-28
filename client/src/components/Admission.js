// // src/components/Admission.js
// import React from 'react';
// import './PageStyles.css';

// const Admission = () => {
//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1>Admissions</h1>
//       </div>
//       <div className="page-content">
//         <section className="admission-info">
//           <h2>Admission Process</h2>
//           <p>We welcome new students throughout the academic year, subject to availability of seats.</p>
          
//           <h3>Required Documents:</h3>
//           <ul>
//             <li>Birth Certificate</li>
//             <li>Transfer Certificate (if applicable)</li>
//             <li>Previous year's report card</li>
//             <li>Passport size photographs</li>
//             <li>Address proof</li>
//           </ul>

//           <h3>Admission Fees:</h3>
//           <div className="fee-table">
//             <table>
//               <thead>
//                 <tr><th>Class</th><th>Admission Fee</th><th>Monthly Fee</th></tr>
//               </thead>
//               <tbody>
//                 <tr><td>Pre-KG to Class 2</td><td>₹5,000</td><td>₹2,500</td></tr>
//                 <tr><td>Class 3 to Class 5</td><td>₹6,000</td><td>₹3,000</td></tr>
//                 <tr><td>Class 6 to Class 8</td><td>₹7,000</td><td>₹3,500</td></tr>
//                 <tr><td>Class 9 to Class 12</td><td>₹8,000</td><td>₹4,000</td></tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Admission;

// src/components/Admission.js
import React from 'react';

const Admission = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Admissions</h1>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Admission Process</h2>
          <p className="text-gray-700">
            We welcome new students throughout the academic year, subject to availability of seats.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-4 mb-2">Required Documents:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Birth Certificate</li>
            <li>Transfer Certificate (if applicable)</li>
            <li>Previous year's report card</li>
            <li>Passport size photographs</li>
            <li>Address proof</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">Admission Fees:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Class</th>
                  <th className="border px-4 py-2 text-left">Admission Fee</th>
                  <th className="border px-4 py-2 text-left">Monthly Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">Pre-KG to Class 2</td>
                  <td className="border px-4 py-2">₹5,000</td>
                  <td className="border px-4 py-2">₹2,500</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">Class 3 to Class 5</td>
                  <td className="border px-4 py-2">₹6,000</td>
                  <td className="border px-4 py-2">₹3,000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">Class 6 to Class 8</td>
                  <td className="border px-4 py-2">₹7,000</td>
                  <td className="border px-4 py-2">₹3,500</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">Class 9 to Class 12</td>
                  <td className="border px-4 py-2">₹8,000</td>
                  <td className="border px-4 py-2">₹4,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admission;
