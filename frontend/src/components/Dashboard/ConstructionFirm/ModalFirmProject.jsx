import {
  Calendar,
  HardHat,
  IndianRupee,
  MapPin,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";

export const ModalFirmProject = ({ selectedProject, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // Scroll modal into view when opened
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white border-b border-gray-200 p-4 rounded-t-2xl animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProject.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 145px)" }}
        >
          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 animate-fade-in-up">
                <span
                  className={`px-3 py-1 rounded-full text-base font-medium border ${getStatusColor(
                    selectedProject.status
                  )}`}
                >
                  {selectedProject.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-base font-medium border ${getTypeColor(
                    selectedProject.type
                  )}`}
                >
                  {selectedProject.type}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-100">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-200">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span>{selectedProject.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-300">
                  <IndianRupee className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">
                    {selectedProject.budget}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 animate-fade-in-up delay-400">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Manager: {selectedProject.manager}</span>
                </div>
              </div>
            </div>

            {/* Right Side Divs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-6 border border-green-100 animate-fade-in-up delay-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Progress
                    </p>
                    <p className="text-xl font-bold text-green-900">
                      {selectedProject.progress}%
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 animate-fade-in-up delay-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Budget Used
                    </p>
                    <p className="text-xl font-bold text-purple-900">
                      {selectedProject.budgetUsed}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <IndianRupee className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 animate-fade-in-up delay-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Workers</p>
                    <p className="text-xl font-bold text-blue-900">
                      {selectedProject.workers}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 animate-fade-in-up delay-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      Engineers
                    </p>
                    <p className="text-xl font-bold text-orange-900">
                      {selectedProject.engineers}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <HardHat className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Project Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Timeline Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-fade-in-up">
              Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-4 animate-fade-in-up delay-100">
                <div className="text-sm text-green-600 font-medium mb-1">
                  Start Date
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(selectedProject.startDate)}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 animate-fade-in-up delay-200">
                <div className="text-sm text-blue-600 font-medium mb-1">
                  Expected Completion
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(selectedProject.expectedEndDate)}
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 animate-fade-in-up delay-300">
                <div className="text-sm text-orange-600 font-medium mb-1">
                  Client
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedProject.client}
                </div>
              </div>
            </div>
          </div>

          {/* Project Photos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-fade-in-up">
              Latest Photos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedProject.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={photo}
                    alt={`${selectedProject.name} photo ${index + 1}`}
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-${
                      (index + 1) * 100
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
