import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ResumeReview } from '../types';
import { FileCheck, CheckCircle2, Clock } from 'lucide-react';

export const StudentResumeReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ResumeReview[]>([]);

  useEffect(() => {
    if (user) {
      api.get(`/resume-reviews/student/${user.id}`)
        .then(res => setReviews(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Resume Review Feedback</h1>
        <p className="text-slate-400 text-sm mb-8">Detailed formatting, ATS score, and bullet improvement feedback from seniors.</p>

        <div className="space-y-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white">Target Role: {rev.targetRole} ({rev.targetCompany})</h3>
                  <div className="text-xs text-indigo-400">Reviewed by {rev.seniorName}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {rev.status}
                </span>
              </div>

              {rev.status === 'COMPLETED' && (
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-lg font-bold text-indigo-400">{rev.formattingScore}/10</div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">Formatting</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-lg font-bold text-purple-400">{rev.atsScore}/10</div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">ATS Score</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-lg font-bold text-pink-400">{rev.skillsScore}/10</div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">Skills</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="text-lg font-bold text-emerald-400">{rev.projectsScore}/10</div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500">Projects</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div><strong className="text-white">Overall Feedback:</strong> {rev.overallFeedback}</div>
                    <div><strong className="text-indigo-400">Key Improvements:</strong> {rev.improvements}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
