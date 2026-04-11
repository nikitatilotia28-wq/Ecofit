import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Flame, Leaf, Scale } from 'lucide-react';

// FIX BUG 6: DashboardCharts was reading from two stale/wrong keys:
//   'ecofit_health' and 'ecofit_goals'
// MyProgress saves everything under ONE key: 'ecofit_progress'
// with shape: { health: {...}, streak: {...}, goal: {...} }
// Fixed: read from 'ecofit_progress' and destructure correctly.
const getProgressData = () => {
  try {
    const raw = JSON.parse(localStorage.getItem('ecofit_progress'));
    return {
      health: raw?.health || {},
      goal:   raw?.goal   || {},
      streak: raw?.streak || {},
    };
  } catch {
    return { health: {}, goal: {}, streak: {} };
  }
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const workoutHistory = [
  { name: 'Feb 2',  calories: 350, co2: 1.0, type: 'Running'  },
  { name: 'Feb 3',  calories: 380, co2: 1.1, type: 'Swimming' },
  { name: 'Feb 4',  calories: 180, co2: 0.5, type: 'Yoga'     },
  { name: 'Feb 5',  calories: 510, co2: 1.8, type: 'Cycling'  },
  { name: 'Feb 6',  calories: 420, co2: 1.2, type: 'Running'  },
];

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}{unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, subtitle, icon: Icon, iconBg, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="text-base font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

const DashboardCharts = () => {
  const [healthData, setHealthData] = useState({});
  const [goals, setGoals] = useState({});

  useEffect(() => {
    const { health, goal } = getProgressData();
    setHealthData(health);
    setGoals(goal);
  }, []);

  // Weight trend from localStorage (now reading from correct key)
  const weightTrend = MONTHS
    .filter(m => healthData[m]?.weight)
    .map(m => ({ name: m, weight: parseFloat(healthData[m].weight), calories: parseFloat(healthData[m].calories || 0) }));

  // Calorie burn donut
  const calGoal    = parseFloat(goals.dailyCalorieGoal) || 500;
  const calBurned  = parseFloat(goals.caloriesBurnedToday) || 0;
  const calRemaining = Math.max(0, calGoal - calBurned);
  const donutData = [
    { name: 'Burned',    value: Math.min(calBurned, calGoal) },
    { name: 'Remaining', value: calRemaining },
  ];

  // Workout progress donut
  const weeklyGoal = parseFloat(goals.weeklyWorkouts) || 5;
  const weeklyDone = parseFloat(goals.workoutsDoneThisWeek) || 0;
  const workoutDonut = [
    { name: 'Done', value: Math.min(weeklyDone, weeklyGoal) },
    { name: 'Left', value: Math.max(0, weeklyGoal - weeklyDone) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-emerald-600" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Your Analytics</h3>
        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">Live from your data</span>
      </div>

      {/* Row 1 — Bar + Area */}
      <div className="grid grid-cols-2 gap-6">

        {/* Calories per Workout — Bar Chart */}
        <ChartCard
          title="Calories per Workout"
          subtitle="Last 5 sessions"
          icon={Flame}
          iconBg="bg-orange-500"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={workoutHistory} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip unit=" cal" />} />
              <Bar dataKey="calories" name="Calories" fill="url(#calGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="calGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* CO₂ Offset — Area Chart */}
        <ChartCard
          title="CO₂ Offset Trend"
          subtitle="Kg offset per session"
          icon={Leaf}
          iconBg="bg-emerald-500"
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={workoutHistory}>
              <defs>
                <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip unit=" kg" />} />
              <Area type="monotone" dataKey="co2" name="CO₂" stroke="#10b981" strokeWidth={2.5} fill="url(#co2Gradient)" dot={{ fill: '#10b981', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2 — Line + Two Donuts */}
      <div className="grid grid-cols-3 gap-6">

        {/* Weight Trend — Line Chart */}
        <div className="col-span-2">
          <ChartCard
            title="Weight Trend"
            subtitle={weightTrend.length > 0 ? "From your health tracker data" : "Log weight in My Progress to see trend"}
            icon={Scale}
            iconBg="bg-blue-500"
          >
            {weightTrend.length >= 2 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weightTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip unit=" kg" />} />
                  <Line type="monotone" dataKey="weight" name="Weight" stroke="#3b82f6" strokeWidth={2.5}
                    dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 7, fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center">
                <Scale size={36} className="text-gray-200 mb-3" />
                <p className="text-sm text-gray-400 font-medium">No weight data yet</p>
                <p className="text-xs text-gray-300 mt-1">Log at least 2 months in My Progress tab</p>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Two Donuts stacked */}
        <div className="space-y-4">

          {/* Daily Calorie Donut */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                <Flame size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Daily Calories</p>
                <p className="text-xs text-gray-400">{calBurned} / {calGoal} cal</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={35} outerRadius={52} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                  <Cell fill="#f97316" />
                  <Cell fill="#f3f4f6" />
                </Pie>
                <Tooltip formatter={(val, name) => [`${val} cal`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-gray-400 -mt-2">
              {calGoal > 0 ? `${Math.min(100, Math.round((calBurned/calGoal)*100))}% complete` : 'Set goal in My Progress'}
            </p>
          </div>

          {/* Weekly Workout Donut */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Weekly Workouts</p>
                <p className="text-xs text-gray-400">{weeklyDone} / {weeklyGoal} sessions</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={workoutDonut} cx="50%" cy="50%" innerRadius={35} outerRadius={52} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                  <Cell fill="#10b981" />
                  <Cell fill="#f3f4f6" />
                </Pie>
                <Tooltip formatter={(val, name) => [`${val} sessions`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-gray-400 -mt-2">
              {weeklyGoal > 0 ? `${Math.min(100, Math.round((weeklyDone/weeklyGoal)*100))}% of weekly goal` : 'Set goal in My Progress'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
