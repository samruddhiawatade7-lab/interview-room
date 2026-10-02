import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SessionBooking } from '../types';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

export const StudentSessionsPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionBooking[]>([]);

  useEffect(() => {
    if (user) {
      api.get(`/sessions/student/${user.id}`)
        .then(res => setSessions(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Booked Mentorship Sessions</h1>
        <p className="text-slate-400 text-sm mb-8">View upcoming Google Meet video calls with senior mentors.</p>

        <div className="space-y-4">
          {sessions.map((sess) => (
            <div key={sess.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
              <div>
                <h3 className="font-bold text-base text-white">{sess.topic}</h3>
                <div className="text-xs text-indigo-400 font-semibold">With {sess.seniorName}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {sess.date} ({sess.timeSlot})
                </div>
              </div>

              <a
                href={sess.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
              >
                <span>Join Google Meet</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
