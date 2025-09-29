import { useEffect, useRef } from "react";
import {
  X,
  Download,
  DollarSign,
  CheckCircle,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ModalProjectAnalytics = ({ project, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // Scroll modal into view when opened
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Mock detailed progress data for different sections
  const sectionProgress = [
    {
      section: "Foundation",
      progress: 100,
      status: "completed",
      color: "#10B981",
    },
    {
      section: "Structure",
      progress: 91,
      status: "in-progress",
      color: "#3B82F6",
    },
    {
      section: "Roofing",
      progress: 65,
      status: "in-progress",
      color: "#F59E0B",
    },
    {
      section: "Electrical",
      progress: 47,
      status: "pending",
      color: "#EF4444",
    },
    { section: "Plumbing", progress: 23, status: "pending", color: "#EF4444" },
    { section: "Interior", progress: 10, status: "pending", color: "#6B7280" },
    { section: "Exterior", progress: 7, status: "pending", color: "#6B7280" },
  ];

  // Performance metrics
  const performanceMetrics = {
    avgCompletion: Math.round(
      sectionProgress.reduce((sum, section) => sum + section.progress, 0) /
        sectionProgress.length
    ),
    onTimeDelivery: 87,
    qualityScore: 92,
    safetyScore: 95,
    budgetEfficiency: 89,
  };

  // Budget allocation data
  const budgetAllocation = [
    { category: "Materials", amount: 45, color: "#3B82F6" },
    { category: "Labor", amount: 30, color: "#10B981" },
    { category: "Equipment", amount: 15, color: "#F59E0B" },
    { category: "Permits", amount: 5, color: "#8B5CF6" },
    { category: "Contingency", amount: 5, color: "#EF4444" },
  ];

  // Reports data
  const reports = [
    {
      name: "Weekly Progress Report",
      type: "PDF",
      date: "2024-01-15",
      size: "2.3 MB",
      icon: BarChart3,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Material Usage Report",
      type: "Excel",
      date: "2024-01-14",
      size: "1.8 MB",
      icon: PieChart,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Budget Analysis Report",
      type: "PDF",
      date: "2024-01-13",
      size: "3.1 MB",
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Safety Inspection Report",
      type: "PDF",
      date: "2024-01-12",
      size: "1.5 MB",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Quality Assessment Report",
      type: "PDF",
      date: "2024-01-11",
      size: "2.7 MB",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "Timeline Analysis Report",
      type: "Excel",
      date: "2024-01-10",
      size: "2.1 MB",
      icon: Calendar,
      color: "bg-teal-100 text-teal-600",
    },
  ];

  const handleDownload = (reportName) => {
    // Mock download functionality
    console.log(`Downloading ${reportName}...`);
    // In a real app, this would trigger the actual download
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
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {project.name} - Analytics
              </h2>
              <p className="text-gray-600 mt-1">
                Detailed project performance and progress tracking
              </p>
            </div>
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
          style={{ maxHeight: "calc(90vh - 160px)" }}
        >
          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-900">
                  {performanceMetrics.avgCompletion}%
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Avg Completion
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="text-center">
                <div className="text-xl font-bold text-green-900">
                  {performanceMetrics.onTimeDelivery}%
                </div>
                <div className="text-sm text-green-600 font-medium">
                  On-Time Delivery
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="text-center">
                <div className="text-xl font-bold text-orange-900">
                  {performanceMetrics.qualityScore}%
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  Quality Score
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-900">
                  {performanceMetrics.safetyScore}%
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  Safety Score
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-900">
                  {performanceMetrics.budgetEfficiency}%
                </div>
                <div className="text-sm text-indigo-600 font-medium">
                  Budget Efficiency
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Section Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Section Completion Progress
              </h3>
              <div className="space-y-4">
                {sectionProgress.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: section.color }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {section.section}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            section.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : section.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {section.status.replace("-", " ")}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {section.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${section.progress}%`,
                          backgroundColor: section.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Allocation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Budget Allocation
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={budgetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="amount"
                    >
                      {budgetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, entry) => [
                        `${value}%`,
                        entry.payload.category,
                      ]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {budgetAllocation.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.category} ({item.amount}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Project Reports
              </h3>
              <div className="text-sm text-gray-500">
                {reports.length} reports available
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report, index) => {
                const IconComponent = report.icon;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${report.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {report.type}
                      </span>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {report.name}
                    </h4>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>
                        {new Date(report.date).toLocaleDateString("en-IN")}
                      </span>
                      <span>{report.size}</span>
                    </div>

                    <button
                      onClick={() => handleDownload(report.name)}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProjectAnalytics;
