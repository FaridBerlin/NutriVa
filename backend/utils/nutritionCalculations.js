/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
 */
export const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export const calculateTDEE = (bmr, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,
    'lightly-active': 1.375,
    light: 1.375,
    'moderately-active': 1.55,
    moderate: 1.55,
    'very-active': 1.725,
    active: 1.725,
    'extra-active': 1.9,
    very_active: 1.9,
  }

  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.55))
}

/**
 * Adjust calories based on fitness goal
 */
export const calculateCalories = (tdee, goal) => {
  const adjustments = {
    'weight-loss': -500,
    lose_weight: -500,
    maintenance: 0,
    maintain_weight: 0,
    'weight-gain': 300,
    gain_weight: 300,
    build_muscle: 300,
  }

  return Math.round(tdee + (adjustments[goal] || 0))
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
  return (weight / (height / 100) ** 2).toFixed(1)
}
