import api from '../services/api'

// create AI meal plan
const generateMealPlan = async (planData) => {
  const response = await api.post('/ai-meal-plans', planData)
  return response.data
}

// get all AI meal plans
const getAllMealPlans = async () => {
  const response = await api.get('/ai-meal-plans')
  return response.data
}

// get specific AI meal plan by ID
const getMealPlanById = async (id) => {
  const response = await api.get(`/ai-meal-plans/${id}`)
  return response.data
}

// get latest AI meal plan
const getLatestMealPlan = async () => {
  const response = await api.get('/ai-meal-plans/latest')
  return response.data
}

// get specific day from AI meal plan
const getMealPlanDay = async (id, dayNumber) => {
  const response = await api.get(`/ai-meal-plans/${id}/day/${dayNumber}`)
  return response.data
}

// get specific day from latest AI meal plan (for diet planner)
const getDayFromLatestPlan = async (dayNumber) => {
  const response = await api.get(`/ai-meal-plans/days/${dayNumber}`)
  return response.data
}

// delete AI meal plan
const deleteMealPlan = async (id) => {
  const response = await api.delete(`/ai-meal-plans/${id}`)
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
