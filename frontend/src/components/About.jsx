import React, { useState } from "react";
import { Shield, Cpu, Users, Building2, Award, Sparkles, Camera, FileCheck, Brain, Wallet, Box } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const { scrollY } = useScroll();
  const [hoveredStat, setHoveredStat] = useState(null);
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  
  // Floating animation for cards
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const stats = [
    { label: "Cost Overruns", value: "20-30%" },
    { label: "Delayed Projects", value: "25%" },
    { label: "Countries", value: "10+" },
    { label: "Client Trust", value: "100%" },
  ];

  const solutions = [
    {
      icon: Camera,
      title: "AI Site Verification",
      description: "Computer vision, drone imagery, and IoT sensors verify that on-site progress matches reported progress",
    },
    {
      icon: FileCheck,
      title: "Compliance Monitoring",
      description: "Track safety standards, environmental regulations, and legal compliance in real time",
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "AI-driven insights identify risks like budget overruns, delays, or supply chain issues before they happen",
    },
    {
      icon: Wallet,
      title: "Smart Contracts & Payments",
      description: "Blockchain-based milestone payments triggered only when progress is verified",
    },
    {
      icon: Box,
      title: "Digital Twin Visualization",
      description: "Virtual mirror of construction site that updates automatically for live overview",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We stand for truth, accuracy, and accountability in every aspect of construction",
    },
    {
      icon: Cpu,
      title: "Innovation",
      description: "We harness AI, blockchain, and data to solve real-world construction challenges",
    },
    {
      icon: Sparkles,
      title: "Sustainability",
      description: "We promote safe, efficient, and eco-conscious construction practices",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe progress is built together, not alone",
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
       <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
         {/* Dynamic background */}
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white">
           <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>
         </div>
         
         {/* Animated background elements */}
         <motion.div 
           className="absolute inset-0"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
         >
           <motion.div 
             className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
             animate={{
               scale: [1, 1.2, 1],
               opacity: [0.2, 0.3, 0.2],
             }}
             transition={{
               duration: 8,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           ></motion.div>
           <motion.div 
             className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
             animate={{
               scale: [1.2, 1, 1.2],
               opacity: [0.3, 0.2, 0.3],
             }}
             transition={{
               duration: 8,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           ></motion.div>
           <motion.div 
             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-400/10 rounded-full blur-3xl"
             animate={{
               scale: [1, 1.1, 1],
               opacity: [0.1, 0.2, 0.1],
             }}
             transition={{
               duration: 10,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           ></motion.div>
         </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="text-center relative max-w-5xl mx-auto">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="block mb-4">Building Trust in</span>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    backgroundSize: ["100% 100%", "200% 100%", "100% 100%"]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  Construction
                </motion.span>
              </motion.h1>

              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <motion.p 
                className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="font-medium">BuildVeritas</span> is an AI-powered construction technology company solving one of the biggest challenges 
                in the global building industry - the lack of trust, transparency, and accountability.
              </motion.p>

              <motion.div 
                className="relative max-w-2xl mx-auto p-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute -inset-px bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl opacity-50" />
                <p className="relative text-lg sm:text-xl text-gray-600 leading-relaxed">
                  The word <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">"Veritas"</span> comes from Latin and means truth. 
                  That meaning is at the heart of everything we do. We believe construction should not just be about 
                  building structures; it should be about building trust between clients, contractors, vendors, and investors.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Vision */}
          <motion.div 
            className="relative max-w-4xl mx-auto mt-24"
            variants={containerVariants}
          >
            {/* Background decoration */}
            <motion.div 
              className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-60"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.8, 0.6, 0.8],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div 
              className="relative bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-purple-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
                  Our Vision
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Transforming Construction
                </h2>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl">
                  <div className="absolute inset-0 bg-white/40 rounded-2xl backdrop-blur-sm" />
                  <p className="relative text-xl text-gray-700 leading-relaxed">
                    We envision a construction industry where <span className="font-semibold text-blue-700">truth is non-negotiable</span>. 
                    An industry where <span className="font-semibold text-purple-700">data, technology, and AI</span> replace 
                    guesswork, mistrust, and manual inefficiencies.
                  </p>
                </div>

                <div className="relative p-6 bg-gradient-to-br from-purple-50 to-blue-50/50 rounded-2xl">
                  <div className="absolute inset-0 bg-white/40 rounded-2xl backdrop-blur-sm" />
                  <p className="relative text-xl text-gray-700 leading-relaxed">
                    Our long-term vision is to become the <span className="font-semibold text-purple-700">global standard</span> for 
                    verification and compliance in construction - a trusted platform used by 
                    <span className="font-semibold text-blue-700"> developers, governments, and investors</span> worldwide.
                  </p>
                </div>
              </motion.div>

              {/* Vision highlights */}
              <motion.div 
                className="grid grid-cols-3 gap-6 mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { value: "100%", label: "Truth-Based" },
                  { value: "Global", label: "Coverage" },
                  { value: "AI-Driven", label: "Verification" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Industry Challenges */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                animate={hoveredStat === index ? { 
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                } : { scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                className="text-center p-6 bg-white rounded-2xl shadow-xl transform transition-all duration-300 cursor-pointer relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={floatingAnimation}
                ></motion.div>
                <motion.div
                  className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent mb-2"
                  animate={hoveredStat === index ? { scale: 1.1 } : { scale: 1 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div 
                  className="text-sm sm:text-base text-gray-600 font-medium"
                  animate={hoveredStat === index ? { y: -5 } : { y: 0 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

       {/* The Gap Section */}
       <section className="py-32 bg-white relative overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-5">
           <div className="absolute inset-0" style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
             backgroundSize: '30px 30px'
           }}></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
               className="space-y-8"
              variants={itemVariants}
            >
               <motion.h2 
                 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                 The Gap with{" "}
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                   Traditional Tools
                  </span>
               </motion.h2>
               <motion.p 
                 className="text-xl text-gray-600 leading-relaxed"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
               >
                 Existing tools in the market focus mainly on planning and management. They show what should 
                 happen but fail to verify what actually happens on the ground. This gap between reported 
                 progress and real progress is where mistrust and inefficiency thrive.
               </motion.p>
               <motion.div 
                 className="space-y-6"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
               >
                 {[
                   { icon: Building2, text: "Projects exceed budgets by 20-30%", color: "from-red-400 to-orange-400" },
                   { icon: Award, text: "25% of projects face delays", color: "from-yellow-400 to-orange-400" },
                   { icon: Sparkles, text: "Frequent compliance failures", color: "from-blue-400 to-purple-400" }
                 ].map((item, index) => (
                   <motion.div 
                     key={index}
                     className="flex items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                     whileHover={{ x: 10 }}
                   >
                     <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                       <item.icon className="w-6 h-6 text-white" />
                </div>
                     <span className="ml-4 text-lg font-medium text-gray-700">
                       {item.text}
                  </span>
                   </motion.div>
                 ))}
               </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={itemVariants}
            >
               <motion.div 
                 className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl transform rotate-6 scale-105 opacity-20 blur-xl"
                 animate={{
                   rotate: [6, -6, 6],
                   scale: [1.05, 1.1, 1.05],
                 }}
                 transition={{
                   duration: 10,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               />
               <motion.div 
                 className="relative rounded-3xl overflow-hidden shadow-2xl"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.3 }}
               >
                 <img
                   src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                   alt="Construction challenges"
                   className="object-cover w-full h-[600px]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                 <motion.div 
                   className="absolute bottom-0 left-0 right-0 p-8 text-white"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                 >
                   <h3 className="text-2xl font-bold mb-2">Traditional Approach</h3>
                   <p className="text-gray-200">Manual processes leading to inefficiencies and errors</p>
                 </motion.div>
               </motion.div>
            </motion.div>
          </div>
         </div>
       </section>

      {/* Solutions Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                Our Solutions
              </span>
            </motion.div>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                BuildVeritas
              </span>{" "}
              Difference
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              BuildVeritas is not just another project management tool. It is the truth engine for construction.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  className="bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-500 relative overflow-hidden group cursor-pointer hover:shadow-2xl"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                  
                  {/* Icon with animation */}
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mb-6 relative group-hover:shadow-lg transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    animate={floatingAnimation}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.h3 
                    className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                  >
                    {solution.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {solution.description}
                  </motion.p>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  />
                </motion.div>
              );
            })}
          </motion.div>
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
              At BuildVeritas, our work is guided by four key values that shape everything we do.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-300 relative overflow-hidden group cursor-pointer"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                  
                  {/* Icon with animation */}
                  <motion.div 
                    className="inline-block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-6 relative group-hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    animate={floatingAnimation}
                  >
                    <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.h3 
                    className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              More Than a Platform
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg text-gray-600">
                BuildVeritas is more than just a platform - it is a promise.
                A promise to bring truth, trust, and transparency into an industry 
                that impacts the lives of billions of people.
              </p>
              <p className="text-lg text-gray-600">
                With BuildVeritas, construction is not just about creating buildings.
                It's about creating trust that lasts as long as the structures themselves.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="mt-12 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-400 hover:bg-blue-500 transition-colors duration-300"
            >
              Start Building Trust Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;