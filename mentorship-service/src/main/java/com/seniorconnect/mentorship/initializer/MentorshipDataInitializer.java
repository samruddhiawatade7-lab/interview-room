package com.seniorconnect.mentorship.initializer;

import com.seniorconnect.mentorship.entity.*;
import com.seniorconnect.mentorship.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MentorshipDataInitializer implements CommandLineRunner {

    private final MentorshipRequestRepository mentorshipRequestRepository;
    private final AvailabilitySlotRepository availabilitySlotRepository;
    private final SessionBookingRepository sessionBookingRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SeniorReviewRepository seniorReviewRepository;

    @Override
    public void run(String... args) throws Exception {
        if (mentorshipRequestRepository.count() == 0) {
            // Seed Accepted Request between Student 2 (Aarav) and Senior 3 (Priya)
            MentorshipRequest req1 = mentorshipRequestRepository.save(MentorshipRequest.builder()
                    .studentId(2L)
                    .studentName("Aarav Sharma")
                    .seniorId(3L)
                    .seniorName("Priya Nair")
                    .purpose("DSA Guidance & Mock Interview")
                    .message("Hi Priya, I am preparing for Google placement rounds and would love guidance on Dynamic Programming patterns and mock interview practice!")
                    .preferredDate("2026-10-05")
                    .preferredTime("18:00 - 19:00")
                    .status("ACCEPTED")
                    .build());

            // Seed Pending Request with Rohan
            mentorshipRequestRepository.save(MentorshipRequest.builder()
                    .studentId(2L)
                    .studentName("Aarav Sharma")
                    .seniorId(4L)
                    .seniorName("Rohan Gupta")
                    .purpose("Resume Review")
                    .message("Hi Rohan, please review my resume for Microsoft Software Engineer application.")
                    .preferredDate("2026-10-08")
                    .preferredTime("20:00 - 20:30")
                    .status("PENDING")
                    .build());

            // Seed Availability slots
            availabilitySlotRepository.saveAll(List.of(
                AvailabilitySlot.builder().seniorId(3L).dayOfWeek("Monday").startTime("18:00").endTime("19:00").isBooked(true).build(),
                AvailabilitySlot.builder().seniorId(3L).dayOfWeek("Wednesday").startTime("19:00").endTime("20:00").isBooked(false).build(),
                AvailabilitySlot.builder().seniorId(3L).dayOfWeek("Saturday").startTime("10:00").endTime("11:30").isBooked(false).build(),
                AvailabilitySlot.builder().seniorId(4L).dayOfWeek("Tuesday").startTime("20:00").endTime("21:00").isBooked(false).build()
            ));

            // Seed Session Booking
            sessionBookingRepository.save(SessionBooking.builder()
                    .requestId(req1.getId())
                    .studentId(2L)
                    .studentName("Aarav Sharma")
                    .seniorId(3L)
                    .seniorName("Priya Nair")
                    .topic("Google Placement Mock Interview 1")
                    .date("2026-10-05")
                    .timeSlot("18:00 - 19:00")
                    .meetingUrl("https://meet.google.com/seniorconnect-priya-aarav")
                    .status("CONFIRMED")
                    .notes("Focus on DP & Graph algorithms.")
                    .build());

            // Seed Chat Messages
            chatMessageRepository.saveAll(List.of(
                ChatMessage.builder().mentorshipRequestId(req1.getId()).senderId(2L).senderName("Aarav Sharma").senderRole("STUDENT").recipientId(3L).content("Hello Priya! Thank you for accepting my mentorship request!").isRead(true).build(),
                ChatMessage.builder().mentorshipRequestId(req1.getId()).senderId(3L).senderName("Priya Nair").senderRole("SENIOR").recipientId(2L).content("Hi Aarav! Glad to connect. I reviewed your profile. Let's start with DP problem patterns on Monday!").isRead(true).build(),
                ChatMessage.builder().mentorshipRequestId(req1.getId()).senderId(2L).senderName("Aarav Sharma").senderRole("STUDENT").recipientId(3L).content("Sounds great! I have uploaded my resume and updated my DSA tracker. Looking forward to our session.").isRead(false).build()
            ));

            // Seed Senior Reviews
            seniorReviewRepository.saveAll(List.of(
                SeniorReview.builder().seniorId(3L).studentId(10L).studentName("Rohan Verma").rating(5).categories("Helpfulness, Guidance").reviewText("Priya's advice on DP patterns was a game-changer! Highly recommended for Google prep.").build(),
                SeniorReview.builder().seniorId(3L).studentId(11L).studentName("Neha Patel").rating(5).categories("Communication, Knowledge").reviewText("Clear explanation of system design and very constructive resume review feedback.").build(),
                SeniorReview.builder().seniorId(4L).studentId(12L).studentName("Siddharth Rao").rating(5).categories("Mock Interview").reviewText("Great C++ and OS mock interview session with Rohan!").build()
            ));

            System.out.println(">>> Mentorship Service Seed Data Initialized Successfully!");
        }
    }
}
