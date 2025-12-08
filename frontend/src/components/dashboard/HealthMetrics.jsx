export default function HealthMetrics({ metrics }) {
  const bodyComposition = [
    { label: 'BMI (kg/m²)', value: metrics?.bmi?.toFixed(1) || 'N/A', highlight: true },
    { label: 'Body Fat %', value: metrics?.bodyFat || '20-25%' },
    { label: 'BMR', value: metrics?.bmr ? `${Math.round(metrics.bmr)} kcal/day` : 'N/A' },
    { label: 'TDEE', value: metrics?.tdee ? `${Math.round(metrics.tdee)} kcal` : 'N/A' }
  ];

  const nutritionPlan = [
    { label: 'Daily Target', value: metrics?.dailyCalories ? `${Math.round(metrics.dailyCalories)} kcal` : 'N/A', highlight: true },
    { label: 'Macros Split', value: '30% / 26% / 24%' },
    { label: 'Protein', value: metrics?.protein ? `${Math.round(metrics.protein)}g` : 'N/A' },
    { label: 'Fats', value: metrics?.fats ? `${Math.round(metrics.fats)}g` : 'N/A' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">Detailed Health Metrics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Body Composition */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-textDark">Body Composition</h3>
          <div className="space-y-3">
            {bodyComposition.map((item, index) => (
              <div 
                key={index}
                className={`flex justify-between py-2 ${
                  index < bodyComposition.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-textLight">{item.label}</span>
                <span className={`font-${item.highlight ? 'semibold text-primary text-xl' : 'medium text-textDark'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Plan */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-textDark">Nutrition Plan</h3>
          <div className="space-y-3">
            {nutritionPlan.map((item, index) => (
              <div 
                key={index}
                className={`flex justify-between py-2 ${
                  index < nutritionPlan.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-textLight">{item.label}</span>
                <span className={`font-${item.highlight ? 'semibold text-primary text-xl' : 'medium text-textDark'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}