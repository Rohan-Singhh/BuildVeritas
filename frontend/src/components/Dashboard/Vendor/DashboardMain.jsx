import {
  DollarSign,
  Package,
  Truck,
  ShoppingCart,
  Building,
  Users,
  BarChart3,
  Star,
  AlertCircle,
  Activity,
  ArrowUp,
  ArrowDown,
  FileText,
  IndianRupee,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Area,
  AreaChart,
  Pie,
} from "recharts";

export const DashboardMain = () => {
  // Key Performance Metrics
  const kpiData = {
    totalRevenue: 2847500,
    monthlyRevenue: 485600,
    revenueGrowth: 12.5,
    totalProjects: 24,
    activeProjects: 8,
    completedProjects: 14,
    projectsOnHold: 2,
    totalItems: 1245,
    itemsSold: 892,
    lowStockItems: 8,
    pendingDeliveries: 15,
    totalCustomers: 47,
    newCustomers: 6,
    customerSatisfaction: 94.2,
  };

  // Revenue trend data (last 6 months)
  const revenueData = [
    { month: "Jan", revenue: 420000, target: 400000 },
    { month: "Feb", revenue: 385000, target: 420000 },
    { month: "Mar", revenue: 445000, target: 430000 },
    { month: "Apr", revenue: 520000, target: 450000 },
    { month: "May", revenue: 485000, target: 470000 },
    { month: "Jun", revenue: 485600, target: 480000 },
  ];

  // Project status distribution
  const projectStatusData = [
    { name: "Completed", value: kpiData.completedProjects, color: "#10B981" },
    { name: "In Progress", value: kpiData.activeProjects, color: "#3B82F6" },
    { name: "On Hold", value: kpiData.projectsOnHold, color: "#F59E0B" },
  ];

  // Top selling categories
  const categoryData = [
    { name: "Cement", sales: 234, revenue: 28400, growth: 12.5 },
    { name: "Steel", sales: 189, revenue: 45340, growth: 8.3 },
    { name: "Paint", sales: 145, revenue: 34800, growth: -3.2 },
    { name: "Tiles", sales: 98, revenue: 23520, growth: 15.7 },
    { name: "Plumbing", sales: 76, revenue: 18240, growth: 6.8 },
  ];

  // Recent activity data
  const recentActivity = [
    {
      type: "order",
      message: "New order from Metro Construction LLC",
      time: "2 hours ago",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      type: "delivery",
      message: "Delivered 50 bags of cement to Green Homes",
      time: "4 hours ago",
      icon: Truck,
      color: "text-green-600",
    },
    {
      type: "project",
      message: "Downtown Complex project reached 65% completion",
      time: "6 hours ago",
      icon: Building,
      color: "text-purple-600",
    },
    {
      type: "stock",
      message: "Low stock alert: Premium Paint (23 units left)",
      time: "8 hours ago",
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      type: "payment",
      message: "Payment received from Retail Development Corp",
      time: "1 day ago",
      icon: DollarSign,
      color: "text-green-600",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back! Here's what's happening with your business
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-green-900 font-medium">
                  +{kpiData.revenueGrowth}% Growth
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Today's Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto py-2">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(kpiData.totalRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    {kpiData.revenueGrowth}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-200 rounded-lg">
                <IndianRupee className="w-5.5 h-5.5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Projects
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {kpiData.activeProjects}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">
                    of {kpiData.totalProjects} total projects
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-200 rounded-lg">
                <Building className="w-5.5 h-5.5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Items Sold</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(kpiData.itemsSold)}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">
                    of {formatNumber(kpiData.totalItems)} inventory
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-200 rounded-lg">
                <Package className="w-5.5 h-5.5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Customer Satisfaction
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {kpiData.customerSatisfaction}%
                </p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-gray-500">
                    {kpiData.totalCustomers} customers
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-200 rounded-lg">
                <Users className="w-5.5 h-5.5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Revenue Trend
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Monthly revenue vs targets (Last 6 months)
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Actual</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Target</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#94A3B8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Project Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Project Status
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Current project distribution
              </p>
            </div>
            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {projectStatusData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Selling Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Top Selling Categories
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Best performing product categories
                  </p>
                </div>
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <span className="text-lg font-bold text-blue-600">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.sales} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(category.revenue)}
                      </p>
                      <div
                        className={`flex items-center space-x-1 ${
                          category.growth >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {category.growth >= 0 ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        <span className="text-sm font-medium">
                          {Math.abs(category.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Latest updates and notifications
                  </p>
                </div>
                <Activity className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  const bgClass =
                    activity.type === "order"
                      ? "bg-blue-100"
                      : activity.type === "delivery"
                      ? "bg-green-100"
                      : activity.type === "project"
                      ? "bg-purple-100"
                      : activity.type === "stock"
                      ? "bg-orange-100"
                      : "bg-green-100";
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                    >
                      <div className={`p-2 rounded-lg ${bgClass}`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 text-center">
                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Actions
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Frequently used actions for faster workflow
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Package className="w-4 h-4 mr-2" />
                Add New Item
              </button>
              <button className="flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <Building className="w-4 h-4 mr-2" />
                Create Project
              </button>
              <button className="flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
