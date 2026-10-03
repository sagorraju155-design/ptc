import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Loader2, 
  Sparkles, 
  ShieldCheck,
  Youtube,
  Facebook,
  Send,
  Star,
  Globe,
  FileQuestion
} from 'lucide-react';

export const TaskExecutionModal: React.FC = () => {
  const { 
    language, 
    selectedTaskForExecution, 
    setSelectedTaskForExecution, 
    completeTask 
  } = useApp();

  const t = translations[language];
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15);
  const [step, setStep] = useState<'start' | 'in_progress' | 'verifying' | 'completed'>('start');

  useEffect(() => {
    if (selectedTaskForExecution) {
      setSecondsRemaining(selectedTaskForExecution.durationSeconds || 15);
      setStep('start');
    }
  }, [selectedTaskForExecution]);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'in_progress' && secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (step === 'in_progress' && secondsRemaining === 0) {
      // Auto move to verification
      setStep('verifying');
      const verifyTimer = setTimeout(() => {
        setStep('completed');
      }, 2000);
      return () => clearTimeout(verifyTimer);
    }
    return () => clearTimeout(timer);
  }, [step, secondsRemaining]);

  if (!selectedTaskForExecution) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'youtube': return <Youtube className="w-6 h-6 text-red-400" />;
      case 'facebook': return <Facebook className="w-6 h-6 text-blue-400" />;
      case 'telegram': return <Send className="w-6 h-6 text-sky-400" />;
      case 'review': return <Star className="w-6 h-6 text-amber-400" />;
      case 'web': return <Globe className="w-6 h-6 text-emerald-400" />;
      default: return <FileQuestion className="w-6 h-6 text-purple-400" />;
    }
  };

  const handleStartTask = () => {
    setStep('in_progress');
  };

  const handleClaimReward = () => {
    completeTask(selectedTaskForExecution.id);
    setSelectedTaskForExecution(null);
  };

  const handleFastPass = () => {
    setSecondsRemaining(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
              {getCategoryIcon(selectedTaskForExecution.category)}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                {language === 'bn' ? selectedTaskForExecution.titleBn : selectedTaskForExecution.title}
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {language === 'bn' ? 'রিওয়ার্ড:' : 'Reward:'} ৳{selectedTaskForExecution.reward} BDT
              </span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedTaskForExecution(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <p className="font-medium text-slate-200 mb-1">
              {language === 'bn' ? 'টাস্ক নির্দেশনা:' : 'Task Instructions:'}
            </p>
            <p>
              {language === 'bn' ? selectedTaskForExecution.descriptionBn : selectedTaskForExecution.description}
            </p>
          </div>

          {/* Flow States */}
          {step === 'start' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto text-2xl font-bold">
                ৳{selectedTaskForExecution.reward}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {language === 'bn' ? 'টাস্ক সম্পন্ন করতে নিচের বাটনে চাপ দিন' : 'Click the button below to start the task'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'bn' 
                    ? `ভিডিও/পেজে সর্বনিম্ন ${selectedTaskForExecution.durationSeconds} সেকেন্ড অবস্থান করতে হবে।`
                    : `Must stay on target page for at least ${selectedTaskForExecution.durationSeconds} seconds.`}
                </p>
              </div>

              <button
                onClick={handleStartTask}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {language === 'bn' ? 'কাজ শুরু করুন এবং পেজ খুলুন' : 'Open Target & Start Countdown'}
              </button>
            </div>
          )}

          {step === 'in_progress' && (
            <div className="text-center py-4 space-y-4">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin" />
                <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 text-emerald-400 mb-0.5" />
                  <span className="text-2xl font-extrabold text-white">{secondsRemaining}s</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {t.taskTimer}: {secondsRemaining} {language === 'bn' ? 'সেকেন্ড বাকি' : 'seconds remaining'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'bn' 
                    ? 'পৃষ্ঠাটি বন্ধ করবেন না, সময় শেষ হলে স্বয়ংক্রিয়ভাবে ভেরিফাই হবে।'
                    : 'Do not close this page. Automatic verification will trigger.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleFastPass}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  ⚡ {language === 'bn' ? 'ডেমো ফাস্ট ভেরিফাই (স্কিপ)' : 'Fast Demo Verify (Skip wait)'}
                </button>
              </div>
            </div>
          )}

          {step === 'verifying' && (
            <div className="text-center py-6 space-y-3">
              <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-white">{t.taskVerifying}</p>
              <p className="text-xs text-slate-400">
                {language === 'bn' ? 'সিস্টেম লগ এবং স্পনসর সার্ভার চেক করা হচ্ছে...' : 'Checking sponsor proof & engagement logs...'}
              </p>
            </div>
          )}

          {step === 'completed' && (
            <div className="text-center py-4 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {language === 'bn' ? 'টাস্ক সফলভাবে সম্পন্ন!' : 'Task Completed Successfully!'}
                </h4>
                <p className="text-xs text-emerald-400 mt-1 font-medium">
                  {t.taskCongrat}
                </p>
              </div>

              <button
                onClick={handleClaimReward}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                {t.claimReward}: ৳{selectedTaskForExecution.reward} BDT
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-5 py-2.5 bg-slate-950/80 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            PrimeBD Anti-Fraud Engine
          </span>
          <span>VIP Level {selectedTaskForExecution.requiredVip} Required</span>
        </div>
      </div>
    </div>
  );
};
