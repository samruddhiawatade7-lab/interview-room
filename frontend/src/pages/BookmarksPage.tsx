import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Resource } from '../types';
import { Bookmark, ExternalLink } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Resource[]>([]);

  useEffect(() => {
    if (user) {
      api.get(`/resources/bookmarks/${user.id}`)
        .then(res => setBookmarks(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Saved Bookmarks</h1>
        <p className="text-slate-400 text-sm mb-8">Your saved placement resources, SDE sheets, and system design roadmaps.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((res) => (
            <div key={res.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30">
                  {res.category}
                </span>
                <h3 className="font-bold text-base text-white mt-3 mb-2">{res.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{res.description}</p>
              </div>
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Open Resource Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
