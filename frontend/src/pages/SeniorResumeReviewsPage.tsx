import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ResumeReview } from '../types';
import { FileCheck, ExternalLink } from 'lucide-react';

export const SeniorResumeReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ResumeReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<ResumeReview | null>(null);

  const [formattingScore, setFormattingScore] = useState(9);
  const [atsScore, setAtsScore] = useState(9);
  const [skillsScore, setSkillsScore] = useState(8);
  const [projectsScore, setProjectsScore] = useState(9);
  const [overallFeedback, setOverallFeedback] = useState('');
  const [improvements, setImprovements] = useState('');

  useEffect(() => {
    if (user) fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/resume-reviews/senior/${user?.id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview) return;
    try {
      await api.put(`/resume-reviews/${selectedReview.id}/feedback`, {
        formattingScore,
        atsScore,
        skillsScore,
        projectsScore,
        overallFeedback,
        improvements,
      });
      setSelectedReview(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Student Resume Reviews</h1>
        <p className="text-slate-400 text-sm mb-8">Review submitted student resumes and provide detailed ATS and formatting feedback.</p>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{rev.studentName}</h3>
                  <div className="text-xs text-indigo-400">Target Role: {rev.targetRole} ({rev.targetCompany})</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${rev.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                  {rev.status}
                </span>
              </div>

              {rev.status === 'PENDING' && (
                <button
                  onClick={() => setSelectedReview(rev)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 font-bold text-xs text-white"
                >
                  Submit Resume Review Feedback
                </button>
              )}
            </div>
          ))}
        </div>

        {selectedReview && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
              <button onClick={() => setSelectedReview(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold">✕</button>

              <h3 className="text-xl font-bold text-white mb-4">Resume Review for {selectedReview.studentName}</h3>
              <form onSubmit={handleSubmitFeedback} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">Formatting Score (1-10)</label>
                    <input type="number" min={1} max={10} value={formattingScore} onChange={e => setFormattingScore(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">ATS Score (1-10)</label>
                    <input type="number" min={1} max={10} value={atsScore} onChange={e => setAtsScore(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300">Overall Feedback</label>
                  <textarea rows={2} required value={overallFeedback} onChange={e => setOverallFeedback(e.target.value)} placeholder="Strong resume format..." className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300">Key Improvements</label>
                  <textarea rows={2} required value={improvements} onChange={e => setImprovements(e.target.value)} placeholder="Quantify project impact..." className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 font-bold text-xs text-white">Complete Review</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
