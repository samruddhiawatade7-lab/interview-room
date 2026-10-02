import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Flame, 
  Search, 
  Plus, 
  Bell, 
  User, 
  LogOut, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  Award,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { api } from '../../services/api';
import { Notification } from '../../types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const res = await api.get(`/notifications/user/${user.id}`);
          setNotifications(res.data);
          setUnreadCount(res.data.filter((n: Notification) => !n.isRead).length);
        } catch (err) {
          setNotifications([
            { id: 1, recipientId: user.id, title: 'Welcome to Interview Room! 🔥', message: 'Explore r/google, r/dsa-prep, and verified senior mentors.', type: 'SYSTEM', linkUrl: '/', isRead: false }
          ]);
          setUnreadCount(1);
        }
      };
      fetchNotifications();
    }
  }, [user]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1416]/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4500] via-orange-500 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B1416] rounded-[10px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#FF4500]" />
              </div>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                INTERVIEW ROOM
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                REDDIT EDITION
              </span>
            </div>
          </Link>

          {/* Reddit Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search r/google, r/dsa-prep, interview experiences, seniors..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF4500] transition-colors"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">

                {/* Create Post Button */}
                <Link
                  to="/create-post"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#FF4500] hover:bg-orange-600 text-white text-xs font-extrabold shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Post</span>
                </Link>

                {/* Dashboard Button */}
                <button
                  onClick={() => {
                    if (user.role === 'STUDENT') navigate('/student/dashboard');
                    else if (user.role === 'SENIOR') navigate('/senior/dashboard');
                    else navigate('/admin/dashboard');
                  }}
                  className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Portal</span>
                </button>

                {/* Notifications Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 relative transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4500] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0B1416] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden z-50">
                      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 text-orange-400" /> Notifications
                        </span>
                        <span className="text-[10px] text-slate-400">{notifications.length} total</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400">No notifications yet</div>
                        ) : (
                          notifications.map((item) => (
                            <div 
                              key={item.id} 
                              onClick={() => {
                                handleMarkAsRead(item.id);
                                if (item.linkUrl) navigate(item.linkUrl);
                                setShowNotifications(false);
                              }}
                              className={`p-3 text-xs cursor-pointer transition-colors ${item.isRead ? 'bg-slate-950/40 opacity-75' : 'bg-orange-950/20 hover:bg-orange-900/30'}`}
                            >
                              <div className="font-bold text-orange-400 mb-0.5">{item.title}</div>
                              <div className="text-slate-300">{item.message}</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Avatar / Karma */}
                <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 font-bold text-xs flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-bold text-slate-200">{user.name}</div>
                    <div className="text-[10px] text-orange-400 font-bold flex items-center gap-1">
                      🔥 {user.karma || 420} Karma • {user.role}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    title="Logout"
                    className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-slate-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-extrabold text-white bg-[#FF4500] hover:bg-orange-600 px-5 py-2 rounded-full shadow-lg shadow-orange-500/25 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
