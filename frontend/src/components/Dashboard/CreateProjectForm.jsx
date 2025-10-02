import React, { useState } from 'react';
import { X, Plus, Calendar, MapPin, IndianRupee, Building, Clock, Users, Eye } from 'lucide-react';
import { projectAPI } from '../../services/project.service';
import { toast } from 'react-hot-toast';

export const CreateProjectForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: {
      range: {
        min: '',
        max: ''
      },
      currency: 'INR',
      flexibility: 'flexible'
    },
    location: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      coordinates: null
    },
    projectType: 'residential',
    subType: {
      residential: '',
      commercial: ''
    },
    specifications: {
      area: {
        value: '',
        unit: 'sqft'
      },
      floors: '',
      requirements: []
    },
    timeline: {
      expectedStartDate: '',
      expectedDuration: {
        value: '',
        unit: 'months'
      },
      preferredWorkingHours: {
        start: '09:00',
        end: '18:00'
      }
    },
    preferences: {
      vendorRequirements: {
        minExperience: 0,
        minRating: 0,
        requiredCertifications: [],
        preferredLocations: []
      },
      communicationPreference: 'both'
    },
    visibility: 'public'
  });

  const handleInputChange = (e, section, subsection) => {
    const { name, value } = e.target;
    
    if (section && subsection) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [name]: value
          }
        }
      }));
    } else if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      // Remove coordinates validation since we're not using it right now
      // We'll add proper coordinates handling in the future

      // Validate budget
      if (parseFloat(formData.budget.range.max) <= parseFloat(formData.budget.range.min)) {
        toast.error('Maximum budget must be greater than minimum budget');
        return;
      }

      // Validate start date
      const startDate = new Date(formData.timeline.expectedStartDate);
      if (startDate < new Date()) {
        toast.error('Start date cannot be in the past');
        return;
      }

      // Prepare project data with proper structure
      const projectData = {
        ...formData,
        // Only include relevant subType based on projectType
        subType: formData.projectType === 'residential' 
          ? { residential: formData.subType.residential }
          : formData.projectType === 'commercial'
          ? { commercial: formData.subType.commercial }
          : {},
        // Remove coordinates for now since we're not using them
        location: {
          address: formData.location.address,
          city: formData.location.city,
          state: formData.location.state,
          pincode: formData.location.pincode
        }
      };

      // Create project
      const response = await projectAPI.createProject(projectData);
      
      toast.success('Project created successfully!');
      
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
        // If errors is an object with error messages
        if (typeof error.response.data.errors === 'object' && !Array.isArray(error.response.data.errors)) {
          Object.values(error.response.data.errors).forEach(err => {
            toast.error(err.message || err);
          });
        } 
        // If errors is an array
        else if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach(err => {
            toast.error(err.message || err);
          });
        }
      } else {
        toast.error(error.response?.data?.message || 'Failed to create project. Please try again.');
      }
      
      // Don't close the form on error
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-100/20">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/20 text-blue-600 mb-3 backdrop-blur-sm">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-semibold">New Construction Project</span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Create New Project</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-all transform hover:rotate-90 duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-lg">Project Details</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="Enter a descriptive title for your project"
                      required
                      minLength={5}
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="Provide detailed information about your construction project"
                      rows={4}
                      required
                      minLength={20}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Include key details about the project scope, requirements, and any specific preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Type and Budget */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Building className="h-5 w-5" />
                  <h4 className="font-semibold">Project Type</h4>
                </div>
              <div className="space-y-4">
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">Select Project Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>

                {formData.projectType === 'residential' && (
                  <select
                    name="residential"
                    value={formData.subType.residential}
                    onChange={(e) => handleInputChange(e, 'subType')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Residential Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="renovation">Renovation</option>
                  </select>
                )}

                {formData.projectType === 'commercial' && (
                  <select
                    name="commercial"
                    value={formData.subType.commercial}
                    onChange={(e) => handleInputChange(e, 'subType')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Commercial Type</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="hotel">Hotel</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                )}
              </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <IndianRupee className="h-5 w-5" />
                  <h4 className="font-semibold">Budget Range</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Minimum Budget (₹)
                    </label>
                    <input
                      type="number"
                      name="min"
                      value={formData.budget.range.min}
                      onChange={(e) => handleInputChange(e, 'budget', 'range')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="Min budget"
                      required
                      min="0"
                    />
                  </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Maximum Budget (₹)
                  </label>
                  <input
                    type="number"
                    name="max"
                    value={formData.budget.range.max}
                    onChange={(e) => handleInputChange(e, 'budget', 'range')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Max budget"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget Flexibility
                  </label>
                  <select
                    name="flexibility"
                    value={formData.budget.flexibility}
                    onChange={(e) => handleInputChange(e, 'budget')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="strict">Strict</option>
                    <option value="flexible">Flexible</option>
                    <option value="very_flexible">Very Flexible</option>
                  </select>
                </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <MapPin className="h-5 w-5" />
                <h4 className="font-semibold">Location Details</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.location.address}
                    onChange={(e) => handleInputChange(e, 'location')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Enter complete address"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.location.city}
                      onChange={(e) => handleInputChange(e, 'location')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.location.state}
                      onChange={(e) => handleInputChange(e, 'location')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="State"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.location.pincode}
                      onChange={(e) => handleInputChange(e, 'location')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="6-digit pincode"
                      required
                      pattern="[1-9][0-9]{5}"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Building className="h-5 w-5" />
                <h4 className="font-semibold">Project Specifications</h4>
              </div>
              
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Area
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      name="value"
                      value={formData.specifications.area.value}
                      onChange={(e) => handleInputChange(e, 'specifications', 'area')}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="Total area"
                      required
                      min="1"
                    />
                    <select
                      name="unit"
                      value={formData.specifications.area.unit}
                      onChange={(e) => handleInputChange(e, 'specifications', 'area')}
                      className="w-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="sqft">sqft</option>
                      <option value="sqm">sqm</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Floors
                  </label>
                  <input
                    type="number"
                    name="floors"
                    value={formData.specifications.floors}
                    onChange={(e) => handleInputChange(e, 'specifications')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Total number of floors"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Requirements
                </label>
                <div className="space-y-4">
                  {formData.specifications.requirements.map((req, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <select
                          name="category"
                          value={req.category}
                          onChange={(e) => {
                            const newReqs = [...formData.specifications.requirements];
                            newReqs[index] = { ...newReqs[index], category: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                requirements: newReqs
                              }
                            }));
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="structural">Structural</option>
                          <option value="electrical">Electrical</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="interior">Interior</option>
                          <option value="exterior">Exterior</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={req.description}
                          onChange={(e) => {
                            const newReqs = [...formData.specifications.requirements];
                            newReqs[index] = { ...newReqs[index], description: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                requirements: newReqs
                              }
                            }));
                          }}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                          placeholder="Requirement description"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={req.priority}
                          onChange={(e) => {
                            const newReqs = [...formData.specifications.requirements];
                            newReqs[index] = { ...newReqs[index], priority: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                requirements: newReqs
                              }
                            }));
                          }}
                          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const newReqs = formData.specifications.requirements.filter((_, i) => i !== index);
                            setFormData(prev => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                requirements: newReqs
                              }
                            }));
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        specifications: {
                          ...prev.specifications,
                          requirements: [
                            ...prev.specifications.requirements,
                            { category: '', description: '', priority: 'medium' }
                          ]
                        }
                      }));
                    }}
                    className="w-full px-4 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Requirement
                  </button>
                </div>
              </div>
            </div>
            </div>

            {/* Timeline */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Calendar className="h-5 w-5" />
                <h4 className="font-semibold">Project Timeline</h4>
              </div>
              
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Expected Start Date
                  </label>
                  <input
                    type="date"
                    name="expectedStartDate"
                    value={formData.timeline.expectedStartDate}
                    onChange={(e) => handleInputChange(e, 'timeline')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Expected Duration
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      name="value"
                      value={formData.timeline.expectedDuration.value}
                      onChange={(e) => handleInputChange(e, 'timeline', 'expectedDuration')}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="Duration"
                      required
                      min="1"
                    />
                    <select
                      name="unit"
                      value={formData.timeline.expectedDuration.unit}
                      onChange={(e) => handleInputChange(e, 'timeline', 'expectedDuration')}
                      className="w-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Working Hours
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                    <input
                      type="time"
                      name="start"
                      value={formData.timeline.preferredWorkingHours.start}
                      onChange={(e) => handleInputChange(e, 'timeline', 'preferredWorkingHours')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Time</label>
                    <input
                      type="time"
                      name="end"
                      value={formData.timeline.preferredWorkingHours.end}
                      onChange={(e) => handleInputChange(e, 'timeline', 'preferredWorkingHours')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Vendor Requirements */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Users className="h-5 w-5" />
                <h4 className="font-semibold">Vendor Requirements</h4>
              </div>
              
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Minimum Experience (years)
                  </label>
                  <input
                    type="number"
                    name="minExperience"
                    value={formData.preferences.vendorRequirements.minExperience}
                    onChange={(e) => handleInputChange(e, 'preferences', 'vendorRequirements')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Minimum years of experience"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Minimum Rating
                  </label>
                  <input
                    type="number"
                    name="minRating"
                    value={formData.preferences.vendorRequirements.minRating}
                    onChange={(e) => handleInputChange(e, 'preferences', 'vendorRequirements')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Minimum vendor rating"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Required Certifications
                </label>
                <div className="space-y-2">
                  {formData.preferences.vendorRequirements.requiredCertifications.map((cert, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => {
                          const newCerts = [...formData.preferences.vendorRequirements.requiredCertifications];
                          newCerts[index] = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            preferences: {
                              ...prev.preferences,
                              vendorRequirements: {
                                ...prev.preferences.vendorRequirements,
                                requiredCertifications: newCerts
                              }
                            }
                          }));
                        }}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="Enter certification name"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newCerts = formData.preferences.vendorRequirements.requiredCertifications.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            preferences: {
                              ...prev.preferences,
                              vendorRequirements: {
                                ...prev.preferences.vendorRequirements,
                                requiredCertifications: newCerts
                              }
                            }
                          }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          vendorRequirements: {
                            ...prev.preferences.vendorRequirements,
                            requiredCertifications: [...prev.preferences.vendorRequirements.requiredCertifications, '']
                          }
                        }
                      }));
                    }}
                    className="w-full px-4 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Certification
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Locations
                </label>
                <div className="space-y-2">
                  {formData.preferences.vendorRequirements.preferredLocations.map((loc, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <input
                          type="text"
                          value={loc.city}
                          onChange={(e) => {
                            const newLocs = [...formData.preferences.vendorRequirements.preferredLocations];
                            newLocs[index] = { ...newLocs[index], city: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                vendorRequirements: {
                                  ...prev.preferences.vendorRequirements,
                                  preferredLocations: newLocs
                                }
                              }
                            }));
                          }}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                          placeholder="City"
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          value={loc.state}
                          onChange={(e) => {
                            const newLocs = [...formData.preferences.vendorRequirements.preferredLocations];
                            newLocs[index] = { ...newLocs[index], state: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                vendorRequirements: {
                                  ...prev.preferences.vendorRequirements,
                                  preferredLocations: newLocs
                                }
                              }
                            }));
                          }}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                          placeholder="State"
                        />
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            const newLocs = formData.preferences.vendorRequirements.preferredLocations.filter((_, i) => i !== index);
                            setFormData(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                vendorRequirements: {
                                  ...prev.preferences.vendorRequirements,
                                  preferredLocations: newLocs
                                }
                              }
                            }));
                          }}
                          className="w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          vendorRequirements: {
                            ...prev.preferences.vendorRequirements,
                            preferredLocations: [...prev.preferences.vendorRequirements.preferredLocations, { city: '', state: '' }]
                          }
                        }
                      }));
                    }}
                    className="w-full px-4 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Preferred Location
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Communication Preference
                </label>
                <select
                  name="communicationPreference"
                  value={formData.preferences.communicationPreference}
                  onChange={(e) => handleInputChange(e, 'preferences')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="email">Email Only</option>
                  <option value="phone">Phone Only</option>
                  <option value="both">Both Email and Phone</option>
                </select>
              </div>
            </div>
            </div>

            {/* Visibility */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Eye className="h-5 w-5" />
                <h4 className="font-semibold">Project Visibility</h4>
              </div>
              
              <select
                name="visibility"
                value={formData.visibility}
                onChange={(e) => handleInputChange(e)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                required
              >
                <option value="public">Public - Visible to all vendors</option>
                <option value="private">Private - Only visible to selected vendors</option>
                <option value="invited">Invited Only - Only visible to invited vendors</option>
              </select>
            </div>

          {/* Submit Button */}
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
                    <span className="animate-pulse">Creating Project...</span>
                  </span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="relative">
                    Create Project
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