import { useEffect, useState } from "react";
import { GalleryPhotos } from "../../constants/GalleryPhotos";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";

export const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  //   const [hoveredImage, setHoveredImage] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= GalleryPhotos.length - 2 ? 0 : prevIndex + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex >= GalleryPhotos.length - 2 ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      currentIndex <= 0 ? GalleryPhotos.length - 2 : currentIndex - 1
    );
  };

  const getPhaseColor = (phase) => {
    const colors = {
      "Site Preparation": "from-amber-500 to-orange-500",
      Foundation: "from-blue-500 to-cyan-500",
      Structure: "from-purple-500 to-pink-500",
      "Walls & Roofing": "from-green-500 to-emerald-500",
      "MEP & Interiors": "from-indigo-500 to-blue-500",
      Finishing: "from-rose-500 to-pink-500",
      Completion: "from-emerald-500 to-teal-500",
    };
    return colors[phase] || "from-gray-500 to-gray-600";
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Phase Indicator */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div
            className={`inline-flex items-center px-6 py-2 bg-gradient-to-r ${getPhaseColor(
              GalleryPhotos[currentIndex]?.phase
            )} text-white rounded-full font-semibold mb-0 shadow-lg`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {GalleryPhotos[currentIndex]?.phase}
          </div>
        </div>

        {/* Main Slider Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Slider Controls */}
          <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/30 transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/30 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/30 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div className="relative h-[480px] overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 50}%)` }}
            >
              {GalleryPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-1/2 flex-shrink-0 h-full group"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 group-hover:scale-105 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div
                        className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${getPhaseColor(
                          photo.phase
                        )} rounded-full text-xs font-semibold mb-1`}
                      >
                        Day {photo.day}
                      </div>
                      <h3 className="text-2xl font-bold">{photo.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{
                width: `${((currentIndex + 1) / GalleryPhotos.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
