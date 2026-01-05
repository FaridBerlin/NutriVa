/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
 */

// export const calculateBMR = (weight, height, age, gender) => {
//   if (gender === 'male') {
//     return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
//   } else {
//     return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
//   }
// }

export const calculateBMR = ({ weight, height, age, gender }) => {
  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(height) ||
    !Number.isFinite(age)
  ) {
    throw new Error('Invalid data for BMR calculation')
  }

  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
  }

  return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */

// export const calculateTDEE = (bmr, activityLevel) => {
//   const activityMultipliers = {
//     sedentary: 1.2,
//     'lightly-active': 1.375,
//     light: 1.375,
//     'moderately-active': 1.55,
//     moderate: 1.55,
//     'very-active': 1.725,
//     active: 1.725,
//     'extra-active': 1.9,
//     very_active: 1.9,
//   }

//   return Math.round(bmr * (activityMultipliers[activityLevel] || 1.55))
// }

export const calculateTDEE = ({ bmr, activityLevel }) => {
  if (!Number.isFinite(bmr)) {
    throw new Error('Invalid BMR for TDEE calculation')
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    'lightly-active': 1.375,
    moderate: 1.55,
    'moderately-active': 1.55,
    active: 1.725,
    'very-active': 1.725,
    very_active: 1.9,
    'extra-active': 1.9,
  }

  const multiplier = activityMultipliers[activityLevel]

  if (!multiplier) {
    throw new Error(`Invalid activity level: ${activityLevel}`)
  }

  return Math.round(bmr * multiplier)
}

/**
 * Adjust calories based on fitness goal
 */
export const calculateCalories = (tdee, goal) => {
  if (!Number.isFinite(tdee)) {
    throw new Error('Invalid TDEE for calorie calculation')
  }

  const adjustments = {
    'weight-loss': -500,
    lose_weight: -500,
    maintenance: 0,
    maintain_weight: 0,
    'weight-gain': 300,
    gain_weight: 300,
    build_muscle: 400, // Higher surplus for muscle building
  }

  const adjustment = adjustments[goal]
  if (adjustment === undefined) {
    throw new Error(`Invalid dietary goal: ${goal}`)
  }

  const calories = Math.round(tdee + adjustment)

  if (!Number.isFinite(calories) || calories <= 0) {
    throw new Error('Invalid daily calorie result')
  }

  return calories
}

/**
 * Calculate macro distribution
 */
export const calculateMacros = (calories, weight, goal) => {
  let proteinPerKg, fatPercent

  switch (goal) {
    case 'weight-loss':
    case 'lose_weight':
      proteinPerKg = 2.0
      fatPercent = 0.25
      break
    case 'weight-gain':
    case 'gain_weight':
    case 'build_muscle':
      proteinPerKg = 1.8
      fatPercent = 0.3
      break
    default:
      proteinPerKg = 1.6
      fatPercent = 0.28
  }

  const protein = Math.round(weight * proteinPerKg)
  const fat = Math.round((calories * fatPercent) / 9)
  const carbs = Math.round((calories - (protein * 4 + fat * 9)) / 4)

  return { protein, carbs, fat }
}

/**
 * Calculate BMI
 */
export const calculateBMI = (weight, height) => {
  if (!Number.isFinite(weight) || !Number.isFinite(height) || height <= 0) {
    throw new Error('Invalid data for BMI calculation')
  }

  const bmi = weight / (height / 100) ** 2
  return parseFloat(bmi.toFixed(1))
}
