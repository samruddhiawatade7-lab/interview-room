package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mentorship_requests")
@Data
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
    private String purpose;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String preferredDate;
    private String preferredTime;
    private String status; // PENDING, ACCEPTED, REJECTED, CANCELLED, COMPLETED
}
