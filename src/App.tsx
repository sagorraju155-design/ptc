import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MarqueeNotice } from './components/MarqueeNotice';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { TaskTab } from './components/TaskTab';
import { ServerTab } from './components/ServerTab';
import { WalletTab } from './components/WalletTab';
import { TeamTab } from './components/TeamTab';
import { ProfileTab } from './components/ProfileTab';
import { PaymentModals } from './components/PaymentModals';
import { TaskExecutionModal } from './components/TaskExecutionModal';
import { AdminPortal } from './components/AdminPortal';
import { AdminLogin } from './components/AdminLogin';
import { AdminModal } from './components/AdminModal';
import { AuthModal } from './components/AuthModal';
import { Bell, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, notification, appMode, isAdminLoggedIn } = useApp();

  // If in dedicated Admin Portal mode
  if (appMode === 'admin') {
    return (
      <>
        {isAdminLoggedIn ? <AdminPortal /> : <AdminLogin />}
        <AuthModal />
        {notification && (
          <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-950/60 flex items-start gap-3 animate-slideIn">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xs font-semibold leading-relaxed">
              {notification}
            </div>
          </div>
        )}
      </>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'task': return <TaskTab />;
      case 'server': return <ServerTab />;
      case 'wallet': return <WalletTab />;
      case 'team': return <TeamTab />;
      case 'profile': return <ProfileTab />;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <Header />

      {/* Marquee & Live Notification Ticker */}
      <MarqueeNotice />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {renderActiveTab()}
      </main>

      {/* Interactive Modals */}
      <PaymentModals />
      <TaskExecutionModal />
      <AdminModal />
      <AuthModal />

      {/* Global Toast Alert Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-950/60 flex items-start gap-3 animate-slideIn">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xs font-semibold leading-relaxed">
            {notification}
          </div>
        </div>
      )}

      {/* Sticky Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
