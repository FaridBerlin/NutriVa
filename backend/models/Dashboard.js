import { Schema, model } from 'mongoose'

const dashboardSchema = new Schema({}, { timestamps: true })

export default model('Dashboard', dashboardSchema)
