// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-700 text-white pt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/20">
        {/* School Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Mangala School</h2>
          <p className="text-sm leading-relaxed">
            (A unit of Academy of General Education)<br />
            Affiliated to CBSE New-Delhi vide Aff.No: XXXXX<br />
            Ward: 55, Behind XYZ College of Science,<br />
            Mangalore - 575001, Karnataka, India<br />
            Mobile: +91 9000000000<br />
            Tel: +91 824 XXXXXXX<br />
            <a href="https://mangalaschool.edu.in" className="underline hover:text-gray-200">
              www.mangalaschool.edu.in
            </a>
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ADMISSIONS</h3>
          <p>
            <a href="mailto:admissions@mangalaschool.edu.in" className="underline hover:text-gray-200">
              admissions@mangalaschool.edu.in
            </a>
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">FEEDBACK/SUGGESTIONS</h3>
          <p>
            <a href="mailto:feedback@mangalaschool.edu.in" className="underline hover:text-gray-200">
              feedback@mangalaschool.edu.in
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">QUICK LINKS</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/news" className="hover:underline">News</Link>
            <Link to="/academic-corner" className="hover:underline">Academics</Link>
            <Link to="/gallery" className="hover:underline">Events Gallery</Link>
            <Link to="/admissions" className="hover:underline">Admission</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/notifications-circular" className="hover:underline">Circular</Link>
            <Link to="/mandatory-public-disclosure" className="hover:underline">Annual Reports</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 text-sm text-white/80 bg-black/10">
        <div className="mb-2 md:mb-0">
          © Mangala School, 2024 | 
          <Link to="/privacy" className="ml-2 hover:underline">Privacy Policy</Link> | 
          <Link to="/disclaimer" className="ml-2 hover:underline">Disclaimer</Link> | 
          <Link to="/sitemap" className="ml-2 hover:underline">Sitemap</Link>
        </div>
        <div className="flex space-x-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
