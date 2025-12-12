import api from '../services/api'

// create meal plan
const generateMealPlan = async (planData) => {
  const response = await api.post('/meal-plans', planData)
  return response.data
}

// get all meal plans
const getAllMealPlans = async () => {
  const response = await api.get('/meal-plans')
  return response.data
}

// get specific meal plan by ID
const getMealPlanById = async (id) => {
  const response = await api.get(`/meal-plans/${id}`)
  return response.data
}

const getLatestMealPlan = async () => {
  const response = await api.get('/meal-plans/latest')
  return response.data
}

// get specific day from meal plan
const getMealPlanDay = async (id, dayNumber) => {
  const response = await api.get(`/meal-plans/${id}/day/${dayNumber}`)
  return response.data
}

// delete meal plan
const deleteMealPlan = async (id) => {
  const response = await api.delete(`/meal-plans/${id}`)
  return response.data
}

export default {
  generateMealPlan,
  getAllMealPlans,
  getMealPlanById,
  getLatestMealPlan,
  getMealPlanDay,
  deleteMealPlan,
}
