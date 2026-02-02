import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Card from './ui/Card'
import { bmiCategory, getBMIColor } from '../utils/bmiUtils'

import {
  User,
  BarChart2,
  Dumbbell,
  Utensils,
  Target,
  Flame,
  Drumstick,
  Check,
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
  const [formError, setFormError] = useState('')
  const [showError, setShowError] = useState(false)
  const [serverWarnings, setServerWarnings] = useState([])

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    age: '',
    gender: '',

    // Step 2: Metrics (cm and kg only)
    height: '',
    weight: '',

    // Step 3: Activity
    activityLevel: '',

    // Step 4: Diet
    dietaryPreference: '',

    // Target weight (optional, in kg)
    targetWeight: '',

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
            name: profile.user.charAt(0).toUpperCase()?.name || prev.name,
            age: profile.age?.toString() || '',
            gender: profile.gender
              ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
              : '',
            height: profile.height?.toString() || '',
            weight: profile.weight?.toString() || '',
            activityLevel: profile.activityLevel || '',
            dietaryPreference: profile.foodType || '',
            fitnessGoal: profile.dietaryGoal || '',
            targetWeight: profile.targetWeight
              ? profile.targetWeight.toString()
              : '',
            targetWeightUnit: profile.targetWeight
              ? 'kg'
              : prev.targetWeightUnit,
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

    const heightInMeters = formData.height / 100 // Convert cm to meters
    const weightInKg = formData.weight

    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
    return bmi
  }

  // Progress Percentage
  const progressPercentage = (currentStep / totalSteps) * 100

  // Animated display percentage for smooth transitions
  const [displayPercent, setDisplayPercent] = useState(progressPercentage)
  const prevPercentRef = useRef(progressPercentage)

  useEffect(() => {
    const start = prevPercentRef.current || 0
    const end = (currentStep / totalSteps) * 100
    const duration = 600 // ms
    let rafId
    let startTime = null

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const t = Math.min(1, elapsed / duration)
      const value = start + (end - start) * easeOut(t)
      setDisplayPercent(value)
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        prevPercentRef.current = end
        setDisplayPercent(end)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [currentStep, totalSteps])

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
    // Clear inline error when user changes a field
    setFormError('')
  }

  useEffect(() => {
    if (formError) setShowError(true)
    else setShowError(false)
  }, [formError])

  // Navigation
  const handleNext = () => {
    // Validate step-specific required choices before advancing
    if (currentStep === 1) {
      if (!formData.name || !formData.age || !formData.gender) {
        setFormError(
          'Please fill in your name, age and gender before continuing.',
        )
        return
      }
    }

    if (currentStep === 2) {
      if (!formData.height || !formData.weight) {
        setFormError('Please enter your height and weight before continuing.')
        return
      }
    }

    if (currentStep === 3 && !formData.activityLevel) {
      setFormError('Please select an activity level before continuing.')
      return
    }

    if (currentStep === 4 && !formData.dietaryPreference) {
      setFormError('Please select a dietary preference before continuing.')
      return
    }

    if (currentStep < totalSteps) {
      setFormError('')
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
        setFormError('Please select a fitness goal before completing setup.')
        return
      }

      if (!formData.activityLevel) {
        setFormError('Please select an activity level before completing setup.')
        return
      }

      // Transform data to match Backend expected format
      // Height in cm, weight in kg
      const profileData = {
        age: parseInt(formData.age),
        gender: formData.gender.toLowerCase(), // male, female, other
        height: parseFloat(formData.height), // in cm
        weight: parseFloat(formData.weight), // in kg
        activityLevel: formData.activityLevel, // sedentary, light, moderate, active, very_active
        foodType: formData.dietaryPreference,
        dietaryGoal: formData.fitnessGoal, // lose_weight, maintain_weight, gain_weight, build_muscle
        ...(formData.targetWeight
          ? { targetWeight: parseFloat(formData.targetWeight) }
          : {}),
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
        const warnings = response?.data?.data?.warnings || []

        // Refresh ProfileContext so Dashboard gets the new data
        await refreshProfile()

        if (warnings.length > 0) {
          // Show warnings and keep user on the form so they can review
          setServerWarnings(warnings)
          return
        }

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
              const warnings = updateResponse?.data?.data?.warnings || []

              // Refresh ProfileContext so Dashboard gets the updated data
              await refreshProfile()

              if (warnings.length > 0) {
                setServerWarnings(warnings)
                return
              }

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
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-10 px-6 text-base md:text-lg">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-2">
            {isEditMode ? 'Edit Your Profile' : 'Welcome to NutriVa! '}
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

          <div
            className="w-full bg-gray-200 rounded-full h-3 mb-4 relative overflow-hidden"
            aria-hidden
          >
            {/* shimmer keyframes */}
            <style>{`
              @keyframes shimmerMove { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
            `}</style>

            <div className="absolute inset-0 bg-gray-200" />

            <div
              className="relative overflow-hidden rounded-full h-3"
              style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)' }}
            >
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${displayPercent}%`,
                  background:
                    'linear-gradient(90deg, var(--tw-gradient-stops))',
                  backgroundImage:
                    'linear-gradient(90deg, #6EE7B7 0%, #10B981 50%, #0EA5A2 100%)',
                }}
              />

              {/* animated shimmer overlay */}
              <div
                className="absolute top-0 left-0 h-3 rounded-full"
                style={{
                  width: `${displayPercent}%`,
                  backgroundImage:
                    'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.06) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmerMove 1.8s linear infinite',
                }}
              />
            </div>
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
        <Card className="p-8 md:p-10 mb-6 ring-1 ring-black/5 shadow-2xl">
          <div
            className={`mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 transform transition-all duration-300 ${
              showError
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            aria-live="assertive"
          >
            {formError}
          </div>
          {serverWarnings.length > 0 && (
            <div className="mb-4 p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <strong className="block">Warning</strong>
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {serverWarnings.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setServerWarnings([])}
                    className="text-sm text-amber-700 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}
          {renderStepContent()}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`
              px-8 py-3 rounded-lg font-medium transition-all text-lg shadow-md
              ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-50 text-textDark hover:bg-gray-100'
              }
            `}
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            className="px-3 py-3 bg-gradient-to-r from-primary to-primaryDark 
                       text-white rounded-lg font-semibold shadow-xl 
                       transition-all transform hover:scale-105 text-lg"
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
          <h2 className="text-3xl font-bold text-textDark">
            Basic Information
          </h2>
          <p className="text-textLight text-lg">Tell us about yourself</p>
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
          className="nv-input text-lg"
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
          className="nv-input text-lg"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-textDark mb-3">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
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
                `p-2 md:p-4 border-2 rounded-lg text-center transition-all flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px] ` +
                (formData.gender === option.value
                  ? 'border-primary bg-primaryLight40 shadow-md'
                  : 'border-gray-200 hover:border-primary hover:bg-primaryLight40')
              }
            >
              <div className={`mb-1 md:mb-2 flex justify-center`}>
                <User
                  className={`w-6 h-6 md:w-7 md:h-7 mx-auto ${option.color}`}
                />
              </div>
              <div className="font-medium text-xs md:text-sm text-textDark">
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 2: Body Metrics
function Step2Metrics({ formData, handleChange, calculateBMI }) {
  const bmi = calculateBMI()
  const category = bmi ? bmiCategory(parseFloat(bmi)) : null
  const bmiColor = bmi ? getBMIColor(parseFloat(bmi)) : null

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          💚
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Body Metrics</h2>
          <p className="text-textLight">Enter your measurements</p>
        </div>
      </div>

      {/* Height */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Height (cm) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => handleChange('height', e.target.value)}
          placeholder="175"
          className="nv-input w-full text-lg"
        />
      </div>

      {/* Weight */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Weight (kg) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          placeholder="70"
          className="nv-input w-full text-lg"
        />
      </div>

      {/* BMI Display */}
      {bmi && (
        <div className="bg-primaryLight40 p-6 rounded-xl border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textLight mb-1">Your BMI</p>
              <p className="text-4xl font-bold text-textDark">{bmi}</p>
              <p
                className="text-lg font-semibold mt-1"
                style={{ color: bmiColor }}
              >
                {category}
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
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
      label: 'Active',
      description: 'Hard exercise 6-7 days/week',
      icon: <Dumbbell className="w-7 h-7 mx-auto text-purple-500" />,
    },
    {
      value: 'very_active',
      label: 'Very Active',
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
              `relative w-full p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ` +
              (formData.activityLevel === activity.value
                ? 'border-primary bg-primaryLight40 ring-2 ring-primaryLight70'
                : 'border-gray-200 hover:border-primary hover:bg-primaryLight40')
            }
          >
            {formData.activityLevel === activity.value && (
              <span className="absolute top-3 right-3 bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow">
                <Check className="w-4 h-4" />
              </span>
            )}
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
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Step 4: Diet Preference
function Step4Diet({ formData, handleChange }) {
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

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          🍽️
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Diet Preference</h2>
          <p className="text-textLight">Choose your dietary preference</p>
        </div>
      </div>

      {/* Dietary Preference */}
      <div>
        <label className="block text-sm font-medium text-textDark mb-3">
          Dietary Preference <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {dietOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange('dietaryPreference', option.value)}
              className={
                `relative p-2 md:p-4 border-2 rounded-lg text-center transition-all flex flex-col items-center justify-center min-h-[120px] md:min-h-[140px] ` +
                (formData.dietaryPreference === option.value
                  ? 'border-primary bg-primaryLight40 shadow-md'
                  : 'border-gray-200 hover:border-primary hover:bg-primaryLight40')
              }
            >
              {formData.dietaryPreference === option.value && (
                <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-green-600 text-white rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xs md:text-sm shadow">
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                </span>
              )}
              <div className="mb-1 md:mb-2 flex justify-center">
                {option.icon}
              </div>
              <div className="font-medium text-xs md:text-sm text-textDark break-words">
                {option.label}
              </div>
            </button>
          ))}
        </div>
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
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {goals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => handleChange('fitnessGoal', goal.value)}
              className={`
                relative p-3 md:p-6 border-2 rounded-xl text-center transition-all
                hover:shadow-md flex flex-col items-center justify-center min-h-[110px] md:min-h-[140px]
                ${
                  formData.fitnessGoal === goal.value
                    ? 'border-primary bg-primaryLight40 shadow-lg'
                    : 'border-gray-200 hover:border-primary hover:bg-primaryLight40'
                }
              `}
            >
              {formData.fitnessGoal === goal.value && (
                <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-green-600 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm shadow">
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                </span>
              )}
              <div className="mb-1 md:mb-2 flex justify-center">
                {goal.icon}
              </div>
              <div className="font-semibold text-xs md:text-sm text-textDark">
                {goal.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Target Weight */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-3">
          Target Weight (kg) - Optional
        </label>
        <input
          type="number"
          value={formData.targetWeight}
          onChange={(e) => handleChange('targetWeight', e.target.value)}
          placeholder="e.g., 75"
          className="nv-input w-full text-lg"
        />
        <p className="text-sm text-textLight mt-2">
          Optional: set a goal weight to track progress.
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-primaryLight40 p-4 md:p-6 rounded-xl border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📋</span>
          <h3 className="font-bold text-xs md:text-base text-textDark break-words">
            Your Profile Summary
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
          <div className="overflow-hidden">
            <span className="text-textLight">Name:</span>
            <span className="font-semibold text-textDark ml-1 md:ml-2 block truncate inline">
              {profileSummary.name}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="text-textLight">Age:</span>
            <span className="font-semibold text-textDark ml-1 md:ml-2 block truncate inline">
              {profileSummary.age}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="text-textLight">BMI:</span>
            <span className="font-semibold text-textDark ml-1 md:ml-2 block truncate inline">
              {profileSummary.bmi}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="text-textLight">Diet:</span>
            <span className="font-semibold text-textDark ml-1 md:ml-2 capitalize block truncate inline">
              {profileSummary.diet}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="text-textLight">Activity:</span>
            <span className="font-semibold text-textDark ml-1 md:ml-2 capitalize block truncate inline">
              {profileSummary.activity}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="text-textLight">Goal:</span>
            <span className="font-semibold text-textDark ml-1 md:ml-2 capitalize block truncate inline">
              {profileSummary.goal}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
