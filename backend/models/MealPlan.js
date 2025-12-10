import { Schema, model } from 'mongoose'

const mealPlanSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    duration: {
      type: Number,
      enum: [1, 3, 7, 14, 30],
      default: 3,
    },
    mealsPerDay: { type: Number, enum: ['1', '2', '3', '4'], default: '3' },
    dietType: {
      type: String,
      enum: ['veg', 'non-veg', 'vegan'],
      default: 'non-veg',
    },
    dietaryRestrictions: {
      type: [String],
      enum: ['dairy-free', 'gluten-free', 'nut-free', 'soy-free', 'none'],
      default: ['none'],
    },
    dailyCalories: { type: Number },
    dailyMacros: {
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    days: [
      {
        dayNumber: Number,
        meals: [
          {
            mealId: String,
            name: String,
            category: String,
            nutrition: {
              calories: Number,
              protein: Number,
              carbs: Number,
              fat: Number,
            },
            description: String,
            ingredients: [String],
            image: { type: String },
          },
        ],
        totalNutrition: {
          calories: Number,
          protein: Number,
          carbs: Number,
          fat: Number,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default model('MealPlan', mealPlanSchema)
