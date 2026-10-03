import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { ServerPackage } from '../types';
import { 
  Server, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Clock, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Calculator,
  ChevronRight,
  Flame
} from 'lucide-react';

export const ServerTab: React.FC = () => {
  const {
    language,
    serverPackages,
    activeServers,
    rentServerPackage,
    claimDailyServerIncome,
    user,
    setDepositModalOpen
  } = useApp();

  const t = translations[language];

  // Interactive ROI Calculator selection
  const [selectedCalcTier, setSelectedCalcTier] = useState<number>(2);
  const calcPackage = serverPackages.find(p => p.tier === selectedCalcTier) || serverPackages[2];

  return (
    <div className="space-y-5 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                CLOUD MINING &amp; YIELD
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" />
              {t.serverTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              {t.serverSubtitle}
            </p>
          </div>

          <div className="text-right shrink-0 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              {language === 'bn' ? 'আপনার লেভেল' : 'Your Tier'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400">
              VIP {user.vipLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Active Servers Manager */}
      {activeServers.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              {t.activeServers} ({activeServers.length})
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900/60">
              ● {language === 'bn' ? 'সার্ভার রানিং' : 'Running'}
            </span>
          </div>

          <div className="space-y-2.5">
            {activeServers.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">
                      {language === 'bn' ? srv.nameBn : srv.name}
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 font-semibold border border-indigo-900/60">
                      Tier {srv.tier}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                    <span>{t.dailyReturn}: <strong className="text-emerald-400">৳{srv.dailyIncome}</strong></span>
                    <span>•</span>
                    <span>{srv.daysRemaining} {language === 'bn' ? 'দিন বাকি' : 'days remaining'}</span>
                    <span>•</span>
                    <span className="text-slate-500">{language === 'bn' ? 'চালু:' : 'Active since:'} {srv.activatedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {srv.canClaimToday ? (
                    <button
                      onClick={() => claimDailyServerIncome(srv.id)}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {language === 'bn' ? `৳${srv.dailyIncome} আয় তুলুন` : `Claim ৳${srv.dailyIncome}`}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {t.alreadyClaimedToday}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Server ROI Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-sm sm:text-base">
            {language === 'bn' ? '📊 সার্ভার আয় ও মুনাফা ক্যালকুলেটর' : '📊 Server Profit & ROI Calculator'}
          </h3>
        </div>

        {/* Tier selection chips */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {serverPackages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedCalcTier(pkg.tier)}
              className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                selectedCalcTier === pkg.tier
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              VIP {pkg.tier}
              <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                ৳{pkg.price}
              </span>
            </button>
          ))}
        </div>

        {/* Calculator Breakdown Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">{language === 'bn' ? 'মূল্য' : 'Cost'}</span>
            <span className="text-base font-extrabold text-white">৳{calcPackage.price}</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">{t.dailyReturn}</span>
            <span className="text-base font-extrabold text-emerald-400">৳{calcPackage.dailyIncome}</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">{t.validity}</span>
            <span className="text-base font-extrabold text-cyan-400">{calcPackage.validityDays} {language === 'bn' ? 'দিন' : 'Days'}</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">{t.totalProfit}</span>
            <span className="text-base font-extrabold text-amber-400">৳{calcPackage.totalReturn}</span>
          </div>
        </div>
      </div>

      {/* Server Package Catalog */}
      <div className="space-y-3">
        <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-500" />
          {language === 'bn' ? 'সকল উপলব্ধ ক্লাউড সার্ভার প্যাকেজ' : 'All Available Cloud Server Packages'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {serverPackages.map((pkg: ServerPackage) => {
            const isCurrentlyActive = activeServers.some(s => s.packageId === pkg.id);
            const isAffordable = user.balance >= pkg.price;

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl border p-4 sm:p-5 relative flex flex-col justify-between transition-all ${
                  pkg.isPopular
                    ? 'bg-gradient-to-b from-cyan-950/30 to-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    ★ MOST POPULAR ★
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-white text-base">
                        {language === 'bn' ? pkg.nameBn : pkg.name}
                      </h4>
                      <span className="text-xs text-slate-400">
                        Tier {pkg.tier} Cloud Instance
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-amber-400">
                        ৳{pkg.price}
                      </span>
                      <span className="text-[10px] text-slate-400 block -mt-0.5">
                        {language === 'bn' ? 'রেন্টাল ফি' : 'One-time cost'}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 my-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">{t.dailyReturn}:</span>
                      <span className="font-extrabold text-emerald-400 text-sm">৳{pkg.dailyIncome} / {language === 'bn' ? 'দিন' : 'day'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">{t.totalProfit}:</span>
                      <span className="font-extrabold text-white text-sm">৳{pkg.totalReturn}</span>
                    </div>
                  </div>

                  {/* Feature bullet list */}
                  <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                    {(language === 'bn' ? pkg.featuresBn : pkg.features).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <div className="pt-2 border-t border-slate-800">
                  {pkg.tier === 0 ? (
                    <button
                      disabled
                      className="w-full py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl cursor-default"
                    >
                      {language === 'bn' ? 'ফ্রি প্যাকেজ চালু আছে' : 'Free Tier Active'}
                    </button>
                  ) : isCurrentlyActive ? (
                    <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-xl text-xs">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {language === 'bn' ? 'বর্তমানে চালু রয়েছে' : 'Already Active'}
                      </span>
                      <button
                        onClick={() => rentServerPackage(pkg)}
                        className="text-xs text-cyan-400 font-bold hover:underline"
                      >
                        {language === 'bn' ? '+আরেকটি কিনুন' : '+Add Another'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => rentServerPackage(pkg)}
                      className={`w-full py-2.5 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all ${
                        isAffordable
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950'
                          : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isAffordable
                        ? `${t.rentNow} (৳${pkg.price})`
                        : `${language === 'bn' ? 'ডিপোজিট করে চালু করুন' : 'Deposit & Activate'} (৳${pkg.price})`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
