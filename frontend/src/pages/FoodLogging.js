import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { AddFoodModal } from '@/components/AddFoodModal';
import { Plus, Trash2, Coffee, Sun, Moon as MoonIcon, Cookie } from 'lucide-react';
import { toast } from 'sonner';

const mealIcons = { breakfast: Coffee, lunch: Sun, dinner: MoonIcon, snacks: Cookie };
const mealLabels = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snacks: 'Snacks' };

export default function FoodLogging() {
  const { meals, addMeal, removeMeal } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState('breakfast');

  const handleAdd = (mealType, food) => {
    addMeal(mealType, food);
    toast.success(`Added ${food.foodName} to ${mealLabels[mealType]}`);
  };

  const handleRemove = (mealType, id, name) => {
    removeMeal(mealType, id);
    toast.info(`Removed ${name}`);
  };

  const allMeals = Object.values(meals).flat();
  const dailyTotals = allMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + (m.calories || 0),
      protein: acc.protein + (m.protein || 0),
      carbs: acc.carbs + (m.carbs || 0),
      fiber: acc.fiber + (m.fiber || 0),
      fat: acc.fat + (m.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 }
  );

  return (
    <div className="space-y-8" data-testid="food-logging-page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Food Log</h1>
          <p className="text-muted-foreground mt-1">Track your daily meals and nutrition</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="h-11 font-bold uppercase tracking-wider gap-2" data-testid="add-food-button">
          <Plus className="h-4 w-4" /> Add Food
        </Button>
      </div>

      {/* Daily totals */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" data-testid="daily-totals">
        {[
          { label: 'Calories', value: dailyTotals.calories, unit: 'cal', color: 'text-blue-500' },
          { label: 'Protein', value: dailyTotals.protein, unit: 'g', color: 'text-emerald-500' },
          { label: 'Carbs', value: dailyTotals.carbs, unit: 'g', color: 'text-amber-500' },
          { label: 'Fiber', value: dailyTotals.fiber, unit: 'g', color: 'text-blue-400' },
          { label: 'Fat', value: dailyTotals.fat, unit: 'g', color: 'text-red-500' },
        ].map((t) => (
          <Card key={t.label} className="border-border">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.label}</p>
              <p className={`font-heading text-xl font-bold ${t.color}`}>{Math.round(t.value)}<span className="text-xs text-muted-foreground ml-1">{t.unit}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meal tabs */}
      <Tabs value={activeMeal} onValueChange={setActiveMeal} data-testid="meal-tabs">
        <TabsList className="grid w-full grid-cols-4 h-11">
          {Object.entries(mealLabels).map(([key, label]) => {
            const Icon = mealIcons[key];
            return (
              <TabsTrigger key={key} value={key} className="gap-2 text-xs sm:text-sm" data-testid={`tab-${key}`}>
                <Icon className="h-3.5 w-3.5 hidden sm:block" /> {label}
                <Badge variant="secondary" className="ml-1 text-xs h-5 px-1.5">{meals[key].length}</Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(meals).map(([mealType, items]) => {
          const mealTotal = items.reduce(
            (acc, m) => ({
              calories: acc.calories + (m.calories || 0),
              protein: acc.protein + (m.protein || 0),
              carbs: acc.carbs + (m.carbs || 0),
              fiber: acc.fiber + (m.fiber || 0),
              fat: acc.fat + (m.fat || 0),
            }),
            { calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 }
          );

          return (
            <TabsContent key={mealType} value={mealType}>
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="font-heading text-lg uppercase tracking-tight">{mealLabels[mealType]}</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => { setActiveMeal(mealType); setModalOpen(true); }} data-testid={`add-${mealType}-button`}>
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8" data-testid={`empty-${mealType}`}>No food items logged yet</p>
                  ) : (
                    <Table data-testid={`table-${mealType}`}>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Food</TableHead>
                          <TableHead className="text-right">Cal</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">Protein</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">Carbs</TableHead>
                          <TableHead className="text-right hidden md:table-cell">Fiber</TableHead>
                          <TableHead className="text-right hidden md:table-cell">Fat</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.foodName}</TableCell>
                            <TableCell className="text-right font-mono text-sm">{Math.round(item.calories)}</TableCell>
                            <TableCell className="text-right font-mono text-sm hidden sm:table-cell">{Math.round(item.protein)}g</TableCell>
                            <TableCell className="text-right font-mono text-sm hidden sm:table-cell">{Math.round(item.carbs)}g</TableCell>
                            <TableCell className="text-right font-mono text-sm hidden md:table-cell">{Math.round(item.fiber)}g</TableCell>
                            <TableCell className="text-right font-mono text-sm hidden md:table-cell">{Math.round(item.fat)}g</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost" size="icon"
                                onClick={() => handleRemove(mealType, item.id, item.foodName)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                data-testid={`remove-${item.id}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* Total row */}
                        <TableRow className="border-t-2 font-bold">
                          <TableCell>Total</TableCell>
                          <TableCell className="text-right font-mono">{Math.round(mealTotal.calories)}</TableCell>
                          <TableCell className="text-right font-mono hidden sm:table-cell">{Math.round(mealTotal.protein)}g</TableCell>
                          <TableCell className="text-right font-mono hidden sm:table-cell">{Math.round(mealTotal.carbs)}g</TableCell>
                          <TableCell className="text-right font-mono hidden md:table-cell">{Math.round(mealTotal.fiber)}g</TableCell>
                          <TableCell className="text-right font-mono hidden md:table-cell">{Math.round(mealTotal.fat)}g</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      <AddFoodModal open={modalOpen} onOpenChange={setModalOpen} onAdd={handleAdd} mealType={activeMeal} />
    </div>
  );
}
