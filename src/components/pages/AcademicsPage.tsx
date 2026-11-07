import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Award,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Edit2,
  Printer,
  ChevronDown,
  ChevronRight,
  GraduationCap,
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
import { AcademicSemester, AcademicSubject } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';

export const AcademicsPage: React.FC = () => {
  const {
    data,
    metrics,
    addAcademicSemester,
    updateAcademicSemester,
    deleteAcademicSemester,
    addAcademicSubject,
    deleteAcademicSubject,
    addAcademicAchievement,
    deleteAcademicAchievement,
    addAcademicDocument,
    deleteAcademicDocument,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'semesters' | 'report' | 'achievements' | 'documents'>('semesters');
  const [expandedSemester, setExpandedSemester] = useState<string | null>(
    data.academicSemesters[data.academicSemesters.length - 1]?.id || null
  );

  // Modals
  const [isAddSemModal, setIsAddSemModal] = useState(false);
  const [semNumber, setSemNumber] = useState(data.academicSemesters.length + 1);
  const [semName, setSemName] = useState(`Semester ${data.academicSemesters.length + 1}`);
  const [semSgpa, setSemSgpa] = useState(9.0);
  const [semCredits, setSemCredits] = useState(24);
  const [semYear, setSemYear] = useState('2024-2025');

  const [isAddSubjectModal, setIsAddSubjectModal] = useState(false);
  const [targetSemId, setTargetSemId] = useState('');
  const [subjName, setSubjName] = useState('');
  const [subjCode, setSubjCode] = useState('');
  const [subjCredits, setSubjCredits] = useState(4);
  const [subjInternal, setSubjInternal] = useState(28);
  const [subjExternal, setSubjExternal] = useState(65);
  const [subjAttendance, setSubjAttendance] = useState(90);

  const [isAddAchModal, setIsAddAchModal] = useState(false);
  const [achTitle, setAchTitle] = useState('');
  const [achCategory, setAchCategory] = useState<'Hackathon' | 'Certification' | 'Honor' | 'Research'>('Honor');
  const [achIssuer, setAchIssuer] = useState('');
  const [achDesc, setAchDesc] = useState('');

  const [isAddDocModal, setIsAddDocModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<'Marksheet' | 'Syllabus' | 'Notes' | 'Certificate'>('Marksheet');
  const [docUrl, setDocUrl] = useState('');

  // SGPA trend data
  const sgpaTrendData = useMemo(() => {
    return data.academicSemesters.map(s => ({
      name: `Sem ${s.number}`,
      sgpa: s.sgpa,
      credits: s.credits,
    }));
  }, [data.academicSemesters]);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-950/40 via-[#131929] to-blue-950/30 border border-emerald-500/20 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>B.Tech {data.profile.branch}</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Academic Performance & Degree Tracker
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Semester-wise SGPA/CGPA analytics, subject evaluations, attendance monitoring & transcripts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-right">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Cumulative CGPA</span>
              <span className="text-2xl font-bold text-emerald-400">
                {metrics.currentCgpa > 0 ? metrics.currentCgpa.toFixed(2) : 'N/A'}
              </span>
              <span className="text-[10px] text-slate-300 block">/ 10.0 Scale</span>
            </div>

            <button
              onClick={() => setIsAddSemModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Semester</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Charts Row: CGPA Trend & Semester Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                CGPA / SGPA Progression Trend
              </h3>
              <p className="text-xs text-slate-300">Continuous academic trajectory</p>
            </div>
            <Badge variant="emerald">Target: {data.profile.targetCgpa}</Badge>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sgpaTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis domain={[7, 10]} stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [val, 'SGPA']}
                />
                <Line
                  type="monotone"
                  dataKey="sgpa"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Earned Credits by Semester</h3>
              <p className="text-xs text-slate-300">Degree credits cleared</p>
            </div>
            <span className="text-xs font-bold text-white">
              {data.academicSemesters.reduce((acc, s) => acc + s.credits, 0)} Total Credits
            </span>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sgpaTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#131929',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="credits" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Credits" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
        <div className="flex items-center gap-2">
          {[
            { id: 'semesters', label: `Semesters (${data.academicSemesters.length})`, icon: BookOpen },
            { id: 'report', label: 'Academic Report Card', icon: Printer },
            { id: 'achievements', label: `Achievements (${data.academicAchievements.length})`, icon: Award },
            { id: 'documents', label: `Transcripts & Docs (${data.academicDocuments.length})`, icon: FileText },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'achievements' && (
          <button
            onClick={() => setIsAddAchModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Achievement</span>
          </button>
        )}

        {activeTab === 'documents' && (
          <button
            onClick={() => setIsAddDocModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Document Record</span>
          </button>
        )}
      </div>

      {/* 4. Tab 1: Semester-Wise Subject Cards */}
      {activeTab === 'semesters' && (
        <div className="space-y-4">
          {data.academicSemesters.map(semester => {
            const isExpanded = expandedSemester === semester.id;
            return (
              <Card key={semester.id} className="overflow-hidden">
                {/* Semester Accordion Header */}
                <div
                  onClick={() => setExpandedSemester(isExpanded ? null : semester.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button className="text-slate-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{semester.name}</span>
                        <Badge variant={semester.status === 'Completed' ? 'emerald' : 'amber'}>
                          {semester.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {semester.academicYear} · {semester.credits} Credits · {semester.subjects.length} Subjects
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-300 block uppercase font-bold">SGPA</span>
                      <span className="text-lg font-bold text-emerald-400">{semester.sgpa.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setTargetSemId(semester.id);
                        setIsAddSubjectModal(true);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
                      title="Add Subject to this Semester"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Subjects Table */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] bg-[#0c101c]/40 p-4">
                    {semester.subjects.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">
                        No subjects added yet. Click "+" to add subjects.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-white/[0.06] pb-2">
                            <tr>
                              <th className="pb-2">Subject</th>
                              <th className="pb-2">Code</th>
                              <th className="pb-2">Credits</th>
                              <th className="pb-2">Internal (30)</th>
                              <th className="pb-2">External (70)</th>
                              <th className="pb-2">Grade</th>
                              <th className="pb-2">Attendance</th>
                              <th className="pb-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.04]">
                            {semester.subjects.map(sub => (
                              <tr key={sub.id} className="hover:bg-white/[0.02]">
                                <td className="py-2.5 font-semibold text-white">{sub.name}</td>
                                <td className="py-2.5 text-slate-400 font-mono text-[11px]">{sub.code}</td>
                                <td className="py-2.5 text-slate-300">{sub.credits}</td>
                                <td className="py-2.5 text-slate-300">{sub.internalMarks}</td>
                                <td className="py-2.5 text-slate-300">{sub.externalMarks}</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded font-bold bg-white/[0.06] text-white">
                                    {sub.grade}
                                  </span>
                                </td>
                                <td className="py-2.5">
                                  <span
                                    className={`font-semibold ${
                                      sub.attendancePercent < 80 ? 'text-amber-400' : 'text-emerald-400'
                                    }`}
                                  >
                                    {sub.attendancePercent}%
                                  </span>
                                </td>
                                <td className="py-2.5 text-right">
                                  <button
                                    onClick={() => deleteAcademicSubject(semester.id, sub.id)}
                                    className="p-1 text-slate-500 hover:text-rose-400"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* 5. Tab 2: Printable Academic Report Card */}
      {activeTab === 'report' && (
        <Card className="p-8 bg-white dark:bg-[#131929] print:bg-white print:text-black">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.1] print:border-black/20">
            <div>
              <h2 className="text-xl font-bold text-white print:text-black">
                Official Degree Progress & Transcript Summary
              </h2>
              <p className="text-xs text-slate-300 print:text-slate-600 mt-1">
                Student: {data.profile.name} · Branch: {data.profile.branch} · College: {data.profile.college}
              </p>
            </div>
            <button
              onClick={handlePrintReport}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 print:hidden"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <div className="py-6 grid grid-cols-3 gap-4 text-center border-b border-white/[0.08] print:border-black/10">
            <div className="p-3 bg-white/[0.02] rounded-xl">
              <span className="text-[10px] text-slate-300 print:text-slate-600 uppercase font-bold block">
                Cumulative CGPA
              </span>
              <span className="text-3xl font-extrabold text-emerald-400 print:text-emerald-700">
                {metrics.currentCgpa.toFixed(2)}
              </span>
            </div>
            <div className="p-3 bg-white/[0.02] rounded-xl">
              <span className="text-[10px] text-slate-300 print:text-slate-600 uppercase font-bold block">
                Total Credits Cleared
              </span>
              <span className="text-3xl font-extrabold text-white print:text-black">
                {data.academicSemesters.reduce((acc, s) => acc + s.credits, 0)}
              </span>
            </div>
            <div className="p-3 bg-white/[0.02] rounded-xl">
              <span className="text-[10px] text-slate-300 print:text-slate-600 uppercase font-bold block">
                Active Backlogs
              </span>
              <span className="text-3xl font-extrabold text-cyan-400 print:text-cyan-700">0</span>
            </div>
          </div>

          {/* Semesters list */}
          <div className="py-6 space-y-6">
            {data.academicSemesters.map(sem => (
              <div key={sem.id} className="border border-white/[0.08] print:border-black/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-white print:text-black text-sm">
                    {sem.name} ({sem.academicYear})
                  </h3>
                  <span className="text-xs font-bold text-emerald-400 print:text-emerald-700">
                    SGPA: {sem.sgpa.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-1">
                  {sem.subjects.map(s => (
                    <div key={s.id} className="flex justify-between text-xs py-1 border-b border-white/[0.04]">
                      <span className="text-slate-300 print:text-slate-800">
                        {s.code} - {s.name} ({s.credits} Credits)
                      </span>
                      <span className="font-mono font-bold text-white print:text-black">{s.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 6. Tab 3: Academic Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.academicAchievements.map(ach => (
            <Card key={ach.id} glow="purple" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="purple">{ach.category}</Badge>
                  <button
                    onClick={() => deleteAcademicAchievement(ach.id)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-white mb-1">{ach.title}</h3>
                <p className="text-xs text-purple-300 mb-2 font-medium">Issued by: {ach.issuer}</p>
                <p className="text-xs text-slate-300">{ach.description}</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] text-[11px] text-slate-300 mt-4 flex items-center justify-between">
                <span>{ach.date}</span>
                {ach.link && (
                  <a
                    href={ach.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Certificate</span>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 7. Tab 4: Documents & Transcripts */}
      {activeTab === 'documents' && (
        <div className="space-y-3">
          {data.academicDocuments.map(doc => (
            <Card key={doc.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                  <p className="text-xs text-slate-300">
                    Sem {doc.semesterNumber} · {doc.category} · Added {doc.uploadDate}
                  </p>
                  {doc.notes && <p className="text-[11px] text-slate-300 mt-0.5">{doc.notes}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-white hover:bg-white/[0.1] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open</span>
                </a>
                <button
                  onClick={() => deleteAcademicDocument(doc.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Semester Modal */}
      <Modal
        isOpen={isAddSemModal}
        onClose={() => setIsAddSemModal(false)}
        title="Add Academic Semester"
        subtitle="Record term SGPA and credits"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Semester Name</label>
            <input
              type="text"
              value={semName}
              onChange={e => setSemName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SGPA</label>
              <input
                type="number"
                step="0.01"
                value={semSgpa}
                onChange={e => setSemSgpa(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Credits</label>
              <input
                type="number"
                value={semCredits}
                onChange={e => setSemCredits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsAddSemModal(false)} className="px-3 py-1.5 text-xs text-slate-400">
              Cancel
            </button>
            <button
              onClick={() => {
                addAcademicSemester({
                  number: semNumber,
                  name: semName,
                  sgpa: semSgpa,
                  credits: semCredits,
                  academicYear: semYear,
                  status: 'Completed',
                  subjects: [],
                });
                setIsAddSemModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Add Semester
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isAddSubjectModal}
        onClose={() => setIsAddSubjectModal(false)}
        title="Add Subject to Semester"
        subtitle="Enter internal/external marks and attendance"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Name *</label>
            <input
              type="text"
              placeholder="e.g. Distributed Operating Systems"
              value={subjName}
              onChange={e => setSubjName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Code</label>
              <input
                type="text"
                placeholder="CS401"
                value={subjCode}
                onChange={e => setSubjCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Credits</label>
              <input
                type="number"
                value={subjCredits}
                onChange={e => setSubjCredits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Internal (30)</label>
              <input
                type="number"
                value={subjInternal}
                onChange={e => setSubjInternal(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">External (70)</label>
              <input
                type="number"
                value={subjExternal}
                onChange={e => setSubjExternal(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Attendance %</label>
              <input
                type="number"
                value={subjAttendance}
                onChange={e => setSubjAttendance(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsAddSubjectModal(false)} className="px-3 py-1.5 text-xs text-slate-400">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!subjName.trim() || !targetSemId) return;
                const tot = subjInternal + subjExternal;
                const grade = tot >= 90 ? 'O' : tot >= 80 ? 'A+' : tot >= 70 ? 'A' : 'B';
                addAcademicSubject(targetSemId, {
                  name: subjName.trim(),
                  code: subjCode.trim().toUpperCase() || 'CS100',
                  credits: subjCredits,
                  internalMarks: subjInternal,
                  externalMarks: subjExternal,
                  totalMarks: tot,
                  maxMarks: 100,
                  grade,
                  attendancePercent: subjAttendance,
                  assignmentStatus: 'Graded',
                });
                setIsAddSubjectModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Add Subject
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Achievement Modal */}
      <Modal
        isOpen={isAddAchModal}
        onClose={() => setIsAddAchModal(false)}
        title="Add Academic Achievement"
        subtitle="Record awards, certifications, or hackathons"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Achievement Title *</label>
            <input
              type="text"
              placeholder="e.g. 1st Place at National Hackathon"
              value={achTitle}
              onChange={e => setAchTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Issuer / Organization</label>
            <input
              type="text"
              placeholder="e.g. IIT Bombay / NPTEL"
              value={achIssuer}
              onChange={e => setAchIssuer(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={achDesc}
              onChange={e => setAchDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsAddAchModal(false)} className="px-3 py-1.5 text-xs text-slate-400">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!achTitle.trim()) return;
                addAcademicAchievement({
                  title: achTitle.trim(),
                  date: new Date().toISOString().split('T')[0],
                  category: achCategory,
                  issuer: achIssuer.trim() || 'University',
                  description: achDesc.trim(),
                });
                setIsAddAchModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Save Achievement
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Document Modal */}
      <Modal
        isOpen={isAddDocModal}
        onClose={() => setIsAddDocModal(false)}
        title="Add Academic Document Record"
        subtitle="Save link to PDF marksheets, transcripts, and syllabi"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Document Title *</label>
            <input
              type="text"
              placeholder="e.g. Semester 4 Official Grade Card"
              value={docTitle}
              onChange={e => setDocTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">URL / Link *</label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={docUrl}
              onChange={e => setDocUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsAddDocModal(false)} className="px-3 py-1.5 text-xs text-slate-400">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!docTitle.trim() || !docUrl.trim()) return;
                addAcademicDocument({
                  title: docTitle.trim(),
                  semesterNumber: 4,
                  category: docCategory,
                  url: docUrl.trim(),
                  uploadDate: new Date().toISOString().split('T')[0],
                });
                setIsAddDocModal(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Add Document
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
