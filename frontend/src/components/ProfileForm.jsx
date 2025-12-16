import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

import {
  User,
  BarChart2,
  Dumbbell,
  Utensils,
  Target,
  Flame,
  Drumstick,
  Leaf,
} from 'lucide-react'
import { useProfile } from '../context/ProfileContext'
import { AuthContext } from '../context/AuthContext'

export default function ProfileForm() {
  const { refreshProfile } = useProfile()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const totalSteps = 5

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    age: '',
    gender: '',

    // Step 2: Metrics
    height: '',
    weight: '',
    heightUnit: 'cm',
    weightUnit: 'kg',

    // Step 3: Activity
    activityLevel: '',

    // Step 4: Diet
    dietaryPreference: '',
    mealsPerDay: 3,
    allergies: [],

    // Step 5: Goals
    fitnessGoal: '',
  })

  // Load existing profile data on mount
  useEffect(() => {
    if (!user) {
      // No user yet; wait for authentication to finish
      return
    }

    // If user exists but hasn't completed profile, prefill name and stop.
    if (!user.profileCompleted) {
      setFormData((prev) => ({ ...prev, name: user.name || prev.name }))
      setIsEditMode(false)
      setIsLoading(false)
      return
    }

    const loadExistingProfile = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/profile')

        if (response.data?.data) {
          const profile = response.data.data
          console.log('Loaded existing profile:', profile)

          setIsEditMode(true)
          setFormData((prev) => ({
            ...prev,
            name: profile.user?.name || prev.name,
            age: profile.age?.toString() || '',
            gender: profile.gender
              ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
              : '',
            height: profile.height?.toString() || '',
            weight: profile.weight?.toString() || '',
            activityLevel: profile.activityLevel || '',
            dietaryPreference: profile.foodType || '',
            fitnessGoal: profile.dietaryGoal || '',
          }))
        }
      } catch (error) {
        // No existing profile - that's fine, user will create new one
        console.log('No existing profile found, creating new one')
        setIsEditMode(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Only attempt to load the profile if the backend marks it completed
    loadExistingProfile()
  }, [])

  // Calculate BMI
  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return null

    let heightInMeters = formData.height
    if (formData.heightUnit === 'cm') {
      heightInMeters = formData.height / 100
    }

    let weightInKg = formData.weight
    if (formData.weightUnit === 'lbs') {
      weightInKg = formData.weight * 0.453592
    }

    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
    return bmi
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-500' }
    if (bmi < 25) return { text: 'Normal', color: 'text-primary' }
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-500' }
    return { text: 'Obese', color: 'text-red-500' }
  }

  // Progress Percentage
  const progressPercentage = (currentStep / totalSteps) * 100

  // Steps Configuration (lucide-react icons)
  const steps = [
    { number: 1, label: 'Basic', icon: <User className="w-6 h-6" /> },
    { number: 2, label: 'Metrics', icon: <BarChart2 className="w-6 h-6" /> },
    { number: 3, label: 'Activity', icon: <Dumbbell className="w-6 h-6" /> },
    { number: 4, label: 'Diet', icon: <Utensils className="w-6 h-6" /> },
    { number: 5, label: 'Goals', icon: <Target className="w-6 h-6" /> },
  ]

  // Handle Input Change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log('=== PROFILE SUBMISSION ===')
      console.log('Edit Mode:', isEditMode)
      console.log('Full formData:', formData)

      // Validation
      if (!formData.fitnessGoal) {
        alert('Please select a fitness goal')
        return
      }

      if (!formData.activityLevel) {
        alert('Please select an activity level')
        return
      }

      // Transform data to match Backend expected format
      const profileData = {
        age: parseInt(formData.age),
        gender: formData.gender.toLowerCase(), // male, female, other
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activityLevel: formData.activityLevel, // sedentary, light, moderate, active, very_active
        dietaryGoal: formData.fitnessGoal, // lose_weight, maintain_weight, gain_weight, build_muscle
      }

      console.log('Profile data to send:', JSON.stringify(profileData, null, 2))

      let response

      // If in edit mode, use PUT directly
      if (isEditMode) {
        console.log('Updating existing profile...')
        response = await api.put('/profile', profileData)
      } else {
        console.log('Creating new profile...')
        response = await api.post('/profile/complete', profileData)
      }

      if (response.status === 200 || response.status === 201) {
        console.log('Profile created successfully:', response.data)
        // Refresh ProfileContext so Dashboard gets the new data
        await refreshProfile()
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error submitting profile:', error)
      console.error('Error response:', error.response?.data)

      // If profile already exists, try to update
      if (error.response?.status === 400) {
        const errorData = error.response?.data

        // Check if it's validation errors
        if (errorData?.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((e) => e.msg || e.message)
            .join('\n')
          alert('Validation errors:\n' + errorMessages)
          return
        }

        // Check if profile already exists
        if (errorData?.message?.includes('already exists')) {
          try {
            const profileData = {
              age: parseInt(formData.age),
              gender: formData.gender.toLowerCase(),
              height: parseFloat(formData.height),
              weight: parseFloat(formData.weight),
              activityLevel: formData.activityLevel,
              dietaryGoal: formData.fitnessGoal,
            }

            console.log('Updating existing profile...')
            const updateResponse = await api.put('/profile', profileData)
            if (updateResponse.status === 200) {
              console.log('Profile updated successfully')
              // Refresh ProfileContext so Dashboard gets the updated data
              await refreshProfile()
              navigate('/dashboard')
              return
            }
          } catch (updateError) {
            console.error('Error updating profile:', updateError)
            console.error('Update error response:', updateError.response?.data)
          }
        }
      }

      alert(
        error.response?.data?.message ||
          'Failed to save profile. Please try again.',
      )
    }
  }

  // Render Step Content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo formData={formData} handleChange={handleChange} />
        )
      case 2:
        return (
          <Step2Metrics
            formData={formData}
            handleChange={handleChange}
            calculateBMI={calculateBMI}
            getBMICategory={getBMICategory}
          />
        )
      case 3:
        return <Step3Activity formData={formData} handleChange={handleChange} />
      case 4:
        return <Step4Diet formData={formData} handleChange={handleChange} />
      case 5:
        return <Step5Goals formData={formData} handleChange={handleChange} />
      default:
        return null
    }
  }

  // Show loading while fetching existing profile
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textLight">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-2">
            {isEditMode ? 'Edit Your Profile ✏️' : 'Welcome to NutriVa! 🎉'}
          </h1>
          <p className="text-textLight text-lg">
            {isEditMode
              ? 'Update your information below'
              : "Let's personalize your nutrition journey"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-textLight">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-primary">
              {progressPercentage.toFixed(0)}% Complete
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-primary to-primaryDark h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Steps Icons */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                  transition-all duration-300
                  ${
                    currentStep >= step.number
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                  }
                  ${currentStep === step.number ? 'ring-4 ring-primaryLight70' : ''}
                `}
                >
                  {currentStep > step.number ? '✓' : step.icon}
                </div>
                <span className="text-xs mt-1 text-textLight font-medium">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-all
              ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-textDark hover:bg-gray-300'
              }
            `}
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-2.5 bg-gradient-to-r from-primary to-primaryDark 
                       text-white rounded-lg font-semibold hover:shadow-lg 
                       transition-all transform hover:scale-105"
          >
            {currentStep === totalSteps
              ? isEditMode
                ? 'Update Profile ✓'
                : 'Complete Setup ✓'
              : 'Next →'}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-textLight mt-6">
          Need help? Contact support@nutriva.com
        </p>
      </div>
    </div>
  )
}

// ==================== STEP COMPONENTS ====================

// Step 1: Basic Information
function Step1BasicInfo({ formData, handleChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">
            Basic Information
          </h2>
          <p className="text-textLight">Tell us about yourself</p>
        </div>
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all"
        />
      </div>

      {/* Age */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          How old are you? <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
          placeholder="22"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-textDark mb-3">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              value: 'male',
              label: 'Male',
              color: 'text-blue-500',
            },
            {
              value: 'female',
              label: 'Female',
              color: 'text-pink-500',
            },
            {
              value: 'other',
              label: 'Other',
              color: 'text-gray-400',
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange('gender', option.value)}
              className={
                `p-4 border-2 rounded-lg text-center transition-all ` +
                (formData.gender === option.value
                  ? 'border-primary bg-primaryLight40 shadow-md'
                  : 'border-gray-200 hover:border-primary hover:bg-primaryLight40')
              }
            >
              <div className={`mb-2 flex justify-center`}>
                <User className={`w-7 h-7 mx-auto ${option.color}`} />
              </div>
              <div className="font-medium text-textDark">{option.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 2: Body Metrics
function Step2Metrics({
  formData,
  handleChange,
  calculateBMI,
  getBMICategory,
}) {
  const bmi = calculateBMI()
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          💚
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Body Metrics</h2>
          <p className="text-textLight">Help us calculate your BMI</p>
        </div>
      </div>

      {/* Height */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Height <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange('height', e.target.value)}
            placeholder="188"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all"
          />
          <select
            value={formData.heightUnit}
            onChange={(e) => handleChange('heightUnit', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary
                       transition-all"
          >
            <option value="cm">cm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      {/* Weight */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Weight <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="90"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all"
          />
          <select
            value={formData.weightUnit}
            onChange={(e) => handleChange('weightUnit', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary
                       transition-all"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>

      {/* BMI Display */}
      {bmi && (
        <div className="bg-primaryLight40 p-6 rounded-xl border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textLight mb-1">Your BMI</p>
              <p className="text-4xl font-bold text-textDark">{bmi}</p>
              <p className={`text-lg font-semibold mt-1 ${bmiCategory.color}`}>
                {bmiCategory.text}
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
          <p className="text-xs text-textLight mt-4">
            BMI Range: &lt;18.5 Underweight | 18.5-24.9 Normal | 25-29.9
            Overweight | ≥30 Obese
          </p>
        </div>
      )}
    </div>
  )
}

// Step 3: Activity Level
function Step3Activity({ formData, handleChange }) {
  const activities = [
    {
      value: 'sedentary',
      label: 'Sedentary',
      description: 'Little or no exercise, desk job',
      icon: <User className="w-7 h-7 mx-auto text-gray-400" />,
    },
    {
      value: 'light',
      label: 'Lightly Active',
      description: 'Light exercise 1-3 days/week',
      icon: <User className="w-7 h-7 mx-auto text-green-400" />,
    },
    {
      value: 'moderate',
      label: 'Moderately Active',
      description: 'Moderate exercise 3-5 days/week',
      icon: <BarChart2 className="w-7 h-7 mx-auto text-blue-400" />,
    },
    {
      value: 'active',
      label: 'Very Active',
      description: 'Hard exercise 6-7 days/week',
      icon: <Dumbbell className="w-7 h-7 mx-auto text-purple-500" />,
    },
    {
      value: 'very_active',
      label: 'Extra Active',
      description: 'Very hard exercise, physical job',
      icon: <Flame className="w-7 h-7 mx-auto text-orange-500" />,
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          📈
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Activity Level</h2>
          <p className="text-textLight">How active are you?</p>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <button
            key={activity.value}
            type="button"
            onClick={() => handleChange('activityLevel', activity.value)}
            className={
              `w-full p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ` +
              (formData.activityLevel === activity.value
                ? 'border-primary bg-primaryLight40 ring-2 ring-primaryLight70'
                : 'border-gray-200 hover:border-primary hover:bg-primaryLight40')
            }
          >
            <div className="flex items-center gap-4">
              <span>{activity.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-textDark text-lg">
                  {activity.label}
                </div>
                <div className="text-sm text-textLight">
                  {activity.description}
                </div>
              </div>
              {formData.activityLevel === activity.value && (
                <span className="text-primary text-2xl">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Step 4: Diet & Health
// Updated 4 December 2025: Fixed foodType values to match Backend enum (veg, nonveg, vegan)
function Step4Diet({ formData, handleChange }) {
  const [allergyInput, setAllergyInput] = useState('')

  const dietOptions = [
    {
      value: 'veg',
      label: 'Vegetarian',
      icon: <Utensils className="w-7 h-7 mx-auto text-green-500" />,
    },
    {
      value: 'nonveg',
      label: 'Non-Veg',
      icon: <Drumstick className="w-7 h-7 mx-auto text-orange-500" />,
    },
    {
      value: 'vegan',
      label: 'Vegan',
      icon: <Leaf className="w-7 h-7 mx-auto text-lime-600" />,
    },
  ]

  const addAllergy = () => {
    if (allergyInput.trim()) {
      handleChange('allergies', [...formData.allergies, allergyInput.trim()])
      setAllergyInput('')
    }
  }

  const removeAllergy = (index) => {
    const newAllergies = formData.allergies.filter((_, i) => i !== index)
    handleChange('allergies', newAllergies)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          🍽️
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Diet & Health</h2>
          <p className="text-textLight">Your dietary preferences</p>
        </div>
      </div>

      {/* Dietary Preference */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-3">
          Dietary Preference <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {dietOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange('dietaryPreference', option.value)}
              className={
                `p-4 border-2 rounded-lg text-center transition-all ` +
                (formData.dietaryPreference === option.value
                  ? 'border-primary bg-primaryLight40 shadow-md'
                  : 'border-gray-200 hover:border-primary hover:bg-primaryLight40')
              }
            >
              <div className="mb-2 flex justify-center">{option.icon}</div>
              <div className="font-medium text-textDark">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Meals Per Day */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-3">
          Meals Per Day <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="2"
            max="6"
            value={formData.mealsPerDay}
            onChange={(e) =>
              handleChange('mealsPerDay', parseInt(e.target.value))
            }
            className="flex-1 h-2 bg-primaryLight40 rounded-lg appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, #83D385 0%, #83D385 ${((formData.mealsPerDay - 2) / 4) * 100}%, #e5e7eb ${((formData.mealsPerDay - 2) / 4) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <span className="text-3xl font-bold text-primary w-12 text-center">
            {formData.mealsPerDay}
          </span>
        </div>
        <div className="flex justify-between text-xs text-textLight mt-1">
          <span>2 meals</span>
          <span>6 meals</span>
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-textDark mb-2">
          Allergies & Restrictions (Optional)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
            placeholder="e.g., peanuts, dairy"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary
                       transition-all"
          />
          <button
            type="button"
            onClick={addAllergy}
            className="px-6 py-2 bg-primary text-white rounded-lg 
                       hover:bg-primaryDark transition-all"
          >
            Add
          </button>
        </div>

        {/* Allergies Tags */}
        {formData.allergies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.allergies.map((allergy, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 
                           bg-red-100 text-red-700 rounded-full text-sm"
              >
                {allergy}
                <button
                  type="button"
                  onClick={() => removeAllergy(index)}
                  className="hover:text-red-900 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Step 5: Goals
// Updated 4 December 2025: Fixed dietaryGoal values to match Backend enum
function Step5Goals({ formData, handleChange }) {
  const goals = [
    {
      value: 'lose_weight',
      label: 'Lose Weight',
      icon: <BarChart2 className="w-8 h-8 mx-auto text-blue-500" />, // Downward trend
    },
    {
      value: 'gain_weight',
      label: 'Gain Weight',
      icon: <BarChart2 className="w-8 h-8 mx-auto text-green-500 rotate-180" />, // Upward trend (rotated)
    },
    {
      value: 'build_muscle',
      label: 'Build Muscle',
      icon: <Dumbbell className="w-8 h-8 mx-auto text-purple-500" />, // Muscle
    },
    {
      value: 'maintain_weight',
      label: 'Maintain',
      icon: <Target className="w-8 h-8 mx-auto text-gray-500" />, // Target/Balance
    },
  ]

  // Profile Summary
  const profileSummary = {
    name: formData.name || 'User',
    age: formData.age ? `${formData.age} years` : 'N/A',
    bmi: formData.height && formData.weight ? 'Calculated' : 'N/A',
    diet: formData.dietaryPreference || 'N/A',
    activity: formData.activityLevel
      ? formData.activityLevel.replace('_', ' ')
      : 'N/A',
    goal: formData.fitnessGoal || 'Not selected',
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          🎯
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Your Goals</h2>
          <p className="text-textLight">What do you want to achieve?</p>
        </div>
      </div>

      {/* Fitness Goals */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-textDark mb-3">
          Fitness Goal <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => handleChange('fitnessGoal', goal.value)}
              className={`
                p-6 border-2 rounded-xl text-center transition-all
                hover:shadow-md
                ${
                  formData.fitnessGoal === goal.value
                    ? 'border-primary bg-primaryLight40 shadow-lg'
                    : 'border-gray-200 hover:border-primary hover:bg-primaryLight40'
                }
              `}
            >
              <div className="mb-2 flex justify-center">{goal.icon}</div>
              <div className="font-semibold text-textDark">{goal.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-primaryLight40 p-6 rounded-xl border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📋</span>
          <h3 className="font-bold text-textDark">Your Profile Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-textLight">Name:</span>
            <span className="font-semibold text-textDark ml-2">
              {profileSummary.name}
            </span>
          </div>
          <div>
            <span className="text-textLight">Age:</span>
            <span className="font-semibold text-textDark ml-2">
              {profileSummary.age}
            </span>
          </div>
          <div>
            <span className="text-textLight">BMI:</span>
            <span className="font-semibold text-textDark ml-2">
              {profileSummary.bmi}
            </span>
          </div>
          <div>
            <span className="text-textLight">Diet:</span>
            <span className="font-semibold text-textDark ml-2 capitalize">
              {profileSummary.diet}
            </span>
          </div>
          <div>
            <span className="text-textLight">Activity:</span>
            <span className="font-semibold text-textDark ml-2 capitalize">
              {profileSummary.activity}
            </span>
          </div>
          <div>
            <span className="text-textLight">Goal:</span>
            <span className="font-semibold text-textDark ml-2 capitalize">
              {profileSummary.goal}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
