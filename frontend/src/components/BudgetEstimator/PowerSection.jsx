import {
  Brain,
  DollarSign,
  IndianRupee,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";

export const PowerSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
            <Brain className="w-4 h-4 mr-2" />
            AI Technology
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            From Guesswork to Gospel:
            <br />
            The Power of Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our AI Budget Estimator is not a simple calculator. It's an{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              intelligent financial planning engine
            </span>
            , fueled by a massive, ever-learning database of real-world Indian
            construction projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-left">
            <div className="relative">
              <img
                src="/BudgetEstimator-dashboard-2.png"
                alt="Budget Estimator Dashboard"
                className="rounded-2xl shadow-construction animate-float-delayed"
              />

              {/* Floating Analytics Cards */}
              <div className="absolute -top-6 -right-4 bg-white border border-gray-200 rounded-xl p-2 md:p-3 lg:p-4 ">
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">
                    Cost Analysis Complete
                  </span>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  98% Accuracy Score
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-xl p-2 md:p-3 lg:p-4">
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">
                    ₹24.5L - ₹28.2L
                  </span>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  Estimated Range
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in-right">
            <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Fueled by Real Data
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our AI analyzes thousands of data points, from local
                    material costs in your specific city and real-time labor
                    rates to the financial impact of different architectural
                    styles.
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Deep Market Insight
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    It understands the complex relationships between these
                    variables, ensuring your estimate is grounded in the current
                    market reality, not last year's prices.
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Unparalleled Precision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    By learning from a vast repository of completed projects,
                    our AI delivers a forecast that is significantly more
                    accurate than traditional methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
