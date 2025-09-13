import {
  Award,
  Building,
  Calendar,
  Camera,
  Clock,
  IndianRupee,
  MapPin,
  Star,
} from "lucide-react";
import { projectData } from "../../constants/Dashboard/ProjectData";
import { sitePhotos } from "../../constants/Dashboard/SitePhotos";

export const ProjectSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
        <div className="flex items-end justify-between mb-6">
          <h4 className="text-xl font-bold text-blue-600">
            {projectData.name}
          </h4>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              In Progress
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {/* <h4 className="text-xl font-bold text-gray-900 mb-4">
              {projectData.name}
            </h4> */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">{projectData.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">
                  Started: {projectData.startDate}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">
                  Expected: {projectData.expectedCompletion}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <IndianRupee className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">
                  Budget: ₹{(projectData.totalBudget / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">
                Project Specifications
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Type:</span>
                  <span className="ml-2 font-medium">Residential Villa</span>
                </div>
                <div>
                  <span className="text-blue-600">Area:</span>
                  <span className="ml-2 font-medium">3,200 sq ft</span>
                </div>
                <div>
                  <span className="text-blue-600">Floors:</span>
                  <span className="ml-2 font-medium">2+ Basement</span>
                </div>
                <div>
                  <span className="text-blue-600">Bedrooms:</span>
                  <span className="ml-2 font-medium">4 BHK</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">
                Constructor Details
              </h5>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900">
                      Elite Builders Co.
                    </h6>
                    <p className="text-sm text-gray-500">Licensed Contractor</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>156 Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-3">
              Recent Site Photos
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {sitePhotos.map((photo, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={photo}
                    alt={`Site photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 group-hover:scale-105 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">
                Constructor Details
              </h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900">
                      Elite Builders Co.
                    </h6>
                    <p className="text-sm text-gray-500">Licensed Contractor</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>156 Projects</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
