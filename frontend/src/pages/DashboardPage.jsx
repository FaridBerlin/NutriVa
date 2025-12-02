import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Your personalized nutrition dashboard
          </p>
        </div>
        
        {/* Dashboard content will go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
            <p className="text-gray-600">Name:</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Body Metrics</h3>
            <p className="text-gray-600">Height:</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Diet Performance</h3>
            <p className="text-gray-600">Diet Type:</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Fitness Goals</h3>
            <p className="text-gray-600">Primary Goal:</p>
          </div>
         






        </div>
      </div>
    </div>
  );
}