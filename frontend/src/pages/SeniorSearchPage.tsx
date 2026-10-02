import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { SeniorProfile } from '../types';
import { Search, Filter, CheckCircle2, Star, Users, Briefcase, GraduationCap, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SeniorSearchPage: React.FC = () => {
  const [seniors, setSeniors] = useState<SeniorProfile[]>([]);
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<boolean | ''>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeniors();
  }, [companyFilter, roleFilter, skillFilter, verifiedFilter]);

  const fetchSeniors = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (companyFilter) params.company = companyFilter;
      if (roleFilter) params.role = roleFilter;
      if (skillFilter) params.skill = skillFilter;
      if (verifiedFilter !== '') params.verified = verifiedFilter;

      const res = await api.get('/seniors', { params });
      setSeniors(res.data);
    } catch (err) {
      console.error('Failed to fetch seniors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSeniors();
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        
        {/* Header Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Find Senior Mentors</h1>
          <p className="text-slate-400 text-sm">
            Search & connect with verified seniors from top tech companies for 1-on-1 placement guidance, mock interviews, and resume reviews.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 mb-8 space-y-4 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search seniors by name, company (Google, Microsoft, Amazon), role, or skill..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              Search
            </button>
          </form>

          {/* Filters dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</label>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Companies</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Amazon">Amazon</option>
                <option value="Atlassian">Atlassian</option>
                <option value="Goldman Sachs">Goldman Sachs</option>
                <option value="Uber">Uber</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Skill</label>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Skills</option>
                <option value="DSA">DSA</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="System Design">System Design</option>
                <option value="React">React</option>
                <option value="Microservices">Microservices</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Verification Badge</label>
              <select
                value={verifiedFilter === '' ? '' : String(verifiedFilter)}
                onChange={(e) => setVerifiedFilter(e.target.value === '' ? '' : e.target.value === 'true')}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Mentors</option>
                <option value="true">Verified Seniors Only ✓</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => { setSearch(''); setCompanyFilter(''); setRoleFilter(''); setSkillFilter(''); setVerifiedFilter(''); }}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* SENIOR CARDS GRID */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">Loading senior mentors from database...</div>
        ) : seniors.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-sm">
            No senior mentors found matching your filter criteria. Try resetting filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seniors.map((senior) => (
              <div
                key={senior.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  
                  {/* Top Row: Avatar & Rating */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
                        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-indigo-300 text-lg">
                          {senior.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white flex items-center gap-1.5 group-hover:text-indigo-300 transition-colors">
                          {senior.name}
                          {senior.verified && (
                            <span title="Verified Senior">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            </span>
                          )}
                        </h3>
                        <div className="text-xs text-indigo-400 font-semibold">{senior.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{senior.rating || 4.9}</span>
                    </div>
                  </div>

                  {/* Company & College */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-slate-300 gap-2 font-medium">
                      <Briefcase className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{senior.company}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-400 gap-2">
                      <GraduationCap className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{senior.college} ('{senior.graduationYear})</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-400 gap-2">
                      <Users className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{senior.studentsHelped || 25}+ students helped</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {senior.skills.split(',').slice(0, 4).map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-300 text-[11px] font-medium border border-slate-800">
                        {sk.trim()}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Action */}
                <Link
                  to={`/senior/${senior.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-bold text-center transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Profile & Book Mentorship</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
