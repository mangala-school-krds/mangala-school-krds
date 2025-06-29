// src/components/Leadership.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leadership = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

      {/* Leadership Cards */}
      {/* <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Leadership Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {[
              { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage' },
              { key: 'headmistress', title: 'Headmistress', field: 'headmistressMessage' },
              { key: 'president', title: 'Principal', field: 'presidentMessage' },
              { key: 'secretary', title: 'Secretary', field: 'secretaryMessage' }
            ].map(({ key, title, field }) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-6"
              >
                {content[`${key}Image`] && (
                  <img
                    src={getImageUrl(content[`${key}Image`])}
                    alt={`${title}`}
                    className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 md:mr-6 border-4 border-blue-600"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}'s Message</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{content[field]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Leadership Cards */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Leadership Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {/* Dynamic leaders */}
            {[
              { key: 'correspondent', title: 'Correspondent', field: 'correspondentMessage' },
              { key: 'headmistress', title: 'Headmistress', field: 'headmistressMessage' },
              { key: 'president', title: 'Principal', field: 'presidentMessage' },
              { key: 'secretary', title: 'Secretary', field: 'secretaryMessage' }
            ].map(({ key, title, field }) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-6"
              >
                {content[`${key}Image`] && (
                  <img
                    src={getImageUrl(content[`${key}Image`])}
                    alt={`${title}`}
                    className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 md:mr-6 border-4 border-blue-600"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}'s Message</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{content[field]}</p>
                </div>
              </div>
            ))}

            {/* Temporary */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-6">
              <img
                src="../assets/honorary_president.jpg" // replace with real image later
                alt="Vice Principal"
                className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 md:mr-6 border-4 border-blue-600"
              />
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Honorary President (Mangala Vision)'s Message</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  This is honorary president's message.
                </p>
              </div>
            </div>
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
    </div>
  );
};

export default Leadership;
