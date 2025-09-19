import { Quote, Star } from "lucide-react";

export const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-2xl animate-bounce [animation-duration:2s]">
              <Quote className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="">
            <blockquote className="font-display text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
              "Choosing our builder through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                {" "}
                BuildVeritas
              </span>{" "}
              was the best decision we made. The
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                {" "}
                Verified badge
              </span>{" "}
              gave us immediate confidence, and the quality of their work proved
              it was well-deserved"
            </blockquote>
          </div>

          {/* Attribution */}
          <div className="">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-blue-100">
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4.5 w-4.5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                A. Sharma
              </p>
              <p className="text-blue-600 font-medium text-sm">
                Verified Homeowner
              </p>
            </div>
          </div>

          {/* Success Stats */}
          <div className="animate-slide-up-stagger stagger-3 grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9★</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90+</div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm">Repeat Referrals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
