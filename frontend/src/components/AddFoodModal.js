import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { foodDatabase } from '@/data/foodDatabase';
import { Search, Plus } from 'lucide-react';

export const AddFoodModal = ({ open, onOpenChange, onAdd, mealType }) => {
  const [search, setSearch] = useState('');
  const [selectedMealType, setSelectedMealType] = useState(mealType || 'breakfast');
  const [form, setForm] = useState({
    foodName: '', quantity: 1, calories: '', protein: '', carbs: '', fiber: '', fat: '',
  });

  const filtered = useMemo(() => {
    if (!search) return [];
    return foodDatabase
      .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 8);
  }, [search]);

  const selectFood = (food) => {
    setForm({
      foodName: food.name,
      quantity: 1,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fiber: food.fiber,
      fat: food.fat,
    });
    setSearch('');
  };

  const handleSubmit = () => {
    if (!form.foodName) return;
    onAdd(selectedMealType, {
      foodName: form.foodName,
      quantity: Number(form.quantity),
      calories: Number(form.calories) * Number(form.quantity),
      protein: Number(form.protein) * Number(form.quantity),
      carbs: Number(form.carbs) * Number(form.quantity),
      fiber: Number(form.fiber) * Number(form.quantity),
      fat: Number(form.fat) * Number(form.quantity),
    });
    setForm({ foodName: '', quantity: 1, calories: '', protein: '', carbs: '', fiber: '', fat: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="add-food-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl uppercase tracking-tight">Add Food</DialogTitle>
          <DialogDescription>Search for a food or enter details manually.</DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search food database..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11"
            data-testid="food-search-input"
          />
          {filtered.length > 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
              <ScrollArea className="max-h-48">
                {filtered.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => selectFood(food)}
                    className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors"
                    data-testid={`food-option-${food.id}`}
                  >
                    <span>{food.name}</span>
                    <span className="text-muted-foreground">{food.calories} cal</span>
                  </button>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Meal type */}
        <div>
          <Label>Meal Type</Label>
          <Select value={selectedMealType} onValueChange={setSelectedMealType}>
            <SelectTrigger data-testid="meal-type-select" className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Food Name</Label>
            <Input value={form.foodName} onChange={(e) => setForm({ ...form, foodName: e.target.value })} data-testid="food-name-input" className="h-11" />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} data-testid="food-quantity-input" className="h-11" />
          </div>
          <div>
            <Label>Calories</Label>
            <Input type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} data-testid="food-calories-input" className="h-11" />
          </div>
          <div>
            <Label>Protein (g)</Label>
            <Input type="number" value={form.protein} onChange={(e) => setForm({ ...form, protein: e.target.value })} data-testid="food-protein-input" className="h-11" />
          </div>
          <div>
            <Label>Carbs (g)</Label>
            <Input type="number" value={form.carbs} onChange={(e) => setForm({ ...form, carbs: e.target.value })} data-testid="food-carbs-input" className="h-11" />
          </div>
          <div>
            <Label>Fiber (g)</Label>
            <Input type="number" value={form.fiber} onChange={(e) => setForm({ ...form, fiber: e.target.value })} data-testid="food-fiber-input" className="h-11" />
          </div>
          <div>
            <Label>Fat (g)</Label>
            <Input type="number" value={form.fat} onChange={(e) => setForm({ ...form, fat: e.target.value })} data-testid="food-fat-input" className="h-11" />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full h-11 font-bold uppercase tracking-wider" data-testid="add-food-submit">
          <Plus className="h-4 w-4 mr-2" /> Add Food
        </Button>
      </DialogContent>
    </Dialog>
  );
};
