import { User, ServerPackage, TaskItem, Transaction, TeamMember, LivePayoutNotification } from '../types';

export const INITIAL_USER: User = {
  id: 'usr_prime_01',
  name: 'Sagar Raju',
  phone: '01712-345678',
  email: 'sagar.primebd@gmail.com',
  balance: 1450.00,
  totalWithdrawn: 3800.00,
  totalDeposited: 2500.00,
  totalEarnedToday: 185.00,
  totalEarnedAllTime: 5250.00,
  vipLevel: 2,
  vipName: 'Server 2 (Silver Cloud)',
  referralCode: 'PRIME-7789',
  joinedDate: '2026-08-15',
  isKycVerified: true,
};

export const SERVER_PACKAGES: ServerPackage[] = [
  {
    id: 'pkg_vip0',
    name: 'VIP 0 Starter (Free)',
    nameBn: 'ভিআইপি ০ স্টার্টার (ফ্রি ট্রায়াল)',
    tier: 0,
    price: 0,
    dailyIncome: 30,
    dailyTasks: 1,
    validityDays: 30,
    totalReturn: 900,
    color: 'from-slate-700 to-slate-900',
    accentColor: '#94a3b8',
    features: [
      '1 Task per day',
      'Daily profit ৳30',
      '30 Days validity',
      'Standard telegram support',
      'Min withdraw ৳300'
    ],
    featuresBn: [
      'প্রতিদিন ১টি ফ্রি টাস্ক',
      'দৈনিক লাভ ৳৩০',
      'মেয়াদ ৩০ দিন',
      'টেলিগ্রাম সাপোর্ট এক্সেস',
      'সর্বনিম্ন উইথড্র ৳৩০০'
    ]
  },
  {
    id: 'pkg_vip1',
    name: 'Server 1 (Bronze Cloud)',
    nameBn: 'সার্ভার ১ (ব্রোঞ্জ ক্লাউড)',
    tier: 1,
    price: 1000,
    dailyIncome: 85,
    dailyTasks: 3,
    validityDays: 60,
    totalReturn: 5100,
    color: 'from-amber-900/60 to-amber-950',
    accentColor: '#f59e0b',
    features: [
      '3 Tasks per day',
      'Daily return ৳85',
      '60 Days server duration',
      'Total profit ৳5,100',
      'Fast bKash/Nagad cashout'
    ],
    featuresBn: [
      'প্রতিদিন ৩টি প্রিমিয়াম টাস্ক',
      'দৈনিক রিটার্ন ৳৮৫',
      'মেয়াদ ৬০ দিন',
      'মোট লাভ ৳৫,১০০',
      'দ্রুত বিকাশ/নগদে ক্যাশআউট'
    ]
  },
  {
    id: 'pkg_vip2',
    name: 'Server 2 (Silver Cloud)',
    nameBn: 'সার্ভার ২ (সিলভার ক্লাউড)',
    tier: 2,
    price: 2500,
    dailyIncome: 220,
    dailyTasks: 5,
    validityDays: 60,
    totalReturn: 13200,
    color: 'from-cyan-900/60 to-slate-950',
    accentColor: '#06b6d4',
    isPopular: true,
    features: [
      '5 High-value tasks daily',
      'Daily automated return ৳220',
      '60 Days server duration',
      'Total profit ৳13,200',
      'Priority payment gateway'
    ],
    featuresBn: [
      'প্রতিদিন ৫টি হাই-ভ্যালু টাস্ক',
      'দৈনিক অটোমেটেড লাভ ৳২২০',
      'মেয়াদ ৬০ দিন',
      'মোট লাভ ৳১৩,২০০',
      'অগ্রাধিকার ভিত্তিতে পেমেন্ট'
    ]
  },
  {
    id: 'pkg_vip3',
    name: 'Server 3 (Gold Cloud)',
    nameBn: 'সার্ভার ৩ (গোল্ড ক্লাউড)',
    tier: 3,
    price: 5000,
    dailyIncome: 460,
    dailyTasks: 8,
    validityDays: 90,
    totalReturn: 41400,
    color: 'from-yellow-700/60 to-amber-950',
    accentColor: '#eab308',
    features: [
      '8 Elite tasks daily',
      'Daily return ৳460',
      '90 Days server duration',
      'Total profit ৳41,400',
      'VIP Telegram personal manager'
    ],
    featuresBn: [
      'প্রতিদিন ৮টি এলিট টাস্ক',
      'দৈনিক আয় ৳৪৬০',
      'মেয়াদ ৯০ দিন',
      'মোট লাভ ৳৪১,৪০০',
      'ব্যক্তিগত টেলিগ্রাম হেল্প ম্যানেজার'
    ]
  },
  {
    id: 'pkg_vip4',
    name: 'Server 4 (Platinum Cloud)',
    nameBn: 'সার্ভার ৪ (প্লাটিনাম ক্লাউড)',
    tier: 4,
    price: 10000,
    dailyIncome: 980,
    dailyTasks: 12,
    validityDays: 90,
    totalReturn: 88200,
    color: 'from-emerald-900/60 to-slate-950',
    accentColor: '#10b981',
    features: [
      '12 Super tasks daily',
      'Daily return ৳980',
      '90 Days server duration',
      'Total profit ৳88,200',
      'Instant 5-minute withdrawal queue'
    ],
    featuresBn: [
      'প্রতিদিন ১২টি সুপার টাস্ক',
      'দৈনিক আয় ৳৯৮০',
      'মেয়াদ ৯০ দিন',
      'মোট লাভ ৳৮৮,২০০',
      'মাত্র ৫ মিনিটে ইনস্ট্যান্ট উইথড্র'
    ]
  },
  {
    id: 'pkg_vip5',
    name: 'Server 5 (Diamond Master)',
    nameBn: 'সার্ভার ৫ (ডায়মন্ড মাস্টার)',
    tier: 5,
    price: 25000,
    dailyIncome: 2600,
    dailyTasks: 20,
    validityDays: 120,
    totalReturn: 312000,
    color: 'from-purple-900/60 to-slate-950',
    accentColor: '#a855f7',
    features: [
      '20 Premium tasks daily',
      'Daily return ৳2,600',
      '120 Days server duration',
      'Total profit ৳312,000',
      'Eligible for ৳20K monthly fixed salary bonus'
    ],
    featuresBn: [
      'প্রতিদিন ২০টি প্রিমিয়াম টাস্ক',
      'দৈনিক আয় ৳২,৬০০',
      'মেয়াদ ১২০ দিন',
      'মোট লাভ ৳৩,১২,০০০',
      'মাসিক ২০ হাজার টাকা স্যালারির অগ্রাধিকার'
    ]
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk_01',
    title: 'Watch & Like YouTube Video',
    titleBn: 'ইউটিউব ভিডিও দেখুন ও লাইক দিন',
    description: 'Watch 25 seconds of the sponsor video and hit like to boost video rank.',
    descriptionBn: 'স্পনসর করা ভিডিওটি ২৫ সেকেন্ড দেখুন এবং লাইক দিয়ে রেটিং বাড়ান।',
    reward: 35,
    category: 'youtube',
    durationSeconds: 15,
    requiredVip: 0,
    taskUrl: 'https://youtube.com',
    completed: true,
    completedAt: '2026-10-03 09:15 AM',
    iconType: 'youtube'
  },
  {
    id: 'tsk_02',
    title: 'Follow Facebook Business Page',
    titleBn: 'ফেসবুক পেজ ফলো এবং লাইক করুন',
    description: 'Follow the official verified merchant partner page on Facebook.',
    descriptionBn: 'অফিসিয়াল পার্টনার ফেসবুক পেজটিতে ফলো বাটন চাপুন।',
    reward: 40,
    category: 'facebook',
    durationSeconds: 12,
    requiredVip: 0,
    taskUrl: 'https://facebook.com',
    completed: true,
    completedAt: '2026-10-03 10:20 AM',
    iconType: 'facebook'
  },
  {
    id: 'tsk_03',
    title: 'Join Official Telegram Community',
    titleBn: 'অফিসিয়াল টেলিগ্রাম গ্রুপে যুক্ত হন',
    description: 'Join the community group for daily promo codes and withdrawal updates.',
    descriptionBn: 'ডেইলি পেমেন্ট প্রুফ ও প্রমো কোডের জন্য অফিসিয়াল টেলিগ্রামে যুক্ত হন।',
    reward: 45,
    category: 'telegram',
    durationSeconds: 10,
    requiredVip: 1,
    taskUrl: 'https://t.me',
    completed: false,
    iconType: 'telegram'
  },
  {
    id: 'tsk_04',
    title: '5-Star Google Play App Review',
    titleBn: 'গুগল প্লে স্টোরে ৫-স্টার রেটিং ও রিভিউ',
    description: 'Provide an authentic 5-star positive review on merchant Android app.',
    descriptionBn: 'পার্টনার অ্যান্ড্রয়েড অ্যাপটিতে ৫-স্টার রেটিং ও সুন্দর রিভিউ প্রদান করুন।',
    reward: 55,
    category: 'review',
    durationSeconds: 18,
    requiredVip: 1,
    taskUrl: 'https://play.google.com',
    completed: false,
    iconType: 'star'
  },
  {
    id: 'tsk_05',
    title: 'Visit Sponsor Web Portal & Stay 20s',
    titleBn: 'স্পনসর ওয়েবসাইটে ২০ সেকেন্ড ভিজিট করুন',
    description: 'Browse the partner e-commerce catalog page for at least 20 seconds.',
    descriptionBn: 'পার্টনার ইকমার্স প্ল্যাটফর্মটি ব্রাউজ করে তথ্য পর্যবেক্ষণ করুন।',
    reward: 50,
    category: 'web',
    durationSeconds: 20,
    requiredVip: 2,
    taskUrl: 'https://primebd.net',
    completed: false,
    iconType: 'globe'
  },
  {
    id: 'tsk_06',
    title: 'Bangladeshi Consumer Survey (3 Qs)',
    titleBn: 'ভোক্তা মতামত জরিপে ৩টি প্রশ্নের উত্তর দিন',
    description: 'Quick consumer feedback on mobile shopping habits in Bangladesh.',
    descriptionBn: 'বাংলাদেশে অনলাইন কেনাকাটার অভিজ্ঞতা নিয়ে ৩টি সহজ প্রশ্নের উত্তর দিন।',
    reward: 60,
    category: 'survey',
    durationSeconds: 25,
    requiredVip: 2,
    taskUrl: 'https://primebd.net/survey',
    completed: false,
    iconType: 'survey'
  }
];

export const OFFICIAL_PAYMENT_ACCOUNTS = {
  bkash: {
    name: 'bKash Personal / Agent',
    nameBn: 'বিকাশ পার্সোনাল / এজেন্ট',
    number: '01893-847291',
    type: 'Send Money / Cash Out',
    typeBn: 'সেন্ড মানি অথবা ক্যাশ আউট',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=80&auto=format&fit=crop&q=80',
    color: '#D12053'
  },
  nagad: {
    name: 'Nagad Personal / Uddokta',
    nameBn: 'নগদ পার্সোনাল / উদ্যোক্তা',
    number: '01755-620419',
    type: 'Send Money / Cash Out',
    typeBn: 'সেন্ড মানি অথবা ক্যাশ আউট',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&auto=format&fit=crop&q=80',
    color: '#F7941D'
  },
  rocket: {
    name: 'Rocket Personal',
    nameBn: 'রকেট পার্সোনাল',
    number: '01914-998822-7',
    type: 'Send Money',
    typeBn: 'সেন্ড মানি',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=80&auto=format&fit=crop&q=80',
    color: '#8C3494'
  }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_101',
    type: 'task_reward',
    amount: 40,
    title: 'Facebook Page Follow Reward',
    titleBn: 'ফেসবুক পেজ ফলো টাস্ক রিওয়ার্ড',
    status: 'completed',
    timestamp: '2026-10-03 10:20 AM'
  },
  {
    id: 'tx_102',
    type: 'task_reward',
    amount: 35,
    title: 'YouTube Watch & Like Reward',
    titleBn: 'ইউটিউব ভিডিও লাইক টাস্ক রিওয়ার্ড',
    status: 'completed',
    timestamp: '2026-10-03 09:15 AM'
  },
  {
    id: 'tx_103',
    type: 'server_income',
    amount: 220,
    title: 'Server 2 Daily Automated Yield',
    titleBn: 'সার্ভার ২ দৈনিক অটোমেটিক ইনকাম',
    status: 'completed',
    timestamp: '2026-10-02 11:59 PM'
  },
  {
    id: 'tx_104',
    type: 'withdraw',
    amount: 1500,
    title: 'Cashout to bKash (01712-345678)',
    titleBn: 'বিকাশে ক্যাশআউট উত্তোলন (01712-345678)',
    status: 'completed',
    timestamp: '2026-10-01 04:30 PM',
    reference: 'TrxID: 9JH76W3Q'
  },
  {
    id: 'tx_105',
    type: 'deposit',
    amount: 2500,
    title: 'Deposit via Nagad (Server 2 Upgrade)',
    titleBn: 'নগদ ডিপোজিট (সার্ভার ২ অ্যাক্টিভেশন)',
    status: 'completed',
    timestamp: '2026-09-28 02:14 PM',
    reference: 'TrxID: NG88741B'
  },
  {
    id: 'tx_106',
    type: 'referral_bonus',
    amount: 250,
    title: 'Team Member Server Activation Commission',
    titleBn: 'টিম মেম্বার সার্ভার আপগ্রেড ১০% কমিশন',
    status: 'completed',
    timestamp: '2026-09-29 07:11 PM'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm_01',
    name: 'Tamim Hossain',
    phone: '01823-****12',
    level: 1,
    joinedAt: '2026-09-12',
    vipTier: 2,
    status: 'active',
    commissionEarned: 250
  },
  {
    id: 'tm_02',
    name: 'Rafiqul Islam',
    phone: '01711-****90',
    level: 1,
    joinedAt: '2026-09-15',
    vipTier: 1,
    status: 'active',
    commissionEarned: 100
  },
  {
    id: 'tm_03',
    name: 'Nahid Hasan',
    phone: '01925-****44',
    level: 1,
    joinedAt: '2026-09-20',
    vipTier: 3,
    status: 'active',
    commissionEarned: 500
  },
  {
    id: 'tm_04',
    name: 'Sharmin Akter',
    phone: '01680-****65',
    level: 1,
    joinedAt: '2026-09-22',
    vipTier: 2,
    status: 'active',
    commissionEarned: 250
  },
  {
    id: 'tm_05',
    name: 'Arif Chowdhury',
    phone: '01730-****88',
    level: 1,
    joinedAt: '2026-09-26',
    vipTier: 1,
    status: 'active',
    commissionEarned: 100
  },
  {
    id: 'tm_06',
    name: 'Al-Amin Khan',
    phone: '01890-****32',
    level: 2,
    joinedAt: '2026-09-27',
    vipTier: 2,
    status: 'active',
    commissionEarned: 125
  },
  {
    id: 'tm_07',
    name: 'Kamrul Hasan',
    phone: '01918-****77',
    level: 2,
    joinedAt: '2026-09-29',
    vipTier: 1,
    status: 'active',
    commissionEarned: 50
  },
  {
    id: 'tm_08',
    name: 'Mehedi Miraz',
    phone: '01552-****30',
    level: 3,
    joinedAt: '2026-10-01',
    vipTier: 1,
    status: 'active',
    commissionEarned: 20
  }
];

export const LIVE_PAYOUT_RECORDS: LivePayoutNotification[] = [
  { id: 'lp_1', phone: '0179****421', amount: 1200, method: 'bkash', timeAgo: '২ মিনিট আগে' },
  { id: 'lp_2', phone: '0182****890', amount: 3500, method: 'nagad', timeAgo: '৪ মিনিট আগে' },
  { id: 'lp_3', phone: '0191****553', amount: 850, method: 'bkash', timeAgo: '৭ মিনিট আগে' },
  { id: 'lp_4', phone: '0163****129', amount: 5000, method: 'nagad', timeAgo: '১১ মিনিট আগে' },
  { id: 'lp_5', phone: '0175****602', amount: 2200, method: 'rocket', timeAgo: '১৪ মিনিট আগে' },
  { id: 'lp_6', phone: '0188****734', amount: 950, method: 'bkash', timeAgo: '১৮ মিনিট আগে' },
  { id: 'lp_7', phone: '0199****045', amount: 10000, method: 'nagad', timeAgo: '২৫ মিনিট আগে' },
];

export const FAQS = [
  {
    qBn: 'Prime BD কি এবং এখান থেকে কিভাবে টাকা আয় করা যায়?',
    qEn: 'What is Prime BD and how to earn money here?',
    aBn: 'Prime BD হলো একটি বাংলাদেশী ক্লাউড টাস্ক ও সার্ভার পার্টনারশিপ প্ল্যাটফর্ম। এখানে আপনি প্রতিদিনের সহজ ডিজিটাল টাস্ক সম্পন্ন করে এবং ক্লাউড সার্ভার রেন্ট করে প্রতিদিন নির্দিষ্ট রিটার্ন আয় করতে পারেন।',
    aEn: 'Prime BD is a Bangladeshi online cloud micro-work and server investment platform where you earn guaranteed BDT returns by completing simple tasks and renting cloud servers.'
  },
  {
    qBn: 'টাকা জমা (ডিপোজিট) এবং উত্তোলন (উইথড্র) কিভাবে করবো?',
    qEn: 'How to deposit and withdraw money?',
    aBn: 'আপনি সরাসরি আপনার বিকাশ, নগদ বা রকেট অ্যাকাউন্ট থেকে নির্ধারিত নম্বরে টাকা পাঠিয়ে TrxID সাবমিট করে ৫ মিনিটের মধ্যে ডিপোজিট করতে পারেন। উত্তোলনের ক্ষেত্রে বিকাশ বা নগদ নম্বর ও পরিমাণ দিয়ে রিকোয়েস্ট পাঠালে ২০-৩০ মিনিটের মধ্যে পেমেন্ট পৌঁছে যায়।',
    aEn: 'You can deposit via bKash, Nagad, or Rocket by sending money and providing the TrxID. Withdrawals are processed directly to your bKash or Nagad wallet within 20-30 minutes.'
  },
  {
    qBn: 'সর্বনিম্ন উইথড্র কত টাকা?',
    qEn: 'What is the minimum withdrawal limit?',
    aBn: 'সর্বনিম্ন উত্তোলনের পরিমাণ মাত্র ৩০০ টাকা। সর্বোচ্চ প্রতিদিন ২৫,০০০ টাকা পর্যন্ত উত্তোলন করা যায়।',
    aEn: 'The minimum withdrawal limit is only ৳300 BDT. The maximum daily withdrawal is ৳25,000 BDT.'
  },
  {
    qBn: 'মাসিক ২০,০০০ টাকা ফিক্সড স্যালারি পাওয়ার নিয়ম কি?',
    qEn: 'What are the rules for the ৳20,000 monthly fixed salary?',
    aBn: 'আপনার সরাসরি রেফারেল লিংকের মাধ্যমে যদি ২০ জন ব্যক্তি সক্রিয় ভিআইপি প্যাকেজ গ্রহণ করেন, তবে আপনি কোম্পানি থেকে প্রতি মাসে ২০,০০০ টাকা নিশ্চিত ফিক্সড স্যালারি বোনাস পাবেন।',
    aEn: 'When you build a direct referral team of 20 active VIP server members, you qualify for an official guaranteed fixed monthly salary bonus of ৳20,000 BDT.'
  }
];

export const MOCK_DIRECTORY_USERS = [
  {
    id: 'usr_prime_01',
    name: 'Sagar Raju',
    phone: '01712-345678',
    email: 'sagar.primebd@gmail.com',
    balance: 1450.00,
    vipLevel: 2,
    vipName: 'Server 2 (Silver Cloud)',
    totalDeposited: 2500,
    totalWithdrawn: 3800,
    joinedDate: '2026-08-15',
    status: 'active'
  },
  {
    id: 'usr_prime_02',
    name: 'Tanvir Hossain',
    phone: '01819-223344',
    email: 'tanvir.bd@gmail.com',
    balance: 4200.00,
    vipLevel: 3,
    vipName: 'Server 3 (Gold Cloud)',
    totalDeposited: 5000,
    totalWithdrawn: 12400,
    joinedDate: '2026-08-20',
    status: 'active'
  },
  {
    id: 'usr_prime_03',
    name: 'Nusrat Jahan',
    phone: '01911-556677',
    email: 'nusrat.earn@gmail.com',
    balance: 850.00,
    vipLevel: 1,
    vipName: 'Server 1 (Bronze Cloud)',
    totalDeposited: 1000,
    totalWithdrawn: 2100,
    joinedDate: '2026-09-02',
    status: 'active'
  },
  {
    id: 'usr_prime_04',
    name: 'Mehedi Hasan Miraz',
    phone: '01622-778899',
    email: 'mehedi.pro@gmail.com',
    balance: 12500.00,
    vipLevel: 4,
    vipName: 'Server 4 (Platinum Cloud)',
    totalDeposited: 10000,
    totalWithdrawn: 28500,
    joinedDate: '2026-07-14',
    status: 'active'
  },
  {
    id: 'usr_prime_05',
    name: 'Shakil Mia',
    phone: '01799-334455',
    email: 'shakil.dhaka@gmail.com',
    balance: 140.00,
    vipLevel: 0,
    vipName: 'VIP 0 Starter',
    totalDeposited: 0,
    totalWithdrawn: 300,
    joinedDate: '2026-09-28',
    status: 'active'
  },
  {
    id: 'usr_prime_06',
    name: 'Arifur Rahman',
    phone: '01855-667788',
    email: 'arifur.work@gmail.com',
    balance: 2100.00,
    vipLevel: 2,
    vipName: 'Server 2 (Silver Cloud)',
    totalDeposited: 2500,
    totalWithdrawn: 4600,
    joinedDate: '2026-09-10',
    status: 'active' as const
  }
];
