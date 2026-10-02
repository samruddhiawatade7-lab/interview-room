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
  CheckCircle
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
        
        {/* FEEDS */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-2">FEEDS</div>
          <NavLink to="/" className={linkClass} end>
            <Flame className="w-4 h-4 text-orange-500" />
            <span>🔥 Feed / Discussions</span>
          </NavLink>
          <NavLink to="/interview-experiences" className={linkClass}>
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span>📈 Top Experiences</span>
          </NavLink>
          <NavLink to="/resources" className={linkClass}>
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>📚 Resource Hub</span>
          </NavLink>
        </div>

        {/* SUBREDDIT COMMUNITIES */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-2">COMMUNITIES</div>
          {[
            { tag: 'r/google', count: '248 posts' },
            { tag: 'r/microsoft', count: '182 posts' },
            { tag: 'r/amazon', count: '310 posts' },
            { tag: 'r/dsa-prep', count: '412 posts' },
            { tag: 'r/mock-interviews', count: '95 posts' },
            { tag: 'r/resume-reviews', count: '295 posts' },
            { tag: 'r/system-design', count: '140 posts' },
          ].map((c) => (
            <NavLink key={c.tag} to={`/?channel=${encodeURIComponent(c.tag)}`} className={communityLinkClass}>
              <span className="font-bold text-xs">{c.tag}</span>
              <span className="text-[10px] text-slate-500 font-medium">{c.count}</span>
            </NavLink>
          ))}
        </div>

        {/* MENTORSHIP SERVICES */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-2">MENTORSHIP & TOOLS</div>
          <NavLink to="/student/seniors" className={linkClass}>
            <Search className="w-4 h-4 text-indigo-400" />
            <span>Find Senior Mentors</span>
          </NavLink>
          
          {user?.role === 'STUDENT' && (
            <>
              <NavLink to="/student/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Student Dashboard</span>
              </NavLink>
              <NavLink to="/student/sessions" className={linkClass}>
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Booked Sessions</span>
              </NavLink>
              <NavLink to="/student/chat" className={linkClass}>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Live Chat Room</span>
              </NavLink>
              <NavLink to="/student/preparation" className={linkClass}>
                <Target className="w-4 h-4 text-pink-400" />
                <span>Prep Trackers</span>
              </NavLink>
              <NavLink to="/student/applications" className={linkClass}>
                <Kanban className="w-4 h-4 text-amber-400" />
                <span>Company Applications</span>
              </NavLink>
              <NavLink to="/student/bookmarks" className={linkClass}>
                <Bookmark className="w-4 h-4 text-indigo-400" />
                <span>Saved Bookmarks</span>
              </NavLink>
            </>
          )}

          {user?.role === 'SENIOR' && (
            <>
              <NavLink to="/senior/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-orange-400" />
                <span>Senior Dashboard</span>
              </NavLink>
              <NavLink to="/senior/requests" className={linkClass}>
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Mentorship Requests</span>
              </NavLink>
              <NavLink to="/senior/sessions" className={linkClass}>
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Sessions & Availability</span>
              </NavLink>
              <NavLink to="/student/chat" className={linkClass}>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat Messages</span>
              </NavLink>
              <NavLink to="/senior/share-experience" className={linkClass}>
                <PlusCircle className="w-4 h-4 text-orange-400" />
                <span>Post Experience</span>
              </NavLink>
            </>
          )}

          {user?.role === 'ADMIN' && (
            <>
              <NavLink to="/admin/dashboard" className={linkClass}>
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Admin Analytics</span>
              </NavLink>
              <NavLink to="/admin/users" className={linkClass}>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Senior Verification</span>
              </NavLink>
              <NavLink to="/admin/moderation" className={linkClass}>
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                <span>Content Moderation</span>
              </NavLink>
            </>
          )}
        </div>

      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-semibold">
        INTERVIEW ROOM v2.0 • Reddit Edition
      </div>
    </aside>
  );
};
