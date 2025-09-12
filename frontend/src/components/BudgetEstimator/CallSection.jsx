import { Calculator, Star } from "lucide-react";

export const CallSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-400/20"></div> */}
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          {/* <div className="inline-flex items-center px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Ready to Get Started?
          </div> */}

          <h2 className="text-4xl md:text-6xl text-black font-bold mb-8 leading-tight">
            Ready to see the true cost of your vision?
          </h2>

          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Don't take another step without a data-driven plan. Build your dream
            on a foundation of financial certainty.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 bg-blue-300 text-gray-900 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-blue-400 hover:scale-105 hover:shadow-2xl overflow-hidden">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              <span className="relative flex items-center">
                Get Your Free AI-Powered Estimate Today
                <Calculator className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>

          {/* <div className="mt-12 flex items-center justify-center space-x-8 text-white/60">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>100% Free</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
