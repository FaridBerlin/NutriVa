import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

export default function ProtectedRoute({ children, requireProfile = false }) {
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const { profile, loading: profileLoading, isProfileComplete } = useProfile();

  // Show loading spinner while checking authentication and profile
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If profile is required but not complete, redirect to profile page
  // (only if we're not already on the profile page)
  if (requireProfile && !isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}