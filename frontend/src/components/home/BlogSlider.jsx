import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../components/Blogs";

const BlogSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="blogs" className="bg-gradient-to-b from-gray-50 to-white py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and innovations in construction
            technology
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Main Slide */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={blogs[currentIndex].image}
                alt={blogs[currentIndex].title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-3">
                  <span className="inline-flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {blogs[currentIndex].author}
                  </span>
                  <span className="inline-flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {blogs[currentIndex].readTime}
                  </span>
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {blogs[currentIndex].category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {blogs[currentIndex].title}
                </h3>

                <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-2">
                  {blogs[currentIndex].excerpt}
                </p>

                <button
                  onClick={() => navigate("/blogs")}
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:translate-x-1"
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
