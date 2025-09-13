import { BenefitsSection } from "./Project Management/BenefitsSection";
import { BottomSection } from "./Project Management/BottomSection";
import { FeaturesSection } from "./Project Management/FeaturesSection";
import { HeroSection } from "./Project Management/HeroSection";
import { ProblemSection } from "./Project Management/ProblemSection";

const ProjectManagement = () => (
  <div>
    <HeroSection />
    <ProblemSection />
    <FeaturesSection />
    <BenefitsSection />
    <BottomSection />
  </div>
);

export default ProjectManagement;
