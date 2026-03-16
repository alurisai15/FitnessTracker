import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AppProvider, useApp } from '@/context/AppContext';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ProfileSetup from '@/pages/ProfileSetup';
import Dashboard from '@/pages/Dashboard';
import FoodLogging from '@/pages/FoodLogging';
import NutritionDatabase from '@/pages/NutritionDatabase';
import ExerciseTracking from '@/pages/ExerciseTracking';
import MealRecommendations from '@/pages/MealRecommendations';
import DailyDietPlan from '@/pages/DailyDietPlan';
import ProgressTracking from '@/pages/ProgressTracking';
import '@/App.css';

/* Redirect to login if unauthenticated */
function AuthGuard({ children }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

/* Redirect authenticated users away from auth pages */
function GuestGuard({ children }) {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
      <Route path="/signup" element={<GuestGuard><Signup /></GuestGuard>} />

      {/* Protected profile setup (standalone page, no sidebar) */}
      <Route path="/profile-setup" element={<AuthGuard><ProfileSetup /></AuthGuard>} />

      {/* Protected routes with Layout (sidebar + navbar) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food-logging" element={<FoodLogging />} />
        <Route path="/nutrition-database" element={<NutritionDatabase />} />
        <Route path="/exercise-tracking" element={<ExerciseTracking />} />
        <Route path="/meal-recommendations" element={<MealRecommendations />} />
        <Route path="/diet-plan" element={<DailyDietPlan />} />
        <Route path="/progress" element={<ProgressTracking />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AppProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
