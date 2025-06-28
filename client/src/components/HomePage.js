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
//           {content.schoolLogo && (
//             <img src={`http://localhost:5000${content.schoolLogo}`} alt="School Logo" className="logo" />
//           )}
//           {content.managementLogo && (
//             <img src={`http://localhost:5000${content.managementLogo}`} alt="Management Logo" className="logo" />
//           )}
//         </div>
//         <h1>Welcome to Our School</h1>
//       </header>

//       <main className="main-content">
//         {/* Auto-scrolling Gallery */}
//         {content.gallery && content.gallery.length > 0 && (
//           <section className="fullscreen-gallery">
//             <div className="gallery-scroll-track">
//               {[...content.gallery, ...content.gallery].map((item, index) => (
//                 <img
//                   key={index}
//                   src={getImageUrl(item)}
//                   alt={item.caption || `Gallery Image ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Middle 3-Column Section */}
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
import './HomePage.css';

const HomePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Failed to load content. Please make sure the backend server is running on port 5000.');
      setLoading(false);
    }
  };

  const getImageUrl = (imageData) => {
    if (!imageData || !imageData.imageId) return null;
    return `http://localhost:5000/api/image/${imageData.imageId}`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!content) return <div className="loading">No content available</div>;

  return (
    <div className="homepage">
      <header className="header">
        <div className="logos">
          {content.logos && content.logos.map((logo, index) => (
            <img 
              key={index} 
              src={getImageUrl(logo)} 
              alt={`Logo ${index + 1}`} 
              className="logo" 
            />
          ))}
        </div>
        <h1>Welcome to Our School</h1>
      </header>

      <main className="main-content">
        {/* Auto-scrolling Gallery using homegallery */}
        {content.homegallery && content.homegallery.length > 0 && (
          <section className="fullscreen-gallery">
            <div className="gallery-scroll-track">
              {[...content.homegallery, ...content.homegallery].map((item, index) => (
                <img
                  key={index}
                  src={getImageUrl(item)}
                  alt={item.caption || `Home Gallery Image ${index + 1}`}
                  loading="eager"
                />
              ))}
            </div>
          </section>
        )}

        {/* Middle 3-Column Section with Background */}
        <section className="info-section">
          <div className="info-card blue">
            <h2>About Us</h2>
            <p>
              Madhava Kripa School is a co-education school and embraces students from all walks of life and different backgrounds. We work in close partnership with students to develop their full and individual potential for life and work.
            </p>
          </div>

          <div className="info-card orange">
            <h2>Our Vision</h2>
            <p>
              We at MKS, strive to strengthen the inner person of the child to help him/her become a pivotal citizen dedicated to serve the world with confidence, skill, empathy and goodwill.
            </p>
          </div>

          <div className="info-card purple">
            <h2>Our Mission</h2>
            <p>
              Influence students to benchmark excellence. Inspire every student to reach his/her potential. Instill values of love, compassion, empathy and universal brotherhood.
            </p>
          </div>
        </section>

        {/* CBSE Section */}
        <section className="cbse-section">
          <h2>CBSE Mandatory Data</h2>
          <a href="/mandatory-disclosure">Mandatory Public Disclosure</a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Madhava Kripa School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;