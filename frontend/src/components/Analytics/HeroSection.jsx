import { Brain, ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="space-y-2">
              <div className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-fade-in-up">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Verification
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up delay-100">
                Trust, but Verify{" "}
                <span className="gradient-text">With the Power of AI</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up delay-200">
                Go beyond spoken promises and subjective reports. Our
                groundbreaking AI acts as your unbiased eyes on the site,
                verifying progress against your plans, while our streamlined
                communication tools ensure every conversation builds trust, not
                friction.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn More About Our Technology
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 flex items-center justify-center hover:shadow-lg transform hover:-translate-y-1">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-2 animate-fade-in-up delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">99.7%</div>
                <div className="text-sm text-gray-600">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-500">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                AI Verified ✓
              </div>

              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="AI Construction Analysis"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Progress Analysis
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    ✓ Verified
                  </span>
                </div>

                <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-full animate-progress-bar"
                    style={{ "--progress-width": "87%" }}
                  ></div>
                </div>

                <div className="text-sm text-gray-600">
                  87% Complete - On Schedule
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  AI Monitoring Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
