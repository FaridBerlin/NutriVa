import { Schema, model, Types } from 'mongoose'

const mealSchema = new Schema({
  type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cookingMethod: String,
  keyIngredients: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  eaten: {
    type: Boolean,
    default: false,
  },
  // Legacy fields for backward compatibility
  mealId: String,
  name: String,
  category: String,
  ingredients: [String],
  image: String,
})

const dayPlanSchema = new Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  meals: [mealSchema],
  totalNutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
})

const mealPlanSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    mealPerDay: {
      type: Number,
      required: true,
      min: 2,
      max: 6,
    },
    // User profile data at time of plan creation
    age: Number,
    weight: Number,
    height: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    activityLevel: {
      type: String,
      enum: [
        'sedentary',
        'light',
        'lightly-active',
        'moderate',
        'moderately-active',
        'active',
        'very-active',
        'very_active',
        'extra-active',
      ],
    },
    goal: {
      type: String,
      enum: [
        'lose_weight',
        'weight-loss',
        'maintain_weight',
        'maintenance',
        'gain_weight',
        'weight-gain',
        'build_muscle',
      ],
    },
    planDuration: {
      type: Number,
      required: true,
      min: 3,
      max: 30,
    },
    foodType: {
      type: String,
      enum: ['veg', 'nonveg', 'vegan', 'both'],
      required: true,
    },
    // NEW: Allergens and dietary restrictions
    allergens: {
      type: [String],
      default: [],
      enum: ['dairy', 'gluten', 'nuts', 'none', ''],
    },
    restrictionsAndAllergies: {
      type: String,
      default: '',
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    dailyMacros: {
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    days: [dayPlanSchema],
    // Quick generate option
    useTemplates: {
      type: Boolean,
      default: false,
    },
    // Legacy fields for backward compatibility
    duration: Number,
    mealsPerDay: Number,
    dietType: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default model('AiMealPlan', mealPlanSchema)
