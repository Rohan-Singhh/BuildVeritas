import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../components/Blogs";
import { motion, AnimatePresence } from "framer-motion";

const BlogSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  // Auto slide every 5 seconds
  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Get the previous and next blog indices
  const getPrevIndex = () => (currentIndex === 0 ? blogs.length - 1 : currentIndex - 1);
  const getNextIndex = () => (currentIndex === blogs.length - 1 ? 0 : currentIndex + 1);

  return (
    <section id="blogs" className="bg-gradient-to-b from-gray-50 to-white py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and innovations in construction
            technology
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>

          {/* Carousel Container */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Previous Blog (Left) */}
            <motion.div
              className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg"
              style={{
                filter: "brightness(0.7) blur(1px)",
                transform: "perspective(1000px) rotateY(25deg) translateX(-100px) scale(0.8)",
                zIndex: 1
              }}
            >
              <img
                src={blogs[getPrevIndex()].image}
                alt="Previous blog"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Current Blog (Center) */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <div className="absolute inset-0">
                <img
                  src={blogs[currentIndex].image}
                  alt={blogs[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              </div>

              <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
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
                    <motion.span 
                      className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {blogs[currentIndex].category}
                    </motion.span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {blogs[currentIndex].title}
                  </h3>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {blogs[currentIndex].excerpt}
                  </p>

                  <motion.button
                    onClick={() => navigate("/blogs")}
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Next Blog (Right) */}
            <motion.div
              className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg"
              style={{
                filter: "brightness(0.7) blur(1px)",
                transform: "perspective(1000px) rotateY(-25deg) translateX(100px) scale(0.8)",
                zIndex: 1
              }}
            >
              <img
                src={blogs[getNextIndex()].image}
                alt="Next blog"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {blogs.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;