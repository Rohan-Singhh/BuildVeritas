import "./App.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { TransitionProvider } from "./context/TransitionContext";
import CustomCursor from "./components/CustomCursor";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/common/Footer";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard/");

  return (
    <div className={`App ${isDashboard ? "" : "cursor-none"}`}>
      {!isDashboard && <CustomCursor />}
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <TransitionProvider>
          <AppContent />
        </TransitionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
