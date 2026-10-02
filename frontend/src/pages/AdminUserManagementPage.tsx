import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { SeniorProfile } from '../types';
import { CheckCircle2, XCircle, Shield, Briefcase, GraduationCap } from 'lucide-react';

export const AdminUserManagementPage: React.FC = () => {
  const [seniors, setSeniors] = useState<SeniorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeniors();
  }, []);

  const fetchSeniors = async () => {
    setLoading(true);
    try {
      const res = await api.get('/seniors');
      setSeniors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToggle = async (seniorId: number, currentVerifiedStatus: boolean) => {
    try {
      await api.put(`/seniors/${seniorId}/verify`, { verified: !currentVerifiedStatus });
      setSeniors(prev => prev.map(s => s.id === seniorId ? { ...s, verified: !currentVerifiedStatus } : s));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Senior Verification & User Management</h1>
          <p className="text-slate-400 text-sm">
            Approve or revoke verified senior mentor badges. Verified seniors display the official blue/emerald verification badge.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">Registered Senior Mentors</div>

          <div className="divide-y divide-slate-800">
            {seniors.map((senior) => (
              <div key={senior.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-lg">
                    {senior.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-base text-white flex items-center gap-2">
                      <span>{senior.name}</span>
                      {senior.verified && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          ✓ VERIFIED
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-indigo-400 font-medium">{senior.role} at {senior.company}</div>
                    <div className="text-xs text-slate-400">{senior.college} ('{senior.graduationYear})</div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleVerifyToggle(senior.id, senior.verified)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      senior.verified
                        ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                    }`}
                  >
                    {senior.verified ? (
                      <> <XCircle className="w-4 h-4" /> <span>Revoke Verification</span> </>
                    ) : (
                      <> <CheckCircle2 className="w-4 h-4" /> <span>Approve & Verify Senior</span> </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
