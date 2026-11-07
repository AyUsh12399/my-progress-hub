import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  GraduationCap,
  Code2,
  BookOpen,
  FolderGit2,
  CalendarDays,
  Library,
  Target,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Page } from '../../types';

interface NavItem {
  id: Page;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    isSidebarCollapsed,
    toggleSidebar,
    metrics,
    data,
  } = useApp();

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'skills',
      label: 'My Skills',
      icon: BrainCircuit,
      badge: metrics.skillsLearningCount > 0 ? metrics.skillsLearningCount : undefined,
      badgeColor: 'bg-purple-500/20 text-purple-300',
    },
    {
      id: 'gate',
      label: 'GATE Preparation',
      icon: GraduationCap,
      badge: `${metrics.gateProgressPercent}%`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300',
    },
    {
      id: 'dsa',
      label: 'DSA & Coding',
      icon: Code2,
      badge: metrics.dsaSolvedCount > 0 ? metrics.dsaSolvedCount : undefined,
      badgeColor: 'bg-cyan-500/20 text-cyan-300',
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: BookOpen,
      badge: metrics.currentCgpa > 0 ? `${metrics.currentCgpa}` : undefined,
      badgeColor: 'bg-emerald-500/20 text-emerald-300',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderGit2,
      badge: metrics.activeProjectsCount > 0 ? metrics.activeProjectsCount : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300',
    },
    { id: 'journal', label: 'Daily Activities', icon: CalendarDays },
    { id: 'courses', label: 'Courses & Resources', icon: Library },
    { id: 'goals', label: 'Goals & Milestones', icon: Target },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen border-r border-white/[0.08] bg-[#0c101c]/90 backdrop-blur-xl transition-all duration-300 select-none z-30 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.08]">
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/25">
              <div className="w-full h-full bg-[#0c101c] rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                My Progress Hub
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Command Centre
              </p>
            </div>
          </div>
        )}

        {isSidebarCollapsed && (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-[#0c101c] rounded-[10px] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          {!isSidebarCollapsed && (
            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
              Workspace
            </span>
          )}
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-white border border-purple-500/30 shadow-sm shadow-purple-500/10'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
              }`}
            >
              {/* Active glow indicator on left */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              )}

              <Icon
                className={`w-4 h-4 transition-colors shrink-0 ${
                  isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!isSidebarCollapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`ml-auto px-1.5 py-0.5 text-[11px] font-semibold rounded-md border border-white/[0.08] ${
                        item.badgeColor || 'bg-white/[0.06] text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Streak & Productivity Meter Mini-Card */}
      {!isSidebarCollapsed && (
        <div className="p-3 mx-3 mb-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Day Streak
            </span>
            <span className="font-bold text-amber-400">{metrics.currentStreak} Days</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-rose-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(100, metrics.currentStreak * 10)}%` }}
            />
          </div>
        </div>
      )}

      {/* User Profile Footer */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0c101c]">
        <div
          onClick={() => setCurrentPage('settings')}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-[#131929] rounded-full flex items-center justify-center font-bold text-xs text-white">
                {data.profile.name.charAt(0)}
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0c101c]" />
          </div>

          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                {data.profile.name}
              </p>
              <p className="text-[11px] text-slate-300 truncate">
                Sem {data.profile.currentSemester} · {data.profile.branch.split(' ')[0]}
              </p>
            </div>
          )}

          {!isSidebarCollapsed && (
            <Award className="w-4 h-4 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </aside>
  );
};
