import { Brain, MapPin, Zap } from "lucide-react";

export const IconGridSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group text-center animate-fade-in-up delay-100">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Brain size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Machine Learning Core
            </h3>
            <p className="text-gray-600">
              Constantly evolving for greater accuracy.
            </p>
          </div>

          <div className="group text-center animate-fade-in-up delay-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <MapPin size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Hyper-Local Costing
            </h3>
            <p className="text-gray-600">Pinpoint accuracy for your city.</p>
          </div>

          <div className="group text-center animate-fade-in-up delay-500">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Zap size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Predictive Analytics
            </h3>
            <p className="text-gray-600">Foresee costs before they happen.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
