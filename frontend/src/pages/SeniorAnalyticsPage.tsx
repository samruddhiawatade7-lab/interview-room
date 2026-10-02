import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SeniorReview } from '../types';
import { Star, Award, Users } from 'lucide-react';

export const SeniorAnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<SeniorReview[]>([]);

  useEffect(() => {
    if (user) {
      api.get(`/reviews/senior/${user.id}`).then(r => setReviews(r.data)).catch(console.error);
    }
  }, [user]);

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Ratings & Mentorship Stats</h1>
        <p className="text-slate-400 text-sm mb-8">Detailed student feedback breakdown and rating metrics.</p>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl mb-8">
          <h3 className="font-bold text-lg text-white">Student Review Feed ({reviews.length})</h3>
          <div className="space-y-3 divide-y divide-slate-800">
            {reviews.map(r => (
              <div key={r.id} className="pt-3">
                <div className="flex justify-between font-bold text-sm text-white">
                  <span>{r.studentName}</span>
                  <span className="text-amber-400">★ {r.rating}/5</span>
                </div>
                <div className="text-xs text-indigo-400 font-semibold mb-1">{r.categories}</div>
                <p className="text-xs text-slate-300">"{r.reviewText}"</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
