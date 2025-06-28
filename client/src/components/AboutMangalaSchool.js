// src/components/AboutMangalaSchool.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const AboutMangalaSchool = () => {
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
          <h1>About Mangala School</h1>
          <p>Excellence in Education, Character, and Leadership</p>
        </div>
      </section>

      <section className="about-overview">
        <div className="about-block">
          <h2>About Us</h2>
          <p>
            Mangala School is a co-education school and embraces students from all walks of life and different backgrounds. We work in close partnership with students to develop their full and individual potential for life and work. Our school is committed to providing a nurturing environment where every child can thrive academically, socially, and emotionally.
          </p>
          <p>
            With state-of-the-art facilities and a dedicated faculty, we ensure that our students receive the best possible education that prepares them for the challenges of tomorrow.
          </p>
        </div>

        <div className="about-block">
          <h2>Our Vision</h2>
          <p>
            We at Mangala School, strive to strengthen the inner person of the child to help him/her become a pivotal citizen dedicated to serve the world with confidence, skill, empathy and goodwill. Our vision is to create global citizens who are not only academically excellent but also possess strong moral values and leadership qualities.
          </p>
        </div>

        <div className="about-block">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide quality education that nurtures creativity, critical thinking, and character development. We aim to create an inclusive learning environment where every student feels valued and empowered to reach their full potential. Through innovative teaching methods and holistic development programs, we prepare our students to become responsible global citizens.
          </p>
        </div>

        <div className="about-block">
          <h2>Our Values</h2>
          <p>
            At Mangala School, we uphold the values of integrity, excellence, respect, and compassion. These core values guide our daily interactions and decision-making processes, ensuring that our students develop not just intellectually but also morally and ethically.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutMangalaSchool;