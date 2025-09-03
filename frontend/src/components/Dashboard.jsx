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

const sidebarItems = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", icon: <MdOutlineDashboard  /> },
      { label: "Projects", icon: <FaProjectDiagram /> },
      { label: "Marketplace", icon: <FaStore /> },
      { label: "Analytics", icon: <FaChartBar /> },
    ],
  },
  {
    section: "SITE MANAGEMENT",
    items: [
      { label: "Add Site Update", icon: <FaCamera /> },
      { label: "Site Verification", icon: <FaCheckCircle /> },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      { label: "User Management", icon: <FaUsers /> },
      { label: "Company Profile", icon: <FaBuilding /> },
      { label: "Settings", icon: <FaCog /> },
    ],
  },
  {
    section: "QUICK ACTIONS",
    items: [
      { label: "Create Project", icon: <FaPlus /> },
      { label: "Upload Documents", icon: <FaUpload /> },
    ],
  },
];

import { useEffect } from 'react';
import '../styles/animations.css';

const Dashboard = () => {
  useEffect(() => {
    // Add animation class when component mounts
    const element = document.getElementById('dashboard-container');
    element.classList.add('page-enter');
    
    // Start animation after a small delay
    setTimeout(() => {
      element.classList.add('page-enter-active');
    }, 10);

    // Cleanup
    return () => {
      element.classList.remove('page-enter', 'page-enter-active');
    };
  }, []);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div id="dashboard-container" className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="py-6 px-4">
          {/* <h2 className="text-xl font-bold text-gray-900 mb-6">BuildVeritas</h2> */}
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
                      className={`flex items-center cursor-pointer px-3 py-2 rounded-lg mb-1 transition-colors
                        ${
                          isActive
                            ? "bg-yellow-50 text-yellow-600 font-semibold"
                            : "text-gray-800 hover:bg-yellow-50 hover:text-yellow-600"
                        }
                      `}
                      onClick={() => setSelected(item.label)}
                    >
                      <span
                        className={`mr-3 text-lg ${
                          isActive
                            ? "text-yellow-500"
                            : "text-gray-400 group-hover:text-yellow-500"
                        }`}
                      >
                        {React.cloneElement(item.icon, {
                          color: isActive ? "#FACC15" : "#A3A3A3",
                        })}
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{selected}</h1>
          <div className="text-gray-500">
            Welcome to your dashboard.
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
