import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { 
  Home, 
  CheckSquare, 
  Server, 
  Wallet, 
  Users, 
  User as UserIcon 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { language, activeTab, setActiveTab, tasks } = useApp();
  const t = translations[language];

  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  interface NavItem {
    id: 'home' | 'task' | 'server' | 'wallet' | 'team' | 'profile';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'task', label: t.task, icon: CheckSquare, badge: pendingTasksCount },
    { id: 'server', label: t.server, icon: Server },
    { id: 'wallet', label: t.wallet, icon: Wallet },
    { id: 'team', label: t.team, icon: Users },
    { id: 'profile', label: t.profile, icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#10141d]/95 backdrop-blur-md border-t border-slate-800 text-slate-400">
      <div className="max-w-md mx-auto grid grid-cols-6 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center h-full py-1 transition-all ${
                isActive 
                  ? 'text-emerald-400 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#10141d]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-[56px] ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-emerald-400 rounded-t-full shadow-sm shadow-emerald-400/80" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
