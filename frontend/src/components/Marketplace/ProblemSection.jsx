import { AlertTriangle, Search, DollarSign, Clock } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "High-Stakes Gamble",
      description:
        "Finding a reliable builder feels like rolling dice with your dreams and finances.",
    },
    {
      icon: Search,
      title: "Limited Information",
      description:
        "Word-of-mouth is limited, and online directories are filled with unverified claims.",
    },
    {
      icon: DollarSign,
      title: "Financial Risk",
      description:
        "How do you trust someone with your time, money, and most important project?",
    },
    {
      icon: Clock,
      title: "Time Wasted",
      description:
        "Endless research and vetting takes months when you need to start building now.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Most Important
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Decision You'll Make
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
            Finding a reliable builder or contractor can feel like a high-stakes
            gamble. How do you know who to trust with your time, your money, and
            your dream?
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-construction transition-all duration-500 border border-red-100/50 hover:border-red-200 hover:shadow-md hover:shadow-red-200 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Solution Transition */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-brutal max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              BuildVeritas transforms this daunting task
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Welcome to our{" "}
              <span className="font-semibold text-yellow-300">
                Verified Marketplace
              </span>{" "}
              - a curated ecosystem where quality, integrity, and performance
              are not just promised,
              <span className="font-bold text-yellow-300">
                {" "}
                they're guaranteed
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
