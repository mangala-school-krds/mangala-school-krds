// // src/components/HomePage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './HomePage.css';

// const HomePage = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/content');
//       setContent(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching content:', error);
//       setError('Failed to load content. Please make sure the backend server is running on port 5000.');
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (imageData) => {
//     if (!imageData || !imageData.imageId) return null;
//     return `http://localhost:5000/api/image/${imageData.imageId}`;
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!content) return <div className="loading">No content available</div>;

//   return (
//     <div className="homepage">
//       <header className="header">
//         <div className="logos">
//           {content.logos && content.logos.map((logo, index) => (
//             <img 
//               key={index} 
//               src={getImageUrl(logo)} 
//               alt={`Logo ${index + 1}`} 
//               className="logo" 
//             />
//           ))}
//         </div>
//         <h1>Welcome to Our School</h1>
//       </header>

//       <main className="main-content">
//         {/* Auto-scrolling Gallery using homegallery */}
//         {content.homegallery && content.homegallery.length > 0 && (
//           <section className="fullscreen-gallery">
//             <div className="gallery-scroll-track">
//               {[...content.homegallery, ...content.homegallery].map((item, index) => (
//                 <img
//                   key={index}
//                   src={getImageUrl(item)}
//                   alt={item.caption || `Home Gallery Image ${index + 1}`}
//                   loading="eager"
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Middle 3-Column Section with Background */}
//         <section className="info-section">
//           <div className="info-card blue">
//             <h2>About Us</h2>
//             <p>
//               Madhava Kripa School is a co-education school and embraces students from all walks of life and different backgrounds. We work in close partnership with students to develop their full and individual potential for life and work.
//             </p>
//           </div>

//           <div className="info-card orange">
//             <h2>Our Vision</h2>
//             <p>
//               We at MKS, strive to strengthen the inner person of the child to help him/her become a pivotal citizen dedicated to serve the world with confidence, skill, empathy and goodwill.
//             </p>
//           </div>

//           <div className="info-card purple">
//             <h2>Our Mission</h2>
//             <p>
//               Influence students to benchmark excellence. Inspire every student to reach his/her potential. Instill values of love, compassion, empathy and universal brotherhood.
//             </p>
//           </div>
//         </section>

//         {/* CBSE Section */}
//         <section className="cbse-section">
//           <h2>CBSE Mandatory Data</h2>
//           <a href="/mandatory-disclosure">Mandatory Public Disclosure</a>
//         </section>
//       </main>

//       <footer className="footer">
//         <p>&copy; 2024 Madhava Kripa School. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../assets/background.jpg';

const HomePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`/api/content`);
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load content.');
      setLoading(false);
    }
  };

  const getImageUrl = (img) => img?.imageId ? `/api/image/${img.imageId}` : null;

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!content) return <div className="text-center py-10">No content available</div>;

  console.log(process.env.REACT_APP_API_URL);

  return (
    <div className="min-h-screen font-sans">
      {/* Fullscreen Auto-scrolling Gallery */}
      {content.homegallery?.length > 0 && (
        <section className="relative w-full overflow-hidden h-[90vh]">
          <div className="absolute animate-scroll flex w-max">
            {[...content.homegallery, ...content.homegallery].map((item, index) => (
              <img
                key={index}
                src={getImageUrl(item)}
                alt={item.caption || `Gallery ${index}`}
                className="h-[90vh] w-auto object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* Middle 3-Column Section */}
      <section
        className="bg-cover bg-center py-[15rem] text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-900 bg-opacity-80 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">About Us</h2>
            <p>Madhava Kripa School is a co-educational school embracing students from all walks of life...</p>
          </div>
          <div className="bg-orange-600 bg-opacity-90 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p>We strive to strengthen the inner person of the child to help them serve the world with confidence...</p>
          </div>
          <div className="bg-purple-700 bg-opacity-90 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p>Inspire students to reach their potential. Instill values of compassion and universal brotherhood.</p>
          </div>
        </div>
      </section>

      {/* CBSE Section */}
      {/* <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">CBSE Mandatory Data</h2>
        <a href="/mandatory-disclosure" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          View Mandatory Public Disclosure
        </a>
      </section> */}

    </div>
  );
};

export default HomePage;
