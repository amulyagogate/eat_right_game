/**
 * Comprehensive Food Database for 'Eat Right' Game
 * Each food item has nutritional profile, classification (healthy/junk),
 * points (+10 healthy, +5 junk), icons, and educational descriptions.
 */

const FOODS_DATABASE = [

    // ============================================================
    // HEALTHY MEALS (+10 points)
    // ============================================================

    {
        id: 'dal_rice',
        name: 'Dal Rice',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🍛',
        calories: 320,
        protein: 12.0,
        carbs: 52.0,
        fat: 7.0,
        sugar: 2.0,
        fiber: 7.0,
        description: 'A comforting combination of lentils and rice that provides plant protein, complex carbohydrates, and dietary fiber.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'rajma_rice',
        name: 'Rajma Rice',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🍛',
        calories: 340,
        protein: 13.0,
        carbs: 55.0,
        fat: 6.0,
        sugar: 3.0,
        fiber: 9.0,
        description: 'Kidney beans and rice provide plant-based protein, complex carbohydrates, iron, and fiber for lasting energy.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'chole_rice',
        name: 'Chole Rice',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🍚',
        calories: 350,
        protein: 12.0,
        carbs: 57.0,
        fat: 7.0,
        sugar: 4.0,
        fiber: 9.0,
        description: 'Chickpeas paired with rice provide fiber, plant protein, and complex carbohydrates that help keep you satisfied.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'dal_khichdi',
        name: 'Dal Khichdi',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥣',
        calories: 300,
        protein: 11.0,
        carbs: 48.0,
        fat: 6.0,
        sugar: 2.0,
        fiber: 6.0,
        description: 'A wholesome combination of lentils and rice that is rich in protein, fiber, and easy-to-digest carbohydrates.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'vegetable_khichdi',
        name: 'Vegetable Khichdi',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥣',
        calories: 310,
        protein: 10.0,
        carbs: 49.0,
        fat: 7.0,
        sugar: 4.0,
        fiber: 7.0,
        description: 'A balanced one-pot meal combining grains, lentils, and vegetables for protein, fiber, and essential nutrients.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'roti_dal',
        name: 'Roti & Dal',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🫓',
        calories: 330,
        protein: 13.0,
        carbs: 50.0,
        fat: 8.0,
        sugar: 2.0,
        fiber: 8.0,
        description: 'Whole wheat roti with lentils creates a filling meal rich in plant protein, complex carbohydrates, and fiber.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'roti_sabzi',
        name: 'Roti & Mixed Vegetables',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥗',
        calories: 290,
        protein: 8.0,
        carbs: 43.0,
        fat: 8.0,
        sugar: 6.0,
        fiber: 8.0,
        description: 'Whole wheat roti with mixed vegetables provides complex carbohydrates, vitamins, minerals, and dietary fiber.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'palak_paneer',
        name: 'Palak Paneer',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥘',
        calories: 280,
        protein: 15.0,
        carbs: 12.0,
        fat: 19.0,
        sugar: 4.0,
        fiber: 5.0,
        description: 'Spinach and paneer provide protein, calcium, iron, and antioxidants in a nutrient-rich Indian meal.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'paneer_roti',
        name: 'Paneer & Roti',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🫓',
        calories: 350,
        protein: 18.0,
        carbs: 38.0,
        fat: 14.0,
        sugar: 3.0,
        fiber: 5.0,
        description: 'Paneer paired with whole wheat roti provides protein, calcium, and carbohydrates for a balanced meal.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'vegetable_pulao',
        name: 'Vegetable Pulao',
        category: 'healthy',
        group: 'Rice Meal',
        points: 10,
        icon: '🍚',
        calories: 310,
        protein: 7.0,
        carbs: 48.0,
        fat: 9.0,
        sugar: 4.0,
        fiber: 5.0,
        description: 'Rice cooked with vegetables provides carbohydrates for energy along with fiber, vitamins, and minerals.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'vegetable_biryani',
        name: 'Vegetable Biryani',
        category: 'healthy',
        group: 'Rice Meal',
        points: 10,
        icon: '🍚',
        calories: 360,
        protein: 9.0,
        carbs: 55.0,
        fat: 11.0,
        sugar: 5.0,
        fiber: 6.0,
        description: 'A flavorful rice meal with vegetables that provides energy, fiber, and a variety of plant nutrients.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'chicken_rice',
        name: 'Grilled Chicken & Rice',
        category: 'healthy',
        group: 'Protein Meal',
        points: 10,
        icon: '🍗',
        calories: 430,
        protein: 35.0,
        carbs: 48.0,
        fat: 10.0,
        sugar: 2.0,
        fiber: 3.0,
        description: 'Lean grilled chicken with rice provides high-quality protein and carbohydrates to support energy and muscle health.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'chicken_roti',
        name: 'Chicken Curry & Roti',
        category: 'healthy',
        group: 'Protein Meal',
        points: 10,
        icon: '🍗',
        calories: 420,
        protein: 31.0,
        carbs: 40.0,
        fat: 14.0,
        sugar: 4.0,
        fiber: 5.0,
        description: 'Chicken curry with whole wheat roti provides protein and complex carbohydrates in a satisfying balanced meal.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'grilled_fish_rice',
        name: 'Grilled Fish & Rice',
        category: 'healthy',
        group: 'Protein Meal',
        points: 10,
        icon: '🐟',
        calories: 390,
        protein: 30.0,
        carbs: 43.0,
        fat: 10.0,
        sugar: 1.0,
        fiber: 2.0,
        description: 'Grilled fish and rice provide quality protein, healthy fats, and carbohydrates for energy and recovery.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'fish_curry_rice',
        name: 'Fish Curry & Rice',
        category: 'healthy',
        group: 'Protein Meal',
        points: 10,
        icon: '🐟',
        calories: 410,
        protein: 27.0,
        carbs: 45.0,
        fat: 12.0,
        sugar: 3.0,
        fiber: 3.0,
        description: 'Fish curry with rice provides protein and healthy fats while supplying carbohydrates for daily energy.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'egg_curry_roti',
        name: 'Egg Curry & Roti',
        category: 'healthy',
        group: 'Protein Meal',
        points: 10,
        icon: '🥚',
        calories: 370,
        protein: 20.0,
        carbs: 38.0,
        fat: 15.0,
        sugar: 4.0,
        fiber: 5.0,
        description: 'Eggs and whole wheat roti provide complete protein, essential nutrients, and complex carbohydrates.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'moong_chilla',
        name: 'Moong Dal Chilla',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥞',
        calories: 240,
        protein: 14.0,
        carbs: 30.0,
        fat: 7.0,
        sugar: 2.0,
        fiber: 6.0,
        description: 'A protein-rich lentil-based meal that provides fiber, plant protein, and steady-release carbohydrates.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'idli_sambar',
        name: 'Idli & Sambar',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥣',
        calories: 280,
        protein: 10.0,
        carbs: 48.0,
        fat: 5.0,
        sugar: 5.0,
        fiber: 6.0,
        description: 'Soft steamed idlis with lentil-based sambar provide carbohydrates, plant protein, and fiber without heavy frying.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'dosa_sambar',
        name: 'Dosa & Sambar',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🥞',
        calories: 320,
        protein: 9.0,
        carbs: 51.0,
        fat: 8.0,
        sugar: 4.0,
        fiber: 5.0,
        description: 'A fermented rice and lentil dosa paired with sambar provides energy, plant protein, and beneficial nutrients.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'poha',
        name: 'Vegetable Poha',
        category: 'healthy',
        group: 'Indian Meal',
        points: 10,
        icon: '🍚',
        calories: 250,
        protein: 6.0,
        carbs: 42.0,
        fat: 7.0,
        sugar: 3.0,
        fiber: 4.0,
        description: 'Flattened rice cooked with vegetables and peanuts provides carbohydrates, fiber, and healthy fats.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'sprouts_chaat',
        name: 'Sprouts Chaat',
        category: 'healthy',
        group: 'Healthy Meal',
        points: 10,
        icon: '🥗',
        calories: 220,
        protein: 11.0,
        carbs: 30.0,
        fat: 6.0,
        sugar: 5.0,
        fiber: 8.0,
        description: 'A fresh combination of sprouts, vegetables, and spices that provides plant protein, fiber, vitamins, and minerals.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'paneer_wrap',
        name: 'Paneer Wrap',
        category: 'healthy',
        group: 'Healthy Meal',
        points: 10,
        icon: '🌯',
        calories: 380,
        protein: 19.0,
        carbs: 42.0,
        fat: 15.0,
        sugar: 4.0,
        fiber: 6.0,
        description: 'A whole wheat wrap filled with paneer and vegetables provides protein, fiber, and satisfying complex carbohydrates.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },

    {
        id: 'chickpea_bowl',
        name: 'Chickpea Rice Bowl',
        category: 'healthy',
        group: 'Healthy Meal',
        points: 10,
        icon: '🥗',
        calories: 390,
        protein: 14.0,
        carbs: 60.0,
        fat: 9.0,
        sugar: 5.0,
        fiber: 10.0,
        description: 'Chickpeas, rice, and vegetables create a filling plant-based meal rich in protein, fiber, and complex carbohydrates.',
        badgeColor: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.4)'
    },


    // ============================================================
    // JUNK FOODS (+5 points)
    // ============================================================

    {
        id: 'cheeseburger',
        name: 'Cheeseburger',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍔',
        calories: 295,
        protein: 13.0,
        carbs: 30.0,
        fat: 14.0,
        sugar: 5.8,
        fiber: 1.5,
        description: 'A highly processed meal that can be high in saturated fat, sodium, and refined carbohydrates when eaten frequently.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'pizza',
        name: 'Pepperoni Pizza',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍕',
        calories: 285,
        protein: 12.2,
        carbs: 36.0,
        fat: 10.4,
        sugar: 3.8,
        fiber: 2.3,
        description: 'A popular fast food that can be high in sodium, saturated fat, refined carbohydrates, and processed meat.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'cheese_pizza',
        name: 'Cheese Burst Pizza',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍕',
        calories: 330,
        protein: 14.0,
        carbs: 38.0,
        fat: 15.0,
        sugar: 4.0,
        fiber: 2.0,
        description: 'Extra cheese increases the saturated fat and calorie content, making this a food best enjoyed occasionally.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'french_fries',
        name: 'French Fries',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍟',
        calories: 312,
        protein: 3.4,
        carbs: 41.4,
        fat: 15.0,
        sugar: 0.3,
        fiber: 3.8,
        description: 'Deep-fried potatoes are typically high in fat and sodium while providing relatively low nutritional value.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'fried_chicken',
        name: 'Fried Chicken',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍗',
        calories: 320,
        protein: 22.0,
        carbs: 16.0,
        fat: 20.0,
        sugar: 1.0,
        fiber: 1.0,
        description: 'Although chicken provides protein, deep frying adds significant fat and calories to the meal.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'fried_rice',
        name: 'Fried Rice',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍚',
        calories: 360,
        protein: 8.0,
        carbs: 48.0,
        fat: 14.0,
        sugar: 4.0,
        fiber: 2.0,
        description: 'Fried rice can contain large amounts of added oil and sodium, especially when prepared as fast food.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'schezwan_noodles',
        name: 'Schezwan Noodles',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍜',
        calories: 390,
        protein: 9.0,
        carbs: 56.0,
        fat: 14.0,
        sugar: 6.0,
        fiber: 3.0,
        description: 'A flavorful noodle dish that can be high in refined carbohydrates, sodium, and added oil.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'instant_noodles',
        name: 'Instant Noodles',
        category: 'junk',
        group: 'Processed Food',
        points: 5,
        icon: '🍜',
        calories: 380,
        protein: 8.0,
        carbs: 54.0,
        fat: 15.0,
        sugar: 3.0,
        fiber: 2.0,
        description: 'Convenient but often high in sodium and refined carbohydrates while providing limited fiber and micronutrients.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'chole_bhature',
        name: 'Chole Bhature',
        category: 'junk',
        group: 'Indian Fast Food',
        points: 5,
        icon: '🍛',
        calories: 520,
        protein: 14.0,
        carbs: 65.0,
        fat: 22.0,
        sugar: 5.0,
        fiber: 8.0,
        description: 'Chickpeas provide nutrients, but deep-fried bhature significantly increases the meal’s calories and fat.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'vada_pav',
        name: 'Vada Pav',
        category: 'junk',
        group: 'Indian Fast Food',
        points: 5,
        icon: '🍔',
        calories: 290,
        protein: 7.0,
        carbs: 38.0,
        fat: 12.0,
        sugar: 4.0,
        fiber: 4.0,
        description: 'A popular street food made with a fried potato patty and bread that can be high in refined carbohydrates and fat.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'samosa',
        name: 'Samosa',
        category: 'junk',
        group: 'Indian Fast Food',
        points: 5,
        icon: '🥟',
        calories: 260,
        protein: 5.0,
        carbs: 28.0,
        fat: 14.0,
        sugar: 2.0,
        fiber: 3.0,
        description: 'A deep-fried pastry that is high in fat and refined carbohydrates and is best enjoyed occasionally.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'pav_bhaji',
        name: 'Pav Bhaji',
        category: 'junk',
        group: 'Indian Fast Food',
        points: 5,
        icon: '🍛',
        calories: 410,
        protein: 9.0,
        carbs: 54.0,
        fat: 17.0,
        sugar: 7.0,
        fiber: 7.0,
        description: 'The vegetable bhaji can provide nutrients, but buttery pav and added fats make this meal calorie-dense.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'misal_pav',
        name: 'Misal Pav',
        category: 'junk',
        group: 'Indian Fast Food',
        points: 5,
        icon: '🥘',
        calories: 430,
        protein: 14.0,
        carbs: 52.0,
        fat: 18.0,
        sugar: 5.0,
        fiber: 8.0,
        description: 'The sprouts-based curry can provide protein and fiber, but oily toppings and pav can significantly increase calories.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'loaded_nachos',
        name: 'Loaded Nachos',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🌮',
        calories: 490,
        protein: 10.0,
        carbs: 48.0,
        fat: 29.0,
        sugar: 4.0,
        fiber: 5.0,
        description: 'Deeply processed chips combined with cheese and sauces can make this snack high in sodium, fat, and calories.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'cheese_pasta',
        name: 'Cheesy Pasta',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🍝',
        calories: 450,
        protein: 14.0,
        carbs: 55.0,
        fat: 19.0,
        sugar: 6.0,
        fiber: 3.0,
        description: 'Pasta with heavy cheese sauce can be high in refined carbohydrates, saturated fat, and calories.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'donut',
        name: 'Glazed Donut',
        category: 'junk',
        group: 'Dessert',
        points: 5,
        icon: '🍩',
        calories: 270,
        protein: 3.5,
        carbs: 31.0,
        fat: 15.0,
        sugar: 15.2,
        fiber: 0.8,
        description: 'A fried sweet treat containing refined carbohydrates and added sugar with limited nutritional value.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'chocolate_cake',
        name: 'Chocolate Cake',
        category: 'junk',
        group: 'Dessert',
        points: 5,
        icon: '🍰',
        calories: 371,
        protein: 4.9,
        carbs: 53.0,
        fat: 16.8,
        sugar: 38.0,
        fiber: 2.2,
        description: 'A calorie-dense dessert high in added sugar and fat that is best enjoyed as an occasional treat.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'ice_cream',
        name: 'Ice Cream',
        category: 'junk',
        group: 'Dessert',
        points: 5,
        icon: '🍨',
        calories: 207,
        protein: 3.5,
        carbs: 24.0,
        fat: 11.0,
        sugar: 21.0,
        fiber: 0.7,
        description: 'A sweet frozen dessert that can be high in added sugar and saturated fat.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'chocolate_bar',
        name: 'Chocolate Bar',
        category: 'junk',
        group: 'Confectionery',
        points: 5,
        icon: '🍫',
        calories: 230,
        protein: 3.0,
        carbs: 26.0,
        fat: 13.0,
        sugar: 22.0,
        fiber: 2.0,
        description: 'Chocolate bars often contain substantial amounts of added sugar and saturated fat in a small serving.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'potato_chips',
        name: 'Potato Chips',
        category: 'junk',
        group: 'Snacks',
        points: 5,
        icon: '🥔',
        calories: 152,
        protein: 2.0,
        carbs: 15.0,
        fat: 10.0,
        sugar: 0.2,
        fiber: 1.1,
        description: 'A fried and salty snack that is calorie-dense and easy to overeat while providing limited nutrients.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'cola',
        name: 'Cola Soda',
        category: 'junk',
        group: 'Beverage',
        points: 5,
        icon: '🥤',
        calories: 140,
        protein: 0.0,
        carbs: 39.0,
        fat: 0.0,
        sugar: 39.0,
        fiber: 0.0,
        description: 'A sugar-sweetened drink that provides calories and added sugar without significant protein, fiber, or micronutrients.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'milkshake',
        name: 'Chocolate Milkshake',
        category: 'junk',
        group: 'Beverage',
        points: 5,
        icon: '🥤',
        calories: 430,
        protein: 10.0,
        carbs: 60.0,
        fat: 16.0,
        sugar: 48.0,
        fiber: 2.0,
        description: 'A sweetened beverage that can contain large amounts of added sugar and calories, especially with syrups and toppings.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'hot_dog',
        name: 'Hot Dog',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🌭',
        calories: 290,
        protein: 10.0,
        carbs: 24.0,
        fat: 16.0,
        sugar: 4.0,
        fiber: 1.0,
        description: 'An ultra-processed meat-based food that can be high in sodium, saturated fat, and preservatives.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    },

    {
        id: 'fried_momos',
        name: 'Fried Momos',
        category: 'junk',
        group: 'Fast Food',
        points: 5,
        icon: '🥟',
        calories: 360,
        protein: 10.0,
        carbs: 42.0,
        fat: 17.0,
        sugar: 3.0,
        fiber: 2.0,
        description: 'Momos become significantly higher in fat and calories when deep-fried and served with rich sauces.',
        badgeColor: '#EF4444',
        glowColor: 'rgba(239, 68, 68, 0.4)'
    }

];


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getRandomFood() {
    const index = Math.floor(Math.random() * FOODS_DATABASE.length);
    return { ...FOODS_DATABASE[index] };
}

function getFoodById(id) {
    return FOODS_DATABASE.find(item => item.id === id);
}

function getFoodsByCategory(category) {
    return FOODS_DATABASE.filter(item => item.category === category);
}


// ============================================================
// NODE.JS EXPORT
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FOODS_DATABASE,
        getRandomFood,
        getFoodById,
        getFoodsByCategory
    };
}