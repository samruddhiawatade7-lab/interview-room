package com.seniorconnect.interview.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mock_interviews")
@Getter
@Setter
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

    private String interviewType; // Technical, HR, DSA, Java, SQL, Resume-based
    private String status; // SCHEDULED, COMPLETED, CANCELLED

    private Integer dsaScore;
    private Integer javaScore;
    private Integer dbmsScore;
    private Integer oopScore;
    private Integer sqlScore;
    private Integer communicationScore;
    private Integer problemSolvingScore;
    private Integer confidenceScore;

    private Double overallScore;
    @Column(length = 2000)
    private String detailedFeedback;

    private LocalDateTime scheduledAt;
    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        if (scheduledAt == null) scheduledAt = LocalDateTime.now();
        if (status == null) status = "SCHEDULED";
    }
}
