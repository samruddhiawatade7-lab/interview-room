import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { MentorshipRequest, SeniorProfile } from '../types';
import { Users, Calendar, Star, Award, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SeniorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SeniorProfile | null>(null);
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        try {
          const [profRes, reqRes] = await Promise.all([
            api.get(`/seniors/${user.id}`).catch(() => null),
            api.get(`/mentorship/requests/senior/${user.id}`).catch(() => ({ data: [] }))
          ]);
          if (profRes?.data) setProfile(profRes.data);
          setRequests(reqRes.data || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [user]);

  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const acceptedRequests = requests.filter(r => r.status === 'ACCEPTED');

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        
        {/* Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Senior Mentor Portal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">
                Welcome back, {user?.name}! 🎓
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                {user?.jobRole} at <strong className="text-white">{user?.company}</strong> • Verified Mentor
              </p>
            </div>

            <Link
              to="/senior/requests"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Manage Requests ({pendingRequests.length} Pending)</span>
            </Link>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pending Requests</div>
            <div className="text-3xl font-extrabold text-amber-400">{pendingRequests.length}</div>
            <div className="text-xs text-slate-500 mt-1">Awaiting your response</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Mentees</div>
            <div className="text-3xl font-extrabold text-indigo-400">{acceptedRequests.length}</div>
            <div className="text-xs text-slate-500 mt-1">Accepted mentorships</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Students Helped</div>
            <div className="text-3xl font-extrabold text-purple-400">{profile?.studentsHelped || 38}</div>
            <div className="text-xs text-emerald-400 mt-1 font-semibold">Campus guidance provided</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mentor Rating</div>
            <div className="text-3xl font-extrabold text-amber-300 flex items-center gap-1">
              ★ {profile?.rating || 4.9}
            </div>
            <div className="text-xs text-slate-500 mt-1">Based on student reviews</div>
          </div>
        </div>

        {/* PENDING REQUESTS PREVIEW */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Student Requests</h3>
            <Link to="/senior/requests" className="text-xs font-bold text-indigo-400 hover:underline">View All Requests</Link>
          </div>

          <div className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-950 rounded-2xl border border-slate-800">
                No pending mentorship requests at the moment.
              </div>
            ) : (
              pendingRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-white">{req.studentName}</div>
                    <div className="text-xs text-indigo-300 font-semibold">{req.purpose}</div>
                    <div className="text-xs text-slate-400 mt-1">"{req.message}"</div>
                  </div>
                  <Link
                    to="/senior/requests"
                    className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-bold border border-indigo-500/30"
                  >
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
};
