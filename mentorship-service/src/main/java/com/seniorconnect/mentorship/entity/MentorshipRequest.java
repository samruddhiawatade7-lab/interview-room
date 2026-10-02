package com.seniorconnect.mentorship.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentorship_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorshipRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String studentName;
    private Long seniorId;
    private String seniorName;

    private String purpose; // Career Guidance, DSA Guidance, Resume Review, Mock Interview, Company Preparation, Project Guidance, General Placement Guidance
    @Column(length = 1500)
    private String message;

    private String preferredDate;
    private String preferredTime;

    private String status; // PENDING, ACCEPTED, REJECTED, CANCELLED, COMPLETED

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }
}
