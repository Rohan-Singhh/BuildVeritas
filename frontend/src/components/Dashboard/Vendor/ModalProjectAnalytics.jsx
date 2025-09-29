import { useEffect, useRef } from "react";
import {
  X,
  Download,
  PieChart,
  BarChart3,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  Activity,
  FileText,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
  Pie,
} from "recharts";

const ProjectAnalyticsModal = ({ project, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // Scroll modal into view when opened
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      //   style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Budget breakdown data
  const budgetData = [
    { name: "Materials", value: project.usedBudget * 0.45, color: "#3B82F6" },
    { name: "Labor", value: project.usedBudget * 0.35, color: "#10B981" },
    { name: "Equipment", value: project.usedBudget * 0.15, color: "#F59E0B" },
    { name: "Other", value: project.usedBudget * 0.05, color: "#EF4444" },
  ];

  // Progress timeline data
  const progressData = [
    { phase: "Planning", planned: 100, actual: 100, week: "Week 1-2" },
    { phase: "Foundation", planned: 100, actual: 100, week: "Week 3-6" },
    { phase: "Structure", planned: 100, actual: 95, week: "Week 7-12" },
    { phase: "Roofing", planned: 80, actual: 75, week: "Week 13-16" },
    { phase: "Interior", planned: 60, actual: 45, week: "Week 17-20" },
    { phase: "Finishing", planned: 30, actual: 15, week: "Week 21-24" },
  ];

  // Material usage over time
  const materialUsageData = [
    { month: "Jan", cement: 120, steel: 80, paint: 20, tiles: 40 },
    { month: "Feb", cement: 150, steel: 100, paint: 30, tiles: 60 },
    { month: "Mar", cement: 180, steel: 120, paint: 45, tiles: 80 },
    { month: "Apr", cement: 200, steel: 140, paint: 60, tiles: 100 },
    { month: "May", cement: 220, steel: 160, paint: 75, tiles: 120 },
    { month: "Jun", cement: 240, steel: 180, paint: 90, tiles: 140 },
  ];

  // Budget vs Actual spending
  const spendingData = [
    { month: "Jan", budget: 200000, actual: 185000 },
    { month: "Feb", budget: 400000, actual: 420000 },
    { month: "Mar", budget: 600000, actual: 580000 },
    { month: "Apr", budget: 800000, actual: 790000 },
    { month: "May", budget: 1000000, actual: 1050000 },
    { month: "Jun", budget: 1200000, actual: 1180000 },
  ];

  //   const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  const reports = [
    {
      name: "Material Usage Report",
      description: "Detailed breakdown of all materials used in the project",
      icon: Package,
      size: "2.4 MB",
      lastUpdated: "2 hours ago",
    },
    {
      name: "Budget Analysis Report",
      description: "Comprehensive financial analysis and cost breakdown",
      icon: DollarSign,
      size: "1.8 MB",
      lastUpdated: "1 day ago",
    },
    {
      name: "Quality Assessment Report",
      description: "Quality control metrics and inspection results",
      icon: CheckCircle,
      size: "3.2 MB",
      lastUpdated: "3 hours ago",
    },
    {
      name: "Progress Timeline Report",
      description: "Detailed timeline analysis and milestone tracking",
      icon: Calendar,
      size: "1.5 MB",
      lastUpdated: "5 hours ago",
    },
    {
      name: "Risk Assessment Report",
      description: "Identified risks and mitigation strategies",
      icon: AlertCircle,
      size: "2.1 MB",
      lastUpdated: "1 day ago",
    },
    {
      name: "Performance Metrics Report",
      description: "Overall project performance and efficiency analysis",
      icon: TrendingUp,
      size: "2.7 MB",
      lastUpdated: "6 hours ago",
    },
  ];

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

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 rounded-t-2xl border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h2>
              <span
                className={`inline-flex items-center mt-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  project.status
                )}`}
              >
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
        <div
          className="p-6 overflow-y-auto space-y-8"
          style={{ maxHeight: "calc(90vh - 160px)" }}
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Budget Used
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(project.usedBudget)}
                  </p>
                  <p className="text-xs text-gray-600">
                    of {formatCurrency(project.totalBudget)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Progress</p>
                  <p className="text-xl font-bold text-green-900">
                    {project.progress}%
                  </p>
                  <p className="text-xs text-gray-600">Completion</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Efficiency
                  </p>
                  <p className="text-xl font-bold text-purple-900">
                    {project.efficiency}%
                  </p>
                  <p className="text-xs text-gray-600">Performance</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-600 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Materials</p>
                  <p className="text-xl font-bold text-orange-900">
                    {project.materialsUsed}%
                  </p>
                  <p className="text-xs text-gray-600">Utilized</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Budget Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Budget Breakdown
                </h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="ml-14 grid grid-cols-2 gap-3">
                {budgetData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Progress vs Planned
                </h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-70">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <Tooltip cursor={false} />
                    <Legend />
                    <Bar dataKey="planned" fill="#94A3B8" name="Planned" />
                    <Bar dataKey="actual" fill="#3B82F6" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Material Usage Trend */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Material Usage Over Time
              </h3>
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Monthly consumption
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={materialUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="cement"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                  />
                  <Area
                    type="monotone"
                    dataKey="steel"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                  />
                  <Area
                    type="monotone"
                    dataKey="paint"
                    stackId="1"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                  />
                  <Area
                    type="monotone"
                    dataKey="tiles"
                    stackId="1"
                    stroke="#EF4444"
                    fill="#EF4444"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget vs Actual Spending */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Budget vs Actual Spending
              </h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Monthly comparison
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#94A3B8"
                    strokeWidth={3}
                    name="Planned Budget"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Actual Spending"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Downloadable Reports */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Downloadable Reports
              </h3>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {reports.length} reports available
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <report.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {report.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{report.size}</span>
                        <span>Updated {report.lastUpdated}</span>
                      </div>
                      <button className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">On Track</span>
                </div>
                <p className="text-sm text-gray-600">
                  Project is {project.progress}% complete and maintaining good
                  efficiency at {project.efficiency}%
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Budget Status
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {((project.usedBudget / project.totalBudget) * 100).toFixed(
                    1
                  )}
                  % of budget utilized with{" "}
                  {formatCurrency(project.totalBudget - project.usedBudget)}{" "}
                  remaining
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Timeline</span>
                </div>
                <p className="text-sm text-gray-600">
                  {project.timeline} project duration with current progress
                  indicating on-time delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyticsModal;
