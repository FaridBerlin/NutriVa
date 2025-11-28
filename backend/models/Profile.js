import { Schema, model } from "mongoose";

const profileSchema = new Schema({

}, { timestamps: true });

export default model('Profile', profileSchema);