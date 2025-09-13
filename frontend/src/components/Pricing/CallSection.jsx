import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CallSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float animation-delay-300"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Get Started?
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Transform Your Construction Business Today
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of clients and contractors who trust BuildVeritas for
            accurate project budgeting and seamless project management.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group px-10 py-4 bg-white text-gray-900 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center">
                Start Free Trial
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-10 py-4 border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              Contact Now
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-white/70">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>99.2% accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
