import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Phone, 
  Lock, 
  User as UserIcon, 
  Sparkles, 
  ShieldCheck, 
  Gift, 
  Eye, 
  EyeOff, 
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    language,
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    switchUserAccount,
    setAppMode,
    allUsers
  } = useApp();

  const t = translations[language];

  // Login form state
  const [loginPhone, setLoginPhone] = useState('01712-345678');
  const [loginPin, setLoginPin] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regConfirmPin, setRegConfirmPin] = useState('');
  const [regRefCode, setRegRefCode] = useState('PRIME-7789');
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim()) {
      alert(language === 'bn' ? 'মোবাইল নম্বর লিখুন!' : 'Please enter your mobile number!');
      return;
    }
    login(loginPhone, loginPin);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regPin.trim()) {
      alert(language === 'bn' ? 'সকল প্রয়োজনীয় তথ্য পূরণ করুন!' : 'Please fill all required fields!');
      return;
    }
    if (regPin !== regConfirmPin) {
      alert(language === 'bn' ? 'দুই পাসওয়ার্ড মেলেনি!' : 'Passwords do not match!');
      return;
    }
    if (!agreedTerms) {
      alert(language === 'bn' ? 'নীতিমালা গ্রহণ করুন!' : 'Please accept terms!');
      return;
    }
    register(regName, regPhone, regPin, regRefCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative max-h-[95vh] flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 px-5 pt-5 pb-4 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-xl text-slate-950 shadow-lg shadow-emerald-500/20">
              P
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg tracking-tight flex items-center gap-1.5">
                Prime<span className="text-emerald-400">BD</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800/80">
                  {language === 'bn' ? 'সিকিউর লগইন' : 'Official Portal'}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {authMode === 'login' 
                  ? (language === 'bn' ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in to access your wallet & tasks')
                  : (language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন ও ৳৫০ বোনাস পান' : 'Create an account & receive ৳50 gift')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/70 p-1.5">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
              authMode === 'login'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.signIn}</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
              authMode === 'register'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t.signUp}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
              +৳50
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* SIGN IN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Phone Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.mobileNumber}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white font-mono"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.password}
                  </label>
                  <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer">
                    {t.forgotPassword}
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white"
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

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-600 focus:ring-0"
                  />
                  <span>{t.rememberMe}</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
              >
                <LogIn className="w-4 h-4" />
                {t.signIn}
              </button>

              {/* Switch to Register link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {t.dontHaveAccount}
                </button>
              </div>

              {/* Quick Demo Logins Box */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {t.demoAccountsTitle}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {allUsers.slice(0, 4).map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => switchUserAccount(u.id)}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 text-left transition-all"
                    >
                      <span className="font-bold text-white text-xs block truncate">
                        {u.name}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold block">
                        VIP {u.vipLevel} • ৳{u.balance}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Direct Admin Control Shortcut */}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalOpen(false);
                    setAppMode('admin');
                  }}
                  className="w-full py-2 bg-gradient-to-r from-rose-950/60 to-amber-950/60 hover:from-rose-900/60 hover:to-amber-900/60 border border-rose-900/50 text-rose-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'bn' ? 'অ্যাডমিন লগইন গেটওয়ে' : 'Admin Login Gateway'}
                </button>
              </div>
            </form>
          )}

          {/* SIGN UP / REGISTER FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Welcome Bonus Callout */}
              <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-300 block">
                    {t.welcomeBonusTitle}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {language === 'bn' ? 'অ্যাকাউন্ট খুললেই ৫০ টাকা ওয়েলকাম উপহার' : 'Receive instant ৳50 signup credit in your balance'}
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fullName}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder={t.enterFullName}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white"
                    required
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.mobileNumber}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white font-mono"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.password}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regConfirmPin}
                    onChange={(e) => setRegConfirmPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white"
                    required
                  />
                </div>
              </div>

              {/* Referral Code (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.referralCodeOptional}
                </label>
                <input
                  type="text"
                  value={regRefCode}
                  onChange={(e) => setRegRefCode(e.target.value)}
                  placeholder="PRIME-7789"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white font-mono uppercase tracking-wider"
                />
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-2 text-xs text-slate-400 pt-1">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded bg-slate-950 border-slate-800 text-emerald-600 focus:ring-0"
                />
                <span>
                  {language === 'bn' 
                    ? 'আমি Prime BD নিয়ম ও সেবার শর্তাবলী মেনে নিচ্ছি।' 
                    : 'I agree to the Prime BD Terms of Service and Privacy Policy.'}
                </span>
              </div>

              {/* Register CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4" />
                {language === 'bn' ? 'নিবন্ধন করুন ও ৳৫০ নিন' : 'Sign Up & Claim ৳50'}
              </button>

              {/* Switch to Login link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {t.alreadyHaveAccount}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-Bit SSL Encrypted
          </span>
          <span>PrimeBD v3.2</span>
        </div>
      </div>
    </div>
  );
};
