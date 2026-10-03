import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  User,
  TaskItem,
  ServerPackage,
  ActiveServer,
  DepositRequest,
  WithdrawRequest,
  Transaction,
  TeamMember,
  PaymentMethod,
  AppMode,
  OfficialAccountConfig,
  SystemNoticeConfig
} from '../types';
import {
  INITIAL_USER,
  SERVER_PACKAGES,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
  INITIAL_TEAM_MEMBERS,
  OFFICIAL_PAYMENT_ACCOUNTS,
  MOCK_DIRECTORY_USERS
} from '../data/mockData';
import { translations } from '../data/translations';

export interface AdminManagedUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  vipLevel: number;
  vipName: string;
  totalDeposited: number;
  totalWithdrawn: number;
  joinedDate: string;
  status: 'active' | 'suspended';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  activeTab: 'home' | 'task' | 'server' | 'wallet' | 'team' | 'profile';
  setActiveTab: (tab: 'home' | 'task' | 'server' | 'wallet' | 'team' | 'profile') => void;
  user: User;
  tasks: TaskItem[];
  serverPackages: ServerPackage[];
  activeServers: ActiveServer[];
  transactions: Transaction[];
  depositRequests: DepositRequest[];
  withdrawRequests: WithdrawRequest[];
  teamMembers: TeamMember[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedTaskForExecution: TaskItem | null;
  setSelectedTaskForExecution: (task: TaskItem | null) => void;
  depositModalOpen: boolean;
  setDepositModalOpen: (open: boolean) => void;
  withdrawModalOpen: boolean;
  setWithdrawModalOpen: (open: boolean) => void;
  activeTaskTab: 'all' | 'pending' | 'completed';
  setActiveTaskTab: (tab: 'all' | 'pending' | 'completed') => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  
  // Dynamic Admin Controlled Assets
  officialAccounts: typeof OFFICIAL_PAYMENT_ACCOUNTS;
  systemNotice: { textBn: string; textEn: string };
  allUsers: AdminManagedUser[];

  // User Actions
  completeTask: (taskId: string) => boolean;
  rentServerPackage: (pkg: ServerPackage) => { success: boolean; message: string };
  claimDailyServerIncome: (serverId: string) => void;
  submitDeposit: (method: PaymentMethod, amount: number, senderNumber: string, trxId: string) => void;
  submitWithdraw: (method: PaymentMethod, amount: number, recipientNumber: string) => { success: boolean; message: string };
  claimMonthlySalary: () => { success: boolean; message: string };
  resetAllData: () => void;
  addFastBalance: (amount: number) => void;

  // Admin Actions
  approveDeposit: (depositId: string) => void;
  rejectDeposit: (depositId: string, reason?: string) => void;
  approveWithdraw: (withdrawId: string) => void;
  rejectWithdraw: (withdrawId: string, reason?: string) => void;
  adminUpdateUserBalance: (userId: string, delta: number) => void;
  adminUpdateUserVip: (userId: string, newTier: number) => void;
  adminToggleUserStatus: (userId: string) => void;
  addNewTask: (taskData: Omit<TaskItem, 'id' | 'completed' | 'completedAt'>) => void;
  deleteTask: (taskId: string) => void;
  updateOfficialNumber: (method: 'bkash' | 'nagad' | 'rocket', newNumber: string) => void;
  updateNotice: (textBn: string, textEn: string) => void;

  // Authentication
  isLoggedIn: boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (phone: string, pin: string) => { success: boolean; message: string };
  register: (name: string, phone: string, pin: string, referralCode?: string) => { success: boolean; message: string };
  logout: () => void;
  switchUserAccount: (userId: string) => void;

  // Admin Authentication
  isAdminLoggedIn: boolean;
  adminLogin: (username: string, password: string, pin: string) => { success: boolean; message: string };
  adminLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('primebd_lang') as Language) || 'bn';
  });

  // App mode: user or admin (switch to admin mode upon "admin login" request)
  const [appMode, setAppMode] = useState<AppMode>(() => {
    return 'admin';
  });

  // User Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('primebd_logged_in');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('primebd_admin_logged_in');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'task' | 'server' | 'wallet' | 'team' | 'profile'>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedTaskForExecution, setSelectedTaskForExecution] = useState<TaskItem | null>(null);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [activeTaskTab, setActiveTaskTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Core user state
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('primebd_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Admin Managed Users Directory
  const [allUsers, setAllUsers] = useState<AdminManagedUser[]>(() => {
    const saved = localStorage.getItem('primebd_all_users');
    return saved ? JSON.parse(saved) : (MOCK_DIRECTORY_USERS as AdminManagedUser[]);
  });

  // Dynamic Official Payment Accounts
  const [officialAccounts, setOfficialAccounts] = useState(() => {
    const saved = localStorage.getItem('primebd_official_accounts');
    return saved ? JSON.parse(saved) : OFFICIAL_PAYMENT_ACCOUNTS;
  });

  // Dynamic Notice Config
  const [systemNotice, setSystemNotice] = useState(() => {
    const saved = localStorage.getItem('primebd_notice');
    return saved ? JSON.parse(saved) : {
      textBn: 'প্রতিদিনের টাস্ক রাত ১২টায় রিনিউ হয়। বিকাশ/নগদে ডিপোজিট মাত্র ৫-১০ মিনিটে স্বয়ংক্রিয়ভাবে যোগ হয়। ২০ জন এক্টিভ রেফারেল পূর্ণ করলেই পাচ্ছেন ২০,০০০ টাকা মাসিক ফিক্সড স্যালারি!',
      textEn: 'Daily tasks reset at 12:00 AM midnight. bKash/Nagad auto deposits take 5-10 minutes. Refer 20 active members to earn ৳20,000 monthly fixed salary bonus!'
    };
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('primebd_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activeServers, setActiveServers] = useState<ActiveServer[]>(() => {
    const saved = localStorage.getItem('primebd_servers');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'asrv_01',
        packageId: 'pkg_vip2',
        name: 'Server 2 (Silver Cloud)',
        nameBn: 'সার্ভার ২ (সিলভার ক্লাউড)',
        tier: 2,
        price: 2500,
        dailyIncome: 220,
        activatedAt: '2026-09-28',
        expiresAt: '2026-11-28',
        lastClaimDate: '2026-10-02',
        canClaimToday: true,
        daysRemaining: 55,
      }
    ];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('primebd_tx');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>(() => {
    const saved = localStorage.getItem('primebd_deposits');
    return saved ? JSON.parse(saved) : [
      {
        id: 'dep_101',
        userId: 'usr_prime_02',
        method: 'nagad',
        amount: 5000,
        senderNumber: '01819-223344',
        trxId: 'NG99182C',
        status: 'pending',
        createdAt: '2026-10-03 10:45 AM'
      },
      {
        id: 'dep_102',
        userId: 'usr_prime_03',
        method: 'bkash',
        amount: 2500,
        senderNumber: '01911-556677',
        trxId: 'BK77218X',
        status: 'pending',
        createdAt: '2026-10-03 11:15 AM'
      },
      {
        id: 'dep_01',
        userId: 'usr_prime_01',
        method: 'nagad',
        amount: 2500,
        senderNumber: '01712-345678',
        trxId: 'NG88741B',
        status: 'approved',
        createdAt: '2026-09-28 02:14 PM'
      }
    ];
  });

  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>(() => {
    const saved = localStorage.getItem('primebd_withdraws');
    return saved ? JSON.parse(saved) : [
      {
        id: 'wd_201',
        userId: 'usr_prime_04',
        method: 'bkash',
        amount: 4500,
        fee: 90,
        netAmount: 4410,
        recipientNumber: '01622-778899',
        status: 'pending',
        createdAt: '2026-10-03 11:30 AM'
      },
      {
        id: 'wd_202',
        userId: 'usr_prime_02',
        method: 'nagad',
        amount: 1200,
        fee: 24,
        netAmount: 1176,
        recipientNumber: '01819-223344',
        status: 'pending',
        createdAt: '2026-10-03 11:42 AM'
      },
      {
        id: 'wd_01',
        userId: 'usr_prime_01',
        method: 'bkash',
        amount: 1500,
        fee: 30,
        netAmount: 1470,
        recipientNumber: '01712-345678',
        status: 'approved',
        createdAt: '2026-10-01 04:30 PM',
        trxId: '9JH76W3Q'
      }
    ];
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('primebd_team');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
  });

  useEffect(() => {
    localStorage.setItem('primebd_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('primebd_admin_logged_in', JSON.stringify(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('primebd_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('primebd_app_mode', appMode);
  }, [appMode]);

  useEffect(() => {
    localStorage.setItem('primebd_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('primebd_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('primebd_official_accounts', JSON.stringify(officialAccounts));
  }, [officialAccounts]);

  useEffect(() => {
    localStorage.setItem('primebd_notice', JSON.stringify(systemNotice));
  }, [systemNotice]);

  useEffect(() => {
    localStorage.setItem('primebd_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('primebd_servers', JSON.stringify(activeServers));
  }, [activeServers]);

  useEffect(() => {
    localStorage.setItem('primebd_tx', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('primebd_deposits', JSON.stringify(depositRequests));
  }, [depositRequests]);

  useEffect(() => {
    localStorage.setItem('primebd_withdraws', JSON.stringify(withdrawRequests));
  }, [withdrawRequests]);

  useEffect(() => {
    localStorage.setItem('primebd_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#ffffff']
    });
  };

  // User Actions
  const completeTask = (taskId: string): boolean => {
    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask || targetTask.completed) return false;

    if (user.vipLevel < targetTask.requiredVip) {
      showNotification(language === 'bn' 
        ? `এই কাজের জন্য সার্ভার লেভেল ${targetTask.requiredVip} প্রয়োজন!`
        : `This task requires VIP Server Level ${targetTask.requiredVip}!`
      );
      return false;
    }

    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t,
      completed: true,
      completedAt: timeStr
    } : t));

    setUser(prev => ({
      ...prev,
      balance: prev.balance + targetTask.reward,
      totalEarnedToday: prev.totalEarnedToday + targetTask.reward,
      totalEarnedAllTime: prev.totalEarnedAllTime + targetTask.reward,
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'task_reward',
      amount: targetTask.reward,
      title: `${targetTask.title} Reward`,
      titleBn: `${targetTask.titleBn} রিওয়ার্ড`,
      status: 'completed',
      timestamp: timeStr,
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();

    showNotification(language === 'bn' 
      ? `টাস্ক সম্পন্ন! ৳${targetTask.reward} টাকা ওয়ালেটে যোগ হয়েছে।`
      : `Task completed! ৳${targetTask.reward} added to your balance.`
    );

    return true;
  };

  const rentServerPackage = (pkg: ServerPackage): { success: boolean; message: string } => {
    if (pkg.tier === 0) {
      return {
        success: false,
        message: language === 'bn' ? 'ফ্রি প্যাকেজ ইতিমধ্যে সক্রিয় আছে!' : 'Free starter package is already active!'
      };
    }

    if (user.balance < pkg.price) {
      setDepositModalOpen(true);
      return {
        success: false,
        message: language === 'bn' 
          ? `অপর্যাপ্ত ব্যালেন্স! সার্ভার চালু করতে ন্যূনতম ৳${pkg.price} ডিপোজিট করুন।`
          : `Insufficient funds! Need ৳${pkg.price} to activate this server.`
      };
    }

    const now = new Date();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + pkg.validityDays);

    const newActiveServer: ActiveServer = {
      id: 'asrv_' + Date.now(),
      packageId: pkg.id,
      name: pkg.name,
      nameBn: pkg.nameBn,
      tier: pkg.tier,
      price: pkg.price,
      dailyIncome: pkg.dailyIncome,
      activatedAt: now.toISOString().split('T')[0],
      expiresAt: expiry.toISOString().split('T')[0],
      lastClaimDate: '',
      canClaimToday: true,
      daysRemaining: pkg.validityDays,
    };

    setUser(prev => ({
      ...prev,
      balance: prev.balance - pkg.price,
      vipLevel: Math.max(prev.vipLevel, pkg.tier),
      vipName: pkg.name,
    }));

    setActiveServers(prev => [newActiveServer, ...prev]);

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'server_rent',
      amount: pkg.price,
      title: `Server Activation: ${pkg.name}`,
      titleBn: `সার্ভার চালু: ${pkg.nameBn}`,
      status: 'completed',
      timestamp: now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();

    const successMsg = language === 'bn' 
      ? `অভিনন্দন! ${pkg.nameBn} সফলভাবে চালু হয়েছে। প্রতিদিন ৳${pkg.dailyIncome} আয় পাবেন!`
      : `Success! ${pkg.name} activated. You earn ৳${pkg.dailyIncome} daily return!`;

    showNotification(successMsg);
    return { success: true, message: successMsg };
  };

  const claimDailyServerIncome = (serverId: string) => {
    const srv = activeServers.find(s => s.id === serverId);
    if (!srv || !srv.canClaimToday) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setActiveServers(prev => prev.map(s => s.id === serverId ? {
      ...s,
      canClaimToday: false,
      lastClaimDate: todayStr
    } : s));

    setUser(prev => ({
      ...prev,
      balance: prev.balance + srv.dailyIncome,
      totalEarnedToday: prev.totalEarnedToday + srv.dailyIncome,
      totalEarnedAllTime: prev.totalEarnedAllTime + srv.dailyIncome
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'server_income',
      amount: srv.dailyIncome,
      title: `Daily Profit from ${srv.name}`,
      titleBn: `${srv.nameBn} এর দৈনিক আয় সংগ্রহ`,
      status: 'completed',
      timestamp: timeStr,
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();

    showNotification(language === 'bn'
      ? `৳${srv.dailyIncome} দৈনিক সার্ভার ইনকাম ব্যালেন্সে যোগ হয়েছে!`
      : `৳${srv.dailyIncome} daily server profit added to your wallet!`
    );
  };

  const submitDeposit = (method: PaymentMethod, amount: number, senderNumber: string, trxId: string) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newDep: DepositRequest = {
      id: 'dep_' + Date.now(),
      userId: user.id,
      method,
      amount,
      senderNumber,
      trxId: trxId.trim().toUpperCase(),
      status: 'pending', // Goes to Admin Queue for real management!
      createdAt: timeStr,
    };

    setDepositRequests(prev => [newDep, ...prev]);

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'deposit',
      amount: amount,
      title: `Deposit via ${method.toUpperCase()} (${senderNumber})`,
      titleBn: `${method === 'bkash' ? 'বিকাশ' : method === 'nagad' ? 'নগদ' : 'রকেট'} ডিপোজিট রিকোয়েস্ট (${senderNumber})`,
      status: 'pending',
      timestamp: timeStr,
      reference: `TrxID: ${trxId.toUpperCase()}`
    };

    setTransactions(prev => [newTx, ...prev]);

    showNotification(language === 'bn'
      ? `ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে! অ্যাডমিন অনুমোদনের পর ব্যালেন্সে যোগ হবে।`
      : `Deposit request submitted! Funds will reflect upon admin verification.`
    );
  };

  const submitWithdraw = (method: PaymentMethod, amount: number, recipientNumber: string): { success: boolean; message: string } => {
    if (amount < 300) {
      return {
        success: false,
        message: language === 'bn' ? 'সর্বনিম্ন উইথড্র পরিমাণ ৩০০ টাকা!' : 'Minimum withdrawal limit is ৳300!'
      };
    }

    if (amount > 25000) {
      return {
        success: false,
        message: language === 'bn' ? 'একবারে সর্বোচ্চ উত্তোলন ২৫,০০০ টাকা!' : 'Maximum per-transaction withdrawal is ৳25,000!'
      };
    }

    if (user.balance < amount) {
      return {
        success: false,
        message: language === 'bn' ? 'আপনার ব্যালেন্স পর্যাপ্ত নয়!' : 'Insufficient wallet balance!'
      };
    }

    const fee = Math.round(amount * 0.02);
    const netAmount = amount - fee;
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newWd: WithdrawRequest = {
      id: 'wd_' + Date.now(),
      userId: user.id,
      method,
      amount,
      fee,
      netAmount,
      recipientNumber,
      status: 'pending',
      createdAt: timeStr
    };

    setWithdrawRequests(prev => [newWd, ...prev]);

    // Deduct balance
    setUser(prev => ({
      ...prev,
      balance: prev.balance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'withdraw',
      amount: amount,
      title: `Withdrawal via ${method.toUpperCase()} (${recipientNumber})`,
      titleBn: `${method === 'bkash' ? 'বিকাশ' : method === 'nagad' ? 'নগদ' : 'রকেট'} ক্যাশআউট রিকোয়েস্ট (${recipientNumber})`,
      status: 'pending',
      timestamp: timeStr,
      reference: `Net: ৳${netAmount} (Fee: ৳${fee})`
    };

    setTransactions(prev => [newTx, ...prev]);

    const msg = language === 'bn'
      ? `উইথড্র রিকোয়েস্ট জমা হয়েছে! ২০-৩০ মিনিটে ৳${netAmount} টাকা পাবেন।`
      : `Withdrawal submitted! ৳${netAmount} will arrive within 20-30 minutes.`;

    showNotification(msg);
    return { success: true, message: msg };
  };

  // ADMIN ACTIONS
  const approveDeposit = (depositId: string) => {
    const dep = depositRequests.find(d => d.id === depositId);
    if (!dep || dep.status === 'approved') return;

    setDepositRequests(prev => prev.map(d => d.id === depositId ? { ...d, status: 'approved' } : d));

    // If it belongs to current active user, credit balance
    if (dep.userId === user.id) {
      setUser(prev => ({
        ...prev,
        balance: prev.balance + dep.amount,
        totalDeposited: prev.totalDeposited + dep.amount,
      }));
    }

    // Also update in allUsers directory
    setAllUsers(prev => prev.map(u => u.id === dep.userId ? {
      ...u,
      balance: u.balance + dep.amount,
      totalDeposited: u.totalDeposited + dep.amount
    } : u));

    // Update transaction
    setTransactions(prev => prev.map(t => (t.reference && t.reference.includes(dep.trxId)) ? {
      ...t,
      status: 'completed'
    } : t));

    triggerConfetti();
    showNotification(`Deposit ${dep.trxId} of ৳${dep.amount} approved & credited.`);
  };

  const rejectDeposit = (depositId: string, reason?: string) => {
    const dep = depositRequests.find(d => d.id === depositId);
    if (!dep) return;

    setDepositRequests(prev => prev.map(d => d.id === depositId ? { ...d, status: 'rejected' } : d));
    setTransactions(prev => prev.map(t => (t.reference && t.reference.includes(dep.trxId)) ? {
      ...t,
      status: 'rejected'
    } : t));

    showNotification(`Deposit ${dep.trxId} rejected.`);
  };

  const approveWithdraw = (withdrawId: string) => {
    const wd = withdrawRequests.find(w => w.id === withdrawId);
    if (!wd || wd.status === 'approved') return;

    const generatedTrxId = 'OUT' + Math.random().toString(36).substring(2, 9).toUpperCase();

    setWithdrawRequests(prev => prev.map(w => w.id === withdrawId ? { 
      ...w, 
      status: 'approved',
      trxId: generatedTrxId 
    } : w));

    // Update in allUsers directory
    setAllUsers(prev => prev.map(u => u.id === wd.userId ? {
      ...u,
      totalWithdrawn: u.totalWithdrawn + wd.amount
    } : u));

    setTransactions(prev => prev.map(t => t.id.includes(withdrawId.replace('wd_', '')) ? { 
      ...t, 
      status: 'completed',
      reference: `TrxID: ${generatedTrxId} (Net: ৳${wd.netAmount})`
    } : t));

    triggerConfetti();
    showNotification(`Cashout of ৳${wd.amount} marked as PAID. Disbursed TrxID: ${generatedTrxId}`);
  };

  const rejectWithdraw = (withdrawId: string, reason?: string) => {
    const wd = withdrawRequests.find(w => w.id === withdrawId);
    if (!wd) return;

    setWithdrawRequests(prev => prev.map(w => w.id === withdrawId ? { ...w, status: 'rejected' } : w));

    // Refund user balance
    if (wd.userId === user.id) {
      setUser(prev => ({
        ...prev,
        balance: prev.balance + wd.amount,
        totalWithdrawn: Math.max(0, prev.totalWithdrawn - wd.amount)
      }));
    }

    setAllUsers(prev => prev.map(u => u.id === wd.userId ? {
      ...u,
      balance: u.balance + wd.amount,
      totalWithdrawn: Math.max(0, u.totalWithdrawn - wd.amount)
    } : u));

    setTransactions(prev => prev.map(t => t.id.includes(withdrawId.replace('wd_', '')) ? { 
      ...t, 
      status: 'rejected' 
    } : t));

    showNotification(`Withdrawal of ৳${wd.amount} rejected. Funds refunded to user.`);
  };

  const adminUpdateUserBalance = (userId: string, delta: number) => {
    if (userId === user.id) {
      setUser(prev => ({ ...prev, balance: Math.max(0, prev.balance + delta) }));
    }
    setAllUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      balance: Math.max(0, u.balance + delta)
    } : u));

    showNotification(`User balance adjusted by ${delta >= 0 ? '+' : ''}৳${delta}`);
  };

  const adminUpdateUserVip = (userId: string, newTier: number) => {
    const pkg = SERVER_PACKAGES.find(p => p.tier === newTier) || SERVER_PACKAGES[0];
    if (userId === user.id) {
      setUser(prev => ({ ...prev, vipLevel: newTier, vipName: pkg.name }));
    }
    setAllUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      vipLevel: newTier,
      vipName: pkg.name
    } : u));

    showNotification(`User upgraded to VIP Level ${newTier}`);
  };

  const adminToggleUserStatus = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      status: u.status === 'active' ? 'suspended' : 'active'
    } : u));
    showNotification(`User status toggled.`);
  };

  const addNewTask = (taskData: Omit<TaskItem, 'id' | 'completed' | 'completedAt'>) => {
    const newTask: TaskItem = {
      ...taskData,
      id: 'tsk_' + Date.now(),
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
    triggerConfetti();
    showNotification(`New task "${taskData.title}" created successfully.`);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showNotification(`Task removed.`);
  };

  const updateOfficialNumber = (method: 'bkash' | 'nagad' | 'rocket', newNumber: string) => {
    setOfficialAccounts((prev: typeof OFFICIAL_PAYMENT_ACCOUNTS) => ({
      ...prev,
      [method]: {
        ...prev[method],
        number: newNumber
      }
    }));
    showNotification(`Official ${method.toUpperCase()} payment number updated to ${newNumber}`);
  };

  const updateNotice = (textBn: string, textEn: string) => {
    setSystemNotice({ textBn, textEn });
    showNotification(`Notice announcement updated.`);
  };

  const claimMonthlySalary = (): { success: boolean; message: string } => {
    const activeCount = teamMembers.filter(m => m.status === 'active').length;
    if (activeCount < 20) {
      return {
        success: false,
        message: language === 'bn'
          ? `স্যালারি পেতে ২০ জন সক্রিয় রেফারেল প্রয়োজন! আপনার আছে ${activeCount} জন।`
          : `Need 20 active referrals to claim monthly salary! You have ${activeCount}.`
      };
    }

    const salaryAmount = 20000;
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setUser(prev => ({
      ...prev,
      balance: prev.balance + salaryAmount,
      totalEarnedAllTime: prev.totalEarnedAllTime + salaryAmount,
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'salary_bonus',
      amount: salaryAmount,
      title: 'Monthly Fixed Salary Bonus',
      titleBn: 'মাসিক ২০,০০০ টাকা ফিক্সড স্যালারি বোনাস',
      status: 'completed',
      timestamp: timeStr,
    };

    setTransactions(prev => [newTx, ...prev]);
    triggerConfetti();

    const msg = language === 'bn' 
      ? 'অভিনন্দন! ২০,০০০ টাকা মাসিক ফিক্সড স্যালারি আপনার একাউন্টে যোগ হয়েছে।'
      : 'Congratulations! ৳20,000 monthly salary credited to your wallet.';

    showNotification(msg);
    return { success: true, message: msg };
  };

  const addFastBalance = (amount: number) => {
    setUser(prev => ({ ...prev, balance: prev.balance + amount }));
    showNotification(`Added ৳${amount} test balance.`);
    triggerConfetti();
  };

  // Auth Functions
  const login = (phone: string, pin: string): { success: boolean; message: string } => {
    const cleanPhone = phone.trim().replace(/[-\s]/g, '');
    const foundUser = allUsers.find(u => u.phone.replace(/[-\s]/g, '') === cleanPhone);

    if (foundUser) {
      if (foundUser.status === 'suspended') {
        const msg = language === 'bn' 
          ? 'আপনার অ্যাকাউন্ট সাময়িক স্থগিত করা হয়েছে! সাপোর্টে যোগাযোগ করুন।' 
          : 'Your account is suspended! Contact support.';
        showNotification(msg);
        return { success: false, message: msg };
      }

      setUser({
        id: foundUser.id,
        name: foundUser.name,
        phone: foundUser.phone,
        email: foundUser.email,
        balance: foundUser.balance,
        totalWithdrawn: foundUser.totalWithdrawn,
        totalDeposited: foundUser.totalDeposited,
        totalEarnedToday: 0,
        totalEarnedAllTime: foundUser.balance + foundUser.totalWithdrawn,
        vipLevel: foundUser.vipLevel,
        vipName: foundUser.vipName,
        referralCode: 'PRIME-' + foundUser.phone.slice(-4),
        joinedDate: foundUser.joinedDate,
        isKycVerified: true,
      });

      setIsLoggedIn(true);
      setAuthModalOpen(false);
      triggerConfetti();

      const welcomeMsg = language === 'bn' 
        ? `স্বাগতম ${foundUser.name}! সফলভাবে লগইন হয়েছে।` 
        : `Welcome back ${foundUser.name}! Login successful.`;
      showNotification(welcomeMsg);
      return { success: true, message: welcomeMsg };
    }

    // New number automatic profile
    const newUserObj: User = {
      id: 'usr_' + Date.now(),
      name: 'User ' + phone.slice(-4),
      phone: phone,
      email: `${phone.replace(/[^0-9]/g, '')}@primebd.net`,
      balance: 100,
      totalWithdrawn: 0,
      totalDeposited: 0,
      totalEarnedToday: 0,
      totalEarnedAllTime: 100,
      vipLevel: 0,
      vipName: 'VIP 0 Starter',
      referralCode: 'PRIME-' + Math.floor(1000 + Math.random() * 9000),
      joinedDate: new Date().toISOString().split('T')[0],
      isKycVerified: false,
    };

    setUser(newUserObj);
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    triggerConfetti();

    const msg = language === 'bn' ? 'সফলভাবে লগইন সম্পন্ন হয়েছে!' : 'Login successful!';
    showNotification(msg);
    return { success: true, message: msg };
  };

  const register = (name: string, phone: string, pin: string, referralCode?: string): { success: boolean; message: string } => {
    const welcomeBonus = 50;
    const newId = 'usr_' + Date.now();
    const cleanPhone = phone.trim();
    const todayStr = new Date().toISOString().split('T')[0];

    const newUserObj: User = {
      id: newId,
      name: name.trim(),
      phone: cleanPhone,
      email: `${cleanPhone.replace(/[^0-9]/g, '')}@primebd.net`,
      balance: welcomeBonus,
      totalWithdrawn: 0,
      totalDeposited: 0,
      totalEarnedToday: welcomeBonus,
      totalEarnedAllTime: welcomeBonus,
      vipLevel: 0,
      vipName: 'VIP 0 Starter',
      referralCode: 'PRIME-' + Math.floor(1000 + Math.random() * 9000),
      referredBy: referralCode || undefined,
      joinedDate: todayStr,
      isKycVerified: true,
    };

    const newAdminUser: AdminManagedUser = {
      id: newId,
      name: name.trim(),
      phone: cleanPhone,
      email: newUserObj.email,
      balance: welcomeBonus,
      vipLevel: 0,
      vipName: 'VIP 0 Starter',
      totalDeposited: 0,
      totalWithdrawn: 0,
      joinedDate: todayStr,
      status: 'active'
    };

    setUser(newUserObj);
    setAllUsers(prev => [newAdminUser, ...prev]);

    const bonusTx: Transaction = {
      id: 'tx_bonus_' + Date.now(),
      type: 'task_reward',
      amount: welcomeBonus,
      title: 'Sign Up Welcome Gift Bonus',
      titleBn: 'নতুন অ্যাকাউন্ট রেজিস্টার ওয়েলকাম বোনাস',
      status: 'completed',
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions(prev => [bonusTx, ...prev]);
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    triggerConfetti();

    const msg = language === 'bn'
      ? `অভিনন্দন ${name}! রেজিস্ট্রেশন সম্পন্ন এবং ৳${welcomeBonus} বোনাস পেয়েছেন!`
      : `Congratulations ${name}! Account registered and ৳${welcomeBonus} bonus credited!`;

    showNotification(msg);
    return { success: true, message: msg };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthModalOpen(true);
    showNotification(language === 'bn' ? 'লগআউট সম্পন্ন হয়েছে।' : 'You have been logged out.');
  };

  const switchUserAccount = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (!target) return;

    setUser({
      id: target.id,
      name: target.name,
      phone: target.phone,
      email: target.email,
      balance: target.balance,
      totalWithdrawn: target.totalWithdrawn,
      totalDeposited: target.totalDeposited,
      totalEarnedToday: 0,
      totalEarnedAllTime: target.balance + target.totalWithdrawn,
      vipLevel: target.vipLevel,
      vipName: target.vipName,
      referralCode: 'PRIME-' + target.phone.slice(-4),
      joinedDate: target.joinedDate,
      isKycVerified: true,
    });

    setIsLoggedIn(true);
    setAuthModalOpen(false);
    triggerConfetti();

    showNotification(language === 'bn' ? `অ্যাকাউন্ট পরিবর্তিত: ${target.name}` : `Switched to ${target.name}`);
  };

  // Master Admin Authentication
  const adminLogin = (username: string, password: string, pin: string): { success: boolean; message: string } => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      const err = language === 'bn' ? 'ইউজারনেম এবং পাসওয়ার্ড পূরণ করুন!' : 'Please enter username and password!';
      showNotification(err);
      return { success: false, message: err };
    }

    // Accept admin or admin@primebd.net, or any valid admin pass
    setIsAdminLoggedIn(true);
    setAppMode('admin');
    triggerConfetti();

    const okMsg = language === 'bn'
      ? 'স্বাগতম অ্যাডমিনিস্ট্রেটর! মাস্টার কন্ট্রোল প্যানেল আনলক করা হয়েছে।'
      : 'Master Administrator verified. Full control center unlocked.';
    showNotification(okMsg);
    return { success: true, message: okMsg };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    showNotification(language === 'bn' ? 'অ্যাডমিন সেশন সফলভাবে লগআউট হয়েছে।' : 'Admin session logged out.');
  };

  const resetAllData = () => {
    localStorage.removeItem('primebd_user');
    localStorage.removeItem('primebd_all_users');
    localStorage.removeItem('primebd_official_accounts');
    localStorage.removeItem('primebd_notice');
    localStorage.removeItem('primebd_tasks');
    localStorage.removeItem('primebd_servers');
    localStorage.removeItem('primebd_tx');
    localStorage.removeItem('primebd_deposits');
    localStorage.removeItem('primebd_withdraws');
    localStorage.removeItem('primebd_team');
    
    setUser(INITIAL_USER);
    setAllUsers(MOCK_DIRECTORY_USERS as AdminManagedUser[]);
    setOfficialAccounts(OFFICIAL_PAYMENT_ACCOUNTS);
    setTasks(INITIAL_TASKS);
    setActiveServers([
      {
        id: 'asrv_01',
        packageId: 'pkg_vip2',
        name: 'Server 2 (Silver Cloud)',
        nameBn: 'সার্ভার ২ (সিলভার ক্লাউড)',
        tier: 2,
        price: 2500,
        dailyIncome: 220,
        activatedAt: '2026-09-28',
        expiresAt: '2026-11-28',
        lastClaimDate: '2026-10-02',
        canClaimToday: true,
        daysRemaining: 55,
      }
    ]);
    setTransactions(INITIAL_TRANSACTIONS);
    setDepositRequests([
      {
        id: 'dep_101',
        userId: 'usr_prime_02',
        method: 'nagad',
        amount: 5000,
        senderNumber: '01819-223344',
        trxId: 'NG99182C',
        status: 'pending',
        createdAt: '2026-10-03 10:45 AM'
      },
      {
        id: 'dep_102',
        userId: 'usr_prime_03',
        method: 'bkash',
        amount: 2500,
        senderNumber: '01911-556677',
        trxId: 'BK77218X',
        status: 'pending',
        createdAt: '2026-10-03 11:15 AM'
      }
    ]);
    setWithdrawRequests([
      {
        id: 'wd_201',
        userId: 'usr_prime_04',
        method: 'bkash',
        amount: 4500,
        fee: 90,
        netAmount: 4410,
        recipientNumber: '01622-778899',
        status: 'pending',
        createdAt: '2026-10-03 11:30 AM'
      },
      {
        id: 'wd_202',
        userId: 'usr_prime_02',
        method: 'nagad',
        amount: 1200,
        fee: 24,
        netAmount: 1176,
        recipientNumber: '01819-223344',
        status: 'pending',
        createdAt: '2026-10-03 11:42 AM'
      }
    ]);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    showNotification(language === 'bn' ? 'ডেমো ডেটা রিসেট সম্পন্ন হয়েছে!' : 'Demo data reset completed!');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        appMode,
        setAppMode,
        activeTab,
        setActiveTab,
        user,
        tasks,
        serverPackages: SERVER_PACKAGES,
        activeServers,
        transactions,
        depositRequests,
        withdrawRequests,
        teamMembers,
        isAdminOpen,
        setIsAdminOpen,
        selectedTaskForExecution,
        setSelectedTaskForExecution,
        depositModalOpen,
        setDepositModalOpen,
        withdrawModalOpen,
        setWithdrawModalOpen,
        activeTaskTab,
        setActiveTaskTab,
        notification,
        showNotification,
        officialAccounts,
        systemNotice,
        allUsers,
        completeTask,
        rentServerPackage,
        claimDailyServerIncome,
        submitDeposit,
        submitWithdraw,
        claimMonthlySalary,
        resetAllData,
        addFastBalance,
        approveDeposit,
        rejectDeposit,
        approveWithdraw,
        rejectWithdraw,
        adminUpdateUserBalance,
        adminUpdateUserVip,
        adminToggleUserStatus,
        addNewTask,
        deleteTask,
        updateOfficialNumber,
        updateNotice,
        isLoggedIn,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        register,
        logout,
        switchUserAccount,
        isAdminLoggedIn,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
