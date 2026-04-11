import React, { useEffect, useState } from 'react';

const VibeCloud = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // FIX BUG 3: Store the timer ID and clear it on unmount.
    // Previously the timeout was fire-and-forget. If the component
    // unmounted before 100ms (e.g. fast navigation), React would try
    // to call setVisible on an unmounted component → memory leak warning
    // and potential state corruption.
    const timerId = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timerId);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className="relative mx-8 mt-6 mb-2 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
      }}
    >
      {/* Cloud background with animated blobs */}
      <div className="relative bg-gradient-to-r from-violet-100 via-sky-100 to-emerald-100 rounded-3xl p-5 border border-violet-200 overflow-hidden shadow-sm">
        {/* Animated cloud blobs */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white rounded-full opacity-60 animate-pulse" />
        <div className="absolute -top-2 left-10 w-14 h-14 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute -top-3 right-16 w-16 h-16 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.9s' }} />

        {/* Content */}
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">☁️</span>
              <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">TL;DR — The Vibe Check</span>
            </div>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              ok bestie here's the lore 🧠 — you eat green stuff 🥦, app goes
              <span className="text-emerald-600 font-bold"> brrrr</span> predicting calories,
              veggies stop being expensive (kinda), you plant a virtual tree 🌳 and
              <span className="text-violet-600 font-bold"> feel like an eco girlboss/boyboss/theyboss</span>.
              no cap this site is basically a gym + farmers market + therapy session rolled into one fr fr 💅
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-lg leading-none mt-1"
            title="dismiss"
          >
            ✕
          </button>
        </div>

        {/* floating emoji particles */}
        <div className="absolute bottom-2 right-6 text-base opacity-30 animate-bounce" style={{ animationDelay: '0.2s' }}>🌿</div>
        <div className="absolute bottom-3 right-16 text-sm opacity-20 animate-bounce" style={{ animationDelay: '0.8s' }}>✨</div>
      </div>
    </div>
  );
};

export default VibeCloud;
