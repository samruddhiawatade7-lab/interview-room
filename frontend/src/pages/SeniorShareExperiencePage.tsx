import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Briefcase, BookOpen, PlusCircle } from 'lucide-react';

export const SeniorShareExperiencePage: React.FC = () => {
  const { user } = useAuth();
  const [type, setType] = useState<'EXPERIENCE' | 'RESOURCE'>('EXPERIENCE');
  const [success, setSuccess] = useState('');

  // Experience form
  const [company, setCompany] = useState(user?.company || 'Google');
  const [role, setRole] = useState(user?.jobRole || 'Software Engineer');
  const [roundsCount, setRoundsCount] = useState(4);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [oaTopics, setOaTopics] = useState('');
  const [technicalQuestions, setTechnicalQuestions] = useState('');
  const [hrQuestions, setHrQuestions] = useState('');
  const [prepTips, setPrepTips] = useState('');

  // Resource form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('DSA');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (type === 'EXPERIENCE') {
        await api.post('/interviews/experiences', {
          seniorId: user.id,
          authorName: user?.name || user?.email || 'Senior Mentor',
          company,
          role,
          graduationYear: user.graduationYear || 2023,
          roundsCount: Number(roundsCount),
          difficulty,
          oaTopics,
          technicalQuestions,
          hrQuestions,
          prepTips,
        });
        setSuccess('Interview Experience submitted! Sent for admin approval.');
      } else {
        await api.post('/resources', {
          title,
          description,
          category,
          difficulty: 'Intermediate',
          tags: category,
          url,
          uploaderId: user.id,
          uploaderName: user?.name || user?.email || 'Senior Mentor',
          uploaderRole: 'SENIOR',
        });
        setSuccess('Resource shared successfully!');
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-4xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Share Knowledge & Experience</h1>
        <p className="text-slate-400 text-sm mb-6">Contribute interview questions, OA topics, or learning roadmaps for juniors.</p>

        {success && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            {success}
          </div>
        )}

        <div className="flex space-x-3 mb-8">
          <button onClick={() => setType('EXPERIENCE')} className={`px-5 py-3 rounded-2xl font-bold text-xs ${type === 'EXPERIENCE' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
            Post Interview Experience
          </button>
          <button onClick={() => setType('RESOURCE')} className={`px-5 py-3 rounded-2xl font-bold text-xs ${type === 'RESOURCE' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
            Share Learning Resource
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          {type === 'EXPERIENCE' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                  <input type="text" required value={company} onChange={e => setCompany(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                  <input type="text" required value={role} onChange={e => setRole(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Online Assessment (OA) Topics</label>
                <input type="text" required value={oaTopics} onChange={e => setOaTopics(e.target.value)} placeholder="2 Graph/DP Coding Questions..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technical Round Questions</label>
                <textarea rows={3} required value={technicalQuestions} onChange={e => setTechnicalQuestions(e.target.value)} placeholder="Round 1: LRU Cache..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preparation Tips</label>
                <textarea rows={2} required value={prepTips} onChange={e => setPrepTips(e.target.value)} placeholder="Focus on DP patterns..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Resource Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Striver SDE Sheet..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea rows={2} required value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Resource URL Link</label>
                <input type="text" required value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
              </div>
            </>
          )}

          <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 font-bold text-sm text-white shadow-lg">Submit Content</button>
        </form>
      </main>
    </div>
  );
};
