/* Mock data for charts, recommendations, and diet plans */

export const macroTargets = {
  protein: 150,
  carbs: 250,
  fiber: 30,
  fat: 70,
};

export const weeklyProgress = [
  { day: 'Mon', weight: 75.2, consumed: 2100, burned: 350, protein: 140, carbs: 230, fiber: 25 },
  { day: 'Tue', weight: 75.0, consumed: 1950, burned: 400, protein: 155, carbs: 210, fiber: 28 },
  { day: 'Wed', weight: 74.8, consumed: 2200, burned: 300, protein: 130, carbs: 260, fiber: 22 },
  { day: 'Thu', weight: 74.9, consumed: 2050, burned: 450, protein: 160, carbs: 225, fiber: 30 },
  { day: 'Fri', weight: 74.6, consumed: 1900, burned: 380, protein: 145, carbs: 200, fiber: 26 },
  { day: 'Sat', weight: 74.5, consumed: 2300, burned: 250, protein: 120, carbs: 280, fiber: 20 },
  { day: 'Sun', weight: 74.7, consumed: 2150, burned: 320, protein: 148, carbs: 240, fiber: 27 },
];

export const monthlyProgress = [
  { day: 'Jan 1', weight: 77.0, consumed: 2200, burned: 300, protein: 130, carbs: 260, fiber: 22 },
  { day: 'Jan 5', weight: 76.5, consumed: 2100, burned: 350, protein: 140, carbs: 240, fiber: 25 },
  { day: 'Jan 10', weight: 76.2, consumed: 2000, burned: 380, protein: 150, carbs: 220, fiber: 27 },
  { day: 'Jan 15', weight: 75.8, consumed: 1950, burned: 400, protein: 155, carbs: 210, fiber: 28 },
  { day: 'Jan 20', weight: 75.5, consumed: 2050, burned: 370, protein: 148, carbs: 230, fiber: 26 },
  { day: 'Jan 25', weight: 75.2, consumed: 1900, burned: 420, protein: 160, carbs: 200, fiber: 30 },
  { day: 'Jan 30', weight: 74.8, consumed: 2100, burned: 350, protein: 145, carbs: 235, fiber: 27 },
  { day: 'Feb 4', weight: 74.6, consumed: 2000, burned: 390, protein: 152, carbs: 218, fiber: 29 },
];

export const mealRecommendations = {
  breakfast: [
    { name: 'Oatmeal with Berries & Honey', calories: 350, protein: 12, carbs: 55, fiber: 8 },
    { name: 'Avocado Toast with Egg', calories: 380, protein: 15, carbs: 30, fiber: 7 },
    { name: 'Greek Yogurt Parfait', calories: 290, protein: 18, carbs: 35, fiber: 4 },
    { name: 'Spinach & Feta Omelette', calories: 320, protein: 22, carbs: 5, fiber: 2 },
  ],
  lunch: [
    { name: 'Grilled Chicken Salad', calories: 420, protein: 35, carbs: 20, fiber: 6 },
    { name: 'Quinoa Buddha Bowl', calories: 480, protein: 18, carbs: 58, fiber: 12 },
    { name: 'Turkey & Avocado Wrap', calories: 450, protein: 28, carbs: 35, fiber: 8 },
    { name: 'Lentil Soup with Bread', calories: 390, protein: 20, carbs: 52, fiber: 14 },
  ],
  dinner: [
    { name: 'Baked Salmon with Veggies', calories: 480, protein: 35, carbs: 18, fiber: 5 },
    { name: 'Lean Beef Stir-Fry', calories: 520, protein: 32, carbs: 40, fiber: 6 },
    { name: 'Grilled Tofu with Rice', calories: 410, protein: 22, carbs: 52, fiber: 4 },
    { name: 'Shrimp Pasta Primavera', calories: 460, protein: 28, carbs: 48, fiber: 5 },
  ],
  snacks: [
    { name: 'Protein Smoothie', calories: 200, protein: 25, carbs: 15, fiber: 3 },
    { name: 'Mixed Nuts & Dried Fruit', calories: 180, protein: 5, carbs: 18, fiber: 3 },
    { name: 'Hummus with Veggies', calories: 150, protein: 6, carbs: 14, fiber: 5 },
    { name: 'Apple & Peanut Butter', calories: 220, protein: 7, carbs: 28, fiber: 5 },
  ],
};

export const dietPlanTemplates = [
  {
    id: 1,
    breakfast: {
      items: [
        { name: 'Oatmeal', calories: 154, protein: 5, carbs: 27, fiber: 4 },
        { name: 'Blueberries', calories: 85, protein: 1.1, carbs: 21, fiber: 3.6 },
        { name: 'Whey Protein Shake', calories: 120, protein: 24, carbs: 3, fiber: 1 },
      ],
    },
    lunch: {
      items: [
        { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fiber: 0 },
        { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fiber: 3.5 },
        { name: 'Steamed Broccoli', calories: 55, protein: 3.7, carbs: 11, fiber: 5.1 },
      ],
    },
    dinner: {
      items: [
        { name: 'Salmon Fillet', calories: 208, protein: 20, carbs: 0, fiber: 0 },
        { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fiber: 5 },
        { name: 'Asparagus', calories: 27, protein: 2.9, carbs: 5.2, fiber: 2.8 },
      ],
    },
    snacks: {
      items: [
        { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fiber: 3.5 },
        { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fiber: 4.4 },
      ],
    },
  },
  {
    id: 2,
    breakfast: {
      items: [
        { name: 'Avocado Toast', calories: 250, protein: 6, carbs: 20, fiber: 7 },
        { name: 'Scrambled Eggs (2)', calories: 156, protein: 12, carbs: 1.2, fiber: 0 },
        { name: 'Orange Juice', calories: 112, protein: 1.7, carbs: 26, fiber: 0.5 },
      ],
    },
    lunch: {
      items: [
        { name: 'Turkey Breast', calories: 135, protein: 30, carbs: 0, fiber: 0 },
        { name: 'Sweet Potato', calories: 103, protein: 2.3, carbs: 24, fiber: 3.8 },
        { name: 'Spinach Salad', calories: 40, protein: 3, carbs: 4, fiber: 2 },
      ],
    },
    dinner: {
      items: [
        { name: 'Lean Beef', calories: 250, protein: 26, carbs: 0, fiber: 0 },
        { name: 'Basmati Rice', calories: 210, protein: 4.4, carbs: 46, fiber: 0.6 },
        { name: 'Bell Pepper Stir-Fry', calories: 80, protein: 2, carbs: 12, fiber: 3 },
      ],
    },
    snacks: {
      items: [
        { name: 'Greek Yogurt', calories: 130, protein: 15, carbs: 8, fiber: 0 },
        { name: 'Dark Chocolate', calories: 170, protein: 2.2, carbs: 13, fiber: 3.1 },
      ],
    },
  },
  {
    id: 3,
    breakfast: {
      items: [
        { name: 'Granola with Milk', calories: 350, protein: 12, carbs: 42, fiber: 3 },
        { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fiber: 3.1 },
      ],
    },
    lunch: {
      items: [
        { name: 'Chickpea Curry', calories: 320, protein: 16, carbs: 42, fiber: 10 },
        { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fiber: 3.5 },
        { name: 'Cucumber Raita', calories: 60, protein: 3, carbs: 5, fiber: 0.5 },
      ],
    },
    dinner: {
      items: [
        { name: 'Baked Tofu', calories: 150, protein: 16, carbs: 4, fiber: 1 },
        { name: 'Stir-Fried Veggies', calories: 120, protein: 4, carbs: 16, fiber: 5 },
        { name: 'Whole Wheat Noodles', calories: 190, protein: 7, carbs: 38, fiber: 4 },
      ],
    },
    snacks: {
      items: [
        { name: 'Trail Mix', calories: 137, protein: 3.5, carbs: 13, fiber: 1.5 },
        { name: 'Protein Bar', calories: 220, protein: 20, carbs: 25, fiber: 3 },
      ],
    },
  },
];

export const exerciseTemplates = [
  { name: 'Running', caloriesPerMin: 10 },
  { name: 'Walking', caloriesPerMin: 4 },
  { name: 'Cycling', caloriesPerMin: 8 },
  { name: 'Swimming', caloriesPerMin: 9 },
  { name: 'Weight Training', caloriesPerMin: 6 },
  { name: 'Yoga', caloriesPerMin: 3 },
  { name: 'HIIT', caloriesPerMin: 12 },
  { name: 'Jump Rope', caloriesPerMin: 11 },
  { name: 'Rowing', caloriesPerMin: 7 },
  { name: 'Stretching', caloriesPerMin: 2 },
];
