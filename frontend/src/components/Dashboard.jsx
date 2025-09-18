import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaProjectDiagram,
  FaStore,
  FaChartBar,
  FaPlus,
  FaUpload,
  FaBuilding,
  FaCog,
  FaUsers,
  FaCheckCircle,
  FaCamera,
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { DashboardMain } from "./Dashboard/DashboardMain";
import { ProjectSection } from "./Dashboard/ProjectSection";
import { MarketplaceSection } from "./Dashboard/MarketplaceSection";
import { AnalyticsSection } from "./Dashboard/AnalyticsSection";
import { ProfileSection } from "./Dashboard/ProfileSection";

const sidebarItems = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", icon: <MdOutlineDashboard /> },
      { label: "Projects", icon: <FaProjectDiagram /> },
      { label: "Marketplace", icon: <FaStore /> },
      { label: "Analytics", icon: <FaChartBar /> },
    ],
  },
  {
    section: "SITE MANAGEMENT",
    items: [
      // { label: "Add Site Update", icon: <FaCamera /> },
      { label: "Site Verification", icon: <FaCheckCircle /> },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      { label: "Profile", icon: <FaUsers /> },
      // { label: "Company Profile", icon: <FaBuilding /> },
      { label: "Settings", icon: <FaCog /> },
    ],
  },
  {
    section: "QUICK ACTIONS",
    items: [
      { label: "New Project", icon: <FaPlus /> },
      { label: "Upload Documents", icon: <FaUpload /> },
    ],
  },
];

const Dashboard = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Remove any dashboard-specific classes from body
    document.body.classList.remove("dashboard-active");
    // Reset scroll position
    window.scrollTo(0, 0);
    navigate("/");
  };

  // Add dashboard-specific class when mounted
  React.useEffect(() => {
    document.body.classList.add("dashboard-active");
    return () => {
      // Clean up when unmounting
      document.body.classList.remove("dashboard-active");
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div
      id="dashboard-container"
      className="flex min-h-screen bg-gray-50 relative"
    >
      {/* Top Navigation Bar */}
      <div className="absolute top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10">
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

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="py-6 px-4 mt-16 animate-fade-in-up">
          {sidebarItems.map((section) => (
            <div key={section.section} className="mb-4">
              <div className="text-xs font-semibold text-gray-500 mb-2">
                {section.section}
              </div>
              <ul>
                {section.items.map((item) => {
                  const isActive = selected === item.label;
                  return (
                    <li
                      key={item.label}
                      className={`group flex items-center cursor-pointer px-3 py-2 rounded-lg mb-1 transition-colors
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                        }
                      `}
                      onClick={() => setSelected(item.label)}
                    >
                      <span
                        className={`mr-3 text-lg ${
                          isActive
                            ? "text-blue-500 font-semibold"
                            : "text-gray-400 group-hover:text-blue-500"
                        }`}
                      >
                        {React.cloneElement(item.icon)}
                      </span>
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="p-8 mt-16 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-blue-600 mb-3">{selected}</h1>
          {selected === "Dashboard" && (
            <>
              <div className="text-gray-500 mb-4">
                Welcome to your dashboard
              </div>
              <DashboardMain />
            </>
          )}

          {selected === "Projects" && <ProjectSection />}

          {selected === "Marketplace" && (
            <>
              <p className="text-gray-500 mb-4">
                Discover verified construction professionals for your next
                project
              </p>
              <MarketplaceSection />
            </>
          )}

          {selected === "Analytics" && <AnalyticsSection />}

          {selected === "Profile" && <ProfileSection />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
