/**
 * ❌ DEPRECATED - NOT IN USE
 * 
 * PRACTICAL EXAMPLES - mealPlanService.js Usage
 * Test these in your Node REPL or Jest tests
 *
 * STATUS: This is a TEST FILE - not used in production
 * REPLACED BY: Direct testing in development or proper unit tests
 * 
 * Original Purpose:
 * - Test file for old meal plan service
 * - Copy this file as: backend/test-mealPlanService.js
 * - Run with: node test-mealPlanService.js
 */

/*
// COMMENTED OUT - File kept for reference only

import mealPlanService from './mealPlanService.js'

console.log('🧪 Testing mealPlanService.js')
console.log('='.repeat(80))

// ============================================================================
// EXAMPLE 1: Calculate Nutrition for a 30-year-old Male
// ============================================================================

console.log('\n📊 EXAMPLE 1: Male Nutrition Calculation')
console.log('-'.repeat(80))

const male30 = {
  weight: 80, // kg
  height: 180, // cm
  age: 30, // years
  gender: 'male',
}

const bmr_male = mealPlanService.calculateBMR({
  weight: male30.weight,
  height: male30.height,
  age: male30.age,
  gender: male30.gender,
})

console.log(`BMR (Resting): ${Math.round(bmr_male)} calories`)

const tdee_male = mealPlanService.calculateTDEE({
  bmr: bmr_male,
  activityLevel: 'moderate',
})
console.log(`TDEE (Moderate Activity): ${Math.round(tdee_male)} calories`)

const maintenance_calories = mealPlanService.adjustCaloriesForGoal(
  tdee_male,
  'maintenance',
)
const loss_calories = mealPlanService.adjustCaloriesForGoal(
  tdee_male,
  'weightLoss',
)
const aggressive_loss = mealPlanService.adjustCaloriesForGoal(
  tdee_male,
  'aggressive_loss',
)

console.log(`\nGoal Adjustments:`)
console.log(
  `  Maintenance: ${Math.round(maintenance_calories)} cal (no change)`,
)
console.log(`  Weight Loss: ${Math.round(loss_calories)} cal (-500)`)
console.log(`  Aggressive Loss: ${Math.round(aggressive_loss)} cal (-750)`)

// ============================================================================
// EXAMPLE 2: Calculate Macros for Weight Loss
// ============================================================================

console.log('\n\n🥗 EXAMPLE 2: Macro Targets for Weight Loss')
console.log('-'.repeat(80))

const loss_macros = mealPlanService.calculateMacroTargets(
  loss_calories,
  'weightLoss',
)

console.log(`Daily Calorie Target: ${Math.round(loss_calories)} kcal`)
console.log(`\nMacro Targets (Weight Loss Split: 40/40/20):`)
console.log(
  `  Protein: ${loss_macros.protein}g (40% = ${(loss_macros.protein * 4).toFixed(0)} kcal)`,
)
console.log(
  `  Carbs: ${loss_macros.carbs}g (40% = ${(loss_macros.carbs * 4).toFixed(0)} kcal)`,
)
console.log(
  `  Fat: ${loss_macros.fat}g (20% = ${(loss_macros.fat * 9).toFixed(0)} kcal)`,
)

// Verify totals
const calculated_total =
  loss_macros.protein * 4 + loss_macros.carbs * 4 + loss_macros.fat * 9
console.log(`  Total: ${Math.round(calculated_total)} kcal ✓`)

// ============================================================================
// EXAMPLE 3: Compare Different Profiles
// ============================================================================

console.log('\n\n👥 EXAMPLE 3: Compare Different Fitness Profiles')
console.log('-'.repeat(80))

const profiles = [
  {
    name: 'Sedentary Office Worker',
    weight: 75,
    height: 175,
    age: 30,
    gender: 'male',
    activity: 'sedentary',
    goal: 'maintenance',
  },
  {
    name: 'Fitness Enthusiast',
    weight: 75,
    height: 175,
    age: 30,
    gender: 'male',
    activity: 'active',
    goal: 'maintenance',
  },
  {
    name: 'Female Weight Loss',
    weight: 65,
    height: 165,
    age: 28,
    gender: 'female',
    activity: 'moderate',
    goal: 'weightLoss',
  },
  {
    name: 'Athlete Bulking',
    weight: 85,
    height: 185,
    age: 25,
    gender: 'male',
    activity: 'veryActive',
    goal: 'weightGain',
  },
]

profiles.forEach((profile) => {
  const bmr = mealPlanService.calculateBMR({
    weight: profile.weight,
    height: profile.height,
    age: profile.age,
    gender: profile.gender,
  })
  const tdee = mealPlanService.calculateTDEE({
    bmr,
    activityLevel: profile.activity,
  })
  const target = mealPlanService.adjustCaloriesForGoal(tdee, profile.goal)

  console.log(`\n${profile.name}`)
  console.log(
    `  BMR: ${Math.round(bmr)} | TDEE: ${Math.round(tdee)} | Target: ${Math.round(target)} cal`,
  )
})

// ============================================================================
// EXAMPLE 4: Meal Calorie Distribution
// ============================================================================

console.log('\n\n🍽️ EXAMPLE 4: Meal Calorie Distribution')
console.log('-'.repeat(80))

const daily_target = 2200

console.log(`Daily Target: ${daily_target} calories`)
console.log(`Meals Per Day: 3 (breakfast, lunch, dinner)`)
console.log(`\nCalorie Distribution:`)
console.log(`  Breakfast (25%): ${Math.round(daily_target * 0.25)} cal`)
console.log(`  Lunch (35%): ${Math.round(daily_target * 0.35)} cal`)
console.log(`  Dinner (30%): ${Math.round(daily_target * 0.3)} cal`)
console.log(`  Snacks (10%): ${Math.round(daily_target * 0.1)} cal (if needed)`)
console.log(`  Total: ${daily_target} cal`)

// ============================================================================
// EXAMPLE 5: Nutrition Validation
// ============================================================================

console.log('\n\n✅ EXAMPLE 5: Nutrition Validation')
console.log('-'.repeat(80))

const actual_nutrition = {
  calories: 2180,
  protein: 162,
  carbs: 218,
  fat: 71,
}

const target_nutrition = {
  calories: 2200,
  protein: 165,
  carbs: 220,
  fat: 73,
}

const validation = mealPlanService.validateNutrition(
  actual_nutrition,
  target_nutrition,
  0.1,
)

console.log(
  `Target:  Calories: ${target_nutrition.calories} | Protein: ${target_nutrition.protein}g | Carbs: ${target_nutrition.carbs}g | Fat: ${target_nutrition.fat}g`,
)
console.log(
  `Actual:  Calories: ${actual_nutrition.calories} | Protein: ${actual_nutrition.protein}g | Carbs: ${actual_nutrition.carbs}g | Fat: ${actual_nutrition.fat}g`,
)
console.log(
  `\nValidation Result: ${validation.isValid ? '✓ VALID' : '✗ INVALID'}`,
)

if (validation.warnings.length > 0) {
  console.log('Warnings:')
  validation.warnings.forEach((w) => console.log(`  ⚠️ ${w}`))
} else {
  console.log('✓ All nutrition targets met!')
}

console.log('\nVariances:')
console.log(
  `  Calories: ${validation.variances.calories > 0 ? '+' : ''}${validation.variances.calories}`,
)
console.log(
  `  Protein: ${validation.variances.protein > 0 ? '+' : ''}${validation.variances.protein}g`,
)
console.log(
  `  Carbs: ${validation.variances.carbs > 0 ? '+' : ''}${validation.variances.carbs}g`,
)
console.log(
  `  Fat: ${validation.variances.fat > 0 ? '+' : ''}${validation.variances.fat}g`,
)

// ============================================================================
// EXAMPLE 6: Generate a Simple 3-Day Plan
// ============================================================================

console.log('\n\n🎯 EXAMPLE 6: Generate a Simple 3-Day Plan')
console.log('-'.repeat(80))

async function generateSamplePlan() {
  try {
    const plan = await mealPlanService.generateMealPlan({
      userId: 'user_example_001',
      planName: 'Example 3-Day Plan',
      duration: 3,
      mealsPerDay: 3,

      // User profile
      weight: 75,
      height: 175,
      age: 30,
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'maintenance',

      // Preferences
      dietType: 'veg',
      allergens: ['dairy'],
    })

    console.log(`✓ Plan Generated Successfully!`)
    console.log(`\nPlan Details:`)
    console.log(`  Name: ${plan.planName}`)
    console.log(`  Duration: ${plan.duration} days`)
    console.log(`  Meals/Day: ${plan.mealsPerDay}`)
    console.log(
      `  Daily Target: ${plan.nutritionTargets.dailyCalories} calories`,
    )

    console.log(`\nDaily Macro Targets:`)
    console.log(`  Protein: ${plan.nutritionTargets.dailyMacros.protein}g`)
    console.log(`  Carbs: ${plan.nutritionTargets.dailyMacros.carbs}g`)
    console.log(`  Fat: ${plan.nutritionTargets.dailyMacros.fat}g`)

    console.log(`\nGenerated Days:`)
    plan.days.forEach((day) => {
      console.log(`\n  Day ${day.dayNumber}:`)
      day.meals.forEach((meal, idx) => {
        const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
        console.log(
          `    ${mealTypes[idx]}: ${meal.name} (${meal.nutrition.calories} cal, ${meal.nutrition.protein}g protein)`,
        )
      })
      console.log(
        `    Daily Total: ${day.totalNutrition.calories} cal | ${day.totalNutrition.protein}g protein | ${day.totalNutrition.carbs}g carbs | ${day.totalNutrition.fat}g fat`,
      )
    })

    console.log(`\nPlan Nutrition Summary:`)
    console.log(`  Total Days: ${plan.nutritionSummary.totalDays}`)
    console.log(
      `  Daily Average: ${plan.nutritionSummary.dailyAverages.calories} calories`,
    )
    console.log(
      `  Macro %: ${plan.nutritionSummary.macroPercentages.proteinPercent}% protein, ${plan.nutritionSummary.macroPercentages.carbsPercent}% carbs, ${plan.nutritionSummary.macroPercentages.fatPercent}% fat`,
    )

    if (plan.warnings.length > 0) {
      console.log(`\nWarnings:`)
      plan.warnings.forEach((w) => console.log(`  ⚠️ ${w}`))
    }
  } catch (error) {
    console.error('✗ Error generating plan:', error.message)
  }
}

// Run the async example
generateSamplePlan()

// ============================================================================
// EXAMPLE 7: Test Error Handling
// ============================================================================

console.log('\n\n🚨 EXAMPLE 7: Error Handling')
console.log('-'.repeat(80))

const errorTests = [
  {
    name: 'Missing userId',
    params: { duration: 7, weight: 80, height: 180, age: 30, gender: 'male' },
  },
  {
    name: 'Invalid duration (31 days)',
    params: {
      userId: 'test',
      duration: 31,
      weight: 80,
      height: 180,
      age: 30,
      gender: 'male',
    },
  },
  {
    name: 'Invalid meals per day (1)',
    params: {
      userId: 'test',
      mealsPerDay: 1,
      weight: 80,
      height: 180,
      age: 30,
      gender: 'male',
    },
  },
  {
    name: 'Invalid gender',
    params: {
      userId: 'test',
      weight: 80,
      height: 180,
      age: 30,
      gender: 'unknown',
    },
  },
]

errorTests.forEach((test) => {
  try {
    mealPlanService.generateMealPlan(test.params)
    console.log(`✗ ${test.name}: Should have thrown error`)
  } catch (error) {
    console.log(`✓ ${test.name}: ${error.message}`)
  }
})

// ============================================================================
// EXAMPLE 8: Compare Macro Splits for Different Goals
// ============================================================================

console.log('\n\n🎯 EXAMPLE 8: Macro Splits by Goal')
console.log('-'.repeat(80))

const goals = ['maintenance', 'weightLoss', 'weightGain', 'aggressive_loss']
const dailyCals = 2000

console.log(`Daily Calories: ${dailyCals}`)
console.log(`\nMacro Splits by Goal:`)

goals.forEach((goal) => {
  const macros = mealPlanService.calculateMacroTargets(dailyCals, goal)
  const percentages = mealPlanService.calculateMacroPercentages({
    calories: dailyCals,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
  })

  console.log(`\n  ${goal.toUpperCase()}`)
  console.log(`  Calories: ${Math.round(dailyCals)}`)
  console.log(`  Protein: ${macros.protein}g (${percentages.proteinPercent}%)`)
  console.log(`  Carbs: ${macros.carbs}g (${percentages.carbsPercent}%)`)
  console.log(`  Fat: ${macros.fat}g (${percentages.fatPercent}%)`)
}

// END OF COMMENTED CODE
*/
//     `    Protein: ${macros.protein}g (${percentages.proteinPercent}%)`,
//   )
//   console.log(`    Carbs: ${macros.carbs}g (${percentages.carbsPercent}%)`)
//   console.log(`    Fat: ${macros.fat}g (${percentages.fatPercent}%)`)
// })

// console.log('\n' + '='.repeat(80))
// console.log('✅ All Examples Completed!')
// console.log('='.repeat(80))
