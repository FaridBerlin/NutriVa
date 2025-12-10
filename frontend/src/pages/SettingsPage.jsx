import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
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

export default function SettingsPage() {
  const { user } = useContext(AuthContext)
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

      await api.put('/profile', profileData)
      // Navigate to profile page after successful save
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-textDark mb-2 flex items-center justify-center gap-2">
            <Settings className="w-8 h-8 text-primary" /> Settings
          </h1>
          <p className="text-textLight">Manage your profile and preferences</p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Account Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-textLight mt-1">
                  Email cannot be changed
                </p>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> Change Password
            </h2>

            {/* Password Message */}
            {passwordMessage.text && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  passwordMessage.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {passwordMessage.text}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handlePasswordSubmit}
                disabled={isChangingPassword}
                className={`px-6 py-2.5 rounded-xl font-semibold text-white transition-all ${
                  isChangingPassword
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:scale-105'
                }`}
              >
                {isChangingPassword ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Changing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Change Password
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" /> Personal
              Information
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Food Preference
                </label>
                <div className="flex gap-2">
                  {foodTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleChange('foodType', type.value)}
                      className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                        formData.foodType === type.value
                          ? 'border-primary bg-primaryLight40'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <type.Icon
                        className={`w-5 h-5 ${formData.foodType === type.value ? 'text-primary' : 'text-textLight'}`}
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Body Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-primary" /> Body Metrics
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g., 70"
                />
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Activity Level
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
          </div>

          {/* Dietary Goal */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Dietary Goal
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                isSaving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-primaryDark hover:shadow-lg hover:scale-105'
              }`}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
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
