// my meal planner in seidebar

import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useMealPlan } from '../../context/mealPlanContext'
import MealPlanListDetails from './MealPlanListDetails' // 2 steps to detail view

export default function MealPlanList() {
  const { user } = useContext(AuthContext)
  const {
    allPlans,
    fetchAllPlans,
    setActiveById,
    deleteMealPlan,
    loading,
    error,
    activePlan,
  } = useMealPlan()

  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Only fetch plans if user is logged in
    if (user) {
      fetchAllPlans()
    }
  }, [user])

  const handleView = async (planId) => {
    await setActiveById(planId)
    setShowDetails(true)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  if (!allPlans.length) {
    return <p className="italic text-gray-500">No meal plans found.</p>
  }

  // DETAILS VIEW
  if (showDetails && activePlan) {
    return <MealPlanListDetails onBack={() => setShowDetails(false)} />
  }

  const handleDelete = async (planId) => {
    const confirmed = window.confirm(
      'Do you really want to delete this meal plan? This action cannot be undone.',
    )

    if (!confirmed) return

    await deleteMealPlan(planId)
  }

  // LIST VIEW (default)
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Meal Plans</h2>

      {allPlans.length === 0 && (
        <p className="text-gray-500">No meal plans created yet.</p>
      )}

      {allPlans.map((plan) => (
        <div
          key={plan._id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-extrabold">{plan.planName}</h3>
            <h3 className="font-medium capitalize">{plan.dietType}</h3>
            <p className="text-sm text-gray-500">
              {plan.duration} days • {plan.mealsPerDay} meals/day
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleView(plan._id)}
              className="text-blue-600 hover:underline"
            >
              View
            </button>

            <button
              onClick={() => handleDelete(plan._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
