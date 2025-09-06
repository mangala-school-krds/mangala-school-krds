// // src/components/AcademicCorner.js
// import React from 'react';

// const AcademicCorner = () => {
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <div className="text-center mb-10">
//         <h1 className="text-3xl font-bold">Academic Corner</h1>
//       </div>

//       <div className="space-y-10">
//         {/* Academic Programs */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">Academic Programs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-md rounded-lg p-6 border">
//               <h3 className="text-xl font-medium">Primary Education (1–5)</h3>
//               <p className="text-gray-600">Foundation building with focus on basic skills and values</p>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-6 border">
//               <h3 className="text-xl font-medium">Middle School (6–8)</h3>
//               <p className="text-gray-600">Comprehensive curriculum with enhanced learning methodologies</p>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-6 border">
//               <h3 className="text-xl font-medium">Secondary Education (9–10)</h3>
//               <p className="text-gray-600">Board exam preparation with focus on core subjects</p>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-6 border">
//               <h3 className="text-xl font-medium">Higher Secondary (11–12)</h3>
//               <p className="text-gray-600">Specialized streams: Science, Commerce, and Arts</p>
//             </div>
//           </div>
//         </section>

//         {/* Curriculum Highlights */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">Curriculum Highlights</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-50 p-6 rounded-lg border">
//               <h3 className="text-xl font-medium mb-2">Core Subjects</h3>
//               <ul className="list-disc list-inside text-gray-700 space-y-1">
//                 <li>Mathematics</li>
//                 <li>Science (Physics, Chemistry, Biology)</li>
//                 <li>English Language</li>
//                 <li>Social Studies</li>
//                 <li>Regional Language</li>
//               </ul>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg border">
//               <h3 className="text-xl font-medium mb-2">Co-curricular Activities</h3>
//               <ul className="list-disc list-inside text-gray-700 space-y-1">
//                 <li>Sports and Physical Education</li>
//                 <li>Arts and Crafts</li>
//                 <li>Music and Dance</li>
//                 <li>Drama and Theatre</li>
//                 <li>Computer Science</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* Academic Calendar */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">Academic Calendar 2024–25</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow border">
//               <h3 className="text-lg font-medium mb-1">First Term</h3>
//               <p className="text-gray-600">June 2024 – September 2024</p>
//               <p className="text-gray-600">First Term Exams: October 2024</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow border">
//               <h3 className="text-lg font-medium mb-1">Second Term</h3>
//               <p className="text-gray-600">November 2024 – February 2025</p>
//               <p className="text-gray-600">Annual Exams: March 2025</p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AcademicCorner;

// src/components/AcademicCorner.js
import React from 'react';

const AcademicCorner = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Academic Corner</h1>
        <p className="mt-2 text-gray-600">
          Academic Excellence at Mangala School – Strong foundation in core subjects along with life skills and moral education.
        </p>
      </div>

      <div className="space-y-10">
        {/* Academic Programs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Classes Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="text-xl font-medium">Pre-primary (LKG & UKG)</h3>
              <p className="text-gray-600">Early childhood education focusing on play, exploration, and foundational skills.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="text-xl font-medium">Primary (Grade 1–5)</h3>
              <p className="text-gray-600">Foundation building with focus on basic academic skills and moral values.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="text-xl font-medium">Middle School (Grade 6–8)</h3>
              <p className="text-gray-600">Comprehensive curriculum with enhanced learning methodologies and skill development.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="text-xl font-medium">High School (Grade 9–10)</h3>
              <p className="text-gray-600">Board exam preparation with focus on Science, Math, Languages, and Social Studies.</p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>English medium instruction</li>
            <li>Curriculum aligned with Karnataka State Syllabus</li>
            <li>Focus on core subjects and life skills</li>
            <li>Regular assessments and parent-teacher interactions</li>
            <li>Holistic development through academic and co-curricular integration</li>
          </ul>
        </section>

        {/* <section>
          <h2 className="text-2xl font-semibold mb-4">Curriculum Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Core Subjects</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Mathematics</li>
                <li>Science (Physics, Chemistry, Biology)</li>
                <li>English Language</li>
                <li>Social Studies</li>
                <li>Regional Language</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-2">Co-curricular Activities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Sports and Physical Education</li>
                <li>Arts and Crafts</li>
                <li>Music and Dance</li>
                <li>Drama and Theatre</li>
                <li>Computer Science</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Academic Calendar 2024–25</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-medium mb-1">First Term</h3>
              <p className="text-gray-600">June 2024 – September 2024</p>
              <p className="text-gray-600">First Term Exams: October 2024</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-medium mb-1">Second Term</h3>
              <p className="text-gray-600">November 2024 – February 2025</p>
              <p className="text-gray-600">Annual Exams: March 2025</p>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default AcademicCorner;
