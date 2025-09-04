import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserCheck,
  Phone,
  Building,
  Building2,
  Package,
  HardHat,
  Check,
  Receipt,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client_owner", // Default role
    phone: "",
    companyName: "",
    gstNumber: "",
  });

  const roles = [
    { id: "client_owner", label: "Client/Owner" },
    { id: "vendor_supplier", label: "Vendor/Supplier" },
    { id: "construction_firm", label: "Construction Firm" },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role-specific validation
    if (
      formData.role === "vendor_supplier" ||
      formData.role === "construction_firm"
    ) {
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    }

    if (formData.role === "construction_firm") {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
      }
      if (!formData.gstNumber.trim()) {
        newErrors.gstNumber = "GST number is required";
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
        newErrors.gstNumber = "Please enter a valid GST number";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Ensure GST number is properly formatted
      const { confirmPassword, ...userData } = formData;
      if (userData.role === 'construction_firm' && userData.gstNumber) {
        userData.gstNumber = userData.gstNumber.trim().toUpperCase();
        console.log('GST number before submission:', `[${userData.gstNumber}]`);
      }
      console.log('Submitting registration data:', userData); // Debug log
      await register(userData);
    } catch (error) {
      // Handle specific validation errors from backend
      if (error.errors) {
        const newErrors = {};
        Object.entries(error.errors).forEach(([field, error]) => {
          newErrors[field] = error.message || "Invalid value";
        });
        setErrors(newErrors);
      } else {
        // Handle general error
        setErrors({
          general: error.message || "Registration failed. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-start py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-500 transition-colors duration-200"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-200">
          {/* Role Selection Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your role
            </label>
            <div className="flex flex-col space-y-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className={`group relative overflow-hidden py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300 ease-out ${
                    formData.role === role.id
                      ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-blue-200"
                  }`}
                  onClick={() =>
                    handleChange({ target: { name: "role", value: role.id } })
                  }
                >
                  <div className="relative flex items-center justify-between">
                    <span className="flex items-center">
                      {role.id === "client_owner" && (
                        <Building2 className={`w-4 h-4 mr-2 ${formData.role === role.id ? "text-white" : "text-blue-400"}`} />
                      )}
                      {role.id === "vendor_supplier" && (
                        <Package className={`w-4 h-4 mr-2 ${formData.role === role.id ? "text-white" : "text-blue-400"}`} />
                      )}
                      {role.id === "construction_firm" && (
                        <HardHat className={`w-4 h-4 mr-2 ${formData.role === role.id ? "text-white" : "text-blue-400"}`} />
                      )}
                      {role.label}
                    </span>
                    <div className={`transform transition-transform duration-300 ${formData.role === role.id ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}>
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                  {formData.role === role.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-500/10 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                      errors.firstName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                      errors.lastName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Conditional Fields Based on Role */}
            {(formData.role === "vendor_supplier" ||
              formData.role === "construction_firm") && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="10-digit phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            )}

            {formData.role === "construction_firm" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                        errors.companyName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Company name"
                    />
                  </div>
                  {errors.companyName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    GST Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Receipt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="gstNumber"
                      type="text"
                      required
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                        errors.gstNumber ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter GST number (e.g., 29ABCDE1234F1Z5)"
                    />
                  </div>
                  {errors.gstNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.gstNumber}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <span className="ml-1 text-sm text-gray-500">
                  (min. 8 characters, must include a number)
                </span>
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {errors.general && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
