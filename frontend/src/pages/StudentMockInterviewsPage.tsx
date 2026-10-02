import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { MockInterview } from '../types';
import { Video, Star, CheckCircle2 } from 'lucide-react';

export const StudentMockInterviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState<MockInterview[]>([]);

  useEffect(() => {
    if (user) {
      api.get(`/mock-interviews/student/${user.id}`)
        .then(res => setInterviews(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Mock Interview Scorecards</h1>
        <p className="text-slate-400 text-sm mb-8">Performance evaluation graphs and detailed feedback from senior interviewers.</p>

        <div className="space-y-6">
          {interviews.map((mock) => (
            <div key={mock.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white">{mock.interviewType}</h3>
                  <div className="text-xs text-indigo-400">Interviewer: {mock.seniorName}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    {mock.status}
                  </span>
                  {mock.overallScore && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
                      Score: {mock.overallScore} / 10
                    </span>
                  )}
                </div>
              </div>

              {mock.status === 'COMPLETED' && (
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.dsaScore}/10</div><div className="text-[10px] text-slate-500">DSA</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.javaScore}/10</div><div className="text-[10px] text-slate-500">Java</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.dbmsScore}/10</div><div className="text-[10px] text-slate-500">DBMS</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.oopScore}/10</div><div className="text-[10px] text-slate-500">OOP</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.sqlScore}/10</div><div className="text-[10px] text-slate-500">SQL</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.communicationScore}/10</div><div className="text-[10px] text-slate-500">Comm.</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.problemSolvingScore}/10</div><div className="text-[10px] text-slate-500">Solving</div></div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"><div className="font-bold text-indigo-400">{mock.confidenceScore}/10</div><div className="text-[10px] text-slate-500">Confidence</div></div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-white block mb-1">Detailed Interviewer Feedback:</strong>
                    {mock.detailedFeedback}
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
