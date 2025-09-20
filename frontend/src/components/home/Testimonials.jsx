import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Robert Chen",
    role: "Project Director",
    company: "Turner Construction",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    content:
      "BuildVeritas has revolutionized how we manage our construction projects. The AI-powered analytics have helped us reduce project delays by 35% and improve resource allocation significantly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Chief Operations Officer",
    company: "Green Build Solutions",
    image:
      "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600",
    content:
      "The real-time monitoring and AI safety features have transformed our site safety protocols. We've seen a 45% reduction in safety incidents since implementing BuildVeritas.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Thompson",
    role: "Senior Project Manager",
    company: "Skanska USA",
    image:
      "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600",
    content:
      "The vendor marketplace feature has streamlined our procurement process completely. We're saving both time and money while working with pre-vetted, reliable suppliers.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-white to-gray-50 py-24 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600">
            See how construction professionals are transforming their projects
            with BuildVeritas
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8">
                <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Profile */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-500 font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">63+</div>
              <p className="text-gray-600">Active Projects</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">45%</div>
              <p className="text-gray-600">Cost Reduction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">35%</div>
              <p className="text-gray-600">Faster Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
