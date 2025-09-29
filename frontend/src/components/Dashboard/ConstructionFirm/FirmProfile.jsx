import { useState } from "react";
import {
  Edit3,
  MapPin,
  Building2,
  Calendar,
  TrendingUp,
  User,
  Mail,
  Phone,
  FileText,
  Hash,
  CalendarCheck,
} from "lucide-react";
import { RiContactsBook3Line } from "react-icons/ri";
import { LiaAwardSolid } from "react-icons/lia";
import EditProfileModal from "./EditProfileModal";

const FirmProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@elitebuilders.com",
    phoneNumber: "+91 98765 43210",
    companyName: "Elite Builders Co.",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
    },
    experience: {
      yearsInBusiness: 15,
      totalProjects: 139,
    },
    gstDetails: {
      number: "27ABCDE1234F1Z5",
      registrationDate: "2020-01-01",
    },
    specializations: ["Luxury Residential", "High-end Commercial"],
    companyLogo:
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758449486/logo_2_xqkdrk.webp",
    companyPhotos: [
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758439487/Building_2_xroatp.png",
      "https://res.cloudinary.com/dnzbzvfxn/image/upload/v1758439487/Building_1_edmfwz.png",
    ],
    activeProjects: [
      {
        name: "Luxury Apartments",
        location: "Mumbai",
        startDate: "2023-01-01",
        expectedCompletion: "2024-01-01",
        status: "in_progress",
        type: "residential",
        value: 10000000,
      },
      {
        name: "Luxury Apartments",
        location: "Mumbai",
        startDate: "2023-01-01",
        expectedCompletion: "2024-01-01",
        status: "in_progress",
        type: "residential",
        value: 10000000,
      },
    ],
  });

  const handleUpdateProfile = (updatedData) => {
    setProfileData(updatedData);
  };

  const formatSpecialization = (spec) => {
    return spec.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <section className="">
        <div className="mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 text-lg">
                Manage your construction business information
              </p>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-500/90 transition-all duration-200 hover:scale-105 shadow-2xl"
              >
                <Edit3 className="h-5 w-5" />
                Edit Profile
              </button>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Company Overview Card */}
              <div className="lg:col-span-2 rounded-2xl p-8 shadow-xl shadow-blue-100 border border-blue-500/20 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-6 mb-8">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-18 h-18 rounded-xl overflow-hidden border-4 border-blue-500/20 shadow-xl shadow-blue-100">
                      {profileData.companyLogo ? (
                        <img
                          src={profileData.companyLogo}
                          alt={profileData.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-500/10 flex items-center justify-center">
                          <Building2 className="h-10 w-10 text-blue-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {profileData.companyName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>
                        {profileData.location.city},{" "}
                        {profileData.location.state}
                      </span>
                    </div>

                    {/* Experience Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-500">
                            Years Experience
                          </span>
                        </div>
                        <p className="text-xl font-bold text-blue-500 text-center">
                          {profileData.experience.yearsInBusiness}+
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
                        <div className="flex items-center justify-center  gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-500">
                            Projects Completed
                          </span>
                        </div>
                        <p className="text-xl font-bold text-blue-500 text-center">
                          {profileData.experience.totalProjects}+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <LiaAwardSolid className="h-5 w-5 text-blue-500" />
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2 px-4">
                    {profileData.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium border border-blue-500/20"
                      >
                        {formatSpecialization(spec)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <RiContactsBook3Line className="h-5 w-5 text-blue-500" />
                    Contact Information
                  </h4>

                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-lg">
                      <User className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Full Name
                        </p>
                        <p className="text-gray-800 font-medium">
                          {profileData.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-lg">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-gray-800 font-medium">
                          {profileData.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-lg">
                      <Phone className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        <p className="text-gray-800 font-medium">
                          {profileData.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Legal Information
                  </h4>

                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-lg">
                      <Hash className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          GST Number
                        </p>
                        <p className="text-gray-800 font-medium font-mono">
                          {profileData.gstDetails.number}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-lg">
                      <CalendarCheck className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          GST Registration Date
                        </p>
                        <p className="text-gray-800 font-medium">
                          {new Date(
                            profileData.gstDetails.registrationDate
                          ).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Projects Summary */}
                {profileData.activeProjects.length > 0 && (
                  <div className="">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      Active Projects
                    </h4>

                    <div className="grid grid-cols-2 space-x-3">
                      {profileData.activeProjects
                        .slice(0, 2)
                        .map((project, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20"
                          >
                            <h5 className="font-semibold text-gray-800">
                              {project.name}
                            </h5>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full">
                                {formatSpecialization(project.type)}
                              </span>
                              <span className="font-semibold text-blue-500 text-sm">
                                {formatCurrency(project.value)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Company Photos and Completed Projects */}
              <div className="space-y-6">
                {/* Company Photos */}
                <div className="rounded-2xl p-6 shadow-xl shadow-blue-100 border border-blue-500/20">
                  {profileData.companyPhotos &&
                    profileData.companyPhotos.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          Company Gallery
                        </h4>
                        <div className="grid gap-4">
                          {profileData.companyPhotos
                            .slice(0, 2)
                            .map((photo, index) => (
                              <div
                                key={index}
                                className="rounded-lg overflow-hidden shadow-xl shadow-blue-100"
                              >
                                <img
                                  src={photo}
                                  alt={`Company photo ${index + 1}`}
                                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* GST & Legal Info */}
                <div className="rounded-2xl p-6 shadow-xl shadow-blue-100 border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    Completed Projects
                  </h4>

                  <div className="space-y-3">
                    {profileData.activeProjects
                      .slice(0, 2)
                      .map((project, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20"
                        >
                          <h5 className="font-semibold text-gray-800">
                            {project.name}
                          </h5>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full">
                              {formatSpecialization(project.type)}
                            </span>
                            <span className="font-semibold text-blue-500 text-sm">
                              {formatCurrency(project.value)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Active Projects Summary */}
                {/* {profileData.activeProjects.length > 0 && (
                  <div className="rounded-2xl p-6 shadow-xl shadow-blue-100 border border-blue-500/20">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      Active Projects
                    </h4>

                    <div className="space-y-3">
                      {profileData.activeProjects
                        .slice(0, 2)
                        .map((project, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20"
                          >
                            <h5 className="font-semibold text-gray-800">
                              {project.name}
                            </h5>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full">
                                {formatSpecialization(project.type)}
                              </span>
                              <span className="font-semibold text-blue-500 text-sm">
                                {formatCurrency(project.value)}
                              </span>
                            </div>
                          </div>
                        ))}
                      {profileData.activeProjects.length > 2 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{profileData.activeProjects.length - 2} more projects
                        </p>
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onUpdateProfile={handleUpdateProfile}
      />
    </>
  );
};

export default FirmProfile;
