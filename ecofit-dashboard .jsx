import React, { useState, useEffect } from 'react';
import { Activity, Leaf, DollarSign, TrendingUp, Heart, Clock, BarChart3, Target, Sprout, Calendar, Flame, Utensils, Apple, Salad } from 'lucide-react';

const EcoFitDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [duration, setDuration] = useState('30');
  const [heartRate, setHeartRate] = useState('140');
  const [predictedCalories, setPredictedCalories] = useState(null);
  const [treeGrowth, setTreeGrowth] = useState(67);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'workouts', label: 'My Workouts', icon: Activity },
    { id: 'meals', label: 'Meal Planner', icon: Leaf },
    { id: 'metrics', label: 'Accuracy Metrics', icon: Target }
  ];

  const vegetablePrices = [
    { name: 'Tomatoes', current: '$2.99/lb', predicted: '$2.75/lb', change: -8 },
    { name: 'Spinach', current: '$3.49/bunch', predicted: '$3.25/bunch', change: -7 },
    { name: 'Carrots', current: '$1.99/lb', predicted: '$2.15/lb', change: +8 },
    { name: 'Broccoli', current: '$2.79/lb', predicted: '$2.50/lb', change: -10 },
    { name: 'Bell Peppers', current: '$4.29/lb', predicted: '$3.99/lb', change: -7 }
  ];

  const workoutHistory = [
    { id: 1, date: '2026-02-06', type: 'Running', duration: 45, heartRate: 155, calories: 420, co2: 1.2 },
    { id: 2, date: '2026-02-05', type: 'Cycling', duration: 60, heartRate: 142, calories: 510, co2: 1.8 },
    { id: 3, date: '2026-02-04', type: 'Yoga', duration: 30, heartRate: 95, calories: 180, co2: 0.5 },
    { id: 4, date: '2026-02-03', type: 'Swimming', duration: 40, heartRate: 138, calories: 380, co2: 1.1 },
    { id: 5, date: '2026-02-02', type: 'Running', duration: 35, heartRate: 148, calories: 350, co2: 1.0 },
  ];

  const mealPlan = [
    { id: 1, day: 'Monday', meal: 'Breakfast', dish: 'Avocado Toast & Smoothie', calories: 420, cost: '$4.50', veggies: ['Avocado', 'Spinach', 'Banana'] },
    { id: 2, day: 'Monday', meal: 'Lunch', dish: 'Quinoa Buddha Bowl', calories: 580, cost: '$6.80', veggies: ['Broccoli', 'Carrots', 'Tomatoes'] },
    { id: 3, day: 'Monday', meal: 'Dinner', dish: 'Veggie Stir-fry with Tofu', calories: 520, cost: '$7.20', veggies: ['Bell Peppers', 'Mushrooms', 'Snap Peas'] },
    { id: 4, day: 'Tuesday', meal: 'Breakfast', dish: 'Oatmeal with Berries', calories: 380, cost: '$3.90', veggies: ['Blueberries', 'Strawberries'] },
    { id: 5, day: 'Tuesday', meal: 'Lunch', dish: 'Mediterranean Salad', calories: 450, cost: '$5.60', veggies: ['Cucumber', 'Tomatoes', 'Olives'] },
    { id: 6, day: 'Tuesday', meal: 'Dinner', dish: 'Lentil Curry with Rice', calories: 610, cost: '$5.90', veggies: ['Spinach', 'Onions', 'Garlic'] },
  ];

  const calculateCalories = () => {
    // ML Model Placeholder - simple formula for demo
    const dur = parseFloat(duration);
    const hr = parseFloat(heartRate);
    const calories = Math.round((dur * hr * 0.45) + (Math.random() * 20 - 10));
    setPredictedCalories(calories);
  };

  // Animated Tree Component
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
                {activeNav === 'meals' && 'Meal Planner'}
                {activeNav === 'metrics' && 'Accuracy Metrics'}
              </h2>
              <p className="text-sm text-gray-500">
                {activeNav === 'dashboard' && 'Track your fitness and savings impact'}
                {activeNav === 'workouts' && 'Your workout history and predictions'}
                {activeNav === 'meals' && 'Plan your eco-friendly meals'}
                {activeNav === 'metrics' && 'Model performance and accuracy'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">JD</span>
              </div>
            </div>
          </div>
        </div>

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
                  <div className="text-3xl font-bold text-gray-900">$47.20</div>
                  <p className="text-xs text-emerald-600 mt-1">↑ $12 from last week</p>
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

                  <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-sm flex items-center justify-center gap-2">
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

        {/* Meal Planner View */}
        {activeNav === 'meals' && (
          <div className="px-8 py-6">
            {/* Meal Stats Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="text-purple-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Meals Planned</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="text-green-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Weekly Budget</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">$89.60</p>
                <p className="text-xs text-gray-500">Under budget</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="text-orange-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Avg Calories</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">493</p>
                <p className="text-xs text-gray-500">Per meal</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Apple className="text-red-500" size={20} />
                  <span className="text-sm font-medium text-gray-600">Veggies Used</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500">Different types</p>
              </div>
            </div>

            {/* Price Optimizer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-amber-600" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Price Watch & Optimizer</h3>
                </div>
                <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-medium">
                  This Week Predictions
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
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

              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-sm flex items-center justify-center gap-2">
                <Target size={18} />
                Optimize My Budget
              </button>
            </div>

            {/* Meal Plan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">This Week's Meal Plan</h3>
              
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
                {mealPlan.map(meal => (
                  <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Salad className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{meal.dish}</p>
                          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                            {meal.meal}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{meal.day}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {meal.veggies.map((veggie, idx) => (
                            <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                              {veggie}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Calories</p>
                        <p className="text-sm font-bold text-orange-600">{meal.calories}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">Cost</p>
                        <p className="text-sm font-bold text-green-600">{meal.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Metrics View */}
        {activeNav === 'metrics' && (
          <div className="px-8 py-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-purple-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Model Accuracy Metrics</h3>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* R² Score Chart */}
                <div className="col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-5 border border-purple-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">R² Score Performance</h4>
                  <div className="flex items-end gap-3 h-40">
                    {[0.82, 0.91, 0.88, 0.94, 0.89, 0.92].map((score, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-white rounded-t-lg overflow-hidden flex flex-col justify-end" style={{ height: '100%' }}>
                          <div 
                            className="bg-gradient-to-t from-purple-500 to-indigo-500 rounded-t-lg transition-all"
                            style={{ height: `${score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-2 font-medium">{score}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <span>Week 1</span>
                    <span>Week 6</span>
                  </div>
                </div>

                {/* MAE Cards */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
                    <p className="text-xs font-medium text-gray-600 mb-2">Calorie Model MAE</p>
                    <p className="text-3xl font-bold text-gray-900">12.4</p>
                    <p className="text-xs text-green-600 mt-1">±3.2 calories</p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
                    <p className="text-xs font-medium text-gray-600 mb-2">Price Model MAE</p>
                    <p className="text-3xl font-bold text-gray-900">$0.18</p>
                    <p className="text-xs text-amber-600 mt-1">±$0.05 variance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoFitDashboard;
