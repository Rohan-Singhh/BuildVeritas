import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, Building2, LogOut, Users, LifeBuoy, Rocket, BookOpen, Star } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePageTransition } from "../hooks/usePageTransition";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { navigateWithTransition } = usePageTransition();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const scrollToSection = useCallback((sectionId) => {
    // If not on home page, navigate to home page with section parameter
    if (location.pathname !== '/') {
      navigateWithTransition('/?section=' + sectionId);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);

    // Check for section parameter in URL when landing on homepage
    if (location.pathname === '/' && location.search) {
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (section) {
        setTimeout(() => {
          scrollToSection(section);
        }, 100);
      }
    }
  }, [location, scrollToSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'} border-b-2 border-blue-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-1 md:space-x-3">
            <div className="flex-shrink-0">
              {/* <Building2 className="h-8 w-8" /> */}
              <img src="/BV2.svg" alt="BV" className="w-9 h-9 md:w-11 md:h-10" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              <span className="text-blue-400">Build</span>
              <span className="text-gray-800">Veritas</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                to="/features"
                className="group inline-flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 text-sm font-bold transition-all duration-200"
              >
                <Rocket className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-12" />
                Features
              </Link>

                             <button
                 onClick={() => scrollToSection('pricing')}
                 className="group inline-flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 text-sm font-bold transition-all duration-200"
               >
                 Pricing
               </button>

              <Link
                to="/about"
                className="group inline-flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 text-sm font-bold transition-all duration-200"
              >
                <Users className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-12" />
                About
              </Link>

              <Link
                to="/contact"
                className="group inline-flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 text-sm font-bold transition-all duration-200"
              >
                <LifeBuoy className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-12" />
                Contact
              </Link>

              <Link
                to="/blogs"
                className="group inline-flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 text-sm font-bold transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-12" />
                Blogs
              </Link>

              <button
                onClick={() => scrollToSection('testimonials')}
                className="group inline-flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 text-sm font-bold transition-all duration-200"
              >
                <Star className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-12" />
                Testimonials
              </button>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigateWithTransition("/login")}
                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-400 focus:outline-none focus:text-blue-400"
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
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-blue-200">
                <Link
                  to="/features"
                  className="group flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Rocket className="w-5 h-5 mr-3 transition-transform group-hover:-rotate-12" />
                  Features
                </Link>

                                 <button
                   className="group flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                   onClick={() => {
                     scrollToSection('pricing');
                     setIsMenuOpen(false);
                   }}
                 >
                   Pricing
                 </button>

                <Link
                  to="/about"
                  className="group flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5 mr-3 transition-transform group-hover:-rotate-12" />
                  About
                </Link>

                <Link
                  to="/contact"
                  className="group flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LifeBuoy className="w-5 h-5 mr-3 transition-transform group-hover:-rotate-12" />
                  Contact
                </Link>

                <Link
                  to="/blogs"
                  className="group flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5 mr-3 transition-transform group-hover:-rotate-12" />
                  Blogs
                </Link>

                <button
                  className="group flex items-center text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                  onClick={() => {
                    scrollToSection('testimonials');
                    setIsMenuOpen(false);
                  }}
                >
                  <Star className="w-5 h-5 mr-3 transition-transform group-hover:-rotate-12" />
                  Testimonials
                </button>
              {isAuthenticated() ? (
                <div className="pt-4 space-y-2">
                  <Link
                    to="/dashboard"
                    className="block text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4">
                  <button
                    onClick={() => {
                      navigateWithTransition("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
