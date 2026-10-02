import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { MentorshipRequest } from '../types';
import { Users, MessageSquare, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const StudentMentorshipsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get(`/mentorship/requests/student/${user.id}`)
        .then(res => setRequests(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">My Mentorship Requests</h1>
            <p className="text-slate-400 text-sm">Track your mentorship requests and chat with accepted senior mentors.</p>
          </div>
          <Link to="/student/seniors" className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs shadow-lg shadow-indigo-600/30">
            Find New Mentor
          </Link>
        </div>

        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{req.seniorName}</h3>
                  <div className="text-xs text-indigo-400 font-semibold">{req.purpose}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  req.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {req.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">"{req.message}"</p>
              {req.status === 'ACCEPTED' && (
                <button onClick={() => navigate('/student/chat')} className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> Open Chat with Mentor
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
