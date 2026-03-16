import { mealRecommendations } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, Sun, Moon as MoonIcon, Cookie, Plus, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const sectionConfig = {
  breakfast: { icon: Coffee, label: 'Breakfast Suggestions', color: 'text-amber-500' },
  lunch: { icon: Sun, label: 'Lunch Suggestions', color: 'text-emerald-500' },
  dinner: { icon: MoonIcon, label: 'Dinner Suggestions', color: 'text-blue-500' },
  snacks: { icon: Cookie, label: 'Snack Suggestions', color: 'text-violet-500' },
};

export default function MealRecommendations() {
  const { addMeal } = useApp();

  const handleAddToLog = (mealType, item) => {
    addMeal(mealType, {
      foodName: item.name,
      quantity: 1,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fiber: item.fiber,
      fat: 0,
    });
    toast.success(`Added ${item.name} to ${mealType}`);
  };

  return (
    <div className="space-y-8" data-testid="meal-recommendations-page">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Meal Ideas</h1>
        </div>
        <p className="text-muted-foreground mt-1">AI-powered meal suggestions based on your goals</p>
      </div>

      {Object.entries(mealRecommendations).map(([mealType, items]) => {
        const config = sectionConfig[mealType];
        const Icon = config.icon;
        return (
          <div key={mealType} className="space-y-4" data-testid={`recommendations-${mealType}`}>
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${config.color}`} />
              <h2 className="font-heading text-2xl font-bold tracking-tight uppercase">{config.label}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((item, idx) => (
                <Card key={idx} className="border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-5">
                    <h3 className="font-medium text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center p-2 rounded-md bg-muted/50">
                        <p className="font-mono text-xs text-muted-foreground">Calories</p>
                        <p className="font-heading text-lg font-bold text-blue-500">{item.calories}</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-muted/50">
                        <p className="font-mono text-xs text-muted-foreground">Protein</p>
                        <p className="font-heading text-lg font-bold text-emerald-500">{item.protein}g</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-muted/50">
                        <p className="font-mono text-xs text-muted-foreground">Carbs</p>
                        <p className="font-heading text-lg font-bold text-amber-500">{item.carbs}g</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-muted/50">
                        <p className="font-mono text-xs text-muted-foreground">Fiber</p>
                        <p className="font-heading text-lg font-bold text-violet-500">{item.fiber}g</p>
                      </div>
                    </div>
                    <Button
                      size="sm" variant="outline" className="w-full gap-1"
                      onClick={() => handleAddToLog(mealType, item)}
                      data-testid={`add-rec-${mealType}-${idx}`}
                    >
                      <Plus className="h-3.5 w-3.5" /> Add to Log
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
