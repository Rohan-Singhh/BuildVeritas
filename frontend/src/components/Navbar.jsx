import React, { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-1 md:space-x-3">
            <div className="flex-shrink-0">
              {/* <Building2 className="h-8 w-8" /> */}
              <img src="/BV2.svg" alt="BV" className="w-9 h-9 md:w-11 md:h-10" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              <span className="text-yellow-500">Build</span>
              <span className="text-gray-800">Veritas</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200"
              >
                Contact
              </a>
              <a
                href="#blog"
                className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-yellow-500 focus:outline-none focus:text-yellow-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-yellow-200">
              <a
                href="#features"
                className="text-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="#blog"
                className="text-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <div className="pt-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
