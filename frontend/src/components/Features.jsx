import { sections } from "../constants/FeatureSection";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Powerful Features for
              <span className="block text-blue-400 mt-2">
                Modern Construction
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Everything you need to manage construction projects efficiently
              and profitably with cutting-edge technology.
            </p>
          </div>
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
                  className={`lg:col-span-6 space-y-6 sm:space-y-8 ${
                    section.reverse
                      ? "lg:order-2 lg:col-start-7"
                      : "lg:order-1 lg:col-start-1"
                  }`}
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg">
                    <section.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-3">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                        {section.heading}
                      </h2>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-400 font-semibold leading-tight">
                        {section.subheading}
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-2xl">
                      {section.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  {section.id === 1 && (
                    <button
                      className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow transition duration-200"
                      onClick={() => navigate("/project-management")}
                    >
                      Live Project Dashboard
                    </button>
                  )}
                  {section.id === 2 && (
                    <button
                      className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow transition duration-200"
                      onClick={() => navigate("/marketplace")}
                    >
                      Vendor Marketplace
                    </button>
                  )}
                  {section.id === 3 && (
                    <button
                      className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow transition duration-200"
                      onClick={() => navigate("/analytics")}
                    >
                      AI Analytics
                    </button>
                  )}
                  {section.id === 4 && (
                    <button
                      className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow transition duration-200"
                      onClick={() => navigate("/budget-estimator")}
                    >
                      AI-Powered Budget Estimator
                    </button>
                  )}
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
                    {/* <div className="absolute -inset-4 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div> */}
                    <div className="relative rounded-2xl shadow-lg sm:shadow-2xl shadow-blue-200">
                      <img
                        src={section.imageUrl}
                        alt={section.heading}
                        className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[450px] object-cover rounded-xl transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* <div className="absolute inset-2 sm:inset-3 bg-gradient-to-tr from-yellow-400/10 via-transparent to-amber-400/10 rounded-xl pointer-events-none"></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "10K+", label: "Projects Completed" },
              { number: "500+", label: "Active Companies" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "24/7", label: "Expert Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
