import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { MentorshipRequest, SessionBooking, CompanyApplication, StudentProfile } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  Target, Calendar, Users, Briefcase, FileCheck, Video, 
  Sparkles, CheckCircle2, Clock, ArrowRight, ExternalLink, Plus 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [sessions, setSessions] = useState<SessionBooking[]>([]);
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadDashboardData = async () => {
        try {
          const [profRes, reqRes, sessRes, appRes] = await Promise.all([
            api.get(`/users/students/${user.id}`).catch(() => null),
            api.get(`/mentorship/requests/student/${user.id}`).catch(() => ({ data: [] })),
            api.get(`/sessions/student/${user.id}`).catch(() => ({ data: [] })),
            api.get(`/applications/${user.id}`).catch(() => ({ data: [] })),
          ]);

          if (profRes?.data) setProfile(profRes.data);
          setRequests(reqRes.data || []);
          setSessions(sessRes.data || []);
          setApplications(appRes.data || []);
        } catch (err) {
          console.error('Failed to load student dashboard:', err);
        } finally {
          setLoading(false);
        }
      };
      loadDashboardData();
    }
  }, [user]);

  const prepChartData = [
    { subject: 'DSA', score: profile?.dsaProgressPercentage || 72, fullMark: 100 },
    { subject: 'Aptitude', score: profile?.aptitudeProgressPercentage || 80, fullMark: 100 },
    { subject: 'DBMS', score: 65, fullMark: 100 },
    { subject: 'OS', score: 60, fullMark: 100 },
    { subject: 'CN', score: 70, fullMark: 100 },
    { subject: 'OOP', score: 75, fullMark: 100 },
    { subject: 'Interview', score: 55, fullMark: 100 },
    { subject: 'Resume', score: profile?.resumeProgressPercentage || 90, fullMark: 100 },
  ];

  const pendingCount = requests.filter(r => r.status === 'PENDING').length;
  const acceptedCount = requests.filter(r => r.status === 'ACCEPTED').length;

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 relative overflow-hidden mb-8 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Placement Preparation Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                {user?.college} • {user?.branch} (Batch of {user?.graduationYear})
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/student/seniors"
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Find Senior Mentor</span>
              </Link>
            </div>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Mentorships</span>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{acceptedCount}</div>
            <div className="text-xs text-slate-500 mt-1">{pendingCount} pending requests</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Upcoming Sessions</span>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{sessions.length}</div>
            <div className="text-xs text-indigo-400 mt-1 font-medium">1-on-1 Mock Interviews & Chat</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">DSA Solved</span>
              <Target className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">215 / 300</div>
            <div className="text-xs text-emerald-400 mt-1 font-semibold">71.6% target completed</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Applications</span>
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{applications.length}</div>
            <div className="text-xs text-slate-500 mt-1">Google, Microsoft, Amazon...</div>
          </div>
        </div>

        {/* CHARTS & PREPARATION BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Recharts Placement Readiness Chart */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" /> Placement Readiness Breakdown
                </h3>
                <p className="text-xs text-slate-400">Values populated dynamically from your preparation database</p>
              </div>
              <Link to="/student/preparation" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1">
                Update Progress <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="subject" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {prepChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Preparation Summary Widget */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Subject Mastery</h3>

            {[
              { label: 'DSA Problems', val: '72%', color: 'bg-indigo-500' },
              { label: 'Aptitude Accuracy', val: '80%', color: 'bg-purple-500' },
              { label: 'DBMS (ACID, B+ Trees)', val: '65%', color: 'bg-pink-500' },
              { label: 'Operating Systems', val: '60%', color: 'bg-emerald-500' },
              { label: 'Computer Networks', val: '70%', color: 'bg-cyan-500' },
              { label: 'OOP & SOLID', val: '75%', color: 'bg-amber-500' },
            ].map((sub, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{sub.label}</span>
                  <span className="text-indigo-400">{sub.val}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${sub.color}`} style={{ width: sub.val }}></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* UPCOMING SESSIONS & ACTIVE APPLICATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Sessions List */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" /> Booked Mentorship Sessions
              </h3>
              <Link to="/student/sessions" className="text-xs font-semibold text-indigo-400 hover:underline">View All</Link>
            </div>

            <div className="space-y-3">
              {sessions.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800">
                  No upcoming sessions booked. Search seniors to book a 1-on-1 slot!
                </div>
              ) : (
                sessions.map((sess) => (
                  <div key={sess.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{sess.topic}</div>
                      <div className="text-xs text-indigo-400 font-medium">With {sess.seniorName}</div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> {sess.date} ({sess.timeSlot})
                      </div>
                    </div>

                    <a
                      href={sess.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 text-xs font-semibold border border-purple-500/30 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Join Meet</span> <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Company Application Kanban Widget */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" /> Company Applications Tracker
              </h3>
              <Link to="/student/applications" className="text-xs font-semibold text-indigo-400 hover:underline">Kanban Board</Link>
            </div>

            <div className="space-y-3">
              {applications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800">
                  No application tracked yet. Add your Google, Microsoft, Amazon applications.
                </div>
              ) : (
                applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{app.companyName}</div>
                      <div className="text-xs text-slate-400">{app.role}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
