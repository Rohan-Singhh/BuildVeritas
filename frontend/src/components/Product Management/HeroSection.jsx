import { Button } from "../ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Advanced Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-construction.jpg"
          alt="Modern construction site with digital project management overlay"
          className="w-full h-full object-cover parallax-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blob-1 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blob-2 blur-3xl"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-400/30 geometric-float"></div>
        <div
          className="absolute top-1/3 left-1/3 w-6 h-6 bg-cyan-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-blue-300/20 rotate-45 animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl">
          {/* Sparkle Badge */}
          <div className="animate-bounce-in mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-medium">
                Revolutionary Project Management
              </span>
            </div>
          </div>

          {/* Main Headline with Staggered Animation */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="block animate-slide-in-left">
                Your Project's
              </span>
              <span className="block animate-slide-in-right stagger-2 text-gradient-rainbow">
                Command Center
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-100 font-light animate-fade-in-up stagger-3">
              In Your Pocket, 24/7.
            </h2>
          </div>

          {/* Sub-headline with Enhanced Typography */}
          <div className="animate-scale-in stagger-4 mt-6">
            <p className="text-lg md:text-xl text-gray-200 max-w-4xl leading-relaxed">
              Say goodbye to the stress of the unknown. The Live Project
              Dashboard brings
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-300 font-semibold">
                {" "}
                radical transparency
              </span>{" "}
              to your construction project, consolidating every update,
              communication, and financial detail into one{" "}
              <span className="text-yellow-300 font-medium">
                intuitive, real-time hub
              </span>
              .
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          {/* <div className="animate-slide-up-stagger stagger-5 flex flex-col sm:flex-row gap-6 mt-12">
            <Button
              variant="hero"
              size="sm"
              className="text-xl px-10 py-6 h-auto hover-glow shadow-brutal group border-2 border-white/40 backdrop-blur-xs"
            >
              <span className="flex items-center">
                See a Demo of the Live Dashboard
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              variant="outline-blue"
              size="sm"
              className="text-xl px-10 py-4 h-auto border-white/40 text-white hover:text-primary backdrop-blur-xs hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch 2-min Demo
            </Button>
          </div> */}

          {/* Stats Row */}
          <div className="animate-fade-in-up stagger-6 grid grid-cols-3 gap-8 mt-10 max-w-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Real-time Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-blue-200 text-sm">Transparency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">0</div>
              <div className="text-blue-200 text-sm">Confusion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute bottom-10 right-10 animate-float">
        <div className="w-24 h-24 rounded-full gradient-hero opacity-30 blur-xl"></div>
      </div>
      <div
        className="absolute top-20 right-1/4 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/40 to-cyan-400/40 blur-md"></div>
      </div>
      <div
        className="absolute bottom-1/4 left-10 animate-float"
        style={{ animationDelay: "4s" }}
      >
        <div className="w-12 h-12 bg-yellow-400/20 rounded-full blur-sm"></div>
      </div>
    </section>
  );
};
