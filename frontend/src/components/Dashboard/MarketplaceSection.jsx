import { Camera, Star, Verified } from "lucide-react";
import { constructionFirms } from "../../constants/Dashboard/ConstructionFirms";
// import { useEffect, useState } from "react";

export const MarketplaceSection = () => {
  // const [constructionFirms, setConstructionFirms] = useState([]);

  // useEffect(() => {
  //   const fetchVendors = async () => {
  //     try {
  //       const res = await fetch("/api/vendor/all");
  //       if (!res.ok) throw new Error("Failed to fetch vendors");

  //       const data = await res.json();
  //       setConstructionFirms(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchVendors();
  // }, []);

  // console.log(constructionFirms);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        {constructionFirms.map((vendor, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in-up border border-gray-100"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Card Header with Company Info */}
            <div className="relative px-8 py-4 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-15 h-15 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={vendor.companyLogo}
                        alt={vendor.companyName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {vendor.companyName}
                      </h3>
                      {vendor.verified && (
                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                          <Verified className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-600">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      {vendor.status === "Active" && (
                        <span className="flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <div className="w-[3.5px] h-[3.5px] bg-green-500 rounded-full mr-1 animate-ping"></div>
                          <span>{vendor.status}</span>
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">
                        {vendor.city}, {vendor.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2">
                {vendor.specializations.map((spec, specIndex) => (
                  <span
                    key={specIndex}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full shadow-lg"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="px-8 py-4 bg-white border-b border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-xl font-black text-blue-600 mb-1">
                    {vendor.yearsInBusiness}+
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    Years Experience
                  </div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="text-xl font-black text-purple-600 mb-1">
                    {vendor.totalProjects}
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Section */}
            <div className="px-8 py-2 bg-white border-b border-gray-100">
              <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-blue-600" />
                Recent Projects
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {vendor.companyPhotos.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    className="relative group/photo overflow-hidden rounded-xl"
                  >
                    <img
                      src={photo}
                      alt={`${vendor.companyName} project ${photoIndex + 1}`}
                      className="w-full h-30 object-cover group-hover/photo:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services and CTA */}
            <div className="px-8 py-4 bg-white flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-3.5 h-3.5 ${
                        starIndex < Math.floor(vendor.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {vendor.rating}
                  </span>{" "}
                  ({vendor.reviewCount} reviews)
                </div>
              </div>

              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Profile
              </button>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
