import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mealApi from '../api/mealApi'
import {
  Calendar,
  Utensils,
  Leaf,
  Drumstick,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

const DIET_TYPES = ['veg', 'non-veg', 'vegan']
const ALLERGENS = ['dairy-free', 'gluten-free', 'nut-free', 'soy-free', 'none']
const DURATION_OPTIONS = [1, 3, 7, 14, 30]

export default function MealPlanner({ onPlanCreated }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [form, setForm] = useState({
    planName: 'my Plan',
    duration: 3,
    mealsPerDay: 3,
    dietType: 'veg',
    allergens: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Progress Percentage
  const progressPercentage = (currentStep / totalSteps) * 100

  // Steps Configuration
  const steps = [
    { number: 1, label: 'Plan', icon: <Calendar className="w-6 h-6" /> },
    { number: 2, label: 'Meals', icon: <Utensils className="w-6 h-6" /> },
    { number: 3, label: 'Diet', icon: <Leaf className="w-6 h-6" /> },
    {
      number: 4,
      label: 'Allergens',
      icon: <AlertCircle className="w-6 h-6" />,
    },
  ]

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAllergenToggle = (allergen) => {
    setForm((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }))
  }

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
    setError('')
    setSuccess('')
    if (!form.planName) {
      setError('Plan name is required')
      return
    }
    setLoading(true)
    try {
      await mealApi.generateMealPlan(form)
      setSuccess('Meal plan generated successfully!')
      // Call callback or navigate to dashboard meal plans after success
      setTimeout(() => {
        if (onPlanCreated) {
          onPlanCreated()
        } else {
          navigate('/dashboard?id=my-meal-plans')
        }
      }, 1000)
    } catch (err) {
      setError('Failed to generate meal plan. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PlanDetails form={form} handleChange={handleChange} />
      case 2:
        return <Step2MealsConfig form={form} handleChange={handleChange} />
      case 3:
        return <Step3DietType form={form} handleChange={handleChange} />
      case 4:
        return (
          <Step4Allergens
            form={form}
            handleAllergenToggle={handleAllergenToggle}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-2">
            Create Your Meal Plan 🍽️
          </h1>
          <p className="text-textLight text-lg">
            Let's design your personalized nutrition plan
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

          {/* Error & Success Messages */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {success}
            </div>
          )}
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
            disabled={loading}
            className="px-8 py-2.5 bg-gradient-to-r from-primary to-primaryDark 
                       text-white rounded-lg font-semibold hover:shadow-lg 
                       transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading
              ? 'Generating...'
              : currentStep === totalSteps
                ? 'Generate Meal Plan ✓'
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

// Step 1: Plan Details
function Step1PlanDetails({ form, handleChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          <Calendar className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Plan Details</h2>
          <p className="text-textLight">Name and duration of your meal plan</p>
        </div>
      </div>

      {/* Plan Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Plan Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.planName}
          onChange={(e) => handleChange('planName', e.target.value)}
          placeholder="e.g., My Weekly Meal Plan"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-textDark mb-3">
          Duration <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-5 gap-3">
          {DURATION_OPTIONS.map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => handleChange('duration', days)}
              className={`
                p-4 border-2 rounded-xl text-center transition-all
                hover:shadow-md
                ${
                  form.duration === days
                    ? 'border-primary bg-primaryLight40 shadow-lg'
                    : 'border-gray-200 hover:border-primary hover:bg-primaryLight40'
                }
              `}
            >
              <div className="text-2xl font-bold text-primary mb-1">{days}</div>
              <div className="text-xs text-textLight">
                {days === 1 ? 'day' : 'days'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 2: Meals Configuration
function Step2MealsConfig({ form, handleChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          <Utensils className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Meals Per Day</h2>
          <p className="text-textLight">How many meals do you want daily?</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textDark mb-3">
          Number of Meals <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleChange('mealsPerDay', n)}
              className={`
                p-6 border-2 rounded-xl text-center transition-all
                hover:shadow-md
                ${
                  form.mealsPerDay === n
                    ? 'border-primary bg-primaryLight40 shadow-lg'
                    : 'border-gray-200 hover:border-primary hover:bg-primaryLight40'
                }
              `}
            >
              <div className="text-4xl font-bold text-primary mb-2">{n}</div>
              <div className="text-sm text-textLight">
                {n === 1 ? 'meal' : 'meals'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 3: Diet Type
function Step3DietType({ form, handleChange }) {
  const dietOptions = [
    {
      value: 'veg',
      label: 'Vegetarian',
      icon: <Leaf className="w-8 h-8 mx-auto text-green-500" />,
      description: 'Plant-based with dairy & eggs',
    },
    {
      value: 'non-veg',
      label: 'Non-Vegetarian',
      icon: <Drumstick className="w-8 h-8 mx-auto text-orange-500" />,
      description: 'Includes meat & seafood',
    },
    {
      value: 'vegan',
      label: 'Vegan',
      icon: <Leaf className="w-8 h-8 mx-auto text-lime-600" />,
      description: 'Fully plant-based',
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          🥗
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Diet Type</h2>
          <p className="text-textLight">Choose your dietary preference</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textDark mb-3">
          Dietary Preference <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {dietOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange('dietType', option.value)}
              className={`
                w-full p-4 border-2 rounded-xl text-left transition-all hover:shadow-md
                ${
                  form.dietType === option.value
                    ? 'border-primary bg-primaryLight40 ring-2 ring-primaryLight70'
                    : 'border-gray-200 hover:border-primary hover:bg-primaryLight40'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span>{option.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-textDark text-lg">
                    {option.label}
                  </div>
                  <div className="text-sm text-textLight">
                    {option.description}
                  </div>
                </div>
                {form.dietType === option.value && (
                  <span className="text-primary text-2xl">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 4: Allergens
function Step4Allergens({ form, handleAllergenToggle }) {
  const allergenOptions = [
    { value: 'dairy-free', label: 'Dairy Free', emoji: '🥛' },
    { value: 'gluten-free', label: 'Gluten Free', emoji: '🌾' },
    { value: 'nut-free', label: 'Nut Free', emoji: '🥜' },
    { value: 'soy-free', label: 'Soy Free', emoji: '🫘' },
    { value: 'none', label: 'No Restrictions', emoji: '✅' },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          <AlertCircle className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">
            Allergens & Restrictions
          </h2>
          <p className="text-textLight">Select any dietary restrictions</p>
        </div>
      </div>

      <div className="space-y-3">
        {allergenOptions.map((allergen) => (
          <button
            key={allergen.value}
            type="button"
            onClick={() => handleAllergenToggle(allergen.value)}
            className={`
              w-full p-4 border-2 rounded-xl text-left transition-all
              ${
                form.allergens.includes(allergen.value)
                  ? 'border-primary bg-primaryLight40 shadow-md'
                  : 'border-gray-200 hover:border-primary hover:bg-primaryLight40'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{allergen.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-textDark">
                  {allergen.label}
                </div>
              </div>
              {form.allergens.includes(allergen.value) && (
                <span className="text-primary text-2xl">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-primaryLight40 p-6 rounded-xl border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📋</span>
          <h3 className="font-bold text-textDark">Plan Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-textLight">Plan Name:</span>
            <span className="font-semibold text-textDark ml-2">
              {form.planName || 'Not set'}
            </span>
          </div>
          <div>
            <span className="text-textLight">Duration:</span>
            <span className="font-semibold text-textDark ml-2">
              {form.duration} days
            </span>
          </div>
          <div>
            <span className="text-textLight">Meals/Day:</span>
            <span className="font-semibold text-textDark ml-2">
              {form.mealsPerDay}
            </span>
          </div>
          <div>
            <span className="text-textLight">Diet:</span>
            <span className="font-semibold text-textDark ml-2 capitalize">
              {form.dietType}
            </span>
          </div>
          <div>
            <span className="text-textLight">Restrictions:</span>
            <span className="font-semibold text-textDark ml-2">
              {form.allergens.length || 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
