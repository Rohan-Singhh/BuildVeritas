import { Camera, Calendar, Building, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mt-6 mb-3">
            <Camera className="w-4 h-4 mr-2" />
            Construction Journey Gallery
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 animate-gradient-shift">
              Empty Land
            </span>
            <br />
            to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient-shift">
              Dream Home
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-5xl mx-auto leading-relaxed mb-12">
            Witness the incredible transformation of raw land into a beautiful
            residential complex. Follow the journey through stunning photographs
            that capture every milestone
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">350 Days</span>
            </div>
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-green-400" />
              <span className="font-semibold">30 Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-purple-400" />
              <span className="font-semibold">6 Phases</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="font-semibold">50+ Workers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
