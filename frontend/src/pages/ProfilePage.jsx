// src/pages/ProfilePage.jsx
// Updated 4 December 2025: Using ProfileContext for data management
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import ProfileForm from "../components/ProfileForm";


export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { profile, nutritionTargets, loading, refreshProfile } = useProfile();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Calculate BMI from height and weight
  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Get BMI category
  const getBMICategory = (bmi) => {
    if (!bmi) return { text: "Not calculated", color: "text-gray-500", bg: "bg-gray-50" };
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-500", bg: "bg-blue-50" };
    if (bmi < 25) return { text: "Normal", color: "text-primary", bg: "bg-green-50" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-500", bg: "bg-orange-50" };
    return { text: "Obese", color: "text-red-500", bg: "bg-red-50" };
  };

  // Handle edit complete - refresh profile data
  const handleEditComplete = () => {
    setIsEditing(false);
    refreshProfile();
  };                                                      

  // ProfileForm editing state  
  if (isEditing) {
    return <ProfileForm initialData={profile} onCancel={() => setIsEditing(false)} onComplete={handleEditComplete} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textLight">Loading profile...</p>
        </div>
      </div>
    );
  }

  // No profile exists yet - show the multi-step ProfileForm
  if (!profile) {
    return <ProfileForm />;
  }

  // Prepare display data
  const bmi = nutritionTargets?.bmi || calculateBMI(profile.height, profile.weight);
  const bmiCategory = getBMICategory(bmi);
  const displayProfile = {
    name: user?.name || "User",
    age: profile.age,
    gender: profile.gender,
    height: profile.height,
    weight: profile.weight,
    heightUnit: "cm",
    weightUnit: "kg",
    activityLevel: profile.activityLevel,
    dietaryPreference: profile.foodType || "Not set",
    dietaryGoal: profile.dietaryGoal,
    bmi: bmi,
    bmr: nutritionTargets?.bmr,
    tdee: nutritionTargets?.tdee,
    dailyCalories: nutritionTargets?.dailyCalories
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-textDark">
              Your Profile
            </h1>
            <p className="text-textLight mt-1">
              Manage your nutrition and fitness information
            </p>
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <h2 className="text-2xl font-bold text-textDark">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm text-textLight">Name</p>
                <p className="text-lg font-semibold text-textDark">{displayProfile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🎂</span>
              <div>
                <p className="text-sm text-textLight">Age</p>
                <p className="text-lg font-semibold text-textDark">{displayProfile.age} years</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">{displayProfile.gender === 'male' ? '👨' : displayProfile.gender === 'female' ? '👩' : '🧑'}</span>
              <div>
                <p className="text-sm text-textLight">Gender</p>
                <p className="text-lg font-semibold text-textDark capitalize">{displayProfile.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📏</span>
              <div>
                <p className="text-sm text-textLight">Height</p>
                <p className="text-lg font-semibold text-textDark">
                  {displayProfile.height || 'Not set'} {displayProfile.height ? displayProfile.heightUnit : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">⚖️</span>
              <div>
                <p className="text-sm text-textLight">Weight</p>
                <p className="text-lg font-semibold text-textDark">
                  {displayProfile.weight || 'Not set'} {displayProfile.weight ? displayProfile.weightUnit : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🏃</span>
              <div>
                <p className="text-sm text-textLight">Activity Level</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {displayProfile.activityLevel?.replace('_', ' ') || 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body Metrics Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              📊
            </div>
            <h2 className="text-2xl font-bold text-textDark">Body Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* BMI */}
            <div className={`p-6 ${bmiCategory?.bg || 'bg-gray-50'} rounded-xl border-l-4 border-primary`}>
              <p className="text-sm text-textLight mb-1">Body Mass Index</p>
              <p className="text-4xl font-bold text-textDark mb-2">{displayProfile.bmi || 'N/A'}</p>
              <p className={`text-lg font-semibold ${bmiCategory?.color || 'text-gray-500'}`}>
                {bmiCategory?.text || 'Not calculated'}
              </p>
            </div>

            {/* BMR */}
            <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-textLight mb-1">Basal Metabolic Rate</p>
              <p className="text-4xl font-bold text-textDark mb-2">{displayProfile.bmr || 'N/A'}</p>
              <p className="text-sm text-textLight">calories/day</p>
            </div>

            {/* TDEE   Total Daily Energy Expenditure */}
            <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
              <p className="text-sm text-textLight mb-1">Daily Calorie Need</p>
              <p className="text-4xl font-bold text-textDark mb-2">{displayProfile.tdee || displayProfile.dailyCalories || 'N/A'}</p>
              <p className="text-sm text-textLight">calories/day</p>
            </div>
          </div>
        </div>

        {/* Diet & Goals Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-textDark">Diet & Fitness Goals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🍽️</span>
              <div>
                <p className="text-sm text-textLight">Dietary Preference</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {displayProfile.dietaryPreference}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-sm text-textLight">Fitness Goal</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {displayProfile.dietaryGoal === 'lose_weight' ? 'Lose Weight' :
                   displayProfile.dietaryGoal === 'gain_weight' ? 'Gain Weight' :
                   displayProfile.dietaryGoal === 'build_muscle' ? 'Build Muscle' :
                   displayProfile.dietaryGoal === 'maintain_weight' ? 'Maintain' : 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-textDark 
                       rounded-lg font-semibold transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
// - gender (String, "male"/"female")
// - height (Number, cm)
// - weight (Number, kg)
// - activityLevel (String, enum)
// - dietaryGoal (String, enum)

//  Notes
// - All routes require authentication (protect middleware)
// - Profile linked to User via user field
// - Return proper error messages