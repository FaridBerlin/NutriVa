// src/pages/ProfilePage.jsx
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import ProfileForm from '../components/ProfileForm'
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
  Loader2,
} from 'lucide-react'

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
    if (!bmi)
      return {
        text: 'Not calculated',
        color: 'text-gray-500',
        bg: 'bg-gray-100',
      }
    if (bmi < 18.5)
      return { text: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (bmi < 25)
      return { text: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
    if (bmi < 30)
      return {
        text: 'Overweight',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      }
    return { text: 'Obese', color: 'text-red-600', bg: 'bg-red-50' }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get goal icon
  const getGoalIcon = (goal) => {
    switch (goal) {
      case 'lose_weight':
        return TrendingDown
      case 'gain_weight':
        return TrendingUp
      case 'maintain_weight':
        return Scale
      case 'build_muscle':
        return Dumbbell
      default:
        return Target
    }
  }

  // Get food type icon
  const getFoodIcon = (foodType) => {
    switch (foodType) {
      case 'nonveg':
        return Beef
      case 'veg':
        return Salad
      case 'vegan':
        return Leaf
      default:
        return Utensils
    }
  }

  // Format goal text
  const formatGoal = (goal) => {
    const goals = {
      lose_weight: 'Lose Weight',
      gain_weight: 'Gain Weight',
      maintain_weight: 'Maintain Weight',
      build_muscle: 'Build Muscle',
    }
    return goals[goal] || 'Not set'
  }

  // Format food type text
  const formatFoodType = (type) => {
    const types = {
      nonveg: 'Non-Vegetarian',
      veg: 'Vegetarian',
      vegan: 'Vegan',
    }
    return types[type] || 'Not set'
  }

  // Handle edit complete
  const handleEditComplete = () => {
    setIsEditing(false)
    refreshProfile()
  }

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

  // Prepare data
  const bmi =
    nutritionTargets?.bmi || calculateBMI(profile.height, profile.weight)
  const bmiCategory = getBMICategory(bmi)
  const GoalIcon = getGoalIcon(profile.dietaryGoal)
  const FoodIcon = getFoodIcon(profile.foodType)

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
              <h1 className="text-2xl font-bold text-textDark">
                {user?.name || 'User'}
              </h1>
              <div className="flex items-center gap-2 text-textLight mt-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-2 text-textLight mt-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(user?.createdAt)}</span>
              </div>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => navigate('/settings')}
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
            <p className="text-2xl font-bold text-textDark">
              {profile.height || '—'}
            </p>
            <p className="text-xs text-textLight">Height (cm)</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Weight className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">
              {profile.weight || '—'}
            </p>
            <p className="text-xs text-textLight">Weight (kg)</p>
          </div>

          <div
            className={`rounded-xl shadow p-4 text-center ${bmiCategory.bg}`}
          >
            <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">{bmi || '—'}</p>
            <p className={`text-xs font-medium ${bmiCategory.color}`}>
              {bmiCategory.text}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-textDark">
              {nutritionTargets?.dailyCalories || '—'}
            </p>
            <p className="text-xs text-textLight">Daily Calories</p>
          </div>
        </div>

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
              </div>
              <span className="font-medium text-textDark">
                {user?.name || 'Not set'}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Email</span>
              </div>
              <span className="font-medium text-textDark">
                {user?.email || 'Not set'}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Age</span>
              </div>
              <span className="font-medium text-textDark">
                {profile.age ? `${profile.age} years` : 'Not set'}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Gender</span>
              </div>
              <span className="font-medium text-textDark capitalize">
                {profile.gender || 'Not set'}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Member Since</span>
              </div>
              <span className="font-medium text-textDark">
                {formatDate(user?.createdAt)}
              </span>
            </div>
          </div>
        </div>

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
                {profile.activityLevel?.replace('_', ' ') || 'Not set'}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <GoalIcon className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Fitness Goal</span>
              </div>
              <span className="font-medium text-textDark">
                {formatGoal(profile.dietaryGoal)}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FoodIcon className="w-5 h-5 text-textLight" />
                <span className="text-textLight">Diet Preference</span>
              </div>
              <span className="font-medium text-textDark">
                {formatFoodType(profile.foodType)}
              </span>
            </div>
          </div>
        </div>

        {/* Nutrition Targets */}
        {nutritionTargets && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-textDark mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Daily Nutrition Targets
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <p className="text-2xl font-bold text-orange-600">
                  {nutritionTargets.dailyCalories || '—'}
                </p>
                <p className="text-sm text-textLight">Calories</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-600">
                  {nutritionTargets.protein || '—'}g
                </p>
                <p className="text-sm text-textLight">Protein</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <p className="text-2xl font-bold text-yellow-600">
                  {nutritionTargets.carbs || '—'}g
                </p>
                <p className="text-sm text-textLight">Carbs</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">
                  {nutritionTargets.fats || '—'}g
                </p>
                <p className="text-sm text-textLight">Fats</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-textDark rounded-xl font-medium transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primaryDark text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Settings className="w-5 h-5" />
            Edit Settings
          </button>
        </div>
      </div>
    </div>
  )
}
