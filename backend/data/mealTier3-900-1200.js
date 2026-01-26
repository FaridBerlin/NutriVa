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
        dishName: 'Ultimate Breakfast Platter',
        description:
          '4 large eggs (200g), 1 cup cheese (113g), 1.5 cups vegetables (225g), 3 slices toast (105g), 3 tbsp butter (42g), 1 avocado (150g), hash browns (150g)',
        nutrition: {
          calories: 1080,
          protein: 54,
          carbs: 68,
          fat: 66,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Mega Protein Pancakes',
        description:
          '5 protein pancakes (250g with 50g protein powder), 1/4 cup maple syrup (80g), 3 tbsp almond butter (48g), 1.5 bananas (204g), 2 tbsp butter (28g), whipped cream (30g)',
        nutrition: {
          calories: 1020,
          protein: 58,
          carbs: 128,
          fat: 34,
        },
        dietType: 'veg',
        allergens: ['nuts', 'dairy', 'gluten'],
      },
      {
        dishName: 'Greek Yogurt Feast',
        description:
          '2 cups Greek yogurt (454g), 1 cup granola (120g), 1.5 cups mixed berries (225g), 1/4 cup honey (85g), 1/2 cup walnuts (60g), 2 tbsp chia seeds (24g)',
        nutrition: {
          calories: 1140,
          protein: 52,
          carbs: 148,
          fat: 40,
        },
        dietType: 'veg',
        allergens: ['dairy', 'nuts', 'gluten'],
      },
      {
        dishName: 'Shakshuka Deluxe',
        description:
          '4 eggs (200g), 1.5 cups tomato sauce (368g), 1/2 cup feta cheese (75g), 3 slices sourdough (120g), 3 tbsp olive oil (42g), olives (30g), avocado (150g)',
        nutrition: {
          calories: 1100,
          protein: 48,
          carbs: 88,
          fat: 60,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Ultimate Breakfast Burrito',
        description:
          '2 large tortillas (180g), 4 scrambled eggs (200g), 1.5 cups cheese (170g), 1 cup black beans (172g), 1 avocado (150g), sour cream (120g), potatoes (150g)',
        nutrition: {
          calories: 1180,
          protein: 66,
          carbs: 102,
          fat: 56,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Loaded Avocado Toast Platter',
        description:
          '4 slices sourdough (160g), 2 avocados (300g), 4 poached eggs (200g), 1/2 cup feta (75g), 2 tbsp olive oil (28g), side fruit (150g)',
        nutrition: {
          calories: 1140,
          protein: 46,
          carbs: 96,
          fat: 70,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chole Bhature Feast',
        description:
          '2 cups chickpea curry (400g), 3 bhature (240g), 1/2 cup yogurt (120g), pickles, 2 tbsp ghee (28g), lassi (200ml)',
        nutrition: {
          calories: 1160,
          protein: 38,
          carbs: 164,
          fat: 40,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Belgian Waffle Stack',
        description:
          '3 Belgian waffles (225g), 1/2 cup whipped cream (120g), 1/4 cup maple syrup (80g), 1.5 cups strawberries (228g), 3 tbsp Nutella (56g), 2 scoops ice cream (100g)',
        nutrition: {
          calories: 1050,
          protein: 20,
          carbs: 156,
          fat: 42,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten', 'nuts'],
      },
      {
        dishName: 'Full English Deluxe',
        description:
          '3 veggie sausages (150g), 3 fried eggs (150g), 1.5 cups baked beans (381g), 3 slices toast (105g), 2 grilled tomatoes (246g), mushrooms (100g), hash browns (150g), 2 tbsp oil (28g)',
        nutrition: {
          calories: 1020,
          protein: 48,
          carbs: 118,
          fat: 42,
        },
        dietType: 'veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Stuffed French Toast Deluxe',
        description:
          '4 slices French toast (200g), 1/2 cup cream cheese (120g), 1 cup strawberries (152g), 1/4 cup maple syrup (80g), 3 tbsp butter (42g), powdered sugar, whipped cream (60g)',
        nutrition: {
          calories: 1090,
          protein: 28,
          carbs: 136,
          fat: 52,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Paratha Thali Supreme',
        description:
          '3 aloo parathas (300g), 1 cup paneer curry (250g), 1/2 cup yogurt (120g), 3 tbsp butter (42g), pickles, lassi (150ml)',
        nutrition: {
          calories: 1150,
          protein: 38,
          carbs: 132,
          fat: 54,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Loaded Veggie Burger Deluxe',
        description:
          '2 veggie patties (240g), 1 brioche bun (80g), 3 slices cheese (84g), 1 avocado (150g), 2 cups sweet potato fries (240g), 3 tbsp mayo (42g), onion rings (100g)',
        nutrition: {
          calories: 1140,
          protein: 42,
          carbs: 128,
          fat: 54,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Paneer Tikka Feast',
        description:
          '300g paneer in tikka masala, 1.5 cups rice (237g), 2 naans (160g), 1/4 cup raita (60g), samosa (80g), side salad (75g)',
        nutrition: {
          calories: 1180,
          protein: 48,
          carbs: 136,
          fat: 48,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Mediterranean Mezze Feast',
        description:
          '1 cup hummus (240g), 7 falafel balls (210g), 2 pitas (160g), 3/4 cup tabbouleh (135g), 1/2 cup baba ganoush (120g), olives (50g), 1/2 cup tzatziki (120g)',
        nutrition: {
          calories: 1090,
          protein: 38,
          carbs: 132,
          fat: 48,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Pizza Feast',
        description:
          '4 slices pizza (400g), fresh mozzarella (150g), 2 cups side salad (100g), 3 tbsp Caesar dressing (45g), 2 garlic bread pieces (100g), dessert (80g)',
        nutrition: {
          calories: 1200,
          protein: 52,
          carbs: 128,
          fat: 54,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Loaded Nachos Supreme',
        description:
          '2.5 cups tortilla chips (125g), 1.5 cups black beans (258g), 1 cup cheese (113g), 3/4 cup sour cream (180g), 1 avocado (150g), salsa (90g), jalape\u00f1os',
        nutrition: {
          calories: 1160,
          protein: 48,
          carbs: 108,
          fat: 64,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Pad Thai Deluxe',
        description:
          '250g rice noodles, 200g tofu, 2 cups vegetables (300g), 5 tbsp pad thai sauce (75g), 1/2 cup peanuts (72g), 2 eggs (100g), spring rolls (100g)',
        nutrition: {
          calories: 1080,
          protein: 44,
          carbs: 136,
          fat: 42,
        },
        dietType: 'veg',
        allergens: ['nuts'],
      },
      {
        dishName: 'Pasta Alfredo Feast',
        description:
          '2.5 cups penne (350g), 1.5 cups Alfredo sauce (360g), 1/2 cup parmesan (50g), 1.5 cups broccoli (234g), 3 slices garlic bread (105g)',
        nutrition: {
          calories: 1180,
          protein: 46,
          carbs: 136,
          fat: 54,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Buddha Bowl Ultimate',
        description:
          '1.5 cups quinoa (278g), 1.5 cups roasted chickpeas (246g), 2 cups roasted vegetables (300g), 1 avocado (150g), 1/4 cup tahini dressing (60g), pita (60g)',
        nutrition: {
          calories: 1060,
          protein: 42,
          carbs: 136,
          fat: 42,
        },
        dietType: 'veg',
        allergens: [],
      },
      {
        dishName: 'Grilled Cheese Combo Deluxe',
        description:
          '3 grilled cheese sandwiches (6 slices bread 210g, 6 slices cheese 168g, 3 tbsp butter 42g), 2.5 cups tomato soup (600g), chips (50g)',
        nutrition: {
          calories: 1190,
          protein: 48,
          carbs: 116,
          fat: 62,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Biryani Feast',
        description:
          '2.5 cups vegetable biryani (500g), 1/2 cup raita (120g), 1/2 cup curry (120g), 2 papadums (20g), samosa (80g), dessert (60g)',
        nutrition: {
          calories: 1020,
          protein: 28,
          carbs: 152,
          fat: 36,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Panini Combo Supreme',
        description:
          '2 paninis (300g) with mozzarella (150g), tomatoes (150g), pesto (45g), 2 cups soup (480g), side salad (100g), 2 tbsp dressing (30g)',
        nutrition: {
          calories: 1010,
          protein: 48,
          carbs: 96,
          fat: 50,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten', 'nuts'],
      },
    ],
    Dinner: [
      {
        dishName: 'Eggplant Parmesan Feast',
        description:
          '350g breaded eggplant, 1 cup marinara (245g), 1 cup mozzarella (113g), 1/2 cup parmesan (50g), 2 cups spaghetti (280g), 2 garlic bread (70g)',
        nutrition: {
          calories: 1160,
          protein: 54,
          carbs: 128,
          fat: 48,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Portobello Mushroom Feast',
        description:
          '3 large portobello caps (252g), 1.5 cups quinoa stuffing (278g), 3/4 cup cheese (85g), 1.5 cups roasted vegetables (225g), 3 tbsp pesto (45g), garlic bread (70g)',
        nutrition: {
          calories: 1020,
          protein: 44,
          carbs: 116,
          fat: 48,
        },
        dietType: 'veg',
        allergens: ['dairy', 'nuts'],
      },
      {
        dishName: 'Lasagna Deluxe',
        description:
          '1 extra large serving (450g) with ricotta (180g), mozzarella (100g), 2 cups vegetables (300g), marinara (200g), 2 garlic bread (70g), salad (100g)',
        nutrition: {
          calories: 1120,
          protein: 56,
          carbs: 116,
          fat: 50,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Palak Paneer Feast',
        description:
          '2 cups palak paneer (500g with 200g paneer), 1.5 cups rice (237g), 3 rotis (150g), 1/2 cup dal (120g), 2 tbsp ghee (28g), dessert (60g)',
        nutrition: {
          calories: 1190,
          protein: 52,
          carbs: 136,
          fat: 50,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Stir-Fry Feast',
        description:
          '300g tofu, 3 cups vegetables (450g), 2 cups jasmine rice (316g), 4 tbsp teriyaki sauce (72g), 1/4 cup cashews (36g), 2 spring rolls (100g)',
        nutrition: {
          calories: 1140,
          protein: 48,
          carbs: 156,
          fat: 38,
        },
        dietType: 'veg',
        allergens: ['nuts'],
      },
      {
        dishName: 'Fettuccine Alfredo Deluxe',
        description:
          '2.5 cups fettuccine (350g), 1.5 cups Alfredo sauce (360g), 1/2 cup parmesan (50g), 1.5 cups broccoli (234g), 3 garlic bread (105g), salad (100g)',
        nutrition: {
          calories: 1200,
          protein: 48,
          carbs: 136,
          fat: 56,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Enchilada Platter Supreme',
        description:
          '4 corn tortillas (104g), 1.5 cups black beans (258g), 1 cup cheese (113g), 3/4 cup enchilada sauce (180g), 1/2 cup sour cream (120g), 1 cup rice (158g), guacamole (90g)',
        nutrition: {
          calories: 1100,
          protein: 50,
          carbs: 136,
          fat: 42,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Curry Feast Platter',
        description:
          '2.5 cups mixed vegetable curry (500g), 1.5 cups basmati rice (237g), 2 naans (160g), 1/2 cup raita (120g), samosa (80g), 3 tbsp coconut milk (45g)',
        nutrition: {
          calories: 1080,
          protein: 32,
          carbs: 172,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Mushroom Risotto Supreme',
        description:
          '2 cups arborio rice (350g), 2 cups mushrooms (140g), 1/2 cup parmesan (50g), 4 tbsp butter (56g), white wine (150ml), garlic bread (70g)',
        nutrition: {
          calories: 1150,
          protein: 36,
          carbs: 152,
          fat: 44,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Ravioli Feast',
        description:
          '2.5 cups cheese ravioli (418g), 1 cup marinara (245g), 1/2 cup parmesan (50g), 3 garlic bread (105g), side salad (100g), 2 tbsp dressing (30g)',
        nutrition: {
          calories: 1170,
          protein: 50,
          carbs: 144,
          fat: 46,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Burrito Supreme Platter',
        description:
          '2 large tortillas (180g), 1.5 cups brown rice (293g), 1.5 cups black beans (258g), 3/4 cup cheese (85g), 1 avocado (150g), sour cream (120g), chips (50g)',
        nutrition: {
          calories: 1200,
          protein: 50,
          carbs: 152,
          fat: 48,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
  },
  'non-veg': {
    Breakfast: [
      {
        dishName: 'Steak and Eggs Deluxe',
        description:
          '200g sirloin steak, 4 eggs (200g), 1.5 cups hash browns (225g), 3 slices toast (105g), 3 tbsp butter (42g), avocado (150g)',
        nutrition: {
          calories: 1180,
          protein: 70,
          carbs: 78,
          fat: 66,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Ultimate Breakfast Burrito',
        description:
          '2 large tortillas (180g), 150g chorizo, 4 scrambled eggs (200g), 1 cup cheese (113g), 1 cup potatoes (150g), 1 avocado (150g), sour cream (120g)',
        nutrition: {
          calories: 1190,
          protein: 62,
          carbs: 88,
          fat: 68,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Smoked Salmon Feast',
        description:
          '200g smoked salmon, 2.5 bagels (238g), 5 tbsp cream cheese (75g), red onion (75g), capers (30g), 3 eggs (150g), fruit (150g)',
        nutrition: {
          calories: 1100,
          protein: 64,
          carbs: 104,
          fat: 44,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Full English Deluxe',
        description:
          '4 sausages (140g), 4 strips bacon (68g), 3 eggs (150g), 1.5 cups baked beans (381g), 3 toast (105g), 2 grilled tomatoes (246g), mushrooms (100g), 2 tbsp oil (28g)',
        nutrition: {
          calories: 1160,
          protein: 60,
          carbs: 102,
          fat: 58,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Chicken and Waffles Feast',
        description:
          '200g fried chicken, 3 Belgian waffles (225g), 1/4 cup maple syrup (80g), 3 tbsp butter (42g), 2 eggs (100g), fruit (100g)',
        nutrition: {
          calories: 1140,
          protein: 58,
          carbs: 124,
          fat: 46,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Breakfast Sandwich Platter',
        description:
          '3 breakfast sandwiches (3 English muffins 171g, 6 sausage patties 180g, 3 eggs 150g, 3 cheese slices 84g), hash browns (150g), fruit (100g)',
        nutrition: {
          calories: 1200,
          protein: 64,
          carbs: 98,
          fat: 62,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shrimp and Grits Supreme',
        description:
          '200g saut\u00e9ed shrimp, 2 cups cooked grits (484g), 3 tbsp butter (42g), 1/4 cup cheese (28g), 4 strips bacon (68g), biscuit (60g)',
        nutrition: {
          calories: 1060,
          protein: 58,
          carbs: 112,
          fat: 42,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Turkish Breakfast Feast',
        description:
          '4 eggs (200g), 150g sucuk sausage, 1.5 cups tomato pepper mixture (300g), 3 slices bread (105g), 1/2 cup feta (75g), 2 tbsp olive oil (28g), olives (40g)',
        nutrition: {
          calories: 1080,
          protein: 56,
          carbs: 68,
          fat: 64,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Ultimate Sausage Hash',
        description:
          '4 chicken sausages (200g), 2 cups diced potatoes (300g), 3 eggs (150g), 1.5 cups vegetables (225g), 3/4 cup cheese (85g), 2 tbsp oil (28g)',
        nutrition: {
          calories: 1150,
          protein: 64,
          carbs: 92,
          fat: 56,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Huevos Rancheros Deluxe',
        description:
          '4 corn tortillas (104g), 4 fried eggs (200g), 1.5 cups refried beans (378g), 3/4 cup salsa (180g), 1 avocado (150g), 1/2 cup cheese (56g), sour cream (60g)',
        nutrition: {
          calories: 1120,
          protein: 54,
          carbs: 108,
          fat: 54,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Eggs Benedict Feast',
        description:
          '3 English muffins (171g), 6 slices Canadian bacon (168g), 6 poached eggs (300g), 3/4 cup hollandaise sauce (180g), hash browns (150g)',
        nutrition: {
          calories: 1190,
          protein: 68,
          carbs: 72,
          fat: 70,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Grilled Chicken Power Bowl',
        description:
          '250g grilled chicken, 1.5 cups brown rice (293g), 2 cups roasted vegetables (300g), 1 avocado (150g), 3 tbsp tahini (45g), hummus (60g)',
        nutrition: {
          calories: 1140,
          protein: 74,
          carbs: 116,
          fat: 44,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Double Burger Combo',
        description:
          '2 beef patties (300g), 1 brioche bun (80g), 3 slices cheese (84g), bacon (68g), 2.5 cups fries (300g), 3 tbsp mayo (42g), onion rings (80g)',
        nutrition: {
          calories: 1360,
          protein: 68,
          carbs: 124,
          fat: 72,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Wrap Feast',
        description:
          '2 large wraps (180g) with 200g chicken, romaine (100g), parmesan (30g), Caesar dressing (60g), chips (60g), fruit (200g), cookie (50g)',
        nutrition: {
          calories: 1080,
          protein: 64,
          carbs: 104,
          fat: 44,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Salmon Poke Bowl Deluxe',
        description:
          '200g raw salmon, 1.5 cups sushi rice (237g), 1 avocado (150g), 3/4 cup edamame (113g), seaweed, 3 tbsp soy sauce (54g), 2 tbsp sesame oil (28g), crab salad (100g)',
        nutrition: {
          calories: 1120,
          protein: 64,
          carbs: 112,
          fat: 48,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Tikka Feast',
        description:
          '300g chicken tikka masala, 1.5 cups rice (237g), 2 naans (160g), 1/2 cup raita (120g), samosa (80g), side salad (75g)',
        nutrition: {
          calories: 1200,
          protein: 70,
          carbs: 136,
          fat: 42,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Fish and Chips Deluxe',
        description:
          '250g battered fish, 2.5 cups thick-cut chips (375g), 1/2 cup tartar sauce (120g), mushy peas (150g), coleslaw (100g), bread (50g)',
        nutrition: {
          calories: 1180,
          protein: 54,
          carbs: 136,
          fat: 50,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Chicken Burrito Supreme',
        description:
          '2 large tortillas (180g), 200g chicken, 1.5 cups rice (293g), 1 cup black beans (172g), 3/4 cup cheese (85g), guacamole (90g), sour cream (90g)',
        nutrition: {
          calories: 1260,
          protein: 74,
          carbs: 140,
          fat: 48,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Teriyaki Chicken Feast',
        description:
          '250g chicken with teriyaki (50g), 2 cups jasmine rice (316g), 1.5 cups vegetables (225g), 3 spring rolls (120g), edamame (75g)',
        nutrition: {
          calories: 1140,
          protein: 68,
          carbs: 164,
          fat: 26,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Steak Fajita Feast',
        description:
          '200g grilled steak, 4 flour tortillas (280g), 1.5 cups peppers/onions (225g), 3/4 cup cheese (85g), guacamole (90g), sour cream (90g), rice (158g)',
        nutrition: {
          calories: 1200,
          protein: 68,
          carbs: 116,
          fat: 56,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shawarma Platter Supreme',
        description:
          '250g chicken shawarma, 3 pitas (180g), 3/4 cup hummus (180g), tabbouleh (135g), 1/2 cup tahini (120g), fries (150g)',
        nutrition: {
          calories: 1180,
          protein: 70,
          carbs: 128,
          fat: 44,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tuna Power Bowl',
        description:
          '200g seared tuna, 1.5 cups quinoa (278g), 1.5 avocados (225g), 3/4 cup edamame (113g), 3 tbsp soy-ginger dressing (45g), seaweed salad (100g)',
        nutrition: {
          calories: 1060,
          protein: 70,
          carbs: 96,
          fat: 50,
        },
        dietType: 'non-veg',
        allergens: [],
      },
    ],
    Dinner: [
      {
        dishName: 'Grilled Salmon Feast',
        description:
          '250g grilled salmon, 1.5 cups brown rice (293g), 2 cups roasted vegetables (300g), 3 tbsp butter (42g), lemon, side salad (100g), 2 tbsp dressing (30g)',
        nutrition: {
          calories: 1120,
          protein: 68,
          carbs: 112,
          fat: 46,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Parmesan Deluxe',
        description:
          '250g breaded chicken, 1 cup marinara (245g), 1 cup mozzarella (113g), 2 cups spaghetti (280g), 3 garlic bread (105g), salad (100g)',
        nutrition: {
          calories: 1320,
          protein: 78,
          carbs: 136,
          fat: 52,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Beef Stir-Fry Deluxe',
        description:
          '250g beef strips, 3 cups vegetables (450g), 2 cups jasmine rice (316g), 4 tbsp stir-fry sauce (60g), 2 tbsp sesame oil (28g), spring rolls (100g)',
        nutrition: {
          calories: 1180,
          protein: 68,
          carbs: 144,
          fat: 40,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Butter Chicken Supreme',
        description:
          '300g chicken in butter sauce, 1.5 cups basmati rice (237g), 2 naans (160g), 1/2 cup dal (120g), 1/2 cup raita (120g), dessert (60g)',
        nutrition: {
          calories: 1240,
          protein: 66,
          carbs: 148,
          fat: 46,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shrimp Scampi Feast',
        description:
          '250g shrimp, 2.5 cups linguine (350g), 4 tbsp butter (56g), garlic, white wine (90ml), 3 garlic bread (105g), salad (100g)',
        nutrition: {
          calories: 1160,
          protein: 64,
          carbs: 132,
          fat: 42,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Thighs Feast',
        description:
          '300g chicken thighs, 2 cups mashed potatoes (400g), 1.5 cups green beans (188g), 1/4 cup gravy (60g), 2 tbsp butter (28g), roll (50g)',
        nutrition: {
          calories: 1140,
          protein: 70,
          carbs: 104,
          fat: 50,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Teriyaki Salmon Bowl Deluxe',
        description:
          '250g teriyaki salmon, 2 cups rice (316g), 1.5 cups edamame (225g), 3/4 cup pickled vegetables (113g), 2 tbsp sesame seeds (18g), miso soup (200ml)',
        nutrition: {
          calories: 1180,
          protein: 74,
          carbs: 140,
          fat: 36,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Steak Dinner Deluxe',
        description:
          '250g ribeye steak, 2 cups roasted potatoes (300g), 1.5 cups asparagus (201g), 3 tbsp herb butter (42g), roll (50g), salad (100g)',
        nutrition: {
          calories: 1140,
          protein: 70,
          carbs: 96,
          fat: 56,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Tandoori Chicken Feast',
        description:
          '300g tandoori chicken, 1.5 cups rice (237g), 1.5 cups dal (300g), 2 rotis (100g), side salad (75g), raita (60g)',
        nutrition: {
          calories: 1080,
          protein: 78,
          carbs: 128,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Fajita Feast',
        description:
          '250g chicken strips, 4 tortillas (280g), 2 cups peppers/onions (300g), 3/4 cup cheese (85g), sour cream (90g), guacamole (90g), rice (158g)',
        nutrition: {
          calories: 1220,
          protein: 76,
          carbs: 120,
          fat: 48,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Seafood Feast',
        description:
          '250g mixed seafood (mahi mahi, shrimp), 1.5 cups dirty rice (293g), 1.5 cups collard greens (285g), cornbread (90g), 2 tbsp butter (28g)',
        nutrition: {
          calories: 1060,
          protein: 68,
          carbs: 124,
          fat: 32,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
  },
  vegan: {
    Breakfast: [
      {
        dishName: 'Vegan Protein Mega Bowl',
        description:
          '2 scoops vegan protein (60g), 2.5 cups oat milk (600ml), 3 frozen bananas (354g), 3/4 cup granola (90g), 4 tbsp almond butter (64g), berries (150g)',
        nutrition: {
          calories: 1140,
          protein: 56,
          carbs: 156,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Tofu Scramble Supreme',
        description:
          '400g firm tofu, 2 cups vegetables (300g), 4 slices whole wheat toast (140g), 1.5 avocados (225g), 3 tbsp nutritional yeast (15g), 2 tbsp oil (28g), hash browns (150g)',
        nutrition: {
          calories: 1120,
          protein: 56,
          carbs: 108,
          fat: 58,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Ultimate Overnight Oats',
        description:
          '2 cups rolled oats (162g), 2 cups oat milk (480ml), 4 tbsp chia seeds (48g), 1/4 cup maple syrup (80g), 1.5 cups berries (225g), 1/2 cup walnuts (60g), 3 tbsp peanut butter (48g)',
        nutrition: {
          calories: 1180,
          protein: 38,
          carbs: 168,
          fat: 48,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan Pancake Feast',
        description:
          '5 large pancakes (250g), 1/3 cup maple syrup (107g), 4 tbsp peanut butter (64g), 2 bananas (236g), 3 tbsp vegan butter (42g), 3/4 cup berries (113g)',
        nutrition: {
          calories: 1200,
          protein: 28,
          carbs: 184,
          fat: 44,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Tempeh Hash Supreme',
        description:
          '200g tempeh bacon, 2.5 cups diced potatoes (375g), 2 cups vegetables (300g), 1.5 avocados (225g), 3 tbsp oil (42g), toast (70g)',
        nutrition: {
          calories: 1160,
          protein: 44,
          carbs: 128,
          fat: 60,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Burrito Supreme',
        description:
          '2 large tortillas (180g), 350g tofu scramble, 1 cup black beans (172g), 1 avocado (150g), 1/2 cup vegan cheese (56g), salsa (90g), potatoes (150g)',
        nutrition: {
          calories: 1100,
          protein: 52,
          carbs: 136,
          fat: 42,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Acai Bowl Supreme',
        description:
          '4 packs acai (400g), 3 frozen bananas (354g), 1 cup granola (120g), 4 tbsp almond butter (64g), 1 cup berries (150g), 3 tbsp coconut flakes (15g), chia seeds (24g)',
        nutrition: {
          calories: 1160,
          protein: 28,
          carbs: 164,
          fat: 50,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Chickpea Pancake Feast',
        description:
          '1.5 cups chickpea flour (180g), 2 cups vegetables (300g), 1/3 cup nutritional yeast (33g), 4 slices toast (140g), 1 avocado (150g), 3 tbsp oil (42g)',
        nutrition: {
          calories: 1080,
          protein: 48,
          carbs: 124,
          fat: 48,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan French Toast Feast',
        description:
          '5 slices French toast (175g), 1/3 cup maple syrup (107g), 3 tbsp vegan butter (42g), 1 cup berries (150g), 3 tbsp almond butter (48g), powdered sugar, whipped cream (60g)',
        nutrition: {
          calories: 1060,
          protein: 24,
          carbs: 168,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Quinoa Bowl Supreme',
        description:
          '2 cups cooked quinoa (370g), 2 cups almond milk (480ml), 1/4 cup maple syrup (80g), 3/4 cup almonds (108g), 1 cup berries (150g), 3 tbsp chia seeds (36g)',
        nutrition: {
          calories: 1200,
          protein: 44,
          carbs: 164,
          fat: 48,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Ultimate Toast Stack',
        description:
          '4 slices whole grain bread (140g), 5 tbsp peanut butter (80g), 2 bananas (272g), 3 tbsp agave (63g), 2 tbsp chia seeds (24g), granola (60g), berries (75g)',
        nutrition: {
          calories: 1140,
          protein: 36,
          carbs: 164,
          fat: 46,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Buddha Bowl Emperor',
        description:
          '1.5 cups quinoa (278g), 2 cups roasted chickpeas (328g), 2 cups roasted vegetables (300g), 1.5 avocados (225g), 5 tbsp tahini dressing (75g)',
        nutrition: {
          calories: 1200,
          protein: 48,
          carbs: 140,
          fat: 56,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Burrito Bowl Supreme',
        description:
          '1.5 cups brown rice (293g), 1.5 cups black beans (258g), 1 cup corn (164g), 1.5 avocados (225g), guacamole (90g), salsa (90g), tortilla chips (60g)',
        nutrition: {
          calories: 1160,
          protein: 42,
          carbs: 172,
          fat: 42,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Falafel Feast',
        description:
          '2 large wraps (180g), 9 falafel balls (270g), 3/4 cup hummus (180g), 2 cups vegetables (300g), 3 tbsp tahini (45g), fries (150g)',
        nutrition: {
          calories: 1180,
          protein: 44,
          carbs: 148,
          fat: 50,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Lentil Curry Supreme',
        description:
          '2.5 cups lentil curry (500g), 1.5 cups basmati rice (237g), 2 vegan naans (160g), 4 tbsp coconut milk (60g), 2 samosas (120g)',
        nutrition: {
          calories: 1120,
          protein: 44,
          carbs: 180,
          fat: 28,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tofu Banh Mi Feast',
        description:
          '2 large baguettes (260g), 200g marinated tofu, pickled vegetables (150g), 1 avocado (150g), cilantro, 3 tbsp vegan mayo (42g), spring rolls (100g)',
        nutrition: {
          calories: 1060,
          protein: 40,
          carbs: 148,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Pasta Feast',
        description:
          '2.5 cups pasta (350g), 2.5 cups vegetables (375g), 1 cup cashew cream (240g), 1/4 cup nutritional yeast (20g), 3 tbsp olive oil (42g)',
        nutrition: {
          calories: 1200,
          protein: 42,
          carbs: 156,
          fat: 50,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Loaded Sandwich Combo',
        description:
          '3 slices whole wheat bread (105g), 1.5 cups mashed chickpeas (246g), 3 tbsp vegan mayo (42g), vegetables (150g), 1.5 avocados (225g), chips (60g), fruit (150g)',
        nutrition: {
          calories: 1080,
          protein: 38,
          carbs: 132,
          fat: 48,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Asian Noodle Feast',
        description:
          '250g rice noodles, 250g tofu, 2.5 cups vegetables (375g), 4 tbsp peanut sauce (64g), 1/2 cup peanuts (72g), 2 spring rolls (100g)',
        nutrition: {
          calories: 1160,
          protein: 50,
          carbs: 140,
          fat: 50,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Mexican Bowl Supreme',
        description:
          '2 cups brown rice (390g), 1.5 cups pinto beans (258g), 1 cup corn (164g), 1 avocado (150g), salsa (90g), tortilla chips (60g), guacamole (60g)',
        nutrition: {
          calories: 1140,
          protein: 38,
          carbs: 192,
          fat: 30,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Sushi Bowl Supreme',
        description:
          '2 cups sushi rice (316g), 200g marinated tofu, 1.5 avocados (225g), 3/4 cup edamame (113g), vegetables (150g), 3 tbsp soy sauce (54g)',
        nutrition: {
          calories: 1100,
          protein: 44,
          carbs: 152,
          fat: 40,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Mediterranean Feast',
        description:
          '1.5 cups farro (263g), 1 cup hummus (240g), 2 cups roasted vegetables (300g), 3/4 cup olives (100g), 3 tbsp olive oil (42g), 2 pitas (120g)',
        nutrition: {
          calories: 1200,
          protein: 38,
          carbs: 148,
          fat: 56,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
    Dinner: [
      {
        dishName: 'Vegan Chili Supreme',
        description:
          '2.5 cups three-bean chili (600g), 1.5 cups brown rice (293g), 1/2 cup vegan sour cream (120g), 1.5 avocados (225g), cornbread (90g)',
        nutrition: {
          calories: 1180,
          protein: 46,
          carbs: 176,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Stir-Fried Tofu Supreme',
        description:
          '350g firm tofu, 3 cups vegetables (450g), 2 cups jasmine rice (316g), 4 tbsp soy sauce (72g), 2 tbsp sesame oil (28g), 1/2 cup cashews (70g)',
        nutrition: {
          calories: 1160,
          protein: 52,
          carbs: 148,
          fat: 44,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan Pad Thai Supreme',
        description:
          '250g rice noodles, 200g tofu, 2 cups vegetables (300g), 5 tbsp pad thai sauce (75g), 1/2 cup peanuts (72g), lime, bean sprouts (75g), spring roll (50g)',
        nutrition: {
          calories: 1080,
          protein: 42,
          carbs: 144,
          fat: 40,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Lentil Bolognese Supreme',
        description:
          '2.5 cups pasta (350g), 2 cups lentil bolognese (480g), 1/4 cup nutritional yeast (20g), 3 tbsp olive oil (42g), 2 garlic bread (70g)',
        nutrition: {
          calories: 1200,
          protein: 52,
          carbs: 180,
          fat: 36,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Enchilada Feast',
        description:
          '4 corn tortillas (104g), 1.5 cups black beans (258g), 1.5 cups vegetables (225g), 3/4 cup enchilada sauce (180g), 1.5 avocados (225g), vegan cheese (85g), rice (158g)',
        nutrition: {
          calories: 1140,
          protein: 42,
          carbs: 156,
          fat: 44,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Teriyaki Tempeh Feast',
        description:
          '300g tempeh, 2 cups brown rice (390g), 2 cups broccoli (312g), 4 tbsp teriyaki sauce (72g), 3 tbsp sesame seeds (27g), spring rolls (100g)',
        nutrition: {
          calories: 1180,
          protein: 58,
          carbs: 164,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Curry Supreme',
        description:
          '2.5 cups vegetable curry (500g), 1.5 cups brown rice (293g), 2 vegan naans (160g), 4 tbsp coconut milk (60g), 2 samosas (120g)',
        nutrition: {
          calories: 1120,
          protein: 32,
          carbs: 184,
          fat: 34,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Loaded Sweet Potato Supreme',
        description:
          '2 large sweet potatoes (360g), 1.5 cups black beans (258g), 3/4 cup corn (123g), 1.5 avocados (225g), 4 tbsp salsa (60g), 3 tbsp tahini (45g)',
        nutrition: {
          calories: 1100,
          protein: 40,
          carbs: 164,
          fat: 38,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Pizza Feast',
        description:
          '4 slices thick crust (400g), 1 cup marinara (245g), vegan mozzarella (113g), 2 cups vegetables (300g), 3 tbsp olive oil (42g), garlic bread (70g)',
        nutrition: {
          calories: 1180,
          protein: 38,
          carbs: 156,
          fat: 48,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Mushroom Stroganoff Supreme',
        description:
          '3 cups mushrooms (210g), 2.5 cups pasta (350g), 1 cup cashew cream (240g), 1/2 cup nutritional yeast (50g), 2 tbsp oil (28g)',
        nutrition: {
          calories: 1160,
          protein: 48,
          carbs: 148,
          fat: 48,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Vegan Fried Rice Supreme',
        description:
          '2.5 cups cooked rice (395g), 2 cups mixed vegetables (300g), 200g tofu, 4 tbsp soy sauce (72g), 2 tbsp sesame oil (28g), 3/4 cup peas (113g), cashews (56g)',
        nutrition: {
          calories: 1140,
          protein: 42,
          carbs: 164,
          fat: 40,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan BBQ Jackfruit Feast',
        description:
          '2.5 cups pulled jackfruit (375g), 1 whole wheat bun (80g), 2 cups baked fries (300g), coleslaw (150g), 4 tbsp BBQ sauce (68g), onion rings (80g)',
        nutrition: {
          calories: 1060,
          protein: 24,
          carbs: 192,
          fat: 28,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
  },
}

export { mealTemplatesTier3 }
