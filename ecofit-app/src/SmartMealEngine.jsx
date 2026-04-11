// =============================================
// FILE: src/SmartMealEngine.jsx
// NEW FILE — paste in ecofit-app/src/
// =============================================

import React, { useState } from 'react';
import { Sparkles, Target, ChevronDown, ChevronUp, RefreshCw, Brain } from 'lucide-react';

// ── MEAL DATABASE (50+ Indian meals with scoring metadata) ──
const MEAL_DB = [
  // Breakfast
  { id: 1, type: 'Breakfast', name: 'Oats Upma', cost: 40, cal: 280, protein: 9, fiber: 6, carbs: 45, tags: ['veg','vegan'], goals: ['lose','maintain','energy'], ingredients: 'Oats, veggies, mustard seeds, curry leaves', tip: 'Add veggies for extra fiber — keeps you full longer' },
  { id: 2, type: 'Breakfast', name: 'Moong Dal Chilla', cost: 35, cal: 220, protein: 14, fiber: 5, carbs: 28, tags: ['veg','vegan'], goals: ['lose','muscle','maintain'], ingredients: 'Moong dal, onion, green chilli, coriander', tip: 'High protein breakfast — great pre-workout fuel' },
  { id: 3, type: 'Breakfast', name: 'Paneer Paratha', cost: 60, cal: 420, protein: 18, fiber: 3, carbs: 52, tags: ['veg'], goals: ['muscle','maintain','energy'], ingredients: 'Whole wheat flour, paneer, spices, ghee', tip: 'Use minimal ghee and whole wheat for healthier version' },
  { id: 4, type: 'Breakfast', name: 'Egg Bhurji with Toast', cost: 50, cal: 350, protein: 20, fiber: 2, carbs: 30, tags: ['nonveg','any'], goals: ['muscle','maintain','energy'], ingredients: 'Eggs, onion, tomato, brown bread', tip: 'Use 2 whole eggs + 1 white to reduce fat while keeping protein' },
  { id: 5, type: 'Breakfast', name: 'Banana Oat Smoothie', cost: 45, cal: 310, protein: 8, fiber: 5, carbs: 58, tags: ['veg','vegan'], goals: ['energy','maintain'], ingredients: 'Banana, oats, milk/almond milk, honey', tip: 'Have 30 mins before workout for natural energy boost' },
  { id: 6, type: 'Breakfast', name: 'Sprouts Salad Bowl', cost: 30, cal: 180, protein: 12, fiber: 8, carbs: 22, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Mixed sprouts, lemon, chaat masala, cucumber', tip: 'Best low-calorie high-protein breakfast for weight loss' },
  { id: 7, type: 'Breakfast', name: 'Poha with Peanuts', cost: 25, cal: 260, protein: 7, fiber: 4, carbs: 48, tags: ['veg','vegan'], goals: ['maintain','energy'], ingredients: 'Poha, peanuts, onion, turmeric, lemon', tip: 'Iron-rich breakfast — great for energy levels' },
  { id: 8, type: 'Breakfast', name: 'Greek Yogurt Parfait', cost: 80, cal: 290, protein: 16, fiber: 4, carbs: 35, tags: ['veg'], goals: ['muscle','lose','maintain'], ingredients: 'Greek yogurt, granola, banana, honey', tip: 'Probiotics in yogurt improve gut health and immunity' },
  { id: 9, type: 'Breakfast', name: 'Chicken Sandwich', cost: 70, cal: 380, protein: 28, fiber: 3, carbs: 35, tags: ['nonveg','any'], goals: ['muscle','energy'], ingredients: 'Chicken breast, brown bread, lettuce, mustard', tip: 'Grill chicken instead of frying for 40% less calories' },
  { id: 10, type: 'Breakfast', name: 'Ragi Dosa', cost: 30, cal: 200, protein: 6, fiber: 5, carbs: 38, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Ragi flour, rice, urad dal, curry leaves', tip: 'Ragi is calcium-rich — great for bone health' },
  { id: 11, type: 'Breakfast', name: 'Peanut Butter Toast', cost: 40, cal: 320, protein: 12, fiber: 4, carbs: 38, tags: ['veg','vegan'], goals: ['muscle','energy'], ingredients: 'Brown bread, peanut butter, banana slices', tip: 'Natural peanut butter only — avoid sugar-added versions' },
  { id: 12, type: 'Breakfast', name: 'Idli Sambar', cost: 30, cal: 240, protein: 8, fiber: 4, carbs: 46, tags: ['veg','vegan'], goals: ['maintain','lose','energy'], ingredients: 'Rice, urad dal, sambar veggies, tamarind', tip: 'Fermented food — excellent for gut bacteria' },

  // Lunch
  { id: 13, type: 'Lunch', name: 'Rajma Chawal', cost: 60, cal: 480, protein: 18, fiber: 12, carbs: 78, tags: ['veg','vegan'], goals: ['muscle','maintain','energy'], ingredients: 'Rajma, brown rice, onion, tomato, spices', tip: 'Use brown rice for better fiber and lower glycemic index' },
  { id: 14, type: 'Lunch', name: 'Grilled Chicken with Salad', cost: 120, cal: 380, protein: 35, fiber: 6, carbs: 20, tags: ['nonveg','any'], goals: ['muscle','lose'], ingredients: 'Chicken breast, mixed greens, olive oil, lemon', tip: 'Marinate in yogurt and spices for tender, flavourful chicken' },
  { id: 15, type: 'Lunch', name: 'Dal Tadka with Roti', cost: 40, cal: 420, protein: 16, fiber: 10, carbs: 65, tags: ['veg','vegan'], goals: ['maintain','lose','energy'], ingredients: 'Toor dal, whole wheat roti, onion, tomato, ghee', tip: 'Add spinach to dal for iron boost' },
  { id: 16, type: 'Lunch', name: 'Paneer Bhurji with Roti', cost: 80, cal: 460, protein: 22, fiber: 4, carbs: 48, tags: ['veg'], goals: ['muscle','maintain'], ingredients: 'Paneer, capsicum, onion, tomato, spices, roti', tip: 'Low-fat paneer reduces calories while keeping protein high' },
  { id: 17, type: 'Lunch', name: 'Quinoa Veggie Bowl', cost: 100, cal: 380, protein: 14, fiber: 8, carbs: 55, tags: ['veg','vegan'], goals: ['lose','maintain','muscle'], ingredients: 'Quinoa, roasted veggies, chickpeas, lemon dressing', tip: 'Quinoa is a complete protein — all 9 essential amino acids' },
  { id: 18, type: 'Lunch', name: 'Fish Curry with Rice', cost: 130, cal: 450, protein: 30, fiber: 5, carbs: 55, tags: ['nonveg','any'], goals: ['muscle','maintain','energy'], ingredients: 'Rohu fish, coconut milk, tomato, brown rice', tip: 'Fish is rich in omega-3 — great for heart and brain health' },
  { id: 19, type: 'Lunch', name: 'Chole with Bhature', cost: 50, cal: 580, protein: 16, fiber: 10, carbs: 88, tags: ['veg','vegan'], goals: ['energy','maintain'], ingredients: 'Chickpeas, maida bhature, onion, tamarind chutney', tip: 'Limit to once a week — high calorie but very filling' },
  { id: 20, type: 'Lunch', name: 'Egg Curry with Brown Rice', cost: 65, cal: 420, protein: 22, fiber: 5, carbs: 52, tags: ['nonveg','any'], goals: ['muscle','maintain','energy'], ingredients: 'Eggs, onion, tomato, coconut milk, brown rice', tip: 'Eggs are the most bioavailable protein source' },
  { id: 21, type: 'Lunch', name: 'Palak Paneer with Roti', cost: 75, cal: 440, protein: 20, fiber: 7, carbs: 46, tags: ['veg'], goals: ['muscle','maintain','lose'], ingredients: 'Spinach, paneer, garlic, cream, whole wheat roti', tip: 'Iron from spinach + protein from paneer = power combo' },
  { id: 22, type: 'Lunch', name: 'Moong Dal Khichdi', cost: 35, cal: 320, protein: 14, fiber: 8, carbs: 52, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Moong dal, rice, ghee, cumin, turmeric', tip: 'Easiest to digest — perfect for post-workout recovery' },
  { id: 23, type: 'Lunch', name: 'Tofu Stir Fry with Rice', cost: 80, cal: 360, protein: 18, fiber: 6, carbs: 48, tags: ['veg','vegan'], goals: ['muscle','lose','maintain'], ingredients: 'Tofu, bell peppers, soy sauce, brown rice, ginger', tip: 'Press tofu for 20 mins before cooking for crispy texture' },
  { id: 24, type: 'Lunch', name: 'Chicken Biryani (light)', cost: 100, cal: 520, protein: 28, fiber: 4, carbs: 65, tags: ['nonveg','any'], goals: ['muscle','energy','maintain'], ingredients: 'Chicken, basmati rice, saffron, yogurt, spices', tip: 'Use less oil and more spices for flavour without extra calories' },

  // Snack
  { id: 25, type: 'Snack', name: 'Roasted Chana', cost: 20, cal: 120, protein: 7, fiber: 5, carbs: 18, tags: ['veg','vegan'], goals: ['lose','maintain','muscle'], ingredients: 'Chana, salt, chaat masala, lemon', tip: 'Best pre-workout snack — slow digesting carbs + protein' },
  { id: 26, type: 'Snack', name: 'Banana + Peanut Butter', cost: 35, cal: 210, protein: 6, fiber: 4, carbs: 32, tags: ['veg','vegan'], goals: ['muscle','energy'], ingredients: 'Banana, natural peanut butter', tip: 'Perfect post-workout recovery combo' },
  { id: 27, type: 'Snack', name: 'Mixed Nuts (30g)', cost: 50, cal: 180, protein: 5, fiber: 2, carbs: 8, tags: ['veg','vegan'], goals: ['lose','maintain','muscle'], ingredients: 'Almonds, walnuts, cashews', tip: 'Heart-healthy fats — stick to 30g portion' },
  { id: 28, type: 'Snack', name: 'Dark Chocolate (2 squares)', cost: 30, cal: 120, protein: 2, fiber: 3, carbs: 12, tags: ['veg','any'], goals: ['maintain','energy'], ingredients: '70%+ dark chocolate', tip: 'Antioxidant-rich — reduces cortisol (stress hormone)' },
  { id: 29, type: 'Snack', name: 'Makhana (Fox Nuts)', cost: 40, cal: 100, protein: 4, fiber: 3, carbs: 18, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Makhana, ghee, rock salt, pepper', tip: 'Zero cholesterol, low calorie — guilt-free snacking' },
  { id: 30, type: 'Snack', name: 'Protein Bar (homemade)', cost: 45, cal: 200, protein: 15, fiber: 4, carbs: 22, tags: ['veg'], goals: ['muscle','energy'], ingredients: 'Oats, peanut butter, honey, protein powder', tip: 'Make in bulk on Sunday — lasts all week' },
  { id: 31, type: 'Snack', name: 'Fruit Chaat', cost: 30, cal: 140, protein: 2, fiber: 5, carbs: 32, tags: ['veg','vegan'], goals: ['lose','maintain','energy'], ingredients: 'Seasonal fruits, chaat masala, lemon', tip: 'Natural sugars for quick energy without processed sugar' },
  { id: 32, type: 'Snack', name: 'Boiled Eggs (2)', cost: 20, cal: 155, protein: 13, fiber: 0, carbs: 1, tags: ['nonveg','any'], goals: ['muscle','lose'], ingredients: 'Eggs, salt, pepper', tip: 'Cheapest high-quality protein source available' },
  { id: 33, type: 'Snack', name: 'Coconut Water', cost: 25, cal: 45, protein: 0, fiber: 0, carbs: 9, tags: ['veg','vegan'], goals: ['lose','energy','maintain'], ingredients: 'Fresh coconut water', tip: 'Best natural electrolyte drink — better than sports drinks' },
  { id: 34, type: 'Snack', name: 'Hummus with Veggies', cost: 60, cal: 160, protein: 6, fiber: 5, carbs: 18, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Chickpeas, tahini, lemon, garlic, cucumber sticks', tip: 'Tahini adds healthy fats and calcium' },

  // Dinner
  { id: 35, type: 'Dinner', name: 'Grilled Paneer Tikka', cost: 90, cal: 320, protein: 22, fiber: 3, carbs: 12, tags: ['veg'], goals: ['muscle','lose','maintain'], ingredients: 'Paneer, yogurt, spices, bell peppers', tip: 'Grill instead of fry — same taste, 50% less calories' },
  { id: 36, type: 'Dinner', name: 'Vegetable Soup with Roti', cost: 35, cal: 240, protein: 8, fiber: 7, carbs: 40, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Mixed veggies, whole wheat roti, vegetable stock', tip: 'Light dinner aids better sleep and digestion' },
  { id: 37, type: 'Dinner', name: 'Chicken Stir Fry', cost: 110, cal: 360, protein: 32, fiber: 4, carbs: 18, tags: ['nonveg','any'], goals: ['muscle','lose'], ingredients: 'Chicken, broccoli, bell peppers, soy sauce, ginger', tip: 'High protein dinner = muscle repair while you sleep' },
  { id: 38, type: 'Dinner', name: 'Lentil Soup (Masoor Dal)', cost: 30, cal: 280, protein: 18, fiber: 10, carbs: 42, tags: ['veg','vegan'], goals: ['lose','maintain','energy'], ingredients: 'Masoor dal, tomato, garlic, cumin, spinach', tip: 'Adding spinach boosts iron and folate significantly' },
  { id: 39, type: 'Dinner', name: 'Bajra Roti with Sabzi', cost: 40, cal: 300, protein: 10, fiber: 8, carbs: 52, tags: ['veg','vegan'], goals: ['maintain','lose','energy'], ingredients: 'Bajra flour, seasonal sabzi, garlic', tip: 'Bajra is warming — perfect winter dinner' },
  { id: 40, type: 'Dinner', name: 'Tofu Palak Curry', cost: 70, cal: 290, protein: 18, fiber: 6, carbs: 22, tags: ['veg','vegan'], goals: ['muscle','lose','maintain'], ingredients: 'Tofu, spinach, onion, garlic, ginger, spices', tip: 'Iron + plant protein combo — ideal for vegans' },
  { id: 41, type: 'Dinner', name: 'Egg White Omelette', cost: 30, cal: 180, protein: 18, fiber: 1, carbs: 4, tags: ['nonveg','any'], goals: ['lose','muscle'], ingredients: 'Egg whites, onion, tomato, green chilli', tip: 'Egg whites = pure protein with almost zero fat' },
  { id: 42, type: 'Dinner', name: 'Chickpea Curry with Rice', cost: 55, cal: 420, protein: 16, fiber: 12, carbs: 68, tags: ['veg','vegan'], goals: ['maintain','energy','muscle'], ingredients: 'Chickpeas, coconut milk, tomato, spices, rice', tip: 'Chickpeas are one of the best plant protein sources' },
  { id: 43, type: 'Dinner', name: 'Fish Tikka', cost: 130, cal: 310, protein: 30, fiber: 2, carbs: 8, tags: ['nonveg','any'], goals: ['muscle','lose'], ingredients: 'Fish fillet, yogurt marinade, spices, lemon', tip: 'Omega-3 in fish reduces muscle inflammation after workouts' },
  { id: 44, type: 'Dinner', name: 'Dahi Roti', cost: 25, cal: 260, protein: 10, fiber: 3, carbs: 44, tags: ['veg'], goals: ['lose','maintain'], ingredients: 'Whole wheat roti, curd, pickle', tip: 'Light and easy to digest — good for sensitive stomachs' },
  { id: 45, type: 'Dinner', name: 'Baingan Bharta with Roti', cost: 35, cal: 280, protein: 6, fiber: 8, carbs: 48, tags: ['veg','vegan'], goals: ['lose','maintain'], ingredients: 'Eggplant, onion, tomato, garlic, whole wheat roti', tip: 'Roasting eggplant gives smoky flavour with zero extra calories' },
  { id: 46, type: 'Dinner', name: 'Mutton Curry (small portion)', cost: 160, cal: 420, protein: 28, fiber: 2, carbs: 15, tags: ['nonveg','any'], goals: ['muscle','energy'], ingredients: 'Mutton, onion, yogurt, spices, whole wheat roti', tip: 'Limit to twice a week — high in saturated fat' },
  { id: 47, type: 'Dinner', name: 'Stuffed Capsicum', cost: 65, cal: 300, protein: 12, fiber: 6, carbs: 38, tags: ['veg'], goals: ['lose','maintain','muscle'], ingredients: 'Bell peppers, paneer, onion, spices, brown rice stuffing', tip: 'Colourful peppers = different antioxidants in each colour' },
  { id: 48, type: 'Dinner', name: 'Sattu Roti with Ghee', cost: 30, cal: 310, protein: 14, fiber: 6, carbs: 48, tags: ['veg','vegan'], goals: ['muscle','energy','maintain'], ingredients: 'Sattu flour, whole wheat flour, garlic, ghee', tip: 'Sattu is Bihar\'s superfood — extremely high in protein' },
];

const GOALS = [
  { id: 'lose',     label: 'Lose Weight',  emoji: '🔥', weights: { protein: 0.4, fiber: 0.4, cal: -0.2 } },
  { id: 'muscle',   label: 'Build Muscle', emoji: '💪', weights: { protein: 0.6, fiber: 0.1, cal: 0.3  } },
  { id: 'maintain', label: 'Stay Healthy', emoji: '🌿', weights: { protein: 0.3, fiber: 0.3, cal: 0.4  } },
  { id: 'energy',   label: 'Boost Energy', emoji: '⚡', weights: { protein: 0.2, fiber: 0.2, cal: 0.6  } },
];

const DIET = [
  { id: 'veg',    label: 'Vegetarian', emoji: '🥗' },
  { id: 'vegan',  label: 'Vegan',      emoji: '🌱' },
  { id: 'nonveg', label: 'Non-Veg',    emoji: '🍗' },
  { id: 'any',    label: 'Any',        emoji: '🍽️' },
];

// ── SCORING ENGINE ──────────────────────────────────────────
const scoreMeal = (meal, goalId, weights) => {
  const maxProtein = 35, maxFiber = 12, maxCal = 580;
  const proteinScore = (meal.protein / maxProtein) * 100;
  const fiberScore   = (meal.fiber   / maxFiber)   * 100;
  const calScore     = goalId === 'lose'
    ? ((maxCal - meal.cal) / maxCal) * 100
    : (meal.cal / maxCal) * 100;

  const goalBonus = meal.goals.includes(goalId) ? 30 : 0;
  return (proteinScore * weights.protein) + (fiberScore * weights.fiber) + (calScore * Math.abs(weights.cal)) + goalBonus;
};

const generatePlan = (budget, goalId, dietId) => {
  const goalObj = GOALS.find(g => g.id === goalId);
  const { weights } = goalObj;

  const filterDiet = (meal) => {
    if (dietId === 'any') return true;
    if (dietId === 'nonveg') return meal.tags.includes('nonveg') || meal.tags.includes('any') || meal.tags.includes('veg');
    return meal.tags.includes(dietId);
  };

  const types = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
  const selected = [];
  let remaining = budget;

  for (const type of types) {
    const pool = MEAL_DB
      .filter(m => m.type === type && filterDiet(m) && m.cost <= remaining)
      .map(m => ({ ...m, score: scoreMeal(m, goalId, weights) }))
      .sort((a, b) => b.score - a.score);

    if (pool.length > 0) {
      // Pick top 3 randomly weighted — not always #1, adds variety
      const topN = pool.slice(0, Math.min(3, pool.length));
      const pick = topN[Math.floor(Math.random() * topN.length)];
      selected.push(pick);
      remaining -= pick.cost;
    }
  }

  const totalCost = selected.reduce((a, m) => a + m.cost, 0);
  const totalCal  = selected.reduce((a, m) => a + m.cal, 0);
  const totalProt = selected.reduce((a, m) => a + m.protein, 0);
  const totalFiber= selected.reduce((a, m) => a + m.fiber, 0);

  return { meals: selected, totalCost, totalCal, totalProtein: totalProt, totalFiber, leftover: budget - totalCost };
};
// ────────────────────────────────────────────────────────────

const MealCard = ({ meal }) => {
  const [open, setOpen] = useState(true);
  const emojis = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙', Snack: '🍎' };
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all">
        <div className="flex items-center gap-3">
          <span className="text-xl">{emojis[meal.type]}</span>
          <div className="text-left">
            <p className="text-xs font-bold text-gray-400 uppercase">{meal.type}</p>
            <p className="text-sm font-bold text-gray-900">{meal.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-400">Cost</p>
            <p className="text-sm font-bold text-amber-600">₹{meal.cost}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Calories</p>
            <p className="text-sm font-bold text-orange-500">{meal.cal} cal</p>
          </div>
          {open ? <ChevronUp size={16} className="text-gray-300" /> : <ChevronDown size={16} className="text-gray-300" />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-gray-50">
          <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
            {[
              { label: 'Protein', val: `${meal.protein}g`, color: 'text-blue-600',    bg: 'bg-blue-50'    },
              { label: 'Fiber',   val: `${meal.fiber}g`,   color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Carbs',   val: `${meal.carbs}g`,   color: 'text-purple-600',  bg: 'bg-purple-50'  },
            ].map(n => (
              <div key={n.label} className={`${n.bg} rounded-lg px-3 py-2 text-center`}>
                <p className={`text-sm font-bold ${n.color}`}>{n.val}</p>
                <p className="text-xs text-gray-400">{n.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mb-1.5">
            <span className="font-semibold text-gray-600">Ingredients: </span>{meal.ingredients}
          </p>
          <p className="text-xs text-emerald-600 font-medium">💡 {meal.tip}</p>
        </div>
      )}
    </div>
  );
};

const SmartMealEngine = () => {
  const [budget, setBudget]   = useState('');
  const [goal, setGoal]       = useState('');
  const [diet, setDiet]       = useState('');
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!budget || !goal || !diet) { setError('Please fill all 3 fields!'); return; }
    if (Number(budget) < 80)       { setError('Minimum budget is ₹80'); return; }
    setError('');
    const plan = generatePlan(Number(budget), goal, diet);
    setResult(plan);
    setGenerated(true);
  };

  const goalObj = GOALS.find(g => g.id === goal);

  return (
    <div className="px-8 py-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
          <Brain className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Smart Meal Engine</h3>
          <p className="text-sm text-gray-500">Rule-based recommendation — works offline, zero API cost 🧠</p>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Personalize your plan</p>

        {/* Budget */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Daily Food Budget (₹)</label>
          <div className="flex gap-3 items-end">
            <input type="number" value={budget} onChange={e => setBudget(e.target.value)}
              style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-400 outline-none text-lg font-bold"
              placeholder="e.g. 250" />
            <div className="text-right pb-1">
              <p className="text-xs text-gray-400">per meal ≈</p>
              <p className="text-sm font-bold text-violet-600">₹{budget ? Math.round(Number(budget) / 4) : 0}</p>
            </div>
          </div>
        </div>

        {/* Goal */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-700 mb-3 block">Fitness Goal</label>
          <div className="grid grid-cols-4 gap-3">
            {GOALS.map(g => (
              <button key={g.id} onClick={() => setGoal(g.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  goal === g.id ? 'bg-violet-50 border-violet-400 text-violet-700' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
                }`}>
                <span className="text-2xl">{g.emoji}</span>
                <span className="text-xs font-semibold text-center">{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Diet */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-3 block">Diet Preference</label>
          <div className="grid grid-cols-4 gap-3">
            {DIET.map(d => (
              <button key={d.id} onClick={() => setDiet(d.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  diet === d.id ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
                }`}>
                <span className="text-2xl">{d.emoji}</span>
                <span className="text-xs font-semibold">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
            <p className="text-red-500 text-sm font-medium">{error}</p>
          </div>
        )}

        <button onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 transition-all shadow-md">
          <Sparkles size={18} />
          {generated ? 'Regenerate Plan' : 'Generate My Meal Plan'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">

          {/* Summary */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-5">
            <p className="text-sm font-semibold text-violet-800 mb-3">
              {goalObj?.emoji} Optimized for <span className="font-black">{goalObj?.label}</span> · {DIET.find(d=>d.id===diet)?.emoji} {DIET.find(d=>d.id===diet)?.label}
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Total Cost',    val: `₹${result.totalCost}`,      color: 'text-amber-600'   },
                { label: 'Calories',      val: `${result.totalCal} cal`,     color: 'text-orange-600'  },
                { label: 'Protein',       val: `${result.totalProtein}g`,    color: 'text-blue-600'    },
                { label: 'Budget Left',   val: `₹${result.leftover}`,        color: 'text-emerald-600' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-lg p-3 text-center border border-violet-100">
                  <p className={`text-lg font-black ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Meal Cards */}
          <div className="space-y-3">
            {result.meals.map((meal, idx) => <MealCard key={idx} meal={meal} />)}
          </div>

          {/* Regenerate */}
          <button onClick={handleGenerate}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-600 transition-all mx-auto font-medium">
            <RefreshCw size={15} />
            Generate a different plan
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartMealEngine;
