// FIX BUG 5: Removed unused `useMemo` from import — it was imported
// but never called, adding dead weight to the bundle.
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Target, RefreshCw, Lock, Unlock, Trash2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'veggies',    label: 'Vegetables',      emoji: '🥬', color: 'emerald' },
  { id: 'fruits',     label: 'Fruits',           emoji: '🍎', color: 'red'     },
  { id: 'grains',     label: 'Grains & Pulses',  emoji: '🌾', color: 'amber'   },
  { id: 'proteins',   label: 'Proteins',         emoji: '🥚', color: 'blue'    },
  { id: 'chocolates', label: 'Snacks & Sweets',  emoji: '🍫', color: 'purple'  },
];

const ALL_ITEMS = {
  veggies: [
    { name: 'Tomatoes',     price: 40,  unit: '500g',  cal: 18,  protein: 0.9, fiber: 1.2 },
    { name: 'Spinach',      price: 30,  unit: 'bunch', cal: 23,  protein: 2.9, fiber: 2.2 },
    { name: 'Carrots',      price: 35,  unit: '500g',  cal: 41,  protein: 0.9, fiber: 2.8 },
    { name: 'Broccoli',     price: 60,  unit: '500g',  cal: 55,  protein: 3.7, fiber: 2.6 },
    { name: 'Bell Peppers', price: 80,  unit: '500g',  cal: 31,  protein: 1.0, fiber: 2.1 },
    { name: 'Cucumber',     price: 25,  unit: '1 pc',  cal: 16,  protein: 0.7, fiber: 0.5 },
    { name: 'Onions',       price: 30,  unit: '500g',  cal: 40,  protein: 1.1, fiber: 1.7 },
    { name: 'Garlic',       price: 50,  unit: '250g',  cal: 149, protein: 6.4, fiber: 2.1 },
    { name: 'Mushrooms',    price: 70,  unit: '250g',  cal: 22,  protein: 3.1, fiber: 1.0 },
    { name: 'Peas',         price: 40,  unit: '500g',  cal: 81,  protein: 5.4, fiber: 5.5 },
    { name: 'Cabbage',      price: 25,  unit: '500g',  cal: 25,  protein: 1.3, fiber: 2.5 },
    { name: 'Cauliflower',  price: 35,  unit: '500g',  cal: 25,  protein: 1.9, fiber: 2.0 },
    { name: 'Potato',       price: 25,  unit: '500g',  cal: 77,  protein: 2.0, fiber: 2.2 },
    { name: 'Sweet Potato', price: 45,  unit: '500g',  cal: 86,  protein: 1.6, fiber: 3.0 },
    { name: 'Eggplant',     price: 30,  unit: '1 pc',  cal: 25,  protein: 1.0, fiber: 3.0 },
    { name: 'Zucchini',     price: 50,  unit: '500g',  cal: 17,  protein: 1.2, fiber: 1.1 },
    { name: 'Beetroot',     price: 40,  unit: '500g',  cal: 43,  protein: 1.6, fiber: 2.8 },
    { name: 'Bottle Gourd', price: 20,  unit: '1 pc',  cal: 14,  protein: 0.6, fiber: 0.5 },
    { name: 'Bitter Gourd', price: 35,  unit: '500g',  cal: 17,  protein: 1.0, fiber: 2.8 },
    { name: 'Drumstick',    price: 30,  unit: '250g',  cal: 37,  protein: 2.1, fiber: 3.2 },
    { name: 'Coriander',    price: 10,  unit: 'bunch', cal: 23,  protein: 2.1, fiber: 2.8 },
    { name: 'Mint',         price: 10,  unit: 'bunch', cal: 70,  protein: 3.8, fiber: 8.0 },
  ],
  fruits: [
    { name: 'Banana',       price: 40,  unit: '6 pcs', cal: 89,  protein: 1.1, fiber: 2.6 },
    { name: 'Apple',        price: 80,  unit: '4 pcs', cal: 52,  protein: 0.3, fiber: 2.4 },
    { name: 'Mango',        price: 60,  unit: '2 pcs', cal: 60,  protein: 0.8, fiber: 1.6 },
    { name: 'Papaya',       price: 40,  unit: '1 pc',  cal: 43,  protein: 0.5, fiber: 1.7 },
    { name: 'Guava',        price: 30,  unit: '4 pcs', cal: 68,  protein: 2.6, fiber: 5.4 },
    { name: 'Orange',       price: 60,  unit: '4 pcs', cal: 47,  protein: 0.9, fiber: 2.4 },
    { name: 'Watermelon',   price: 30,  unit: '1 kg',  cal: 30,  protein: 0.6, fiber: 0.4 },
    { name: 'Pomegranate',  price: 80,  unit: '2 pcs', cal: 83,  protein: 1.7, fiber: 4.0 },
    { name: 'Grapes',       price: 80,  unit: '500g',  cal: 69,  protein: 0.7, fiber: 0.9 },
    { name: 'Pineapple',    price: 50,  unit: '1 pc',  cal: 50,  protein: 0.5, fiber: 1.4 },
    { name: 'Strawberry',   price: 120, unit: '250g',  cal: 32,  protein: 0.7, fiber: 2.0 },
    { name: 'Kiwi',         price: 100, unit: '4 pcs', cal: 61,  protein: 1.1, fiber: 3.0 },
    { name: 'Pear',         price: 80,  unit: '3 pcs', cal: 57,  protein: 0.4, fiber: 3.1 },
    { name: 'Chikoo',       price: 40,  unit: '4 pcs', cal: 83,  protein: 0.4, fiber: 5.3 },
    { name: 'Lychee',       price: 80,  unit: '250g',  cal: 66,  protein: 0.8, fiber: 1.3 },
    { name: 'Coconut',      price: 40,  unit: '1 pc',  cal: 354, protein: 3.3, fiber: 9.0 },
    { name: 'Amla',         price: 30,  unit: '250g',  cal: 44,  protein: 0.9, fiber: 3.4 },
    { name: 'Jackfruit',    price: 50,  unit: '500g',  cal: 95,  protein: 1.7, fiber: 1.5 },
    { name: 'Plum',         price: 80,  unit: '500g',  cal: 46,  protein: 0.7, fiber: 1.4 },
    { name: 'Fig',          price: 100, unit: '250g',  cal: 74,  protein: 0.8, fiber: 2.9 },
    { name: 'Dates',        price: 120, unit: '250g',  cal: 277, protein: 1.8, fiber: 6.7 },
    { name: 'Blueberries',  price: 200, unit: '125g',  cal: 57,  protein: 0.7, fiber: 2.4 },
  ],
  grains: [
    { name: 'Brown Rice',     price: 90,  unit: '1 kg',  cal: 216, protein: 5.0, fiber: 3.5  },
    { name: 'Oats',           price: 80,  unit: '500g',  cal: 389, protein: 17,  fiber: 10.6 },
    { name: 'Quinoa',         price: 200, unit: '500g',  cal: 368, protein: 14,  fiber: 7.0  },
    { name: 'Moong Dal',      price: 100, unit: '500g',  cal: 347, protein: 24,  fiber: 7.6  },
    { name: 'Chana Dal',      price: 90,  unit: '500g',  cal: 364, protein: 22,  fiber: 12.2 },
    { name: 'Masoor Dal',     price: 80,  unit: '500g',  cal: 353, protein: 26,  fiber: 10.7 },
    { name: 'Toor Dal',       price: 100, unit: '500g',  cal: 335, protein: 22,  fiber: 15.0 },
    { name: 'Rajma',          price: 100, unit: '500g',  cal: 337, protein: 22,  fiber: 15.2 },
    { name: 'Chickpeas',      price: 90,  unit: '500g',  cal: 364, protein: 19,  fiber: 17.4 },
    { name: 'Whole Wheat',    price: 50,  unit: '1 kg',  cal: 340, protein: 13,  fiber: 10.7 },
    { name: 'Jowar',          price: 60,  unit: '1 kg',  cal: 329, protein: 10,  fiber: 6.3  },
    { name: 'Bajra',          price: 50,  unit: '1 kg',  cal: 361, protein: 11,  fiber: 11.5 },
    { name: 'Ragi',           price: 70,  unit: '500g',  cal: 328, protein: 7.3, fiber: 11.5 },
    { name: 'Poha',           price: 50,  unit: '500g',  cal: 130, protein: 2.6, fiber: 0.7  },
    { name: 'Semolina',       price: 40,  unit: '500g',  cal: 360, protein: 13,  fiber: 3.9  },
    { name: 'Barley',         price: 70,  unit: '500g',  cal: 354, protein: 12,  fiber: 17.3 },
    { name: 'Corn',           price: 30,  unit: '2 pcs', cal: 86,  protein: 3.2, fiber: 2.4  },
    { name: 'Black Beans',    price: 100, unit: '500g',  cal: 341, protein: 21,  fiber: 15.5 },
    { name: 'Soybean',        price: 80,  unit: '500g',  cal: 446, protein: 36,  fiber: 9.3  },
    { name: 'Makhana',        price: 150, unit: '200g',  cal: 347, protein: 9.7, fiber: 14.5 },
    { name: 'Vermicelli',     price: 40,  unit: '500g',  cal: 353, protein: 11,  fiber: 3.2  },
    { name: 'Bread (Brown)',  price: 50,  unit: 'loaf',  cal: 247, protein: 13,  fiber: 6.8  },
  ],
  proteins: [
    { name: 'Eggs',           price: 80,  unit: '6 pcs', cal: 155, protein: 13,  fiber: 0   },
    { name: 'Paneer',         price: 100, unit: '200g',  cal: 265, protein: 18,  fiber: 0   },
    { name: 'Tofu',           price: 80,  unit: '300g',  cal: 76,  protein: 8.1, fiber: 0.3 },
    { name: 'Chicken Breast', price: 150, unit: '500g',  cal: 165, protein: 31,  fiber: 0   },
    { name: 'Fish (Rohu)',    price: 150, unit: '500g',  cal: 97,  protein: 20,  fiber: 0   },
    { name: 'Curd',           price: 50,  unit: '500g',  cal: 98,  protein: 11,  fiber: 0   },
    { name: 'Milk',           price: 60,  unit: '1 L',   cal: 61,  protein: 3.2, fiber: 0   },
    { name: 'Moong Sprouts',  price: 30,  unit: '250g',  cal: 105, protein: 14,  fiber: 1.8 },
    { name: 'Peanuts',        price: 60,  unit: '250g',  cal: 567, protein: 26,  fiber: 8.5 },
    { name: 'Almonds',        price: 150, unit: '100g',  cal: 579, protein: 21,  fiber: 12.5},
    { name: 'Walnuts',        price: 200, unit: '100g',  cal: 654, protein: 15,  fiber: 6.7 },
    { name: 'Cashews',        price: 180, unit: '100g',  cal: 553, protein: 18,  fiber: 3.3 },
    { name: 'Chickpea Flour', price: 60,  unit: '500g',  cal: 387, protein: 22,  fiber: 10.8},
    { name: 'Tuna (canned)',  price: 120, unit: '185g',  cal: 116, protein: 26,  fiber: 0   },
    { name: 'Salmon',         price: 300, unit: '500g',  cal: 208, protein: 20,  fiber: 0   },
    { name: 'Greek Yogurt',   price: 120, unit: '400g',  cal: 59,  protein: 10,  fiber: 0   },
    { name: 'Tempeh',         price: 100, unit: '250g',  cal: 193, protein: 19,  fiber: 9.0 },
    { name: 'Mutton',         price: 400, unit: '500g',  cal: 294, protein: 25,  fiber: 0   },
    { name: 'Whey Protein',   price: 500, unit: '1 kg',  cal: 400, protein: 80,  fiber: 1.0 },
    { name: 'Cheese Slice',   price: 80,  unit: '10 pcs',cal: 313, protein: 20,  fiber: 0   },
  ],
  chocolates: [
    { name: 'Dark Chocolate 70%', price: 120, unit: '100g',  cal: 598, protein: 7.8, fiber: 10.9 },
    { name: 'Dark Chocolate 85%', price: 150, unit: '100g',  cal: 630, protein: 9.0, fiber: 12.5 },
    { name: 'Protein Bar',        price: 100, unit: '1 bar', cal: 200, protein: 20,  fiber: 5.0  },
    { name: 'Granola Bar',        price: 60,  unit: '2 bars',cal: 193, protein: 4.0, fiber: 3.5  },
    { name: 'Peanut Butter',      price: 180, unit: '350g',  cal: 588, protein: 25,  fiber: 6.0  },
    { name: 'Almond Butter',      price: 300, unit: '250g',  cal: 614, protein: 21,  fiber: 10.5 },
    { name: 'Roasted Chana',      price: 40,  unit: '200g',  cal: 364, protein: 19,  fiber: 12.2 },
    { name: 'Trail Mix',          price: 150, unit: '200g',  cal: 462, protein: 13,  fiber: 5.3  },
    { name: 'Rice Cakes',         price: 80,  unit: '100g',  cal: 387, protein: 8.0, fiber: 2.0  },
    { name: 'Oat Cookies',        price: 60,  unit: '6 pcs', cal: 450, protein: 6.0, fiber: 3.8  },
    { name: 'Multigrain Biscuit', price: 40,  unit: '1 pack',cal: 480, protein: 8.0, fiber: 4.5  },
    { name: 'Coconut Ladoo',      price: 80,  unit: '6 pcs', cal: 354, protein: 3.3, fiber: 9.0  },
    { name: 'Dates & Nuts Bar',   price: 120, unit: '2 bars',cal: 320, protein: 5.0, fiber: 6.5  },
    { name: 'Foxnuts (Makhana)',  price: 100, unit: '100g',  cal: 347, protein: 9.7, fiber: 14.5 },
    { name: 'Choco Almonds',      price: 200, unit: '100g',  cal: 520, protein: 11,  fiber: 7.0  },
    { name: 'Honey',              price: 180, unit: '500g',  cal: 304, protein: 0.3, fiber: 0.2  },
    { name: 'Jaggery',            price: 60,  unit: '500g',  cal: 383, protein: 0.4, fiber: 0    },
    { name: 'Dry Fruits Mix',     price: 250, unit: '200g',  cal: 490, protein: 10,  fiber: 7.2  },
    { name: 'Greek Yogurt Bar',   price: 80,  unit: '1 bar', cal: 150, protein: 8.0, fiber: 2.0  },
    { name: 'Chia Pudding Mix',   price: 200, unit: '200g',  cal: 486, protein: 17,  fiber: 34.4 },
  ],
};

const colorMap = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', activeBorder: 'border-emerald-400' },
  red:     { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     badge: 'bg-red-100 text-red-700',         activeBorder: 'border-red-400'     },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700',     activeBorder: 'border-amber-400'   },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    badge: 'bg-blue-100 text-blue-700',       activeBorder: 'border-blue-400'    },
  purple:  { bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  badge: 'bg-purple-100 text-purple-700',   activeBorder: 'border-purple-400'  },
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const STORAGE_KEY = 'ecofit_cart';

const BudgetMealPlanner = () => {
  const [budget, setBudget] = useState('');
  const [selectedCats, setSelectedCats] = useState({ veggies: true, fruits: false, grains: false, proteins: false, chocolates: false });
  const [generatedList, setGeneratedList] = useState({});
  const [lockedItems, setLockedItems] = useState({});
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });
  const [activeTab, setActiveTab] = useState('planner');
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const toggleCat = (id) => setSelectedCats(prev => ({ ...prev, [id]: !prev[id] }));

  const generateList = () => {
    if (!budget || Number(budget) < 100) return;
    const activeCats = CATEGORIES.filter(c => selectedCats[c.id]);
    if (!activeCats.length) return;

    const budgetPerCat = Math.floor(Number(budget) / activeCats.length);
    const result = {};

    for (const cat of activeCats) {
      let remaining = budgetPerCat;
      const locked = Object.keys(lockedItems).filter(k => k.startsWith(cat.id + '-') && lockedItems[k]);
      const lockedObjs = locked.map(k => {
        const name = k.replace(cat.id + '-', '');
        return ALL_ITEMS[cat.id].find(i => i.name === name);
      }).filter(Boolean);

      const lockedCost = lockedObjs.reduce((a, i) => a + i.price, 0);
      remaining -= lockedCost;

      const unlocked = shuffle(ALL_ITEMS[cat.id].filter(i => !locked.includes(cat.id + '-' + i.name)));
      const newItems = [];
      for (const item of unlocked) {
        if (remaining >= item.price) { newItems.push(item); remaining -= item.price; }
        if (lockedObjs.length + newItems.length >= 8) break;
      }
      result[cat.id] = [...lockedObjs, ...newItems];
    }

    setGeneratedList(result);
    setGenerated(true);
  };

  const toggleLock = (catId, itemName) => {
    const key = `${catId}-${itemName}`;
    setLockedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addToCart = (item, catId) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    const exists = cart.find(c => c.name === item.name);
    if (!exists) {
      setCart(prev => [...prev, { ...item, catEmoji: cat.emoji, catId }]);
    }
  };

  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((a, i) => a + i.price, 0);
  const cartNutrition = cart.reduce((a, i) => ({ protein: a.protein + i.protein, fiber: a.fiber + i.fiber, cal: a.cal + i.cal }), { protein: 0, fiber: 0, cal: 0 });

  const listTotal = Object.values(generatedList).flat().reduce((a, i) => a + i.price, 0);

  return (
    <div className="px-8 py-6 space-y-5">

      {/* Header + Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <ShoppingCart className="text-amber-600" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Budget Meal Planner</h3>
            <p className="text-sm text-gray-500">Smart grocery list within your ₹ budget</p>
          </div>
        </div>
        <div className="flex gap-2">
          {['planner', 'cart'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                activeTab === tab ? 'bg-amber-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {tab === 'cart' ? `🛒 Cart (${cart.length})` : '📋 Planner'}
            </button>
          ))}
        </div>
      </div>

      {/* ── PLANNER TAB ── */}
      {activeTab === 'planner' && (
        <>
          {/* Step 1 Budget */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Step 1 — Weekly Budget</p>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Budget (₹)</label>
                <input type="number" value={budget} onChange={e => setBudget(e.target.value)}
                  style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-lg font-bold"
                  placeholder="e.g. 2000" />
              </div>
              <div className="text-right pb-1">
                <p className="text-xs text-gray-400">per week</p>
                <p className="text-sm font-semibold text-amber-600">≈ ₹{budget ? Math.round(Number(budget)/7) : 0}/day</p>
              </div>
            </div>
          </div>

          {/* Step 2 Categories */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Step 2 — Pick Categories</p>
            <div className="grid grid-cols-5 gap-3">
              {CATEGORIES.map(cat => {
                const c = colorMap[cat.color];
                const active = selectedCats[cat.id];
                return (
                  <button key={cat.id} onClick={() => toggleCat(cat.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                      active ? `${c.bg} ${c.activeBorder} ${c.text}` : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
                    }`}>
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-xs text-center leading-tight">{cat.label}</span>
                    {active && <span className="text-xs font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button onClick={generateList}
            disabled={!budget || !Object.values(selectedCats).some(Boolean)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
            <RefreshCw size={18} />
            {generated ? 'Regenerate List (locked items stay)' : 'Generate My Smart List'}
          </button>

          {/* Generated Results */}
          {generated && (
            <>
              {/* Summary bar */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Budget', val: `₹${Number(budget).toLocaleString()}`, color: 'text-gray-900' },
                  { label: 'List Total', val: `₹${listTotal.toLocaleString()}`, color: 'text-emerald-600' },
                  { label: 'Remaining', val: `₹${(Number(budget) - listTotal).toLocaleString()}`, color: 'text-amber-600' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Hint */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-2">
                <Lock size={14} className="text-blue-500 flex-shrink-0" />
                <p className="text-xs text-blue-600 font-medium">
                  🔒 Lock items you like → regenerate swaps only unlocked ones · 🛒 Add to Cart saves items permanently
                </p>
              </div>

              {/* Items by Category */}
              {CATEGORIES.filter(c => generatedList[c.id]?.length > 0).map(cat => {
                const c = colorMap[cat.color];
                return (
                  <div key={cat.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className={`px-5 py-3 ${c.bg} border-b ${c.border} flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{cat.emoji}</span>
                        <span className={`font-bold text-sm ${c.text}`}>{cat.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{generatedList[cat.id].length} items</span>
                      </div>
                      <span className={`text-sm font-bold ${c.text}`}>₹{generatedList[cat.id].reduce((a, i) => a + i.price, 0)}</span>
                    </div>

                    <div className="divide-y divide-gray-50">
                      {generatedList[cat.id].map(item => {
                        const key = `${cat.id}-${item.name}`;
                        const isLocked = lockedItems[key];
                        const inCart = cart.some(c => c.name === item.name);
                        return (
                          <div key={key} className={`flex items-center justify-between px-5 py-3 transition-all ${isLocked ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                            <div className="flex items-center gap-3 flex-1">
                              <button onClick={() => toggleLock(cat.id, item.name)}
                                className={`flex-shrink-0 transition-colors ${isLocked ? 'text-amber-500' : 'text-gray-200 hover:text-gray-400'}`}
                                title={isLocked ? 'Unlock item' : 'Lock item'}>
                                {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                              </button>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{item.name}
                                  {isLocked && <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-medium">locked</span>}
                                </p>
                                <p className="text-xs text-gray-400">{item.unit}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-xs text-gray-500 text-right space-y-0.5">
                                <p>🔥 {item.cal} cal</p>
                                <p>💪 {item.protein}g protein · 🌿 {item.fiber}g fiber</p>
                              </div>
                              <p className="text-sm font-bold text-amber-600 w-12 text-right">₹{item.price}</p>
                              <button onClick={() => addToCart(item, cat.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                  inCart ? 'bg-green-100 text-green-600 cursor-default' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                }`}>
                                {inCart ? '✓ Added' : '+ Cart'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}

      {/* ── CART TAB ── */}
      {activeTab === 'cart' && (
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
              <ShoppingCart size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-300 text-sm mt-1">Go to Planner and add items 🛒</p>
            </div>
          ) : (
            <>
              {/* Cart Summary */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Items', val: cart.length, color: 'text-gray-900' },
                  { label: 'Total Cost', val: `₹${cartTotal}`, color: 'text-amber-600' },
                  { label: 'Protein', val: `${cartNutrition.protein.toFixed(0)}g`, color: 'text-blue-600' },
                  { label: 'Fiber', val: `${cartNutrition.fiber.toFixed(0)}g`, color: 'text-emerald-600' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-700">Saved Items</span>
                  <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 font-medium flex items-center gap-1">
                    <Trash2 size={13} /> Clear All
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {cart.map(item => (
                    <div key={item.name} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.catEmoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.unit} · 🔥{item.cal}cal · 💪{item.protein}g · 🌿{item.fiber}g</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold text-amber-600">₹{item.price}</p>
                        <button onClick={() => removeFromCart(item.name)} className="text-gray-300 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetMealPlanner;
