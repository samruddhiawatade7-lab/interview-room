package com.seniorconnect.auth.initializer;

import com.seniorconnect.auth.entity.User;
import com.seniorconnect.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            String encodedPassword = passwordEncoder.encode("password123");

            // Admin
            userRepository.save(User.builder()
                    .name("Platform Admin")
                    .email("admin@example.com")
                    .password(encodedPassword)
                    .role("ADMIN")
                    .college("IIT Bombay")
                    .branch("Computer Science")
                    .graduationYear(2022)
                    .verified(true)
                    .bio("SeniorConnect Platform Administrator")
                    .build());

            // Student
            userRepository.save(User.builder()
                    .name("Aarav Sharma")
                    .email("student@example.com")
                    .password(encodedPassword)
                    .role("STUDENT")
                    .college("BITS Pilani")
                    .branch("Computer Science & Engineering")
                    .graduationYear(2025)
                    .verified(true)
                    .bio("Final year CS student passionate about backend systems, algorithms, and system design. Preparing for tier-1 tech placements.")
                    .build());

            // Senior 1
            userRepository.save(User.builder()
                    .name("Priya Nair")
                    .email("senior@example.com")
                    .password(encodedPassword)
                    .role("SENIOR")
                    .college("IIT Delhi")
                    .branch("Computer Science")
                    .graduationYear(2023)
                    .company("Google")
                    .jobRole("Software Engineer II")
                    .skills("Java, Spring Boot, Microservices, System Design, DSA")
                    .verified(true)
                    .bio("SWE at Google. Placed via campus recruitment. Happy to help juniors with DSA, Mock Interviews, and Resume Reviews.")
                    .build());

            // Senior 2
            userRepository.save(User.builder()
                    .name("Rohan Gupta")
                    .email("rohan.gupta@example.com")
                    .password(encodedPassword)
                    .role("SENIOR")
                    .college("NIT Trichy")
                    .branch("Information Technology")
                    .graduationYear(2023)
                    .company("Microsoft")
                    .jobRole("Software Engineer")
                    .skills("C++, System Design, Cloud Systems, Graph Algorithms, OOP")
                    .verified(true)
                    .bio("SDE at Microsoft Azure team. Expert in C++, OS, DBMS, and Low Level Design.")
                    .build());

            // Senior 3
            userRepository.save(User.builder()
                    .name("Ananya Verma")
                    .email("ananya.v@example.com")
                    .password(encodedPassword)
                    .role("SENIOR")
                    .college("IIIT Hyderabad")
                    .branch("Computer Science")
                    .graduationYear(2022)
                    .company("Amazon")
                    .jobRole("SDE II")
                    .skills("AWS, Distributed Systems, Python, DSA, System Design")
                    .verified(true)
                    .bio("SDE II at Amazon. Cracked 5 tier-1 offers during placements. Specialization in DSA and Behavioral Round prep.")
                    .build());

            System.out.println(">>> Auth Service Demo Users Initialized Successfully!");
        }
    }
}
