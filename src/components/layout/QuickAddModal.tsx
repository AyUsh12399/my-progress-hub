import React, { useState } from 'react';
import {
  CheckSquare,
  BrainCircuit,
  Code2,
  FolderGit2,
  Target,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

type QuickAddType = 'task' | 'skill' | 'dsa' | 'project' | 'goal' | 'gateStudy';

export const QuickAddModal: React.FC = () => {
  const {
    isQuickAddOpen,
    setQuickAddOpen,
    addTask,
    addSkill,
    addDsaProblem,
    addProject,
    addGoal,
    data,
    updateGateTopic,
  } = useApp();

  const [activeTab, setActiveTab] = useState<QuickAddType>('task');

  // Task state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [taskCategory, setTaskCategory] = useState<'gate' | 'dsa' | 'college' | 'ai' | 'project' | 'personal'>('gate');
  const [taskDueTime, setTaskDueTime] = useState('');

  // Skill state
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('Programming');
  const [skillProficiency, setSkillProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [skillStatus, setSkillStatus] = useState<'Not Started' | 'Learning' | 'Practicing' | 'Completed'>('Learning');
  const [skillProgress, setSkillProgress] = useState(50);

  // DSA Problem state
  const [dsaTitle, setDsaTitle] = useState('');
  const [dsaPlatform, setDsaPlatform] = useState<'LeetCode' | 'GeeksforGeeks' | 'Codeforces' | 'Other'>('LeetCode');
  const [dsaTopic, setDsaTopic] = useState('Arrays');
  const [dsaDifficulty, setDsaDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [dsaApproach, setDsaApproach] = useState('');
  const [dsaUrl, setDsaUrl] = useState('');

  // Project state
  const [projTitle, setProjTitle] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const [projCategory, setProjCategory] = useState<'Personal' | 'Academic' | 'Internship' | 'Hackathon'>('Personal');
  const [projTech, setProjTech] = useState('');

  // Goal state
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Semester' | 'Annual' | 'Career'>('Weekly');
  const [goalPriority, setGoalPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [goalDeadline, setGoalDeadline] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );

  const resetForms = () => {
    setTaskTitle('');
    setSkillName('');
    setDsaTitle('');
    setProjTitle('');
    setProjDescription('');
    setProjTech('');
    setGoalTitle('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    if (activeTab === 'task') {
      if (!taskTitle.trim()) return;
      addTask({
        title: taskTitle.trim(),
        completed: false,
        priority: taskPriority,
        category: taskCategory,
        dueDate: today,
        dueTime: taskDueTime || undefined,
        isTopPriority: taskPriority === 'high',
      });
    } else if (activeTab === 'skill') {
      if (!skillName.trim()) return;
      addSkill({
        name: skillName.trim(),
        category: skillCategory,
        proficiency: skillProficiency,
        status: skillStatus,
        progress: skillProgress,
        startDate: today,
        targetDate: today,
        lastStudiedDate: today,
        resources: [],
        notes: '',
        associatedProjects: [],
      });
    } else if (activeTab === 'dsa') {
      if (!dsaTitle.trim()) return;
      addDsaProblem({
        title: dsaTitle.trim(),
        platform: dsaPlatform,
        topic: dsaTopic,
        difficulty: dsaDifficulty,
        approach: dsaApproach || undefined,
        url: dsaUrl || undefined,
        solvedDate: today,
        revisionStatus: 'Mastered',
      });
    } else if (activeTab === 'project') {
      if (!projTitle.trim()) return;
      addProject({
        title: projTitle.trim(),
        description: projDescription.trim() || 'Project overview and objectives.',
        category: projCategory,
        techStack: projTech ? projTech.split(',').map(s => s.trim()) : ['React', 'TypeScript'],
        status: 'In Progress',
        startDate: today,
        deadline: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        completionPercent: 10,
        milestones: [{ id: 'm1', title: 'Initial architecture & prototype', completed: false }],
      });
    } else if (activeTab === 'goal') {
      if (!goalTitle.trim()) return;
      addGoal({
        title: goalTitle.trim(),
        category: goalCategory,
        priority: goalPriority,
        deadline: goalDeadline,
        progressPercent: 0,
        status: 'In Progress',
        milestones: [{ id: 'gm1', title: 'Step 1 milestone', completed: false }],
      });
    }

    resetForms();
    setQuickAddOpen(false);
  };

  return (
    <Modal
      isOpen={isQuickAddOpen}
      onClose={() => setQuickAddOpen(false)}
      title="Quick Add to My Progress Hub"
      subtitle="Instantly capture a task, skill, problem, project, or milestone"
      maxWidth="lg"
    >
      {/* Tab selection */}
      <div className="grid grid-cols-5 gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06] text-xs">
        {[
          { id: 'task', label: 'Task', icon: CheckSquare },
          { id: 'skill', label: 'Skill', icon: BrainCircuit },
          { id: 'dsa', label: 'DSA', icon: Code2 },
          { id: 'project', label: 'Project', icon: FolderGit2 },
          { id: 'goal', label: 'Goal', icon: Target },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as QuickAddType)}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* TASK FORM */}
        {activeTab === 'task' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Task Title *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Solve 3 DP problems or Read OS Virtual Memory notes"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={taskCategory}
                  onChange={e => setTaskCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="gate">GATE Prep</option>
                  <option value="dsa">DSA & Coding</option>
                  <option value="college">College Academics</option>
                  <option value="ai">AI / ML Work</option>
                  <option value="project">Project Work</option>
                  <option value="personal">Personal Growth</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Priority</label>
                <select
                  value={taskPriority}
                  onChange={e => setTaskPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="high">High (Top Focus)</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Time (Optional)</label>
              <input
                type="time"
                value={taskDueTime}
                onChange={e => setTaskDueTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </>
        )}

        {/* SKILL FORM */}
        {activeTab === 'skill' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Skill Name *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. LangGraph, Docker, Rust, Graph Algorithms"
                value={skillName}
                onChange={e => setSkillName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={skillCategory}
                  onChange={e => setSkillCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Programming">Programming</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Development">Development</option>
                  <option value="Core CS">Core CS & Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Proficiency</label>
                <select
                  value={skillProficiency}
                  onChange={e => setSkillProficiency(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Current Progress</span>
                <span className="text-purple-400 font-bold">{skillProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={skillProgress}
                onChange={e => setSkillProgress(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </>
        )}

        {/* DSA FORM */}
        {activeTab === 'dsa' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Problem Title *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Subarray Sum Equals K"
                value={dsaTitle}
                onChange={e => setDsaTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Platform</label>
                <select
                  value={dsaPlatform}
                  onChange={e => setDsaPlatform(e.target.value as any)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
                >
                  <option value="LeetCode">LeetCode</option>
                  <option value="GeeksforGeeks">GFG</option>
                  <option value="Codeforces">Codeforces</option>
                  <option value="HackerRank">HackerRank</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Topic</label>
                <select
                  value={dsaTopic}
                  onChange={e => setDsaTopic(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
                >
                  <option value="Arrays">Arrays</option>
                  <option value="Strings">Strings</option>
                  <option value="Binary Search">Binary Search</option>
                  <option value="Dynamic Programming">Dynamic Programming</option>
                  <option value="Trees">Trees & BST</option>
                  <option value="Graphs">Graphs</option>
                  <option value="Recursion">Recursion</option>
                  <option value="Greedy">Greedy</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Difficulty</label>
                <select
                  value={dsaDifficulty}
                  onChange={e => setDsaDifficulty(e.target.value as any)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Approach / Pattern</label>
              <input
                type="text"
                placeholder="e.g. Prefix sum with hash map count"
                value={dsaApproach}
                onChange={e => setDsaApproach(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white focus:outline-none"
              />
            </div>
          </>
        )}

        {/* PROJECT FORM */}
        {activeTab === 'project' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Title *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. High-throughput Distributed Queue"
                value={projTitle}
                onChange={e => setProjTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
              <textarea
                rows={2}
                placeholder="Key goals, architecture and problems solved..."
                value={projDescription}
                onChange={e => setProjDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={projCategory}
                  onChange={e => setProjCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
                >
                  <option value="Personal">Personal</option>
                  <option value="Academic">Academic</option>
                  <option value="Internship">Internship</option>
                  <option value="Hackathon">Hackathon</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Go, gRPC, Redis, Docker"
                  value={projTech}
                  onChange={e => setProjTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
                />
              </div>
            </div>
          </>
        )}

        {/* GOAL FORM */}
        {activeTab === 'goal' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Goal Title *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Master Graph Theory & solve 40 PYQs"
                value={goalTitle}
                onChange={e => setGoalTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={goalCategory}
                  onChange={e => setGoalCategory(e.target.value as any)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
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
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Priority</label>
                <select
                  value={goalPriority}
                  onChange={e => setGoalPriority(e.target.value as any)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Date</label>
                <input
                  type="date"
                  value={goalDeadline}
                  onChange={e => setGoalDeadline(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
                />
              </div>
            </div>
          </>
        )}

        {/* Submit button */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => setQuickAddOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
          >
            Add to Dashboard
          </button>
        </div>
      </form>
    </Modal>
  );
};
