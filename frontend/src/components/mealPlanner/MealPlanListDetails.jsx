import { useMealPlan } from '../../context/mealPlanContext'

export default function MealPlanListDetails({ onBack }) {
  const { activePlan } = useMealPlan()

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to plans
      </button>

      <h2 className="text-2xl font-bold">{activePlan.name}</h2>

      {activePlan.days.map((day, index) => (
        <div key={index} className="border rounded p-4">
          <h3 className="font-semibold mb-2">Day {index + 1}</h3>

          {day.meals.map((meal, i) => (
            <p key={i} className="text-sm">
              • {meal.name}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
