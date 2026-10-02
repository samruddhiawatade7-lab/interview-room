import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ShieldAlert } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">User Reports & Moderation</h1>
        <p className="text-slate-400 text-sm mb-8">Review reported users, messages, or inappropriate content.</p>

        <div className="p-8 text-center text-xs text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
          No open reports currently pending moderation. System status is clear! ✓
        </div>
      </main>
    </div>
  );
};
