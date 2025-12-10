import { Schema, model } from 'mongoose'

const mealSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [String],
    nutrition: {
      calories: { type: Number, required: true, min: 0 },
      protein: { type: Number, required: true, min: 0 },
      carbs: { type: Number, required: true, min: 0 },
      fat: { type: Number, required: true, min: 0 },
    },

    serving_size: { type: String },
    category: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    dietType: {
      type: String,
      enum: ['veg', 'non-veg', 'vegan'],
      default: 'non-veg',
    },
    allergens: {
      type: [String],
      default: [],
    },

    image: String,

    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

mealSchema.statics.findByCategory = function (category) {
  return this.find({ category })
}

mealSchema.statics.findByDietType = function (dietType) {
  return this.find({ dietType })
}

export default model('Meal', mealSchema)
