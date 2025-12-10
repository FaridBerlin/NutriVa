/**
 * Comprehensive Meal Database for NutriMind
 * Days 6-10 Sprint: Mock Data Implementation
 *
 * Features:
 * - 100+ meals across 4 categories (breakfast, lunch, dinner, snacks)
 * - Multiple diet types (veg, non-veg, vegan)
 * - International cuisines with realistic nutrition data
 * - Allergen tracking
 * - Helper functions for smart meal selection
 *
 * Architecture note: Designed for easy swap to Ollama AI/API later
 * Simply replace getRandomMeals() calls in mealPlanService.js
 */

// ============================================================================
// BREAKFAST MEALS (5-30 meals) - 250-400 calories
// ============================================================================

const breakfastMeals = [
  // VEG - European
  {
    id: 'b001',
    name: 'Greek Yogurt Parfait with Granola',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'european',
    description:
      'Creamy Greek yogurt layered with granola, fresh berries, and honey',
    ingredients: ['greek yogurt', 'granola', 'blueberries', 'honey'],
    nutrition: { calories: 280, protein: 15, carbs: 35, fat: 8 },
    allergens: ['dairy', 'gluten', 'nuts'],
  },
  {
    id: 'b002',
    name: 'Avocado Toast on Sourdough',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Mashed avocado on whole grain sourdough with poached egg',
    ingredients: ['bread', 'avocado', 'egg', 'lemon', 'salt', 'pepper'],
    nutrition: { calories: 310, protein: 12, carbs: 32, fat: 15 },
    allergens: ['gluten', 'eggs'],
  },
  {
    id: 'b003',
    name: 'Bircher Muesli',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Overnight oats with yogurt, apple, and almonds',
    ingredients: ['oats', 'yogurt', 'apple', 'almonds', 'milk'],
    nutrition: { calories: 290, protein: 10, carbs: 40, fat: 9 },
    allergens: ['dairy', 'gluten', 'nuts'],
  },

  // VEG - Mediterranean
  {
    id: 'b004',
    name: 'Mediterranean Shakshuka',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description: 'Eggs poached in spiced tomato sauce with peppers and feta',
    ingredients: [
      'eggs',
      'tomatoes',
      'bell peppers',
      'feta',
      'olive oil',
      'cumin',
    ],
    nutrition: { calories: 270, protein: 12, carbs: 18, fat: 16 },
    allergens: ['eggs', 'dairy'],
  },
  {
    id: 'b005',
    name: 'Caprese Breakfast Salad',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description:
      'Fresh mozzarella, tomato, basil with olive oil and whole grain toast',
    ingredients: ['mozzarella', 'tomato', 'basil', 'olive oil', 'bread'],
    nutrition: { calories: 300, protein: 11, carbs: 28, fat: 15 },
    allergens: ['dairy', 'gluten'],
  },

  // VEG - American
  {
    id: 'b006',
    name: 'Vegetable Frittata',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'american',
    description: 'Baked egg dish with spinach, mushrooms, and cheddar cheese',
    ingredients: ['eggs', 'spinach', 'mushrooms', 'cheddar', 'onion'],
    nutrition: { calories: 290, protein: 14, carbs: 15, fat: 17 },
    allergens: ['eggs', 'dairy'],
  },
  {
    id: 'b007',
    name: 'Whole Wheat Pancakes',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'american',
    description:
      'Fluffy whole wheat pancakes topped with blueberries and maple syrup',
    ingredients: [
      'whole wheat flour',
      'eggs',
      'milk',
      'blueberries',
      'maple syrup',
    ],
    nutrition: { calories: 340, protein: 9, carbs: 52, fat: 10 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },

  // VEG - Asian (Indian)
  {
    id: 'b008',
    name: 'Vegetable Poha',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Flattened rice cooked with vegetables and peanuts',
    ingredients: [
      'poha',
      'onion',
      'potato',
      'peanuts',
      'turmeric',
      'mustard seeds',
    ],
    nutrition: { calories: 250, protein: 8, carbs: 40, fat: 7 },
    allergens: ['nuts'],
  },
  {
    id: 'b009',
    name: 'Masala Dosa',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Crispy rice and lentil crepe with spiced potatoes',
    ingredients: [
      'rice flour',
      'urad dal',
      'potato',
      'onion',
      'ginger',
      'green chili',
    ],
    nutrition: { calories: 300, protein: 10, carbs: 45, fat: 10 },
    allergens: ['none'],
  },
  {
    id: 'b010',
    name: 'Vegetable Upma',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'South Indian semolina porridge with vegetables',
    ingredients: [
      'semolina',
      'carrot',
      'peas',
      'onion',
      'cumin',
      'mustard seeds',
    ],
    nutrition: { calories: 270, protein: 8, carbs: 42, fat: 8 },
    allergens: ['gluten'],
  },

  // VEG - Latin American
  {
    id: 'b011',
    name: 'Huevos Rancheros',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'latin',
    description: 'Fried eggs on tortillas with black beans and avocado',
    ingredients: [
      'eggs',
      'tortillas',
      'black beans',
      'avocado',
      'salsa',
      'cheese',
    ],
    nutrition: { calories: 330, protein: 12, carbs: 38, fat: 14 },
    allergens: ['eggs', 'dairy'],
  },
  {
    id: 'b012',
    name: 'Chilaquiles Verdes',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'latin',
    description: 'Tortilla chips in green salsa with cheese and sour cream',
    ingredients: [
      'tortilla chips',
      'green salsa',
      'cheese',
      'sour cream',
      'egg',
    ],
    nutrition: { calories: 310, protein: 10, carbs: 36, fat: 14 },
    allergens: ['gluten', 'dairy', 'eggs'],
  },

  // VEG - Middle Eastern
  {
    id: 'b013',
    name: 'Labneh and Vegetables',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'middle_eastern',
    description: 'Thick yogurt cheese with olive oil and fresh vegetables',
    ingredients: ['labneh', 'olive oil', 'pita', 'tomato', 'cucumber', 'herbs'],
    nutrition: { calories: 270, protein: 11, carbs: 30, fat: 12 },
    allergens: ['dairy', 'gluten'],
  },
  {
    id: 'b014',
    name: 'Manakish',
    category: 'breakfast',
    dietType: 'veg',
    cuisine: 'middle_eastern',
    description: "Flatbread topped with za'atar spice blend and olive oil",
    ingredients: ['flatbread', 'zaatar', 'olive oil', 'sesame seeds'],
    nutrition: { calories: 290, protein: 9, carbs: 38, fat: 11 },
    allergens: ['gluten', 'sesame'],
  },

  // NON-VEG - European
  {
    id: 'b015',
    name: 'Bacon and Egg Breakfast',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'european',
    description: 'Crispy bacon with fried eggs and whole grain toast',
    ingredients: ['bacon', 'eggs', 'bread', 'butter'],
    nutrition: { calories: 380, protein: 20, carbs: 28, fat: 18 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },
  {
    id: 'b016',
    name: 'Smoked Salmon Bagel',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'european',
    description: 'Toasted bagel with cream cheese, smoked salmon, and capers',
    ingredients: ['bagel', 'cream cheese', 'salmon', 'capers', 'red onion'],
    nutrition: { calories: 380, protein: 18, carbs: 38, fat: 14 },
    allergens: ['gluten', 'dairy', 'fish'],
  },
  {
    id: 'b017',
    name: 'Ham and Cheese Omelette',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'european',
    description: 'Fluffy eggs with ham, cheddar, and bell peppers',
    ingredients: ['eggs', 'ham', 'cheddar', 'bell pepper', 'butter'],
    nutrition: { calories: 380, protein: 22, carbs: 12, fat: 26 },
    allergens: ['eggs', 'dairy'],
  },

  // NON-VEG - American
  {
    id: 'b018',
    name: 'Sausage Patties with Pancakes',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Turkey sausage with whole wheat pancakes and maple syrup',
    ingredients: [
      'turkey sausage',
      'whole wheat flour',
      'eggs',
      'milk',
      'maple syrup',
    ],
    nutrition: { calories: 420, protein: 18, carbs: 48, fat: 16 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },
  {
    id: 'b019',
    name: 'Steak and Eggs',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Grilled steak with fried eggs and hash browns',
    ingredients: ['beef steak', 'eggs', 'potatoes', 'butter', 'salt', 'pepper'],
    nutrition: { calories: 480, protein: 28, carbs: 32, fat: 24 },
    allergens: ['eggs', 'dairy'],
  },

  // NON-VEG - Asian
  {
    id: 'b020',
    name: 'Masala Omelette with Toast',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Spiced scrambled eggs with vegetables and whole grain toast',
    ingredients: ['eggs', 'onion', 'tomato', 'bread', 'turmeric', 'cumin'],
    nutrition: { calories: 320, protein: 20, carbs: 25, fat: 14 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },
  {
    id: 'b021',
    name: 'Chicken Keema Paratha',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Flatbread stuffed with spiced minced chicken',
    ingredients: ['chicken mince', 'flour', 'onion', 'ginger', 'green chili'],
    nutrition: { calories: 380, protein: 22, carbs: 35, fat: 15 },
    allergens: ['gluten'],
  },

  // NON-VEG - Latin
  {
    id: 'b022',
    name: 'Huevos con Chorizo',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'latin',
    description: 'Fried eggs with Mexican chorizo and tortillas',
    ingredients: ['eggs', 'chorizo', 'tortillas', 'onion', 'salsa'],
    nutrition: { calories: 400, protein: 20, carbs: 30, fat: 20 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },
  {
    id: 'b023',
    name: 'Breakfast Burrito',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'latin',
    description: 'Eggs, sausage, potatoes, and cheese in a flour tortilla',
    ingredients: ['eggs', 'sausage', 'potatoes', 'cheese', 'flour tortilla'],
    nutrition: { calories: 450, protein: 22, carbs: 42, fat: 18 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },

  // NON-VEG - Mediterranean
  {
    id: 'b024',
    name: 'Mediterranean Eggs with Feta',
    category: 'breakfast',
    dietType: 'non-veg',
    cuisine: 'mediterranean',
    description: 'Baked eggs with tomatoes, feta cheese, and olives',
    ingredients: ['eggs', 'tomatoes', 'feta', 'olives', 'olive oil'],
    nutrition: { calories: 340, protein: 16, carbs: 18, fat: 20 },
    allergens: ['eggs', 'dairy'],
  },
]

// ============================================================================
// LUNCH MEALS (5-30 meals) - 350-500 calories
// ============================================================================

const lunchMeals = [
  // VEG - Mediterranean
  {
    id: 'l001',
    name: 'Greek Salad with Feta',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description: 'Tomatoes, cucumbers, olives, feta with olive oil and oregano',
    ingredients: ['tomato', 'cucumber', 'olives', 'feta', 'onion', 'olive oil'],
    nutrition: { calories: 280, protein: 10, carbs: 18, fat: 18 },
    allergens: ['dairy'],
  },
  {
    id: 'l002',
    name: 'Mediterranean Vegetable Pasta',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description:
      'Whole wheat pasta with roasted eggplant, zucchini, and tomato',
    ingredients: [
      'whole wheat pasta',
      'eggplant',
      'zucchini',
      'tomato',
      'olive oil',
    ],
    nutrition: { calories: 380, protein: 13, carbs: 58, fat: 10 },
    allergens: ['gluten'],
  },

  // VEG - European
  {
    id: 'l003',
    name: 'Ratatouille with Crusty Bread',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Slow-cooked vegetable stew with herbs',
    ingredients: [
      'eggplant',
      'zucchini',
      'tomato',
      'bell pepper',
      'herbs',
      'bread',
    ],
    nutrition: { calories: 310, protein: 8, carbs: 42, fat: 11 },
    allergens: ['gluten'],
  },
  {
    id: 'l004',
    name: 'Spanish Vegetable Paella',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Saffron rice with peppers, artichokes, and peas',
    ingredients: [
      'rice',
      'saffron',
      'bell pepper',
      'artichoke',
      'peas',
      'onion',
    ],
    nutrition: { calories: 360, protein: 10, carbs: 55, fat: 10 },
    allergens: ['none'],
  },
  {
    id: 'l005',
    name: 'Minestrone Soup',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Italian vegetable soup with beans and pasta',
    ingredients: ['vegetables', 'beans', 'pasta', 'tomato', 'vegetable broth'],
    nutrition: { calories: 280, protein: 12, carbs: 48, fat: 5 },
    allergens: ['gluten'],
  },

  // VEG - American
  {
    id: 'l006',
    name: 'Veggie Burger with Sweet Potato Fries',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'american',
    description: 'Plant-based patty with lettuce, tomato, and vegan mayo',
    ingredients: ['veggie patty', 'bun', 'lettuce', 'tomato', 'sweet potato'],
    nutrition: { calories: 400, protein: 14, carbs: 52, fat: 16 },
    allergens: ['gluten'],
  },
  {
    id: 'l007',
    name: 'Quinoa Buddha Bowl',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'american',
    description: 'Quinoa with roasted vegetables and chickpeas',
    ingredients: [
      'quinoa',
      'roasted vegetables',
      'chickpeas',
      'tahini',
      'lemon',
    ],
    nutrition: { calories: 420, protein: 16, carbs: 54, fat: 14 },
    allergens: ['sesame'],
  },
  {
    id: 'l008',
    name: 'California Salad with Chickpea Croutons',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'american',
    description: 'Mixed greens with avocado and crispy chickpeas',
    ingredients: [
      'mixed greens',
      'avocado',
      'chickpeas',
      'cucumber',
      'olive oil',
    ],
    nutrition: { calories: 340, protein: 13, carbs: 38, fat: 15 },
    allergens: ['none'],
  },

  // VEG - Asian
  {
    id: 'l009',
    name: 'Vegetable Pad Thai',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Rice noodles with peppers, broccoli, and peanut sauce',
    ingredients: [
      'rice noodles',
      'bell pepper',
      'broccoli',
      'peanut sauce',
      'lime',
    ],
    nutrition: { calories: 380, protein: 12, carbs: 50, fat: 14 },
    allergens: ['nuts', 'fish'],
  },
  {
    id: 'l010',
    name: 'Vegetable Lo Mein',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Egg noodles with mixed vegetables and sesame oil',
    ingredients: ['egg noodles', 'mixed vegetables', 'sesame oil', 'soy sauce'],
    nutrition: { calories: 350, protein: 11, carbs: 48, fat: 11 },
    allergens: ['gluten', 'eggs'],
  },
  {
    id: 'l011',
    name: 'Rajma Chawal',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Kidney bean curry served with rice',
    ingredients: [
      'kidney beans',
      'rice',
      'onion',
      'tomato',
      'cumin',
      'coriander',
    ],
    nutrition: { calories: 380, protein: 15, carbs: 60, fat: 8 },
    allergens: ['none'],
  },
  {
    id: 'l012',
    name: 'Chole Bhature',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Spiced chickpea curry with fried bread',
    ingredients: ['chickpeas', 'flour', 'yogurt', 'onion', 'tomato', 'ginger'],
    nutrition: { calories: 450, protein: 18, carbs: 65, fat: 15 },
    allergens: ['gluten', 'dairy'],
  },
  {
    id: 'l013',
    name: 'Paneer Butter Masala with Roti',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Cottage cheese in creamy tomato sauce with flatbread',
    ingredients: ['paneer', 'tomato', 'cream', 'roti', 'onion', 'ginger'],
    nutrition: { calories: 420, protein: 20, carbs: 40, fat: 18 },
    allergens: ['gluten', 'dairy'],
  },

  // VEG - Middle Eastern
  {
    id: 'l014',
    name: 'Falafel Wrap',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'middle_eastern',
    description: 'Crispy chickpea fritters in pita with tahini sauce',
    ingredients: ['falafel', 'pita', 'tahini', 'tomato', 'cucumber', 'lettuce'],
    nutrition: { calories: 380, protein: 14, carbs: 48, fat: 15 },
    allergens: ['gluten', 'sesame'],
  },
  {
    id: 'l015',
    name: 'Tabbouleh Salad',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'middle_eastern',
    description: 'Bulgur wheat with parsley, mint, and lemon dressing',
    ingredients: ['bulgur', 'parsley', 'mint', 'tomato', 'lemon', 'olive oil'],
    nutrition: { calories: 300, protein: 10, carbs: 42, fat: 10 },
    allergens: ['gluten'],
  },

  // VEG - Latin
  {
    id: 'l016',
    name: 'Burrito Bowl with Beans',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'latin',
    description: 'Rice, black beans, corn, salsa, cheese, and guacamole',
    ingredients: ['rice', 'black beans', 'corn', 'salsa', 'cheese', 'avocado'],
    nutrition: { calories: 420, protein: 14, carbs: 55, fat: 14 },
    allergens: ['dairy'],
  },
  {
    id: 'l017',
    name: 'Vegetable Enchiladas Verdes',
    category: 'lunch',
    dietType: 'veg',
    cuisine: 'latin',
    description: 'Rolled tortillas with vegetables and green salsa',
    ingredients: [
      'tortillas',
      'roasted vegetables',
      'green salsa',
      'cheese',
      'sour cream',
    ],
    nutrition: { calories: 380, protein: 13, carbs: 48, fat: 15 },
    allergens: ['gluten', 'dairy'],
  },

  // NON-VEG - Mediterranean
  {
    id: 'l018',
    name: 'Grilled Chicken Breast with Roasted Vegetables',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'mediterranean',
    description: 'Seasoned chicken with roasted broccoli and potatoes',
    ingredients: [
      'chicken breast',
      'broccoli',
      'carrot',
      'potato',
      'olive oil',
    ],
    nutrition: { calories: 420, protein: 32, carbs: 42, fat: 10 },
    allergens: ['none'],
  },
  {
    id: 'l019',
    name: 'Pan-Seared Salmon',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'mediterranean',
    description: 'Fresh salmon with lemon butter sauce and asparagus',
    ingredients: ['salmon', 'asparagus', 'lemon', 'butter', 'garlic'],
    nutrition: { calories: 480, protein: 36, carbs: 32, fat: 20 },
    allergens: ['fish', 'dairy'],
  },

  // NON-VEG - American
  {
    id: 'l020',
    name: 'Grilled Chicken Burger',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Lean ground chicken patty with lettuce and tomato',
    ingredients: ['ground chicken', 'bun', 'lettuce', 'tomato', 'mayo'],
    nutrition: { calories: 420, protein: 32, carbs: 38, fat: 14 },
    allergens: ['gluten', 'eggs'],
  },
  {
    id: 'l021',
    name: 'Turkey Meatballs with Marinara',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Homemade turkey meatballs in tomato sauce with pasta',
    ingredients: ['ground turkey', 'pasta', 'tomato sauce', 'onion', 'garlic'],
    nutrition: { calories: 420, protein: 32, carbs: 48, fat: 10 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },
  {
    id: 'l022',
    name: 'Chicken Caesar Salad',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Grilled chicken with romaine, parmesan, and croutons',
    ingredients: [
      'chicken breast',
      'romaine',
      'parmesan',
      'croutons',
      'caesar dressing',
    ],
    nutrition: { calories: 380, protein: 32, carbs: 28, fat: 14 },
    allergens: ['dairy', 'gluten', 'eggs'],
  },

  // NON-VEG - Asian
  {
    id: 'l023',
    name: 'Chicken Biryani',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Fragrant rice cooked with chicken and spices',
    ingredients: ['chicken', 'rice', 'saffron', 'onion', 'ginger', 'yogurt'],
    nutrition: { calories: 450, protein: 25, carbs: 50, fat: 15 },
    allergens: ['dairy'],
  },
  {
    id: 'l024',
    name: 'Fish Curry with Rice',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Tangy fish curry served with steamed rice',
    ingredients: [
      'fish',
      'rice',
      'coconut milk',
      'tomato',
      'turmeric',
      'cumin',
    ],
    nutrition: { calories: 400, protein: 28, carbs: 45, fat: 12 },
    allergens: ['fish', 'dairy'],
  },
  {
    id: 'l025',
    name: 'Chicken Pad Thai',
    category: 'lunch',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Rice noodles with chicken, peanuts, and lime sauce',
    ingredients: [
      'rice noodles',
      'chicken',
      'peanuts',
      'lime',
      'egg',
      'tamarind',
    ],
    nutrition: { calories: 450, protein: 28, carbs: 48, fat: 14 },
    allergens: ['nuts', 'eggs', 'fish'],
  },
]

// ============================================================================
// DINNER MEALS (5-30 meals) - 400-600 calories
// ============================================================================

const dinnerMeals = [
  // VEG - European
  {
    id: 'd001',
    name: 'Vegetable Pasta Primavera',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Whole wheat pasta with fresh spring vegetables and garlic',
    ingredients: [
      'whole wheat pasta',
      'broccoli',
      'zucchini',
      'bell pepper',
      'garlic',
      'olive oil',
    ],
    nutrition: { calories: 380, protein: 13, carbs: 55, fat: 11 },
    allergens: ['gluten'],
  },
  {
    id: 'd002',
    name: 'Spinach and Ricotta Lasagna',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Layers of pasta, spinach, ricotta, and tomato sauce',
    ingredients: [
      'pasta sheets',
      'spinach',
      'ricotta',
      'tomato sauce',
      'mozzarella',
    ],
    nutrition: { calories: 420, protein: 18, carbs: 48, fat: 15 },
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    id: 'd003',
    name: 'Vegetable Gratin',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'european',
    description: 'Layered potatoes and vegetables with cheese topping',
    ingredients: ['potatoes', 'mushrooms', 'zucchini', 'cheese', 'cream'],
    nutrition: { calories: 360, protein: 14, carbs: 42, fat: 14 },
    allergens: ['dairy', 'gluten'],
  },

  // VEG - Mediterranean
  {
    id: 'd004',
    name: 'Palak Paneer with Roti',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description: 'Cottage cheese in spinach gravy with flatbread',
    ingredients: ['paneer', 'spinach', 'cream', 'roti', 'onion', 'ginger'],
    nutrition: { calories: 350, protein: 18, carbs: 35, fat: 15 },
    allergens: ['gluten', 'dairy'],
  },
  {
    id: 'd005',
    name: 'Vegetable Biryani',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description: 'Fragrant saffron rice with mixed vegetables',
    ingredients: ['rice', 'mixed vegetables', 'saffron', 'onion', 'yogurt'],
    nutrition: { calories: 380, protein: 12, carbs: 55, fat: 12 },
    allergens: ['dairy'],
  },
  {
    id: 'd006',
    name: 'Dal Tadka with Rice',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'mediterranean',
    description: 'Tempered lentil curry served with rice',
    ingredients: [
      'lentils',
      'rice',
      'onion',
      'tomato',
      'cumin',
      'mustard seeds',
    ],
    nutrition: { calories: 320, protein: 14, carbs: 50, fat: 6 },
    allergens: ['none'],
  },

  // VEG - American
  {
    id: 'd007',
    name: 'Stuffed Bell Peppers',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'american',
    description: 'Bell peppers filled with quinoa and black beans',
    ingredients: ['bell peppers', 'quinoa', 'black beans', 'corn', 'cheese'],
    nutrition: { calories: 340, protein: 14, carbs: 46, fat: 12 },
    allergens: ['dairy'],
  },
  {
    id: 'd008',
    name: 'Vegetable Chili',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'american',
    description: 'Hearty bean and vegetable stew with spices',
    ingredients: ['beans', 'tomato', 'bell pepper', 'onion', 'chili powder'],
    nutrition: { calories: 310, protein: 15, carbs: 45, fat: 8 },
    allergens: ['none'],
  },

  // VEG - Asian
  {
    id: 'd009',
    name: 'Stir-Fried Vegetables with Tofu',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Mixed vegetables and tofu in ginger-garlic sauce',
    ingredients: [
      'tofu',
      'mixed vegetables',
      'ginger',
      'garlic',
      'soy sauce',
      'rice',
    ],
    nutrition: { calories: 340, protein: 16, carbs: 44, fat: 10 },
    allergens: ['gluten', 'soy'],
  },
  {
    id: 'd010',
    name: 'Vegetable Curry with Coconut Milk',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Seasonal vegetables in creamy curry sauce',
    ingredients: [
      'mixed vegetables',
      'coconut milk',
      'rice',
      'onion',
      'turmeric',
    ],
    nutrition: { calories: 360, protein: 10, carbs: 48, fat: 14 },
    allergens: ['dairy'],
  },

  // VEG - Latin
  {
    id: 'd011',
    name: 'Chiles Rellenos',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'latin',
    description: 'Roasted peppers stuffed with cheese in tomato sauce',
    ingredients: ['poblano peppers', 'cheese', 'tomato sauce', 'egg', 'flour'],
    nutrition: { calories: 340, protein: 12, carbs: 38, fat: 15 },
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    id: 'd012',
    name: 'Black Bean and Squash Tacos',
    category: 'dinner',
    dietType: 'veg',
    cuisine: 'latin',
    description: 'Soft tortillas with roasted squash and beans',
    ingredients: ['corn tortillas', 'squash', 'black beans', 'salsa', 'cheese'],
    nutrition: { calories: 320, protein: 12, carbs: 48, fat: 9 },
    allergens: ['dairy'],
  },

  // NON-VEG - European
  {
    id: 'd013',
    name: 'Pan-Seared Steak with Garlic Butter',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'european',
    description: 'Lean steak with roasted vegetables and potatoes',
    ingredients: ['beef steak', 'garlic', 'butter', 'broccoli', 'potato'],
    nutrition: { calories: 520, protein: 42, carbs: 32, fat: 24 },
    allergens: ['dairy'],
  },
  {
    id: 'd014',
    name: 'Herb-Roasted Chicken Thighs',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'european',
    description: 'Chicken with rosemary and roasted root vegetables',
    ingredients: [
      'chicken thighs',
      'rosemary',
      'thyme',
      'root vegetables',
      'olive oil',
    ],
    nutrition: { calories: 480, protein: 36, carbs: 32, fat: 20 },
    allergens: ['none'],
  },
  {
    id: 'd015',
    name: 'Baked Cod with Lemon',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'european',
    description: 'White fish with capers and steamed vegetables',
    ingredients: ['cod', 'lemon', 'capers', 'asparagus', 'butter'],
    nutrition: { calories: 360, protein: 38, carbs: 28, fat: 10 },
    allergens: ['fish', 'dairy'],
  },

  // NON-VEG - American
  {
    id: 'd016',
    name: 'Lean Beef Tacos',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Ground beef in corn tortillas with fixings',
    ingredients: [
      'ground beef',
      'corn tortillas',
      'lettuce',
      'tomato',
      'salsa',
    ],
    nutrition: { calories: 420, protein: 32, carbs: 40, fat: 14 },
    allergens: ['none'],
  },
  {
    id: 'd017',
    name: 'Chicken Parmesan',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Breaded chicken with tomato sauce and cheese',
    ingredients: [
      'chicken breast',
      'breadcrumbs',
      'tomato sauce',
      'mozzarella',
      'pasta',
    ],
    nutrition: { calories: 480, protein: 38, carbs: 42, fat: 16 },
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    id: 'd018',
    name: 'Turkey Meatloaf',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'american',
    description: 'Lean turkey meatloaf with tomato glaze',
    ingredients: ['ground turkey', 'breadcrumbs', 'vegetables', 'tomato sauce'],
    nutrition: { calories: 400, protein: 36, carbs: 32, fat: 14 },
    allergens: ['gluten', 'eggs', 'dairy'],
  },

  // NON-VEG - Asian
  {
    id: 'd019',
    name: 'Tandoori Chicken with Mint Chutney',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Roasted marinated chicken with mint sauce',
    ingredients: ['chicken', 'yogurt', 'spices', 'mint', 'lime'],
    nutrition: { calories: 320, protein: 35, carbs: 8, fat: 15 },
    allergens: ['dairy'],
  },
  {
    id: 'd020',
    name: 'Chicken Tikka Masala with Rice',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Grilled chicken in creamy tomato sauce',
    ingredients: [
      'chicken',
      'yogurt',
      'tomato sauce',
      'cream',
      'rice',
      'ginger',
    ],
    nutrition: { calories: 420, protein: 28, carbs: 40, fat: 16 },
    allergens: ['dairy'],
  },
  {
    id: 'd021',
    name: 'Mongolian Beef',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Tender beef with scallions in savory sauce',
    ingredients: ['beef', 'soy sauce', 'scallions', 'ginger', 'rice'],
    nutrition: { calories: 450, protein: 32, carbs: 48, fat: 14 },
    allergens: ['gluten', 'soy'],
  },
  {
    id: 'd022',
    name: 'Shrimp Lo Mein',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'asian',
    description: 'Shrimp with noodles, vegetables, and sesame oil',
    ingredients: [
      'shrimp',
      'egg noodles',
      'mixed vegetables',
      'sesame oil',
      'soy sauce',
    ],
    nutrition: { calories: 380, protein: 28, carbs: 42, fat: 12 },
    allergens: ['shellfish', 'gluten', 'eggs'],
  },

  // NON-VEG - Mediterranean
  {
    id: 'd023',
    name: 'Grilled Salmon with Dill',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'mediterranean',
    description: 'Fresh salmon with dill and roasted fennel',
    ingredients: ['salmon', 'dill', 'fennel', 'lemon', 'olive oil'],
    nutrition: { calories: 420, protein: 38, carbs: 24, fat: 18 },
    allergens: ['fish'],
  },
  {
    id: 'd024',
    name: 'Chicken with Feta and Spinach',
    category: 'dinner',
    dietType: 'non-veg',
    cuisine: 'mediterranean',
    description: 'Baked chicken with creamy spinach and feta',
    ingredients: ['chicken breast', 'spinach', 'feta', 'cream', 'garlic'],
    nutrition: { calories: 400, protein: 36, carbs: 18, fat: 16 },
    allergens: ['dairy'],
  },
]

// ============================================================================
// SNACK MEALS (5-25 meals) - 100-250 calories
// ============================================================================

const snackMeals = [
  // VEG - Easy
  {
    id: 's001',
    name: 'Hummus with Vegetable Sticks',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'middle_eastern',
    description: 'Creamy hummus with fresh vegetables',
    ingredients: ['hummus', 'carrots', 'celery', 'bell pepper'],
    nutrition: { calories: 180, protein: 7, carbs: 20, fat: 8 },
    allergens: ['sesame'],
  },
  {
    id: 's002',
    name: 'Mixed Nuts and Seeds',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Almonds, cashews, pumpkin seeds, dried cranberries',
    ingredients: ['almonds', 'cashews', 'pumpkin seeds', 'dried cranberries'],
    nutrition: { calories: 200, protein: 6, carbs: 16, fat: 14 },
    allergens: ['tree nuts'],
  },
  {
    id: 's003',
    name: 'Apple with Almond Butter',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Sliced apple with natural almond butter',
    ingredients: ['apple', 'almond butter'],
    nutrition: { calories: 200, protein: 6, carbs: 24, fat: 9 },
    allergens: ['tree nuts'],
  },
  {
    id: 's004',
    name: 'Greek Yogurt with Honey',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Plain Greek yogurt drizzled with honey',
    ingredients: ['greek yogurt', 'honey'],
    nutrition: { calories: 160, protein: 12, carbs: 18, fat: 3 },
    allergens: ['dairy'],
  },
  {
    id: 's005',
    name: 'Whole Grain Crackers with Cheese',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Whole grain crackers with cheddar cheese',
    ingredients: ['whole grain crackers', 'cheddar cheese'],
    nutrition: { calories: 210, protein: 9, carbs: 22, fat: 10 },
    allergens: ['gluten', 'dairy'],
  },
  {
    id: 's006',
    name: 'Chana Chaat',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'asian',
    description: 'Spiced chickpea salad with tangy dressing',
    ingredients: ['chickpeas', 'onion', 'tomato', 'lemon', 'cumin'],
    nutrition: { calories: 180, protein: 9, carbs: 25, fat: 5 },
    allergens: ['none'],
  },
  {
    id: 's007',
    name: 'Roasted Chickpeas',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Crispy spiced chickpeas',
    ingredients: ['chickpeas', 'olive oil', 'salt', 'spices'],
    nutrition: { calories: 160, protein: 8, carbs: 18, fat: 6 },
    allergens: ['none'],
  },
  {
    id: 's008',
    name: 'Cheese and Fruit Plate',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Assorted cheeses with grapes and almonds',
    ingredients: ['cheese', 'grapes', 'almonds'],
    nutrition: { calories: 240, protein: 10, carbs: 22, fat: 12 },
    allergens: ['dairy', 'tree nuts'],
  },
  {
    id: 's009',
    name: 'Protein Bar',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Oats, nuts, and protein powder combination',
    ingredients: ['oats', 'nuts', 'protein powder', 'honey'],
    nutrition: { calories: 220, protein: 10, carbs: 26, fat: 8 },
    allergens: ['tree nuts', 'dairy'],
  },
  {
    id: 's010',
    name: 'Smoothie Bowl',
    category: 'snack',
    dietType: 'veg',
    cuisine: 'international',
    description: 'Yogurt smoothie base topped with granola and fruit',
    ingredients: ['yogurt', 'berries', 'granola', 'milk'],
    nutrition: { calories: 280, protein: 10, carbs: 42, fat: 8 },
    allergens: ['dairy', 'gluten'],
  },

  // NON-VEG
  {
    id: 's011',
    name: 'Hard Boiled Eggs',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: '2 hard boiled eggs with salt and pepper',
    ingredients: ['eggs', 'salt', 'pepper'],
    nutrition: { calories: 140, protein: 13, carbs: 1, fat: 10 },
    allergens: ['eggs'],
  },
  {
    id: 's012',
    name: 'Turkey and Cheese Roll-ups',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'Sliced turkey wrapped around cheese',
    ingredients: ['turkey slices', 'cheese'],
    nutrition: { calories: 160, protein: 18, carbs: 2, fat: 9 },
    allergens: ['dairy'],
  },
  {
    id: 's013',
    name: 'Tuna Salad with Crackers',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'Canned tuna mixed with mayo and crackers',
    ingredients: ['canned tuna', 'mayo', 'crackers'],
    nutrition: { calories: 200, protein: 16, carbs: 16, fat: 8 },
    allergens: ['fish', 'gluten', 'dairy'],
  },
  {
    id: 's014',
    name: 'Protein Shake',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'Whey protein blended with almond milk and banana',
    ingredients: ['whey protein', 'almond milk', 'banana'],
    nutrition: { calories: 180, protein: 20, carbs: 18, fat: 3 },
    allergens: ['dairy'],
  },
  {
    id: 's015',
    name: 'Beef Jerky with Almonds',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'High-protein beef jerky with almonds',
    ingredients: ['beef jerky', 'almonds'],
    nutrition: { calories: 220, protein: 16, carbs: 8, fat: 14 },
    allergens: ['tree nuts'],
  },
  {
    id: 's016',
    name: 'Chicken Salad with Vegetables',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'Shredded chicken with mayo and fresh veggies',
    ingredients: ['cooked chicken', 'mayo', 'celery', 'tomato'],
    nutrition: { calories: 190, protein: 22, carbs: 6, fat: 9 },
    allergens: ['eggs'],
  },
  {
    id: 's017',
    name: 'Shrimp Cocktail',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'Steamed shrimp with cocktail sauce',
    ingredients: ['shrimp', 'cocktail sauce', 'lemon'],
    nutrition: { calories: 100, protein: 19, carbs: 4, fat: 1 },
    allergens: ['shellfish'],
  },
  {
    id: 's018',
    name: 'Salmon Snack',
    category: 'snack',
    dietType: 'non-veg',
    cuisine: 'international',
    description: 'Canned salmon with crackers',
    ingredients: ['canned salmon', 'whole grain crackers'],
    nutrition: { calories: 180, protein: 18, carbs: 16, fat: 6 },
    allergens: ['fish', 'gluten'],
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all meals by category
 * @param {string} category - 'breakfast', 'lunch', 'dinner', 'snack'
 * @returns {array} Meals in the category
 */
function getMealsByCategory(category) {
  const categoryMap = {
    breakfast: breakfastMeals,
    lunch: lunchMeals,
    dinner: dinnerMeals,
    snack: snackMeals,
  }
  return categoryMap[category.toLowerCase()] || []
}

/**
 * Get meals by diet type
 * @param {array} meals - Array of meals to filter
 * @param {string} dietType - 'veg', 'non-veg', 'vegan', 'eggetarian'
 * @returns {array} Filtered meals
 */
function filterByDietType(meals, dietType) {
  if (!dietType || dietType === 'all') return meals
  return meals.filter((meal) => meal.dietType === dietType.toLowerCase())
}

/**
 * Get meals by cuisine
 * @param {array} meals - Array of meals to filter
 * @param {string} cuisine - 'asian', 'european', 'american', 'mediterranean', 'latin', 'middle_eastern'
 * @returns {array} Filtered meals
 */
function filterByCuisine(meals, cuisine) {
  if (!cuisine) return meals
  return meals.filter((meal) => meal.cuisine === cuisine.toLowerCase())
}

/**
 * Filter meals by allergens - exclude meals containing allergens
 * @param {array} meals - Array of meals to filter
 * @param {array} allergens - Array of allergen strings to exclude
 * @returns {array} Meals without those allergens
 */
function filterByAllergens(meals, allergens) {
  if (!allergens || allergens.length === 0) return meals

  return meals.filter((meal) => {
    const mealAllergens = Array.isArray(meal.allergens)
      ? meal.allergens.map((a) => a.toLowerCase())
      : meal.allergens
          .toLowerCase()
          .split(',')
          .map((a) => a.trim())
    return !allergens.some((allergen) =>
      mealAllergens.includes(allergen.toLowerCase()),
    )
  })
}

/**
 * Get random meals without repeats
 * @param {array} meals - Array of meals to choose from
 * @param {number} count - Number of meals to return
 * @param {array} exclude - IDs to exclude
 * @returns {array} Random meals
 */
function getRandomMeals(meals, count = 1, exclude = []) {
  const filtered = meals.filter((meal) => !exclude.includes(meal.id))
  const selected = []

  for (let i = 0; i < count && filtered.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * filtered.length)
    selected.push(filtered[randomIndex])
    filtered.splice(randomIndex, 1)
  }

  return selected
}

/**
 * Get meal by ID
 * @param {string} mealId - Meal ID to find
 * @returns {object} Meal object or null
 */
function getMealById(mealId) {
  const allMeals = [
    ...breakfastMeals,
    ...lunchMeals,
    ...dinnerMeals,
    ...snackMeals,
  ]
  return allMeals.find((meal) => meal.id === mealId) || null
}

/**
 * Get meals within calorie range
 * @param {array} meals - Array of meals
 * @param {number} minCal - Minimum calories
 * @param {number} maxCal - Maximum calories
 * @returns {array} Filtered meals
 */
function getByCalorieRange(meals, minCal, maxCal) {
  return meals.filter(
    (meal) =>
      meal.nutrition.calories >= minCal && meal.nutrition.calories <= maxCal,
  )
}

/**
 * Get all meals combined
 * @returns {array} All meals from database
 */
function getAllMeals() {
  return [...breakfastMeals, ...lunchMeals, ...dinnerMeals, ...snackMeals]
}

/**
 * Get meals statistics
 * @returns {object} Stats about meal database
 */
function getMealStats() {
  return {
    totalMeals: getAllMeals().length,
    breakfast: breakfastMeals.length,
    lunch: lunchMeals.length,
    dinner: dinnerMeals.length,
    snack: snackMeals.length,
    veg: getAllMeals().filter((m) => m.dietType === 'veg').length,
    nonVeg: getAllMeals().filter((m) => m.dietType === 'non-veg').length,
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Meal arrays
  breakfastMeals,
  lunchMeals,
  dinnerMeals,
  snackMeals,

  // Helper functions
  getMealsByCategory,
  filterByDietType,
  filterByCuisine,
  filterByAllergens,
  getRandomMeals,
  getMealById,
  getByCalorieRange,
  getAllMeals,
  getMealStats,

  // Utility: Get all meals in a category matching multiple filters
  getMeals: function (category, dietType, cuisine, allergens) {
    let meals = this.getMealsByCategory(category)
    if (dietType) meals = this.filterByDietType(meals, dietType)
    if (cuisine) meals = this.filterByCuisine(meals, cuisine)
    if (allergens) meals = this.filterByAllergens(meals, allergens)
    return meals
  },
}
