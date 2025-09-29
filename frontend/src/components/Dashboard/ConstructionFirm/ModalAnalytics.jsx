import { X, Users, Building2, Award, IndianRupee } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LabelList,
} from "recharts";

const ModalAnalytics = ({ projects, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // Scroll modal into view when opened
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Advanced analytics calculations
  const totalBudget = projects.reduce((sum, project) => {
    const budget = parseFloat(project.budget.replace(/[$M,]/g, ""));
    return sum + budget;
  }, 0);

  const completedProjects = projects.filter((p) => p.status === "Completed");
  const inProgressProjects = projects.filter((p) => p.status === "In Progress");
  //   const onHoldProjects = projects.filter((p) => p.status === "On Hold");

  const completionRate = Math.round(
    (completedProjects.length / projects.length) * 100
  );

  // Timeline analysis
  const timelineData = [
    {
      duration: "6-12 months",
      count: projects.filter((p) => parseInt(p.timeline) <= 12).length,
    },
    {
      duration: "12-24 months",
      count: projects.filter(
        (p) => parseInt(p.timeline) > 12 && parseInt(p.timeline) <= 24
      ).length,
    },
    {
      duration: "24-36 months",
      count: projects.filter(
        (p) => parseInt(p.timeline) > 24 && parseInt(p.timeline) <= 36
      ).length,
    },
    {
      duration: "36+ months",
      count: projects.filter((p) => parseInt(p.timeline) > 36).length,
    },
  ];

  // Progress distribution
  const progressRanges = [
    {
      range: "0-25%",
      count: projects.filter((p) => p.progress <= 25).length,
      color: "#EF4444",
    },
    {
      range: "26-50%",
      count: projects.filter((p) => p.progress > 25 && p.progress <= 50).length,
      color: "#F59E0B",
    },
    {
      range: "51-75%",
      count: projects.filter((p) => p.progress > 50 && p.progress <= 75).length,
      color: "#3B82F6",
    },
    {
      range: "76-100%",
      count: projects.filter((p) => p.progress > 75).length,
      color: "#10B981",
    },
  ];

  // Location analysis
  const locationData = projects.reduce((acc, project) => {
    const city = project.location.split(",")[1]?.trim() || project.location;
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const locationChartData = Object.entries(locationData).map(
    ([city, count]) => ({
      city,
      count,
    })
  );

  // Team size analysis
  const teamSizeData = projects.map((project) => ({
    fullName: project.name,
    name: project.name.substring(0, 15) + "...",
    workers: project.workers,
    engineers: project.engineers,
    total: project.workers + project.engineers,
  }));

  // Monthly progress simulation (mock data for demonstration)
  const monthlyProgress = [
    { month: "Jan", completed: 1, started: 2 },
    { month: "Feb", completed: 0, started: 1 },
    { month: "Mar", completed: 2, started: 1 },
    { month: "Apr", completed: 1, started: 3 },
    { month: "May", completed: 0, started: 1 },
    { month: "Jun", completed: 1, started: 0 },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Detailed Analytics Dashboard
              </h2>
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
          style={{ maxHeight: "calc(90vh - 145px)" }}
        >
          {/* Executive Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">
                    Total Portfolio Value
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    Rs {totalBudget.toFixed(1)}L
                  </p>
                </div>
                <IndianRupee className="h-7 w-7 text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">
                    Completion Rate
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {completionRate}%
                  </p>
                </div>
                <Award className="h-7 w-7 text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">
                    Active Projects
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {inProgressProjects.length}
                  </p>
                </div>
                <Building2 className="h-7 w-7 text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">
                    Total Workforce
                  </p>
                  <p className="text-2xl font-bold text-indigo-900">
                    {projects.reduce(
                      (sum, p) => sum + p.workers + p.engineers,
                      0
                    )}
                  </p>
                </div>
                <Users className="h-7 w-7 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Advanced Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Progress Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Progress Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressRanges}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {progressRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {progressRanges.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.range} ({item.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Duration Analysis
              </h3>
              <div className="h-68">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="duration" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      cursor={false}
                      formatter={(value) => {
                        return [`${value}`, "Project Count"];
                      }}
                    />
                    <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Location Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Projects by Location
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="city" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip cursor={false} />
                    <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Project Trends
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="started"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Started</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Size Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Team Size by Project
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamSizeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const fullName = payload[0].payload.fullName;
                        return (
                          <div className="bg-white p-2 shadow rounded border border-gray-200 text-sm">
                            <p className="font-semibold mb-2">{fullName}</p>
                            {payload.map((entry, index) => (
                              <p
                                key={`item-${index}`}
                                style={{ color: entry.color }}
                              >
                                {entry.name}: {entry.value}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="workers" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="engineers" stackId="a" fill="#F59E0B">
                    <LabelList
                      dataKey="total"
                      position="top"
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        fill: "#111827",
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Engineers</span>
              </div>
            </div>
          </div>

          {/* Project Performance Matrix */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Project Performance Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Project
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Budget
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Team Size
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {project.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.location}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.type === "Residential"
                              ? "bg-purple-100 text-purple-800"
                              : project.type === "Commercial"
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-teal-100 text-teal-800"
                          }`}
                        >
                          {project.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {project.budget}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">
                          {project.workers + project.engineers} total
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.workers}W, {project.engineers}E
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : project.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAnalytics;
