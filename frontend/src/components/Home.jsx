import CallSection from "./home/CallSection";
import Features from "./home/Features";
import Hero from "./home/Hero";
import Plans from "./home/Plans";
import BlogSlider from "./home/BlogSlider";
import Testimonials from "./home/Testimonials";
import ContactSection from "./home/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Plans />
      <BlogSlider />
      <Testimonials />
      <ContactSection />
      <CallSection />
    </div>
  );
};

export default Home;
