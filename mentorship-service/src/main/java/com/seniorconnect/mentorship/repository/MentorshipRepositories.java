package com.seniorconnect.mentorship.repository;

import com.seniorconnect.mentorship.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, Long> {
    List<MentorshipRequest> findByStudentId(Long studentId);
    List<MentorshipRequest> findBySeniorId(Long seniorId);
}

interface AvailabilitySlotRepository extends JpaRepository<AvailabilitySlot, Long> {
    List<AvailabilitySlot> findBySeniorId(Long seniorId);
    List<AvailabilitySlot> findBySeniorIdAndIsBooked(Long seniorId, Boolean isBooked);
}

interface SessionBookingRepository extends JpaRepository<SessionBooking, Long> {
    List<SessionBooking> findByStudentId(Long studentId);
    List<SessionBooking> findBySeniorId(Long seniorId);
    boolean existsBySeniorIdAndDateAndTimeSlotAndStatusNot(Long seniorId, String date, String timeSlot, String status);
}

interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByMentorshipRequestIdOrderByTimestampAsc(Long mentorshipRequestId);
    long countByRecipientIdAndIsReadFalse(Long recipientId);
}

interface SeniorReviewRepository extends JpaRepository<SeniorReview, Long> {
    List<SeniorReview> findBySeniorId(Long seniorId);
    boolean existsBySeniorIdAndStudentId(Long seniorId, Long studentId);
}
