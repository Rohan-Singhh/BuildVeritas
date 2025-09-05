import React from "react";
import { Shield, Cpu, Users, Building2, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "1000+" },
    { label: "Team Members", value: "50+" },
    { label: "Client Satisfaction", value: "99%" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trusted Security",
      description: "Enterprise-grade security measures to protect your construction data",
    },
    {
      icon: Cpu,
      title: "AI Innovation",
      description: "Cutting-edge AI algorithms for precise construction planning and monitoring",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Dedicated support team ensuring your success every step of the way",
    },
  ];

  const containerVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen pt-16"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Building the Future of{" "}
              <span className="text-blue-400">Construction Management</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              BuildVeritas is revolutionizing construction project management with
              AI-powered solutions that bring precision, efficiency, and
              intelligence to every project.
            </p>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                At BuildVeritas, we're on a mission to transform the construction
                industry through innovative technology solutions. We believe in
                empowering construction professionals with tools that make their
                work more efficient, accurate, and profitable.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-700">
                    Streamline construction processes
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-700">
                    Deliver exceptional project outcomes
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-700">
                    Drive industry innovation
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Construction site"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at BuildVeritas, ensuring we
              deliver the best possible solutions for our clients.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-300"
                >
                  <div className="inline-block p-4 bg-blue-50 rounded-xl mb-6">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Be part of the construction industry's digital transformation.
              BuildVeritas is here to support your success with innovative
              solutions and dedicated expertise.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-400 hover:bg-blue-500 transition-colors duration-300"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;