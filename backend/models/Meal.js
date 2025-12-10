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
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    protein: { type: Number, required: true, min: 0 },
    carbs: { type: Number, required: true, min: 0 },
    fats: { type: Number, required: true, min: 0 },

    serving_size: { type: String, required: true },
    category: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    type: {
      type: String,
      enum: [
        'balanced',
        'high-protein',
        'low-carb',
        'keto',
        'vegan',
        'veg',
        'gluten-free',
      ],
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
<<<<<<< HEAD
  ingredients: [String],
  calories: 
  { 
    type: Number, 
    required: true, 
    min: 0 
},
  protein: 
  { type: Number, 
    required: true, 
    min: 0 
},
  carbs: 
  { type: Number, 
    required: true, 
    min: 0 
},
  fats: 
  { type: Number, 
    required: true, 
    min: 0 
},

  serving_size: 
  { type: String, 
    required: true 
},
category: 
{ type: String, 
  enum: ["breakfast", "lunch", "dinner", "snack"] 
},
type: 
{
    type: String,
    enum: ["balanced", "high-protein", "low-carb", "keto", "vegan", "veg", "gluten-free"]
},  
// Add the image field
image: String,

favorites: 
[
  { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  }
],

createdBy: 
{ 
  type: Schema.Types.ObjectId, 
  ref: "User"
},

}, { timestamps: true });
=======
  { timestamps: true },
)
>>>>>>> dev

mealSchema.statics.findByCategory = function (category) {
  return this.find({ category })
}

mealSchema.statics.findByType = function (type) {
  return this.find({ type })
}

export default model('Meal', mealSchema)
