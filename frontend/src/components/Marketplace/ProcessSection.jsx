import {
  Award,
  Building,
  CheckCircle,
  Clock,
  FileCheck,
  MessageCircle,
  Shield,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const vettingSteps = [
    {
      icon: FileCheck,
      title: "Business & Legal Verification",
      description:
        "We confirm their company registration, GST compliance, and all necessary licenses. No exceptions.",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Building,
      title: "Portfolio Deep Dive",
      description:
        "Our experts meticulously review their past projects, assessing the quality of workmanship, design execution, and adherence to standards.",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      icon: MessageCircle,
      title: "Authentic Client Feedback",
      description:
        "We go beyond online reviews. We speak directly with their past clients to get honest, unfiltered feedback on their professionalism and reliability.",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: UserCheck,
      title: "Performance & Integrity Interview",
      description:
        "We conduct a one-on-one interview to ensure their values of transparency and customer commitment align with ours.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];

  useEffect(() => {
    // Auto-cycle through vetting steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Ironclad Vetting Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The BuildVeritas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Seal of Approval
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
            A professional can't simply buy their way onto our platform. They
            have to earn it. The{" "}
            <span className="font-semibold text-gray-900">
              "BuildVeritas Verified Badge"
            </span>{" "}
            is a symbol of trust, signifying that a professional has passed our
            rigorous, multi-point inspection.
          </p>
        </div>

        {/* Interactive Vetting Steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps List */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            {vettingSteps.map((step, index) => (
              <div
                key={index}
                className={`group p-5 rounded-3xl border-2 transition-all duration-500 ${
                  activeStep === index
                    ? `${step.bgColor} border-blue-300 shadow-xl scale-105`
                    : "bg-white border-gray-200 hover:border-blue-200 hover:shadow-lg"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      activeStep === index
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110`
                        : `${step.bgColor} ${step.textColor}`
                    }`}
                  >
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-1 transition-colors ${
                        activeStep === index ? step.textColor : "text-gray-900"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeStep === index
                        ? "bg-green-500 text-white scale-110"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Representation */}
          <div className="animate-fade-in-up delay-400">
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                  <Sparkles className="w-6 h-6" />
                  Verification in Progress
                </div>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-6">
                {vettingSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        index <= activeStep
                          ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          index <= activeStep
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                          style={{
                            width:
                              index === activeStep
                                ? "100%"
                                : index < activeStep
                                ? "100%"
                                : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className={`transition-all duration-500 ${
                        index <= activeStep ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {index <= activeStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  <Award className="w-5 h-5" />
                  Only the best of the best are invited to join our network
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
