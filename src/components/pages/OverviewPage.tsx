import React, { useState } from 'react';
import {
  GraduationCap,
  BrainCircuit,
  Code2,
  FolderGit2,
  Flame,
  Award,
  Clock,
  TrendingUp,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export const OverviewPage: React.FC = () => {
  const {
    data,
    metrics,
    setCurrentPage,
    toggleTask,
    addTask,
    setQuickAddOpen,
  } = useApp();

  const [newTaskInput, setNewTaskInput] = useState('');
  const [quickPriority, setQuickPriority] = useState<'high' | 'medium' | 'low'>('high');

  const todayStr = new Date().toISOString().split('T')[0];

  // Handle inline quick task creation
  const handleQuickAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    addTask({
      title: newTaskInput.trim(),
      completed: false,
      priority: quickPriority,
      category: 'personal',
      dueDate: todayStr,
      isTopPriority: quickPriority === 'high',
    });
    setNewTaskInput('');
  };

  // Generate weekly chart data from real journal entries
  const weeklyData = [6, 5, 4, 3, 2, 1, 0].map(daysAgo => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const dateKey = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const entry = data.journalEntries[dateKey];
    return {
      day: dayName,
      hours: entry ? entry.studyHours : 0,
      productivity: entry ? entry.productivityScore * 10 : 0,
    };
  });

  // Generate 16-week GitHub-style heatmap data
  const heatmapDays = Array.from({ length: 112 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (111 - idx));
    const dateKey = d.toISOString().split('T')[0];
    const entry = data.journalEntries[dateKey];
    let level = 0;
    if (entry) {
      if (entry.studyHours >= 5) level = 4;
      else if (entry.studyHours >= 3.5) level = 3;
      else if (entry.studyHours >= 2) level = 2;
      else if (entry.studyHours > 0) level = 1;
    }
    return {
      date: dateKey,
      level,
      hours: entry?.studyHours || 0,
    };
  });

  const levelColors = [
    'bg-slate-800/40 hover:bg-slate-700/60',
    'bg-purple-950/60 hover:bg-purple-900 border border-purple-800/30',
    'bg-purple-800 hover:bg-purple-700',
    'bg-indigo-600 hover:bg-indigo-500',
    'bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_8px_#22d3ee]',
  ];

  const topPriorities = data.tasks.filter(t => t.isTopPriority || t.priority === 'high').slice(0, 3);
  const todaysTasks = data.tasks.filter(t => t.dueDate === todayStr || !t.dueDate);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Welcome Banner */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-[#131929] to-cyan-950/30 border border-purple-500/20 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Digital Command Centre</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {data.profile.name} 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              "{data.profile.subtitle}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-md">
              <Flame className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-300 uppercase font-bold">Streak</p>
                <p className="text-sm font-bold text-white">{metrics.currentStreak} Days</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('journal')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Daily Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Eight Core Summary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* CGPA */}
        <Card glow="purple" className="p-4" onClick={() => setCurrentPage('academics')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Current CGPA</span>
            <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.currentCgpa > 0 ? metrics.currentCgpa.toFixed(2) : 'N/A'}
            </span>
            <span className="text-xs text-slate-300">/ 10.0</span>
          </div>
          <p className="text-[11px] text-purple-300 mt-1">
            Target: {data.profile.targetCgpa} · Sem {data.profile.currentSemester}
          </p>
        </Card>

        {/* Total Skills */}
        <Card glow="blue" className="p-4" onClick={() => setCurrentPage('skills')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Skills In Progress</span>
            <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.skillsLearningCount}
            </span>
            <span className="text-xs text-slate-300">active</span>
          </div>
          <p className="text-[11px] text-blue-300 mt-1">
            {data.skills.length} total technical skills
          </p>
        </Card>

        {/* GATE Prep */}
        <Card glow="purple" className="p-4" onClick={() => setCurrentPage('gate')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">GATE Preparation</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.gateProgressPercent}%
            </span>
            <span className="text-xs text-slate-300">syllabus</span>
          </div>
          <p className="text-[11px] text-indigo-300 mt-1">
            GATE {data.gateSettings.targetYear} ({data.gateSettings.paper})
          </p>
        </Card>

        {/* DSA Problems */}
        <Card glow="cyan" className="p-4" onClick={() => setCurrentPage('dsa')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">DSA Solved</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.dsaSolvedCount}
            </span>
            <span className="text-xs text-slate-300">/ {data.dsaTargetCount}</span>
          </div>
          <p className="text-[11px] text-cyan-300 mt-1">
            {Math.round((metrics.dsaSolvedCount / (data.dsaTargetCount || 1)) * 100)}% of goal
          </p>
        </Card>

        {/* Active Projects */}
        <Card glow="purple" className="p-4" onClick={() => setCurrentPage('projects')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Active Projects</span>
            <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.activeProjectsCount}
            </span>
            <span className="text-xs text-slate-300">in progress</span>
          </div>
          <p className="text-[11px] text-amber-300 mt-1">
            {data.projects.filter(p => p.status === 'Completed').length} shipped
          </p>
        </Card>

        {/* Streak */}
        <Card glow="blue" className="p-4" onClick={() => setCurrentPage('journal')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Current Streak</span>
            <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.currentStreak}
            </span>
            <span className="text-xs text-slate-300">days</span>
          </div>
          <p className="text-[11px] text-rose-300 mt-1">Daily consistency</p>
        </Card>

        {/* Daily Productivity Score */}
        <Card glow="cyan" className="p-4" onClick={() => setCurrentPage('journal')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Today's Score</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.todayProductivityScore}%
            </span>
          </div>
          <p className="text-[11px] text-emerald-300 mt-1">
            {metrics.todayCompletedTasks}/{metrics.todayTotalTasks} tasks completed
          </p>
        </Card>

        {/* Total Study Hours */}
        <Card glow="purple" className="p-4" onClick={() => setCurrentPage('analytics')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Total Study Hours</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {metrics.totalStudyHours}
            </span>
            <span className="text-xs text-slate-300">hrs</span>
          </div>
          <p className="text-[11px] text-indigo-300 mt-1">Across all tracks</p>
        </Card>
      </div>

      {/* 3. Today's Focus & Priorities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Priorities & Task Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Today's Focus & Top Priorities
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Keep your core objectives front and center
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">
                  {metrics.todayCompletedTasks} / {metrics.todayTotalTasks} Done
                </span>
                <span className="w-16">
                  <ProgressBar
                    value={metrics.todayTotalTasks > 0 ? (metrics.todayCompletedTasks / metrics.todayTotalTasks) * 100 : 0}
                    size="sm"
                    color="gradient"
                  />
                </span>
              </div>
            </div>

            {/* Top 3 Priorities banner */}
            {topPriorities.length > 0 && (
              <div className="mb-4 space-y-2">
                <p className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  Top Focus Items
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {topPriorities.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => toggleTask(item.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        item.completed
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-400 line-through'
                          : 'bg-purple-500/10 border-purple-500/30 text-white hover:border-purple-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[10px] text-purple-400">#0{idx + 1}</span>
                        {item.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                      <p className="font-medium line-clamp-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Task list with checkboxes */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {todaysTasks.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  No tasks scheduled for today. Add your priorities below!
                </div>
              ) : (
                todaysTasks.map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      task.completed
                        ? 'bg-white/[0.01] border-white/[0.04] text-slate-500'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-200 hover:border-white/[0.15]'
                    }`}
                  >
                    <div
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 hover:text-purple-400 shrink-0" />
                      )}
                      <span className={`text-xs font-medium truncate ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {task.dueTime && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.dueTime}
                        </span>
                      )}
                      <Badge
                        variant={
                          task.category === 'gate'
                            ? 'indigo'
                            : task.category === 'dsa'
                            ? 'cyan'
                            : task.category === 'college'
                            ? 'blue'
                            : task.category === 'ai'
                            ? 'purple'
                            : 'slate'
                        }
                      >
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Inline Quick Add Task */}
            <form onSubmit={handleQuickAddTask} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Quick-add task for today (press Enter)..."
                value={newTaskInput}
                onChange={e => setNewTaskInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
              <select
                value={quickPriority}
                onChange={e => setQuickPriority(e.target.value as any)}
                className="px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-slate-300"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </form>
          </Card>
        </div>

        {/* Right Col: Quick Access Actions */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-white mb-3 pb-2 border-b border-white/[0.08] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Quick Command Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCurrentPage('skills')}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-purple-500/10 hover:border-purple-500/30 text-left transition-all group"
              >
                <BrainCircuit className="w-4 h-4 text-purple-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-200">Add Skill</p>
                <p className="text-[10px] text-slate-300">Update matrix</p>
              </button>

              <button
                onClick={() => setCurrentPage('journal')}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-indigo-500/10 hover:border-indigo-500/30 text-left transition-all group"
              >
                <Clock className="w-4 h-4 text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-200">Log Study Hours</p>
                <p className="text-[10px] text-slate-300">Add daily hours</p>
              </button>

              <button
                onClick={() => setCurrentPage('gate')}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-blue-500/10 hover:border-blue-500/30 text-left transition-all group"
              >
                <GraduationCap className="w-4 h-4 text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-200">GATE Topic</p>
                <p className="text-[10px] text-slate-300">Mark revision</p>
              </button>

              <button
                onClick={() => setCurrentPage('academics')}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-emerald-500/10 hover:border-emerald-500/30 text-left transition-all group"
              >
                <BookOpen className="w-4 h-4 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-200">Record Result</p>
                <p className="text-[10px] text-slate-300">SGPA & Marks</p>
              </button>

              <button
                onClick={() => setCurrentPage('projects')}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-amber-500/10 hover:border-amber-500/30 text-left transition-all group"
              >
                <FolderGit2 className="w-4 h-4 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-200">Update Project</p>
                <p className="text-[10px] text-slate-300">Milestone status</p>
              </button>

              <button
                onClick={() => setCurrentPage('journal')}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-cyan-500/10 hover:border-cyan-500/30 text-left transition-all group"
              >
                <Calendar className="w-4 h-4 text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-200">Daily Journal</p>
                <p className="text-[10px] text-slate-300">Reflect & review</p>
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. Activity Overview Charts & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Productivity & Study Hours Chart */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Weekly Study Hours & Productivity
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Past 7 days performance metrics
              </p>
            </div>
            <Badge variant="purple">Last 7 Days</Badge>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#hoursGrad)"
                  name="Study Hours"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Timeline */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Recent Activity Timeline
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">Live event stream across workspace</p>
            </div>
            <span className="text-xs text-cyan-300 font-medium">Real-time</span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {data.activityTimeline.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No activities recorded yet.</p>
            ) : (
              data.activityTimeline.slice(0, 6).map((item, idx) => (
                <div key={item.id || idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0 shadow-[0_0_6px_#a855f7]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-200 truncate">{item.title}</p>
                      <span className="text-[10px] text-slate-300 shrink-0 ml-2">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">{item.action}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* 5. GitHub-style Activity Heatmap */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Daily Learning Consistency Heatmap
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              16-week study & habit contribution grid (similar to GitHub commits)
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
            <span>Less</span>
            {levelColors.map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[640px]">
            {heatmapDays.map((day, i) => (
              <div
                key={i}
                title={`${day.date}: ${day.hours} study hours logged`}
                className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 cursor-pointer ${
                  levelColors[day.level]
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
