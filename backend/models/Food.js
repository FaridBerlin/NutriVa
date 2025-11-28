import { Schema, model } from "mongoose";

const foodSchema = new Schema({

}, { timestamps: true });

export default model('Food', foodSchema);