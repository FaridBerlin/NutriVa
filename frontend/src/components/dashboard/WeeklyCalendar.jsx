import { useMemo } from 'react'

// Add prop for daily meals
export default function WeeklyCalendar({ dailyMeals = [] }) {
  const weekDays = useMemo(() => {
    const days = []
    const today = new Date()
    const currentDay = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1))

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        isToday: date.toDateString() === today.toDateString(),
        meals: dailyMeals[i] || [], // Link daily meals
      })
    }
    return days
  }, [dailyMeals])

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">Weekly Calendar</h2>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-6 rounded-xl transition-all cursor-pointer ${
                day.isToday
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-sm font-medium mb-2">{day.day}</span>
              <span className="text-3xl font-bold">{day.date}</span>
              <span className="text-xs mt-2">{day.month}</span>
              {/* Placeholder for displaying daily meals */}
              {day.meals.length > 0 ? (
                <div className="mt-3 w-full">
                  <span className="block text-xs font-semibold mb-1">
                    Meals:
                  </span>
                  <ul className="text-xs space-y-1">
                    {day.meals.map((meal, idx) => (
                      <li key={idx} className="truncate">
                        {meal.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <span className="mt-3 text-xs text-gray-400">No meals</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
