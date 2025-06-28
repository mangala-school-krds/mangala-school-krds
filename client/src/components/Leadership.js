// // src/components/Leadership.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './About.css';

// const Leadership = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

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
//       setError('Failed to load content. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (imageData) => {
//     if (!imageData || !imageData.imageId) return null;
//     return `http://localhost:5000/api/image/${imageData.imageId}`;
//   };

//   if (loading) {
//     return (
//       <div className="about-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="about-error">
//         <h2>Error</h2>
//         <p>{error}</p>
//         <button onClick={fetchContent} className="retry-btn">Retry</button>
//       </div>
//     );
//   }

//   if (!content) {
//     return (
//       <div className="about-error">
//         <h2>No Content Available</h2>
//         <p>Please check back later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="about-page">
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>Our Leadership</h1>
//           <p>Inspiring Excellence Through Visionary Leadership</p>
//         </div>
//       </section>

//       <section className="leadership-section">
//         <h2>Leadership Messages</h2>
//         <div className="leadership-grid">
//           {[
//             { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage' },
//             { key: 'headmistress', title: 'Headmistress', field: 'headmistressMessage' },
//             { key: 'president', title: 'Principal', field: 'presidentMessage' },
//             { key: 'secretary', title: 'Secretary', field: 'secretaryMessage' }
//           ].map(({ key, title, field }) => (
//             <div className="leadership-card" key={key}>
//               {content[`${key}Image`] && (
//                 <img
//                   className="leader-img"
//                   src={getImageUrl(content[`${key}Image`])}
//                   alt={`${title}`}
//                 />
//               )}
//               {content[field] && (
//                 <div className="leader-msg">
//                   <h3>{title}'s Message</h3>
//                   <p>{content[field]}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="about-overview">
//         <div className="about-block">
//           <h2>Leadership Philosophy</h2>
//           <p>
//             Our leadership team believes in collaborative governance and shared vision. Each member brings unique expertise and perspective, working together to ensure that Mangala School continues to be a beacon of educational excellence. We are committed to fostering an environment where innovation thrives and every stakeholder feels empowered to contribute to our mission.
//           </p>
//         </div>
//       </section>

//       <footer className="about-footer">
//         <p>&copy; 2025 Mangala School. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Leadership;

// src/components/Leadership.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const Leadership = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content');
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
    return `http://localhost:5000/api/image/${imageData.imageId}`;
  };

  if (loading) {
    return (
      <div className="about-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchContent} className="retry-btn">Retry</button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="about-error">
        <h2>No Content Available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Leadership</h1>
          <p>Inspiring Excellence Through Visionary Leadership</p>
        </div>
      </section>

      <section className="leadership-section">
        <h2>Leadership Messages</h2>
        <div className="leadership-rows">
          {[
            { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage' },
            { key: 'headmistress', title: 'Headmistress', field: 'headmistressMessage' },
            { key: 'president', title: 'Principal', field: 'presidentMessage' },
            { key: 'secretary', title: 'Secretary', field: 'secretaryMessage' }
          ].map(({ key, title, field }) => (
            <div className="leadership-row" key={key}>
              <div className="leader-image-container">
                {content[`${key}Image`] && (
                  <img
                    className="leader-img"
                    src={getImageUrl(content[`${key}Image`])}
                    alt={`${title}`}
                  />
                )}
              </div>
              <div className="leader-content">
                <h3>{title}'s Message</h3>
                {content[field] && <p>{content[field]}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-overview">
        <div className="about-block">
          <h2>Leadership Philosophy</h2>
          <p>
            Our leadership team believes in collaborative governance and shared vision. Each member brings unique expertise and perspective, working together to ensure that Mangala School continues to be a beacon of educational excellence. We are committed to fostering an environment where innovation thrives and every stakeholder feels empowered to contribute to our mission.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Leadership;