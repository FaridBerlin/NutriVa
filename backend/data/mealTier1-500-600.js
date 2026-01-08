/**
 * Meal Templates Tier 1: 500-600 Calories per meal
 * Perfect for users with smaller daily calorie targets or 4-5 meals/day
 * Diet Types: Vegetarian (veg), Non-Vegetarian (non-veg), Vegan (vegan)
 * Updated: Added allergen tracking and expanded meal database
 */

const mealTemplatesTier1 = {
  veg: {
    Breakfast: [
      {
        dishName: "Greek Yogurt Parfait with Berries",
        description: "Greek yogurt layered with granola, berries, and honey",
        nutrition: { calories: 580, protein: 18, carbs: 65, fat: 18 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Whole Wheat Avocado Toast",
        description: "2 slices whole wheat toast with avocado, egg, and tomato",
        nutrition: { calories: 550, protein: 16, carbs: 60, fat: 20 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Vegetable Frittata with Toast",
        description: "Spinach, mushroom, cheddar frittata with 2 slices whole grain toast",
        nutrition: { calories: 570, protein: 20, carbs: 55, fat: 24 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "French Toast with Syrup",
        description: "3 slices brioche French toast with berries and maple syrup",
        nutrition: { calories: 590, protein: 14, carbs: 78, fat: 18 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Oatmeal with Toppings",
        description: "1 cup cooked oats with almond butter, banana, and honey",
        nutrition: { calories: 560, protein: 16, carbs: 72, fat: 18 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Shakshuka with Bread",
        description: "Eggs poached in spiced tomato sauce with 2 slices toast",
        nutrition: { calories: 540, protein: 16, carbs: 58, fat: 20 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Veggie Panini",
        description: "Grilled sandwich with mozzarella, roasted vegetables, pesto",
        nutrition: { calories: 580, protein: 18, carbs: 64, fat: 22 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Quinoa Power Bowl",
        description: "Fluffy quinoa with roasted beets, arugula, pumpkin seeds",
        nutrition: { calories: 560, protein: 16, carbs: 68, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Rice Paper Veggie Rolls",
        description: "Fresh rice paper rolls with vegetables, rice noodles, sesame oil",
        nutrition: { calories: 540, protein: 12, carbs: 64, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Millet Porridge with Berries",
        description: "Creamy millet with coconut milk, fresh berries, maple syrup",
        nutrition: { calories: 550, protein: 10, carbs: 72, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Sweet Potato Hash",
        description: "Roasted sweet potato, bell peppers, onions, turmeric",
        nutrition: { calories: 570, protein: 8, carbs: 78, fat: 14 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Rice & Bean Power Bowl",
        description: "Brown rice, black beans, steamed broccoli, olive oil",
        nutrition: { calories: 580, protein: 14, carbs: 72, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Teff Grain Bowl",
        description: "Teff grains with roasted vegetables, herbs, olive oil",
        nutrition: { calories: 560, protein: 14, carbs: 66, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Roasted Vegetable Medley",
        description: "Mixed roasted vegetables, garlic, rosemary, olive oil",
        nutrition: { calories: 540, protein: 10, carbs: 68, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Corn & Vegetable Hash",
        description: "Polenta with roasted corn, zucchini, tomatoes",
        nutrition: { calories: 570, protein: 12, carbs: 76, fat: 14 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Sorghum Salad",
        description: "Whole sorghum grain, cucumber, bell peppers, lemon dressing",
        nutrition: { calories: 550, protein: 13, carbs: 70, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Baked Root Vegetables",
        description: "Mixed root vegetables, carrots, parsnips, potatoes, herbs",
        nutrition: { calories: 560, protein: 8, carbs: 74, fat: 14 },
        dietType: "veg",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Mediterranean Salad with Chickpeas",
        description: "Mixed greens with chickpeas, feta, olives, and olive oil dressing",
        nutrition: { calories: 580, protein: 18, carbs: 54, fat: 24 },
        dietType: "veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Vegetable Pasta Bowl",
        description: "Whole wheat pasta with roasted vegetables and olive oil",
        nutrition: { calories: 560, protein: 16, carbs: 72, fat: 14 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Caprese Sandwich with Chips",
        description: "Mozzarella, tomato, basil on ciabatta + 1oz chips",
        nutrition: { calories: 570, protein: 16, carbs: 62, fat: 22 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Buddha Bowl with Tahini",
        description: "Quinoa, roasted veggies, chickpeas, tahini dressing",
        nutrition: { calories: 590, protein: 20, carbs: 66, fat: 18 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Minestrone Soup with Bread",
        description: "Hearty vegetable soup with pasta + garlic bread",
        nutrition: { calories: 540, protein: 16, carbs: 68, fat: 14 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Paneer Tikka Masala (1/2 portion)",
        description: "Paneer curry with rice and side salad",
        nutrition: { calories: 560, protein: 22, carbs: 58, fat: 16 },
        dietType: "veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Vegetable Pad Thai",
        description: "Rice noodles with vegetables and peanut sauce",
        nutrition: { calories: 580, protein: 16, carbs: 68, fat: 20 },
        dietType: "veg",
        allergens: ["nuts"]
      }
    ],
    Dinner: [
      {
        dishName: "Spinach Ricotta Pasta",
        description: "Whole wheat pasta with spinach, ricotta, tomato sauce",
        nutrition: { calories: 560, protein: 18, carbs: 64, fat: 16 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Vegetable Stir-Fry with Rice",
        description: "Mixed vegetables with tofu, ginger-garlic sauce, brown rice",
        nutrition: { calories: 570, protein: 18, carbs: 70, fat: 12 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Stuffed Bell Peppers",
        description: "Bell peppers filled with quinoa, beans, cheese",
        nutrition: { calories: 580, protein: 20, carbs: 62, fat: 16 },
        dietType: "veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Dal with Roti and Salad",
        description: "Lentil curry with 2 whole wheat rotis and cucumber salad",
        nutrition: { calories: 540, protein: 18, carbs: 72, fat: 10 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Vegetable Curry with Naan",
        description: "Mixed vegetable curry with coconut milk and 1 naan",
        nutrition: { calories: 590, protein: 16, carbs: 68, fat: 20 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Bean Burrito Bowl",
        description: "Rice, black beans, corn, salsa, cheese, avocado",
        nutrition: { calories: 570, protein: 16, carbs: 66, fat: 18 },
        dietType: "veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Vegetable Biryani",
        description: "Fragrant saffron rice with mixed vegetables",
        nutrition: { calories: 580, protein: 14, carbs: 78, fat: 14 },
        dietType: "veg",
        allergens: ["none"]
      }
    ],
    Snack: [
      {
        dishName: "Greek Yogurt Bowl with Granola",
        description: "Greek yogurt (200g) with granola and berries",
        nutrition: { calories: 520, protein: 16, carbs: 58, fat: 14 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Hummus Platter with Veggies",
        description: "Large bowl hummus with carrots, celery, pita chips",
        nutrition: { calories: 540, protein: 14, carbs: 56, fat: 22 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Trail Mix with Dried Fruit",
        description: "Nuts, seeds, dried fruit mix (150g)",
        nutrition: { calories: 580, protein: 14, carbs: 48, fat: 32 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Cheese and Crackers Platter",
        description: "150g cheese with whole grain crackers and fruit",
        nutrition: { calories: 560, protein: 16, carbs: 50, fat: 24 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Smoothie Bowl",
        description: "Thick smoothie with granola and nuts topping",
        nutrition: { calories: 550, protein: 14, carbs: 72, fat: 12 },
        dietType: "veg",
        allergens: ["dairy", "nuts"]
      }
    ]
  },
  "non-veg": {
    Breakfast: [
      {
        dishName: "Bacon and Egg Breakfast",
        description: "3 strips bacon, 2 fried eggs, 2 slices toast with butter",
        nutrition: { calories: 580, protein: 24, carbs: 48, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Smoked Salmon Bagel",
        description: "Toasted bagel with cream cheese, smoked salmon, capers",
        nutrition: { calories: 560, protein: 22, carbs: 52, fat: 20 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Steak and Eggs",
        description: "150g grilled steak, 2 eggs, 1 cup hash browns",
        nutrition: { calories: 590, protein: 36, carbs: 38, fat: 26 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chorizo Breakfast Burrito",
        description: "Chorizo, scrambled eggs, cheese in large tortilla",
        nutrition: { calories: 570, protein: 26, carbs: 48, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Sausage and Pancakes",
        description: "2 turkey sausage patties with whole wheat pancakes and syrup",
        nutrition: { calories: 560, protein: 22, carbs: 62, fat: 16 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Ham and Cheese Omelette",
        description: "3 egg omelette with ham, cheddar, peppers, 2 slices toast",
        nutrition: { calories: 580, protein: 28, carbs: 48, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Paratha",
        description: "Whole wheat paratha with spiced chicken keema",
        nutrition: { calories: 550, protein: 28, carbs: 50, fat: 20 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Grilled Fish with Rice",
        description: "150g white fish, jasmine rice, steamed vegetables",
        nutrition: { calories: 560, protein: 38, carbs: 54, fat: 10 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Turkey Breast with Veggies",
        description: "Sliced turkey breast, roasted vegetables, rice pilaf",
        nutrition: { calories: 570, protein: 42, carbs: 48, fat: 12 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Grilled Shrimp Bowl",
        description: "150g grilled shrimp, rice noodles, vegetable medley",
        nutrition: { calories: 540, protein: 34, carbs: 56, fat: 14 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken & Rice Skillet",
        description: "200g chicken breast, brown rice, bell peppers, onions",
        nutrition: { calories: 580, protein: 40, carbs: 58, fat: 12 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Beef Stir-Fry with Rice",
        description: "150g lean beef, rice, broccoli, carrots, garlic sauce",
        nutrition: { calories: 570, protein: 36, carbs: 60, fat: 14 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Duck Breast with Veggies",
        description: "120g duck breast, roasted root vegetables, wild rice",
        nutrition: { calories: 550, protein: 32, carbs: 52, fat: 18 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Grilled Tilapia & Greens",
        description: "180g tilapia, sautéed greens, sweet potato",
        nutrition: { calories: 560, protein: 40, carbs: 50, fat: 10 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken Sausage Plate",
        description: "2 chicken sausages, roasted peppers, onions, rice",
        nutrition: { calories: 590, protein: 38, carbs: 56, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Pork Tenderloin with Rice",
        description: "150g pork tenderloin, brown rice, steamed vegetables",
        nutrition: { calories: 570, protein: 36, carbs: 58, fat: 14 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Grilled Mahi-Mahi",
        description: "180g mahi-mahi, jasmine rice, tropical fruit salsa",
        nutrition: { calories: 550, protein: 38, carbs: 54, fat: 12 },
        dietType: "non-veg",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Grilled Chicken with Veggies",
        description: "200g grilled chicken breast, roasted vegetables, rice",
        nutrition: { calories: 560, protein: 36, carbs: 54, fat: 12 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Salmon Salad",
        description: "150g salmon, mixed greens, avocado, olive oil dressing",
        nutrition: { calories: 580, protein: 34, carbs: 28, fat: 28 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Turkey Meatball Pasta",
        description: "Whole wheat pasta with turkey meatballs and marinara",
        nutrition: { calories: 570, protein: 32, carbs: 62, fat: 14 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Chicken Caesar Wrap",
        description: "Grilled chicken, Caesar dressing, whole wheat wrap with side",
        nutrition: { calories: 590, protein: 34, carbs: 56, fat: 18 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Fish Curry with Rice",
        description: "200g fish in curry sauce with 1 cup rice",
        nutrition: { calories: 560, protein: 32, carbs: 58, fat: 14 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Beef Taco Bowl",
        description: "Lean ground beef, rice, beans, salsa, cheese, avocado",
        nutrition: { calories: 580, protein: 32, carbs: 54, fat: 18 },
        dietType: "non-veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Chicken Biryani",
        description: "Fragrant saffron rice with chicken (smaller portion)",
        nutrition: { calories: 570, protein: 28, carbs: 68, fat: 12 },
        dietType: "non-veg",
        allergens: ["none"]
      }
    ],
    Dinner: [
      {
        dishName: "Pan-Seared Steak with Potatoes",
        description: "180g lean steak, roasted potatoes, green beans",
        nutrition: { calories: 590, protein: 40, carbs: 42, fat: 18 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Herb Roasted Chicken Thighs",
        description: "Chicken thighs with roasted root vegetables",
        nutrition: { calories: 570, protein: 36, carbs: 48, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Baked Cod with Lemon",
        description: "200g baked cod, asparagus, rice pilaf",
        nutrition: { calories: 560, protein: 38, carbs: 54, fat: 10 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Tandoori Chicken with Rice",
        description: "Marinated tandoori chicken with rice and mint chutney",
        nutrition: { calories: 580, protein: 38, carbs: 56, fat: 12 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken Tikka Masala",
        description: "Tandoori chicken in creamy sauce with rice",
        nutrition: { calories: 590, protein: 32, carbs: 62, fat: 14 },
        dietType: "non-veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Grilled Salmon with Dill",
        description: "180g salmon, roasted vegetables, new potatoes",
        nutrition: { calories: 570, protein: 36, carbs: 48, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Lamb Kofta with Tzatziki",
        description: "Grilled lamb kofta with pita and yogurt sauce",
        nutrition: { calories: 560, protein: 32, carbs: 50, fat: 16 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Snack: [
      {
        dishName: "Grilled Chicken with Dip",
        description: "200g grilled chicken strips with garlic dip and veggies",
        nutrition: { calories: 580, protein: 48, carbs: 18, fat: 18 },
        dietType: "non-veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Beef Jerky and Nuts",
        description: "100g beef jerky with mixed nuts and fruit",
        nutrition: { calories: 560, protein: 40, carbs: 32, fat: 20 },
        dietType: "non-veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Turkey and Cheese Sandwich",
        description: "Turkey breast, cheddar, avocado on whole grain bread",
        nutrition: { calories: 570, protein: 32, carbs: 50, fat: 18 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Hard Boiled Eggs with Nuts",
        description: "4 hard boiled eggs with almonds and fruit",
        nutrition: { calories: 590, protein: 32, carbs: 28, fat: 32 },
        dietType: "non-veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Protein Shake with Banana",
        description: "Whey protein shake with banana, milk, peanut butter",
        nutrition: { calories: 540, protein: 36, carbs: 54, fat: 10 },
        dietType: "non-veg",
        allergens: ["dairy", "nuts"]
      }
    ]
  },
  vegan: {
    Breakfast: [
      {
        dishName: "Avocado Toast with Toppings",
        description: "2 slices sourdough, mashed avocado, cherry tomatoes, microgreens",
        nutrition: { calories: 560, protein: 14, carbs: 62, fat: 24 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Chia Seed Pudding",
        description: "Chia seeds in almond milk with berries and coconut",
        nutrition: { calories: 540, protein: 12, carbs: 52, fat: 24 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Tofu Scramble with Toast",
        description: "Crumbled tofu with turmeric, vegetables, 2 slices toast",
        nutrition: { calories: 570, protein: 18, carbs: 62, fat: 20 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Vegan Pancakes",
        description: "Plant-based pancakes with maple syrup, berries",
        nutrition: { calories: 580, protein: 12, carbs: 84, fat: 12 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Oat Milk Latte with Muffin",
        description: "Large oat milk latte with vegan blueberry muffin",
        nutrition: { calories: 550, protein: 12, carbs: 72, fat: 16 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Granola Parfait",
        description: "Coconut yogurt with granola, berries, nuts",
        nutrition: { calories: 590, protein: 14, carbs: 68, fat: 22 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Tofu Paratha",
        description: "Whole wheat paratha with spiced tofu",
        nutrition: { calories: 560, protein: 16, carbs: 58, fat: 18 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Chickpea & Vegetable Curry",
        description: "Chickpeas, coconut milk, spinach, rice (smaller portion)",
        nutrition: { calories: 570, protein: 14, carbs: 74, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Lentil & Rice Medley",
        description: "Red lentils, brown rice, tomatoes, spinach",
        nutrition: { calories: 560, protein: 16, carbs: 72, fat: 12 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Buckwheat Noodle Bowl",
        description: "Buckwheat noodles, mixed vegetables, sesame oil",
        nutrition: { calories: 540, protein: 12, carbs: 68, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Mung Bean Salad",
        description: "Sprouted mung beans, cucumber, tomato, lime dressing",
        nutrition: { calories: 550, protein: 14, carbs: 64, fat: 16 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Fava Bean Stew",
        description: "Fava beans, carrots, celery, tomatoes, olive oil",
        nutrition: { calories: 570, protein: 15, carbs: 70, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Teff & Vegetable Mix",
        description: "Teff grain, roasted vegetables, herbs, olive oil",
        nutrition: { calories: 560, protein: 13, carbs: 68, fat: 16 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Black Bean & Rice Bowl",
        description: "Black beans, white rice, corn, bell peppers",
        nutrition: { calories: 580, protein: 13, carbs: 76, fat: 12 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Aduki Bean Noodles",
        description: "Rice noodles, aduki beans, bok choy, ginger broth",
        nutrition: { calories: 550, protein: 14, carbs: 70, fat: 12 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Quinoa & Lentil Salad",
        description: "Cooked quinoa, cooked lentils, vegetables, olive oil",
        nutrition: { calories: 570, protein: 16, carbs: 66, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Amaranth Porridge",
        description: "Amaranth grain, coconut milk, fresh fruit, maple syrup",
        nutrition: { calories: 560, protein: 12, carbs: 72, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Buddha Bowl",
        description: "Quinoa, roasted tofu, sweet potato, tahini dressing",
        nutrition: { calories: 580, protein: 18, carbs: 68, fat: 18 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Chickpea Curry with Rice",
        description: "Spiced chickpea curry with 1 cup rice",
        nutrition: { calories: 570, protein: 16, carbs: 78, fat: 10 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Veggie Burger with Fries",
        description: "Plant-based patty, vegan mayo, sweet potato fries",
        nutrition: { calories: 590, protein: 16, carbs: 72, fat: 18 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Dal Tadka with Roti",
        description: "Lentil curry with 2 whole wheat rotis",
        nutrition: { calories: 560, protein: 18, carbs: 76, fat: 8 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Vegetable Lo Mein",
        description: "Noodles with mixed vegetables, sesame oil, peanut sauce",
        nutrition: { calories: 580, protein: 14, carbs: 68, fat: 18 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Falafel Wrap",
        description: "Falafel, hummus, tahini, vegetables in pita",
        nutrition: { calories: 570, protein: 16, carbs: 64, fat: 20 },
        dietType: "vegan",
        allergens: ["nuts", "gluten"]
      },
      {
        dishName: "Vegetable Biryani",
        description: "Saffron rice with mixed vegetables and spices",
        nutrition: { calories: 560, protein: 12, carbs: 80, fat: 12 },
        dietType: "vegan",
        allergens: ["none"]
      }
    ],
    Dinner: [
      {
        dishName: "Tofu Stir-Fry with Rice",
        description: "Marinated tofu, vegetables, ginger-garlic sauce, brown rice",
        nutrition: { calories: 570, protein: 16, carbs: 72, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Lentil Bolognese Pasta",
        description: "Whole wheat pasta with lentil-vegetable sauce",
        nutrition: { calories: 580, protein: 18, carbs: 74, fat: 10 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Bean Burrito Bowl",
        description: "Rice, beans, corn, salsa, vegan cheese, guacamole",
        nutrition: { calories: 590, protein: 16, carbs: 74, fat: 16 },
        dietType: "vegan",
        allergens: ["dairy"]
      },
      {
        dishName: "Vegetable Curry",
        description: "Seasonal vegetables in coconut milk sauce with rice",
        nutrition: { calories: 560, protein: 12, carbs: 70, fat: 16 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Chickpea and Vegetable Stew",
        description: "Hearty stew with bread",
        nutrition: { calories: 570, protein: 16, carbs: 72, fat: 12 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Black Bean Tacos",
        description: "Roasted black beans, salsa, avocado, cilantro in tortillas",
        nutrition: { calories: 580, protein: 14, carbs: 72, fat: 14 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Tofu Biryani",
        description: "Fragrant rice with tofu and mixed vegetables",
        nutrition: { calories: 560, protein: 14, carbs: 76, fat: 12 },
        dietType: "vegan",
        allergens: ["none"]
      }
    ],
    Snack: [
      {
        dishName: "Trail Mix Bowl",
        description: "Nuts, seeds, dried fruit (generous portion)",
        nutrition: { calories: 580, protein: 14, carbs: 56, fat: 28 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Hummus with Veggies and Pita",
        description: "Large bowl hummus, vegetable sticks, pita chips",
        nutrition: { calories: 570, protein: 14, carbs: 62, fat: 22 },
        dietType: "vegan",
        allergens: ["nuts", "gluten"]
      },
      {
        dishName: "Protein Smoothie",
        description: "Plant protein powder, almond milk, banana, almond butter",
        nutrition: { calories: 540, protein: 18, carbs: 58, fat: 16 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Roasted Chickpea Mix",
        description: "Spiced roasted chickpeas with nuts",
        nutrition: { calories: 560, protein: 16, carbs: 52, fat: 20 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Vegan Protein Bar with Fruit",
        description: "Plant-based bar with fresh fruit",
        nutrition: { calories: 550, protein: 14, carbs: 68, fat: 14 },
        dietType: "vegan",
        allergens: ["nuts"]
      }
    ]
  }
};

export { mealTemplatesTier1 };