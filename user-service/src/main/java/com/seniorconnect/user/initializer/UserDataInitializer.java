package com.seniorconnect.user.initializer;

import com.seniorconnect.user.entity.*;
import com.seniorconnect.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserDataInitializer implements CommandLineRunner {

    private final SeniorProfileRepository seniorProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyRepository companyRepository;
    private final DsaProgressRepository dsaProgressRepository;
    private final AptitudeProgressRepository aptitudeProgressRepository;
    private final CsTopicProgressRepository csTopicProgressRepository;
    private final CompanyApplicationRepository companyApplicationRepository;

    @Override
    public void run(String... args) throws Exception {
        if (companyRepository.count() == 0) {
            companyRepository.saveAll(List.of(
                Company.builder().name("Google").tier("Tier 1").avgPackage("32 LPA").description("Global technology leader in Search, Cloud, and AI.").logoUrl("https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Microsoft").tier("Tier 1").avgPackage("28 LPA").description("Empowering every person and organization on the planet to achieve more.").logoUrl("https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Amazon").tier("Tier 1").avgPackage("30 LPA").description("E-commerce, AWS cloud computing, and AI innovation.").logoUrl("https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Atlassian").tier("Tier 1").avgPackage("36 LPA").description("Developer & collaboration software powerhouse (Jira, Confluence).").logoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Goldman Sachs").tier("Tier 1").avgPackage("25 LPA").description("Leading global financial technology & investment banking giant.").logoUrl("https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Flipkart").tier("Product").avgPackage("26 LPA").description("India's premier e-commerce & technology platform.").logoUrl("https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Adobe").tier("Product").avgPackage("27 LPA").description("Creative cloud, digital experience & enterprise software.").logoUrl("https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80").build(),
                Company.builder().name("Uber").tier("Tier 1").avgPackage("38 LPA").description("Mobility and high-scale distributed platform engineering.").logoUrl("https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=120&q=80").build()
            ));
        }

        if (seniorProfileRepository.count() == 0) {
            seniorProfileRepository.save(SeniorProfile.builder()
                    .userId(3L)
                    .name("Priya Nair")
                    .email("senior@example.com")
                    .college("IIT Delhi")
                    .branch("Computer Science")
                    .graduationYear(2023)
                    .company("Google")
                    .role("Software Engineer II")
                    .skills("Java, Spring Boot, Microservices, System Design, DSA, Dynamic Programming")
                    .bio("SWE at Google. Placed via campus recruitment. Happy to help juniors with DSA, Mock Interviews, and Resume Reviews.")
                    .verified(true)
                    .rating(4.9)
                    .studentsHelped(38)
                    .totalReviews(24)
                    .mentorshipCategories("Career Guidance, DSA Guidance, Resume Review, Mock Interview, Company Preparation")
                    .availability("Mon 6:00 PM - 8:00 PM, Wed 7:00 PM - 9:00 PM, Sat 10:00 AM - 1:00 PM")
                    .experience("1.5 years at Google Core Infrastructure team working on distributed storage.")
                    .placementJourney("Cracked Google, Microsoft, and Directi during 2023 campus placements. Solved 450+ LeetCode problems.")
                    .build());

            seniorProfileRepository.save(SeniorProfile.builder()
                    .userId(4L)
                    .name("Rohan Gupta")
                    .email("rohan.gupta@example.com")
                    .college("NIT Trichy")
                    .branch("Information Technology")
                    .graduationYear(2023)
                    .company("Microsoft")
                    .role("Software Engineer")
                    .skills("C++, System Design, Cloud Systems, Graph Algorithms, OOP, OS")
                    .bio("SDE at Microsoft Azure team. Expert in C++, OS, DBMS, and Low Level Design.")
                    .verified(true)
                    .rating(4.8)
                    .studentsHelped(29)
                    .totalReviews(18)
                    .mentorshipCategories("DSA Guidance, Mock Interview, System Design")
                    .availability("Tue & Thu 8:00 PM - 10:00 PM, Sun 11:00 AM - 2:00 PM")
                    .experience("2 years at Microsoft working on Azure Compute backend.")
                    .placementJourney("Selected via Microsoft On-Campus. Focused on CS Core fundamentals and C++ STL.")
                    .build());

            seniorProfileRepository.save(SeniorProfile.builder()
                    .userId(5L)
                    .name("Ananya Verma")
                    .email("ananya.v@example.com")
                    .college("IIIT Hyderabad")
                    .branch("Computer Science")
                    .graduationYear(2022)
                    .company("Amazon")
                    .role("SDE II")
                    .skills("AWS, Distributed Systems, Python, DSA, System Design, Low Level Design")
                    .bio("SDE II at Amazon. Cracked 5 tier-1 offers during placements. Specialization in DSA and Behavioral Round prep.")
                    .verified(true)
                    .rating(5.0)
                    .studentsHelped(45)
                    .totalReviews(31)
                    .mentorshipCategories("Resume Review, Mock Interview, Behavioral Guidance")
                    .availability("Mon & Fri 7:00 PM - 9:00 PM")
                    .experience("3 years at Amazon AWS DynamoDB team.")
                    .placementJourney("Cleared Amazon, Adobe, Walmart, and Goldman Sachs.")
                    .build());
            
            seniorProfileRepository.save(SeniorProfile.builder()
                    .userId(6L)
                    .name("Karan Malhotra")
                    .email("karan.m@example.com")
                    .college("BITS Pilani")
                    .branch("Electrical Engineering")
                    .graduationYear(2023)
                    .company("Atlassian")
                    .role("Frontend Engineer")
                    .skills("React, TypeScript, Next.js, Web Performance, UI/UX, System Design")
                    .bio("Frontend Engineer at Atlassian Jira team. Non-CS background who successfully transitioned to Tier-1 Tech.")
                    .verified(true)
                    .rating(4.9)
                    .studentsHelped(22)
                    .totalReviews(15)
                    .mentorshipCategories("Resume Review, Web Dev Guidance, Non-CS Transition")
                    .availability("Wed & Sat 5:00 PM - 7:00 PM")
                    .experience("2 years building scalable micro-frontends.")
                    .placementJourney("Self-taught web development while solving 300+ LeetCode problems.")
                    .build());
        }

        if (studentProfileRepository.count() == 0) {
            studentProfileRepository.save(StudentProfile.builder()
                    .userId(2L)
                    .name("Aarav Sharma")
                    .email("student@example.com")
                    .college("BITS Pilani")
                    .branch("Computer Science & Engineering")
                    .graduationYear(2025)
                    .targetRole("Software Development Engineer")
                    .bio("Final year CS student passionate about backend systems, algorithms, and system design.")
                    .dsaProgressPercentage(72)
                    .aptitudeProgressPercentage(80)
                    .csProgressPercentage(68)
                    .resumeProgressPercentage(90)
                    .build());

            // Seed DSA progress
            dsaProgressRepository.saveAll(List.of(
                DsaProgress.builder().studentId(2L).topic("Arrays & Hashing").targetProblems(40).solvedProblems(35).easy(15).medium(15).hard(5).revisionStatus("Mastered").build(),
                DsaProgress.builder().studentId(2L).topic("Two Pointers & Sliding Window").targetProblems(30).solvedProblems(24).easy(10).medium(12).hard(2).revisionStatus("Mastered").build(),
                DsaProgress.builder().studentId(2L).topic("Trees & Binary Search Trees").targetProblems(45).solvedProblems(32).easy(12).medium(16).hard(4).revisionStatus("In Progress").build(),
                DsaProgress.builder().studentId(2L).topic("Graphs & BFS/DFS").targetProblems(40).solvedProblems(22).easy(8).medium(10).hard(4).revisionStatus("Needs Revision").build(),
                DsaProgress.builder().studentId(2L).topic("Dynamic Programming").targetProblems(50).solvedProblems(28).easy(10).medium(14).hard(4).revisionStatus("Needs Revision").build()
            ));

            // Seed Aptitude progress
            aptitudeProgressRepository.saveAll(List.of(
                AptitudeProgress.builder().studentId(2L).category("Quantitative - Percentages & Profit").totalAttempted(60).correctCount(52).accuracyPercentage(86.6).build(),
                AptitudeProgress.builder().studentId(2L).category("Quantitative - Time & Work").totalAttempted(45).correctCount(38).accuracyPercentage(84.4).build(),
                AptitudeProgress.builder().studentId(2L).category("Logical Reasoning - Seating & Puzzles").totalAttempted(50).correctCount(41).accuracyPercentage(82.0).build(),
                AptitudeProgress.builder().studentId(2L).category("Verbal Ability & Comprehension").totalAttempted(40).correctCount(32).accuracyPercentage(80.0).build()
            ));

            // Seed CS progress
            csTopicProgressRepository.saveAll(List.of(
                CsTopicProgress.builder().studentId(2L).subject("DBMS").topic("Indexing, B+ Trees & Transactions (ACID)").status("Completed").notes("Revised isolation levels.").build(),
                CsTopicProgress.builder().studentId(2L).subject("Operating Systems").topic("Process Synchronization & Deadlocks").status("Completed").notes("Peterson algorithm & Banker's algorithm clear.").build(),
                CsTopicProgress.builder().studentId(2L).subject("Computer Networks").topic("TCP/IP 4-way handshake & OSI layers").status("Learning").notes("Practicing subnetting questions.").build(),
                CsTopicProgress.builder().studentId(2L).subject("OOP").topic("Polymorphism, SOLID Principles & LLD").status("Completed").notes("Clean code principles reviewed.").build()
            ));

            // Seed Company Applications Kanban
            companyApplicationRepository.saveAll(List.of(
                CompanyApplication.builder().studentId(2L).companyName("Google").role("Software Engineer - University Graduate").applicationDate(LocalDate.now().minusDays(15)).deadline(LocalDate.now().plusDays(10)).status("TECHNICAL_INTERVIEW").notes("Round 1 scheduled with Google SWE.").jobUrl("https://careers.google.com").build(),
                CompanyApplication.builder().studentId(2L).companyName("Microsoft").role("SDE 1 - Campus Drive").applicationDate(LocalDate.now().minusDays(20)).deadline(LocalDate.now().plusDays(5)).status("OA").notes("Cleared online coding round with 100% testcases.").jobUrl("https://careers.microsoft.com").build(),
                CompanyApplication.builder().studentId(2L).companyName("Amazon").role("SDE Intern / FTE").applicationDate(LocalDate.now().minusDays(10)).deadline(LocalDate.now().plusDays(14)).status("APPLIED").notes("Applied with referral from Ananya.").jobUrl("https://amazon.jobs").build(),
                CompanyApplication.builder().studentId(2L).companyName("Atlassian").role("Graduate Software Engineer").applicationDate(LocalDate.now().minusDays(5)).deadline(LocalDate.now().plusDays(20)).status("WISHLIST").notes("Tailoring resume for Frontend + React requirements.").jobUrl("https://atlassian.com/careers").build()
            ));
        }

        System.out.println(">>> User Service Seed Data Preloaded Successfully!");
    }
}
