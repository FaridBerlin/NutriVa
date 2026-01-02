import api from '../services/api'

const dietTrackerApi = {
  // Create a new diet tracker for an AI meal plan
  createTracker: async (aiMealPlanId) => {
    const response = await api.post(`/diet-trackers/${aiMealPlanId}`)
    return response.data
  },

  // Get active tracker
  getActiveTracker: async () => {
    const response = await api.get('/diet-trackers/active')
    return response.data
  },

  // Get all trackers
  getAllTrackers: async () => {
    const response = await api.get('/diet-trackers')
    return response.data
  },

  // Get specific day from tracker
  getTrackerDay: async (dayNumber) => {
    const response = await api.get(`/diet-trackers/day/${dayNumber}`)
    return response.data
  },

  // Mark meal as eaten
  markMealAsEaten: async (dayNumber, mealId) => {
    const response = await api.post(
      `/diet-trackers/day/${dayNumber}/meals/${mealId}/eat`,
    )
    return response.data
  },

  // Undo meal (mark as not eaten)
  undoMeal: async (dayNumber, mealId) => {
    const response = await api.post(
      `/diet-trackers/day/${dayNumber}/meals/${mealId}/undo`,
    )
    return response.data
  },
}

export default dietTrackerApi
