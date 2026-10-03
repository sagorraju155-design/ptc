export type Language = 'bn' | 'en';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  totalWithdrawn: number;
  totalDeposited: number;
  totalEarnedToday: number;
  totalEarnedAllTime: number;
  vipLevel: number;
  vipName: string;
  referralCode: string;
  referredBy?: string;
  joinedDate: string;
  isKycVerified: boolean;
}

export type TaskCategory = 'youtube' | 'facebook' | 'telegram' | 'review' | 'web' | 'survey';

export interface TaskItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  reward: number; // in BDT
  category: TaskCategory;
  durationSeconds: number;
  requiredVip: number;
  taskUrl: string;
  completed: boolean;
  completedAt?: string;
  iconType: string;
}

export interface ServerPackage {
  id: string;
  name: string;
  nameBn: string;
  tier: number;
  price: number; // in BDT
  dailyIncome: number; // in BDT
  dailyTasks: number;
  validityDays: number;
  totalReturn: number;
  color: string;
  accentColor: string;
  isPopular?: boolean;
  features: string[];
  featuresBn: string[];
}

export interface ActiveServer {
  id: string;
  packageId: string;
  name: string;
  nameBn: string;
  tier: number;
  price: number;
  dailyIncome: number;
  activatedAt: string;
  expiresAt: string;
  lastClaimDate: string; // YYYY-MM-DD
  canClaimToday: boolean;
  daysRemaining: number;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'upay';

export interface DepositRequest {
  id: string;
  userId: string;
  method: PaymentMethod;
  amount: number;
  senderNumber: string;
  trxId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  note?: string;
}

export interface WithdrawRequest {
  id: string;
  userId: string;
  method: PaymentMethod;
  amount: number;
  fee: number;
  netAmount: number;
  recipientNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  trxId?: string;
}

export type TransactionType =
  | 'task_reward'
  | 'deposit'
  | 'withdraw'
  | 'server_rent'
  | 'server_income'
  | 'referral_bonus'
  | 'salary_bonus';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  title: string;
  titleBn: string;
  status: 'completed' | 'pending' | 'rejected';
  timestamp: string;
  reference?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  phone: string;
  level: 1 | 2 | 3;
  joinedAt: string;
  vipTier: number;
  status: 'active' | 'inactive';
  commissionEarned: number;
}

export interface LivePayoutNotification {
  id: string;
  phone: string;
  amount: number;
  method: PaymentMethod;
  timeAgo: string;
}

export type AppMode = 'user' | 'admin';

export interface OfficialAccountConfig {
  number: string;
  type: string;
  typeBn: string;
  name: string;
  nameBn: string;
  isActive: boolean;
}

export interface SystemNoticeConfig {
  textBn: string;
  textEn: string;
  isActive: boolean;
}
