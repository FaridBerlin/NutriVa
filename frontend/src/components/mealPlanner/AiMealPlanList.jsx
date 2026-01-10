import { useState, useEffect } from 'react'
import { useMealPlan } from '../../context/aiMealPlanContext'
import AiMealPlanListDetails from './AiMealPlanListDetails'
import Card from '../ui/Card'
import { Shield } from 'lucide-react'

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
        <p className="text-muted">No AI meal plans created yet.</p>
      )}

      {allPlans.map((plan) => (
        <Card
          key={plan._id}
          noHover
          className="p-4 flex justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-extrabold capitalize">{plan.planName}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white font-semibold">
                AI
              </span>
            </div>
            <h3 className="font-medium capitalize">{plan.foodType}</h3>
            <p className="text-sm text-muted">
              {plan.planDuration} days • {plan.mealPerDay} meals/day
            </p>
            {plan.allergens &&
              plan.allergens.length > 0 &&
              !plan.allergens.includes('none') && (
                <p className="text-xs text-purple-600 mt-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary dark:text-accentYellow" />
                  <span>
                    {plan.allergens.filter((a) => a !== 'none').join(', ')}
                  </span>
                </p>
              )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleView(plan._id)}
              className="nv-btn-primary nv-btn-lg"
            >
              View
            </button>

            <button
              onClick={() => handleDelete(plan._id)}
              className="nv-btn-danger nv-btn-lg"
            >
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
