export const calculateBMR = ({ weight, height, age, gender }) => {
  let bmr
  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }
  return Math.round(bmr)
}
export const calculateTDEE = ({ bmr, activityLevel }) => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }
  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.5))
}
export const calculateBMI = (weight, height) => {
  return (weight / (height / 100) ** 2).toFixed(1)
}

export const bmiPercent = (bmi, min = 12, max = 40) => {
  if (bmi === undefined || bmi === null || Number.isNaN(Number(bmi))) return 0
  const val = Number(bmi)
  const pct = ((val - min) / (max - min)) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

export const bmiCategory = (bmi) => {
  if (bmi === undefined || bmi === null || Number.isNaN(Number(bmi)))
    return 'N/A'
  const val = Number(bmi)
  if (val < 18.5) return 'Underweight'
  if (val < 25) return 'Healthy'
  if (val < 30) return 'Overweight'
  return 'Obese'
}
