/**
 * Comprehensive International Meal Templates for Nutriva
 * Includes: European, American, Mediterranean, Asian, and Fusion cuisines
 * Optimized for variety in long-duration meal plans (30-60+ days)
 */

const mealTemplates = {
  veg: {
    Breakfast: [
      // European
      {
        dishName: "Greek Yogurt Parfait with Granola",
        description: "Creamy Greek yogurt layered with granola, fresh berries, and honey. High in protein and probiotics.",
        nutrition: { calories: 280, protein: 15, carbs: 35, fat: 8 }
      },
      {
        dishName: "Smoked Salmon and Cream Cheese Bagel",
        description: "Toasted bagel with cream cheese, capers, and red onion. Rich in omega-3 and satisfying carbs.",
        nutrition: { calories: 320, protein: 14, carbs: 38, fat: 12 }
      },
      {
        dishName: "French Toast with Berries",
        description: "Brioche bread dipped in egg mixture, topped with fresh berries and maple syrup.",
        nutrition: { calories: 350, protein: 10, carbs: 45, fat: 14 }
      },
      {
        dishName: "Avocado Toast on Sourdough",
        description: "Mashed avocado on whole grain sourdough with poached egg and microgreens.",
        nutrition: { calories: 310, protein: 12, carbs: 32, fat: 15 }
      },
      {
        dishName: "Bircher Muesli",
        description: "Overnight oats with yogurt, apple, and almonds. Make ahead for busy mornings.",
        nutrition: { calories: 290, protein: 10, carbs: 40, fat: 9 }
      },
      // Mediterranean
      {
        dishName: "Mediterranean Shakshuka",
        description: "Eggs poached in spiced tomato sauce with peppers and feta cheese.",
        nutrition: { calories: 270, protein: 12, carbs: 18, fat: 16 }
      },
      {
        dishName: "Caprese Breakfast Salad",
        description: "Fresh mozzarella, tomato, basil, and olive oil with whole grain toast.",
        nutrition: { calories: 300, protein: 11, carbs: 28, fat: 15 }
      },
      // American
      {
        dishName: "Vegetable Frittata",
        description: "Baked egg dish with spinach, mushrooms, and cheddar cheese.",
        nutrition: { calories: 290, protein: 14, carbs: 15, fat: 17 }
      },
      {
        dishName: "Whole Wheat Pancakes with Maple Syrup",
        description: "Fluffy whole wheat pancakes topped with fresh blueberries and pure maple syrup.",
        nutrition: { calories: 340, protein: 9, carbs: 52, fat: 10 }
      },
      // Asian
      {
        dishName: "Vegetable Poha",
        description: "Flattened rice cooked with vegetables, nuts, and spices. Rich in carbohydrates and fiber.",
        nutrition: { calories: 250, protein: 8, carbs: 40, fat: 7 }
      },
      {
        dishName: "Congee with Vegetables",
        description: "Rice porridge cooked until creamy, topped with mushrooms, green onions, and sesame oil.",
        nutrition: { calories: 240, protein: 7, carbs: 44, fat: 4 }
      },
      {
        dishName: "Masala Dosa with Sambar",
        description: "Crispy rice and lentil crepe filled with spiced potatoes, served with lentil soup.",
        nutrition: { calories: 300, protein: 10, carbs: 45, fat: 10 }
      },
      // Latin American
      {
        dishName: "Huevos Rancheros",
        description: "Fried eggs on tortillas with black beans, salsa, and avocado.",
        nutrition: { calories: 330, protein: 12, carbs: 38, fat: 14 }
      },
      {
        dishName: "Chilaquiles Verdes",
        description: "Crispy tortilla chips in green salsa with cheese and sour cream.",
        nutrition: { calories: 310, protein: 10, carbs: 36, fat: 14 }
      },
      // Middle Eastern
      {
        dishName: "Labneh and Vegetables",
        description: "Thick yogurt cheese with olive oil, served with fresh vegetables and pita bread.",
        nutrition: { calories: 270, protein: 11, carbs: 30, fat: 12 }
      },
      {
        dishName: "Manakish",
        description: "Flatbread topped with za'atar spice blend, olive oil, and sesame seeds.",
        nutrition: { calories: 290, protein: 9, carbs: 38, fat: 11 }
      }
    ],
    Lunch: [
      // Mediterranean
      {
        dishName: "Greek Salad with Feta",
        description: "Tomatoes, cucumbers, olives, feta cheese with olive oil and oregano dressing.",
        nutrition: { calories: 280, protein: 10, carbs: 18, fat: 18 }
      },
      {
        dishName: "Caprese Sandwich",
        description: "Fresh mozzarella, tomato, basil on ciabatta with balsamic glaze.",
        nutrition: { calories: 320, protein: 12, carbs: 38, fat: 14 }
      },
      {
        dishName: "Mediterranean Vegetable Pasta",
        description: "Whole wheat pasta with roasted eggplant, zucchini, tomatoes, and olive oil.",
        nutrition: { calories: 380, protein: 13, carbs: 58, fat: 10 }
      },
      // European
      {
        dishName: "Ratatouille with Crusty Bread",
        description: "Slow-cooked vegetable stew with eggplant, zucchini, tomatoes, and herbs.",
        nutrition: { calories: 310, protein: 8, carbs: 42, fat: 11 }
      },
      {
        dishName: "Spanish Vegetable Paella",
        description: "Saffron rice with bell peppers, artichokes, peas, and vegetable broth.",
        nutrition: { calories: 360, protein: 10, carbs: 55, fat: 10 }
      },
      {
        dishName: "Minestrone Soup",
        description: "Italian vegetable soup with beans, pasta, and tomato base.",
        nutrition: { calories: 280, protein: 12, carbs: 48, fat: 5 }
      },
      // American
      {
        dishName: "Veggie Burger with Sweet Potato Fries",
        description: "Plant-based patty on whole wheat bun with lettuce, tomato, and vegan mayo.",
        nutrition: { calories: 400, protein: 14, carbs: 52, fat: 16 }
      },
      {
        dishName: "California Salad with Chickpea Croutons",
        description: "Mixed greens with avocado, bell pepper, cucumber, and crispy chickpeas.",
        nutrition: { calories: 340, protein: 13, carbs: 38, fat: 15 }
      },
      {
        dishName: "Quinoa Buddha Bowl",
        description: "Quinoa base with roasted vegetables, chickpeas, tahini dressing.",
        nutrition: { calories: 420, protein: 16, carbs: 54, fat: 14 }
      },
      // Asian
      {
        dishName: "Vegetable Pad Thai",
        description: "Rice noodles with bell peppers, broccoli, peanuts, and lime tamarind sauce.",
        nutrition: { calories: 380, protein: 12, carbs: 50, fat: 14 }
      },
      {
        dishName: "Vegetable Lo Mein",
        description: "Egg noodles with mixed vegetables, soy sauce, and sesame oil.",
        nutrition: { calories: 350, protein: 11, carbs: 48, fat: 11 }
      },
      {
        dishName: "Rajma Chawal",
        description: "Kidney bean curry served with rice. Excellent source of plant protein and fiber.",
        nutrition: { calories: 380, protein: 15, carbs: 60, fat: 8 }
      },
      {
        dishName: "Chole Bhature",
        description: "Spiced chickpea curry with fried bread. Protein-rich meal with healthy carbohydrates.",
        nutrition: { calories: 450, protein: 18, carbs: 65, fat: 15 }
      },
      {
        dishName: "Paneer Butter Masala with Roti",
        description: "Cottage cheese in creamy tomato sauce with whole wheat flatbread.",
        nutrition: { calories: 420, protein: 20, carbs: 40, fat: 18 }
      },
      // Middle Eastern
      {
        dishName: "Falafel Wrap",
        description: "Crispy chickpea fritters in pita with tahini sauce, tomatoes, and cucumber.",
        nutrition: { calories: 380, protein: 14, carbs: 48, fat: 15 }
      },
      {
        dishName: "Tabbouleh Salad",
        description: "Bulgur wheat, parsley, mint, tomato with lemon-olive oil dressing.",
        nutrition: { calories: 300, protein: 10, carbs: 42, fat: 10 }
      },
      // Latin American
      {
        dishName: "Burrito Bowl with Beans",
        description: "Rice, black beans, corn, salsa, cheese, and guacamole.",
        nutrition: { calories: 420, protein: 14, carbs: 55, fat: 14 }
      },
      {
        dishName: "Vegetable Enchiladas Verdes",
        description: "Rolled tortillas with roasted vegetables and green salsa, topped with cheese.",
        nutrition: { calories: 380, protein: 13, carbs: 48, fat: 15 }
      }
    ],
    Dinner: [
      // European
      {
        dishName: "Vegetable Pasta Primavera",
        description: "Whole wheat pasta with fresh spring vegetables, garlic, and olive oil.",
        nutrition: { calories: 380, protein: 13, carbs: 55, fat: 11 }
      },
      {
        dishName: "Spinach and Ricotta Lasagna",
        description: "Layers of pasta, spinach, ricotta, and tomato sauce.",
        nutrition: { calories: 420, protein: 18, carbs: 48, fat: 15 }
      },
      {
        dishName: "Vegetable Gratin",
        description: "Layered potatoes, mushrooms, and vegetables with cheese topping.",
        nutrition: { calories: 360, protein: 14, carbs: 42, fat: 14 }
      },
      // Mediterranean
      {
        dishName: "Palak Paneer with Roti",
        description: "Cottage cheese in spinach gravy with whole wheat flatbread.",
        nutrition: { calories: 350, protein: 18, carbs: 35, fat: 15 }
      },
      {
        dishName: "Vegetable Biryani",
        description: "Fragrant saffron rice with mixed vegetables and aromatic spices.",
        nutrition: { calories: 380, protein: 12, carbs: 55, fat: 12 }
      },
      {
        dishName: "Dal Tadka with Rice",
        description: "Tempered lentil curry served with rice. Excellent source of plant protein and fiber.",
        nutrition: { calories: 320, protein: 14, carbs: 50, fat: 6 }
      },
      // Asian
      {
        dishName: "Stir-Fried Vegetables with Tofu",
        description: "Mixed vegetables and silken tofu in ginger-garlic sauce over brown rice.",
        nutrition: { calories: 340, protein: 16, carbs: 44, fat: 10 }
      },
      {
        dishName: "Vegetable Curry with Coconut Milk",
        description: "Seasonal vegetables in creamy curry sauce with jasmine rice.",
        nutrition: { calories: 360, protein: 10, carbs: 48, fat: 14 }
      },
      // American
      {
        dishName: "Stuffed Bell Peppers",
        description: "Bell peppers filled with quinoa, black beans, corn, and cheese.",
        nutrition: { calories: 340, protein: 14, carbs: 46, fat: 12 }
      },
      {
        dishName: "Vegetable Chili",
        description: "Hearty bean and vegetable stew with tomatoes and spices.",
        nutrition: { calories: 310, protein: 15, carbs: 45, fat: 8 }
      },
      // Latin American
      {
        dishName: "Chiles Rellenos",
        description: "Roasted poblano peppers stuffed with cheese in tomato sauce.",
        nutrition: { calories: 340, protein: 12, carbs: 38, fat: 15 }
      },
      {
        dishName: "Black Bean and Squash Tacos",
        description: "Soft corn tortillas with roasted squash, black beans, and salsa verde.",
        nutrition: { calories: 320, protein: 12, carbs: 48, fat: 9 }
      },
      // Middle Eastern
      {
        dishName: "Stuffed Grape Leaves",
        description: "Grape leaves rolled with rice, herbs, and spices.",
        nutrition: { calories: 280, protein: 8, carbs: 42, fat: 8 }
      },
      {
        dishName: "Vegetable Mezze Platter",
        description: "Hummus, baba ganoush, tabbouleh, pita, olives, and fresh vegetables.",
        nutrition: { calories: 380, protein: 12, carbs: 50, fat: 15 }
      }
    ],
    Snack: [
      {
        dishName: "Hummus with Vegetable Sticks",
        description: "Creamy chickpea hummus with fresh carrots, celery, and bell peppers.",
        nutrition: { calories: 180, protein: 7, carbs: 20, fat: 8 }
      },
      {
        dishName: "Mixed Nuts and Seeds",
        description: "Almonds, cashews, pumpkin seeds, and dried cranberries.",
        nutrition: { calories: 200, protein: 6, carbs: 16, fat: 14 }
      },
      {
        dishName: "Greek Yogurt with Honey and Walnuts",
        description: "Plain Greek yogurt drizzled with honey and topped with crushed walnuts.",
        nutrition: { calories: 190, protein: 12, carbs: 18, fat: 8 }
      },
      {
        dishName: "Whole Grain Crackers with Cheese",
        description: "Whole grain crackers with sharp cheddar or gouda cheese.",
        nutrition: { calories: 210, protein: 9, carbs: 22, fat: 10 }
      },
      {
        dishName: "Apple with Peanut Butter",
        description: "Sliced apple with natural almond or peanut butter.",
        nutrition: { calories: 200, protein: 6, carbs: 24, fat: 9 }
      },
      {
        dishName: "Chana Chaat",
        description: "Spiced chickpea salad with tangy dressing. High in protein and fiber.",
        nutrition: { calories: 180, protein: 9, carbs: 25, fat: 5 }
      },
      {
        dishName: "Protein Bar (Homemade or Store-bought)",
        description: "Oats, nuts, and protein powder combination.",
        nutrition: { calories: 220, protein: 10, carbs: 26, fat: 8 }
      },
      {
        dishName: "Roasted Chickpeas",
        description: "Crispy spiced chickpeas. High-protein, fiber-rich snack.",
        nutrition: { calories: 160, protein: 8, carbs: 18, fat: 6 }
      },
      {
        dishName: "Cheese and Fruit Plate",
        description: "Assorted cheeses with grapes, figs, and almonds.",
        nutrition: { calories: 240, protein: 10, carbs: 22, fat: 12 }
      }
    ],
    "Evening Snack": [
      {
        dishName: "Chamomile Tea with Biscuits",
        description: "Calming chamomile tea with whole grain digestive biscuits.",
        nutrition: { calories: 140, protein: 3, carbs: 24, fat: 3 }
      },
      {
        dishName: "Fruit Smoothie",
        description: "Blended banana, berries, and yogurt with a splash of honey.",
        nutrition: { calories: 200, protein: 8, carbs: 38, fat: 2 }
      },
      {
        dishName: "Herbal Tea with Almonds",
        description: "Warm herbal tea paired with a small handful of almonds.",
        nutrition: { calories: 160, protein: 5, carbs: 12, fat: 11 }
      },
      {
        dishName: "Vegetable Soup",
        description: "Light vegetable broth with mixed vegetables. Low-calorie, nutrient-dense option.",
        nutrition: { calories: 110, protein: 4, carbs: 18, fat: 2 }
      },
      {
        dishName: "Cottage Cheese with Berries",
        description: "Creamy cottage cheese topped with fresh blueberries and a drizzle of honey.",
        nutrition: { calories: 180, protein: 14, carbs: 18, fat: 5 }
      },
      {
        dishName: "Fruit Chaat",
        description: "Mixed fruit salad with spices and herbs. Rich in vitamins and natural sugars.",
        nutrition: { calories: 130, protein: 2, carbs: 30, fat: 1 }
      }
    ],
    "Mid-morning Snack": [
      {
        dishName: "Smoothie Bowl",
        description: "Thick yogurt smoothie base topped with granola, coconut, and fresh fruit.",
        nutrition: { calories: 280, protein: 10, carbs: 42, fat: 8 }
      },
      {
        dishName: "Whole Grain Muffin",
        description: "Blueberry or banana whole wheat muffin with natural sweeteners.",
        nutrition: { calories: 220, protein: 6, carbs: 38, fat: 6 }
      },
      {
        dishName: "Masala Buttermilk",
        description: "Spiced yogurt drink with digestive herbs. Probiotic-rich and refreshing.",
        nutrition: { calories: 80, protein: 5, carbs: 6, fat: 3 }
      },
      {
        dishName: "Multigrain Khakhra",
        description: "Thin crispy flatbread made with mixed grains. Rich in fiber and complex carbs.",
        nutrition: { calories: 120, protein: 3, carbs: 20, fat: 3 }
      },
      {
        dishName: "Banana with Almond Butter",
        description: "Fresh banana sliced and dipped in creamy almond butter.",
        nutrition: { calories: 240, protein: 7, carbs: 28, fat: 11 }
      },
      {
        dishName: "Green Smoothie",
        description: "Blend of leafy greens, banana, spinach, and plant milk.",
        nutrition: { calories: 150, protein: 5, carbs: 28, fat: 2 }
      }
    ]
  },

  "non-veg": {
    Breakfast: [
      // European
      {
        dishName: "Bacon and Egg Breakfast",
        description: "Crispy bacon with fried or scrambled eggs and whole grain toast.",
        nutrition: { calories: 380, protein: 20, carbs: 28, fat: 18 }
      },
      {
        dishName: "Smoked Salmon Bagel",
        description: "Toasted bagel with cream cheese, smoked salmon, capers, and red onion.",
        nutrition: { calories: 380, protein: 18, carbs: 38, fat: 14 }
      },
      {
        dishName: "Chorizo and Egg Breakfast",
        description: "Spicy chorizo sausage with scrambled eggs and avocado.",
        nutrition: { calories: 420, protein: 22, carbs: 15, fat: 28 }
      },
      // American
      {
        dishName: "Steak and Eggs",
        description: "Grilled steak with fried eggs and hash browns.",
        nutrition: { calories: 480, protein: 28, carbs: 32, fat: 24 }
      },
      {
        dishName: "Sausage Patties with Pancakes",
        description: "Turkey sausage with whole wheat pancakes and maple syrup.",
        nutrition: { calories: 420, protein: 18, carbs: 48, fat: 16 }
      },
      {
        dishName: "Ham and Cheese Omelette",
        description: "Fluffy eggs with ham, cheddar, and bell peppers.",
        nutrition: { calories: 380, protein: 22, carbs: 12, fat: 26 }
      },
      // Asian
      {
        dishName: "Egg Bhurji with Paratha",
        description: "Spiced scrambled eggs with whole wheat flatbread.",
        nutrition: { calories: 350, protein: 18, carbs: 30, fat: 16 }
      },
      {
        dishName: "Chicken Keema Paratha",
        description: "Flatbread stuffed with spiced minced chicken.",
        nutrition: { calories: 380, protein: 22, carbs: 35, fat: 15 }
      },
      {
        dishName: "Masala Omelette with Toast",
        description: "Spiced egg omelette with mixed vegetables and whole grain toast.",
        nutrition: { calories: 320, protein: 20, carbs: 25, fat: 14 }
      },
      // Latin American
      {
        dishName: "Huevos con Chorizo",
        description: "Fried eggs with Mexican chorizo, tortillas, and salsa.",
        nutrition: { calories: 400, protein: 20, carbs: 30, fat: 20 }
      },
      {
        dishName: "Breakfast Burrito",
        description: "Eggs, sausage, potatoes, and cheese in a flour tortilla.",
        nutrition: { calories: 450, protein: 22, carbs: 42, fat: 18 }
      },
      // Mediterranean
      {
        dishName: "Mediterranean Eggs with Feta",
        description: "Baked eggs with tomatoes, feta cheese, and olives.",
        nutrition: { calories: 340, protein: 16, carbs: 18, fat: 20 }
      }
    ],
    Lunch: [
      // European
      {
        dishName: "Grilled Chicken Breast with Roasted Vegetables",
        description: "Seasoned chicken breast with roasted broccoli, carrots, and potatoes.",
        nutrition: { calories: 420, protein: 32, carbs: 42, fat: 10 }
      },
      {
        dishName: "German Bratwurst with Sauerkraut",
        description: "Grilled bratwurst sausage with tangy sauerkraut and whole grain mustard.",
        nutrition: { calories: 450, protein: 28, carbs: 25, fat: 24 }
      },
      {
        dishName: "Pan-Seared Salmon",
        description: "Fresh salmon fillet with lemon butter sauce, asparagus, and new potatoes.",
        nutrition: { calories: 480, protein: 36, carbs: 32, fat: 20 }
      },
      // American
      {
        dishName: "Grilled Chicken Burger",
        description: "Lean ground chicken patty with lettuce, tomato, and whole wheat bun.",
        nutrition: { calories: 420, protein: 32, carbs: 38, fat: 14 }
      },
      {
        dishName: "Turkey Meatballs with Marinara",
        description: "Homemade turkey meatballs in tomato sauce with whole wheat pasta.",
        nutrition: { calories: 420, protein: 32, carbs: 48, fat: 10 }
      },
      {
        dishName: "Chicken Caesar Salad",
        description: "Grilled chicken breast with romaine, parmesan, and whole grain croutons.",
        nutrition: { calories: 380, protein: 32, carbs: 28, fat: 14 }
      },
      // Asian
      {
        dishName: "Chicken Biryani",
        description: "Fragrant rice cooked with chicken and aromatic spices.",
        nutrition: { calories: 450, protein: 25, carbs: 50, fat: 15 }
      },
      {
        dishName: "Fish Curry with Rice",
        description: "Tangy fish curry served with steamed rice. Rich in lean protein and omega-3.",
        nutrition: { calories: 400, protein: 28, carbs: 45, fat: 12 }
      },
      {
        dishName: "Chicken Pad Thai",
        description: "Rice noodles with chicken, shrimp, peanuts, and lime tamarind sauce.",
        nutrition: { calories: 450, protein: 28, carbs: 48, fat: 14 }
      },
      {
        dishName: "Teriyaki Chicken Bowl",
        description: "Sliced chicken in teriyaki sauce with steamed vegetables and brown rice.",
        nutrition: { calories: 420, protein: 30, carbs: 50, fat: 10 }
      },
      {
        dishName: "Mutton Rogan Josh with Naan",
        description: "Slow-cooked lamb curry with aromatic spices, served with flatbread.",
        nutrition: { calories: 480, protein: 30, carbs: 40, fat: 20 }
      },
      // Mediterranean
      {
        dishName: "Grilled Sea Bass with Herbs",
        description: "Fresh sea bass with Mediterranean herbs, olive oil, and lemon.",
        nutrition: { calories: 380, protein: 36, carbs: 18, fat: 16 }
      },
      {
        dishName: "Chicken Souvlaki",
        description: "Marinated grilled chicken skewers with tzatziki and pita.",
        nutrition: { calories: 420, protein: 34, carbs: 32, fat: 14 }
      },
      // Latin American
      {
        dishName: "Carne Asada Tacos",
        description: "Marinated grilled beef in corn tortillas with cilantro and lime.",
        nutrition: { calories: 420, protein: 32, carbs: 36, fat: 16 }
      },
      {
        dishName: "Chiles Rellenos de Carne",
        description: "Roasted peppers stuffed with ground beef in tomato sauce.",
        nutrition: { calories: 400, protein: 28, carbs: 32, fat: 16 }
      },
      // Middle Eastern
      {
        dishName: "Shawarma Wrap",
        description: "Spiced marinated chicken in pita with hummus and vegetables.",
        nutrition: { calories: 420, protein: 30, carbs: 42, fat: 14 }
      },
      {
        dishName: "Kebab with Tahini Sauce",
        description: "Grilled lamb kebabs with tahini sauce, pita, and salad.",
        nutrition: { calories: 450, protein: 32, carbs: 38, fat: 16 }
      }
    ],
    Dinner: [
      // European
      {
        dishName: "Pan-Seared Steak with Garlic Butter",
        description: "Lean cut steak with garlic herb butter, roasted Brussels sprouts, and potatoes.",
        nutrition: { calories: 520, protein: 42, carbs: 32, fat: 24 }
      },
      {
        dishName: "Herb-Roasted Chicken Thighs",
        description: "Bone-in chicken thighs with rosemary, thyme, and roasted root vegetables.",
        nutrition: { calories: 480, protein: 36, carbs: 32, fat: 20 }
      },
      {
        dishName: "Baked Cod with Lemon",
        description: "White fish fillet with lemon, capers, and steamed vegetables.",
        nutrition: { calories: 360, protein: 38, carbs: 28, fat: 10 }
      },
      // American
      {
        dishName: "Lean Beef Tacos",
        description: "Ground beef in corn tortillas with lettuce, tomato, and salsa.",
        nutrition: { calories: 420, protein: 32, carbs: 40, fat: 14 }
      },
      {
        dishName: "Chicken Parmesan",
        description: "Breaded chicken breast with tomato sauce and mozzarella cheese.",
        nutrition: { calories: 480, protein: 38, carbs: 42, fat: 16 }
      },
      {
        dishName: "Turkey Meatloaf",
        description: "Lean ground turkey meatloaf with vegetables and tomato glaze.",
        nutrition: { calories: 400, protein: 36, carbs: 32, fat: 14 }
      },
      // Asian
      {
        dishName: "Tandoori Chicken with Mint Chutney",
        description: "Roasted marinated chicken with mint sauce. High-protein, low-carb dinner.",
        nutrition: { calories: 320, protein: 35, carbs: 8, fat: 15 }
      },
      {
        dishName: "Egg Curry with Roti",
        description: "Eggs in a spiced tomato gravy served with whole wheat flatbread.",
        nutrition: { calories: 380, protein: 22, carbs: 30, fat: 18 }
      },
      {
        dishName: "Chicken Tikka Masala with Jeera Rice",
        description: "Grilled chicken in creamy tomato sauce with cumin rice.",
        nutrition: { calories: 420, protein: 28, carbs: 40, fat: 16 }
      },
      {
        dishName: "Mongolian Beef",
        description: "Tender beef with scallions in savory sauce over steamed rice.",
        nutrition: { calories: 450, protein: 32, carbs: 48, fat: 14 }
      },
      {
        dishName: "Shrimp Lo Mein",
        description: "Shrimp with egg noodles, vegetables, and sesame oil.",
        nutrition: { calories: 380, protein: 28, carbs: 42, fat: 12 }
      },
      // Mediterranean
      {
        dishName: "Grilled Salmon with Dill",
        description: "Fresh salmon with fresh dill, lemon, and roasted fennel.",
        nutrition: { calories: 420, protein: 38, carbs: 24, fat: 18 }
      },
      {
        dishName: "Chicken with Feta and Spinach",
        description: "Baked chicken breast with creamy spinach and feta sauce.",
        nutrition: { calories: 400, protein: 36, carbs: 18, fat: 16 }
      },
      // Latin American
      {
        dishName: "Chicken Enchiladas Rojo",
        description: "Rolled tortillas with shredded chicken and red sauce, topped with cheese.",
        nutrition: { calories: 420, protein: 32, carbs: 44, fat: 14 }
      },
      {
        dishName: "Grilled Fish with Cilantro Lime",
        description: "Fresh white fish with cilantro-lime seasoning and black beans.",
        nutrition: { calories: 380, protein: 36, carbs: 32, fat: 10 }
      },
      // Middle Eastern
      {
        dishName: "Kofta with Tzatziki",
        description: "Spiced ground lamb patties with yogurt sauce and pita.",
        nutrition: { calories: 440, protein: 32, carbs: 32, fat: 18 }
      },
      {
        dishName: "Za'atar Roasted Chicken",
        description: "Whole chicken seasoned with za'atar spice blend, roasted with vegetables.",
        nutrition: { calories: 420, protein: 40, carbs: 28, fat: 14 }
      }
    ],
    Snack: [
      {
        dishName: "Grilled Chicken Strips",
        description: "Sliced grilled chicken breast with garlic and herbs. High-protein snack.",
        nutrition: { calories: 180, protein: 28, carbs: 2, fat: 6 }
      },
      {
        dishName: "Beef Jerky",
        description: "Lean beef jerky. Perfect portable, high-protein snack.",
        nutrition: { calories: 160, protein: 24, carbs: 4, fat: 5 }
      },
      {
        dishName: "Salmon and Cream Cheese Roll",
        description: "Smoked salmon with cream cheese wrapped in lettuce.",
        nutrition: { calories: 200, protein: 18, carbs: 3, fat: 12 }
      },
      {
        dishName: "Hard-Boiled Eggs",
        description: "Protein-packed hard-boiled eggs with a sprinkle of sea salt.",
        nutrition: { calories: 155, protein: 13, carbs: 1, fat: 11 }
      },
      {
        dishName: "Tuna Salad",
        description: "Canned tuna mixed with Greek yogurt, celery, and served on crackers.",
        nutrition: { calories: 190, protein: 22, carbs: 8, fat: 7 }
      },
      {
        dishName: "Chicken Tikka",
        description: "Grilled marinated chicken pieces. High-protein, low-carb snack.",
        nutrition: { calories: 180, protein: 22, carbs: 3, fat: 8 }
      },
      {
        dishName: "Turkey and Cheese Sandwich",
        description: "Sliced turkey breast on whole grain bread with Swiss cheese.",
        nutrition: { calories: 280, protein: 24, carbs: 28, fat: 8 }
      }
    ],
    "Evening Snack": [
      {
        dishName: "Chicken Broth",
        description: "Warm, comforting chicken broth with vegetables. Low-calorie option.",
        nutrition: { calories: 100, protein: 12, carbs: 6, fat: 3 }
      },
      {
        dishName: "Egg Salad",
        description: "Boiled eggs with mixed vegetables and light dressing.",
        nutrition: { calories: 150, protein: 12, carbs: 5, fat: 10 }
      },
      {
        dishName: "Smoked Salmon Platter",
        description: "Smoked salmon with cucumber slices and herbed cream cheese.",
        nutrition: { calories: 180, protein: 16, carbs: 4, fat: 11 }
      },
      {
        dishName: "Protein Shake",
        description: "Whey protein powder with milk and berries.",
        nutrition: { calories: 200, protein: 25, carbs: 14, fat: 3 }
      },
      {
        dishName: "Turkey Meatballs",
        description: "Light turkey meatballs with marinara sauce for dipping.",
        nutrition: { calories: 160, protein: 20, carbs: 6, fat: 6 }
      }
    ],
    "Mid-morning Snack": [
      {
        dishName: "Boiled Eggs",
        description: "Simple boiled eggs with a sprinkle of spices. Pure protein source.",
        nutrition: { calories: 140, protein: 12, carbs: 1, fat: 10 }
      },
      {
        dishName: "Chicken Sandwich",
        description: "Shredded chicken with vegetables in multigrain bread.",
        nutrition: { calories: 280, protein: 24, carbs: 28, fat: 8 }
      },
      {
        dishName: "Prosciutto and Cantaloupe",
        description: "Salty prosciutto with sweet cantaloupe melon.",
        nutrition: { calories: 200, protein: 14, carbs: 18, fat: 8 }
      },
      {
        dishName: "Deviled Eggs",
        description: "Hard-boiled eggs with mustard and paprika filling.",
        nutrition: { calories: 170, protein: 12, carbs: 2, fat: 13 }
      },
      {
        dishName: "Deli Meat and Cheese",
        description: "Sliced turkey or ham with cheddar cheese and whole grain crackers.",
        nutrition: { calories: 240, protein: 18, carbs: 20, fat: 10 }
      }
    ]
  },

  vegan: {
    Breakfast: [
      // European
      {
        dishName: "Almond Milk Cappuccino with Almond Croissant",
        description: "Creamy plant-based cappuccino with vegan butter croissant.",
        nutrition: { calories: 300, protein: 8, carbs: 36, fat: 14 }
      },
      {
        dishName: "Avocado Toast on Sourdough",
        description: "Mashed avocado on whole grain sourdough with cherry tomatoes and microgreens.",
        nutrition: { calories: 310, protein: 10, carbs: 32, fat: 16 }
      },
      {
        dishName: "Chia Seed Pudding",
        description: "Chia seeds soaked in almond milk with fresh berries and coconut.",
        nutrition: { calories: 280, protein: 9, carbs: 28, fat: 14 }
      },
      // Mediterranean
      {
        dishName: "Mediterranean Breakfast Bowl",
        description: "Olive oil, falafel crumbles, hummus, and fresh vegetables.",
        nutrition: { calories: 320, protein: 11, carbs: 38, fat: 14 }
      },
      // American
      {
        dishName: "Vegan Pancakes with Maple Syrup",
        description: "Fluffy plant-based pancakes topped with fresh blueberries and maple syrup.",
        nutrition: { calories: 340, protein: 8, carbs: 58, fat: 8 }
      },
      {
        dishName: "Tofu Scramble",
        description: "Scrambled tofu with turmeric and vegetables. High in plant protein.",
        nutrition: { calories: 220, protein: 15, carbs: 12, fat: 14 }
      },
      // Asian
      {
        dishName: "Congee with Vegetables",
        description: "Rice porridge cooked until creamy, topped with mushrooms and green onions.",
        nutrition: { calories: 240, protein: 7, carbs: 44, fat: 4 }
      },
      {
        dishName: "Quinoa Upma",
        description: "Savory quinoa porridge with mixed vegetables. Complete protein.",
        nutrition: { calories: 260, protein: 10, carbs: 40, fat: 6 }
      },
      {
        dishName: "Vegetable Poha",
        description: "Flattened rice with vegetables, nuts, and spices.",
        nutrition: { calories: 250, protein: 8, carbs: 40, fat: 7 }
      },
      // Latin American
      {
        dishName: "Huevos Rancheros (Tofu Version)",
        description: "Tofu scramble on tortillas with black beans, salsa, and avocado.",
        nutrition: { calories: 340, protein: 14, carbs: 42, fat: 14 }
      },
      // Middle Eastern
      {
        dishName: "Manakish",
        description: "Flatbread topped with za'atar spice blend, olive oil, and sesame seeds.",
        nutrition: { calories: 290, protein: 9, carbs: 38, fat: 11 }
      }
    ],
    Lunch: [
      // Mediterranean
      {
        dishName: "Greek Salad with Vegan Feta",
        description: "Tomatoes, cucumbers, olives with vegan feta and olive oil dressing.",
        nutrition: { calories: 280, protein: 9, carbs: 28, fat: 14 }
      },
      {
        dishName: "Mediterranean Vegetable Pasta",
        description: "Whole wheat pasta with roasted eggplant, zucchini, and tomatoes.",
        nutrition: { calories: 380, protein: 13, carbs: 58, fat: 10 }
      },
      // European
      {
        dishName: "Ratatouille with Crusty Bread",
        description: "Slow-cooked vegetable stew with herbs and whole grain bread.",
        nutrition: { calories: 310, protein: 8, carbs: 42, fat: 11 }
      },
      {
        dishName: "Spinach and Mushroom Quiche (Vegan)",
        description: "Plant-based quiche with silken tofu, spinach, and mushrooms.",
        nutrition: { calories: 320, protein: 12, carbs: 32, fat: 14 }
      },
      // American
      {
        dishName: "Veggie Burger with Sweet Potato Fries",
        description: "Plant-based patty on whole wheat bun with vegan mayo and veggies.",
        nutrition: { calories: 400, protein: 14, carbs: 52, fat: 16 }
      },
      {
        dishName: "Buddha Bowl with Tahini Dressing",
        description: "Quinoa, roasted vegetables, chickpeas, and tahini dressing.",
        nutrition: { calories: 420, protein: 16, carbs: 54, fat: 14 }
      },
      // Asian
      {
        dishName: "Vegetable Pad Thai",
        description: "Rice noodles with vegetables, peanuts, and tamarind sauce.",
        nutrition: { calories: 380, protein: 12, carbs: 50, fat: 14 }
      },
      {
        dishName: "Vegetable Lo Mein",
        description: "Egg noodles (or vegan noodles) with mixed vegetables and sesame oil.",
        nutrition: { calories: 350, protein: 10, carbs: 48, fat: 12 }
      },
      {
        dishName: "Chickpea Curry with Brown Rice",
        description: "Spiced chickpea curry served with brown rice.",
        nutrition: { calories: 380, protein: 14, carbs: 65, fat: 7 }
      },
      {
        dishName: "Dal Tadka with Whole Wheat Roti",
        description: "Tempered lentil curry with flatbread. Protein-rich plant meal.",
        nutrition: { calories: 340, protein: 16, carbs: 50, fat: 6 }
      },
      // Latin American
      {
        dishName: "Bean Burrito Bowl",
        description: "Rice, black beans, corn, salsa, vegan cheese, and guacamole.",
        nutrition: { calories: 420, protein: 14, carbs: 55, fat: 14 }
      },
      {
        dishName: "Vegetable Enchiladas Verdes",
        description: "Rolled tortillas with roasted vegetables and green salsa.",
        nutrition: { calories: 380, protein: 11, carbs: 50, fat: 14 }
      },
      // Middle Eastern
      {
        dishName: "Falafel Wrap",
        description: "Crispy chickpea fritters in pita with tahini sauce.",
        nutrition: { calories: 380, protein: 12, carbs: 48, fat: 15 }
      },
      {
        dishName: "Tabbouleh Salad",
        description: "Bulgur wheat, parsley, mint, tomato with lemon-olive oil dressing.",
        nutrition: { calories: 300, protein: 10, carbs: 42, fat: 10 }
      }
    ],
    Dinner: [
      // European
      {
        dishName: "Vegetable Pasta Primavera",
        description: "Whole wheat pasta with fresh spring vegetables and garlic olive oil.",
        nutrition: { calories: 380, protein: 13, carbs: 55, fat: 11 }
      },
      {
        dishName: "Vegetable Gratin",
        description: "Layered potatoes and vegetables with vegan cheese topping.",
        nutrition: { calories: 360, protein: 12, carbs: 44, fat: 14 }
      },
      // Mediterranean
      {
        dishName: "Vegetable Mezze Platter",
        description: "Hummus, baba ganoush, tabbouleh, pita, olives, and fresh vegetables.",
        nutrition: { calories: 380, protein: 12, carbs: 50, fat: 15 }
      },
      {
        dishName: "Stuffed Grape Leaves",
        description: "Grape leaves rolled with rice, herbs, and spices.",
        nutrition: { calories: 280, protein: 8, carbs: 42, fat: 8 }
      },
      // Asian
      {
        dishName: "Stir-Fried Vegetables with Tofu",
        description: "Mixed vegetables and silken tofu in ginger-garlic sauce.",
        nutrition: { calories: 340, protein: 18, carbs: 42, fat: 10 }
      },
      {
        dishName: "Vegetable Curry with Coconut Milk",
        description: "Seasonal vegetables in creamy coconut curry sauce.",
        nutrition: { calories: 360, protein: 10, carbs: 48, fat: 14 }
      },
      {
        dishName: "Tofu and Vegetable Biryani",
        description: "Fragrant saffron rice with tofu and mixed vegetables.",
        nutrition: { calories: 400, protein: 16, carbs: 55, fat: 12 }
      },
      {
        dishName: "Vegetable Thali with Millet Roti",
        description: "Assorted vegetables, dal, and millet flatbread.",
        nutrition: { calories: 360, protein: 14, carbs: 50, fat: 10 }
      },
      // American
      {
        dishName: "Black Bean and Mushroom Burger",
        description: "Hearty patty on whole wheat bun with all the fixings.",
        nutrition: { calories: 420, protein: 16, carbs: 52, fat: 14 }
      },
      {
        dishName: "Vegetable Chili",
        description: "Hearty bean and vegetable stew with tomatoes and spices.",
        nutrition: { calories: 310, protein: 15, carbs: 45, fat: 8 }
      },
      // Latin American
      {
        dishName: "Chiles Rellenos (Vegan)",
        description: "Roasted peppers stuffed with beans and vegetables.",
        nutrition: { calories: 320, protein: 12, carbs: 42, fat: 12 }
      },
      {
        dishName: "Black Bean and Squash Tacos",
        description: "Soft corn tortillas with roasted squash, beans, and salsa verde.",
        nutrition: { calories: 320, protein: 12, carbs: 48, fat: 9 }
      },
      // Middle Eastern
      {
        dishName: "Lentil and Spinach Stew",
        description: "Hearty lentil stew with spinach and aromatic spices.",
        nutrition: { calories: 300, protein: 14, carbs: 46, fat: 6 }
      }
    ],
    Snack: [
      {
        dishName: "Hummus with Vegetable Sticks",
        description: "Creamy chickpea hummus with fresh carrots, celery, and peppers.",
        nutrition: { calories: 180, protein: 7, carbs: 20, fat: 8 }
      },
      {
        dishName: "Mixed Nuts and Seeds",
        description: "Almonds, cashews, pumpkin seeds, and dried cranberries.",
        nutrition: { calories: 200, protein: 6, carbs: 16, fat: 14 }
      },
      {
        dishName: "Coconut Yogurt with Granola",
        description: "Dairy-free yogurt with granola and fresh berries.",
        nutrition: { calories: 220, protein: 6, carbs: 36, fat: 8 }
      },
      {
        dishName: "Apple with Almond Butter",
        description: "Sliced apple with creamy natural almond butter.",
        nutrition: { calories: 200, protein: 6, carbs: 24, fat: 9 }
      },
      {
        dishName: "Roasted Chickpeas",
        description: "Crispy spiced chickpeas. High-protein, fiber-rich snack.",
        nutrition: { calories: 150, protein: 8, carbs: 18, fat: 6 }
      },
      {
        dishName: "Vegan Protein Bar",
        description: "Plant-based protein bar with nuts and seeds.",
        nutrition: { calories: 220, protein: 10, carbs: 24, fat: 10 }
      },
      {
        dishName: "Fruit and Nut Mix",
        description: "Dried fruits, nuts, and seeds for energy.",
        nutrition: { calories: 210, protein: 7, carbs: 28, fat: 8 }
      }
    ],
    "Evening Snack": [
      {
        dishName: "Herbal Tea with Biscuits",
        description: "Calming herbal tea with whole grain digestive biscuits.",
        nutrition: { calories: 140, protein: 3, carbs: 24, fat: 3 }
      },
      {
        dishName: "Vegan Smoothie",
        description: "Banana, berries, plant milk, and plant-based protein powder.",
        nutrition: { calories: 200, protein: 10, carbs: 36, fat: 2 }
      },
      {
        dishName: "Herbal Tea with Almonds",
        description: "Warm herbal tea paired with a handful of almonds.",
        nutrition: { calories: 160, protein: 5, carbs: 12, fat: 11 }
      },
      {
        dishName: "Light Vegetable Soup",
        description: "Light vegetable broth with mixed vegetables.",
        nutrition: { calories: 110, protein: 4, carbs: 18, fat: 2 }
      },
      {
        dishName: "Fruit Smoothie with Chia Seeds",
        description: "Blended fruits with plant milk and chia seeds.",
        nutrition: { calories: 160, protein: 5, carbs: 25, fat: 5 }
      }
    ],
    "Mid-morning Snack": [
      {
        dishName: "Smoothie Bowl",
        description: "Thick plant-based smoothie topped with granola and fresh fruit.",
        nutrition: { calories: 280, protein: 8, carbs: 44, fat: 8 }
      },
      {
        dishName: "Vegan Muffin",
        description: "Blueberry or banana plant-based muffin with natural sweeteners.",
        nutrition: { calories: 220, protein: 5, carbs: 40, fat: 6 }
      },
      {
        dishName: "Banana with Peanut Butter",
        description: "Fresh banana with creamy natural peanut butter.",
        nutrition: { calories: 240, protein: 7, carbs: 28, fat: 11 }
      },
      {
        dishName: "Green Smoothie",
        description: "Blend of spinach, banana, plant milk, and protein powder.",
        nutrition: { calories: 150, protein: 8, carbs: 24, fat: 2 }
      },
      {
        dishName: "Roasted Chickpea Snack Mix",
        description: "Chickpeas, nuts, and dried fruit mix.",
        nutrition: { calories: 200, protein: 8, carbs: 22, fat: 9 }
      }
    ]
  }
};

export default mealTemplates;
