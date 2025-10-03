import { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Eye,
  Search,
  Building,
  Clock,
  Users,
  BarChart3,
  Loader2,
} from "lucide-react";
import ModalProject from "./ModalProject";
import BidSubmissionForm from "./BidSubmissionForm";
import ItemsOverview from "./ItemsOverview";
import RecentOrders from "./RecentOrders";
import { SearchBar } from "../SearchBar";
import { vendorProjectAPI } from "../../../services/vendorProject.service";
import { bidAPI } from "../../../services/bid.service";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidFormProject, setBidFormProject] = useState(null);
  const [userBids, setUserBids] = useState({});

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching published projects for vendor...');
      
      const filters = {
        status: filterStatus === 'all' ? undefined : filterStatus.toUpperCase(),
        page: 1,
        limit: 50
      };
      
      const response = await vendorProjectAPI.getPublishedProjects(filters);
      console.log('Fetched projects response:', response);
      
      const projectsData = response.data?.projects || response.data || [];
      console.log('Found projects:', projectsData.length);
      
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // Search projects
  const searchProjects = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Searching projects with term:', searchTerm);
      
      const filters = {
        status: filterStatus === 'all' ? undefined : filterStatus.toUpperCase(),
        page: 1,
        limit: 50
      };
      
      const response = await vendorProjectAPI.searchProjects(searchTerm, filters);
      console.log('Search projects response:', response);
      
      const projectsData = response.data?.projects || response.data || [];
      console.log('Found projects:', projectsData.length);
      
      setProjects(projectsData);
    } catch (error) {
      console.error('Error searching projects:', error);
      setError('Failed to search projects');
      toast.error('Failed to search projects');
    } finally {
      setLoading(false);
    }
  };

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [filterStatus]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      searchProjects(term);
    } else {
      fetchProjects();
    }
  };

  // Handle bid submission
  const handleSubmitBid = (project) => {
    console.log('handleSubmitBid called with project:', project);
    console.log('Project ID in handleSubmitBid:', project?.id, project?._id);
    setBidFormProject(project);
    setShowBidForm(true);
  };

  // Handle bid form close
  const handleBidFormClose = () => {
    setShowBidForm(false);
    setBidFormProject(null);
  };

  // Handle successful bid submission
  const handleBidSubmitted = (bidData) => {
    console.log('Bid submitted successfully:', bidData);
    toast.success('Bid submitted successfully!');
    // Refresh projects to show updated bid status
    fetchProjects();
  };

  // Check if user has already bid on a project
  const hasUserBid = (projectId) => {
    return userBids[projectId] || false;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "on_hold":
      case "hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "completed":
        return "✅";
      case "in_progress":
      case "in-progress":
        return "🔄";
      case "on_hold":
      case "hold":
        return "⏸️";
      case "open":
        return "🔓";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  // Format project data for display
  const formatProject = (project) => {
    return {
      id: project._id,
      name: project.title,
      status: project.status?.current || project.status || 'open',
      type: project.projectType || 'Construction',
      city: project.location?.city || 'Unknown',
      state: project.location?.state || '',
      timeline: project.timeline?.estimatedDuration?.value 
        ? `${project.timeline.estimatedDuration.value} ${project.timeline.estimatedDuration.unit}`
        : 'TBD',
      budget: project.budget?.range?.min || project.budget || 0,
      progress: project.progress || 0,
      client: project.client?.name || 'Unknown Client',
      description: project.description || 'No description available',
      startDate: project.timeline?.expectedStartDate || project.startDate,
      endDate: project.timeline?.expectedEndDate || project.endDate,
      materials: project.specifications?.requirements?.map(req => req.name) || ['Materials TBD']
    };
  };

  const filteredProjects = projects.map(formatProject);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm} // called debounced
          onSearch={handleSearch} // immediate on Enter / Search click
          placeholder="Search projects..."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in-up delay-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Available Projects
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Browse and view published construction projects
                    </p>
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
                      onClick={() => setFilterStatus("open")}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        filterStatus === "open"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => setFilterStatus("in_progress")}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        filterStatus === "in_progress"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      In Progress
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
                  </div>
                </div>
              </div>

              <div className="p-6">
                <>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="ml-2 text-gray-600">Loading projects...</span>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <Building className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Error Loading Projects
                      </h3>
                      <p className="text-gray-500 mb-4">{error}</p>
                      <button
                        onClick={fetchProjects}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
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

                            {(project.status === "in_progress" || project.status === "in-progress") && project.progress > 0 && (
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

                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedProject(project)}
                              className="flex items-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                            {project.status === 'open' && !hasUserBid(project.id) && (
                              <button
                                onClick={() => handleSubmitBid(project)}
                                className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                              >
                                <DollarSign className="w-4 h-4 mr-1" />
                                Bid
                              </button>
                            )}
                            {hasUserBid(project.id) && (
                              <span className="flex items-center px-3 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg">
                                ✓ Bid Submitted
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  )}

                  {!loading && !error && filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                      <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No projects found
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm ? 'No projects match your search criteria.' : 'No published projects available at the moment.'}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            fetchProjects();
                          }}
                          className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          Clear Search
                        </button>
                      )}
                    </div>
                  )}
                </>
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

      {/* Modals */}
      {selectedProject && (
        <ModalProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onBidClick={handleSubmitBid}
          hasUserBid={hasUserBid(selectedProject.id)}
        />
      )}

      {showBidForm && bidFormProject && (
        <BidSubmissionForm
          project={bidFormProject}
          onClose={handleBidFormClose}
          onBidSubmitted={handleBidSubmitted}
        />
      )}
    </div>
  );
};

export default Dashboard;
