// =============================================
// FILE: src/LoginPage.jsx
// REPLACE existing LoginPage.jsx in ecofit-app/src/
// =============================================

import React, { useState } from 'react';
import { Sprout, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('bro fill in both fields 💀');
      return;
    }
    if (password.length < 4) {
      setError('password too short bestie');
      return;
    }
    onLogin({ email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Sprout className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EcoFit</h1>
          <p className="text-emerald-600 font-semibold">&amp; BudgetBites</p>
          <p className="text-gray-500 text-sm mt-1">your planet loves you for this 🌱</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Welcome back!</h2>

          <div className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none text-base"
                placeholder="you@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{ backgroundColor: '#F9FAFB', color: '#111827' }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none text-base pr-12"
                  placeholder="min. 4 characters"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2">
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-md text-base mt-1"
            >
              Let's get it 🚀
            </button>

            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-center">
              <p className="text-xs text-gray-400 font-medium">Demo: any email + any password (4+ chars)</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
