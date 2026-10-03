package com.seniorconnect.config;

import com.seniorconnect.entity.*;
import com.seniorconnect.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SeniorProfileRepository seniorProfileRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            System.out.println("Initializing MySQL database with pre-seeded demo accounts and campus feeds...");

            // 1. Create Student
            User student = User.builder()
                    .name("Aarav Sharma")
                    .email("student@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .college("COEP Technological University")
                    .branch("Computer Engineering")
                    .graduationYear(2026)
                    .role("STUDENT")
                    .karma(150)
                    .build();
            userRepository.save(student);

            // 2. Create Senior
            User senior = User.builder()
                    .name("Rohan Mehta")
                    .email("senior@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .college("COEP Technological University")
                    .branch("Computer Engineering")
                    .graduationYear(2023)
                    .role("SENIOR")
                    .company("Google")
                    .jobRole("Senior Software Engineer")
                    .isVerified(true)
                    .karma(520)
                    .build();
            senior = userRepository.save(senior);

            SeniorProfile seniorProfile = SeniorProfile.builder()
                    .userId(senior.getId())
                    .name(senior.getName())
                    .company(senior.getCompany())
                    .role(senior.getJobRole())
                    .college(senior.getCollege())
                    .graduationYear(senior.getGraduationYear())
                    .rating(4.9)
                    .studentsHelped(48)
                    .skills("DSA, System Design, Java, Distributed Systems")
                    .bio("Senior SDE at Google. Cracked 5 tier-1 offers during campus placements. Happy to help college juniors!")
                    .availability("Mon, Wed, Fri (6:00 PM - 8:00 PM)")
                    .isVerified(true)
                    .build();
            seniorProfileRepository.save(seniorProfile);

            // 3. Create Admin
            User admin = User.builder()
                    .name("Placement Cell Admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .college("COEP Technological University")
                    .role("ADMIN")
                    .karma(999)
                    .build();
            userRepository.save(admin);

            // 4. Create Initial Posts
            Post post1 = Post.builder()
                    .channel("r/on-campus-drives")
                    .title("Google L4 On-Campus Interview Experience (Cleared - 48 LPA)")
                    .content("Sharing round-by-round interview breakdown for Google campus drive. Round 1 focused on Dynamic Programming + Binary Trees, Round 2 on System Design.")
                    .authorId(senior.getId())
                    .authorName(senior.getName())
                    .authorRole("SENIOR")
                    .authorCompany("Google")
                    .flair("Interview Experience")
                    .upvotes(142)
                    .downvotes(2)
                    .commentsCount(38)
                    .oaTopics("Arrays, Sliding Window, Heap")
                    .technicalQuestions("1. Maximum Path Sum in Binary Tree\n2. Design a Rate Limiter with Redis")
                    .prepTips("Focus heavily on edge case handling and time complexity analysis.")
                    .createdAt("2 hours ago")
                    .build();
            postRepository.save(post1);

            Post post2 = Post.builder()
                    .channel("r/college-dsa-qa")
                    .title("Top 15 LeetCode Medium Questions asked in Amazon Campus Drive 2026")
                    .content("Here are the top 15 repeated DSA questions asked in Amazon online assessments over the past 3 months.")
                    .authorId(senior.getId())
                    .authorName(senior.getName())
                    .authorRole("SENIOR")
                    .authorCompany("Amazon")
                    .flair("DSA Tip")
                    .upvotes(98)
                    .downvotes(1)
                    .commentsCount(24)
                    .oaTopics("Two Pointers, Graph Traversal BFS/DFS")
                    .technicalQuestions("Course Schedule II, Meeting Rooms II")
                    .prepTips("Practice writing clean code on whiteboard without auto-complete.")
                    .createdAt("5 hours ago")
                    .build();
            postRepository.save(post2);

            System.out.println("MySQL database seeding complete!");
        }
    }
}
