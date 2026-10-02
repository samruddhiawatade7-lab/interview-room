import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { InterviewExperience, Resource } from '../types';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';

export const AdminContentModerationPage: React.FC = () => {
  const [pendingExps, setPendingExps] = useState<InterviewExperience[]>([]);
  const [pendingRes, setPendingRes] = useState<Resource[]>([]);

  useEffect(() => {
    fetchPendingContent();
  }, []);

  const fetchPendingContent = async () => {
    try {
      const [expRes, resRes] = await Promise.all([
        api.get('/interviews/experiences/pending').catch(() => ({ data: [] })),
        api.get('/resources/pending').catch(() => ({ data: [] }))
      ]);
      setPendingExps(expRes.data || []);
      setPendingRes(resRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveExp = async (id: number) => {
    try {
      await api.put(`/interviews/experiences/${id}/approve`);
      fetchPendingContent();
    } catch (err) { console.error(err); }
  };

  const handleRejectExp = async (id: number) => {
    try {
      await api.put(`/interviews/experiences/${id}/reject`);
      fetchPendingContent();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Content Moderation Queue</h1>
        <p className="text-slate-400 text-sm mb-8">Approve or reject user-submitted interview experiences and placement resources.</p>

        <div className="space-y-6">
          <h3 className="font-bold text-lg text-white">Pending Interview Experiences ({pendingExps.length})</h3>
          {pendingExps.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
              No pending interview experiences requiring approval.
            </div>
          ) : (
            pendingExps.map(exp => (
              <div key={exp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between font-bold text-base text-white">
                  <span>{exp.company} - {exp.role}</span>
                  <span className="text-xs text-indigo-400">By {exp.authorName}</span>
                </div>
                <div className="text-xs text-slate-300"><strong>OA:</strong> {exp.oaTopics}</div>
                <div className="flex space-x-2 pt-2">
                  <button onClick={() => handleApproveExp(exp.id)} className="px-4 py-2 rounded-xl bg-emerald-600 font-bold text-xs">Approve</button>
                  <button onClick={() => handleRejectExp(exp.id)} className="px-4 py-2 rounded-xl bg-slate-800 text-rose-400 font-bold text-xs">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
