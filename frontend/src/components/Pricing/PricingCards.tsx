import { useState } from "react";
import { plans } from "../../constants/PricingPlans";
import { ArrowRight, Check, Star } from "lucide-react";

export const PricingCards = () => {
  const [selectedPlan, setSelectedPlan] = useState("Prime");

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`group relative animate-fade-in-up ${
                selectedPlan === plan.name ? "scale-105 lg:scale-110" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div
                    className={`flex items-center bg-gradient-to-r ${plan.color} text-white px-2 py-2 rounded-full text-xs font-bold shadow-lg animate-bounce-gentle`}
                  >
                    <Star className="w-3 h-3 inline mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full ${
                  plan.bgColor
                } rounded-3xl p-7 border-2 ${
                  plan.popular
                    ? "border-purple-200 shadow-2xl"
                    : "border-gray-100 shadow-lg"
                } transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${plan.color} rounded-full blur-2xl`}
                  ></div>
                </div>

                {/* Header */}
                <div className="relative z-10 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${plan.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <plan.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-black text-gray-900">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="relative z-10 mb-8">
                  {plan.name === "Enterprise" ? (
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      Contact Us
                    </div>
                  ) : (
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl text-gray-600">₹</span>
                      <span className="text-4xl font-black text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-lg text-gray-600 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  )}
                  {/* <p className="text-sm text-gray-500">
                    Billed monthly, cancel anytime
                  </p> */}
                </div>

                {/* Features */}
                <div className="relative z-10 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="relative z-10">
                  <button
                    className={`w-full py-4 px-5 bg-gradient-to-r ${plan.color} text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group/btn`}
                  >
                    <span className="flex items-center justify-center">
                      {plan.buttonText}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
