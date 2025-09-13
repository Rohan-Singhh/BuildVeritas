import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CallSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              It's time for a construction experience free from doubt.
            </h2>

            <p className="text-xl text-blue-800 leading-relaxed">
              Experience a new standard of trust, transparency, and quality
              assurance. Build with the confidence that only data-driven
              verification can provide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More About Our Technology
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="group bg-transparent px-8 py-4 rounded-xl font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 animate-fade-in-up delay-400">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">1M+</div>
              <div className="text-sm text-blue-900">Images Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">99.7%</div>
              <div className="text-sm text-blue-900">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-sm text-blue-900">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">500+</div>
              <div className="text-sm text-blue-900">Projects Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-600/5 rounded-full animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-600/10 rounded-full animate-pulse"></div>
    </section>
  );
};
