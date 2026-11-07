import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
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
  Plus,
  Moon,
  Sun,
  Download,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Page } from '../../types';
import { exportDataAsJSON, exportSummaryCSV } from '../../utils/storage';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentPage,
    theme,
    toggleTheme,
    setQuickAddOpen,
    data,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Reset search when opening
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  // Commands list
  const allCommands = useMemo(() => {
    const pages: { id: string; category: string; title: string; icon: any; action: () => void }[] = [
      { id: 'p_overview', category: 'Navigation', title: 'Go to Overview Dashboard', icon: LayoutDashboard, action: () => setCurrentPage('overview') },
      { id: 'p_skills', category: 'Navigation', title: 'Go to My Skills', icon: BrainCircuit, action: () => setCurrentPage('skills') },
      { id: 'p_gate', category: 'Navigation', title: 'Go to GATE Preparation', icon: GraduationCap, action: () => setCurrentPage('gate') },
      { id: 'p_dsa', category: 'Navigation', title: 'Go to DSA & Coding', icon: Code2, action: () => setCurrentPage('dsa') },
      { id: 'p_academics', category: 'Navigation', title: 'Go to Academics', icon: BookOpen, action: () => setCurrentPage('academics') },
      { id: 'p_projects', category: 'Navigation', title: 'Go to Projects', icon: FolderGit2, action: () => setCurrentPage('projects') },
      { id: 'p_journal', category: 'Navigation', title: 'Go to Daily Activities & Journal', icon: CalendarDays, action: () => setCurrentPage('journal') },
      { id: 'p_courses', category: 'Navigation', title: 'Go to Courses & Resources', icon: Library, action: () => setCurrentPage('courses') },
      { id: 'p_goals', category: 'Navigation', title: 'Go to Goals & Milestones', icon: Target, action: () => setCurrentPage('goals') },
      { id: 'p_analytics', category: 'Navigation', title: 'Go to Analytics & Reports', icon: BarChart3, action: () => setCurrentPage('analytics') },
      { id: 'p_settings', category: 'Navigation', title: 'Go to Workspace Settings', icon: Settings, action: () => setCurrentPage('settings') },
    ];

    const actions = [
      {
        id: 'act_quick_add',
        category: 'Actions',
        title: 'Quick Add (Task, Skill, Problem, Project...)',
        icon: Plus,
        action: () => setQuickAddOpen(true),
      },
      {
        id: 'act_theme',
        category: 'Preferences',
        title: `Toggle Theme (Currently ${theme === 'dark' ? 'Dark' : 'Light'})`,
        icon: theme === 'dark' ? Sun : Moon,
        action: () => toggleTheme(),
      },
      {
        id: 'act_export_json',
        category: 'Data',
        title: 'Export Full JSON Backup',
        icon: Download,
        action: () => exportDataAsJSON(data),
      },
      {
        id: 'act_export_csv',
        category: 'Data',
        title: 'Export Summary CSV',
        icon: Download,
        action: () => exportSummaryCSV(data),
      },
    ];

    // Search matches from skills & projects
    const skillItems = data.skills.map(s => ({
      id: `sk_${s.id}`,
      category: 'Skills',
      title: `${s.name} (${s.category} - ${s.progress}%)`,
      icon: BrainCircuit,
      action: () => setCurrentPage('skills'),
    }));

    const projectItems = data.projects.map(p => ({
      id: `pr_${p.id}`,
      category: 'Projects',
      title: `${p.title} [${p.status}]`,
      icon: FolderGit2,
      action: () => setCurrentPage('projects'),
    }));

    return [...pages, ...actions, ...skillItems, ...projectItems];
  }, [setCurrentPage, setQuickAddOpen, theme, toggleTheme, data]);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return allCommands.slice(0, 10);
    const q = search.toLowerCase();
    return allCommands.filter(c =>
      c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [allCommands, search]);

  const handleSelect = (action: () => void) => {
    action();
    setCommandPaletteOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex].action);
      }
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette Container */}
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#131929] border border-white/[0.14] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#161c2e]">
          <Search className="w-5 h-5 text-purple-400 shrink-0 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search skills, projects, pages..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded border border-white/[0.1] font-mono shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No results found for "{search}"
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                    isSelected
                      ? 'bg-purple-600/25 text-white border border-purple-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-purple-500/30 text-purple-300' : 'bg-white/[0.06] text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium truncate">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 px-1.5 py-0.5 rounded bg-white/[0.04]">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-purple-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#0c101c] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with ↑ ↓</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
};
