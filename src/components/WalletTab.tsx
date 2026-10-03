import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { TransactionType } from '../types';
import { 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Receipt,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const WalletTab: React.FC = () => {
  const {
    language,
    user,
    transactions,
    setDepositModalOpen,
    setWithdrawModalOpen,
    withdrawRequests,
    depositRequests
  } = useApp();

  const t = translations[language];

  const [filterType, setFilterType] = useState<string>('all');

  const pendingWithdrawAmount = withdrawRequests
    .filter(w => w.status === 'pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const filteredTransactions = transactions.filter(tx => {
    if (filterType === 'all') return true;
    if (filterType === 'deposit') return tx.type === 'deposit';
    if (filterType === 'withdraw') return tx.type === 'withdraw';
    if (filterType === 'task') return tx.type === 'task_reward';
    if (filterType === 'server') return tx.type === 'server_income' || tx.type === 'server_rent';
    if (filterType === 'commission') return tx.type === 'referral_bonus' || tx.type === 'salary_bonus';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Wallet Balance Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-[#101826] to-[#0c121c] border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.walletTitle}
            </span>
          </div>

          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            BDT WALLET
          </span>
        </div>

        <div className="my-3">
          <span className="text-xs text-slate-400 block font-medium">
            {t.availableBalance}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">৳</span>
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {user.balance.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1">BDT</span>
          </div>
        </div>

        {/* Deposit and Withdraw CTA buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={() => setDepositModalOpen(true)}
            className="py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-950 flex items-center justify-center gap-2 transition-all"
          >
            <ArrowDownCircle className="w-4 h-4" />
            {t.recharge}
          </button>
          <button
            onClick={() => setWithdrawModalOpen(true)}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <ArrowUpCircle className="w-4 h-4 text-amber-400" />
            {t.cashout}
          </button>
        </div>

        {/* Financial Metrics Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-medium truncate">
              {language === 'bn' ? 'মোট জমা' : 'Deposited'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-cyan-400">
              ৳{user.totalDeposited}
            </span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-medium truncate">
              {language === 'bn' ? 'মোট উত্তোলন' : 'Withdrawn'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-amber-400">
              ৳{user.totalWithdrawn}
            </span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-medium truncate">
              {language === 'bn' ? 'প্রক্রিয়াধীন' : 'In Pending'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-rose-400">
              ৳{pendingWithdrawAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Supported Bangladeshi Gateways Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-300">
          {language === 'bn' ? 'সমর্থিত পেমেন্ট মেথড:' : 'Supported MFS Gateways:'}
        </span>
        <div className="flex items-center gap-2 font-bold text-[11px]">
          <span className="px-2 py-0.5 rounded bg-pink-950/80 text-pink-400 border border-pink-900">bKash বিকাশ</span>
          <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-900">Nagad নগদ</span>
          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-400 border border-purple-900">Rocket</span>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-400" />
            {t.recentTransactions}
          </h3>
          <span className="text-xs text-slate-400">
            {filteredTransactions.length} {language === 'bn' ? 'টি রেকর্ড' : 'records'}
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: t.allTx },
            { id: 'deposit', label: t.depositTx },
            { id: 'withdraw', label: t.withdrawTx },
            { id: 'task', label: t.task },
            { id: 'server', label: t.server },
            { id: 'commission', label: t.teamCommission },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setFilterType(flt.id)}
              className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-all ${
                filterType === flt.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-800/80">
          {filteredTransactions.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              {language === 'bn' ? 'কোন লেনদেন পাওয়া যায়নি!' : 'No transactions recorded yet.'}
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isPositive = tx.type === 'task_reward' || tx.type === 'deposit' || tx.type === 'server_income' || tx.type === 'referral_bonus' || tx.type === 'salary_bonus';
              const isPending = tx.status === 'pending';

              return (
                <div key={tx.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isPositive 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {isPositive ? <ArrowDownCircle className="w-4 h-4" /> : <ArrowUpCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm line-clamp-1">
                        {language === 'bn' ? tx.titleBn : tx.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{tx.timestamp}</span>
                        {tx.reference && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-400">{tx.reference}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-extrabold text-sm ${
                      isPositive ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                      {isPositive ? '+' : '-'}৳{tx.amount}
                    </span>
                    <span className="block text-[10px]">
                      {isPending ? (
                        <span className="text-amber-400 font-semibold flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          {language === 'bn' ? 'প্রক্রিয়াধীন' : 'Pending'}
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          {language === 'bn' ? 'সম্পন্ন' : 'Completed'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
