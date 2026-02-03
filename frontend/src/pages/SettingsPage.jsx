import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import api from '../services/api'
import {
  Settings,
  User,
  Lock,
  ClipboardList,
  Activity,
  Target,
  TrendingDown,
  Scale,
  TrendingUp,
  Dumbbell,
  Beef,
  Salad,
  Leaf,
  Save,
  Loader2,
  Ruler,
  Weight,
} from 'lucide-react'
import Card from '../components/ui/Card'

export default function SettingsPage() {
  const { user } = useContext(AuthContext)
  const { refreshProfile } = useProfile()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    // User Info
    name: '',
    email: '',

    // Profile Info
    age: '',
    gender: '',
    height: '',
    weight: '',
    // target weight field
    targetWeight: '',
    activityLevel: '',
    dietaryGoal: '',
    foodType: '',
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' })

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/profile')

        if (response.data?.data) {
          const profileData = response.data.data.profile || response.data.data
          setFormData({
            name: profileData.user?.name || user?.name || '',
            email: profileData.user?.email || user?.email || '',
            age: profileData.age?.toString() || '',
            gender: profileData.gender || '',
            height: profileData.height?.toString() || '',
            weight: profileData.weight?.toString() || '',
            targetWeight: profileData.targetWeight
              ? profileData.targetWeight.toString()
              : '',
            targetWeightUnit: profileData.targetWeight ? 'kg' : 'kg',
            activityLevel: profileData.activityLevel || '',
            dietaryGoal: profileData.dietaryGoal || '',
            foodType: profileData.foodType || '',
          })
        }
      } catch (error) {
        console.log('No profile found', error)
        setFormData((prev) => ({
          ...prev,
          name: user?.name || '',
          email: user?.email || '',
        }))
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setMessage({ type: '', text: '' })
  }

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
    setPasswordMessage({ type: '', text: '' })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordMessage({ type: '', text: '' })

    // Validate passwords
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordMessage({
        type: 'error',
        text: 'Please fill in all password fields',
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({
        type: 'error',
        text: 'New password must be at least 6 characters',
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    setIsChangingPassword(true)

    try {
      await api.put('/user/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setPasswordMessage({
        type: 'success',
        text: 'Password changed successfully! ',
      })
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Error changing password:', error)
      setPasswordMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to change password ',
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const profileData = {
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activityLevel: formData.activityLevel,
        dietaryGoal: formData.dietaryGoal,
        foodType: formData.foodType || undefined,
      }

      // Set target weight if provided
      if (formData.targetWeight) {
        const raw = parseFloat(formData.targetWeight)
        if (!isNaN(raw)) {
          profileData.targetWeight = Math.round(raw * 10) / 10
        }
      }

      const response = await api.put('/profile', profileData)

      // Check for server-side warnings
      const warnings = response?.data?.data?.warnings || []

      // Refresh profile context so UI updates everywhere
      try {
        await refreshProfile()
      } catch (err) {
        // ignore refresh errors
      }

      if (warnings.length > 0) {
        // Show warnings but still navigate to profile as before
        setMessage({
          type: 'warning',
          text: warnings.join(' · '),
        })
        // navigate to profile even if there are warnings
        navigate('/profile')
        return
      }

      // No warnings, proceed to profile page
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile ❌',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Activity Level Options
  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Light', desc: 'Exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', desc: 'Exercise 3-5 days/week' },
    { value: 'active', label: 'Active', desc: 'Exercise 6-7 days/week' },
    { value: 'very_active', label: 'Very Active', desc: 'Hard exercise daily' },
  ]

  // Dietary Goal Options
  const dietaryGoals = [
    { value: 'lose_weight', label: 'Lose Weight', Icon: TrendingDown },
    { value: 'maintain_weight', label: 'Maintain Weight', Icon: Scale },
    { value: 'gain_weight', label: 'Gain Weight', Icon: TrendingUp },
    { value: 'build_muscle', label: 'Build Muscle', Icon: Dumbbell },
  ]

  // Food Type Options
  const foodTypes = [
    { value: 'nonveg', label: 'Non-Vegetarian', Icon: Beef },
    { value: 'veg', label: 'Vegetarian', Icon: Salad },
    { value: 'vegan', label: 'Vegan', Icon: Leaf },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textLight">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-textDark mb-2 flex items-center justify-center gap-2">
            <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-primary" /> Settings
          </h1>
          <p className="text-sm sm:text-base text-textLight">
            Manage your profile and preferences
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 ${
              message.type === 'success'
                ? 'status-success'
                : message.type === 'warning'
                  ? 'status-warning'
                  : message.type === 'info'
                    ? 'status-info'
                    : 'status-error'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Information */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="nv-input font-medium"
                />
                <p className="text-xs text-textLight mt-1">
                  Contact support to change name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="nv-input font-medium"
                />
                <p className="text-xs text-textLight mt-1">
                  Email cannot be changed
                </p>
              </div>
            </div>
          </Card>

          {/* Change Password Section */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> Change Password
            </h2>

            {/* Password Message */}
            {passwordMessage.text && (
              <div
                className={`mb-4 ${
                  passwordMessage.type === 'success'
                    ? 'status-success'
                    : 'status-error'
                }`}
              >
                {passwordMessage.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange('currentPassword', e.target.value)
                  }
                  className="nv-input"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange('newPassword', e.target.value)
                  }
                  className="nv-input"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange('confirmPassword', e.target.value)
                  }
                  className="nv-input"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={handlePasswordSubmit}
                disabled={isChangingPassword}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-white transition-all ${
                  isChangingPassword
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'nv-btn-primary'
                }`}
              >
                {isChangingPassword ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Changing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Change Password
                  </span>
                )}
              </button>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" /> Personal
              Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  min="13"
                  max="120"
                  className="nv-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="nv-input h-14"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-sm font-medium text-textDark mb-2">
                  Food Preference
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  {foodTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleChange('foodType', type.value)}
                      className={`flex-1 h-14 p-3 sm:p-4 rounded-lg border-2 flex items-center justify-center gap-2 sm:gap-3 transition-all ${
                        formData.foodType === type.value
                          ? 'border-primary bg-primaryLight40'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <type.Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${formData.foodType === type.value ? 'text-primary' : 'text-textLight'}`}
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Body Metrics */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-primary" /> Body Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  min="50"
                  max="300"
                  step="0.1"
                  className="nv-input"
                  placeholder="e.g., 175"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  min="20"
                  max="500"
                  step="0.1"
                  className="nv-input"
                  placeholder="e.g., 70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Target Weight (optional)
                </label>
                <input
                  type="number"
                  value={formData.targetWeight}
                  onChange={(e) => handleChange('targetWeight', e.target.value)}
                  min="20"
                  max="200"
                  step="0.1"
                  className="nv-input"
                  placeholder="e.g., 75"
                />
                <p className="text-xs text-textLight mt-1">
                  Set a goal weight in kg to track progress.
                </p>
              </div>
            </div>
          </Card>

          {/* Activity Level */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Activity Level
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleChange('activityLevel', level.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                    formData.activityLevel === level.value
                      ? 'border-primary bg-primaryLight40 shadow-lg'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="font-semibold text-textDark text-sm">
                    {level.label}
                  </div>
                  <div className="text-xs text-textLight mt-1">
                    {level.desc}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Dietary Goal */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Dietary Goal
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dietaryGoals.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => handleChange('dietaryGoal', goal.value)}
                  className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                    formData.dietaryGoal === goal.value
                      ? 'border-primary bg-primaryLight40 shadow-lg'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <goal.Icon
                      className={`w-8 h-8 ${formData.dietaryGoal === goal.value ? 'text-primary' : 'text-textLight'}`}
                    />
                  </div>
                  <div className="font-semibold text-textDark">
                    {goal.label}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                isSaving ? 'bg-gray-400 cursor-not-allowed' : 'nv-btn-primary'
              }`}
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" /> Save Changes
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
