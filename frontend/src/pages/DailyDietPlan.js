import { useState, useMemo } from 'react';
import { dietPlanTemplates } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Coffee, Sun, Moon as MoonIcon, Cookie, CalendarDays } from 'lucide-react';

const mealConfig = {
  breakfast: { icon: Coffee, label: 'Breakfast', color: 'text-amber-500' },
  lunch: { icon: Sun, label: 'Lunch', color: 'text-emerald-500' },
  dinner: { icon: MoonIcon, label: 'Dinner', color: 'text-blue-500' },
  snacks: { icon: Cookie, label: 'Snacks', color: 'text-violet-500' },
};

export default function DailyDietPlan() {
  const [planIndex, setPlanIndex] = useState(0);
  const plan = dietPlanTemplates[planIndex];

  const generateNew = () => {
    setPlanIndex((prev) => (prev + 1) % dietPlanTemplates.length);
  };

  const totalNutrition = useMemo(() => {
    const all = ['breakfast', 'lunch', 'dinner', 'snacks'].flatMap((key) => plan[key].items);
    return all.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fiber: acc.fiber + item.fiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fiber: 0 }
    );
  }, [plan]);

  return (
    <div className="space-y-8" data-testid="diet-plan-page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Daily Diet Plan</h1>
          </div>
          <p className="text-muted-foreground mt-1">Your personalized meal plan for the day</p>
        </div>
        <Button onClick={generateNew} className="h-11 font-bold uppercase tracking-wider gap-2" data-testid="generate-plan-button">
          <RefreshCw className="h-4 w-4" /> Generate New Plan
        </Button>
      </div>

      {/* Total summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" data-testid="plan-totals">
        {[
          { label: 'Total Calories', value: totalNutrition.calories, unit: 'cal', color: 'text-blue-500' },
          { label: 'Total Protein', value: totalNutrition.protein, unit: 'g', color: 'text-emerald-500' },
          { label: 'Total Carbs', value: totalNutrition.carbs, unit: 'g', color: 'text-amber-500' },
          { label: 'Total Fiber', value: totalNutrition.fiber, unit: 'g', color: 'text-violet-500' },
        ].map((t) => (
          <Card key={t.label} className="border-border">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.label}</p>
              <p className={`font-heading text-xl font-bold ${t.color}`}>
                {Math.round(t.value)}<span className="text-xs text-muted-foreground ml-1">{t.unit}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meal sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(mealConfig).map(([key, config]) => {
          const Icon = config.icon;
          const meal = plan[key];
          const mealTotals = meal.items.reduce(
            (acc, i) => ({ calories: acc.calories + i.calories, protein: acc.protein + i.protein, carbs: acc.carbs + i.carbs, fiber: acc.fiber + i.fiber }),
            { calories: 0, protein: 0, carbs: 0, fiber: 0 }
          );

          return (
            <Card key={key} className="border-border" data-testid={`plan-${key}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <CardTitle className="font-heading text-xl uppercase tracking-tight">{config.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {meal.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span>{item.calories} cal</span>
                      <span className="hidden sm:inline">{item.protein}g P</span>
                      <span className="hidden sm:inline">{item.carbs}g C</span>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm font-medium">
                  <span>Meal Total</span>
                  <div className="flex gap-3 font-mono text-xs">
                    <span className="text-blue-500">{Math.round(mealTotals.calories)} cal</span>
                    <span className="text-emerald-500">{Math.round(mealTotals.protein)}g P</span>
                    <span className="text-amber-500">{Math.round(mealTotals.carbs)}g C</span>
                    <span className="text-violet-500">{Math.round(mealTotals.fiber)}g F</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
