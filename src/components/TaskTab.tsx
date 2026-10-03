import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { TaskItem } from '../types';
import { 
  CheckSquare, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Youtube, 
  Facebook, 
  Send, 
  Star, 
  Globe, 
  FileQuestion,
  AlertCircle
} from 'lucide-react';

export const TaskTab: React.FC = () => {
  const {
    language,
    tasks,
    user,
    setSelectedTaskForExecution,
    activeTaskTab,
    setActiveTaskTab,
    setActiveTab
  } = useApp();

  const t = translations[language];

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const totalPossibleReward = tasks.reduce((sum, t) => sum + t.reward, 0);

  const filteredTasks = tasks.filter(task => {
    if (activeTaskTab === 'pending') return !task.completed;
    if (activeTaskTab === 'completed') return task.completed;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'youtube': return <Youtube className="w-5 h-5 text-red-400" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-400" />;
      case 'telegram': return <Send className="w-5 h-5 text-sky-400" />;
      case 'review': return <Star className="w-5 h-5 text-amber-400" />;
      case 'web': return <Globe className="w-5 h-5 text-emerald-400" />;
      default: return <FileQuestion className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              {t.tasksTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.tasksSubtitle}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              {t.dailyLimit}
            </span>
            <span className="text-sm font-extrabold text-emerald-400">
              {completedCount} / {tasks.length}
            </span>
          </div>
        </div>

        {/* Task progress bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
          <span>{completedCount} {t.completedTasks}</span>
          <span className="text-emerald-400 font-semibold">
            {language === 'bn' ? 'মোট দৈনিক আয় সুযোগ:' : 'Total Potential:'} ৳{totalPossibleReward}
          </span>
          <span>{pendingCount} {t.pendingTasks}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTaskTab('all')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTaskTab === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.allTx} ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTaskTab('pending')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTaskTab === 'pending'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.pendingTasks} ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTaskTab('completed')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTaskTab === 'completed'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.completedTasks} ({completedCount})
        </button>
      </div>

      {/* Task Cards List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-slate-200">
              {language === 'bn' ? 'কোন টাস্ক অবশিষ্ট নেই!' : 'No tasks in this category!'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn' ? 'রাত ১২টায় নতুন টাস্ক যুক্ত হবে।' : 'New tasks will refresh at midnight.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task: TaskItem) => {
            const isLocked = user.vipLevel < task.requiredVip;

            return (
              <div
                key={task.id}
                className={`bg-slate-900 border rounded-2xl p-4 transition-all ${
                  task.completed 
                    ? 'border-slate-800/60 opacity-80' 
                    : isLocked 
                    ? 'border-slate-800 opacity-90' 
                    : 'border-slate-800 hover:border-emerald-500/50 shadow-lg shadow-black/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {getCategoryIcon(task.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm leading-snug">
                        {language === 'bn' ? task.titleBn : task.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {language === 'bn' ? task.descriptionBn : task.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px]">
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {task.durationSeconds}s
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          isLocked ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                          {isLocked && <Lock className="w-3 h-3 text-amber-400" />}
                          VIP Level {task.requiredVip}
                        </span>
                        {task.completedAt && (
                          <>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500">{task.completedAt}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reward & Action */}
                  <div className="text-right shrink-0 flex flex-col items-end justify-between min-h-[70px]">
                    <div className="font-extrabold text-emerald-400 text-base">
                      ৳{task.reward}
                    </div>

                    <div>
                      {task.completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.taskDone}
                        </span>
                      ) : isLocked ? (
                        <button
                          onClick={() => setActiveTab('server')}
                          className="px-2.5 py-1 bg-amber-950/70 border border-amber-800/80 hover:bg-amber-900 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Lock className="w-3 h-3" />
                          {language === 'bn' ? 'আপগ্রেড করুন' : 'Upgrade VIP'}
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedTaskForExecution(task)}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950 flex items-center gap-1 transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {t.startTask}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Rules Notice */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-300">{language === 'bn' ? 'টাস্ক নীতিমালা:' : 'Task Rules:'}</strong>
          <span className="block mt-0.5">
            {language === 'bn'
              ? 'টাস্ক সম্পন্ন করার পর স্পনসর ডাটাবেজ ভেরিফিকেশন সম্পন্ন হলে সরাসরি মূল ব্যালেন্সে টাকা জমা হবে। ভুয়া সাবমিট বা বোট ব্যবহার করলে একাউন্ট সাময়িক ব্লক হতে পারে।'
              : 'Tasks are verified automatically before rewards are credited. Automated bots or falsified submissions are strictly prohibited.'}
          </span>
        </div>
      </div>
    </div>
  );
};
