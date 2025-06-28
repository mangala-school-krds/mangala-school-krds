// // src/components/Navbar.js
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const navItems = [
//     { path: '/', label: 'Home' },
//     // { path: '/examination', label: 'Examination' },
//     { path: '/about', label: 'About' },
//     { path: '/transfer', label: 'Transfer Certificate' },
//     { path: '/alumni', label: 'Alumni' },
//     { path: '/admission', label: 'Admission' },
//     { path: '/academic', label: 'Academic Corner' },
//     { path: '/gallery', label: 'Gallery' },
//     { path: '/events', label: 'Events' },
//     { path: '/result', label: 'Result' },
//     { path: '/contact', label: 'Contact us' }
//   ];

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-brand">
//           <Link to="/" onClick={closeMenu}>School Name</Link>
//         </div>
        
//         <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
//           <ul className="navbar-nav">
//             {navItems.map((item) => (
//               <li key={item.path} className="nav-item">
//                 <Link
//                   to={item.path}
//                   className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
//                   onClick={closeMenu}
//                 >
//                   {item.label}
//                 </Link>
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
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { 
      path: '/about', 
      label: 'About',
      dropdown: [
        { path: '/about/mangala-school', label: 'About Mangala School' },
        { path: '/about/leadership', label: 'Leadership' },
        { path: '/about/why-mangala-school', label: 'Why Mangala School' }
      ]
    },
    { path: '/tc', label: 'T.C.' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/academic-corner', label: 'Academic Corner' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/events', label: 'Events' },
    { path: '/mandatory-public-disclosure', label: 'Mandatory Public Disclosure' },
    { path: '/notifications-circular', label: 'Notifications & Circular' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>Mangala School</Link>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                {item.dropdown ? (
                  <div className="dropdown">
                    <button
                      className={`nav-link dropdown-toggle ${isAboutActive ? 'active' : ''}`}
                      onClick={toggleAboutDropdown}
                    >
                      {item.label}
                      <span className={`dropdown-arrow ${isAboutDropdownOpen ? 'open' : ''}`}>▼</span>
                    </button>
                    <div className={`dropdown-menu ${isAboutDropdownOpen ? 'show' : ''}`}>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`dropdown-item ${location.pathname === subItem.path ? 'active' : ''}`}
                          onClick={closeMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;