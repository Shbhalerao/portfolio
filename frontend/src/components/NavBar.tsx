// frontend/src/components/NavBar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hook to get current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition duration-300">
          Shubham
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg transition duration-300 transform hover:scale-105 relative
                ${location.pathname === link.path
                  ? 'text-blue-600 font-semibold' // Active link styling
                  : 'text-gray-700 hover:text-blue-600 hover:underline' /* Inactive link styling with hover underline */}
                ${link.name === 'Contact' ? 'font-semibold' : ''}
              `}
            >
              {link.name}
              {/* Active page underline */}
              {location.pathname === link.path && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-3/4 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-40">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 transition duration-300 w-full text-center
                    ${location.pathname === link.path ? 'text-blue-600 font-semibold' : ''}
                  `}
                  onClick={toggleMenu} // Close menu on link click
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
                {/* <Link
                    to="/admin/login"
                    className="block px-4 py-2 text-xl text-pastel-purple hover:bg-gray-100 transition duration-300 w-full text-center mt-4 border-t pt-4 border-gray-200"
                    onClick={toggleMenu}
                >
                    Admin Login
                </Link> */}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;