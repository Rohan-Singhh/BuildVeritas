import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Ruler,
  Layers,
  Star,
  Calendar,
  Loader2,
  IndianRupee,
} from "lucide-react";
import budgetEstimateService from "../../services/budgetEstimate.service";
import toast from "react-hot-toast";

export default function FormBudgetEstimator({ onEstimateGenerated }) {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [formData, setFormData] = useState({
    project_name: "",
    project_type: "residential",
    location: {
      city: "",
      state: ""
    },
    project_details: {
      area_sqm: 0,
      floors: 1,
      quality_level: "standard"
    },
    timeline_months: 12,
    budget_preference: 0,
  });
  const [displayBudget, setDisplayBudget] = useState("");

  // sync displayBudget when component mounts / formData changes externally
  useEffect(() => {
    setDisplayBudget(
      formData.budget_preference ? formatCurrency(formData.budget_preference) : ""
    );
  }, [formData.budget_preference]);

  const validateForm = () => {
    const errors = [];
    
    if (!formData.project_name.trim()) {
      errors.push('Project name is required');
    }
    
    if (!formData.location.city.trim()) {
      errors.push('City is required');
    }
    
    if (!formData.location.state.trim()) {
      errors.push('State is required');
    }
    
    if (formData.project_details.area_sqm < 10) {
      errors.push('Area must be at least 10 square meters');
    }
    
    if (formData.project_details.floors < 1) {
      errors.push('Number of floors must be at least 1');
    }
    
    if (formData.timeline_months < 1) {
      errors.push('Timeline must be at least 1 month');
    }
    
    if (formData.budget_preference < 100000) {
      errors.push('Budget must be at least ₹1,00,000');
    }
    
    return errors;
  };

  const loadingSteps = [
    "Analyzing project details...",
    "Calculating material costs...",
    "Estimating labor requirements...",
    "Considering location factors...",
    "Generating cost breakdown...",
    "Finalizing recommendations..."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }
    
    setLoading(true);
    setLoadingStep(0);
    
    // Simulate loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    try {
      // Create the estimate
      const response = await budgetEstimateService.createEstimate(formData);
      const estimate = response.data;
      
      // If estimate is completed immediately, show result
      if (estimate.status === 'completed') {
        clearInterval(stepInterval);
        setLoadingStep(loadingSteps.length - 1);
        setTimeout(() => {
          setLoading(false);
          toast.success('Estimate generated successfully!');
          onEstimateGenerated({
            projectName: estimate.project_name,
            ...estimate.estimate_result
          });
        }, 1000);
        return;
      }
      
      // If processing, poll for completion
      if (estimate.status === 'processing') {
        try {
          const completedEstimate = await budgetEstimateService.pollEstimateStatus(estimate._id);
          clearInterval(stepInterval);
          setLoadingStep(loadingSteps.length - 1);
          setTimeout(() => {
            setLoading(false);
            toast.success('Estimate generated successfully!');
            onEstimateGenerated({
              projectName: completedEstimate.project_name,
              ...completedEstimate.estimate_result
            });
          }, 1000);
        } catch (pollError) {
          console.error('Error polling estimate status:', pollError);
          clearInterval(stepInterval);
          setLoading(false);
          toast.error('Estimate generation failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating estimate:', error);
      clearInterval(stepInterval);
      setLoading(false);
      
      // Handle specific error types
      if (error.response?.status === 400) {
        toast.error('Please check your input data and try again.');
      } else if (error.response?.status === 401) {
        toast.error('Please log in to create estimates.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Error creating estimate. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget_preference") {
      // remove all characters except digits and dot
      const cleaned = value.replace(/[^\d.]/g, "");
      const numeric = cleaned === "" ? 0 : Number(cleaned);
      setFormData((prev) => ({
        ...prev,
        budget_preference: numeric,
      }));
      setDisplayBudget(cleaned === "" ? "" : formatCurrency(numeric));
      return;
    }

    // Handle nested location fields
    if (name === "city" || name === "state") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
      return;
    }

    // Handle nested project_details fields
    if (["area_sqm", "floors", "quality_level"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        project_details: {
          ...prev.project_details,
          [name]: ["area_sqm", "floors"].includes(name) ? Number(value) : value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: ["timeline_months"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-blue-500/10 p-10 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Enter Your Project Details</h2>
            <p className="text-slate-600">Fill in the information below to get your AI-powered budget estimate</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Name */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                Project Name
              </label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., Luxury Villa Complex"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                Project Type
              </label>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            {/* Quality Level */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                Quality Level
              </label>
              <select
                name="quality_level"
                value={formData.project_details.quality_level}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., Mumbai"
              />
            </div>

            {/* State */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.location.state}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., Maharashtra"
              />
            </div>

            {/* Area */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Ruler className="w-5 h-5 text-purple-600" />
                </div>
                Total Area (sq.m)
              </label>
              <input
                type="number"
                name="area_sqm"
                value={formData.project_details.area_sqm || ""}
                onChange={handleChange}
                required
                min="10"
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., 2500"
              />
            </div>

            {/* Floors */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Layers className="w-5 h-5 text-indigo-600" />
                </div>
                Number of Floors
              </label>
              <input
                type="number"
                name="floors"
                value={formData.project_details.floors}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., 3"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-rose-600" />
                </div>
                Timeline (Months)
              </label>
              <input
                type="number"
                name="timeline_months"
                value={formData.timeline_months}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., 24"
              />
            </div>

            {/* Budget Preference */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-slate-700 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                Budget Preference (₹)
              </label>
              <input
                type="text" // <- use text so formatted string is allowed
                inputMode="numeric"
                name="budget_preference"
                value={displayBudget}
                onChange={handleChange}
                required
                min="100000"
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                placeholder="e.g., 7,50,00,000"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-xl shadow-lg hover:shadow-xl transform ${
                loading 
                  ? 'opacity-50 cursor-not-allowed scale-95' 
                  : 'hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Generate AI Estimate</span>
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>

      {/* Beautiful Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative text-center">
              {/* Animated AI Icon */}
              <div className="mb-8">
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <div className="text-4xl">🤖</div>
                  </div>
                  <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin"></div>
                </div>
              </div>

              {/* Loading Steps */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">AI is Working Magic</h3>
                <p className="text-slate-600 mb-6">{loadingSteps[loadingStep]}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  ></div>
                </div>
                
                {/* Step Indicators */}
                <div className="flex justify-center space-x-2">
                  {loadingSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= loadingStep 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : 'bg-slate-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Animated Dots */}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
