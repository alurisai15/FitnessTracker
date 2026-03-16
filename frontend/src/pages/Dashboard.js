import { useApp } from '@/context/AppContext';
import { macroTargets } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Utensils, Dumbbell, Target, Beef, Wheat, Leaf, Droplets } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CHART_COLORS = ['#10B981', '#F59E0B', '#2563EB', '#EF4444'];

export default function Dashboard() {
  const { dailyGoal, totalConsumed, totalBurned, totalMacros } = useApp();
  const remaining = Math.max(0, dailyGoal - totalConsumed + totalBurned);
  const progressPercent = Math.min(100, Math.round((totalConsumed / dailyGoal) * 100));

  const summaryCards = [
    { label: 'Daily Goal', value: dailyGoal, unit: 'cal', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Consumed', value: totalConsumed, unit: 'cal', icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Burned', value: totalBurned, unit: 'cal', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Remaining', value: remaining, unit: 'cal', icon: Dumbbell, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  ];

  const macroCards = [
    { label: 'Protein', current: totalMacros.protein, target: macroTargets.protein, icon: Beef, color: '#10B981' },
    { label: 'Carbs', current: totalMacros.carbs, target: macroTargets.carbs, icon: Wheat, color: '#F59E0B' },
    { label: 'Fiber', current: totalMacros.fiber, target: macroTargets.fiber, icon: Leaf, color: '#2563EB' },
    { label: 'Fat', current: totalMacros.fat, target: macroTargets.fat, icon: Droplets, color: '#EF4444' },
  ];

  const pieData = [
    { name: 'Protein', value: totalMacros.protein || 1 },
    { name: 'Carbs', value: totalMacros.carbs || 1 },
    { name: 'Fiber', value: totalMacros.fiber || 1 },
    { name: 'Fat', value: totalMacros.fat || 1 },
  ];

  return (
    <div className="space-y-8" data-testid="dashboard-page">
      {/* Page heading */}
      <div>
        <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your daily nutrition overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="summary-cards">
        {summaryCards.map((card) => (
          <Card key={card.label} className="animate-fade-in-up border-border hover:border-primary/30 transition-colors duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-md ${card.bg}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>
              <p className="font-heading text-3xl font-bold tracking-tight" data-testid={`summary-${card.label.toLowerCase().replace(/\s/g, '-')}`}>
                {Math.round(card.value).toLocaleString()}
              </p>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{card.unit}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calorie progress bar */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Daily Calorie Progress</span>
            <span className="font-mono text-sm font-medium" data-testid="calorie-progress-percent">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-3" data-testid="calorie-progress-bar" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0 cal</span>
            <span>{dailyGoal.toLocaleString()} cal</span>
          </div>
        </CardContent>
      </Card>

      {/* Macros + Pie chart grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pie chart */}
        <Card className="lg:col-span-5 border-border" data-testid="macro-pie-chart-card">
          <CardHeader>
            <CardTitle className="font-heading text-xl uppercase tracking-tight">Macronutrients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Macro cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="macro-cards">
          {macroCards.map((macro) => {
            const pct = Math.min(100, Math.round((macro.current / macro.target) * 100));
            return (
              <Card key={macro.label} className="border-border hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: `${macro.color}15` }}>
                      <macro.icon className="h-4 w-4" style={{ color: macro.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{macro.label}</p>
                      <p className="text-xs text-muted-foreground">{macro.target}g target</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="font-heading text-2xl font-bold" data-testid={`macro-${macro.label.toLowerCase()}`}>
                      {Math.round(macro.current)}g
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: macro.color }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
