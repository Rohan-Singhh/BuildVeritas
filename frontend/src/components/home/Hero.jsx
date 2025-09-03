import React from "react";
import { Brain, Play, ArrowRight, Sparkles } from "lucide-react";

const VIDEO_HEIGHT = "65vh"; // keep video height single-sourced

const Hero = () => {
  return (
    <div
      className="relative max-h-screen overflow-hidden"
      style={{ paddingTop: VIDEO_HEIGHT }}
    >
      {/* Video Background (fixed height area at top) */}
      <div
        className="absolute top-0 left-0 right-0 w-full"
        style={{ height: VIDEO_HEIGHT, zIndex: 0 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/construction.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* Overlay content centered within the video area */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
        style={{ height: VIDEO_HEIGHT, zIndex: 10 }}
      >
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Small heading with icon */}
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-1 rounded-full border border-yellow-200">
              <Brain className="h-4 w-4 text-yellow-600" />
              <span className="text-xs font-medium text-yellow-700">
                AI-Powered Construction Management
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="block">Build Smarter with</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400">
              AI Intelligence
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Transform your construction projects with real-time tracking,
            AI-powered budget estimation, and intelligent site verification.
            Join thousands of construction professionals already using{" "}
            <span className="font-semibold text-yellow-400">
              BuildVeritas AI
            </span>
            .
          </p>
        </div>
      </div>

      {/* Content BELOW the video */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          {/* Try Demo Button */}
          <button className="group relative bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
            <span>Try Demo</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Watch Demo Button */}
          <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-xl font-semibold text-lg border-2 border-yellow-200 hover:border-yellow-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <Play className="h-3 w-3 text-white ml-0.5" />
            </div>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Stats or social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Trusted by 10,000+ professionals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>99.9% uptime guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>24/7 AI support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
