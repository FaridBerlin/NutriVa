import { Schema, model, Types } from 'mongoose'

const dailyTrackerSchema = new Schema({
  date: { type: Date, required: true },
  dayNumber: { type: Number, required: true },
  meals: [
    {
      mealId: String,
      name: String,
      category: String,
      isEaten: { type: Boolean, default: false },
      eatenAt: Date,
      nutrition: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
      },
    },
  ],
  consumed: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
  },
  target: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  mealsCompleted: { type: Number, default: 0 },
  totalMeals: Number,
  completionPercentage: { type: Number, default: 0 },
})

const dietTrackerSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    aiMealPlanId: { type: Types.ObjectId, ref: 'AiMealPlan', required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
    },
    startDate: { type: Date, required: true, default: Date.now },
    currentDay: { type: Number, default: 1 },
    totalDays: { type: Number, required: true },
    overallCompletionPercentage: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastTrackedDate: Date,
    adherenceScore: { type: Number, default: 0, min: 0, max: 100 },
    dailyTrackers: [dailyTrackerSchema],
  },
  { timestamps: true },
)

// Index for faster queries
dietTrackerSchema.index({ userId: 1, status: 1 })
dietTrackerSchema.index({ userId: 1, aiMealPlanId: 1 })

// Method to calculate adherence score based on completion percentage
dietTrackerSchema.methods.calculateAdherenceScore = function () {
  if (this.dailyTrackers.length === 0) return 0

  const totalCompletion = this.dailyTrackers.reduce(
    (sum, day) => sum + day.completionPercentage,
    0,
  )
  return Math.round(totalCompletion / this.dailyTrackers.length)
}

// Method to update streak
dietTrackerSchema.methods.updateStreak = function () {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (!this.lastTrackedDate) {
    this.streak = 1
    this.longestStreak = 1
    this.lastTrackedDate = today
    return
  }

  const lastDate = new Date(this.lastTrackedDate)
  lastDate.setHours(0, 0, 0, 0)

  const diffTime = today - lastDate
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  if (diffDays === 1) {
    this.streak += 1
    this.longestStreak = Math.max(this.streak, this.longestStreak)
  } else if (diffDays > 1) {
    this.streak = 1
  }

  this.lastTrackedDate = today
}

export default model('DietTracker', dietTrackerSchema)
