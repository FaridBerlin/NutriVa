import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";






function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Home page */}
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
     </AuthProvider>
  );
}

export default App;
