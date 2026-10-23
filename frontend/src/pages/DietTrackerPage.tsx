import { useState, useEffect, type ReactNode } from 'react'
import {
  FiCheckCircle,
  FiBell,
  FiClock,
  FiAlertTriangle,
  FiPieChart,
  FiShield,
  FiCheck,
} from 'react-icons/fi'
import { CheckCircle } from 'lucide-react'
import { useDietTracker } from '../context/DietTrackerContext'
import { useAiMealPlan } from '../context/aiMealPlanContext'
import { useProfile } from '../context/ProfileContext'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar/Sidebar'
import Card from '../components/ui/Card'
import { DashboardHeader } from '../components/dashboard'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import { bmiCategory as calcBmiCategory } from '../utils/bmiUtils'
import type { AiMealPlan, MealTimingStatus } from '../types'

// Timing Status Badge Component
const MealTimingBadge = ({
  timingStatus,
}: {
  timingStatus: MealTimingStatus
}) => {
  const getStatusStyle = (): {
    bg: string
    text: string
    label: string
    icon: ReactNode
    dotColor: string
  } => {
    switch (timingStatus) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: 'Completed',
          icon: <FiCheckCircle className="inline mr-2" />,
          dotColor: 'bg-green-500',
        }
      case 'active':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          label: 'Active Now',
          icon: <FiBell className="inline mr-2" />,
          dotColor: 'bg-blue-500',
        }
      case 'upcoming':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          label: 'Upcoming',
          icon: <FiClock className="inline mr-2" />,
          dotColor: 'bg-yellow-500',
        }
      case 'missed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'Missed',
          icon: <FiAlertTriangle className="inline mr-2" />,
          dotColor: 'bg-red-500',
        }
      case 'anytime':
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Anytime',
          icon: <FiCheck className="inline mr-2" />,
          dotColor: 'bg-gray-500',
        }
    }
  }

  const style = getStatusStyle()

  return (
    <div className="flex items-center gap-2 mt-2">
      <div
        className={`w-2 h-2 rounded-full ${style.dotColor} animate-pulse`}
      ></div>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-semibold ${style.bg} ${style.text}`}
      >
        {style.icon}
        <span>{style.label}</span>
      </span>
    </div>
  )
}

const MEAL_TIMES: Record<string, { start: number; end: number }> = {
  breakfast: { start: 6, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
  snack: { start: 10, end: 20 },
  snacks: { start: 10, end: 20 },
}

const getMealTimeStatusClient = (
  category: string | undefined,
  isEaten: boolean,
  nowMs: number,
): MealTimingStatus => {
  if (isEaten) return 'completed'
  const hour = new Date(nowMs).getHours()
  const key = (category || '').toLowerCase()
  const window = MEAL_TIMES[key]
  if (!window) return 'anytime'
  if (hour < window.start) return 'upcoming'
  if (hour > window.end) return 'missed'
  return 'active'
}

export default function DietTrackerPage() {
  const { user } = useAuth()

  const {
    activeTracker,
    createTracker,
    markMealAsEaten,
    undoMeal,
    fetchActiveTracker,
  } = useDietTracker()

  const { allPlans, fetchLatestPlan, fetchAllPlans } = useAiMealPlan()

  const { profile, nutritionTargets } = useProfile()

  const [selectedDay, setSelectedDay] = useState(1)
  const [actionLoading, setActionLoading] = useState(false)
  const [selectedMealPlanId, setSelectedMealPlanId] = useState<string | null>(
    null,
  )
  const [now, setNow] = useState(() => Date.now())

  const [dayCompleteModalOpen, setDayCompleteModalOpen] = useState(false)
  const [nextDayToGo, setNextDayToGo] = useState<number | null>(null)
  // Derived instead of synced via an effect: show once per completed tracker
  const [dismissedCongratsFor, setDismissedCongratsFor] = useState<
    string | null
  >(null)
  const showCongrats =
    activeTracker?.status === 'completed' &&
    dismissedCongratsFor !== activeTracker._id

  useEffect(() => {
    void fetchLatestPlan()
    void fetchAllPlans()
    void fetchActiveTracker()
  }, [fetchLatestPlan, fetchAllPlans, fetchActiveTracker])

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  // Jump to the tracker's current day the first time it loads. Adjusting
  // state during render (rather than in an effect) avoids an extra paint.
  const [didInitDay, setDidInitDay] = useState(false)
  if (activeTracker && !didInitDay) {
    setDidInitDay(true)
    setSelectedDay(activeTracker.currentDay)
  }

  const handleCreateTracker = async (mealPlanId: string | null) => {
    if (!mealPlanId) {
      alert('Please select a meal plan first!')
      return
    }

    setActionLoading(true)
    const result = await createTracker(mealPlanId)
    setActionLoading(false)

    if (!result.success) {
      alert(result.error)
    } else {
      setSelectedMealPlanId(null) // Reset selection
    }
  }

  const handleToggleMeal = async (mealId: string, isEaten: boolean) => {
    const dayBefore = selectedDay

    setActionLoading(true)

    const result = isEaten
      ? await undoMeal(selectedDay, mealId)
      : await markMealAsEaten(selectedDay, mealId)

    setActionLoading(false)

    if (!result.success) {
      alert(result.error)
      return
    }

    // success path only
    await fetchActiveTracker(true)

    const dayCompleted = result.data?.dayCompleted
    const nextDayNumber = result.data?.nextDayNumber

    if (dayCompleted) {
      setSelectedDay(dayBefore)
      setNextDayToGo(nextDayNumber ?? null)
      setDayCompleteModalOpen(true)
    }
  }

  if (showCongrats) {
    return (
      <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center lg:ml-64 w-full max-w-full">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
            <div className="text-6xl mb-4 text-green-500">
              <CheckCircle className="inline" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Congratulations!
            </h2>

            <p className="text-muted mb-6">
              This meal plan has been completed successfully. Well done on your
              dedication and consistency!
            </p>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              onClick={() => {
                setDismissedCongratsFor(activeTracker?._id ?? null)
                window.location.href = '/diet-tracker'
              }}
            >
              Go to Diet-Tracker Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No active tracker - show meal plan selector
  if (!activeTracker) {
    return (
      <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:ml-64 w-full max-w-full">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl w-full">
            <div className="text-6xl mb-4 text-center">
              <FiPieChart className="inline" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              No Active Diet Tracker
            </h2>
            <p className="text-muted mb-6 text-center">
              Select a meal plan to start tracking your diet and monitor your
              progress!
            </p>

            {allPlans.length === 0 ? (
              <p className="text-sm text-red-600 mb-4 text-center">
                <FiAlertTriangle className="inline mr-2" />
                Please create a meal plan first before starting tracking
              </p>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Select a Meal Plan to Track:
                </h3>
                <div className="grid gap-3 max-h-96 overflow-y-auto">
                  {allPlans.map((plan) => (
                    <div
                      key={plan._id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMealPlanId === plan._id
                          ? 'border-green-500 bg-green-50 text-gray-800 dark:bg-green-900/30 dark:border-green-700 dark:text-textDark'
                          : 'nv-border hover:border-green-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedMealPlanId(plan._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-800 capitalize">
                              {plan.planName}
                            </h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-sm">
                              {plan.foodType}
                            </span>
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-sm">
                              {plan.goal}
                            </span>
                          </div>
                          <div className="text-sm text-muted space-y-1">
                            <p>
                              {plan.days?.length || 0} days •{' '}
                              {plan.days?.[0]?.meals?.length || 0} meals/day
                            </p>
                            {/* Was reading a non-existent `dietaryRestrictions`
                                field, so restrictions never showed. */}
                            {(() => {
                              const restrictions = (
                                plan.allergens ?? []
                              ).filter((a) => a && a !== 'none')
                              return restrictions.length > 0 ? (
                                <p className="flex items-center gap-1">
                                  <FiShield className="inline" />{' '}
                                  {restrictions.join(', ')}
                                </p>
                              ) : null
                            })()}
                          </div>
                        </div>
                        {selectedMealPlanId === plan._id && (
                          <div className="ml-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <FiCheck className="text-white text-sm" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  onClick={() => handleCreateTracker(selectedMealPlanId)}
                  disabled={actionLoading || !selectedMealPlanId}
                >
                  {actionLoading
                    ? 'Creating...'
                    : 'Create Tracker for Selected Plan'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Get AI meal plan data (populated by the backend; a bare id means it wasn't)
  const aiMealPlan: AiMealPlan | null =
    typeof activeTracker.aiMealPlanId === 'object'
      ? activeTracker.aiMealPlanId
      : null

  // Safety check - if meal plan is missing (shouldn't happen now with backend fix)
  if (!aiMealPlan || !aiMealPlan.days || !Array.isArray(aiMealPlan.days)) {
    return (
      <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:ml-64 w-full max-w-full">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
            <div className="text-6xl mb-4">
              <FiAlertTriangle className="inline" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Invalid Meal Plan Data
            </h2>
            <p className="text-muted mb-6">
              The meal plan data is corrupted or incomplete. Please create a new
              meal plan.
            </p>
            <button
              onClick={() => (window.location.href = '/dashboard')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Determine plan start date to map day numbers to calendar dates.
  // Prefer tracker start, then profile created date, fallback to today.
  const planStartRaw =
    activeTracker?.startDate ||
    profile?.createdAt ||
    aiMealPlan?.createdAt ||
    new Date().toISOString()

  const planStart = new Date(planStartRaw)

  const selectedDate = new Date(planStart)
  selectedDate.setDate(planStart.getDate() + (selectedDay - 1))

  const currentDay = aiMealPlan.days.find((d) => d.dayNumber === selectedDay)
  const currentDayTracker = activeTracker.dailyTrackers.find(
    (d) => d.dayNumber === selectedDay,
  )

  // Calculate stats for dashboard overview
  const bmi = profile?.bmi || 24.5
  const bmiCategory = calcBmiCategory(bmi)

  // Calculate macros data for pie chart
  const targetCalories = nutritionTargets?.dailyCalories || 2189
  // Targets live under `macros` in the API response; the old flat lookups
  // always fell through to these defaults.
  const targetProtein = nutritionTargets?.macros?.protein || 137
  const targetCarbs = nutritionTargets?.macros?.carbs || 322
  const targetFat = nutritionTargets?.macros?.fat || 32

  const consumedCalories = currentDayTracker?.consumed?.calories || 0
  const consumedProtein = currentDayTracker?.consumed?.protein || 0
  const consumedCarbs = currentDayTracker?.consumed?.carbs || 0
  const consumedFat = currentDayTracker?.consumed?.fat || 0

  // Pie chart data for macros target
  const macrosData = [
    {
      name: 'Protein',
      value: Math.round(((targetProtein * 4) / targetCalories) * 100),
      color: '#3b82f6',
    },
    {
      name: 'Carbs',
      value: Math.round(((targetCarbs * 4) / targetCalories) * 100),
      color: '#10b981',
    },
    {
      name: 'Fat',
      value: Math.round(((targetFat * 9) / targetCalories) * 100),
      color: '#f59e0b',
    },
  ]

  // Bar chart data for nutrition progress
  const nutritionProgressData = [
    {
      name: 'Calories',
      Consumed: Math.round(consumedCalories),
      Remaining: Math.max(0, Math.round(targetCalories - consumedCalories)),
    },
    {
      name: 'Protein',
      Consumed: Math.round(consumedProtein),
      Remaining: Math.max(0, Math.round(targetProtein - consumedProtein)),
    },
    {
      name: 'Carbs',
      Consumed: Math.round(consumedCarbs),
      Remaining: Math.max(0, Math.round(targetCarbs - consumedCarbs)),
    },
    {
      name: 'Fat',
      Consumed: Math.round(consumedFat),
      Remaining: Math.max(0, Math.round(targetFat - consumedFat)),
    },
  ]

  const targetWeight = profile?.targetWeight || profile?.weight || 67.2
  const currentWeight = profile?.weight || 67.2
  const weightLoss = currentWeight - targetWeight

  return (
    <div className="flex min-h-screen bg-transparent landing-page overflow-x-hidden">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 lg:ml-64 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto max-w-full">
          <DashboardHeader userName={user?.name} />

          {/* Day Selector (compact week strip) */}
          <div className="mb-6 max-w-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-full border nv-border">
              {/* Header Section */}
              <div className="mb-6 pb-6 border-b nv-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize mb-1">
                      Welcome, {user?.name || 'User'}!
                    </h1>
                    <div className="flex items-center gap-2 text-muted">
                      <FiPieChart className="text-green-500" />
                      <p className="font-lg">
                        <span className="text-gray-600 dark:text-gray-400">
                          Plan:
                        </span>{' '}
                        <span className="capitalize text-gray-800 dark:text-white">
                          {aiMealPlan.planName}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="bg-linear-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 px-6 py-3 rounded-lg border-2 border-green-200 dark:border-green-700">
                    <div className="text-xs text-muted uppercase font-semibold mb-1">
                      Progress
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      Day {selectedDay}{' '}
                      <span className="text-lg text-muted">
                        / {aiMealPlan.days.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Selector */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiClock className="text-blue-500" />
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Select Your Day
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {aiMealPlan.days.map((day) => {
                  const dateForDay = new Date(planStart)
                  dateForDay.setDate(planStart.getDate() + (day.dayNumber - 1))
                  const displayDate = dateForDay.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })

                  return (
                    <button
                      key={day.dayNumber}
                      onClick={() => setSelectedDay(day.dayNumber)}
                      className={`px-3 py-2 rounded-lg min-w-[84px] text-left transition-colors border shrink-0 ${
                        selectedDay === day.dayNumber
                          ? 'bg-green-50 border-green-300 text-gray-800 dark:bg-green-900/25 dark:border-green-700 dark:text-textDark'
                          : 'bg-white border-gray-200 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-xs text-muted">
                        Day {day.dayNumber}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">
                        {displayDate}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Overview Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Daily Calories Card */}
            <Card noHover className="border-l-4 border-l-blue-500 p-4">
              <div className="text-sm text-muted mb-2">Daily Calories</div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(consumedCalories)} / {Math.round(targetCalories)}
              </div>
              <div className="text-sm text-muted mt-1">
                Remaining: {Math.round(targetCalories - consumedCalories)}
              </div>
            </Card>

            {/* Current BMI Card */}
            <Card noHover className="border-l-4 border-l-green-500 p-4">
              <div className="text-sm text-muted mb-2">Current BMI</div>
              <div className="text-3xl font-bold text-green-600">
                {bmi.toFixed(1)}
              </div>
              <div className="text-sm text-muted mt-1">{bmiCategory}</div>
            </Card>

            {/* Predicted Weight Card */}
            <Card noHover className="border-l-4 border-l-purple-500 p-4">
              <div className="text-sm text-muted mb-2">Predicted Weight</div>
              <div className="text-3xl font-bold text-purple-600">
                {targetWeight} kg
              </div>
              <div className="text-sm text-muted mt-1">
                Loss: {weightLoss.toFixed(1)} kg
              </div>
            </Card>

            {/* Meal Completion Card */}
            <Card noHover className="border-l-4 border-l-yellow-500 p-4">
              <div className="text-sm text-muted mb-2">Meal Completion</div>
              <div className="text-3xl font-bold text-yellow-600">
                {currentDayTracker?.mealsCompleted || 0} /{' '}
                {currentDayTracker?.totalMeals || 3}
              </div>
              <div className="text-sm text-muted mt-1">
                {currentDayTracker?.completionPercentage || 0}% completed
              </div>
            </Card>
          </div>

          {/* Macros and Nutrition Progress Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Macros Target */}
            <Card noHover className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Daily Macros Target
              </h3>
              <div className="w-full aspect-square max-h-80">
                <ResponsiveContainer width="100%" height="100%" minHeight={224}>
                  <PieChart>
                    <Pie
                      data={macrosData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {macrosData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Daily Nutrition Progress */}
            <Card noHover className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Daily Nutrition Progress
              </h3>
              <div className="w-full aspect-square max-h-80">
                <ResponsiveContainer width="100%" height="100%" minHeight={224}>
                  <BarChart
                    data={nutritionProgressData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="Consumed"
                      stackId="a"
                      fill="#10b981"
                      animationDuration={800}
                    />
                    <Bar
                      dataKey="Remaining"
                      stackId="a"
                      fill="#fbbf24"
                      animationDuration={800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Meals for Selected Day - WITH TIMING STATUS */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">
              Meals for Day {selectedDay}
            </h3>

            {!currentDay && (
              <p className="text-muted">
                Day {selectedDay} data not available yet
              </p>
            )}

            {currentDay && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentDay.meals.map((meal) => {
                  const mealInTracker = currentDayTracker?.meals.find(
                    (m) => m.mealId === meal._id.toString(),
                  )
                  const isEaten = mealInTracker?.isEaten || false

                  // Get timing status from tracker data (backend enriches this)
                  //const timingStatus = mealInTracker?.timingStatus || 'anytime'
                  const timingStatus = getMealTimeStatusClient(
                    meal.type,
                    isEaten,
                    now,
                  )

                  return (
                    <div
                      key={meal._id}
                      onClick={() =>
                        !actionLoading && handleToggleMeal(meal._id, isEaten)
                      }
                      className={`p-6 rounded-lg cursor-pointer transition-all border-2 ${
                        isEaten
                          ? 'bg-green-50 border-green-300 text-gray-800 dark:bg-green-900/25 dark:border-green-700 dark:text-textDark'
                          : 'bg-white nv-border hover:border-blue-300 hover:shadow-md'
                      } ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="text-xs text-muted uppercase font-semibold mb-1">
                            {meal.type}
                          </div>
                          <h4 className="font-bold text-lg text-gray-800 leading-tight">
                            {meal.dishName}
                          </h4>

                          {/* ADD TIMING STATUS BADGE */}
                          <MealTimingBadge timingStatus={timingStatus} />
                        </div>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                            isEaten ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          {isEaten && (
                            <FiCheck className="text-white text-xl font-bold" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted mb-4 line-clamp-2">
                        {meal.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          Cal: {Math.round(meal.nutrition?.calories ?? 0)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                          P: {Math.round(meal.nutrition?.protein ?? 0)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                          C: {Math.round(meal.nutrition?.carbs ?? 0)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                          F: {Math.round(meal.nutrition?.fat ?? 0)}
                        </span>
                      </div>

                      {/* Show eaten timestamp if available */}
                      {isEaten && mealInTracker?.eatenAt && (
                        <div className="mt-3 pt-3 border-t nv-border">
                          <p className="text-xs text-muted flex items-center gap-1">
                            <FiCheck className="inline" />
                            Eaten at{' '}
                            {new Date(mealInTracker.eatenAt).toLocaleTimeString(
                              'en-US',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {dayCompleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop (click to close) */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDayCompleteModalOpen(false)}
          />

          {/* Modal box */}
          <div
            className="relative w-full max-w-md mx-4 rounded-xl bg-white shadow-lg p-6"
            onClick={(e) => e.stopPropagation()} // prevents backdrop close when clicking inside
          >
            <h3 className="text-lg font-bold text-gray-900">Day completed!</h3>
            <p className="text-sm text-muted mt-1">
              Great job. Want to move to the next day now?
            </p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-lg border nv-border hover:bg-gray-50"
                onClick={() => setDayCompleteModalOpen(false)}
              >
                Stay
              </button>

              {nextDayToGo ? (
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  onClick={() => {
                    setSelectedDay(nextDayToGo)
                    setDayCompleteModalOpen(false)
                  }}
                >
                  Go to Day {nextDayToGo}
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
                  disabled
                >
                  No next day
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
