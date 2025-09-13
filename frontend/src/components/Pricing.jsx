import { CallSection } from "./Pricing/CallSection";
import { FaqSection } from "./Pricing/FaqSection";
import { HeroSection } from "./Pricing/HeroSection";
import { PricingCards } from "./Pricing/PricingCards";

const Pricing = () => (
  <div className="min-h-screen bg-white">
    <HeroSection />
    <PricingCards />
    <FaqSection />
    <CallSection />
  </div>
);

export default Pricing;
