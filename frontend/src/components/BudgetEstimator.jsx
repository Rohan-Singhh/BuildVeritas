import { CallSection } from "./BudgetEstimator/CallSection";
import { HeroSection } from "./BudgetEstimator/HeroSection";
import { IconGridSection } from "./BudgetEstimator/IconGridSection";
import { PowerSection } from "./BudgetEstimator/PowerSection";
import { ProblemSection } from "./BudgetEstimator/ProblemSection";
import { ProcessSection } from "./BudgetEstimator/ProcessSection";

const BudgetEstimator = () => (
  <div>
    <HeroSection />
    <ProblemSection />
    <PowerSection />
    <IconGridSection />
    <ProcessSection />
    <CallSection />
  </div>
);

export default BudgetEstimator;
