import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Save,
  CheckCircle2,
  Lock,
  Sun,
  Moon,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { exportDataAsJSON, exportSummaryCSV } from '../../utils/storage';

export const SettingsPage: React.FC = () => {
  const {
    data,
    updateProfile,
    theme,
    toggleTheme,
    resetToEmpty,
    loadDemoData,
    importJSONData,
  } = useApp();

  const [name, setName] = useState(data.profile.name);
  const [subtitle, setSubtitle] = useState(data.profile.subtitle);
  const [email, setEmail] = useState(data.profile.email);
  const [role, setRole] = useState(data.profile.role);
  const [college, setCollege] = useState(data.profile.college);
  const [branch, setBranch] = useState(data.profile.branch);
  const [currentSemester, setCurrentSemester] = useState(data.profile.currentSemester);
  const [graduationYear, setGraduationYear] = useState(data.profile.graduationYear);
  const [targetGateYear, setTargetGateYear] = useState(data.profile.targetGateYear);
  const [targetCgpa, setTargetCgpa] = useState(data.profile.targetCgpa);
  const [targetDsaCount, setTargetDsaCount] = useState(data.profile.targetDsaCount);
  const [bio, setBio] = useState(data.profile.bio);

  const [pinCode, setPinCode] = useState(data.profile.pinCode || '');
  const [isLocked, setIsLocked] = useState(data.profile.isLocked);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      subtitle: subtitle.trim(),
      email: email.trim(),
      role: role.trim(),
      college: college.trim(),
      branch: branch.trim(),
      currentSemester: Number(currentSemester),
      graduationYear: Number(graduationYear),
      targetGateYear: Number(targetGateYear),
      targetCgpa: Number(targetCgpa),
      targetDsaCount: Number(targetDsaCount),
      bio: bio.trim(),
      pinCode: pinCode.trim() || undefined,
      isLocked: isLocked && Boolean(pinCode.trim()),
    });
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.gateSubjects) {
          importJSONData(parsed);
          alert('Workspace state imported successfully!');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-4xl">
      {/* 1. Header Banner */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-400" />
          Workspace Settings & Personalization
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Configure profile details, security PIN, theme preferences, and data backups
        </p>
      </div>

      {/* 2. Profile Configuration Form */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-white mb-4 pb-2 border-b border-white/[0.08] flex items-center gap-2">
          <User className="w-4 h-4 text-purple-400" />
          Personal Profile & Academic Parameters
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Dashboard Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Headline</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">College / Institute</label>
              <input
                type="text"
                value={college}
                onChange={e => setCollege(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Semester</label>
              <input
                type="number"
                min="1"
                max="8"
                value={currentSemester}
                onChange={e => setCurrentSemester(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target GATE Year</label>
              <input
                type="number"
                value={targetGateYear}
                onChange={e => setTargetGateYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target CGPA</label>
              <input
                type="number"
                step="0.01"
                value={targetCgpa}
                onChange={e => setTargetCgpa(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Personal Mission</label>
            <textarea
              rows={2}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white"
            />
          </div>

          {/* Privacy Security PIN */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  Passcode Lock (Personal Privacy)
                </span>
                <p className="text-[11px] text-slate-300">
                  Require a PIN before viewing confidential marks and journals
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLocked}
                  onChange={e => setIsLocked(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {isLocked && (
              <div className="w-48">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  4-Digit Security PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Set PIN code"
                  value={pinCode}
                  onChange={e => setPinCode(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-white text-center tracking-widest"
                />
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between">
            {isSavedSuccess ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Profile preferences saved!
              </span>
            ) : (
              <span className="text-xs text-slate-500">Changes persist in local browser storage</span>
            )}

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-500/20 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </Card>

      {/* 3. Appearance & Theme Settings */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-white mb-3 pb-2 border-b border-white/[0.08] flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          Theme & Display Mode
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white">Interface Theme</p>
            <p className="text-[11px] text-slate-300">
              Toggle between deep midnight dark mode and modern high-contrast light mode
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-xs font-semibold text-white flex items-center gap-2 transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </Card>

      {/* 4. Workspace Data Management & Backup */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-white pb-2 border-b border-white/[0.08] flex items-center gap-2">
          <Download className="w-4 h-4 text-cyan-400" />
          Data Backup, Export & Reset
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Export JSON */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-white mb-1">Full JSON Backup</p>
              <p className="text-[11px] text-slate-300 mb-3">
                Export all records, skills, GATE syllabus, mock scores and journals into a portable file.
              </p>
            </div>
            <button
              onClick={() => exportDataAsJSON(data)}
              className="px-3.5 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-white mb-1">Restore from Backup</p>
              <p className="text-[11px] text-slate-300 mb-3">
                Import and restore a previously saved JSON state file.
              </p>
            </div>
            <label className="px-3.5 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] text-xs font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-purple-400" />
              <span>Upload Backup JSON</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Load Sample Demo Data */}
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Comprehensive Starter Data
              </p>
              <p className="text-[11px] text-slate-300 mb-3">
                Preloads realistic B.Tech Computer Science semesters, GATE mocks, DSA logs, and projects.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('Load comprehensive starter data? Any unsaved edits will be replaced.')) {
                  loadDemoData();
                }
              }}
              className="px-3.5 py-2 rounded-lg bg-purple-600/30 border border-purple-500/40 hover:bg-purple-600/50 text-xs font-semibold text-purple-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Starter Data</span>
            </button>
          </div>

          {/* Reset to Clean Slate */}
          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                Reset to Empty Workspace
              </p>
              <p className="text-[11px] text-slate-300 mb-3">
                Starts with an empty dashboard with clean syllabus structures so you can enter your exact real data.
              </p>
            </div>
            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-3.5 py-2 rounded-lg bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600/30 text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Reset to Clean Slate</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Confirmation Modal for Reset */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="p-6 rounded-2xl bg-[#131929] border border-rose-500/40 shadow-2xl max-w-sm text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Reset All Workspace Data?</h3>
            <p className="text-xs text-slate-400 mb-4">
              This will clear all logs, mock tests, and projects, giving you a fresh clean slate. This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToEmpty();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
