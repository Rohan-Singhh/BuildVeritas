import { motion as Motion } from "framer-motion";
import { Clock, Shield, Target } from "lucide-react";

export const ValueBoxes = () => {
  const benefits = [
    {
      icon: Target,
      title: "Objective Verification",
      description:
        "Move from subjective reports to data-driven proof of progress",
      stat: "99.7%",
      statLabel: "Accuracy Rate",
    },
    {
      icon: Clock,
      title: "Early Issue Detection",
      description: "Catch errors and deviations early, saving time and money",
      stat: "85%",
      statLabel: "Cost Reduction",
    },
    {
      icon: Shield,
      title: "Enhanced Accountability",
      description: "Ensure the work you're paying for is the work being done",
      stat: "100%",
      statLabel: "Transparency",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-3xl hover:shadow-blue-200 transition-all duration-500 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1, // same as delay-100, delay-200, etc.
              }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl">
                  <benefit.icon className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {benefit.statLabel}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
