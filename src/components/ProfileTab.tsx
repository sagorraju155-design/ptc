import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { FAQS } from '../data/mockData';
import { 
  User as UserIcon, 
  ShieldCheck, 
  Send, 
  Phone, 
  Download, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  Lock,
  CheckCircle2,
  LogOut,
  UserCheck
} from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const {
    language,
    user,
    resetAllData,
    showNotification,
    logout,
    setAuthModalOpen
  } = useApp();

  const t = translations[language];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* User Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-2xl text-emerald-400">
              {user.name.charAt(0)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-white text-base sm:text-lg">
                {user.name}
              </h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t.verified}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {user.phone}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
              <span>{user.vipName}</span>
              <span>•</span>
              <span>{language === 'bn' ? 'যুক্ত হয়েছেন:' : 'Member since:'} {user.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Community & Helpline Links */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
        <h3 className="font-bold text-white text-sm">
          {t.helpdesk}
        </h3>

        <div className="space-y-2">
          {/* Telegram Channel */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              showNotification(language === 'bn' ? 'অফিসিয়াল টেলিগ্রাম: https://t.me/primebd_official' : 'Official Telegram: https://t.me/primebd_official');
            }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/40 transition-all text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">
                  {t.joinTelegram}
                </span>
                <span className="text-[10px] text-slate-400">
                  {language === 'bn' ? 'ডেইলি পেমেন্ট প্রুফ ও প্রমো কোড আপডেট' : 'Daily payment proofs & announcements'}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          {/* WhatsApp Support */}
          <div
            onClick={() => showNotification(language === 'bn' ? 'হোয়াটসঅ্যাপ হেল্পলাইন: +880 1712-345678' : 'WhatsApp Support: +880 1712-345678')}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/40 cursor-pointer transition-all text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">
                  {t.whatsappHelp}
                </span>
                <span className="text-[10px] text-slate-400">
                  {language === 'bn' ? 'সকাল ১০টা - রাত ১০টা পর্যন্ত কাস্টমার কেয়ার' : '10:00 AM - 10:00 PM Customer Service'}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
              ONLINE
            </span>
          </div>

          {/* Android APK Download */}
          <div
            onClick={() => showNotification(language === 'bn' ? 'PrimeBD v3.2 APK ডাউনলোড হচ্ছে...' : 'PrimeBD v3.2 APK downloading...')}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/40 cursor-pointer transition-all text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">
                  {language === 'bn' ? 'Prime BD অ্যান্ড্রয়েড অ্যাপ ডাউনলোড' : 'Download Prime BD Android App'}
                </span>
                <span className="text-[10px] text-slate-400">
                  Version 3.2 • 8.4 MB (APK)
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-900">
              DOWNLOAD
            </span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          {t.faqs}
        </h3>

        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <span>{language === 'bn' ? faq.qBn : faq.qEn}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2 bg-slate-950/40">
                    {language === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Actions (Switch Account & Logout) */}
      <div className="pt-2 grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setAuthModalOpen(true)}
          className="py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          {t.switchAccount}
        </button>

        <button
          onClick={logout}
          className="py-2.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-900/50 text-rose-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          {t.logout}
        </button>
      </div>

      {/* Reset Demo Data Button */}
      <div className="pt-1">
        <button
          onClick={resetAllData}
          className="w-full py-2.5 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 text-slate-400 hover:text-rose-400 text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t.resetDemo}
        </button>
      </div>
    </div>
  );
};
