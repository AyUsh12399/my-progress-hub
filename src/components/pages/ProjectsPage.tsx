import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory, ProjectStatus } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

export const ProjectsPage: React.FC = () => {
  const {
    data,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectMilestone,
    addProjectMilestone,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Personal');
  const [status, setStatus] = useState<ProjectStatus>('In Progress');
  const [techStackInput, setTechStackInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [completionPercent, setCompletionPercent] = useState(50);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [deadline, setDeadline] = useState(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
  const [problemsFaced, setProblemsFaced] = useState('');
  const [futureImprovements, setFutureImprovements] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState('');

  // Inline new milestone state
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  const categories = ['All', 'Personal', 'Academic', 'Internship', 'Hackathon', 'Open Source'];

  const filteredProjects = useMemo(() => {
    return data.projects.filter(p => {
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchStatus && matchSearch;
    });
  }, [data.projects, categoryFilter, statusFilter, searchQuery]);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setCategory('Personal');
    setStatus('In Progress');
    setTechStackInput('');
    setGithubUrl('');
    setLiveUrl('');
    setCompletionPercent(30);
    setStartDate(new Date().toISOString().split('T')[0]);
    setDeadline(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
    setProblemsFaced('');
    setFutureImprovements('');
    setLearningOutcomes('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setCategory(proj.category);
    setStatus(proj.status);
    setTechStackInput(proj.techStack.join(', '));
    setGithubUrl(proj.githubUrl || '');
    setLiveUrl(proj.liveUrl || '');
    setCompletionPercent(proj.completionPercent);
    setStartDate(proj.startDate);
    setDeadline(proj.deadline);
    setProblemsFaced(proj.problemsFaced || '');
    setFutureImprovements(proj.futureImprovements || '');
    setLearningOutcomes(proj.learningOutcomes || '');
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const stack = techStackInput
      ? techStackInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['TypeScript'];

    if (editingProject) {
      updateProject(editingProject.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        status,
        techStack: stack,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        completionPercent,
        startDate,
        deadline,
        problemsFaced: problemsFaced.trim() || undefined,
        futureImprovements: futureImprovements.trim() || undefined,
        learningOutcomes: learningOutcomes.trim() || undefined,
      });
    } else {
      addProject({
        title: title.trim(),
        description: description.trim(),
        category,
        status,
        techStack: stack,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        completionPercent,
        startDate,
        deadline,
        milestones: [
          { id: 'm1', title: 'System architecture design & setup', completed: true },
          { id: 'm2', title: 'Core implementation & tests', completed: false },
        ],
        problemsFaced: problemsFaced.trim() || undefined,
        futureImprovements: futureImprovements.trim() || undefined,
        learningOutcomes: learningOutcomes.trim() || undefined,
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
            <FolderGit2 className="w-6 h-6 text-amber-400" />
            Engineering Projects Manager
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Showcase personal software architectures, hackathons, and systems engineering milestones
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-2 bg-[#131929]/50 rounded-2xl border border-white/[0.08]">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status & Search */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-slate-300"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planning">Planning</option>
            <option value="On Hold">On Hold</option>
          </select>

          <div className="relative flex-1 lg:w-52">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description="Build and track your portfolio projects with live milestones and reflection notes."
          actionText="Add a Project"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(proj => (
            <Card
              key={proj.id}
              glow="purple"
              className="p-5 flex flex-col justify-between"
              onClick={() => setSelectedProjectDetails(proj)}
            >
              <div>
                {/* Header status and category */}
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant={
                      proj.category === 'Hackathon'
                        ? 'rose'
                        : proj.category === 'Academic'
                        ? 'blue'
                        : proj.category === 'Internship'
                        ? 'indigo'
                        : 'purple'
                    }
                  >
                    {proj.category}
                  </Badge>

                  <Badge
                    variant={
                      proj.status === 'Completed'
                        ? 'emerald'
                        : proj.status === 'In Progress'
                        ? 'amber'
                        : 'slate'
                    }
                  >
                    {proj.status}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-white mb-2 line-clamp-1">{proj.title}</h3>

                <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <ProgressBar
                    value={proj.completionPercent}
                    showLabel
                    size="sm"
                    color={proj.completionPercent === 100 ? 'emerald' : 'gradient'}
                  />
                </div>
              </div>

              {/* Card Footer: Links and Actions */}
              <div
                className="pt-3 border-t border-white/[0.06] flex items-center justify-between"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/[0.08] transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${proj.title}"?`)) {
                        deleteProject(proj.id);
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

      {/* 4. Project Details & Milestone Drawer Modal */}
      {selectedProjectDetails && (
        <Modal
          isOpen={!!selectedProjectDetails}
          onClose={() => setSelectedProjectDetails(null)}
          title={selectedProjectDetails.title}
          subtitle={`${selectedProjectDetails.category} Project · ${selectedProjectDetails.status}`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedProjectDetails.description}
            </p>

            {/* Tech Stack */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-300 mb-1.5 block">
                Tech Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProjectDetails.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Milestones & Tasks
                </span>
                <span className="text-xs text-amber-400 font-semibold">
                  {selectedProjectDetails.completionPercent}% Complete
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {selectedProjectDetails.milestones.map(m => (
                  <div
                    key={m.id}
                    onClick={() => {
                      toggleProjectMilestone(selectedProjectDetails.id, m.id);
                      setSelectedProjectDetails(prev => {
                        if (!prev) return null;
                        return {
                          ...prev,
                          milestones: prev.milestones.map(item =>
                            item.id === m.id ? { ...item, completed: !item.completed } : item
                          ),
                        };
                      });
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer text-xs transition-colors"
                  >
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-slate-200 ${m.completed ? 'line-through text-slate-500' : ''}`}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add milestone inline */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="New milestone item..."
                  value={newMilestoneTitle}
                  onChange={e => setNewMilestoneTitle(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newMilestoneTitle.trim()) return;
                    addProjectMilestone(selectedProjectDetails.id, newMilestoneTitle.trim());
                    setSelectedProjectDetails(prev => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        milestones: [
                          ...prev.milestones,
                          { id: `m_${Date.now()}`, title: newMilestoneTitle.trim(), completed: false },
                        ],
                      };
                    });
                    setNewMilestoneTitle('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Reflection details: problems faced & learning outcomes */}
            {selectedProjectDetails.problemsFaced && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                <span className="font-bold text-rose-300 block mb-0.5">Problems Faced & Solutions</span>
                <p className="text-slate-300">{selectedProjectDetails.problemsFaced}</p>
              </div>
            )}

            {selectedProjectDetails.learningOutcomes && (
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
                <span className="font-bold text-cyan-300 block mb-0.5">Key Learning Outcomes</span>
                <p className="text-slate-300">{selectedProjectDetails.learningOutcomes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* 5. Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create Engineering Project'}
        subtitle="Track personal software architectures, hackathons, and systems"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
            <input
              type="text"
              placeholder="e.g. Distributed Key-Value Store with Raft"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="System goals, architectural decisions, and key features..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
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
                <option value="Personal">Personal</option>
                <option value="Academic">Academic</option>
                <option value="Internship">Internship</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Go, gRPC, Protobuf, Docker, Redis"
              value={techStackInput}
              onChange={e => setTechStackInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Live URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={liveUrl}
                onChange={e => setLiveUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Problems Faced & Solutions
            </label>
            <textarea
              rows={2}
              placeholder="What bottlenecks or issues were resolved?"
              value={problemsFaced}
              onChange={e => setProblemsFaced(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Learning Outcomes</label>
            <textarea
              rows={2}
              placeholder="What core architectural insights were gained?"
              value={learningOutcomes}
              onChange={e => setLearningOutcomes(e.target.value)}
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
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
            >
              {editingProject ? 'Save Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
