import { Bot, Menu, X } from "lucide-react";
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

export const Sidebar = ({ selected, setSelected, isCollapsed, setIsCollapsed }) => {
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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button - Only show when sidebar is closed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 md:hidden border-2 border-white hover:scale-105"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Overlay and Close Button - Only for small screens */}
      {!isCollapsed && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setIsCollapsed(true)}
          />
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="fixed top-6 right-6 z-50 bg-red-500 text-white p-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-200 md:hidden border-2 border-white hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-out ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      } ${isCollapsed ? 'w-16' : 'w-48'} shadow-xl`}>
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
          {!isCollapsed && (
            <h2 className="text-base font-semibold text-gray-800">Menu</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-200 hover:scale-105"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3">
          {sidebarItems.map((section) => (
            <div key={section.section} className="mb-4">
              {!isCollapsed && (
                <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.section}
                </div>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = selected === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => handleItemClick(item.label)}
                        className={`group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                        }`}
                        title={isCollapsed ? item.label : ''}
                      >
                        <span className={`flex-shrink-0 ${
                          isCollapsed ? 'mx-auto' : 'mr-3'
                        }`}>
                          {React.cloneElement(item.icon, {
                            className: `w-4 h-4 ${
                              isActive
                                ? "text-blue-600"
                                : "text-gray-500 group-hover:text-gray-700"
                            }`
                          })}
                        </span>
                        {!isCollapsed && (
                          <span className="truncate text-left text-sm">{item.label}</span>
                        )}
                        {isCollapsed && isActive && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                        )}
                      </button>
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
