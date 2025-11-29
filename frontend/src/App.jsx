import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>





      <Navbar />
      
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        {/* Home page */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
