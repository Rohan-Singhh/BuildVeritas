import {
  Award,
  Briefcase,
  Building,
  Camera,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Shield,
  Star,
  Target,
  Verified,
} from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Connect with Confidence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              in Minutes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our intuitive platform transforms the overwhelming task of finding
            professionals into a streamlined, confidence-inspiring journey
          </p>
        </div>

        {/* Step-by-Step Process */}
        <div className="space-y-24">
          {/* Step 1: Search & Discover */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  1
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Search & <span className="text-blue-600">Discover</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Easily browse top professionals in your area. Use our powerful
                filters to find specialists for your exact project type, budget,
                and style preferences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Advanced filtering by location, specialty, and budget
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Real-time availability and response rates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Verified credentials and certifications
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in-up delay-200">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
                  {/* Search Interface Mockup */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Search className="w-6 h-6 text-gray-400" />
                      <div className="flex-1 h-12 bg-gray-100 rounded-xl flex items-center px-4 text-gray-500">
                        Find builders in Mumbai...
                      </div>
                      <Filter className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Residential
                      </span>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        ₹10-20L
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        Modern Style
                      </span>
                    </div>
                  </div>

                  {/* Results Preview */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900">
                              Premium Builders
                            </h4>
                            <Verified className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              4.9 (156)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            Starting from
                          </div>
                          <div className="font-bold text-blue-600">
                            ₹1,200/sq ft
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md opacity-75 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900">
                              Elite Contractors
                            </h4>
                            <Verified className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              4.8 (89)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-3 shadow-xl animate-bounce">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Explore Rich Profiles */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up delay-200">
            <div className="animate-fade-in-up delay-300">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
                  {/* Profile Mockup */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Building className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            Luxury Builders Co.
                          </h3>
                          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                            <Verified className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-600">
                              Verified
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            4.9 (234 reviews)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          15+ years • 200+ projects completed
                        </p>
                      </div>
                    </div>

                    {/* Portfolio Gallery */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>

                    {/* Recent Review */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-sm">Rajesh K.</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Exceptional quality and professionalism. Completed our
                        villa on time and within budget."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-xl animate-pulse">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  2
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Explore Rich <span className="text-indigo-600">Profiles</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Dive into comprehensive profiles that serve as a digital
                portfolio. View stunning galleries of their work, read their
                company story, and see verified reviews from real clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    High-resolution project galleries and case studies
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Verified client testimonials and ratings
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Detailed company information and certifications
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Compare Proposals */}
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up delay-400">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  3
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Compare{" "}
                <span className="text-purple-600">Apples-to-Apples</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Request quotes directly through the platform. Because everyone
                is working from your detailed project brief, you receive clear,
                comparable proposals that make your decision easier than ever.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Standardized proposal format for easy comparison
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Transparent pricing with detailed breakdowns
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Timeline commitments and milestone tracking
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in-up delay-500">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl">
                  {/* Comparison Interface */}
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        3 Proposals Received
                      </h4>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">
                          All verified professionals
                        </span>
                      </div>
                    </div>

                    {/* Proposal Cards */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-gray-900">
                              Premium Builders
                            </h5>
                            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                              Best Value
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              ₹18.5L
                            </div>
                            <div className="text-xs text-gray-500">
                              120 days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            4.9 rating
                          </span>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-md opacity-75">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-gray-900">
                            Elite Contractors
                          </h5>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              ₹22.3L
                            </div>
                            <div className="text-xs text-gray-500">
                              100 days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            4.8 rating
                          </span>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-md opacity-50">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-gray-900">
                            Luxury Builders
                          </h5>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              ₹25.8L
                            </div>
                            <div className="text-xs text-gray-500">90 days</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            4.7 rating
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Comparison Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-3 shadow-xl animate-bounce">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Summary */}
        <div className="mt-24 text-center animate-fade-in-up delay-600">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              From Search to Selection in{" "}
              <span className="text-blue-600">3 Simple Steps</span>
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our streamlined process eliminates the guesswork and stress from
              finding the right professional for your project
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-700">
                  Verified Professionals Only
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-700">
                  Quick Response Times
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-700">
                  100% Transparent Process
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
