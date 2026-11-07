import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  Flame,
  CheckCircle2,
  Circle,
  Plus,
  Save,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DailyJournalEntry } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const DailyJournalPage: React.FC = () => {
  const {
    data,
    saveDailyJournal,
    toggleHabitForDate,
    addCustomHabit,
    metrics,
  } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [isAddHabitModal, setIsAddHabitModal] = useState(false);
  const [customHabitName, setCustomHabitName] = useState('');
  const [customHabitCategory, setCustomHabitCategory] = useState('Growth');
  const [customHabitColor, setCustomHabitColor] = useState('#8b5cf6');

  // Form states loaded for selectedDate
  const currentEntry: DailyJournalEntry = data.journalEntries[selectedDate] || {
    date: selectedDate,
    studyHours: 0,
    productivityScore: 7,
    mood: 'Productive',
    whatStudied: '',
    whatCompleted: '',
    whatFailed: '',
    challenges: '',
    newLearnings: '',
    tomorrowPriorities: '',
    reflections: '',
    habits: {},
  };

  const [studyHours, setStudyHours] = useState(currentEntry.studyHours);
  const [productivityScore, setProductivityScore] = useState(currentEntry.productivityScore);
  const [mood, setMood] = useState(currentEntry.mood);
  const [whatStudied, setWhatStudied] = useState(currentEntry.whatStudied);
  const [whatCompleted, setWhatCompleted] = useState(currentEntry.whatCompleted);
  const [whatFailed, setWhatFailed] = useState(currentEntry.whatFailed);
  const [challenges, setChallenges] = useState(currentEntry.challenges);
  const [newLearnings, setNewLearnings] = useState(currentEntry.newLearnings);
  const [tomorrowPriorities, setTomorrowPriorities] = useState(currentEntry.tomorrowPriorities);
  const [reflections, setReflections] = useState(currentEntry.reflections);

  // Sync inputs when selectedDate changes
  useEffect(() => {
    const entry = data.journalEntries[selectedDate] || {
      date: selectedDate,
      studyHours: 0,
      productivityScore: 7,
      mood: 'Productive',
      whatStudied: '',
      whatCompleted: '',
      whatFailed: '',
      challenges: '',
      newLearnings: '',
      tomorrowPriorities: '',
      reflections: '',
      habits: {},
    };
    setStudyHours(entry.studyHours);
    setProductivityScore(entry.productivityScore);
    setMood(entry.mood);
    setWhatStudied(entry.whatStudied);
    setWhatCompleted(entry.whatCompleted);
    setWhatFailed(entry.whatFailed);
    setChallenges(entry.challenges);
    setNewLearnings(entry.newLearnings);
    setTomorrowPriorities(entry.tomorrowPriorities);
    setReflections(entry.reflections);
    setIsSavedAlert(false);
  }, [selectedDate, data.journalEntries]);

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    saveDailyJournal({
      date: selectedDate,
      studyHours: Number(studyHours),
      productivityScore: Number(productivityScore),
      mood,
      whatStudied,
      whatCompleted,
      whatFailed,
      challenges,
      newLearnings,
      tomorrowPriorities,
      reflections,
      habits: currentEntry.habits || {},
    });
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner & Date Selector */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-950/40 via-[#131929] to-indigo-950/30 border border-purple-500/20 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Daily Discipline & Deliberate Reflection</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Daily Activity & Personal Journal
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Log today's deep work hours, habits, technical obstacles and reflections
          </p>
        </div>

        {/* Date Selector with Next / Prev */}
        <div className="flex items-center gap-2 bg-white/[0.04] p-2 rounded-2xl border border-white/[0.08]">
          <button
            onClick={handlePrevDay}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06]"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs font-semibold text-white focus:outline-none"
          />

          <button
            onClick={handleNextDay}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06]"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600/40"
          >
            Today
          </button>
        </div>
      </div>

      {/* 2. Habit Tracker for Selected Date */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Daily Habit Tracker for {selectedDate}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Click any habit to toggle completion for this day
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              {metrics.currentStreak} Day Streak
            </span>

            <button
              onClick={() => setIsAddHabitModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-slate-300 hover:text-white flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Custom Habit</span>
            </button>
          </div>
        </div>

        {/* Habit Checkboxes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {data.habits.map(habit => {
            const isCompleted = currentEntry.habits?.[habit.id] || false;
            return (
              <div
                key={habit.id}
                onClick={() => toggleHabitForDate(selectedDate, habit.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-purple-600/20 border-purple-500/40 text-white shadow-sm shadow-purple-500/10'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">{habit.name}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">{habit.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3. Daily Reflection Journal Form */}
      <form onSubmit={handleSaveEntry}>
        <Card className="p-6 space-y-5">
          {/* Top Row: Hours, Score & Mood */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/[0.08]">
            {/* Study Hours */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Study & Deep Work Hours
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={studyHours}
                onChange={e => setStudyHours(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm font-semibold text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Productivity Score */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Productivity Score (1 - 10)
                </span>
                <span className="text-purple-400 font-bold">{productivityScore}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={productivityScore}
                onChange={e => setProductivityScore(Number(e.target.value))}
                className="w-full accent-purple-500 mt-2"
              />
            </div>

            {/* Mood selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Day's Mood & State</label>
              <div className="grid grid-cols-4 gap-1 text-xs">
                {(['Great', 'Productive', 'Challenging', 'Tired'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={`py-2 px-1 rounded-lg font-semibold transition-all text-center text-[11px] ${
                      mood === m
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white/[0.04] text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Journal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                1. What I Studied Today
              </label>
              <textarea
                rows={3}
                placeholder="Topics, chapters, papers, lectures covered..."
                value={whatStudied}
                onChange={e => setWhatStudied(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                2. What I Successfully Completed
              </label>
              <textarea
                rows={3}
                placeholder="Problems solved, code commits, tasks checked off..."
                value={whatCompleted}
                onChange={e => setWhatCompleted(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                3. What I Failed to Complete & Why
              </label>
              <textarea
                rows={3}
                placeholder="Pending items, distractions, delays..."
                value={whatFailed}
                onChange={e => setWhatFailed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                4. Technical Challenges Faced
              </label>
              <textarea
                rows={3}
                placeholder="Hard bugs, confusing proofs, complex edge cases..."
                value={challenges}
                onChange={e => setChallenges(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                5. New Concepts or Patterns Learned
              </label>
              <textarea
                rows={3}
                placeholder="Key insights, new syntax, architectural patterns..."
                value={newLearnings}
                onChange={e => setNewLearnings(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                6. Tomorrow's Top 3 Priorities
              </label>
              <textarea
                rows={3}
                placeholder="Must-win items for tomorrow morning..."
                value={tomorrowPriorities}
                onChange={e => setTomorrowPriorities(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Personal Reflections & Mindset
            </label>
            <textarea
              rows={2}
              placeholder="How do you feel about your pace and focus today?"
              value={reflections}
              onChange={e => setReflections(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Save Action */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            {isSavedAlert ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Journal saved to local storage!
              </span>
            ) : (
              <span className="text-xs text-slate-500">Auto-saved locally</span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              <span>Save Journal Entry</span>
            </button>
          </div>
        </Card>
      </form>

      {/* Add Custom Habit Modal */}
      <Modal
        isOpen={isAddHabitModal}
        onClose={() => setIsAddHabitModal(false)}
        title="Add Custom Daily Habit"
        subtitle="Track personal disciplines like System Design, Meditation, LeetCode"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Habit Name *</label>
            <input
              type="text"
              placeholder="e.g. System Design Reading"
              value={customHabitName}
              onChange={e => setCustomHabitName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <input
                type="text"
                placeholder="Growth"
                value={customHabitCategory}
                onChange={e => setCustomHabitCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Accent Color</label>
              <input
                type="color"
                value={customHabitColor}
                onChange={e => setCustomHabitColor(e.target.value)}
                className="w-full h-9 rounded-xl bg-slate-900 border border-white/[0.1] p-1 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsAddHabitModal(false)} className="px-3 py-1.5 text-xs text-slate-400">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!customHabitName.trim()) return;
                addCustomHabit(customHabitName.trim(), customHabitCategory.trim(), customHabitColor);
                setIsAddHabitModal(false);
                setCustomHabitName('');
              }}
              className="px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
            >
              Add Habit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
