import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CompanyApplication } from '../types';
import { Kanban, Plus, ExternalLink, Building2, Clock, CheckCircle2 } from 'lucide-react';

export const CompanyApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Software Engineer');
  const [status, setStatus] = useState('WISHLIST');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user) fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/applications/${user?.id}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await api.post('/applications', {
        studentId: user.id,
        companyName,
        role,
        applicationDate: new Date().toISOString().split('T')[0],
        status,
        jobUrl,
        notes,
      });
      setApplications(prev => [...prev, res.data]);
      setShowAddModal(false);
      setCompanyName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveStatus = async (appId: number, newStatus: string) => {
    try {
      await api.put(`/applications/${appId}/status`, { status: newStatus });
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus as any } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { id: 'WISHLIST', label: 'Wishlist' },
    { id: 'APPLIED', label: 'Applied' },
    { id: 'OA', label: 'Online Assessment' },
    { id: 'TECHNICAL_INTERVIEW', label: 'Technical Interview' },
    { id: 'OFFER', label: 'Offer Received 🎉' },
    { id: 'REJECTED', label: 'Rejected' },
  ];

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-[1600px]">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Company Application Kanban</h1>
            <p className="text-slate-400 text-sm">
              Track job & internship applications across stages from Wishlist to Offer.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>

        {/* KANBAN BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
          {columns.map((col) => {
            const colApps = applications.filter(a => a.status === col.id);
            return (
              <div key={col.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 flex flex-col min-h-[500px]">
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="font-bold text-xs text-slate-300 uppercase tracking-wider">{col.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-bold">
                    {colApps.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {colApps.map((app) => (
                    <div key={app.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 group shadow-md hover:border-indigo-500/50 transition-colors">
                      <div className="font-bold text-sm text-white flex items-center justify-between">
                        <span>{app.companyName}</span>
                        {app.jobUrl && (
                          <a href={app.jobUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-indigo-300 font-medium">{app.role}</div>
                      {app.notes && <div className="text-[11px] text-slate-400 italic line-clamp-2">{app.notes}</div>}

                      {/* Move status select */}
                      <div className="pt-2 border-t border-slate-900">
                        <select
                          value={app.status}
                          onChange={(e) => handleMoveStatus(app.id, e.target.value)}
                          className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 focus:outline-none"
                        >
                          {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Add Application Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
              <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold">✕</button>

              <h3 className="text-xl font-bold text-white mb-4">Track New Company Application</h3>
              <form onSubmit={handleAddApplication} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Google / Microsoft / Amazon"
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Software Engineer - Campus"
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Stage</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Referral Details</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Referred by Priya Nair. OA link received."
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white"
                >
                  Save Application
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
