import api from '../services/api'
import type {
  DayPlan,
  GenerateMealPlanResponse,
  MealPlanDayResponse,
  MealPlanRequest,
  MealPlanResponse,
  MealPlansResponse,
} from '../types'

// create AI meal plan
const generateMealPlan = async (
  planData: MealPlanRequest,
): Promise<GenerateMealPlanResponse> => {
  const response = await api.post<GenerateMealPlanResponse>(
    '/ai-meal-plans',
    planData,
  )
  return response.data
}

// get all AI meal plans
const getAllMealPlans = async (): Promise<MealPlansResponse> => {
  const response = await api.get<MealPlansResponse>('/ai-meal-plans')
  return response.data
}

// get specific AI meal plan by ID
const getMealPlanById = async (id: string): Promise<MealPlanResponse> => {
  const response = await api.get<MealPlanResponse>(`/ai-meal-plans/${id}`)
  return response.data
}

// get latest AI meal plan
const getLatestMealPlan = async (): Promise<MealPlanResponse> => {
  const response = await api.get<MealPlanResponse>('/ai-meal-plans/latest')
  return response.data
}

// get specific day from AI meal plan
const getMealPlanDay = async (
  id: string,
  dayNumber: number,
): Promise<MealPlanDayResponse> => {
  const response = await api.get<MealPlanDayResponse>(
    `/ai-meal-plans/${id}/day/${dayNumber}`,
  )
  return response.data
}

// get specific day from latest AI meal plan (for diet planner)
const getDayFromLatestPlan = async (dayNumber: number): Promise<DayPlan> => {
  const response = await api.get<DayPlan>(`/ai-meal-plans/days/${dayNumber}`)
  return response.data
}

// delete AI meal plan
const deleteMealPlan = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/ai-meal-plans/${id}`,
  )
  return response.data
}

export default {
  generateMealPlan,
  getAllMealPlans,
  getMealPlanById,
  getLatestMealPlan,
  getMealPlanDay,
  getDayFromLatestPlan,
  deleteMealPlan,
}
