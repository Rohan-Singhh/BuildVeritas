import { motion as Motion } from "framer-motion";
import {
  Brain,
  Camera,
  CheckCircle,
  ChevronRight,
  DollarSign,
  MessageSquare,
  Monitor,
  TrendingUp,
} from "lucide-react";

export const CommunicationSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Unified Communication",
      description:
        "All project conversations, decisions, and updates in one centralized hub with real-time notifications and message tracking.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      stats: "100% Message Tracking",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description:
        "Visual charts and metrics showing project advancement, timeline adherence, quality scores, and performance insights with predictive analytics.",
      image:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      stats: "Real-time Updates",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Intelligent analysis of project data providing predictive insights, automated quality verification, risk assessment, and optimization recommendations.",
      image:
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      stats: "99.7% Accuracy",
    },
  ];

  return (
    <section
      id="communication"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <Motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-3">
            <Monitor className="w-4 h-4 mr-2" />
            Live Project Dashboard
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Your Project's Command Center:
            <br />
            <span className="gradient-text">
              Real-Time Insights & Communication
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Experience unprecedented visibility into your project with our
            comprehensive dashboard that combines communication, progress
            tracking, and analytics in one powerful interface.
          </p>
        </Motion.div>

        {/* Compact Dashboard Preview */}
        <Motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 relative overflow-hidden border border-gray-100 max-w-4xl mx-auto">
            {/* Floating Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16 animate-float"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full opacity-30 transform -translate-x-12 translate-y-12 animate-float-delayed"></div>

            <div className="relative z-10">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Project Dashboard
                    </h3>
                    <p className="text-sm text-gray-600">
                      Kitchen Renovation - Phase 2
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800">
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Progress Overview */}
                <div className="space-y-4">
                  {/* Progress Overview */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-900">
                        Project Progress
                      </h4>
                      <div className="text-xl font-bold text-blue-600">73%</div>
                    </div>
                    <div className="bg-white rounded-full h-2 mb-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full animate-progress-bar"
                        style={{ "--progress": "73%" }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-base font-bold text-green-600">
                          12
                        </div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-yellow-600">
                          3
                        </div>
                        <div className="text-xs text-gray-600">In Progress</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-600">
                          2
                        </div>
                        <div className="text-xs text-gray-600">Pending</div>
                      </div>
                    </div>
                  </div>

                  {/* Budget Utilization */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-base font-semibold text-gray-900">
                        Budget Utilization
                      </h4>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">
                          On Budget
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Used: $67,500
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          67%
                        </span>
                      </div>
                      <div className="bg-white rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-full animate-progress-bar"
                          style={{ "--progress": "67%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Total Budget: $100,000
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simple Analytics Graph */}
                <div className="space-y-4">
                  {/* Quality Score Graph */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-900">
                        Quality Score Trend
                      </h4>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">
                          98.5%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between h-20 space-x-1">
                      {[85, 88, 92, 89, 94, 96, 98].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-green-500 to-emerald-600 rounded-t animate-chart-grow"
                          style={{
                            "--bar-height": `${height}%`,
                            animationDelay: `${index * 100}ms`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>W1</span>
                      <span>W2</span>
                      <span>W3</span>
                      <span>W4</span>
                      <span>W5</span>
                      <span>W6</span>
                      <span>W7</span>
                    </div>
                  </div>

                  {/* Recent Updates */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-900">
                        Recent Updates
                      </h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 animate-slide-in-left">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Electrical work completed
                          </p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 animate-slide-in-left"
                        style={{ animationDelay: "200ms" }}
                      >
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Camera className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            New photos uploaded
                          </p>
                          <p className="text-xs text-gray-500">
                            15 minutes ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Dashboard Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Motion.div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: (index + 3) * 0.1, // delay-300, delay-400, etc.
              }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {feature.stats}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600 font-medium">
                      Live Dashboard
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Dashboard Stats */}
        <Motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }} // delay-700
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24 animate-float-delayed"></div>

          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Dashboard Performance
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Experience the power of real-time project visibility with our
              comprehensive dashboard solution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold mb-2 animate-glow">
                24/7
              </div>
              <div className="text-sm text-blue-200">Real-time Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold mb-2 animate-glow">
                99.9%
              </div>
              <div className="text-sm text-blue-200">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold mb-2 animate-glow">
                85%
              </div>
              <div className="text-sm text-blue-200">
                Faster Decision Making
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold mb-2 animate-glow">
                100%
              </div>
              <div className="text-sm text-blue-200">Project Transparency</div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};
