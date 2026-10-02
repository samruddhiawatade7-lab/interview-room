import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DsaProgress, AptitudeProgress, CsTopicProgress } from '../types';
import { Target, CheckCircle2, BookOpen, Plus, Sparkles } from 'lucide-react';

export const StudentPreparationPage: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'DSA' | 'APTITUDE' | 'CS'>('DSA');
  const [dsaList, setDsaList] = useState<DsaProgress[]>([]);
  const [aptitudeList, setAptitudeList] = useState<AptitudeProgress[]>([]);
  const [csList, setCsList] = useState<CsTopicProgress[]>([]);

  useEffect(() => {
    if (user) {
      fetchPreparationData();
    }
  }, [user]);

  const fetchPreparationData = async () => {
    try {
      const [dsaRes, aptRes, csRes] = await Promise.all([
        api.get(`/preparation/dsa/${user?.id}`).catch(() => ({ data: [] })),
        api.get(`/preparation/aptitude/${user?.id}`).catch(() => ({ data: [] })),
        api.get(`/preparation/cs/${user?.id}`).catch(() => ({ data: [] }))
      ]);
      setDsaList(dsaRes.data || []);
      setAptitudeList(aptRes.data || []);
      setCsList(csRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Placement Preparation Tracker</h1>
          <p className="text-slate-400 text-sm">
            Track your DSA topics, aptitude questions, and core CS fundamentals (DBMS, OS, CN, OOP, SQL).
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex space-x-3 mb-8">
          {[
            { id: 'DSA', label: 'DSA Topic Tracker' },
            { id: 'APTITUDE', label: 'Aptitude & Reasoning' },
            { id: 'CS', label: 'Core CS Fundamentals' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs transition-all ${
                tab === t.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* DSA TAB */}
        {tab === 'DSA' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dsaList.map((item) => {
                const pct = Math.round((item.solvedProblems / item.targetProblems) * 100);
                return (
                  <div key={item.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-white">{item.topic}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.revisionStatus === 'Mastered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {item.revisionStatus}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Target Progress</span>
                        <span className="text-indigo-400">{item.solvedProblems} / {item.targetProblems} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <span>Easy: <strong className="text-white">{item.easy}</strong></span>
                      <span>Medium: <strong className="text-white">{item.medium}</strong></span>
                      <span>Hard: <strong className="text-white">{item.hard}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* APTITUDE TAB */}
        {tab === 'APTITUDE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aptitudeList.map((item) => (
              <div key={item.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white mb-1">{item.category}</h3>
                  <div className="text-xs text-slate-400">
                    Attempted: <strong className="text-white">{item.totalAttempted}</strong> • Correct: <strong className="text-emerald-400">{item.correctCount}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-purple-400">{item.accuracyPercentage}%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Accuracy</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CORE CS TAB */}
        {tab === 'CS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {csList.map((item) => (
              <div key={item.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                    {item.subject}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">{item.topic}</h3>
                <p className="text-xs text-slate-400 italic">Notes: {item.notes}</p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
