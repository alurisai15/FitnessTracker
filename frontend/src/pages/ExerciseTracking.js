import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { exerciseTemplates } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Plus, Trash2, Flame, Clock, Dumbbell } from 'lucide-react';
import { toast } from 'sonner';

export default function ExerciseTracking() {
  const { exercises, addExercise, removeExercise, totalBurned } = useApp();
  const [form, setForm] = useState({ name: '', duration: '', caloriesBurned: '' });

  const handleTemplateSelect = (name) => {
    const template = exerciseTemplates.find((t) => t.name === name);
    if (template) {
      setForm({ name: template.name, duration: '30', caloriesBurned: String(template.caloriesPerMin * 30) });
    }
  };

  const handleDurationChange = (dur) => {
    const template = exerciseTemplates.find((t) => t.name === form.name);
    setForm({
      ...form,
      duration: dur,
      caloriesBurned: template ? String(template.caloriesPerMin * Number(dur)) : form.caloriesBurned,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.duration || !form.caloriesBurned) {
      toast.error('Please fill in all fields');
      return;
    }
    addExercise({ name: form.name, duration: Number(form.duration), caloriesBurned: Number(form.caloriesBurned) });
    toast.success(`Added ${form.name}`);
    setForm({ name: '', duration: '', caloriesBurned: '' });
  };

  const totalDuration = exercises.reduce((sum, e) => sum + (e.duration || 0), 0);

  return (
    <div className="space-y-8" data-testid="exercise-tracking-page">
      <div>
        <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Exercise Tracking</h1>
        <p className="text-muted-foreground mt-1">Log your workouts and track calories burned</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Exercises', value: exercises.length, icon: Dumbbell, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Total Duration', value: `${totalDuration} min`, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Calories Burned', value: `${Math.round(totalBurned)} cal`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((s) => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-md ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="font-heading text-xl font-bold" data-testid={`exercise-${s.label.toLowerCase().replace(/\s/g, '-')}`}>{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add exercise form */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading text-xl uppercase tracking-tight">Log Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label>Exercise</Label>
              <Select value={form.name} onValueChange={handleTemplateSelect}>
                <SelectTrigger className="h-11" data-testid="exercise-name-select">
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  {exerciseTemplates.map((t) => (
                    <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (min)</Label>
              <Input type="number" min="1" value={form.duration} onChange={(e) => handleDurationChange(e.target.value)} className="h-11" data-testid="exercise-duration-input" />
            </div>
            <div className="space-y-2">
              <Label>Calories Burned</Label>
              <Input type="number" value={form.caloriesBurned} onChange={(e) => setForm({ ...form, caloriesBurned: e.target.value })} className="h-11" data-testid="exercise-calories-input" />
            </div>
            <Button type="submit" className="h-11 font-bold uppercase tracking-wider gap-2" data-testid="add-exercise-button">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Exercise list */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading text-xl uppercase tracking-tight">Today's Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          {exercises.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8" data-testid="empty-exercises">No exercises logged yet</p>
          ) : (
            <Table data-testid="exercise-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead className="text-right">Calories Burned</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercises.map((ex) => (
                  <TableRow key={ex.id}>
                    <TableCell className="font-medium">{ex.name}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{ex.duration} min</TableCell>
                    <TableCell className="text-right font-mono text-sm">{ex.caloriesBurned} cal</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => { removeExercise(ex.id); toast.info(`Removed ${ex.name}`); }}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        data-testid={`remove-exercise-${ex.id}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right font-mono">{totalDuration} min</TableCell>
                  <TableCell className="text-right font-mono">{Math.round(totalBurned)} cal</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
