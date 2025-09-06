// export const ProblemSection = () => {
//   return (
//     <section id="problem" className="py-20 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
//             Tired of Being in the <span className="text-red-600">Dark?</span>
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="animate-slide-in-left">
//             <div className="space-y-6">
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 Once construction begins, do you find yourself wondering what's
//                 really happening on-site? Are you tired of chasing your builder
//                 for updates, relying on blurry WhatsApp photos, and hoping your
//                 project is still on track?
//               </p>
//               <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
//                 <p className="text-red-800 font-medium">
//                   This communication gap is the #1 source of client anxiety. We
//                   close that gap for good.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="animate-slide-in-right">
//             <div className="relative">
//               <img
//                 src="/project-problem.jpeg"
//                 alt="Construction site communication"
//                 className="rounded-2xl shadow-lg w-full"
//               />
//               <div className="absolute inset-0 bg-blue-600 opacity-15 rounded-2xl"></div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-16 text-center">
//           <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up animation-delay-600">
//             <p className="text-xl text-gray-800 leading-relaxed">
//               The{" "}
//               <span className="font-bold text-blue-600">BuildVeritas.ai</span>{" "}
//               Live Project Dashboard is your{" "}
//               <span className="font-bold text-blue-600">
//                 single source of truth
//               </span>
//               . It's a dynamic, interactive control room that gives you a
//               bird's-eye view of your entire project, from groundbreaking to
//               handover.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { AlertTriangle, MessageSquare, Camera, DollarSign } from "lucide-react";
import { Card } from "../../components/ui/card";

export const ProblemSection = () => {
  const painPoints = [
    {
      icon: AlertTriangle,
      title: "Wondering what's happening on-site?",
      description: "No clear visibility into daily progress and activities",
    },
    {
      icon: MessageSquare,
      title: "Chasing builders for updates?",
      description: "Scattered communication across WhatsApp, email, and calls",
    },
    {
      icon: Camera,
      title: "Relying on blurry photos?",
      description: "Poor quality updates that don't show real progress",
    },
    {
      icon: DollarSign,
      title: "Worried about budget overruns?",
      description: "No real-time financial tracking or transparency",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tired of Being in the <span className="text-red-600">Dark?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Once construction begins, do you find yourself wondering what's
            really happening on-site?
            <br />
            This communication gap is the{" "}
            <span className="font-semibold text-red-600">
              #1 source of client anxiety.
            </span>
            {/* We close that gap for good. */}
          </p>
        </div>

        {/* Pain Points Grid with Enhanced Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              className={`p-4 bg-white border-white hover:border-blue-200 text-center group hover:shadow-xl hover:shadow-blue-100 animate-rotate-in stagger-${
                index + 1
              } relative overflow-hidden`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                  <point.icon className="h-7 w-7 text-red-600 relative z-10" />
                  <div className="absolute inset-0 bg-red-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {point.description}
                </p>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 -rotate-45 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Solution Teaser */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up animation-delay-600">
            <p className="text-xl text-gray-800 leading-relaxed">
              The{" "}
              <span className="font-bold text-blue-600">BuildVeritas.ai</span>{" "}
              Live Project Dashboard is your{" "}
              <span className="font-bold text-blue-600">
                single source of truth
              </span>
              . It's a dynamic, interactive control room that gives you a
              bird's-eye view of your entire project, from groundbreaking to
              handover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
