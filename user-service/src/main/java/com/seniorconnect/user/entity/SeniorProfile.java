package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "senior_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeniorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String email;
    private String college;
    private String branch;
    private Integer graduationYear;
    private String company;
    private String role;
    private String skills;
    @Column(length = 2000)
    private String bio;
    
    private Boolean verified = false;
    private Double rating = 4.8;
    private Integer totalReviews = 12;
    private Integer studentsHelped = 24;

    private String mentorshipCategories; // Career Guidance, DSA Guidance, Resume Review, Mock Interview, Company Preparation
    private String availability; // Mon 6-8 PM, Wed 7-9 PM, Sat 10 AM - 1 PM
    @Column(length = 2000)
    private String experience;
    @Column(length = 2000)
    private String placementJourney;
    private String avatarUrl;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (rating == null) rating = 5.0;
        if (studentsHelped == null) studentsHelped = 0;
        if (totalReviews == null) totalReviews = 0;
        if (verified == null) verified = false;
    }
}
