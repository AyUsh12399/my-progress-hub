import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Plus,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Calendar,
  Trash2,
  Edit2,
  FileText,
  BarChart2,
  Award,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import {
  GateTopicStatus,
  GateMockTest,
  GatePyqLog,
  GateRevisionLog,
} from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';

export const GatePage: React.FC = () => {
  const {
    data,
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
  } = useApp();

  const [activeTab, setActiveTab] = useState<'syllabus' | 'mocks' | 'pyqs' | 'analytics'>('syllabus');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(data.gateSubjects[0]?.id || null);

  // Modals
  const [isAddSubjectModal, setIsAddSubjectModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');

  const [isAddTopicModal, setIsAddTopicModal] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [newTopicName, setNewTopicName] = useState('');

  const [isAddMockModal, setIsAddMockModal] = useState(false);
  const [mockTitle, setMockTitle] = useState('');
  const [mockDate, setMockDate] = useState(new Date().toISOString().split('T')[0]);
  const [mockScore, setMockScore] = useState(60);
  const [mockTotalMarks, setMockTotalMarks] = useState(100);
  const [mockAccuracy, setMockAccuracy] = useState(80);
  const [mockPercentile, setMockPercentile] = useState(90);
  const [mockWeakTopics, setMockWeakTopics] = useState('');
  const [mockNotes, setMockNotes] = useState('');

  const [isAddPyqModal, setIsAddPyqModal] = useState(false);
  const [pyqSubject, setPyqSubject] = useState(data.gateSubjects[0]?.name || 'Algorithms');
  const [pyqYear, setPyqYear] = useState(2024);
  const [pyqTotal, setPyqTotal] = useState(15);
  const [pyqSolved, setPyqSolved] = useState(12);
  const [pyqNotes, setPyqNotes] = useState('');

  // Overall syllabus stats
  const { totalTopics, completedTopics, overallProgress, totalGateHours } = useMemo(() => {
    let tot = 0;
    let comp = 0;
    let hrs = 0;
    data.gateSubjects.forEach(s => {
      hrs += s.studyHours || 0;
      s.topics.forEach(t => {
        tot++;
        if (t.status === 'Completed') comp++;
      });
    });
    const prog = tot > 0 ? Math.round((comp / tot) * 100) : 0;
    return { totalTopics: tot, completedTopics: comp, overallProgress: prog, totalGateHours: hrs };
  }, [data.gateSubjects]);

  // Weak topics identified across mock tests
  const allWeakTopics = useMemo(() => {
    const list: string[] = [];
    data.gateMockTests.forEach(m => {
      m.weakTopics.forEach(wt => {
        if (!list.includes(wt)) list.push(wt);
      });
    });
    return list;
  }, [data.gateMockTests]);

  // Mock test score trends data
  const mockChartData = useMemo(() => {
    return [...data.gateMockTests]
      .reverse()
      .map(m => ({
        name: m.title.length > 15 ? m.title.slice(0, 15) + '...' : m.title,
        score: m.score,
        accuracy: m.accuracy,
        percentile: m.percentile || 0,
      }));
  }, [data.gateMockTests]);

  // Subject Progress Bars data
  const subjectProgressData = useMemo(() => {
    return data.gateSubjects.map(s => {
      const tot = s.topics.length;
      const comp = s.topics.filter(t => t.status === 'Completed').length;
      const pct = tot > 0 ? Math.round((comp / tot) * 100) : 0;
      return {
        name: s.code || s.name.slice(0, 8),
        fullName: s.name,
        progress: pct,
        hours: s.studyHours,
      };
    });
  }, [data.gateSubjects]);

  const handleToggleTopicStatus = (subjectId: string, topicId: string, currentStatus: GateTopicStatus) => {
    const nextStatus: GateTopicStatus =
      currentStatus === 'Completed'
        ? 'Not Started'
        : currentStatus === 'Not Started'
        ? 'In Progress'
        : currentStatus === 'In Progress'
        ? 'Completed'
        : 'Completed';
    updateGateTopic(subjectId, topicId, { status: nextStatus });
  };

  const handleIncrementRevision = (subjectId: string, topicId: string, currentRev: number, subName: string, topicName: string) => {
    updateGateTopic(subjectId, topicId, { revisionCount: currentRev + 1 });
    addGateRevisionLog({
      subject: subName,
      topic: topicName,
      revisionRound: ((currentRev % 3) + 1) as any,
      completedDate: new Date().toISOString().split('T')[0],
      status: 'Completed',
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner & Exam Settings */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-950/40 via-[#131929] to-purple-950/30 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Target All India Rank (AIR &lt; 100)</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              GATE {data.gateSettings.targetYear} — {data.gateSettings.paper} Workspace
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Subject-wise mastery, PYQ practice tracking, mock exams analysis, and revision cycles
            </p>
          </div>

          {/* Quick Exam Config */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.04] p-2 rounded-xl border border-white/[0.08]">
            <select
              value={data.gateSettings.paper}
              onChange={e => updateGateSettings({ paper: e.target.value })}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.1] text-xs text-white"
            >
              <option value="CS & IT">CS & IT (Computer Science)</option>
              <option value="DA (Data Science & AI)">DA (Data Science & AI)</option>
              <option value="ECE">ECE</option>
            </select>

            <select
              value={data.gateSettings.targetYear}
              onChange={e => updateGateSettings({ targetYear: Number(e.target.value) })}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.1] text-xs text-white"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
            </select>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>{overallProgress}% Syllabus Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card glow="purple" className="p-4">
          <span className="text-xs text-slate-300 block mb-1">Syllabus Completion</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{overallProgress}%</span>
            <span className="text-xs text-slate-300">
              ({completedTopics}/{totalTopics} topics)
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar value={overallProgress} size="sm" color="gradient" />
          </div>
        </Card>

        <Card glow="blue" className="p-4">
          <span className="text-xs text-slate-300 block mb-1">Logged Study Hours</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{totalGateHours}</span>
            <span className="text-xs text-slate-300">hours</span>
          </div>
          <p className="text-[11px] text-blue-300 mt-2">
            Target: {data.gateSettings.weeklyTargetHours} hrs / week
          </p>
        </Card>

        <Card glow="cyan" className="p-4">
          <span className="text-xs text-slate-300 block mb-1">Latest Mock Score</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {data.gateMockTests[0]?.score || 0}
            </span>
            <span className="text-xs text-slate-300">/ 100</span>
          </div>
          <p className="text-[11px] text-cyan-300 mt-2">
            {data.gateMockTests[0]
              ? `${data.gateMockTests[0].accuracy}% accuracy (${data.gateMockTests[0].percentile || 90}%ile)`
              : 'No mock tests logged yet'}
          </p>
        </Card>

        <Card glow="purple" className="p-4">
          <span className="text-xs text-slate-300 block mb-1">Identified Weak Areas</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">{allWeakTopics.length}</span>
            <span className="text-xs text-slate-300">topics</span>
          </div>
          <p className="text-[11px] text-amber-300 mt-2">Prioritize for next revision round</p>
        </Card>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
        <div className="flex items-center gap-2">
          {[
            { id: 'syllabus', label: 'Subject & Topic Tracker', icon: BookOpen },
            { id: 'mocks', label: `Mock Tests (${data.gateMockTests.length})`, icon: Award },
            { id: 'pyqs', label: `PYQ Practice (${data.gatePyqLogs.length})`, icon: FileText },
            { id: 'analytics', label: 'GATE Analytics', icon: BarChart2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'syllabus' && (
          <button
            onClick={() => setIsAddSubjectModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Subject</span>
          </button>
        )}

        {activeTab === 'mocks' && (
          <button
            onClick={() => setIsAddMockModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Mock Test</span>
          </button>
        )}

        {activeTab === 'pyqs' && (
          <button
            onClick={() => setIsAddPyqModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log PYQ Session</span>
          </button>
        )}
      </div>

      {/* 4. Tab 1: Expandable Subject & Topic Tracker */}
      {activeTab === 'syllabus' && (
        <div className="space-y-3">
          {data.gateSubjects.map(subject => {
            const isExpanded = expandedSubject === subject.id;
            const completedCount = subject.topics.filter(t => t.status === 'Completed').length;
            const subProgress =
              subject.topics.length > 0
                ? Math.round((completedCount / subject.topics.length) * 100)
                : 0;

            return (
              <Card key={subject.id} className="overflow-hidden border-white/[0.08]">
                {/* Subject Accordion Header */}
                <div
                  onClick={() => setExpandedSubject(isExpanded ? null : subject.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button className="text-slate-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{subject.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                          {subject.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {completedCount} of {subject.topics.length} topics completed · {subject.studyHours} hrs logged
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-28 hidden sm:block">
                      <ProgressBar value={subProgress} size="sm" showLabel />
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedSubjectId(subject.id);
                        setNewTopicName('');
                        setIsAddTopicModal(true);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="Add Topic to this Subject"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Topics Table when expanded */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] bg-[#0c101c]/40 p-4 space-y-2">
                    {subject.topics.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">
                        No topics added yet. Click "+" to add topics.
                      </p>
                    ) : (
                      subject.topics.map(topic => (
                        <div
                          key={topic.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] gap-2 transition-all"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <button
                              onClick={() => handleToggleTopicStatus(subject.id, topic.id, topic.status)}
                              className="shrink-0"
                            >
                              {topic.status === 'Completed' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : topic.status === 'In Progress' ? (
                                <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-slate-600 hover:border-indigo-400" />
                              )}
                            </button>

                            <div className="min-w-0">
                              <p
                                className={`text-xs font-medium truncate ${
                                  topic.status === 'Completed' ? 'text-slate-300' : 'text-white'
                                }`}
                              >
                                {topic.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 ml-7 sm:ml-0">
                            {/* Status badge toggle */}
                            <Badge
                              variant={
                                topic.status === 'Completed'
                                  ? 'emerald'
                                  : topic.status === 'In Progress'
                                  ? 'amber'
                                  : 'slate'
                              }
                              onClick={() => handleToggleTopicStatus(subject.id, topic.id, topic.status)}
                            >
                              {topic.status}
                            </Badge>

                            {/* Revision counter button */}
                            <button
                              onClick={() =>
                                handleIncrementRevision(
                                  subject.id,
                                  topic.id,
                                  topic.revisionCount,
                                  subject.name,
                                  topic.name
                                )
                              }
                              className="px-2 py-0.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] hover:bg-purple-500/20 flex items-center gap-1 transition-colors"
                              title="Click to increment revision round"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Rev: {topic.revisionCount}</span>
                            </button>

                            {/* PYQ Counter */}
                            <span className="text-[11px] text-slate-300">
                              PYQs: {topic.pyqSolved}/{topic.pyqTotal}
                            </span>

                            {/* Delete topic */}
                            <button
                              onClick={() => deleteGateTopic(subject.id, topic.id)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete topic"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* 5. Tab 2: Mock Tests */}
      {activeTab === 'mocks' && (
        <div className="space-y-4">
          {data.gateMockTests.length === 0 ? (
            <Card className="p-8 text-center">
              <Award className="w-10 h-10 text-indigo-400 mx-auto mb-2 opacity-70" />
              <p className="text-sm font-semibold text-white">No Mock Tests Logged</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Record your full-length or subject-wise mock test results to analyze score trends.
              </p>
              <button
                onClick={() => setIsAddMockModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Log Mock Test
              </button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.gateMockTests.map(mock => (
                <Card key={mock.id} glow="purple" className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {mock.date}
                      </span>
                      <button
                        onClick={() => deleteGateMockTest(mock.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{mock.title}</h3>

                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3 text-center">
                      <div>
                        <span className="text-[10px] text-slate-300 block">Score</span>
                        <span className="text-base font-bold text-white">
                          {mock.score}/{mock.totalMarks}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-300 block">Accuracy</span>
                        <span className="text-base font-bold text-cyan-400">{mock.accuracy}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-300 block">Percentile</span>
                        <span className="text-base font-bold text-indigo-400">
                          {mock.percentile ? `${mock.percentile}%` : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Weak topics tag */}
                    {mock.weakTopics && mock.weakTopics.length > 0 && (
                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-amber-400 mb-1 block">
                          Identified Weak Topics:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {mock.weakTopics.map((wt, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300"
                            >
                              {wt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {mock.notes && (
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {mock.notes}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Tab 3: PYQs Logs */}
      {activeTab === 'pyqs' && (
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Previous Year Questions Log</h3>
                <p className="text-xs text-slate-300">Chapter-wise practice accuracy</p>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {data.gatePyqLogs.map(log => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{log.subject}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-[10px] text-slate-300">
                        GATE {log.year}
                      </span>
                    </div>
                    {log.notes && <p className="text-[11px] text-slate-300 mt-1">{log.notes}</p>}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-bold text-white">
                        {log.solvedCount} / {log.totalQuestions} Solved
                      </span>
                      <span className="text-[11px] text-emerald-400 block font-semibold">
                        {log.accuracy}% Accuracy
                      </span>
                    </div>

                    <button
                      onClick={() => deleteGatePyqLog(log.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 7. Tab 4: GATE Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mock Test Score Trends */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-white mb-1">Mock Exam Score Trends</h3>
              <p className="text-xs text-slate-300 mb-4">Progression over tests</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#131929',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} name="Score" dot={{ fill: '#8b5cf6' }} />
                    <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" strokeWidth={2} name="Accuracy %" dot={{ fill: '#06b6d4' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Subject-wise Progress Bars */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-white mb-1">Subject Completion Breakdown</h3>
              <p className="text-xs text-slate-300 mb-4">Completion % across core subjects</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectProgressData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#131929',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                      }}
                      formatter={(val: any) => [`${val}%`, 'Completion']}
                    />
                    <Bar dataKey="progress" fill="#6366f1" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Identified Weak Topics Summary */}
          {allWeakTopics.length > 0 && (
            <Card className="p-5">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Consolidated Weak Areas for Intensive Revision
              </h3>
              <p className="text-xs text-slate-300 mb-3">
                Identified automatically from negative marks and mock test error logs
              </p>
              <div className="flex flex-wrap gap-2">
                {allWeakTopics.map((wt, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium"
                  >
                    ⚠️ {wt}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Add Subject Modal */}
      <Modal
        isOpen={isAddSubjectModal}
        onClose={() => setIsAddSubjectModal(false)}
        title="Add GATE Subject"
        subtitle="Add a new course or subject to your GATE preparation tracker"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Name *</label>
            <input
              type="text"
              placeholder="e.g. Computer Networks"
              value={newSubName}
              onChange={e => setNewSubName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Code *</label>
            <input
              type="text"
              placeholder="e.g. CN"
              value={newSubCode}
              onChange={e => setNewSubCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white uppercase"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsAddSubjectModal(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!newSubName.trim() || !newSubCode.trim()) return;
                addGateSubject(newSubName.trim(), newSubCode.trim());
                setIsAddSubjectModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Add Subject
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Topic Modal */}
      <Modal
        isOpen={isAddTopicModal}
        onClose={() => setIsAddTopicModal(false)}
        title="Add Topic to Subject"
        subtitle="Define a new concept/chapter to monitor"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topic Name *</label>
            <input
              type="text"
              placeholder="e.g. Dynamic Programming on Trees"
              value={newTopicName}
              onChange={e => setNewTopicName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsAddTopicModal(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!newTopicName.trim() || !selectedSubjectId) return;
                addGateTopic(selectedSubjectId, newTopicName.trim());
                setIsAddTopicModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Add Topic
            </button>
          </div>
        </div>
      </Modal>

      {/* Record Mock Test Modal */}
      <Modal
        isOpen={isAddMockModal}
        onClose={() => setIsAddMockModal(false)}
        title="Record Mock Test Result"
        subtitle="Track marks, accuracy and error analysis"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Test Name *</label>
            <input
              type="text"
              placeholder="e.g. MadeEasy Full Length Mock 02"
              value={mockTitle}
              onChange={e => setMockTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Marks Obtained</label>
              <input
                type="number"
                step="0.1"
                value={mockScore}
                onChange={e => setMockScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Marks</label>
              <input
                type="number"
                value={mockTotalMarks}
                onChange={e => setMockTotalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Accuracy %</label>
              <input
                type="number"
                value={mockAccuracy}
                onChange={e => setMockAccuracy(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Weak Topics Identified (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Cache Mapping, LR Parser, Pointers"
              value={mockWeakTopics}
              onChange={e => setMockWeakTopics(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Analysis & Notes</label>
            <textarea
              rows={2}
              placeholder="What went wrong? Negative marking observations..."
              value={mockNotes}
              onChange={e => setMockNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsAddMockModal(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!mockTitle.trim()) return;
                addGateMockTest({
                  title: mockTitle.trim(),
                  date: mockDate,
                  score: mockScore,
                  totalMarks: mockTotalMarks,
                  accuracy: mockAccuracy,
                  percentile: mockPercentile,
                  weakTopics: mockWeakTopics
                    ? mockWeakTopics.split(',').map(s => s.trim()).filter(Boolean)
                    : [],
                  notes: mockNotes,
                });
                setIsAddMockModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Save Mock Result
            </button>
          </div>
        </div>
      </Modal>

      {/* Record PYQ Modal */}
      <Modal
        isOpen={isAddPyqModal}
        onClose={() => setIsAddPyqModal(false)}
        title="Log PYQ Practice Session"
        subtitle="Record past year paper questions solved"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
            <select
              value={pyqSubject}
              onChange={e => setPyqSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white"
            >
              {data.gateSubjects.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GATE Year</label>
              <input
                type="number"
                value={pyqYear}
                onChange={e => setPyqYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total</label>
              <input
                type="number"
                value={pyqTotal}
                onChange={e => setPyqTotal(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Solved Correct</label>
              <input
                type="number"
                value={pyqSolved}
                onChange={e => setPyqSolved(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsAddPyqModal(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const acc = pyqTotal > 0 ? Math.round((pyqSolved / pyqTotal) * 100) : 0;
                addGatePyqLog({
                  subject: pyqSubject,
                  year: pyqYear,
                  totalQuestions: pyqTotal,
                  solvedCount: pyqSolved,
                  accuracy: acc,
                  date: new Date().toISOString().split('T')[0],
                  notes: pyqNotes,
                });
                setIsAddPyqModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Save PYQ Log
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
