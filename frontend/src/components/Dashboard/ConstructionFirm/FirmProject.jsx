import React, { useState, useMemo } from "react";
import {
  Users,
  MapPin,
  Calendar,
  Eye,
  X,
  User,
  TrendingUp,
  HardHat,
  IndianRupee,
} from "lucide-react";
import { projects } from "../../../constants/Dashboard/Projects";
import { SummaryCards } from "./SummaryCards";
import { ModalFirmProject } from "./ModalFirmProject";

const FirmProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const itemsPerPage = 5;

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesType = typeFilter === "all" || project.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "On Hold":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Residential":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Commercial":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Infrastructure":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <p className="text-gray-600">
            Monitor and manage all your construction projects
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Filters Section */}
        <div className="max-w-4xl mx-auto mb-6 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
              <input
                type="text"
                placeholder="Search projects by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-500 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-7.5 h-7.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div className="min-w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md"
              >
                <option value="all">All Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="min-w-48">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md"
              >
                <option value="all">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-gray-900">
              Projects ({filteredProjects.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className={`p-6 hover:bg-gray-50 transition-colors animate-fade-in-up delay-${
                  project.id * 100
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                    {/* Project Name */}
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                            project.type
                          )}`}
                        >
                          {project.type}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        {formatDate(project.startDate)} - {" "}
                        {formatDate(project.expectedEndDate)}
                      </span>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <IndianRupee className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {project.budget}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {project.progress}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300 animate-progress-bar"
                          style={{
                            width: `${project.progress}%`,
                            "--progress": `${project.progress}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer ml-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredProjects.length)}{" "}
                of {filteredProjects.length} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedProject && (
          // <div className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          //   <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          //     {/* Modal Header */}
          //     <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl animate-fade-in-up">
          //       <div className="flex items-center justify-between">
          //         <h2 className="text-2xl font-bold text-gray-900">
          //           {selectedProject.name}
          //         </h2>
          //         <button
          //           onClick={() => setSelectedProject(null)}
          //           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          //         >
          //           <X className="h-6 w-6" />
          //         </button>
          //       </div>
          //     </div>

          //     {/* Modal Content */}
          //     <div className="p-6">
          //       {/* Project Info Grid */}
          //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          //         <div className="space-y-4">
          //           <div className="flex items-center gap-3  animate-fade-in-up">
          //             <span
          //               className={`px-3 py-1 rounded-full text-base font-medium border ${getStatusColor(
          //                 selectedProject.status
          //               )}`}
          //             >
          //               {selectedProject.status}
          //             </span>
          //             <span
          //               className={`px-3 py-1 rounded-full text-base font-medium border ${getTypeColor(
          //                 selectedProject.type
          //               )}`}
          //             >
          //               {selectedProject.type}
          //             </span>
          //           </div>

          //           <div className="space-y-3">
          //             <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-100">
          //               <MapPin className="h-5 w-5 text-blue-500" />
          //               <span>{selectedProject.location}</span>
          //             </div>
          //             <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-200">
          //               <Calendar className="h-5 w-5 text-blue-500" />
          //               <span>{selectedProject.timeline}</span>
          //             </div>
          //             <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-300">
          //               <IndianRupee className="h-5 w-5 text-blue-500" />
          //               <span className="font-semibold">
          //                 {selectedProject.budget}
          //               </span>
          //             </div>
          //             <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-400">
          //               <User className="h-5 w-5 text-blue-500" />
          //               <span>Manager: {selectedProject.manager}</span>
          //             </div>
          //           </div>
          //         </div>

          //         {/* <div className="space-y-4">
          //           <div className="bg-gray-50 rounded-lg p-4">
          //             <div className="flex items-center justify-between mb-2">
          //               <span className="text-sm font-medium text-gray-600">
          //                 Progress
          //               </span>
          //               <span className="text-lg font-bold text-blue-600">
          //                 {selectedProject.progress}%
          //               </span>
          //             </div>
          //             <div className="w-full bg-gray-200 rounded-full h-3">
          //               <div
          //                 className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          //                 style={{ width: `${selectedProject.progress}%` }}
          //               ></div>
          //             </div>
          //           </div>

          //           <div className="grid grid-cols-2 gap-4">
          //             <div className="bg-blue-50 rounded-lg p-4 text-center">
          //               <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          //               <div className="text-2xl font-bold text-blue-600">
          //                 {selectedProject.workers}
          //               </div>
          //               <div className="text-sm text-gray-600">Workers</div>
          //             </div>
          //             <div className="bg-orange-50 rounded-lg p-4 text-center">
          //               <HardHat className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          //               <div className="text-2xl font-bold text-orange-600">
          //                 {selectedProject.engineers}
          //               </div>
          //               <div className="text-sm text-gray-600">Engineers</div>
          //             </div>
          //           </div>
          //         </div> */}
          //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          //           <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          //             <div className="flex items-center justify-between">
          //               <div>
          //                 <p className="text-sm font-medium text-green-600">
          //                   Progress
          //                 </p>
          //                 <p className="text-2xl font-bold text-green-900">
          //                   {selectedProject.progress}%
          //                 </p>
          //               </div>
          //               <div className="bg-green-100 p-3 rounded-full">
          //                 <TrendingUp className="h-6 w-6 text-green-600" />
          //               </div>
          //             </div>
          //           </div>

          //           <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          //             <div className="flex items-center justify-between">
          //               <div>
          //                 <p className="text-sm font-medium text-purple-600">
          //                   Budget Used
          //                 </p>
          //                 <p className="text-lg font-bold text-purple-900">
          //                   {selectedProject.budgetUsed}
          //                 </p>
          //               </div>
          //               <div className="bg-purple-100 p-3 rounded-full">
          //                 <IndianRupee className="h-6 w-6 text-purple-600" />
          //               </div>
          //             </div>
          //           </div>

          //           <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          //             <div className="flex items-center justify-between">
          //               <div>
          //                 <p className="text-sm font-medium text-blue-600">
          //                   Workers
          //                 </p>
          //                 <p className="text-2xl font-bold text-blue-900">
          //                   {selectedProject.workers}
          //                 </p>
          //               </div>
          //               <div className="bg-blue-100 p-3 rounded-full">
          //                 <Users className="h-6 w-6 text-blue-600" />
          //               </div>
          //             </div>
          //           </div>

          //           <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
          //             <div className="flex items-center justify-between">
          //               <div>
          //                 <p className="text-sm font-medium text-orange-600">
          //                   Engineers
          //                 </p>
          //                 <p className="text-2xl font-bold text-orange-900">
          //                   {selectedProject.engineers}
          //                 </p>
          //               </div>
          //               <div className="bg-orange-100 p-3 rounded-full">
          //                 <HardHat className="h-6 w-6 text-orange-600" />
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>

          //       {/* Description */}
          //       <div className="mb-8">
          //         <h3 className="text-lg font-semibold text-gray-900 mb-3">
          //           Project Description
          //         </h3>
          //         <p className="text-gray-600 leading-relaxed">
          //           {selectedProject.description}
          //         </p>
          //       </div>

          //       {/* Timeline Details */}
          //       <div className="mb-8">
          //         <h3 className="text-lg font-semibold text-gray-900 mb-4">
          //           Timeline
          //         </h3>
          //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          //           <div className="bg-green-50 rounded-lg p-4">
          //             <div className="text-sm text-green-600 font-medium mb-1">
          //               Start Date
          //             </div>
          //             <div className="text-lg font-semibold text-gray-900">
          //               {new Date(selectedProject.startDate).toLocaleDateString(
          //                 "en-IN"
          //               )}
          //             </div>
          //           </div>
          //           <div className="bg-blue-50 rounded-lg p-4">
          //             <div className="text-sm text-blue-600 font-medium mb-1">
          //               Expected End
          //             </div>
          //             <div className="text-lg font-semibold text-gray-900">
          //               {new Date(
          //                 selectedProject.expectedEndDate
          //               ).toLocaleDateString("en-IN")}
          //             </div>
          //           </div>
          //           <div className="bg-orange-50 rounded-lg p-4">
          //             <div className="text-sm text-orange-600 font-medium mb-1">
          //               Client
          //             </div>
          //             <div className="text-lg font-semibold text-gray-900">
          //               {selectedProject.client}
          //             </div>
          //           </div>
          //         </div>
          //       </div>

          //       {/* Project Photos */}
          //       <div>
          //         <h3 className="text-lg font-semibold text-gray-900 mb-4">
          //           Latest Photos
          //         </h3>
          //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          //           {selectedProject.photos.map((photo, index) => (
          //             <div
          //               key={index}
          //               className="aspect-video rounded-lg overflow-hidden"
          //             >
          //               <img
          //                 src={photo}
          //                 alt={`${selectedProject.name} photo ${index + 1}`}
          //                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          //               />
          //             </div>
          //           ))}
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <ModalFirmProject
            selectedProject={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default FirmProject;
