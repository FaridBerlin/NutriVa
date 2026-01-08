import { useState, useEffect } from 'react'
import { useMealPlan } from '../../context/aiMealPlanContext'
import AiMealPlanListDetails from './AiMealPlanListDetails'

export default function AiMealPlanList() {
  const {
    allPlans,
    loading,
    error: contextError,
    fetchAllPlans,
    getMealPlanById,
    deleteMealPlan: deletePlanFromContext,
  } = useMealPlan()

  const [viewPlan, setViewPlan] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch all plans on mount
    fetchAllPlans()
  }, [])

  // Update local error when context error changes
  useEffect(() => {
    if (contextError) {
      setError(contextError)
    }
  }, [contextError])

  const handleView = async (planId) => {
    const result = await getMealPlanById(planId)
    if (result.success) {
      setViewPlan(result.data)
      setShowDetails(true)
    } else {
      setError(result.error || 'Failed to load plan details')
    }
  }

  const handleDelete = async (planId) => {
    const confirmed = window.confirm(
      'Do you really want to delete this AI meal plan? This action cannot be undone.',
    )

    if (!confirmed) return

    const result = await deletePlanFromContext(planId)
    if (!result.success) {
      setError(result.error || 'Failed to delete plan')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  // DETAILS VIEW
  if (showDetails && viewPlan) {
    return (
      <AiMealPlanListDetails
        plan={viewPlan}
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
          className="border rounded-lg p-4 flex justify-between items-center bg-gradient-to-r from-green-50 to-green-100 border-green-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-extrabold capitalize">{plan.planName}</h3>
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
              //className="text-purple-600 hover:underline font-medium"
              className="px-8 py-2.5 bg-gradient-to-r from-primary to-primaryDark 
                       text-white rounded-lg font-semibold hover:shadow-lg 
                       transition-all transform hover:scale-105 disabled:opacity-50"
            >
              View
            </button>

            <button
              onClick={() => handleDelete(plan._id)}
              //className="text-red-600 hover:underline font-medium"
              className="px-8 py-2.5 bg-gradient-to-r from-red-500 to-red-400 
                       text-white rounded-lg font-semibold hover:shadow-lg 
                       transition-all transform hover:scale-105 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
