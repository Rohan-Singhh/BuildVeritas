import { useEffect, useState } from "react";
import {
  PlayCircle,
  Eye,
  Shield,
  BarChart3,
  Calendar,
  Camera,
  DollarSign,
  FileText,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

export const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Calendar,
      title: "Visual Project Timeline",
      description:
        "See your entire project schedule at a glance. Track completed milestones, monitor tasks in progress, and anticipate what's next.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Camera,
      title: "Real-Time Progress Feed",
      description:
        "Your virtual window to the construction site. Receive daily photo and video updates directly from your team.",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: DollarSign,
      title: "Financial Command Center",
      description:
        "Watch your budget in real-time. Track every payment and expense with precision and clarity.",
      color: "from-blue-700 to-blue-800",
    },
    {
      icon: FileText,
      title: "Centralized Document Hub",
      description:
        "All your essential files - plans, contracts, permits, invoices are stored securely in one place.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: MessageSquare,
      title: "Unified Communication Log",
      description:
        "Every message, decision, and change request is recorded in a single, chronological thread.",
      color: "from-blue-600 to-blue-800",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Every Detail, Every Day:{" "}
            <span className="text-blue-500">Inside the Dashboard</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            We've designed the dashboard to give you instant clarity, with all
            your critical information beautifully organized and always
            up-to-date.
          </p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? "bg-blue-50 border-2 border-blue-200 shadow-lg transform scale-105"
                      : "bg-gray-50 border-2 border-transparent hover:bg-blue-50 hover:border-blue-100"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-96 overflow-hidden">
                <div className="bg-white rounded-xl shadow-lg h-full p-6 transform transition-all duration-500">
                  {(() => {
                    const IconComponent = features[activeFeature].icon;
                    return (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {features[activeFeature].title}
                          </h4>
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${features[activeFeature].color} text-white`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Dynamic content based on active feature */}
                        <div className="space-y-4">
                          {activeFeature === 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  Foundation Complete
                                </span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  Framing in Progress
                                </span>
                                <Clock className="w-5 h-5 text-blue-500" />
                              </div>
                            </div>
                          )}

                          {activeFeature === 1 && (
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-gray-200 rounded-lg h-20 animate-pulse"></div>
                              <div className="bg-gray-200 rounded-lg h-20 animate-pulse"></div>
                              <div className="bg-gray-200 rounded-lg h-20 animate-pulse"></div>
                              <div className="bg-gray-200 rounded-lg h-20 animate-pulse"></div>
                            </div>
                          )}

                          {activeFeature === 2 && (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                  Budget Used
                                </span>
                                <span className="font-semibold text-blue-600">
                                  73%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full w-3/4"></div>
                              </div>
                              <div className="text-2xl font-bold text-gray-900">
                                Rs 14,96,500
                              </div>
                              <div className="text-sm text-gray-500">
                                of Rs 20,50,000 total
                              </div>
                            </div>
                          )}

                          {activeFeature === 3 && (
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-700">
                                  Building Plans v2.3
                                </span>
                              </div>
                              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-700">
                                  Permit Documentation
                                </span>
                              </div>
                              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-700">
                                  Invoice #2024-003
                                </span>
                              </div>
                            </div>
                          )}

                          {activeFeature === 4 && (
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700">
                                    Foundation inspection scheduled for Friday
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    2 hours ago
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700">
                                    Material delivery confirmed
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    5 hours ago
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
