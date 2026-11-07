import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  AppData,
  Page,
  Theme,
  UserProfile,
  DailyTask,
  Skill,
  GateSettings,
  GateSubject,
  GateTopic,
  GateMockTest,
  GatePyqLog,
  GateRevisionLog,
  DsaProblem,
  AcademicSemester,
  AcademicSubject,
  AcademicAchievement,
  AcademicDocument,
  Project,
  DailyJournalEntry,
  Course,
  Goal,
  ActivityTimelineItem,
} from '../types';
import {
  loadStoredData,
  saveStoredData,
  loadStoredTheme,
  saveStoredTheme,
  getInitialEmptyData,
  getRealisticDemoData,
} from '../utils/storage';

interface AppContextType {
  data: AppData;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isQuickAddOpen: boolean;
  setQuickAddOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  isLocked: boolean;
  unlock: (pin: string) => boolean;
  lockApp: () => void;

  // Computed metrics
  metrics: {
    currentCgpa: number;
    skillsLearningCount: number;
    gateProgressPercent: number;
    dsaSolvedCount: number;
    activeProjectsCount: number;
    currentStreak: number;
    todayProductivityScore: number;
    totalStudyHours: number;
    todayCompletedTasks: number;
    todayTotalTasks: number;
  };

  // CRUD actions
  updateProfile: (profile: Partial<UserProfile>) => void;
  addTask: (task: Omit<DailyTask, 'id'>) => void;
  updateTask: (id: string, updates: Partial<DailyTask>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  updateGateSettings: (settings: Partial<GateSettings>) => void;
  updateGateTopic: (subjectId: string, topicId: string, updates: Partial<GateTopic>) => void;
  addGateTopic: (subjectId: string, topicName: string) => void;
  deleteGateTopic: (subjectId: string, topicId: string) => void;
  addGateSubject: (name: string, code: string) => void;
  deleteGateSubject: (subjectId: string) => void;
  addGateMockTest: (mock: Omit<GateMockTest, 'id'>) => void;
  deleteGateMockTest: (id: string) => void;
  addGatePyqLog: (log: Omit<GatePyqLog, 'id'>) => void;
  deleteGatePyqLog: (id: string) => void;
  addGateRevisionLog: (log: Omit<GateRevisionLog, 'id'>) => void;
  updateGateRevisionLog: (id: string, updates: Partial<GateRevisionLog>) => void;
  addDsaProblem: (problem: Omit<DsaProblem, 'id'>) => void;
  updateDsaProblem: (id: string, updates: Partial<DsaProblem>) => void;
  deleteDsaProblem: (id: string) => void;
  addAcademicSemester: (semester: Omit<AcademicSemester, 'id'>) => void;
  updateAcademicSemester: (id: string, updates: Partial<AcademicSemester>) => void;
  deleteAcademicSemester: (id: string) => void;
  addAcademicSubject: (semesterId: string, subject: Omit<AcademicSubject, 'id'>) => void;
  updateAcademicSubject: (semesterId: string, subjectId: string, updates: Partial<AcademicSubject>) => void;
  deleteAcademicSubject: (semesterId: string, subjectId: string) => void;
  addAcademicAchievement: (ach: Omit<AcademicAchievement, 'id'>) => void;
  deleteAcademicAchievement: (id: string) => void;
  addAcademicDocument: (doc: Omit<AcademicDocument, 'id'>) => void;
  deleteAcademicDocument: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectMilestone: (projectId: string, milestoneId: string) => void;
  addProjectMilestone: (projectId: string, title: string) => void;
  saveDailyJournal: (entry: DailyJournalEntry) => void;
  toggleHabitForDate: (date: string, habitId: string) => void;
  addCustomHabit: (name: string, category: string, color: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  toggleGoalMilestone: (goalId: string, milestoneId: string) => void;
  resetToEmpty: () => void;
  loadDemoData: () => void;
  importJSONData: (newData: AppData) => void;
  logActivity: (type: ActivityTimelineItem['type'], action: string, title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(() => loadStoredData());
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [theme, setTheme] = useState<Theme>(() => loadStoredTheme());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [isQuickAddOpen, setQuickAddOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Sync with LocalStorage whenever data changes
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  // Apply theme to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  // Lock status check on startup if pin configured
  useEffect(() => {
    if (data.profile.isLocked && data.profile.pinCode) {
      setIsLocked(true);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const unlock = (pin: string): boolean => {
    if (!data.profile.pinCode || data.profile.pinCode === pin) {
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const lockApp = () => {
    if (data.profile.pinCode) {
      setIsLocked(true);
    }
  };

  const logActivity = (type: ActivityTimelineItem['type'], action: string, title: string) => {
    const newItem: ActivityTimelineItem = {
      id: `act_${Date.now()}`,
      type,
      action,
      title,
      timestamp: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      activityTimeline: [newItem, ...prev.activityTimeline].slice(0, 30),
    }));
  };

  // Dynamic calculated metrics
  const metrics = useMemo(() => {
    // Current CGPA: average of completed/active semester SGPAs weighted by credits
    let totalCreditPoints = 0;
    let totalCredits = 0;
    data.academicSemesters.forEach(sem => {
      if (sem.sgpa > 0 && sem.credits > 0) {
        totalCreditPoints += sem.sgpa * sem.credits;
        totalCredits += sem.credits;
      }
    });
    const currentCgpa = totalCredits > 0 ? Number((totalCreditPoints / totalCredits).toFixed(2)) : 0;

    // Skills learning count
    const skillsLearningCount = data.skills.filter(
      s => s.status === 'Learning' || s.status === 'Practicing'
    ).length;

    // GATE progress %: completed topics / total topics
    let totalGateTopics = 0;
    let completedGateTopics = 0;
    data.gateSubjects.forEach(s => {
      s.topics.forEach(t => {
        totalGateTopics++;
        if (t.status === 'Completed') completedGateTopics++;
      });
    });
    const gateProgressPercent = totalGateTopics > 0
      ? Math.round((completedGateTopics / totalGateTopics) * 100)
      : 0;

    // DSA Solved count
    const dsaSolvedCount = data.dsaProblems.length;

    // Active Projects count
    const activeProjectsCount = data.projects.filter(p => p.status === 'In Progress').length;

    // Current Streak: check journal or completed habits going backwards from today
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const entry = data.journalEntries[dateStr];
      const hasHabit = entry?.habits && Object.values(entry.habits).some(v => v === true);
      const hasStudyHours = entry && entry.studyHours > 0;
      if (hasHabit || hasStudyHours) {
        streak++;
      } else if (i === 0) {
        // If today is not logged yet, don't break streak if yesterday was active
        continue;
      } else {
        break;
      }
    }

    // Today's Productivity Score
    const todayStr = new Date().toISOString().split('T')[0];
    const todayEntry = data.journalEntries[todayStr];
    const todayTasks = data.tasks.filter(t => t.dueDate === todayStr);
    const todayCompleted = todayTasks.filter(t => t.completed).length;
    let todayProductivityScore = todayEntry?.productivityScore ? todayEntry.productivityScore * 10 : 0;
    if (!todayEntry && todayTasks.length > 0) {
      todayProductivityScore = Math.round((todayCompleted / todayTasks.length) * 100);
    } else if (!todayEntry && todayTasks.length === 0) {
      todayProductivityScore = streak > 0 ? 80 : 0;
    }

    // Total study hours
    let totalStudyHours = 0;
    Object.values(data.journalEntries).forEach(e => {
      totalStudyHours += e.studyHours || 0;
    });
    data.gateSubjects.forEach(s => {
      totalStudyHours += s.studyHours || 0;
    });
    totalStudyHours = Math.round(totalStudyHours);

    return {
      currentCgpa,
      skillsLearningCount,
      gateProgressPercent,
      dsaSolvedCount,
      activeProjectsCount,
      currentStreak: streak,
      todayProductivityScore,
      totalStudyHours,
      todayCompletedTasks: todayCompleted,
      todayTotalTasks: todayTasks.length,
    };
  }, [data]);

  // Profile
  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdates },
    }));
    logActivity('journal', 'Profile Updated', 'Updated profile information');
  };

  // Daily Tasks
  const addTask = (task: Omit<DailyTask, 'id'>) => {
    const newTask: DailyTask = { ...task, id: `task_${Date.now()}` };
    setData(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
    logActivity('task', 'Task Created', newTask.title);
  };

  const updateTask = (id: string, updates: Partial<DailyTask>) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const toggleTask = (id: string) => {
    setData(prev => {
      const task = prev.tasks.find(t => t.id === id);
      const newCompleted = !task?.completed;
      if (task) {
        logActivity('task', newCompleted ? 'Task Completed' : 'Task Reopened', task.title);
      }
      return {
        ...prev,
        tasks: prev.tasks.map(t => (t.id === id ? { ...t, completed: newCompleted } : t)),
      };
    });
  };

  const deleteTask = (id: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
    }));
  };

  // Skills
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: `sk_${Date.now()}` };
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    logActivity('skill', 'Skill Added', `Added ${newSkill.name} to ${newSkill.category}`);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const deleteSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };

  // GATE Preparation
  const updateGateSettings = (settings: Partial<GateSettings>) => {
    setData(prev => ({
      ...prev,
      gateSettings: { ...prev.gateSettings, ...settings },
    }));
  };

  const updateGateTopic = (subjectId: string, topicId: string, updates: Partial<GateTopic>) => {
    setData(prev => ({
      ...prev,
      gateSubjects: prev.gateSubjects.map(sub => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          topics: sub.topics.map(t => (t.id === topicId ? { ...t, ...updates } : t)),
        };
      }),
    }));
  };

  const addGateTopic = (subjectId: string, topicName: string) => {
    const newTopic: GateTopic = {
      id: `gt_${Date.now()}`,
      name: topicName,
      status: 'Not Started',
      revisionCount: 0,
      pyqSolved: 0,
      pyqTotal: 30,
    };
    setData(prev => ({
      ...prev,
      gateSubjects: prev.gateSubjects.map(sub => {
        if (sub.id !== subjectId) return sub;
        return { ...sub, topics: [...sub.topics, newTopic] };
      }),
    }));
  };

  const deleteGateTopic = (subjectId: string, topicId: string) => {
    setData(prev => ({
      ...prev,
      gateSubjects: prev.gateSubjects.map(sub => {
        if (sub.id !== subjectId) return sub;
        return { ...sub, topics: sub.topics.filter(t => t.id !== topicId) };
      }),
    }));
  };

  const addGateSubject = (name: string, code: string) => {
    const newSub: GateSubject = {
      id: `sub_${Date.now()}`,
      name,
      code: code.toUpperCase(),
      studyHours: 0,
      topics: [],
    };
    setData(prev => ({ ...prev, gateSubjects: [...prev.gateSubjects, newSub] }));
    logActivity('gate', 'GATE Subject Added', name);
  };

  const deleteGateSubject = (subjectId: string) => {
    setData(prev => ({
      ...prev,
      gateSubjects: prev.gateSubjects.filter(s => s.id !== subjectId),
    }));
  };

  const addGateMockTest = (mock: Omit<GateMockTest, 'id'>) => {
    const newMock: GateMockTest = { ...mock, id: `mt_${Date.now()}` };
    setData(prev => ({
      ...prev,
      gateMockTests: [newMock, ...prev.gateMockTests],
    }));
    logActivity('gate', 'GATE Mock Test Logged', `${newMock.title}: ${newMock.score}/${newMock.totalMarks}`);
  };

  const deleteGateMockTest = (id: string) => {
    setData(prev => ({
      ...prev,
      gateMockTests: prev.gateMockTests.filter(m => m.id !== id),
    }));
  };

  const addGatePyqLog = (log: Omit<GatePyqLog, 'id'>) => {
    const newLog: GatePyqLog = { ...log, id: `pyq_${Date.now()}` };
    setData(prev => ({
      ...prev,
      gatePyqLogs: [newLog, ...prev.gatePyqLogs],
    }));
    logActivity('gate', 'PYQ Session Logged', `${newLog.subject} (${newLog.year})`);
  };

  const deleteGatePyqLog = (id: string) => {
    setData(prev => ({
      ...prev,
      gatePyqLogs: prev.gatePyqLogs.filter(p => p.id !== id),
    }));
  };

  const addGateRevisionLog = (log: Omit<GateRevisionLog, 'id'>) => {
    const newRev: GateRevisionLog = { ...log, id: `rev_${Date.now()}` };
    setData(prev => ({
      ...prev,
      gateRevisionLogs: [newRev, ...prev.gateRevisionLogs],
    }));
    logActivity('gate', 'Revision Logged', `${newRev.subject}: ${newRev.topic}`);
  };

  const updateGateRevisionLog = (id: string, updates: Partial<GateRevisionLog>) => {
    setData(prev => ({
      ...prev,
      gateRevisionLogs: prev.gateRevisionLogs.map(r => (r.id === id ? { ...r, ...updates } : r)),
    }));
  };

  // DSA & Coding
  const addDsaProblem = (problem: Omit<DsaProblem, 'id'>) => {
    const newProb: DsaProblem = { ...problem, id: `dsa_${Date.now()}` };
    setData(prev => ({
      ...prev,
      dsaProblems: [newProb, ...prev.dsaProblems],
    }));
    logActivity('dsa', 'DSA Problem Solved', `${newProb.title} [${newProb.difficulty}]`);
  };

  const updateDsaProblem = (id: string, updates: Partial<DsaProblem>) => {
    setData(prev => ({
      ...prev,
      dsaProblems: prev.dsaProblems.map(p => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteDsaProblem = (id: string) => {
    setData(prev => ({
      ...prev,
      dsaProblems: prev.dsaProblems.filter(p => p.id !== id),
    }));
  };

  // Academics
  const addAcademicSemester = (semester: Omit<AcademicSemester, 'id'>) => {
    const newSem: AcademicSemester = { ...semester, id: `sem_${Date.now()}` };
    setData(prev => ({
      ...prev,
      academicSemesters: [...prev.academicSemesters, newSem],
    }));
    logActivity('academic', 'Academic Term Added', `${newSem.name} (SGPA: ${newSem.sgpa})`);
  };

  const updateAcademicSemester = (id: string, updates: Partial<AcademicSemester>) => {
    setData(prev => ({
      ...prev,
      academicSemesters: prev.academicSemesters.map(s => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const deleteAcademicSemester = (id: string) => {
    setData(prev => ({
      ...prev,
      academicSemesters: prev.academicSemesters.filter(s => s.id !== id),
    }));
  };

  const addAcademicSubject = (semesterId: string, subject: Omit<AcademicSubject, 'id'>) => {
    const newSubj: AcademicSubject = { ...subject, id: `sub_${Date.now()}` };
    setData(prev => ({
      ...prev,
      academicSemesters: prev.academicSemesters.map(sem => {
        if (sem.id !== semesterId) return sem;
        return { ...sem, subjects: [...sem.subjects, newSubj] };
      }),
    }));
  };

  const updateAcademicSubject = (semesterId: string, subjectId: string, updates: Partial<AcademicSubject>) => {
    setData(prev => ({
      ...prev,
      academicSemesters: prev.academicSemesters.map(sem => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          subjects: sem.subjects.map(sub => (sub.id === subjectId ? { ...sub, ...updates } : sub)),
        };
      }),
    }));
  };

  const deleteAcademicSubject = (semesterId: string, subjectId: string) => {
    setData(prev => ({
      ...prev,
      academicSemesters: prev.academicSemesters.map(sem => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          subjects: sem.subjects.filter(sub => sub.id !== subjectId),
        };
      }),
    }));
  };

  const addAcademicAchievement = (ach: Omit<AcademicAchievement, 'id'>) => {
    const newAch: AcademicAchievement = { ...ach, id: `ach_${Date.now()}` };
    setData(prev => ({
      ...prev,
      academicAchievements: [newAch, ...prev.academicAchievements],
    }));
    logActivity('academic', 'Academic Achievement Added', newAch.title);
  };

  const deleteAcademicAchievement = (id: string) => {
    setData(prev => ({
      ...prev,
      academicAchievements: prev.academicAchievements.filter(a => a.id !== id),
    }));
  };

  const addAcademicDocument = (doc: Omit<AcademicDocument, 'id'>) => {
    const newDoc: AcademicDocument = { ...doc, id: `doc_${Date.now()}` };
    setData(prev => ({
      ...prev,
      academicDocuments: [newDoc, ...prev.academicDocuments],
    }));
  };

  const deleteAcademicDocument = (id: string) => {
    setData(prev => ({
      ...prev,
      academicDocuments: prev.academicDocuments.filter(d => d.id !== id),
    }));
  };

  // Projects
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = { ...project, id: `proj_${Date.now()}` };
    setData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
    logActivity('project', 'Project Created', newProj.title);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const toggleProjectMilestone = (projectId: string, milestoneId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id !== projectId) return p;
        const newMilestones = p.milestones.map(m =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = newMilestones.filter(m => m.completed).length;
        const autoPercent = newMilestones.length > 0 ? Math.round((completedCount / newMilestones.length) * 100) : p.completionPercent;
        return { ...p, milestones: newMilestones, completionPercent: autoPercent };
      }),
    }));
  };

  const addProjectMilestone = (projectId: string, title: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id !== projectId) return p;
        const newM = { id: `m_${Date.now()}`, title, completed: false };
        return { ...p, milestones: [...p.milestones, newM] };
      }),
    }));
  };

  // Daily Journal & Habits
  const saveDailyJournal = (entry: DailyJournalEntry) => {
    setData(prev => ({
      ...prev,
      journalEntries: {
        ...prev.journalEntries,
        [entry.date]: entry,
      },
    }));
    logActivity('journal', 'Journal Saved', `Logged daily reflection for ${entry.date}`);
  };

  const toggleHabitForDate = (date: string, habitId: string) => {
    setData(prev => {
      const existing = prev.journalEntries[date] || {
        date,
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
      const currentVal = existing.habits?.[habitId] || false;
      const updatedEntry: DailyJournalEntry = {
        ...existing,
        habits: {
          ...existing.habits,
          [habitId]: !currentVal,
        },
      };
      return {
        ...prev,
        journalEntries: {
          ...prev.journalEntries,
          [date]: updatedEntry,
        },
      };
    });
  };

  const addCustomHabit = (name: string, category: string, color: string) => {
    const newHabit = {
      id: `h_${Date.now()}`,
      name,
      category,
      color: color || '#8b5cf6',
      iconName: 'Sparkles',
    };
    setData(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  };

  // Courses
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newC: Course = { ...course, id: `c_${Date.now()}` };
    setData(prev => ({ ...prev, courses: [...prev.courses, newC] }));
    logActivity('course', 'Course Added', newC.name);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.map(c => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const deleteCourse = (id: string) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id),
    }));
  };

  // Goals
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newG: Goal = { ...goal, id: `g_${Date.now()}` };
    setData(prev => ({ ...prev, goals: [...prev.goals, newG] }));
    logActivity('goal', 'Goal Created', newG.title);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => (g.id === id ? { ...g, ...updates } : g)),
    }));
  };

  const deleteGoal = (id: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id),
    }));
  };

  const toggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => {
        if (g.id !== goalId) return g;
        const newM = g.milestones.map(m =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const done = newM.filter(m => m.completed).length;
        const percent = newM.length > 0 ? Math.round((done / newM.length) * 100) : g.progressPercent;
        const status = percent === 100 ? 'Completed' : g.status;
        return { ...g, milestones: newM, progressPercent: percent, status };
      }),
    }));
  };

  // Reset & Demo Seeder
  const resetToEmpty = () => {
    const empty = getInitialEmptyData();
    setData(empty);
    saveStoredData(empty);
  };

  const loadDemoData = () => {
    const demo = getRealisticDemoData();
    setData(demo);
    saveStoredData(demo);
  };

  const importJSONData = (newData: AppData) => {
    setData(newData);
    saveStoredData(newData);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        currentPage,
        setCurrentPage,
        theme,
        toggleTheme,
        isSidebarCollapsed,
        toggleSidebar,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isQuickAddOpen,
        setQuickAddOpen,
        isNotificationsOpen,
        setNotificationsOpen,
        isLocked,
        unlock,
        lockApp,
        metrics,
        updateProfile,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        addSkill,
        updateSkill,
        deleteSkill,
        updateGateSettings,
        updateGateTopic,
        addGateTopic,
        deleteGateTopic,
        addGateSubject,
        deleteGateSubject,
        addGateMockTest,
        deleteGateMockTest,
        addGatePyqLog,
        deleteGatePyqLog,
        addGateRevisionLog,
        updateGateRevisionLog,
        addDsaProblem,
        updateDsaProblem,
        deleteDsaProblem,
        addAcademicSemester,
        updateAcademicSemester,
        deleteAcademicSemester,
        addAcademicSubject,
        updateAcademicSubject,
        deleteAcademicSubject,
        addAcademicAchievement,
        deleteAcademicAchievement,
        addAcademicDocument,
        deleteAcademicDocument,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectMilestone,
        addProjectMilestone,
        saveDailyJournal,
        toggleHabitForDate,
        addCustomHabit,
        addCourse,
        updateCourse,
        deleteCourse,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleGoalMilestone,
        resetToEmpty,
        loadDemoData,
        importJSONData,
        logActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
