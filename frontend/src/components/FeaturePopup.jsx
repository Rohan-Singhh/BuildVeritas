import React from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FeaturePopup = ({ feature, isOpen, onClose }) => {
  const popupContent = {
    "Intuitive Dashboard": {
      description: `Our intuitive dashboard provides a comprehensive view of your construction projects:
        • Real-time project status updates and progress tracking
        • Interactive Gantt charts and timeline visualization
        • Budget monitoring with cost breakdown analysis
        • Team collaboration tools and task management
        • Document management and version control
        • Customizable widgets for key metrics`,
      image: "https://images.pexels.com/photos/7681078/pexels-photo-7681078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageAlt: "Construction dashboard interface"
    },
    "AI-Powered Insights": {
      description: `Leverage the power of AI to optimize your construction projects:
        • Predictive analytics for project timelines and costs
        • Risk assessment and mitigation recommendations
        • Resource optimization suggestions
        • Pattern recognition for potential delays
        • Automated progress reports and insights
        • Machine learning-based cost estimation`,
      image: "https://images.pexels.com/photos/8294606/pexels-photo-8294606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageAlt: "AI analytics visualization"
    },
    "Site Verification": {
      description: `Advanced computer vision technology for construction site monitoring:
        • Automated progress tracking using site photos/videos
        • Quality control and safety compliance verification
        • Real-time anomaly detection
        • Visual comparison with project plans
        • Automated measurement and quantity tracking
        • Weather impact assessment`,
      image: "https://images.pexels.com/photos/2590716/pexels-photo-2590716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageAlt: "Construction site verification"
    },
    "Vendor Marketplace": {
      description: `Streamline your procurement process with our integrated marketplace:
        • Access to verified contractors and suppliers
        • Real-time pricing and availability
        • Automated vendor qualification and rating
        • Direct messaging and quote requests
        • Contract management and tracking
        • Payment processing and escrow services`,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageAlt: "Vendor marketplace interface"
    }
  };

  const content = popupContent[feature?.title];

  return (
    <AnimatePresence>
      {isOpen && content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="relative h-64 md:h-80">
              <img
                src={content.image}
                alt={content.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature?.title}
              </h3>
              <div className="prose prose-blue max-w-none">
                {content.description.split('•').map((point, index) => (
                  index === 0 ? (
                    <p key={index} className="text-gray-600 mb-4">{point.trim()}</p>
                  ) : (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-600">{point.trim()}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeaturePopup;
