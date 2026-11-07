import React, { useState, useMemo } from 'react';
import {
  Code2,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit2,
  Flame,
  Target,
  CheckCircle2,
  RotateCcw,
  Layers,
  Calendar,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { DsaDifficulty, DsaPlatform, DsaProblem } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

const TOPICS_LIST = [
  'All',
  'Arrays',
  'Strings',
  'Binary Search',
  'Sorting',
  'Recursion',
  'Linked Lists',
  'Stacks & Queues',
  'Trees',
  'BST',
  'Graphs',
  'Greedy',
  'Dynamic Programming',
  'Backtracking',
  'Advanced Algorithms',
];

export const DsaPage: React.FC = () => {
  const { data, addDsaProblem, updateDsaProblem, deleteDsaProblem } = useApp();

  const [topicFilter, setTopicFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | DsaDifficulty>('All');
  const [revisionFilter, setRevisionFilter] = useState<'All' | 'Needs Review' | 'Mastered'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<DsaProblem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<DsaPlatform>('LeetCode');
  const [topic, setTopic] = useState('Arrays');
  const [difficulty, setDifficulty] = useState<DsaDifficulty>('Medium');
  const [url, setUrl] = useState('');
  const [approach, setApproach] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('O(N)');
  const [spaceComplexity, setSpaceComplexity] = useState('O(1)');
  const [revisionStatus, setRevisionStatus] = useState<'Needs Review' | 'Mastered'>('Mastered');
  const [notes, setNotes] = useState('');

  // Counts
  const { easyCount, mediumCount, hardCount, totalSolved } = useMemo(() => {
    let e = 0, m = 0, h = 0;
    data.dsaProblems.forEach(p => {
      if (p.difficulty === 'Easy') e++;
      if (p.difficulty === 'Medium') m++;
      if (p.difficulty === 'Hard') h++;
    });
    return { easyCount: e, mediumCount: m, hardCount: h, totalSolved: data.dsaProblems.length };
  }, [data.dsaProblems]);

  // Topic distribution for chart
  const topicDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    data.dsaProblems.forEach(p => {
      counts[p.topic] = (counts[p.topic] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
  }, [data.dsaProblems]);

  // Pie chart data for difficulty breakdown
  const difficultyData = [
    { name: 'Easy', value: easyCount, color: '#10b981' },
    { name: 'Medium', value: mediumCount, color: '#f59e0b' },
    { name: 'Hard', value: hardCount, color: '#f43f5e' },
  ];

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return data.dsaProblems.filter(p => {
      const matchTopic = topicFilter === 'All' || p.topic === topicFilter;
      const matchDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      const matchRev = revisionFilter === 'All' || p.revisionStatus === revisionFilter;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.approach && p.approach.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchDiff && matchRev && matchSearch;
    });
  }, [data.dsaProblems, topicFilter, difficultyFilter, revisionFilter, searchQuery]);

  const openAddModal = () => {
    setEditingProblem(null);
    setTitle('');
    setPlatform('LeetCode');
    setTopic('Arrays');
    setDifficulty('Medium');
    setUrl('');
    setApproach('');
    setTimeComplexity('O(N)');
    setSpaceComplexity('O(1)');
    setRevisionStatus('Mastered');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: DsaProblem) => {
    setEditingProblem(p);
    setTitle(p.title);
    setPlatform(p.platform);
    setTopic(p.topic);
    setDifficulty(p.difficulty);
    setUrl(p.url || '');
    setApproach(p.approach || '');
    setTimeComplexity(p.timeComplexity || 'O(N)');
    setSpaceComplexity(p.spaceComplexity || 'O(1)');
    setRevisionStatus(p.revisionStatus);
    setNotes(p.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingProblem) {
      updateDsaProblem(editingProblem.id, {
        title: title.trim(),
        platform,
        topic,
        difficulty,
        url: url.trim() || undefined,
        approach: approach.trim() || undefined,
        timeComplexity,
        spaceComplexity,
        revisionStatus,
        notes: notes.trim() || undefined,
      });
    } else {
      addDsaProblem({
        title: title.trim(),
        platform,
        topic,
        difficulty,
        url: url.trim() || undefined,
        approach: approach.trim() || undefined,
        timeComplexity,
        spaceComplexity,
        solvedDate: new Date().toISOString().split('T')[0],
        revisionStatus,
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
            <Code2 className="w-6 h-6 text-cyan-400" />
            DSA & Competitive Coding Workspace
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track solved problems, pattern approaches, complexities and revision schedules
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Solved Problem</span>
        </button>
      </div>

      {/* 2. Top Stats & Visual Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Solved Card */}
        <Card glow="cyan" className="p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-300 block mb-1">Total Solved</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">{totalSolved}</span>
              <span className="text-xs text-slate-300">/ {data.dsaTargetCount} Target</span>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar
              value={totalSolved}
              max={data.dsaTargetCount}
              showLabel
              size="md"
              color="cyan"
            />
          </div>
        </Card>

        {/* Easy / Med / Hard Badges */}
        <Card className="p-5 flex items-center justify-around">
          <div className="text-center">
            <span className="text-xs font-semibold text-emerald-400 block mb-1">Easy</span>
            <span className="text-2xl font-bold text-white">{easyCount}</span>
            <span className="text-[10px] text-slate-300 block">
              {totalSolved > 0 ? Math.round((easyCount / totalSolved) * 100) : 0}%
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/[0.08]" />
          <div className="text-center">
            <span className="text-xs font-semibold text-amber-400 block mb-1">Medium</span>
            <span className="text-2xl font-bold text-white">{mediumCount}</span>
            <span className="text-[10px] text-slate-300 block">
              {totalSolved > 0 ? Math.round((mediumCount / totalSolved) * 100) : 0}%
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/[0.08]" />
          <div className="text-center">
            <span className="text-xs font-semibold text-rose-400 block mb-1">Hard</span>
            <span className="text-2xl font-bold text-white">{hardCount}</span>
            <span className="text-[10px] text-slate-300 block">
              {totalSolved > 0 ? Math.round((hardCount / totalSolved) * 100) : 0}%
            </span>
          </div>
        </Card>

        {/* Topic Breakdown Bar Chart */}
        <Card className="p-4 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Top Solved Topics</span>
            <span className="text-[11px] text-slate-300">Distribution</span>
          </div>
          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicDistribution} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3. Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-2 bg-[#131929]/50 rounded-2xl border border-white/[0.08]">
        {/* Topic Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {TOPICS_LIST.slice(0, 8).map(top => (
            <button
              key={top}
              onClick={() => setTopicFilter(top)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                topicFilter === top
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {top}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <select
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-slate-300"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={revisionFilter}
            onChange={e => setRevisionFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-slate-300"
          >
            <option value="All">All Revisions</option>
            <option value="Mastered">Mastered</option>
            <option value="Needs Review">Needs Review</option>
          </select>

          {/* Search */}
          <div className="relative flex-1 lg:w-52">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search problem, pattern..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Solved Problems Table / List */}
      {filteredProblems.length === 0 ? (
        <EmptyState
          icon={Code2}
          title="No problems logged"
          description="Log problems as you solve them on LeetCode, Codeforces, or GeeksforGeeks."
          actionText="Log a Problem"
          onAction={openAddModal}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161c2e] border-b border-white/[0.08] text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Topic</th>
                  <th className="py-3 px-3">Difficulty</th>
                  <th className="py-3 px-3">Approach & Complexities</th>
                  <th className="py-3 px-3">Revision</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredProblems.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Title & Link */}
                    <td className="py-3 px-4 font-semibold text-white">
                      <div className="flex items-center gap-1.5">
                        <span>{p.title}</span>
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 hover:text-cyan-400"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {p.notes && <p className="text-[11px] text-slate-300 font-normal line-clamp-1">{p.notes}</p>}
                    </td>

                    {/* Platform */}
                    <td className="py-3 px-3 text-slate-300 font-medium">{p.platform}</td>

                    {/* Topic */}
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                        {p.topic}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          p.difficulty === 'Easy'
                            ? 'emerald'
                            : p.difficulty === 'Medium'
                            ? 'amber'
                            : 'rose'
                        }
                      >
                        {p.difficulty}
                      </Badge>
                    </td>

                    {/* Approach & Complexities */}
                    <td className="py-3 px-3">
                      <p className="text-slate-200 line-clamp-1">{p.approach || 'Standard approach'}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-300 font-mono mt-0.5">
                        <span>T: {p.timeComplexity || 'O(N)'}</span>
                        <span>S: {p.spaceComplexity || 'O(1)'}</span>
                      </div>
                    </td>

                    {/* Revision Status */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() =>
                          updateDsaProblem(p.id, {
                            revisionStatus:
                              p.revisionStatus === 'Mastered' ? 'Needs Review' : 'Mastered',
                          })
                        }
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                          p.revisionStatus === 'Mastered'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        {p.revisionStatus === 'Mastered' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <RotateCcw className="w-3 h-3" />
                        )}
                        <span>{p.revisionStatus}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06]"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteDsaProblem(p.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add / Edit Problem Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProblem ? `Edit Problem` : `Log Solved Problem`}
        subtitle="Record optimal approaches, complexities, and pattern recognition"
        maxWidth="md"
      >
        <form onSubmit={handleSaveProblem} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Title *</label>
            <input
              type="text"
              placeholder="e.g. Lowest Common Ancestor of a Binary Tree"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as any)}
                className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                <option value="LeetCode">LeetCode</option>
                <option value="GeeksforGeeks">GFG</option>
                <option value="Codeforces">Codeforces</option>
                <option value="HackerRank">HackerRank</option>
                <option value="CodeStudio">CodeStudio</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Topic</label>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                {TOPICS_LIST.filter(t => t !== 'All').map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as any)}
                className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Problem URL (Optional)</label>
            <input
              type="url"
              placeholder="https://leetcode.com/problems/..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Core Approach & Pattern</label>
            <input
              type="text"
              placeholder="e.g. Post-order DFS returning non-null target matches"
              value={approach}
              onChange={e => setApproach(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time Complexity</label>
              <input
                type="text"
                placeholder="e.g. O(N)"
                value={timeComplexity}
                onChange={e => setTimeComplexity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Space Complexity</label>
              <input
                type="text"
                placeholder="e.g. O(H)"
                value={spaceComplexity}
                onChange={e => setSpaceComplexity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Edge Cases</label>
            <textarea
              rows={2}
              placeholder="Edge cases encountered, overflow caveats..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
            >
              {editingProblem ? 'Save Changes' : 'Log Problem'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
