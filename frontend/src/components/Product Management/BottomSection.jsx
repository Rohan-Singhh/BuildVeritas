import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Eye,
  Shield,
  Star,
} from "lucide-react";

export const BottomSection = () => {
  return (
    <section id="cta" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready for 100% visibility and zero confusion?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Step into the future of project management. It's time to see
            everything, all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Eye className="mr-3 h-6 w-6" />
              See a Demo of the Live Dashboard
              <ArrowRight className="ml-3 h-6 w-6" />
            </button>

            <button className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200">
              Schedule a Consultation
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-600">
          <div className="flex flex-col items-center">
            <Shield className="w-7 h-7 text-blue-600 mb-2" />
            <span className="text-sm text-gray-600">Bank-Level Security</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-7 h-7 text-blue-600 mb-2" />
            <span className="text-sm text-gray-600">5-Star Support</span>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 className="w-7 h-7 text-blue-600 mb-2" />
            <span className="text-sm text-gray-600">Real-Time Updates</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="w-7 h-7 text-blue-600 mb-2" />
            <span className="text-sm text-gray-600">Proven Results</span>
          </div>
        </div>
      </div>
    </section>
  );
};
