import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Users, CheckCircle2, Shield, Award, BookOpen, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const userGrowthData = [
    { month: 'May', students: 120, seniors: 35 },
    { month: 'Jun', students: 280, seniors: 65 },
    { month: 'Jul', students: 450, seniors: 90 },
    { month: 'Aug', students: 780, seniors: 140 },
    { month: 'Sep', students: 1250, seniors: 210 },
  ];

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        
        {/* Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-indigo-900/40 border border-emerald-500/30 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Platform Control Center</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">SeniorConnect System Analytics</h1>
              <p className="text-sm text-slate-300 mt-1">Platform management, senior verification & moderation</p>
            </div>

            <Link
              to="/admin/users"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Seniors</span>
            </Link>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Registered Students</div>
            <div className="text-3xl font-extrabold text-white">1,250+</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Verified Senior Mentors</div>
            <div className="text-3xl font-extrabold text-emerald-400">210</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Interview Experiences</div>
            <div className="text-3xl font-extrabold text-purple-400">320</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Placement Resources</div>
            <div className="text-3xl font-extrabold text-indigo-400">480</div>
          </div>
        </div>

        {/* CHART */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">User Growth Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="students" fill="#6366f1" radius={[8, 8, 0, 0]} name="Students" />
                <Bar dataKey="seniors" fill="#10b981" radius={[8, 8, 0, 0]} name="Seniors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>
    </div>
  );
};
