import { Clock, Zap } from "lucide-react";

export const ProcessSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-3">
            <Clock className="w-4 h-4 mr-2" />
            Simple Process
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            Your Vision, Your Budget:
            <br />A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
              3-Step Journey
            </span>{" "}
            to Clarity
          </h2>

          {/* <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We've made obtaining a detailed, bankable estimate incredibly
            simple.
          </p> */}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group text-center animate-fade-in-up delay-100">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white w-22 h-22 rounded-full flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle">
                1
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Outline Your Dream</h3>
            <div className="inline-flex items-center px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-4">
              <Clock className="w-3 h-3 mr-1" />2 Mins
            </div>
            <p className="text-white/70 leading-relaxed">
              Tell us the basics — project location, total area, budget, and
              construction type. Our intuitive interface makes it effortless and
              accurate
            </p>
          </div>

          <div className="group text-center animate-fade-in-up delay-300">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-blue-600 text-white w-22 h-22 rounded-full flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle delay-200">
                2
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Define Your Style</h3>
            <div className="inline-flex items-center px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm font-medium mb-4">
              <Clock className="w-3 h-3 mr-1" />5 Mins
            </div>
            <p className="text-white/70 leading-relaxed">
              This is the fun part. Choose your preferred quality tiers for key
              elements like flooring, fittings, and finishes. Instantly see how
              choosing marble over tiles impacts your budget
            </p>
          </div>

          <div className="group text-center animate-fade-in-up delay-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-orange-500 to-pink-600 text-white w-22 h-22 rounded-full flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle delay-400">
                3
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Unlock Your Estimate</h3>
            <div className="inline-flex items-center px-3 py-1 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Instant
            </div>
            <p className="text-white/70 leading-relaxed">
              Click "Generate" and watch our AI work its magic. In moments,
              you'll receive a comprehensive, itemized cost breakdown that's
              easy to understand and ready to use
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-5 lg:p-6 rounded-3xl border border-white/10 animate-fade-in-up">
          <p className="text-lg text-center text-white/80 leading-relaxed max-w-3xl mx-auto">
            The output isn't just a single number. It's a{" "}
            <span className="text-orange-300 font-semibold">
              transparent financial roadmap
            </span>
            , showing you exactly where every rupee is allocated, from
            foundation to finishing.
          </p>
        </div>
      </div>
    </section>
  );
};
