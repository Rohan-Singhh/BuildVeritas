import { ArrowRight, BarChart3, Brain, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-12 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="animate-fade-in-left">
            <div className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs lg:text-sm font-medium mb-2 animate-shimmer">
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              AI-Powered Construction Budgeting
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Stop{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-shift">
                Guessing
              </span>
              <br />
              Start Building with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 animate-gradient-shift">
                Financial Certainty
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed animate-fade-in-up delay-300">
              Your dream project deserves a dream budget - one that's accurate,
              transparent, and free from surprises. Harness the power of{" "}
              <span className="text-purple-300 font-semibold">
                Artificial Intelligence
              </span>{" "}
              to see the true cost of your vision in minutes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
              <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  Get Your Free AI Estimate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-8 py-3 border-2 border-white/20 text-white rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-20 mt-10 animate-fade-in-up delay-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.2%</div>
                <div className="text-sm text-white/60">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/60">Projects Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2 Min</div>
                <div className="text-sm text-white/60">Average Time</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative">
              {/* Main AI Interface Mockup */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-semibold">
                      BuildVeritas
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div className="bg-white/20 rounded-2xl rounded-tl-sm p-4 max-w-xs">
                      <p className="text-white text-sm">
                        I'll help you estimate your construction budget. What
                        type of project are you planning?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl rounded-tr-sm p-4 max-w-xs">
                      <p className="text-white text-sm">
                        2-story residential house, 2500 sq ft, modern design
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">You</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div className="bg-white/20 rounded-2xl rounded-tl-sm p-4 max-w-xs">
                      <p className="text-white text-sm mb-2">
                        Analyzing your requirements...
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/80">
                          <span>Foundation & Structure</span>
                          <span>₹8,50,000</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/80">
                          <span>Electrical & Plumbing</span>
                          <span>₹3,20,000</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/80">
                          <span>Finishing & Interiors</span>
                          <span>₹6,80,000</span>
                        </div>
                        <div className="border-t border-white/20 pt-2">
                          <div className="flex justify-between text-sm text-white font-semibold">
                            <span>Total Estimate</span>
                            <span>₹18,50,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Ask about designs, costs, or timeline..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:border-purple-400"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl hover:scale-105 transition-transform">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute bottom-20 right-130 animate-float hidden lg:block z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Real-time Data</span>
          </div>
        </div>
      </div>

      <div className="absolute top-24 right-8 animate-float delay-200 hidden lg:block z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-sm font-medium">Live Data Processing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
