import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Check, 
  Clock, 
  Plus, 
  Settings, 
  Users, 
  Wallet, 
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    depositRequests,
    withdrawRequests,
    approveDeposit,
    approveWithdraw,
    addFastBalance,
    user,
    teamMembers,
    language
  } = useApp();

  if (!isAdminOpen) return null;

  const pendingDeposits = depositRequests.filter(d => d.status === 'pending');
  const pendingWithdraws = withdrawRequests.filter(w => w.status === 'pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Prime BD Admin Simulation Control
              </h3>
              <p className="text-[11px] text-slate-400">
                Manage deposit approvals, payout queue, and demo testing states
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Quick Balance & VIP injection */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-emerald-400" />
              Quick Test Balance Injections
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => addFastBalance(1000)}
                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +৳1,000 BDT
              </button>
              <button
                onClick={() => addFastBalance(5000)}
                className="px-3 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +৳5,000 BDT
              </button>
              <button
                onClick={() => addFastBalance(25000)}
                className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/40 text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +৳25,000 BDT
              </button>
            </div>
          </div>

          {/* Pending Withdrawals Queue */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Pending Cashout Approvals ({pendingWithdraws.length})
              </h4>
            </div>

            {pendingWithdraws.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">
                No pending withdrawals in queue. Test by submitting a withdrawal from the Wallet tab!
              </p>
            ) : (
              <div className="space-y-2">
                {pendingWithdraws.map((w) => (
                  <div
                    key={w.id}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white uppercase text-xs">
                          {w.method}
                        </span>
                        <span className="font-mono text-slate-300">{w.recipientNumber}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {w.createdAt} • Net: ৳{w.netAmount} (Fee: ৳{w.fee})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-400 text-sm">৳{w.amount}</span>
                      <button
                        onClick={() => approveWithdraw(w.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve &amp; Pay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Deposits Queue */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Recent Deposits Log ({depositRequests.length})
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {depositRequests.map((d) => (
                <div
                  key={d.id}
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white uppercase mr-2">{d.method}</span>
                    <span className="font-mono text-slate-400">{d.senderNumber}</span>
                    <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">
                      TrxID: {d.trxId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">৳{d.amount}</span>
                    <span className="text-[10px] block text-emerald-500 capitalize">
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 text-right">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Close Admin View
          </button>
        </div>
      </div>
    </div>
  );
};
