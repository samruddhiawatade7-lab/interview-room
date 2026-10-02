import { SeniorProfile, MentorshipRequest, SessionBooking, ChatMessage, InterviewExperience, Resource, CompanyApplication, RedditPost } from '../types';

const initialRedditPosts: RedditPost[] = [
  {
    id: 101,
    channel: 'r/google',
    title: 'Cracked Google SWE II (Off-Campus Drive): Full 5-Round Questions & System Design Notes',
    content: 'Just received my official offer letter for Google SWE II! Here is my complete breakdown of all 5 interview rounds, including LRU cache concurrency locks, Word Ladder II DFS, and rate limiter design.',
    authorId: 3,
    authorName: 'Priya Nair',
    authorRole: 'SENIOR',
    authorCompany: 'Google',
    flair: 'Interview Experience',
    upvotes: 248,
    downvotes: 4,
    commentsCount: 36,
    difficulty: 'Hard',
    createdAt: '2 hours ago',
    oaTopics: '2 Coding Questions (Graph Shortest Path + Tree DP). 90 Mins.',
    technicalQuestions: 'Round 1: Concurrent LRU Cache with locks. Round 2: Word Ladder II. Round 3: System Design of Rate Limiter (Token Bucket).',
    hrQuestions: 'Describe a situation where you disagreed with a tech lead decision and how you handled it.',
    prepTips: 'Master LeetCode Medium/Hard DP and Graph problems. Communicate your thought process out loud!'
  },
  {
    id: 102,
    channel: 'r/microsoft',
    title: 'Microsoft Azure SDE Round 1 to 4 Complete Experience & Memory Management Questions',
    content: 'Microsoft campus placement drive breakdown. Heavy emphasis on OS fundamentals, C++ STL internal pointers, memory allocators, and Binary Tree Zigzag traversal.',
    authorId: 4,
    authorName: 'Rohan Gupta',
    authorRole: 'SENIOR',
    authorCompany: 'Microsoft',
    flair: 'Campus Drive',
    upvotes: 182,
    downvotes: 2,
    commentsCount: 22,
    difficulty: 'Medium',
    createdAt: '5 hours ago',
    oaTopics: '3 Questions on Codility (Arrays, Binary Search, Strings).',
    technicalQuestions: 'Round 1: Binary Tree Zigzag Level Order & Custom Allocators. Round 2: OS Process Scheduler. Round 3: Elevator LLD.',
    hrQuestions: 'Why Microsoft Azure? Where do you see yourself in 3 years?',
    prepTips: 'Solidify OS, DBMS, OOP fundamentals and C++ memory management.'
  },
  {
    id: 103,
    channel: 'r/amazon',
    title: 'Amazon SDE II Prep Strategy: How I Mastered all 14 Leadership Principles + Top K Frequent Elements',
    content: 'Cleared Amazon with 5 offers. Do NOT ignore the 14 Leadership Principles! Every technical round starts with 20 minutes of STAR behavioral questions.',
    authorId: 5,
    authorName: 'Ananya Verma',
    authorRole: 'SENIOR',
    authorCompany: 'Amazon',
    flair: 'Leadership Principles',
    upvotes: 310,
    downvotes: 5,
    commentsCount: 45,
    difficulty: 'Medium',
    createdAt: '1 day ago',
    oaTopics: '2 Coding Questions + Work Style Survey + Leadership Principle scenarios.',
    technicalQuestions: 'Round 1: Top K Frequent Elements & Sliding Window Max. Round 2: High Availability Cart LLD. Round 3: System Design of Photo Sharing.',
    hrQuestions: 'Customer Obsession & Bias for Action scenario questions.',
    prepTips: 'Prepare STAR stories for all 14 Leadership Principles!'
  },
  {
    id: 104,
    channel: 'r/dsa-prep',
    title: 'Striver SDE Sheet 180 Questions Roadmap: How to solve in 60 Days (Topic-wise plan)',
    content: 'Comprehensive daily schedule to complete the 180 must-solve LeetCode problems covering Arrays, Hashing, Two Pointers, Trees, Graphs, and DP.',
    authorId: 3,
    authorName: 'Priya Nair',
    authorRole: 'SENIOR',
    authorCompany: 'Google',
    flair: 'SDE Sheet',
    upvotes: 412,
    downvotes: 8,
    commentsCount: 68,
    difficulty: 'Intermediate' as any,
    createdAt: '2 days ago'
  },
  {
    id: 105,
    channel: 'r/resume-reviews',
    title: 'Senior Feedback Thread: How to boost your ATS Score from 60% to 90%+ (Bullet format examples)',
    content: 'Analyzing top mistakes in student resumes. Always quantify your impact with real metrics (e.g. "Reduced API latency by 35% using Redis caching").',
    authorId: 6,
    authorName: 'Karan Malhotra',
    authorRole: 'SENIOR',
    authorCompany: 'Atlassian',
    flair: 'ATS Optimization',
    upvotes: 295,
    downvotes: 3,
    commentsCount: 39,
    difficulty: 'Easy' as any,
    createdAt: '3 days ago'
  }
];

const initialSeniors: SeniorProfile[] = [
  {
    id: 3,
    userId: 3,
    name: 'Priya Nair',
    email: 'senior@example.com',
    college: 'IIT Delhi',
    branch: 'Computer Science',
    graduationYear: 2023,
    company: 'Google',
    role: 'Software Engineer II',
    skills: 'Java, Spring Boot, Microservices, System Design, DSA, Dynamic Programming',
    bio: 'SWE at Google. Placed via campus recruitment. Happy to help juniors with DSA, Mock Interviews, and Resume Reviews.',
    verified: true,
    rating: 4.9,
    totalReviews: 24,
    studentsHelped: 38,
    mentorshipCategories: 'Career Guidance, DSA Guidance, Resume Review, Mock Interview, Company Preparation',
    availability: 'Mon 6:00 PM - 8:00 PM, Wed 7:00 PM - 9:00 PM, Sat 10:00 AM - 1:00 PM',
    experience: '1.5 years at Google Core Infrastructure team working on distributed storage.',
    placementJourney: 'Cracked Google, Microsoft, and Directi during 2023 campus placements. Solved 450+ LeetCode problems.',
    upvotes: 540
  },
  {
    id: 4,
    userId: 4,
    name: 'Rohan Gupta',
    email: 'rohan.gupta@example.com',
    college: 'NIT Trichy',
    branch: 'Information Technology',
    graduationYear: 2023,
    company: 'Microsoft',
    role: 'Software Engineer',
    skills: 'C++, System Design, Cloud Systems, Graph Algorithms, OOP, OS',
    bio: 'SDE at Microsoft Azure team. Expert in C++, OS, DBMS, and Low Level Design.',
    verified: true,
    rating: 4.8,
    totalReviews: 18,
    studentsHelped: 29,
    mentorshipCategories: 'DSA Guidance, Mock Interview, System Design',
    availability: 'Tue & Thu 8:00 PM - 10:00 PM, Sun 11:00 AM - 2:00 PM',
    experience: '2 years at Microsoft working on Azure Compute backend.',
    placementJourney: 'Selected via Microsoft On-Campus. Focused on CS Core fundamentals and C++ STL.',
    upvotes: 420
  },
  {
    id: 5,
    userId: 5,
    name: 'Ananya Verma',
    email: 'ananya.v@example.com',
    college: 'IIIT Hyderabad',
    branch: 'Computer Science',
    graduationYear: 2022,
    company: 'Amazon',
    role: 'SDE II',
    skills: 'AWS, Distributed Systems, Python, DSA, System Design, Low Level Design',
    bio: 'SDE II at Amazon. Cracked 5 tier-1 offers during placements. Specialization in DSA and Behavioral Round prep.',
    verified: true,
    rating: 5.0,
    totalReviews: 31,
    studentsHelped: 45,
    mentorshipCategories: 'Resume Review, Mock Interview, Behavioral Guidance',
    availability: 'Mon & Fri 7:00 PM - 9:00 PM',
    experience: '3 years at Amazon AWS DynamoDB team.',
    placementJourney: 'Cleared Amazon, Adobe, Walmart, and Goldman Sachs.',
    upvotes: 610
  },
  {
    id: 6,
    userId: 6,
    name: 'Karan Malhotra',
    email: 'karan.m@example.com',
    college: 'BITS Pilani',
    branch: 'Electrical Engineering',
    graduationYear: 2023,
    company: 'Atlassian',
    role: 'Frontend Engineer',
    skills: 'React, TypeScript, Next.js, Web Performance, UI/UX, System Design',
    bio: 'Frontend Engineer at Atlassian Jira team. Non-CS background who successfully transitioned to Tier-1 Tech.',
    verified: true,
    rating: 4.9,
    totalReviews: 15,
    studentsHelped: 22,
    mentorshipCategories: 'Resume Review, Web Dev Guidance, Non-CS Transition',
    availability: 'Wed & Sat 5:00 PM - 7:00 PM',
    experience: '2 years building scalable micro-frontends.',
    placementJourney: 'Self-taught web development while solving 300+ LeetCode problems.',
    upvotes: 380
  }
];

const initialRequests: MentorshipRequest[] = [
  {
    id: 1,
    studentId: 2,
    studentName: 'Aarav Sharma',
    seniorId: 3,
    seniorName: 'Priya Nair',
    purpose: 'DSA Guidance & Mock Interview',
    message: 'Hi Priya, I am preparing for Google placement rounds and would love guidance on Dynamic Programming patterns!',
    preferredDate: '2026-10-05',
    preferredTime: '18:00 - 19:00',
    status: 'ACCEPTED'
  }
];

const initialSessions: SessionBooking[] = [
  {
    id: 1,
    requestId: 1,
    studentId: 2,
    studentName: 'Aarav Sharma',
    seniorId: 3,
    seniorName: 'Priya Nair',
    topic: 'Google Placement Mock Interview 1',
    date: '2026-10-05',
    timeSlot: '18:00 - 19:00',
    meetingUrl: 'https://meet.google.com/seniorconnect-priya-aarav',
    status: 'CONFIRMED',
    notes: 'Focus on DP & Graph algorithms.'
  }
];

const initialChatMessages: ChatMessage[] = [
  {
    id: 1,
    mentorshipRequestId: 1,
    senderId: 2,
    senderName: 'Aarav Sharma',
    senderRole: 'STUDENT',
    recipientId: 3,
    content: 'Hello Priya! Thank you for accepting my mentorship request!',
    isRead: true,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    mentorshipRequestId: 1,
    senderId: 3,
    senderName: 'Priya Nair',
    senderRole: 'SENIOR',
    recipientId: 2,
    content: 'Hi Aarav! Glad to connect. I reviewed your profile. Let us start with DP problem patterns on Monday!',
    isRead: true,
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];

const initialResources: Resource[] = [
  {
    id: 1,
    title: 'Striver SDE Sheet - Top 180 DSA Questions',
    description: 'The ultimate DSA roadmap covering Arrays, Matrix, Linked List, Greedy, Recursion, Backtracking, Trees, Graphs & Dynamic Programming.',
    category: 'DSA',
    difficulty: 'Intermediate',
    tags: 'DSA, LeetCode, Striver, SDE Sheet',
    url: 'https://takeuforward.org/strivers-sde-sheet-top-coding-interview-problems/',
    uploaderId: 3,
    uploaderName: 'Priya Nair',
    uploaderRole: 'SENIOR',
    status: 'APPROVED',
    bookmarksCount: 142
  },
  {
    id: 2,
    title: 'System Design Primer by Donne Martin',
    description: 'Comprehensive open-source guide to designing large-scale distributed systems, microservices, load balancers, caching & database indexing.',
    category: 'System Design',
    difficulty: 'Advanced',
    tags: 'System Design, LLD, HLD, Distributed Systems',
    url: 'https://github.com/donnemartin/system-design-primer',
    uploaderId: 4,
    uploaderName: 'Rohan Gupta',
    uploaderRole: 'SENIOR',
    status: 'APPROVED',
    bookmarksCount: 98
  }
];

const initialApplications: CompanyApplication[] = [
  {
    id: 1,
    studentId: 2,
    companyName: 'Google',
    role: 'Software Engineer - University Graduate',
    applicationDate: '2026-09-15',
    deadline: '2026-10-10',
    status: 'TECHNICAL_INTERVIEW',
    notes: 'Round 1 scheduled with Google SWE.',
    jobUrl: 'https://careers.google.com'
  },
  {
    id: 2,
    studentId: 2,
    companyName: 'Microsoft',
    role: 'SDE 1 - Campus Drive',
    applicationDate: '2026-09-10',
    deadline: '2026-10-05',
    status: 'OA',
    notes: 'Cleared online coding round with 100% testcases.',
    jobUrl: 'https://careers.microsoft.com'
  }
];

const getStorage = <T>(key: string, initial: T): T => {
  const saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(saved);
};

const setStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const MockDb = {
  getPosts: () => getStorage('ir_db_posts', initialRedditPosts),
  savePost: (post: RedditPost) => {
    const posts = getStorage('ir_db_posts', initialRedditPosts);
    const newPost = { ...post, id: Date.now(), upvotes: 1, downvotes: 0, commentsCount: 0, createdAt: 'Just now' };
    posts.unshift(newPost);
    setStorage('ir_db_posts', posts);
    return newPost;
  },
  votePost: (id: number, type: 'up' | 'down') => {
    const posts = getStorage('ir_db_posts', initialRedditPosts);
    const post = posts.find(p => p.id === id);
    if (post) {
      if (post.userVote === type) {
        // Toggle off
        if (type === 'up') post.upvotes--;
        else post.downvotes--;
        post.userVote = null;
      } else {
        if (post.userVote === 'up') post.upvotes--;
        if (post.userVote === 'down') post.downvotes--;

        if (type === 'up') post.upvotes++;
        else post.downvotes++;
        post.userVote = type;
      }
      setStorage('ir_db_posts', posts);
    }
    return post;
  },

  getSeniors: () => getStorage('ir_db_seniors', initialSeniors),
  saveSenior: (senior: SeniorProfile) => {
    const list = getStorage('ir_db_seniors', initialSeniors);
    const idx = list.findIndex(s => s.id === senior.id || s.userId === senior.userId);
    if (idx >= 0) list[idx] = { ...list[idx], ...senior };
    else list.push({ ...senior, id: Date.now() });
    setStorage('ir_db_seniors', list);
    return senior;
  },

  getRequests: () => getStorage('ir_db_requests', initialRequests),
  saveRequest: (req: MentorshipRequest) => {
    const list = getStorage('ir_db_requests', initialRequests);
    const newReq = { ...req, id: req.id || Date.now(), createdAt: new Date().toISOString() };
    list.push(newReq);
    setStorage('ir_db_requests', list);
    return newReq;
  },
  updateRequestStatus: (id: number, status: any) => {
    const list = getStorage('ir_db_requests', initialRequests);
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = status;
      setStorage('ir_db_requests', list);
    }
    return item;
  },

  getSessions: () => getStorage('ir_db_sessions', initialSessions),
  saveSession: (sess: SessionBooking) => {
    const list = getStorage('ir_db_sessions', initialSessions);
    const newSess = { ...sess, id: Date.now(), createdAt: new Date().toISOString() };
    list.push(newSess);
    setStorage('ir_db_sessions', list);
    return newSess;
  },

  getChatMessages: (reqId: number) => {
    const msgs = getStorage('ir_db_messages', initialChatMessages);
    return msgs.filter(m => m.mentorshipRequestId === reqId);
  },
  sendChatMessage: (msg: ChatMessage) => {
    const msgs = getStorage('ir_db_messages', initialChatMessages);
    const newMsg = { ...msg, id: Date.now(), timestamp: new Date().toISOString() };
    msgs.push(newMsg);
    setStorage('ir_db_messages', msgs);
    return newMsg;
  },

  getResources: () => getStorage('ir_db_resources', initialResources),
  saveResource: (res: Resource) => {
    const resources = getStorage('ir_db_resources', initialResources);
    const newRes = { ...res, id: Date.now(), createdAt: new Date().toISOString() };
    resources.push(newRes);
    setStorage('ir_db_resources', resources);
    return newRes;
  },

  getApplications: () => getStorage('ir_db_applications', initialApplications),
  saveApplication: (app: CompanyApplication) => {
    const apps = getStorage('ir_db_applications', initialApplications);
    const newApp = { ...app, id: Date.now() };
    apps.push(newApp);
    setStorage('ir_db_applications', apps);
    return newApp;
  },
  updateAppStatus: (id: number, status: any) => {
    const apps = getStorage('ir_db_applications', initialApplications);
    const item = apps.find(a => a.id === id);
    if (item) {
      item.status = status;
      setStorage('ir_db_applications', apps);
    }
    return item;
  }
};
