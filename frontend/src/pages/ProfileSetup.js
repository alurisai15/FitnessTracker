import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileSetup() {
  const { setProfile } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    height: '', weight: '', age: '', gender: '', goal: '', activityLevel: '', dietaryPreference: '',
  });

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.height || !form.weight || !form.age || !form.gender || !form.goal || !form.activityLevel || !form.dietaryPreference) {
      toast.error('Please fill in all fields');
      return;
    }
    setProfile({
      height: Number(form.height),
      weight: Number(form.weight),
      age: Number(form.age),
      gender: form.gender,
      goal: form.goal,
      activityLevel: form.activityLevel,
      dietaryPreference: form.dietaryPreference,
    });
    toast.success('Profile saved!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6" data-testid="profile-setup-page">
      <Card className="w-full max-w-2xl border-border">
        <CardHeader className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-3xl font-bold tracking-tight uppercase">FitTrack</span>
          </div>
          <CardTitle className="font-heading text-2xl uppercase tracking-tight">Setup Your Profile</CardTitle>
          <CardDescription>Tell us about yourself so we can personalize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Body metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input type="number" placeholder="175" value={form.height} onChange={(e) => update('height', e.target.value)} className="h-12" data-testid="profile-height-input" />
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" placeholder="75" value={form.weight} onChange={(e) => update('weight', e.target.value)} className="h-12" data-testid="profile-weight-input" />
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" placeholder="28" value={form.age} onChange={(e) => update('age', e.target.value)} className="h-12" data-testid="profile-age-input" />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup value={form.gender} onValueChange={(v) => update('gender', v)} className="flex gap-6" data-testid="profile-gender-radio">
                {['male', 'female', 'other'].map((g) => (
                  <div key={g} className="flex items-center gap-2">
                    <RadioGroupItem value={g} id={`gender-${g}`} />
                    <Label htmlFor={`gender-${g}`} className="capitalize cursor-pointer">{g}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Fitness Goal */}
            <div className="space-y-2">
              <Label>Fitness Goal</Label>
              <Select value={form.goal} onValueChange={(v) => update('goal', v)}>
                <SelectTrigger className="h-12" data-testid="profile-goal-select">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Muscle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={form.activityLevel} onValueChange={(v) => update('activityLevel', v)}>
                <SelectTrigger className="h-12" data-testid="profile-activity-select">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (intense daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-2">
              <Label>Dietary Preference</Label>
              <Select value={form.dietaryPreference} onValueChange={(v) => update('dietaryPreference', v)}>
                <SelectTrigger className="h-12" data-testid="profile-diet-select">
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-12 font-bold uppercase tracking-wider" data-testid="profile-submit-button">
              Save Profile & Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
