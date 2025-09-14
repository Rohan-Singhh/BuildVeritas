import {
  Calendar,
  CheckCircle2,
  Clock,
  IndianRupee,
  MoveUpRight,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
import { projectData } from "../../constants/Dashboard/ProjectData";
// import { stepProgress } from "../../constants/Dashboard/StepProgress";
import { notifications } from "../../constants/Dashboard/Notifications";
import { budgetData, progressData } from "../../constants/Dashboard/GraphData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-500">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}${
              entry.dataKey.includes("utilization") ? "%" : ""
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DashboardMain = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Overall Progress
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {projectData.overallProgress}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-progress-bar"
                style={{ "--progress": "68%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Used</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{(projectData.usedBudget / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            of{" "}
            <span className="font-semibold">
              ₹{(projectData.totalBudget / 100000).toFixed(1)}L
            </span>{" "}
            total budget
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Completion Rate
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {projectData.completionRate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-green-600 mt-2 flex items-center gap-1">
            <MoveUpRight className="w-3.5 h-3.5" />
            <p className="text-sm">5% from last week</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Days Remaining
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {projectData.daysRemaining}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Expected: {projectData.expectedCompletion}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Step Progress */}
        {/* <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-400">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Project Progress
          </h3>
          <div className="space-y-4">
            {stepProgress.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
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
        </div> */}

        {/* Project Progress Chart */}
        <div className="lg:col-span-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-300/50 p-5 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-50">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Project Progress
              </h3>
              <p className="text-sm text-gray-500">
                Planned vs Actual Timeline
              </p>
            </div>
          </div>

          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb" // gray-200
                />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280" // gray-500
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                  name="Planned Progress (%)"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                  name="Actual Progress (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up delay-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Updates
          </h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    notification.type === "upload"
                      ? "bg-blue-100"
                      : notification.type === "work"
                      ? "bg-green-100"
                      : "bg-orange-100"
                  }`}
                >
                  <notification.icon
                    className={`w-4 h-4 ${
                      notification.type === "upload"
                        ? "text-blue-600"
                        : notification.type === "work"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Utilization */}
      {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 animate-fade-in-up delay-600">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Budget Utilization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray={`${
                    (projectData.usedBudget / projectData.totalBudget) * 100
                  }, 100`}
                  className="animate-progress-bar"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">
                  {Math.round(
                    (projectData.usedBudget / projectData.totalBudget) * 100
                  )}
                  %
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Budget Used</p>
            <p className="text-xs text-gray-500">
              ₹{(projectData.usedBudget / 100000).toFixed(1)}L used
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3bf676"
                  strokeWidth="2"
                  strokeDasharray={`${
                    ((projectData.totalBudget - projectData.usedBudget) /
                      projectData.totalBudget) *
                    100
                  }, 100`}
                  className="animate-progress-bar"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">
                  {Math.round(
                    ((projectData.totalBudget - projectData.usedBudget) /
                      projectData.totalBudget) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">
              Remaining Budget
            </p>
            <p className="text-xs text-gray-500">
              ₹
              {(
                (projectData.totalBudget - projectData.usedBudget) /
                100000
              ).toFixed(1)}
              L left
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <IndianRupee className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Total Budget</p>
            <p className="text-xs text-gray-500">
              ₹{(projectData.totalBudget / 100000).toFixed(1)}L allocated
            </p>
          </div>
        </div>
      </div> */}

      {/* Budget Allocation Chart */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-300/50 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-400/10">
            <IndianRupee className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Budget Allocation
            </h3>
            <p className="text-sm text-gray-500">Cost Distribution Breakdown</p>
          </div>
        </div>

        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={5}
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium text-gray-800">
                          {payload[0].payload.name}
                        </p>
                        <p className="text-sm text-blue-500">{`${payload[0].value}% of budget`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => (
                  <span
                    style={{ color: entry.color }}
                    className="text-sm font-medium"
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
