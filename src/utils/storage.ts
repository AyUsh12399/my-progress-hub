import { AppData, DailyJournalEntry, GateSubject, HabitDefinition, UserProfile } from '../types';

const STORAGE_KEY = 'my_progress_hub_data_v1';
const THEME_KEY = 'my_progress_hub_theme';

export const DEFAULT_HABITS: HabitDefinition[] = [
  { id: 'h_coding', name: 'Coding & DSA Practice', category: 'Technical', color: '#6366f1', iconName: 'Code2' },
  { id: 'h_gate', name: 'GATE Core Preparation', category: 'Academic', color: '#8b5cf6', iconName: 'GraduationCap' },
  { id: 'h_aiml', name: 'AI / ML Deep Work', category: 'Learning', color: '#06b6d4', iconName: 'Cpu' },
  { id: 'h_college', name: 'College Academics / Lectures', category: 'Academic', color: '#3b82f6', iconName: 'BookOpen' },
  { id: 'h_reading', name: 'Technical / Book Reading', category: 'Growth', color: '#10b981', iconName: 'BookMarked' },
  { id: 'h_exercise', name: 'Workout / Physical Fitness', category: 'Health', color: '#f59e0b', iconName: 'Flame' },
  { id: 'h_dev', name: 'Personal Project Building', category: 'Building', color: '#ec4899', iconName: 'Rocket' },
];

export const DEFAULT_GATE_SUBJECTS: GateSubject[] = [
  {
    id: 'sub_em',
    name: 'Engineering Mathematics',
    code: 'EM',
    studyHours: 0,
    topics: [
      { id: 't_em1', name: 'Linear Algebra (Matrices, Eigenvalues)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
      { id: 't_em2', name: 'Calculus (Limits, Continuity, Maxima)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 30 },
      { id: 't_em3', name: 'Probability & Statistics', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
    ],
  },
  {
    id: 'sub_dm',
    name: 'Discrete Mathematics',
    code: 'DM',
    studyHours: 0,
    topics: [
      { id: 't_dm1', name: 'Propositional & First Order Logic', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 45 },
      { id: 't_dm2', name: 'Sets, Relations & Functions', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 35 },
      { id: 't_dm3', name: 'Combinatorics & Recurrence Relations', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
      { id: 't_dm4', name: 'Graph Theory (Coloring, Connectivity)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 55 },
    ],
  },
  {
    id: 'sub_ds_algo',
    name: 'Programming & Data Structures',
    code: 'PDS',
    studyHours: 0,
    topics: [
      { id: 't_pds1', name: 'C Programming & Pointers', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
      { id: 't_pds2', name: 'Arrays, Stacks, Queues, Linked Lists', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
      { id: 't_pds3', name: 'Trees, Binary Search Trees & Heaps', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 60 },
    ],
  },
  {
    id: 'sub_algo',
    name: 'Algorithms',
    code: 'ALGO',
    studyHours: 0,
    topics: [
      { id: 't_alg1', name: 'Asymptotic Analysis & Recurrences', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
      { id: 't_alg2', name: 'Divide and Conquer & Greedy', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 45 },
      { id: 't_alg3', name: 'Dynamic Programming', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
      { id: 't_alg4', name: 'Graph Search (BFS, DFS, Dijkstra, MST)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 60 },
    ],
  },
  {
    id: 'sub_toc',
    name: 'Theory of Computation',
    code: 'TOC',
    studyHours: 0,
    topics: [
      { id: 't_toc1', name: 'Regular Expressions & Finite Automata', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 60 },
      { id: 't_toc2', name: 'Context-Free Grammars & Pushdown Automata', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 45 },
      { id: 't_toc3', name: 'Turing Machines & Undecidability', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 45 },
    ],
  },
  {
    id: 'sub_cd',
    name: 'Compiler Design',
    code: 'CD',
    studyHours: 0,
    topics: [
      { id: 't_cd1', name: 'Lexical Analysis & Parsing (LL, LR)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
      { id: 't_cd2', name: 'Syntax Directed Translation', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 30 },
      { id: 't_cd3', name: 'Intermediate Code & Runtime Systems', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 25 },
    ],
  },
  {
    id: 'sub_os',
    name: 'Operating Systems',
    code: 'OS',
    studyHours: 0,
    topics: [
      { id: 't_os1', name: 'Processes, Threads & CPU Scheduling', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 55 },
      { id: 't_os2', name: 'Process Synchronization & Deadlocks', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 65 },
      { id: 't_os3', name: 'Memory Management & Virtual Memory', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 60 },
      { id: 't_os4', name: 'File Systems & Disk Scheduling', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 35 },
    ],
  },
  {
    id: 'sub_dbms',
    name: 'Database Management Systems',
    code: 'DBMS',
    studyHours: 0,
    topics: [
      { id: 't_db1', name: 'ER-Model & Relational Algebra', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
      { id: 't_db2', name: 'SQL & Normalization (1NF to BCNF)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 65 },
      { id: 't_db3', name: 'Transactions & Concurrency Control', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
      { id: 't_db4', name: 'File Organization & Indexing (B+ Trees)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
    ],
  },
  {
    id: 'sub_cn',
    name: 'Computer Networks',
    code: 'CN',
    studyHours: 0,
    topics: [
      { id: 't_cn1', name: 'Data Link Layer (Flow & Error Control)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 40 },
      { id: 't_cn2', name: 'Network Layer (IPv4/IPv6, Routing)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 55 },
      { id: 't_cn3', name: 'Transport Layer (TCP, UDP, Congestion)', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
      { id: 't_cn4', name: 'Application Layer Protocols & Security', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 35 },
    ],
  },
  {
    id: 'sub_coa',
    name: 'Computer Organization & Architecture',
    code: 'COA',
    studyHours: 0,
    topics: [
      { id: 't_coa1', name: 'Machine Instructions & Addressing Modes', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 45 },
      { id: 't_coa2', name: 'Instruction Pipelining & Hazards', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 50 },
      { id: 't_coa3', name: 'Memory Hierarchy & Cache Mapping', status: 'Not Started', revisionCount: 0, pyqSolved: 0, pyqTotal: 55 },
    ],
  },
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Ayushman',
  subtitle: 'Small progress every day. Big results over time.',
  email: 'ayushman@example.com',
  role: 'B.Tech Student & AI/Software Engineer',
  college: 'Engineering Institute',
  branch: 'Computer Science & Engineering',
  currentSemester: 5,
  graduationYear: 2026,
  targetGateYear: 2026,
  targetCgpa: 9.0,
  targetDsaCount: 300,
  bio: 'Building deep technical mastery across Computer Systems, Data Structures, Generative AI & GATE CS.',
  isLocked: false,
};

export function getInitialEmptyData(): AppData {
  return {
    profile: DEFAULT_PROFILE,
    tasks: [],
    skills: [],
    gateSettings: {
      paper: 'CS & IT',
      targetYear: 2026,
      dailyTargetHours: 3.5,
      weeklyTargetHours: 25,
    },
    gateSubjects: DEFAULT_GATE_SUBJECTS,
    gateMockTests: [],
    gatePyqLogs: [],
    gateRevisionLogs: [],
    dsaProblems: [],
    dsaTargetCount: 300,
    academicSemesters: [],
    academicAchievements: [],
    academicDocuments: [],
    projects: [],
    habits: DEFAULT_HABITS,
    journalEntries: {},
    courses: [],
    goals: [],
    activityTimeline: [
      {
        id: 'init_1',
        type: 'journal',
        action: 'Created Workspace',
        title: 'Initialized My Progress Hub digital command centre',
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

// Generate realistic starter data representing an active student journey
export function getRealisticDemoData(): AppData {
  const today = new Date().toISOString().split('T')[0];

  // Helper for generating dates relative to today
  const relativeDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  // Pre-fill GATE subject progress
  const sampleSubjects: GateSubject[] = DEFAULT_GATE_SUBJECTS.map((sub, i) => {
    if (sub.code === 'PDS') {
      return {
        ...sub,
        studyHours: 42,
        topics: sub.topics.map(t => ({
          ...t,
          status: 'Completed' as const,
          revisionCount: 2,
          pyqSolved: Math.floor(t.pyqTotal * 0.9),
        })),
      };
    }
    if (sub.code === 'ALGO') {
      return {
        ...sub,
        studyHours: 38,
        topics: sub.topics.map((t, idx) => ({
          ...t,
          status: (idx < 3 ? 'Completed' : 'In Progress') as any,
          revisionCount: idx < 2 ? 1 : 0,
          pyqSolved: Math.floor(t.pyqTotal * 0.7),
        })),
      };
    }
    if (sub.code === 'DBMS') {
      return {
        ...sub,
        studyHours: 30,
        topics: sub.topics.map((t, idx) => ({
          ...t,
          status: (idx < 2 ? 'Completed' : idx === 2 ? 'In Progress' : 'Not Started') as any,
          revisionCount: idx < 2 ? 1 : 0,
          pyqSolved: Math.floor(t.pyqTotal * 0.5),
        })),
      };
    }
    if (sub.code === 'OS') {
      return {
        ...sub,
        studyHours: 25,
        topics: sub.topics.map((t, idx) => ({
          ...t,
          status: (idx === 0 ? 'Completed' : idx === 1 ? 'In Progress' : 'Not Started') as any,
          revisionCount: 0,
          pyqSolved: Math.floor(t.pyqTotal * 0.35),
        })),
      };
    }
    return { ...sub, studyHours: i % 2 === 0 ? 8 : 0 };
  });

  // Generate 14 days of realistic journal & habit entries
  const sampleJournals: Record<string, DailyJournalEntry> = {};
  for (let i = 14; i >= 0; i--) {
    const d = relativeDate(i);
    sampleJournals[d] = {
      date: d,
      studyHours: Number((3.5 + (i % 3) * 1.2 - (i === 4 ? 2 : 0)).toFixed(1)),
      productivityScore: i === 4 ? 6 : (8 + (i % 3)),
      mood: i === 4 ? 'Challenging' : i % 2 === 0 ? 'Productive' : 'Great',
      whatStudied: `GATE Algorithms (Dynamic Programming & Graph algorithms) + LeetCode practice and React optimization patterns.`,
      whatCompleted: `Solved 3 Medium DSA problems, revised Bellman-Ford and Floyd-Warshall, implemented project backend routes.`,
      whatFailed: i % 3 === 0 ? `Could not finish OS Memory Management lecture notes.` : `None, hit all major targets.`,
      challenges: `Paging address translation math needed double-check. DP state transitions for tree queries.`,
      newLearnings: `Learned advanced RAG retrieval evaluation with cosine similarity thresholding and BM25 hybrid ranking.`,
      tomorrowPriorities: `Mock test analysis, finish Compiler Design lexical parsing PYQs, push project update.`,
      reflections: `Strong focus today. Maintaining streak gives steady momentum.`,
      habits: {
        h_coding: true,
        h_gate: i !== 5,
        h_aiml: true,
        h_college: i % 7 !== 0 && i % 7 !== 6, // weekdays
        h_reading: i % 2 === 0,
        h_exercise: i % 3 !== 0,
        h_dev: true,
      },
    };
  }

  return {
    profile: {
      ...DEFAULT_PROFILE,
      targetCgpa: 9.2,
      targetDsaCount: 350,
    },
    tasks: [
      {
        id: 'task_1',
        title: 'Revise Graph Algorithms PYQs (GATE 2018-2024)',
        completed: false,
        priority: 'high',
        category: 'gate',
        dueDate: today,
        dueTime: '15:00',
        isTopPriority: true,
      },
      {
        id: 'task_2',
        title: 'Solve 2 LeetCode Mediums on Dynamic Programming (Grid DP)',
        completed: false,
        priority: 'high',
        category: 'dsa',
        dueDate: today,
        dueTime: '18:30',
        isTopPriority: true,
      },
      {
        id: 'task_3',
        title: 'Complete Vector DB chunking pipeline for RAG project',
        completed: false,
        priority: 'high',
        category: 'project',
        dueDate: today,
        dueTime: '21:00',
        isTopPriority: true,
      },
      {
        id: 'task_4',
        title: 'Review Operating Systems Semaphore and Deadlock notes',
        completed: true,
        priority: 'medium',
        category: 'college',
        dueDate: today,
        dueTime: '11:00',
      },
      {
        id: 'task_5',
        title: 'Read paper on LangGraph & multi-agent architectures',
        completed: true,
        priority: 'medium',
        category: 'ai',
        dueDate: today,
      },
    ],
    skills: [
      {
        id: 'sk_c',
        name: 'C',
        category: 'Programming',
        proficiency: 'Advanced',
        status: 'Completed',
        progress: 90,
        startDate: '2023-08-01',
        targetDate: '2023-12-01',
        lastStudiedDate: relativeDate(2),
        resources: [
          { id: 'r1', title: 'The C Programming Language (K&R)', url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language' },
        ],
        notes: 'Mastered pointers, memory layout, dynamic allocation and system structures.',
        associatedProjects: ['Memory Allocator Simulator', 'OS Kernels'],
      },
      {
        id: 'sk_cpp',
        name: 'C++',
        category: 'Programming',
        proficiency: 'Advanced',
        status: 'Completed',
        progress: 92,
        startDate: '2023-09-01',
        targetDate: '2024-02-01',
        lastStudiedDate: relativeDate(1),
        resources: [
          { id: 'r2', title: 'LearnCpp.com', url: 'https://learncpp.com' },
          { id: 'r3', title: 'C++ STL Reference', url: 'https://cppreference.com' },
        ],
        notes: 'Primary language for Competitive Programming, DSA and GATE problem solving.',
        associatedProjects: ['DSA Problem Suite'],
      },
      {
        id: 'sk_py',
        name: 'Python',
        category: 'Programming',
        proficiency: 'Expert',
        status: 'Completed',
        progress: 95,
        startDate: '2023-06-01',
        targetDate: '2023-11-01',
        lastStudiedDate: relativeDate(0),
        resources: [
          { id: 'r4', title: 'Official Python Documentation', url: 'https://docs.python.org' },
        ],
        notes: 'Proficient in Pythonic idioms, async programming, generators, and data science ecosystems.',
        associatedProjects: ['Autonomous Agent CLI', 'RAG Engine'],
      },
      {
        id: 'sk_dsa',
        name: 'Data Structures & Algorithms',
        category: 'Programming',
        proficiency: 'Advanced',
        status: 'Practicing',
        progress: 82,
        startDate: '2023-10-01',
        targetDate: '2025-06-01',
        lastStudiedDate: relativeDate(0),
        resources: [
          { id: 'r5', title: 'Striver SDE Sheet', url: 'https://takeuforward.org' },
          { id: 'r6', title: 'NeetCode 150', url: 'https://neetcode.io' },
        ],
        notes: 'Solved 180+ problems across LeetCode, GFG. Currently focusing on Graphs & DP.',
        associatedProjects: ['DSA Visualizer'],
      },
      {
        id: 'sk_py_ai',
        name: 'Python for AI',
        category: 'AI & Machine Learning',
        proficiency: 'Advanced',
        status: 'Completed',
        progress: 88,
        startDate: '2024-01-10',
        targetDate: '2024-04-10',
        lastStudiedDate: relativeDate(4),
        resources: [{ id: 'r7', title: 'Fast.ai Practical Deep Learning', url: 'https://fast.ai' }],
        notes: 'Vectorization, broadcasting, OOP for ML pipelines.',
        associatedProjects: ['Document Intelligence Bot'],
      },
      {
        id: 'sk_math_ml',
        name: 'Mathematics for ML',
        category: 'AI & Machine Learning',
        proficiency: 'Intermediate',
        status: 'Learning',
        progress: 75,
        startDate: '2024-02-01',
        targetDate: '2024-08-01',
        lastStudiedDate: relativeDate(3),
        resources: [{ id: 'r8', title: '3Blue1Brown Linear Algebra & Calculus', url: 'https://3blue1brown.com' }],
        notes: 'Eigenvalues, SVD, Multivariate Calculus, Gradient Descent dynamics, Bayesian Probability.',
        associatedProjects: [],
      },
      {
        id: 'sk_numpy_pandas',
        name: 'NumPy & Pandas',
        category: 'AI & Machine Learning',
        proficiency: 'Advanced',
        status: 'Completed',
        progress: 90,
        startDate: '2024-01-20',
        targetDate: '2024-03-20',
        lastStudiedDate: relativeDate(5),
        resources: [{ id: 'r9', title: 'Wes McKinney Python for Data Analysis', url: 'https://wesmckinney.com/book/' }],
        notes: 'Data wrangling, indexing, aggregations, time-series transformations.',
        associatedProjects: ['Data Pipeline Engine'],
      },
      {
        id: 'sk_ml',
        name: 'Machine Learning',
        category: 'AI & Machine Learning',
        proficiency: 'Intermediate',
        status: 'Learning',
        progress: 78,
        startDate: '2024-03-01',
        targetDate: '2024-09-01',
        lastStudiedDate: relativeDate(2),
        resources: [{ id: 'r10', title: 'Andrew Ng Machine Learning Specialization', url: 'https://coursera.org' }],
        notes: 'Regression, Classification, Decision Trees, Ensembles (Random Forest, XGBoost), Evaluation Metrics.',
        associatedProjects: ['Churn Predictor'],
      },
      {
        id: 'sk_dl',
        name: 'Deep Learning',
        category: 'AI & Machine Learning',
        proficiency: 'Intermediate',
        status: 'Learning',
        progress: 70,
        startDate: '2024-05-01',
        targetDate: '2024-11-01',
        lastStudiedDate: relativeDate(1),
        resources: [{ id: 'r11', title: 'Deep Learning Specialization (deeplearning.ai)', url: 'https://deeplearning.ai' }],
        notes: 'Backpropagation, CNNs for Vision, RNNs & Transformers attention mechanisms.',
        associatedProjects: ['Vision Classifier'],
      },
      {
        id: 'sk_genai',
        name: 'Generative AI & LLMs',
        category: 'AI & Machine Learning',
        proficiency: 'Advanced',
        status: 'Practicing',
        progress: 85,
        startDate: '2024-06-01',
        targetDate: '2024-12-01',
        lastStudiedDate: relativeDate(0),
        resources: [{ id: 'r12', title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn' }],
        notes: 'Prompt Engineering, Tokenization, Fine-tuning (LoRA/QLoRA), Temperature, Top-p sampling.',
        associatedProjects: ['AI Research Synthesizer'],
      },
      {
        id: 'sk_rag',
        name: 'RAG (Retrieval-Augmented Generation)',
        category: 'AI & Machine Learning',
        proficiency: 'Advanced',
        status: 'Practicing',
        progress: 84,
        startDate: '2024-07-01',
        targetDate: '2025-01-01',
        lastStudiedDate: relativeDate(0),
        resources: [{ id: 'r13', title: 'LlamaIndex & LangChain Guides', url: 'https://docs.llamaindex.ai' }],
        notes: 'Embedding models, semantic chunking, Pinecone/Chroma, hybrid sparse-dense retrieval, reranking.',
        associatedProjects: ['My Progress Hub Knowledge Base', 'DocQA'],
      },
      {
        id: 'sk_agentic_ai',
        name: 'Agentic AI',
        category: 'AI & Machine Learning',
        proficiency: 'Intermediate',
        status: 'Learning',
        progress: 72,
        startDate: '2024-08-15',
        targetDate: '2025-03-01',
        lastStudiedDate: relativeDate(0),
        resources: [{ id: 'r14', title: 'Anthropic & OpenAI Agent Patterns', url: 'https://anthropic.com/research' }],
        notes: 'Autonomous loops, tool calling, memory management, multi-agent collaboration with LangGraph.',
        associatedProjects: ['Autonomous Dev Agent'],
      },
      {
        id: 'sk_react',
        name: 'React & Next.js',
        category: 'Development',
        proficiency: 'Advanced',
        status: 'Completed',
        progress: 92,
        startDate: '2023-11-01',
        targetDate: '2024-04-01',
        lastStudiedDate: relativeDate(0),
        resources: [{ id: 'r15', title: 'Official React 19 Docs', url: 'https://react.dev' }],
        notes: 'Hooks, Context, Server Components, Tailwind CSS, performance profiling, responsive design.',
        associatedProjects: ['My Progress Hub', 'E-commerce UI'],
      },
      {
        id: 'sk_backend',
        name: 'Backend Development',
        category: 'Development',
        proficiency: 'Intermediate',
        status: 'Practicing',
        progress: 80,
        startDate: '2024-02-01',
        targetDate: '2024-08-01',
        lastStudiedDate: relativeDate(2),
        resources: [{ id: 'r16', title: 'FastAPI & Express Docs', url: 'https://fastapi.tiangolo.com' }],
        notes: 'RESTful API architecture, JWT authentication, rate limiting, middleware, WebSocket streaming.',
        associatedProjects: ['Cloud API Gateway'],
      },
      {
        id: 'sk_db',
        name: 'Databases (SQL & NoSQL)',
        category: 'Development',
        proficiency: 'Advanced',
        status: 'Completed',
        progress: 86,
        startDate: '2024-01-01',
        targetDate: '2024-05-01',
        lastStudiedDate: relativeDate(3),
        resources: [{ id: 'r17', title: 'PostgreSQL Tutorial', url: 'https://postgresqltutorial.com' }],
        notes: 'PostgreSQL, indexing strategies, ACID guarantees, query plans, Redis caching, MongoDB.',
        associatedProjects: ['Student Portal', 'My Progress Hub'],
      },
      {
        id: 'sk_git',
        name: 'Git & GitHub',
        category: 'Development',
        proficiency: 'Expert',
        status: 'Completed',
        progress: 95,
        startDate: '2023-07-01',
        targetDate: '2023-09-01',
        lastStudiedDate: relativeDate(1),
        resources: [{ id: 'r18', title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' }],
        notes: 'Branching strategies, interactive rebase, pull request workflows, CI/CD GitHub Actions.',
        associatedProjects: ['All Repositories'],
      },
    ],
    gateSettings: {
      paper: 'CS & IT',
      targetYear: 2026,
      dailyTargetHours: 3.5,
      weeklyTargetHours: 25,
    },
    gateSubjects: sampleSubjects,
    gateMockTests: [
      {
        id: 'mt_1',
        title: 'MadeEasy Full Length Test 01',
        date: relativeDate(21),
        score: 52.33,
        totalMarks: 100,
        accuracy: 74,
        percentile: 88.5,
        weakTopics: ['Compiler Parsing (LR)', 'Cache Memory Mapping', 'Turing Reducibility'],
        notes: 'Lost 8 marks in negative marking. Need to be more disciplined about guessing in MSQs.',
      },
      {
        id: 'mt_2',
        title: 'ACE Academy Subject Mock (Algorithms & DS)',
        date: relativeDate(14),
        score: 41.5,
        totalMarks: 50,
        accuracy: 86,
        percentile: 94.2,
        weakTopics: ['Amortized Complexity', 'Dynamic Programming Recurrence Space'],
        notes: 'Strong performance on Trees and Heaps. Time management was solid.',
      },
      {
        id: 'mt_3',
        title: 'Gate Overflow Mock Exam 02',
        date: relativeDate(7),
        score: 61.67,
        totalMarks: 100,
        accuracy: 81,
        percentile: 92.8,
        weakTopics: ['Pipelining Structural Hazards', 'Calculus Maxima', 'Relational Calculus'],
        notes: 'Consistent improvement! Solved 50 out of 65 questions. Speed is improving.',
      },
      {
        id: 'mt_4',
        title: 'National Level All-India Mock 01',
        date: relativeDate(1),
        score: 67.0,
        totalMarks: 100,
        accuracy: 84.5,
        percentile: 95.4,
        weakTopics: ['Eigenvector orthogonal properties', 'TCP Congestion Window phase'],
        notes: 'Best mock score yet! Target is to push above 75 in the next 45 days.',
      },
    ],
    gatePyqLogs: [
      { id: 'pyq_1', subject: 'Algorithms', year: 2023, totalQuestions: 12, solvedCount: 11, accuracy: 91, date: relativeDate(12), notes: 'Graph algorithms questions were straightforward.' },
      { id: 'pyq_2', subject: 'Operating Systems', year: 2022, totalQuestions: 10, solvedCount: 8, accuracy: 80, date: relativeDate(9), notes: 'Deadlock avoidance problem had tricky edge cases.' },
      { id: 'pyq_3', subject: 'Database Management Systems', year: 2023, totalQuestions: 9, solvedCount: 9, accuracy: 100, date: relativeDate(5), notes: 'Full marks in SQL and Normalization!' },
      { id: 'pyq_4', subject: 'Discrete Mathematics', year: 2024, totalQuestions: 14, solvedCount: 11, accuracy: 78, date: relativeDate(2), notes: 'Generating functions question was tough.' },
    ],
    gateRevisionLogs: [
      { id: 'rev_1', subject: 'Programming & Data Structures', topic: 'Trees & Heaps', revisionRound: 2, completedDate: relativeDate(6), status: 'Completed' },
      { id: 'rev_2', subject: 'Algorithms', topic: 'Dynamic Programming', revisionRound: 1, completedDate: relativeDate(3), status: 'Completed' },
      { id: 'rev_3', subject: 'Operating Systems', topic: 'Process Synchronization', revisionRound: 2, completedDate: relativeDate(1), status: 'Completed' },
      { id: 'rev_4', subject: 'Database Management Systems', topic: 'Transactions & ACID', revisionRound: 1, completedDate: relativeDate(0), status: 'Scheduled' },
    ],
    dsaProblems: [
      {
        id: 'dsa_1',
        title: 'Two Sum',
        platform: 'LeetCode',
        topic: 'Arrays',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/two-sum/',
        approach: 'Hash Map single-pass store complement',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        solvedDate: relativeDate(35),
        revisionStatus: 'Mastered',
        notes: 'Classic lookup in hash map.',
      },
      {
        id: 'dsa_2',
        title: '3Sum',
        platform: 'LeetCode',
        topic: 'Arrays',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/3sum/',
        approach: 'Sort array + Two Pointers with duplicate skipping',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1)',
        solvedDate: relativeDate(28),
        revisionStatus: 'Mastered',
        notes: 'Be cautious of duplicate elements while incrementing pointers.',
      },
      {
        id: 'dsa_3',
        title: 'Trapping Rain Water',
        platform: 'LeetCode',
        topic: 'Arrays',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/trapping-rain-water/',
        approach: 'Two pointers with leftMax and rightMax',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        solvedDate: relativeDate(22),
        revisionStatus: 'Needs Review',
        notes: 'Water trapped is determined by the minimum of the two boundaries.',
      },
      {
        id: 'dsa_4',
        title: 'Longest Substring Without Repeating Characters',
        platform: 'LeetCode',
        topic: 'Strings',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        approach: 'Sliding window with character last index hash map',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)',
        solvedDate: relativeDate(18),
        revisionStatus: 'Mastered',
      },
      {
        id: 'dsa_5',
        title: 'Lowest Common Ancestor of a Binary Tree',
        platform: 'LeetCode',
        topic: 'Trees',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        approach: 'Post-order traversal recursive checking left and right subtrees',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        solvedDate: relativeDate(12),
        revisionStatus: 'Mastered',
      },
      {
        id: 'dsa_6',
        title: 'Course Schedule (Cycle Detection in Directed Graph)',
        platform: 'LeetCode',
        topic: 'Graphs',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/course-schedule/',
        approach: 'Kahn Algorithm (BFS with In-degree array)',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        solvedDate: relativeDate(7),
        revisionStatus: 'Mastered',
        notes: 'If processed node count < total courses, a directed cycle exists.',
      },
      {
        id: 'dsa_7',
        title: 'Coin Change',
        platform: 'LeetCode',
        topic: 'Dynamic Programming',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/coin-change/',
        approach: 'Bottom-up DP 1D table initialized to INF',
        timeComplexity: 'O(amount * coins)',
        spaceComplexity: 'O(amount)',
        solvedDate: relativeDate(3),
        revisionStatus: 'Mastered',
        notes: 'Unbounded knapsack style transition: dp[i] = min(dp[i], dp[i - c] + 1).',
      },
      {
        id: 'dsa_8',
        title: 'Edit Distance',
        platform: 'LeetCode',
        topic: 'Dynamic Programming',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/edit-distance/',
        approach: '2D DP table matching characters or taking min(insert, delete, replace) + 1',
        timeComplexity: 'O(M * N)',
        spaceComplexity: 'O(M * N)',
        solvedDate: relativeDate(1),
        revisionStatus: 'Needs Review',
        notes: 'Revisit space-optimized 1D rolling array solution.',
      },
    ],
    dsaTargetCount: 300,
    academicSemesters: [
      {
        id: 'sem_1',
        number: 1,
        name: 'Semester I',
        sgpa: 8.85,
        credits: 22,
        academicYear: '2022-2023',
        status: 'Completed',
        subjects: [
          { id: 's1', name: 'Engineering Mathematics I', code: 'MATH101', credits: 4, internalMarks: 28, externalMarks: 64, totalMarks: 92, maxMarks: 100, grade: 'O', attendancePercent: 92, assignmentStatus: 'Graded' },
          { id: 's2', name: 'Programming in C', code: 'CS101', credits: 4, internalMarks: 29, externalMarks: 67, totalMarks: 96, maxMarks: 100, grade: 'O', attendancePercent: 95, practicalMarks: 48, assignmentStatus: 'Graded' },
          { id: 's3', name: 'Engineering Physics', code: 'PHY101', credits: 3, internalMarks: 25, externalMarks: 58, totalMarks: 83, maxMarks: 100, grade: 'A+', attendancePercent: 88, assignmentStatus: 'Graded' },
          { id: 's4', name: 'Basic Electrical Engg', code: 'EE101', credits: 3, internalMarks: 24, externalMarks: 57, totalMarks: 81, maxMarks: 100, grade: 'A', attendancePercent: 86, assignmentStatus: 'Graded' },
        ],
      },
      {
        id: 'sem_2',
        number: 2,
        name: 'Semester II',
        sgpa: 9.12,
        credits: 23,
        academicYear: '2022-2023',
        status: 'Completed',
        subjects: [
          { id: 's5', name: 'Engineering Mathematics II', code: 'MATH102', credits: 4, internalMarks: 29, externalMarks: 65, totalMarks: 94, maxMarks: 100, grade: 'O', attendancePercent: 94, assignmentStatus: 'Graded' },
          { id: 's6', name: 'Data Structures & OOP in C++', code: 'CS102', credits: 4, internalMarks: 30, externalMarks: 68, totalMarks: 98, maxMarks: 100, grade: 'O', attendancePercent: 96, practicalMarks: 50, assignmentStatus: 'Graded' },
          { id: 's7', name: 'Digital Electronics', code: 'EC102', credits: 3, internalMarks: 27, externalMarks: 62, totalMarks: 89, maxMarks: 100, grade: 'A+', attendancePercent: 90, assignmentStatus: 'Graded' },
          { id: 's8', name: 'Environmental Studies', code: 'ENV102', credits: 2, internalMarks: 26, externalMarks: 60, totalMarks: 86, maxMarks: 100, grade: 'A+', attendancePercent: 89, assignmentStatus: 'Graded' },
        ],
      },
      {
        id: 'sem_3',
        number: 3,
        name: 'Semester III',
        sgpa: 8.94,
        credits: 24,
        academicYear: '2023-2024',
        status: 'Completed',
        subjects: [
          { id: 's9', name: 'Discrete Structures', code: 'CS201', credits: 4, internalMarks: 28, externalMarks: 63, totalMarks: 91, maxMarks: 100, grade: 'O', attendancePercent: 93, assignmentStatus: 'Graded' },
          { id: 's10', name: 'Computer Org & Architecture', code: 'CS202', credits: 4, internalMarks: 26, externalMarks: 60, totalMarks: 86, maxMarks: 100, grade: 'A+', attendancePercent: 91, assignmentStatus: 'Graded' },
          { id: 's11', name: 'Operating Systems', code: 'CS203', credits: 4, internalMarks: 29, externalMarks: 64, totalMarks: 93, maxMarks: 100, grade: 'O', attendancePercent: 94, practicalMarks: 49, assignmentStatus: 'Graded' },
          { id: 's12', name: 'Design & Analysis of Algorithms', code: 'CS204', credits: 4, internalMarks: 30, externalMarks: 66, totalMarks: 96, maxMarks: 100, grade: 'O', attendancePercent: 95, assignmentStatus: 'Graded' },
        ],
      },
      {
        id: 'sem_4',
        number: 4,
        name: 'Semester IV',
        sgpa: 9.25,
        credits: 24,
        academicYear: '2023-2024',
        status: 'Completed',
        subjects: [
          { id: 's13', name: 'Database Management Systems', code: 'CS205', credits: 4, internalMarks: 30, externalMarks: 68, totalMarks: 98, maxMarks: 100, grade: 'O', attendancePercent: 96, practicalMarks: 50, assignmentStatus: 'Graded' },
          { id: 's14', name: 'Theory of Computation', code: 'CS206', credits: 4, internalMarks: 29, externalMarks: 65, totalMarks: 94, maxMarks: 100, grade: 'O', attendancePercent: 94, assignmentStatus: 'Graded' },
          { id: 's15', name: 'Software Engineering', code: 'CS207', credits: 3, internalMarks: 27, externalMarks: 61, totalMarks: 88, maxMarks: 100, grade: 'A+', attendancePercent: 88, assignmentStatus: 'Graded' },
          { id: 's16', name: 'Artificial Intelligence', code: 'CS208', credits: 4, internalMarks: 29, externalMarks: 67, totalMarks: 96, maxMarks: 100, grade: 'O', attendancePercent: 92, assignmentStatus: 'Graded' },
        ],
      },
      {
        id: 'sem_5',
        number: 5,
        name: 'Semester V (Ongoing)',
        sgpa: 9.3,
        credits: 22,
        academicYear: '2024-2025',
        status: 'Current',
        subjects: [
          { id: 's17', name: 'Computer Networks', code: 'CS301', credits: 4, internalMarks: 29, externalMarks: 0, totalMarks: 29, maxMarks: 100, grade: 'In Progress', attendancePercent: 91, assignmentStatus: 'Submitted' },
          { id: 's18', name: 'Compiler Design', code: 'CS302', credits: 4, internalMarks: 28, externalMarks: 0, totalMarks: 28, maxMarks: 100, grade: 'In Progress', attendancePercent: 89, assignmentStatus: 'Submitted' },
          { id: 's19', name: 'Machine Learning & Neural Nets', code: 'CS303', credits: 4, internalMarks: 30, externalMarks: 0, totalMarks: 30, maxMarks: 100, grade: 'In Progress', attendancePercent: 95, assignmentStatus: 'Graded' },
          { id: 's20', name: 'Cloud Computing & DevOps', code: 'CS304', credits: 3, internalMarks: 27, externalMarks: 0, totalMarks: 27, maxMarks: 100, grade: 'In Progress', attendancePercent: 87, assignmentStatus: 'Pending' },
        ],
      },
    ],
    academicAchievements: [
      {
        id: 'ach_1',
        title: '1st Runner Up — Smart India Hackathon Internal College Round',
        date: '2024-09-15',
        category: 'Hackathon',
        issuer: 'Ministry of Education & Innovation Cell',
        description: 'Developed an automated AI document verification and OCR pipeline with 96% accuracy.',
      },
      {
        id: 'ach_2',
        title: 'Dean’s Honor List for Academic Excellence (Sem III & IV)',
        date: '2024-07-20',
        category: 'Honor',
        issuer: 'Faculty of Computer Science & Engineering',
        description: 'Awarded for maintaining SGPA > 9.0 in consecutive academic terms.',
      },
      {
        id: 'ach_3',
        title: 'NPTEL Elite + Gold Certification: Programming, DS & Algorithms',
        date: '2023-11-25',
        category: 'Certification',
        issuer: 'IIT Madras & NPTEL',
        description: 'Secured top 1% rank in national proctored examination.',
      },
    ],
    academicDocuments: [
      {
        id: 'doc_1',
        title: 'Semester IV Official Grade Card & Transcript',
        semesterNumber: 4,
        category: 'Marksheet',
        url: 'https://example.com/transcripts/sem4_marksheet.pdf',
        uploadDate: '2024-07-22',
        notes: 'SGPA 9.25, 24 Credits cleared with 0 backlogs.',
      },
      {
        id: 'doc_2',
        title: 'B.Tech CSE Full 4-Year Academic Syllabus & Regulations',
        semesterNumber: 5,
        category: 'Syllabus',
        url: 'https://example.com/curriculum/btech_cse_syllabus.pdf',
        uploadDate: '2023-08-10',
        notes: 'Useful reference for GATE course mapping and university exams.',
      },
    ],
    projects: [
      {
        id: 'proj_1',
        title: 'My Progress Hub — Personal Productivity Command Centre',
        description: 'A modern, high-performance personal workspace inspired by Linear & Notion to monitor technical growth, GATE preparation, DSA practice, academics and daily habits.',
        category: 'Personal',
        techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide'],
        githubUrl: 'https://github.com/ayushman/my-progress-hub',
        liveUrl: 'https://my-progress-hub.internal',
        status: 'In Progress',
        startDate: '2024-11-01',
        deadline: '2024-11-20',
        completionPercent: 88,
        milestones: [
          { id: 'm1', title: 'Architecture & Design System Setup', completed: true },
          { id: 'm2', title: 'Interactive Overview & Live Heatmaps', completed: true },
          { id: 'm3', title: 'Full GATE & DSA Tracker modules', completed: true },
          { id: 'm4', title: 'Daily Journal & Habits Engine', completed: true },
          { id: 'm5', title: 'PDF / CSV Report generation', completed: false },
        ],
        problemsFaced: 'Managing multi-table reactive state with instant offline persistence and dynamic metric recomputation.',
        futureImprovements: 'Add web-worker powered full-text search and optional Supabase PostgreSQL automatic two-way sync.',
        learningOutcomes: 'Deepened expertise in frontend system design, state machines, and SaaS-grade dashboard UX.',
      },
      {
        id: 'proj_2',
        title: 'OmniRAG — Enterprise Document Intelligence & Hybrid Search',
        description: 'Multi-modal Retrieval-Augmented Generation system with PDF chunking, Cohere reranking, and semantic vector indexing over technical papers.',
        category: 'Personal',
        techStack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'OpenAI/Gemini', 'React'],
        githubUrl: 'https://github.com/ayushman/omni-rag-engine',
        liveUrl: 'https://omnirag.demo.app',
        status: 'Completed',
        startDate: '2024-08-01',
        deadline: '2024-10-15',
        completionPercent: 100,
        milestones: [
          { id: 'm6', title: 'FastAPI async ingestion pipeline', completed: true },
          { id: 'm7', title: 'Semantic Chunking & Embedding generation', completed: true },
          { id: 'm8', title: 'BM25 + Dense vector reciprocal rank fusion', completed: true },
          { id: 'm9', title: 'Grounded citation highlighting in PDF viewer', completed: true },
        ],
        problemsFaced: 'Hallucination when context exceeds chunk token limits. Solved via self-reflective critique prompt.',
        futureImprovements: 'GraphRAG integration to map entity relationships across scientific papers.',
        learningOutcomes: 'Mastered production RAG pipelines, chunking heuristics, and evaluation frameworks.',
      },
      {
        id: 'proj_3',
        title: 'AutoCode Agent — Local Codebase Refactoring Assistant',
        description: 'Autonomous terminal assistant that parses AST trees, identifies security vulnerabilities, and generates automated Git pull requests with unit tests.',
        category: 'Hackathon',
        techStack: ['TypeScript', 'Tree-sitter', 'Gemini API', 'Node.js CLI', 'Docker'],
        githubUrl: 'https://github.com/ayushman/autocode-agent',
        status: 'Completed',
        startDate: '2024-09-10',
        deadline: '2024-09-15',
        completionPercent: 100,
        milestones: [
          { id: 'm10', title: 'AST parser with Tree-Sitter', completed: true },
          { id: 'm11', title: 'Automated test suite generator', completed: true },
          { id: 'm12', title: 'Live CLI interactive diff view', completed: true },
        ],
        problemsFaced: 'Handling arbitrary programming language syntaxes without crashing.',
        learningOutcomes: 'Tree-sitter AST queries, CLI ergonomics, token stream handling.',
      },
      {
        id: 'proj_4',
        title: 'Distributed Key-Value Store with Raft Consensus',
        description: 'A distributed consensus-driven storage node built from scratch in C++ implementing leader election, log replication, and client heartbeat protocols.',
        category: 'Academic',
        techStack: ['C++20', 'gRPC', 'Protobuf', 'POSIX Threads', 'CMake'],
        githubUrl: 'https://github.com/ayushman/raft-kv-cpp',
        status: 'In Progress',
        startDate: '2024-10-01',
        deadline: '2024-12-15',
        completionPercent: 65,
        milestones: [
          { id: 'm13', title: 'RPC interface definition with Protobuf', completed: true },
          { id: 'm14', title: 'Leader election with randomized election timer', completed: true },
          { id: 'm15', title: 'Log replication and commit index synchronization', completed: false },
          { id: 'm16', title: 'Snapshotting & log compaction', completed: false },
        ],
        problemsFaced: 'Split-vote scenarios under high network latency simulation.',
        futureImprovements: 'Add benchmark harness with Jepsen test suite.',
        learningOutcomes: 'Deep understanding of distributed consensus, split-brain avoidance, and network partition recovery.',
      },
    ],
    habits: DEFAULT_HABITS,
    journalEntries: sampleJournals,
    courses: [
      {
        id: 'c_1',
        name: 'CS106B: Programming Abstractions & Algorithms',
        instructor: 'Julie Zelenski',
        platform: 'YouTube',
        url: 'https://www.youtube.com/playlist?list=PL-XXv-cvA_iAlnSYSgwr54338350-B8hL',
        totalDurationHours: 36,
        progressPercent: 100,
        status: 'Completed',
        notes: 'Superb depth on recursion, backtracking, pointers and abstract data types.',
        relatedSkills: ['C++', 'Data Structures & Algorithms'],
      },
      {
        id: 'c_2',
        name: 'Deep Learning Specialization (5 Courses)',
        instructor: 'Andrew Ng',
        platform: 'Coursera',
        url: 'https://www.coursera.org/specializations/deep-learning',
        totalDurationHours: 65,
        progressPercent: 75,
        status: 'In Progress',
        notes: 'Currently on Course 4 (Convolutional Neural Networks). Excellent intuitive explanations.',
        relatedSkills: ['Deep Learning', 'Python for AI'],
      },
      {
        id: 'c_3',
        name: 'NPTEL: Operating System Fundamentals',
        instructor: 'Prof. Santanu Chattopadhyay, IIT Kharagpur',
        platform: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106105214',
        totalDurationHours: 40,
        progressPercent: 85,
        status: 'In Progress',
        notes: 'Highly aligned with GATE syllabus. Clear coverage of virtual memory and synchronization.',
        relatedSkills: ['Operating Systems', 'GATE Prep'],
      },
      {
        id: 'c_4',
        name: 'Building Systems with the ChatGPT & Gemini API',
        instructor: 'Isa Fulford & Andrew Ng',
        platform: 'Coursera',
        url: 'https://deeplearning.ai',
        totalDurationHours: 12,
        progressPercent: 100,
        status: 'Completed',
        notes: 'Chain of thought, moderation APIs, system prompts and evaluation techniques.',
        relatedSkills: ['Generative AI', 'Agentic AI'],
      },
    ],
    goals: [
      {
        id: 'g_1',
        title: 'Crack GATE 2026 CS with All India Rank < 100',
        category: 'Career',
        priority: 'High',
        deadline: '2026-02-15',
        progressPercent: 62,
        status: 'In Progress',
        milestones: [
          { id: 'gm1', title: 'Complete first pass of syllabus', completed: true },
          { id: 'gm2', title: 'Solve 15 years chapter-wise PYQs', completed: true },
          { id: 'gm3', title: 'Give 25 full-length mock tests and maintain 75+ avg', completed: false },
          { id: 'gm4', title: 'Final rapid formula revision and test series review', completed: false },
        ],
        notes: 'Gateway to top IISc / IIT M.Tech Research or direct PSU recruitment.',
      },
      {
        id: 'g_2',
        title: 'Reach 300+ LeetCode Solved & Knight Badge (Rating > 1850)',
        category: 'Annual',
        priority: 'High',
        deadline: '2025-06-30',
        progressPercent: 60,
        status: 'In Progress',
        milestones: [
          { id: 'gm5', title: '100 Easy problems mastery', completed: true },
          { id: 'gm6', title: '150 Medium problems mastery', completed: false },
          { id: 'gm7', title: 'Participate weekly in Sunday LeetCode Contests', completed: true },
        ],
      },
      {
        id: 'g_3',
        title: 'Maintain B.Tech Cumulative CGPA above 9.0',
        category: 'Semester',
        priority: 'High',
        deadline: '2025-01-10',
        progressPercent: 92,
        status: 'In Progress',
        milestones: [
          { id: 'gm8', title: 'Score 90%+ in internal mid-terms', completed: true },
          { id: 'gm9', title: 'Submit all lab reports and assignments before deadline', completed: true },
          { id: 'gm10', title: 'Score O grade in Computer Networks & ML', completed: false },
        ],
      },
      {
        id: 'g_4',
        title: 'Publish an Open Source Autonomous AI Agent Package',
        category: 'Monthly',
        priority: 'Medium',
        deadline: '2024-12-31',
        progressPercent: 70,
        status: 'In Progress',
        milestones: [
          { id: 'gm11', title: 'Build core CLI architecture', completed: true },
          { id: 'gm12', title: 'Write comprehensive documentation & interactive demo', completed: false },
          { id: 'gm13', title: 'Publish package to npm / PyPI with 100+ GitHub stars', completed: false },
        ],
      },
    ],
    activityTimeline: [
      { id: 'act_1', type: 'gate', action: 'Mock Test Logged', title: 'Scored 67.0/100 (95.4%ile) in National Level Mock 01', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
      { id: 'act_2', type: 'dsa', action: 'Problem Solved', title: 'Mastered LeetCode 72: Edit Distance (DP)', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
      { id: 'act_3', type: 'journal', action: 'Daily Journal Saved', title: 'Logged 4.7 study hours and updated focus targets', timestamp: new Date(Date.now() - 3600000 * 18).toISOString() },
      { id: 'act_4', type: 'project', action: 'Milestone Completed', title: 'Completed Live Heatmaps in My Progress Hub', timestamp: new Date(Date.now() - 3600000 * 28).toISOString() },
      { id: 'act_5', type: 'skill', action: 'Progress Updated', title: 'RAG & Agentic AI skill level increased to 84%', timestamp: new Date(Date.now() - 3600000 * 48).toISOString() },
    ],
  };
}

export function loadStoredData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // By default, start with realistic demo data so Ayushman can immediately see his dashboard shining!
      // In Settings, he can click "Reset to Empty" anytime or "Load Demo Data".
      const initial = getRealisticDemoData();
      saveStoredData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Failed to parse stored AppData, returning demo data', err);
    return getRealisticDemoData();
  }
}

export function saveStoredData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save AppData to localStorage', err);
  }
}

export function loadStoredTheme(): 'dark' | 'light' {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function saveStoredTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error('Failed to save theme', err);
  }
}

export function exportDataAsJSON(data: AppData): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `my-progress-hub-backup-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportSummaryCSV(data: AppData): void {
  let csvContent = 'data:text/csv;charset=utf-8,';

  // Section 1: Skills
  csvContent += '=== SKILLS ===\r\n';
  csvContent += 'Name,Category,Proficiency,Status,Progress %,Last Studied\r\n';
  data.skills.forEach(s => {
    csvContent += `"${s.name}","${s.category}","${s.proficiency}","${s.status}",${s.progress},"${s.lastStudiedDate}"\r\n`;
  });

  // Section 2: DSA Problems
  csvContent += '\r\n=== DSA PROBLEMS ===\r\n';
  csvContent += 'Title,Platform,Topic,Difficulty,Revision Status,Solved Date\r\n';
  data.dsaProblems.forEach(p => {
    csvContent += `"${p.title}","${p.platform}","${p.topic}","${p.difficulty}","${p.revisionStatus}","${p.solvedDate}"\r\n`;
  });

  // Section 3: GATE Mock Tests
  csvContent += '\r\n=== GATE MOCK TESTS ===\r\n';
  csvContent += 'Test Name,Date,Score,Total Marks,Accuracy %,Percentile\r\n';
  data.gateMockTests.forEach(m => {
    csvContent += `"${m.title}","${m.date}",${m.score},${m.totalMarks},${m.accuracy},${m.percentile || ''}\r\n`;
  });

  // Section 4: Academics
  csvContent += '\r\n=== ACADEMICS ===\r\n';
  csvContent += 'Semester,SGPA,Credits,Status\r\n';
  data.academicSemesters.forEach(sem => {
    csvContent += `"${sem.name}",${sem.sgpa},${sem.credits},"${sem.status}"\r\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `my-progress-hub-summary-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
