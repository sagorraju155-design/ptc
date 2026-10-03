import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { 
  Users, 
  Copy, 
  Check, 
  Award, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  UserPlus, 
  Share2,
  ChevronRight,
  Flame
} from 'lucide-react';

export const TeamTab: React.FC = () => {
  const {
    language,
    user,
    teamMembers,
    claimMonthlySalary,
    showNotification
  } = useApp();

  const t = translations[language];
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeLevelTab, setActiveLevelTab] = useState<1 | 2 | 3>(1);

  const inviteUrl = `https://primebd.net/register?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const activeCount = teamMembers.filter(m => m.status === 'active').length;
  const targetCount = 20;
  const progressPercent = Math.min(100, Math.round((activeCount / targetCount) * 100));

  const totalCommission = teamMembers.reduce((sum, m) => sum + m.commissionEarned, 0);

  const filteredMembers = teamMembers.filter(m => m.level === activeLevelTab);

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                AFFILIATE &amp; SALARY
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              {t.teamTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              {t.teamSubtitle}
            </p>
          </div>

          <div className="text-right shrink-0 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              {language === 'bn' ? 'মোট কমিশন' : 'Total Comm.'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400">
              ৳{totalCommission}
            </span>
          </div>
        </div>
      </div>

      {/* ৳20,000 Monthly Fixed Salary Special Card */}
      <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/40 border border-amber-700/60 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base leading-snug">
                {t.salaryRuleTitle}
              </h3>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                {t.salaryRuleDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">
              {language === 'bn' ? 'সক্রিয় রেফারেল অগ্রগতি:' : 'Active Referrals Progress:'}
            </span>
            <span className="text-amber-400 font-extrabold">
              {activeCount} / {targetCount} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              {activeCount >= targetCount
                ? (language === 'bn' ? '✅ যোগ্যতা অর্জন করেছেন!' : '✅ Qualified for salary!')
                : (language === 'bn' ? `আর মাত্র ${targetCount - activeCount} জন সদস্য প্রয়োজন` : `Need ${targetCount - activeCount} more active members`)}
            </span>

            <button
              onClick={() => {
                const res = claimMonthlySalary();
                if (!res.success) {
                  showNotification(res.message);
                }
              }}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs rounded-lg shadow transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.qualifiedSalary} (৳২০,০০০)
            </button>
          </div>
        </div>
      </div>

      {/* Referral Link & Code Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Share2 className="w-4 h-4 text-cyan-400" />
          {language === 'bn' ? 'আপনার ইনভাইট লিংক ও রেফার কোড' : 'Your Invite Link & Referral Code'}
        </h3>

        {/* Invite Code */}
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1">
            {t.myInviteCode}
          </label>
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl">
            <span className="font-mono text-base font-extrabold text-white tracking-widest">
              {user.referralCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? t.copied : t.copyNumber}</span>
            </button>
          </div>
        </div>

        {/* Invite Link */}
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1">
            {t.myInviteLink}
          </label>
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs gap-2">
            <span className="font-mono text-slate-300 truncate text-[11px]">
              {inviteUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg shrink-0 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? t.copied : t.copyLink}</span>
            </button>
          </div>
        </div>

        {/* 3-Tier Commission Cards */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-medium">লেভেল ১ (সরাসরি)</span>
            <span className="text-base font-black text-emerald-400">১০%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">কমিশন</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-medium">লেভেল ২ (সেকেন্ডারি)</span>
            <span className="text-base font-black text-cyan-400">৫%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">কমিশন</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-medium">লেভেল ৩ (টিম)</span>
            <span className="text-base font-black text-purple-400">২%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">কমিশন</span>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">
            {language === 'bn' ? 'টিম সদস্যবৃন্দ' : 'Team Members'} ({teamMembers.length})
          </h3>
          <span className="text-xs text-slate-400">
            {activeCount} {language === 'bn' ? 'সক্রিয়' : 'active'}
          </span>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setActiveLevelTab(1)}
            className={`flex-1 py-1.5 font-semibold rounded-lg transition-all ${
              activeLevelTab === 1 ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 1 ({teamMembers.filter(m => m.level === 1).length})
          </button>
          <button
            onClick={() => setActiveLevelTab(2)}
            className={`flex-1 py-1.5 font-semibold rounded-lg transition-all ${
              activeLevelTab === 2 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 2 ({teamMembers.filter(m => m.level === 2).length})
          </button>
          <button
            onClick={() => setActiveLevelTab(3)}
            className={`flex-1 py-1.5 font-semibold rounded-lg transition-all ${
              activeLevelTab === 3 ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 3 ({teamMembers.filter(m => m.level === 3).length})
          </button>
        </div>

        {/* List of members */}
        <div className="divide-y divide-slate-800/80">
          {filteredMembers.map((member) => (
            <div key={member.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-xs sm:text-sm">
                    {member.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2">
                    <span>{member.phone}</span>
                    <span>•</span>
                    <span>{member.joinedAt}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900/60">
                  VIP {member.vipTier}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  +{member.commissionEarned}৳ {language === 'bn' ? 'কমিশন' : 'comm.'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
