//import mealsDB from "../data/mealDatabase.js";

export class MealRotationService {
  constructor(mealsDB) {
    this.mealsDB = mealsDB;

    this.used = {
      breakfast: new Set(),
      lunch: new Set(),
      dinner: new Set(),
      snack: new Set(),
    };
  }

  // Get meals not used yet in this rotation
  getAvailableMeals(type) {
    return this.mealsDB[type].filter(
      (meal) => !this.used[type].has(meal.id)
    );
  }

  // Mark a meal as used
  markUsed(type, mealId) {
    this.used[type].add(mealId);
  }

  // Reset rotation if all meals have been used
  resetIfExhausted(type) {
    const totalMeals = this.mealsDB[type].length;
    const usedMeals = this.used[type].size;

    if (usedMeals >= totalMeals) {
      this.used[type].clear();
    }
  }

  // Pick a random meal from available meals
  pickRandomMeal(type) {
    this.resetIfExhausted(type);

    const available = this.getAvailableMeals(type);

    if (available.length === 0) {
      // Safeguard, should rarely happen
      return null;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];

    this.markUsed(type, chosen.id);

    return chosen;
  }
}

/*   

mealRotationService.js (service for variety & no-repeat)


export class MealRotationService {
  constructor(mealsDB) {
    this.mealsDB = mealsDB; 
    // track used meal IDs per type
    this.used = { breakfast: new Set(), lunch: new Set(), dinner: new Set(), snack: new Set() };
  }

  getRandomMeal(type, excludeIds = []) {
    // Filter meals by type and exclude used or explicitly excluded IDs
    let available = this.mealsDB.filter(
      meal => meal.type === type && !this.used[type].has(meal.id) && !excludeIds.includes(meal.id)
    );

    // Edge case: all meals used → reset to allow repeats
    if (available.length === 0) {
      this.used[type].clear();
      available = this.mealsDB.filter(
        meal => meal.type === type && !excludeIds.includes(meal.id)
      );
    }

    // Randomly pick one
    const choice = available[Math.floor(Math.random() * available.length)];
    this.used[type].add(choice.id);
    return choice;
  }
}
*/
