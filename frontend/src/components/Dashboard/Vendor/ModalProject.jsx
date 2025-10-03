import { useEffect, useRef } from "react";
import {
  X,
  Calendar,
  MapPin,
  Building,
  Users,
  Package,
  Clock,
  TrendingUp,
  FileText,
  IndianRupee,
  DollarSign,
} from "lucide-react";

const ModalProject = ({ project, onClose, onBidClick, hasUserBid }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // Scroll modal into view when opened
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✅";
      case "in-progress":
        return "🔄";
      case "hold":
        return "⏸️";
      default:
        return "📋";
    }
  };


  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 rounded-t-xl border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h2>
              <span
                className={`inline-flex items-center px-3 py-1 mt-1 rounded-full text-xs font-medium border ${getStatusColor(
                  project.status
                )}`}
              >
                {getStatusIcon(project.status)}{" "}
                {project.status.replace("-", " ")}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        {/* <div className="max-h-[calc(90vh-120px)] "> */}
        <div
          className="p-6 space-y-8 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 142px)" }}
        >
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Description
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Project Type
                      </p>
                      <p className="text-sm text-gray-600">{project.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Client
                      </p>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Budget
                      </span>
                    </div>
                    <p className="text-xl font-bold text-blue-900 mt-1">
                      {formatCurrency(project.budget)}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                    </div>
                    <p className="text-xl font-bold text-green-900 mt-1">
                      {project.progress}%
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Location
                      </span>
                    </div>
                    <p className="text-sm font-bold text-purple-900 mt-1">
                      {project.city}, {project.state}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Timeline
                      </span>
                    </div>
                    <p className="text-sm font-bold text-orange-900 mt-1">
                      {project.timeline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Action Section */}
          {!hasUserBid ? (
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <DollarSign className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Ready to Win This Project?
                        </h3>
                        <p className="text-blue-100 text-lg">
                          Submit your competitive proposal and showcase your expertise
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-white/80 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Open for Bidding</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Competitive Market</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Quality Focused</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-8">
                    <button
                      onClick={() => onBidClick && onBidClick(project)}
                      className="group relative px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-blue-50"
                    >
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Submit Bid</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="p-4 bg-green-500 rounded-full">
                  <div className="w-8 h-8 text-white flex items-center justify-center">
                    ✓
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Bid Successfully Submitted!
                  </h3>
                  <p className="text-green-600 text-lg">
                    We'll review your proposal and get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Project Timeline
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Start Date:</span>
                  <span className="text-gray-600">
                    {formatDate(project.startDate)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">End Date:</span>
                  <span className="text-gray-600">
                    {formatDate(project.endDate)}
                  </span>
                </div>
              </div>
              {project.status === "in-progress" && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium text-blue-600">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Project Requirements
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Project Specifications</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{project.area || 'N/A'} sqft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Floors:</span>
                      <span className="font-medium">{project.floors || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{project.type}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Timeline & Budget</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{project.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium">{formatCurrency(project.budget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{project.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ModalProject;
