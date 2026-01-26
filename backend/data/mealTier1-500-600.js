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
        dishName: 'Classic Oatmeal Bowl',
        description:
          '1 cup cooked oats (150g), 1 tbsp almond butter (16g), 1 medium banana (118g), 1 tsp honey (7g)',
        nutrition: {
          calories: 520,
          protein: 14,
          carbs: 78,
          fat: 16,
        },
        dietType: 'veg',
        allergens: ['nuts'],
      },
      {
        dishName: 'Greek Yogurt Parfait',
        description:
          '1.5 cups Greek yogurt (340g), 1/2 cup granola (60g), 1/2 cup mixed berries (75g), 1 tbsp honey (21g)',
        nutrition: {
          calories: 510,
          protein: 32,
          carbs: 68,
          fat: 12,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Veggie Cheese Omelette',
        description:
          '3 large eggs (150g), 1/4 cup cheddar cheese (28g), 1/2 cup mixed vegetables (75g), 2 slices whole wheat toast (60g), 1 tsp butter (5g)',
        nutrition: {
          calories: 505,
          protein: 30,
          carbs: 32,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Peanut Butter Banana Smoothie Bowl',
        description:
          '2 tbsp peanut butter (32g), 2 medium bananas (236g), 1 cup milk (240ml), 2 tbsp granola (15g), 1 tbsp chia seeds (12g)',
        nutrition: {
          calories: 545,
          protein: 18,
          carbs: 76,
          fat: 20,
        },
        dietType: 'veg',
        allergens: ['nuts', 'dairy'],
      },
      {
        dishName: 'Cottage Cheese Pancakes',
        description:
          '1 cup cottage cheese (226g), 3 pancakes made with 1/2 cup flour (60g), 2 eggs (100g), 2 tbsp maple syrup (40g), 1 tsp butter (5g)',
        nutrition: {
          calories: 535,
          protein: 34,
          carbs: 64,
          fat: 14,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Avocado Toast with Eggs',
        description:
          '2 slices whole grain bread (70g), 1/2 medium avocado (75g), 2 poached eggs (100g), 1 tsp olive oil (5g)',
        nutrition: {
          calories: 570,
          protein: 20,
          carbs: 42,
          fat: 34,
        },
        dietType: 'veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Indian Poha',
        description:
          '1.5 cups flattened rice (90g), 1/4 cup peanuts (35g), 1 tbsp oil (14g), 1/2 cup mixed vegetables (75g), 1 tbsp ghee (14g)',
        nutrition: {
          calories: 580,
          protein: 14,
          carbs: 72,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['nuts', 'dairy'],
      },
      {
        dishName: 'Breakfast Burrito',
        description:
          '1 large flour tortilla (70g), 2 scrambled eggs (100g), 1/4 cup black beans (43g), 1/4 cup cheese (28g), 2 tbsp salsa (30g), 1/4 avocado (38g)',
        nutrition: {
          calories: 560,
          protein: 26,
          carbs: 48,
          fat: 28,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Muesli with Yogurt',
        description:
          '3/4 cup muesli (85g), 1 cup plain yogurt (245g), 1/2 cup mixed berries (75g), 1 tbsp honey (21g), 2 tbsp almonds (18g)',
        nutrition: {
          calories: 515,
          protein: 20,
          carbs: 76,
          fat: 16,
        },
        dietType: 'veg',
        allergens: ['dairy', 'nuts', 'gluten'],
      },
      {
        dishName: 'Sweet Potato Hash with Eggs',
        description:
          '1 medium sweet potato diced (150g), 2 eggs (100g), 1/2 cup bell peppers (75g), 1 tbsp olive oil (14g), 1/4 cup feta cheese (38g)',
        nutrition: {
          calories: 505,
          protein: 20,
          carbs: 46,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Masala Dosa',
        description:
          '1 large dosa (150g), 1 cup potato masala filling (200g), 2 tbsp coconut chutney (30g), 1 tsp oil for cooking (5g)',
        nutrition: {
          calories: 595,
          protein: 12,
          carbs: 94,
          fat: 18,
        },
        dietType: 'veg',
        allergens: [],
      },
    ],
    Lunch: [
      {
        dishName: 'Caprese Sandwich',
        description:
          '2 slices whole wheat bread (70g), 150g fresh mozzarella, 2 medium tomatoes (246g), 10 basil leaves, 1 tbsp balsamic glaze (15g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 540,
          protein: 26,
          carbs: 44,
          fat: 28,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Vegetable Quinoa Bowl',
        description:
          '1 cup cooked quinoa (185g), 1 cup roasted vegetables (150g), 1/4 cup chickpeas (41g), 2 tbsp tahini dressing (30g), 1/4 avocado (38g)',
        nutrition: {
          calories: 525,
          protein: 18,
          carbs: 64,
          fat: 22,
        },
        dietType: 'veg',
        allergens: [],
      },
      {
        dishName: 'Paneer Tikka Wrap',
        description:
          '1 large whole wheat tortilla (70g), 120g grilled paneer, 1 cup mixed vegetables (150g), 2 tbsp yogurt sauce (30g), 1 tsp oil (5g)',
        nutrition: {
          calories: 515,
          protein: 24,
          carbs: 50,
          fat: 22,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Mediterranean Falafel Plate',
        description:
          '4 falafel balls (120g), 1/2 cup hummus (120g), 1 whole wheat pita (60g), 1 cup cucumber tomato salad (150g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 580,
          protein: 20,
          carbs: 68,
          fat: 26,
        },
        dietType: 'veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Lentil Soup with Bread',
        description:
          '2 cups lentil soup (480g), 2 slices whole grain bread (70g), 1 tbsp butter (14g), 1/4 cup shredded cheese (28g)',
        nutrition: {
          calories: 550,
          protein: 28,
          carbs: 72,
          fat: 16,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Veggie Pasta Primavera',
        description:
          '1.5 cups cooked penne pasta (210g), 1 cup mixed vegetables (150g), 1/4 cup parmesan cheese (25g), 2 tbsp olive oil (28g), 1/4 cup marinara (60g)',
        nutrition: {
          calories: 565,
          protein: 18,
          carbs: 76,
          fat: 20,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Black Bean Buddha Bowl',
        description:
          '3/4 cup cooked brown rice (140g), 3/4 cup black beans (130g), 1/2 avocado (75g), 1/2 cup corn (82g), 2 tbsp sour cream (30g), salsa (30g)',
        nutrition: {
          calories: 590,
          protein: 20,
          carbs: 82,
          fat: 20,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Greek Salad with Pita',
        description:
          '3 cups mixed greens (150g), 1/2 cup feta cheese (75g), 1/2 cup olives (67g), 1 cup vegetables (150g), 2 tbsp olive oil (28g), 1 whole wheat pita (60g)',
        nutrition: {
          calories: 520,
          protein: 16,
          carbs: 42,
          fat: 32,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Vegetable Stir-Fry',
        description:
          '2 cups mixed vegetables (300g), 1 cup cooked jasmine rice (158g), 100g tofu, 2 tbsp soy sauce (36g), 1 tbsp sesame oil (14g), 2 tbsp cashews (18g)',
        nutrition: {
          calories: 575,
          protein: 20,
          carbs: 70,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['nuts'],
      },
      {
        dishName: 'Spinach Mushroom Quesadilla',
        description:
          '2 flour tortillas (140g), 1 cup cheese (113g), 1 cup spinach (30g), 1/2 cup mushrooms (35g), 2 tbsp sour cream (30g), 1 tsp oil (5g)',
        nutrition: {
          calories: 600,
          protein: 30,
          carbs: 52,
          fat: 30,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chole with Rice',
        description:
          '1 cup chickpea curry (200g), 1 cup basmati rice (158g), 2 tbsp yogurt (30g), 1 small naan piece (40g)',
        nutrition: {
          calories: 530,
          protein: 18,
          carbs: 88,
          fat: 12,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
    ],
    Dinner: [
      {
        dishName: 'Margherita Pizza',
        description:
          '2 slices thin crust pizza (200g), fresh mozzarella (80g), tomato sauce (60g), fresh basil, 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 560,
          protein: 24,
          carbs: 64,
          fat: 22,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Vegetable Lasagna',
        description:
          '1 serving lasagna (280g) with 1 cup mixed vegetables (150g), ricotta (90g), mozzarella (50g), marinara sauce (120g)',
        nutrition: {
          calories: 545,
          protein: 26,
          carbs: 58,
          fat: 22,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Palak Paneer with Roti',
        description:
          '1 cup palak paneer (250g with 100g paneer), 2 whole wheat rotis (100g), 1 tsp ghee (5g)',
        nutrition: {
          calories: 520,
          protein: 22,
          carbs: 52,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Stuffed Bell Peppers',
        description:
          '2 bell peppers (328g) stuffed with 1 cup quinoa mix (185g), 1/2 cup black beans (86g), 1/4 cup cheese (28g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 505,
          protein: 20,
          carbs: 70,
          fat: 16,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Eggplant Parmesan',
        description:
          '200g breaded eggplant, 1/2 cup marinara sauce (120g), 1/2 cup mozzarella (56g), 1/4 cup parmesan (25g), 1 cup pasta (140g)',
        nutrition: {
          calories: 590,
          protein: 26,
          carbs: 68,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Vegetable Curry with Rice',
        description:
          '1.5 cups mixed vegetable curry (300g), 3/4 cup basmati rice (119g), 2 tbsp coconut milk (30g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 535,
          protein: 12,
          carbs: 82,
          fat: 18,
        },
        dietType: 'veg',
        allergens: [],
      },
      {
        dishName: 'Cheese Ravioli',
        description:
          '1.5 cups cheese ravioli (250g), 1/2 cup marinara sauce (120g), 2 tbsp parmesan (10g), 1 tbsp olive oil (14g), side salad (50g)',
        nutrition: {
          calories: 575,
          protein: 24,
          carbs: 72,
          fat: 20,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Bean Enchiladas',
        description:
          '2 corn tortillas (52g), 3/4 cup pinto beans (130g), 1/2 cup cheese (56g), 1/4 cup enchilada sauce (60g), 2 tbsp sour cream (30g), 1/4 avocado (38g)',
        nutrition: {
          calories: 550,
          protein: 24,
          carbs: 58,
          fat: 24,
        },
        dietType: 'veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Mushroom Risotto',
        description:
          '1 cup arborio rice cooked (175g), 1 cup mushrooms (70g), 1/4 cup parmesan (25g), 2 tbsp butter (28g), 1/2 cup white wine (120ml)',
        nutrition: {
          calories: 585,
          protein: 16,
          carbs: 76,
          fat: 20,
        },
        dietType: 'veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Tofu Stir-Fry Bowl',
        description:
          '150g firm tofu, 1.5 cups mixed vegetables (225g), 3/4 cup brown rice (140g), 2 tbsp teriyaki sauce (36g), 1 tbsp sesame oil (14g)',
        nutrition: {
          calories: 510,
          protein: 22,
          carbs: 64,
          fat: 18,
        },
        dietType: 'veg',
        allergens: [],
      },
      {
        dishName: 'Vegetable Paella',
        description:
          '1 cup paella rice (185g), 1.5 cups mixed vegetables (225g), 1/4 cup green peas (37g), 2 tbsp olive oil (28g), saffron, vegetable broth',
        nutrition: {
          calories: 595,
          protein: 14,
          carbs: 90,
          fat: 20,
        },
        dietType: 'veg',
        allergens: [],
      },
    ],
  },
  'non-veg': {
    Breakfast: [
      {
        dishName: 'Classic Bacon and Eggs',
        description:
          '3 strips bacon (34g), 2 scrambled eggs (100g), 2 slices whole wheat toast (70g), 1 tbsp butter (14g), 1/2 cup orange juice (120ml)',
        nutrition: {
          calories: 545,
          protein: 26,
          carbs: 42,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Smoked Salmon Bagel',
        description:
          '1 whole wheat bagel (95g), 85g smoked salmon, 2 tbsp cream cheese (30g), 1/4 red onion (28g), capers (10g)',
        nutrition: {
          calories: 520,
          protein: 32,
          carbs: 58,
          fat: 16,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Sausage Breakfast Bowl',
        description:
          '2 chicken sausages (100g), 2 scrambled eggs (100g), 1 cup roasted potatoes (150g), 1/2 cup vegetables (75g), 1 tsp oil (5g)',
        nutrition: {
          calories: 565,
          protein: 32,
          carbs: 48,
          fat: 24,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Turkey Breakfast Sandwich',
        description:
          '1 English muffin (57g), 2 slices turkey breast (56g), 1 fried egg (50g), 1 slice cheese (28g), 1 tsp mayo (5g)',
        nutrition: {
          calories: 510,
          protein: 34,
          carbs: 44,
          fat: 20,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Spanish Omelette with Ham',
        description:
          '3 eggs (150g), 50g diced ham, 1 medium potato (150g), 1/4 cup onions (40g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 535,
          protein: 30,
          carbs: 36,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Tuna Avocado Toast',
        description:
          '2 slices whole grain bread (70g), 1 can tuna in water (85g), 1/2 avocado (75g), 1 tbsp mayo (14g), 1 boiled egg (50g)',
        nutrition: {
          calories: 580,
          protein: 38,
          carbs: 40,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Chicken Breakfast Burrito',
        description:
          '1 flour tortilla (70g), 85g grilled chicken, 2 scrambled eggs (100g), 2 tbsp salsa (30g), 2 tbsp cheese (14g), 1/4 avocado (38g)',
        nutrition: {
          calories: 595,
          protein: 42,
          carbs: 44,
          fat: 26,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Egg Keema Paratha',
        description:
          '1 large paratha (100g), 100g minced chicken keema, 1 egg (50g), 2 tbsp yogurt (30g), 1 tbsp ghee (14g)',
        nutrition: {
          calories: 575,
          protein: 32,
          carbs: 52,
          fat: 26,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Protein Pancakes with Turkey Bacon',
        description:
          '3 protein pancakes (150g with 30g protein powder), 3 strips turkey bacon (51g), 2 tbsp maple syrup (40g), 1 tsp butter (5g)',
        nutrition: {
          calories: 520,
          protein: 36,
          carbs: 56,
          fat: 14,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shrimp and Grits',
        description:
          '1 cup cooked grits (242g), 100g saut\u00e9ed shrimp, 1 tbsp butter (14g), 2 tbsp cheese (14g), 1/4 cup vegetables (38g)',
        nutrition: {
          calories: 505,
          protein: 28,
          carbs: 58,
          fat: 18,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Japanese Tamagoyaki Bowl',
        description:
          '4 eggs rolled omelette (200g), 1 cup cooked rice (158g), 1 tbsp soy sauce (18g), 1 tsp sesame oil (5g), 1/4 cup edamame (38g)',
        nutrition: {
          calories: 550,
          protein: 30,
          carbs: 56,
          fat: 20,
        },
        dietType: 'non-veg',
        allergens: [],
      },
    ],
    Lunch: [
      {
        dishName: 'Grilled Chicken Caesar Salad',
        description:
          '120g grilled chicken breast, 3 cups romaine lettuce (141g), 2 tbsp Caesar dressing (30g), 1/4 cup croutons (30g), 2 tbsp parmesan (10g)',
        nutrition: {
          calories: 515,
          protein: 42,
          carbs: 28,
          fat: 24,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Turkey Club Sandwich',
        description:
          '3 slices whole wheat bread (105g), 100g sliced turkey, 2 strips bacon (17g), 1 slice cheese (28g), lettuce, tomato, 1 tbsp mayo (14g)',
        nutrition: {
          calories: 580,
          protein: 38,
          carbs: 48,
          fat: 24,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Chicken Shawarma Wrap',
        description:
          '1 large whole wheat tortilla (70g), 120g chicken shawarma, 1/4 cup hummus (60g), vegetables (75g), 1 tbsp tahini (15g)',
        nutrition: {
          calories: 540,
          protein: 38,
          carbs: 50,
          fat: 20,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tuna Poke Bowl',
        description:
          '100g raw tuna cubes, 3/4 cup sushi rice (140g), 1/4 avocado (38g), 1/4 cup edamame (38g), 1 tbsp soy sauce (18g), 1 tsp sesame oil (5g)',
        nutrition: {
          calories: 525,
          protein: 34,
          carbs: 62,
          fat: 14,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Burrito Bowl',
        description:
          '100g grilled chicken, 3/4 cup brown rice (140g), 1/2 cup black beans (86g), 2 tbsp cheese (14g), 2 tbsp sour cream (30g), salsa (30g)',
        nutrition: {
          calories: 595,
          protein: 40,
          carbs: 68,
          fat: 18,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Chicken Tikka with Naan',
        description:
          '150g chicken tikka, 1 small naan bread (80g), 1/4 cup mint chutney (60g), side salad (50g), 1 tbsp yogurt (15g)',
        nutrition: {
          calories: 560,
          protein: 42,
          carbs: 54,
          fat: 18,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Fish Tacos',
        description:
          '2 corn tortillas (52g), 120g grilled white fish, 1/4 cup cabbage slaw (28g), 2 tbsp chipotle mayo (30g), 1/4 avocado (38g), lime',
        nutrition: {
          calories: 505,
          protein: 32,
          carbs: 42,
          fat: 22,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Teriyaki Chicken Bowl',
        description:
          '120g chicken breast with teriyaki glaze (30g), 1 cup jasmine rice (158g), 1 cup steamed broccoli (156g), 1 tsp sesame seeds (3g)',
        nutrition: {
          calories: 575,
          protein: 42,
          carbs: 76,
          fat: 10,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Beef Pho',
        description:
          '85g thinly sliced beef, 150g rice noodles, 2 cups beef broth (480ml), bean sprouts (50g), herbs, 1 tbsp fish sauce (18g)',
        nutrition: {
          calories: 520,
          protein: 32,
          carbs: 68,
          fat: 12,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Quesadilla',
        description:
          '2 flour tortillas (140g), 100g shredded chicken, 3/4 cup cheese (85g), 1/4 cup bell peppers (38g), 2 tbsp sour cream (30g)',
        nutrition: {
          calories: 600,
          protein: 42,
          carbs: 44,
          fat: 28,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Salmon Salad Plate',
        description:
          '120g grilled salmon, 2 cups mixed greens (100g), 1/2 cup quinoa (93g), 1/4 cup feta (38g), 2 tbsp balsamic vinaigrette (30g)',
        nutrition: {
          calories: 535,
          protein: 36,
          carbs: 36,
          fat: 26,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
    ],
    Dinner: [
      {
        dishName: 'Grilled Chicken with Vegetables',
        description:
          '150g grilled chicken breast, 1 cup roasted vegetables (150g), 1/2 cup quinoa (93g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 520,
          protein: 46,
          carbs: 42,
          fat: 16,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Baked Salmon with Rice',
        description:
          '130g baked salmon, 3/4 cup brown rice (140g), 1 cup steamed asparagus (134g), 1 tbsp butter (14g), lemon',
        nutrition: {
          calories: 565,
          protein: 38,
          carbs: 56,
          fat: 20,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Chicken Stir-Fry',
        description:
          '120g chicken breast, 2 cups mixed vegetables (300g), 3/4 cup jasmine rice (119g), 2 tbsp soy sauce (36g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 545,
          protein: 40,
          carbs: 64,
          fat: 14,
        },
        dietType: 'non-veg',
        allergens: [],
      },
      {
        dishName: 'Turkey Meatballs with Pasta',
        description:
          '4 turkey meatballs (120g), 1 cup cooked pasta (140g), 1/2 cup marinara (120g), 2 tbsp parmesan (10g), 1 tsp olive oil (5g)',
        nutrition: {
          calories: 580,
          protein: 38,
          carbs: 68,
          fat: 18,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Butter Chicken with Naan',
        description:
          '150g chicken in butter sauce (with 1 tbsp butter), 1 small naan (80g), 1/2 cup basmati rice (79g), 2 tbsp yogurt (30g)',
        nutrition: {
          calories: 595,
          protein: 36,
          carbs: 64,
          fat: 22,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Grilled Tilapia with Couscous',
        description:
          '150g grilled tilapia, 1 cup cooked couscous (157g), 1 cup grilled zucchini (124g), 1 tbsp olive oil (14g), herbs',
        nutrition: {
          calories: 510,
          protein: 42,
          carbs: 58,
          fat: 12,
        },
        dietType: 'non-veg',
        allergens: ['gluten'],
      },
      {
        dishName: 'Chicken Fajitas',
        description:
          '120g chicken strips, 2 flour tortillas (140g), 1 cup peppers and onions (150g), 2 tbsp sour cream (30g), 1/4 cup cheese (28g)',
        nutrition: {
          calories: 575,
          protein: 42,
          carbs: 54,
          fat: 22,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Shrimp Scampi with Pasta',
        description:
          '120g shrimp, 1 cup linguine (140g), 2 tbsp butter (28g), 2 cloves garlic, 1/4 cup white wine (60ml), parsley',
        nutrition: {
          calories: 550,
          protein: 34,
          carbs: 60,
          fat: 18,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Tandoori Chicken with Dal',
        description:
          '150g tandoori chicken, 1 cup dal (200g), 1 small roti (50g), side salad (50g)',
        nutrition: {
          calories: 535,
          protein: 44,
          carbs: 52,
          fat: 14,
        },
        dietType: 'non-veg',
        allergens: ['dairy', 'gluten'],
      },
      {
        dishName: 'Beef Taco Bowl',
        description:
          '100g lean ground beef, 3/4 cup rice (119g), 1/2 cup black beans (86g), 2 tbsp cheese (14g), salsa (30g), 2 tbsp guacamole (30g)',
        nutrition: {
          calories: 590,
          protein: 36,
          carbs: 64,
          fat: 22,
        },
        dietType: 'non-veg',
        allergens: ['dairy'],
      },
      {
        dishName: 'Lemon Herb Chicken Thighs',
        description:
          '150g chicken thighs, 1 cup roasted potatoes (150g), 1 cup green beans (125g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 560,
          protein: 38,
          carbs: 48,
          fat: 24,
        },
        dietType: 'non-veg',
        allergens: [],
      },
    ],
  },
  vegan: {
    Breakfast: [
      {
        dishName: 'Vegan Protein Smoothie Bowl',
        description:
          '1 scoop vegan protein powder (30g), 2 frozen bananas (236g), 1 cup almond milk (240ml), 3 tbsp granola (23g), 1 tbsp almond butter (16g), berries (75g)',
        nutrition: {
          calories: 545,
          protein: 28,
          carbs: 82,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Tofu Scramble',
        description:
          '200g firm tofu, 1 cup vegetables (150g), 2 slices whole wheat toast (70g), 1/2 avocado (75g), 1 tbsp nutritional yeast (5g), 1 tsp oil (5g)',
        nutrition: {
          calories: 520,
          protein: 26,
          carbs: 50,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Overnight Oats',
        description:
          '1 cup rolled oats (81g), 1 cup oat milk (240ml), 2 tbsp chia seeds (24g), 2 tbsp maple syrup (40g), 1/2 cup berries (75g), 2 tbsp walnuts (18g)',
        nutrition: {
          calories: 570,
          protein: 16,
          carbs: 86,
          fat: 20,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan Pancakes',
        description:
          '3 pancakes made with 1 cup flour (120g), 1 cup plant milk (240ml), 3 tbsp maple syrup (60g), 1 tbsp vegan butter (14g), 1/2 cup blueberries (75g)',
        nutrition: {
          calories: 595,
          protein: 12,
          carbs: 106,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Peanut Butter Toast with Banana',
        description:
          '2 slices whole grain bread (70g), 3 tbsp peanut butter (48g), 1 large banana (136g), 1 tbsp agave (21g), sprinkle of chia seeds (5g)',
        nutrition: {
          calories: 580,
          protein: 18,
          carbs: 78,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Chickpea Flour Omelette',
        description:
          '1/2 cup chickpea flour (60g), 1 cup vegetables (150g), 1/4 cup nutritional yeast (20g), 2 slices toast (70g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 510,
          protein: 24,
          carbs: 64,
          fat: 18,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Acai Bowl',
        description:
          '2 packs acai (200g), 1 frozen banana (118g), 1/2 cup granola (60g), 2 tbsp almond butter (32g), 1/2 cup mixed berries (75g), coconut flakes (10g)',
        nutrition: {
          calories: 565,
          protein: 14,
          carbs: 82,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan Breakfast Burrito',
        description:
          '1 large tortilla (70g), 150g tofu scramble, 1/2 cup black beans (86g), 1/4 avocado (38g), salsa (30g), 1 tbsp vegan cheese (7g)',
        nutrition: {
          calories: 535,
          protein: 26,
          carbs: 68,
          fat: 18,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Quinoa Breakfast Bowl',
        description:
          '1 cup cooked quinoa (185g), 1 cup almond milk (240ml), 2 tbsp maple syrup (40g), 1/4 cup almonds (36g), 1/2 cup berries (75g), 1 tsp cinnamon',
        nutrition: {
          calories: 590,
          protein: 18,
          carbs: 88,
          fat: 20,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Vegan French Toast',
        description:
          '3 slices bread (105g), 1/2 cup plant milk (120ml), 1 tbsp ground flaxseed (7g), 3 tbsp maple syrup (60g), 1 tbsp vegan butter (14g), berries (50g)',
        nutrition: {
          calories: 520,
          protein: 12,
          carbs: 92,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tempeh Bacon Sandwich',
        description:
          '4 slices tempeh bacon (80g), 2 slices whole wheat bread (70g), 1/2 avocado (75g), lettuce, tomato (50g), 1 tbsp vegan mayo (14g)',
        nutrition: {
          calories: 550,
          protein: 24,
          carbs: 52,
          fat: 28,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
    Lunch: [
      {
        dishName: 'Buddha Bowl',
        description:
          '3/4 cup quinoa (140g), 1 cup roasted chickpeas (164g), 1 cup roasted vegetables (150g), 1/4 avocado (38g), 2 tbsp tahini (30g)',
        nutrition: {
          calories: 575,
          protein: 22,
          carbs: 76,
          fat: 22,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Burrito Bowl',
        description:
          '3/4 cup brown rice (140g), 3/4 cup black beans (130g), 1/2 cup corn (82g), 1/2 avocado (75g), salsa (30g), 2 tbsp guacamole (30g)',
        nutrition: {
          calories: 590,
          protein: 20,
          carbs: 92,
          fat: 18,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Falafel Wrap',
        description:
          '1 large whole wheat tortilla (70g), 4 falafel balls (120g), 1/4 cup hummus (60g), 1 cup vegetables (150g), 1 tbsp tahini (15g)',
        nutrition: {
          calories: 560,
          protein: 20,
          carbs: 76,
          fat: 22,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Lentil Curry with Rice',
        description:
          '1.5 cups lentil curry (300g), 3/4 cup basmati rice (119g), 2 tbsp coconut milk (30g), naan piece (40g)',
        nutrition: {
          calories: 545,
          protein: 24,
          carbs: 92,
          fat: 10,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Tofu Banh Mi',
        description:
          '1 baguette (100g), 120g marinated tofu, pickled vegetables (75g), cilantro, jalape\u00f1os, 1 tbsp vegan mayo (14g)',
        nutrition: {
          calories: 520,
          protein: 22,
          carbs: 76,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Pasta Primavera',
        description:
          '1.5 cups pasta (210g), 1.5 cups vegetables (225g), 1/4 cup cashew cream (60g), 2 tbsp nutritional yeast (10g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 595,
          protein: 20,
          carbs: 88,
          fat: 20,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Chickpea Salad Sandwich',
        description:
          '1 cup mashed chickpeas (164g), 2 slices whole wheat bread (70g), 1 tbsp vegan mayo (14g), vegetables (75g), 1/4 avocado (38g)',
        nutrition: {
          calories: 510,
          protein: 20,
          carbs: 72,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Asian Noodle Bowl',
        description:
          '150g rice noodles, 150g tofu, 1.5 cups vegetables (225g), 2 tbsp peanut sauce (32g), 2 tbsp peanuts (18g), 1 tbsp sesame oil (14g)',
        nutrition: {
          calories: 580,
          protein: 24,
          carbs: 72,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Mexican Rice Bowl',
        description:
          '1 cup brown rice (195g), 3/4 cup pinto beans (130g), 1/2 cup corn (82g), 1/4 avocado (38g), salsa (30g), lime',
        nutrition: {
          calories: 565,
          protein: 18,
          carbs: 104,
          fat: 10,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Sushi Bowl',
        description:
          '1 cup sushi rice (158g), 100g marinated tofu, 1/2 avocado (75g), 1/4 cup edamame (38g), vegetables (75g), 1 tbsp soy sauce (18g)',
        nutrition: {
          calories: 535,
          protein: 20,
          carbs: 82,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Mediterranean Grain Bowl',
        description:
          '3/4 cup farro (140g), 1/2 cup hummus (120g), 1 cup roasted vegetables (150g), 1/4 cup olives (34g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 595,
          protein: 18,
          carbs: 82,
          fat: 24,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
    Dinner: [
      {
        dishName: 'Vegan Chili with Rice',
        description:
          '1.5 cups three-bean chili (360g), 3/4 cup brown rice (140g), 2 tbsp vegan sour cream (30g), tortilla chips (28g)',
        nutrition: {
          calories: 580,
          protein: 24,
          carbs: 96,
          fat: 12,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Stir-Fried Tofu with Vegetables',
        description:
          '200g firm tofu, 2 cups vegetables (300g), 3/4 cup jasmine rice (119g), 2 tbsp soy sauce (36g), 1 tbsp sesame oil (14g)',
        nutrition: {
          calories: 560,
          protein: 26,
          carbs: 68,
          fat: 20,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Pad Thai',
        description:
          '150g rice noodles, 100g tofu, 1 cup vegetables (150g), 3 tbsp pad thai sauce (45g), 2 tbsp peanuts (18g), lime',
        nutrition: {
          calories: 545,
          protein: 20,
          carbs: 82,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: ['nuts'],
      },
      {
        dishName: 'Lentil Bolognese',
        description:
          '1.5 cups pasta (210g), 1 cup lentil bolognese sauce (240g), 2 tbsp nutritional yeast (10g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 595,
          protein: 26,
          carbs: 96,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Vegan Enchiladas',
        description:
          '2 corn tortillas (52g), 3/4 cup black beans (130g), 1/2 cup vegetables (75g), 1/4 cup enchilada sauce (60g), 1/4 avocado (38g), vegan cheese (28g)',
        nutrition: {
          calories: 520,
          protein: 20,
          carbs: 78,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Teriyaki Tempeh Bowl',
        description:
          '150g tempeh, 1 cup brown rice (195g), 1 cup broccoli (156g), 2 tbsp teriyaki sauce (36g), 1 tsp sesame seeds (3g)',
        nutrition: {
          calories: 575,
          protein: 30,
          carbs: 82,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Curry with Naan',
        description:
          '1.5 cups vegetable curry (300g), 1 small vegan naan (80g), 1/2 cup brown rice (98g), 2 tbsp coconut milk (30g)',
        nutrition: {
          calories: 560,
          protein: 16,
          carbs: 94,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Stuffed Sweet Potato',
        description:
          '1 large sweet potato (180g), 3/4 cup black beans (130g), 1/4 cup corn (41g), 1/4 avocado (38g), 2 tbsp salsa (30g), tahini drizzle (15g)',
        nutrition: {
          calories: 535,
          protein: 20,
          carbs: 90,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Vegan Pizza',
        description:
          '2 slices thin crust (200g), 1/2 cup marinara (120g), vegan mozzarella (60g), 1 cup vegetables (150g), 1 tbsp olive oil (14g)',
        nutrition: {
          calories: 590,
          protein: 18,
          carbs: 82,
          fat: 22,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
      {
        dishName: 'Mushroom Stroganoff',
        description:
          '2 cups mushrooms (140g), 1.5 cups pasta (210g), 1/2 cup cashew cream (120g), 1/4 cup nutritional yeast (20g), 1 tbsp oil (14g)',
        nutrition: {
          calories: 580,
          protein: 22,
          carbs: 84,
          fat: 20,
        },
        dietType: 'vegan',
        allergens: ['nuts', 'gluten'],
      },
      {
        dishName: 'Vegan Fried Rice',
        description:
          '1.5 cups cooked rice (237g), 1 cup mixed vegetables (150g), 100g tofu, 2 tbsp soy sauce (36g), 1 tbsp sesame oil (14g), 1/4 cup peas (37g)',
        nutrition: {
          calories: 570,
          protein: 20,
          carbs: 92,
          fat: 14,
        },
        dietType: 'vegan',
        allergens: [],
      },
      {
        dishName: 'Black Bean Burger with Fries',
        description:
          '1 black bean patty (120g), 1 whole wheat bun (80g), 1 cup baked fries (150g), vegetables (50g), 1 tbsp vegan mayo (14g)',
        nutrition: {
          calories: 550,
          protein: 20,
          carbs: 88,
          fat: 16,
        },
        dietType: 'vegan',
        allergens: ['gluten'],
      },
    ],
  },
}

export { mealTemplatesTier1 }
