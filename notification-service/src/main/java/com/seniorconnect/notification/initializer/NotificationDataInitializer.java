package com.seniorconnect.notification.initializer;

import com.seniorconnect.notification.entity.Notification;
import com.seniorconnect.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationDataInitializer implements CommandLineRunner {

    private final NotificationRepository notificationRepository;

    @Override
    public void run(String... args) throws Exception {
        if (notificationRepository.count() == 0) {
            notificationRepository.saveAll(List.of(
                Notification.builder()
                    .recipientId(2L)
                    .title("Mentorship Request Accepted! 🎉")
                    .message("Priya Nair (SWE at Google) has accepted your mentorship request!")
                    .type("MENTORSHIP_ACCEPTED")
                    .linkUrl("/student/chat")
                    .isRead(false)
                    .build(),

                Notification.builder()
                    .recipientId(2L)
                    .title("Mock Interview Scheduled 📅")
                    .message("Your Google Technical Mock Interview with Priya Nair is scheduled for Oct 5, 6:00 PM.")
                    .type("SESSION_BOOKED")
                    .linkUrl("/student/sessions")
                    .isRead(true)
                    .build(),

                Notification.builder()
                    .recipientId(2L)
                    .title("Resume Review Completed 📄")
                    .message("Priya Nair completed your resume review with detailed formatting & ATS feedback.")
                    .type("RESUME_COMPLETED")
                    .linkUrl("/student/resume-reviews")
                    .isRead(true)
                    .build(),

                Notification.builder()
                    .recipientId(3L)
                    .title("New Mentorship Request 📩")
                    .message("Aarav Sharma requested mentorship for DSA Guidance & Google Placement Preparation.")
                    .type("MENTORSHIP_REQUEST")
                    .linkUrl("/senior/requests")
                    .isRead(true)
                    .build()
            ));

            System.out.println(">>> Notification Service Seed Data Initialized Successfully!");
        }
    }
}
