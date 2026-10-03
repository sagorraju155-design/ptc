import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { LIVE_PAYOUT_RECORDS } from '../data/mockData';
import { Volume2, CheckCircle2 } from 'lucide-react';

export const MarqueeNotice: React.FC = () => {
  const { language, systemNotice } = useApp();
  const t = translations[language];

  const currentNotice = language === 'bn' ? systemNotice.textBn : systemNotice.textEn;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300">
      {/* Official Notice Ticker */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-1.5 flex items-center gap-2 overflow-hidden">
        <div className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded text-[11px] shrink-0">
          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.noticeLabel}</span>
        </div>

        <div className="relative overflow-hidden whitespace-nowrap flex-1">
          <div className="animate-marquee inline-block text-slate-200">
            <span className="mx-4">{currentNotice}</span>
            <span className="mx-4 text-emerald-400 font-medium">★ {language === 'bn' ? 'সরাসরি bKash, Nagad ও Rocket ক্যাশআউট সাপোর্ট' : 'Direct bKash, Nagad & Rocket cashout supported'} ★</span>
            <span className="mx-4 text-cyan-400 font-medium">★ {language === 'bn' ? 'প্রতিদিন ১০ মিনিট কাজ করে ঘরে বসেই ইনকাম' : 'Work 10 mins daily from home to earn BDT'} ★</span>
          </div>
        </div>
      </div>

      {/* Live Payment Stream Ticker (Mini Bar) */}
      <div className="bg-slate-950/80 border-t border-slate-800/60 py-1 px-3 overflow-x-auto no-scrollbar flex items-center gap-4 text-[11px] text-slate-400">
        <span className="shrink-0 flex items-center gap-1 text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          {t.liveWithdrawals}:
        </span>
        <div className="flex items-center gap-5 shrink-0">
          {LIVE_PAYOUT_RECORDS.map((item) => (
            <div key={item.id} className="flex items-center gap-1.5 shrink-0 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800/80">
              <span className="text-slate-300 font-medium">{item.phone}</span>
              <span className="text-slate-400 text-[10px]">{language === 'bn' ? 'উত্তোলন' : 'withdrew'}</span>
              <span className="font-bold text-emerald-400">৳{item.amount}</span>
              <span className={`text-[10px] uppercase font-bold px-1 rounded ${
                item.method === 'bkash' 
                  ? 'bg-pink-950/70 text-pink-400 border border-pink-900/60' 
                  : item.method === 'nagad' 
                  ? 'bg-amber-950/70 text-amber-400 border border-amber-900/60'
                  : 'bg-purple-950/70 text-purple-400 border border-purple-900/60'
              }`}>
                {item.method}
              </span>
              <span className="text-[10px] text-slate-500">({item.timeAgo})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
