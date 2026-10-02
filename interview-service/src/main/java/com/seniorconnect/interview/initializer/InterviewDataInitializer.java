package com.seniorconnect.interview.initializer;

import com.seniorconnect.interview.entity.*;
import com.seniorconnect.interview.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InterviewDataInitializer implements CommandLineRunner {

    private final InterviewExperienceRepository experienceRepository;
    private final MockInterviewRepository mockInterviewRepository;
    private final ResumeReviewRepository resumeReviewRepository;

    @Override
    public void run(String... args) throws Exception {
        if (experienceRepository.count() == 0) {
            experienceRepository.saveAll(List.of(
                InterviewExperience.builder()
                    .seniorId(3L).authorName("Priya Nair").company("Google").role("Software Engineer II").graduationYear(2023).roundsCount(5).difficulty("Hard")
                    .oaTopics("2 Coding Questions (Graph Shortest Path + Dynamic Programming on Trees). 90 Mins.")
                    .technicalQuestions("Round 1: LRU Cache implementation with concurrency locks. Round 2: Word Ladder II (BFS + DFS Backtracking). Round 3: System Design of a distributed Rate Limiter (Token Bucket).")
                    .hrQuestions("Googleyness & Leadership: Describe a scenario where you disagreed with a team decision and how you handled it.")
                    .prepTips("Master LeetCode Medium/Hard DP and Graph problems. Communicate your thoughts aloud constantly!")
                    .status("APPROVED").helpfulCount(48).build(),

                InterviewExperience.builder()
                    .seniorId(4L).authorName("Rohan Gupta").company("Microsoft").role("Software Engineer").graduationYear(2023).roundsCount(4).difficulty("Medium")
                    .oaTopics("3 Coding Questions on Codility (Arrays, Binary Search, String Manipulation).")
                    .technicalQuestions("Round 1: Binary Tree Zigzag Level Order Traversal & Custom C++ Allocator concepts. Round 2: Design OS Process Scheduler. Round 3: Low Level Design of Elevator System.")
                    .hrQuestions("Why Microsoft? Where do you see yourself in 3 years in Azure cloud engineering?")
                    .prepTips("Solidify OS, DBMS, OOP fundamentals and C++ memory management.")
                    .status("APPROVED").helpfulCount(36).build(),

                InterviewExperience.builder()
                    .seniorId(5L).authorName("Ananya Verma").company("Amazon").role("SDE II").graduationYear(2022).roundsCount(4).difficulty("Medium")
                    .oaTopics("2 Coding Questions + Work Style Survey + Amazon Leadership Principles scenario questions.")
                    .technicalQuestions("Round 1: Top K Frequent Elements & Sliding Window Maximum. Round 2: Design Amazon Cart Service with High Availability (LLD). Round 3: System Design of Photo Sharing App.")
                    .hrQuestions("Behavioral round based on 14 Leadership Principles (Customer Obsession, Ownership, Bias for Action).")
                    .prepTips("Prepare STAR method stories for all 14 Leadership Principles! Code cleanliness matters heavily.")
                    .status("APPROVED").helpfulCount(52).build(),

                InterviewExperience.builder()
                    .seniorId(6L).authorName("Karan Malhotra").company("Atlassian").role("Frontend Engineer").graduationYear(2023).roundsCount(4).difficulty("Medium")
                    .oaTopics("JavaScript/TypeScript async coding round + React Component state management challenge.")
                    .technicalQuestions("Round 1: Build an auto-complete search bar with debounce, throttling and keyboard navigation. Round 2: Implement custom Promises & Event Emitter in JS.")
                    .hrQuestions("Values Alignment Round: Open company, no bullshit culture, teamwork scenarios.")
                    .prepTips("Deep dive into Vanilla JS fundamentals, DOM API, and React performance optimizations.")
                    .status("APPROVED").helpfulCount(29).build(),

                InterviewExperience.builder()
                    .seniorId(3L).authorName("Priya Nair").company("Goldman Sachs").role("Software Analyst").graduationYear(2023).roundsCount(3).difficulty("Hard")
                    .oaTopics("Math/Aptitude + 2 Coding Questions (DP + Matrix Traversal).")
                    .technicalQuestions("Round 1: Trapping Rain Water & Median of Two Sorted Arrays. Round 2: Database Indexing, B+ Trees, and SQL Window Functions.")
                    .hrQuestions("Why Finance Tech? How do you handle high pressure project deadlines?")
                    .prepTips("Brush up on probability, statistics, and advanced SQL alongside LeetCode hard DSA.")
                    .status("APPROVED").helpfulCount(31).build(),

                InterviewExperience.builder()
                    .seniorId(4L).authorName("Rohan Gupta").company("Uber").role("SDE 1").graduationYear(2023).roundsCount(5).difficulty("Hard")
                    .oaTopics("4 Coding Questions on Codesignal (Graph, DP, String Tries).")
                    .technicalQuestions("Round 1: Design Driver Matching Service using QuadTree / H3 Spatial Indexing. Round 2: Merge K Sorted Lists & Alien Dictionary.")
                    .hrQuestions("Describe a technical challenge where you failed and what you learned.")
                    .prepTips("Master spatial data structures and distributed system trade-offs.")
                    .status("APPROVED").helpfulCount(44).build()
            ));

            // Seed Mock Interview
            mockInterviewRepository.save(MockInterview.builder()
                    .studentId(2L)
                    .studentName("Aarav Sharma")
                    .seniorId(3L)
                    .seniorName("Priya Nair")
                    .interviewType("Technical - DSA & Java")
                    .status("COMPLETED")
                    .dsaScore(9)
                    .javaScore(8)
                    .dbmsScore(8)
                    .oopScore(9)
                    .sqlScore(8)
                    .communicationScore(9)
                    .problemSolvingScore(9)
                    .confidenceScore(8)
                    .overallScore(8.5)
                    .detailedFeedback("Aarav demonstrated excellent problem solving on the Trie and Graph BFS questions. Strong clarity in communicating time and space complexity. Suggested polishing concurrency locks in Spring Boot.")
                    .scheduledAt(LocalDateTime.now().minusDays(3))
                    .completedAt(LocalDateTime.now().minusDays(3))
                    .build());

            // Seed Resume Review
            resumeReviewRepository.save(ResumeReview.builder()
                    .studentId(2L)
                    .studentName("Aarav Sharma")
                    .seniorId(3L)
                    .seniorName("Priya Nair")
                    .targetRole("Software Engineer")
                    .targetCompany("Google")
                    .studentMessage("Please review my ATS score and project section formatting.")
                    .resumeUrl("https://example.com/resumes/aarav_sharma_resume.pdf")
                    .status("COMPLETED")
                    .formattingScore(9)
                    .atsScore(9)
                    .skillsScore(8)
                    .projectsScore(9)
                    .overallFeedback("Strong resume structure! Project descriptions clearly quantify impact (e.g. reduced latency by 35%). ATS score is excellent.")
                    .improvements("Add bullet points highlighting Docker and Spring Cloud Gateway experience under microservices project.")
                    .completedAt(LocalDateTime.now().minusDays(2))
                    .build());

            System.out.println(">>> Interview Service Seed Data Initialized Successfully!");
        }
    }
}
