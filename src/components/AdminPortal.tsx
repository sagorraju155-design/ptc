import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { TaskCategory } from '../types';
import {
  ShieldAlert,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  CheckSquare,
  Settings,
  Plus,
  Check,
  X,
  Copy,
  Clock,
  ExternalLink,
  Trash2,
  Edit3,
  Search,
  Sparkles,
  Eye,
  Server,
  Radio,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lock
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    language,
    setLanguage,
    setAppMode,
    depositRequests,
    withdrawRequests,
    approveDeposit,
    rejectDeposit,
    approveWithdraw,
    rejectWithdraw,
    allUsers,
    adminUpdateUserBalance,
    adminUpdateUserVip,
    adminToggleUserStatus,
    tasks,
    addNewTask,
    deleteTask,
    officialAccounts,
    updateOfficialNumber,
    systemNotice,
    updateNotice,
    resetAllData,
    adminLogout
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'deposits' | 'withdrawals' | 'users' | 'tasks' | 'settings'
  >('overview');

  const [userSearch, setUserSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New task form state
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTitleBn, setNewTaskTitleBn] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDescBn, setNewTaskDescBn] = useState('');
  const [newTaskReward, setNewTaskReward] = useState<number>(50);
  const [newTaskDuration, setNewTaskDuration] = useState<number>(15);
  const [newTaskVip, setNewTaskVip] = useState<number>(0);
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('youtube');
  const [newTaskUrl, setNewTaskUrl] = useState('https://youtube.com');

  // Gateway settings state
  const [bkashNum, setBkashNum] = useState(officialAccounts.bkash.number);
  const [nagadNum, setNagadNum] = useState(officialAccounts.nagad.number);
  const [rocketNum, setRocketNum] = useState(officialAccounts.rocket.number);

  // Notice settings state
  const [noticeBn, setNoticeBn] = useState(systemNotice.textBn);
  const [noticeEn, setNoticeEn] = useState(systemNotice.textEn);

  const pendingDeposits = depositRequests.filter((d) => d.status === 'pending');
  const pendingWithdrawals = withdrawRequests.filter((w) => w.status === 'pending');

  const totalPendingDepositAmount = pendingDeposits.reduce((acc, d) => acc + d.amount, 0);
  const totalPendingWithdrawAmount = pendingWithdrawals.reduce((acc, w) => acc + w.amount, 0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskTitleBn.trim()) {
      alert('Please fill out both English and Bengali task titles');
      return;
    }

    addNewTask({
      title: newTaskTitle,
      titleBn: newTaskTitleBn,
      description: newTaskDesc || 'Complete task and submit proof.',
      descriptionBn: newTaskDescBn || 'টাস্ক সম্পন্ন করুন এবং রিওয়ার্ড বুঝে নিন।',
      reward: Number(newTaskReward),
      durationSeconds: Number(newTaskDuration),
      requiredVip: Number(newTaskVip),
      category: newTaskCategory,
      taskUrl: newTaskUrl,
      iconType: newTaskCategory
    });

    setShowNewTaskForm(false);
    setNewTaskTitle('');
    setNewTaskTitleBn('');
    setNewTaskDesc('');
    setNewTaskDescBn('');
  };

  const handleSaveGateways = () => {
    updateOfficialNumber('bkash', bkashNum);
    updateOfficialNumber('nagad', nagadNum);
    updateOfficialNumber('rocket', rocketNum);
  };

  const handleSaveNotice = () => {
    updateNotice(noticeBn, noticeEn);
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans pb-16">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-[#0d131f]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-amber-600 to-orange-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-rose-950/40">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  Prime<span className="text-emerald-400">BD</span> Control Center
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-950/90 text-rose-400 border border-rose-800/80">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'bn'
                  ? 'ডিপোজিট, উইথড্র ও প্ল্যাটফর্ম কন্ট্রোল প্যানেল'
                  : 'Platform management, payment gateway & users directory'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Switch to User View */}
            <button
              onClick={() => setAppMode('user')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950"
            >
              <Eye className="w-4 h-4" />
              <span>{language === 'bn' ? 'ইউজার মোডে যান' : 'Switch to User View'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
            >
              {language === 'bn' ? 'বাংলা' : 'EN'}
            </button>

            {/* Admin Logout Button */}
            <button
              onClick={adminLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5"
              title="Logout Admin"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Sub-Tabs */}
        <div className="border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
            {[
              { id: 'overview', label: language === 'bn' ? 'ওভারভিউ' : 'Overview', icon: Radio },
              {
                id: 'deposits',
                label: language === 'bn' ? 'ডিপোজিট রিকোয়েস্ট' : 'Deposits',
                icon: ArrowDownCircle,
                badge: pendingDeposits.length
              },
              {
                id: 'withdrawals',
                label: language === 'bn' ? 'ক্যাশআউট পেআউট' : 'Withdrawals',
                icon: ArrowUpCircle,
                badge: pendingWithdrawals.length
              },
              { id: 'users', label: language === 'bn' ? 'ইউজার তালিকা' : 'Users Directory', icon: Users },
              { id: 'tasks', label: language === 'bn' ? 'টাস্ক কন্ট্রোল' : 'Tasks Management', icon: CheckSquare },
              { id: 'settings', label: language === 'bn' ? 'গেটওয়ে ও নোটিশ' : 'Gateway & Notice', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id as any)}
                  className={`py-2.5 px-3.5 text-xs font-bold shrink-0 flex items-center gap-2 border-b-2 transition-all ${
                    isActive
                      ? 'border-emerald-400 text-emerald-400 bg-slate-900/50'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-6 flex-1">
        {/* OVERVIEW TAB */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block font-medium">
                  {language === 'bn' ? 'পেন্ডিং ডিপোজিট' : 'Pending Deposits'}
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  ৳{totalPendingDepositAmount}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {pendingDeposits.length} {language === 'bn' ? 'টি রিকোয়েস্ট' : 'requests'}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block font-medium">
                  {language === 'bn' ? 'পেন্ডিং উইথড্র' : 'Pending Cashouts'}
                </span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">
                  ৳{totalPendingWithdrawAmount}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {pendingWithdrawals.length} {language === 'bn' ? 'টি অনুমোদনের অপেক্ষায়' : 'awaiting payment'}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block font-medium">
                  {language === 'bn' ? 'মোট নিবন্ধিত সদস্য' : 'Total Members'}
                </span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">
                  {allUsers.length}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  100% {language === 'bn' ? 'অ্যাক্টিভ অ্যাকাউন্ট' : 'active accounts'}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 block font-medium">
                  {language === 'bn' ? 'লাইভ টাস্ক সংখ্যা' : 'Active Tasks'}
                </span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">
                  {tasks.length}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {language === 'bn' ? 'ইউটিউব, ফেসবুক ও রিভিউ' : 'Sponsors online'}
                </span>
              </div>
            </div>

            {/* Urgent Action Queues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pending Deposits Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                    {language === 'bn' ? 'পেন্ডিং ডিপোজিট কিউ' : 'Pending Deposits Queue'}
                  </h3>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                    {pendingDeposits.length} Pending
                  </span>
                </div>

                {pendingDeposits.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    {language === 'bn' ? 'কোন পেন্ডিং ডিপোজিট নেই!' : 'No pending deposits.'}
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {pendingDeposits.map((dep) => (
                      <div
                        key={dep.id}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold uppercase text-white px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">
                              {dep.method}
                            </span>
                            <span className="font-bold text-emerald-400 text-sm">৳{dep.amount}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            <span>From: <strong>{dep.senderNumber}</strong></span>
                            <span className="mx-1">•</span>
                            <span className="font-mono text-cyan-400">TrxID: {dep.trxId}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => approveDeposit(dep.id)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            {language === 'bn' ? 'অনুমোদন' : 'Approve'}
                          </button>
                          <button
                            onClick={() => rejectDeposit(dep.id)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pending Cashouts Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <ArrowUpCircle className="w-4 h-4 text-amber-400" />
                    {language === 'bn' ? 'পেন্ডিং ক্যাশআউট কিউ' : 'Pending Cashout Queue'}
                  </h3>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-900">
                    {pendingWithdrawals.length} Pending
                  </span>
                </div>

                {pendingWithdrawals.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    {language === 'bn' ? 'কোন পেন্ডিং উইথড্র নেই!' : 'No pending withdrawals.'}
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {pendingWithdrawals.map((wd) => (
                      <div
                        key={wd.id}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold uppercase text-white px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">
                              {wd.method}
                            </span>
                            <span className="font-bold text-amber-400 text-sm">৳{wd.amount}</span>
                            <span className="text-[10px] text-slate-400">(Net: ৳{wd.netAmount})</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            <span>To: <strong>{wd.recipientNumber}</strong></span>
                            <span className="mx-1">•</span>
                            <span>Fee: ৳{wd.fee}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => approveWithdraw(wd.id)}
                            className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            {language === 'bn' ? 'পেমেন্ট পাঠান' : 'Pay & Settle'}
                          </button>
                          <button
                            onClick={() => rejectWithdraw(wd.id)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 rounded-lg transition-colors"
                            title="Reject and Refund"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DEPOSITS MANAGEMENT TAB */}
        {activeAdminTab === 'deposits' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">
                  {language === 'bn' ? 'সকল ডিপোজিট রিকোয়েস্ট হিস্ট্রি' : 'All Deposit Requests'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'bn'
                    ? 'বিকাশ, নগদ ও রকেটের মাধ্যমে পাঠানো রিচার্জ আবেদন ও TrxID যাচাই করুন'
                    : 'Verify user transaction IDs and confirm balance credits'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Sender Phone</th>
                    <th className="py-2.5 px-3">TrxID</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {depositRequests.map((dep) => (
                    <tr key={dep.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                          dep.method === 'bkash' ? 'bg-pink-950 text-pink-400 border border-pink-900' : 'bg-amber-950 text-amber-400 border border-amber-900'
                        }`}>
                          {dep.method}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-white text-sm">৳{dep.amount}</td>
                      <td className="py-3 px-3 font-mono">{dep.senderNumber}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-mono text-cyan-400">
                          <span>{dep.trxId}</span>
                          <button
                            onClick={() => handleCopy(dep.trxId, dep.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            {copiedId === dep.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">{dep.createdAt}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          dep.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                            : dep.status === 'pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-900'
                            : 'bg-rose-950 text-rose-400 border border-rose-900'
                        }`}>
                          {dep.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {dep.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => approveDeposit(dep.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectDeposit(dep.id)}
                              className="px-2 py-1 bg-slate-800 hover:bg-rose-900 text-slate-300 rounded transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Settled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WITHDRAWALS MANAGEMENT TAB */}
        {activeAdminTab === 'withdrawals' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">
                  {language === 'bn' ? 'সকল ক্যাশআউট রিকোয়েস্ট ও পেআউট হিস্ট্রি' : 'All Cashout & Payout Requests'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'bn'
                    ? 'উত্তোলনের আবেদন অনুমোদন করুন অথবা রিফান্ড করুন'
                    : 'Disburse user payouts via bKash/Nagad and maintain payout ledger'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Gateway</th>
                    <th className="py-2.5 px-3">Gross</th>
                    <th className="py-2.5 px-3">Fee (2%)</th>
                    <th className="py-2.5 px-3">Net Payout</th>
                    <th className="py-2.5 px-3">Recipient Phone</th>
                    <th className="py-2.5 px-3">Time / TrxID</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {withdrawRequests.map((wd) => (
                    <tr key={wd.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                          wd.method === 'bkash' ? 'bg-pink-950 text-pink-400 border border-pink-900' : 'bg-amber-950 text-amber-400 border border-amber-900'
                        }`}>
                          {wd.method}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold">৳{wd.amount}</td>
                      <td className="py-3 px-3 text-rose-400">-৳{wd.fee}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400 text-sm">৳{wd.netAmount}</td>
                      <td className="py-3 px-3 font-mono">{wd.recipientNumber}</td>
                      <td className="py-3 px-3 text-[11px] text-slate-400">
                        <div>{wd.createdAt}</div>
                        {wd.trxId && <div className="font-mono text-cyan-400 text-[10px]">TrxID: {wd.trxId}</div>}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          wd.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                            : wd.status === 'pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-900'
                            : 'bg-rose-950 text-rose-400 border border-rose-900'
                        }`}>
                          {wd.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {wd.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => approveWithdraw(wd.id)}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded transition-colors"
                            >
                              Pay Now
                            </button>
                            <button
                              onClick={() => rejectWithdraw(wd.id)}
                              className="px-2 py-1 bg-slate-800 hover:bg-rose-900 text-slate-300 rounded transition-colors"
                            >
                              Refund
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Paid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS DIRECTORY & BALANCE CONTROL TAB */}
        {activeAdminTab === 'users' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  {language === 'bn' ? 'ইউজার ডিরেক্টরি ও ব্যালেন্স মডিফিকেশন' : 'Users Directory & Balance Control'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'bn'
                    ? 'যেকোনো ব্যবহারকারীর ব্যালেন্স সমন্বয়, ভিআইপি আপগ্রেড এবং স্ট্যাটাস পরিবর্তন করুন'
                    : 'Manage user balances, VIP tier tiers, and account permissions'}
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder={language === 'bn' ? 'নাম বা নম্বর দিয়ে খুঁজুন...' : 'Search by name or phone...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Member</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">VIP Tier</th>
                    <th className="py-2.5 px-3">Balance</th>
                    <th className="py-2.5 px-3">Deposited</th>
                    <th className="py-2.5 px-3">Withdrawn</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Balance Adjust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white text-xs">{u.name}</div>
                        <div className="text-[10px] text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 px-3 font-mono">{u.phone}</td>
                      <td className="py-3 px-3">
                        <select
                          value={u.vipLevel}
                          onChange={(e) => adminUpdateUserVip(u.id, Number(e.target.value))}
                          className="bg-slate-950 border border-slate-800 text-amber-400 text-xs font-bold rounded-lg px-2 py-1"
                        >
                          <option value="0">VIP 0</option>
                          <option value="1">VIP 1</option>
                          <option value="2">VIP 2</option>
                          <option value="3">VIP 3</option>
                          <option value="4">VIP 4</option>
                          <option value="5">VIP 5</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-emerald-400 text-sm">
                        ৳{u.balance}
                      </td>
                      <td className="py-3 px-3 text-cyan-400">৳{u.totalDeposited}</td>
                      <td className="py-3 px-3 text-amber-400">৳{u.totalWithdrawn}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => adminToggleUserStatus(u.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize transition-colors ${
                            u.status === 'active'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                              : 'bg-rose-950 text-rose-400 border border-rose-900'
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => adminUpdateUserBalance(u.id, 500)}
                            className="px-2 py-1 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 rounded font-bold text-[11px]"
                            title="Add ৳500"
                          >
                            +৳500
                          </button>
                          <button
                            onClick={() => adminUpdateUserBalance(u.id, 2000)}
                            className="px-2 py-1 bg-cyan-950 text-cyan-400 hover:bg-cyan-900 rounded font-bold text-[11px]"
                            title="Add ৳2,000"
                          >
                            +৳2K
                          </button>
                          <button
                            onClick={() => adminUpdateUserBalance(u.id, -500)}
                            className="px-2 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 rounded font-bold text-[11px]"
                            title="Deduct ৳500"
                          >
                            -৳500
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TASKS MANAGEMENT TAB */}
        {activeAdminTab === 'tasks' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">
                  {language === 'bn' ? 'ডেইলি টাস্ক কন্ট্রোল ও স্পনসর কাজ' : 'Daily Tasks Management'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'bn'
                    ? 'নতুন কাজ তৈরি করুন, রিওয়ার্ড পরিবর্তন করুন অথবা কাজ ডিলিট করুন'
                    : 'Add sponsor tasks, modify rewards, and configure verification requirements'}
                </p>
              </div>

              <button
                onClick={() => setShowNewTaskForm(!showNewTaskForm)}
                className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'bn' ? 'নতুন টাস্ক তৈরি করুন' : 'Add New Task'}</span>
              </button>
            </div>

            {/* Create New Task Form */}
            {showNewTaskForm && (
              <form
                onSubmit={handleCreateTask}
                className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-fadeIn"
              >
                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {language === 'bn' ? 'নতুন ডিজিটাল স্পনসর টাস্ক ফর্ম' : 'Create New Sponsor Work Task'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title (English)</label>
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="e.g. Subscribe to Prime Tech YouTube"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title (বাংলা)</label>
                    <input
                      type="text"
                      value={newTaskTitleBn}
                      onChange={(e) => setNewTaskTitleBn(e.target.value)}
                      placeholder="যেমন: ইউটিউব চ্যানেল সাবস্ক্রাইব করুন"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Description (English)</label>
                    <input
                      type="text"
                      value={newTaskDesc}
                      onChange={(e) => setNewTaskDesc(e.target.value)}
                      placeholder="Watch 20s and press subscribe"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Description (বাংলা)</label>
                    <input
                      type="text"
                      value={newTaskDescBn}
                      onChange={(e) => setNewTaskDescBn(e.target.value)}
                      placeholder="ভিডিওটি ২০ সেকেন্ড দেখে সাবস্ক্রাইব করুন"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Reward (৳)</label>
                      <input
                        type="number"
                        min="10"
                        max="500"
                        value={newTaskReward}
                        onChange={(e) => setNewTaskReward(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Duration (s)</label>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={newTaskDuration}
                        onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">VIP Req.</label>
                      <select
                        value={newTaskVip}
                        onChange={(e) => setNewTaskVip(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold"
                      >
                        <option value="0">VIP 0</option>
                        <option value="1">VIP 1</option>
                        <option value="2">VIP 2</option>
                        <option value="3">VIP 3</option>
                        <option value="4">VIP 4</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Category</label>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold"
                    >
                      <option value="youtube">YouTube (ভিডিও লাইক)</option>
                      <option value="facebook">Facebook (পেজ ফলো)</option>
                      <option value="telegram">Telegram (কমিউনিটি)</option>
                      <option value="review">Google Play (রিভিউ)</option>
                      <option value="web">Web Visit (সাইট ভিজিট)</option>
                      <option value="survey">Survey (জরিপ)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTaskForm(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Save &amp; Publish Task
                  </button>
                </div>
              </form>
            )}

            {/* List of Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">
                        {language === 'bn' ? task.titleBn : task.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'bn' ? task.descriptionBn : task.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                      <span className="font-bold text-emerald-400">৳{task.reward} BDT</span>
                      <span>•</span>
                      <span>{task.durationSeconds}s duration</span>
                      <span>•</span>
                      <span>VIP {task.requiredVip} Required</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors shrink-0"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS & GATEWAYS TAB */}
        {activeAdminTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Payment Gateways Config */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                {language === 'bn' ? 'অফিসিয়াল পেমেন্ট নম্বর ব্যবস্থাপনা' : 'Official Payment Numbers'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'ডিপোজিট পেজে প্রদর্শিত বিকাশ, নগদ ও রকেট পার্সোনাল/এজেন্ট নম্বর পরিবর্তন করুন'
                  : 'Update official receiving account numbers shown to users on deposit page'}
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-pink-400 mb-1">
                    bKash Official Number (বিকাশ)
                  </label>
                  <input
                    type="text"
                    value={bkashNum}
                    onChange={(e) => setBkashNum(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-400 mb-1">
                    Nagad Official Number (নগদ)
                  </label>
                  <input
                    type="text"
                    value={nagadNum}
                    onChange={(e) => setNagadNum(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-400 mb-1">
                    Rocket Official Number (রকেট)
                  </label>
                  <input
                    type="text"
                    value={rocketNum}
                    onChange={(e) => setRocketNum(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveGateways}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {language === 'bn' ? 'নম্বর সংরক্ষণ করুন' : 'Save Payment Numbers'}
                </button>
              </div>
            </div>

            {/* Marquee & System Announcement Notice */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                {language === 'bn' ? 'লাইভ স্ক্রোলিং নোটিশ ও অ্যানাউন্সমেন্ট' : 'Live Scrolling Marquee Notice'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'অ্যাপের শীর্ষে চলমান জরুরি স্ক্রোলিং নোটিশ আপডেট করুন'
                  : 'Update the official announcement banner running across all pages'}
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Notice Text (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={noticeBn}
                    onChange={(e) => setNoticeBn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Notice Text (English)
                  </label>
                  <textarea
                    rows={3}
                    value={noticeEn}
                    onChange={(e) => setNoticeEn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveNotice}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {language === 'bn' ? 'নোটিশ আপডেট করুন' : 'Update Live Notice'}
                </button>
              </div>

              {/* Reset Database */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={resetAllData}
                  className="w-full py-2 bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800 text-rose-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {language === 'bn' ? 'সম্পূর্ণ ডেমো ডেটা রিসেট করুন' : 'Reset All Demo Data'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
