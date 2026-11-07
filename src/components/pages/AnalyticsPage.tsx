import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Code2,
  FolderGit2,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { exportDataAsJSON, exportSummaryCSV } from '../../utils/storage';

export const AnalyticsPage: React.FC = () => {
  const { data, metrics } = useApp();

  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('30d');

  // Trend data based on journal entries
  const trendData = useMemo(() => {
    const daysCount = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 60;
    const result = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const entry = data.journalEntries[dateKey];
      result.push({
        date: d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
        hours: entry ? entry.studyHours : 0,
        productivity: entry ? entry.productivityScore * 10 : 0,
      });
    }
    return result;
  }, [data.journalEntries, dateRange]);

  // Skill category progress
  const skillsCategoryData = useMemo(() => {
    const cats = ['Programming', 'AI & Machine Learning', 'Development'];
    return cats.map(cat => {
      const filtered = data.skills.filter(s => s.category === cat);
      const avg = filtered.length > 0
        ? Math.round(filtered.reduce((acc, s) => acc + s.progress, 0) / filtered.length)
        : 0;
      return { name: cat, avgProgress: avg, count: filtered.length };
    });
  }, [data.skills]);

  // DSA difficulty pie
  const dsaPieData = useMemo(() => {
    let e = 0, m = 0, h = 0;
    data.dsaProblems.forEach(p => {
      if (p.difficulty === 'Easy') e++;
      if (p.difficulty === 'Medium') m++;
      if (p.difficulty === 'Hard') h++;
    });
    return [
      { name: 'Easy', value: e, color: '#10b981' },
      { name: 'Medium', value: m, color: '#f59e0b' },
      { name: 'Hard', value: h, color: '#f43f5e' },
    ];
  }, [data.dsaProblems]);

  // GATE Subject Hours
  const gateSubjectHours = useMemo(() => {
    return data.gateSubjects.map(s => ({
      name: s.code || s.name.slice(0, 6),
      hours: s.studyHours,
    }));
  }, [data.gateSubjects]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            Executive Reports & Analytics
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Aggregated intelligence across consistency, exam prep, algorithms and academic growth
          </p>
        </div>

        {/* Date Filter & Export Actions */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white/[0.04] rounded-xl border border-white/[0.08] flex gap-1 text-xs">
            {(['7d', '30d', 'all'] as const).map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  dateRange === range
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={() => exportSummaryCSV(data)}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
            title="Export CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-xs text-slate-300 block mb-1">Total Study Hours</span>
          <span className="text-2xl font-bold text-white">{metrics.totalStudyHours} hrs</span>
          <p className="text-[11px] text-purple-300 mt-1">Logged across all modules</p>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-300 block mb-1">GATE Syllabus Complete</span>
          <span className="text-2xl font-bold text-indigo-400">{metrics.gateProgressPercent}%</span>
          <p className="text-[11px] text-indigo-300 mt-1">Core curriculum coverage</p>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-300 block mb-1">DSA Problems Mastered</span>
          <span className="text-2xl font-bold text-cyan-400">{metrics.dsaSolvedCount}</span>
          <p className="text-[11px] text-cyan-300 mt-1">Algorithms & Data Structures</p>
        </Card>
        <Card className="p-4">
          <span className="text-xs text-slate-300 block mb-1">Current B.Tech CGPA</span>
          <span className="text-2xl font-bold text-emerald-400">{metrics.currentCgpa.toFixed(2)}</span>
          <p className="text-[11px] text-emerald-300 mt-1">Degree cumulative score</p>
        </Card>
      </div>

      {/* 3. Deep Work & Study Consistency Area Chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Daily Study Hours & Productivity Progression
            </h3>
            <p className="text-xs text-slate-300">Continuous daily momentum tracker</p>
          </div>
          <Badge variant="purple">{dateRange.toUpperCase()}</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#131929',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#areaHours)"
                name="Study Hours"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 4. Two-Column Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GATE Subject Study Hours */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                GATE Subject Study Distribution
              </h3>
              <p className="text-xs text-slate-300">Hours spent per subject</p>
            </div>
            <span className="text-xs text-indigo-300 font-semibold">GATE CS</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gateSubjectHours} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val} hrs`, 'Study Hours']}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* DSA Difficulty Breakdown */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                DSA Problem Difficulty Breakdown
              </h3>
              <p className="text-xs text-slate-300">Ratio of Easy vs Medium vs Hard</p>
            </div>
            <Badge variant="cyan">{data.dsaProblems.length} Problems</Badge>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dsaPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dsaPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
