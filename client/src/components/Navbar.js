// // src/components/Navbar.js
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//     setIsAboutDropdownOpen(false);
//   };

//   const toggleAboutDropdown = () => {
//     setIsAboutDropdownOpen(!isAboutDropdownOpen);
//   };

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { 
//       path: '/about', 
//       label: 'About',
//       dropdown: [
//         { path: '/about/mangala-school', label: 'About Mangala School' },
//         { path: '/about/leadership', label: 'Leadership' },
//         { path: '/about/why-mangala-school', label: 'Why Mangala School' }
//       ]
//     },
//     { path: '/tc', label: 'T.C.' },
//     { path: '/alumni', label: 'Alumni' },
//     { path: '/admissions', label: 'Admissions' },
//     { path: '/academic-corner', label: 'Academic Corner' },
//     { path: '/gallery', label: 'Gallery' },
//     { path: '/events', label: 'Events' },
//     { path: '/mandatory-public-disclosure', label: 'Mandatory Public Disclosure' },
//     { path: '/notifications-circular', label: 'Notifications & Circular' },
//     { path: '/contact', label: 'Contact Us' }
//   ];

//   const isAboutActive = location.pathname.startsWith('/about');

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-brand">
//           <Link to="/" onClick={closeMenu}>Mangala School</Link>
//         </div>
        
//         <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
//           <ul className="navbar-nav">
//             {navItems.map((item) => (
//               <li key={item.path} className="nav-item">
//                 {item.dropdown ? (
//                   <div className="dropdown">
//                     <button
//                       className={`nav-link dropdown-toggle ${isAboutActive ? 'active' : ''}`}
//                       onClick={toggleAboutDropdown}
//                     >
//                       {item.label}
//                       <span className={`dropdown-arrow ${isAboutDropdownOpen ? 'open' : ''}`}>▼</span>
//                     </button>
//                     <div className={`dropdown-menu ${isAboutDropdownOpen ? 'show' : ''}`}>
//                       {item.dropdown.map((subItem) => (
//                         <Link
//                           key={subItem.path}
//                           to={subItem.path}
//                           className={`dropdown-item ${location.pathname === subItem.path ? 'active' : ''}`}
//                           onClick={closeMenu}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link
//                     to={item.path}
//                     className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
//                     onClick={closeMenu}
//                   >
//                     {item.label}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="navbar-toggle" onClick={toggleMenu}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [logos, setLogos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await axios.get('/api/content');
      setLogos(response.data.logos || []);
    } catch (err) {
      console.error('Failed to fetch logos:', err);
    }
  };

  const getImageUrl = (imageData) => {
    if (!imageData || !imageData.imageId) return null;
    return `/api/image/${imageData.imageId}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
  };

  const toggleAboutDropdown = (e) => {
    e.preventDefault();
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.about-dropdown')) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    {
      path: '/about',
      label: 'About',
      dropdown: [
        { path: '/about/mangala-school', label: 'About Mangala School' },
        { path: '/about/leadership', label: 'Leadership' },
        { path: '/about/why-mangala-school', label: 'Why Mangala School' },
      ],
    },
    { path: '/tc', label: 'T.C.' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/academic-corner', label: 'Academic Corner' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/eventsnews', label: 'Events & News' },
    { path: '/mandatory-public-disclosure', label: 'Mandatory Public Disclosure' },
    { path: '/notifications-circular', label: 'Notifications & Circular' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <>
      {/* Logo + Social Top Bar */}
      <div className="w-full bg-gray-900 shadow px-4 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={getImageUrl(logo)}
              alt={`Logo ${index}`}
              className="h-10 w-10 object-cover rounded-full"
            />
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-xl hover:text-blue-800" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 text-xl hover:text-blue-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 text-xl hover:text-pink-700" />
          </a>
          <Link to="/admissions" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
            Apply Now
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-900 to-purple-700 bg-gray-900 text-white px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/" onClick={closeMenu}>Mangala School</Link>
          </div>
          <div className="md:hidden" onClick={toggleMenu}>
            <div className="space-y-1 cursor-pointer">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </div>
          <ul className={`md:flex space-x-6 hidden`}>
            {navItems.map((item) =>
              item.dropdown ? (
                <li className="relative about-dropdown" key={item.label}>
                  <button
                    className={`hover:text-yellow-400 cursor-pointer ${isAboutActive ? 'text-yellow-400' : ''}`}
                    onClick={toggleAboutDropdown}
                    onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  >
                    {item.label} ▼
                  </button>
                  {isAboutDropdownOpen && (
                    <ul 
                      className="absolute bg-white text-black shadow-lg mt-2 rounded z-50 min-w-[200px]"
                      onMouseLeave={() => setIsAboutDropdownOpen(false)}
                    >
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                            onClick={closeMenu}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`hover:text-yellow-400 ${location.pathname === item.path ? 'text-yellow-400' : ''}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button 
                    onClick={toggleAboutDropdown} 
                    className="block w-full text-left hover:text-yellow-400"
                  >
                    {item.label} {isAboutDropdownOpen ? '▲' : '▼'}
                  </button>
                  {isAboutDropdownOpen && (
                    <ul className="pl-4 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            onClick={closeMenu}
                            className="block py-1 hover:text-yellow-400"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    onClick={closeMenu} 
                    className="block hover:text-yellow-400"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;