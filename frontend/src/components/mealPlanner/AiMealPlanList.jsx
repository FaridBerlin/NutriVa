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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          AI Meal Plans
        </h2>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primaryDark text-white font-semibold text-xs uppercase tracking-wide shadow-md">
          {allPlans.length} {allPlans.length === 1 ? 'Plan' : 'Plans'}
        </span>
      </div>

      {allPlans.length === 0 && (
        <Card
          noHover
          className="p-8 sm:p-12 text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            No AI Meal Plans Yet
          </h3>
          <p className="text-muted dark:text-gray-400">
            Create your first AI-generated meal plan to get started!
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
        {allPlans.map((plan, index) => (
          <Card
            key={plan._id}
            noHover
            style={{ animationDelay: `${index * 150}ms` }}
            className={`p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl animate-slideUp ${
              activePlan?._id === plan._id
                ? 'ring-2 ring-primary dark:ring-accentYellow bg-primary/5 dark:bg-accentYellow/5'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            {/* Header with badges */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="px-2 py-1 rounded-full bg-gradient-to-r from-primary to-primaryDark text-white font-bold text-xs uppercase tracking-wide shadow-sm">
                      AI Generated
                    </span>
                    {activePlan?._id === plan._id && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-sm">
                        <Check size={12} />
                        Active Plan
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white capitalize leading-tight">
                    {plan.planName}
                  </h3>
                </div>
              </div>

              {/* Plan Details - Color coded */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold capitalize">
                    {plan.foodType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold">
                    {plan.planDuration} days
                  </div>
                  <div className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-semibold">
                    {plan.mealPerDay} meals/day
                  </div>
                  {plan.dailyCalories && (
                    <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold">
                      {plan.dailyCalories} cal
                    </div>
                  )}
                </div>

                {/* Allergens/Restrictions */}
                {plan.allergens &&
                  plan.allergens.length > 0 &&
                  !plan.allergens.includes('none') && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                        Restrictions:{' '}
                        {plan.allergens.filter((a) => a !== 'none').join(', ')}
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {activePlan?._id !== plan._id && (
                <button
                  onClick={() => handleSetActive(plan)}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg"
                >
                  Set Active
                </button>
              )}
              <button
                onClick={() => handleView(plan._id)}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all bg-primary hover:bg-primaryDark text-white shadow-md hover:shadow-lg"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeleteClick(plan._id)}
                className="px-4 py-2.5 rounded-lg font-semibold transition-all bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card noHover className="w-full max-w-md shadow-2xl animate-slideUp">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Delete AI Meal Plan
              </h3>

              <p className="text-sm text-muted dark:text-gray-400 mb-6">
                Are you sure you want to delete this meal plan? This action
                cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2.5 rounded-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2.5 rounded-lg font-semibold transition-all bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                >
                  Delete Plan
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
