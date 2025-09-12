import { Target } from "lucide-react";

export const ProblemSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-left">
            <div className="inline-flex items-center px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-3">
              <Target className="w-4 h-4 mr-2" />
              The Problem
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              Is Your Budget Built on
              <span className="text-red-500"> Hope</span> or
              <span className="text-red-500"> Hard Data</span>?
            </h2>

            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                Embarking on a construction project begins with one critical
                question:
                <em className="text-gray-900 font-semibold">
                  "How much will it really cost?"
                </em>
              </p>

              <p>
                For too long, the answer has been a frustrating mix of vague
                estimates, confusing quotes, and outdated 'per square foot'
                numbers that leave you exposed to massive budget overruns.
              </p>

              <p className="text-gray-900 font-semibold">
                This initial uncertainty is the seed of financial stress. We're
                here to change that.
              </p>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20 animate-pulse-glow"></div>
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
                alt="Construction planning and blueprints"
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="animate-fade-in-scale mt-8 p-4 md:p-6 lg:p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-100">
          <p className="text-gray-800 font-medium text-lg leading-relaxed">
            Welcome to the{" "}
            <span className="text-blue-700 font-bold">
              BuildVeritas Budget Estimator
            </span>
            , a revolutionary tool that replaces guesswork with the surgical
            precision of data science.
          </p>
        </div>
      </div>
    </section>
  );
};
