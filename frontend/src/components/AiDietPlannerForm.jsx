import React, { useState, useEffect } from 'react'
import api from '../services/api'
import {
  ActivitySquare,
  Scale,
  Ruler,
  UserCircle2,
  Calendar,
  Target,
  Utensils,
  ArrowRight,
} from 'lucide-react'

const AiDietPlannerForm = ({ onPlanGenerated, onCancel }) => {
  const [formData, setFormData] = useState({
    planName: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderately-active',
    mealPerDay: '4',
    goal: 'weight-loss',
    planDuration: '7',
    foodType: 'both',
    useTemplates: false, // NEW: Quick generation option
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [userProfile, setUserProfile] = useState(null)

  const totalSteps = 2

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/profile')

        // Profile is nested in response.data.data.profile
        const profile = response.data?.data?.profile || response.data
        console.log('Fetched profile:', profile) // Debug log

        // Auto-fill from profile
        if (profile) {
          setUserProfile(profile)

          // Map profile values to form values
          const activityLevelMap = {
            sedentary: 'sedentary',
            light: 'lightly-active',
            moderate: 'moderately-active',
            active: 'very-active',
            very_active: 'extra-active',
          }

          const goalMap = {
            lose_weight: 'weight-loss',
            maintain_weight: 'maintenance',
            gain_weight: 'weight-gain',
            build_muscle: 'weight-gain',
          }

          const foodTypeMap = {
            veg: 'veg',
            nonveg: 'non-veg',
            vegan: 'veg',
          }

          setFormData((prev) => ({
            ...prev,
            age: profile.age?.toString() || '',
            weight: profile.weight?.toString() || '',
            height: profile.height?.toString() || '',
            gender: profile.gender || prev.gender,
            activityLevel:
              activityLevelMap[profile.activityLevel] || prev.activityLevel,
            goal: goalMap[profile.dietaryGoal] || prev.goal,
            foodType: foodTypeMap[profile.foodType] || prev.foodType,
          }))
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setError('')

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validateStep = (currentStep) => {
    setError('')

    if (currentStep === 1) {
      if (!formData.planName) {
        setError('Please give your plan a name')
        return false
      }
      if (!formData.age || !formData.weight || !formData.height) {
        setError('Please fill in all physical details')
        return false
      }

      const age = parseInt(formData.age)
      const weight = parseInt(formData.weight)
      const height = parseInt(formData.height)

      if (age < 18 || age > 100) {
        setError('Age must be between 18 and 100 years')
        return false
      }
      if (weight < 30 || weight > 250) {
        setError('Weight must be between 30 and 250 kg')
        return false
      }
      if (height < 100 || height > 250) {
        setError('Height must be between 100 and 250 cm')
        return false
      }
    }

    return true
  }

  const nextStep = () => {
    if (!validateStep(step)) return
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep(step)) return

    setLoading(true)
    setError('')

    try {
      const response = await api.post(
        '/ai-meal-plans',
        {
          planName: formData.planName,
          age: parseInt(formData.age),
          weight: parseInt(formData.weight),
          height: parseInt(formData.height),
          gender: formData.gender,
          activityLevel: formData.activityLevel,
          goal: formData.goal,
          planDuration: parseInt(formData.planDuration),
          mealPerDay: parseInt(formData.mealPerDay),
          foodType: formData.foodType,
          useTemplates: formData.useTemplates, // Send template preference
        },
        {
          timeout: formData.useTemplates ? 30000 : 180000, // Shorter timeout for templates, longer for AI
        },
      )

      if (response.data?.mealPlan) {
        onPlanGenerated(response.data.mealPlan)
      }
    } catch (err) {
      console.error('Error generating diet plan:', err)

      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.')
      } else if (err.response?.status === 401) {
        setError('Session expired. Please login again.')
      } else {
        setError(err.response?.data?.message || 'Failed to generate plan')
      }
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <UserCircle2 className="mr-2 h-6 w-6 text-teal-600" />
              Physical Details
            </h2>
            <p className="mt-1 text-gray-500">
              Let's start with your basic physical information
            </p>
            {userProfile && (
              <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-md">
                <p className="text-sm text-teal-700">
                  ℹ️ Your details have been loaded from your profile
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan Name */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Plan Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="planName"
                value={formData.planName}
                onChange={handleChange}
                placeholder="e.g., Summer Weight Loss Plan"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="mr-2 h-4 w-4 text-teal-500" />
                Age (years) <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
                disabled={userProfile?.age}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  userProfile?.age ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
              />
              <p className="text-xs text-gray-500">
                {userProfile?.age ? 'From your profile' : 'Between 18-100'}
              </p>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Scale className="mr-2 h-4 w-4 text-teal-500" />
                Weight (kg) <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="30"
                max="250"
                disabled={userProfile?.weight}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  userProfile?.weight ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
              />
              <p className="text-xs text-gray-500">
                {userProfile?.weight
                  ? 'From your profile'
                  : 'Between 30-250 kg'}
              </p>
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Ruler className="mr-2 h-4 w-4 text-teal-500" />
                Height (cm) <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="100"
                max="250"
                disabled={userProfile?.height}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  userProfile?.height ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
              />
              <p className="text-xs text-gray-500">
                {userProfile?.height
                  ? 'From your profile'
                  : 'Between 100-250 cm'}
              </p>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <UserCircle2 className="mr-2 h-4 w-4 text-teal-500" />
                Gender <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={userProfile?.gender}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  userProfile?.gender ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Meals Per Day */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Utensils className="mr-2 h-4 w-4 text-teal-500" />
                Meals per Day <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="mealPerDay"
                value={formData.mealPerDay}
                onChange={handleChange}
                min="2"
                max="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <p className="text-xs text-gray-500">Between 2 and 6</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={nextStep}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )
    }

    if (step === 2) {
      return (
        <div className="space-y-4">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Target className="mr-2 h-6 w-6 text-teal-600" />
              Fitness & Goals
            </h2>
            <p className="mt-1 text-gray-500">
              Tell us about your activity level and goals
            </p>
            {userProfile && (
              <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-md">
                <p className="text-sm text-teal-700">
                  ℹ️ Activity level and goals loaded from your profile
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Level */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <ActivitySquare className="mr-2 h-4 w-4 text-teal-500" />
                Activity Level <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="sedentary">
                  Sedentary (little/no exercise)
                </option>
                <option value="lightly-active">
                  Lightly Active (1-3 days/week)
                </option>
                <option value="moderately-active">
                  Moderately Active (3-5 days/week)
                </option>
                <option value="very-active">Very Active (6-7 days/week)</option>
                <option value="extra-active">
                  Extra Active (very active + physical job)
                </option>
              </select>
              {userProfile?.activityLevel && (
                <p className="text-xs text-gray-500">From your profile</p>
              )}
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Target className="mr-2 h-4 w-4 text-teal-500" />
                Goal <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="weight-loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="weight-gain">Weight Gain</option>
              </select>
              {userProfile?.dietaryGoal && (
                <p className="text-xs text-gray-500">From your profile</p>
              )}
            </div>

            {/* Plan Duration */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="mr-2 h-4 w-4 text-teal-500" />
                Plan Duration <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="planDuration"
                value={formData.planDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="3">3 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="21">21 days</option>
                <option value="30">30 days</option>
              </select>
            </div>

            {/* Food Type */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Utensils className="mr-2 h-4 w-4 text-teal-500" />
                Food Preference <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="both">Both (Mixed)</option>
              </select>
              {userProfile?.foodType && (
                <p className="text-xs text-gray-500">From your profile</p>
              )}
            </div>
          </div>

          {/* Quick Generate Option */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-teal-200 rounded-lg">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="useTemplates"
                checked={formData.useTemplates}
                onChange={handleChange}
                className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <div className="ml-3">
                <span className="text-sm font-semibold text-gray-800">
                  ⚡ Quick Generate (Instant)
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Use pre-made meal templates for instant generation. Perfect
                  for plans longer than 14 days.
                  {parseInt(formData.planDuration) > 14 &&
                    ' (Recommended for your plan duration)'}
                </p>
              </div>
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="border border-teal-500 text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Generating...' : 'Generate Meal Plan'}
            </button>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="max-w-4xl mx-auto border rounded-lg shadow-lg bg-white">
      {/* Error Display */}
      {error && (
        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">
          Step {step} of {totalSteps}
        </p>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>{renderStepContent()}</form>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500 text-center">
          Your data is securely processed to create a personalized nutrition
          plan
          <br />
          <span className="text-red-500">*</span> Required fields
        </p>
      </div>
    </div>
  )
}

export default AiDietPlannerForm
