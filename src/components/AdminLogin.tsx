import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  Loader2, 
  Terminal, 
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    setAppMode, 
    adminLogin 
  } = useApp();

  const [username, setUsername] = useState('admin@primebd.net');
  const [password, setPassword] = useState('primeadmin2026');
  const [pin, setPin] = useState('778899');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleQuickFill = () => {
    setUsername('admin@primebd.net');
    setPassword('primeadmin2026');
    setPin('778899');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      adminLogin(username, password, pin);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-600/10 via-amber-600/10 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Controls */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 z-10 text-xs">
        <button
          onClick={() => setAppMode('user')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'ইউজার মোডে ফিরুন' : 'Back to Member App'}</span>
        </button>

        <button
          onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{language === 'bn' ? 'বাংলা' : 'EN'}</span>
        </button>
      </div>

      {/* Admin Gateway Card */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-rose-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/30 relative z-10 space-y-5">
        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-600 to-emerald-500 p-0.5 mx-auto shadow-lg shadow-rose-600/30">
            <div className="w-full h-full bg-[#0a0f18] rounded-[14px] flex items-center justify-center text-white font-black text-2xl">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-950/80 text-rose-400 border border-rose-800/80 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              RESTRICTED CONSOLE
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Prime<span className="text-emerald-400">BD</span> Master Admin
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'bn'
                ? 'অনলাইন আর্নিং প্ল্যাটফর্ম কেন্দ্রীয় প্রশাসন লগইন'
                : 'Centralized administration & payment audit gateway'}
            </p>
          </div>
        </div>

        {/* Quick Fill Credentials Banner */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-200 block">
              {language === 'bn' ? 'ডেমো অ্যাডমিন অ্যাক্সেস' : 'Demo Master Access'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              admin@primebd.net / 778899
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickFill}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1 shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'bn' ? 'অটো-ফিল' : 'Auto Fill'}</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          {/* Admin Username / Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {language === 'bn' ? 'অ্যাডমিনিস্ট্রেটর আইডি / ইমেইল' : 'Administrator ID / Email'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@primebd.net"
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white font-mono"
                required
              />
            </div>
          </div>

          {/* Master Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {language === 'bn' ? 'মাস্টার পাসওয়ার্ড' : 'Security Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Master Security Key / 2FA PIN */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                {language === 'bn' ? 'মাস্টার সিকিউরিটি পিন (6-Digit)' : 'Master Security Key / PIN'}
              </label>
              <span className="text-[10px] text-amber-400 font-mono">PIN: 778899</span>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="778899"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white font-mono tracking-widest"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 hover:from-rose-500 hover:to-emerald-500 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-950/60 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] disabled:opacity-70"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{language === 'bn' ? 'কী যাচাই করা হচ্ছে...' : 'Verifying Credentials...'}</span>
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4" />
                <span>{language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন' : 'Authenticate & Open Control Center'}</span>
              </>
            )}
          </button>
        </form>

        {/* Audit Log Stamp */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            256-Bit SSL Root Authenticated
          </span>
          <span className="font-mono text-slate-600">v3.2.0</span>
        </div>
      </div>
    </div>
  );
};
