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
        dishName: 'Loaded Veggie Omelette Platter',
        description:
          '4 large eggs (200g), 1/2 cup cheese (56g), 1 cup vegetables (150g), 2 slices whole wheat toast (70g), 2 tbsp butter (28g), 1/2 avocado (75g)',
        nutrition: {
          calories: 720,
          protein: 42,
          carbs: 38,
          fat: 44,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Protein Pancake Stack',
        description:
          '4 protein pancakes (200g with 40g protein powder), 3 tbsp maple syrup (60g), 2 tbsp almond butter (32g), 1 banana (118g), 1 tbsp butter (14g)',
        nutrition: {
          calories: 780,
          protein: 46,
          carbs: 96,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['nuts', 'dairy', 'gluten'],
      },
      {
        dishName: 'Mediterranean Breakfast Bowl',
        description:
          '1.5 cups Greek yogurt (340g), 3/4 cup granola (90g), 1 cup mixed berries (150g), 3 tbsp honey (63g), 1/4 cup walnuts (30g)',
        nutrition: {
          calories: 750,
          protein: 34,
          carbs: 98,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['dairy', 'nuts', 'gluten'],
      },
      {
        dishName: 'Shakshuka with Bread',
        description:
          '3 eggs (150g), 1 cup tomato sauce (245g), 1/4 cup feta cheese (38g), 2 slices sourdough (80g), 2 tbsp olive oil (28g), olives (20g)',
        nutrition: {
          calories: 660,
          protein: 30,
          carbs: 58,
          fat: 34,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Breakfast Quesadilla Platter',
        description:
          '2 large flour tortillas (140g), 3 scrambled eggs (150g), 1 cup cheese (113g), 1/2 cup black beans (86g), 1/4 cup sour cream (60g), 1/2 avocado (75g)',
        nutrition: {
          calories: 850,
          protein: 46,
          carbs: 64,
          fat: 46,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Loaded Avocado Toast',
        description:
          '3 slices sourdough bread (120g), 1 whole avocado (150g), 3 poached eggs (150g), 1/4 cup feta (38g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 810,
          protein: 32,
          carbs: 64,
          fat: 50,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chole Bhature',
        description:
          '1.5 cups chickpea curry (300g), 2 bhature (160g), 1/4 cup yogurt (60g), pickles, 1 tbsp ghee (14g)',
        nutrition: {
          calories: 820,
          protein: 26,
          carbs: 116,
          fat: 28,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Belgian Waffle Breakfast',
        description:
          '2 Belgian waffles (150g), 1/4 cup whipped cream (60g), 3 tbsp maple syrup (60g), 1 cup strawberries (152g), 2 tbsp Nutella (37g)',
        nutrition: {
          calories: 690,
          protein: 14,
          carbs: 108,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten', 'nuts'],
      },
      {
        dishName: 'Full English Vegetarian',
        description:
          '2 veggie sausages (100g), 2 fried eggs (100g), 1 cup baked beans (254g), 2 slices toast (70g), 1 grilled tomato (123g), mushrooms (70g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 740,
          protein: 34,
          carbs: 82,
          fat: 30,
        },
        dietType: 'veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Stuffed French Toast',
        description:
          '3 slices French toast (150g), 1/4 cup cream cheese (60g), 1/2 cup strawberries (76g), 3 tbsp maple syrup (60g), 2 tbsp butter (28g), powdered sugar',
        nutrition: {
          calories: 770,
          protein: 20,
          carbs: 96,
          fat: 34,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Paratha Breakfast Thali',
        description:
          '2 aloo parathas (200g), 1/2 cup paneer curry (125g), 1/4 cup yogurt (60g), 2 tbsp butter (28g), pickles',
        nutrition: {
          calories: 800,
          protein: 24,
          carbs: 88,
          fat: 38,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Loaded Veggie Burger',
        description:
          '1 veggie patty (120g), 1 brioche bun (80g), 2 slices cheese (56g), 1/2 avocado (75g), 1.5 cups sweet potato fries (180g), 2 tbsp mayo (28g)',
        nutrition: {
          calories: 820,
          protein: 28,
          carbs: 96,
          fat: 38,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Paneer Tikka Masala Meal',
        description:
          '200g paneer in tikka masala sauce, 1 cup basmati rice (158g), 1 naan bread (80g), side salad (75g), 2 tbsp raita (30g)',
        nutrition: {
          calories: 780,
          protein: 32,
          carbs: 92,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Mediterranean Mezze Platter',
        description:
          '3/4 cup hummus (180g), 5 falafel balls (150g), 1 whole wheat pita (80g), 1/2 cup tabbouleh (90g), 1/4 cup baba ganoush (60g), olives (30g)',
        nutrition: {
          calories: 750,
          protein: 26,
          carbs: 88,
          fat: 34,
        },
        dietType: 'veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Cheese Pizza with Salad',
        description:
          '3 slices pizza (300g), fresh mozzarella (100g), 2 cups side salad (100g), 2 tbsp Caesar dressing (30g), garlic bread (50g)',
        nutrition: {
          calories: 860,
          protein: 36,
          carbs: 92,
          fat: 40,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Loaded Nachos',
        description:
          '2 cups tortilla chips (100g), 1 cup black beans (172g), 3/4 cup cheese (85g), 1/2 cup sour cream (120g), 1/2 avocado (75g), salsa (60g)',
        nutrition: {
          calories: 840,
          protein: 32,
          carbs: 76,
          fat: 48,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Vegetable Pad Thai',
        description:
          '200g rice noodles, 150g tofu, 1.5 cups vegetables (225g), 4 tbsp pad thai sauce (60g), 1/4 cup peanuts (36g), egg (50g)',
        nutrition: {
          calories: 730,
          protein: 28,
          carbs: 98,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['nuts'],
      },
      {
        dishName: 'Spinach Artichoke Pasta',
        description:
          '2 cups cooked penne (280g), 1 cup spinach artichoke sauce with cream (240g), 1/4 cup parmesan (25g), 2 slices garlic bread (70g)',
        nutrition: {
          calories: 810,
          protein: 30,
          carbs: 104,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Buddha Bowl Deluxe',
        description:
          '1 cup quinoa (185g), 1 cup roasted chickpeas (164g), 1.5 cups roasted vegetables (225g), 1/2 avocado (75g), 3 tbsp tahini dressing (45g)',
        nutrition: {
          calories: 760,
          protein: 28,
          carbs: 96,
          fat: 30,
        },
        dietType: 'veg',
        allergens: [],
      },
      {
        dishName: 'Grilled Cheese & Tomato Soup',
        description:
          '2 grilled cheese sandwiches (4 slices bread 140g, 4 slices cheese 112g, 2 tbsp butter 28g), 2 cups tomato soup (480g)',
        nutrition: {
          calories: 880,
          protein: 32,
          carbs: 88,
          fat: 46,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Vegetable Biryani Platter',
        description:
          '2 cups vegetable biryani (400g), 1/4 cup raita (60g), 1/4 cup curry (60g), papadum (10g), pickles',
        nutrition: {
          calories: 720,
          protein: 18,
          carbs: 112,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Caprese Panini with Soup',
        description:
          '1 panini (150g) with mozzarella (100g), tomatoes (100g), pesto (30g), 1.5 cups minestrone soup (360g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 690,
          protein: 32,
          carbs: 68,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten', 'nuts'],
      },
    ],
    Dinner: [
      {
        dishName: 'Eggplant Parmesan Deluxe',
        description:
          '250g breaded eggplant, 3/4 cup marinara (180g), 3/4 cup mozzarella (85g), 1/3 cup parmesan (33g), 1.5 cups spaghetti (210g)',
        nutrition: {
          calories: 820,
          protein: 36,
          carbs: 92,
          fat: 34,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Stuffed Portobello Mushrooms',
        description:
          '2 large portobello caps (168g), 1 cup quinoa stuffing (185g), 1/2 cup cheese (56g), 1 cup roasted vegetables (150g), 2 tbsp pesto (30g)',
        nutrition: {
          calories: 710,
          protein: 30,
          carbs: 78,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'nuts'],
      },
      {
        dishName: 'Vegetable Lasagna Deluxe',
        description:
          '1 large serving (350g) with ricotta (120g), mozzarella (70g), 1.5 cups vegetables (225g), marinara (150g), garlic bread (50g)',
        nutrition: {
          calories: 780,
          protein: 38,
          carbs: 84,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Palak Paneer Thali',
        description:
          '1.5 cups palak paneer (375g with 150g paneer), 1 cup rice (158g), 2 rotis (100g), 1/4 cup dal (60g), 1 tbsp ghee (14g)',
        nutrition: {
          calories: 850,
          protein: 36,
          carbs: 96,
          fat: 36,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Vegetable Stir-Fry Deluxe',
        description:
          '200g tofu, 2 cups vegetables (300g), 1.5 cups jasmine rice (237g), 3 tbsp teriyaki sauce (54g), 2 tbsp cashews (18g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 790,
          protein: 32,
          carbs: 112,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['nuts'],
      },
      {
        dishName: 'Fettuccine Alfredo',
        description:
          '2 cups fettuccine (280g), 1 cup Alfredo sauce (240g), 1/3 cup parmesan (33g), 1 cup broccoli (156g), 2 slices garlic bread (70g)',
        nutrition: {
          calories: 880,
          protein: 32,
          carbs: 104,
          fat: 40,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Black Bean Enchilada Plate',
        description:
          '3 corn tortillas (78g), 1 cup black beans (172g), 3/4 cup cheese (85g), 1/2 cup enchilada sauce (120g), 1/4 cup sour cream (60g), rice (79g)',
        nutrition: {
          calories: 760,
          protein: 34,
          carbs: 96,
          fat: 28,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Vegetable Curry Feast',
        description:
          '2 cups mixed vegetable curry (400g), 1 cup basmati rice (158g), 1 naan (80g), 1/4 cup raita (60g), 2 tbsp coconut milk (30g)',
        nutrition: {
          calories: 740,
          protein: 20,
          carbs: 120,
          fat: 22,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Mushroom Risotto Deluxe',
        description:
          '1.5 cups arborio rice (263g), 1.5 cups mushrooms (105g), 1/3 cup parmesan (33g), 3 tbsp butter (42g), white wine (120ml)',
        nutrition: {
          calories: 810,
          protein: 24,
          carbs: 112,
          fat: 28,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Cheese Ravioli Dinner',
        description:
          '2 cups cheese ravioli (334g), 3/4 cup marinara (180g), 1/4 cup parmesan (25g), 2 slices garlic bread (70g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 830,
          protein: 34,
          carbs: 108,
          fat: 30,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Loaded Vegetarian Burrito',
        description:
          '1 large tortilla (90g), 1 cup brown rice (195g), 1 cup black beans (172g), 1/2 cup cheese (56g), 1/2 avocado (75g), sour cream (60g)',
        nutrition: {
          calories: 870,
          protein: 34,
          carbs: 116,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
  },
  'non-veg': {
    Breakfast: [
      {
        dishName: 'Steak and Eggs',
        description:
          '150g sirloin steak, 3 eggs (150g), 1 cup hash browns (150g), 2 slices toast (70g), 2 tbsp butter (28g)',
        nutrition: {
          calories: 850,
          protein: 54,
          carbs: 52,
          fat: 48,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Breakfast Burrito Grande',
        description:
          '1 large tortilla (90g), 120g chorizo, 3 scrambled eggs (150g), 1/2 cup cheese (56g), 1/2 cup potatoes (75g), 1/4 avocado (38g), salsa (30g)',
        nutrition: {
          calories: 880,
          protein: 46,
          carbs: 58,
          fat: 52,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Smoked Salmon Platter',
        description:
          '150g smoked salmon, 2 bagels (190g), 4 tbsp cream cheese (60g), 1/2 red onion (56g), capers (20g), 2 eggs (100g)',
        nutrition: {
          calories: 810,
          protein: 48,
          carbs: 76,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Full English Breakfast',
        description:
          '3 sausages (105g), 3 strips bacon (51g), 2 eggs (100g), 1 cup baked beans (254g), 2 toast (70g), grilled tomato (123g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 820,
          protein: 42,
          carbs: 72,
          fat: 42,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Chicken and Waffles',
        description:
          '150g fried chicken tenders, 2 Belgian waffles (150g), 3 tbsp maple syrup (60g), 2 tbsp butter (28g)',
        nutrition: {
          calories: 780,
          protein: 42,
          carbs: 88,
          fat: 30,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Breakfast Sandwich Combo',
        description:
          '2 breakfast sandwiches (2 English muffins 114g, 4 sausage patties 120g, 2 eggs 100g, 2 cheese slices 56g), hash browns (100g)',
        nutrition: {
          calories: 860,
          protein: 44,
          carbs: 68,
          fat: 46,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shrimp and Grits Deluxe',
        description:
          '150g saut\u00e9ed shrimp, 1.5 cups cooked grits (363g), 2 tbsp butter (28g), 3 tbsp cheese (21g), bacon (34g)',
        nutrition: {
          calories: 740,
          protein: 42,
          carbs: 78,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Turkish Menemen with Sucuk',
        description:
          '3 eggs (150g), 100g sucuk sausage, 1 cup tomato pepper mixture (200g), 2 slices bread (70g), 1/4 cup feta (38g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 770,
          protein: 40,
          carbs: 46,
          fat: 46,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Sausage Hash',
        description:
          '3 chicken sausages (150g), 1.5 cups diced potatoes (225g), 2 eggs (100g), 1 cup vegetables (150g), 1/2 cup cheese (56g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 830,
          protein: 48,
          carbs: 66,
          fat: 40,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Huevos Rancheros',
        description:
          '3 corn tortillas (78g), 3 fried eggs (150g), 1 cup refried beans (252g), 1/2 cup salsa (120g), 1/2 avocado (75g), 1/4 cup cheese (28g)',
        nutrition: {
          calories: 790,
          protein: 38,
          carbs: 76,
          fat: 38,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Eggs Benedict Double',
        description:
          '2 English muffins (114g), 4 slices Canadian bacon (112g), 4 poached eggs (200g), 1/2 cup hollandaise sauce (120g)',
        nutrition: {
          calories: 870,
          protein: 46,
          carbs: 48,
          fat: 54,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Grilled Chicken Bowl Deluxe',
        description:
          '180g grilled chicken, 1 cup brown rice (195g), 1.5 cups roasted vegetables (225g), 1/2 avocado (75g), 2 tbsp tahini (30g)',
        nutrition: {
          calories: 810,
          protein: 56,
          carbs: 78,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Beef Burger Combo',
        description:
          '150g beef patty, 1 brioche bun (80g), 2 slices cheese (56g), bacon (34g), 2 cups french fries (240g), 2 tbsp mayo (28g)',
        nutrition: {
          calories: 1020,
          protein: 48,
          carbs: 96,
          fat: 52,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Caesar Wrap Combo',
        description:
          '1 large wrap (90g) with 150g chicken, romaine (75g), parmesan (20g), Caesar dressing (45g), side of chips (40g), apple (180g)',
        nutrition: {
          calories: 750,
          protein: 48,
          carbs: 68,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Salmon Poke Bowl',
        description:
          '150g raw salmon, 1 cup sushi rice (158g), 1/2 avocado (75g), 1/2 cup edamame (75g), seaweed, 2 tbsp soy sauce (36g), 1 tbsp sesame oil (14g)',
        nutrition: {
          calories: 780,
          protein: 46,
          carbs: 76,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Tikka Masala Plate',
        description:
          '200g chicken tikka masala, 1 cup basmati rice (158g), 1 naan (80g), 1/4 cup raita (60g), side salad (50g)',
        nutrition: {
          calories: 850,
          protein: 52,
          carbs: 96,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Fish and Chips',
        description:
          '200g battered fish, 2 cups thick-cut chips (300g), 1/4 cup tartar sauce (60g), mushy peas (100g), lemon',
        nutrition: {
          calories: 880,
          protein: 42,
          carbs: 102,
          fat: 36,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Chicken Burrito',
        description:
          '1 large tortilla (90g), 150g chicken, 1 cup rice (195g), 3/4 cup black beans (130g), 1/2 cup cheese (56g), guacamole (60g), sour cream (60g)',
        nutrition: {
          calories: 920,
          protein: 56,
          carbs: 104,
          fat: 34,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Teriyaki Chicken Plate',
        description:
          '180g chicken with teriyaki glaze (40g), 1.5 cups jasmine rice (237g), 1 cup vegetables (150g), 2 spring rolls (80g)',
        nutrition: {
          calories: 830,
          protein: 52,
          carbs: 118,
          fat: 18,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Steak Fajita Platter',
        description:
          '150g grilled steak, 3 flour tortillas (210g), 1 cup peppers/onions (150g), 1/2 cup cheese (56g), guacamole (60g), sour cream (60g)',
        nutrition: {
          calories: 870,
          protein: 52,
          carbs: 76,
          fat: 42,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Shawarma Plate',
        description:
          '180g chicken shawarma, 2 pita breads (120g), 1/2 cup hummus (120g), tabbouleh (90g), 1/4 cup tahini sauce (60g)',
        nutrition: {
          calories: 800,
          protein: 54,
          carbs: 84,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tuna Avocado Bowl',
        description:
          '150g seared tuna, 1 cup quinoa (185g), 1 avocado (150g), 1/2 cup edamame (75g), 2 tbsp soy-ginger dressing (30g)',
        nutrition: {
          calories: 760,
          protein: 52,
          carbs: 64,
          fat: 34,
        },
        dietType: 'non-veg',
        allergens: [],
      },
    ],
    Dinner: [
      {
        dishName: 'Grilled Salmon Dinner',
        description:
          '200g grilled salmon, 1 cup brown rice (195g), 1.5 cups roasted vegetables (225g), 2 tbsp butter (28g), lemon',
        nutrition: {
          calories: 820,
          protein: 54,
          carbs: 76,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Parmesan',
        description:
          '200g breaded chicken breast, 3/4 cup marinara (180g), 3/4 cup mozzarella (85g), 1.5 cups spaghetti (210g), 2 slices garlic bread (70g)',
        nutrition: {
          calories: 980,
          protein: 62,
          carbs: 104,
          fat: 38,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Beef Stir-Fry',
        description:
          '180g beef strips, 2 cups vegetables (300g), 1.5 cups jasmine rice (237g), 3 tbsp stir-fry sauce (45g), 1 tbsp sesame oil (14g)',
        nutrition: {
          calories: 850,
          protein: 52,
          carbs: 104,
          fat: 26,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Butter Chicken Feast',
        description:
          '200g chicken in butter sauce, 1 cup basmati rice (158g), 1 naan (80g), 1/4 cup dal (60g), 1/4 cup raita (60g)',
        nutrition: {
          calories: 880,
          protein: 48,
          carbs: 104,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shrimp Scampi Dinner',
        description:
          '180g shrimp, 2 cups linguine (280g), 3 tbsp butter (42g), garlic, white wine (60ml), 2 slices garlic bread (70g)',
        nutrition: {
          calories: 830,
          protein: 48,
          carbs: 96,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Grilled Chicken Thighs Meal',
        description:
          '200g chicken thighs, 1.5 cups mashed potatoes (300g), 1 cup green beans (125g), 2 tbsp gravy (30g), 1 tbsp butter (14g)',
        nutrition: {
          calories: 790,
          protein: 52,
          carbs: 72,
          fat: 34,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Teriyaki Salmon Bowl',
        description:
          '180g teriyaki salmon, 1.5 cups rice (237g), 1 cup edamame (150g), 1/2 cup pickled vegetables (75g), 1 tbsp sesame seeds (9g)',
        nutrition: {
          calories: 860,
          protein: 56,
          carbs: 104,
          fat: 24,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Steak with Potatoes',
        description:
          '180g ribeye steak, 1.5 cups roasted potatoes (225g), 1 cup asparagus (134g), 2 tbsp herb butter (28g)',
        nutrition: {
          calories: 820,
          protein: 54,
          carbs: 68,
          fat: 38,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Tandoori Chicken Platter',
        description:
          '200g tandoori chicken, 1 cup rice (158g), 1 cup dal (200g), 1 roti (50g), side salad (50g)',
        nutrition: {
          calories: 770,
          protein: 58,
          carbs: 88,
          fat: 20,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Fajita Plate',
        description:
          '180g chicken strips, 3 tortillas (210g), 1.5 cups peppers/onions (225g), 1/2 cup cheese (56g), sour cream (60g), guacamole (60g)',
        nutrition: {
          calories: 890,
          protein: 58,
          carbs: 82,
          fat: 36,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Blackened Mahi Mahi',
        description:
          '200g mahi mahi, 1 cup dirty rice (195g), 1 cup collard greens (190g), cornbread (60g), 1 tbsp butter (14g)',
        nutrition: {
          calories: 760,
          protein: 52,
          carbs: 88,
          fat: 22,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
  },
  vegan: {
    Breakfast: [
      {
        dishName: 'Vegan Protein Power Bowl',
        description:
          '1.5 scoops vegan protein powder (45g), 2 cups oat milk (480ml), 2 frozen bananas (236g), 1/2 cup granola (60g), 3 tbsp almond butter (48g), berries (100g)',
        nutrition: {
          calories: 820,
          protein: 42,
          carbs: 112,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Tofu Scramble Deluxe',
        description:
          '300g firm tofu, 1.5 cups vegetables (225g), 3 slices whole wheat toast (105g), 1 avocado (150g), 2 tbsp nutritional yeast (10g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 780,
          protein: 42,
          carbs: 72,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Loaded Overnight Oats',
        description:
          '1.5 cups rolled oats (122g), 1.5 cups oat milk (360ml), 3 tbsp chia seeds (36g), 3 tbsp maple syrup (60g), 1 cup berries (150g), 1/4 cup walnuts (30g), 2 tbsp peanut butter (32g)',
        nutrition: {
          calories: 850,
          protein: 26,
          carbs: 124,
          fat: 32,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan Pancake Stack',
        description:
          '4 large pancakes (200g), 1/4 cup maple syrup (80g), 3 tbsp peanut butter (48g), 1 banana (118g), 2 tbsp vegan butter (28g), 1/2 cup berries (75g)',
        nutrition: {
          calories: 880,
          protein: 20,
          carbs: 136,
          fat: 32,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Tempeh Breakfast Hash',
        description:
          '150g tempeh bacon, 2 cups diced potatoes (300g), 1.5 cups vegetables (225g), 1 avocado (150g), 2 tbsp oil (28g)',
        nutrition: {
          calories: 830,
          protein: 32,
          carbs: 92,
          fat: 40,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Breakfast Burrito Grande',
        description:
          '1 large tortilla (90g), 250g tofu scramble, 3/4 cup black beans (130g), 1/2 avocado (75g), 1/4 cup vegan cheese (28g), salsa (60g), potatoes (100g)',
        nutrition: {
          calories: 790,
          protein: 38,
          carbs: 96,
          fat: 30,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Acai Bowl Deluxe',
        description:
          '3 packs acai (300g), 2 frozen bananas (236g), 3/4 cup granola (90g), 3 tbsp almond butter (48g), 3/4 cup berries (113g), 2 tbsp coconut flakes (10g)',
        nutrition: {
          calories: 840,
          protein: 20,
          carbs: 118,
          fat: 36,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Chickpea Flour Pancakes',
        description:
          '1 cup chickpea flour (120g), 1.5 cups vegetables (225g), 1/4 cup nutritional yeast (20g), 3 slices toast (105g), 1/2 avocado (75g), 2 tbsp oil (28g)',
        nutrition: {
          calories: 760,
          protein: 32,
          carbs: 88,
          fat: 32,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan French Toast Platter',
        description:
          '4 slices French toast (140g), 1/4 cup maple syrup (80g), 2 tbsp vegan butter (28g), 1/2 cup berries (75g), 2 tbsp almond butter (32g), powdered sugar',
        nutrition: {
          calories: 770,
          protein: 16,
          carbs: 124,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Quinoa Breakfast Bowl Deluxe',
        description:
          '1.5 cups cooked quinoa (278g), 1.5 cups almond milk (360ml), 3 tbsp maple syrup (60g), 1/2 cup almonds (72g), 3/4 cup berries (113g), 2 tbsp chia seeds (24g)',
        nutrition: {
          calories: 880,
          protein: 30,
          carbs: 124,
          fat: 34,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Peanut Butter Banana Toast Stack',
        description:
          '3 slices whole grain bread (105g), 4 tbsp peanut butter (64g), 1.5 bananas (204g), 2 tbsp agave (42g), 1 tbsp chia seeds (12g), 1 tbsp coconut flakes (5g)',
        nutrition: {
          calories: 850,
          protein: 26,
          carbs: 116,
          fat: 36,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Buddha Bowl Supreme',
        description:
          '1 cup quinoa (185g), 1.5 cups roasted chickpeas (246g), 1.5 cups roasted vegetables (225g), 1 avocado (150g), 4 tbsp tahini dressing (60g)',
        nutrition: {
          calories: 880,
          protein: 34,
          carbs: 106,
          fat: 40,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Burrito Bowl Loaded',
        description:
          '1 cup brown rice (195g), 1 cup black beans (172g), 3/4 cup corn (123g), 1 avocado (150g), 1/4 cup guacamole (60g), salsa (60g), tortilla chips (40g)',
        nutrition: {
          calories: 840,
          protein: 28,
          carbs: 128,
          fat: 28,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Falafel Wrap Deluxe',
        description:
          '1 large whole wheat tortilla (90g), 6 falafel balls (180g), 1/2 cup hummus (120g), 1.5 cups vegetables (225g), 2 tbsp tahini (30g)',
        nutrition: {
          calories: 820,
          protein: 30,
          carbs: 104,
          fat: 34,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Lentil Curry Feast',
        description:
          '2 cups lentil curry (400g), 1 cup basmati rice (158g), 1 vegan naan (80g), 3 tbsp coconut milk (45g), samosa (60g)',
        nutrition: {
          calories: 790,
          protein: 32,
          carbs: 128,
          fat: 18,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tofu Banh Mi Deluxe',
        description:
          '1 large baguette (130g), 150g marinated tofu, pickled vegetables (100g), 1/2 avocado (75g), cilantro, jalape\u00f1os, 2 tbsp vegan mayo (28g)',
        nutrition: {
          calories: 730,
          protein: 28,
          carbs: 98,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Pasta Alfredo',
        description:
          '2 cups pasta (280g), 2 cups vegetables (300g), 3/4 cup cashew cream (180g), 3 tbsp nutritional yeast (15g), 2 tbsp olive oil (28g)',
        nutrition: {
          calories: 880,
          protein: 30,
          carbs: 116,
          fat: 36,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Loaded Vegan Sandwich',
        description:
          '2 slices whole wheat bread (70g), 1 cup mashed chickpeas (164g), 2 tbsp vegan mayo (28g), vegetables (100g), 1 avocado (150g), chips (40g)',
        nutrition: {
          calories: 760,
          protein: 26,
          carbs: 94,
          fat: 32,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Asian Noodle Bowl Deluxe',
        description:
          '200g rice noodles, 200g tofu, 2 cups vegetables (300g), 3 tbsp peanut sauce (48g), 1/4 cup peanuts (36g), 1 tbsp sesame oil (14g)',
        nutrition: {
          calories: 850,
          protein: 36,
          carbs: 104,
          fat: 34,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Mexican Rice Bowl Loaded',
        description:
          '1.5 cups brown rice (293g), 1 cup pinto beans (172g), 3/4 cup corn (123g), 1/2 avocado (75g), salsa (60g), tortilla chips (40g)',
        nutrition: {
          calories: 820,
          protein: 26,
          carbs: 144,
          fat: 18,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Sushi Bowl Deluxe',
        description:
          '1.5 cups sushi rice (237g), 150g marinated tofu, 1 avocado (150g), 1/2 cup edamame (75g), vegetables (100g), 2 tbsp soy sauce (36g)',
        nutrition: {
          calories: 800,
          protein: 32,
          carbs: 116,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Mediterranean Bowl Grande',
        description:
          '1 cup farro (175g), 3/4 cup hummus (180g), 1.5 cups roasted vegetables (225g), 1/2 cup olives (67g), 2 tbsp olive oil (28g), pita (60g)',
        nutrition: {
          calories: 870,
          protein: 26,
          carbs: 110,
          fat: 40,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
    Dinner: [
      {
        dishName: 'Vegan Chili Feast',
        description:
          '2 cups three-bean chili (480g), 1 cup brown rice (195g), 1/4 cup vegan sour cream (60g), 1 avocado (150g), cornbread (60g)',
        nutrition: {
          calories: 860,
          protein: 32,
          carbs: 132,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Stir-Fried Tofu Deluxe',
        description:
          '250g firm tofu, 2.5 cups vegetables (375g), 1.5 cups jasmine rice (237g), 3 tbsp soy sauce (54g), 1 tbsp sesame oil (14g), cashews (28g)',
        nutrition: {
          calories: 830,
          protein: 38,
          carbs: 112,
          fat: 28,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan Pad Thai Deluxe',
        description:
          '200g rice noodles, 150g tofu, 1.5 cups vegetables (225g), 4 tbsp pad thai sauce (60g), 1/4 cup peanuts (36g), lime, bean sprouts (50g)',
        nutrition: {
          calories: 780,
          protein: 30,
          carbs: 108,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Lentil Bolognese Feast',
        description:
          '2 cups pasta (280g), 1.5 cups lentil bolognese (360g), 3 tbsp nutritional yeast (15g), 2 tbsp olive oil (28g), garlic bread (70g)',
        nutrition: {
          calories: 880,
          protein: 38,
          carbs: 136,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Enchilada Plate',
        description:
          '3 corn tortillas (78g), 1 cup black beans (172g), 1 cup vegetables (150g), 1/2 cup enchilada sauce (120g), 1 avocado (150g), 1/2 cup vegan cheese (56g), rice (79g)',
        nutrition: {
          calories: 820,
          protein: 30,
          carbs: 116,
          fat: 30,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Teriyaki Tempeh Bowl Deluxe',
        description:
          '200g tempeh, 1.5 cups brown rice (293g), 1.5 cups broccoli (234g), 3 tbsp teriyaki sauce (54g), 2 tbsp sesame seeds (18g)',
        nutrition: {
          calories: 850,
          protein: 42,
          carbs: 120,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Curry Platter',
        description:
          '2 cups vegetable curry (400g), 1 cup brown rice (195g), 1 vegan naan (80g), 3 tbsp coconut milk (45g), samosa (60g)',
        nutrition: {
          calories: 800,
          protein: 22,
          carbs: 132,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Loaded Sweet Potato',
        description:
          '1 extra large sweet potato (240g), 1 cup black beans (172g), 1/2 cup corn (82g), 1 avocado (150g), 3 tbsp salsa (45g), 2 tbsp tahini (30g)',
        nutrition: {
          calories: 790,
          protein: 28,
          carbs: 124,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Pizza Loaded',
        description:
          '3 slices thick crust (300g), 3/4 cup marinara (180g), vegan mozzarella (85g), 1.5 cups vegetables (225g), 2 tbsp olive oil (28g)',
        nutrition: {
          calories: 860,
          protein: 26,
          carbs: 116,
          fat: 34,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Mushroom Stroganoff Deluxe',
        description:
          '2.5 cups mushrooms (175g), 2 cups pasta (280g), 3/4 cup cashew cream (180g), 1/3 cup nutritional yeast (33g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 840,
          protein: 34,
          carbs: 112,
          fat: 32,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Vegan Fried Rice Deluxe',
        description:
          '2 cups cooked rice (316g), 1.5 cups mixed vegetables (225g), 150g tofu, 3 tbsp soy sauce (54g), 1 tbsp sesame oil (14g), 1/2 cup peas (75g), cashews (28g)',
        nutrition: {
          calories: 820,
          protein: 30,
          carbs: 124,
          fat: 26,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan BBQ Jackfruit Plate',
        description:
          '2 cups pulled jackfruit (300g), 1 whole wheat bun (80g), 1.5 cups baked fries (225g), coleslaw (100g), 3 tbsp BBQ sauce (51g)',
        nutrition: {
          calories: 770,
          protein: 16,
          carbs: 144,
          fat: 18,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
  },
}

export { mealTemplatesTier2 }
