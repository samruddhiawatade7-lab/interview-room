import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Flame, Plus, Sparkles, ArrowLeft } from 'lucide-react';

export const CreatePostPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [channel, setChannel] = useState('r/google');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [flair, setFlair] = useState('Interview Experience');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [oaTopics, setOaTopics] = useState('');
  const [technicalQuestions, setTechnicalQuestions] = useState('');
  const [prepTips, setPrepTips] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);

    try {
      await api.post('/posts', {
        channel,
        title,
        content,
        authorId: user.id,
        authorName: user?.name || user?.email || 'User',
        authorRole: user.role,
        authorCompany: user.company || 'Tier 1 Tech',
        flair,
        difficulty,
        oaTopics,
        technicalQuestions,
        prepTips
      });

      setSuccess('Post submitted successfully to ' + channel + '!');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex bg-[#0B1416] text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-4xl">
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF4500]/20 border border-orange-500/30 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#FF4500]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Create a Post</h1>
              <p className="text-xs text-slate-400">Share your placement experience, question, or roadmap with the community.</p>
            </div>
          </div>

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Community Channel Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Community / Subreddit</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-[#FF4500]"
                >
                  <option value="r/google">r/google (Google Interview Rounds)</option>
                  <option value="r/microsoft">r/microsoft (Microsoft Technical Drives)</option>
                  <option value="r/amazon">r/amazon (Amazon Leadership & LLD)</option>
                  <option value="r/dsa-prep">r/dsa-prep (Data Structures & Roadmaps)</option>
                  <option value="r/mock-interviews">r/mock-interviews (Mock Scorecards)</option>
                  <option value="r/resume-reviews">r/resume-reviews (ATS & Formatting Critiques)</option>
                  <option value="r/system-design">r/system-design (System Design HLD/LLD)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Post Flair</label>
                <select
                  value={flair}
                  onChange={(e) => setFlair(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-[#FF4500]"
                >
                  <option value="Interview Experience">Interview Experience</option>
                  <option value="Campus Drive">Campus Drive</option>
                  <option value="SDE Sheet">SDE Sheet</option>
                  <option value="Leadership Principles">Leadership Principles</option>
                  <option value="ATS Optimization">ATS Optimization</option>
                  <option value="Question / Help Request">Question / Help Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title: Cracked Google SWE II / Full 5-Round Question Breakdown..."
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-[#FF4500]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Post Body / Overview</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide a general overview of your interview journey, round details, or advice..."
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#FF4500]"
              />
            </div>

            {/* Optional Round Specific Fields */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">Detailed Round Breakdown (Optional)</div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Online Assessment (OA) Topics</label>
                <input
                  type="text"
                  value={oaTopics}
                  onChange={(e) => setOaTopics(e.target.value)}
                  placeholder="2 Coding Questions (Graph Shortest Path + Tree DP)..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technical Round Questions</label>
                <textarea
                  rows={3}
                  value={technicalQuestions}
                  onChange={(e) => setTechnicalQuestions(e.target.value)}
                  placeholder="Round 1: LRU Cache concurrency implementation. Round 2: Word Ladder II..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preparation Tips & Advice</label>
                <textarea
                  rows={2}
                  value={prepTips}
                  onChange={(e) => setPrepTips(e.target.value)}
                  placeholder="Master LeetCode Medium/Hard DP and Graph problems..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF4500]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#FF4500] hover:bg-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 transition-all mt-6"
            >
              {submitting ? 'Publishing Post...' : 'Publish Post to Community'}
            </button>
          </form>

        </div>

      </main>
    </div>
  );
};
