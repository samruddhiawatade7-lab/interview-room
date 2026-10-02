package com.seniorconnect.interview.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String studentName;
    private Long seniorId;
    private String seniorName;

    private String resumeUrl;
    private String targetRole;
    private String targetCompany;
    @Column(length = 1000)
    private String studentMessage;

    private String status; // PENDING, IN_REVIEW, COMPLETED

    private Integer formattingScore; // 1-10
    private Integer atsScore; // 1-10
    private Integer skillsScore; // 1-10
    private Integer projectsScore; // 1-10

    @Column(length = 2000)
    private String overallFeedback;
    @Column(length = 1500)
    private String improvements;

    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }
}
