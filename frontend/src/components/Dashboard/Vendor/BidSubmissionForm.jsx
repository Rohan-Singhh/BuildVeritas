import { useState } from 'react';
import { X, Calendar, DollarSign, Users, FileText, Clock } from 'lucide-react';
import { bidAPI } from '../../../services/bid.service';
import { toast } from 'react-hot-toast';

const BidSubmissionForm = ({ project, onClose, onBidSubmitted }) => {
  // Debug logging
  console.log('BidSubmissionForm received project:', project);
  console.log('Project ID:', project?.id, 'Project _id:', project?._id);
  
  const [formData, setFormData] = useState({
    proposedCost: '',
    startDate: '',
    duration: '',
    proposal: '',
    teamSize: '',
    vendorEmail: '',
    vendorName: '',
    vendorPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.proposedCost || formData.proposedCost <= 0) {
      newErrors.proposedCost = 'Proposed cost must be a positive number';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (new Date(formData.startDate) < new Date()) {
      newErrors.startDate = 'Start date cannot be in the past';
    }

    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = 'Duration must be at least 1 month';
    }

    if (!formData.proposal || formData.proposal.length < 50) {
      newErrors.proposal = 'Proposal must be at least 50 characters';
    }

    if (!formData.teamSize || formData.teamSize < 1) {
      newErrors.teamSize = 'Team size must be at least 1 person';
    }

    if (!formData.vendorEmail || !/\S+@\S+\.\S+/.test(formData.vendorEmail)) {
      newErrors.vendorEmail = 'Valid email is required';
    }

    if (!formData.vendorName || formData.vendorName.length < 2) {
      newErrors.vendorName = 'Vendor name must be at least 2 characters';
    }

    if (!formData.vendorPhone || formData.vendorPhone.length < 10) {
      newErrors.vendorPhone = 'Valid phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log('Submitting bid for project:', project.id || project._id);
      console.log('Bid data:', formData);

      const bidData = {
        proposedCost: parseFloat(formData.proposedCost),
        startDate: formData.startDate,
        duration: parseInt(formData.duration),
        proposal: formData.proposal,
        teamSize: parseInt(formData.teamSize),
        vendorEmail: formData.vendorEmail,
        vendorName: formData.vendorName,
        vendorPhone: formData.vendorPhone
      };

      const projectId = project.id || project._id;
      console.log('Using project ID:', projectId);
      
      const response = await bidAPI.submitBid(projectId, bidData);
      console.log('Bid submission response:', response);

      toast.success('Bid submitted successfully!');
      onBidSubmitted && onBidSubmitted(response.data);
      onClose();
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error(error.response?.data?.message || 'Failed to submit bid');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Submit Bid</h2>
            <p className="text-gray-600 mt-1">{project.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Project Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Budget:</span>
                <span className="ml-2 font-medium">
                  {formatCurrency(project.budget?.range?.min || project.budget || 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="ml-2 font-medium">
                  {project.location?.city || 'Unknown'}, {project.location?.state || ''}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium">{project.projectType || 'Construction'}</span>
              </div>
              <div>
                <span className="text-gray-600">Area:</span>
                <span className="ml-2 font-medium">
                  {project.specifications?.area?.value || 'N/A'} {project.specifications?.area?.unit || 'sqft'}
                </span>
              </div>
            </div>
          </div>

          {/* Vendor Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vendor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.vendorName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.vendorName && (
                  <p className="text-red-500 text-xs mt-1">{errors.vendorName}</p>
                )}
              </div>

              {/* Vendor Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="vendorEmail"
                  value={formData.vendorEmail}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.vendorEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.vendorEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.vendorEmail}</p>
                )}
              </div>

              {/* Vendor Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="vendorPhone"
                  value={formData.vendorPhone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.vendorPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="9876543210"
                />
                {errors.vendorPhone && (
                  <p className="text-red-500 text-xs mt-1">{errors.vendorPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bid Form Fields */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bid Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Proposed Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Proposed Cost (₹)
              </label>
              <input
                type="number"
                name="proposedCost"
                value={formData.proposedCost}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.proposedCost ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your proposed cost"
                min="0"
                step="1000"
              />
              {errors.proposedCost && (
                <p className="text-red-500 text-xs mt-1">{errors.proposedCost}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Proposed Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Duration (months)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Project duration in months"
                min="1"
              />
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
              )}
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Team Size
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.teamSize ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Number of team members"
                min="1"
              />
              {errors.teamSize && (
                <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>
              )}
            </div>
            </div>
          </div>

          {/* Proposal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Project Proposal
            </label>
            <textarea
              name="proposal"
              value={formData.proposal}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.proposal ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your approach, methodology, and why you're the best fit for this project..."
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{errors.proposal ? errors.proposal : 'Minimum 50 characters'}</span>
              <span>{formData.proposal.length}/500</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Bid'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidSubmissionForm;
