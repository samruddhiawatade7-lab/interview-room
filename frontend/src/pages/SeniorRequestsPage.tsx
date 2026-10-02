import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { MentorshipRequest } from '../types';
import { Users, CheckCircle2, XCircle, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SeniorRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/mentorship/requests/senior/${user?.id}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await api.put(`/mentorship/requests/${id}/accept`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await api.put(`/mentorship/requests/${id}/reject`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Mentorship Requests</h1>
          <p className="text-slate-400 text-sm">
            Review incoming student requests. Accept requests to enable 1-on-1 chat and session scheduling.
          </p>
        </div>

        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
              No mentorship requests received yet.
            </div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{req.studentName}</h3>
                    <div className="text-xs text-indigo-400 font-semibold">{req.purpose}</div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    req.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    req.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                  "{req.message}"
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400">
                    Preferred Time: {req.preferredDate} ({req.preferredTime})
                  </div>

                  {req.status === 'PENDING' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> <span>Accept Mentorship</span>
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-600/30 text-slate-300 hover:text-rose-300 font-bold text-xs flex items-center space-x-1"
                      >
                        <XCircle className="w-4 h-4" /> <span>Decline</span>
                      </button>
                    </div>
                  ) : req.status === 'ACCEPTED' ? (
                    <button
                      onClick={() => navigate('/student/chat')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <MessageSquare className="w-4 h-4" /> <span>Open Chat</span>
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
};
