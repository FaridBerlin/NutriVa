import React, { useState } from "react";

const DIET_TYPES = ["veg", "non-veg", "vegan", "eggetarian"];
const ALLERGENS = ["dairy", "gluten", "nuts", "soy", "eggs", "shellfish"];
const CUISINES = ["indian", "chinese", "italian", "mexican", "american", "mediterranean"];

export default function MealPlanner() {
  const [form, setForm] = useState({
    planName: "",
    duration: 7,
    mealsPerDay: 3,
    dietType: "veg",
    cuisine: [],
    allergens: [],
    preferences: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && ALLERGENS.includes(name)) {
      setForm((prev) => ({
        ...prev,
        allergens: checked
          ? [...prev.allergens, name]
          : prev.allergens.filter((a) => a !== name)
      }));
    } else if (type === "checkbox" && CUISINES.includes(name)) {
      setForm((prev) => ({
        ...prev,
        cuisine: checked
          ? [...prev.cuisine, name]
          : prev.cuisine.filter((c) => c !== name)
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.planName) {
      setError("Plan name is required");
      return;
    }
    setLoading(true);
    try {
      // TODO: Replace with real API call
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess("Meal plan generated successfully!");
      setForm({
        planName: "",
        duration: 7,
        mealsPerDay: 3,
        dietType: "veg",
        cuisine: [],
        allergens: [],
        preferences: ""
      });
    } catch (err) {
      setError("Failed to generate meal plan. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-textDark">Create Your Meal Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Plan Name</label>
          <input
            type="text"
            name="planName"
            value={form.planName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Duration (days)</label>
          <input
            type="range"
            name="duration"
            min={1}
            max={30}
            value={form.duration}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-sm mt-1">{form.duration} days</div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Meals Per Day</label>
          <select
            name="mealsPerDay"
            value={form.mealsPerDay}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {[2,3,4,5,6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Diet Type</label>
          <div className="flex gap-4">
            {DIET_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="dietType"
                  value={type}
                  checked={form.dietType === type}
                  onChange={handleChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Cuisine Preferences</label>
          <div className="flex flex-wrap gap-3">
            {CUISINES.map((cuisine) => (
              <label key={cuisine} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={cuisine}
                  checked={form.cuisine.includes(cuisine)}
                  onChange={handleChange}
                />
                {cuisine}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Allergens to Avoid</label>
          <div className="flex flex-wrap gap-3">
            {ALLERGENS.map((allergen) => (
              <label key={allergen} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={allergen}
                  checked={form.allergens.includes(allergen)}
                  onChange={handleChange}
                />
                {allergen}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Food Preferences</label>
          <textarea
            name="preferences"
            value={form.preferences}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
            placeholder="Any special requests, dislikes, etc."
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-primary text-white font-bold mt-2"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </form>
    </div>
  );
}
