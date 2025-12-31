import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import api from '../../services/api'
import AiMealPlanListDetails from './AiMealPlanListDetails'

export default function AiMealPlanList() {
  const { user } = useContext(AuthContext)
  const [allPlans, setAllPlans] = useState([])
  const [activePlan, setActivePlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Only fetch plans if user is logged in
    if (user) {
      fetchAllPlans()
    }
  }, [user])

  const fetchAllPlans = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/ai-meal-plans')

      if (response.data?.mealPlans) {
        setAllPlans(response.data.mealPlans)
      }
    } catch (err) {
      console.error('Error fetching AI meal plans:', err)
      // Only show error if it's not a 404 (no plans found)
      if (err.response?.status !== 404) {
        setError('Failed to load meal plans')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleView = async (planId) => {
    try {
      const response = await api.get(`/ai-meal-plans/${planId}`)

      if (response.data?.mealPlan) {
        setActivePlan(response.data.mealPlan)
        setShowDetails(true)
      }
    } catch (err) {
      console.error('Error fetching plan details:', err)
      setError('Failed to load plan details')
    }
  }

  const handleDelete = async (planId) => {
    const confirmed = window.confirm(
      'Do you really want to delete this AI meal plan? This action cannot be undone.',
    )

    if (!confirmed) return

    try {
      await api.delete(`/ai-meal-plans/${planId}`)

      // Remove from local state
      setAllPlans((prev) => prev.filter((plan) => plan._id !== planId))
    } catch (err) {
      console.error('Error deleting plan:', err)
      setError('Failed to delete plan')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  // DETAILS VIEW
  if (showDetails && activePlan) {
    return (
      <AiMealPlanListDetails
        plan={activePlan}
        onBack={() => setShowDetails(false)}
      />
    )
  }

  // LIST VIEW (default)
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">AI Meal Plans</h2>

      {allPlans.length === 0 && (
        <p className="text-gray-500">No AI meal plans created yet.</p>
      )}

      {allPlans.map((plan) => (
        <div
          key={plan._id}
          className="border rounded-lg p-4 flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-extrabold">{plan.planName}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-600 text-white font-semibold">
                AI
              </span>
            </div>
            <h3 className="font-medium capitalize">{plan.foodType}</h3>
            <p className="text-sm text-gray-500">
              {plan.planDuration} days • {plan.mealPerDay} meals/day
            </p>
            {plan.allergens &&
              plan.allergens.length > 0 &&
              !plan.allergens.includes('none') && (
                <p className="text-xs text-purple-600 mt-1">
                  🛡️ {plan.allergens.filter((a) => a !== 'none').join(', ')}
                </p>
              )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleView(plan._id)}
              className="text-purple-600 hover:underline font-medium"
            >
              View
            </button>

            <button
              onClick={() => handleDelete(plan._id)}
              className="text-red-600 hover:underline font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
