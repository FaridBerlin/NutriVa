//info from ProfileContext

import { useState } from 'react'
import { Flame, Weight, Target, TrendingUp, Pencil } from 'lucide-react'
import { useProfile } from '../../context/ProfileContext'

export default function DashboardStats({ stats }) {
  const { profile, updateProfile, refreshProfile } = useProfile()
  const [editMode, setEditMode] = useState(false)
  const [weight, setWeight] = useState(profile?.weight || stats?.weight || 68)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const calories = stats?.dailyCalories || 2000
  const bmi = stats?.bmi || 24.5
  const daysLeft = stats?.daysLeft || 30

  const handleEdit = () => {
    setEditMode(true)
    setWeight(profile?.weight || stats?.weight || 68)
    setError('')
  }

  const handleSave = async () => {
    const parsedWeight = parseFloat(weight)
    if (
      !parsedWeight ||
      isNaN(parsedWeight) ||
      parsedWeight < 30 ||
      parsedWeight > 300
    ) {
      setError('Please enter a valid weight')
      return
    }
    setSaving(true)
    setError('')
    try {
      await updateProfile({ weight: parsedWeight })
      await refreshProfile()
      setEditMode(false)
    } catch (e) {
      setError('An error occurred while saving')
    }
    setSaving(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Calories */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Flame className="text-orange-500" size={28} />
            <span className="text-3xl font-bold text-textDark">{calories}</span>
          </div>
          <h3 className="text-sm text-textLight">Daily Calories</h3>
        </div>
        {/* Weight */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Weight className="text-blue-500" size={28} />
            {editMode ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  className="border rounded px-2 py-1 w-20 text-xl"
                  value={weight}
                  min={30}
                  max={300}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={saving}
                />
                <button
                  className="bg-primary text-white px-2 py-1 rounded text-sm"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? '...Saving' : 'Save'}
                </button>
              </div>
            ) : (
              <span className="text-3xl font-bold text-textDark flex items-center gap-2">
                {profile?.weight || stats?.weight || 68}{' '}
                <span className="text-base">kg</span>
                <button
                  className="ml-2 p-1 hover:bg-gray-100 rounded"
                  onClick={handleEdit}
                  title="Edit weight"
                >
                  <Pencil size={18} className="text-gray-400" />
                </button>
              </span>
            )}
          </div>
          <h3 className="text-sm text-textLight">Weight (kg)</h3>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
        {/* BMI */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-primary" size={28} />
            <span className="text-3xl font-bold text-textDark">{bmi}</span>
          </div>
          <h3 className="text-sm text-textLight">BMI</h3>
        </div>
        {/* Days Left */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-primary" size={28} />
            <span className="text-3xl font-bold text-textDark">{daysLeft}</span>
          </div>
          <h3 className="text-sm text-textLight">Days Left</h3>
        </div>
      </div>
    </div>
  )
}
