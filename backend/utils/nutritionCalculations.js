export const calculateBMR = ({ weight, height, age, gender }) => {
  let bmr;
  if (gender.toLowerCase() === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return Math.round(bmr);
};
export const calculateTDEE = ({ bmr, activityLevel }) => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.5));
};
export const calculateMacros = (tdee, dietType = "balanced") => {
  if (dietType === "high-protein") {
    return {
      protein: Math.round((tdee * 0.35) / 4),
      carbs: Math.round((tdee * 0.45) / 4),
      fat: Math.round((tdee * 0.2) / 9),
    };
  }
  return {
    protein: Math.round((tdee * 0.25) / 4),
    carbs: Math.round((tdee * 0.5) / 4),
    fat: Math.round((tdee * 0.25) / 9),
  };
};
export const calculateBMI = (weight, height) => {
  return (weight / (height / 100) ** 2).toFixed(1);
};
