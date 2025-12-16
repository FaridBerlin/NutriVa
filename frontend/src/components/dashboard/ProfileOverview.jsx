import { User, Activity, Utensils, Target } from 'lucide-react'

export default function ProfileOverview({ profile }) {
  const cards = [
    {
      title: 'Body Metrics',
      icon: Activity,
      color: 'green',
      data: [
        {
          label: 'Height',
          value: profile?.height ? `${profile.height} cm` : 'Not set',
        },
        {
          label: 'Weight',
          value: profile?.weight ? `${profile.weight} kg` : 'Not set',
        },
        {
          label: 'BMI',
          value: profile?.bmi ? profile.bmi.toFixed(1) : 'Not set',
        },
        { label: 'Category', value: profile?.bmiCategory || 'Not set' },
      ],
    },
    {
      title: 'Diet Preferences',
      icon: Utensils,
      color: 'orange',
      data: [
        {
          label: 'Goal',
          value: profile?.dietaryGoal?.replace('_', ' ') || 'Not set',
        },
        { label: 'Meals/Day', value: profile?.mealsPerDay || 'Not set' },
        {
          label: 'Duration',
          value: profile?.planDuration
            ? `${profile.planDuration} days`
            : 'Not set',
        },
        { label: 'Type', value: profile?.dietType || 'None' },
      ],
    },
    {
      title: 'Fitness Goals',
      icon: Target,
      color: 'purple',
      data: [
        { label: 'Goal', value: profile?.fitnessGoal || 'Weight loss' },
        {
          label: 'Calories',
          value: profile?.dailyCalories
            ? `${profile.dailyCalories} kcal`
            : 'Not set',
        },
        { label: 'Target BMI', value: profile?.targetBMI || '22.5' },
        {
          label: 'Target Weight',
          value: profile?.targetWeight
            ? `${profile.targetWeight} kg`
            : 'Not set',
        },
      ],
    },
  ]

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-500' },
    green: { bg: 'bg-green-50', text: 'text-green-500' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-500' },
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Profile Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          const colors = colorClasses[card.color]

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${colors.bg} p-3 rounded-lg`}>
                  <Icon className={colors.text} size={20} />
                </div>
                <h3 className="font-semibold text-textDark">{card.title}</h3>
              </div>

              <div className="space-y-2">
                {card.data.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-textLight">{item.label}:</span>
                    <span className="font-medium text-textDark">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
