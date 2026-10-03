package com.seniorconnect.repository;

import com.seniorconnect.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRole(String role);
}

@Repository
interface SeniorProfileRepository extends JpaRepository<SeniorProfile, Long> {
    Optional<SeniorProfile> findByUserId(Long userId);
    List<SeniorProfile> findByIsVerifiedTrue();
}

@Repository
interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByChannel(String channel);
}

@Repository
interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, Long> {
    List<MentorshipRequest> findByStudentId(Long studentId);
    List<MentorshipRequest> findBySeniorId(Long seniorId);
}

@Repository
interface SessionBookingRepository extends JpaRepository<SessionBooking, Long> {
    List<SessionBooking> findByStudentId(Long studentId);
    List<SessionBooking> findBySeniorId(Long seniorId);
}

@Repository
interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByMentorshipRequestIdOrderByIdAsc(Long mentorshipRequestId);
}

@Repository
interface ResumeReviewRepository extends JpaRepository<ResumeReview, Long> {
    List<ResumeReview> findByStudentId(Long studentId);
    List<ResumeReview> findBySeniorId(Long seniorId);
}

@Repository
interface MockInterviewRepository extends JpaRepository<MockInterview, Long> {
    List<MockInterview> findByStudentId(Long studentId);
    List<MockInterview> findBySeniorId(Long seniorId);
}

@Repository
interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByCategory(String category);
}

@Repository
interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientIdOrderByIdDesc(Long recipientId);
}
