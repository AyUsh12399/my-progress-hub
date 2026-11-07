import React, { useState, useMemo } from 'react';
import {
  Library,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Clock,
  BookOpen,
  CheckCircle,
  Video,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

export const CoursesPage: React.FC = () => {
  const { data, addCourse, updateCourse, deleteCourse } = useApp();

  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [platform, setPlatform] = useState<Course['platform']>('Coursera');
  const [url, setUrl] = useState('');
  const [totalDurationHours, setTotalDurationHours] = useState(30);
  const [progressPercent, setProgressPercent] = useState(50);
  const [status, setStatus] = useState<Course['status']>('In Progress');
  const [notes, setNotes] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const platforms = ['All', 'YouTube', 'Coursera', 'NPTEL', 'Udemy', 'edX', 'O\'Reilly'];

  const filteredCourses = useMemo(() => {
    return data.courses.filter(c => {
      const matchPlatform = platformFilter === 'All' || c.platform === platformFilter;
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.notes && c.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchPlatform && matchStatus && matchSearch;
    });
  }, [data.courses, platformFilter, statusFilter, searchQuery]);

  const openAddModal = () => {
    setEditingCourse(null);
    setName('');
    setInstructor('');
    setPlatform('Coursera');
    setUrl('');
    setTotalDurationHours(25);
    setProgressPercent(20);
    setStatus('In Progress');
    setNotes('');
    setSkillsInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Course) => {
    setEditingCourse(c);
    setName(c.name);
    setInstructor(c.instructor);
    setPlatform(c.platform);
    setUrl(c.url);
    setTotalDurationHours(c.totalDurationHours);
    setProgressPercent(c.progressPercent);
    setStatus(c.status);
    setNotes(c.notes || '');
    setSkillsInput(c.relatedSkills.join(', '));
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const skills = skillsInput
      ? skillsInput.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    if (editingCourse) {
      updateCourse(editingCourse.id, {
        name: name.trim(),
        instructor: instructor.trim() || 'Instructor',
        platform,
        url: url.trim(),
        totalDurationHours,
        progressPercent,
        status,
        notes: notes.trim() || undefined,
        relatedSkills: skills,
      });
    } else {
      addCourse({
        name: name.trim(),
        instructor: instructor.trim() || 'Instructor',
        platform,
        url: url.trim(),
        totalDurationHours,
        progressPercent,
        status,
        notes: notes.trim() || undefined,
        relatedSkills: skills,
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
            <Library className="w-6 h-6 text-purple-400" />
            Courses & Learning Resource Library
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Curate lectures, MOOCs, specializations, and documentation guides
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-2 bg-[#131929]/50 rounded-2xl border border-white/[0.08]">
        {/* Platform Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {platforms.map(p => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                platformFilter === p
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {p}
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
            <option value="Not Started">Not Started</option>
          </select>

          <div className="relative flex-1 lg:w-52">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon={Library}
          title="No courses found"
          description="Track online courses from Coursera, NPTEL, YouTube, and Udemy with completion meters."
          actionText="Add Course"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => (
            <Card key={course.id} glow="purple" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={course.platform === 'NPTEL' ? 'blue' : 'purple'}>
                    {course.platform}
                  </Badge>

                  <Badge
                    variant={
                      course.status === 'Completed'
                        ? 'emerald'
                        : course.status === 'In Progress'
                        ? 'amber'
                        : 'slate'
                    }
                  >
                    {course.status}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-white mb-1 line-clamp-2">{course.name}</h3>
                <p className="text-xs text-slate-300 mb-3">By {course.instructor}</p>

                {/* Progress */}
                <div className="mb-4">
                  <ProgressBar value={course.progressPercent} showLabel size="sm" color="gradient" />
                </div>

                {course.notes && (
                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                    {course.notes}
                  </p>
                )}

                {/* Skills tags */}
                {course.relatedSkills && course.relatedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.relatedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: duration & links */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-purple-400" />
                  {course.totalDurationHours} hrs duration
                </span>

                <div className="flex items-center gap-2">
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
                      title="Open Course Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(course)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete course "${course.name}"?`)) {
                        deleteCourse(course.id);
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

      {/* Add / Edit Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Add Course / Resource'}
        subtitle="Manage lecture series, MOOCs, and books"
        maxWidth="md"
      >
        <form onSubmit={handleSaveCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Course Title *</label>
            <input
              type="text"
              placeholder="e.g. CS106B Programming Abstractions"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Instructor / Org</label>
              <input
                type="text"
                placeholder="e.g. Stanford / Andrew Ng"
                value={instructor}
                onChange={e => setInstructor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
              >
                <option value="Coursera">Coursera</option>
                <option value="NPTEL">NPTEL</option>
                <option value="YouTube">YouTube</option>
                <option value="Udemy">Udemy</option>
                <option value="edX">edX</option>
                <option value="O'Reilly">O'Reilly</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Course URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (Hours)</label>
              <input
                type="number"
                value={totalDurationHours}
                onChange={e => setTotalDurationHours(Number(e.target.value))}
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Related Skills (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. C++, Algorithms, GATE Prep"
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Key Insights</label>
            <textarea
              rows={2}
              placeholder="Summaries, lecture timestamps..."
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
              {editingCourse ? 'Save Changes' : 'Add Course'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
