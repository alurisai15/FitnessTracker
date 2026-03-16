import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext(null);

const genId = () => Math.random().toString(36).substring(2, 11);

/* Sample meals to pre-populate on login */
const sampleMeals = {
  breakfast: [
    { id: genId(), foodName: 'Greek Yogurt', quantity: 1, calories: 130, protein: 15, carbs: 8, fiber: 0, fat: 4 },
    { id: genId(), foodName: 'Banana', quantity: 1, calories: 105, protein: 1.3, carbs: 27, fiber: 3.1, fat: 0.4 },
  ],
  lunch: [
    { id: genId(), foodName: 'Grilled Chicken Breast', quantity: 1, calories: 165, protein: 31, carbs: 0, fiber: 0, fat: 3.6 },
    { id: genId(), foodName: 'Brown Rice', quantity: 1, calories: 216, protein: 5, carbs: 45, fiber: 3.5, fat: 1.8 },
    { id: genId(), foodName: 'Steamed Broccoli', quantity: 1, calories: 55, protein: 3.7, carbs: 11, fiber: 5.1, fat: 0.6 },
  ],
  dinner: [
    { id: genId(), foodName: 'Salmon Fillet', quantity: 1, calories: 208, protein: 20, carbs: 0, fiber: 0, fat: 13 },
    { id: genId(), foodName: 'Sweet Potato', quantity: 1, calories: 103, protein: 2.3, carbs: 24, fiber: 3.8, fat: 0.1 },
  ],
  snacks: [
    { id: genId(), foodName: 'Almonds', quantity: 1, calories: 164, protein: 6, carbs: 6, fiber: 3.5, fat: 14 },
  ],
};

const sampleExercises = [
  { id: genId(), name: 'Morning Run', duration: 30, caloriesBurned: 300 },
  { id: genId(), name: 'Weight Training', duration: 45, caloriesBurned: 250 },
];

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  exercises: [],
  dailyGoal: 2200,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        meals: sampleMeals,
        exercises: sampleExercises,
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'ADD_MEAL': {
      const { mealType, food } = action.payload;
      return {
        ...state,
        meals: {
          ...state.meals,
          [mealType]: [...state.meals[mealType], { ...food, id: genId() }],
        },
      };
    }
    case 'REMOVE_MEAL': {
      const { mealType: mt, id } = action.payload;
      return {
        ...state,
        meals: { ...state.meals, [mt]: state.meals[mt].filter((m) => m.id !== id) },
      };
    }
    case 'ADD_EXERCISE':
      return {
        ...state,
        exercises: [...state.exercises, { ...action.payload, id: genId() }],
      };
    case 'REMOVE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.filter((e) => e.id !== action.payload),
      };
    case 'SET_DAILY_GOAL':
      return { ...state, dailyGoal: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = useCallback((email) => {
    dispatch({ type: 'LOGIN', payload: { name: 'Alex Johnson', email, avatar: null } });
  }, []);

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), []);

  const setProfile = useCallback((profile) => {
    dispatch({ type: 'SET_PROFILE', payload: profile });
  }, []);

  const addMeal = useCallback((mealType, food) => {
    dispatch({ type: 'ADD_MEAL', payload: { mealType, food } });
  }, []);

  const removeMeal = useCallback((mealType, id) => {
    dispatch({ type: 'REMOVE_MEAL', payload: { mealType, id } });
  }, []);

  const addExercise = useCallback((exercise) => {
    dispatch({ type: 'ADD_EXERCISE', payload: exercise });
  }, []);

  const removeExercise = useCallback((id) => {
    dispatch({ type: 'REMOVE_EXERCISE', payload: id });
  }, []);

  /* Computed values from current state */
  const totalConsumed = Object.values(state.meals)
    .flat()
    .reduce((sum, m) => sum + (m.calories || 0), 0);

  const totalBurned = state.exercises.reduce((sum, e) => sum + (e.caloriesBurned || 0), 0);

  const totalMacros = Object.values(state.meals).flat().reduce(
    (acc, m) => ({
      protein: acc.protein + (m.protein || 0),
      carbs: acc.carbs + (m.carbs || 0),
      fiber: acc.fiber + (m.fiber || 0),
      fat: acc.fat + (m.fat || 0),
    }),
    { protein: 0, carbs: 0, fiber: 0, fat: 0 }
  );

  const value = {
    ...state,
    login,
    logout,
    setProfile,
    addMeal,
    removeMeal,
    addExercise,
    removeExercise,
    totalConsumed,
    totalBurned,
    totalMacros,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
