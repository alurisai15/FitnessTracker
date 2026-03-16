import { useState } from 'react';
import { weeklyProgress, monthlyProgress } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const chartTooltipStyle = {
  contentStyle: { background: 'hsl(0 0% 7.1%)', border: '1px solid hsl(240 4% 16%)', borderRadius: '8px', color: '#fafafa' },
  labelStyle: { color: '#fafafa' },
};

export default function ProgressTracking() {
  const [period, setPeriod] = useState('weekly');
  const data = period === 'weekly' ? weeklyProgress : monthlyProgress;

  return (
    <div className="space-y-8" data-testid="progress-tracking-page">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tighter uppercase">Progress</h1>
        </div>
        <p className="text-muted-foreground mt-1">Track your fitness journey over time</p>
      </div>

      {/* Period toggle */}
      <Tabs value={period} onValueChange={setPeriod} data-testid="period-tabs">
        <TabsList className="h-10">
          <TabsTrigger value="weekly" data-testid="tab-weekly" className="px-6">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" data-testid="tab-monthly" className="px-6">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="space-y-6 mt-6">
          {/* Weight Progress */}
          <Card className="border-border" data-testid="weight-chart-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl uppercase tracking-tight">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 16%)" />
                    <XAxis dataKey="day" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <Tooltip {...chartTooltipStyle} />
                    <Line type="monotone" dataKey="weight" stroke="#8B5CF6" strokeWidth={2.5} dot={{ fill: '#8B5CF6', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Calories Consumed vs Burned */}
          <Card className="border-border" data-testid="calories-chart-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl uppercase tracking-tight">Calories: Consumed vs Burned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 16%)" />
                    <XAxis dataKey="day" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <Tooltip {...chartTooltipStyle} />
                    <Legend wrapperStyle={{ color: '#a1a1aa', fontSize: 12 }} />
                    <Bar dataKey="consumed" fill="#2563EB" radius={[4, 4, 0, 0]} name="Consumed" />
                    <Bar dataKey="burned" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Burned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Macronutrient Trends */}
          <Card className="border-border" data-testid="macro-trends-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl uppercase tracking-tight">Macronutrient Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 16%)" />
                    <XAxis dataKey="day" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <Tooltip {...chartTooltipStyle} />
                    <Legend wrapperStyle={{ color: '#a1a1aa', fontSize: 12 }} />
                    <Line type="monotone" dataKey="protein" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} name="Protein (g)" />
                    <Line type="monotone" dataKey="carbs" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} name="Carbs (g)" />
                    <Line type="monotone" dataKey="fiber" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 3 }} name="Fiber (g)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
