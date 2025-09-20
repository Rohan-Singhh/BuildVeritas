import { Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CallSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Ready to Start Your Own Journey?
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Let BuildVeritas help you plan and budget your construction project
            with the same precision and care.
          </p>

          <button
            className="group px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate("/dashboard")}
          >
            <span className="flex items-center">
              Start Your Project
              <Building className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
