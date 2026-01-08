/**
 * Meal Templates Tier 2: 600-900 Calories per meal
 * Perfect for users with moderate daily calorie targets (2000-2800 cal)
 * Diet Types: Vegetarian (veg), Non-Vegetarian (non-veg), Vegan (vegan)
 * Updated: Added allergen tracking and expanded meal database
 */

const mealTemplatesTier2 = {
  veg: {
    Breakfast: [
      {
        dishName: "Loaded Greek Yogurt Bowl",
        description: "Greek yogurt with granola, nuts, seeds, berries, and honey",
        nutrition: { calories: 780, protein: 24, carbs: 88, fat: 26 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Triple Egg Breakfast",
        description: "3 eggs (fried/scrambled), 3 slices toast with butter, and hash browns",
        nutrition: { calories: 820, protein: 20, carbs: 78, fat: 38 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Vegetable Loaded Frittata",
        description: "Large 4-egg frittata with spinach, mushrooms, peppers, cheese, toast",
        nutrition: { calories: 850, protein: 28, carbs: 65, fat: 42 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Stacked Pancake Breakfast",
        description: "4 whole wheat pancakes with almond butter, syrup, and fruit",
        nutrition: { calories: 880, protein: 18, carbs: 110, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Breakfast Burrito",
        description: "Large tortilla with eggs, potatoes, cheese, veggies, beans",
        nutrition: { calories: 810, protein: 22, carbs: 88, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Shakshuka with Multiple Sides",
        description: "Eggs in tomato sauce with bread, cheese, and salad",
        nutrition: { calories: 790, protein: 22, carbs: 76, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Vegetable Quesadilla",
        description: "Cheese and veggie filled quesadilla with sour cream and guacamole",
        nutrition: { calories: 800, protein: 20, carbs: 82, fat: 34 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Quinoa Buddha Bowl Deluxe",
        description: "1.5 cups quinoa, roasted tofu, beets, sweet potato, vegetables",
        nutrition: { calories: 820, protein: 24, carbs: 102, fat: 22 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Brown Rice & Vegetable Stir-Fry",
        description: "Brown rice (2 cups), mixed vegetables, sesame oil, garlic",
        nutrition: { calories: 800, protein: 18, carbs: 104, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Millet & Pumpkin Curry",
        description: "Millet, roasted pumpkin, coconut milk, spinach, spices",
        nutrition: { calories: 810, protein: 16, carbs: 98, fat: 20 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Buckwheat Noodle Feast",
        description: "Buckwheat noodles (2 cups), vegetables, mushrooms, oil",
        nutrition: { calories: 790, protein: 20, carbs: 100, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Sorghum & Bean Medley",
        description: "Sorghum grain, mixed beans, roasted vegetables, herbs",
        nutrition: { calories: 820, protein: 22, carbs: 104, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Teff Grain Power Plate",
        description: "Teff with roasted root vegetables, chickpeas, olive oil",
        nutrition: { calories: 800, protein: 20, carbs: 98, fat: 20 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Polenta with Vegetables",
        description: "Creamy polenta, sautéed greens, roasted peppers",
        nutrition: { calories: 810, protein: 18, carbs: 102, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Rice & Lentil Pilaf",
        description: "Brown rice, green lentils, carrots, onions, spices",
        nutrition: { calories: 820, protein: 24, carbs: 100, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Amaranth & Squash Bowl",
        description: "Cooked amaranth, roasted butternut squash, kale, oil",
        nutrition: { calories: 800, protein: 18, carbs: 104, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Large Buddha Bowl",
        description: "1.5 cups quinoa, roasted vegetables, chickpeas, tahini, nuts",
        nutrition: { calories: 820, protein: 26, carbs: 92, fat: 28 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Creamy Pasta Primavera",
        description: "Whole wheat pasta (2 cups cooked) with vegetables and cream sauce",
        nutrition: { calories: 850, protein: 24, carbs: 102, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Paneer Tikka Masala",
        description: "Generous portion paneer curry with rice and bread",
        nutrition: { calories: 890, protein: 32, carbs: 88, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chickpea Curry Plate",
        description: "Spiced chickpea curry, rice (1.5 cups), naan, and salad",
        nutrition: { calories: 800, protein: 24, carbs: 98, fat: 22 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Vegetable Lo Mein",
        description: "Egg noodles (2 cups) with mixed vegetables, peanut sauce",
        nutrition: { calories: 820, protein: 20, carbs: 94, fat: 26 },
        dietType: "veg",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Loaded Veggie Burger Meal",
        description: "Plant-based burger with fries, coleslaw, vegan mayo",
        nutrition: { calories: 840, protein: 22, carbs: 96, fat: 32 },
        dietType: "veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Dal Makhani with Bread",
        description: "Creamy lentil curry with rice, 2 naans, and raita",
        nutrition: { calories: 880, protein: 26, carbs: 104, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Fava Bean Curry Plate",
        description: "Fava beans, coconut milk, tomatoes, spinach, rice",
        nutrition: { calories: 800, protein: 22, carbs: 98, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Mung Bean Stir-Fry",
        description: "Sprouted mung beans, mixed vegetables, sesame oil, rice",
        nutrition: { calories: 820, protein: 20, carbs: 104, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Aduki Bean & Rice",
        description: "Aduki beans, brown rice, seaweed, vegetables",
        nutrition: { calories: 810, protein: 22, carbs: 100, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Corn & Bean Medley",
        description: "Sweet corn, black beans, red peppers, cilantro",
        nutrition: { calories: 800, protein: 18, carbs: 102, fat: 16 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Chickpea Roast Dinner",
        description: "Roasted chickpeas, roasted vegetables, herbs, oil",
        nutrition: { calories: 820, protein: 24, carbs: 98, fat: 20 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Pea & Vegetable Curry",
        description: "Green peas, coconut milk, tomatoes, onions, rice",
        nutrition: { calories: 810, protein: 20, carbs: 100, fat: 18 },
        dietType: "veg",
        allergens: ["none"]
      }
    ],
    Dinner: [
      {
        dishName: "Stuffed Pasta Shells",
        description: "Cheese and spinach pasta shells with marinara, garlic bread",
        nutrition: { calories: 820, protein: 28, carbs: 88, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Vegetable Biryani",
        description: "Saffron rice with vegetables, nuts, and accompanying raita",
        nutrition: { calories: 850, protein: 22, carbs: 104, fat: 26 },
        dietType: "veg",
        allergens: ["dairy", "nuts"]
      },
      {
        dishName: "Bean Chili with Toppings",
        description: "Hearty bean and vegetable chili with cheese, sour cream, cornbread",
        nutrition: { calories: 810, protein: 24, carbs: 92, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Mixed Vegetable Curry",
        description: "Creamy vegetable curry with rice (1.5 cups) and naan",
        nutrition: { calories: 880, protein: 20, carbs: 108, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Stuffed Bell Peppers",
        description: "Peppers filled with quinoa, beans, cheese with sides",
        nutrition: { calories: 790, protein: 24, carbs: 88, fat: 26 },
        dietType: "veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Vegetable Pad Thai",
        description: "Rice noodles with vegetables, peanuts, sauce, and protein",
        nutrition: { calories: 820, protein: 22, carbs: 96, fat: 24 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Cheese and Vegetable Enchiladas",
        description: "3 enchiladas with cheese, vegetables, salsa, rice and beans",
        nutrition: { calories: 850, protein: 24, carbs: 94, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Snack: [
      {
        dishName: "Generous Hummus Platter",
        description: "Hummus, pita chips, vegetables, cheese, nuts (very filling)",
        nutrition: { calories: 750, protein: 20, carbs: 72, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Trail Mix and Fruit",
        description: "Nuts, seeds, dried fruit, fresh fruit (generous portions)",
        nutrition: { calories: 800, protein: 18, carbs: 88, fat: 32 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Large Smoothie Bowl",
        description: "Thick smoothie base with granola, nuts, coconut, fruit",
        nutrition: { calories: 820, protein: 16, carbs: 104, fat: 24 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Cheese and Crackers Feast",
        description: "Assorted cheeses, crackers, nuts, and fruit",
        nutrition: { calories: 780, protein: 22, carbs: 68, fat: 36 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Nuts and Nut Butter Mix",
        description: "Various nuts, almond butter, seeds with fruit",
        nutrition: { calories: 810, protein: 22, carbs: 58, fat: 48 },
        dietType: "veg",
        allergens: ["nuts"]
      }
    ]
  },
  "non-veg": {
    Breakfast: [
      {
        dishName: "Steak and Eggs Premium",
        description: "200g steak, 3 eggs, hash browns, toast with butter",
        nutrition: { calories: 900, protein: 42, carbs: 48, fat: 48 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Bacon Double Egg Breakfast",
        description: "6 strips bacon, 3 eggs, 2 cups hash browns, 2 slices toast",
        nutrition: { calories: 880, protein: 38, carbs: 52, fat: 48 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Sausage Meat Breakfast",
        description: "6 sausage links, 3 eggs, potatoes, beans, 2 slices toast",
        nutrition: { calories: 920, protein: 44, carbs: 56, fat: 48 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Chorizo Breakfast Feast",
        description: "Large chorizo, 3 eggs, peppers, onions, tortillas, cheese",
        nutrition: { calories: 850, protein: 40, carbs: 58, fat: 42 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Salmon Bagel Special",
        description: "Large bagel with cream cheese, smoked salmon, capers, avocado",
        nutrition: { calories: 780, protein: 28, carbs: 72, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Ham and Cheese Omelette Meal",
        description: "4-egg omelette with ham, cheese, peppers, 2 slices toast, hash browns",
        nutrition: { calories: 890, protein: 36, carbs: 62, fat: 42 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Paratha Meal",
        description: "2 parathas with chicken keema, yogurt, and side salad",
        nutrition: { calories: 820, protein: 36, carbs: 72, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Grilled Fish Feast",
        description: "250g white fish, brown rice (1.5 cups), steamed vegetables",
        nutrition: { calories: 820, protein: 48, carbs: 78, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Turkey & Rice Skillet",
        description: "300g turkey breast, rice, mixed vegetables, herbs",
        nutrition: { calories: 800, protein: 50, carbs: 72, fat: 14 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Shrimp & Rice Noodle Bowl",
        description: "200g shrimp, rice noodles, bok choy, carrots",
        nutrition: { calories: 810, protein: 42, carbs: 82, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken & Quinoa Bowl",
        description: "250g chicken breast, quinoa (1.5 cups), vegetables",
        nutrition: { calories: 820, protein: 48, carbs: 80, fat: 14 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Lean Beef & Vegetable",
        description: "200g lean beef, brown rice, roasted vegetables",
        nutrition: { calories: 800, protein: 46, carbs: 76, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Duck Breast Dinner",
        description: "180g duck breast, wild rice, roasted vegetables",
        nutrition: { calories: 810, protein: 42, carbs: 74, fat: 22 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Salmon & Vegetable Mix",
        description: "200g salmon, jasmine rice, steamed vegetables",
        nutrition: { calories: 820, protein: 44, carbs: 78, fat: 20 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken Sausage Plate",
        description: "3 chicken sausages, rice, roasted vegetables",
        nutrition: { calories: 800, protein: 48, carbs: 74, fat: 18 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Pork Tenderloin & Rice",
        description: "200g pork, brown rice (1.5 cups), vegetables",
        nutrition: { calories: 810, protein: 44, carbs: 76, fat: 18 },
        dietType: "non-veg",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Grilled Chicken with Rice",
        description: "300g chicken breast, 1.5 cups rice, vegetables, gravy",
        nutrition: { calories: 820, protein: 48, carbs: 78, fat: 16 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Pan-Seared Salmon Bowl",
        description: "200g salmon, rice, vegetables, olive oil dressing",
        nutrition: { calories: 840, protein: 42, carbs: 68, fat: 28 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Beef Taco Supreme",
        description: "Ground beef tacos (3) with all toppings, rice and beans",
        nutrition: { calories: 880, protein: 42, carbs: 82, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Biryani",
        description: "Generous portion saffron rice with chicken and nuts",
        nutrition: { calories: 850, protein: 38, carbs: 92, fat: 22 },
        dietType: "non-veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Fish Curry Plate",
        description: "Large fish curry, 1.5 cups rice, bread, salad",
        nutrition: { calories: 820, protein: 42, carbs: 82, fat: 18 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Turkey Meatball Pasta",
        description: "Whole wheat pasta (2 cups), turkey meatballs, marinara",
        nutrition: { calories: 810, protein: 44, carbs: 84, fat: 16 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Chicken Tikka Masala",
        description: "Large portion tandoori chicken in creamy sauce, rice, naan",
        nutrition: { calories: 900, protein: 42, carbs: 94, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Dinner: [
      {
        dishName: "Premium Steak Dinner",
        description: "250g ribeye steak, roasted potatoes, vegetables, garlic bread",
        nutrition: { calories: 920, protein: 50, carbs: 54, fat: 42 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Herb Roasted Chicken",
        description: "2 chicken thighs with roasted root vegetables and gravy",
        nutrition: { calories: 860, protein: 42, carbs: 62, fat: 36 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Baked Salmon Special",
        description: "250g salmon, roasted vegetables, rice, hollandaise sauce",
        nutrition: { calories: 840, protein: 44, carbs: 62, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Tandoori Chicken Feast",
        description: "Large tandoori chicken, rice, dal, bread, raita",
        nutrition: { calories: 890, protein: 46, carbs: 84, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Parmesan Meal",
        description: "Large breaded chicken breast, pasta, garlic bread, salad",
        nutrition: { calories: 880, protein: 48, carbs: 82, fat: 28 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Grilled Lamb Chops",
        description: "4 lamb chops with roasted vegetables, potatoes, mint sauce",
        nutrition: { calories: 900, protein: 48, carbs: 58, fat: 36 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Beef Curry Rice",
        description: "Large beef curry, 1.5 cups rice, bread, yogurt",
        nutrition: { calories: 850, protein: 44, carbs: 82, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Snack: [
      {
        dishName: "Protein Smoothie Deluxe",
        description: "Whey protein, milk, banana, peanut butter, oats",
        nutrition: { calories: 780, protein: 42, carbs: 76, fat: 18 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Chicken and Nuts",
        description: "200g grilled chicken with mixed nuts and fruit",
        nutrition: { calories: 820, protein: 52, carbs: 42, fat: 28 },
        dietType: "non-veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Beef Jerky Feast",
        description: "150g beef jerky with nuts, cheese, and fruit",
        nutrition: { calories: 840, protein: 48, carbs: 56, fat: 28 },
        dietType: "non-veg",
        allergens: ["dairy", "nuts"]
      },
      {
        dishName: "Hard-Boiled Eggs Bowl",
        description: "6 hard boiled eggs with nuts, cheese, and bread",
        nutrition: { calories: 880, protein: 48, carbs: 48, fat: 38 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Turkey Sandwich Deluxe",
        description: "Turkey breast, cheese, avocado on bread with chips and nuts",
        nutrition: { calories: 810, protein: 42, carbs: 72, fat: 28 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten", "nuts"]
      }
    ]
  },
  vegan: {
    Breakfast: [
      {
        dishName: "Tofu Scramble Feast",
        description: "Large tofu scramble with vegetables, 2 slices toast, hash browns",
        nutrition: { calories: 820, protein: 26, carbs: 88, fat: 32 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Loaded Avocado Toast",
        description: "2-3 slices toast with avocado, tomato, hummus, nuts, seeds",
        nutrition: { calories: 850, protein: 22, carbs: 84, fat: 36 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Large Chia Pudding",
        description: "Chia seeds in almond milk with berries, granola, nuts",
        nutrition: { calories: 790, protein: 20, carbs: 82, fat: 32 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Vegan Pancake Stack",
        description: "5 plant-based pancakes with almond butter, syrup, fruit",
        nutrition: { calories: 880, protein: 18, carbs: 120, fat: 28 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Breakfast Burrito Vegan",
        description: "Large tortilla with tofu, potatoes, beans, cheese, veggies",
        nutrition: { calories: 840, protein: 24, carbs: 94, fat: 28 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Granola Parfait Supreme",
        description: "Coconut yogurt with granola, nuts, seeds, berries, cocoa",
        nutrition: { calories: 810, protein: 18, carbs: 102, fat: 28 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Tofu Paratha Special",
        description: "2 large parathas with spiced tofu and yogurt",
        nutrition: { calories: 800, protein: 22, carbs: 86, fat: 30 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Large Lentil & Rice Bowl",
        description: "Cooked lentils, brown rice (1.5 cups), vegetables",
        nutrition: { calories: 820, protein: 24, carbs: 108, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Chickpea Stew Deluxe",
        description: "Large chickpea stew, bread, vegetables, olive oil",
        nutrition: { calories: 800, protein: 22, carbs: 104, fat: 16 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Buckwheat Noodle Feast",
        description: "Buckwheat noodles (2.5 cups), vegetables, oil",
        nutrition: { calories: 810, protein: 18, carbs: 104, fat: 18 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Black Bean & Rice Mix",
        description: "Black beans, brown rice, sweet potato, vegetables",
        nutrition: { calories: 820, protein: 20, carbs: 108, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Fava Bean Pasta",
        description: "Rice or gluten-free pasta, fava beans, vegetables",
        nutrition: { calories: 800, protein: 22, carbs: 104, fat: 12 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Mung Bean Curry",
        description: "Sprouted mung beans, coconut milk, rice, vegetables",
        nutrition: { calories: 810, protein: 20, carbs: 106, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Quinoa & Aduki Salad",
        description: "Quinoa, aduki beans, roasted vegetables, oil",
        nutrition: { calories: 820, protein: 22, carbs: 104, fat: 16 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Amaranth & Bean Plate",
        description: "Amaranth grain, various beans, roasted vegetables",
        nutrition: { calories: 800, protein: 20, carbs: 106, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Corn & Bean Plate",
        description: "Polenta or corn, beans, vegetables, herbs",
        nutrition: { calories: 820, protein: 18, carbs: 108, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Large Buddha Bowl",
        description: "1.5 cups quinoa, roasted tofu, vegetables, tahini, nuts",
        nutrition: { calories: 840, protein: 26, carbs: 98, fat: 28 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Lentil Curry Special",
        description: "Creamy lentil curry, rice (1.5 cups), naan, and salad",
        nutrition: { calories: 820, protein: 28, carbs: 108, fat: 18 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Chickpea Feast",
        description: "Spiced chickpea curry, rice (1.5 cups), bread, vegetables",
        nutrition: { calories: 880, protein: 26, carbs: 112, fat: 18 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Vegetable Lo Mein Deluxe",
        description: "Noodles (2.5 cups) with vegetables, tofu, peanut sauce",
        nutrition: { calories: 850, protein: 24, carbs: 104, fat: 24 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Falafel Wrap Feast",
        description: "2 large wraps with falafel, hummus, vegetables, tahini",
        nutrition: { calories: 820, protein: 22, carbs: 96, fat: 28 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Tofu Biryani",
        description: "Saffron rice with tofu, vegetables, nuts, and raita",
        nutrition: { calories: 870, protein: 24, carbs: 106, fat: 22 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Loaded Veggie Burger",
        description: "Plant-based burger with fries, coleslaw, and vegan mayo",
        nutrition: { calories: 840, protein: 22, carbs: 102, fat: 28 },
        dietType: "vegan",
        allergens: ["gluten"]
      }
    ],
    Dinner: [
      {
        dishName: "Tofu Stir-Fry Supreme",
        description: "Marinated tofu, mixed vegetables, rice (1.5 cups), sauce",
        nutrition: { calories: 820, protein: 24, carbs: 98, fat: 22 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Lentil Bolognese Pasta",
        description: "Whole wheat pasta (2 cups) with creamy lentil sauce",
        nutrition: { calories: 850, protein: 26, carbs: 104, fat: 18 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Bean Burrito Bowl Special",
        description: "Rice, beans, vegetables, salsa, vegan cheese, guac, chips",
        nutrition: { calories: 880, protein: 24, carbs: 108, fat: 24 },
        dietType: "vegan",
        allergens: ["dairy"]
      },
      {
        dishName: "Vegetable Curry Feast",
        description: "Creamy vegetable curry, rice (1.5 cups), naan, raita",
        nutrition: { calories: 840, protein: 20, carbs: 112, fat: 22 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Black Bean Tacos",
        description: "4 tacos with black beans, vegetables, salsa, guac, rice",
        nutrition: { calories: 820, protein: 22, carbs: 104, fat: 18 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Chickpea Stew",
        description: "Hearty chickpea stew with vegetables, bread, salad",
        nutrition: { calories: 810, protein: 24, carbs: 96, fat: 20 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Tofu Pad Thai",
        description: "Rice noodles (2 cups) with tofu, vegetables, peanut sauce",
        nutrition: { calories: 850, protein: 22, carbs: 102, fat: 24 },
        dietType: "vegan",
        allergens: ["nuts"]
      }
    ],
    Snack: [
      {
        dishName: "Trail Mix Generous",
        description: "Nuts, seeds, dried fruit, chocolate (large portion)",
        nutrition: { calories: 800, protein: 20, carbs: 88, fat: 32 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Hummus Mega Platter",
        description: "Hummus, pita chips, vegetables, nuts, seeds",
        nutrition: { calories: 820, protein: 20, carbs: 88, fat: 32 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Protein Smoothie Bowl",
        description: "Plant protein, almond milk, banana, granola, nuts",
        nutrition: { calories: 840, protein: 26, carbs: 98, fat: 24 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Roasted Chickpeas Supreme",
        description: "Spiced chickpeas, nuts, seeds, dried fruit",
        nutrition: { calories: 810, protein: 22, carbs: 82, fat: 28 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Nut Butter Fruit Mix",
        description: "Almond butter, peanut butter, nuts, fruit, seeds",
        nutrition: { calories: 850, protein: 24, carbs: 72, fat: 38 },
        dietType: "vegan",
        allergens: ["nuts"]
      }
    ]
  }
};

export { mealTemplatesTier2 };