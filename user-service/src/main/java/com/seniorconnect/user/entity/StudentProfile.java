package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String email;
    private String college;
    private String branch;
    private Integer graduationYear;
    private String targetRole;
    @Column(length = 1000)
    private String bio;

    private Integer dsaProgressPercentage = 72;
    private Integer aptitudeProgressPercentage = 80;
    private Integer csProgressPercentage = 68;
    private Integer resumeProgressPercentage = 90;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (dsaProgressPercentage == null) dsaProgressPercentage = 0;
        if (aptitudeProgressPercentage == null) aptitudeProgressPercentage = 0;
        if (csProgressPercentage == null) csProgressPercentage = 0;
        if (resumeProgressPercentage == null) resumeProgressPercentage = 0;
    }
}
