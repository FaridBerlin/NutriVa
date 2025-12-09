import { Utensils, Flame, Dumbbell, Wheat, Droplet } from "lucide-react";

export default function MealCard({ meal }) {
  if (!meal) return null;
  const { name, description, nutrition, ingredients, category, dietType, cuisine } = meal;

  return (
    <div className="bg-gray-700 rounded-xl border border-gray-500 shadow-sm p-4 mb-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Utensils className="w-6 h-6 text-primary" />
        <h3 className="font-bold text-lg text-white">{name}</h3>
        <span className="ml-auto px-2 py-1 rounded bg-gray-700 text-xs text-gray-300 capitalize">{category}</span>
      </div>
      <div className="text-sm text-gray-300 mb-2">{description}</div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div className="text-center">
          <Flame className="w-5 h-5 mx-auto text-red-400" />
          <div className="font-bold text-white">{nutrition?.calories || 0}</div>
          <div className="text-xs text-gray-400">kcal</div>
        </div>
        <div className="text-center">
          <Dumbbell className="w-5 h-5 mx-auto text-blue-400" />
          <div className="font-bold text-white">{nutrition?.protein || 0}g</div>
          <div className="text-xs text-gray-400">protein</div>
        </div>
        <div className="text-center">
          <Wheat className="w-5 h-5 mx-auto text-amber-400" />
          <div className="font-bold text-white">{nutrition?.carbs || 0}g</div>
          <div className="text-xs text-gray-400">carbs</div>
        </div>
        <div className="text-center">
          <Droplet className="w-5 h-5 mx-auto text-purple-400" />
          <div className="font-bold text-white">{nutrition?.fat || 0}g</div>
          <div className="text-xs text-gray-400">fat</div>
        </div>
      </div>
      {ingredients && ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {ingredients.map((ing, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-200">
              {ing}
            </span>
          ))}
        </div>
      )}
      <div className="mt-2 text-xs text-gray-400 text-center">
        <span className="capitalize">{dietType}</span> • <span className="capitalize">{cuisine}</span>
      </div>
    </div>
  );
}
