import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { InterviewExperience } from '../types';
import { Briefcase, Search, ThumbsUp, Bookmark, Sparkles, Building2, BookOpen } from 'lucide-react';

export const InterviewExperiencesPage: React.FC = () => {
  const [experiences, setExperiences] = useState<InterviewExperience[]>([]);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [selectedExp, setSelectedExp] = useState<InterviewExperience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, [companyFilter, difficultyFilter]);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (companyFilter) params.company = companyFilter;
      if (difficultyFilter) params.difficulty = difficultyFilter;

      const res = await api.get('/interviews/experiences', { params });
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (id: number) => {
    try {
      const res = await api.put(`/interviews/experiences/${id}/helpful`);
      setExperiences(prev => prev.map(e => e.id === id ? { ...e, helpfulCount: res.data.helpfulCount } : e));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Interview Experience Repository</h1>
          <p className="text-slate-400 text-sm">
            Read authentic round-by-round interview questions, OA topics, and tips shared by seniors who cracked tier-1 tech placements.
          </p>
          <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold inline-block">
            ℹ️ Note: Experiences are user-submitted historical insights for preparation reference.
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 mb-8 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search experiences by company, role, or question topic..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={fetchExperiences}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs"
            >
              Filter
            </button>
          </div>

          <div className="flex space-x-3">
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
            >
              <option value="">All Companies</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Amazon">Amazon</option>
              <option value="Atlassian">Atlassian</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/50 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                    {exp.company}
                  </span>
                  <h3 className="font-bold text-lg text-white mt-2">{exp.role}</h3>
                  <div className="text-xs text-slate-400">By {exp.authorName} ('{exp.graduationYear})</div>
                </div>

                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                  exp.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {exp.difficulty}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-2">
                <div><strong>OA Topics:</strong> {exp.oaTopics}</div>
                <div><strong>Rounds:</strong> {exp.roundsCount} Interview Rounds</div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="text-xs font-bold text-indigo-400 hover:underline"
                >
                  Read Full Interview Questions →
                </button>

                <button
                  onClick={() => handleHelpful(exp.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 font-semibold border border-slate-800 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Helpful ({exp.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal */}
        {selectedExp && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              <button onClick={() => setSelectedExp(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold">✕</button>

              <h2 className="text-2xl font-bold text-white mb-1">{selectedExp.company} - {selectedExp.role}</h2>
              <div className="text-xs text-indigo-400 mb-6">Shared by {selectedExp.authorName} ({selectedExp.roundsCount} Rounds)</div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white mb-1 text-xs uppercase text-indigo-400">Online Assessment (OA)</h4>
                  <p>{selectedExp.oaTopics}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white mb-1 text-xs uppercase text-purple-400">Technical Interview Questions</h4>
                  <p className="whitespace-pre-line leading-relaxed">{selectedExp.technicalQuestions}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white mb-1 text-xs uppercase text-pink-400">HR & Leadership Questions</h4>
                  <p>{selectedExp.hrQuestions}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white mb-1 text-xs uppercase text-emerald-400">Preparation Advice & Strategy</h4>
                  <p>{selectedExp.prepTips}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
