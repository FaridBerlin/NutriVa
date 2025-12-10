/**
 * DashboardPage.jsx
 *
 * @modified 8 December 2025
 * @description Main dashboard page with modular components
 */

import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import Sidebar from '../components/Sidebar/Sidebar'
import { Utensils, MessageSquare } from 'lucide-react'

import {
  DashboardHeader,
  DashboardStats,
  ProfileOverview,
  BMIGoals,
  HealthMetrics,
  PlanSummary,
  WeeklyCalendar,
  CreatePlan,
  CreateMeal,
  ComingSoon,
} from '../components/dashboard'

export default function DashboardPage() {
  const { user } = useContext(AuthContext)
  const { profile, nutritionTargets, loading } = useProfile()
  const [activeSection, setActiveSection] = useState('dashboard')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-textLight">Loading...</div>
      </div>
    )
  }

  // Prepare data
  const statsData = {
    dailyCalories: nutritionTargets?.dailyCalories || 2000,
    weight: profile?.weight || 68,
    bmi: nutritionTargets?.bmi || 24.5,
    daysLeft: profile?.planDuration || 30,
  }

  const profileData = {
    name: user?.name,
    email: user?.email,
    age: profile?.age,
    gender: profile?.gender,
    height: profile?.height,
    weight: profile?.weight,
    bmi: nutritionTargets?.bmi,
    bmiCategory: profile?.bmiCategory,
    dietaryGoal: profile?.dietaryGoal,
    mealsPerDay: profile?.mealsPerDay || 3,
    planDuration: profile?.planDuration || 30,
    dietType: profile?.dietType,
    fitnessGoal: profile?.dietaryGoal?.replace('_', ' '),
    dailyCalories: nutritionTargets?.dailyCalories,
    targetBMI: profile?.targetBMI,
    targetWeight: profile?.targetWeight,
  }

  const goalsData = {
    caloriesCurrent: 1450,
    caloriesTarget: nutritionTargets?.dailyCalories || 2000,
    proteinCurrent: 85,
    proteinTarget: nutritionTargets?.protein || 150,
    carbsCurrent: 180,
    carbsTarget: 250,
    fatsCurrent: 45,
    fatsTarget: 65,
  }

  const metricsData = {
    bmi: nutritionTargets?.bmi,
    bodyFat: '20-25%',
    bmr: nutritionTargets?.bmr,
    tdee: nutritionTargets?.tdee,
    dailyCalories: nutritionTargets?.dailyCalories,
    protein: nutritionTargets?.protein,
    fats: nutritionTargets?.fats,
  }

  const planData = {
    fitnessGoal: `${profile?.dietaryGoal?.replace('_', ' ') || 'Weight loss'} program for 30 days`,
    dietPlan: `${profile?.dietType || 'Balanced'} diet with ${profile?.mealsPerDay || 3} meals per day`,
  }

  const createPlanData = {
    goal: profile?.dietaryGoal?.replace('_', ' ') || 'Weight Loss',
    dailyCalories: nutritionTargets?.dailyCalories,
    bmi: nutritionTargets?.bmi,
    activityLevel: profile?.activityLevel || 'Moderate',
    duration: profile?.planDuration || 30,
  }

  const handleGeneratePlan = () => {
    console.log('Generating AI plan...')
    // TODO: Implement AI plan generation
  }

  const handleSaveMeal = (mealData) => {
    console.log('Saving meal:', mealData)
    // TODO: Implement meal saving
  }

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardStats stats={statsData} />

      case 'profile':
        return <ProfileOverview profile={profileData} />

      case 'bmi':
        return (
          <BMIGoals
            bmi={nutritionTargets?.bmi}
            bmiCategory={profile?.bmiCategory}
            goals={goalsData}
          />
        )

      case 'metrics':
        return <HealthMetrics metrics={metricsData} />

      case 'plan':
        return <PlanSummary plan={planData} />

      case 'calendar':
        return <WeeklyCalendar />

      case 'create-plan':
        return (
          <CreatePlan
            profile={createPlanData}
            onGenerate={handleGeneratePlan}
          />
        )

      case 'create-meal':
        return (
          <CreateMeal
            onSave={handleSaveMeal}
            onCancel={() => setActiveSection('dashboard')}
          />
        )

      case 'meals':
        return <ComingSoon icon={Utensils} title="Meal Planner" />

      case 'ai':
        return <ComingSoon icon={MessageSquare} title="AI Assistant" />

      default:
        return <DashboardStats stats={statsData} />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <DashboardHeader userName={user?.name} />

        {/* Content Area */}
        <div className="p-8">{renderContent()}</div>
      </div>
    </div>
  )
}
