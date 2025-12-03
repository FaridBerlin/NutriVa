import { Schema, model } from "mongoose";

const foodSchema = new Schema({

  name: 
  { 
    type: String, 
    required: true, 
    index: true 
 },
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
  fiber: 
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
    enum: ['fruit', 'vegetable', 'protein', 'grain'], 
    required: true 
}

}, { timestamps: true });

foodSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

export default model('Food', foodSchema);