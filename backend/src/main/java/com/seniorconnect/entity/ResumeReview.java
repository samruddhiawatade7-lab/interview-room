package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resume_reviews")
@Data
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

    @Column(columnDefinition = "TEXT")
    private String studentMessage;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private String status; // PENDING, IN_REVIEW, COMPLETED
}
