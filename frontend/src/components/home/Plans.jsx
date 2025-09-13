// import { useState } from "react";
// import { usePageTransition } from "../../hooks/usePageTransition";
// import { plans } from "../../constants/PricingPlans";
import { PricingCards } from "../Pricing/PricingCards";

const Plans = () => {
  // const { navigateWithTransition } = usePageTransition();
  // const [selectedPlan, setSelectedPlan] = useState("Prime"); // Default selected

  return (
    <section
      id="pricing"
      className="bg-white py-24 scroll-mt-20 [&_*]:cursor-default"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Select the perfect plan that suits your business needs and scale with
          confidence
        </p>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`
                border rounded-2xl shadow-lg p-8 flex flex-col bg-white
                transition-all duration-300
                cursor-pointer
                ${
                  selectedPlan === plan.name
                    ? "border-blue-600 ring ring-blue-600 shadow-2xl scale-105"
                    : "border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 hover:scale-105"
                }
              `}
              style={{
                boxShadow:
                  selectedPlan === plan.name
                    ? "0 0 0 4px #60a5fa33"
                    : undefined,
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {plan.name}
              </h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">
                {plan.price}
                {plan.period && (
                  <span className="text-lg text-gray-500">{plan.period}</span>
                )}
              </div>
              <ul className="mb-8 space-y-4 text-left text-base">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-blue-400 mr-2">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateWithTransition("/signup");
                }}
                className={`
                  group relative mt-auto w-full overflow-hidden bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-300
                  hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.02]
                  ${selectedPlan === plan.name ? "bg-blue-600" : ""}
                `}
              >
                <span className="relative z-10">{plan.buttonText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </button>
            </div>
          ))}
        </div> */}
        <PricingCards />
      </div>
    </section>
  );
};

export default Plans;
