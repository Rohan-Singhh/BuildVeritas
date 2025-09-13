import { Button } from "../ui/button";
import { ArrowRight, Users, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/marketplace-hero.jpg"
          alt="Professional construction team collaborating on project plans"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-800/80"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 right-1/4 w-10 h-10 flex items-center justify-center bg-blue-400/30 rounded-full animate-bounce delay-500">
          <Shield className="w-6 h-6 text-blue-400/70" />
        </div>
        <div className="absolute top-[40%] left-1/3 w-8 h-8 flex items-center justify-center bg-yellow-400/30 rounded-full animate-pulse">
          <Star className="w-4 h-4 text-yellow-400/70" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 flex items-center justify-center bg-blue-300/20 rounded-lg animate-bounce delay-100">
          <Users className="w-6 h-6 text-blue-300/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl">
          {/* Trust Badge */}
          <div className="mt-4 mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white animate-bounce">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">
                Verified Professional Network
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight space-y-2">
            <span className="block animate-[fade-in_1.3s_ease-in-out]">
              Don't Just Hire a Builder
            </span>
            <span className="block animate-[fade-in_1s_ease-in-out] delay-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400">
              Assemble Your
            </span>
            <span className="block animate-fade-in delay-700 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400">
              Dream Team
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-4xl leading-relaxed font-light animate-fade-in delay-1000">
            The success of your project rests on the team you choose. Stop
            sorting through{" "}
            <span className="text-red-400 font-semibold">
              unverified listings
            </span>{" "}
            and risky recommendations. Connect with our{" "}
            <span className="text-cyan-400 font-semibold">
              elite, hand-picked network
            </span>{" "}
            of the industry's most{" "}
            <span className="text-yellow-300 font-semibold">
              trusted and talented professionals
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-8 animate-fade-in delay-1200">
            <Button
              size="sm"
              className="relative group text-lg p-5 rounded-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-in-out hover:scale-110"
            >
              <span className="absolute inset-0 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 translate-x-1.5 translate-y-1.5 opacity-80 group-hover:translate-x-0 group-hover:-translate-y-0 transition-all duration-300 ease-in-out delay-75"></span>
              <span className="absolute inset-0 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 translate-x-3 translate-y-3 opacity-60 group-hover:translate-x-0 group-hover:-translate-y-0 transition-all duration-300 ease-in-out delay-100"></span>
              <button
                onClick={() => navigate("/dashboard")}
                className="relative flex items-center justify-center"
              >
                Browse Verified Professionals
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </button>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-lg p-5 border-white/40 text-white hover:bg-white hover:text-blue-500 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110"
            >
              <Shield className="mr-1 h-6 w-6 transition-all duration-300 ease-in-out hover:w-7 hover:h-7" />
              Learn About Our Vetting
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-10 max-w-2xl animate-fade-in delay-1500">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-blue-200 text-sm">
                Verified Professionals
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-blue-200 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Zero</div>
              <div className="text-blue-200 text-sm">Unverified Listings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
