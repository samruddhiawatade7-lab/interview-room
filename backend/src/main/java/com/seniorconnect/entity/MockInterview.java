package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mock_interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MockInterview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String studentName;
    private Long seniorId;
    private String seniorName;
    private String interviewType; // Technical, HR, DSA, System Design
    private String status; // PENDING, SCHEDULED, COMPLETED

    private Double dsaRating;
    private Double systemDesignRating;
    private Double communicationRating;
    private Double overallRating;

    @Column(columnDefinition = "TEXT")
    private String feedback;
}
