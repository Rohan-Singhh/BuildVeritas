import { Bot } from "lucide-react";
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
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { CreateProjectForm } from "./CreateProjectForm";

const sidebarItems = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", icon: <MdOutlineDashboard /> },
      { label: "Add Project", icon: <FaPlus /> },
      { label: "Projects", icon: <FaProjectDiagram /> },
      { label: "Marketplace", icon: <FaStore /> },
      { label: "Analytics", icon: <FaChartBar /> },
      { label: "AI Budget Estimator", icon: <Bot /> },
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
      { label: "Upload Documents", icon: <FaUpload /> },
    ],
  },
];

export const Sidebar = ({ selected, setSelected }) => {
  const [showCreateProject, setShowCreateProject] = useState(false);

  const handleItemClick = (label) => {
    if (label === "Add Project") {
      setShowCreateProject(true);
    } else {
      setSelected(label);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      console.log("Project created successfully:", projectData);
      
      // Close the form
      setShowCreateProject(false);
      
      // Switch to Projects view
      setSelected("Projects");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <aside className="w-64 bg-gradient-to-tr from-blue-100 to-white border-r border-blue-200">
        <div className="py-6 px-4 mt-16 animate-fade-in-up">
          {sidebarItems.map((section) => (
          <div key={section.section} className="mb-4">
            <div className="text-xs font-semibold text-blue-600 mb-2">
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
                            ? "bg-blue-200 text-blue-600 font-semibold"
                            : "text-gary-700 hover:bg-blue-100 hover:text-blue-600"
                        }
                      `}
                    onClick={() => handleItemClick(item.label)}
                  >
                    <span
                      className={`mr-3 text-lg ${
                        isActive
                          ? "text-blue-500 font-semibold"
                          : "text-gray-700 group-hover:text-blue-500"
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
      {showCreateProject && (
        <CreateProjectForm
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </>
  );
};
