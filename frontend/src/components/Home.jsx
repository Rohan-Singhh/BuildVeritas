import CallSection from "./home/CallSection";
import Features from "./home/Features";
import Hero from "./home/Hero";
import Plans from "./home/Plans";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Plans />
      <CallSection />
    </div>
  );
};

export default Home;
