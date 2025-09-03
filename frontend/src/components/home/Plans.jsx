import { usePageTransition } from "../../hooks/usePageTransition";

const Plans = () => {
  const { navigateWithTransition } = usePageTransition();
  
  return (
    <section id="pricing" className="bg-white py-24 scroll-mt-20 [&_*]:cursor-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Select the perfect plan that suits your business needs and scale with confidence
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Starter Plan */}
          <div onClick={() => navigateWithTransition('/signup')} className="border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 cursor-fancy">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Starter</h3>
            <div className="text-4xl font-bold text-blue-400 mb-6">
              ₹2,999<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-left text-base">
              {[
                "Basic project tracking",
                "AI budget estimation",
                "Email support",
                "Up to 3 projects",
                "Community access",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-blue-400 mr-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
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
              onClick={() => navigateWithTransition('/signup')}
              className="group relative mt-auto w-full overflow-hidden bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.02] cursor-fancy"
            >
              <span className="relative z-10">Choose Starter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>
          </div>

          {/* Prime Plan */}
          <div onClick={() => navigateWithTransition('/signup')} className="border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 cursor-fancy">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Prime</h3>
            <div className="text-4xl font-bold text-blue-400 mb-6">
              ₹5,999<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-left text-base">
              {[
                "All Starter features",
                "Advanced site verification",
                "Priority email support",
                "Up to 10 projects",
                "Team collaboration",
                "Custom reports",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-blue-400 mr-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
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
              onClick={() => navigateWithTransition('/signup')}
              className="group relative mt-auto w-full overflow-hidden bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.02] cursor-fancy"
            >
              <span className="relative z-10">Choose Prime</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>
          </div>

          {/* Professional Plan */}
          <div onClick={() => navigateWithTransition('/signup')} className="border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 cursor-fancy">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Professional
            </h3>
            <div className="text-4xl font-bold text-blue-400 mb-6">
              ₹9,999<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-left text-base">
              {[
                "All Prime features",
                "Unlimited projects",
                "Phone & chat support",
                "AI-powered analytics",
                "Dedicated onboarding",
                "Integration API",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-blue-400 mr-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
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
              onClick={() => navigateWithTransition('/signup')}
              className="group relative mt-auto w-full overflow-hidden bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.02] cursor-fancy"
            >
              <span className="relative z-10">Choose Professional</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>
          </div>

          {/* Enterprise Custom Plan */}
          <div onClick={() => navigateWithTransition('/signup')} className="border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 cursor-fancy">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Enterprise Custom
            </h3>
            <div className="text-4xl font-bold text-blue-400 mb-6">
              Contact Us
            </div>
            <ul className="mb-8 space-y-4 text-left text-base">
              {[
                "All Professional features",
                "Custom integrations",
                "Dedicated account manager",
                "On-site training",
                "24/7 priority support",
                "Custom SLA",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-blue-400 mr-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
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
              onClick={() => navigateWithTransition('/signup')}
              className="group relative mt-auto w-full overflow-hidden bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.02] cursor-fancy"
            >
              <span className="relative z-10">Contact Sales</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;