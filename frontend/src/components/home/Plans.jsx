const Plans = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">
        Choose Your Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Starter Plan */}
        <div className="border border-yellow-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
          <div className="text-3xl font-bold text-yellow-500 mb-4">
            ₹2,999<span className="text-base text-gray-500">/mo</span>
          </div>
          <ul className="mb-6 space-y-3 text-left">
            {[
              "Basic project tracking",
              "AI budget estimation",
              "Email support",
              "Up to 3 projects",
              "Community access",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">
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
          <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
            Choose Starter
          </button>
        </div>
        {/* Prime Plan */}
        <div className="border border-yellow-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Prime</h3>
          <div className="text-3xl font-bold text-yellow-500 mb-4">
            ₹5,999<span className="text-base text-gray-500">/mo</span>
          </div>
          <ul className="mb-6 space-y-3 text-left">
            {[
              "All Starter features",
              "Advanced site verification",
              "Priority email support",
              "Up to 10 projects",
              "Team collaboration",
              "Custom reports",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">
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
          <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
            Choose Prime
          </button>
        </div>
        {/* Professional Plan */}
        <div className="border border-yellow-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Professional
          </h3>
          <div className="text-3xl font-bold text-yellow-500 mb-4">
            ₹9,999<span className="text-base text-gray-500">/mo</span>
          </div>
          <ul className="mb-6 space-y-3 text-left">
            {[
              "All Prime features",
              "Unlimited projects",
              "Phone & chat support",
              "AI-powered analytics",
              "Dedicated onboarding",
              "Integration API",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">
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
          <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
            Choose Professional
          </button>
        </div>
        {/* Enterprise Custom Plan */}
        <div className="border border-yellow-100 rounded-2xl shadow-lg p-8 flex flex-col bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Enterprise Custom
          </h3>
          <div className="text-3xl font-bold text-yellow-500 mb-4">
            Contact Us
          </div>
          <ul className="mb-6 space-y-3 text-left">
            {[
              "All Professional features",
              "Custom integrations",
              "Dedicated account manager",
              "On-site training",
              "24/7 priority support",
              "Custom SLA",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">
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
          <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Plans;
