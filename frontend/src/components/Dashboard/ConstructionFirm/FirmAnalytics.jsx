import { useState } from "react";
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
  Legend,
  LabelList,
} from "recharts";
import {
  TrendingUp,
  Users,
  Clock,
  MapPin,
  Eye,
  IndianRupee,
} from "lucide-react";
import ModalProjectAnalytics from "./ModalProjectAnalytics";
import { projects } from "../../../constants/Dashboard/Projects";
import ModalAnalytics from "./ModalAnalytics";

const FirmAnalytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Calculate analytics data
  const totalBudget = projects.reduce((sum, project) => {
    const budget = parseFloat(project.budget.replace(/L/g, ""));
    return sum + budget;
  }, 0);

  const totalWorkers = projects.reduce(
    (sum, project) => sum + project.workers,
    0
  );
  const totalEngineers = projects.reduce(
    (sum, project) => sum + project.engineers,
    0
  );

  // Status distribution for pie chart
  const statusData = [
    {
      name: "In Progress",
      value: projects.filter((p) => p.status === "In Progress").length,
      color: "#3B82F6",
    },
    {
      name: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
      color: "#10B981",
    },
    {
      name: "On Hold",
      value: projects.filter((p) => p.status === "On Hold").length,
      color: "#F59E0B",
    },
  ];

  // Combined data for both budget and project count
  const combinedData = [
    {
      name: "Residential",
      count: projects.filter((p) => p.type === "Residential").length,
      budget: projects
        .filter((p) => p.type === "Residential")
        .reduce((sum, p) => sum + parseFloat(p.budget.replace(/[L,]/g, "")), 0),
    },
    {
      name: "Commercial",
      count: projects.filter((p) => p.type === "Commercial").length,
      budget: projects
        .filter((p) => p.type === "Commercial")
        .reduce((sum, p) => sum + parseFloat(p.budget.replace(/[L,]/g, "")), 0),
    },
    {
      name: "Infrastructure",
      count: projects.filter((p) => p.type === "Infrastructure").length,
      budget: projects
        .filter((p) => p.type === "Infrastructure")
        .reduce((sum, p) => sum + parseFloat(p.budget.replace(/[L,]/g, "")), 0),
    },
  ];

  // Team size analysis
  const teamSizeData = projects.map((project) => ({
    fullName: project.name,
    name: project.name.substring(0, 15) + "...",
    workers: project.workers,
    engineers: project.engineers,
    total: project.workers + project.engineers,
  }));

  // const manpowerData = projects.map((p) => ({
  //   name: p.name,
  //   workers: p.workers,
  //   engineers: p.engineers,
  //   total: p.workers + p.engineers,
  // }));

  return (
    <div>
      {/* Analytics Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Comprehensive insights and performance metrics
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
        >
          <TrendingUp className="h-5 w-5" />
          View Detailed Analytics
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                Rs {totalBudget.toFixed(1)}L
              </p>
              <p className="text-green-600 text-sm font-medium mt-1">
                +12% from last quarter
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Workforce
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalWorkers + totalEngineers}
              </p>
              <p className="text-blue-600 text-sm font-medium mt-1">
                {totalWorkers} Workers, {totalEngineers} Engineers
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">On Schedule</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter((p) => p.status === "In Progress").length}
              </p>
              <p className="text-orange-600 text-sm font-medium mt-1">
                Active projects
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Project Status Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Status Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
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
          <div className="flex justify-center gap-6">
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

        {/* Combined - Projects by Type & Budget Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Projects & Budget Distribution by Type
          </h3>
          <div className="h-68">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Project Count",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Budget (L)",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip
                  cursor={false}
                  formatter={(value, name) => {
                    if (name === "count") return [`${value}`, "Project Count"];
                    if (name === "budget") return [`Rs ${value}L`, "Budget"];
                    return value;
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  fill="#3B82F6"
                  name="Project Count"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="budget"
                  fill="#10B981"
                  name="Budget (L)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* People Distribution */}
      {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Manforce Distribution by Project
        </h3>
        <div className="h-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={manpowerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={85}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip cursor={false} />
              <Legend />
              <Bar
                dataKey="workers"
                stackId="a"
                fill="#3B82F6"
                name="Workers"
              />
              <Bar
                dataKey="engineers"
                stackId="a"
                fill="#F97316"
                name="Engineers"
              >
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
      </div> */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Team Size by Project
        </h3>
        <div className="h-88">
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

      {/* Project List */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
          <p className="text-gray-600">{projects.length} projects</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Project Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-1">
                      {project.name}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Budget</div>
                    <div className="text-lg font-bold text-gray-900">
                      {project.budget}
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="text-right">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Modal */}
      {isModalOpen && (
        <ModalAnalytics
          projects={projects}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Project Analytics Modal */}
      {selectedProject && (
        <ModalProjectAnalytics
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default FirmAnalytics;
