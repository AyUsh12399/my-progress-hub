import React from 'react';
import {
  Bell,
  Clock,
  AlertTriangle,
  Flame,
  Target,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsOpen,
    setNotificationsOpen,
    setCurrentPage,
    data,
    metrics,
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  // Construct dynamic alerts from actual data
  const notifications: {
    id: string;
    type: 'warning' | 'info' | 'success';
    icon: any;
    title: string;
    description: string;
    page: any;
  }[] = [];

  // Streak reminder
  if (metrics.currentStreak > 0) {
    notifications.push({
      id: 'streak_notif',
      type: 'success',
      icon: Flame,
      title: `${metrics.currentStreak}-Day Learning Streak Active!`,
      description: 'Log your daily activity or complete a habit today to maintain momentum.',
      page: 'journal',
    });
  }

  // Pending tasks today
  const pendingTasks = data.tasks.filter(t => !t.completed);
  if (pendingTasks.length > 0) {
    notifications.push({
      id: 'pending_tasks',
      type: 'info',
      icon: Clock,
      title: `${pendingTasks.length} Daily Priority Tasks Pending`,
      description: `Including: "${pendingTasks[0].title}". Stay on schedule today!`,
      page: 'overview',
    });
  }

  // Upcoming Goals due soon
  data.goals
    .filter(g => g.status !== 'Completed')
    .forEach(g => {
      const daysLeft = Math.ceil((new Date(g.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysLeft >= 0 && daysLeft <= 14) {
        notifications.push({
          id: `goal_${g.id}`,
          type: 'warning',
          icon: Target,
          title: `Goal Deadline Approaching: "${g.title}"`,
          description: `Due in ${daysLeft} days. Current progress is ${g.progressPercent}%.`,
          page: 'goals',
        });
      }
    });

  // Low attendance warning
  data.academicSemesters.forEach(sem => {
    sem.subjects.forEach(sub => {
      if (sub.attendancePercent < 80 && sub.attendancePercent > 0) {
        notifications.push({
          id: `att_${sub.id}`,
          type: 'warning',
          icon: AlertTriangle,
          title: `Low Attendance Alert: ${sub.name}`,
          description: `Current attendance is ${sub.attendancePercent}%. Minimum requirement is 75-80%.`,
          page: 'academics',
        });
      }
    });
  });

  return (
    <Modal
      isOpen={isNotificationsOpen}
      onClose={() => setNotificationsOpen(false)}
      title="Notifications & Alerts"
      subtitle="Dynamic alerts from your stored academic & prep milestones"
      maxWidth="md"
    >
      <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold text-white">All caught up!</p>
            <p className="text-xs text-slate-400 mt-1">No urgent alerts or overdue milestones.</p>
          </div>
        ) : (
          notifications.map(item => {
            const Icon = item.icon;
            const style = {
              warning: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
              info: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
              success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
            }[item.type];

            return (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.page);
                  setNotificationsOpen(false);
                }}
                className={`p-3.5 rounded-xl border ${style} hover:opacity-90 cursor-pointer transition-all flex items-start gap-3 group`}
              >
                <div className="p-2 rounded-lg bg-black/20 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
};
