import { useState } from "react";
import {
  Star,
  Quote,
  ArrowRight,
  Building2,
  Users,
  ChevronDown,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Robert Chen",
    role: "Project Director",
    company: "Turner Construction",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    content:
      "BuildVeritas has revolutionized how we manage our construction projects. The AI-powered analytics have helped us reduce project delays by 35% and improve resource allocation significantly.",
    rating: 5,
    projectSize: "$50M+",
    industry: "Commercial Construction",
    region: "North America",
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Chief Operations Officer",
    company: "Green Build Solutions",
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    content:
      "The real-time monitoring and AI safety features have transformed our site safety protocols. We've seen a 45% reduction in safety incidents since implementing BuildVeritas.",
    rating: 5,
    projectSize: "$20M-$50M",
    industry: "Sustainable Construction",
    region: "Europe",
  },
  {
    id: 3,
    name: "Michael Thompson",
    role: "Senior Project Manager",
    company: "Skanska USA",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    content:
      "The vendor marketplace feature has streamlined our procurement process completely. We're saving both time and money while working with pre-vetted, reliable suppliers.",
    rating: 5,
    projectSize: "$100M+",
    industry: "Infrastructure",
    region: "North America",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Technology Director",
    company: "Future Builders Inc",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    content:
      "The digital twin visualization has transformed how we communicate project progress to stakeholders. It's like having X-ray vision into our construction sites.",
    rating: 5,
    projectSize: "$10M-$20M",
    industry: "Residential Construction",
    region: "South America",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Safety Manager",
    company: "SafeBuild Construction",
    image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg",
    content:
      "The AI-powered safety monitoring system has been a game-changer. We can now predict and prevent potential safety issues before they occur.",
    rating: 5,
    projectSize: "$5M-$10M",
    industry: "Industrial Construction",
    region: "Asia",
  },
  {
    id: 6,
    name: "Lisa Wong",
    role: "Procurement Manager",
    company: "Pacific Developers",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    content:
      "The automated procurement system has cut our sourcing time in half. The AI recommendations for suppliers have been surprisingly accurate.",
    rating: 5,
    projectSize: "$20M-$50M",
    industry: "Commercial Construction",
    region: "Asia Pacific",
  },
  {
    id: 7,
    name: "James Anderson",
    role: "Project Executive",
    company: "Metropolitan Builders",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    content:
      "The predictive analytics for project timelines have been invaluable. We're now completing projects 20% faster with better accuracy in scheduling.",
    rating: 5,
    projectSize: "$50M+",
    industry: "Urban Development",
    region: "Europe",
  },
  {
    id: 8,
    name: "Maria Garcia",
    role: "Quality Control Manager",
    company: "Quality Construct",
    image: "https://images.pexels.com/photos/3760274/pexels-photo-3760274.jpeg",
    content:
      "The automated quality control checks have revolutionized our inspection process. We catch issues early and maintain higher standards throughout.",
    rating: 5,
    projectSize: "$10M-$20M",
    industry: "Residential Construction",
    region: "South America",
  },
  {
    id: 9,
    name: "Ahmed Hassan",
    role: "Innovation Director",
    company: "Smart Construction Co",
    image: "https://images.pexels.com/photos/2379xxx/pexels-photo-2379xxx.jpeg",
    content:
      "BuildVeritas's integration of IoT sensors with AI analytics gives us unprecedented insight into our construction operations.",
    rating: 5,
    projectSize: "$20M-$50M",
    industry: "Smart Buildings",
    region: "Middle East",
  },
  {
    id: 10,
    name: "Sophie Martin",
    role: "Sustainability Manager",
    company: "EcoBuilt Solutions",
    image: "https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg",
    content:
      "The environmental impact tracking features have helped us achieve LEED certification more efficiently. It's perfect for sustainable construction projects.",
    rating: 5,
    projectSize: "$5M-$10M",
    industry: "Green Construction",
    region: "Europe",
  },
];

const Testimonials = () => {
  // const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [filter, setFilter] = useState({
    region: "all",
    industry: "all",
    projectSize: "all",
  });

  const [expandedId, setExpandedId] = useState(null);

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return (
      (filter.region === "all" || testimonial.region === filter.region) &&
      (filter.industry === "all" || testimonial.industry === filter.industry) &&
      (filter.projectSize === "all" ||
        testimonial.projectSize === filter.projectSize)
    );
  });

  const stats = [
    { icon: Building2, value: "63+", label: "Projects Using BuildVeritas" },
    { icon: Users, value: "98%", label: "Client Satisfaction" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: ArrowRight, value: "35%", label: "Faster Project Completion" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              What Our Clients{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Say About Us
              </span>
            </Motion.h1>
            <Motion.p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover how BuildVeritas is transforming construction projects
              worldwide through AI-powered innovation and real-time insights.
            </Motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={filter.region}
              onChange={(e) => setFilter({ ...filter, region: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="South America">South America</option>
              <option value="Middle East">Middle East</option>
            </select>

            <select
              value={filter.industry}
              onChange={(e) =>
                setFilter({ ...filter, industry: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Industries</option>
              <option value="Commercial Construction">
                Commercial Construction
              </option>
              <option value="Residential Construction">
                Residential Construction
              </option>
              <option value="Industrial Construction">
                Industrial Construction
              </option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Green Construction">Green Construction</option>
              <option value="Smart Buildings">Smart Buildings</option>
            </select>

            <select
              value={filter.projectSize}
              onChange={(e) =>
                setFilter({ ...filter, projectSize: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Project Sizes</option>
              <option value="$5M-$10M">$5M-$10M</option>
              <option value="$10M-$20M">$10M-$20M</option>
              <option value="$20M-$50M">$20M-$50M</option>
              <option value="$50M+">$50M+</option>
              <option value="$100M+">$100M+</option>
            </select>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <Motion.div
                key={testimonial.id}
                className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden group ${
                  expandedId === testimonial.id
                    ? "md:col-span-2 lg:col-span-3"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  setExpandedId(
                    expandedId === testimonial.id ? null : testimonial.id
                  )
                }
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full -translate-y-16 translate-x-16 transform group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/10 to-purple-100/10 rounded-full translate-y-16 -translate-x-16 transform group-hover:scale-150 transition-transform duration-500"></div>

                {/* Quote Icon */}
                <div className="absolute right-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Profile */}
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-blue-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 mb-4 line-clamp-3 group-hover:line-clamp-none">
                    "{testimonial.content}"
                  </p>

                  {/* Details */}
                  <AnimatePresence>
                    {expandedId === testimonial.id && (
                      <Motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Region</p>
                            <p className="font-medium text-gray-900">
                              {testimonial.region}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Industry</p>
                            <p className="font-medium text-gray-900">
                              {testimonial.industry}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Project Size</p>
                            <p className="font-medium text-gray-900">
                              {testimonial.projectSize}
                            </p>
                          </div>
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand Button */}
                  <button
                    className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(
                        expandedId === testimonial.id ? null : testimonial.id
                      );
                    }}
                  >
                    {expandedId === testimonial.id ? "Show less" : "Show more"}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                        expandedId === testimonial.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
