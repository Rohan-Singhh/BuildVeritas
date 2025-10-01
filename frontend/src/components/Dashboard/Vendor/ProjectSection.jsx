import { useState } from "react";
import {
  MapPin,
  DollarSign,
  Eye,
  Search,
  Building,
  Clock,
  Users,
  BarChart3,
} from "lucide-react";
import ModalProject from "./ModalProject";
import ItemsOverview from "./ItemsOverview";
import RecentOrders from "./RecentOrders";
import { SearchBar } from "../SearchBar";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: "1",
      name: "Downtown Commercial Complex",
      status: "in-progress",
      type: "Commercial Building",
      city: "Austin",
      state: "TX",
      timeline: "8 months",
      budget: 2500000,
      progress: 65,
      client: "Metro Construction LLC",
      description:
        "A modern 15-story commercial complex with retail spaces on ground floor and office spaces above.",
      startDate: "2024-01-15",
      endDate: "2024-09-15",
      materials: ["Cement", "Steel Rods", "Paint", "Tiles", "Glass"],
    },
    {
      id: "2",
      name: "Residential Housing Development",
      status: "completed",
      type: "Residential",
      city: "Houston",
      state: "TX",
      timeline: "12 months",
      budget: 1800000,
      progress: 100,
      client: "Green Homes Builder",
      description:
        "50-unit residential housing development with modern amenities and sustainable features.",
      startDate: "2023-06-01",
      endDate: "2024-06-01",
      materials: [
        "Cement",
        "Bricks",
        "Roofing Materials",
        "Paint",
        "Plumbing Supplies",
      ],
    },
    {
      id: "3",
      name: "City Bridge Renovation",
      status: "hold",
      type: "Infrastructure",
      city: "Dallas",
      state: "TX",
      timeline: "6 months",
      budget: 950000,
      progress: 30,
      client: "City of Dallas",
      description:
        "Complete renovation of the historic city bridge including structural reinforcement.",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      materials: ["Steel", "Concrete", "Waterproofing", "Safety Equipment"],
    },
    {
      id: "4",
      name: "Shopping Mall Extension",
      status: "in-progress",
      type: "Commercial",
      city: "San Antonio",
      state: "TX",
      timeline: "10 months",
      budget: 3200000,
      progress: 45,
      client: "Retail Development Corp",
      description:
        "Extension of existing shopping mall with additional retail spaces and parking structure.",
      startDate: "2024-03-01",
      endDate: "2025-01-01",
      materials: ["Cement", "Steel", "Glass", "Tiles", "Electrical Supplies"],
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

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm} // called debounced
          onSearch={(term) => setSearchTerm(term)} // immediate on Enter / Search click
          placeholder="Search projects..."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in-up delay-200">
              {/* <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Project Management
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Track and manage your ongoing construction projects
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setFilterStatus("all")}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          filterStatus === "all"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilterStatus("in-progress")}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          filterStatus === "in-progress"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setFilterStatus("completed")}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          filterStatus === "completed"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => setFilterStatus("hold")}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          filterStatus === "hold"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        On Hold
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="p-6">
                <div className="grid gap-6">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 border border-gray-100"
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
                              {getStatusIcon(project.status)}{" "}
                              {project.status.replace("-", " ")}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-xs text-gray-600">
                              <Building className="w-4 h-4 mr-2 text-blue-500" />
                              <span>{project.type}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                              <span>
                                {project.city}, {project.state}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-blue-500" />
                              <span>{project.timeline}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                              <span>{formatCurrency(project.budget)}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 mb-3">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {project.client}
                            </span>
                          </div>

                          {project.status === "in-progress" && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
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
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No projects found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Orders */}
            <RecentOrders />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ItemsOverview />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ModalProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
