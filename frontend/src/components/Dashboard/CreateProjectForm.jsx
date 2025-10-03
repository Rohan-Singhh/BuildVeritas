import React, { useState } from 'react';
import { X, Plus, Calendar, MapPin, IndianRupee, Building, Clock, Users, Eye } from 'lucide-react';
import { projectAPI } from '../../services/project.service';
import { toast } from 'react-hot-toast';

export const CreateProjectForm = ({ onClose, onSubmit }) => {
  // Simplified form data - only 7 essential fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
    projectType: 'residential',
    area: '',
    startDate: '',
    duration: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      // Validate required fields
      if (!formData.title || formData.title.length < 5) {
        toast.error('Title must be at least 5 characters');
        return;
      }

      if (!formData.description || formData.description.length < 20) {
        toast.error('Description must be at least 20 characters');
        return;
      }

      if (!formData.budget || parseFloat(formData.budget) <= 0) {
        toast.error('Budget must be a positive number');
        return;
      }

      if (!formData.location) {
        toast.error('Location is required');
        return;
      }

      if (!formData.area || parseFloat(formData.area) <= 0) {
        toast.error('Area must be a positive number');
        return;
      }

      if (!formData.startDate) {
        toast.error('Start date is required');
        return;
      }

      if (!formData.duration || parseInt(formData.duration) < 1) {
        toast.error('Duration must be at least 1 month');
        return;
      }

      // Validate start date
      const startDate = new Date(formData.startDate);
      if (startDate < new Date()) {
        toast.error('Start date cannot be in the past');
        return;
      }

      // Create and publish project using simplified data (one step)
      const response = await projectAPI.createProject(formData);
      
      toast.success('Project created and published! Vendors can now see and bid on your project.');
      
      // Call the onSubmit prop with the created project
      if (onSubmit) {
        onSubmit(response.data);
      }

      // Close the form
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach(err => {
            toast.error(err.message || err);
          });
        }
      } else {
        toast.error(error.response?.data?.message || 'Failed to create project. Please try again.');
      }
      
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-100/20">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/20 text-blue-600 mb-3 backdrop-blur-sm">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-semibold">New Construction Project</span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Create & Publish Project</h3>
              <p className="text-gray-600 mt-2">Just 7 simple fields and your project will be live for vendors to bid!</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-all transform hover:rotate-90 duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Building className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-lg">Project Title</h4>
              </div>
              
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                placeholder="e.g., Modern Villa Construction"
                required
                minLength={5}
                maxLength={100}
              />
              <p className="mt-2 text-sm text-gray-500">A descriptive title for your project (5-100 characters)</p>
            </div>

            {/* Project Description */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Building className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-lg">Project Description</h4>
              </div>
              
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                placeholder="Describe what you want to build. Include key details about the project scope, requirements, and any specific preferences."
                rows={4}
                required
                minLength={20}
              />
              <p className="mt-2 text-sm text-gray-500">Detailed description of your project (minimum 20 characters)</p>
            </div>

            {/* Budget and Project Type */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <IndianRupee className="h-5 w-5" />
                  <h4 className="font-semibold">Budget (₹)</h4>
                </div>
                
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="5000000"
                  required
                  min="1"
                />
                <p className="mt-2 text-sm text-gray-500">Your total budget in INR</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Building className="h-5 w-5" />
                  <h4 className="font-semibold">Project Type</h4>
                </div>
                
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">Type of construction project</p>
              </div>
            </div>

            {/* Location and Area */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <MapPin className="h-5 w-5" />
                  <h4 className="font-semibold">Location</h4>
                </div>
                
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">City, State format</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Building className="h-5 w-5" />
                  <h4 className="font-semibold">Area (sqft)</h4>
                </div>
                
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="3000"
                  required
                  min="1"
                />
                <p className="mt-2 text-sm text-gray-500">Total area in square feet</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <h4 className="font-semibold">Start Date</h4>
                </div>
                
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">When you want to start</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Clock className="h-5 w-5" />
                  <h4 className="font-semibold">Duration (months)</h4>
                </div>
                
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="12"
                  required
                  min="1"
                />
                <p className="mt-2 text-sm text-gray-500">Expected duration in months</p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium flex items-center gap-2 shadow-sm hover:shadow group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 rounded-xl hover:scale-105 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="relative">
                      <span className="animate-pulse">Creating & Publishing...</span>
                    </span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="relative">
                      Create & Publish Project
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};