import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { OFFICIAL_PAYMENT_ACCOUNTS } from '../data/mockData';
import { PaymentMethod } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Info,
  Sparkles
} from 'lucide-react';

export const PaymentModals: React.FC = () => {
  const {
    language,
    user,
    depositModalOpen,
    setDepositModalOpen,
    withdrawModalOpen,
    setWithdrawModalOpen,
    submitDeposit,
    submitWithdraw,
    officialAccounts
  } = useApp();

  const t = translations[language];

  // Deposit Form State
  const [depositMethod, setDepositMethod] = useState<PaymentMethod>('bkash');
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [senderNumber, setSenderNumber] = useState<string>('01712-345678');
  const [trxId, setTrxId] = useState<string>('');
  const [depositCopied, setDepositCopied] = useState<boolean>(false);

  // Withdraw Form State
  const [withdrawMethod, setWithdrawMethod] = useState<PaymentMethod>('bkash');
  const [withdrawAmount, setWithdrawAmount] = useState<number>(500);
  const [recipientNumber, setRecipientNumber] = useState<string>('01712-345678');

  const currentOfficialAccount = officialAccounts[depositMethod as 'bkash' | 'nagad' | 'rocket'] || officialAccounts.bkash;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentOfficialAccount.number.replace(/-/g, ''));
    setDepositCopied(true);
    setTimeout(() => setDepositCopied(false), 2500);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) {
      alert(language === 'bn' ? 'দয়া করে ট্রানজেকশন আইডি (TrxID) লিখুন!' : 'Please enter the TrxID!');
      return;
    }
    submitDeposit(depositMethod, depositAmount, senderNumber, trxId);
    setTrxId('');
    setDepositModalOpen(false);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitWithdraw(withdrawMethod, withdrawAmount, recipientNumber);
    if (res.success) {
      setWithdrawModalOpen(false);
    }
  };

  const withdrawFee = Math.round(withdrawAmount * 0.02);
  const netAmount = Math.max(0, withdrawAmount - withdrawFee);

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <>
      {/* DEPOSIT MODAL */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ArrowDownCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {language === 'bn' ? 'টাকা ডিপোজিট / রিচার্জ' : 'Deposit Funds'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'bn' ? 'বিকাশ, নগদ অথবা রকেটের মাধ্যমে ইনস্ট্যান্ট রিচার্জ' : 'Instant deposit via bKash, Nagad or Rocket'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setDepositModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleDepositSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.selectMethod}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDepositMethod('bkash')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      depositMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-950/40 text-pink-300 shadow-md shadow-pink-950/50'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#e2136e]">bKash</span>
                    <span className="text-[10px] text-slate-300">{language === 'bn' ? 'বিকাশ' : 'Personal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDepositMethod('nagad')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      depositMethod === 'nagad'
                        ? 'border-amber-500 bg-amber-950/40 text-amber-300 shadow-md shadow-amber-950/50'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#f7941d]">Nagad</span>
                    <span className="text-[10px] text-slate-300">{language === 'bn' ? 'নগদ' : 'Uddokta'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDepositMethod('rocket')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      depositMethod === 'rocket'
                        ? 'border-purple-500 bg-purple-950/40 text-purple-300 shadow-md shadow-purple-950/50'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#8c3494]">Rocket</span>
                    <span className="text-[10px] text-slate-300">{language === 'bn' ? 'রকেট' : 'DBBL'}</span>
                  </button>
                </div>
              </div>

              {/* Official Account Box */}
              <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{t.sendMoneyTo}</span>
                  <span className="text-emerald-400 font-semibold text-[10px] uppercase">
                    {language === 'bn' ? currentOfficialAccount.typeBn : currentOfficialAccount.type}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-700/80 px-3 py-2 rounded-lg">
                  <span className="font-mono text-base font-bold text-white tracking-wider">
                    {currentOfficialAccount.number}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded transition-colors"
                  >
                    {depositCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyNumber}</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {language === 'bn' 
                    ? `⚠️ এই নম্বরে আপনার ${depositMethod === 'bkash' ? 'বিকাশ' : depositMethod === 'nagad' ? 'নগদ' : 'রকেট'} থেকে টাকা পাঠিয়ে ট্রানজেকশন আইডি (TrxID) কপি করে নিচে বসান।`
                    : `⚠️ Send money from your wallet to the above number, then input the TrxID below.`}
                </p>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.amount}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {quickAmounts.map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDepositAmount(val)}
                      className={`px-3 py-1 text-xs rounded-lg font-semibold border transition-all ${
                        depositAmount === val
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      ৳{val}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="300"
                  max="50000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  placeholder="৫০০"
                  required
                />
              </div>

              {/* Sender Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.enterSenderNumber}
                </label>
                <input
                  type="text"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="017xxxxxxxx"
                  required
                />
              </div>

              {/* TrxID Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.enterTrxId}
                  </label>
                  <button
                    type="button"
                    onClick={() => setTrxId('TRX' + Math.random().toString(36).substring(2, 9).toUpperCase())}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    {language === 'bn' ? 'স্যাম্পল TrxID দিন' : 'Generate Demo TrxID'}
                  </button>
                </div>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-emerald-500 tracking-wider"
                  placeholder="e.g. 9JH76W3Q / NG88741B"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {t.submitDeposit} (৳{depositAmount})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <ArrowUpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {language === 'bn' ? 'টাকা ক্যাশআউট / উত্তোলন' : 'Withdraw Funds'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'bn' ? 'সরাসরি আপনার পার্সোনাল বিকাশ বা নগদে টাকা পান' : 'Receive instant funds to bKash or Nagad'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setWithdrawModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleWithdrawSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Balance Banner */}
              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                    {t.availableBalance}
                  </span>
                  <span className="font-extrabold text-emerald-400 text-lg">
                    ৳ {user.balance.toLocaleString('en-BD', { minimumFractionDigits: 2 })} BDT
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>{t.minAmount}: ৳300</span>
                  <span className="block">{t.maxAmount}: ৳25,000</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.selectMethod}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('bkash')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      withdrawMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-950/40 text-pink-300 shadow-md shadow-pink-950/50'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#e2136e]">bKash</span>
                    <span className="text-[10px] text-slate-300">{language === 'bn' ? 'বিকাশ' : 'Personal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('nagad')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      withdrawMethod === 'nagad'
                        ? 'border-amber-500 bg-amber-950/40 text-amber-300 shadow-md shadow-amber-950/50'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#f7941d]">Nagad</span>
                    <span className="text-[10px] text-slate-300">{language === 'bn' ? 'নগদ' : 'Personal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('rocket')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      withdrawMethod === 'rocket'
                        ? 'border-purple-500 bg-purple-950/40 text-purple-300 shadow-md shadow-purple-950/50'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#8c3494]">Rocket</span>
                    <span className="text-[10px] text-slate-300">{language === 'bn' ? 'রকেট' : 'Personal'}</span>
                  </button>
                </div>
              </div>

              {/* Recipient Account Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.enterWithdrawNumber}
                </label>
                <input
                  type="text"
                  value={recipientNumber}
                  onChange={(e) => setRecipientNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  placeholder="017xxxxxxxx"
                  required
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.amount}
                </label>
                <input
                  type="number"
                  min="300"
                  max="25000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-semibold"
                  placeholder="৳৫০০"
                  required
                />
              </div>

              {/* Fee Breakdown Card */}
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>{language === 'bn' ? 'রিকোয়েস্ট অ্যামাউন্ট' : 'Requested Amount'}:</span>
                  <span className="text-white font-semibold">৳{withdrawAmount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t.withdrawFee}:</span>
                  <span className="text-rose-400 font-semibold">- ৳{withdrawFee}</span>
                </div>
                <div className="border-t border-slate-800 pt-1.5 flex justify-between text-slate-200 font-bold">
                  <span className="text-emerald-400">{t.netReceive}:</span>
                  <span className="text-emerald-400 font-extrabold text-sm">৳{netAmount} BDT</span>
                </div>
              </div>

              {/* Processing Info */}
              <div className="flex items-start gap-2 bg-amber-950/20 border border-amber-900/40 p-2.5 rounded-xl text-[11px] text-amber-300/90 leading-relaxed">
                <Clock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <p>{t.withdrawNote}</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <ArrowUpCircle className="w-4 h-4" />
                {t.submitWithdraw} (৳{netAmount})
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
