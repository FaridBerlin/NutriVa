import api from '../services/api'
import type {
  AllTrackersResponse,
  DailyTracker,
  DietTracker,
  MarkMealResponse,
} from '../types'

const dietTrackerApi = {
  // Create a new diet tracker for an AI meal plan
  createTracker: async (aiMealPlanId: string): Promise<DietTracker> => {
    const response = await api.post<DietTracker>(
      `/diet-trackers/${aiMealPlanId}`,
    )
    return response.data
  },

  // Get active tracker
  getActiveTracker: async (): Promise<DietTracker> => {
    const response = await api.get<DietTracker>('/diet-trackers/active')
    return response.data
  },

  // Get all trackers (paginated)
  getAllTrackers: async (): Promise<AllTrackersResponse> => {
    const response = await api.get<AllTrackersResponse>('/diet-trackers')
    return response.data
  },

  // Get specific day from tracker
  getTrackerDay: async (dayNumber: number): Promise<DailyTracker> => {
    const response = await api.get<DailyTracker>(
      `/diet-trackers/day/${dayNumber}`,
    )
    return response.data
  },

  // Mark meal as eaten
  markMealAsEaten: async (
    dayNumber: number,
    mealId: string,
  ): Promise<MarkMealResponse> => {
    const response = await api.post<MarkMealResponse>(
      `/diet-trackers/day/${dayNumber}/meals/${mealId}/eat`,
    )
    return response.data
  },

  // Undo meal (mark as not eaten)
  undoMeal: async (
    dayNumber: number,
    mealId: string,
  ): Promise<MarkMealResponse> => {
    const response = await api.post<MarkMealResponse>(
      `/diet-trackers/day/${dayNumber}/meals/${mealId}/undo`,
    )
    return response.data
  },
}

export default dietTrackerApi
