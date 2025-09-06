// // src/components/Leadership.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Leadership = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: '', message: '', name: '' });

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       const response = await axios.get('/api/content');
//       setContent(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching content:', error);
//       setError('Failed to load content. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (imageData) => {
//     if (!imageData || !imageData.imageId) return null;
//     return `/api/image/${imageData.imageId}`;
//   };

//   const truncateText = (text, wordLimit = 25) => {
//     if (!text) return '';
//     const words = text.split(' ');
//     if (words.length <= wordLimit) return text;
//     return words.slice(0, wordLimit).join(' ') + '...';
//   };

//   const openModal = (title, message, name) => {
//     setModalContent({ title, message, name });
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalContent({ title: '', message: '', name: '' });
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-gray-700">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-center px-4">
//         <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
//         <p className="text-gray-700 mb-4">{error}</p>
//         <button
//           onClick={fetchContent}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!content) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-center px-4">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">No Content Available</h2>
//         <p className="text-gray-600">Please check back later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen font-sans">
//       {/* Hero section */}
//       <section className="bg-gradient-to-r from-blue-800 to-purple-700 text-white py-20 text-center">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold mb-2">Our Leadership</h1>
//           <p className="text-lg">Inspiring Excellence Through Visionary Leadership</p>
//         </div>
//       </section>

//       {/* Leadership Cards */}
//       <section className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Leadership Messages</h2>
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
//             {/* Dynamic leaders */}
//             {[
//               { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage', name: 'Shekar Moily Padebettu' },
//               { key: 'headmistress', title: 'Headmistress', field: 'headmistressMessage', name: 'Jayalaxmi' },
//               { key: 'president', title: 'President', field: 'presidentMessage', name: 'Ashok Moily' },
//               { key: 'secretary', title: 'Secretary', field: 'secretaryMessage', name: 'Veena Ganesh' },
//               { key: 'honorarypresident', title: 'Secretary', field: 'honoraryPresidentMessage', name: 'Dr Devaraj K' }
//             ].map(({ key, title, field, name }) => (
//               <div
//                 key={key}
//                 className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-start p-6"
//               >
//                 <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
//                   {content[`${key}Image`] && (
//                     <img
//                       src={getImageUrl(content[`${key}Image`])}
//                       alt={title}
//                       className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
//                     />
//                   )}
//                   <p className="text-sm font-medium text-gray-800 mt-2 text-center max-w-32 break-words">
//                     {name}
//                   </p>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}'s Message</h3>
//                   <p className="text-gray-700 leading-relaxed text-sm mb-3">
//                     {truncateText(content[field])}
//                   </p>
//                   {content[field] && content[field].split(' ').length > 25 && (
//                     <button
//                       onClick={() => openModal(title, content[field], name)}
//                       className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//                     >
//                       Read More
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}

//             {/* Temporary Honorary President */}
//             {/* <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-start p-6">
//               <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
//                 <img
//                   src="https://res.cloudinary.com/daja3mrty/image/upload/v1751172668/honorary_president_igej3e.jpg"
//                   alt="Honorary President"
//                   className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
//                 />
//                 <p className="text-sm font-medium text-gray-800 mt-2 text-center max-w-32 break-words">
//                   Dr Devaraj  K
//                 </p>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold text-blue-700 mb-2">Honorary President (Mangala Vision)'s Message</h3>
//                 <p className="text-gray-700 leading-relaxed text-sm mb-3">
//                   {truncateText(`Dear Esteemed Members and Well-wishers of Karnataka Rajya Devadigara Sangha, Mangalore, South India.
//                   Warm greetings,
//                   It is with deep gratitude and pride that I accept the role of Honorary President of Mangala Vision, an institution that has completed a remarkable 100 years of dedicated social service. As we celebrate this significant milestone, we also look ahead—with hope and purpose—toward an even brighter future.
//                   One of our most impactful initiatives, Mangala English Medium School, was founded in 1994 with a mission to provide quality education to children from economically disadvantaged backgrounds. For decades, the school has opened its doors to students who cannot afford donations or expensive fees, serving as a beacon of opportunity for families in need.
//                   Today, we stand at a crucial turning point. To continue this mission and expand our impact, the school urgently needs a permanent home. Our goal is to acquire land and construct a modern, well-equipped school building that will serve current and future generations of learners.
//                   We cannot achieve this vision without your support.
//                   I earnestly appeal to you—our respected members and generous supporters—to contribute to this noble cause. Your donation will directly help build the foundation for a better future, not just for the students, but for the entire community.Together, let us transform this dream into reality. Let us invest in education, in hope, and in the promise of a stronger tomorrow.
//                   Thank you for your consideration and unwavering support. I look forward to your generous and enthusiastic response.`)}
//                 </p>
//                 <button
//                   onClick={() => openModal('Honorary President (Mangala Vision)', `Dear Esteemed Members and Well-wishers of Karnataka Rajya Devadigara Sangha, Mangalore, South India.
//                   Warm greetings,
//                   It is with deep gratitude and pride that I accept the role of Honorary President of Mangala Vision, an institution that has completed a remarkable 100 years of dedicated social service. As we celebrate this significant milestone, we also look ahead—with hope and purpose—toward an even brighter future.
//                   One of our most impactful initiatives, Mangala English Medium School, was founded in 1994 with a mission to provide quality education to children from economically disadvantaged backgrounds. For decades, the school has opened its doors to students who cannot afford donations or expensive fees, serving as a beacon of opportunity for families in need.
//                   Today, we stand at a crucial turning point. To continue this mission and expand our impact, the school urgently needs a permanent home. Our goal is to acquire land and construct a modern, well-equipped school building that will serve current and future generations of learners.
//                   We cannot achieve this vision without your support.
//                   I earnestly appeal to you—our respected members and generous supporters—to contribute to this noble cause. Your donation will directly help build the foundation for a better future, not just for the students, but for the entire community.Together, let us transform this dream into reality. Let us invest in education, in hope, and in the promise of a stronger tomorrow.
//                   Thank you for your consideration and unwavering support. I look forward to your generous and enthusiastic response.`, 'Honorary President Name')}
//                   className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//                 >
//                   Read More
//                 </button>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       {/* Leadership Philosophy */}
//       <section className="bg-white py-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4">Leadership Philosophy</h2>
//             <p className="text-gray-700 leading-relaxed">
//               Our leadership team believes in collaborative governance and shared vision. Each member brings unique
//               expertise and perspective, working together to ensure that Mangala School continues to be a beacon of
//               educational excellence. We are committed to fostering an environment where innovation thrives and every
//               stakeholder feels empowered to contribute to our mission.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
//             <div className="flex justify-between items-center p-6 border-b">
//               <div>
//                 <h2 className="text-xl font-bold text-blue-800">{modalContent.title}'s Message</h2>
//                 <p className="text-sm text-gray-600 mt-1">{modalContent.name}</p>
//               </div>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="p-6 overflow-y-auto max-h-[60vh]">
//               <p className="text-gray-700 leading-relaxed">{modalContent.message}</p>
//             </div>
//             {/* <div className="p-6 border-t bg-gray-50">
//               <button
//                 onClick={closeModal}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Close
//               </button>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leadership;

// src/components/Leadership.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leadership = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', name: '' });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content');
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load content. Please try again later.');
      setLoading(false);
    }
  };

  const getImageUrl = (imageData) => {
    if (!imageData || !imageData.imageId) return null;
    return `/api/image/${imageData.imageId}`;
  };

  const truncateText = (text, wordLimit = 25) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const openModal = (title, message, name) => {
    setModalContent({ title, message, name });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent({ title: '', message: '', name: '' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={fetchContent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Content Available</h2>
        <p className="text-gray-600">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-800 to-purple-700 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Leadership</h1>
          <p className="text-lg">Inspiring Excellence Through Visionary Leadership</p>
        </div>
      </section>

      {/* Leadership Section with Background */}
      <section
        className="py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('../assets/background.jpg')" }}
      >
        <div className="container mx-auto px-4 max-w-6xl text-white">
          <h2 className="text-4xl font-bold text-center mb-12">Our Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { key: 'president', title: 'President', field: 'presidentMessage', name: 'Ashok Moily' },
              { key: 'secretary', title: 'Secretary', field: 'secretaryMessage', name: 'Veena Ganesh' },
              { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage', name: 'Shekar Moily Padebettu' },
              { key: 'headmistress', title: 'Principal', field: 'headmistressMessage', name: 'Jayalaxmi' },
              { key: 'honoraryPresident', title: 'Honorary President', field: 'honoraryPresidentMessage', name: 'Dr Devaraj K' },
            ].map(({ key, title, field, name }) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-xl overflow-hidden p-6 flex flex-col items-center text-center"
              >
                {content[`${key}Image`] && (
                  <img
                    src={getImageUrl(content[`${key}Image`])}
                    alt={title}
                    className="w-28 h-28 object-cover rounded-full border-4 border-blue-600 mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{title}'s Message</h3>
                <p className="text-sm font-medium text-gray-700 mb-2">{name}</p>
                <p className="text-gray-700 text-sm mb-4">{truncateText(content[field])}</p>
                {content[field] && content[field].split(' ').length > 25 && (
                  <button
                    onClick={() => openModal(title, content[field], name)}
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Read More
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Leadership Philosophy */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Leadership Philosophy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our leadership team believes in collaborative governance and shared vision. Each member brings unique
              expertise and perspective, working together to ensure that Mangala School continues to be a beacon of
              educational excellence. We are committed to fostering an environment where innovation thrives and every
              stakeholder feels empowered to contribute to our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-blue-800">{modalContent.title}'s Message</h2>
                <p className="text-sm text-gray-600 mt-1">{modalContent.name}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-700 leading-relaxed">{modalContent.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leadership;