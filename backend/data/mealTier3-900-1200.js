/**
 * Meal Templates Tier 3: 900-1200 Calories per meal
 * Perfect for users with large daily calorie targets (2800+ cal) or 2-3 meals/day
 * Diet Types: Vegetarian (veg), Non-Vegetarian (non-veg), Vegan (vegan)
 * Updated: Added allergen tracking and expanded meal database
 */

const mealTemplatesTier3 = {
  veg: {
    Breakfast: [
      {
        dishName: "Epic Breakfast Platter",
        description: "Scrambled eggs, hash browns, sausage substitute, toast, vegetables, cheese",
        nutrition: { calories: 1100, protein: 32, carbs: 108, fat: 42 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Loaded Pancake Stack",
        description: "6 whole wheat pancakes with almond butter, chocolate chips, berries, whipped cream",
        nutrition: { calories: 1150, protein: 26, carbs: 148, fat: 38 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Ultimate Breakfast Burrito",
        description: "Large flour tortilla with eggs, potatoes, cheese, vegetables, beans, avocado",
        nutrition: { calories: 1080, protein: 30, carbs: 118, fat: 42 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Breakfast Sandwich Combo",
        description: "Large sandwich with eggs, cheese, bacon substitute, plus hash browns and juice",
        nutrition: { calories: 1120, protein: 28, carbs: 128, fat: 42 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Double Frittata Meal",
        description: "Two 4-egg frittatas with vegetables, cheese, toast, and fruit salad",
        nutrition: { calories: 1050, protein: 36, carbs: 96, fat: 48 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Oatmeal Supreme",
        description: "2 cups cooked oats with almond butter, banana, berries, honey, nuts, seeds",
        nutrition: { calories: 1090, protein: 28, carbs: 138, fat: 32 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Breakfast Feast Platter",
        description: "Multiple eggs, multiple slices toast, potatoes, vegetables, fruit, dairy",
        nutrition: { calories: 1140, protein: 34, carbs: 128, fat: 40 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Epic Quinoa Buddha Bowl",
        description: "2 cups quinoa, roasted tofu, beets, sweet potato, mixed vegetables, olive oil",
        nutrition: { calories: 1100, protein: 32, carbs: 138, fat: 28 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Brown Rice & Vegetable Feast",
        description: "Brown rice (2.5 cups), mixed vegetables, chickpeas, herbs, oil",
        nutrition: { calories: 1080, protein: 28, carbs: 144, fat: 24 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Large Millet & Vegetable Plate",
        description: "Millet (2 cups), roasted pumpkin, spinach, coconut milk, spices",
        nutrition: { calories: 1120, protein: 26, carbs: 142, fat: 28 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Buckwheat Noodle Extravaganza",
        description: "Buckwheat noodles (3 cups), vegetables, mushrooms, sesame oil",
        nutrition: { calories: 1050, protein: 28, carbs: 138, fat: 26 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Sorghum & Bean Feast",
        description: "Sorghum grain (2 cups), mixed beans, roasted vegetables, herbs",
        nutrition: { calories: 1100, protein: 30, carbs: 144, fat: 24 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Teff Power Plate",
        description: "Teff grain, roasted root vegetables, chickpeas, olive oil",
        nutrition: { calories: 1080, protein: 28, carbs: 140, fat: 26 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Polenta Supreme Dinner",
        description: "Large creamy polenta, sautéed greens, roasted peppers, tomatoes",
        nutrition: { calories: 1120, protein: 26, carbs: 148, fat: 24 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Rice & Lentil Pilaf Grande",
        description: "Brown rice (1.5 cups), green lentils, carrots, onions, spices",
        nutrition: { calories: 1100, protein: 32, carbs: 142, fat: 22 },
        dietType: "veg",
        allergens: ["none"]
      },
      {
        dishName: "Amaranth & Squash Feast",
        description: "Cooked amaranth (2 cups), roasted butternut squash, kale, oil",
        nutrition: { calories: 1050, protein: 26, carbs: 140, fat: 22 },
        dietType: "veg",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Massive Buddha Bowl",
        description: "2 cups quinoa, roasted tofu, roasted vegetables, chickpeas, tahini, nuts, seeds",
        nutrition: { calories: 1100, protein: 36, carbs: 128, fat: 36 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Double Portion Pasta",
        description: "Whole wheat pasta (3 cups cooked) with vegetables, cheese, cream sauce",
        nutrition: { calories: 1080, protein: 32, carbs: 138, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Paneer Meal",
        description: "Large paneer tikka masala with rice (2 cups), naan, salad, yogurt",
        nutrition: { calories: 1140, protein: 40, carbs: 128, fat: 38 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chickpea Feast",
        description: "Spiced chickpea curry, rice (2 cups), 2 naans, salad, pickles, yogurt",
        nutrition: { calories: 1100, protein: 34, carbs: 148, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Loaded Vegetable Lo Mein",
        description: "Noodles (3 cups), vegetables, tofu, peanut sauce, soup, vegetables",
        nutrition: { calories: 1050, protein: 30, carbs: 128, fat: 32 },
        dietType: "veg",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Supreme Veggie Burger Meal",
        description: "Plant-based burger with fries, coleslaw, vegan mayo, milkshake",
        nutrition: { calories: 1120, protein: 28, carbs: 138, fat: 38 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Dal Feast with Bread",
        description: "Creamy lentil curry with rice (2 cups), 2 naans, raita, pickles, vegetables",
        nutrition: { calories: 1080, protein: 32, carbs: 144, fat: 28 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Dinner: [
      {
        dishName: "Double Portion Pasta",
        description: "Cheese and spinach pasta with marinara, garlic bread, salad, side",
        nutrition: { calories: 1100, protein: 36, carbs: 128, fat: 36 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Vegetable Biryani",
        description: "Generous saffron rice with vegetables, nuts, raita, pickle, salad",
        nutrition: { calories: 1080, protein: 28, carbs: 138, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "nuts"]
      },
      {
        dishName: "Bean Chili Feast",
        description: "Hearty chili with cheese, sour cream, cornbread, salad, rice",
        nutrition: { calories: 1120, protein: 32, carbs: 132, fat: 34 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Double Curry Meal",
        description: "Creamy vegetable curry, rice (2 cups), 2 naans, raita, salad",
        nutrition: { calories: 1100, protein: 26, carbs: 144, fat: 32 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Stuffed Peppers Meal",
        description: "Two peppers filled with quinoa, beans, cheese, salad, rice, sides",
        nutrition: { calories: 1050, protein: 32, carbs: 128, fat: 32 },
        dietType: "veg",
        allergens: ["dairy"]
      },
      {
        dishName: "Loaded Pad Thai",
        description: "Large portion rice noodles with vegetables, peanuts, tofu, sauce, sides",
        nutrition: { calories: 1090, protein: 28, carbs: 132, fat: 32 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Enchilada Feast",
        description: "4 enchiladas with cheese, vegetables, salsa, rice, beans, guacamole",
        nutrition: { calories: 1140, protein: 32, carbs: 138, fat: 36 },
        dietType: "veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Snack: [
      {
        dishName: "Ultimate Hummus Feast",
        description: "Large hummus bowl with pita chips, vegetables, cheese, nuts, olives",
        nutrition: { calories: 950, protein: 28, carbs: 94, fat: 42 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Gourmet Trail Mix",
        description: "Nuts, seeds, dried fruit, chocolate, coconut (very generous)",
        nutrition: { calories: 1050, protein: 26, carbs: 118, fat: 42 },
        dietType: "veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Mega Smoothie Bowl",
        description: "Thick smoothie base, granola, nuts, seeds, coconut, berries, chocolate",
        nutrition: { calories: 1100, protein: 22, carbs: 138, fat: 38 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Artisanal Cheese Platter",
        description: "Multiple cheeses, crackers, nuts, fruit, honey, bread",
        nutrition: { calories: 1020, protein: 32, carbs: 98, fat: 42 },
        dietType: "veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Premium Nut Butter Mix",
        description: "Almond and peanut butter, nuts, seeds, berries, chocolate",
        nutrition: { calories: 1080, protein: 34, carbs: 98, fat: 52 },
        dietType: "veg",
        allergens: ["nuts"]
      }
    ]
  },
  "non-veg": {
    Breakfast: [
      {
        dishName: "Premium Steak and Eggs",
        description: "300g steak, 4 eggs, large hash brown portion, toast with butter",
        nutrition: { calories: 1200, protein: 56, carbs: 58, fat: 58 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Bacon Lovers Breakfast",
        description: "8 strips bacon, 4 eggs, 2 cups hash browns, 3 slices toast with butter",
        nutrition: { calories: 1180, protein: 48, carbs: 68, fat: 58 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Sausage Feast Breakfast",
        description: "8 sausage links, 4 eggs, potatoes, beans, 3 slices toast, cheese",
        nutrition: { calories: 1150, protein: 52, carbs: 72, fat: 52 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Ultimate Chorizo Breakfast",
        description: "Large chorizo, 4 eggs, peppers, onions, multiple tortillas, cheese, salsa",
        nutrition: { calories: 1120, protein: 50, carbs: 84, fat: 46 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Deluxe Salmon Bagel",
        description: "Large bagel with cream cheese, smoked salmon, capers, avocado, fruit",
        nutrition: { calories: 1050, protein: 38, carbs: 94, fat: 42 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Omelette Meal",
        description: "5-egg omelette with ham, bacon, cheese, peppers, 3 slices toast, sides",
        nutrition: { calories: 1180, protein: 52, carbs: 72, fat: 52 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Feast Paratha",
        description: "3 parathas with chicken keema, yogurt, pickles, eggs, cheese",
        nutrition: { calories: 1100, protein: 48, carbs: 102, fat: 42 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Grilled Fish Extravaganza",
        description: "300g white fish, brown rice (2 cups), steamed vegetables, herbs",
        nutrition: { calories: 1100, protein: 56, carbs: 98, fat: 20 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Turkey & Rice Supreme",
        description: "350g turkey breast, rice (1.5 cups), mixed vegetables, spices",
        nutrition: { calories: 1080, protein: 58, carbs: 92, fat: 18 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Shrimp & Noodle Feast",
        description: "250g shrimp, rice noodles (2.5 cups), bok choy, carrots",
        nutrition: { calories: 1120, protein: 50, carbs: 108, fat: 20 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken & Quinoa Supreme",
        description: "300g chicken breast, quinoa (2 cups), vegetables, herbs",
        nutrition: { calories: 1100, protein: 56, carbs: 108, fat: 18 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Lean Beef & Vegetable Feast",
        description: "250g lean beef, brown rice (1.5 cups), roasted vegetables",
        nutrition: { calories: 1080, protein: 54, carbs: 100, fat: 20 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Duck Breast Supreme Dinner",
        description: "220g duck breast, wild rice (2 cups), roasted vegetables",
        nutrition: { calories: 1120, protein: 50, carbs: 100, fat: 28 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Salmon & Vegetable Extravaganza",
        description: "250g salmon, jasmine rice (1.5 cups), steamed vegetables",
        nutrition: { calories: 1100, protein: 52, carbs: 104, fat: 28 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Chicken Sausage Feast",
        description: "4 chicken sausages, rice (1.5 cups), roasted vegetables",
        nutrition: { calories: 1080, protein: 56, carbs: 98, fat: 22 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Pork Tenderloin Supreme",
        description: "250g pork, brown rice (2 cups), vegetables, herbs",
        nutrition: { calories: 1120, protein: 52, carbs: 104, fat: 22 },
        dietType: "non-veg",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Massive Chicken Plate",
        description: "400g chicken breast, 2 cups rice, vegetables, gravy, salad, sides",
        nutrition: { calories: 1100, protein: 62, carbs: 94, fat: 24 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Salmon Premium Bowl",
        description: "250g salmon, 1.5 cups rice, vegetables, sauce, avocado, nuts",
        nutrition: { calories: 1080, protein: 52, carbs: 84, fat: 38 },
        dietType: "non-veg",
        allergens: ["nuts"]
      },
      {
        dishName: "Epic Taco Meal",
        description: "Beef tacos (4), rice, beans, cheese, salsa, guacamole, vegetables",
        nutrition: { calories: 1150, protein: 54, carbs: 106, fat: 38 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Chicken Biryani",
        description: "Large portion saffron rice with chicken, nuts, raita, salad, pickle",
        nutrition: { calories: 1120, protein: 48, carbs: 118, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "nuts"]
      },
      {
        dishName: "Fish Curry Premium",
        description: "Large fish curry, 2 cups rice, bread, raita, salad, vegetables",
        nutrition: { calories: 1050, protein: 52, carbs: 102, fat: 26 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Double Portion Turkey Pasta",
        description: "Whole wheat pasta (3 cups), turkey meatballs, marinara, cheese, bread",
        nutrition: { calories: 1100, protein: 56, carbs: 118, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Tikka Masala Supreme",
        description: "Large tandoori chicken in cream sauce, 2 cups rice, 2 naans, raita",
        nutrition: { calories: 1180, protein: 54, carbs: 128, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Dinner: [
      {
        dishName: "Deluxe Premium Steak",
        description: "350g steak, loaded baked potato, roasted vegetables, gravy, bread",
        nutrition: { calories: 1200, protein: 64, carbs: 78, fat: 48 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Double Herb Chicken",
        description: "3 chicken thighs with roasted vegetables, potatoes, gravy, sides",
        nutrition: { calories: 1120, protein: 52, carbs: 82, fat: 44 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Premium Salmon Dinner",
        description: "300g salmon, roasted vegetables, rice (1.5 cups), sauce, bread",
        nutrition: { calories: 1050, protein: 54, carbs: 84, fat: 38 },
        dietType: "non-veg",
        allergens: ["gluten"]
      },
      {
        dishName: "Epic Tandoori Feast",
        description: "Large tandoori chicken, rice (2 cups), dal, 2 breads, raita, pickle",
        nutrition: { calories: 1150, protein: 56, carbs: 118, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Chicken Parmesan Feast",
        description: "Large breaded chicken breast, pasta (2 cups), garlic bread, salad, sides",
        nutrition: { calories: 1120, protein: 54, carbs: 118, fat: 34 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Lamb Chops",
        description: "6 lamb chops with roasted vegetables, potatoes, mint sauce, sides",
        nutrition: { calories: 1180, protein: 62, carbs: 78, fat: 44 },
        dietType: "non-veg",
        allergens: ["none"]
      },
      {
        dishName: "Beef Curry Feast",
        description: "Large beef curry, 2 cups rice, bread, raita, pickles, vegetables",
        nutrition: { calories: 1100, protein: 54, carbs: 108, fat: 32 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten"]
      }
    ],
    Snack: [
      {
        dishName: "Premium Protein Shake",
        description: "Whey protein, milk, banana, peanut butter, oats, chocolate",
        nutrition: { calories: 950, protein: 52, carbs: 98, fat: 24 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Chicken and Premium Nuts",
        description: "300g grilled chicken, mixed nuts, cheese, fruit, chocolate",
        nutrition: { calories: 1080, protein: 64, carbs: 64, fat: 38 },
        dietType: "non-veg",
        allergens: ["dairy", "nuts"]
      },
      {
        dishName: "Gourmet Beef Jerky Feast",
        description: "200g beef jerky, nuts, cheese, fruit, chocolate",
        nutrition: { calories: 1050, protein: 62, carbs: 72, fat: 34 },
        dietType: "non-veg",
        allergens: ["dairy", "nuts"]
      },
      {
        dishName: "Deluxe Egg Bowl",
        description: "8 hard boiled eggs, nuts, cheese, bread, fruit, vegetables",
        nutrition: { calories: 1100, protein: 64, carbs: 68, fat: 44 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten", "nuts"]
      },
      {
        dishName: "Premium Turkey Feast",
        description: "Turkey breast, cheese, avocado on bread with nuts, fruit, chocolate",
        nutrition: { calories: 1040, protein: 54, carbs: 92, fat: 36 },
        dietType: "non-veg",
        allergens: ["dairy", "gluten", "nuts"]
      }
    ]
  },
  vegan: {
    Breakfast: [
      {
        dishName: "Epic Tofu Scramble",
        description: "Large tofu scramble with vegetables, 3 slices toast, hash browns, fruit",
        nutrition: { calories: 1100, protein: 36, carbs: 128, fat: 38 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Ultimate Avocado Toast",
        description: "3-4 slices toast with avocado, tomato, hummus, nuts, seeds, fruit",
        nutrition: { calories: 1080, protein: 28, carbs: 128, fat: 42 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Mega Chia Pudding",
        description: "Large chia pudding with almond milk, berries, granola, nuts, chocolate",
        nutrition: { calories: 950, protein: 26, carbs: 122, fat: 38 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Vegan Pancake Feast",
        description: "6-7 plant-based pancakes with almond butter, syrup, berries, chocolate",
        nutrition: { calories: 1140, protein: 22, carbs: 158, fat: 32 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Double Breakfast Burrito",
        description: "Two large tortillas with tofu, potatoes, beans, cheese, vegetables, fruit",
        nutrition: { calories: 1100, protein: 32, carbs: 138, fat: 36 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Granola Parfait",
        description: "Coconut yogurt with granola, nuts, seeds, berries, chocolate, honey",
        nutrition: { calories: 1050, protein: 24, carbs: 138, fat: 36 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Double Tofu Paratha",
        description: "3 parathas with spiced tofu, yogurt, vegetables, fruit",
        nutrition: { calories: 1020, protein: 32, carbs: 128, fat: 36 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Large Lentil & Rice Feast",
        description: "Cooked lentils, brown rice (2 cups), vegetables, olive oil",
        nutrition: { calories: 1100, protein: 32, carbs: 148, fat: 18 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Chickpea Stew Extravaganza",
        description: "Large chickpea stew, bread, vegetables, olive oil, spices",
        nutrition: { calories: 1080, protein: 30, carbs: 144, fat: 20 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Buckwheat Noodle Supreme",
        description: "Buckwheat noodles (3.5 cups), vegetables, oil, herbs",
        nutrition: { calories: 1120, protein: 26, carbs: 148, fat: 24 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Black Bean & Rice Extravaganza",
        description: "Black beans, brown rice (2 cups), sweet potato, vegetables",
        nutrition: { calories: 1100, protein: 28, carbs: 152, fat: 18 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Fava Bean Pasta Feast",
        description: "Rice/GF pasta (2.5 cups), fava beans, vegetables",
        nutrition: { calories: 1080, protein: 30, carbs: 148, fat: 14 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Mung Bean Curry Feast",
        description: "Sprouted mung beans, coconut milk, rice (2 cups), vegetables",
        nutrition: { calories: 1120, protein: 28, carbs: 152, fat: 18 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Quinoa & Aduki Supreme",
        description: "Quinoa, aduki beans, roasted vegetables, olive oil",
        nutrition: { calories: 1100, protein: 30, carbs: 148, fat: 20 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Amaranth & Bean Extravaganza",
        description: "Amaranth grain (2 cups), various beans, roasted vegetables",
        nutrition: { calories: 1080, protein: 28, carbs: 150, fat: 18 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Corn & Bean Supreme",
        description: "Polenta (large), beans, vegetables, herbs",
        nutrition: { calories: 1100, protein: 26, carbs: 152, fat: 18 },
        dietType: "vegan",
        allergens: ["none"]
      }
    ],
    Lunch: [
      {
        dishName: "Mega Buddha Bowl",
        description: "2.5 cups quinoa, roasted tofu, roasted vegetables, chickpeas, tahini, nuts",
        nutrition: { calories: 1120, protein: 38, carbs: 142, fat: 36 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Premium Lentil Curry",
        description: "Creamy lentil curry, rice (2 cups), 2 naans, raita, salad, pickle",
        nutrition: { calories: 1080, protein: 36, carbs: 148, fat: 22 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Mega Chickpea Feast",
        description: "Large chickpea curry, rice (2 cups), 2 naans, salad, vegetables, pickle",
        nutrition: { calories: 1140, protein: 34, carbs: 158, fat: 24 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Deluxe Vegetable Lo Mein",
        description: "Noodles (3.5 cups), vegetables, tofu, peanut sauce, soup, side",
        nutrition: { calories: 1100, protein: 32, carbs: 142, fat: 36 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Premium Falafel Feast",
        description: "3 falafel wraps with hummus, vegetables, tahini, chips, side",
        nutrition: { calories: 1050, protein: 30, carbs: 128, fat: 38 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Premium Tofu Biryani",
        description: "Generous saffron rice with tofu, vegetables, nuts, raita, pickle",
        nutrition: { calories: 1100, protein: 32, carbs: 148, fat: 28 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Loaded Veggie Burger Feast",
        description: "Plant-based burger with fries, coleslaw, milkshake, fruit",
        nutrition: { calories: 1140, protein: 30, carbs: 152, fat: 34 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      }
    ],
    Dinner: [
      {
        dishName: "Premium Tofu Stir-Fry",
        description: "Marinated tofu, mixed vegetables, rice (2 cups), sauce, side salad",
        nutrition: { calories: 1100, protein: 32, carbs: 128, fat: 28 },
        dietType: "vegan",
        allergens: ["none"]
      },
      {
        dishName: "Mega Lentil Pasta",
        description: "Whole wheat pasta (3 cups) with lentil bolognese sauce, bread, salad",
        nutrition: { calories: 1080, protein: 34, carbs: 142, fat: 24 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Epic Bean Burrito Bowl",
        description: "Rice, beans, vegetables, salsa, vegan cheese, guac, chips, side",
        nutrition: { calories: 1140, protein: 32, carbs: 152, fat: 30 },
        dietType: "vegan",
        allergens: ["dairy"]
      },
      {
        dishName: "Double Curry Feast",
        description: "Creamy vegetable curry, rice (2 cups), 2 naans, raita, salad",
        nutrition: { calories: 1100, protein: 28, carbs: 154, fat: 28 },
        dietType: "vegan",
        allergens: ["dairy", "gluten"]
      },
      {
        dishName: "Premium Black Bean Tacos",
        description: "6 tacos with beans, vegetables, salsa, guac, rice, beans, sides",
        nutrition: { calories: 1050, protein: 32, carbs: 142, fat: 26 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Hearty Chickpea Stew",
        description: "Large chickpea stew with bread, salad, rice, vegetables, fruit",
        nutrition: { calories: 1020, protein: 32, carbs: 138, fat: 26 },
        dietType: "vegan",
        allergens: ["gluten"]
      },
      {
        dishName: "Loaded Tofu Pad Thai",
        description: "Rice noodles (3 cups), tofu, vegetables, peanut sauce, sides",
        nutrition: { calories: 1100, protein: 30, carbs: 138, fat: 32 },
        dietType: "vegan",
        allergens: ["nuts"]
      }
    ],
    Snack: [
      {
        dishName: "Ultimate Trail Mix",
        description: "Nuts, seeds, dried fruit, chocolate, coconut (very generous)",
        nutrition: { calories: 1050, protein: 28, carbs: 118, fat: 42 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Mega Hummus Platter",
        description: "Large hummus, pita chips, vegetables, nuts, seeds, olives",
        nutrition: { calories: 1020, protein: 26, carbs: 112, fat: 38 },
        dietType: "vegan",
        allergens: ["gluten", "nuts"]
      },
      {
        dishName: "Premium Smoothie Bowl",
        description: "Thick smoothie, granola, nuts, seeds, coconut, berries, chocolate",
        nutrition: { calories: 1100, protein: 28, carbs: 148, fat: 36 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Gourmet Roasted Chickpeas",
        description: "Spiced chickpeas, nuts, seeds, dried fruit, chocolate",
        nutrition: { calories: 1050, protein: 30, carbs: 128, fat: 36 },
        dietType: "vegan",
        allergens: ["nuts"]
      },
      {
        dishName: "Premium Nut Butter Supreme",
        description: "Almond and peanut butter, nuts, seeds, fruit, chocolate, honey",
        nutrition: { calories: 1100, protein: 32, carbs: 118, fat: 48 },
        dietType: "vegan",
        allergens: ["nuts"]
      }
    ]
  }
};

export { mealTemplatesTier3 };