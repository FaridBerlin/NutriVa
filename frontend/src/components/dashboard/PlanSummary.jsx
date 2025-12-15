import { Dumbbell, Utensils } from 'lucide-react'

export default function PlanSummary() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Custom Section (You can edit this!)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example Card 1 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Dumbbell className="text-blue-600" size={28} />
            <h3 className="text-xl font-semibold text-blue-900">
              You can write anything here
            </h3>
          </div>
          <p className="text-blue-700 text-lg">
            This section is fully customizable. Add your own content, notes, or
            widgets.
          </p>
        </div>

        {/* Example Card 2 */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Utensils className="text-green-600" size={28} />
            <h3 className="text-xl font-semibold text-green-900">
              Another Card
            </h3>
          </div>
          <p className="text-green-700 text-lg">
            You can change the title, icons, and text as you wish.
          </p>
        </div>
      </div>
    </div>
  )
}
