import { useState, useEffect, useContext } from 'react'
import {
  FiCheckCircle,
  FiBell,
  FiClock,
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
  FiPieChart,
  FiShield,
  FiCheck,
  FiStar,
} from 'react-icons/fi'
import { useDietTracker } from '../context/DietTrackerContext'
import { useAiMealPlan } from '../context/aiMealPlanContext'
import { useProfile } from '../context/ProfileContext'
import { AuthContext } from '../context/AuthContext'
import Sidebar from '../components/Sidebar/Sidebar'
import Card from '../components/ui/Card'
import {
  ResponsiveContainer,
  LineChart,
  Line,
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
import {
  bmiPercent as calcBmiPercent,
  bmiCategory as calcBmiCategory,
} from '../utils/bmiUtils'

// Timing Status Badge Component
const MealTimingBadge = ({ timingStatus }) => {
  const getStatusStyle = () => {
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

const MEAL_TIMES = {
  breakfast: { start: 6, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
  snack: { start: 10, end: 20 },
  snacks: { start: 10, end: 20 },
}

const getMealTimeStatusClient = (category, isEaten, nowMs) => {
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
  const { user } = useContext(AuthContext)

  const {
    activeTracker,
    loading: trackerLoading,
    error: trackerError,
    createTracker,
    markMealAsEaten,
    undoMeal,
    fetchActiveTracker,
  } = useDietTracker()

  const {
    activePlan,
    allPlans,
    loading: planLoading,
    fetchLatestPlan,
    fetchAllPlans,
  } = useAiMealPlan()

  const { profile, nutritionTargets, updateProfile } = useProfile()

  const [selectedDay, setSelectedDay] = useState(1)
  const [weekOffset, setWeekOffset] = useState(0)
  const [actionLoading, setActionLoading] = useState(false)
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null)
  const [now, setNow] = useState(Date.now())

  const [dayCompleteModalOpen, setDayCompleteModalOpen] = useState(false)
  const [nextDayToGo, setNextDayToGo] = useState(null)
  const [showCongrats, setShowCongrats] = useState(false)

  useEffect(() => {
    fetchLatestPlan()
    fetchAllPlans()
    fetchActiveTracker()
  }, [])

  useEffect(() => {
    if (activeTracker?.status === 'completed') {
      setShowCongrats(true)
    }
  }, [activeTracker])

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60 * 1000) // every 1 min
    return () => clearInterval(id)
  }, [])

  const [didInitDay, setDidInitDay] = useState(false)

  useEffect(() => {
    if (!activeTracker || didInitDay) return
    setSelectedDay(activeTracker.currentDay)
    setDidInitDay(true)
  }, [activeTracker, didInitDay])

  // Keep the week offset synced with the currently selected day
  useEffect(() => {
    setWeekOffset(Math.floor((selectedDay - 1) / 7))
  }, [selectedDay])

  const handleCreateTracker = async (mealPlanId) => {
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

  const handleToggleMeal = async (mealId, isEaten) => {
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
      setNextDayToGo(nextDayNumber)
      setDayCompleteModalOpen(true)
    }
  }

  const handleClearOrphanedTracker = () => {
    // Clear the orphaned tracker from state to show the meal plan selector
    setShowOrphanedError(false)
    fetchActiveTracker() // This will set activeTracker to null if tracker is orphaned
    return (
       <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center ml-4 md:ml-8 lg:ml-12">
          <div className="text-xl text-muted">Loading...</div>
        </div>
      </div>
    )
  }

  if (showCongrats) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center ml-4 md:ml-8 lg:ml-12">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
            <div className="text-6xl mb-4">
              <FiStar className="inline" />
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
                setShowCongrats(false)
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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8 ml-4 md:ml-8 lg:ml-12">
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
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {plan.foodType}
                            </span>
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {plan.goal}
                            </span>
                          </div>
                          <div className="text-sm text-muted space-y-1">
                            <p>
                              {plan.days?.length || 0} days •{' '}
                              {plan.days?.[0]?.meals?.length || 0} meals/day
                            </p>
                            {plan.dietaryRestrictions?.length > 0 && (
                              <p className="flex items-center gap-1">
                                <FiShield className="inline" />{' '}
                                {plan.dietaryRestrictions.join(', ')}
                              </p>
                            )}
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

  // Get AI meal plan data
  const aiMealPlan = activeTracker.aiMealPlanId

  // Safety check - if meal plan is missing (shouldn't happen now with backend fix)
  if (!aiMealPlan || !aiMealPlan.days || !Array.isArray(aiMealPlan.days)) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8 ml-4 md:ml-8 lg:ml-12">
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
    activeTracker?.startedAt ||
    profile?.createdAt ||
    aiMealPlan?.startDate ||
    new Date().toISOString()

  const planStart = new Date(planStartRaw)

  const formatISODate = (d) => {
    if (!d) return ''
    const tzOffset = d.getTimezoneOffset() * 60000
    return new Date(d - tzOffset).toISOString().slice(0, 10)
  }

  const selectedDate = new Date(planStart)
  selectedDate.setDate(planStart.getDate() + (selectedDay - 1))

  const onDateChange = (e) => {
    const picked = new Date(e.target.value)
    // compute difference in full days
    const startZero = new Date(planStart)
    startZero.setHours(0, 0, 0, 0)
    const pickedZero = new Date(picked)
    pickedZero.setHours(0, 0, 0, 0)
    const diffMs = pickedZero - startZero
    const dayIndex = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1
    if (!isNaN(dayIndex)) {
      const clamped = Math.min(
        Math.max(1, dayIndex),
        aiMealPlan?.days?.length || 1,
      )
      setSelectedDay(clamped)
    }
  }

  const currentDay = aiMealPlan.days.find((d) => d.dayNumber === selectedDay)
  const currentDayTracker = activeTracker.dailyTrackers.find(
    (d) => d.dayNumber === selectedDay,
  )

  // Calculate stats for dashboard overview
  const bmi = nutritionTargets?.bmi || profile?.bmi || 24.5
  const bmiPercent = calcBmiPercent(bmi)
  const bmiCategory = calcBmiCategory(bmi)
  const planDuration = profile?.planDuration || 30
  const createdAtRaw =
    profile?.createdAt || profile?.created_at || profile?.created || null

  let elapsedDays = 0
  if (createdAtRaw) {
    try {
      const created = new Date(createdAtRaw)
      const now = new Date()
      const diffMs = now - created
      elapsedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      if (elapsedDays < 0) elapsedDays = 0
    } catch (e) {
      elapsedDays = 0
    }
  }

  const cappedElapsed = Math.min(elapsedDays, planDuration)
  const daysLeft = Math.max(0, planDuration - cappedElapsed)

  // Prepare line chart data for plan progress
  const chartData = Array.from({ length: planDuration }, (_, i) => {
    const day = i + 1
    const val = Math.round((Math.min(day, cappedElapsed) / planDuration) * 100)
    return { day: `${day}`, value: val }
  })

  // Calculate macros data for pie chart
  const targetCalories = nutritionTargets?.dailyCalories || 2189
  const targetProtein = nutritionTargets?.protein || 137
  const targetCarbs = nutritionTargets?.carbs || 322
  const targetFat = nutritionTargets?.fats || 32

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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 ml-4 md:ml-8 lg:ml-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {user?.name || 'User'} Progress
            </h1>
            <p className="text-muted capitalize">{aiMealPlan.planName}</p>
          </div>

          {/* Day Selector (compact week strip) */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium nv-accent mb-3">
                Select Day (Week view)
              </label>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
                  className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                  aria-label="Previous week"
                >
                  <FiChevronLeft />
                </button>

                <div className="flex gap-2 overflow-x-auto">
                  {(() => {
                    const daysPerWeek = 7
                    const totalDays = aiMealPlan.days.length
                    const maxWeekIndex = Math.max(
                      0,
                      Math.ceil(totalDays / daysPerWeek) - 1,
                    )
                    const startDay = weekOffset * daysPerWeek + 1
                    const pills = []
                    for (let i = 0; i < daysPerWeek; i++) {
                      const dayNumber = startDay + i
                      if (dayNumber > totalDays) break
                      const dateForDay = new Date(planStart)
                      dateForDay.setDate(planStart.getDate() + (dayNumber - 1))
                      const displayDate = dateForDay.toLocaleDateString(
                        undefined,
                        {
                          month: 'short',
                          day: 'numeric',
                        },
                      )
                      pills.push(
                        <button
                          key={dayNumber}
                          onClick={() => setSelectedDay(dayNumber)}
                          className={`px-3 py-2 rounded-lg min-w-[84px] text-left transition-colors border ${
                            selectedDay === dayNumber
                              ? 'bg-green-50 border-green-300 text-gray-800 dark:bg-green-900/25 dark:border-green-700 dark:text-textDark'
                              : 'bg-white nv-border hover:border-blue-300'
                          }`}
                        >
                          <div className="text-xs text-muted">
                            Day {dayNumber}
                          </div>
                          <div className="text-sm font-semibold text-gray-800">
                            {displayDate}
                          </div>
                        </button>,
                      )
                    }
                    return pills
                  })()}
                </div>

                <button
                  onClick={() => {
                    const maxWeek = Math.max(
                      0,
                      Math.ceil(aiMealPlan.days.length / 7) - 1,
                    )
                    setWeekOffset((w) => Math.min(maxWeek, w + 1))
                  }}
                  className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                  aria-label="Next week"
                >
                  <FiChevronRight />
                </button>

                <div className="ml-4 text-sm text-muted">
                  Day {selectedDay} of {aiMealPlan.days.length}
                </div>
              </div>
            </div>
          </div>

          {/* Overview Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Daily Calories Card */}
            <Card noHover className="border-l-4 border-blue-500 p-4">
              <div className="text-sm text-muted mb-2">Daily Calories</div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(consumedCalories)} / {Math.round(targetCalories)}
              </div>
              <div className="text-sm text-muted mt-1">
                Remaining: {Math.round(targetCalories - consumedCalories)}
              </div>
            </Card>

            {/* Current BMI Card */}
            <Card noHover className="border-l-4 border-green-500 p-4">
              <div className="text-sm text-muted mb-2">Current BMI</div>
              <div className="text-3xl font-bold text-green-600">
                {bmi.toFixed(1)}
              </div>
              <div className="text-sm text-muted mt-1">{bmiCategory}</div>
            </Card>

            {/* Predicted Weight Card */}
            <Card noHover className="border-l-4 border-purple-500 p-4">
              <div className="text-sm text-muted mb-2">Predicted Weight</div>
              <div className="text-3xl font-bold text-purple-600">
                {targetWeight} kg
              </div>
              <div className="text-sm text-muted mt-1">
                Loss: {weightLoss.toFixed(1)} kg
              </div>
            </Card>

            {/* Meal Completion Card */}
            <Card noHover className="border-l-4 border-yellow-500 p-4">
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
                <ResponsiveContainer width="100%" height={280}>
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
            </Card>

            {/* Daily Nutrition Progress */}
            <Card noHover className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Daily Nutrition Progress
              </h3>
                <ResponsiveContainer width="100%" height={280}>
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
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-2 ${
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
                          Cal: {Math.round(meal.nutrition.calories)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                          P: {Math.round(meal.nutrition.protein)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                          C: {Math.round(meal.nutrition.carbs)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                          F: {Math.round(meal.nutrition.fat)}
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
