import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts'

export default function BMIGoals({ bmi, bmiCategory, goals }) {
  const progressData = [
    {
      name: 'Calories',
      current: goals?.caloriesCurrent || 1450,
      target: goals?.caloriesTarget || 2000,
      unit: 'kcal',
      fill: '#8b5cf6', // purple
    },
    {
      name: 'Protein',
      current: goals?.proteinCurrent || 85,
      target: goals?.proteinTarget || 150,
      unit: 'g',
      fill: '#83D385', // green (primary)
    },
    {
      name: 'Carbs',
      current: goals?.carbsCurrent || 180,
      target: goals?.carbsTarget || 250,
      unit: 'g',
      fill: '#3b82f6', // blue
    },
    {
      name: 'Fats',
      current: goals?.fatsCurrent || 45,
      target: goals?.fatsTarget || 65,
      unit: 'g',
      fill: '#f97316', // orange
    },
  ]

  // Prepare data for RadialBarChart
  const radialData = progressData.map((item) => ({
    name: item.name,
    value: Math.min((item.current / item.target) * 100, 100),
    fill: item.fill,
    current: item.current,
    target: item.target,
    unit: item.unit,
  }))

  // Macros distribution for Pie Chart
  const macrosData = [
    { name: 'Protein', value: goals?.proteinCurrent || 85, fill: '#83D385' },
    { name: 'Carbs', value: goals?.carbsCurrent || 180, fill: '#3b82f6' },
    { name: 'Fats', value: goals?.fatsCurrent || 45, fill: '#f97316' },
  ]

  const getBMIColor = (bmi) => {
    if (!bmi) return '#83D385'
    if (bmi < 18.5) return '#3b82f6'
    if (bmi < 25) return '#83D385'
    if (bmi < 30) return '#f97316'
    return '#ef4444'
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        BMI & Goals Progress
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BMI Analysis with Gauge */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-center mb-4">
            BMI Analysis
          </h3>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { value: bmi || 24.5, fill: getBMIColor(bmi) },
                      { value: 40 - (bmi || 24.5), fill: '#e5e7eb' },
                    ]}
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-4xl font-bold"
                  style={{ color: getBMIColor(bmi) }}
                >
                  {bmi?.toFixed(1) || '24.5'}
                </span>
                <span className="text-sm text-textLight">BMI</span>
              </div>
            </div>
            <p
              className="text-lg font-semibold mt-2"
              style={{ color: getBMIColor(bmi) }}
            >
              {bmiCategory || 'Healthy'}
            </p>
            <p className="text-sm text-textLight">Healthy Range: 18.5 - 24.9</p>
          </div>
        </div>

        {/* Macros Distribution Pie */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-center mb-4">
            Macros Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={macrosData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {macrosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {macrosData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-textLight">
                  {item.name}: {item.value}g
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Progress - Radial Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Daily Goals Progress
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={20}
            data={radialData}
            startAngle={180}
            endAngle={-180}
          >
            <RadialBar background dataKey="value" cornerRadius={10} />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              formatter={(value, entry) => {
                const item = radialData.find((d) => d.name === value)
                return `${value}: ${item?.current}/${item?.target} ${item?.unit}`
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
