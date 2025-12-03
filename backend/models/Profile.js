import { Schema, model } from "mongoose";
import { calculateBMR, calculateTDEE } from "../utils/nutritionCalculations.js";

const profileSchema = new Schema({


    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    height: { 
      type: Number,
      required: true,
    },
    weight: { 
      type: Number,
      required: true,
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "very", "extreme"],
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "nonveg", "vegan"],
      
    },
    dietaryGoal: {
      type: String,
      enum: ["maintain", "weightLoss", "weightGain"],
      required: true,
    },



}, { timestamps: true });

// Virtual BMR using Harris-Benedict Equation
profileSchema.virtual('bmr').get(function () {
return calculateBMR({
weight: this.weight,
height: this.height,
age: this.age,
gender: this.gender,
});

});



// Method to calculate daily calorie needs
profileSchema.methods.getTDEE = function () {
return calculateTDEE({
bmr: this.bmr,
activityLevel: this.activityLevel,
});
};

profileSchema.methods.getDailyCalories = function () {
  const tdee = this.getTDEE();
  let dailyCalories = tdee;
  
  if (this.dietaryGoal === 'weightLoss') dailyCalories -= 300;
  if (this.dietaryGoal === 'weightGain') dailyCalories += 300;
  
  return Math.round(dailyCalories);
};



// Include virtuals in JSON
profileSchema.set('toJSON', { virtuals: true });
profileSchema.set('toObject', { virtuals: true });

export default model('Profile', profileSchema);