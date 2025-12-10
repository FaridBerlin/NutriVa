// test

import { useState } from 'react'
import MealCard from './MealCard'

export default function MealPlanDisplay({ plan }) {
  const [currentDay, setCurrentDay] = useState(1)
  if (!plan || !plan.days)
    return (
      <div className="p-8 text-center text-textLight">
        No meal plan to display
      </div>
    )

  const dayData = plan.days[currentDay - 1]
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-textDark">{plan.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDay((d) => Math.max(1, d - 1))}
            disabled={currentDay === 1}
            className="px-3 py-1 rounded bg-gray-100 text-textDark disabled:opacity-50"
          >
            Previous Day
          </button>
          <span className="px-3 py-1 rounded bg-primary text-white">
            Day {currentDay} of {plan.days.length}
          </span>
          <button
            onClick={() =>
              setCurrentDay((d) => Math.min(plan.days.length, d + 1))
            }
            disabled={currentDay === plan.days.length}
            className="px-3 py-1 rounded bg-gray-100 text-textDark disabled:opacity-50"
          >
            Next Day
          </button>
        </div>
      </div>
      <div className="mb-4 text-textLight">
        Created: {new Date(plan.createdAt).toLocaleDateString()}
      </div>
      <div>
        {dayData.meals && dayData.meals.length > 0 ? (
          dayData.meals.map((meal, idx) => <MealCard key={idx} meal={meal} />)
        ) : (
          <div className="p-6 text-center text-textLight">
            No meals for this day
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-textLight">
        Total Calories: {dayData.totals?.calories || 0} • Protein:{' '}
        {dayData.totals?.protein || 0}g • Carbs: {dayData.totals?.carbs || 0}g •
        Fat: {dayData.totals?.fat || 0}g
      </div>
    </div>
  )
}
