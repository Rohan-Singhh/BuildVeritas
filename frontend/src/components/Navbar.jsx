import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePageTransition } from "../hooks/usePageTransition";
import { NAV_ITEMS } from "../constants/navigation";

const NavItem = ({ item, onClick, isMobile }) => {
  const baseClasses = `group inline-flex items-center text-gray-700 hover:text-blue-400 transition-all duration-200 ${
    isMobile
      ? "px-3 py-2 rounded-md text-base font-medium w-full"
      : "px-2 lg:px-3 py-2 text-xs lg:text-sm font-bold whitespace-nowrap"
  }`;

  const IconComponent = item.icon;
  const iconClasses = `${
    isMobile ? "w-5 h-5 mr-3" : "w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2"
  } transition-transform group-hover:-rotate-12`;

  if (item.type === "scroll") {
    return (
      <button onClick={onClick} className={baseClasses}>
        <IconComponent className={iconClasses} />
        {item.label}
      </button>
    );
  }

  return (
    <Link to={item.path} className={baseClasses} onClick={onClick}>
      <IconComponent className={iconClasses} />
      {item.label}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigateWithTransition } = usePageTransition();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const isDashboard = location.pathname.startsWith("/dashboard/");

  const scrollToSection = useCallback(
    (sectionId) => {
      // If not on home page, navigate to home page with section parameter
      if (location.pathname !== "/") {
        navigateWithTransition("/?section=" + sectionId);
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigateWithTransition]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);

    // Check for section parameter in URL when landing on homepage
    if (location.pathname === "/" && location.search) {
      const params = new URLSearchParams(location.search);
      const section = params.get("section");
      if (section) {
        setTimeout(() => {
          scrollToSection(section);
        }, 100);
      }
    }
  }, [location, scrollToSection]);

  const handleNavItemClick = (item) => {
    if (item.type === "scroll") {
      scrollToSection(item.scrollTo);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-white"
      } border-b-2 border-blue-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 xl:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3"
          >
            <div className="flex-shrink-0">
              <img
                src="/BV3.png"
                alt="BV"
                className="w-10 h-9 md:w-16 md:h-10"
              />
            </div>
            <div className="text-xl sm:text-xl lg:text-2xl font-bold text-gray-800">
              <span className="bg-gradient-to-t from-sky-700 via-sky-500 to-sky-100 bg-clip-text text-transparent">
                Build
              </span>
              <span className="bg-gradient-to-t from-orange-700 to-yellow-300 bg-clip-text text-transparent">
                Veritas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {!isDashboard && (
            <div className="hidden lg:block">
              <div className="flex items-center lg:space-x-1 xl:space-x-5 pt-2">
                {NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    onClick={() => handleNavItemClick(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2 lg:space-x-4 pt-1">
            {isAuthenticated() ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 lg:space-x-2 bg-blue-400 hover:bg-blue-500 text-white px-4 lg:px-6 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <LogOut className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => navigateWithTransition("/login")}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 lg:px-6 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile & Tablet menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-blue-200">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  onClick={() => handleNavItemClick(item)}
                  isMobile
                />
              ))}

              {isAuthenticated() ? (
                <div className="pt-4">
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
