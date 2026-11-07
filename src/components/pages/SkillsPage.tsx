import React, { useState, useMemo } from 'react';
import {
  BrainCircuit,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit2,
  Trash2,
  BookOpen,
  Calendar,
  CheckCircle,
  FolderGit2,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Skill, SkillProficiency, SkillStatus } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

export const SkillsPage: React.FC = () => {
  const { data, addSkill, updateSkill, deleteSkill } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Programming');
  const [proficiency, setProficiency] = useState<SkillProficiency>('Intermediate');
  const [status, setStatus] = useState<SkillStatus>('Learning');
  const [progress, setProgress] = useState(50);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState(new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [associatedProjects, setAssociatedProjects] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');

  const categories = ['All', 'Programming', 'AI & Machine Learning', 'Development'];

  // Categories chart data
  const categoryStats = useMemo(() => {
    const cats = ['Programming', 'AI & Machine Learning', 'Development'];
    return cats.map(cat => {
      const skillsInCat = data.skills.filter(s => s.category === cat);
      const avgProgress = skillsInCat.length > 0
        ? Math.round(skillsInCat.reduce((acc, s) => acc + s.progress, 0) / skillsInCat.length)
        : 0;
      return {
        name: cat,
        count: skillsInCat.length,
        avgProgress,
      };
    });
  }, [data.skills]);

  // Filtered skills list
  const filteredSkills = useMemo(() => {
    return data.skills.filter(skill => {
      const matchesCategory = categoryFilter === 'All' || skill.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || skill.status === statusFilter;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.notes.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [data.skills, categoryFilter, statusFilter, searchQuery]);

  const openAddModal = () => {
    setEditingSkill(null);
    setName('');
    setCategory('Programming');
    setProficiency('Intermediate');
    setStatus('Learning');
    setProgress(50);
    setStartDate(new Date().toISOString().split('T')[0]);
    setTargetDate(new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0]);
    setNotes('');
    setAssociatedProjects('');
    setResourceTitle('');
    setResourceUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setCategory(skill.category);
    setProficiency(skill.proficiency);
    setStatus(skill.status);
    setProgress(skill.progress);
    setStartDate(skill.startDate);
    setTargetDate(skill.targetDate);
    setNotes(skill.notes);
    setAssociatedProjects(skill.associatedProjects.join(', '));
    setResourceTitle('');
    setResourceUrl('');
    setIsModalOpen(true);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const resources = editingSkill?.resources || [];
    if (resourceTitle.trim() && resourceUrl.trim()) {
      resources.push({
        id: `res_${Date.now()}`,
        title: resourceTitle.trim(),
        url: resourceUrl.trim(),
      });
    }

    const projectsList = associatedProjects
      ? associatedProjects.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    if (editingSkill) {
      updateSkill(editingSkill.id, {
        name: name.trim(),
        category,
        proficiency,
        status,
        progress,
        startDate,
        targetDate,
        lastStudiedDate: new Date().toISOString().split('T')[0],
        notes,
        associatedProjects: projectsList,
        resources,
      });
    } else {
      addSkill({
        name: name.trim(),
        category,
        proficiency,
        status,
        progress,
        startDate,
        targetDate,
        lastStudiedDate: new Date().toISOString().split('T')[0],
        notes,
        associatedProjects: projectsList,
        resources,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
            Skills Development Tracker
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track technical competencies across Programming, AI/ML and Modern Engineering
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Visual Skill Matrix Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Domain Mastery Progress</h3>
              <p className="text-xs text-slate-300">Average completion percentage per discipline</p>
            </div>
            <Badge variant="purple">Matrix</Badge>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Avg Progress']}
                />
                <Bar dataKey="avgProgress" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Highlights */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Competency Stats</h3>
            <p className="text-xs text-slate-300 mb-4">Total monitored abilities</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Total Tracked Skills</span>
                <span className="font-bold text-white text-sm">{data.skills.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Active Learning</span>
                <span className="font-bold text-purple-400">
                  {data.skills.filter(s => s.status === 'Learning').length}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Practicing & Building</span>
                <span className="font-bold text-cyan-400">
                  {data.skills.filter(s => s.status === 'Practicing').length}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Completed & Mastered</span>
                <span className="font-bold text-emerald-400">
                  {data.skills.filter(s => s.status === 'Completed').length}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.08] text-[11px] text-slate-300 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Regularly revised with projects</span>
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-2 bg-[#131929]/50 rounded-2xl border border-white/[0.08]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Status selector */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Learning">Learning</option>
            <option value="Practicing">Practicing</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>

          {/* Search box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          icon={BrainCircuit}
          title="No skills found"
          description={
            searchQuery || categoryFilter !== 'All'
              ? 'Try adjusting your search criteria or category filter.'
              : 'Start mapping your technical development journey by adding your first skill.'
          }
          actionText="Add a Skill"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map(skill => (
            <Card key={skill.id} glow="purple" className="p-5 flex flex-col justify-between">
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={
                      skill.category === 'AI & Machine Learning'
                        ? 'purple'
                        : skill.category === 'Programming'
                        ? 'cyan'
                        : 'indigo'
                    }
                  >
                    {skill.category}
                  </Badge>

                  <Badge
                    variant={
                      skill.status === 'Completed'
                        ? 'emerald'
                        : skill.status === 'Practicing'
                        ? 'blue'
                        : skill.status === 'Learning'
                        ? 'amber'
                        : 'slate'
                    }
                  >
                    {skill.status}
                  </Badge>
                </div>

                {/* Skill Name & Proficiency */}
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-bold text-white">{skill.name}</h3>
                  <span className="text-xs font-semibold text-purple-400">
                    {skill.proficiency}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <ProgressBar value={skill.progress} showLabel size="sm" color="gradient" />
                </div>

                {/* Notes */}
                {skill.notes && (
                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                    {skill.notes}
                  </p>
                )}

                {/* Associated Projects */}
                {skill.associatedProjects && skill.associatedProjects.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[10px] uppercase font-bold text-slate-300 mb-1 flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-cyan-400" />
                      Associated Projects
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {skill.associatedProjects.map((proj, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-300"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resource links */}
                {skill.resources && skill.resources.length > 0 && (
                  <div className="space-y-1 mb-3">
                    {skill.resources.map(res => (
                      <a
                        key={res.id}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{res.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Dates and Actions */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {skill.lastStudiedDate ? `Active ${skill.lastStudiedDate}` : 'Not studied yet'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                    title="Edit Skill"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete skill "${skill.name}"?`)) {
                        deleteSkill(skill.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? `Edit ${editingSkill.name}` : 'Add Technical Skill'}
        subtitle="Manage competency level, resources and associated engineering projects"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveSkill} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Skill Name *</label>
            <input
              type="text"
              placeholder="e.g. Distributed Systems, Rust, PyTorch"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none"
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
                value={proficiency}
                onChange={e => setProficiency(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Learning Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none"
              >
                <option value="Not Started">Not Started</option>
                <option value="Learning">Learning</option>
                <option value="Practicing">Practicing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Progress</span>
                <span className="text-purple-400 font-bold">{progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                className="w-full accent-purple-500 mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Completion</label>
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Associated Projects (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. My Progress Hub, Raft Distributed KV, AutoCode CLI"
              value={associatedProjects}
              onChange={e => setAssociatedProjects(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Learning Notes & Takeaways</label>
            <textarea
              rows={2}
              placeholder="Key concepts, architecture decisions, caveats..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          {/* Add Resource */}
          <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.06] space-y-2">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Add Course or Resource Link
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Resource title (e.g. Stanford CS149)"
                value={resourceTitle}
                onChange={e => setResourceTitle(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white"
              />
              <input
                type="url"
                placeholder="https://..."
                value={resourceUrl}
                onChange={e => setResourceUrl(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
            >
              {editingSkill ? 'Save Changes' : 'Create Skill'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
