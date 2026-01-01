import { useState, useEffect, useContext } from 'react'
import { useProfile } from '../context/ProfileContext'
import { useMealPlan } from '../context/aiMealPlanContext'
import {
  Calendar,
  Utensils,
  Leaf,
  Drumstick,
  AlertCircle,
  CheckCircle,
  Scale,
  Ruler,
  UserCircle2,
} from 'lucide-react'

const DIET_TYPES = ['veg', 'non-veg', 'vegan']
const ALLERGENS = ['dairy-free', 'gluten-free', 'nut-free', 'soy-free', 'none']
const DURATION_OPTIONS = [3, 7, 14, 21, 30]

export default function AiDietPlannerForm({ onPlanGenerated, onCancel }) {
  const { profile: userProfile, loading: profileLoading } = useProfile()
  const { generateMealPlan, loading: planLoading } = useMealPlan()

  const [currentStep, setCurrentStep] = useState(0) // Start at 0 for profile info
  const totalSteps = 5 // Profile + 4 steps

  const [form, setForm] = useState({
    // Profile Info (Step 0)
    planName: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderately-active',
    goal: 'weight-loss',
    // Step 1: Duration
    duration: 7,
    // Step 2: Meals Per Day
    mealsPerDay: 3,
    // Step 3: Diet Type
    dietType: 'veg',
    // Step 4: Allergens
    allergens: [],
    // Quick Generate
    useTemplates: false,
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const loading = profileLoading || planLoading

  // Auto-fill from profile when it loads
  useEffect(() => {
    if (userProfile) {
      // Auto-fill from profile
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

      setForm((prev) => ({
        ...prev,
        age: userProfile.age?.toString() || '',
        weight: userProfile.weight?.toString() || '',
        height: userProfile.height?.toString() || '',
        gender: userProfile.gender || prev.gender,
        activityLevel:
          activityLevelMap[userProfile.activityLevel] || prev.activityLevel,
        goal: goalMap[userProfile.dietaryGoal] || prev.goal,
      }))
    }
  }, [userProfile])

  // Progress Percentage
  const progressPercentage = (currentStep / totalSteps) * 100

  // Steps Configuration
  const steps = [
    { number: 0, label: 'Profile', icon: <UserCircle2 className="w-6 h-6" /> },
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
    setError('')
  }

  const handleAllergenToggle = (allergen) => {
    setForm((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }))
  }

  const validateStep = (step) => {
    if (step === 0) {
      if (!form.planName.trim()) {
        setError('Please enter a plan name')
        return false
      }
      if (!form.age || !form.weight || !form.height) {
        setError('Please fill in all physical details')
        return false
      }
      const age = parseInt(form.age)
      const weight = parseInt(form.weight)
      const height = parseInt(form.height)

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

  const handleNext = () => {
    if (!validateStep(currentStep)) return

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
      setError('')
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setError('')
    }
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!validateStep(0)) {
      setCurrentStep(0)
      return
    }

    try {
      // Map form data to API format
      const payload = {
        planName: form.planName,
        age: parseInt(form.age),
        weight: parseInt(form.weight),
        height: parseInt(form.height),
        gender: form.gender,
        activityLevel: form.activityLevel,
        goal: form.goal,
        planDuration: form.duration,
        mealPerDay: form.mealsPerDay,
        foodType: form.dietType === 'non-veg' ? 'nonveg' : form.dietType,
        allergens: form.allergens,
        useTemplates: form.useTemplates,
      }

      const result = await generateMealPlan(payload)

      if (result.success) {
        setSuccess('Meal plan generated successfully!')
        setTimeout(() => {
          onPlanGenerated(result.data)
        }, 1000)
      } else {
        setError(result.error || 'Failed to generate plan')
      }
    } catch (err) {
      console.error('Error generating meal plan:', err)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step0ProfileInfo
            form={form}
            handleChange={handleChange}
            userProfile={userProfile}
          />
        )
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
            handleChange={handleChange}
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
            AI Diet Planner 🤖
          </h1>
          <p className="text-textLight text-lg">
            Let AI design your personalized nutrition plan
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-textLight">
              Step {currentStep + 1} of {totalSteps}
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
            disabled={currentStep === 0}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-all
              ${
                currentStep === 0
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
              : currentStep === totalSteps - 1
                ? 'Generate Meal Plan ✓'
                : 'Next →'}
          </button>
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <div className="text-center mt-4">
            <button
              onClick={onCancel}
              className="text-textLight hover:text-textDark text-sm"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Help Text */}
        <p className="text-center text-sm text-textLight mt-6">
          Need help? Contact support@nutriva.com
        </p>
      </div>
    </div>
  )
}

// ==================== STEP COMPONENTS ====================

// Step 0: Profile Information
function Step0ProfileInfo({ form, handleChange, userProfile }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          <UserCircle2 className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">
            Profile Information
          </h2>
          <p className="text-textLight">
            Your physical details and fitness goals
          </p>
        </div>
      </div>

      {userProfile && (
        <div className="mb-4 p-3 bg-primaryLight40 border border-primary rounded-lg">
          <p className="text-sm text-textDark">
            ℹ️ Details loaded from your profile
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Plan Name */}
        <div>
          <label className="block text-sm font-medium text-textDark mb-2">
            Plan Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.planName}
            onChange={(e) => handleChange('planName', e.target.value)}
            placeholder="e.g., My AI Diet Plan"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all"
          />
        </div>

        {/* Age, Weight, Height, Gender in Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="flex items-center text-sm font-medium text-textDark mb-2">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              Age (years) <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => handleChange('age', e.target.value)}
              min="18"
              max="100"
              disabled={userProfile?.age}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all ${userProfile?.age ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            <p className="text-xs text-textLight mt-1">
              {userProfile?.age ? 'From your profile' : 'Between 18-100'}
            </p>
          </div>

          {/* Weight */}
          <div>
            <label className="flex items-center text-sm font-medium text-textDark mb-2">
              <Scale className="mr-2 h-4 w-4 text-primary" />
              Weight (kg) <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              min="30"
              max="250"
              disabled={userProfile?.weight}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all ${userProfile?.weight ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            <p className="text-xs text-textLight mt-1">
              {userProfile?.weight ? 'From your profile' : 'Between 30-250 kg'}
            </p>
          </div>

          {/* Height */}
          <div>
            <label className="flex items-center text-sm font-medium text-textDark mb-2">
              <Ruler className="mr-2 h-4 w-4 text-primary" />
              Height (cm) <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => handleChange('height', e.target.value)}
              min="100"
              max="250"
              disabled={userProfile?.height}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all ${userProfile?.height ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            <p className="text-xs text-textLight mt-1">
              {userProfile?.height ? 'From your profile' : 'Between 100-250 cm'}
            </p>
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center text-sm font-medium text-textDark mb-2">
              <UserCircle2 className="mr-2 h-4 w-4 text-primary" />
              Gender <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              disabled={userProfile?.gender}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all ${userProfile?.gender ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Activity Level & Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Activity Level <span className="text-red-500">*</span>
            </label>
            <select
              value={form.activityLevel}
              onChange={(e) => handleChange('activityLevel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all"
            >
              <option value="sedentary">Sedentary (little/no exercise)</option>
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
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Goal <span className="text-red-500">*</span>
            </label>
            <select
              value={form.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all"
            >
              <option value="weight-loss">Weight Loss</option>
              <option value="maintenance">Maintenance</option>
              <option value="weight-gain">Weight Gain</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 1: Plan Details (Duration)
function Step1PlanDetails({ form, handleChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
          <Calendar className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-textDark">Plan Duration</h2>
          <p className="text-textLight">How many days should your plan last?</p>
        </div>
      </div>

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
          {[2, 3, 4, 5].map((n) => (
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
  const dietOptions = DIET_TYPES.map((type) => {
    const configs = {
      veg: {
        label: 'Vegetarian',
        icon: <Leaf className="w-8 h-8 mx-auto text-green-500" />,
        description: 'Plant-based with dairy & eggs',
      },
      'non-veg': {
        label: 'Non-Vegetarian',
        icon: <Drumstick className="w-8 h-8 mx-auto text-orange-500" />,
        description: 'Includes meat & seafood',
      },
      vegan: {
        label: 'Vegan',
        icon: <Leaf className="w-8 h-8 mx-auto text-lime-600" />,
        description: 'Fully plant-based',
      },
    }
    return { value: type, ...configs[type] }
  })

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
function Step4Allergens({ form, handleAllergenToggle, handleChange }) {
  const allergenOptions = ALLERGENS.map((allergen) => {
    const configs = {
      'dairy-free': { label: 'Dairy Free', emoji: '🥛' },
      'gluten-free': { label: 'Gluten Free', emoji: '🌾' },
      'nut-free': { label: 'Nut Free', emoji: '🥜' },
      'soy-free': { label: 'Soy Free', emoji: '🫘' },
      none: { label: 'No Restrictions', emoji: '✅' },
    }
    return { value: allergen, ...configs[allergen] }
  })

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

      {/* Quick Generate Checkbox - Placed after allergen options */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-primaryLight40 border border-primary rounded-lg">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={form.useTemplates}
            onChange={(e) => handleChange('useTemplates', e.target.checked)}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
          />
          <div className="ml-3">
            <span className="text-sm font-semibold text-textDark">
              ⚡ Quick Generate (Instant)
            </span>
            <p className="text-xs text-textLight mt-1">
              Use pre-made meal templates for instant generation. Perfect for
              plans longer than 14 days.
            </p>
          </div>
        </label>
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
          <div>
            <span className="text-textLight">Quick Generate:</span>
            <span className="font-semibold text-textDark ml-2">
              {form.useTemplates ? 'Yes ⚡' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
