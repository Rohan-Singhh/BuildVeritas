import { BottomSection } from "./Marketplace/BottomSection";
import { FeaturesSection } from "./Marketplace/FeaturesSection";
import { HeroSection } from "./Marketplace/HeroSection";
import { ProblemSection } from "./Marketplace/ProblemSection";
import { ProcessSection } from "./Marketplace/ProcessSection";
import { TestimonialSection } from "./Marketplace/TestimonialSection";

const Marketplace = () => (
  <div>
    <HeroSection />
    <ProblemSection />
    <ProcessSection />
    <TestimonialSection />
    <FeaturesSection />
    <BottomSection />
  </div>
);

export default Marketplace;
