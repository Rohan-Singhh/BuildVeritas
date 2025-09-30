import {
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  Award,
  MapPin,
  Target,
  AlertTriangle,
  CheckCircle,
  IndianRupee,
  ArrowUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { projects } from "../../../constants/Dashboard/Projects";

const DashboardMain = () => {
  // Calculate overview metrics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(
    (p) => p.status === "In Progress"
  ).length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const onHoldProjects = projects.filter((p) => p.status === "On Hold").length;

  const totalBudget = projects.reduce((sum, project) => {
    const budget = parseFloat(project.budget.replace(/[$M,]/g, ""));
    return sum + budget;
  }, 0);

  const totalWorkforce = projects.reduce(
    (sum, project) => sum + project.workers + project.engineers,
    0
  );
  const avgProgress = Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) /
      projects.length
  );
  const completionRate = Math.round((completedProjects / totalProjects) * 100);

  // Revenue by project type
  const revenueByType = [
    {
      type: "Commercial",
      revenue: projects
        .filter((p) => p.type === "Commercial")
        .reduce(
          (sum, p) => sum + parseFloat(p.budget.replace(/[$M,]/g, "")),
          0
        ),
      color: "#3B82F6",
    },
    {
      type: "Residential",
      revenue: projects
        .filter((p) => p.type === "Residential")
        .reduce(
          (sum, p) => sum + parseFloat(p.budget.replace(/[$M,]/g, "")),
          0
        ),
      color: "#8B5CF6",
    },
    {
      type: "Infrastructure",
      revenue: projects
        .filter((p) => p.type === "Infrastructure")
        .reduce(
          (sum, p) => sum + parseFloat(p.budget.replace(/[$M,]/g, "")),
          0
        ),
      color: "#06B6D4",
    },
  ];

  // Monthly performance data (mock data for demonstration)
  const monthlyPerformance = [
    { month: "Jan", revenue: 12.5, projects: 2 },
    { month: "Feb", revenue: 8.3, projects: 1 },
    { month: "Mar", revenue: 15.7, projects: 3 },
    { month: "Apr", revenue: 22.1, projects: 2 },
    { month: "May", revenue: 18.9, projects: 1 },
    { month: "Jun", revenue: 25.4, projects: 2 },
  ];

  // Project status data for pie chart
  const statusData = [
    { name: "In Progress", value: activeProjects, color: "#3B82F6" },
    { name: "Completed", value: completedProjects, color: "#10B981" },
    { name: "On Hold", value: onHoldProjects, color: "#F59E0B" },
  ];

  // Top performing projects
  const topProjects = projects
    .sort(
      (a, b) =>
        parseFloat(b.budget.replace(/[$M,]/g, "")) -
        parseFloat(a.budget.replace(/[$M,]/g, ""))
    )
    .slice(0, 3);

  return (
    <div className="mb-8">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Portfolio Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalBudget.toFixed(1)}M
              </p>
              <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    +15%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    from last quarter
                  </span>
                </div>
              {/* <p className="text-gray-500 text-sm mt-1">
                +15% from last quarter
              </p> */}
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <IndianRupee className="w-5.5 h-5.5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Active Projects
              </p>
              <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
              <p className="text-gray-500 text-sm mt-1">
                {completionRate}% completion rate
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <Building2 className="w-5.5 h-5.5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Workforce
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalWorkforce}</p>
              <p className="text-gray-500 text-sm mt-1">
                Across all projects
              </p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <Users className="w-5.5 h-5.5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Avg Progress
              </p>
              <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
              <p className="text-gray-500 text-sm mt-1">Overall completion</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <Target className="w-5.5 h-5.5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue by Project Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue by Project Type
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="revenue"
                >
                  {revenueByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}M`, "Revenue"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {revenueByType.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Status Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Status Overview
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance */}
        {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Revenue Trend
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`$${value}M`, "Revenue"]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div> */}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Revenue Trend
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`$${value}M`, "Revenue"]} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Metrics and Top Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Business Health Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Business Health Metrics
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Project Completion Rate
                  </p>
                  <p className="text-sm text-gray-500">
                    On-time delivery performance
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {completionRate}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Revenue Growth</p>
                  <p className="text-sm text-gray-500">Quarterly growth rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">+15%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Projects at Risk</p>
                  <p className="text-sm text-gray-500">Requiring attention</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">
                  {onHoldProjects}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Client Satisfaction
                  </p>
                  <p className="text-sm text-gray-500">Average rating</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">4.8/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Projects */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Projects by Value
          </h3>
          <div className="space-y-4">
            {topProjects.map((project, index) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{project.budget}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{totalProjects}</div>
            <div className="text-blue-100 text-sm">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              ${totalBudget.toFixed(1)}M
            </div>
            <div className="text-blue-100 text-sm">Portfolio Value</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{totalWorkforce}</div>
            <div className="text-blue-100 text-sm">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">4.8★</div>
            <div className="text-blue-100 text-sm">Client Rating</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardMain;
