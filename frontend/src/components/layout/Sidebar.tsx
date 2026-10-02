import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Search, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileCheck, 
  Video, 
  Target, 
  Kanban, 
  BookOpen, 
  Briefcase, 
  Bookmark, 
  PlusCircle, 
  LayoutDashboard,
  ShieldCheck,
  CheckCircle,
  GraduationCap,
  Building2,
  HelpCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
      isActive
        ? 'bg-[#FF4500] text-white shadow-lg shadow-orange-500/20'
        : 'text-slate-400 hover:text-white hover:bg-slate-900'
    }`;

  const communityLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-slate-900 text-orange-400 border border-orange-500/30 font-bold'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
    }`;

  return (
    <aside className="w-64 bg-[#0B1416] border-r border-slate-800 shrink-0 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* COLLEGE BADGE HEADER */}
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black text-white">
            <GraduationCap className="w-4 h-4 text-orange-400" />
            <span>COLLEGE PLACEMENT HUB</span>
          </div>
          <p className="text-[10px] text-slate-400">Exclusive Alumni & Junior Guidance</p>
        </div>

        {/* FEEDS */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-2">CAMPUS FEEDS</div>
          <NavLink to="/" className={linkClass} end>
            <Flame className="w-4 h-4 text-orange-500" />
            <span>🔥 Feed / Q&A</span>
          </NavLink>
          <NavLink to="/interview-experiences" className={linkClass}>
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span>📈 Campus Experiences</span>
          </NavLink>
          <NavLink to="/resources" className={linkClass}>
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>📚 College Study Material</span>
          </NavLink>
        </div>

        {/* SUBREDDIT COMMUNITIES */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-2">CAMPUS CHANNELS</div>
          {[
            { tag: 'r/on-campus-drives', count: '142 posts' },
            { tag: 'r/college-dsa-qa', count: '310 posts' },
            { tag: 'r/senior-referrals', count: '85 posts' },
            { tag: 'r/google', count: '248 posts' },
            { tag: 'r/microsoft', count: '182 posts' },
            { tag: 'r/amazon', count: '210 posts' },
            { tag: 'r/resume-reviews', count: '195 posts' },
          ].map((c) => (
            <NavLink key={c.tag} to={`/?channel=${encodeURIComponent(c.tag)}`} className={communityLinkClass}>
              <span className="font-bold text-xs">{c.tag}</span>
              <span className="text-[10px] text-slate-500 font-medium">{c.count}</span>
            </NavLink>
          ))}
        </div>

        {/* MENTORSHIP SERVICES */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-2">COLLEGE ALUMNI & TOOLS</div>
          <NavLink to="/student/seniors" className={linkClass}>
            <Search className="w-4 h-4 text-indigo-400" />
            <span>Find College Alumni</span>
          </NavLink>
          
          {user?.role === 'STUDENT' && (
            <>
              <NavLink to="/student/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Student Portal</span>
              </NavLink>
              <NavLink to="/student/sessions" className={linkClass}>
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Alumni Sessions</span>
              </NavLink>
              <NavLink to="/student/chat" className={linkClass}>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat with Seniors</span>
              </NavLink>
              <NavLink to="/student/preparation" className={linkClass}>
                <Target className="w-4 h-4 text-pink-400" />
                <span>DSA & CS Trackers</span>
              </NavLink>
              <NavLink to="/student/applications" className={linkClass}>
                <Kanban className="w-4 h-4 text-amber-400" />
                <span>Placement Tracker</span>
              </NavLink>
              <NavLink to="/student/bookmarks" className={linkClass}>
                <Bookmark className="w-4 h-4 text-indigo-400" />
                <span>Saved Questions</span>
              </NavLink>
            </>
          )}

          {user?.role === 'SENIOR' && (
            <>
              <NavLink to="/senior/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-orange-400" />
                <span>Senior Mentor Dashboard</span>
              </NavLink>
              <NavLink to="/senior/requests" className={linkClass}>
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Junior Requests</span>
              </NavLink>
              <NavLink to="/senior/sessions" className={linkClass}>
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>1-on-1 Availability</span>
              </NavLink>
              <NavLink to="/student/chat" className={linkClass}>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Junior Chats</span>
              </NavLink>
              <NavLink to="/senior/share-experience" className={linkClass}>
                <PlusCircle className="w-4 h-4 text-orange-400" />
                <span>Post Experience / DSA Question</span>
              </NavLink>
            </>
          )}

          {user?.role === 'ADMIN' && (
            <>
              <NavLink to="/admin/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>College Admin Analytics</span>
              </NavLink>
              <NavLink to="/admin/users" className={linkClass}>
                <Users className="w-4 h-4 text-cyan-400" />
                <span>User Verification</span>
              </NavLink>
            </>
          )}
        </div>

      </div>

      {/* FOOTER */}
      <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-semibold space-y-1">
        <div className="text-slate-300 font-bold">COLLEGE INTERVIEW ROOM v2.5</div>
        <div>Exclusive Campus Placement Portal</div>
      </div>
    </aside>
  );
};
