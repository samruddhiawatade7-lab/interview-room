package com.seniorconnect.interview.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long seniorId;
    private String authorName;
    private String company;
    private String role;
    private Integer graduationYear;
    private Integer roundsCount;
    private String difficulty; // Easy, Medium, Hard

    @Column(length = 1500)
    private String oaTopics;
    @Column(length = 2500)
    private String technicalQuestions;
    @Column(length = 1500)
    private String hrQuestions;
    @Column(length = 2000)
    private String prepTips;

    private String status; // PENDING, APPROVED, REJECTED
    private Integer helpfulCount = 0;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "APPROVED"; // Default to APPROVED for demo items
        if (helpfulCount == null) helpfulCount = 0;
    }
}
