import { useEffect, useState } from "react";
import { HeroSection } from "./Analytics/HeroSection";
import { ProblemSection } from "./Analytics/ProblemSection";
import { ProgressVerification } from "./Analytics/ProgressVerification";
import { ValueBoxes } from "./Analytics/ValueBoxes";
import { CommunicationSection } from "./Analytics/CommunicationSection";

const Analytics = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 animate-float"
          style={{
            left: mousePosition.x * 0.02 + "px",
            top: mousePosition.y * 0.02 + "px",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full opacity-30 animate-float-delayed"
          style={{
            right: mousePosition.x * -0.01 + "px",
            bottom: mousePosition.y * -0.01 + "px",
          }}
        />
      </div>

      <HeroSection />
      <ProblemSection />
      <ProgressVerification />
      <ValueBoxes />
      <CommunicationSection />
    </div>
  );
};

export default Analytics;
