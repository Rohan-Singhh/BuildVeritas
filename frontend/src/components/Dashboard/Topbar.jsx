import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

export const Topbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Remove any dashboard-specific classes from body
    document.body.classList.remove("dashboard-active");

    window.scrollTo(0, 0); // Reset scroll position
    navigate("/");
  };

  return (
    <div className="absolute top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10 animate-fade-in">
      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
        <div className="flex-shrink-0">
          <img
            src="/BV_Logo.png"
            alt="BV"
            className="w-10 h-9 md:w-15 md:h-13"
          />
        </div>
        <div className="text-xl sm:text-xl lg:text-2xl font-bold text-gray-800 pt-2">
          <span className="text-blue-500">Build</span>
          <span className="text-gray-800">Veritas</span>
        </div>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <FaUserCircle className="w-7 h-7 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "User"}
          </span>
          <FaChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isProfileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fade-in-down">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <FaUserCircle className="w-4 h-4" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
