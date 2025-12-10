<<<<<<< HEAD
import { useState } from "react";
import { Save } from "lucide-react";

const CATEGORY_OPTIONS = ["breakfast", "lunch", "dinner", "snack"];
const TYPE_OPTIONS = ["balanced", "high-protein", "low-carb", "keto", "vegan", "veg", "gluten-free"];

=======
import { Save } from 'lucide-react' // Importing Save icon from lucide-react
>>>>>>> dev
export default function CreateMeal({ onSave, onCancel }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
<<<<<<< HEAD
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const meal = {
      name: formData.get("name"),
      description: formData.get("description"),
      ingredients: formData.get("ingredients")?.split(",").map((i) => i.trim()),
      calories: Number(formData.get("calories")),
      protein: Number(formData.get("protein")),
      carbs: Number(formData.get("carbs")),
      fats: Number(formData.get("fats")),
      serving_size: formData.get("serving_size"),
      category: formData.get("category"),
      type: formData.get("type"),
      image: formData.get("image"), // optional 
    };
    // Check required fields
    if (!meal.name || !meal.description || !meal.calories || !meal.protein || !meal.carbs || !meal.fats || !meal.serving_size || !meal.category || !meal.type) {
      setError("Please fill in all required fields.");
      return;
    }
    if (onSave) onSave(meal);
  };
=======
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
>>>>>>> dev

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">Create New Meal</h2>
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meal Name */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">Meal Name *</label>
              <input type="text" name="name" placeholder="e.g., Grilled Chicken Salad" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">Description *</label>
              <textarea name="description" rows="2" placeholder="Short description of the meal..." className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
            </div>
            {/* Category & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">Category *</label>
                <select name="category" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">Type *</label>
                <select name="type" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
                  <option value="">Select type</option>
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Serving Size */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">Serving Size *</label>
              <input type="text" name="serving_size" placeholder="e.g., 1 bowl, 2 pieces" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
            </div>
            {/* Nutrition Info */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">Calories *</label>
                <input type="number" name="calories" placeholder="450" min="0" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">Protein (g) *</label>
                <input type="number" name="protein" placeholder="35" min="0" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">Carbs (g) *</label>
                <input type="number" name="carbs" placeholder="40" min="0" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">Fats (g) *</label>
                <input type="number" name="fats" placeholder="10" min="0" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
            </div>
            {/* Ingredients */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">Ingredients (comma separated)</label>
              <textarea name="ingredients" rows="3" placeholder="e.g., chicken, lettuce, tomato, olive oil" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>
            {/* Image URL  */}
            <div>
              <label className="block text-sm font-semibold text-textDark mb-2">Image URL (optional)</label>
              <input type="text" name="image" placeholder="https://..." className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {/* Buttons */}
            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryDark transition-all flex items-center justify-center gap-2">
                <Save size={20} />
                Save Meal
              </button>
              <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
