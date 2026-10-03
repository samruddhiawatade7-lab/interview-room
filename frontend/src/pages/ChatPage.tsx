import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ChatMessage, MentorshipRequest } from '../types';
import { Send, MessageSquare, User, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [activeRequest, setActiveRequest] = useState<MentorshipRequest | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadChatThreads = async () => {
        try {
          const endpoint = user.role === 'STUDENT'
            ? `/mentorship/requests/student/${user.id}`
            : `/mentorship/requests/senior/${user.id}`;
          
          const res = await api.get(endpoint);
          const accepted = res.data.filter((r: MentorshipRequest) => r.status === 'ACCEPTED');
          setRequests(accepted);
          if (accepted.length > 0) {
            setActiveRequest(accepted[0]);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadChatThreads();
    }
  }, [user]);

  useEffect(() => {
    if (activeRequest) {
      fetchMessages(activeRequest.id);
    }
  }, [activeRequest]);

  const fetchMessages = async (reqId: number) => {
    try {
      const res = await api.get(`/chat/messages/${reqId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !activeRequest || !user) return;

    const recipientId = user.role === 'STUDENT' ? activeRequest.seniorId : activeRequest.studentId;

    try {
      const res = await api.post('/chat/send', {
        mentorshipRequestId: activeRequest.id,
        senderId: user.id,
        senderName: user?.name || user?.email || 'User',
        senderRole: user.role,
        recipientId,
        content,
      });
      setMessages(prev => [...prev, res.data]);
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* THREADS SIDEBAR */}
        <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" /> Active Chats
          </h2>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {requests.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No accepted mentorship chats yet. Once a mentorship request is accepted, chat unlocks automatically!
              </div>
            ) : (
              requests.map((req) => {
                const partnerName = user?.role === 'STUDENT' ? req.seniorName : req.studentName;
                const isSelected = activeRequest?.id === req.id;
                return (
                  <div
                    key={req.id}
                    onClick={() => setActiveRequest(req)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500/50 shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-white flex items-center justify-between">
                      <span>{partnerName}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="text-xs text-indigo-300 font-medium mt-0.5">{req.purpose}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* CHAT WINDOW */}
        <div className="flex-1 flex flex-col bg-slate-950">
          {activeRequest ? (
            <>
              {/* Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">
                    {user?.role === 'STUDENT' ? activeRequest.seniorName : activeRequest.studentName}
                  </div>
                  <div className="text-xs text-slate-400">Mentorship Purpose: {activeRequest.purpose}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  MENTORSHIP ACCEPTED
                </span>
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No messages yet. Send a message to start the conversation!
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/20'
                              : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                          }`}
                        >
                          <div className="font-bold text-[10px] opacity-75 mb-1">{msg.senderName} ({msg.senderRole})</div>
                          <div>{msg.content}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your message to mentor..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Select an active mentorship thread to open chat
            </div>
          )}
        </div>

      </main>
    </div>
  );
};
