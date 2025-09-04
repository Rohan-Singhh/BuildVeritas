import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";
import Blogs from "./components/Blogs";
import { AuthProvider } from "./context/AuthContext";
import { TransitionProvider } from "./context/TransitionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TransitionProvider>
          <div className="App cursor-none">
            <CustomCursor />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/features" element={<Features />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </TransitionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
