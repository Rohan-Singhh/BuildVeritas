import React, { useState, useEffect } from 'react';
import {
  Building,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  XCircle
} from 'lucide-react';
import { projectAPI } from '../../services/project.service';
import { bidAPI } from '../../services/bid.service';
import { toast } from 'react-hot-toast';

const ClientProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [selectedProjectBids, setSelectedProjectBids] = useState([]);
  const [projectBids, setProjectBids] = useState({});
  const [showBidDetailsModal, setShowBidDetailsModal] = useState(false);
  const [selectedBidDetails, setSelectedBidDetails] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching client projects...');
      
      // Fetch projects first
      const response = await projectAPI.getClientProjects();
      const projectsData = response.data?.projects || response.data || [];
      console.log('Found projects:', projectsData.length);
      
      // Set projects immediately for better UX
      setProjects(projectsData);
      
      // Fetch all bids in a single batch request
      if (projectsData.length > 0) {
        try {
          const projectIds = projectsData.map(project => project._id);
          const bidsResponse = await bidAPI.getMultipleProjectBids(projectIds);
          
          if (bidsResponse.data && bidsResponse.data.bids) {
            setProjectBids(bidsResponse.data.bids);
            console.log('Batch bids loaded:', Object.keys(bidsResponse.data.bids).length);
          } else {
            setProjectBids({});
          }
        } catch (error) {
          console.error('Error fetching batch bids:', error);
          setProjectBids({});
        }
      } else {
        setProjectBids({});
      }
      
      console.log('All data loaded successfully');
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.current) {
      case 'OPEN':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'IN_PROGRESS':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'DRAFT':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.current) {
      case 'OPEN':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBidStats = (projectId) => {
    const bids = projectBids[projectId];
    
    // Ensure bids is an array
    if (!Array.isArray(bids)) {
      console.log(`getBidStats - bids is not array for project ${projectId}:`, bids);
      return {
        total: 0,
        accepted: 0,
        pending: 0,
        rejected: 0
      };
    }
    
    const totalBids = bids.length;
    const acceptedBids = bids.filter(bid => bid.status === 'ACCEPTED').length;
    const pendingBids = bids.filter(bid => bid.status === 'PENDING').length;
    const rejectedBids = bids.filter(bid => bid.status === 'REJECTED').length;
    
    return {
      total: totalBids,
      accepted: acceptedBids,
      pending: pendingBids,
      rejected: rejectedBids
    };
  };

  const getProjectStatus = (project) => {
    try {
      const bidStats = getBidStats(project._id);
      
      if (project.status?.current === 'COMPLETED') {
        return { text: 'Completed', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4 text-green-600" /> };
      }
      
      if (project.status?.current === 'CANCELLED') {
        return { text: 'Cancelled', color: 'bg-red-100 text-red-800', icon: <XCircle className="w-4 h-4 text-red-600" /> };
      }
      
      if (bidStats.accepted > 0) {
        return { text: 'Vendor Selected', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-4 h-4 text-blue-600" /> };
      }
      
      if (bidStats.total > 0) {
        return { text: `${bidStats.total} Bid${bidStats.total !== 1 ? 's' : ''} Received`, color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4 text-yellow-600" /> };
      }
      
      if (project.status?.current === 'OPEN') {
        return { text: 'Waiting for Bids', color: 'bg-gray-100 text-gray-800', icon: <Clock className="w-4 h-4 text-gray-600" /> };
      }
      
      return { text: project.status?.current || 'Unknown', color: 'bg-gray-100 text-gray-800', icon: <AlertCircle className="w-4 h-4 text-gray-600" /> };
    } catch (error) {
      console.error('Error in getProjectStatus:', error);
      return { text: 'Error', color: 'bg-red-100 text-red-800', icon: <AlertCircle className="w-4 h-4 text-red-600" /> };
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location?.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || project.status?.current === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleViewBids = (project) => {
    const bids = projectBids[project._id] || [];
    console.log('Viewing bids for project:', project._id);
    console.log('Project object:', project);
    console.log('Bids data:', bids);
    setSelectedProject(project);
    setSelectedProjectBids(bids);
    setShowBidsModal(true);
  };

  const handleEditProject = (project) => {
    // TODO: Implement edit functionality
    toast.info('Edit functionality coming soon!');
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.deleteProject(projectId);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  // Bid action functions
  const handleAcceptBid = async (bidId, projectId) => {
    console.log('handleAcceptBid called with:', { bidId, projectId });
    const actionKey = `accept_${bidId}`;
    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    
    try {
      console.log('Calling bidAPI.selectBid...');
      const response = await bidAPI.selectBid(bidId, projectId);
      console.log('selectBid response:', response);
      toast.success('Bid accepted successfully!');
      
      // Refresh the bids data
      await fetchProjects();
      
      // Close the bids modal
      setShowBidsModal(false);
    } catch (error) {
      console.error('Error accepting bid:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to accept bid');
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleRejectBid = async (bidId, projectId) => {
    console.log('handleRejectBid called with:', { bidId, projectId });
    const actionKey = `reject_${bidId}`;
    setActionLoading(prev => ({ ...prev, [actionKey]: true }));
    
    try {
      const reason = prompt('Please provide a reason for rejecting this bid (optional):') || 'Bid rejected by client';
      console.log('Calling bidAPI.rejectBid with reason:', reason);
      const response = await bidAPI.rejectBid(bidId, projectId, reason);
      console.log('rejectBid response:', response);
      toast.success('Bid rejected successfully');
      
      // Refresh the bids data
      await fetchProjects();
      
      // Close the bids modal
      setShowBidsModal(false);
    } catch (error) {
      console.error('Error rejecting bid:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to reject bid');
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleViewBidDetails = async (bidId) => {
    console.log('handleViewBidDetails called with bidId:', bidId);
    try {
      console.log('Calling bidAPI.getBidDetails...');
      const response = await bidAPI.getBidDetails(bidId);
      console.log('getBidDetails response:', response);
      setSelectedBidDetails(response.data);
      setShowBidDetailsModal(true);
    } catch (error) {
      console.error('Error fetching bid details:', error);
      console.error('Error details:', error.response?.data);
      toast.error('Failed to fetch bid details');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">My Projects</h1>
              <p className="text-gray-600 text-sm">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} • Manage your construction projects
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none text-gray-700 text-sm min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-gray-600 mb-6 text-sm max-w-sm mx-auto">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first project to get started.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Create Project</span>
              </button>
            )}
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="group bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:border-blue-300/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Project Header */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Building className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 line-clamp-1">
                            {project.location?.address || 'Location not specified'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {(() => {
                      const statusInfo = getProjectStatus(project);
                      return (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      );
                    })()}
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Start</p>
                        <p className="text-sm font-semibold text-gray-800">{formatDate(project.timeline?.expectedStartDate)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="text-xs text-purple-600 font-medium">Duration</p>
                        <p className="text-sm font-semibold text-gray-800">{project.timeline?.expectedDuration?.value} {project.timeline?.expectedDuration?.unit}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">Budget</p>
                        <p className="text-sm font-semibold text-gray-800">{formatCurrency(project.budget?.range?.min)} - {formatCurrency(project.budget?.range?.max)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-orange-600 font-medium">Area</p>
                        <p className="text-sm font-semibold text-gray-800">{project.specifications?.area?.value} sqft</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Bid Statistics */}
                {(() => {
                  const bidStats = getBidStats(project._id);
                  if (bidStats.total > 0) {
                    return (
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 mb-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Bid Activity</span>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {bidStats.total} Bid{bidStats.total !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs mb-2">
                          {bidStats.accepted > 0 && (
                            <span className="text-green-200">✓ {bidStats.accepted} Selected</span>
                          )}
                          {bidStats.pending > 0 && (
                            <span className="text-yellow-200">⏳ {bidStats.pending} Pending</span>
                          )}
                          {bidStats.rejected > 0 && (
                            <span className="text-red-200">✗ {bidStats.rejected} Rejected</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleViewBids(project)}
                          className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                          View All Bids →
                        </button>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Project Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      {project.projectType?.charAt(0).toUpperCase() + project.projectType?.slice(1)}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-medium">
                      {project.specifications?.area?.value} sqft
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleViewProject(project)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedProject.title}</h3>
                  <p className="text-blue-100 text-sm line-clamp-2">{selectedProject.description}</p>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <h4 className="font-semibold text-gray-800">Location</h4>
                  </div>
                  <p className="text-sm text-gray-600">{selectedProject.location?.address}</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Building className="w-4 h-4 text-purple-500" />
                    <h4 className="font-semibold text-gray-800">Type</h4>
                  </div>
                  <p className="text-sm text-gray-600 capitalize">{selectedProject.projectType}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <IndianRupee className="w-4 h-4 text-green-500" />
                    <h4 className="font-semibold text-gray-800">Budget</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(selectedProject.budget?.range?.min)} - {formatCurrency(selectedProject.budget?.range?.max)}
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Building className="w-4 h-4 text-orange-500" />
                    <h4 className="font-semibold text-gray-800">Area</h4>
                  </div>
                  <p className="text-sm text-gray-600">{selectedProject.specifications?.area?.value} sqft</p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <h4 className="font-semibold text-gray-800">Start Date</h4>
                  </div>
                  <p className="text-sm text-gray-600">{formatDate(selectedProject.timeline?.expectedStartDate)}</p>
                </div>
                
                <div className="bg-pink-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <h4 className="font-semibold text-gray-800">Duration</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedProject.timeline?.expectedDuration?.value} {selectedProject.timeline?.expectedDuration?.unit}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Status</h4>
                  {(() => {
                    const statusInfo = getProjectStatus(selectedProject);
                    return (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.text}
                      </span>
                    );
                  })()}
                </div>

                {/* Bid Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Bid Activity</h4>
                  {(() => {
                    const bidStats = getBidStats(selectedProject._id);
                    if (bidStats.total > 0) {
                      return (
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold">Bids</span>
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                              {bidStats.total}
                            </span>
                          </div>
                          <div className="flex gap-2 text-xs">
                            {bidStats.accepted > 0 && (
                              <span className="text-green-200">✓ {bidStats.accepted}</span>
                            )}
                            {bidStats.pending > 0 && (
                              <span className="text-yellow-200">⏳ {bidStats.pending}</span>
                            )}
                            {bidStats.rejected > 0 && (
                              <span className="text-red-200">✗ {bidStats.rejected}</span>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">No bids yet</p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bids Modal */}
      {showBidsModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">Bids for {selectedProject.title}</h3>
                  <p className="text-blue-100 text-sm">
                    {selectedProjectBids.length} bid{selectedProjectBids.length !== 1 ? 's' : ''} received
                  </p>
                </div>
                <button
                  onClick={() => setShowBidsModal(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {selectedProjectBids.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No bids received yet</h3>
                  <p className="text-gray-600 text-sm">Vendors can start bidding on your project</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProjectBids.map((bid, index) => {
                    // Safely extract status
                    const bidStatus = typeof bid.status === 'object' ? bid.status?.current : bid.status;
                    const safeStatus = bidStatus || 'PENDING';
                    
                    // Safely extract cost
                    const bidCost = bid.proposedCost?.total || bid.proposedCost || 0;
                    
                    // Safely extract timeline
                    const bidTimeline = bid.timeline?.estimatedDuration?.value || 
                                       bid.timeline?.estimatedDuration || 
                                       bid.duration || 
                                       'N/A';
                    
                    // Safely extract proposal
                    const bidProposal = typeof bid.proposal === 'object' 
                      ? bid.proposal?.summary || bid.proposal?.approach || 'No proposal provided'
                      : bid.proposal || 'No proposal provided';
                    
                    return (
                      <div key={bid._id || index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Building className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">Vendor {index + 1}</h4>
                              <p className="text-sm text-gray-600">Bid #{index + 1}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            safeStatus === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                            safeStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {safeStatus}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Proposed Cost</p>
                            <p className="text-sm font-semibold text-gray-800">
                              {formatCurrency(bidCost)}
                            </p>
                            {bid.proposedCost?.currency && (
                              <p className="text-xs text-gray-500">{bid.proposedCost.currency}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Timeline</p>
                            <p className="text-sm font-semibold text-gray-800">
                              {bidTimeline} months
                            </p>
                            {bid.timeline?.proposedStartDate && (
                              <p className="text-xs text-gray-500">
                                Start: {formatDate(bid.timeline.proposedStartDate)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 font-medium mb-1">Proposal Summary</p>
                          <p className="text-sm text-gray-700 line-clamp-3">{bidProposal}</p>
                          {typeof bid.proposal === 'object' && bid.proposal?.uniqueValue && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-600 font-medium mb-1">Unique Value</p>
                              <p className="text-sm text-gray-700 line-clamp-2">{bid.proposal.uniqueValue}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {safeStatus !== 'ACCEPTED' && safeStatus !== 'REJECTED' && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Accept button clicked for bid:', bid._id, 'project:', selectedProject._id);
                                handleAcceptBid(bid._id, selectedProject._id);
                              }}
                              disabled={actionLoading[`accept_${bid._id}`]}
                              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading[`accept_${bid._id}`] ? 'Accepting...' : 'Accept Bid'}
                            </button>
                          )}
                          {safeStatus !== 'ACCEPTED' && safeStatus !== 'REJECTED' && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Reject button clicked for bid:', bid._id, 'project:', selectedProject._id);
                                handleRejectBid(bid._id, selectedProject._id);
                              }}
                              disabled={actionLoading[`reject_${bid._id}`]}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading[`reject_${bid._id}`] ? 'Rejecting...' : 'Reject Bid'}
                            </button>
                          )}
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('View Details button clicked for bid:', bid._id);
                              handleViewBidDetails(bid._id);
                            }}
                            className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bid Details Modal */}
      {showBidDetailsModal && selectedBidDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">Bid Details</h3>
                  <p className="text-blue-100 text-sm">
                    Detailed information about this bid
                  </p>
                </div>
                <button
                  onClick={() => setShowBidDetailsModal(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Vendor Information */}
              {selectedBidDetails.vendor && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Vendor Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Company Name</p>
                      <p className="font-medium">{selectedBidDetails.vendor.companyName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{selectedBidDetails.vendor.location || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium">{selectedBidDetails.vendor.experience || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="font-medium">{selectedBidDetails.vendor.ratings?.average || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost Breakdown */}
              {selectedBidDetails.proposedCost && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Cost Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Cost</span>
                      <span className="font-semibold text-lg">
                        {formatCurrency(selectedBidDetails.proposedCost.total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Currency</span>
                      <span className="font-medium">{selectedBidDetails.proposedCost.currency}</span>
                    </div>
                    {selectedBidDetails.proposedCost.breakdown && Array.isArray(selectedBidDetails.proposedCost.breakdown) && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Breakdown:</p>
                        <div className="space-y-1">
                          {selectedBidDetails.proposedCost.breakdown.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.category}</span>
                              <span>{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {selectedBidDetails.timeline && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Timeline</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-medium">
                        {selectedBidDetails.timeline.proposedStartDate 
                          ? formatDate(selectedBidDetails.timeline.proposedStartDate)
                          : 'N/A'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">
                        {selectedBidDetails.timeline.estimatedDuration?.value || 'N/A'} 
                        {selectedBidDetails.timeline.estimatedDuration?.unit ? ` ${selectedBidDetails.timeline.estimatedDuration.unit}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Proposal Details */}
              {selectedBidDetails.proposal && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Proposal Details</h4>
                  <div className="space-y-3">
                    {selectedBidDetails.proposal.summary && (
                      <div>
                        <p className="text-sm text-gray-600 font-medium mb-1">Summary</p>
                        <p className="text-sm text-gray-700">{selectedBidDetails.proposal.summary}</p>
                      </div>
                    )}
                    {selectedBidDetails.proposal.approach && (
                      <div>
                        <p className="text-sm text-gray-600 font-medium mb-1">Approach</p>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{selectedBidDetails.proposal.approach}</p>
                      </div>
                    )}
                    {selectedBidDetails.proposal.uniqueValue && (
                      <div>
                        <p className="text-sm text-gray-600 font-medium mb-1">Unique Value</p>
                        <p className="text-sm text-gray-700">{selectedBidDetails.proposal.uniqueValue}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Team Information */}
              {selectedBidDetails.team && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Team Information</h4>
                  {selectedBidDetails.team.projectManager && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 font-medium mb-1">Project Manager</p>
                      <p className="text-sm text-gray-700">{selectedBidDetails.team.projectManager.name || 'N/A'}</p>
                    </div>
                  )}
                  {selectedBidDetails.team.composition && Array.isArray(selectedBidDetails.team.composition) && (
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-2">Team Composition</p>
                      <div className="space-y-1">
                        {selectedBidDetails.team.composition.map((member, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{member.role}</span>
                            <span>{member.count} person{member.count !== 1 ? 's' : ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Status Information</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    (typeof selectedBidDetails.status === 'object' ? selectedBidDetails.status?.current : selectedBidDetails.status) === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                    (typeof selectedBidDetails.status === 'object' ? selectedBidDetails.status?.current : selectedBidDetails.status) === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {typeof selectedBidDetails.status === 'object' ? selectedBidDetails.status?.current : selectedBidDetails.status || 'PENDING'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default ClientProjectSection;
