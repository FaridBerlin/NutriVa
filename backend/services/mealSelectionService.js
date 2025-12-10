import mealsDB from "../data/mealDatabase.js";

// import MealRotationService from "../services/mealRotationService.js";
// import mealsDB from "../data/mealDatabase.js";

// const rotation = new MealRotationService(mealsDB);

export function selectMealsForDay(params) {
  const {
    dailyCalories,
    dietType,
    allergens = [],
    excludeMealIds = [],
    cuisinePreference,
  } = params;

  const calorieDistribution = {
    breakfast: dailyCalories * 0.25,
    lunch: dailyCalories * 0.35,
    dinner: dailyCalories * 0.35,
    snack: dailyCalories * 0.05,
  };

  function filterMeals(type) {
    return mealsDB[type]
      .filter((meal) =>
        !excludeMealIds.includes(meal.id)
      )
      .filter((meal) =>
        dietType === "veg" ? meal.isVeg :
        dietType === "vegan" ? meal.isVegan :
        true
      )
      .filter((meal) =>
        allergens.length === 0 ||
        !meal.allergens.some(a => allergens.includes(a))
      )
      .filter((meal) =>
        cuisinePreference ? meal.cuisine === cuisinePreference : true
      );
  }

  function pickMeal(type, targetCalories) {
    const tolerance = 50;
    const min = targetCalories - tolerance;
    const max = targetCalories + tolerance;

    const availableMeals = filterMeals(type)
      .filter(m => m.calories >= min && m.calories <= max);

    if (availableMeals.length === 0) return null;

    // random choice to avoid repetition
    return availableMeals[Math.floor(Math.random() * availableMeals.length)];
  }


//   function pickMeal(type, targetCalories) {
//   const tolerance = 50;
//   const min = targetCalories - tolerance;
//   const max = targetCalories + tolerance;

//   // Meals matching user rules
//   const filtered = filterMeals(type).filter(
//     (m) => m.calories >= min && m.calories <= max
//   );

//   // If filtered meals exist → random choice (variety)
//   if (filtered.length > 0) {
//     // Shuffle
//     const shuffled = filtered.sort(() => Math.random() - 0.5);

//     const meal = shuffled[0];
//     rotation.markUsed(type, meal.id);

//     return meal;
//   }

//   // If no filtered meals → fall back to rotation system
//   return rotation.pickRandomMeal(type);
// }




  const breakfast = pickMeal("breakfast", calorieDistribution.breakfast);
  const lunch = pickMeal("lunch", calorieDistribution.lunch);
  const dinner = pickMeal("dinner", calorieDistribution.dinner);
  const snack = pickMeal("snack", calorieDistribution.snack);

  const totalCalories =
    (breakfast?.calories || 0) +
    (lunch?.calories || 0) +
    (dinner?.calories || 0) +
    (snack?.calories || 0);

  return {
    breakfast,
    lunch,
    dinner,
    snack,
    totalCalories,
  };
}




/*
mealSelectionService.js (daily meal selection)

const rotationService = new MealRotationService(mealsDB);
export function selectMealsForDay(params) {
  const { dailyCalories, mealsPerDay, dietType, allergens, excludeMealIds = [], cuisinePreference } = params;

  const calorieDistribution = {
    breakfast: dailyCalories * 0.25,
    lunch: dailyCalories * 0.35,
    dinner: dailyCalories * 0.35,
    snack: dailyCalories * 0.05,
  };

  const mealTypes = ["breakfast", "lunch", "dinner"];
  if (mealsPerDay === 4) mealTypes.push("snack");

  const selectedMeals = {};

  mealTypes.forEach(type => {
    let meal;
    // try selecting a meal that matches calorie target ±50 and other filters
    for (let i = 0; i < 10; i++) { // try 10 times before giving up
      const candidate = rotationService.getRandomMeal(type, excludeMealIds);
      if (
        candidate.calories >= calorieDistribution[type] - 50 &&
        candidate.calories <= calorieDistribution[type] + 50 &&
        (!dietType || candidate.dietType === dietType) &&
        (!cuisinePreference || candidate.cuisine === cuisinePreference) &&
        !candidate.allergens.some(a => allergens.includes(a))
      ) {
        meal = candidate;
        break;
      }
    }
    // fallback if no match found
    if (!meal) meal = rotationService.getRandomMeal(type, excludeMealIds);
    selectedMeals[type] = meal;
  });

  return selectedMeals;
}
*/

