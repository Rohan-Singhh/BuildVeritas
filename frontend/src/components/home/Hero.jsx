import React from "react";
import { Brain, Play, ArrowRight, Sparkles } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../../hooks/usePageTransition";

const Hero = () => {
  const { navigateWithTransition } = usePageTransition();
  return (
    <div className="relative min-h-[85vh] pt-16">
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/construction.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 h-full flex items-center justify-center pt-22 pb-8">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Small heading with icon */}
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-1 rounded-full border border-blue-200">
              <Brain className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium text-blue-600">
                AI-Powered Construction Management
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">Build Smarter with</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              AI Intelligence
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-200 max-w-4xl mx-auto leading-loose">
            Transform your construction projects with real-time tracking,
            AI-powered budget estimation, and intelligent site verification.
            Join thousands of construction professionals already using{" "}
            <span className="font-semibold text-blue-300">BuildVeritas</span>
          </p>
        </div>
      </div>

      {/* Action Buttons and Stats */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-gray-900/90 mt-4 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            {/* Try Demo Button */}
            <button className="group relative bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <span>Try Demo</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Watch Demo Button */}
            <button
              onClick={() => navigateWithTransition("/how-it-works")}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold text-lg border-2 border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats or social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>Trusted by 10,000+ professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>99.9% uptime guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>24/7 AI support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
