export interface User {
  id: number;
  name: string;
  email: string;
  role: 'STUDENT' | 'SENIOR' | 'ADMIN';
  college?: string;
  branch?: string;
  graduationYear?: number;
  company?: string;
  jobRole?: string;
  skills?: string;
  verified?: boolean;
  bio?: string;
  karma?: number;
}

export interface SeniorProfile {
  id: number;
  userId: number;
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: number;
  company: string;
  role: string;
  skills: string;
  bio: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  studentsHelped: number;
  mentorshipCategories: string;
  availability: string;
  experience?: string;
  placementJourney?: string;
  avatarUrl?: string;
  upvotes?: number;
}

export interface StudentProfile {
  id: number;
  userId: number;
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: number;
  targetRole: string;
  bio: string;
  dsaProgressPercentage: number;
  aptitudeProgressPercentage: number;
  csProgressPercentage: number;
  resumeProgressPercentage: number;
}

export interface RedditPost {
  id: number;
  channel: string;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
  flair: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  commentsCount: number;
  createdAt: string;
  oaTopics?: string;
  technicalQuestions?: string;
  hrQuestions?: string;
  prepTips?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface MentorshipRequest {
  id: number;
  studentId: number;
  studentName: string;
  seniorId: number;
  seniorName: string;
  purpose: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
  createdAt?: string;
}

export interface AvailabilitySlot {
  id: number;
  seniorId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface SessionBooking {
  id: number;
  requestId?: number;
  studentId: number;
  studentName: string;
  seniorId: number;
  seniorName: string;
  topic: string;
  date: string;
  timeSlot: string;
  meetingUrl: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface ChatMessage {
  id: number;
  mentorshipRequestId: number;
  senderId: number;
  senderName: string;
  senderRole: 'STUDENT' | 'SENIOR';
  recipientId: number;
  content: string;
  isRead: boolean;
  timestamp: string;
}

export interface SeniorReview {
  id: number;
  seniorId: number;
  studentId: number;
  studentName: string;
  rating: number;
  categories: string;
  reviewText: string;
  createdAt?: string;
}

export interface InterviewExperience {
  id: number;
  seniorId: number;
  authorName: string;
  company: string;
  role: string;
  graduationYear: number;
  roundsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  oaTopics: string;
  technicalQuestions: string;
  hrQuestions: string;
  prepTips: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  helpfulCount: number;
  createdAt?: string;
}

export interface MockInterview {
  id: number;
  studentId: number;
  studentName: string;
  seniorId: number;
  seniorName: string;
  interviewType: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  dsaScore?: number;
  javaScore?: number;
  dbmsScore?: number;
  oopScore?: number;
  sqlScore?: number;
  communicationScore?: number;
  problemSolvingScore?: number;
  confidenceScore?: number;
  overallScore?: number;
  detailedFeedback?: string;
  scheduledAt?: string;
  completedAt?: string;
}

export interface ResumeReview {
  id: number;
  studentId: number;
  studentName: string;
  seniorId: number;
  seniorName: string;
  resumeUrl: string;
  targetRole: string;
  targetCompany: string;
  studentMessage: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED';
  formattingScore?: number;
  atsScore?: number;
  skillsScore?: number;
  projectsScore?: number;
  overallFeedback?: string;
  improvements?: string;
  createdAt?: string;
  completedAt?: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string;
  url: string;
  uploaderId: number;
  uploaderName: string;
  uploaderRole: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  bookmarksCount: number;
  createdAt?: string;
}

export interface Notification {
  id: number;
  recipientId: number;
  title: string;
  message: string;
  type: string;
  linkUrl: string;
  isRead: boolean;
  createdAt?: string;
}

export interface CompanyApplication {
  id: number;
  studentId: number;
  companyName: string;
  role: string;
  applicationDate: string;
  deadline?: string;
  status: 'WISHLIST' | 'APPLIED' | 'OA' | 'SHORTLISTED' | 'TECHNICAL_INTERVIEW' | 'HR_INTERVIEW' | 'OFFER' | 'REJECTED' | 'WITHDRAWN';
  jobUrl?: string;
  notes?: string;
}

export interface DsaProgress {
  id: number;
  studentId: number;
  topic: string;
  targetProblems: number;
  solvedProblems: number;
  easy: number;
  medium: number;
  hard: number;
  revisionStatus: string;
}

export interface AptitudeProgress {
  id: number;
  studentId: number;
  category: string;
  totalAttempted: number;
  correctCount: number;
  accuracyPercentage: number;
}

export interface CsTopicProgress {
  id: number;
  studentId: number;
  subject: string;
  topic: string;
  status: string;
  notes?: string;
}
