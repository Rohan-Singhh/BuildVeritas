import CallSection from "./home/CallSection";
import Features from "./home/Features";
import Hero from "./home/Hero";
import Plans from "./home/Plans";
import BlogSlider from "./home/BlogSlider";
import Testimonials from "./home/Testimonials";
  
const Home = () => {
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
