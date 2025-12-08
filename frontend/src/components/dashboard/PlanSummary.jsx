import { Dumbbell, Utensils } from 'lucide-react';

export default function PlanSummary({ plan }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">Your Plan Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Fitness Goal */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Dumbbell className="text-blue-600" size={28} />
            <h3 className="text-xl font-semibold text-blue-900">Fitness Goal</h3>
          </div>
          <p className="text-blue-700 text-lg">
            {plan?.fitnessGoal || 'Weight loss program for 30 days'}
          </p>
        </div>

        {/* Diet Plan */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Utensils className="text-green-600" size={28} />
            <h3 className="text-xl font-semibold text-green-900">Diet Plan</h3>
          </div>
          <p className="text-green-700 text-lg">
            {plan?.dietPlan || 'Balanced diet with 3 meals per day'}
          </p>
        </div>
      </div>
    </div>
  );
}