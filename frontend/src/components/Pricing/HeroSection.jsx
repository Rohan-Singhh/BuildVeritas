import { Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <Star className="w-4 h-4 mr-2" />
            Transparent Pricing
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift">
              Perfect Plan
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Scale your construction business with confidence. Every plan
            includes our AI-powered budget estimation and comprehensive project
            management tools
          </p>

          {/* Pricing Toggle */}
          <div className="inline-flex items-center p-2 bg-white rounded-2xl shadow-lg">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300">
              Monthly
            </button>
            <button className="px-6 py-3 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:text-blue-600">
              Annual
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-[10px] rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
