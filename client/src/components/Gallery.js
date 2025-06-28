// src/components/Gallery.js
import React, { useState } from 'react';
import './PageStyles.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample gallery data - replace with actual images
  const galleryItems = [
    { id: 1, category: 'events', title: 'Annual Day Celebration', image: '/api/placeholder/300/200', description: 'Students performing on Annual Day' },
    { id: 2, category: 'sports', title: 'Sports Day', image: '/api/placeholder/300/200', description: 'Inter-house sports competition' },
    { id: 3, category: 'academic', title: 'Science Exhibition', image: '/api/placeholder/300/200', description: 'Student science projects display' },
    { id: 4, category: 'events', title: 'Cultural Festival', image: '/api/placeholder/300/200', description: 'Traditional dance performance' },
    { id: 5, category: 'facilities', title: 'Computer Lab', image: '/api/placeholder/300/200', description: 'Modern computer laboratory' },
    { id: 6, category: 'facilities', title: 'Library', image: '/api/placeholder/300/200', description: 'Well-stocked library' },
    { id: 7, category: 'sports', title: 'Basketball Court', image: '/api/placeholder/300/200', description: 'Students playing basketball' },
    { id: 8, category: 'academic', title: 'Chemistry Lab', image: '/api/placeholder/300/200', description: 'Students in chemistry lab' }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'events', name: 'Events' },
    { id: 'sports', name: 'Sports' },
    { id: 'academic', name: 'Academic' },
    { id: 'facilities', name: 'Facilities' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>School Gallery</h1>
      </div>
      <div className="page-content">
        <section className="gallery-filters">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        <section className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Gallery;