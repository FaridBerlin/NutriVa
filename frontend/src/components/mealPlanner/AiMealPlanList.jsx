import { useState, useEffect } from 'react'
import { useMealPlan } from '../../context/aiMealPlanContext'
import AiMealPlanListDetails from './AiMealPlanListDetails'
import Card from '../ui/Card'
import { Shield, Check } from 'lucide-react'

export default function AiMealPlanList() {
  const {
    activePlan,
    allPlans,
    loading,
    error: contextError,
    fetchAllPlans,
    getMealPlanById,
    deleteMealPlan: deletePlanFromContext,
    setActivePlan,
  } = useMealPlan()

  const [viewPlan, setViewPlan] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [planToDelete, setPlanToDelete] = useState(null)

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

  const handleDeleteClick = (planId) => {
    setPlanToDelete(planId)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    const result = await deletePlanFromContext(planToDelete)

    if (!result.success) {
      setError(result.error || 'Failed to delete plan')
    }

    setShowDeleteModal(false)
    setPlanToDelete(null)
  }

  const handleSetActive = (plan) => {
    setActivePlan(plan)
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
          className={`p-4 flex justify-between items-center transition-all ${
            activePlan?._id === plan._id
              ? 'border-2 border-primary bg-primary/5'
              : ''
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-extrabold capitalize">{plan.planName}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white font-semibold">
                AI
              </span>
              {activePlan?._id === plan._id && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium dark:bg-accentYellow/10 dark:text-accentYellow">
                  <Check size={12} />
                  Active
                </span>
              )}
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
            {activePlan?._id !== plan._id && (
              <button
                onClick={() => handleSetActive(plan)}
                className="btn-secondary nv-btn-lg"
              >
                Set Active
              </button>
            )}
            <button
              onClick={() => handleView(plan._id)}
              className="nv-btn-primary nv-btn-lg"
            >
              View
            </button>

            <button
              onClick={() => handleDeleteClick(plan._id)}
              className="nv-btn-danger nv-btn-lg"
            >
              Delete
            </button>
          </div>
        </Card>
      ))}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-background rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-2">Delete AI Meal Plan</h3>

            <p className="text-sm text-muted mb-6">
              Are you sure you want to delete this meal plan? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button onClick={confirmDelete} className="nv-btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
