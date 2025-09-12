import { useNavigate } from "react-router-dom";
import { sections } from "../../constants/FeatureSection";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Header Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-0 pt-16 sm:pt-20 lg:pt-24">
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
            Powerful Features for{" "}
            <span className="text-blue-400 mt-2">Modern Construction</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to manage construction projects efficiently and
            profitably with cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Features Sections */}
      <div className="relative">
        {sections.map((section, index) => (
          <div key={section.id} className="relative">
            {/* Background Pattern */}
            <div
              className={`absolute inset-0 ${
                index % 2 === 0 ? "bg-white" : "bg-blue-50/30"
              }`}
            ></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center`}
              >
                {/* Text Content */}
                <div
                  className={`lg:col-span-6 space-y-6 sm:space-y-5 ${
                    section.reverse
                      ? "lg:order-2 lg:col-start-7"
                      : "lg:order-1 lg:col-start-1"
                  }`}
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg">
                    <section.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4 sm:space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                        {section.heading}
                      </h2>
                      <h3 className="text-lg sm:text-xl md:text-2xl text-blue-400 font-semibold leading-tight">
                        {section.subheading}
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-2xl">
                      {section.description}
                    </p>
                    {/* CTA Button */}
                    {section.id === 1 && (
                      <button
                        className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-200"
                        onClick={() => navigate("/project-management")}
                      >
                        Live Project Dashboard
                      </button>
                    )}
                    {section.id === 2 && (
                      <button
                        className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-200"
                        onClick={() => navigate("/marketplace")}
                      >
                        Vendor Marketplace
                      </button>
                    )}
                    {section.id === 3 && (
                      <button
                        className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-200"
                        onClick={() => navigate("/analytics")}
                      >
                        AI Analytics
                      </button>
                    )}
                    {section.id === 4 && (
                      <button
                        className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-200"
                        onClick={() => navigate("/budget-estimator")}
                      >
                        AI-Powered Budget Estimator
                      </button>
                    )}
                  </div>

                  {/* CTA Button */}
                </div>

                {/* Image */}
                <div
                  className={`lg:col-span-6 ${
                    section.reverse
                      ? "lg:order-1 lg:col-start-1"
                      : "lg:order-2 lg:col-start-7"
                  }`}
                >
                  <div className="relative group">
                    <div className="relative rounded-2xl shadow-lg sm:shadow-2xl shadow-blue-300">
                      <img
                        src={section.imageUrl}
                        alt={section.heading}
                        className="w-full h-48 sm:h-56 md:h-68 lg:h-[300px] xl:h-[350px] object-cover rounded-xl transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Features;
