import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { RedditPost, SeniorProfile } from '../types';
import { 
  ArrowBigUp, 
  ArrowBigDown, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  Search, 
  Plus, 
  Award, 
  Users, 
  BookOpen, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  FileText,
  Target,
  ArrowRight,
  Star,
  Zap,
  Building2,
  HelpCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const selectedChannel = searchParams.get('channel') || '';
  const searchQ = searchParams.get('q') || '';

  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [seniors, setSeniors] = useState<SeniorProfile[]>([]);
  const [sortFilter, setSortFilter] = useState<'HOT' | 'TOP' | 'NEW'>('HOT');
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    fetchFeedData();
  }, [selectedChannel, searchQ]);

  const fetchFeedData = async () => {
    setLoading(true);
    try {
      const [postRes, senRes] = await Promise.all([
        api.get('/posts'),
        api.get('/seniors')
      ]);

      let data: RedditPost[] = postRes.data || [];
      
      if (selectedChannel) {
        data = data.filter(p => p.channel.toLowerCase() === selectedChannel.toLowerCase());
      }
      if (searchQ) {
        data = data.filter(p => 
          p.title.toLowerCase().includes(searchQ.toLowerCase()) || 
          p.content.toLowerCase().includes(searchQ.toLowerCase()) ||
          p.channel.toLowerCase().includes(searchQ.toLowerCase())
        );
      }

      setPosts(data);
      setSeniors(senRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'STUDENT' | 'SENIOR' | 'ADMIN') => {
    setLoginLoading(true);
    try {
      let email = 'student@example.com';
      if (role === 'SENIOR') email = 'senior@example.com';
      if (role === 'ADMIN') email = 'admin@example.com';

      await login(email, 'password123');
      if (role === 'STUDENT') navigate('/student/dashboard');
      else if (role === 'SENIOR') navigate('/senior/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      console.error('Demo login failed', err);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleVote = async (postId: number, type: 'up' | 'down') => {
    try {
      const res = await api.post('/posts/vote', { postId, type });
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, ...res.data } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortFilter === 'HOT') return b.upvotes - a.upvotes;
    if (sortFilter === 'TOP') return b.upvotes - a.upvotes;
    return b.id - a.id;
  });

  const channelsList = [
    { name: 'r/all', label: 'All Campus Feeds', icon: Flame, color: 'text-orange-400' },
    { name: 'r/on-campus-drives', label: 'On-Campus Drives', icon: Building2, color: 'text-blue-400' },
    { name: 'r/college-dsa-qa', label: 'College DSA Q&A', icon: Target, color: 'text-emerald-400' },
    { name: 'r/senior-referrals', label: 'Alumni Referrals', icon: Sparkles, color: 'text-purple-400' },
    { name: 'r/google', label: 'Google', icon: Building2, color: 'text-amber-400' },
    { name: 'r/amazon', label: 'Amazon', icon: Building2, color: 'text-teal-400' },
  ];

  return (
    <div className="flex bg-[#0B1416] text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto space-y-6">
        
        {/* HERO BANNER SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0B1416] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4500]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <span>COLLEGE EXCLUSIVE PLACEMENT & SENIOR GUIDANCE HUB</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                College Seniors Share <span className="bg-gradient-to-r from-[#FF4500] via-orange-400 to-amber-300 bg-clip-text text-transparent">Interview Experiences & DSA Questions</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Connect directly with your college seniors and alumni working at <strong>Google, Amazon, Microsoft & TCS Digital</strong>. Access authentic campus drive questions, DSA solutions, and book 1-on-1 guidance sessions.
              </p>

              {/* QUICK DEMO LOGIN SHORTCUTS */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Click Role Login:
                </span>

                <button
                  onClick={() => handleDemoLogin('STUDENT')}
                  disabled={loginLoading}
                  className="px-4 py-2 rounded-xl bg-[#FF4500] hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/30 transition-all flex items-center space-x-1.5 transform hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>College Junior View</span>
                </button>

                <button
                  onClick={() => handleDemoLogin('SENIOR')}
                  disabled={loginLoading}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-xs border border-slate-700 transition-all flex items-center space-x-1.5"
                >
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>College Senior View</span>
                </button>

                <button
                  onClick={() => handleDemoLogin('ADMIN')}
                  disabled={loginLoading}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-extrabold text-xs border border-slate-800 transition-all flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Placement Cell Admin</span>
                </button>
              </div>

            </div>

            {/* QUICK HIGHLIGHT METRICS */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur text-center space-y-1">
                <div className="text-xl font-black text-white">450+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campus Offers</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur text-center space-y-1">
                <div className="text-xl font-black text-emerald-400">120+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">College Alumni</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur text-center space-y-1">
                <div className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                  <span>4.9</span> <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Senior Rating</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur text-center space-y-1">
                <div className="text-xl font-black text-orange-400">100%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified College Batch</div>
              </div>
            </div>

          </div>
        </div>

        {/* SUBREDDIT QUICK PILLS BAR */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {channelsList.map((ch) => {
            const Icon = ch.icon;
            const isSelected = (!selectedChannel && ch.name === 'r/all') || selectedChannel.toLowerCase() === ch.name.toLowerCase();
            return (
              <button
                key={ch.name}
                onClick={() => {
                  if (ch.name === 'r/all') navigate('/');
                  else navigate(`/?channel=${encodeURIComponent(ch.name)}`);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center space-x-2 border ${
                  isSelected 
                    ? 'bg-[#FF4500] text-white border-orange-500 shadow-lg shadow-orange-500/20' 
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : ch.color}`} />
                <span>{ch.label}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* MAIN REDDIT FEED COLUMN */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Filter Header Bar (Hot, Top, New) */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortFilter('HOT')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    sortFilter === 'HOT' ? 'bg-[#FF4500] text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Flame className="w-4 h-4 text-orange-300" />
                  <span>Hot Discussions</span>
                </button>

                <button
                  onClick={() => setSortFilter('TOP')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    sortFilter === 'TOP' ? 'bg-[#FF4500] text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                  <span>Top Answered</span>
                </button>

                <button
                  onClick={() => setSortFilter('NEW')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    sortFilter === 'NEW' ? 'bg-[#FF4500] text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span>Latest Campus Drives</span>
                </button>
              </div>

              {selectedChannel && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  Filter: {selectedChannel}
                </span>
              )}
            </div>

            {/* Quick Post / Ask Question Prompt */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-3 shadow-md">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF4500] to-amber-500 p-0.5 shrink-0 flex items-center justify-center font-black text-white text-xs">
                🎓
              </div>
              <Link
                to="/create-post"
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-xs font-medium hover:border-slate-700 transition-colors flex items-center justify-between"
              >
                <span>Ask college seniors a question or post on-campus interview experience...</span>
                <Plus className="w-4 h-4 text-orange-400" />
              </Link>
            </div>

            {/* POSTS FEED */}
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading College Interview Room feed...</div>
            ) : sortedPosts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                No posts found for this campus filter. Be the first junior or senior to post!
              </div>
            ) : (
              sortedPosts.map((post) => {
                const isExpanded = expandedPostId === post.id;
                return (
                  <div
                    key={post.id}
                    className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex shadow-xl overflow-hidden"
                  >
                    {/* REDDIT UPVOTE / DOWNVOTE SIDEBAR */}
                    <div className="w-12 bg-slate-950/60 p-2 flex flex-col items-center justify-start space-y-1 border-r border-slate-800/60 shrink-0">
                      <button
                        onClick={() => handleVote(post.id, 'up')}
                        className={`p-1.5 rounded-lg hover:bg-orange-500/20 transition-colors ${
                          post.userVote === 'up' ? 'text-[#FF4500]' : 'text-slate-500 hover:text-orange-400'
                        }`}
                      >
                        <ArrowBigUp className={`w-6 h-6 ${post.userVote === 'up' ? 'fill-[#FF4500]' : ''}`} />
                      </button>

                      <span className={`text-xs font-black ${
                        post.userVote === 'up' ? 'text-[#FF4500]' : post.userVote === 'down' ? 'text-indigo-400' : 'text-slate-300'
                      }`}>
                        {post.upvotes - post.downvotes}
                      </span>

                      <button
                        onClick={() => handleVote(post.id, 'down')}
                        className={`p-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors ${
                          post.userVote === 'down' ? 'text-indigo-400' : 'text-slate-500 hover:text-indigo-400'
                        }`}
                      >
                        <ArrowBigDown className={`w-6 h-6 ${post.userVote === 'down' ? 'fill-indigo-400' : ''}`} />
                      </button>
                    </div>

                    {/* MAIN POST BODY */}
                    <div className="flex-1 p-5 space-y-3">
                      
                      {/* Meta header (Channel, Author, Flair) */}
                      <div className="flex items-center flex-wrap gap-2 text-xs">
                        <Link to={`/?channel=${encodeURIComponent(post.channel)}`} className="font-extrabold text-white hover:text-orange-400 transition-colors">
                          {post.channel}
                        </Link>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-medium">Posted by <strong className="text-indigo-300">{post.authorName}</strong> ({post.authorRole})</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">{post.createdAt}</span>

                        <span className="ml-auto px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold border border-orange-500/30">
                          {post.flair}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 
                        onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                        className="text-base sm:text-lg font-black text-white hover:text-orange-400 cursor-pointer transition-colors leading-snug"
                      >
                        {post.title}
                      </h2>

                      {/* Content excerpt or full */}
                      <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {post.content}
                      </p>

                      {/* EXPANDABLE ROUND DETAILS */}
                      {isExpanded && post.technicalQuestions && (
                        <div className="pt-3 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                          {post.oaTopics && (
                            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                              <span className="font-bold text-orange-400 block mb-1">Campus OA / Aptitude Topics:</span>
                              {post.oaTopics}
                            </div>
                          )}
                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                            <span className="font-bold text-purple-400 block mb-1">Technical Round Questions & Solutions:</span>
                            <div className="whitespace-pre-line">{post.technicalQuestions}</div>
                          </div>
                          {post.prepTips && (
                            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                              <span className="font-bold text-emerald-400 block mb-1">College Senior Advice:</span>
                              {post.prepTips}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer Actions (Comments, Share, Expand) */}
                      <div className="flex items-center space-x-4 pt-2 text-xs font-semibold text-slate-400">
                        <button 
                          onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{post.commentsCount} Answers & Comments</span>
                        </button>

                        <button 
                          onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-orange-400 font-bold transition-colors"
                        >
                          <span>{isExpanded ? 'Collapse' : 'Read Full Q&A'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })
            )}

          </div>

          {/* RIGHT SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Access Feature Portal Cards */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-400" /> College Toolkit
              </h3>

              <div className="space-y-2">
                <Link 
                  to="/student/seniors"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200 transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span>College Alumni Directory</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
                </Link>

                <Link 
                  to="/student/preparation"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200 transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>College DSA & CS Sheet</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link 
                  to="/student/applications"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200 transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span>Campus Application Kanban</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </Link>

                <Link 
                  to="/student/resume-reviews"
                  className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200 transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Senior Resume Review</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>
            </div>

            {/* About Community Widget */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF4500] flex items-center justify-center font-black text-white text-lg">
                  🎓
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Campus Interview Room</h3>
                  <div className="text-[11px] text-slate-400">Exclusive College Senior-Junior Network</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with verified college seniors from Google, Microsoft, Amazon, and TCS. Read authentic on-campus interview experiences, ask DSA questions, and book 1-on-1 guidance.
              </p>

              <Link
                to="/create-post"
                className="w-full py-3 rounded-2xl bg-[#FF4500] hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center space-x-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Post Campus Experience / Q&A</span>
              </Link>
            </div>

            {/* Top Senior Mentors Widget */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-orange-400" /> Top College Alumni Mentors
                </h3>
                <Link to="/student/seniors" className="text-[11px] font-bold text-orange-400 hover:underline">View All</Link>
              </div>

              <div className="space-y-3 divide-y divide-slate-800/60">
                {seniors.slice(0, 3).map((senior) => (
                  <div key={senior.id} className="pt-3 first:pt-0 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-1">
                        <span>{senior.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-indigo-400 font-semibold">{senior.role} at {senior.company}</div>
                    </div>
                    <Link
                      to={`/senior/${senior.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-orange-600 text-slate-200 hover:text-white text-[11px] font-bold border border-slate-800 transition-colors"
                    >
                      Book 1-on-1
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};
