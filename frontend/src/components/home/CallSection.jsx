const CallSection = () => {
  return (
    // Enhanced Call to Action Section
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="space-y-6 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            Ready to Transform Your
            <span className="block text-yellow-500">
              Construction Projects?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Join thousands of construction professionals using BuildBridge AI to
            build smarter and faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4">
            <button className="group inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white hover:bg-gray-50 text-blue-700 font-bold text-sm sm:text-base rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Try Demo Login Now
              <svg
                className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CallSection;
