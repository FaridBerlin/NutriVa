import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DietPlannerForm from '../components/AiDietPlannerForm'
import { Calendar, Utensils, Plus, Loader2 } from 'lucide-react'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const DietPlannerPage = () => {
  const [dietPlan, setDietPlan] = useState(null)
  const [selectedDay, setSelectedDay] = useState(1)
  const [dayData, setDayData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestPlan()
  }, [])

  useEffect(() => {
    if (dietPlan) {
      fetchDayData(selectedDay)
    }
  }, [dietPlan, selectedDay])

  const fetchLatestPlan = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/meal-plans/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data?.mealPlan) {
        setDietPlan(response.data.mealPlan)
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error('Error fetching plan:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchDayData = async (dayNumber) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${API_BASE_URL}/meal-plans/days/${dayNumber}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setDayData(response.data)
    } catch (err) {
      console.error('Error fetching day data:', err)
    }
  }

  const handlePlanGenerated = (newPlan) => {
    setDietPlan(newPlan)
    setSelectedDay(1)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-teal-600" />
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Your Meal Plan
            </h1>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
          </div>
          <DietPlannerForm
            onPlanGenerated={handlePlanGenerated}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </div>
    )
  }

  if (!dietPlan) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-12">
            <Utensils className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Meal Plan Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first personalized meal plan to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Meal Plan
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {dietPlan.planName}
            </h1>
            <p className="text-gray-600">
              {dietPlan.planDuration} days • {dietPlan.dailyCalories} cal/day
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Plan
          </button>
        </div>

        {/* Day Selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Calendar className="w-5 h-5 text-teal-600 flex-shrink-0" />
            {Array.from({ length: dietPlan.planDuration }, (_, i) => i + 1).map(
              (day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
                    selectedDay === day
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Day {day}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Meals */}
        {dayData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dayData.day.meals.map((meal, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold text-teal-600 uppercase">
                      {meal.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                      {meal.dishName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">
                      {meal.nutrition?.calories || 0}
                    </div>
                    <div className="text-xs text-gray-500">calories</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{meal.description}</p>

                {meal.nutrition && (
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700">
                        {meal.nutrition.protein}g
                      </div>
                      <div className="text-xs text-gray-500">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700">
                        {meal.nutrition.carbs}g
                      </div>
                      <div className="text-xs text-gray-500">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700">
                        {meal.nutrition.fat}g
                      </div>
                      <div className="text-xs text-gray-500">Fat</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DietPlannerPage
