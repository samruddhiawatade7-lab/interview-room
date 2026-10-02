import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { InterviewExperiencesPage } from './pages/InterviewExperiencesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CreatePostPage } from './pages/CreatePostPage';

// Student Pages
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { SeniorSearchPage } from './pages/SeniorSearchPage';
import { SeniorProfilePage } from './pages/SeniorProfilePage';
import { StudentMentorshipsPage } from './pages/StudentMentorshipsPage';
import { StudentSessionsPage } from './pages/StudentSessionsPage';
import { ChatPage } from './pages/ChatPage';
import { StudentResumeReviewsPage } from './pages/StudentResumeReviewsPage';
import { StudentMockInterviewsPage } from './pages/StudentMockInterviewsPage';
import { StudentPreparationPage } from './pages/StudentPreparationPage';
import { CompanyApplicationsPage } from './pages/CompanyApplicationsPage';
import { BookmarksPage } from './pages/BookmarksPage';

// Senior Pages
import { SeniorDashboardPage } from './pages/SeniorDashboardPage';
import { SeniorRequestsPage } from './pages/SeniorRequestsPage';
import { SeniorSessionsPage } from './pages/SeniorSessionsPage';
import { SeniorResumeReviewsPage } from './pages/SeniorResumeReviewsPage';
import { SeniorMockInterviewsPage } from './pages/SeniorMockInterviewsPage';
import { SeniorShareExperiencePage } from './pages/SeniorShareExperiencePage';
import { SeniorAnalyticsPage } from './pages/SeniorAnalyticsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminUserManagementPage } from './pages/AdminUserManagementPage';
import { AdminContentModerationPage } from './pages/AdminContentModerationPage';
import { AdminReportsPage } from './pages/AdminReportsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#0B1416] text-white flex items-center justify-center text-xs font-bold">Loading Interview Room...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
    if (user.role === 'SENIOR') return <Navigate to="/senior/dashboard" replace />;
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0B1416] font-sans text-slate-100 flex flex-col">
          <Navbar />
          <div className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/interview-experiences" element={<InterviewExperiencesPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/create-post" element={<CreatePostPage />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentDashboardPage /></ProtectedRoute>} />
              <Route path="/student/seniors" element={<ProtectedRoute allowedRoles={['STUDENT']}><SeniorSearchPage /></ProtectedRoute>} />
              <Route path="/senior/:id" element={<SeniorProfilePage />} />
              <Route path="/student/mentorships" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentMentorshipsPage /></ProtectedRoute>} />
              <Route path="/student/sessions" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentSessionsPage /></ProtectedRoute>} />
              <Route path="/student/chat" element={<ProtectedRoute allowedRoles={['STUDENT', 'SENIOR']}><ChatPage /></ProtectedRoute>} />
              <Route path="/student/resume-reviews" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentResumeReviewsPage /></ProtectedRoute>} />
              <Route path="/student/mock-interviews" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentMockInterviewsPage /></ProtectedRoute>} />
              <Route path="/student/preparation" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentPreparationPage /></ProtectedRoute>} />
              <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['STUDENT']}><CompanyApplicationsPage /></ProtectedRoute>} />
              <Route path="/student/bookmarks" element={<ProtectedRoute allowedRoles={['STUDENT']}><BookmarksPage /></ProtectedRoute>} />

              {/* Senior Routes */}
              <Route path="/senior/dashboard" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorDashboardPage /></ProtectedRoute>} />
              <Route path="/senior/requests" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorRequestsPage /></ProtectedRoute>} />
              <Route path="/senior/sessions" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorSessionsPage /></ProtectedRoute>} />
              <Route path="/senior/resume-reviews" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorResumeReviewsPage /></ProtectedRoute>} />
              <Route path="/senior/mock-interviews" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorMockInterviewsPage /></ProtectedRoute>} />
              <Route path="/senior/share-experience" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorShareExperiencePage /></ProtectedRoute>} />
              <Route path="/senior/analytics" element={<ProtectedRoute allowedRoles={['SENIOR']}><SeniorAnalyticsPage /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUserManagementPage /></ProtectedRoute>} />
              <Route path="/admin/moderation" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminContentModerationPage /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminReportsPage /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
