import axios from 'axios';
import { MockDb } from './mockDb';

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('interviewroom_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config._isRetry) {
      return Promise.reject(error);
    }

    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || (error.response && error.response.status >= 500)) {
      const url = config.url || '';
      const method = (config.method || 'get').toLowerCase();
      let data: any = null;

      try {
        if (url.includes('/auth/login')) {
          const body = JSON.parse(config.data || '{}');
          const role = body.email.includes('admin') ? 'ADMIN' : body.email.includes('senior') ? 'SENIOR' : 'STUDENT';
          data = {
            accessToken: 'mock_jwt_token_interviewroom_' + Date.now(),
            user: {
              id: role === 'ADMIN' ? 1 : role === 'SENIOR' ? 3 : 2,
              name: role === 'ADMIN' ? 'Platform Admin' : role === 'SENIOR' ? 'Priya Nair' : 'Aarav Sharma',
              email: body.email,
              role,
              college: 'BITS Pilani',
              branch: 'Computer Science',
              graduationYear: 2025,
              company: role === 'SENIOR' ? 'Google' : undefined,
              jobRole: role === 'SENIOR' ? 'Software Engineer II' : undefined,
              verified: true,
              bio: 'Interview Room Community Member',
              karma: 420
            }
          };
        } else if (url.includes('/posts/vote')) {
          const body = JSON.parse(config.data || '{}');
          data = MockDb.votePost(body.postId, body.type);
        } else if (url.includes('/posts') && method === 'get') {
          data = MockDb.getPosts();
        } else if (url.includes('/posts') && method === 'post') {
          data = MockDb.savePost(JSON.parse(config.data));
        } else if (url.includes('/seniors') && method === 'get') {
          data = MockDb.getSeniors();
        } else if (url.includes('/mentorship/requests') && method === 'get') {
          data = MockDb.getRequests();
        } else if (url.includes('/mentorship/requests') && method === 'post') {
          data = MockDb.saveRequest(JSON.parse(config.data));
        } else if (url.includes('/requests/') && url.includes('/accept')) {
          const id = parseInt(url.split('/requests/')[1].split('/')[0]);
          data = MockDb.updateRequestStatus(id, 'ACCEPTED');
        } else if (url.includes('/sessions/book') && method === 'post') {
          data = MockDb.saveSession(JSON.parse(config.data));
        } else if (url.includes('/sessions') && method === 'get') {
          data = MockDb.getSessions();
        } else if (url.includes('/chat/messages') && method === 'get') {
          const reqId = parseInt(url.split('/chat/messages/')[1] || '1');
          data = MockDb.getChatMessages(reqId);
        } else if (url.includes('/chat/send') && method === 'post') {
          data = MockDb.sendChatMessage(JSON.parse(config.data));
        } else if (url.includes('/interviews/experiences') && method === 'get') {
          data = MockDb.getPosts().filter(p => p.flair === 'Interview Experience' || p.channel.includes('google') || p.channel.includes('microsoft'));
        } else if (url.includes('/resources') && method === 'get') {
          data = MockDb.getResources();
        } else if (url.includes('/applications') && method === 'get') {
          data = MockDb.getApplications();
        } else if (url.includes('/applications') && method === 'post') {
          data = MockDb.saveApplication(JSON.parse(config.data));
        } else if (url.includes('/applications/') && url.includes('/status')) {
          const id = parseInt(url.split('/applications/')[1].split('/')[0]);
          const body = JSON.parse(config.data);
          data = MockDb.updateAppStatus(id, body.status);
        } else if (url.includes('/notifications')) {
          data = [
            { id: 1, recipientId: 2, title: 'r/google Upvote Notification 🔥', message: 'Priya Nair upvoted your comment in r/google!', type: 'UPVOTE', linkUrl: '/', isRead: false },
            { id: 2, recipientId: 2, title: 'Mentorship Request Accepted 🎉', message: 'Priya Nair (SWE at Google) accepted your mentorship request!', type: 'MENTORSHIP_ACCEPTED', linkUrl: '/student/chat', isRead: false }
          ];
        } else {
          data = [];
        }

        return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
      } catch (fallbackErr) {
        console.error('Fallback handling error:', fallbackErr);
      }
    }

    return Promise.reject(error);
  }
);
