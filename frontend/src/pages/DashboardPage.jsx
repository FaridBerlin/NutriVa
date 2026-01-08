import { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { useAiMealPlan } from '../context/aiMealPlanContext'
import { useDietTracker } from '../context/DietTrackerContext'
import Sidebar from '../components/Sidebar/Sidebar'
import AiMealPlanList from '../components/mealPlanner/AiMealPlanList'
import AiDietPlannerPage from './AiDietPlannerPage'
import { bmiCategory, bmiPercent } from '../utils/bmiUtils'

import {
  DashboardHeader,
  DashboardStats,
  BMIGoals,
  TodayMeals,
} from '../components/dashboard'

export default function DashboardPage() {
  const { user } = useContext(AuthContext)
  const { profile, nutritionTargets, loading } = useProfile()
  const { activePlan } = useAiMealPlan()
  const { activeTracker } = useDietTracker()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('dashboard')

  // Check if navigated from another page with section state
  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section)
    }
  }, [location.state])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-textLight">Loading...</div>
      </div>
    )
  }

  // Prepare data from contexts
  const statsData = {
    dailyCalories: nutritionTargets?.dailyCalories || 2000,
    weight: profile?.weight || 68,
    bmi: profile?.bmi || 24.5,
    bmiPercent: bmiPercent(profile?.bmi),
    bmiCategory: bmiCategory(profile?.bmi),
    targetWeight: profile?.targetWeight,
    // prefer planDuration from activePlan (header) when available
    planDuration: activePlan?.planDuration || profile?.planDuration || 30,
    // compute daysLeft using activeTracker.currentDay when available so stats match header
    daysLeft:
      activePlan?.planDuration != null && activeTracker?.currentDay != null
        ? Math.max(0, activePlan.planDuration - activeTracker.currentDay)
        : profile?.planDuration || 30,
  }

  const profileData = {
    weight: profile?.weight,
    height: profile?.height,
    bmi: profile?.bmi,
    bmiCategory: bmiCategory(profile?.bmi),
    dietaryGoal: profile?.dietaryGoal,
    mealsPerDay: activePlan?.mealPerDay || 3,
    planDuration: activePlan?.planDuration || 30,
    dietType: profile?.foodType,
    activityLevel: profile?.activityLevel,
    dailyCalories: nutritionTargets?.dailyCalories,
  }

  // Real nutrition goals from nutritionTargets
  // Get current nutrition from today's meal plan (day 1)
  const todayNutrition = activePlan?.days?.[0]?.totalNutrition || {}

  const goalsData = {
    caloriesCurrent: todayNutrition.calories || 0,
    caloriesTarget: nutritionTargets?.dailyCalories,
    proteinCurrent: todayNutrition.protein || 0,
    proteinTarget: nutritionTargets?.macros.protein,
    carbsCurrent: todayNutrition.carbs || 0,
    targetWeight: profile?.targetWeight,
    // prefer plan info coming from activePlan (header) if available
    planDuration: activePlan?.planDuration || profile?.planDuration || 30,
    // compute daysLeft using activeTracker.currentDay when available
    daysLeft:
      activePlan?.planDuration != null && activeTracker?.currentDay != null
        ? Math.max(0, activePlan.planDuration - activeTracker.currentDay)
        : profile?.planDuration || 30,
    fatsTarget: nutritionTargets?.macros.fat,
  }

  const metricsData = {
    bmi: nutritionTargets?.bmi,
    bodyFat: '20-25%',
    bmr: nutritionTargets?.bmr,
    tdee: nutritionTargets?.tdee,
    dailyCalories: nutritionTargets?.dailyCalories,
    protein: nutritionTargets?.macros.protein,
    carbs: nutritionTargets?.macros.carbs,
    fats: nutritionTargets?.macros.fat,
  }

  // Render content based on active section
  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <DashboardHeader userName={user?.name} />

        {/* Content Area: Switch between dashboard and meal planner */}
        <div className="p-8 space-y-8">
          {activeSection === 'ai-diet-planner' ? (
            <AiDietPlannerPage />
          ) : activeSection === 'ai-meal-plans' ? (
            <AiMealPlanList />
          ) : (
            <>
              <DashboardStats stats={statsData} />
              <BMIGoals
                bmi={profile?.bmi}
                goals={goalsData}
                activePlan={activePlan}
              />
              <TodayMeals />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
