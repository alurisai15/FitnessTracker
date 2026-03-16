import { useState, useMemo } from 'react';
import { foodDatabase, foodCategories } from '@/data/foodDatabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function NutritionDatabase() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [customFoods, setCustomFoods] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customForm, setCustomForm] = useState({ name: '', calories: '', protein: '', carbs: '', fiber: '', fat: '', category: 'snacks', serving: '1 serving' });

  const allFoods = useMemo(() => [...foodDatabase, ...customFoods], [customFoods]);

  const filtered = useMemo(() => {
    return allFoods.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'all' || f.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [allFoods, search, activeCategory]);

  const handleAddCustom = () => {
    if (!customForm.name || !customForm.calories) {
      toast.error('Name and calories are required');
      return;
    }
    const newFood = {
      id: `custom-${Date.now()}`,
      name: customForm.name,
      calories: Number(customForm.calories),
      protein: Number(customForm.protein) || 0,
      carbs: Number(customForm.carbs) || 0,
      fiber: Number(customForm.fiber) || 0,
      fat: Number(customForm.fat) || 0,
      category: customForm.category,
      serving: customForm.serving,
    };
    setCustomFoods((prev) => [...prev, newFood]);
    setCustomForm({ name: '', calories: '', protein: '', carbs: '', fiber: '', fat: '', category: 'snacks', serving: '1 serving' });
    setModalOpen(false);
    toast.success(`${newFood.name} added to database`);
  };

  return (
    <div className="space-y-8" data-testid="nutrition-database-page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Nutrition Database</h1>
          <p className="text-muted-foreground mt-1">{allFoods.length} foods available</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="h-11 font-bold uppercase tracking-wider gap-2" data-testid="add-custom-food-button">
          <Plus className="h-4 w-4" /> Add Custom Food
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search foods..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" data-testid="nutrition-search-input" />
        </div>
        <div className="flex flex-wrap gap-2" data-testid="category-filters">
          {foodCategories.map((cat) => (
            <Badge
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'secondary'}
              className="cursor-pointer px-3 py-1 text-xs transition-colors"
              onClick={() => setActiveCategory(cat.id)}
              data-testid={`filter-${cat.id}`}
            >
              {cat.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Food table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <Table data-testid="nutrition-table">
            <TableHeader>
              <TableRow>
                <TableHead>Food Name</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Protein</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Carbs</TableHead>
                <TableHead className="text-right hidden md:table-cell">Fiber</TableHead>
                <TableHead className="text-right hidden md:table-cell">Fat</TableHead>
                <TableHead className="text-right hidden lg:table-cell">Serving</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No foods found</TableCell>
                </TableRow>
              ) : (
                filtered.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell className="font-medium">
                      {food.name}
                      {food.id.startsWith('custom') && <Badge variant="outline" className="ml-2 text-[10px]">Custom</Badge>}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">{food.calories}</TableCell>
                    <TableCell className="text-right font-mono text-sm hidden sm:table-cell">{food.protein}g</TableCell>
                    <TableCell className="text-right font-mono text-sm hidden sm:table-cell">{food.carbs}g</TableCell>
                    <TableCell className="text-right font-mono text-sm hidden md:table-cell">{food.fiber}g</TableCell>
                    <TableCell className="text-right font-mono text-sm hidden md:table-cell">{food.fat}g</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground hidden lg:table-cell">{food.serving}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Custom Food Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md" data-testid="custom-food-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl uppercase tracking-tight">Add Custom Food</DialogTitle>
            <DialogDescription>Enter nutritional information for your custom food.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label>Food Name</Label>
              <Input value={customForm.name} onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })} className="h-11" data-testid="custom-food-name" />
            </div>
            <div>
              <Label>Calories</Label>
              <Input type="number" value={customForm.calories} onChange={(e) => setCustomForm({ ...customForm, calories: e.target.value })} className="h-11" data-testid="custom-food-calories" />
            </div>
            <div>
              <Label>Protein (g)</Label>
              <Input type="number" value={customForm.protein} onChange={(e) => setCustomForm({ ...customForm, protein: e.target.value })} className="h-11" data-testid="custom-food-protein" />
            </div>
            <div>
              <Label>Carbs (g)</Label>
              <Input type="number" value={customForm.carbs} onChange={(e) => setCustomForm({ ...customForm, carbs: e.target.value })} className="h-11" data-testid="custom-food-carbs" />
            </div>
            <div>
              <Label>Fiber (g)</Label>
              <Input type="number" value={customForm.fiber} onChange={(e) => setCustomForm({ ...customForm, fiber: e.target.value })} className="h-11" data-testid="custom-food-fiber" />
            </div>
            <div>
              <Label>Fat (g)</Label>
              <Input type="number" value={customForm.fat} onChange={(e) => setCustomForm({ ...customForm, fat: e.target.value })} className="h-11" data-testid="custom-food-fat" />
            </div>
            <div>
              <Label>Serving</Label>
              <Input value={customForm.serving} onChange={(e) => setCustomForm({ ...customForm, serving: e.target.value })} className="h-11" data-testid="custom-food-serving" />
            </div>
          </div>
          <Button onClick={handleAddCustom} className="w-full h-11 font-bold uppercase tracking-wider" data-testid="custom-food-submit">
            <Plus className="h-4 w-4 mr-2" /> Add Food
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
