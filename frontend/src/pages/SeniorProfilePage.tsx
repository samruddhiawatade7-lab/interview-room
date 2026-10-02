import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { SeniorProfile, SeniorReview } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, Star, Briefcase, GraduationCap, Users, Calendar, 
  MessageSquare, FileCheck, Video, Award, Clock, ArrowLeft, Send, Sparkles 
} from 'lucide-react';

export const SeniorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [senior, setSenior] = useState<SeniorProfile | null>(null);
  const [reviews, setReviews] = useState<SeniorReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [activeModal, setActiveModal] = useState<'NONE' | 'MENTORSHIP' | 'BOOKING' | 'RESUME' | 'MOCK'>('NONE');

  // Form states
  const [purpose, setPurpose] = useState('Career Guidance');
  const [requestMsg, setRequestMsg] = useState('');
  const [prefDate, setPrefDate] = useState('2026-10-06');
  const [prefTime, setPrefTime] = useState('18:00 - 19:00');

  // Resume form
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [resumeUrl, setResumeUrl] = useState('https://example.com/resumes/my_resume.pdf');

  // Mock form
  const [mockType, setMockType] = useState('Technical - DSA & System Design');

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchSeniorDetails();
  }, [id]);

  const fetchSeniorDetails = async () => {
    setLoading(true);
    try {
      const [senRes, revRes] = await Promise.all([
        api.get(`/seniors/${id}`),
        api.get(`/reviews/senior/${id}`).catch(() => ({ data: [] }))
      ]);
      setSenior(senRes.data);
      setReviews(revRes.data || []);
    } catch (err) {
      console.error('Failed to load senior details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMentorshipRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    try {
      await api.post('/mentorship/requests', {
        studentId: user.id,
        studentName: user.name,
        seniorId: senior?.userId || senior?.id,
        seniorName: senior?.name,
        purpose,
        message: requestMsg,
        preferredDate: prefDate,
        preferredTime: prefTime,
      });
      setSuccessMsg('Mentorship request sent successfully! The senior mentor will be notified.');
      setTimeout(() => { setActiveModal('NONE'); setSuccessMsg(''); navigate('/student/mentorships'); }, 1500);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to send request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    try {
      await api.post('/sessions/book', {
        studentId: user.id,
        studentName: user.name,
        seniorId: senior?.userId || senior?.id,
        seniorName: senior?.name,
        topic: purpose,
        date: prefDate,
        timeSlot: prefTime,
        meetingUrl: 'https://meet.google.com/senior-connect-session-link',
      });
      setSuccessMsg('Session booked successfully!');
      setTimeout(() => { setActiveModal('NONE'); setSuccessMsg(''); navigate('/student/sessions'); }, 1500);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Double booking error. Slot unavailable.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestResumeReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    try {
      await api.post('/resume-reviews', {
        studentId: user.id,
        studentName: user.name,
        seniorId: senior?.userId || senior?.id,
        seniorName: senior?.name,
        resumeUrl,
        targetRole,
        targetCompany,
        studentMessage: requestMsg,
      });
      setSuccessMsg('Resume review request submitted successfully!');
      setTimeout(() => { setActiveModal('NONE'); setSuccessMsg(''); navigate('/student/resume-reviews'); }, 1500);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit resume review request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestMockInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    try {
      await api.post('/mock-interviews', {
        studentId: user.id,
        studentName: user.name,
        seniorId: senior?.userId || senior?.id,
        seniorName: senior?.name,
        interviewType: mockType,
      });
      setSuccessMsg('Mock interview scheduled!');
      setTimeout(() => { setActiveModal('NONE'); setSuccessMsg(''); navigate('/student/mock-interviews'); }, 1500);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to schedule mock interview');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 p-8 text-center text-slate-400">Loading senior profile...</div>
      </div>
    );
  }

  if (!senior) {
    return (
      <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 p-8 text-center text-slate-400">Senior mentor profile not found.</div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Seniors Search</span>
        </button>

        {/* HERO PROFILE HEADER */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 mb-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-start space-x-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center font-black text-2xl text-indigo-300">
                  {senior.name.charAt(0)}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl font-extrabold text-white">{senior.name}</h1>
                  {senior.verified && (
                    <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED SENIOR
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-indigo-400 mb-2">{senior.role} at {senior.company}</div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4 text-slate-500" /> {senior.college} ('{senior.graduationYear})</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-slate-500" /> {senior.studentsHelped || 24} Students Helped</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-4 h-4 fill-amber-400" /> {senior.rating || 4.9} / 5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => setActiveModal('MENTORSHIP')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Users className="w-4 h-4" /> Request Mentorship
              </button>

              <button
                onClick={() => setActiveModal('BOOKING')}
                className="px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-purple-400" /> Book Session
              </button>

              <button
                onClick={() => setActiveModal('RESUME')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4 text-indigo-400" /> Resume Review
              </button>

              <button
                onClick={() => setActiveModal('MOCK')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Video className="w-4 h-4 text-pink-400" /> Mock Interview
              </button>
            </div>

          </div>
        </div>

        {/* DETAILED CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* About & Bio */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">About Mentor</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{senior.bio}</p>
            </div>

            {/* Placement Journey & Experience */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" /> Experience & Placement Journey
              </h3>
              <div className="text-sm text-slate-300 space-y-3">
                <div>
                  <div className="font-semibold text-indigo-300 mb-1">Current Role & Work</div>
                  <div className="text-slate-400">{senior.experience || `${senior.role} at ${senior.company}`}</div>
                </div>
                <div>
                  <div className="font-semibold text-indigo-300 mb-1">Campus Placement Strategy</div>
                  <div className="text-slate-400">{senior.placementJourney || 'Cracked tier-1 tech offer through structured DSA practice and core CS revision.'}</div>
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Mentorship Reviews ({reviews.length})
              </h3>
              
              <div className="space-y-3 divide-y divide-slate-800/60">
                {reviews.length === 0 ? (
                  <div className="text-xs text-slate-400">No written reviews yet for this mentor.</div>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="pt-3 first:pt-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{rev.studentName}</span>
                        <span className="text-xs text-amber-400 font-bold">★ {rev.rating}/5</span>
                      </div>
                      <div className="text-xs text-indigo-400 font-semibold mb-1">{rev.categories}</div>
                      <p className="text-xs text-slate-300">{rev.reviewText}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* SIDEBAR DETAILS */}
          <div className="space-y-6">
            
            {/* Skills */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {senior.skills.split(',').map((sk, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-950 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                    {sk.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" /> Standard Availability
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {senior.availability || 'Mon & Wed 6:00 PM - 8:00 PM, Sat 10:00 AM - 1:00 PM'}
              </p>
            </div>

            {/* Mentorship Categories */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Mentorship Categories</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {senior.mentorshipCategories || 'Career Guidance, DSA Guidance, Resume Review, Mock Interview, Company Preparation'}
              </p>
            </div>

          </div>

        </div>

        {/* MODAL OVERLAYS */}
        {activeModal !== 'NONE' && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              
              <button
                onClick={() => setActiveModal('NONE')}
                className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-sm"
              >
                ✕
              </button>

              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  {successMsg}
                </div>
              )}

              {/* Mentorship Modal */}
              {activeModal === 'MENTORSHIP' && (
                <form onSubmit={handleSendMentorshipRequest} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Request Mentorship from {senior.name}</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Purpose of Mentorship</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    >
                      <option value="Career Guidance">Career Guidance</option>
                      <option value="DSA Guidance">DSA Guidance</option>
                      <option value="Resume Review">Resume Review</option>
                      <option value="Interview Preparation">Interview Preparation</option>
                      <option value="Company Preparation">Company Preparation</option>
                      <option value="Project Guidance">Project Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Message to Mentor</label>
                    <textarea
                      required
                      rows={3}
                      value={requestMsg}
                      onChange={(e) => setRequestMsg(e.target.value)}
                      placeholder="Introduce yourself and describe what you need help with..."
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white shadow-lg shadow-indigo-600/30"
                  >
                    {submitting ? 'Sending Request...' : 'Send Request'}
                  </button>
                </form>
              )}

              {/* Booking Modal */}
              {activeModal === 'BOOKING' && (
                <form onSubmit={handleBookSession} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Book 1-on-1 Session</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Select Date</label>
                    <input
                      type="date"
                      required
                      value={prefDate}
                      onChange={(e) => setPrefDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Time Slot</label>
                    <select
                      value={prefTime}
                      onChange={(e) => setPrefTime(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    >
                      <option value="18:00 - 19:00">6:00 PM - 7:00 PM</option>
                      <option value="19:00 - 20:00">7:00 PM - 8:00 PM</option>
                      <option value="20:00 - 21:00">8:00 PM - 9:00 PM</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white shadow-lg shadow-purple-600/30"
                  >
                    {submitting ? 'Booking Slot...' : 'Confirm Booking'}
                  </button>
                </form>
              )}

              {/* Resume Review Modal */}
              {activeModal === 'RESUME' && (
                <form onSubmit={handleRequestResumeReview} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Request Resume Review</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Company</label>
                    <input
                      type="text"
                      required
                      value={targetCompany}
                      onChange={(e) => setTargetCompany(e.target.value)}
                      placeholder="Google / Microsoft"
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Resume File Link (PDF/Drive)</label>
                    <input
                      type="text"
                      required
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white"
                  >
                    Submit Resume
                  </button>
                </form>
              )}

              {/* Mock Interview Modal */}
              {activeModal === 'MOCK' && (
                <form onSubmit={handleRequestMockInterview} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Request Mock Interview</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Interview Type</label>
                    <select
                      value={mockType}
                      onChange={(e) => setMockType(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    >
                      <option value="Technical - DSA & System Design">Technical - DSA & System Design</option>
                      <option value="Technical - Java & Spring Boot">Technical - Java & Spring Boot</option>
                      <option value="CS Core - DBMS & OS">CS Core - DBMS & OS</option>
                      <option value="HR & Behavioral">HR & Behavioral</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 font-bold text-sm text-white shadow-lg shadow-pink-600/30"
                  >
                    Schedule Mock Interview
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
};
