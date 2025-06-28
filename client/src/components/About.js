// // src/components/About.js
// import React from 'react';
// import './PageStyles.css';

// const About = () => {
//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1>About Our School</h1>
//       </div>
//       <div className="page-content">
//         <section className="about-intro">
//           <h2>Our Mission</h2>
//           <p>
//             To provide quality education that nurtures young minds and builds character, 
//             preparing students for a successful future while maintaining strong moral values 
//             and cultural heritage.
//           </p>
//         </section>

//         <section className="about-vision">
//           <h2>Our Vision</h2>
//           <p>
//             To be a leading educational institution that creates global citizens who are 
//             academically excellent, socially responsible, and emotionally balanced.
//           </p>
//         </section>

//         <section className="about-history">
//           <h2>Our History</h2>
//           <p>
//             Established in 1995, our school has been serving the community for over 25 years. 
//             Starting with just 50 students, we have grown to accommodate over 1000 students 
//             across all grades. Our commitment to excellence has made us one of the most 
//             trusted educational institutions in the region.
//           </p>
//         </section>

//         <section className="about-facilities">
//           <h2>Facilities</h2>
//           <div className="facilities-grid">
//             <div className="facility-item">
//               <h3>Modern Classrooms</h3>
//               <p>Spacious, well-ventilated classrooms equipped with modern teaching aids</p>
//             </div>
//             <div className="facility-item">
//               <h3>Science Laboratories</h3>
//               <p>Fully equipped Physics, Chemistry, and Biology laboratories</p>
//             </div>
//             <div className="facility-item">
//               <h3>Computer Lab</h3>
//               <p>Modern computer lab with high-speed internet connectivity</p>
//             </div>
//             <div className="facility-item">
//               <h3>Library</h3>
//               <p>Extensive collection of books, journals, and digital resources</p>
//             </div>
//             <div className="facility-item">
//               <h3>Sports Complex</h3>
//               <p>Basketball court, football field, and indoor games facilities</p>
//             </div>
//             <div className="facility-item">
//               <h3>Transportation</h3>
//               <p>Safe and reliable bus service covering major routes</p>
//             </div>
//           </div>
//         </section>

//         <section className="about-achievements">
//           <h2>Our Achievements</h2>
//           <ul>
//             <li>100% pass rate in board examinations for the last 5 years</li>
//             <li>State-level winners in science exhibitions</li>
//             <li>District champions in inter-school sports competitions</li>
//             <li>Recognition for excellence in academics by the Education Board</li>
//             <li>Environmental award for our green initiatives</li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default About;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
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
          <h1>About Our School</h1>
          <p>Excellence in Education, Character, and Leadership</p>
        </div>
      </section>

      <section className="about-overview">
        <div className="about-block">
          <h2>About Us</h2>
          <p>
            Madhava Kripa School is a co-education school and embraces students from all walks of life and different backgrounds. We work in close partnership with students to develop their full and individual potential for life and work.
          </p>
        </div>
        <div className="about-block">
          <h2>Our Vision</h2>
          <p>
            We at MKS, strive to strengthen the inner person of the child to help him/her become a pivotal citizen dedicated to serve the world with confidence, skill, empathy and goodwill.
          </p>
        </div>
      </section>

      <section className="leadership-section">
        <h2>Leadership Messages</h2>
        <div className="leadership-grid">
          {[
            { key: 'president', title: 'President', field: 'presidentMessage' },
            { key: 'secretary', title: 'Secretary', field: 'secretaryMessage' },
            { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage' },
            { key: 'headmistress', title: 'Headmistress', field: 'headmistressMessage' }
          ].map(({ key, title, field }) => (
            <div className="leadership-card" key={key}>
              {content[`${key}Image`] && (
                <img
                  className="leader-img"
                  src={getImageUrl(content[`${key}Image`])}
                  alt={`${title}`}
                />
              )}
              {content[field] && (
                <div className="leader-msg">
                  <h3>{title}'s Message</h3>
                  <p>{content[field]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 Madhava Kripa School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
