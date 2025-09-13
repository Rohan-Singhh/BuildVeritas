import { CheckCircle, Shield, TrendingUp } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "For Clients",
      description:
        "Gain peace of mind and a true sense of control. Monitor progress from anywhere, track finances with precision, and communicate with clarity.",
      items: [
        "Unprecedented peace of mind",
        "True sense of control",
        "Monitor from anywhere",
        "Financial precision",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "For Builders",
      description:
        "Elevate your professionalism and efficiency. Streamline reporting, build unwavering trust with your clients, and keep projects on schedule with ease.",
      items: [
        "Elevated professionalism",
        "Streamlined reporting",
        "Unwavering client trust",
        "On-schedule delivery",
      ],
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Power of a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Single Source of Truth
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group animate-fade-in-up ${
                  index === 0 ? "delay-200" : "delay-400"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed text-base">
                  {benefit.description}
                </p>

                <div className="space-y-4">
                  {benefit.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex items-center gap-4 p-4 bg-gradient-to-r from-white to-blue-50 rounded-xl border border-blue-100 transform hover:scale-105 transition-all duration-300 animate-fade-in-up`}
                      style={{ animationDelay: `${(itemIndex + 1) * 100}ms` }}
                    >
                      <CheckCircle
                        className="w-5 h-5 text-green-600 flex-shrink-0 animate-bounce"
                        style={{ animationDelay: `${itemIndex * 200}ms` }}
                      />
                      <span className="text-gray-700 font-semibold text-lg">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
