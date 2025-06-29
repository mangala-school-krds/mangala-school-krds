import React from 'react';

const MandatoryPublicDisclosure = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Mandatory Public Disclosure</h1>
        </div>

        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">School Information</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Name of School:</strong> Mangala Public School</li>
            <li><strong>Affiliation Board:</strong> CBSE, New Delhi</li>
            <li><strong>School Type:</strong> Co-Educational, English Medium</li>
            <li><strong>Number of Teachers:</strong> 35</li>
            <li><strong>Number of Classrooms:</strong> 25</li>
            <li><strong>Campus Area:</strong> 2.5 Acres</li>
            <li><strong>Labs:</strong> Physics, Chemistry, Biology, Computer</li>
            <li><strong>Facilities:</strong> Library, Sports Ground, Smart Classes, Transport</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MandatoryPublicDisclosure;
