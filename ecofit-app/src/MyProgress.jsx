import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Flame, Scale, Target, CheckCircle, Trophy, Lightbulb, RefreshCw } from 'lucide-react';

// ── CONSTANTS ───────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const HEALTH_TIPS = [
  "Walk 10 min after every meal — reduces blood sugar by up to 22% 🚶",
  "Sleep 7–9 hrs. Muscle is built during rest, not during workout 💤",
  "Drink water before meals — reduces calorie intake by ~13% 💧",
  "Stretch 5 mins every morning. Injury prevention = long-term gains 🧘",
  "Protein within 30 mins post-workout = 40% better muscle recovery 💪",
  "Take stairs daily. Just 10 floors/day burns 50 extra calories 🏃",
  "Eat slowly — your stomach takes 20 mins to signal fullness 🍽️",
  "Ragi, bajra and jowar have more iron than spinach — eat local grains 🌾",
  "Cold water after workout reduces muscle inflammation faster 🧊",
  "Sunlight for 15 mins daily = free Vitamin D = better immunity ☀️",
];

const STORAGE_KEY = 'ecofit_progress';

// ── BMI HELPER ───────────────────────────────────────────────
const calcBMI = (weight, height) => {
  if (!weight || !height) return null;
  return (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1);
};

const bmiStatus = (bmi) => {
  if (!bmi) return null;
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500',   bg: 'bg-blue-50'   };
  if (bmi < 25)   return { label: 'Healthy ✓',   color: 'text-green-600',  bg: 'bg-green-50'  };
  if (bmi < 30)   return { label: 'Overweight',   color: 'text-amber-500',  bg: 'bg-amber-50'  };
  return             { label: 'Obese',         color: 'text-red-500',    bg: 'bg-red-50'    };
};

// ── SECTION CARD ─────────────────────────────────────────────
const SectionCard = ({ title, icon: Icon, iconBg, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={18} className="text-white" />
      </div>
      <h4 className="text-base font-bold text-gray-900">{title}</h4>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── MAIN COMPONENT ───────────────────────────────────────────
const MyProgress = ({ onWorkoutLogged }) => {
  const currentMonth = new Date().getMonth();
  const todayIdx     = new Date().getDay();
  const todayLabel   = DAYS[todayIdx === 0 ? 6 : todayIdx - 1];
  const todayDate    = new Date().toDateString();

  // Load from localStorage
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        health: {},
        streak: { loggedDays: {}, count: 0, longest: 0, lastLogDate: null, mode: 'manual' },
        goal: { targetWeight: '', weeklyWorkouts: '' },
      };
    } catch {
      return {
        health: {},
        streak: { loggedDays: {}, count: 0, longest: 0, lastLogDate: null, mode: 'manual' },
        goal: { targetWeight: '', weeklyWorkouts: '' },
      };
    }
  });

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [form, setForm]     = useState({ height: '', weight: '' });
  const [goalForm, setGoalForm] = useState({ targetWeight: data.goal?.targetWeight || '', weeklyWorkouts: data.goal?.weeklyWorkouts || '' });
  const [saved, setSaved]   = useState('');
  const [justLogged, setJustLogged] = useState(false);
  const [tipIdx, setTipIdx] = useState(() => Math.floor(Math.random() * HEALTH_TIPS.length));

  // FIX BUG 4: Use refs to track all setTimeout IDs so they can be
  // cleared on unmount — previously these were fire-and-forget, causing
  // "Can't perform state update on unmounted component" leaks.
  const savedTimerRef    = useRef(null);
  const loggedTimerRef   = useRef(null);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (savedTimerRef.current)  clearTimeout(savedTimerRef.current);
      if (loggedTimerRef.current) clearTimeout(loggedTimerRef.current);
    };
  }, []);

  const refreshTip = () => setTipIdx(Math.floor(Math.random() * HEALTH_TIPS.length));

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Fill form on month change
  const handleMonthChange = (idx) => {
    setSelectedMonth(idx);
    const r = data.health[MONTHS[idx]] || {};
    setForm({ height: r.height || '', weight: r.weight || '' });
  };

  // Save health entry
  const saveHealth = () => {
    if (!form.height && !form.weight) return;
    setData(prev => ({
      ...prev,
      health: {
        ...prev.health,
        [MONTHS[selectedMonth]]: {
          height: form.height || prev.health[MONTHS[selectedMonth]]?.height || '',
          weight: form.weight || prev.health[MONTHS[selectedMonth]]?.weight || '',
        }
      }
    }));
    setSaved('health');
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(''), 2000);
  };

  // Save goal
  const saveGoal = () => {
    setData(prev => ({ ...prev, goal: goalForm }));
    setSaved('goal');
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(''), 2000);
  };

  // Log streak manually
  const logStreak = () => {
    if (data.streak.lastLogDate === todayDate) return;
    setData(prev => {
      const newLogged = { ...prev.streak.loggedDays, [todayLabel]: true };
      let count = 0;
      for (let i = DAYS.indexOf(todayLabel); i >= 0; i--) {
        if (newLogged[DAYS[i]]) count++; else break;
      }
      return {
        ...prev,
        streak: {
          ...prev.streak,
          loggedDays: newLogged,
          count,
          longest: Math.max(prev.streak.longest, count),
          lastLogDate: todayDate,
        }
      };
    });
    setJustLogged(true);
    if (loggedTimerRef.current) clearTimeout(loggedTimerRef.current);
    loggedTimerRef.current = setTimeout(() => setJustLogged(false), 2500);
  };

  // Toggle streak mode
  const toggleMode = () => {
    setData(prev => ({
      ...prev,
      streak: { ...prev.streak, mode: prev.streak.mode === 'manual' ? 'auto' : 'manual' }
    }));
  };

  // Reset week
  const resetWeek = () => {
    setData(prev => ({
      ...prev,
      streak: { ...prev.streak, loggedDays: {}, count: 0, lastLogDate: null }
    }));
  };

  // BMI chart data from health records
  const bmiChartData = MONTHS
    .filter(m => data.health[m]?.weight && data.health[m]?.height)
    .map(m => ({
      name: m,
      bmi: parseFloat(calcBMI(data.health[m].weight, data.health[m].height)),
      weight: parseFloat(data.health[m].weight),
    }));

  const currentRecord = data.health[MONTHS[selectedMonth]] || {};
  const currentBMI    = calcBMI(currentRecord.weight, currentRecord.height);
  const bmiInfo       = bmiStatus(currentBMI);

  const alreadyLoggedToday = data.streak.lastLogDate === todayDate;
  const totalLoggedDays    = Object.values(data.streak.loggedDays).filter(Boolean).length;

  // Goal progress
  const currentWeight  = parseFloat(data.health[MONTHS[currentMonth]]?.weight) || 0;
  const targetWeight   = parseFloat(data.goal?.targetWeight) || 0;
  const weightDiff     = currentWeight && targetWeight ? (currentWeight - targetWeight).toFixed(1) : null;
  const weightProgress = currentWeight && targetWeight
    ? Math.min(100, Math.max(0, Math.round((1 - Math.abs(weightDiff) / currentWeight) * 100))) : 0;

  const flameColor = data.streak.count >= 7 ? 'text-red-500' : data.streak.count >= 4 ? 'text-orange-500' : data.streak.count >= 1 ? 'text-amber-400' : 'text-gray-200';

  return (
    <div className="px-8 py-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <Target className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">My Progress</h3>
            <p className="text-sm text-gray-500">Track health, streak & goals — all in one place 📈</p>
          </div>
        </div>
        {/* Social Impact Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-center">
          <p className="text-xs font-bold text-emerald-700">🇮🇳 EcoFit Impact</p>
          <p className="text-xs text-emerald-600">Democratizing fitness for every Indian</p>
        </div>
      </div>

      {/* ── HEALTH TIP CARD (TOP) ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-5 shadow-lg">
        <div className="absolute top-0 right-0 w-28 h-28 bg-white opacity-5 rounded-full -translate-y-6 translate-x-6" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full translate-y-6 -translate-x-6" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={14} className="text-emerald-100" />
              <span className="text-xs font-black text-emerald-100 uppercase tracking-widest">Science-backed tip</span>
            </div>
            <p className="text-white font-semibold text-sm leading-relaxed">{HEALTH_TIPS[tipIdx]}</p>
          </div>
          <button
            onClick={refreshTip}
            className="flex-shrink-0 w-9 h-9 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center transition-all group"
            title="New tip">
            <RefreshCw size={14} className="text-white group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* ── STREAK SECTION ── */}
      <SectionCard title="Workout Streak" icon={Flame} iconBg="bg-orange-500">

        {/* Mode Toggle */}
        <div className="flex items-center justify-between mb-5 bg-gray-50 rounded-xl p-3">
          <div>
            <p className="text-sm font-semibold text-gray-700">Tracking Mode</p>
            <p className="text-xs text-gray-400">
              {data.streak.mode === 'manual'
                ? 'Manual — you log each workout'
                : 'Auto — logs when you predict calories'}
            </p>
          </div>
          <button onClick={toggleMode}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
              data.streak.mode === 'auto' ? 'bg-emerald-500' : 'bg-gray-200'
            }`}>
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-all duration-300 ${
              data.streak.mode === 'auto' ? 'left-7' : 'left-0.5'
            }`} />
          </button>
        </div>

        {/* Streak Display */}
        <div className="flex items-center gap-6 mb-5">
          <div className="text-center">
            <Flame size={48} className={`${flameColor} mx-auto mb-1 ${data.streak.count > 0 ? 'animate-pulse' : ''}`} />
            <p className="text-4xl font-black text-gray-900">{data.streak.count}</p>
            <p className="text-xs text-gray-400 mt-0.5">Day Streak</p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="bg-yellow-50 rounded-xl p-3 text-center border border-yellow-100">
              <Trophy size={18} className="text-yellow-500 mx-auto mb-1" />
              <p className="text-lg font-black text-gray-900">{data.streak.longest}</p>
              <p className="text-xs text-gray-400">Best</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
              <p className="text-lg font-black text-gray-900">{totalLoggedDays}</p>
              <p className="text-xs text-gray-400">This Week</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
              <p className="text-lg font-black text-gray-900">{Math.round((totalLoggedDays / 7) * 100)}%</p>
              <p className="text-xs text-gray-400">Weekly Rate</p>
            </div>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="grid grid-cols-7 gap-2 mb-5">
          {DAYS.map(day => {
            const isToday = day === todayLabel;
            const isDone  = data.streak.loggedDays[day];
            return (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <span className={`text-xs font-semibold ${isToday ? 'text-emerald-600' : 'text-gray-300'}`}>{day}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                  isDone    ? 'bg-orange-400 border-orange-400' :
                  isToday   ? 'border-emerald-400 border-dashed bg-emerald-50' :
                  'border-gray-100 bg-gray-50'
                }`}>
                  {isDone   ? <Flame size={16} className="text-white" /> :
                   isToday  ? <span className="text-emerald-500 text-xs font-bold">now</span> :
                   <span className="text-gray-200">·</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Log Button — only show in manual mode */}
        {data.streak.mode === 'manual' && (
          <div className="flex gap-3">
            <button onClick={logStreak} disabled={alreadyLoggedToday}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                alreadyLoggedToday
                  ? 'bg-green-100 text-green-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-sm'
              }`}>
              <CheckCircle size={18} />
              {alreadyLoggedToday ? 'Logged today ✅' : "I worked out today 🔥"}
            </button>
            <button onClick={resetWeek}
              className="px-4 py-3 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 text-xs font-medium transition-all">
              Reset Week
            </button>
          </div>
        )}
        {data.streak.mode === 'auto' && (
          <div className="bg-emerald-50 rounded-xl px-4 py-3 text-center border border-emerald-100">
            <p className="text-xs text-emerald-600 font-medium">⚡ Auto mode on — streak logs when you predict calories in My Workouts</p>
          </div>
        )}
        {justLogged && (
          <div className="mt-3 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-center animate-bounce">
            <p className="text-green-600 text-sm font-semibold">✅ Workout logged! Streak updated!</p>
          </div>
        )}
      </SectionCard>

      {/* ── HEALTH TRACKER SECTION ── */}
      <SectionCard title="Monthly Health Log" icon={Scale} iconBg="bg-blue-500">

        {/* Month Selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {MONTHS.map((m, idx) => (
            <button key={m} onClick={() => handleMonthChange(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedMonth === idx ? 'bg-blue-500 text-white shadow-sm' :
                data.health[m]       ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}>
              {m}{data.health[m] && selectedMonth !== idx ? ' ✓' : ''}
            </button>
          ))}
        </div>

        {/* Input Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Height (cm)', field: 'height', placeholder: '170' },
            { label: 'Weight (kg)', field: 'weight', placeholder: '68'  },
          ].map(({ label, field, placeholder }) => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
              <input type="number" value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm font-semibold"
                placeholder={placeholder} />
            </div>
          ))}
        </div>

        {/* BMI Preview */}
        {currentBMI && bmiInfo && (
          <div className={`mb-4 ${bmiInfo.bg} rounded-xl px-4 py-3 flex items-center justify-between border border-gray-100`}>
            <span className="text-sm text-gray-600 font-medium">BMI — {MONTHS[selectedMonth]}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900">{currentBMI}</span>
              <span className={`text-sm font-bold ${bmiInfo.color}`}>{bmiInfo.label}</span>
            </div>
          </div>
        )}

        <button onClick={saveHealth}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
            saved === 'health' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
          }`}>
          {saved === 'health' ? 'Saved ✓' : `Save ${MONTHS[selectedMonth]}`}
        </button>

        {/* BMI Trend Chart */}
        {bmiChartData.length >= 2 && (
          <div className="mt-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">BMI Trend</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={bmiChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={['auto','auto']} />
                <Tooltip formatter={(val) => [`${val}`, 'BMI']} />
                <Line type="monotone" dataKey="bmi" stroke="#6366f1" strokeWidth={2.5}
                  dot={{ fill: '#6366f1', r: 5, stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey={() => 25} stroke="#10b981" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Healthy Max" />
                <Line type="monotone" dataKey={() => 18.5} stroke="#3b82f6" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Healthy Min" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <span className="text-xs text-emerald-600 font-medium">— Healthy max (25)</span>
              <span className="text-xs text-blue-500 font-medium">— Healthy min (18.5)</span>
            </div>
          </div>
        )}

        {/* Monthly Overview */}
        {Object.keys(data.health).length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3">
            {MONTHS.filter(m => data.health[m]).map(m => {
              const b = calcBMI(data.health[m].weight, data.health[m].height);
              const s = bmiStatus(b);
              return (
                <div key={m} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-1">{m}</p>
                  {data.health[m].weight && <p className="text-xs text-gray-600">⚖️ <span className="font-semibold">{data.health[m].weight} kg</span></p>}
                  {b && <p className={`text-xs font-bold mt-0.5 ${s?.color}`}>BMI {b}</p>}
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      {/* ── GOAL SECTION ── */}
      <SectionCard title="My Goal" icon={Target} iconBg="bg-violet-500">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Target Weight (kg)',     field: 'targetWeight',   placeholder: '65' },
            { label: 'Weekly Workout Target',  field: 'weeklyWorkouts', placeholder: '4'  },
          ].map(({ label, field, placeholder }) => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
              <input type="number" value={goalForm[field]}
                onChange={e => setGoalForm(f => ({ ...f, [field]: e.target.value }))}
                style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-400 outline-none text-sm font-semibold"
                placeholder={placeholder} />
            </div>
          ))}
        </div>

        {/* Progress bars */}
        {(weightDiff !== null || data.goal?.weeklyWorkouts) && (
          <div className="space-y-3 mb-4">
            {weightDiff !== null && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Weight Goal</span>
                  <span className="text-xs font-bold text-violet-600">
                    {weightDiff > 0 ? `${weightDiff} kg to go` : '🎉 Goal reached!'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${weightProgress}%` }} />
                </div>
              </div>
            )}
            {data.goal?.weeklyWorkouts && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Weekly Workouts</span>
                  <span className="text-xs font-bold text-orange-500">
                    {totalLoggedDays} / {data.goal.weeklyWorkouts} sessions
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.round((totalLoggedDays / data.goal.weeklyWorkouts) * 100))}%` }} />
                </div>
              </div>
            )}
          </div>
        )}

        <button onClick={saveGoal}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
            saved === 'goal' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'
          }`}>
          {saved === 'goal' ? 'Saved ✓' : 'Save Goal'}
        </button>
      </SectionCard>

    </div>
  );
};

export default MyProgress;
