import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { useAiMealPlan } from '../context/aiMealPlanContext'
import Sidebar, { type SidebarSection } from '../components/Sidebar/Sidebar'
import AiMealPlanList from '../components/mealPlanner/AiMealPlanList'
import AiDietPlannerPage from './AiDietPlannerPage'
import { bmiCategory, bmiPercent } from '../utils/bmiUtils'

import {
  DashboardHeader,
  DashboardStats,
  BMIGoals,
  TodayMeals,
  TodayTracking,
} from '../components/dashboard'
import type { NutritionGoals } from '../components/dashboard/BMIGoals'

export default function DashboardPage() {
  const { user } = useAuth()
  const { profile, nutritionTargets, loading } = useProfile()
  const { activePlan } = useAiMealPlan()
  const location = useLocation()
  const [activeSection, setActiveSection] =
    useState<SidebarSection>('dashboard')

  // Check if navigated from another page with section state
  const requestedSection = (
    location.state as { section?: SidebarSection } | null
  )?.section
  useEffect(() => {
    if (requestedSection) {
      setActiveSection(requestedSection)
    }
  }, [requestedSection])

  // Motivational toasts removed — no-op

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
  }

  // Real nutrition goals from nutritionTargets
  // Get current nutrition from today's meal plan (day 1)
  const todayNutrition = activePlan?.days?.[0]?.totalNutrition || {}

  const goalsData: NutritionGoals = {
    caloriesCurrent: todayNutrition.calories || 0,
    caloriesTarget:
      activePlan?.dailyCalories || nutritionTargets?.dailyCalories,
    proteinCurrent: todayNutrition.protein || 0,
    proteinTarget: nutritionTargets?.macros.protein,
    carbsCurrent: todayNutrition.carbs || 0,
    targetWeight: profile?.targetWeight,
    fatsTarget: nutritionTargets?.macros.fat,
  }

  // Render content based on active section
  return (
    <div className="flex min-h-screen bg-transparent landing-page overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64 w-full max-w-full overflow-x-hidden">
        {/* Header */}
        <DashboardHeader userName={user?.name} />

        {/* Content Area: Switch between dashboard and meal planner */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 max-w-full">
          {activeSection === 'ai-diet-planner' ? (
            <AiDietPlannerPage />
          ) : activeSection === 'ai-meal-plans' ? (
            <AiMealPlanList />
          ) : (
            <>
              <DashboardStats stats={statsData} />
              <TodayTracking />
              <BMIGoals goals={goalsData} activePlan={activePlan} />
              <TodayMeals />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
