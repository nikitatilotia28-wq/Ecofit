import React, { useState, useCallback } from 'react';
import { Activity, Leaf, DollarSign, TrendingUp, Heart, Clock, BarChart3, Target, Sprout, Flame, LogOut, User, ShoppingCart, Sparkles } from 'lucide-react';
import LoginPage from './LoginPage';
import VibeCloud from './VibeCloud';
import BudgetMealPlanner from './BudgetMealPlanner';
import DashboardCharts from './DashboardCharts';
import SmartMealEngine from './SmartMealEngine';
import MyProgress from './MyProgress';

// ── FIX BUG 1: AnimatedTree moved OUTSIDE EcoFitDashboard ────
// Previously defined inside the component body, causing it to be
// re-created as a brand-new component type on every render, which
// forces React to unmount + remount it (and all its CSS transitions)
// continuously — a major CPU hog that caused the freeze.
const AnimatedTree = ({ growth }) => {
  return (
    <div className="relative w-full h-96 flex items-end justify-center">
      {/* Tree Trunk */}
      <div className="absolute bottom-0 w-16 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg transition-all duration-1000"
           style={{ height: `${Math.min(growth * 0.4, 40)}%` }}>
      </div>
      
      {/* Tree Crown - Bottom Layer */}
      <div className="absolute bottom-20 w-48 h-48 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-80 transition-all duration-1000"
           style={{ 
             transform: `scale(${Math.min(growth / 100, 1)})`,
             opacity: growth > 30 ? 0.8 : 0
           }}>
      </div>
      
      {/* Tree Crown - Middle Layer */}
      <div className="absolute bottom-32 w-40 h-40 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full opacity-90 transition-all duration-1000"
           style={{ 
             transform: `scale(${Math.min(growth / 100, 1)})`,
             opacity: growth > 50 ? 0.9 : 0
           }}>
      </div>
      
      {/* Tree Crown - Top Layer */}
      <div className="absolute bottom-40 w-32 h-32 bg-gradient-to-br from-green-600 to-emerald-800 rounded-full transition-all duration-1000"
           style={{ 
             transform: `scale(${Math.min(growth / 100, 1)})`,
             opacity: growth > 70 ? 1 : 0
           }}>
      </div>
      
      {/* Leaves floating animation */}
      {growth > 60 && (
        <>
          <div className="absolute bottom-60 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-56 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-64 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      
      {/* Progress indicator */}
      <div className="absolute -bottom-8 text-center">
        <p className="text-4xl font-bold text-green-600">{growth}%</p>
        <p className="text-sm text-gray-500 mt-1">Forest Growth</p>
      </div>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────

const EcoFitDashboard = () => {
  // ── ALL HOOKS FIRST ─────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [duration, setDuration] = useState('30');
  const [heartRate, setHeartRate] = useState('140');
  const [predictedCalories, setPredictedCalories] = useState(null);
  const [treeGrowth] = useState(67);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetResults, setBudgetResults] = useState(null);

  const MOTIVATIONS = [
    { text: "no cap — you just showed up when most didn't. that's already the W 🏆", vibe: "🔥 today's energy" },
    { text: "main character behavior: working out while others are still in bed fr fr 💅", vibe: "✨ slay check" },
    { text: "your future self is literally watching you rn and sending good vibes back 🤝", vibe: "⚡ big brain move" },
    { text: "bro/bestie you just lapped everyone on the couch. respect yourself 👑", vibe: "💪 real talk" },
    { text: "this workout just unlocked the version of you that eats different. let's go 🚀", vibe: "🌱 level up" },
    { text: "not to be dramatic but this workout just changed your entire trajectory ngl 📈", vibe: "🎯 facts only" },
    { text: "gym era? activated. loser era? deleted. you ate and left no crumbs 🍽️", vibe: "💥 era check" },
    { text: "every rep is just you having an argument with your past self. and winning 🥊", vibe: "⚔️ villain arc" },
    { text: "the glow up is not coming. it's here. you're literally it rn 🌟", vibe: "✨ glow check" },
    { text: "your discipline today is someone else's dream goal. let that sink in 🧠", vibe: "🤯 perspective" },
  ];
  const [motivationIdx, setMotivationIdx] = useState(() => Math.floor(Math.random() * 10));

  // ── FIX BUG 2: refreshMotivation wrapped in useCallback ─────
  // Previously a plain arrow function re-created on every render,
  // causing unnecessary child re-renders when passed as a prop.
  const refreshMotivation = useCallback(() => {
    setMotivationIdx(prev => {
      let next;
      do { next = Math.floor(Math.random() * 10); } while (next === prev);
      return next;
    });
  }, []);
  // ────────────────────────────────────────────────────────────

  // ── AUTH GATE (after all hooks) ──────────────────────────────
  if (!user) {
    return <LoginPage onLogin={(u) => setUser(u)} />;
  }
  // ────────────────────────────────────────────────────────────

  const navItems = [
    { id: 'dashboard', label: 'Dashboard',     icon: BarChart3    },
    { id: 'workouts',  label: 'My Workouts',   icon: Activity     },
    { id: 'budget',    label: 'Meal Planner',  icon: ShoppingCart },
    { id: 'smart',     label: 'Smart Meal Plan', icon: Sparkles   },
    { id: 'progress',  label: 'My Progress',   icon: TrendingUp   },
  ];

  const vegetablePrices = [
    { name: 'Tomatoes', current: '₹249/kg', predicted: '₹229/kg', change: -8 },
    { name: 'Spinach', current: '₹290/bunch', predicted: '₹270/bunch', change: -7 },
    { name: 'Carrots', current: '₹165/kg', predicted: '₹179/kg', change: +8 },
    { name: 'Broccoli', current: '₹232/kg', predicted: '₹208/kg', change: -10 },
    { name: 'Bell Peppers', current: '₹357/kg', predicted: '₹332/kg', change: -7 }
  ];

  const workoutHistory = [
    { id: 1, date: '2026-02-06', type: 'Running', duration: 45, heartRate: 155, calories: 420, co2: 1.2 },
    { id: 2, date: '2026-02-05', type: 'Cycling', duration: 60, heartRate: 142, calories: 510, co2: 1.8 },
    { id: 3, date: '2026-02-04', type: 'Yoga', duration: 30, heartRate: 95, calories: 180, co2: 0.5 },
    { id: 4, date: '2026-02-03', type: 'Swimming', duration: 40, heartRate: 138, calories: 380, co2: 1.1 },
    { id: 5, date: '2026-02-02', type: 'Running', duration: 35, heartRate: 148, calories: 350, co2: 1.0 },
  ];

  const calculateCalories = () => {
    const dur = parseFloat(duration);
    const hr = parseFloat(heartRate);
    const calories = Math.round((dur * hr * 0.45) + (Math.random() * 20 - 10));
    setPredictedCalories(calories);
  };

  const optimizeBudget = () => {
    if (!budgetInput || Number(budgetInput) < 50) return;
    const budget = Number(budgetInput);
    const allVeggies = [
      { name: 'Onions',       price: 30,  per: '500g', value: 9.5 },
      { name: 'Tomatoes',     price: 40,  per: '500g', value: 8.8 },
      { name: 'Cabbage',      price: 25,  per: '500g', value: 8.5 },
      { name: 'Carrots',      price: 35,  per: '500g', value: 8.2 },
      { name: 'Cucumber',     price: 25,  per: '1 pc',  value: 8.0 },
      { name: 'Bottle Gourd', price: 20,  per: '1 pc',  value: 7.8 },
      { name: 'Spinach',      price: 30,  per: 'bunch', value: 7.5 },
      { name: 'Peas',         price: 40,  per: '500g', value: 7.2 },
      { name: 'Cauliflower',  price: 35,  per: '500g', value: 7.0 },
      { name: 'Potato',       price: 25,  per: '500g', value: 6.8 },
      { name: 'Broccoli',     price: 60,  per: '500g', value: 6.5 },
      { name: 'Bell Peppers', price: 80,  per: '500g', value: 5.5 },
    ];
    let remaining = budget;
    const selected = [];
    for (const veg of allVeggies) {
      if (remaining >= veg.price) {
        selected.push(veg);
        remaining -= veg.price;
      }
    }
    setBudgetResults({ items: selected, total: budget - remaining, leftover: remaining });
    setShowBudgetModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sprout className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">EcoFit &</h1>
              <h2 className="text-sm font-semibold text-emerald-600">BudgetBites</h2>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  activeNav === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="text-emerald-600" size={18} />
              <span className="text-sm font-semibold text-gray-700">Your Impact</span>
            </div>
            <p className="text-xs text-gray-600">23 trees planted this month</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeNav === 'dashboard' && 'Welcome back!'}
                {activeNav === 'workouts' && 'My Workouts'}
                {activeNav === 'budget' && 'Meal Planner'}
                {activeNav === 'health' && 'Personal Health'}
                {activeNav === 'streak' && 'Streak Counter'}
                {activeNav === 'goals' && 'Fitness Goals'}
                {activeNav === 'smart' && 'Smart Meal Plan'}
                
              </h2>
              <p className="text-sm text-gray-500">
                {activeNav === 'dashboard' && 'Track your fitness and savings impact'}
                {activeNav === 'workouts' && 'Your workout history and predictions'}
                {activeNav === 'budget' && 'Smart grocery list within your budget'}
                {activeNav === 'health' && 'Log monthly stats and stay on track'}
                {activeNav === 'streak' && 'Keep the fire alive every day 🔥'}
                {activeNav === 'goals' && 'Set targets and crush them 🎯'}
                {activeNav === 'smart' && 'AI-powered offline meal recommendations 🧠'}
                
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.email.split('@')[0]}</span>
              </div>
              <button
                onClick={() => setUser(null)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ── VIBE CLOUD (shows on dashboard) ── */}
        {activeNav === 'dashboard' && <VibeCloud />}

        {/* Dashboard View */}
        {activeNav === 'dashboard' && (
          <>
            {/* Social Impact Scoreboard */}
            <div className="px-8 py-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Leaf className="text-emerald-600" size={22} />
                Social Impact Scoreboard
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">CO₂ Offset Today</span>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Leaf className="text-green-600" size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">2.4 kg</div>
                  <p className="text-xs text-green-600 mt-1">↑ 18% from yesterday</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Weekly Savings</span>
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-emerald-600" size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₹3,930</div>
                  <p className="text-xs text-emerald-600 mt-1">↑ ₹999 from last week</p>
                </div>
              </div>

              {/* Animated Tree Visualization */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-gray-800">Your Virtual Forest</h4>
                  <p className="text-sm text-gray-500">Growing with every eco-friendly action</p>
                </div>
                <AnimatedTree growth={treeGrowth} />
                <p className="text-xs text-gray-500 mt-8 text-center">33 kg more CO₂ offset to unlock your complete forest</p>
              </div>
            </div>

            {/* ── ANALYTICS CHARTS ── */}
            <div className="px-8 py-4">
              <DashboardCharts />
            </div>

            {/* Main Content Area */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Workout Stats - Left */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="text-blue-600" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Workout Calorie Predictor</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Clock size={16} className="text-gray-500" />
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Heart size={16} className="text-gray-500" />
                        Average Heart Rate (bpm)
                      </label>
                      <input
                        type="number"
                        value={heartRate}
                        onChange={(e) => setHeartRate(e.target.value)}
                        style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        placeholder="140"
                      />
                    </div>

                    <button
                      onClick={calculateCalories}
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-sm"
                    >
                      Predict Calories Burned
                    </button>

                    {predictedCalories && (
                      <div className="mt-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">ML Model Prediction</p>
                            <p className="text-3xl font-bold text-gray-900">{predictedCalories}</p>
                            <p className="text-sm text-gray-600 mt-1">calories burned</p>
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="text-white" size={28} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Watch - Right */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-amber-600" size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Price Watch</h3>
                    </div>
                    <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-medium">
                      This Week
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {vegetablePrices.map((veg, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{veg.name}</p>
                          <p className="text-xs text-gray-500">{veg.current} → {veg.predicted}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                          veg.change < 0 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          <span className="text-xs font-bold">
                            {veg.change > 0 ? '+' : ''}{veg.change}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowBudgetModal(true)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-sm flex items-center justify-center gap-2">
                    <Target size={18} />
                    Optimize Budget
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Workouts View */}
        {activeNav === 'workouts' && (
          <div className="px-8 py-6">

            {/* ── TODAY'S HYPE CARD ── */}
            <div className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-5 shadow-lg">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black text-violet-200 uppercase tracking-widest">{MOTIVATIONS[motivationIdx].vibe}</span>
                  </div>
                  <p className="text-white font-semibold text-base leading-relaxed">
                    "{MOTIVATIONS[motivationIdx].text}"
                  </p>
                </div>
                <button
                  onClick={refreshMotivation}
                  className="flex-shrink-0 w-9 h-9 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center transition-all group"
                  title="New hype">
                  <span className="text-white text-sm group-hover:rotate-180 transition-transform duration-300">↻</span>
                </button>
              </div>
            </div>

            {/* Workout Stats Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="text-orange-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Total Calories</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">1,840</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-blue-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Total Time</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">210 min</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="text-red-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Avg Heart Rate</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">136 bpm</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="text-green-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">CO₂ Offset</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">5.6 kg</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
            </div>

            {/* Workout Predictor Tool */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="text-blue-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Predict Your Next Workout</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock size={16} className="text-gray-500" />
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Heart size={16} className="text-gray-500" />
                    Average Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="140"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={calculateCalories}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-sm"
                  >
                    Predict Calories
                  </button>
                </div>
              </div>

              {predictedCalories && (
                <div className="mt-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">ML Model Prediction</p>
                      <p className="text-3xl font-bold text-gray-900">{predictedCalories}</p>
                      <p className="text-sm text-gray-600 mt-1">calories burned</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Flame className="text-white" size={28} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Workout History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Workout History</h3>
              
              {/* Forest Growth Progress Bar */}
              <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sprout className="text-green-600" size={18} />
                    <span className="text-sm font-semibold text-gray-700">Forest Growth Progress</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{treeGrowth}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${treeGrowth}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">33 kg more to unlock your virtual forest</p>
              </div>

              <div className="space-y-3">
                {workoutHistory.map(workout => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Activity className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{workout.type}</p>
                        <p className="text-xs text-gray-500">{workout.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Duration</p>
                        <p className="text-sm font-bold text-gray-900">{workout.duration} min</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                        <p className="text-sm font-bold text-gray-900">{workout.heartRate} bpm</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Calories</p>
                        <p className="text-sm font-bold text-orange-600">{workout.calories} cal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">CO₂ Offset</p>
                        <p className="text-sm font-bold text-green-600">{workout.co2} kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BUDGET MEAL PLANNER VIEW ── */}
        {activeNav === 'budget' && <BudgetMealPlanner />}

        {/* ── SMART MEAL ENGINE VIEW ── */}
        {activeNav === 'smart' && <SmartMealEngine />}

        {/* ── MY PROGRESS VIEW ── */}
        {activeNav === 'progress' && <MyProgress />}
      </div>

      {/* ── BUDGET OPTIMIZER MODAL ── */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Budget Optimizer</h3>
              <button onClick={() => { setShowBudgetModal(false); setBudgetResults(null); setBudgetInput(''); }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {!budgetResults ? (
              <>
                <p className="text-sm text-gray-500 mb-4">Enter your weekly vegetable budget and we'll suggest the best combination.</p>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Your Budget (₹)</label>
                <input type="number" value={budgetInput} onChange={e => setBudgetInput(e.target.value)}
                  style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-lg font-bold mb-4"
                  placeholder="e.g. 300" />
                <button onClick={optimizeBudget}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all">
                  Find Best Combos →
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-between mb-4">
                  <div className="bg-amber-50 rounded-xl px-4 py-2 text-center border border-amber-100">
                    <p className="text-lg font-black text-amber-600">₹{budgetResults.total}</p>
                    <p className="text-xs text-gray-400">Spending</p>
                  </div>
                  <div className="bg-green-50 rounded-xl px-4 py-2 text-center border border-green-100">
                    <p className="text-lg font-black text-green-600">₹{budgetResults.leftover}</p>
                    <p className="text-xs text-gray-400">Saved</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl px-4 py-2 text-center border border-blue-100">
                    <p className="text-lg font-black text-blue-600">{budgetResults.items.length}</p>
                    <p className="text-xs text-gray-400">Veggies</p>
                  </div>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {budgetResults.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.per}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[...Array(Math.round(item.value/2))].map((_, i) => (
                            <div key={i} className="w-1.5 h-4 bg-amber-400 rounded-full" />
                          ))}
                        </div>
                        <p className="text-sm font-bold text-amber-600 w-10 text-right">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setBudgetResults(null)}
                  className="w-full border border-gray-200 text-gray-500 font-medium py-2.5 rounded-xl hover:bg-gray-50 text-sm transition-all">
                  ← Try Different Budget
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoFitDashboard;
