import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LockScreen: React.FC = () => {
  const { unlock, data } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlock(pin);
    if (!success) {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090d16] text-white p-4">
      <div className="relative w-full max-w-sm p-8 rounded-3xl bg-[#131929]/90 border border-white/[0.12] shadow-2xl backdrop-blur-xl text-center">
        {/* Glow behind */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1.5px] mx-auto mb-4 shadow-lg shadow-purple-500/30">
          <div className="w-full h-full bg-[#131929] rounded-[14px] flex items-center justify-center">
            <Lock className="w-7 h-7 text-purple-400" />
          </div>
        </div>

        <h2 className="text-xl font-bold tracking-tight mb-1">My Progress Hub</h2>
        <p className="text-xs text-slate-400 mb-6">
          Personal digital command centre for {data.profile.name}. Enter PIN to unlock.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            autoFocus
            type="password"
            maxLength={6}
            placeholder="Enter PIN"
            value={pin}
            onChange={e => {
              setPin(e.target.value);
              setError(false);
            }}
            className={`w-full py-3 px-4 text-center tracking-widest text-lg font-mono rounded-xl bg-white/[0.05] border ${
              error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/[0.12]'
            } text-white focus:outline-none focus:border-purple-500 transition-all`}
          />

          {error && <p className="text-xs text-rose-400 font-medium">Incorrect PIN code. Try again.</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <span>Unlock Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Local client-side encrypted storage</span>
        </div>
      </div>
    </div>
  );
};
