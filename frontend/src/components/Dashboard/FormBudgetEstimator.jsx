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
import { generateEstimate } from "../../services/generateEstimate";

export default function FormBudgetEstimator({ onEstimateGenerated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "residential",
    city: "",
    state: "",
    areaSqm: 0,
    floors: 1,
    qualityLevel: "standard",
    timelineMonths: 12,
    budgetPreference: 0,
  });
  const [displayBudget, setDisplayBudget] = useState("");

  // sync displayBudget when component mounts / formData changes externally
  useEffect(() => {
    setDisplayBudget(
      formData.budgetPreference ? formatCurrency(formData.budgetPreference) : ""
    );
  }, [formData.budgetPreference]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const result = generateEstimate(formData);
      onEstimateGenerated(result);
      setLoading(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budgetPreference") {
      // remove all characters except digits and dot
      const cleaned = value.replace(/[^\d.]/g, "");
      const numeric = cleaned === "" ? 0 : Number(cleaned);
      setFormData((prev) => ({
        ...prev,
        budgetPreference: numeric,
      }));
      setDisplayBudget(cleaned === "" ? "" : formatCurrency(numeric));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: [
        "areaSqm",
        "floors",
        "timelineMonths",
        // "budgetPreference",
      ].includes(name)
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-blue-100 border border-blue-500/20 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Luxury Villa Complex"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            {/* Quality Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Star className="w-5 h-5 text-blue-500" />
                Quality Level
              </label>
              <select
                name="qualityLevel"
                value={formData.qualityLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Mumbai"
              />
            </div>

            {/* State */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Maharashtra"
              />
            </div>

            {/* Area */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Ruler className="w-5 h-5 text-blue-500" />
                Total Area (sq.m)
              </label>
              <input
                type="number"
                name="areaSqm"
                value={formData.areaSqm || ""}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 2500"
              />
            </div>

            {/* Floors */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Layers className="w-5 h-5 text-blue-500" />
                Number of Floors
              </label>
              <input
                type="number"
                name="floors"
                value={formData.floors}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 3"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Timeline (Months)
              </label>
              <input
                type="number"
                name="timelineMonths"
                value={formData.timelineMonths}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 24"
              />
            </div>

            {/* Budget Preference */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <IndianRupee className="w-5 h-5 text-blue-500" />
                Budget Preference (₹)
              </label>
              <input
                type="text" // <- use text so formatted string is allowed
                inputMode="numeric"
                name="budgetPreference"
                value={displayBudget}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 7,50,00,000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Estimate...
              </>
            ) : (
              "Generate AI Estimate"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
