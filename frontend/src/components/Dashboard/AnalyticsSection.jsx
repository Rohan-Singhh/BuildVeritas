import {
  CheckCircle2,
  Download,
  FileText,
  FolderOpen,
  TrendingUp,
} from "lucide-react";
import { analyticsData } from "../../constants/Dashboard/AnalyticsData";
import { stepProgress } from "../../constants/Dashboard/StepProgress";
import { SummaryCards } from "./ConstructionFirm/SummaryCards";

export const AnalyticsSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Analytics Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {analyticsData.totalProjects}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">↗ 3 new this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {analyticsData.activeProjects}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Currently in progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {analyticsData.completedProjects}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">
            ↗ 2 completed this month
          </p>
        </div>
      </div> */}
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Project Progress Analytics
          </h3>
          <div className="space-y-4">
            {stepProgress.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "ongoing"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="font-medium text-gray-900">{step.step}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full animate-progress-bar ${
                        step.status === "completed"
                          ? "bg-green-500"
                          : step.status === "ongoing"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                      style={{ "--progress": `${step.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {step.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-400">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Performance Metrics
          </h3>
          <div className="space-y-14">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 relative">
                <svg
                  className="w-20 h-20 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray={`${analyticsData.avgCompletion}, 100`}
                    className="animate-progress-bar"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">
                    {analyticsData.avgCompletion}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Avg Completion
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 relative">
                <svg
                  className="w-20 h-20 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${analyticsData.onTimeDelivery}, 100`}
                    className="animate-progress-bar"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">
                    {analyticsData.onTimeDelivery}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                On-Time Delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Constructor Reports
          </h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "Weekly Progress Report",
              date: "Jan 15, 2024",
              type: "PDF",
              size: "2.4 MB",
            },
            {
              name: "Quality Inspection Report",
              date: "Jan 12, 2024",
              type: "PDF",
              size: "1.8 MB",
            },
            {
              name: "Material Usage Report",
              date: "Jan 10, 2024",
              type: "Excel",
              size: "856 KB",
            },
            {
              name: "Safety Compliance Report",
              date: "Jan 8, 2024",
              type: "PDF",
              size: "3.2 MB",
            },
            {
              name: "Budget Analysis Report",
              date: "Jan 5, 2024",
              type: "PDF",
              size: "1.5 MB",
            },
            {
              name: "Timeline Assessment",
              date: "Jan 3, 2024",
              type: "PDF",
              size: "2.1 MB",
            },
          ].map((report, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {report.type}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{report.date}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{report.size}</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
