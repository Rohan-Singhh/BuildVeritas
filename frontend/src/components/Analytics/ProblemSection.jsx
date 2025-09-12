import {
  AlertCircle,
  Shield,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

export const ProblemSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-14">
          {/* Question Section */}
          <div className="text-center space-y-4 animate-fade-in max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-1 rounded-full bg-orange-100 border border-orange-200">
              <HelpCircle className="w-5 h-5 text-orange-600 animate-pulse-gentle" />
              <span className="text-orange-800 font-medium">
                The Question Every Client Asks
              </span>
            </div>

            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-black leading-tight animate-slide-up">
              "Is the work on-site truly matching what I've been told?"
            </blockquote>
          </div>

          {/* Problem Visualization */}
          <div className="grid md:grid-cols-3 gap-8 animate-stagger-in">
            {/* Traditional Way */}
            <div className="group p-8 rounded-2xl bg-red-50 border border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-lg">
                Traditional Approach
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Relying on verbal updates and periodic photos. No objective
                verification of progress or quality
              </p>
            </div>

            {/* The Gap */}
            <div className="group p-8 rounded-2xl bg-yellow-50 border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-8 h-8 text-yellow-600 animate-pulse-gentle" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-lg">
                The Trust Gap
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Uncertainty breeds doubt. Without verification, even trusted
                relationships can become strained
              </p>
            </div>

            {/* BuildVeritas Solution */}
            <div className="group p-8 rounded-2xl bg-green-50 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-lg">
                BuildVeritas Way
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered verification provides objective, data-driven proof of
                progress and quality
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 animate-expand-width">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse-gentle"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Solution Statement */}
          <div className="text-center space-y-6 animate-fade-in-delayed">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Even with a trusted builder, this small seed of doubt can create
              stress. You deserve more than just updates; you deserve{" "}
              <span className="text-blue-500 font-semibold relative">
                objective, verifiable proof
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500/30 animate-expand-width"></div>
              </span>
            </p>

            <div className="flex flex-col items-center justify-center gap-6 animate-slide-up-delayed">
              <Shield className="w-12 h-12 text-blue-500 animate-pulse-gentle" />
              <div className="text-left">
                <p className="text-lg font-medium text-foreground mb-2">
                  At BuildVeritas, we provide exactly that, engineering a system
                  that fosters{" "}
                  <span className="text-blue-500 font-bold">
                    absolute confidence
                  </span>{" "}
                  and provides{" "}
                  <span className="text-blue-500 font-bold">
                    true peace of mind
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
