import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { TransitionProvider } from "./context/TransitionContext";
import CustomCursor from "./components/CustomCursor";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TransitionProvider>
          <div className="App cursor-none">
            <CustomCursor />
            <Navbar />
            <AnimatedRoutes />
          </div>
        </TransitionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
