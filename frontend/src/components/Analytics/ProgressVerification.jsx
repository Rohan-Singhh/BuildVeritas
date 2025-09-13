import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  Camera,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";

export const ProgressVerification = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const aiSteps = [
    {
      icon: Camera,
      title: "Daily Visuals Captured",
      description:
        "Your on-site team captures and uploads daily photos and videos via the BuildBridge app",
      color: "from-blue-500 to-cyan-500",
      mockup: "Camera interface with upload progress",
    },
    {
      icon: Brain,
      title: "AI Analysis Begins",
      description:
        "Our intelligent algorithms analyze visual data, recognizing construction stages and measuring progress",
      color: "from-purple-500 to-pink-500",
      mockup: "AI processing dashboard with analysis results",
    },
    {
      icon: Search,
      title: "Plan vs. Reality Check",
      description:
        "System cross-references photos with digital blueprints to verify dimensions and layouts",
      color: "from-green-500 to-teal-500",
      mockup: "Blueprint comparison view with overlay",
    },
    {
      icon: AlertTriangle,
      title: "Instant Anomaly Alerts",
      description:
        "AI detects deviations and sends immediate alerts to prevent small issues from becoming costly problems",
      color: "from-orange-500 to-red-500",
      mockup: "Alert notification system",
    },
  ];

  return (
    <section id="ai-verification" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <Motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} // start hidden & slightly below
          whileInView={{ opacity: 1, y: 0 }} // animate when in view
          transition={{ duration: 0.6, ease: "easeOut" }} // smooth effect
          viewport={{ once: true, amount: 0.1 }} // triggers when 10% visible
          id="ai-verification"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4 mr-2" />
            Revolutionary Technology
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-5xl mx-auto">
            Your Unbiased Eyes on Site:{" "}
            <span className="gradient-text">
              AI-Powered Progress Verification
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            This is where construction management takes a quantum leap forward.
            We use state-of-the-art computer vision technology to serve as your
            virtual, impartial site inspector.
          </p>
        </Motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <Motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            id="ai-verification"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Here's how this revolutionary feature works:
            </h3>

            <div className="space-y-6">
              {aiSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-5 rounded-xl transition-all duration-500 ${
                    currentStep === index
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg transform scale-105"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${step.color} text-white flex-shrink-0`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>

                  {currentStep === index && (
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-3xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold">AI Analysis Dashboard</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Foundation Analysis</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="bg-white/20 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full animate-progress-bar"
                      style={{ "--progress": "100%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Wall Framing</span>
                    <Clock className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="bg-white/20 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full animate-progress-bar"
                      style={{ "--progress": "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Electrical Rough-in</span>
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="bg-white/20 rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full animate-progress-bar"
                      style={{ "--progress": "45%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-semibold">
                    Anomaly Detected
                  </span>
                </div>
                <p className="text-xs text-white/80">
                  Electrical outlet placement deviation from blueprint detected
                  in Room 3
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white border border-blue-100 rounded-full p-3 shadow-lg animate-bounce">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </Motion.div>
        </div>

        <Motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-lg text-gray-700 font-medium bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            This provides an <strong>incorruptible layer of oversight</strong>,
            ensuring accountability and quality at every stage.
          </p>
        </Motion.div>
      </div>
    </section>
  );
};
