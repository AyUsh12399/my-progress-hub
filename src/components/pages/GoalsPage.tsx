import React, { useState, useMemo } from 'react';
import {
  Target,
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Trash2,
  Edit2,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Goal, GoalCategory, GoalPriority, GoalStatus } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

export const GoalsPage: React.FC = () => {
  const {
    data,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleGoalMilestone,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GoalCategory>('Weekly');
  const [priority, setPriority] = useState<GoalPriority>('High');
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [progressPercent, setProgressPercent] = useState(25);
  const [status, setStatus] = useState<GoalStatus>('In Progress');
  const [notes, setNotes] = useState('');

  const categories = ['All', 'Daily', 'Weekly', 'Monthly', 'Semester', 'Annual', 'Career'];

  const filteredGoals = useMemo(() => {
    return data.goals.filter(g => {
      const matchCat = categoryFilter === 'All' || g.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || g.status === statusFilter;
      return matchCat && matchStatus;
    });
  }, [data.goals, categoryFilter, statusFilter]);

  // Upcoming deadlines banner (goals due within 14 days)
  const upcomingGoals = useMemo(() => {
    return data.goals
      .filter(g => g.status !== 'Completed')
      .map(g => {
        const daysLeft = Math.ceil(
          (new Date(g.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
        return { ...g, daysLeft };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [data.goals]);

  const openAddModal = () => {
    setEditingGoal(null);
    setTitle('');
    setCategory('Weekly');
    setPriority('High');
    setDeadline(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
    setProgressPercent(10);
    setStatus('In Progress');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (g: Goal) => {
    setEditingGoal(g);
    setTitle(g.title);
    setCategory(g.category);
    setPriority(g.priority);
    setDeadline(g.deadline);
    setProgressPercent(g.progressPercent);
    setStatus(g.status);
    setNotes(g.notes || '');
    setIsModalOpen(true);
  };

  const handleMilestoneToggle = (goalId: string, milestoneId: string) => {
    toggleGoalMilestone(goalId, milestoneId);
    const targetGoal = data.goals.find(g => g.id === goalId);
    if (targetGoal) {
      const completedCount = targetGoal.milestones.filter(m =>
        m.id === milestoneId ? !m.completed : m.completed
      ).length;
      if (completedCount === targetGoal.milestones.length) {
        // Trigger confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingGoal) {
      updateGoal(editingGoal.id, {
        title: title.trim(),
        category,
        priority,
        deadline,
        progressPercent,
        status,
        notes: notes.trim() || undefined,
      });
    } else {
      addGoal({
        title: title.trim(),
        category,
        priority,
        deadline,
        progressPercent,
        status,
        milestones: [
          { id: 'gm1', title: 'Phase 1 milestones & requirements', completed: true },
          { id: 'gm2', title: 'Phase 2 execution & testing', completed: false },
        ],
        notes: notes.trim() || undefined,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-400" />
            Goals & Strategic Milestones
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Break big ambitions into Daily, Weekly, Semester, Annual and Career milestones
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* 2. Upcoming Deadlines Ticker */}
      {upcomingGoals.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-purple-950/30 to-[#131929] border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Upcoming Deadlines & Targets
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {upcomingGoals.slice(0, 3).map(g => (
              <div
                key={g.id}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-semibold text-white truncate">{g.title}</p>
                  <span className="text-[10px] text-slate-300">{g.category} Target</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    g.daysLeft <= 7
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {g.daysLeft <= 0 ? 'Due Today' : `${g.daysLeft}d left`}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 3. Filter Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-2 bg-[#131929]/50 rounded-2xl border border-white/[0.08]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === c
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-slate-300 w-full lg:w-auto"
        >
          <option value="All">All Statuses</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Not Started">Not Started</option>
          <option value="Deferred">Deferred</option>
        </select>
      </div>

      {/* 4. Goals Cards Grid */}
      {filteredGoals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals found"
          description="Create structured goals with actionable milestones and target dates."
          actionText="Add a Goal"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map(goal => (
            <Card key={goal.id} glow="purple" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="purple">{goal.category}</Badge>
                  <Badge
                    variant={
                      goal.priority === 'High'
                        ? 'rose'
                        : goal.priority === 'Medium'
                        ? 'amber'
                        : 'slate'
                    }
                  >
                    {goal.priority} Priority
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{goal.title}</h3>

                {/* Progress bar */}
                <div className="mb-4">
                  <ProgressBar
                    value={goal.progressPercent}
                    showLabel
                    size="sm"
                    color={goal.progressPercent === 100 ? 'emerald' : 'gradient'}
                  />
                </div>

                {/* Milestones checklist */}
                {goal.milestones && goal.milestones.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
                      Milestones
                    </span>
                    {goal.milestones.map(m => (
                      <div
                        key={m.id}
                        onClick={() => handleMilestoneToggle(goal.id, m.id)}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] cursor-pointer text-xs"
                      >
                        {m.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span className={`text-slate-300 ${m.completed ? 'line-through text-slate-500' : ''}`}>
                          {m.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {goal.notes && (
                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                    {goal.notes}
                  </p>
                )}
              </div>

              {/* Card Footer: Deadline & actions */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  Target: {goal.deadline}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(goal)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete goal "${goal.title}"?`)) {
                        deleteGoal(goal.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Goal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingGoal ? 'Edit Goal' : 'Define New Goal'}
        subtitle="Establish strategic deadlines and accountability checkpoints"
        maxWidth="md"
      >
        <form onSubmit={handleSaveGoal} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Title *</label>
            <input
              type="text"
              placeholder="e.g. Master Operating Systems & score 10/10 in GATE"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Semester">Semester</option>
                <option value="Annual">Annual</option>
                <option value="Career">Career</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Progress</span>
                <span className="text-purple-400 font-bold">{progressPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercent}
                onChange={e => setProgressPercent(Number(e.target.value))}
                className="w-full accent-purple-500 mt-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Context</label>
            <textarea
              rows={2}
              placeholder="Why this goal matters, reward upon completion..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
            >
              {editingGoal ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
