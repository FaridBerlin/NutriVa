/**
 * DashboardPage.jsx
 * 
 * @modified 4 December 2025
 * @description Dashboard page that displays user profile and nutrition data
 * 
 * CHANGES MADE (4 Dec 2025):
 * - Now using ProfileContext for centralized data management
 * - Removed direct API calls - data comes from context
 * - Added loading and error states from context
 */

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { profile, nutritionTargets, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10">
      <div className="max-w-6xl mx-auto space-y-10 px-4">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-5">
            Welcome back, {user?.name}! 
          </h1>
          <p className="text-gray-600 text-lg">
            Your personalized nutrition dashboard
          </p>
        </div>

        {/* Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-primary mb-4">Personal Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Name:</strong> {user?.name}</li>
              <li><strong>Email:</strong> {user?.email}</li>
              <li><strong>Age:</strong> {profile?.age || "Not set"}</li>
              <li><strong>Gender:</strong> {profile?.gender || "Not set"}</li>
            </ul>
          </div>

          {/* Body Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-primary mb-4">Body Metrics</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Height:</strong> {profile?.height ? `${profile.height} cm` : "Not set"}</li>
              <li><strong>Weight:</strong> {profile?.weight ? `${profile.weight} kg` : "Not set"}</li>
              <li><strong>Activity:</strong> {profile?.activityLevel?.replace('_', ' ') || "Not set"}</li>
            </ul>
          </div>

          {/* Nutrition Calculations */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-primary mb-4">Nutrition Info</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>BMR:</strong> {nutritionTargets?.bmr ? `${Math.round(nutritionTargets.bmr)} kcal` : "Not set"}</li>
              <li><strong>TDEE:</strong> {nutritionTargets?.tdee ? `${Math.round(nutritionTargets.tdee)} kcal` : "Not set"}</li>
              <li><strong>Daily Calories:</strong> {nutritionTargets?.dailyCalories ? `${Math.round(nutritionTargets.dailyCalories)} kcal` : "Not set"}</li>
            </ul>
          </div>

          {/* Fitness Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-primary mb-4">Fitness Goals</h3>
            <p className="text-gray-700">
              <strong>Goal:</strong> {
                profile?.dietaryGoal === 'lose_weight' ? 'Lose Weight' :
                profile?.dietaryGoal === 'gain_weight' ? 'Gain Weight' :
                profile?.dietaryGoal === 'build_muscle' ? 'Build Muscle' :
                profile?.dietaryGoal === 'maintain_weight' ? 'Maintain Weight' :
                profile?.dietaryGoal || "Not set"
              }
            </p>
          </div>

          {/* Meal Planner - Coming Soon */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-dashed border-orange-300 p-6 flex flex-col items-center justify-center text-orange-500 hover:shadow-lg transition">
            <span className="text-3xl mb-2">🍽️</span>
            <h3 className="font-semibold text-lg mb-1">Meal Planner</h3>
            <span className="text-sm">Coming Soon</span>
          </div>

          {/* Calorie Tracker - Coming Soon */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-dashed border-blue-300 p-6 flex flex-col items-center justify-center text-blue-500 hover:shadow-lg transition">
            <span className="text-3xl mb-2">🔥</span>
            <h3 className="font-semibold text-lg mb-1">Calorie Tracker</h3>
            <span className="text-sm">Coming Soon</span>
          </div>

          {/* Progress Charts - Coming Soon */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-dashed border-purple-300 p-6 flex flex-col items-center justify-center text-purple-500 hover:shadow-lg transition">
            <span className="text-3xl mb-2">📊</span>
            <h3 className="font-semibold text-lg mb-1">Progress Charts</h3>
            <span className="text-sm">Coming Soon</span>
          </div>

          {/* Recipes - Coming Soon */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border-2 border-dashed border-pink-300 p-6 flex flex-col items-center justify-center text-pink-500 hover:shadow-lg transition">
            <span className="text-3xl mb-2">📖</span>
            <h3 className="font-semibold text-lg mb-1">Healthy Recipes</h3>
            <span className="text-sm">Coming Soon</span>
          </div>

          {/* Water Intake - Coming Soon */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border-2 border-dashed border-cyan-300 p-6 flex flex-col items-center justify-center text-cyan-500 hover:shadow-lg transition">
            <span className="text-3xl mb-2">💧</span>
            <h3 className="font-semibold text-lg mb-1">Water Intake</h3>
            <span className="text-sm">Coming Soon</span>
          </div>

          {/* AI Recommendations - Coming Soon */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-dashed border-green-300 p-6 flex flex-col items-center justify-center text-green-600 hover:shadow-lg transition">
            <span className="text-3xl mb-2">🤖</span>
            <h3 className="font-semibold text-lg mb-1">AI Recommendations</h3>
            <span className="text-sm">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
