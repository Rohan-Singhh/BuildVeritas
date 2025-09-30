import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Building,
  CreditCard as Edit3,
  Briefcase,
  Star,
  FileText,
  Shield,
  CheckCircle,
} from "lucide-react";
import { ModalEditProfile } from "./ModalEditProfile";

const ProfileSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    companyName: "Elite Builders Co.",
    location: {
      address: "67 Construction Avenue, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400061",
    },
    contactInfo: {
      email: "contact@elitebuilders.com",
      phone: "9876543210",
    },
    experience: {
      yearsInBusiness: 15,
      totalProjects: 139,
    },
    companyLogo:
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758449486/logo_2_xqkdrk.webp",
    companyPhotos: [
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758439487/Building_2_xroatp.png",
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758439487/Building_1_edmfwz.png",
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758439823/Society_1_y4cr2h.png",
    ],
    services: [
      "Premium Construction",
      "Architecture",
      "Interior Design",
      "Project Management",
    ],
    specializations: ["Luxury Residential", "High-end Commercial"],
    gstNumber: "27ABCDE1234F1Z5",
    gstRegistrationDate: "2018-04-15",
  });

  const handleUpdateProfile = (updatedData) => {
    setProfile(updatedData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Manage your company information and settings
          </p>
          <button
            onClick={() => {
            //   setEditForm(profile);
              setIsEditModalOpen(true);
            }}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6">
        {/* Company Header */}
        <div className="bg-white rounded-xl shadow-xl shadow-blue-100 border border-blue-500/20 mb-8">
          <div className="p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={profile.companyLogo}
                  alt={profile.companyName}
                  className="w-24 h-24 rounded-xl object-cover shadow-xl shadow-blue-100 border-4 border-blue-500/20"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {profile.companyName}
                  </h2>
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>
                      {profile.location.city}, {profile.location.state}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-xl shadow-blue-100 border border-blue-500/20">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Contact Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600 mt-1">
                          {profile.location.address}
                          <br />
                          {profile.location.city}, {profile.location.state}{" "}
                          {profile.location.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">
                          {profile.contactInfo.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">
                          +91 {profile.contactInfo.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-xl shadow-blue-100 border border-blue-500/20">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Services Offered
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Photos */}
            <div className="bg-white rounded-xl shadow-xl shadow-blue-100 border border-blue-500/20">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Company Gallery
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.companyPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Company photo ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Business Statistics */}
            <div className="bg-white rounded-xl shadow-xl shadow-blue-100 border border-blue-500/20">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Business Statistics
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      Years in Business
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {profile.experience.yearsInBusiness}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-green-600" />
                    <span className="font-medium text-gray-900">
                      Total Projects
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {profile.experience.totalProjects}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                    <span className="font-medium text-gray-900">Rating</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">
                    4.8
                  </span>
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-white rounded-xl shadow-xl shadow-blue-100 border border-blue-500/20">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Legal Information
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">GST Number</p>
                    <p className="text-gray-600 font-mono">
                      {profile.gstNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      GST Registration Date
                    </p>
                    <p className="text-gray-600">
                      {formatDate(profile.gstRegistrationDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <ModalEditProfile
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default ProfileSection;
