import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NutrivaLogo from "./NutrivaLogo";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    // with absolute positioned nav bar staying on top of landing page
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-4 md:py-6 mb-20">
      
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <NutrivaLogo />
      </Link>

      {/* Auth buttons */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {user ? (
          // Authenticated user menu
          <>
            <Link
              to="/dashboard"
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base text-textDark font-semibold hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-sm text-textDark">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          // Guest user menu
          <>
            <Link
              to="/login"
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base text-textDark font-semibold hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            
            <Link
              to="/signup"
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-primary hover:bg-primaryDark text-white font-semibold rounded-lg transition-all shadow-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      
    </nav>
  );
}