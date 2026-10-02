import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { Resource } from '../types';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Search, Bookmark, ExternalLink, Sparkles } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [category]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await api.get('/resources', { params });
      setResources(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (resourceId: number) => {
    if (!user) return;
    try {
      await api.post(`/resources/bookmarks/${user.id}/${resourceId}`);
      fetchResources();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ['All', 'DSA', 'System Design', 'DBMS', 'OS', 'CN', 'OOP', 'SQL', 'Spring Boot'];

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Placement Resource Hub</h1>
          <p className="text-slate-400 text-sm">
            Curated SDE sheets, System Design guides, SQL question banks, and CS theory roadmaps uploaded by seniors.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === 'All' ? '' : cat)}
              className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all ${
                (category === '' && cat === 'All') || category === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources by title, tag, or topic..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button onClick={fetchResources} className="px-6 py-3 rounded-2xl bg-indigo-600 font-bold text-xs">Search</button>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div key={res.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30">
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{res.difficulty}</span>
                </div>

                <h3 className="font-bold text-base text-white mb-2">{res.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{res.description}</p>
              </div>

              <div>
                <div className="text-[11px] text-indigo-400 mb-4 font-medium">Uploaded by {res.uploaderName}</div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {user && (
                    <button
                      onClick={() => handleBookmark(res.id)}
                      className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                      title="Bookmark"
                    >
                      <Bookmark className="w-4 h-4 text-indigo-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};
