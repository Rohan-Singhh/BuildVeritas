import React from "react";
import FeaturePopup from "./FeaturePopup";
import { motion } from "framer-motion";
import { usePageTransition } from "../hooks/usePageTransition";
import {
  LayoutDashboard,
  Building2,
  Users,
  BrainCircuit,
  Clock,
  ArrowRight,
  Shield,
  Cpu
} from "lucide-react";

const HowItWorks = () => {
  const [selectedFeature, setSelectedFeature] = React.useState(null);
  const { navigateWithTransition } = usePageTransition();
  const features = [
    {
      icon: LayoutDashboard,
      title: "Intuitive Dashboard",
      description: "Real-time project tracking, budget monitoring, and team collaboration all in one place."
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Smart analytics and predictive insights to optimize your construction projects."
    },
    {
      icon: Building2,
      title: "Site Verification",
      description: "Computer vision technology for automated progress tracking and quality control."
    },
    {
      icon: Users,
      title: "Vendor Marketplace",
      description: "Connect with verified contractors and manage procurement seamlessly."
    }
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              How <span className="text-blue-400">BuildVeritas</span> Works
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
              variants={itemVariants}
            >
              Discover how our AI-powered platform revolutionizes construction management
              with smart analytics, real-time tracking, and automated insights.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className="flex items-center space-x-4 relative">
                    <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 rounded-xl transition-colors duration-300" />
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* User Flow Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Simple & Intuitive User Flow
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Get started with BuildVeritas in just a few simple steps
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {[
              { icon: Users, title: "Sign Up", description: "Create your account and complete company profile" },
              { icon: Building2, title: "Setup Project", description: "Add your first project with AI-assisted setup" },
              { icon: Cpu, title: "AI Analysis", description: "Get instant insights and recommendations" },
              { icon: Clock, title: "Track Progress", description: "Monitor real-time updates and performance" }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-400 text-white text-xl font-bold mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full">
                        <ArrowRight className="w-8 h-8 text-blue-300" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Ready to Transform Your Construction Projects?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              Join thousands of construction professionals already using BuildVeritas
            </motion.p>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateWithTransition('/signup')}
              className="bg-blue-400 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
      <FeaturePopup
        feature={selectedFeature}
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
};

export default HowItWorks;