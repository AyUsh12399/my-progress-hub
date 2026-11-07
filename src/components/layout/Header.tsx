import React from 'react';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Lock,
  Download,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportSummaryCSV } from '../../utils/storage';

export const Header: React.FC = () => {
  const {
    currentPage,
    theme,
    toggleTheme,
    setCommandPaletteOpen,
    setQuickAddOpen,
    setNotificationsOpen,
    lockApp,
    data,
  } = useApp();

  const pageTitles: Record<string, string> = {
    overview: 'Overview Dashboard',
    skills: 'Technical Skills Matrix',
    gate: 'GATE Preparation Workspace',
    dsa: 'DSA & Coding Practice',
    academics: 'B.Tech Academic Journey',
    projects: 'Engineering Projects',
    journal: 'Daily Activity & Reflection',
    courses: 'Resource Library',
    goals: 'Goals & Milestones',
    analytics: 'Analytics & Reports',
    settings: 'Workspace Settings',
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Count pending items for notifications
  const pendingTasksCount = data.tasks.filter(t => !t.completed).length;

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#090d16]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Active Section Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            {pageTitles[currentPage] || 'Dashboard'}
          </h2>
          <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-purple-400" />
            {todayFormatted}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        {/* Command Search button (Raycast style) */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-slate-400 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all w-48 sm:w-64"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search or jump to...</span>
          <kbd className="ml-auto hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded border border-white/[0.1] font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => setQuickAddOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quick Add</span>
        </button>

        {/* Quick Export CSV */}
        <button
          onClick={() => exportSummaryCSV(data)}
          title="Export CSV Summary"
          className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Notifications Center */}
        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {pendingTasksCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[#090d16]" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Optional Lock App */}
        {data.profile.pinCode && (
          <button
            onClick={lockApp}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
            title="Lock Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
