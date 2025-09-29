import { useState, useEffect } from "react";
import {
  X,
  Save,
  Building2,
  MapPin,
  Calendar,
  Plus,
  Trash2,
} from "lucide-react";
import { RiContactsBook3Line } from "react-icons/ri";

const EditProfileModal = ({
  isOpen,
  onClose,
  profileData,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState(profileData);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  useEffect(() => {
    setFormData(profileData);
  }, [profileData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onClose();
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handleExperienceChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        [field]: value,
      },
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setFormData((prev) => ({
        ...prev,
        specializations: [
          ...prev.specializations,
          newSpecialization.trim().toLowerCase().replace(/\s+/g, "_"),
        ],
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }));
  };

  const addPhoto = () => {
    if (newPhoto.trim()) {
      setFormData((prev) => ({
        ...prev,
        companyPhotos: [...(prev.companyPhotos || []), newPhoto.trim()],
      }));
      setNewPhoto("");
    }
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      companyPhotos: prev.companyPhotos?.filter((_, i) => i !== index) || [],
    }));
  };

  const addProject = () => {
    const newProject = {
      name: "",
      location: "",
      startDate: "",
      expectedCompletion: "",
      status: "in_progress",
      type: "residential",
      value: 0,
    };
    setFormData((prev) => ({
      ...prev,
      activeProjects: [...prev.activeProjects, newProject],
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      activeProjects: prev.activeProjects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      ),
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      activeProjects: prev.activeProjects.filter((_, i) => i !== index),
    }));
  };

  const formatSpecialization = (spec) => {
    return spec.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-3xl">
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-500/20 w-full max-w-4xl max-h-[100vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-blue-500/10">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-500/20 cursor-pointer rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information (Non-editable) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2 flex items-center gap-2">
                <RiContactsBook3Line className="h-5 w-5 text-blue-500" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleFieldChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleFieldChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleFieldChange("companyName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Location (Editable) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) =>
                      handleLocationChange("city", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.location.state}
                    onChange={(e) =>
                      handleLocationChange("state", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Experience (Editable) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Years in Business
                  </label>
                  <input
                    type="number"
                    value={formData.experience.yearsInBusiness}
                    onChange={(e) =>
                      handleExperienceChange(
                        "yearsInBusiness",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    min="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Total Projects Completed
                  </label>
                  <input
                    type="number"
                    value={formData.experience.totalProjects}
                    onChange={(e) =>
                      handleExperienceChange(
                        "totalProjects",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Company Logo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2">
                Company Logo
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.companyLogo || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      companyLogo: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                  placeholder="https://example.com/logo.jpg"
                />
              </div>
            </div>

            {/* Specializations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2">
                Specializations
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    placeholder="Add new specialization"
                    className="flex-1 px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addSpecialization())
                    }
                  />
                  <button
                    type="button"
                    onClick={addSpecialization}
                    className="px-4 py-3 bg-blue-500 text-blue-500-foreground rounded-lg hover:bg-blue-500/90 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg border border-blue-500/20"
                    >
                      <span className="text-sm">
                        {formatSpecialization(spec)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="p-1 hover:bg-blue-500/20 rounded"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2">
                Company Photos
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    placeholder="Add photo URL"
                    className="flex-1 px-4 py-3 border border-blue-500 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addPhoto())
                    }
                  />
                  <button
                    type="button"
                    onClick={addPhoto}
                    className="px-4 py-3 bg-blue-500 text-blue-500-foreground rounded-lg hover:bg-blue-500/90 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.companyPhotos?.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Company photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Projects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2">
                  Active Projects
                </h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="px-4 py-2 bg-blue-500 text-blue-500-foreground rounded-lg hover:bg-blue-500/90 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4 inline mr-1" />
                  Add Project
                </button>
              </div>
              <div className="space-y-4">
                {formData.activeProjects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-300/10 rounded-lg border border-blue-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">
                        Project {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) =>
                          updateProject(index, "name", e.target.value)
                        }
                        className="px-3 py-2 border border-blue-500 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={project.location}
                        onChange={(e) =>
                          updateProject(index, "location", e.target.value)
                        }
                        className="px-3 py-2 border border-blue-500 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm"
                      />
                      <select
                        value={project.type}
                        onChange={(e) =>
                          updateProject(index, "type", e.target.value)
                        }
                        className="px-3 py-2 border border-blue-500 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="infrastructure">Infrastructure</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Project Value (₹)"
                        value={project.value || ""}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "value",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-blue-500 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm"
                      />
                      <input
                        type="date"
                        placeholder="Start Date"
                        value={project.startDate}
                        onChange={(e) =>
                          updateProject(index, "startDate", e.target.value)
                        }
                        className="px-3 py-2 border border-blue-500 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm"
                      />
                      <input
                        type="date"
                        placeholder="Expected Completion"
                        value={project.expectedCompletion}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "expectedCompletion",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-blue-500 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GST Details (Non-editable) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-500/20 pb-2">
                GST Details (Read Only)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-500">
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={formData.gstDetails.number}
                    disabled
                    className="w-full px-4 py-3 bg-slate-300/20 border border-blue-500/20 rounded-lg text-gray-500 cursor-not-allowed font-mono"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-500">
                    Registration Date
                  </label>
                  <input
                    type="date"
                    value={formData.gstDetails.registrationDate}
                    disabled
                    className="w-full px-4 py-3 bg-slate-300/20 border border-blue-500/20 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            {/* Non-editable Fields Notice */}
            <div className="bg-slate-300/30 border border-slate-300 rounded-lg p-3 -mt-5">
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> GST Details are non-editable for security
                purposes.
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-4 border-t border-blue-500/20 bg-slate-300/10">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-6 py-3 border border-blue-500 rounded-lg hover:bg-red-700/20 hover:text-red-500 hover:border-red-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-500/90 transition-colors flex items-center gap-2 hover:scale-105"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
