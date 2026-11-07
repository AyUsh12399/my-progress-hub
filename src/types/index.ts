export type Page =
  | 'overview'
  | 'skills'
  | 'gate'
  | 'dsa'
  | 'academics'
  | 'projects'
  | 'journal'
  | 'courses'
  | 'goals'
  | 'analytics'
  | 'settings';

export type Theme = 'dark' | 'light';

export interface UserProfile {
  name: string;
  subtitle: string;
  email: string;
  role: string;
  college: string;
  branch: string;
  currentSemester: number;
  graduationYear: number;
  targetGateYear: number;
  targetCgpa: number;
  targetDsaCount: number;
  bio: string;
  avatarUrl?: string;
  isLocked: boolean;
  pinCode?: string;
}

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'gate' | 'dsa' | 'college' | 'ai' | 'project' | 'personal';
  dueDate: string; // YYYY-MM-DD
  dueTime?: string;
  isTopPriority?: boolean;
}

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type SkillStatus = 'Not Started' | 'Learning' | 'Practicing' | 'Completed';

export interface SkillResource {
  id: string;
  title: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'AI & Machine Learning' | 'Development' | string;
  proficiency: SkillProficiency;
  status: SkillStatus;
  progress: number; // 0-100
  startDate: string;
  targetDate: string;
  lastStudiedDate: string;
  resources: SkillResource[];
  notes: string;
  associatedProjects: string[];
}

export type GateTopicStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Needs Revision';

export interface GateTopic {
  id: string;
  name: string;
  status: GateTopicStatus;
  revisionCount: number;
  pyqSolved: number;
  pyqTotal: number;
  notes?: string;
}

export interface GateSubject {
  id: string;
  name: string;
  code: string;
  studyHours: number;
  topics: GateTopic[];
}

export interface GateMockTest {
  id: string;
  title: string;
  date: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  percentile?: number;
  weakTopics: string[];
  notes: string;
}

export interface GatePyqLog {
  id: string;
  subject: string;
  year: number;
  totalQuestions: number;
  solvedCount: number;
  accuracy: number;
  date: string;
  notes?: string;
}

export interface GateRevisionLog {
  id: string;
  subject: string;
  topic: string;
  revisionRound: 1 | 2 | 3;
  completedDate: string;
  status: 'Scheduled' | 'Completed';
}

export interface GateSettings {
  paper: 'CS & IT' | 'DA (Data Science & AI)' | 'ECE' | string;
  targetYear: number;
  dailyTargetHours: number;
  weeklyTargetHours: number;
}

export type DsaPlatform = 'LeetCode' | 'GeeksforGeeks' | 'Codeforces' | 'HackerRank' | 'CodeStudio' | 'Other';
export type DsaDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface DsaProblem {
  id: string;
  title: string;
  platform: DsaPlatform;
  topic: string;
  difficulty: DsaDifficulty;
  url?: string;
  approach?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  solvedDate: string;
  revisionStatus: 'Needs Review' | 'Mastered';
  notes?: string;
}

export interface AcademicSubject {
  id: string;
  name: string;
  code: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string;
  attendancePercent: number;
  practicalMarks?: number;
  assignmentStatus: 'Pending' | 'Submitted' | 'Graded';
  notes?: string;
}

export interface AcademicSemester {
  id: string;
  number: number;
  name: string;
  sgpa: number;
  credits: number;
  academicYear: string;
  status: 'Completed' | 'Current' | 'Upcoming';
  subjects: AcademicSubject[];
}

export interface AcademicAchievement {
  id: string;
  title: string;
  date: string;
  category: 'Hackathon' | 'Certification' | 'Honor' | 'Research' | 'Competition' | 'Other';
  issuer: string;
  description: string;
  link?: string;
}

export interface AcademicDocument {
  id: string;
  title: string;
  semesterNumber: number;
  category: 'Marksheet' | 'Syllabus' | 'Notes' | 'Certificate' | 'Project Report';
  url: string;
  uploadDate: string;
  notes?: string;
}

export type ProjectCategory = 'Personal' | 'Academic' | 'Internship' | 'Hackathon' | 'Open Source';
export type ProjectStatus = 'Planning' | 'In Progress' | 'On Hold' | 'Completed';

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnailUrl?: string;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  completionPercent: number;
  milestones: ProjectMilestone[];
  problemsFaced?: string;
  futureImprovements?: string;
  learningOutcomes?: string;
}

export interface HabitDefinition {
  id: string;
  name: string;
  category: string;
  color: string;
  iconName: string;
}

export interface DailyJournalEntry {
  date: string; // YYYY-MM-DD
  studyHours: number;
  productivityScore: number; // 1-10
  mood: 'Great' | 'Productive' | 'Neutral' | 'Challenging' | 'Tired';
  whatStudied: string;
  whatCompleted: string;
  whatFailed: string;
  challenges: string;
  newLearnings: string;
  tomorrowPriorities: string;
  reflections: string;
  habits: Record<string, boolean>; // habitId -> boolean
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  platform: 'YouTube' | 'Udemy' | 'Coursera' | 'NPTEL' | 'edX' | 'O\'Reilly' | 'Other';
  url: string;
  totalDurationHours: number;
  progressPercent: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  notes?: string;
  relatedSkills: string[];
}

export type GoalCategory = 'Daily' | 'Weekly' | 'Monthly' | 'Semester' | 'Annual' | 'Career';
export type GoalPriority = 'High' | 'Medium' | 'Low';
export type GoalStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Deferred';

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  priority: GoalPriority;
  deadline: string;
  progressPercent: number;
  status: GoalStatus;
  milestones: { id: string; title: string; completed: boolean }[];
  notes?: string;
}

export interface ActivityTimelineItem {
  id: string;
  type: 'skill' | 'gate' | 'dsa' | 'academic' | 'project' | 'journal' | 'goal' | 'course' | 'task';
  action: string;
  title: string;
  timestamp: string; // ISO
}

export interface AppData {
  profile: UserProfile;
  tasks: DailyTask[];
  skills: Skill[];
  gateSettings: GateSettings;
  gateSubjects: GateSubject[];
  gateMockTests: GateMockTest[];
  gatePyqLogs: GatePyqLog[];
  gateRevisionLogs: GateRevisionLog[];
  dsaProblems: DsaProblem[];
  dsaTargetCount: number;
  academicSemesters: AcademicSemester[];
  academicAchievements: AcademicAchievement[];
  academicDocuments: AcademicDocument[];
  projects: Project[];
  habits: HabitDefinition[];
  journalEntries: Record<string, DailyJournalEntry>; // date YYYY-MM-DD -> entry
  courses: Course[];
  goals: Goal[];
  activityTimeline: ActivityTimelineItem[];
}
