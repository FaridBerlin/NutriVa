import { Schema, model } from "mongoose";

const mealPlanSchema = new Schema({


}, { timestamps: true });

export default model('MealPlan', mealPlanSchema);