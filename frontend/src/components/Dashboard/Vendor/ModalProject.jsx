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
  CheckCircle,
  IndianRupee,
} from "lucide-react";

const ModalProject = ({ project, onClose }) => {
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

  // Sample delivery data
  const deliveries = [
    {
      item: "Portland Cement",
      quantity: "50 bags",
      date: "2024-01-20",
      status: "delivered",
    },
    {
      item: "Steel Rods",
      quantity: "200 pieces",
      date: "2024-01-18",
      status: "delivered",
    },
    {
      item: "Premium Paint",
      quantity: "30 gallons",
      date: "2024-01-25",
      status: "pending",
    },
    {
      item: "Ceramic Tiles",
      quantity: "500 sq ft",
      date: "2024-01-22",
      status: "delivered",
    },
  ];

  const totalDelivered = deliveries.filter(
    (d) => d.status === "delivered"
  ).length;
  const totalPending = deliveries.filter((d) => d.status === "pending").length;

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
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
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

          {/* Materials */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Required Materials
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {project.materials.map((material, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"
                >
                  <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-900">
                    {material}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Status */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delivery Status
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">
                    Delivered: {totalDelivered}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-gray-600">Pending: {totalPending}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {deliveries.map((delivery, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-white transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            delivery.status === "delivered"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {delivery.item}
                          </p>
                          <p className="text-sm text-gray-600">
                            {delivery.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {formatDate(delivery.date)}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            delivery.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {delivery.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
