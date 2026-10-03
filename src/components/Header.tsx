import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { 
  Zap, 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  ShieldCheck, 
  Settings, 
  Globe,
  Plus
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    user, 
    setDepositModalOpen, 
    setWithdrawModalOpen, 
    setIsAdminOpen,
    addFastBalance,
    setAppMode,
    isLoggedIn,
    setAuthModalOpen
  } = useApp();

  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#121721]/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-xl tracking-tight">
            P
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center">
                Prime<span className="text-emerald-400">BD</span>
                <span className="text-xs text-slate-400 font-medium ml-1">.net</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <ShieldCheck className="w-3 h-3" />
                VERIFIED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden xs:block">
              {language === 'bn' ? 'অফিসিয়াল আর্নিং নেটওয়ার্ক' : 'Official Earning Network'}
            </p>
          </div>
        </div>

        {/* Balance & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Balance Card */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <span className="font-bold text-sm">৳</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                {t.balance}
              </span>
              <span className="font-bold text-emerald-400 text-sm sm:text-base leading-none">
                ৳ {user.balance.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {/* Quick add test cash */}
            <button
              onClick={() => addFastBalance(500)}
              title={language === 'bn' ? 'টেস্ট ব্যালেন্স +৫০০৳' : 'Quick add +৳500'}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 p-1 rounded-md transition-colors ml-0.5"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Deposit & Withdraw Buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setDepositModalOpen(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all shadow-emerald-900/30"
            >
              <ArrowDownCircle className="w-3.5 h-3.5" />
              {t.depositBtn}
            </button>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all"
            >
              <ArrowUpCircle className="w-3.5 h-3.5 text-amber-400" />
              {t.withdrawBtn}
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 font-medium transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'bn' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* User Auth Profile / Login Button */}
          {isLoggedIn ? (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors"
              title={language === 'bn' ? 'অ্যাকাউন্ট পরিবর্তন / লগইন' : 'Switch Account / Login'}
            >
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline font-semibold text-xs max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs shadow transition-colors"
            >
              {t.signIn}
            </button>
          )}

          {/* Dedicated Admin Portal Switcher */}
          <button
            onClick={() => setAppMode('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-rose-950/40 transition-all"
            title={language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Portal'}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
