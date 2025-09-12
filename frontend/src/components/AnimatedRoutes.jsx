import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Features from "./Features";
import About from "./About";
import Blogs from "./Blogs";
import HowItWorks from "./HowItWorks";
import ProtectedRoute from "./ProtectedRoute";
import ProjectManagement from "./ProjectManagement";
import ScrollToTop from "./ScrollToTop";
import Marketplace from "./Marketplace";
import Analytics from "./Analytics";
import BudgetEstimator from "./BudgetEstimator";
import Contact from "./Contact";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* <ScrollToTop /> */}
      <Routes key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/budget-estimator" element={<BudgetEstimator />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
