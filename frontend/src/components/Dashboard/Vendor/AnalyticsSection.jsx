import React, { useState } from "react";
import {
  TrendingUp,
  Package,
  Eye,
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  Award,
  Target,
  FileText,
  PieChart,
  Activity,
  Star,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import ModalAnalytics from "./ModalAnalytics";
import ModalProjectAnalytics from "./ModalProjectAnalytics";

const Analytics = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const topSellingItems = [
    {
      id: "1",
      name: "Portland Cement",
      category: "Cement",
      totalStock: 500,
      soldLastMonth: 234,
      soldLastYear: 2840,
      revenue: 28400,
      growth: 12.5,
      image:
        "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: {
        basic: { price: 8, sold: 89, stock: 200 },
        standard: { price: 12, sold: 145, stock: 180 },
        premium: { price: 18, sold: 67, stock: 120 },
      },
    },
    {
      id: "2",
      name: "Steel Rods",
      category: "Steel",
      totalStock: 800,
      soldLastMonth: 189,
      soldLastYear: 2267,
      revenue: 45340,
      growth: 8.3,
      image:
        "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: {
        basic: { price: 15, sold: 67, stock: 300 },
        standard: { price: 20, sold: 122, stock: 280 },
        premium: { price: 28, sold: 45, stock: 220 },
      },
    },
    {
      id: "3",
      name: "Premium Paint",
      category: "Paint",
      totalStock: 300,
      soldLastMonth: 145,
      soldLastYear: 1740,
      revenue: 34800,
      growth: -3.2,
      image:
        "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: {
        basic: { price: 25, sold: 45, stock: 100 },
        standard: { price: 35, sold: 78, stock: 120 },
        premium: { price: 50, sold: 22, stock: 80 },
      },
    },
    {
      id: "4",
      name: "Ceramic Tiles",
      category: "Tiles",
      totalStock: 1200,
      soldLastMonth: 98,
      soldLastYear: 1176,
      revenue: 23520,
      growth: 15.7,
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: {
        basic: { price: 12, sold: 34, stock: 400 },
        standard: { price: 18, sold: 64, stock: 450 },
        premium: { price: 28, sold: 28, stock: 350 },
      },
    },
    {
      id: "5",
      name: "Plumbing Pipes",
      category: "Plumbing",
      totalStock: 600,
      soldLastMonth: 76,
      soldLastYear: 912,
      revenue: 18240,
      growth: 6.8,
      image:
        "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: {
        basic: { price: 8, sold: 28, stock: 200 },
        standard: { price: 12, sold: 48, stock: 220 },
        premium: { price: 18, sold: 18, stock: 180 },
      },
    },
    {
      id: "6",
      name: "Electrical Wire",
      category: "Electrical",
      totalStock: 400,
      soldLastMonth: 67,
      soldLastYear: 804,
      revenue: 16080,
      growth: 9.4,
      image:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: {
        basic: { price: 15, sold: 22, stock: 130 },
        standard: { price: 22, sold: 45, stock: 140 },
        premium: { price: 32, sold: 12, stock: 130 },
      },
    },
  ];

  const projectAnalytics = [
    {
      id: "1",
      name: "Downtown Commercial Complex",
      totalBudget: 2500000,
      usedBudget: 1625000,
      progress: 65,
      efficiency: 92,
      materialsUsed: 78,
      timeline: "8 months",
      status: "in-progress",
    },
    {
      id: "2",
      name: "Residential Housing Development",
      totalBudget: 1800000,
      usedBudget: 1800000,
      progress: 100,
      efficiency: 96,
      materialsUsed: 100,
      timeline: "12 months",
      status: "completed",
    },
    {
      id: "3",
      name: "City Bridge Renovation",
      totalBudget: 950000,
      usedBudget: 285000,
      progress: 30,
      efficiency: 78,
      materialsUsed: 35,
      timeline: "6 months",
      status: "hold",
    },
    {
      id: "4",
      name: "Shopping Mall Extension",
      totalBudget: 3200000,
      usedBudget: 1440000,
      progress: 45,
      efficiency: 88,
      materialsUsed: 52,
      timeline: "10 months",
      status: "in-progress",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
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

  const totalRevenue = topSellingItems.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const totalItemsSold = topSellingItems.reduce(
    (sum, item) => sum + item.soldLastMonth,
    0
  );
  const averageGrowth =
    topSellingItems.reduce((sum, item) => sum + item.growth, 0) /
    topSellingItems.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track performance, sales, and project analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-medium">
                  Revenue: {formatCurrency(totalRevenue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto py-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Items Sold</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalItemsSold.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {averageGrowth.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Projects
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    projectAnalytics.filter((p) => p.status === "in-progress")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Top Selling Items
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Analyze your best performing products
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Last 30 days</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {topSellingItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-200 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        item.growth >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.growth >= 0 ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      <span>{Math.abs(item.growth)}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.totalStock}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sold (Month)</p>
                      <p className="text-lg font-bold text-blue-600">
                        {item.soldLastMonth}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sold (Year)</p>
                      <p className="text-lg font-bold text-green-600">
                        {item.soldLastYear}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-lg font-bold text-purple-600">
                        {formatCurrency(item.revenue)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Analytics
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Detailed performance analysis for each project
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Performance Overview
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {projectAnalytics.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.replace("-", " ")}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">
                              Budget Used
                            </span>
                          </div>
                          <p className="font-bold text-gray-900">
                            {formatCurrency(project.usedBudget)}
                          </p>
                          <p className="text-xs text-gray-500">
                            of {formatCurrency(project.totalBudget)}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Target className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-600">
                              Progress
                            </span>
                          </div>
                          <p className="font-bold text-green-600">
                            {project.progress}%
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Activity className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-gray-600">
                              Efficiency
                            </span>
                          </div>
                          <p className="font-bold text-purple-600">
                            {project.efficiency}%
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Package className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-gray-600">
                              Materials
                            </span>
                          </div>
                          <p className="font-bold text-orange-600">
                            {project.materialsUsed}%
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Calendar className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-gray-600">
                              Timeline
                            </span>
                          </div>
                          <p className="font-bold text-red-600">
                            {project.timeline}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">
                            Project Completion
                          </span>
                          <span className="font-medium text-blue-600">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedItem && (
        <ModalAnalytics
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {selectedProject && (
        <ModalProjectAnalytics
          project={projectAnalytics.find((p) => p.id === selectedProject.id)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Analytics;
