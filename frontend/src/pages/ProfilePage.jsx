// src/pages/ProfilePage.jsx
<<<<<<< HEAD
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import ProfileForm from "../components/ProfileForm";
import {
  User,
  Mail,
  Calendar,
  Ruler,
  Weight,
  Activity,
  Target,
  Utensils,
  TrendingDown,
  TrendingUp,
  Scale,
  Dumbbell,
  Beef,
  Salad,
  Leaf,
  Settings,
  ArrowLeft,
  Flame,
  Heart,
  Clock,
  Loader2
} from "lucide-react";
=======
// Updated 4 December 2025: Using ProfileContext for data management
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import ProfileForm from '../components/ProfileForm'
>>>>>>> dev

export default function ProfilePage() {
  const { user } = useContext(AuthContext)
  const { profile, nutritionTargets, loading, refreshProfile } = useProfile()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  // Calculate BMI from height and weight
  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  // Get BMI category
  const getBMICategory = (bmi) => {
<<<<<<< HEAD
    if (!bmi) return { text: "Not calculated", color: "text-gray-500", bg: "bg-gray-100" };
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-600", bg: "bg-blue-50" };
    if (bmi < 25) return { text: "Normal", color: "text-green-600", bg: "bg-green-50" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-600", bg: "bg-orange-50" };
    return { text: "Obese", color: "text-red-600", bg: "bg-red-50" };
  };
=======
    if (!bmi)
      return {
        text: 'Not calculated',
        color: 'text-gray-500',
        bg: 'bg-gray-50',
      }
    if (bmi < 18.5)
      return { text: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-50' }
    if (bmi < 25)
      return { text: 'Normal', color: 'text-primary', bg: 'bg-green-50' }
    if (bmi < 30)
      return {
        text: 'Overweight',
        color: 'text-orange-500',
        bg: 'bg-orange-50',
      }
    return { text: 'Obese', color: 'text-red-500', bg: 'bg-red-50' }
  }
>>>>>>> dev

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get goal icon
  const getGoalIcon = (goal) => {
    switch (goal) {
      case "lose_weight": return TrendingDown;
      case "gain_weight": return TrendingUp;
      case "maintain_weight": return Scale;
      case "build_muscle": return Dumbbell;
      default: return Target;
    }
  };

  // Get food type icon
  const getFoodIcon = (foodType) => {
    switch (foodType) {
      case "nonveg": return Beef;
      case "veg": return Salad;
      case "vegan": return Leaf;
      default: return Utensils;
    }
  };

  // Format goal text
  const formatGoal = (goal) => {
    const goals = {
      lose_weight: "Lose Weight",
      gain_weight: "Gain Weight",
      maintain_weight: "Maintain Weight",
      build_muscle: "Build Muscle",
    };
    return goals[goal] || "Not set";
  };

  // Format food type text
  const formatFoodType = (type) => {
    const types = {
      nonveg: "Non-Vegetarian",
      veg: "Vegetarian",
      vegan: "Vegan",
    };
    return types[type] || "Not set";
  };

  // Handle edit complete
  const handleEditComplete = () => {
<<<<<<< HEAD
    setIsEditing(false);
    refreshProfile();
  };
=======
    setIsEditing(false)
    refreshProfile()
  }
>>>>>>> dev

  // ProfileForm editing state
  if (isEditing) {
    return (
      <ProfileForm
        initialData={profile}
        onCancel={() => setIsEditing(false)}
        onComplete={handleEditComplete}
      />
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-textLight">Loading profile...</p>
        </div>
      </div>
    )
  }

  // No profile exists yet
  if (!profile) {
    return <ProfileForm />
  }

<<<<<<< HEAD
  // Prepare data
  const bmi = nutritionTargets?.bmi || calculateBMI(profile.height, profile.weight);
  const bmiCategory = getBMICategory(bmi);
  const GoalIcon = getGoalIcon(profile.dietaryGoal);
  const FoodIcon = getFoodIcon(profile.foodType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primaryDark rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-textDark">{user?.name || "User"}</h1>
              <div className="flex items-center gap-2 text-textLight mt-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email || "No email"}</span>
              </div>
              <div className="flex items-center gap-2 text-textLight mt-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(user?.createdAt)}</span>
              </div>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => navigate("/settings")}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-textLight" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Ruler className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">{profile.height || "—"}</p>
            <p className="text-xs text-textLight">Height (cm)</p>
=======
  // Prepare display data
  const bmi =
    nutritionTargets?.bmi || calculateBMI(profile.height, profile.weight)
  const bmiCategory = getBMICategory(bmi)
  const displayProfile = {
    name: user?.name || 'User',
    age: profile.age,
    gender: profile.gender,
    height: profile.height,
    weight: profile.weight,
    heightUnit: 'cm',
    weightUnit: 'kg',
    activityLevel: profile.activityLevel,
    dietaryPreference: profile.foodType || 'Not set',
    dietaryGoal: profile.dietaryGoal,
    bmi: bmi,
    bmr: nutritionTargets?.bmr,
    tdee: nutritionTargets?.tdee,
    dailyCalories: nutritionTargets?.dailyCalories,
  }

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
            <h2 className="text-2xl font-bold text-textDark">
              Personal Details
            </h2>
>>>>>>> dev
          </div>
          
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Weight className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">{profile.weight || "—"}</p>
            <p className="text-xs text-textLight">Weight (kg)</p>
          </div>
          
          <div className={`rounded-xl shadow p-4 text-center ${bmiCategory.bg}`}>
            <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">{bmi || "—"}</p>
            <p className={`text-xs font-medium ${bmiCategory.color}`}>{bmiCategory.text}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">{nutritionTargets?.dailyCalories || "—"}</p>
            <p className="text-xs text-textLight">Daily Calories</p>
          </div>
        </div>

<<<<<<< HEAD
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Full Name</span>
=======
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm text-textLight">Name</p>
                <p className="text-lg font-semibold text-textDark">
                  {displayProfile.name}
                </p>
>>>>>>> dev
              </div>
              <span className="font-medium text-textDark">{user?.name || "Not set"}</span>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Email</span>
=======
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🎂</span>
              <div>
                <p className="text-sm text-textLight">Age</p>
                <p className="text-lg font-semibold text-textDark">
                  {displayProfile.age} years
                </p>
>>>>>>> dev
              </div>
              <span className="font-medium text-textDark">{user?.email || "Not set"}</span>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Age</span>
=======
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">
                {displayProfile.gender === 'male'
                  ? '👨'
                  : displayProfile.gender === 'female'
                    ? '👩'
                    : '🧑'}
              </span>
              <div>
                <p className="text-sm text-textLight">Gender</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {displayProfile.gender}
                </p>
>>>>>>> dev
              </div>
              <span className="font-medium text-textDark">{profile.age ? `${profile.age} years` : "Not set"}</span>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Gender</span>
=======
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📏</span>
              <div>
                <p className="text-sm text-textLight">Height</p>
                <p className="text-lg font-semibold text-textDark">
                  {displayProfile.height || 'Not set'}{' '}
                  {displayProfile.height ? displayProfile.heightUnit : ''}
                </p>
>>>>>>> dev
              </div>
              <span className="font-medium text-textDark capitalize">{profile.gender || "Not set"}</span>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Member Since</span>
=======
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">⚖️</span>
              <div>
                <p className="text-sm text-textLight">Weight</p>
                <p className="text-lg font-semibold text-textDark">
                  {displayProfile.weight || 'Not set'}{' '}
                  {displayProfile.weight ? displayProfile.weightUnit : ''}
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
>>>>>>> dev
              </div>
              <span className="font-medium text-textDark">{formatDate(user?.createdAt)}</span>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Fitness & Diet */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Fitness & Diet
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Activity Level</span>
              </div>
              <span className="font-medium text-textDark capitalize">
                {profile.activityLevel?.replace("_", " ") || "Not set"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <GoalIcon className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Fitness Goal</span>
              </div>
              <span className="font-medium text-textDark">{formatGoal(profile.dietaryGoal)}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FoodIcon className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Diet Preference</span>
              </div>
              <span className="font-medium text-textDark">{formatFoodType(profile.foodType)}</span>
=======
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
            <div
              className={`p-6 ${bmiCategory?.bg || 'bg-gray-50'} rounded-xl border-l-4 border-primary`}
            >
              <p className="text-sm text-textLight mb-1">Body Mass Index</p>
              <p className="text-4xl font-bold text-textDark mb-2">
                {displayProfile.bmi || 'N/A'}
              </p>
              <p
                className={`text-lg font-semibold ${bmiCategory?.color || 'text-gray-500'}`}
              >
                {bmiCategory?.text || 'Not calculated'}
              </p>
            </div>

            {/* BMR */}
            <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-textLight mb-1">
                Basal Metabolic Rate
              </p>
              <p className="text-4xl font-bold text-textDark mb-2">
                {displayProfile.bmr || 'N/A'}
              </p>
              <p className="text-sm text-textLight">calories/day</p>
            </div>

            {/* TDEE   Total Daily Energy Expenditure */}
            <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
              <p className="text-sm text-textLight mb-1">Daily Calorie Need</p>
              <p className="text-4xl font-bold text-textDark mb-2">
                {displayProfile.tdee || displayProfile.dailyCalories || 'N/A'}
              </p>
              <p className="text-sm text-textLight">calories/day</p>
>>>>>>> dev
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Nutrition Targets */}
        {nutritionTargets && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Daily Nutrition Targets
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <p className="text-2xl font-bold text-orange-600">{nutritionTargets.dailyCalories || "—"}</p>
                <p className="text-sm text-textLight">Calories</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-600">{nutritionTargets.protein || "—"}g</p>
                <p className="text-sm text-textLight">Protein</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <p className="text-2xl font-bold text-yellow-600">{nutritionTargets.carbs || "—"}g</p>
                <p className="text-sm text-textLight">Carbs</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">{nutritionTargets.fats || "—"}g</p>
                <p className="text-sm text-textLight">Fats</p>
=======
        {/* Diet & Goals Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-textDark">
              Diet & Fitness Goals
            </h2>
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
                  {displayProfile.dietaryGoal === 'lose_weight'
                    ? 'Lose Weight'
                    : displayProfile.dietaryGoal === 'gain_weight'
                      ? 'Gain Weight'
                      : displayProfile.dietaryGoal === 'build_muscle'
                        ? 'Build Muscle'
                        : displayProfile.dietaryGoal === 'maintain_weight'
                          ? 'Maintain'
                          : 'Not set'}
                </p>
>>>>>>> dev
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
<<<<<<< HEAD
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-textDark rounded-xl font-medium transition-all"
=======
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-textDark 
                       rounded-lg font-semibold transition-all"
>>>>>>> dev
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primaryDark text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Settings className="w-5 h-5" />
            Edit Settings
          </button>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}
=======
  )
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
>>>>>>> dev
