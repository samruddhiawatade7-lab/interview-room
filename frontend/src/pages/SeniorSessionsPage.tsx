import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SessionBooking, AvailabilitySlot } from '../types';
import { Calendar, Clock, Plus, ExternalLink } from 'lucide-react';

export const SeniorSessionsPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionBooking[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);

  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('19:00');

  useEffect(() => {
    if (user) {
      api.get(`/sessions/senior/${user.id}`).then(r => setSessions(r.data)).catch(console.error);
      api.get(`/sessions/availability/senior/${user.id}`).then(r => setSlots(r.data)).catch(console.error);
    }
  }, [user]);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await api.post('/sessions/availability', {
        seniorId: user.id,
        dayOfWeek,
        startTime,
        endTime,
        isBooked: false,
      });
      setSlots(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Sessions & Availability Manager</h1>
        <p className="text-slate-400 text-sm mb-8">Set your weekly availability slots for students to book 1-on-1 calls.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Availability Slots */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white">Create Availability Slot</h3>
            <form onSubmit={handleAddSlot} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Day of Week</label>
                <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time</label>
                  <input type="text" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Time</label>
                  <input type="text" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white" />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 font-bold text-xs text-white">Add Available Slot</button>
            </form>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Existing Slots</div>
              {slots.map(s => (
                <div key={s.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between text-xs">
                  <span>{s.dayOfWeek}: {s.startTime} - {s.endTime}</span>
                  <span className={s.isBooked ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {s.isBooked ? 'BOOKED' : 'OPEN'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Booked Sessions */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white">Confirmed Student Sessions</h3>
            <div className="space-y-3">
              {sessions.map(sess => (
                <div key={sess.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-white">{sess.studentName}</div>
                    <div className="text-xs text-indigo-400">{sess.topic}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{sess.date} ({sess.timeSlot})</div>
                  </div>
                  <a href={sess.meetingUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1">
                    <span>Meet</span> <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
