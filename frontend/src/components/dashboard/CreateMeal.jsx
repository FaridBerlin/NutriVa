import { Save } from 'lucide-react' // Importing Save icon from lucide-react
export default function CreateMeal({ onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    if (onSave) {
      const formData = new FormData(e.target)
      const meal = {
        name: formData.get('name'),
        type: formData.get('type'),
        servingSize: formData.get('servingSize'),
        calories: formData.get('calories'),
        protein: formData.get('protein'),
        carbs: formData.get('carbs'),
        ingredients: formData.get('ingredients'),
        instructions: formData.get('instructions'),
      }
      onSave(meal)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">Create New Meal</h2>
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meal Name */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">
                Meal Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Grilled Chicken Salad"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Meal Type & Serving Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Meal Type
                </label>
                <select
                  name="type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Serving Size
                </label>
                <input
                  type="number"
                  name="servingSize"
                  placeholder="1"
                  min="1"
                  defaultValue="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  placeholder="450"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Protein (g)
                </label>
                <input
                  type="number"
                  name="protein"
                  placeholder="35"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  name="carbs"
                  placeholder="40"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                rows="4"
                placeholder="List your ingredients..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">
                Instructions
              </label>
              <textarea
                name="instructions"
                rows="6"
                placeholder="How to prepare this meal..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Meal
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
