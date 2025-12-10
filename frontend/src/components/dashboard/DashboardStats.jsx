//info from ProfileContext

import { Flame, Weight, Target, TrendingUp } from 'lucide-react'

export default function DashboardStats({ stats }) {
  const cards = [
    {
      icon: Flame,
      value: stats?.dailyCalories || 2000,
      label: 'Daily Calories',
      color: 'orange',
    },
    {
      icon: Weight,
      value: stats?.weight || 68,
      label: 'Weight (kg)',
      color: 'blue',
    },
    {
      icon: Target,
      value: stats?.bmi || 24.5,
      label: 'BMI',
      color: 'green',
    },
    {
      icon: TrendingUp,
      value: stats?.daysLeft || 30,
      label: 'Days Left',
      color: 'green',
    },
  ]

  const colorClasses = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-primary',
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={colorClasses[card.color]} size={28} />
                <span className="text-3xl font-bold text-textDark">
                  {card.value}
                </span>
              </div>
              <h3 className="text-sm text-textLight">{card.label}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
