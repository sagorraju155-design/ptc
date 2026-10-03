import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { LIVE_PAYOUT_RECORDS } from '../data/mockData';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckSquare,
  Server,
  Users,
  Award,
  Download,
  Send,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const HomeTab: React.FC = () => {
  const {
    language,
    user,
    setActiveTab,
    setDepositModalOpen,
    setWithdrawModalOpen,
    activeServers,
    claimDailyServerIncome,
    tasks,
    setSelectedTaskForExecution,
    serverPackages,
    rentServerPackage,
    showNotification
  } = useApp();

  const t = translations[language];

  const quickActions = [
    {
      id: 'dep',
      label: t.qaDeposit,
      icon: ArrowDownCircle,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      action: () => setDepositModalOpen(true)
    },
    {
      id: 'wd',
      label: t.qaWithdraw,
      icon: ArrowUpCircle,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      action: () => setWithdrawModalOpen(true)
    },
    {
      id: 'tsk',
      label: t.qaTasks,
      icon: CheckSquare,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      action: () => setActiveTab('task')
    },
    {
      id: 'srv',
      label: t.qaServer,
      icon: Server,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      action: () => setActiveTab('server')
    },
    {
      id: 'ref',
      label: t.qaInvite,
      icon: Users,
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      action: () => setActiveTab('team')
    },
    {
      id: 'sal',
      label: t.qaSalary,
      icon: Award,
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      action: () => setActiveTab('team')
    },
    {
      id: 'apk',
      label: t.qaApp,
      icon: Download,
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      action: () => {
        showNotification(language === 'bn' 
          ? 'PrimeBD Android APK ডাউনলোড শুরু হচ্ছে...' 
          : 'PrimeBD Android APK downloading...'
        );
      }
    },
    {
      id: 'tg',
      label: t.qaSupport,
      icon: Send,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      action: () => {
        showNotification(language === 'bn' 
          ? 'অফিসিয়াল টেলিগ্রাম সাপোর্ট: @PrimeBD_Helpdesk' 
          : 'Official Telegram Support: @PrimeBD_Helpdesk'
        );
      }
    },
  ];

  return (
    <div className="space-y-5 pb-20">
      {/* Hero Asset Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#131b26] to-[#0c131d] border border-slate-800 p-4 sm:p-5 shadow-xl">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10">
          {/* Top row with user status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {user.name}
                  <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.2 rounded">
                    VIP {user.vipLevel}
                  </span>
                </h2>
                <span className="text-[11px] text-slate-400 block -mt-0.5">
                  ID: {user.referralCode}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                {language === 'bn' ? 'সক্রিয় প্যাকেজ' : 'Active Plan'}
              </span>
              <span className="text-xs font-bold text-cyan-400">
                {user.vipName}
              </span>
            </div>
          </div>

          {/* Balance display */}
          <div className="my-3 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                {t.totalAssets} ({language === 'bn' ? 'টাকা' : 'BDT'})
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1 mt-0.5">
                <span className="text-emerald-400">৳</span>
                {user.balance.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDepositModalOpen(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all"
              >
                <ArrowDownCircle className="w-3.5 h-3.5" />
                {t.depositBtn}
              </button>
              <button
                onClick={() => setWithdrawModalOpen(true)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <ArrowUpCircle className="w-3.5 h-3.5 text-amber-400" />
                {t.withdrawBtn}
              </button>
            </div>
          </div>

          {/* Sub Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-slate-900/60 border border-slate-800/70 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium truncate">
                {t.todayEarnings}
              </span>
              <span className="font-extrabold text-emerald-400 text-sm sm:text-base">
                +৳{user.totalEarnedToday}
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/70 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium truncate">
                {t.totalWithdrawn}
              </span>
              <span className="font-extrabold text-amber-400 text-sm sm:text-base">
                ৳{user.totalWithdrawn}
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/70 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium truncate">
                {language === 'bn' ? 'মোট ডিপোজিট' : 'Deposited'}
              </span>
              <span className="font-extrabold text-cyan-400 text-sm sm:text-base">
                ৳{user.totalDeposited}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action 8-Grid */}
      <div>
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={qa.action}
                className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border ${qa.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 text-center leading-tight">
                  {qa.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Servers Live Claim Revenue Banner */}
      {activeServers.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-900/50 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  {t.activeServers} ({activeServers.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'সার্ভার প্রফিট প্রতিদিন সংগ্রহ করুন' : 'Collect your daily server profit'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('server')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-0.5"
            >
              <span>{language === 'bn' ? 'সব সার্ভার' : 'All Servers'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {activeServers.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {language === 'bn' ? srv.nameBn : srv.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-semibold border border-cyan-800/60">
                      VIP {srv.tier}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{t.dailyReturn}: <strong className="text-emerald-400">৳{srv.dailyIncome}</strong></span>
                    <span>•</span>
                    <span>{srv.daysRemaining} {language === 'bn' ? 'দিন বাকি' : 'days left'}</span>
                  </div>
                </div>

                <div>
                  {srv.canClaimToday ? (
                    <button
                      onClick={() => claimDailyServerIncome(srv.id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-lg shadow-sm flex items-center gap-1 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {language === 'bn' ? '৳ সংগ্রহ করুন' : 'Claim ৳'}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {t.alreadyClaimedToday}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Tasks Highlight */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="font-bold text-white text-sm">
                {t.tasksTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? 'সহজ কাজ করে অবিলম্বে ব্যালেন্স বাড়ান' : 'Complete quick tasks to earn BDT'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('task')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-0.5 font-medium"
          >
            <span>{language === 'bn' ? 'সব কাজ দেখুন' : 'View all'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-3 flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center font-bold text-emerald-400 text-sm shrink-0">
                  ৳{task.reward}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-xs sm:text-sm line-clamp-1">
                    {language === 'bn' ? task.titleBn : task.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{task.durationSeconds}s</span>
                    <span>•</span>
                    <span className="text-slate-300">VIP {task.requiredVip}</span>
                  </div>
                </div>
              </div>

              <div>
                {task.completed ? (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.taskDone}
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedTaskForExecution(task)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    {t.startTask}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Server Packages Quick Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-white text-sm">
                {t.serverTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? 'অটোমেটিক ক্লাউড ইনকাম সুবিধা' : 'Automated cloud yield'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('server')}
            className="text-xs text-amber-400 hover:underline flex items-center gap-0.5 font-medium"
          >
            <span>{language === 'bn' ? 'প্যাকেজ সমূহ' : 'All packages'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serverPackages.slice(1, 3).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {language === 'bn' ? pkg.nameBn : pkg.name}
                  </span>
                  <span className="text-xs font-extrabold text-amber-400">
                    ৳{pkg.price}
                  </span>
                </div>
                <div className="text-xs text-slate-400 space-y-1 mb-3">
                  <p>• {t.dailyReturn}: <span className="text-emerald-400 font-bold">৳{pkg.dailyIncome}</span></p>
                  <p>• {t.validity}: {pkg.validityDays} {language === 'bn' ? 'দিন' : 'Days'}</p>
                  <p>• {t.totalProfit}: <span className="text-white font-semibold">৳{pkg.totalReturn}</span></p>
                </div>
              </div>

              <button
                onClick={() => rentServerPackage(pkg)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
              >
                {t.rentNow}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Payment Proofs Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-white text-sm">
                {t.proofsTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t.proofsSubtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
            100% {language === 'bn' ? 'গ্যারান্টি' : 'PAYOUT'}
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {LIVE_PAYOUT_RECORDS.slice(0, 4).map((record) => (
            <div key={record.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase ${
                  record.method === 'bkash' 
                    ? 'bg-pink-950 text-pink-400 border border-pink-800' 
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {record.method === 'bkash' ? 'bK' : 'NG'}
                </div>
                <div>
                  <span className="font-semibold text-slate-200 block">
                    {record.phone}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {record.timeAgo} • {record.method.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-emerald-400 text-sm">
                  +৳{record.amount}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {language === 'bn' ? 'সফল হয়েছে' : 'Success'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Work in 3 steps */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 space-y-3">
        <h4 className="font-bold text-white text-sm">
          {language === 'bn' ? '💡 কিভাবে Prime BD তে কাজ করবেন?' : '💡 How to earn with Prime BD?'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold text-sm block mb-1">১. টাস্ক বা সার্ভার নির্বাচন</span>
            <p className="text-[11px] leading-relaxed">
              {language === 'bn' ? 'প্রতিদিন নির্ধারিত টাস্ক সম্পন্ন করুন অথবা ক্লাউড সার্ভার রেন্ট করে অটোমেটিক আয় চালু করুন।' : 'Complete daily work tasks or rent cloud servers for automated yield.'}
            </p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-cyan-400 font-bold text-sm block mb-1">২. রেফার ও টিম কমিশন</span>
            <p className="text-[11px] leading-relaxed">
              {language === 'bn' ? 'বন্ধুদের রেফার করে ৩ স্তরের কমিশন পান এবং ২০ জন অ্যাক্টিভ হলে ২০,০০০ টাকা স্যালারি নিশ্চিত করুন।' : 'Invite peers for 3-tier commission and claim ৳20K monthly fixed salary.'}
            </p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold text-sm block mb-1">৩. বিকাশ/নগদে ক্যাশআউট</span>
            <p className="text-[11px] leading-relaxed">
              {language === 'bn' ? 'ব্যালেন্সে মাত্র ৩০০ টাকা হলেই বিকাশ বা নগদে সরাসরি ২০-৩০ মিনিটে ক্যাশআউট করুন।' : 'Instant cashout to your bKash or Nagad wallet starting at just ৳300.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
