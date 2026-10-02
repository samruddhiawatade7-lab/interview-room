import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { MockInterview } from '../types';
import { Video } from 'lucide-react';

export const SeniorMockInterviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState<MockInterview[]>([]);
  const [selectedMock, setSelectedMock] = useState<MockInterview | null>(null);

  const [dsaScore, setDsaScore] = useState(9);
  const [javaScore, setJavaScore] = useState(8);
  const [communicationScore, setCommunicationScore] = useState(9);
  const [detailedFeedback, setDetailedFeedback] = useState('');

  useEffect(() => {
    if (user) fetchMocks();
  }, [user]);

  const fetchMocks = async () => {
    try {
      const res = await api.get(`/mock-interviews/senior/${user?.id}`);
      setInterviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMock) return;
    try {
      await api.put(`/mock-interviews/${selectedMock.id}/feedback`, {
        dsaScore,
        javaScore,
        communicationScore,
        detailedFeedback,
      });
      setSelectedMock(null);
      fetchMocks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Conduct Mock Interviews</h1>
        <p className="text-slate-400 text-sm mb-8">Evaluate student technical & communication performance with scorecards.</p>

        <div className="space-y-4">
          {interviews.map(mock => (
            <div key={mock.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
              <div>
                <h3 className="font-bold text-base text-white">{mock.interviewType}</h3>
                <div className="text-xs text-indigo-400">Student: {mock.studentName}</div>
              </div>

              {mock.status === 'SCHEDULED' ? (
                <button onClick={() => setSelectedMock(mock)} className="px-4 py-2 rounded-xl bg-pink-600 font-bold text-xs text-white">
                  Submit Scorecard
                </button>
              ) : (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  COMPLETED ({mock.overallScore}/10)
                </span>
              )}
            </div>
          ))}
        </div>

        {selectedMock && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
              <button onClick={() => setSelectedMock(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold">✕</button>

              <h3 className="text-xl font-bold text-white mb-4">Mock Scorecard for {selectedMock.studentName}</h3>
              <form onSubmit={handleSubmitScore} className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300">DSA Score</label>
                    <input type="number" min={1} max={10} value={dsaScore} onChange={e => setDsaScore(Number(e.target.value))} className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300">Java/Core</label>
                    <input type="number" min={1} max={10} value={javaScore} onChange={e => setJavaScore(Number(e.target.value))} className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300">Comm.</label>
                    <input type="number" min={1} max={10} value={communicationScore} onChange={e => setCommunicationScore(Number(e.target.value))} className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300">Detailed Feedback</label>
                  <textarea rows={3} required value={detailedFeedback} onChange={e => setDetailedFeedback(e.target.value)} placeholder="Excellent problem solving clarity..." className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs" />
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-pink-600 font-bold text-xs text-white">Complete Evaluation</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
