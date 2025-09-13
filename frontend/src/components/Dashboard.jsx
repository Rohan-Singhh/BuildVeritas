import React, { useState } from "react";
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

  return (
    <div
      id="dashboard-container"
      className="flex min-h-screen bg-gray-50 py-16 animate-fade-in-up"
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="py-6 px-4">
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
        <main className="p-8">
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
