import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { QuickAddModal } from './components/layout/QuickAddModal';
import { NotificationsModal } from './components/layout/NotificationsModal';
import { LockScreen } from './components/layout/LockScreen';

// Pages
import { OverviewPage } from './components/pages/OverviewPage';
import { SkillsPage } from './components/pages/SkillsPage';
import { GatePage } from './components/pages/GatePage';
import { DsaPage } from './components/pages/DsaPage';
import { AcademicsPage } from './components/pages/AcademicsPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { DailyJournalPage } from './components/pages/DailyJournalPage';
import { CoursesPage } from './components/pages/CoursesPage';
import { GoalsPage } from './components/pages/GoalsPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { SettingsPage } from './components/pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPage, isLocked } = useApp();

  if (isLocked) {
    return <LockScreen />;
  }

  const renderActivePage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'skills':
        return <SkillsPage />;
      case 'gate':
        return <GatePage />;
      case 'dsa':
        return <DsaPage />;
      case 'academics':
        return <AcademicsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'journal':
        return <DailyJournalPage />;
      case 'courses':
        return <CoursesPage />;
      case 'goals':
        return <GoalsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100 dark:bg-[#090d16] dark:text-slate-100 selection:bg-purple-600/30 selection:text-purple-200">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <Header />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div className="max-w-7xl mx-auto">{renderActivePage()}</div>
        </main>
      </div>

      {/* Global Overlays & Modals */}
      <CommandPalette />
      <QuickAddModal />
      <NotificationsModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
