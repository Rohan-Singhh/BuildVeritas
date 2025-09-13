import { Button } from "../ui/button";
import { ArrowRight, Shield, Star, Users } from "lucide-react";

export const BottomSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Floating Trust Elements */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-blue-400/30 geometric-float">
          <Shield className="w-full h-full text-blue-400/50" />
        </div>
        <div
          className="absolute top-1/3 left-1/3 w-6 h-6 bg-yellow-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Star className="w-full h-full text-yellow-400/60 p-1" />
        </div>
        <div
          className="absolute bottom-1/3 right-1/3 w-10 h-10 bg-blue-300/20 rounded-lg animate-float"
          style={{ animationDelay: "3s" }}
        >
          <Users className="w-full h-full text-blue-300/50 p-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your project deserves
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400">
                more than a gamble
              </span>
              <span className="block text-2xl md:text-4xl font-light text-blue-100 mt-6">
                It deserves a champion
              </span>
            </h2>
          </div>

          <div className="animate-scale-in stagger-2 mt-4 mb-12">
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Stop searching and start connecting. Assemble a team that will
              bring your vision to life with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 font-semibold">
                {" "}
                skill and integrity
              </span>
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="animate-slide-up-stagger stagger-3 flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              variant="hero"
              size="lg"
              className="text-xl px-8 py-3 h-auto hover-glow shadow-brutal group border"
            >
              <span className="flex items-center">
                Browse Our Verified Professionals Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              variant="outline-blue"
              size="lg"
              className="text-xl px-8 py-3 h-auto border text-white hover:bg-white hover:text-blue-500 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Shield className="mr-3 h-6 w-6" />
              Learn More About Verification
            </Button>
          </div>

          {/* Trust Banner */}
          <div className="animate-scale-in stagger-4">
            <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 rounded-2xl px-8 py-4 text-white shadow-brutal">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6" />
                <span className="text-base font-bold">
                  100% Verified • Zero Risk • Guaranteed Quality
                </span>
              </div>
            </div>
          </div>

          {/* Final Trust Stats */}
          <div className="animate-fade-in-up stagger-5 grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Zero</div>
              <div className="text-blue-200 text-sm">
                Unverified Professionals
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-blue-200 text-sm">Quality Guaranteed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Platform Support</div>
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
