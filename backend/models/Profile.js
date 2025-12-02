import { Schema, model } from "mongoose";

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
      enum: ["male", "female"],
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
      enum: ["sedentary", "light", "moderate", "active", "veryActive"],
      required: true,
    },
    dietaryGoal: {
      type: String,
      enum: ["maintain", "weightLoss", "weightGain"],
      required: true,
    },


}, { timestamps: true });

export default model('Profile', profileSchema);