import React from "react";
import CallSection from "./home/CallSection";
import Features from "./home/Features";
import Hero from "./home/Hero";
import Plans from "./home/Plans";
import BlogSlider from "./home/BlogSlider";
import Testimonials from "./home/Testimonials";
  
const Home = () => {
  React.useEffect(() => {
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
    // Remove any dashboard-specific classes
    document.body.classList.remove('dashboard-active');
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Hero />
        <Features />
        <Plans />
        <BlogSlider />
        <Testimonials />
        <CallSection />
      </div>
    </div>
  );
};

export default Home;
